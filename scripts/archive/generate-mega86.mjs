import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '47. Internet of Things/AWS IoT/index.mdx': `---
title: AWS IoT
description: Amazon Web Services' managed cloud platform that lets connected devices easily and securely interact with cloud applications and other devices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="AWS IoT (Internet of Things)"
  subtitle="The undisputed market leader in Cloud IoT"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png"
  description="AWS IoT Core is a massive, highly scalable managed cloud service that allows billions of physical devices to connect and route trillions of MQTT messages to AWS services securely."
  yearCreated={2015}
  creator="Amazon Web Services"
  isOpenSource={false}
  websiteUrl="https://aws.amazon.com/iot/"
>

If you build an IoT thermostat, you do not want to mathematically manage the scaling of a massive Mosquitto MQTT broker on an EC2 instance. If 1,000,000 thermostats all try to reconnect at the exact same millisecond after a power outage, your EC2 instance will instantly crash.

**AWS IoT Core** mathematically handles this massive, instantaneous spike in TCP connections seamlessly.

<Callout icon="success" title="The Rules Engine">
  The true mathematical power of AWS IoT is its **Rules Engine**. 
  
  When a thermostat publishes a tiny MQTT JSON message (\`{"temp": 72}\`), the Rules Engine intercepts it. You can write a SQL-like rule: \`SELECT * FROM 'house/temp' WHERE temp > 80\`. If the rule triggers, AWS automatically routes that specific message to AWS Lambda, AWS DynamoDB, or AWS Kinesis, instantly integrating physical reality with the massive AWS cloud ecosystem.
</Callout>

## The FreeRTOS Synergy

To physically lock in enterprise customers, Amazon legally acquired the **FreeRTOS** operating system. They bundled AWS IoT cryptographic libraries directly into the RTOS kernel, meaning if a company uses FreeRTOS on their microcontrollers, the mathematical path of least resistance is to exclusively use AWS IoT in the cloud.

</TechnologyTemplate>
`,
  '47. Internet of Things/Azure IoT/index.mdx': `---
title: Azure IoT
description: Microsoft's collection of Microsoft-managed cloud services that connect, monitor, and control billions of IoT assets.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Azure IoT"
  subtitle="The enterprise and industrial giant"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/512px-Microsoft_Azure_Logo.svg.png"
  description="Azure IoT Hub is Microsoft's direct competitor to AWS IoT. While AWS dominates consumer IoT, Azure heavily dominates the Industrial and Enterprise Manufacturing sectors."
  yearCreated={2016}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://azure.microsoft.com/en-us/solutions/iot/"
>

**Azure IoT Hub** is fundamentally mathematically similar to AWS IoT Core (it provides massive, scalable MQTT brokering and Device Twin shadowing), but its business strategy is completely different.

Microsoft heavily targets **Enterprise Manufacturing**. Factories that already use Microsoft Active Directory, Windows Server, and C# .NET naturally gravitate toward Azure IoT to manage their massive robotic assembly lines.

<Callout icon="tip" title="Azure IoT Edge">
  Microsoft's greatest mathematical advantage in this space is **Azure IoT Edge**. 
  
  Instead of sending all factory data to the cloud, Azure IoT Edge allows a factory to install a local server (acting as the Edge Gateway). This gateway mathematically runs Docker containers containing custom Azure Machine Learning models. The factory robots send telemetry to the local gateway, the AI mathematically evaluates it instantly, and only the summarized business intelligence is forwarded to the global Azure Cloud.
</Callout>

## Azure Sphere

To guarantee absolute security for physical devices, Microsoft created **Azure Sphere**—a highly secure, mathematically verified Linux-based operating system designed to run on specific, certified microcontrollers.

</TechnologyTemplate>
`,
  '47. Internet of Things/Google Cloud IoT/index.mdx': `---
title: Google Cloud IoT Core
description: A fully managed service that allowed you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Google Cloud IoT Core"
  subtitle="The graveyard of a massive ecosystem"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png"
  description="Google Cloud IoT Core was Google's official, highly scalable MQTT broker and device management platform, designed to compete with AWS and Azure."
  yearCreated={2017}
  creator="Google"
  isOpenSource={false}
  websiteUrl="https://cloud.google.com/iot-core"
>

Historically, Google Cloud provided **IoT Core**, which was mathematically excellent. It integrated seamlessly with Google Pub/Sub and BigQuery for massive, real-time data analytics.

However, in August 2022, Google did what Google is famous for doing: they announced they were mathematically **killing the product**.

<Callout icon="error" title="The Sunsetting Disaster">
  Google officially shut down IoT Core in August 2023. 
  
  This was an absolute mathematical disaster for companies that had built their physical hardware around Google's specific MQTT endpoints and cryptographic workflows. Migrating 100,000 physical devices in the field to AWS or Azure via an Over-The-Air (OTA) update before the deadline was a nightmare. 
</Callout>

## The Aftermath

Google's decision mathematically destroyed their reputation in the enterprise hardware sector. Because physical hardware cannot be easily updated if an OTA fails, hardware companies demand 15-year guarantees on cloud infrastructure. Today, almost no major enterprise trusts Google Cloud for raw IoT Device Management, defaulting entirely to AWS or Azure.

</TechnologyTemplate>
`,
  '47. Internet of Things/Digital twins/index.mdx': `---
title: Digital Twins
description: A virtual representation that serves as the real-time digital counterpart of a physical object or process.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Digital Twins">

If you build a massive, $500 Million jet engine for an airplane, how do you mathematically know when it is going to break down *before* it actually breaks down in mid-air?

You build a **Digital Twin**.

<Callout icon="info" title="The Virtual Clone">
  A Digital Twin is a perfect mathematical and 3D simulation of a physical object, running entirely on a cloud server. 
  
  As the physical jet engine flies, its thousands of physical IoT sensors stream real-time data (heat, vibration, RPM) directly into the mathematical simulation. The simulation instantly updates to mirror physical reality.
</Callout>

## Predictive Maintenance

The true power of a Digital Twin is **Time Travel**.

Because the Digital Twin is a mathematical simulation, engineers can fast-forward the physics engine. They can mathematically apply the real-time wear-and-tear data to the simulation, run the simulation at 1,000x speed, and mathematically prove that a specific fan blade will snap in exactly 45 days. 

This enables **Predictive Maintenance**—fixing the hardware exactly 1 day before it breaks, preventing catastrophic failure while maximizing the lifespan of the part.

</ConceptTemplate>
`,
  '47. Internet of Things/Industrial IoT (IIoT)/index.mdx': `---
title: Industrial IoT (IIoT)
description: The use of smart sensors and actuators to enhance manufacturing and industrial processes. Also known as Industry 4.0.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Industrial IoT (IIoT)">

Consumer IoT is a smart toaster. **Industrial IoT (IIoT)** is a smart oil refinery.

Also known as **Industry 4.0**, IIoT is the mathematical convergence of classical Operational Technology (OT) — the PLCs and SCADA systems that run factories — with modern Information Technology (IT) — the Cloud, Big Data, and AI.

<Callout icon="warning" title="The Culture Clash">
  For decades, the OT world (Factory floor) and the IT world (Corporate servers) mathematically hated each other. 
  - **OT priorities:** Absolute physical safety, 100% uptime, deterministic 5-millisecond latency. They never connect to the Internet.
  - **IT priorities:** Rapid iteration, Agile deployments, Public Cloud integration, and Big Data.
</Callout>

## The IT/OT Convergence

IIoT mathematically forces these two worlds to merge. The factory floor (OT) must securely stream its massive telemetry to the Cloud (IT) so that Machine Learning algorithms can optimize the supply chain.

To do this safely without exposing a robotic arm to a hacker on the public internet, IIoT heavily relies on **Edge Gateways**, strict **VLAN segmentation**, and specialized protocols like **OPC UA**, which mathematically standardizes data structures between 40-year-old factory machines and modern cloud databases.

</ConceptTemplate>
`,
  '47. Internet of Things/IoT security/index.mdx': `---
title: IoT Security
description: The area of endeavor concerned with safeguarding connected devices and networks in the Internet of things.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="IoT Security">

Historically, the Internet of Things is a mathematical security nightmare. 

In the 2010s, manufacturers built millions of cheap, Linux-based security cameras and smart fridges, hardcoded the default password as \`admin\`, and connected them directly to the public internet.

<Callout icon="error" title="The Mirai Botnet">
  In 2016, hackers wrote a simple script that scoured the internet for IoT devices, tried the default \`admin\` password, and instantly infected them. 
  
  This created the **Mirai Botnet** — a mathematically massive army of 600,000 hacked smart TVs and webcams. The hackers commanded the army to execute a massive DDoS attack against Dyn (a major DNS provider), mathematically taking down Twitter, Netflix, and Reddit across the entire East Coast of the United States.
</Callout>

## The Three Pillars of IoT Security

Modern, professional IoT architecture mathematically demands three absolute requirements:
1. **Secure Boot:** The microcontroller's Bootloader mathematically verifies the cryptographic signature of the firmware before executing it. If a hacker physically flashes modified firmware via JTAG, the CPU refuses to boot.
2. **Mutual Authentication (mTLS):** The device does not just send a password to the Cloud. The Cloud mathematically verifies the physical X.509 certificate of the device, and the device mathematically verifies the certificate of the Cloud, ensuring neither is an imposter.
3. **No Inbound Open Ports:** An IoT device should NEVER have an open listening port (like SSH or HTTP). The device must only make *outbound* connections to the MQTT Broker.

</ConceptTemplate>
`,
}

async function generateMega86() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega86().catch(console.error)
