import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '46. Embedded Systems/Arduino/index.mdx': `---
title: Arduino
description: An open-source hardware and software company, project, and user community that designs and manufactures single-board microcontrollers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Arduino"
  subtitle="The gateway drug to embedded systems"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Arduino_Logo.svg/512px-Arduino_Logo.svg.png"
  description="Arduino completely revolutionized the embedded industry by taking brutally complex Bare-Metal C programming and wrapping it in an incredibly simple, beginner-friendly C++ abstraction layer."
  yearCreated={2005}
  creator="Massimo Banzi & Team"
  isOpenSource={true}
  websiteUrl="https://www.arduino.cc/"
>

Before 2005, if you wanted to blink an LED, you had to read a 500-page datasheet, buy a $150 proprietary programmer cable, and manually calculate hexadecimal RAM addresses to flip physical hardware bits. 

Arduino mathematically abstracted all of that away with a single C++ function: \`digitalWrite(13, HIGH)\`.

<Callout icon="info" title="The Hardware vs The Framework">
  "Arduino" is actually two different things:
  1. **The Hardware:** The physical blue circuit boards (like the Arduino Uno, which runs on an 8-bit Microchip ATmega328P).
  2. **The Framework:** The open-source C++ library (\`setup()\` and \`loop()\`). Today, the Arduino Framework is mathematically ported to almost every major microcontroller in existence, meaning you can write Arduino code to control powerful 32-bit chips that Arduino didn't even manufacture.
</Callout>

## The Abstraction Cost

While Arduino is brilliant for education and rapid prototyping, it is mathematically inefficient. 

A standard \`digitalWrite()\` call executes roughly 50 machine instructions to check boundaries and map pins safely. Writing directly to the Bare-Metal memory address takes exactly 1 machine instruction. Therefore, the Arduino framework is rarely used in professional, mass-produced consumer electronics where power and speed are critical.

</TechnologyTemplate>
`,
  '46. Embedded Systems/ESP32/index.mdx': `---
title: ESP32
description: A series of low-cost, low-power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ESP32"
  subtitle="The undisputed king of DIY IoT"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Espressif_Systems_logo.svg/512px-Espressif_Systems_logo.svg.png"
  description="Created by Shanghai-based Espressif Systems, the ESP32 mathematically broke the embedded market by offering a powerful 32-bit dual-core processor with built-in Wi-Fi and Bluetooth for less than $3."
  yearCreated={2016}
  creator="Espressif Systems"
  isOpenSource={false}
  websiteUrl="https://www.espressif.com/en/products/socs/esp32"
>

Before the ESP32 (and its predecessor, the ESP8266), adding Wi-Fi to an embedded project was a mathematical nightmare. You had to buy a $40 external Wi-Fi shield and write complex AT-commands over a UART serial connection.

The ESP32 integrated a full 240 MHz dual-core CPU, RAM, Wi-Fi antenna, and Bluetooth radio onto a single piece of silicon. 

<Callout icon="success" title="The RTOS Core">
  Because the ESP32 must mathematically maintain a complex Wi-Fi connection while also running your custom code, it is almost impossible to program it Bare-Metal. Instead, the ESP32's official framework (ESP-IDF) is built entirely on top of **FreeRTOS**. One CPU core mathematically handles the Wi-Fi stack, while the other core executes your application code.
</Callout>

## The Ultimate Hobbyist Chip

Because it is so cheap and mathematically powerful, the ESP32 has become the absolute backbone of the Maker and Smart Home movement (Home Assistant, ESPHome). It is fully compatible with the Arduino C++ Framework and MicroPython.

</TechnologyTemplate>
`,
  '46. Embedded Systems/STM32/index.mdx': `---
title: STM32
description: A family of 32-bit microcontroller integrated circuits by STMicroelectronics, highly popular in professional embedded systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="STM32"
  subtitle="The professional industry standard"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/STM32_Logo.svg/512px-STM32_Logo.svg.png"
  description="The STM32 is a massive family of 32-bit microcontrollers based on the ARM Cortex-M architecture. It is the absolute default choice for professional engineers designing modern consumer electronics."
  yearCreated={2007}
  creator="STMicroelectronics"
  isOpenSource={false}
  websiteUrl="https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html"
>

While hobbyists use Arduino and ESP32, professional engineers designing drones, 3D printers, medical devices, and smartwatches mathematically default to the **STM32**.

<Callout icon="tip" title="The Hardware Abstraction Layer (HAL)">
  STMicroelectronics provides a massive C library called the **HAL (Hardware Abstraction Layer)**. 
  
  Instead of writing raw hexadecimal memory addresses (\`*0x40020000 = 1\`), engineers write \`HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET)\`. It is mathematically vastly faster than Arduino, but much safer and easier to read than raw Bare-Metal C.
</Callout>

## The CubeMX Revolution

Configuring the internal clock tree of an ARM Cortex-M processor requires complex mathematics. To make this easier, ST created **STM32CubeMX**, a GUI software tool. 

Engineers visually click on the pins of the chip they want to use (e.g., "Pin 4 is I2C, Pin 5 is PWM"). The GUI mathematically calculates the clock speeds and automatically generates thousands of lines of boilerplate Bare-Metal C code, instantly ready for the engineer to add their custom logic.

</TechnologyTemplate>
`,
  '46. Embedded Systems/Raspberry Pi/index.mdx': `---
title: Raspberry Pi
description: A series of small single-board computers developed in the UK to promote teaching of basic computer science in schools and in developing countries.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Raspberry Pi"
  subtitle="The bridge between Embedded and Desktop"
  logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Raspberry_Pi_Logo.svg/512px-Raspberry_Pi_Logo.svg.png"
  description="The Raspberry Pi is a Single-Board Computer (SBC). Unlike a microcontroller, it uses a powerful ARM Cortex-A Microprocessor (MPU) capable of running a full Linux Operating System."
  yearCreated={2012}
  creator="Raspberry Pi Foundation"
  isOpenSource={false}
  websiteUrl="https://www.raspberrypi.org/"
>

The Raspberry Pi mathematically blurred the line between the Desktop world and the Embedded world. 

It is powerful enough to plug into a 4K monitor, run a graphical desktop, and browse the web (because it runs a full Linux OS like Debian). However, it also exposes a 40-pin **GPIO Header** directly on the board.

<Callout icon="warning" title="Not Real-Time">
  Because the Pi runs a standard Linux kernel, it is mathematically **NOT Deterministic**. You can easily write a Python script on the Pi to blink an LED, but if you try to control a high-speed CNC laser cutter, the Linux kernel might mathematically decide to pause your Python script for 10 milliseconds to download a background update, physically ruining the laser cut.
</Callout>

## Python First

Because you have the full power of Linux, you don't have to write low-level C. 90% of all Raspberry Pi hardware projects are written in **Python**, utilizing massive libraries like OpenCV for AI computer vision, or NumPy for data processing.

*(Note: In 2021, the Foundation released the Raspberry Pi Pico. Unlike the main Pi, the Pico is a true $4 Microcontroller (RP2040) designed for bare-metal determinism.)*

</TechnologyTemplate>
`,
  '46. Embedded Systems/Automotive embedded/index.mdx': `---
title: Automotive Embedded Systems
description: Specialized embedded systems designed for vehicles, prioritizing extreme safety, real-time determinism, and standardized communication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Automotive Embedded Systems (AUTOSAR & CAN Bus)">

A modern luxury car is mathematically a data center on wheels. It contains over **100 independent microcontrollers** (called ECUs - Electronic Control Units), running over 100 million lines of C code. 

There is an ECU for the engine, an ECU for the brakes, an ECU for the windows, and an ECU for the seat massager.

<Callout icon="success" title="The CAN Bus">
  If you physically wired every ECU directly to every other ECU, the copper wire alone would weigh hundreds of pounds. 
  
  Instead, all ECUs are connected to a single, mathematically robust 2-wire network called the **CAN Bus (Controller Area Network)**. When you press a button on the steering wheel to roll down the window, the steering wheel ECU broadcasts a mathematical packet onto the CAN Bus. The Window ECU mathematically recognizes the packet and activates the motor.
</Callout>

## The AUTOSAR Standard

Because cars are built using parts from 50 different suppliers (Bosch, Continental, Denso), making 100 microcontrollers talk to each other safely was a mathematical nightmare.

In 2003, the industry created **AUTOSAR (Automotive Open System Architecture)**. It is a massive, incredibly strict software architecture standard. It mathematically forces all suppliers to separate their Bare-Metal hardware code from the Application logic, allowing a car manufacturer (like BMW) to easily swap a Bosch chip for a Denso chip without rewriting the fundamental braking logic.

</ConceptTemplate>
`,
  '46. Embedded Systems/Industrial control systems/index.mdx': `---
title: Industrial Control Systems (PLC & Modbus)
description: Computer-based systems that monitor and control industrial processes that exist in the physical world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Industrial Control Systems (PLC & Modbus)">

If you are building an automated robotic factory to manufacture cars, you do not use Arduinos or Raspberry Pis. The electrical noise from massive 480V robotic welding arms would physically scramble the 3.3V memory inside a standard microcontroller, instantly crashing the system.

Instead, factories run on **Programmable Logic Controllers (PLCs)**.

<Callout icon="warning" title="The Physical Armor">
  A PLC is mathematically just a microcontroller, but it is physically encased in heavy armor. Its inputs are mathematically isolated using physical light (Opto-Isolators) so that a 400-volt power surge from a broken motor cannot physically fry the CPU.
</Callout>

## Ladder Logic

PLCs are traditionally NOT programmed in C or Python. Because they were invented in the 1960s to replace physical electrical relays, they are programmed using **Ladder Logic**. This is a visual, graphical programming language that mathematically resembles an electrical wiring diagram, allowing non-software-engineers (electricians) to write and debug factory code.

## The Modbus Protocol

Inside a single circuit board, chips talk via I2C or SPI. Inside a factory, massive PLCs talk to each other over miles of copper wire using **Modbus**. Invented in 1979, Modbus is a brutally simple, serial communication protocol that mathematically guarantees data delivery across highly noisy industrial environments.

</ConceptTemplate>
`,
  '46. Embedded Systems/SCADA/index.mdx': `---
title: SCADA
description: Supervisory control and data acquisition, a control system architecture comprising computers, networked data communications and graphical user interfaces.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SCADA (Supervisory Control and Data Acquisition)">

If a PLC controls a single robotic arm in a factory, **SCADA** is the massive software brain that sits in a central control room and mathematically monitors the entire electrical grid of a country, or the flow of oil through a 1,000-mile pipeline.

<Callout icon="info" title="The High-Level Supervisor">
  SCADA systems do not execute Real-Time mathematical control. If a pipeline pressure valve needs to be shut within 10 milliseconds to prevent an explosion, the local PLC handles that autonomously. 
  
  The SCADA system mathematically polls the PLC every few seconds to gather data, draw historical graphs on a computer screen for human operators, and allow the human to send high-level commands back down to the PLCs.
</Callout>

## Architecture

A standard SCADA system mathematically consists of:
1. **Sensors & Actuators:** The physical reality (valves, pumps).
2. **RTUs / PLCs:** The rugged embedded microcontrollers interacting with the sensors.
3. **Communication Network:** The telemetry layer (often using Radio, Satellite, or Cellular data over hundreds of miles).
4. **HMI (Human-Machine Interface):** The graphical dashboards sitting in the control room.

Because SCADA systems mathematically control the critical physical infrastructure of society (water, power, oil), they are the ultimate target for nation-state Cyberwarfare (e.g., the Stuxnet virus).

</ConceptTemplate>
`,
}

async function generateMega84() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega84().catch(console.error)
