# HeartFlow

HeartFlow is an advanced pacemaker system designed to deliver precise cardiac pacing and monitoring capabilities. It includes firmware for an FRDM-K64F microcontroller to operate pacing behaviour and interact with the emulated heart, and a robust Electron desktop application to control the pacemaker firmware and visualize telemetry data. The firmware and desktop application communicate with each other bidirectionally via serial communication using a custom UART protocol.

## Technology Stack
**Hardware**: FRDM-K64F microcontroller\
**Firmware**: Developed in Simulink and compiles to Embedded C\
**Desktop Application Frontend**: React, TypeScript, PostCSS\
**Desktop Application Backend**: Electron, Node.js, Python\
**Communication Protocol**: Custom UART serial protocol

## Desktop Application

The desktop application is the user interface that allows operators to control the pacemaker and monitor real-time telemetry data. Built using Electron, the app integrates React and TypeScript for the frontend, providing a modern and responsive UI. On the backend, Electron, Node.js, and Python handle the communication with the pacemaker, processing and visualizing data sent over the serial connection. The serial communication is handled by spinning up a webserver to create asynchronous Python processes which interact with the frontend.

<img width="1198" alt="Screenshot 2024-12-21 at 7 59 03 PM" src="https://github.com/user-attachments/assets/f1258f39-d416-46d1-a3ea-addcec325d12" />

### Key Features
- **Control Pacemaker Settings**: Adjust the mode and 15+ pacing parameters in real-time.
- **Electrogram Visualization**: Display the real-time electrogram, providing insights into the heart's activity.
- **Reports and Downloadable Data**: Generate and download detailed cardiac reports to view historical pacing and cardiac data.
- **Multiple User Support**: Allows multiple users to log in securely, with encrypted passwords to ensure data privacy and protection.
- **Patient Data Encryption**: Patient data is stored and transmitted securely with encryption to protect sensitive medical information.
- **Telemetry Status Control**: Manually intiate or terminate communication between the pacemaker and desktop app.

For detailed documentation on the design and implementation of the desktop application, refer to the [DCM Documentation](docs/dcm_docs.pdf).

## Firmware
The pacemaker firmware is developed for the FRDM-K64F microcontroller and is designed to operate low-level hardware functions, such as capacitor charging and discharging to generate heart pulses. The firmware is written in Embedded C, compiled from Simulink models, which provides a high-level, model-driven development approach for efficient and reliable code generation.

### Key Features
- **Pulse Generation**: Operates hardware to generate cardiac pacing signals dependent on the current mode and pacing parameters.
- **Heart Emulation**: Interacts with an emulated heart to simulate real-world heart responses.
- **Low-Level Control**: Manages individual hardware components for accurate pacing behavior.
- **Pacing Parameters and Modes**: Supports 15 pacing parameters and 11 pacing modes, including rate adaptive pacing, to dynamically adjust the pacemaker's operation based on the patient's activity level, physiological demands, and cardiac health.

For more information on the firmware architecture and its interaction with the hardware, see the [Firmware Documentation](docs/pacemaker_docs.pdf).

## Serial Communication
The pacemaker firmware and desktop application communicate using a custom UART serial protocol, enabling seamless data exchange in both directions. This protocol handles all necessary tasks, including sending electrogram data from the pacemaker to the desktop application and transmitting updated parameters from the desktop app to the firmware. 

### Key Features
- **Bidirectional Data Transfer**: Ensures smooth communication between the pacemaker and the desktop application.
- **Real-Time Telemetry**: Electrogram and other data are continuously sent to the desktop application for monitoring.
- **Handshake Process**: Establishes a secure communication link between the pacemaker and the desktop application, ensuring that both devices are synchronized and ready for data exchange. This process is critical for maintaining data integrity and preventing unauthorized communication.
- **Polling Process**: Regularly checks for updated data and system status, ensuring timely updates and avoiding any gaps in the pacemaker's operation. This is crucial for ensuring the pacemaker's real-time response to any adjustments made through the desktop application.
- **Data Confirmation Process**: A two-way confirmation of data transmission ensures that the correct data is sent and received by both devices. After each data exchange, the receiving device sends an acknowledgment to confirm the data's integrity and completeness. This process guarantees that no data is lost or corrupted during transmission, which is crucial for maintaining the pacemaker's reliable operation and safety.

For a comprehensive explanation of the UART protocol and how it's implemented, refer to the [Serial Communication Documentation](docs/serial_protocol_docs.pdf).
