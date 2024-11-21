import logging
import logging.handlers
import multiprocessing
import asyncio
import datetime
import os
from SerialMP import PacemakerMPSerial, PMPSerialMsgType, PMParameters

log_queue = multiprocessing.Queue()

queue_handler = logging.handlers.QueueHandler(log_queue)
logging.basicConfig(
    level=logging.DEBUG, format="%(message)s", handlers=[queue_handler]
)
logger = logging.getLogger("main")

today = datetime.datetime.now()

# if the file already exists, create a new one with a different name
if not os.path.exists("logs"):
    os.mkdir("logs")
else:
    i = 1
    while os.path.exists(f"logs/{today.strftime('%Y-%m-%d')}_{i}.log"):
        i += 1
    today = today.strftime('%Y-%m-%d') + f"_{i}"

file_handler = logging.FileHandler(f"logs/{today}.log")
file_handler.setFormatter(logging.Formatter("%(asctime)s:%(levelname)s:%(name)s:%(message)s"))
listener = logging.handlers.QueueListener(log_queue, file_handler)
listener.start()

reconnect_fail = asyncio.Event()

async def verify_reconnect(pm_serial: PacemakerMPSerial):
    global reconnect_fail

    while True:
        if not pm_serial.connected.value and pm_serial.connecting:
            logger.warning("[RECONNECT] Reconnecting to pacemaker")
            res = pm_serial.search_and_connect(mode="reconnect")
            if res.status == PMPSerialMsgType.SUCCESS:
                logger.debug("[RECONNECT] Reconnected to pacemaker")
            else:
                logger.error("[RECONNECT] Failed to reconnect to pacemaker")
                reconnect_fail.set()
                break
        else:
            logger.debug("[RECONNECT] Connection is alive")

        await asyncio.sleep(1)

async def main():
    logger.debug("[MAIN] Connecting to pacemaker")
    pm_serial = PacemakerMPSerial(baudrate=112500, msg_size=82)
    pm_serial.set_pm_id(12697)
    res = pm_serial.search_and_connect(mode="init")
    if res.status == PMPSerialMsgType.SUCCESS:
        logger.debug("[MAIN] Connected to pacemaker")
    else:
        logger.debug("[MAIN] Failed to connect to pacemaker")
        exit(1)
    
    reconnect_task = asyncio.create_task(verify_reconnect(pm_serial))
    
    try:
        while not reconnect_fail.is_set():
            logger.debug("[MAIN] Main event loop doing something...")
            test = PMParameters(
                mode=100,
                lrl=100,
                url=130,
                arp=150,
                vrp=0,
                apw=10,
                vpw=0,
                aamp=5,
                vamp=0,
                asens=5,
                vsens=0,
            )
            res = pm_serial.send_parameters(test)
            if res.status == PMPSerialMsgType.SUCCESS:
                logger.debug("[MAIN] Parameters sent successfully")
            else:
                logger.error("[MAIN] Failed to send parameters")
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        logger.debug("[MAIN] Main event loop cancelled, cleaning up...")
    except KeyboardInterrupt:
        logger.debug("[MAIN] Keyboard interrupt, cleaning up...")
    finally:
        reconnect_task.cancel()
        pm_serial.close()
        logger.debug("[MAIN] Disconnected from pacemaker")


if __name__ == "__main__":
    try:
        print("Starting main event loop...")
        asyncio.run(main())
    finally:
        print("Stopping listener...")
        listener.stop()
    
    print("Exiting program...")
