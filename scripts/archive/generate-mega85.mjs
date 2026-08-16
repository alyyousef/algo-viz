import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '47. Internet of Things/IoT architecture/index.mdx': `---
title: IoT Architecture
description: The overarching framework and physical/logical layout that defines how IoT devices connect, process data, and communicate with the cloud.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IoT Architecture">

The **Internet of Things (IoT)** is not a single technology. It is a massive, multi-layered architecture designed to bridge physical reality (the edge) with infinite mathematical processing power (the cloud).

A standard, enterprise-grade IoT Architecture consists of **Four Layers**:

<Callout icon="info" title="The Four Layers">
  1. **The Edge Layer (Devices & Sensors):** The physical microcontrollers (ESP32, STM32) gathering raw data from the physical universe.
  2. **The Network/Gateway Layer:** The local routers or protocols (Wi-Fi, LoRaWAN, BLE) bridging the Edge devices to the public Internet.
  3. **The Data Processing Layer (Cloud):** The massive servers (AWS IoT, Azure IoT) mathematically receiving, ingesting, and storing billions of telemetry data points per second.
  4. **The Application Layer:** The web dashboards, mobile apps, and Machine Learning algorithms that analyze the data and make business decisions.
</Callout>

## The Challenge of Scale

If you build an IoT pet feeder, the architecture is trivial (ESP32 -> Wi-Fi -> Web App). 

If you build an IoT system for a massive global shipping company, the architecture is exponentially harder. You must mathematically handle 500,000 devices dropping offline simultaneously when a ship loses satellite coverage, buffer their telemetry locally, and securely synchronize it back to the cloud days later without overloading the database.

</ConceptTemplate>
`,
  '47. Internet of Things/Sensors/index.mdx': `---
title: IoT Sensors
description: Hardware devices that detect and measure physical properties from the environment and convert them into electrical signals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IoT Sensors">

A microcontroller without a **Sensor** is mathematically blind and deaf. Sensors are the physical eyes and ears of the Internet of Things. 

They physically convert real-world analog phenomena (heat, light, pressure, motion) into digital electrical signals (1s and 0s) that the CPU can mathematically analyze.

<Callout icon="success" title="Types of Sensors">
  - **Environmental:** Thermistors (Temperature), Hygrometers (Humidity), Photoresistors (Light), Barometers (Air Pressure).
  - **Kinematic/Motion:** Accelerometers (G-force), Gyroscopes (Rotation), Magnetometers (Compass direction). Together, these form an IMU (Inertial Measurement Unit).
  - **Proximity:** Ultrasonic (Sound bouncing), LiDAR (Laser bouncing), PIR (Passive Infrared heat detection).
</Callout>

## Digital vs Analog Sensors

- **Analog Sensors:** The sensor simply outputs a raw voltage (e.g., 2.1 Volts). The microcontroller must use its internal **ADC (Analog-to-Digital Converter)** to mathematically translate that voltage into a number.
- **Digital Sensors:** The sensor contains its own microscopic CPU. It calculates the temperature internally and sends the final, mathematically perfect digital number (e.g., \`22.5\`) directly to the main microcontroller over an **I2C or SPI** digital bus.

</ConceptTemplate>
`,
  '47. Internet of Things/Actuators/index.mdx': `---
title: IoT Actuators
description: Hardware devices that receive control signals and convert them into mechanical motion or physical action.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IoT Actuators">

If Sensors are the eyes and ears of an IoT system, **Actuators** are the hands and muscles. 

An Actuator does the exact mathematical opposite of a Sensor. It takes a digital signal from the microcontroller (a \`1\` or \`0\`) and converts it back into physical, real-world energy (motion, heat, light).

<Callout icon="warning" title="The Power Problem">
  A microcontroller pin can only output about 20 milliamps of electricity at 3.3 Volts. That is mathematically barely enough to light up a single, tiny LED. 
  
  If you connect a massive 120V AC water pump directly to a microcontroller pin, the chip will physically explode. Therefore, Actuators heavily rely on **Relays** and **Transistors** (MOSFETs) — electrical switches that allow a tiny 3.3V signal to mathematically trigger a massive 120V power line.
</Callout>

## Types of Actuators

- **Motors:** DC Motors (spinning), Servo Motors (precise angular rotation, e.g., turning a robotic arm exactly 45 degrees), Stepper Motors (precise 3D printer movement).
- **Relays:** Electromechanical switches used to turn on massive industrial heaters, AC units, or house lights.
- **Valves/Solenoids:** Electromagnets used to physically open or close a pipe for water or gas flow.

</ConceptTemplate>
`,
  '47. Internet of Things/Edge computing/index.mdx': `---
title: Edge Computing
description: A distributed computing paradigm that brings computation and data storage closer to the location where it is needed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Edge Computing">

In traditional IoT architectures, a sensor reads data (e.g., a camera takes a photo), blindly sends that massive file up to the AWS Cloud, and the Cloud mathematically processes it using AI to see if a human is in the photo.

**Edge Computing** mathematically reverses this paradigm. It forces the AI processing to happen *locally* on the physical device (the Edge) before sending anything to the cloud.

<Callout icon="tip" title="Why Edge Computing?">
  1. **Latency:** If an autonomous car sees a pedestrian, it mathematically cannot wait 200 milliseconds for a cloud server in Virginia to tell it to brake.
  2. **Bandwidth:** Sending 4K video feeds from 1,000 security cameras to the cloud 24/7 will destroy a factory's internet connection. The Edge processes the video locally and only sends a 1-byte message: "Intruder detected."
  3. **Privacy:** The actual raw video feed never mathematically leaves the physical building.
</Callout>

## TinyML

Edge Computing has given rise to **TinyML**. Engineers are mathematically shrinking massive Neural Networks so they can execute directly on tiny, $3 microcontrollers with only 256KB of RAM, running entirely on coin-cell batteries without any internet connection at all.

</ConceptTemplate>
`,
  '47. Internet of Things/MQTT/index.mdx': `---
title: MQTT
description: A lightweight, publish-subscribe network protocol that transports messages between devices, designed for connections with remote locations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="MQTT"
  subtitle="The absolute standard protocol of IoT"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/MQTT_logo.svg/512px-MQTT_logo.svg.png"
  description="Message Queuing Telemetry Transport (MQTT) is a wildly popular, ultra-lightweight messaging protocol specifically mathematically designed for constrained devices with terrible internet connections."
  yearCreated={1999}
  creator="IBM"
  isOpenSource={true}
  websiteUrl="https://mqtt.org/"
>

If an ESP32 tries to send a standard HTTP REST API request (\`POST /api/temperature\`), the HTTP headers alone are mathematically massive (often 500+ bytes). For a battery-powered device on a weak cellular network, this is completely unacceptable.

**MQTT** solves this. The mathematical overhead of an MQTT message can be as small as **2 bytes**. 

<Callout icon="success" title="The Publish/Subscribe Architecture">
  Unlike HTTP (where the client constantly polls the server), MQTT uses a **Pub/Sub Broker**.
  1. The IoT Thermostat (Publisher) connects to the Broker and publishes a message to a specific string **Topic** (e.g., \`house/livingroom/temp\`).
  2. A Mobile App (Subscriber) connects to the Broker and subscribes to that exact Topic.
  3. The Broker mathematically routes the message instantly. The Thermostat never knows the Mobile App exists.
</Callout>

## Quality of Service (QoS)

MQTT is mathematically designed for terrible networks. It offers three strict Quality of Service levels:
- **QoS 0 (At most once):** "Fire and forget." The sensor sends the data. If it drops, who cares.
- **QoS 1 (At least once):** The sensor sends the data and mathematically waits for an acknowledgment. If it doesn't get one, it sends it again (potentially creating duplicates).
- **QoS 2 (Exactly once):** A complex, 4-step mathematical handshake guaranteeing the message is delivered exactly one time, no matter how bad the network is.

</TechnologyTemplate>
`,
  '47. Internet of Things/CoAP/index.mdx': `---
title: CoAP (Constrained Application Protocol)
description: A specialized web transfer protocol for use with constrained nodes and constrained networks in the Internet of Things.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CoAP (Constrained Application Protocol)">

While MQTT uses the Pub/Sub architecture, many web developers vastly prefer the traditional HTTP REST architecture (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`). 

**CoAP** was created to mathematically shrink the entire HTTP REST paradigm down to a size that can run on a microscopic IoT device.

<Callout icon="info" title="UDP over TCP">
  HTTP and MQTT mathematically rely on **TCP**. TCP requires a massive, complex 3-way handshake to establish a connection, which drains precious battery life.
  
  CoAP mathematically runs entirely over **UDP**. UDP is connectionless. A CoAP sensor simply wakes up, fires a tiny UDP packet containing a \`POST\` request into the void of the internet, and instantly goes back to deep sleep.
</Callout>

## The Binary Translation

Standard HTTP uses heavy, plain-text strings (\`Content-Type: application/json\`). CoAP mathematically translates these HTTP concepts into raw, highly compressed binary headers. 

A full CoAP request (including the REST method, the URI path, and the payload) can mathematically fit inside a single, tiny 10-byte packet.

</ConceptTemplate>
`,
  '47. Internet of Things/LPWAN protocols/index.mdx': `---
title: LPWAN Protocols (LoRaWAN, Sigfox, NB-IoT)
description: Low-power wide-area networks designed to allow long-range communications at a low bit rate among things (connected objects).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LPWAN Protocols">

Wi-Fi is incredibly fast, but its physical range is only about 50 meters, and it consumes massive amounts of battery power.

If you need to track a shipping container across the ocean, or place a soil-moisture sensor in the middle of a 10,000-acre farm, Wi-Fi is mathematically useless. You need an **LPWAN (Low-Power Wide-Area Network)**.

<Callout icon="tip" title="The Mathematical Trade-off">
  In physics (specifically Shannon-Hartley theorem), you can only pick two: **Range, Speed, or Low Power**. 
  
  LPWAN mathematically sacrifices *Speed*. A LoRaWAN sensor can transmit data over **15 kilometers** (Range) while running on a coin battery for **10 years** (Low Power), but its maximum transmission speed is a microscopic **50 bytes per second** (Speed).
</Callout>

## The Major Players

1. **LoRaWAN:** The industry standard open protocol. You can physically buy a $100 LoRa Gateway, put it on your roof, and instantly provide 10 kilometers of IoT coverage to your entire city without paying any cellular company a subscription fee.
2. **Sigfox:** A proprietary, ultra-narrowband network run by a single French company. It requires a subscription but provides massive global coverage.
3. **NB-IoT & LTE-M:** Cellular IoT. Operated by Verizon/AT&T. Devices connect to standard 4G/5G cell towers using specialized, low-power SIM cards.

</ConceptTemplate>
`,
  '47. Internet of Things/Device provisioning/index.mdx': `---
title: Device Provisioning
description: The process of configuring a new IoT device to securely connect to the appropriate cloud services and user accounts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Device Provisioning">

If you build an IoT Smart Bulb, the factory flashes the exact same firmware into 1,000,000 bulbs. 

When a user buys that bulb and plugs it into their wall, how does the bulb mathematically know which Wi-Fi network to connect to, which AWS Cloud endpoint to hit, and which User Account it belongs to?

That highly complex, mathematically secure workflow is called **Device Provisioning**.

<Callout icon="warning" title="The Security Nightmare">
  You cannot hardcode your AWS Database credentials into the firmware. If you do, a hacker can buy one bulb, physically extract the firmware using JTAG, read the hardcoded password, and mathematically destroy your entire cloud database. 
  
  Every single device must be assigned a mathematically unique, asymmetric cryptographic certificate at the factory.
</Callout>

## Provisioning Workflows

The most common consumer provisioning workflow (AP Mode):
1. The unconfigured bulb turns on and broadcasts its own temporary Wi-Fi network (\`SmartBulb-123\`).
2. The user connects their phone to the bulb's Wi-Fi.
3. The phone sends the user's home Wi-Fi credentials to the bulb over a local HTTP connection.
4. The bulb mathematically connects to the home Wi-Fi, reaches out to AWS IoT, presents its unique physical certificate, and is successfully registered to the user's account.

</ConceptTemplate>
`,
  '47. Internet of Things/Device management/index.mdx': `---
title: Device Management
description: The administration and monitoring of IoT devices to ensure they are healthy, secure, and functioning correctly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Device Management">

Provisioning a device is only Day 1. **Device Management** is the mathematical reality of Day 2 to Day 3,650. 

If you have a fleet of 500,000 electric scooters deployed across 100 cities, you mathematically cannot physically send a technician to check if a scooter's battery is dying or if its GPS module has crashed. 

<Callout icon="info" title="The Fleet Fleet Dashboard">
  Enterprise IoT architectures (like AWS IoT Core or Azure IoT Hub) provide massive Device Management dashboards. They mathematically track:
  - **Liveness:** Is the device online? (Tracked via MQTT Keep-Alive heartbeats).
  - **Telemetry:** What is the current state? (Battery level, CPU temperature).
  - **Commands:** The ability to execute a Remote Procedure Call (RPC) to force a specific scooter to physically lock its wheels.
</Callout>

## The Shadow State (Device Twin)

What happens if you send a command to "Turn Off" a scooter, but the scooter is driving through a tunnel and has no cellular connection?

IoT systems solve this using a **Device Shadow**. The Cloud mathematically stores a JSON document representing the *desired* state of the device. When the scooter finally exits the tunnel and reconnects to the internet, it reads its Shadow JSON, sees the desired state is "Off", and physically executes the command.

</ConceptTemplate>
`,
  '47. Internet of Things/OTA updates/index.mdx': `---
title: Over-The-Air (OTA) Updates
description: The wireless delivery of new software, firmware, or other data to mobile devices or IoT hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Over-The-Air (OTA) Updates">

If an engineer discovers a critical security vulnerability in the C code of an IoT door lock, the company mathematically cannot recall 500,000 door locks. They must wirelessly beam a new \`.bin\` firmware file directly into the physical Flash memory of every lock in the world. 

This is an **Over-The-Air (OTA) Update**.

<Callout icon="error" title="The Brick Risk">
  OTA is the most mathematically dangerous operation in embedded systems. If a door lock is downloading the new firmware over Wi-Fi and the homeowner's router crashes halfway through, the firmware file is mathematically corrupted. If the device tries to boot corrupted firmware, it becomes a permanent "brick," physically destroying the device forever.
</Callout>

## The A/B Partition Architecture

To prevent bricking, all modern, professional IoT devices mathematically divide their physical Flash memory exactly in half (Partition A and Partition B).

1. The device is currently running firmware from Partition A.
2. The OTA update begins. The device downloads the new firmware and writes it exclusively into Partition B.
3. The device mathematically verifies the SHA-256 cryptographic hash of Partition B to ensure perfection.
4. The Bootloader is mathematically instructed to boot from Partition B on the next restart.
5. If Partition B immediately crashes upon boot, the Bootloader automatically detects the failure and physically rolls back to Partition A, saving the device from destruction.

</ConceptTemplate>
`,
}

async function generateMega85() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega85().catch(console.error)
