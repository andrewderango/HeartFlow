import struct
import serial
import platform
import random
import serial.tools.list_ports
import time
from enum import Enum


class PacemakerMsgStatus(Enum):
    FULFILLING = 0
    FULFILLED = 1
    FAILED = 2

# todo: i might need to convert the methods to async

class PacemakerSerial:
    def __init__(self, baudrate: int) -> None:
        self.baudrate: int = baudrate
        self.serial_id: int = None
        self.serial_port: serial.Serial = None
        self.serial_port_name: str = None
        self.requests = {}

    def __del__(self) -> None:
        self._close()

    def _get_msg_id(self) -> int:
        msg_id = random.randint(0, 255)
        while msg_id in self.requests:
            msg_id = random.randint(0, 255)
        self.requests[msg_id] = PacemakerMsgStatus.FULFILLING
        return msg_id

    def _scan_ports(self) -> list[str]:
        raw_ports_list = serial.tools.list_ports.comports()
        ports = []
        platform_name = platform.system()

        for port in raw_ports_list:
            if platform_name == "Windows":
                ports.append(port.device)
            elif platform_name == "Linux":
                if "ttyUSB" in port.device or "ttyACM" in port.device:
                    ports.append(port.device)
            elif platform_name == "Darwin":
                if "tty.usbserial" in port.device:
                    ports.append(port.device)

        return ports

    def _serial_connect(self, port: str) -> None:
        self.serial_port = serial.Serial(
            port=port,
            baudrate=self.baudrate,
        )

    def _send_params(
        self,
        msg_id: int,
        msg: int,
        mode: int,
        LRL: int,
        URL: int,
        ARP: int,
        VRP: int,
        APW: int,
        VPW: int,
        AAmp: float,
        VAmp: float,
        ASens: float,
        VSens: float,
    ) -> None:
        data = bytearray(82)
        data[0] = msg_id
        data[1] = msg
        data[2] = mode
        data[3] = LRL
        data[4] = URL
        data[5:7] = struct.pack("<H", ARP)
        data[7:9] = struct.pack("<H", VRP)
        data[9] = APW
        data[10] = VPW
        data[11:15] = struct.pack("<f", AAmp)
        data[15:19] = struct.pack("<f", VAmp)
        data[19:23] = struct.pack("<f", ASens)
        data[23:27] = struct.pack("<f", VSens)

        self._send_raw(data)

    def _send_raw(self, payload: bytearray) -> None:
        # ensure bytearray is of size 27
        if len(payload) != 82:
            raise ValueError("Payload must be of size 82")

        self.serial_port.write(payload)

    def _read_params(self) -> dict:
        buffer = self.serial_port.read(82)
        return {
            "msg_id": buffer[0],
            "msg": buffer[1],
            "mode": buffer[2],
            "LRL": buffer[3],
            "URL": buffer[4],
            "ARP": struct.unpack("<H", buffer[5:7])[0],
            "VRP": struct.unpack("<H", buffer[7:9])[0],
            "APW": buffer[9],
            "VPW": buffer[10],
            "AAmp": struct.unpack("<f", buffer[11:15])[0],
            "VAmp": struct.unpack("<f", buffer[15:19])[0],
            "ASens": struct.unpack("<f", buffer[19:23])[0],
            "VSens": struct.unpack("<f", buffer[23:27])[0],
        }

    def _read_raw(self, bytesize: int = 82) -> bytearray:
        return self.serial_port.read(bytesize)

    def _close(self) -> None:
        if self.serial_port is not None:
            self.serial_port.close()

    def search_and_connect(self, mode: str, tries: int = 3) -> dict:
        if mode == "init":
            while True:
                ports = self._scan_ports()
                msg_id = None

                for port in ports:
                    try:
                        msg_id = self._get_msg_id()

                        handshake_bytearray = bytearray(82)
                        handshake_bytearray[0] = msg_id
                        handshake_bytearray[1] = 0x01

                        self._serial_connect(port)
                        self._send_raw(handshake_bytearray)

                        response = self._read_raw()
                        res_msg_id = response[0]
                        res_mode = response[1]
                        res_pm_id = struct.unpack("<H", response[2:4])[0]

                        if (
                            res_msg_id == msg_id
                            and res_mode == 0x01
                            and res_pm_id == self.serial_id
                        ):
                            self.serial_port_name = port
                            self.requests.pop(msg_id)
                            return {
                                "status": "connected",
                                "port": port,
                            }
                        else:
                            self.requests.pop(msg_id)
                            self._close()
                    except Exception as e:
                        self.requests.pop(msg_id)
                        self._close()

        elif mode == "reconnect":
            if self.serial_port_name is None:
                return {
                    "status": "failed",
                    "reason": "no port to reconnect to",
                }

            connected = False
            for _ in range(tries):
                try:
                    msg_id = self._get_msg_id()
                    handshake_bytearray = bytearray(82)
                    handshake_bytearray[0] = msg_id
                    handshake_bytearray[1] = 0x01

                    self._serial_connect(self.serial_port_name)
                    self._send_raw(handshake_bytearray)

                    response = self._read_raw()
                    res_msg_id = response[0]
                    res_mode = response[1]
                    res_pm_id = struct.unpack("<H", response[2:4])[0]

                    if (
                        res_msg_id == msg_id
                        and res_mode == 0x01
                        and res_pm_id == self.serial_id
                    ):
                        connected = True
                        return {
                            "status": "connected",
                            "port": self.serial_port_name,
                        }
                    else:
                        self._close()
                except Exception as e:
                    self._close()

                time.sleep(1)

            if not connected:
                return {
                    "status": "failed",
                    "reason": "failed to reconnect",
                }
        else:
            return {
                "status": "failed",
                "reason": "invalid mode",
            }

    def poll_pacemaker(self) -> bool:
        poll_bytearray = bytearray(82)
        msg_id = self._get_msg_id()
        poll_bytearray[0] = msg_id
        poll_bytearray[1] = 0x02

        try:
            self._send_raw(poll_bytearray)
            res = self._read_raw()
            res_msg_id = res[0]
            res_mode = res[1]
            res_pm_id = struct.unpack("<H", res[2:4])[0]

            if res_msg_id == msg_id and res_mode == 0x02 and res_pm_id == self.serial_id:
                self.requests.pop(msg_id)
                return True
            else:
                print("failed poll: the response did not match the request")
                self.requests.pop(msg_id)
                return False
        except Exception as e:
            print(f"failed poll: {e}")
            self.requests.pop(msg_id)
            return False

    def send_params(
        self,
        msg: int,
        mode: int,
        LRL: int,
        URL: int,
        ARP: int,
        VRP: int,
        APW: int,
        VPW: int,
        AAmp: float,
        VAmp: float,
        ASens: float,
        VSens: float,
    ) -> None:
        # todo: sanitation for invalid values
        msg_id = self._get_msg_id()
        self._send_params(
            msg_id,
            msg,
            mode,
            LRL,
            URL,
            ARP,
            VRP,
            APW,
            VPW,
            AAmp,
            VAmp,
            ASens,
            VSens,
        )
        self.requests.pop(msg_id)

    def read_params(self) -> dict:
        return self._read_params()

    def set_serial_id(self, serial_id: int) -> None:
        self.serial_id = serial_id

    def close(self) -> None:
        self._close()
