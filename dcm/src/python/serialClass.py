import struct
import serial
import platform
import random
import serial.tools.list_ports
from enum import Enum


class PacemakerMsgStatus(Enum):
    FULFILLING = 0
    FULFILLED = 1
    FAILED = 2


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
        data = bytearray()
        data.append(msg_id)
        data.append(msg)
        data.extend(struct.pack("<B", mode))
        data.extend(struct.pack("<B", LRL))
        data.extend(struct.pack("<B", URL))
        data.extend(struct.pack("<H", ARP))
        data.extend(struct.pack("<H", VRP))
        data.extend(struct.pack("<B", APW))
        data.extend(struct.pack("<B", VPW))
        data.extend(struct.pack("<f", AAmp))
        data.extend(struct.pack("<f", VAmp))
        data.extend(struct.pack("<f", ASens))
        data.extend(struct.pack("<f", VSens))

    def _send_raw(self, payload: bytearray) -> None:
        # ensure bytearray is of size 27
        if len(payload) != 27:
            raise ValueError("Payload must be of size 27")

        self.serial_port.write(payload)

    def _read_params(self) -> dict:
        buffer = self.serial_port.read(27)
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

    def _read_raw(self, bytesize: int = 27) -> bytearray:
        return self.serial_port.read(bytesize)

    def _close(self) -> None:
        if self.serial_port is not None:
            self.serial_port.close()

    def search_and_connect(self, mode: str, tries: int = 3) -> dict:
        if mode == "init":
            while True:
                ports = self._scan_ports()

                for port in ports:
                    try:
                        msg_id = self._get_msg_id()

                        handshake_bytearray = bytearray()
                        handshake_bytearray.append(msg_id)  # msg id
                        handshake_bytearray.append(0x01)  # msg type
                        for _ in range(25):
                            handshake_bytearray.append(0x00)

                        self._serial_connect(port)
                        self._send_raw(handshake_bytearray)
                        response = self._read_raw()
                        res_msg_id = response[0]
                        res_mode = response[1]
                        res_pm_id = response[2] + response[3]

                        if (
                            res_msg_id == msg_id
                            and res_mode == 0x02
                            and res_pm_id == self.serial_id
                        ):
                            self.serial_port_name = port
                            self.requests.pop(msg_id)
                            return {
                                "status": "connected",
                                "port": port,
                            }
                        else:
                            self._close()
                    except Exception as e:
                        self._close()

        elif mode == "reconnect":
            if self.serial_port_name is None:
                return {
                    "status": "no previous connection",
                }

            connected = False
            for _ in range(tries):
                try:
                    self._serial_connect(self.serial_port_name)
                    connected = True
                    return {
                        "status": "connected",
                        "port": self.serial_port_name,
                    }
                except Exception as e:
                    print(e)
                    self._close()

            if not connected:
                return {
                    "status": "failed",
                }
        else:
            return {
                "status": "invalid mode",
            }

    def poll_pacemaker(self) -> bool:
        poll_bytearray = bytearray()
        msg_id = self._get_msg_id()
        poll_bytearray.append(msg_id)
        poll_bytearray.append(0x02)
        for _ in range(25):
            poll_bytearray.append(0x00)

        self._send_raw(poll_bytearray)
        response = self._read_raw()
        res_msg_id = response[0]
        res_mode = response[1]
        res_pm_id = response[2] + response[3]

        if res_msg_id == msg_id and res_mode == 0x03 and res_pm_id == self.serial_id:
            self.requests.pop(msg_id)
            return True
        else:
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
