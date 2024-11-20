import logging
import asyncio
from SerialMP import PacemakerMPSerial, PMPSerialMsgType

logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(name)s:%(message)s"
)
logger = logging.getLogger("main")

reconnect_fail = asyncio.Event()

async def verify_reconnect(pm_serial: PacemakerMPSerial):
    while not reconnect_fail.is_set():
        if not pm_serial.connected.value and pm_serial.connecting:
            logger.warning("[RECONNECT] Reconnecting to pacemaker")
            res = pm_serial.search_and_connect(mode="reconnect")
            if res.status == PMPSerialMsgType.SUCCESS:
                logger.debug("[RECONNECT] Reconnected to pacemaker")
            else:
                logger.error("[RECONNECT] Failed to reconnect to pacemaker")
                reconnect_fail.set()
                break
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
    
    while not reconnect_fail.is_set():
        logger.debug("[MAIN] Main event loop doing something...")
        await asyncio.sleep(1)
    
    reconnect_task.cancel()
    pm_serial.disconnect()
    logger.debug("[MAIN] Disconnected from pacemaker")


if __name__ == "__main__":
    asyncio.run(main())
