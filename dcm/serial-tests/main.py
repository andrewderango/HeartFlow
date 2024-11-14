import serial
import struct
import time

serial = serial.Serial(
    port='COM5',
    baudrate=115200,
)

def send_params(msgtype, mode, LRL, URL, ARP, VRP, APW, VPW, AAmp, VAmp, ASens, VSens):
    data = bytearray()
    data.append(0x16) # for the message id
    data.append(msgtype) # for the message type
    data.extend(struct.pack('<B', mode))
    data.extend(struct.pack('<B', LRL))
    data.extend(struct.pack('<B', URL))
    data.extend(struct.pack('<H', ARP)) # pack as little-endian unsigned short
    data.extend(struct.pack('<H', VRP)) # pack as little-endian unsigned short
    data.extend(struct.pack('<B', APW))
    data.extend(struct.pack('<B', VPW))
    data.extend(struct.pack('<f', AAmp)) # pack as little-endian float
    data.extend(struct.pack('<f', VAmp)) # pack as little-endian float
    data.extend(struct.pack('<f', ASens)) # pack as little-endian float
    data.extend(struct.pack('<f', VSens)) # pack as little-endian float

    serial.write(data)

def read_params(mode, LRL, URL, ARP, VRP, APW, VPW, AAmp, VAmp, ASens, VSens):
    buffer = serial.read(27)
    if (
    mode == buffer[2] and
    LRL == buffer[3] and
    URL == buffer[4] and
    ARP == struct.unpack('<H', buffer[5:7])[0] and
    VRP == struct.unpack('<H', buffer[7:9])[0] and
    APW == buffer[9] and
    VPW == buffer[10] and
    AAmp == struct.unpack('<f', buffer[11:15])[0] and
    VAmp == struct.unpack('<f', buffer[15:19])[0] and
    ASens == struct.unpack('<f', buffer[19:23])[0] and
    VSens == struct.unpack('<f', buffer[23:27])[0]):
        print("Pacemaker Returned Same Values as Given")
    else:
        print("Pacemaker Returned DIFFERENT Values")
    print(buffer[1])
    print(buffer[2])
    print(buffer[3])
    print(buffer[4])
    print(struct.unpack('<H', buffer[5:7])[0])
    print(struct.unpack('<H', buffer[7:9])[0])
    print(buffer[9])
    print(buffer[10])
    print(struct.unpack('<f', buffer[11:15])[0])
    print(struct.unpack('<f', buffer[15:19])[0])
    print(struct.unpack('<f', buffer[19:23])[0])
    print(struct.unpack('<f', buffer[23:27])[0])

def params(mode, LRL, URL, ARP, VRP, APW, VPW, AAmp, VAmp, ASens, VSens):
    send_params(0x03, mode, LRL, URL, ARP, VRP, APW, VPW, AAmp, VAmp, ASens, VSens)
    print(f"Sent: {mode}, {LRL}bpm, {URL}bpm, {ARP}ms, {VRP}ms, {APW}ms, {VPW}ms, {AAmp}V, {VAmp}V, {ASens}V, {VSens}V")
    time.sleep(0.1)
    read_params(mode, LRL, URL, ARP, VRP, APW, VPW, AAmp, VAmp, ASens, VSens)
    time.sleep(0.1)
    send_params(0x04, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    print("Sent Approval")
    time.sleep(0.1)
    read_params(mode, LRL, URL, ARP, VRP, APW, VPW, AAmp, VAmp, ASens, VSens)

if __name__ == "__main__":

    while True:
        try:
            print('\n\n')
            params(100, 61, 121, 250, 250, 1, 1, 5.0, 5.0, 4.0, 4.0)
            time.sleep(2)
            print('\n\n')
            params(200, 175, 125, 250, 250, 1, 1, 5.0, 5.0, 4.0, 4.0)
            time.sleep(2)


        except KeyboardInterrupt:
            print("Exiting")
            break

    serial.close()
