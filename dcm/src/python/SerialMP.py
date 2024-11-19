import multiprocessing
import struct
import serial
import platform
import random
import serial.tools.list_ports
import time
import logging
from enum import Enum
from typing import Optional, Dict, NamedTuple, List

logger = logging.getLogger("PacemakerMPSerial")


class MsgStatus(Enum):
    FULFILLING = 0
    FULFILLED = 1
    FAILED = 2


class PMPSerialMsgType(Enum):
    SUCCESS = 0
    ERROR = 1


class Msg(NamedTuple):
    msg_id: int
    msg_type: int
    msg_status: MsgStatus
    msg: Optional[bytearray]


class PMPSerialMsg(NamedTuple):
    status: PMPSerialMsgType
    msg: Optional[str]


class PacemakerMPSerial:
    def __init__(self, baudrate: int, msg_size: int) -> None:
        self.baudrate: int = baudrate
        self.msg_size: int = msg_size
        self.serial_id: Optional[int] = None
        self.serial_port: Optional[serial.Serial] = None
        self.serial_port_name: Optional[str] = None
        self.read_process: Optional[multiprocessing.Process] = None
        self.manager = multiprocessing.Manager()
        self.read_running = self.manager.Value("b", False)
        self.msg_log: Dict[int, Msg] = self.manager.dict()
        self.egram_msg_log: Dict[int, Msg] = self.manager.dict()

    def __read_process(self, read_running, msg_log, egram_msg_log) -> None:
        msg_id: Optional[int] = None
        msg_type: Optional[int] = None
        timestamp: Optional[float] = None
        msg: Optional[bytearray] = None

        while read_running.value:
            if self.serial_port is not None and self.serial_port.is_open:
                logger.debug("[read_process] Waiting for data...")

                if self.serial_port.in_waiting < self.msg_size:
                    time.sleep(0.01)
                    continue

                res = self.serial_port.read(self.msg_size)
                msg_id = res[0]
                msg_type = res[1]
                msg = res[2:]
                timestamp = int(time.time() * 1000)

                if msg_type == 0x05:
                    # must handle egram data separately
                    egram_msg_log[timestamp] = Msg(
                        msg_id, msg_type, MsgStatus.FULFILLED, msg
                    )
                    logger.debug(f"[read_process] Egram data received: {msg}")
                elif msg_id in self.msg_log:
                    msg_log[msg_id] = Msg(msg_id, msg_type, MsgStatus.FULFILLED, msg)
                    logger.debug(f"[read_process] Message received: {msg_id} | {msg}")
                else:
                    msg_log[msg_id] = Msg(msg_id, msg_type, MsgStatus.FAILED, msg)
                    logger.debug(
                        f"[read_process] Unknown message received: {msg_id} | {msg}"
                    )

            time.sleep(0.01)

    def __block_until_fulfilled(self, msg_id: int) -> Msg:
        while self.msg_log[msg_id].msg_status != MsgStatus.FULFILLED:
            logger.debug(f"[block_until_fulfilled] Waiting for message: {msg_id}")
            time.sleep(0.01)

        logger.debug(f"[block_until_fulfilled] Message fulfilled: {msg_id}")
        msg = self.msg_log[msg_id]
        self.msg_log.pop(msg_id)
        return msg

    def __create_msg(self, msg_type: int) -> int:
        msg_id = random.randint(0, 255)
        while msg_id in self.msg_log:
            msg_id = random.randint(0, 255)
        self.msg_log[msg_id] = Msg(msg_id, msg_type, MsgStatus.FULFILLING, None)
        logger.debug(f"[create_msg] Message created: {msg_id}")
        return msg_id

    def __scan_ports(self) -> List[str]:
        raw_port_list = serial.tools.list_ports.comports()
        return_list = []
        platform_name = platform.system()

        for port in raw_port_list:
            if platform_name == "Windows":
                return_list.append(port.device)
            elif platform_name == "Linux":
                if "ttyUSB" in port.device or "ttyACM" in port.device:
                    return_list.append(port.device)
            elif platform_name == "Darwin":
                if "tty.usbserial" in port.device:
                    return_list.append(port.device)

        return return_list

    def __serial_connect(self, port: str) -> None:
        self.serial_port = serial.Serial(
            port=port,
            baudrate=self.baudrate,
        )
        self.read_process = multiprocessing.Process(
            target=self.__read_process,
            args=(self.read_running, self.msg_log, self.egram_msg_log),
        )
        self.read_running.value = True
        self.read_process.start()
        logger.debug(f"[serial_connect] Connected to port: {port}")

    def __serial_close(self) -> None:
        self.read_running.value = False
        if self.read_process is not None:
            self.read_process.join()
        if self.serial_port is not None and self.serial_port.is_open:
            self.serial_port.close()
        self.serial_port = None
        self.serial_port_name = None
        logger.debug("[serial_close] Serial port closed")

    def __send_raw(self, payload: bytearray) -> None:
        if len(payload) != self.msg_size:
            raise ValueError("Invalid payload size")
        self.serial_port.write(payload)
        logger.debug(f"[send_raw] Message sent: {payload}")

    def close(self) -> None:
        self.__serial_close()

    def set_pm_id(self, pm_id: int) -> None:
        self.serial_id = pm_id

    def search_and_connect(self, mode: str, tries: int = 3) -> PMPSerialMsg:
        if mode == "init":
            while True:
                ports = self.__scan_ports()
                msg_id = None

                logger.debug(f"[search_and_connect] Scanned ports: {ports}")
                for port in ports:
                    try:
                        msg_id = self.__create_msg(0x01)

                        req = bytearray(82)
                        req[0] = msg_id
                        req[1] = 0x01

                        logger.debug(
                            f"[search_and_connect] Attempting handshake on port: {port}"
                        )
                        self.__serial_connect(port)
                        self.__send_raw(req)

                        res = self.__block_until_fulfilled(msg_id)
                        res_msg_id = res.msg_id
                        res_msg_type = res.msg_type
                        res_bytearray = res.msg
                        res_pm_id = struct.unpack("<H", res_bytearray[0:2])[0]

                        if (
                            res_msg_id == msg_id
                            and res_msg_type == 0x01
                            and res_pm_id == self.serial_id
                        ):
                            self.serial_port_name = port
                            logger.debug(
                                f"[search_and_connect] Connected on port: {port}"
                            )
                            return PMPSerialMsg(
                                PMPSerialMsgType.SUCCESS, f"Connected on port {port}"
                            )
                        else:
                            self.__serial_close()
                            logger.debug(
                                f"[search_and_connect] Failed handshake on port: {port}"
                            )
                    except Exception as e:
                        self.msg_log.pop(msg_id)
                        self.__serial_close()
                        logger.critical(
                            f"[search_and_connect] Critical failure on port: {port} | {e}"
                        )

        elif mode == "reconnect":
            pass
        else:
            return PMPSerialMsg(PMPSerialMsgType.ERROR, "Invalid mode")
