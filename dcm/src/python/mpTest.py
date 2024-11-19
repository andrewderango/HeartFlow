import logging
from SerialMP import PacemakerMPSerial, PMPSerialMsgType

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(name)s:%(message)s")
logger = logging.getLogger("main")

if __name__ == "__main__":
    logger.debug("[MAIN] Connecting to pacemaker")
    pm_serial = PacemakerMPSerial(baudrate=115200, msg_size=82)
    pm_serial.set_pm_id(12697)
    res = pm_serial.search_and_connect(mode="init")
    if res.status == PMPSerialMsgType.SUCCESS:
        logger.debug("[MAIN] Connected to pacemaker")
    else:
        logger.debug("[MAIN] Failed to connect to pacemaker")
        exit(1)
    
    pm_serial.close()
    logger.debug("[MAIN] Disconnected from pacemaker")
