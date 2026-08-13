import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/47. Internet of Things/IoT architecture/index.mdx': `---
title: IoT Architecture
description: "The structural framework outlining the physical and logical components that make up an Internet of Things system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="IoT Architecture">

The Internet of Things (IoT) is not a single technology, but a massive architectural pipeline that stretches from microscopic sensors in a farm field to massive data warehouses in the Cloud.

While implementations vary, almost all enterprise IoT architectures follow a standard **4-Stage Reference Architecture**.

## The 4 Stages of IoT

<ComparisonTable 
  headers={['Stage', 'Name', 'Description']} 
  rows={[
    ['Stage 1', 'Sensors & Actuators', 'The physical "edge". Sensors collect data from the environment (temperature, vibration). Actuators perform physical actions (turn on a valve). These are usually low-power microcontrollers.'],
    ['Stage 2', 'Internet Gateways / Data Acquisition', 'Sensors often use short-range protocols (Bluetooth, Zigbee). The Gateway acts as a bridge, collecting local data, digitizing it, and pushing it securely to the internet via Wi-Fi or Cellular.'],
    ['Stage 3', 'Edge IT (Edge Computing)', 'If 10,000 sensors are emitting data every second, sending it all to the cloud is too expensive. Edge IT servers sit near the gateway to filter, compress, and perform initial machine learning on the data.'],
    ['Stage 4', 'Cloud Data Center', 'The final destination. Massive computing power is used to store historical data, perform deep analytics, and integrate the data with enterprise business systems (ERP, CRM).']
  ]} 
/>

## Key Challenges
Building an IoT architecture introduces unique challenges not seen in standard web development:
- **Connectivity Issues**: Devices are often in rural areas or basements with terrible cell service. Protocols must be highly resilient to connection drops.
- **Power Constraints**: Devices must run on batteries for 5-10 years without intervention.
- **Security**: A compromised web server is bad; a compromised smart lock on a home is physically dangerous.

<Callout icon="info" title="The Scale Problem">
If you build a web app, you might have 1 web server and 1 database. If you build an IoT system, you might have **10 million** physical devices scattered across the globe, all running different versions of firmware, and all requiring secure certificates. Managing this fleet is often the hardest part of IoT.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/MQTT/index.mdx': `---
title: MQTT (Message Queuing Telemetry Transport)
description: "A lightweight, publish-subscribe network protocol that transports messages between devices, designed specifically for constrained IoT networks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="MQTT (Message Queuing Telemetry Transport)">

If HTTP is the language of the Web, **MQTT** is the language of the Internet of Things. 

Invented in 1999 to monitor oil pipelines over expensive, unreliable satellite links, MQTT was designed to be incredibly lightweight. It uses a **Publish/Subscribe (Pub/Sub)** architecture, completely decoupling the devices sending data from the applications receiving it.

## The Pub/Sub Model
In HTTP, a client connects directly to a server and asks for data. 
In MQTT, clients never talk to each other directly. Instead, they all connect to a central server called the **MQTT Broker**.

1. **Publish**: A temperature sensor publishes a message TICK1"22.5"TICK1 to a specific "Topic", like TICK1home/livingroom/temperatureTICK1.
2. **Subscribe**: A smart thermostat app subscribes to the topic TICK1home/livingroom/temperatureTICK1.
3. **Routing**: When the Broker receives the message from the sensor, it immediately pushes it to the thermostat app (and any other apps listening to that topic).

## Why MQTT is Perfect for IoT
- **Tiny Overhead**: An HTTP header can be hundreds of bytes. An MQTT header is as small as 2 bytes. This saves massive amounts of battery and cellular bandwidth.
- **Quality of Service (QoS)**: MQTT has three levels of guarantee:
  - **QoS 0 (At most once)**: Fire and forget. (Good for frequent sensor readings).
  - **QoS 1 (At least once)**: Guaranteed delivery, but might arrive twice.
  - **QoS 2 (Exactly once)**: Safest, but slowest. (Good for billing systems).
- **Last Will and Testament (LWT)**: If a device suddenly loses power or cell service, the Broker will automatically publish a pre-configured "death certificate" message to notify the rest of the system that the device has flatlined.

<Callout icon="tip" title="Popular Brokers">
**Mosquitto** is the most popular open-source MQTT broker for small/medium projects. Enterprise cloud providers (AWS IoT Core, Azure IoT Hub) heavily use MQTT under the hood to ingest data.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/CoAP/index.mdx': `---
title: CoAP (Constrained Application Protocol)
description: "A specialized web transfer protocol for use with constrained nodes and constrained networks in the Internet of Things."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="CoAP (Constrained Application Protocol)">

While MQTT uses a Publish/Subscribe model, some IoT applications still require a traditional Request/Response model (just like HTTP). However, HTTP is far too heavy for battery-powered microcontrollers.

**CoAP** was designed to be "HTTP for the Internet of Things." It maps perfectly to HTTP semantics (GET, POST, PUT, DELETE), but is dramatically stripped down to run over UDP instead of TCP.

## CoAP vs MQTT

<ComparisonTable 
  headers={['Feature', 'CoAP', 'MQTT']} 
  rows={[
    ['Architecture', 'Request/Response (Client/Server)', 'Publish/Subscribe (Broker)'],
    ['Transport Protocol', 'UDP (Fast, no handshake overhead)', 'TCP (Reliable, but heavy)'],
    ['Header Size', '4 Bytes', '2 Bytes'],
    ['Best For', 'State transfer, querying specific devices (e.g., "Are you locked?")', 'Telemetry, streaming constant data (e.g., "Here is my temperature.")']
  ]} 
/>

## Key Features of CoAP
1. **UDP Based**: By ditching TCP, CoAP avoids the expensive 3-way handshake. This means a device can wake up from deep sleep, fire off a UDP packet, and go back to sleep in milliseconds, saving massive amounts of battery.
2. **Observe Pattern**: CoAP extends standard HTTP with an TICK1ObserveTICK1 flag. A client can send a GET request for TICK1/temperatureTICK1 with the Observe flag. Instead of returning once, the server will keep the connection conceptually open and push new responses whenever the temperature changes.
3. **Built-in Discovery**: Because CoAP devices might be on local mesh networks, CoAP includes standard mechanisms for devices to broadcast their existence and discover each other locally.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/Edge computing/index.mdx': `---
title: Edge Computing
description: "A distributed computing paradigm that brings computation and data storage closer to the sources of data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Edge Computing">

In traditional cloud computing, sensors collect data and blindly stream it across the internet to massive AWS or Azure data centers for processing. 

**Edge Computing** flips this model. Instead of moving data to the computer, it moves the computer to the data. Small, powerful servers (the "Edge") are placed physically on-site (in a factory, in a hospital, or inside a self-driving car) to process the data immediately.

## Why is Edge Computing Necessary?

1. **Latency**: A self-driving car traveling at 70 MPH cannot wait 150 milliseconds for a server in Virginia to tell it to hit the brakes. The AI model must run on a GPU inside the trunk of the car (the Edge) to react in 5 milliseconds.
2. **Bandwidth Costs**: A modern jet engine generates a terabyte of diagnostic data per flight. Sending this over an expensive satellite connection would cost thousands of dollars. The Edge computer on the plane filters the data, throwing away 99% of it, and only transmits anomalies to the cloud.
3. **Privacy and Security**: Security cameras in a hospital might use Edge computing to run facial recognition locally, blurring out faces *before* the video is ever uploaded to the cloud, ensuring compliance with privacy laws.
4. **Offline Capability**: If a tractor on a farm loses cellular connection, it can still use its Edge server to navigate the field and operate autonomously.

<Callout icon="warning" title="The Convergence">
The lines between Cloud and Edge are blurring. Technologies like **Kubernetes** are heavily used to manage Edge deployments, allowing engineers to deploy Docker containers to a server in a factory exactly the same way they deploy to a server in AWS.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/Digital twins/index.mdx': `---
title: Digital Twins
description: "A virtual representation that serves as the real-time digital counterpart of a physical object or process."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Digital Twins">

A **Digital Twin** is a living, breathing 3D simulation of a physical object—continuously updated with real-time data from IoT sensors.

It goes beyond standard monitoring dashboards (which just show graphs and charts) by creating a highly accurate virtual model that behaves exactly like its physical counterpart.

## The Three Elements of a Digital Twin
1. **The Physical Object**: A wind turbine in the real world, equipped with hundreds of IoT sensors measuring rotation speed, vibration, and temperature.
2. **The Virtual Model**: A precise CAD model of the turbine running in a physics engine in the cloud.
3. **The Data Link**: The continuous stream of IoT telemetry syncing the physical and virtual objects.

## Why Use Digital Twins?
- **Predictive Maintenance**: By feeding real-time vibration data into the digital twin, engineers can run fast-forward simulations to predict exactly when a specific gear will break, replacing it two weeks *before* it causes a catastrophic failure.
- **Safe Experimentation**: If a city wants to see how changing traffic light timings will affect rush hour, they don't test it on real cars. They test the new algorithm on the city's Digital Twin.
- **Remote Diagnostics**: Instead of flying an expert to an oil rig in the ocean, the expert puts on a VR headset and inspects the real-time Digital Twin of the rig's machinery.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/Sensors/index.mdx': `---
title: Sensors
description: "A device that detects and responds to some type of input from the physical environment and converts it into a digital signal."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Sensors">

Sensors are the "eyes and ears" of an IoT system. They take continuous, analog physical phenomena (heat, light, pressure) and convert them into discrete digital data that microcontrollers can understand.

## Types of Sensors

<ComparisonTable 
  headers={['Category', 'Examples', 'Common Use Cases']} 
  rows={[
    ['Environmental', 'Thermistor, Hygrometer (Humidity), Barometer', 'Smart thermostats, weather stations, cold-chain food transport.'],
    ['Motion & Position', 'Accelerometer, Gyroscope, GPS', 'Fitness trackers, drone stabilization, fleet tracking.'],
    ['Optical / Vision', 'Photoresistor (LDR), Infrared (IR), LiDAR', 'Automatic streetlights, security cameras, autonomous vehicles.'],
    ['Proximity / Presence', 'Ultrasonic, PIR (Passive Infrared)', 'Automatic doors, robot vacuums, room occupancy tracking.']
  ]} 
/>

## How Analog Becomes Digital
The physical world is analog (infinite decimal places). Microcontrollers are digital (1s and 0s). 
To bridge this gap, MCUs use an **ADC (Analog-to-Digital Converter)**.

1. A temperature sensor changes its electrical resistance based on the heat of the room.
2. This creates a fluctuating analog voltage between 0V and 3.3V.
3. The ADC slices this voltage range into discrete steps. For example, a 10-bit ADC has 1,024 steps (from TICK10TICK1 to TICK11023TICK1).
4. If the voltage is exactly 1.65V (halfway), the ADC reports the digital integer TICK1512TICK1 to the software.

## Calibration and Noise
Raw sensor data is notoriously noisy. A temperature sensor sitting on a desk might rapidly output: TICK122.1, 22.9, 21.8, 22.2TICK1. IoT engineers must write software filters (like Moving Averages or Kalman Filters) to smooth out the noise and find the true signal.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/Actuators/index.mdx': `---
title: Actuators
description: "A component of a machine that is responsible for moving and controlling a mechanism or system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Actuators">

If Sensors are the "eyes and ears" of an IoT system, **Actuators** are the "hands and muscles". They take digital commands from a Microcontroller and convert them back into physical, mechanical action.

Without actuators, an IoT system is just a passive monitoring tool. Actuators allow the system to physically change its environment.

## Common Types of Actuators

- **Motors (DC, Stepper, Servo)**: Used for precise mechanical movement. (e.g., A smart blind that rolls up, a robotic arm on a factory line).
- **Relays**: Electromechanical switches. A microcontroller operating at 3.3V cannot safely turn on a 120V household lamp. It uses a Relay: the tiny 3.3V signal powers an electromagnet, which physically pulls a metal switch closed to safely connect the dangerous 120V circuit.
- **Solenoids**: A coil of wire that creates a magnetic field to linearly push or pull a metal rod. (e.g., The mechanism that physically locks and unlocks a smart door lock).
- **Valves**: Used in industrial IoT and smart agriculture to control the flow of liquids or gases.

<Callout icon="warning" title="The Security Threat">
Actuators dramatically increase the risk profile of an IoT system. If a hacker breaches a smart thermometer (a sensor), they can read your data. If they breach a smart lock or an industrial valve (actuators), they can physically break into your house or cause an oil pipeline to burst. Security in actuating systems must be paramount.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/47. Internet of Things/OTA updates/index.mdx': `---
title: OTA Updates (Over-The-Air)
description: "The wireless delivery of new software, firmware, or other data to mobile devices and IoT endpoints."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Over-The-Air (OTA) Updates">

In traditional embedded engineering, if a bug was found in a pacemaker or a car's engine controller, the manufacturer had to issue a massive, expensive physical recall.

**Over-The-Air (OTA)** updates changed the paradigm. Devices can now download patches over Wi-Fi or Cellular networks and automatically flash their own microcontrollers, fixing bugs or adding new features while the device sits in the customer's driveway.

## The A/B Partition Architecture
Flashing firmware is dangerous. If the device loses battery power when the update is 50% written to memory, the device is "bricked"—it no longer has a functional operating system and is permanently dead.

To prevent this, almost all OTA architectures use an **A/B Partition Scheme**.

<ComparisonTable 
  headers={['Step', 'Action', 'Memory State']} 
  rows={[
    ['1. Normal Operation', 'The device runs off Partition A. Partition B is empty.', 'Running: A'],
    ['2. Downloading', 'The device continues running normally on Partition A, while secretly downloading the new update into Partition B in the background.', 'Running: A | Writing: B'],
    ['3. Reboot', 'The device reboots and the Bootloader is instructed to switch pointers and boot from Partition B.', 'Running: B'],
    ['4. Fallback (Safety)', 'If Partition B crashes on boot, the Bootloader automatically switches the pointer back to Partition A, restoring the device to its previous working state.', 'Reverted to A']
  ]} 
/>

## Cryptographic Security
Because an OTA update is literally rewriting the core brain of the device, it is the ultimate target for hackers.

To prevent a hacker from pushing malicious firmware, the binary payload must be cryptographically signed (usually using Asymmetric Encryption like RSA or ECDSA). The device's Bootloader will mathematically verify the signature against a hardcoded public key before it ever attempts to write the payload to memory.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
