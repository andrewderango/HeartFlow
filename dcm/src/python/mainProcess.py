import asyncio
import json
import serial
import serial.tools.list_ports
import platform
import struct
import sys
from websockets.asyncio.server import serve

pacemaker = None


def _scan_ports() -> list[str]:
    raw_ports = serial.tools.list_ports.comports()
    ports = []
    platformName = platform.system()
    for port in raw_ports:
        if platformName == "Windows":
            ports.append(port.device)
        elif platformName == "Linux":
            if "ttyUSB" in port.device or "ttyACM" in port.device:
                ports.append(port.device)
        elif platformName == "Darwin":
            if "tty.usbserial" in port.device:
                ports.append(port.device)
    return ports


def _serial_connect(port: str, baudrate: int) -> serial.Serial:
    return serial.Serial(
        port=port,
        baudrate=baudrate,
    )


def _send(
    serialPort: serial.Serial,
    msgId: int,
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
    # todo: add error handling for invalid values

    data = bytearray()
    data.append(msgId)  # for the message id
    data.append(msg)  # for the message type
    data.extend(struct.pack("<B", mode))
    data.extend(struct.pack("<B", LRL))
    data.extend(struct.pack("<B", URL))
    data.extend(struct.pack("<H", ARP))  # pack as little-endian unsigned short
    data.extend(struct.pack("<H", VRP))  # pack as little-endian unsigned short
    data.extend(struct.pack("<B", APW))
    data.extend(struct.pack("<B", VPW))
    data.extend(struct.pack("<f", AAmp))  # pack as little-endian float
    data.extend(struct.pack("<f", VAmp))  # pack as little-endian float
    data.extend(struct.pack("<f", ASens))  # pack as little-endian float
    data.extend(struct.pack("<f", VSens))  # pack as little-endian float

    serialPort.write(data)


def _read(serialPort: serial.Serial) -> dict:
    buffer = serialPort.read(27)
    return {
        "msgId": buffer[0],
        "mode": buffer[1],
        "LRL": buffer[2],
        "URL": buffer[3],
        "ARP": struct.unpack("<H", buffer[4:6])[0],
        "VRP": struct.unpack("<H", buffer[6:8])[0],
        "APW": buffer[8],
        "VPW": buffer[9],
        "AAmp": struct.unpack("<f", buffer[10:14])[0],
        "VAmp": struct.unpack("<f", buffer[14:18])[0],
        "ASens": struct.unpack("<f", buffer[18:22])[0],
        "VSens": struct.unpack("<f", buffer[22:26])[0],
    }


def search_and_connect(pacemaker_id: str) -> None:
    global pacemaker

    ports = _scan_ports()
    found = False

    while not found:
        for port in ports:
            try:
                serialPort = _serial_connect(port, 9600)
                _send(serialPort, 0x01, 0x01, 0, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0)
                response = _read(serialPort)
                msgId = response["msgId"]
                mode = response["mode"]
                byte_lrl = response["LRL"]
                byte_url = response["URL"]
                id = byte_lrl + byte_url

                if msgId == 0x01 and mode == 0x01 and id == pacemaker_id:
                    found = True
                    pacemaker = serialPort
                    break
                else:
                    serialPort.close()
            except serial.SerialException:
                pass


async def handler(websocket):
    async for message in websocket:
        data = json.loads(message)
        if data["type"] == "search":
            search_and_connect(data["id"])
        else:
            await websocket.send(json.dumps({"err": "Invalid message type"}))
            continue


async def main():
    async with serve(handler, "localhost", 8765) as server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())
    sys.exit(0)
