import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '46. Embedded Systems/RTOS/index.mdx': `---
title: Real-Time Operating Systems (RTOS)
description: An operating system intended to serve real-time applications that process data as it comes in, typically without buffering delays.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Real-Time Operating Systems (RTOS)">

A standard Operating System (like Windows or Linux) is designed for **Fairness** and **Throughput**. If you click a button, the OS tries to respond quickly, but if a background virus scan is running, the OS might delay your button click by 50 milliseconds. 

A **Real-Time Operating System (RTOS)** is mathematically designed for absolute **Determinism**. 

<Callout icon="warning" title="The Mathematical Deadline">
  In an RTOS, if the car's radar detects an impending crash, the software MUST mathematically guarantee that the brakes are applied within exactly 2.000 milliseconds. If the OS takes 2.001 milliseconds, people die. 
  
  An RTOS is not necessarily "fast." It is mathematically *predictable*.
</Callout>

## Hard vs Soft Real-Time

- **Hard Real-Time:** Missing a mathematical deadline results in total systemic failure (e.g., Pacemakers, Anti-lock Brakes, SpaceX Rocket Engine controllers).
- **Firm Real-Time:** Missing a deadline makes the result completely useless, but nobody dies (e.g., Video conferencing dropping a frame; arriving late is worse than not arriving at all).
- **Soft Real-Time:** Missing a deadline just degrades the user experience (e.g., ATM machine taking 3 seconds to dispense cash instead of 1 second).

## RTOS Mechanics

To achieve determinism, an RTOS mathematically strips out almost everything found in Linux. There is no virtual memory, no complex file system, and no GUI. It is essentially just an incredibly strict, pre-emptive Thread Scheduler that absolutely guarantees the highest-priority thread will always interrupt a lower-priority thread within a fixed number of CPU clock cycles.

</ConceptTemplate>
`,
  '46. Embedded Systems/FreeRTOS/index.mdx': `---
title: FreeRTOS
description: A market-leading real-time operating system (RTOS) for microcontrollers and small microprocessors.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="FreeRTOS"
  subtitle="The undisputed king of microcontrollers"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/FreeRTOS_logo.svg/512px-FreeRTOS_logo.svg.png"
  description="FreeRTOS is a tiny, open-source real-time operating system kernel designed specifically for microcontrollers. It is so small that the core kernel consists of only three C files."
  yearCreated={2003}
  creator="Richard Barry (Now maintained by AWS)"
  isOpenSource={true}
  websiteUrl="https://www.freertos.org/"
>

Writing Bare-Metal C for a microcontroller is fine if you only have one task (e.g., blink an LED). But if you need to blink an LED, poll a temperature sensor, and maintain a Wi-Fi connection simultaneously, writing a single massive \`while(1)\` loop becomes an unmaintainable nightmare.

**FreeRTOS** solves this. It provides a tiny scheduler that allows you to mathematically spawn standard "Tasks" (threads), complete with Mutexes, Semaphores, and Message Queues, even on a chip with only 16KB of RAM.

<Callout icon="success" title="The AWS Acquisition">
  In 2017, Amazon Web Services (AWS) formally took over the stewardship of FreeRTOS. They did this because they realized that to dominate the Internet of Things (IoT) cloud market, they needed the actual endpoint devices to connect seamlessly to AWS IoT Core. AWS provides FreeRTOS completely free, bundled with secure AWS MQTT networking libraries.
</Callout>

## Memory Footprint

FreeRTOS is a marvel of mathematical optimization. The entire OS Kernel compiles down to roughly **4 Kilobytes** of Flash memory, making it perfectly viable to run on $0.20 Cortex-M0 chips.

</TechnologyTemplate>
`,
  '46. Embedded Systems/Zephyr/index.mdx': `---
title: Zephyr RTOS
description: A scalable real-time operating system supporting multiple hardware architectures, optimized for resource-constrained devices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Zephyr"
  subtitle="The modern, Linux-foundation backed RTOS"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Zephyr_Project_logo.svg/512px-Zephyr_Project_logo.svg.png"
  description="Zephyr is a fast-growing, open-source RTOS hosted by the Linux Foundation. It aims to be the 'Linux of the IoT world,' providing a massive, standardized ecosystem of drivers and networking stacks out of the box."
  yearCreated={2016}
  creator="Linux Foundation (Intel, NXP, Nordic)"
  isOpenSource={true}
  websiteUrl="https://www.zephyrproject.org/"
>

While FreeRTOS is the king of tiny, raw kernels, it fundamentally lacks standard drivers. If you want to use I2C on FreeRTOS, you must write the physical I2C registers yourself or use the specific silicon vendor's libraries.

**Zephyr** takes a completely different architectural approach. It attempts to bring the unified, monolithic driver model of Linux to tiny microcontrollers.

<Callout icon="tip" title="The Device Tree">
  Borrowed directly from the Linux Kernel, Zephyr uses a **Device Tree** mathematically mapping every physical pin and sensor on the circuit board into a standardized text file. This means you can write your Zephyr application once, and seamlessly compile it for an STM32, an NXP chip, or a Nordic Bluetooth chip without changing a single line of C code.
</Callout>

## Features

Zephyr is heavier than FreeRTOS, but it mathematically comes with "batteries included":
- A complete, highly certified Bluetooth Low Energy (BLE) stack.
- Native IPv4 / IPv6 network stacks.
- A standardized File System API.
- USB Device and Host stacks.

</TechnologyTemplate>
`,
  '46. Embedded Systems/GPIO/index.mdx': `---
title: GPIO (General-Purpose Input/Output)
description: An uncommitted digital signal pin on an integrated circuit or electronic circuit board which may be used as an input or output.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GPIO (General-Purpose Input/Output)">

**GPIO** is the absolute most fundamental way a computer physically interacts with the real world. 

A GPIO pin is literally a piece of copper wire sticking out of the microcontroller. The software engineer can mathematically configure that pin to act as an **Input** (reading electricity) or an **Output** (generating electricity).

<Callout icon="info" title="The Digital Limitation">
  GPIO pins are strictly **Digital**. They only mathematically understand binary: \`0\` or \`1\`. 
  - On a 3.3V system, Outputting a \`1\` physically sends 3.3 Volts down the wire. Outputting a \`0\` connects the wire to Ground (0 Volts).
  - Reading an Input works the same way: if the external wire has 3.3V, the CPU mathematically reads it as a \`1\`.
</Callout>

## Real-World Applications

- **Output:** Turning on an LED, triggering a massive relay to turn on a 120V AC motor, or sending a clock pulse.
- **Input:** Reading a physical push-button, detecting if a door is open (magnetic reed switch), or receiving a digital interrupt signal from another chip.

By writing a \`1\` and \`0\` to a GPIO pin thousands of times a second (Bit-Banging), an engineer can mathematically simulate complex communication protocols purely in software.

</ConceptTemplate>
`,
  '46. Embedded Systems/ADC/index.mdx': `---
title: Analog-to-Digital Converter (ADC)
description: A system that converts an analog signal, such as a sound picked up by a microphone or light entering a digital camera, into a digital signal.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Analog-to-Digital Converter (ADC)">

While GPIO pins only understand binary (0V or 3.3V), the physical universe does not work in binary. 

Temperature, sound waves, light intensity, and battery levels are all continuous, analog values. An **ADC** is a specialized piece of hardware inside the microcontroller that mathematically translates an infinitely variable analog voltage into a discrete digital number the CPU can understand.

<Callout icon="success" title="The Mathematics of Resolution">
  The precision of an ADC is mathematically defined by its **Bit Resolution**.
  
  If you have a 10-bit ADC measuring a 0 to 5 Volt signal:
  - 10 bits mathematically gives $2^{10} = 1024$ possible values.
  - The ADC divides 5 Volts into 1024 tiny "steps" (each step is 0.0048 Volts).
  - If the physical wire has exactly 2.5 Volts on it, the ADC mathematically returns the integer \`512\` to the C program.
</Callout>

## Sample Rate

In addition to Resolution, ADCs are mathematically bound by their **Sample Rate** (how many times per second they can measure the voltage).
- A slow ADC (10 Hz) is perfectly fine for measuring the temperature of a room.
- A fast ADC (44,100 Hz) is mathematically required to digitize human speech for a microphone (following the Nyquist–Shannon sampling theorem).

</ConceptTemplate>
`,
  '46. Embedded Systems/DAC/index.mdx': `---
title: Digital-to-Analog Converter (DAC)
description: A system that converts a digital signal into an analog signal, the reverse of an ADC.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Digital-to-Analog Converter (DAC)">

A **DAC** is the exact mathematical inverse of an ADC. 

It takes a digital integer generated by the CPU (e.g., \`512\`) and mathematically uses a resistor ladder network inside the silicon to physically output a continuous, fractional analog voltage (e.g., 2.5 Volts) onto a copper pin.

<Callout icon="info" title="Audio Generation">
  The most common use case for a DAC is generating sound. Every time you listen to an MP3 on your phone, the CPU reads the digital 1s and 0s from the file, streams them to the DAC hardware, and the DAC physically creates the continuous analog voltage waveform that forces your headphone speakers to vibrate.
</Callout>

## True Analog vs PWM

Many cheap microcontrollers (like the standard Arduino Uno) **do not have a physical DAC**. They mathematically fake an analog output using a trick called PWM (Pulse Width Modulation). 

A true DAC actually creates the specific target voltage (e.g., 1.2 Volts). True DACs are mathematically required for high-fidelity audio or precise scientific instrumentation.

</ConceptTemplate>
`,
  '46. Embedded Systems/PWM/index.mdx': `---
title: Pulse Width Modulation (PWM)
description: A method of reducing the average power delivered by an electrical signal, by effectively chopping it up into discrete parts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pulse Width Modulation (PWM)">

**PWM** is an incredibly clever mathematical trick used to "fake" an analog voltage using only a strictly digital (binary) GPIO pin.

Because physical components (like an LED or a DC Motor) take time to react, if you turn a digital pin ON and OFF fast enough, the component physically averages out the energy.

<Callout icon="tip" title="The Duty Cycle">
  The mathematical core of PWM is the **Duty Cycle** (the percentage of time the pin is ON vs OFF).
  
  If you switch a 5V pin ON for 50% of the time, and OFF for 50% of the time (doing this 1,000 times a second), the LED physically experiences exactly 2.5 Volts of energy. It will appear exactly 50% bright. The human eye mathematically cannot see the 1,000 Hz flickering.
</Callout>

## Hardware Timers

If the CPU had to manually turn the pin ON and OFF in a \`while\` loop, the CPU would have no time to do anything else.

Therefore, PWM is mathematically handled entirely by isolated **Hardware Timers** inside the silicon. The programmer writes a single configuration byte to a register (e.g., "Set Pin 9 to 25% Duty Cycle at 10 kHz"), and the Timer hardware mathematically takes over the physical pin, allowing the CPU to go back to sleep.

</ConceptTemplate>
`,
  '46. Embedded Systems/UART/index.mdx': `---
title: UART (Universal Asynchronous Receiver-Transmitter)
description: A computer hardware device for asynchronous serial communication in which the data format and transmission speeds are configurable.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="UART (Universal Asynchronous Receiver-Transmitter)">

**UART** is the oldest, simplest, and most legendary serial communication protocol in embedded systems.

It allows two microcontrollers to mathematically talk to each other using exactly two wires: 
- **TX:** Transmit 
- **RX:** Receive

<Callout icon="warning" title="Asynchronous Mathematics">
  Notice there is no Clock wire. It is mathematically **Asynchronous**. 
  
  For UART to work, both the Sender and the Receiver must mathematically agree on the exact speed of transmission beforehand (the **Baud Rate**, usually 9600 or 115200 bits per second). If the Sender sends data at 9600 baud, but the Receiver expects 115200 baud, the Receiver mathematically reads complete gibberish.
</Callout>

## The Data Frame

Because there is no clock wire, the Sender must mathematically frame the data so the Receiver knows when a byte begins and ends:
1. **Start Bit:** The TX line drops from HIGH to LOW for exactly 1 clock cycle.
2. **Data Bits:** The 8 bits of the actual byte are sent sequentially.
3. **Parity Bit:** (Optional) A mathematical checksum bit.
4. **Stop Bit:** The TX line is pulled back HIGH.

UART is famously used for debugging. Almost every embedded engineer connects a UART-to-USB cable to their microcontroller to print console logs to their laptop.

</ConceptTemplate>
`,
  '46. Embedded Systems/I2C/index.mdx': `---
title: I2C (Inter-Integrated Circuit)
description: A synchronous, multi-master, multi-slave, packet switched, single-ended, serial communication bus invented by Philips Semiconductor.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="I2C (Inter-Integrated Circuit)">

If UART is a two-person phone call, **I2C** is a massive corporate conference call.

Invented by Philips in 1982, I2C is a mathematically brilliant protocol that allows a Microcontroller (the Master) to talk to up to **127 different sensors** (Slaves), all using the exact same two wires.

<Callout icon="success" title="The Two Wires">
  - **SCL (Serial Clock):** The Master generates a physical clock wave to mathematically synchronize all chips perfectly.
  - **SDA (Serial Data):** A single bi-directional wire used for sending all data back and forth.
</Callout>

## Mathematical Addressing

Because 127 sensors are physically wired to the exact same SDA copper line, how does the Master talk to just the Temperature Sensor?

Every chip on the bus has a mathematically unique 7-bit physical **Address** (burned into its silicon at the factory). 
1. The Master sends a START condition on the wire.
2. The Master broadcasts the 7-bit Address.
3. Every sensor on the bus mathematically listens. 126 sensors ignore it. The 1 sensor that matches the address wakes up.
4. The Master and that specific Sensor exchange data.

I2C is slow (typically 100 kHz to 400 kHz), but it saves a massive amount of physical wiring on crowded circuit boards.

</ConceptTemplate>
`,
  '46. Embedded Systems/SPI/index.mdx': `---
title: SPI (Serial Peripheral Interface)
description: A synchronous serial communication interface specification used for short-distance communication, primarily in embedded systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SPI (Serial Peripheral Interface)">

If I2C is a slow conference call to 127 people, **SPI** is a blazing-fast, direct mathematical megaphone to a specific person.

Invented by Motorola, SPI abandons the complexity of mathematical addresses. Instead, it relies on brute-force physical wiring to achieve absolute maximum speed.

<Callout icon="tip" title="The Four Wires">
  - **SCLK:** Serial Clock (Synchronous).
  - **MOSI:** Master Out, Slave In (Data from CPU to Sensor).
  - **MISO:** Master In, Slave Out (Data from Sensor to CPU).
  - **CS (Chip Select):** A dedicated, physical wire running from the CPU to ONE specific sensor.
</Callout>

## Blazing Speed

In I2C, the CPU has to waste time mathematically shouting an Address. In SPI, the CPU physically pulls the specific **Chip Select (CS)** wire to LOW. That instantly activates the sensor, and the data transfer begins instantly.

Because SPI has two completely separate data wires (MOSI and MISO), it is mathematically **Full-Duplex**. The CPU can physically send and receive data at the exact same moment.

Because there is no addressing overhead and it is full-duplex, SPI can mathematically run at blazing speeds (often 20 MHz to 50 MHz). It is the absolute standard for reading SD Cards or refreshing TFT LCD Screens where massive data throughput is required.

</ConceptTemplate>
`,
}

async function generateMega83() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega83().catch(console.error)
