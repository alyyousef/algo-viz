import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '46. Embedded Systems/Microcontrollers/index.mdx': `---
title: Microcontrollers (MCU)
description: A small computer on a single integrated circuit containing a processor core, memory, and programmable input/output peripherals.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microcontrollers (MCU)">

A **Microcontroller (MCU)** is essentially an entire computer squeezed onto a single, microscopic piece of silicon, designed for a highly specific, low-power task.

When you push a button on your microwave, the 32-bit CPU inside your laptop doesn't wake up to turn on the light. The microwave uses a $0.50 Microcontroller.

<Callout icon="info" title="The System on a Chip (SoC)">
  Unlike a desktop PC (where the CPU, RAM, and Hard Drive are separate physical chips on a massive motherboard), an MCU contains all three strictly baked into the same piece of silicon:
  - **The Core:** A tiny, weak CPU (often running at just 16 MHz).
  - **The RAM:** Microscopic working memory (often 2KB to 32KB).
  - **The Flash:** Microscopic non-volatile storage for the code (often 32KB to 256KB).
  - **Peripherals:** Built-in hardware to talk to sensors (I2C, SPI, ADC).
</Callout>

## Extreme Constraints

Writing software for an MCU is entirely different from writing Web or Desktop software. 
- You usually do not have an Operating System. 
- You mathematically cannot allocate 1 Megabyte of RAM because the chip physically only has 8 Kilobytes. 
- If you write an infinite loop that crashes, you cannot just "Task Manager" kill it; the user physically has to unplug the microwave from the wall. 
- Therefore, MCU software (Firmware) is typically written in raw **C or C++**, heavily optimized for byte-perfect memory management.

</ConceptTemplate>
`,
  '46. Embedded Systems/Microprocessors/index.mdx': `---
title: Microprocessors (MPU)
description: A computer processor that incorporates the functions of a central processing unit on a single or few integrated circuits.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Microprocessors (MPU)">

While the terms are often confused by beginners, a **Microprocessor (MPU)** is mathematically and architecturally distinct from a Microcontroller (MCU).

An MPU is the brain. It is the raw CPU (like an Intel Core i9 or an Apple M3).

<Callout icon="warning" title="The Missing Pieces">
  Crucially, an MPU *cannot function on its own*. It contains zero RAM and zero Flash Storage. To build a system with an MPU, an engineer must mathematically wire it on a motherboard to external DDR4 RAM chips, an external NVMe SSD, and external networking chips.
</Callout>

## MPU vs MCU in Embedded Systems

<ComparisonTable 
  headers={['Feature', 'Microcontroller (MCU)', 'Microprocessor (MPU)']}
  rows={[
    ['Components', 'CPU, RAM, Flash, Peripherals ALL on one chip.', 'Raw CPU only. Requires external RAM and Storage chips.'],
    ['Power', 'Extremely low power (can run on a coin battery for years).', 'High power (requires heat sinks and large batteries).'],
    ['Clock Speed', 'Slow (~16 MHz to 200 MHz).', 'Fast (~1 GHz to 5 GHz).'],
    ['Operating System', 'None (Bare-Metal) or tiny RTOS (FreeRTOS).', 'Runs full OS (Linux, Windows, Android).'],
    ['Examples', 'Arduino (ATmega328P), STM32, ESP32.', 'Raspberry Pi (Broadcom BCM2711), Intel Core, AMD Ryzen.']
  ]}
/>

</ConceptTemplate>
`,
  '46. Embedded Systems/ARM Cortex-M-A/index.mdx': `---
title: ARM Cortex Architecture (M vs A)
description: The dominant family of reduced instruction set computing (RISC) architectures for computer processors, configured for various environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ARM Cortex Architecture (M vs A)">

Today, the **ARM** architecture mathematically dominates 99% of the embedded and mobile world. Unlike Intel (which manufactures physical silicon), ARM only designs the mathematical blueprints for CPUs and licenses them to companies like Apple, Samsung, and STMicroelectronics.

ARM split its processor designs into three distinct profiles (Cortex-A, Cortex-R, and Cortex-M).

<Callout icon="success" title="Cortex-A (Application)">
  The **"A"** stands for Application. These are massive, high-performance Microprocessors (MPUs) designed to run complex operating systems like Linux, Android, or iOS. They have a Memory Management Unit (MMU) to handle Virtual Memory. Your iPhone and the Raspberry Pi both use Cortex-A processors.
</Callout>

## Cortex-M (Microcontroller)

The **"M"** stands for Microcontroller. These are deeply embedded, low-power, mathematically deterministic chips.

They completely lack an MMU (meaning they cannot run standard Linux), and they execute code directly from raw physical memory. 
- **Cortex-M0:** The absolute cheapest, weakest chip (often replacing 8-bit processors in toys).
- **Cortex-M4:** Includes a floating-point mathematical unit (FPU) and Digital Signal Processing (DSP) instructions.
- **Cortex-M7:** High-end microcontrollers used in drones and advanced robotics.

*(Note: There is also Cortex-R for strictly Real-Time safety-critical systems like car brakes.)*

</ConceptTemplate>
`,
  '46. Embedded Systems/Bare-metal programming/index.mdx': `---
title: Bare-Metal Programming
description: Programming that operates without the abstraction of an operating system, interacting directly with hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bare-Metal Programming">

When you write a Python script, it is mathematically abstracted through five layers of software: The Python Interpreter, the C Standard Library, the Operating System Kernel, the Hardware Drivers, and finally the Silicon.

**Bare-Metal Programming** strips all of that away. You are writing code that executes directly on the physical silicon with zero Operating System. 

<Callout icon="tip" title="No Safety Nets">
  In Bare-Metal, there is no \`printf()\`. There is no \`malloc()\`. If you want to turn on an LED, you mathematically calculate the exact hexadecimal memory address of the physical copper pin on the chip (e.g., \`0x40020000\`), and you write a \`1\` directly to that physical RAM register.
</Callout>

## The Mathematics of Memory-Mapped I/O

In Bare-Metal C, peripherals (like pins, timers, or UART radios) are physically wired to specific RAM addresses. You control the hardware by reading and writing raw pointers.

\`\`\`c
// The raw memory address of GPIO Port A on an STM32
#define GPIOA_ODR ((volatile uint32_t*) 0x40020014)

void turnOnLED() {
    // We are mathematically forcing the 5th bit of this physical memory address to 1.
    // This instantly sends 3.3 volts of physical electricity down Pin 5.
    *GPIOA_ODR |= (1 << 5); 
}
\`\`\`

The \`volatile\` keyword is mathematically critical here. It tells the C Compiler: *"Do not optimize this pointer away! I am talking to physical hardware, not regular RAM."*

</ConceptTemplate>
`,
  '46. Embedded Systems/Firmware/index.mdx': `---
title: Firmware
description: A specific class of computer software that provides the low-level control for a device's specific hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Firmware">

Software is easily changed (soft). Hardware is physically permanent (hard). 

**Firmware** sits exactly in the middle. It is the software permanently flashed into the Read-Only Memory (ROM) or Flash memory of a Microcontroller. It is the "soul" of the hardware.

<Callout icon="info" title="The Universal Presence">
  Every digital device on Earth has firmware. Your TV remote has firmware. The anti-lock brakes in your car have firmware. Even the external hard drive you plug into your computer contains its own microscopic CPU running firmware just to translate USB signals into spinning magnetic disks.
</Callout>

## The Firmware Lifecycle

1. **Development:** Engineers write Bare-Metal C or RTOS code.
2. **Compilation:** The code is cross-compiled into a flat binary file (\`.bin\` or \`.hex\`).
3. **Flashing:** The binary is physically injected into the microcontroller's Flash memory over a hardware wire (like JTAG).
4. **Execution:** The moment the chip receives power, the CPU mathematically jumps to memory address \`0x08000000\` (the start of Flash) and blindly executes whatever binary instructions are there.

Because firmware controls physical reality (motors, heaters, lasers), bugs in firmware can cause physical fires, explosions, or death (e.g., the Therac-25 radiation machine).

</ConceptTemplate>
`,
  '46. Embedded Systems/Bootloaders/index.mdx': `---
title: Bootloaders
description: A small piece of software that runs immediately upon power-up, responsible for initializing hardware and launching the main firmware or OS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bootloaders">

If firmware is the soul of a device, the **Bootloader** is the spark of life.

When a microcontroller receives electrical power, the CPU mathematically executes the very first instruction at memory address \`0x00000000\`. Usually, this address contains the Bootloader.

<Callout icon="success" title="The Over-The-Air (OTA) Update">
  If you buy an IoT Smart Bulb, how does the manufacturer push a software update to it if the code is permanently burned into Flash memory? 
  
  The Bootloader makes this possible. The Bootloader is a tiny, indestructible piece of code that boots first. It checks the Wi-Fi for a new firmware \`.bin\` file. If it finds one, it physically overwrites the old firmware in the Flash memory, and then mathematically jumps to the new firmware's starting address.
</Callout>

## The Boot Sequence

A typical embedded boot sequence:
1. **Power On Reset (POR):** Electricity stabilizes.
2. **Bootloader Execution:** Initializes basic clocks and checks for updates (via USB, UART, or Wi-Fi).
3. **Vector Table Setup:** Configures the CPU to know where the actual application code lives.
4. **Jump to Application:** The Bootloader mathematically alters the Program Counter (PC) to point to the main Firmware. The Bootloader is now mathematically "dead" until the device is rebooted.

</ConceptTemplate>
`,
  '46. Embedded Systems/Interrupts/index.mdx': `---
title: Interrupts (ISRs)
description: A signal to the processor emitted by hardware or software indicating an event that needs immediate attention.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Interrupts (ISRs)">

Imagine you are waiting for a very important email. 
- **Polling:** You hit refresh on your browser 1,000 times a second. This wastes massive amounts of energy and CPU cycles.
- **Interrupts:** You turn on push notifications and go to sleep. The moment the email arrives, your phone physically vibrates, instantly waking you up.

In Embedded Systems, **Interrupts** are mathematical hardware signals that force the CPU to instantly drop whatever it is doing and execute a specific function.

<Callout icon="error" title="The Interrupt Service Routine (ISR)">
  When a hardware pin receives 3.3V (e.g., the user pressed a physical button), the CPU mathematically pauses the \`main()\` infinite loop, saves all its current variables to the Stack, and instantly jumps to a special function called an **ISR (Interrupt Service Routine)**.
  
  ISRs MUST be mathematically microscopic. If your ISR contains a \`delay()\` or an infinite loop, the entire CPU is permanently frozen and the main program will never resume.
</Callout>

## Hardware vs Software Interrupts

- **Hardware Interrupts:** Triggered by physical electricity. A timer reaching zero, a UART pin receiving a byte of data, or an ADC finishing a voltage reading.
- **Software Interrupts:** Triggered mathematically by code (Exceptions). Division by zero, or a Page Fault in an OS.

</ConceptTemplate>
`,
  '46. Embedded Systems/Power management (sleep modes)/index.mdx': `---
title: Power Management & Sleep Modes
description: Techniques used in embedded systems to minimize energy consumption, crucial for battery-operated devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Power Management & Sleep Modes">

In the desktop world, a CPU constantly drawing 100 Watts of power is normal. In the Embedded world, a microcontroller might be powered by a single CR2032 coin battery that mathematically must last for 10 years.

To achieve this, Embedded Engineers do not just optimize code for speed; they optimize it for **Microamps (µA)**.

<Callout icon="tip" title="The Deep Sleep Paradigm">
  If an IoT temperature sensor only needs to send data once an hour, leaving the CPU running at 80 MHz in an empty \`while(1)\` loop will drain the battery in 2 days. 
  
  Instead, the engineer writes code to mathematically shut off the physical clock signal to the CPU core. The CPU enters **Deep Sleep**, drawing a microscopic 1 µA of power. The only thing left running is a tiny, ultra-low-power internal timer. 60 minutes later, the timer fires a Hardware Interrupt, waking the CPU up for exactly 50 milliseconds to send the Wi-Fi packet, before immediately going back to sleep.
</Callout>

## Progressive Degradation of Power

Microcontrollers offer granular control over what physical silicon is currently powered on:
1. **Run Mode:** CPU, Flash, and all peripherals are fully powered. (Highest drain).
2. **Sleep Mode:** CPU core is halted, but peripherals (UART, SPI) are still running and can wake the CPU.
3. **Deep Sleep / Stop Mode:** CPU and all main clocks are physically shut down. RAM is barely maintained. Only an external physical pin interrupt (like a button press) can wake the system.

</ConceptTemplate>
`,
  '46. Embedded Systems/JTAG-SWD debugging/index.mdx': `---
title: JTAG & SWD Debugging
description: Hardware interfaces used for testing printed circuit boards and deep hardware-level debugging of embedded processors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JTAG & SWD Debugging">

When a Node.js server crashes, you read the stack trace in the terminal. When a Bare-Metal microcontroller crashes, it just physically sits there in silence. There is no terminal. 

To debug a microcontroller, engineers use **Hardware Debugging Interfaces** like **JTAG** (Joint Test Action Group) or **SWD** (Serial Wire Debug).

<Callout icon="success" title="The Omniscient View">
  JTAG/SWD is a physical, hardware-level backdoor built directly into the silicon of the CPU. By connecting a Debugger tool (like a Segger J-Link) via USB to the JTAG pins on the circuit board, an engineer can mathematically pause the physical CPU clock. 
  
  While the clock is paused, the engineer can inspect the exact hexadecimal values of every single RAM address and CPU register in real-time.
</Callout>

## JTAG vs SWD

- **JTAG:** The older, universal standard. It requires exactly 4 physical wires (TDI, TDO, TCK, TMS). It is mathematically capable of chaining multiple chips together (daisy-chaining) so you can debug the MPU, the FPGA, and the Wi-Fi chip all over the same 4 wires.
- **SWD (Serial Wire Debug):** An ARM-specific protocol that is mathematically vastly superior for small microcontrollers. It accomplishes the exact same deep-silicon debugging using only **2 wires** (SWDIO and SWCLK), freeing up precious physical pins on the microcontroller for other sensors.

</ConceptTemplate>
`,
  '46. Embedded Systems/Cross-compilation toolchains/index.mdx': `---
title: Cross-Compilation Toolchains
description: A set of software development tools used to create executable code for a platform other than the one on which the compiler is running.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cross-Compilation Toolchains">

When you compile a C program on your MacBook, the compiler (Clang) translates the C code into mathematical instructions designed specifically for the Apple M3 (ARM64) or Intel x86 processor running macOS. 

If you try to run that exact \`.exe\` or \`.app\` on a tiny STM32 microcontroller, it will instantly crash. The microcontroller has a completely different mathematical architecture (ARM Cortex-M4) and no Operating System.

<Callout icon="info" title="The Cross-Compiler">
  To write code for a microcontroller, you must use a **Cross-Compilation Toolchain** (like \`arm-none-eabi-gcc\`). 
  
  This is a specialized version of the GCC compiler that runs on your powerful Windows/Mac laptop, but mathematically outputs raw machine code targeted strictly for the tiny, bare-metal ARM microcontroller.
</Callout>

## Dissecting the Toolchain Name

Embedded toolchains follow a strict mathematical naming convention: \`arch-vendor-os-abi\`.
Take the industry standard: \`arm-none-eabi-gcc\`
- **arm:** The target mathematical architecture (ARM).
- **none:** The vendor (none/generic).
- **eabi:** The Operating System. Here, "eabi" stands for Embedded Application Binary Interface. It implies **Bare-Metal** (zero operating system). If you were compiling for a Raspberry Pi running Linux, the toolchain would be \`arm-linux-gnueabihf-gcc\`.

</ConceptTemplate>
`,
}

async function generateMega82() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega82().catch(console.error)
