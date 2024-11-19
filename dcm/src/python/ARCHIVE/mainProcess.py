import asyncio
import json
import logging
from websockets.asyncio.server import serve
from serialClass import PacemakerSerial

pacemaker_serial = PacemakerSerial(baudrate=115200)
pacemaker_connecting = asyncio.Event()
pacemaker_connected = asyncio.Event()


async def poll_pacemaker(websocket):
    global pacemaker_serial
    global pacemaker_connected

    while True:
        if pacemaker_connected.is_set():
            logging.info("Polling pacemaker...")
            res = pacemaker_serial.poll_pacemaker()
            if not res:
                websocket.send(
                    json.dumps(
                        {
                            "from": "pm_poll",
                            "type": "error",
                            "msg": "Pacemaker not responding",
                        }
                    )
                )
                pacemaker_connected.clear()
        else:
            logging.info("Pacemaker not connected")
        await asyncio.sleep(1)


async def handle_pacemaker_connection(websocket):
    global pacemaker_serial
    global pacemaker_connecting
    global pacemaker_connected

    while True:
        async for message in websocket:
            data = json.loads(message)

            if data["type"] == "init":
                logging.info("Attempting to connect to pacemaker...")
                pm_id = data["pm_id"]

                pacemaker_serial.set_serial_id(pm_id)
                res = pacemaker_serial.search_and_connect(mode="init")
                if res["status"] == "connected":
                    pacemaker_connected.set()
                    pacemaker_connecting.clear()
                    logging.info("Connected to pacemaker")
                    await websocket.send(
                        json.dumps(
                            {
                                "from": "pm_handle_connection",
                                "type": "connected",
                                "port": res["port"],
                            }
                        )
                    )
                else:
                    logging.error("Failed to connect to pacemaker")
                    await websocket.send(
                        json.dumps(
                            {
                                "from": "pm_handle_connection",
                                "type": "failed",
                            }
                        )
                    )
            elif not pacemaker_connected.is_set() and not pacemaker_connecting.is_set():
                # attempt a reconnect
                logging.warning("Attempting to reconnect to pacemaker...")
                res = pacemaker_serial.search_and_connect(mode="reconnect")
                if res["status"] == "connected":
                    pacemaker_connected.set()
                    logging.info("Reconnected to pacemaker")
                    await websocket.send(
                        json.dumps(
                            {
                                "from": "pm_handle_connection",
                                "type": "connected",
                                "port": res["port"],
                            }
                        )
                    )
                else:
                    logging.error("Failed to reconnect to pacemaker")
                    await websocket.send(
                        json.dumps(
                            {
                                "from": "pm_handle_connection",
                                "type": "failed",
                            }
                        )
                    )
            else:
                logging.info("No change in pacemaker connection status")
                continue

        # remove this later
        await asyncio.sleep(1)


async def handle_pacemaker_parameters(websocket):
    global pacemaker_serial
    global pacemaker_connected

    while True:
        async for message in websocket:
            data = json.loads(message)

            if data["type"] == "set":
                if pacemaker_connected.is_set():
                    params = data["params"]
                    success = False

                    for _ in range(3):
                        # todo: verify parameters
                        pacemaker_serial.send_params(
                            msg=0x03,
                            mode=params["mode"],
                            LRL=params["LRL"],
                            URL=params["URL"],
                            ARP=params["ARP"],
                            VRP=params["VRP"],
                            APW=params["APW"],
                            VPW=params["VPW"],
                            AAmp=params["AAmp"],
                            VAmp=params["VAmp"],
                            ASens=params["ASens"],
                            VSens=params["VSens"],
                        )
                        res = pacemaker_serial.read_params()

                        # verify the parameters are the same
                        # if they are, send 0x04 ack
                        # else, continue sending 0x03
                        if res == params:
                            # just gonna grab the private method
                            ack_bytearray = bytearray()
                            ack_bytearray.append(pacemaker_serial._get_msg_id())
                            ack_bytearray.append(0x04)
                            for _ in range(25):
                                ack_bytearray.append(0x00)
                            pacemaker_serial._send_raw(ack_bytearray)
                            success = True
                            logging.info("Parameters set successfully")
                            websocket.send(
                                json.dumps(
                                    {
                                        "from": "pm_handle_parameters",
                                        "type": "success",
                                    }
                                )
                            )
                            break
                        else:
                            continue

                    if not success:
                        logging.error("Failed to set parameters")
                        websocket.send(
                            json.dumps(
                                {
                                    "from": "pm_handle_parameters",
                                    "type": "error",
                                    "msg": "Failed to set parameters",
                                }
                            )
                        )

                else:
                    logging.error("Pacemaker not connected")
                    await websocket.send(
                        json.dumps(
                            {
                                "from": "pm_handle_parameters",
                                "type": "error",
                                "msg": "Pacemaker not connected",
                            }
                        )
                    )


async def handler(websocket):
    pm_polling_task = asyncio.create_task(poll_pacemaker(websocket))
    pm_connection_task = asyncio.create_task(handle_pacemaker_connection(websocket))
    pm_params_task = asyncio.create_task(handle_pacemaker_parameters(websocket))

    logging.info("Tasks created, beginning main loop...")
    done, pending = await asyncio.wait(
        [pm_polling_task, pm_connection_task, pm_params_task], return_when=asyncio.FIRST_COMPLETED
    )

    for task in pending:
        task.cancel()

    for task in done:
        task.exception()


async def main():
    global pacemaker_connecting

    # we'll default to "connecting"
    pacemaker_connecting.set()

    async with serve(handler, "localhost", 8765) as server:
        await server.serve_forever()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting server...")
    asyncio.run(main())
