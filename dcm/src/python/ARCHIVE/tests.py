import asyncio
from serialClass import PacemakerSerial

pacemaker_serial = PacemakerSerial(baudrate=115200)
connected_once = asyncio.Event()
pacemaker_connecting = asyncio.Event()
pacemaker_connected = asyncio.Event()


async def connect():
    global pacemaker_serial
    global pacemaker_connected
    global pacemaker_connecting
    global connected_once

    while True:
        if not connected_once.is_set() and not pacemaker_connected.is_set() and pacemaker_connecting.is_set():
            print("[PM_CONNECT] Connecting to the pacemaker for the first time...")
            res = pacemaker_serial.search_and_connect(mode="init")
            if res["status"] == "connected":
                pacemaker_connected.set()
                pacemaker_connecting.clear()
                connected_once.set()
                print("[PM_CONNECT] Connected to pacemaker")
            else:
                print("[PM_CONNECT] Failed to connect to pacemaker")
        elif not pacemaker_connected.is_set() and not pacemaker_connecting.is_set():
            print("[PM_CONNECT] Attempting to reconnect to pacemaker...")
            res = pacemaker_serial.search_and_connect(mode="reconnect")
            if res["status"] == "connected":
                pacemaker_connected.set()
                print("[PM_CONNECT] Reconnected to pacemaker")
            else:
                print("[PM_CONNECT] Failed to reconnect to pacemaker")
                pacemaker_connected.clear()
                pacemaker_connecting.set()
                connected_once.clear()
        else:
            print("[PM_CONNECT] Nothing to do")
        
        await asyncio.sleep(0.01)


async def poll():
    global pacemaker_serial
    global pacemaker_connected

    while True:
        if pacemaker_connected.is_set():
            print("[PM_POLL] Polling pacemaker...")
            res = pacemaker_serial.poll_pacemaker()
            if not res:
                print("[PM_POLL] Pacemaker not responding")
                pacemaker_connected.clear()
            else:
                print("[PM_POLL] Pacemaker responded")
        else:
            print("[PM_POLL] Pacemaker not connected")
        
        await asyncio.sleep(0.01)


async def main():
    global pacemaker_serial
    global pacemaker_connecting

    pacemaker_connecting.set()
    pacemaker_serial.set_serial_id(12697)

    poll_task = asyncio.create_task(poll())
    connect_task = asyncio.create_task(connect())

    done, pending = await asyncio.wait(
        [poll_task, connect_task], return_when=asyncio.FIRST_COMPLETED
    )
    for task in pending:
        task.cancel()

    await asyncio.sleep(1)
    print("Exiting...")
    pacemaker_serial.close()

if __name__ == "__main__":
    asyncio.run(main())
