import logging
import logging.handlers
import os
import datetime
import asyncio
import json
from websockets.asyncio.server import serve
from SerialMP import PacemakerMPSerial, PMPSerialMsgType, PMParameters

# setup some globals
reconnect_task: asyncio.Task = None
reconnect_fail: asyncio.Event = asyncio.Event()

logging.basicConfig(level=logging.INFO, format="%(message)s")
main_logger = logging.getLogger("main")

today = datetime.datetime.now()
if not os.path.exists("logs"):
    os.mkdir("logs")
else:
    i = 1
    while os.path.exists(f"logs/{today.strftime('%Y-%m-%d')}_webserver_{i}.log"):
        i += 1
    today = today.strftime("%Y-%m-%d") + f"_webserver_{i}"
file_handler = logging.handlers.RotatingFileHandler(
    f"logs/{today}.log", maxBytes=1000000, backupCount=5
)
file_handler.setFormatter(
    logging.Formatter("%(asctime)s:%(levelname)s:%(name)s:%(message)s")
)
main_logger.addHandler(file_handler)

serial_logger = logging.getLogger("SerialMP")
serial_logger.addHandler(file_handler)

websockets_logger = logging.getLogger("websockets.server")
websockets_logger.addHandler(file_handler)


async def _reconnect_handler(websocket, pm_serial: PacemakerMPSerial):
    global reconnect_fail

    while not reconnect_fail.is_set():
        if not pm_serial.connected.value and pm_serial.connecting:
            res = pm_serial.search_and_connect(mode="reconnect")
            if res.status == PMPSerialMsgType.SUCCESS:
                await websocket.send(json.dumps({"status": "reconnected"}))
            else:
                reconnect_fail.set()
                await websocket.send(
                    json.dumps({"status": "error", "message": "Failed to reconnect"})
                )
        else:
            pass

        await asyncio.sleep(0.1)


async def _cleanup_handler(websocket, pm_serial: PacemakerMPSerial):
    while True:
        if pm_serial.cleanup_flag.value:
            main_logger.debug(
                "[CLEANUP_HANDLER] Pacemaker disconnected, cleaning up..."
            )
            pm_serial.close()
            pm_serial.cleanup_flag.set(False)
            await websocket.send(json.dumps({"status": "disconnected"}))
            break

        await asyncio.sleep(0.1)


async def consumer_handler(websocket, pm_serial: PacemakerMPSerial):
    global reconnect_task
    global reconnect_fail

    try:
        while not reconnect_fail.is_set():
            async for message in websocket:
                if reconnect_fail.is_set():
                    await websocket.send(json.dumps({"status": "disconnected"}))
                    break

                data = json.loads(message)

                if data["type"] == "init":
                    pm_id = data.get("pm_id", None)

                    if pm_id is None:
                        await websocket.send(
                            json.dumps(
                                {"status": "error", "message": "Missing pacemaker ID"}
                            )
                        )
                        continue

                    pm_serial.set_pm_id(pm_id)
                    res = pm_serial.search_and_connect(mode="init")

                    if res.status == PMPSerialMsgType.SUCCESS:
                        reconnect_task = asyncio.create_task(
                            _reconnect_handler(websocket, pm_serial)
                        )
                        await websocket.send(json.dumps({"status": "success"}))
                    else:
                        await websocket.send(
                            json.dumps(
                                {
                                    "status": "error",
                                    "message": "Failed to connect to pacemaker",
                                }
                            )
                        )
                elif data["type"] == "send_parameters":
                    if not pm_serial.connected.value:
                        await websocket.send(
                            json.dumps(
                                {
                                    "status": "error",
                                    "message": "Not connected to pacemaker",
                                }
                            )
                        )
                        continue

                    parameters = data.get("parameters", None)

                    if parameters is None:
                        await websocket.send(
                            json.dumps(
                                {
                                    "status": "error",
                                    "message": "Missing parameters object",
                                }
                            )
                        )
                        continue

                    params = PMParameters(
                        mode=parameters.get("mode", 0),
                        lrl=parameters.get("lrl", 0),
                        url=parameters.get("url", 0),
                        arp=parameters.get("arp", 0),
                        vrp=parameters.get("vrp", 0),
                        apw=parameters.get("apw", 0),
                        vpw=parameters.get("vpw", 0),
                        aamp=parameters.get("aamp", 0),
                        vamp=parameters.get("vamp", 0),
                        asens=parameters.get("asens", 0),
                        vsens=parameters.get("vsens", 0),
                    )

                    try:
                        res = await asyncio.to_thread(pm_serial.send_parameters, params)

                        if res.status == PMPSerialMsgType.SUCCESS:
                            await websocket.send(json.dumps({"status": "success"}))
                        else:
                            await websocket.send(
                                json.dumps(
                                    {
                                        "status": "error",
                                        "message": "Failed to send parameters",
                                    }
                                )
                            )
                    except Exception as e:
                        main_logger.error(f"[CONSUMER_HANDLER] {e}")
                        await websocket.send(
                            json.dumps(
                                {
                                    "status": "error",
                                    "message": "Failed to send parameters",
                                }
                            )
                        )
                elif data["type"] == "toggle_egram":
                    if not pm_serial.connected.value:
                        await websocket.send(
                            json.dumps(
                                {
                                    "status": "error",
                                    "message": "Not connected to pacemaker",
                                }
                            )
                        )
                        continue

                    pm_serial.toggle_egram()
                    await websocket.send(json.dumps({"status": "success"}))
                elif data["type"] == "disconnect":
                    pm_serial.close()
                    await websocket.send(json.dumps({"status": "disconnected"}))
                else:
                    await websocket.send(
                        json.dumps(
                            {
                                "status": "error",
                                "message": "Invalid message type",
                            }
                        )
                    )

                await asyncio.sleep(0.1)
    finally:
        if reconnect_task:
            reconnect_task.cancel()
            await reconnect_task

        pm_serial.close()
        main_logger.debug("[MAIN] Disconnected from pacemaker")


async def producer_handler(websocket, pm_serial: PacemakerMPSerial):
    global reconnect_fail

    while not reconnect_fail.is_set():
        if pm_serial.connected.value:
            egram_data = pm_serial.consume_egram_data()
            if egram_data == {}:
                await asyncio.sleep(0.1)
                continue

            res = json.dumps(
                {
                    "type": "egram",
                    "data": [
                        {
                            "time": x,
                            "values": {
                                "atrialSense": y.atrialSense,
                                "ventricularSense": y.ventricularSense,
                            },
                        }
                        for x, y in egram_data.items()
                    ],
                }
            )
            await websocket.send(res)

        await asyncio.sleep(0.1)


async def handler(websocket):
    global reconnect_fail

    pm_serial = PacemakerMPSerial(baudrate=112500, msg_size=82)

    consumer_task = asyncio.create_task(consumer_handler(websocket, pm_serial))
    producer_task = asyncio.create_task(producer_handler(websocket, pm_serial))
    cleanup_task = asyncio.create_task(_cleanup_handler(websocket, pm_serial))

    done, pending = await asyncio.wait(
        [consumer_task, producer_task, cleanup_task],
        return_when=asyncio.FIRST_COMPLETED,
    )

    for task in pending:
        task.cancel()

    pm_serial.close()
    reconnect_fail.clear()


async def main():
    async with serve(handler, "localhost", 8765) as server:
        await server.serve_forever()


if __name__ == "__main__":
    print("Starting webserver...")
    asyncio.run(main())
    print("Webserver stopped")
