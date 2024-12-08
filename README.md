# HeartFlow

HeartFlow is an advanced pacemaker system designed to deliver precise cardiac pacing and monitoring capabilities. It includes firmware for an FRDM-K64F microcontroller to operate pacing behaviour and interact with the emulated heart, and a robust Electron desktop application to control the pacemaker firmware and visualize telemetry data. The firmware and desktop application communicate with each other bidirectionally via serial communication using a custom UART protocol.

## Technology Stack
**Hardware**: FRDM-K64F microcontroller\
**Firmware**: Developed in Simulink and compiles to Embedded C\
**Desktop Application Frontend**: React, TypeScript, PostCSS\
**Desktop Application Backend**: Electron, Node.js, Python\
**Communication Protocol**: Custom UART serial protocol
