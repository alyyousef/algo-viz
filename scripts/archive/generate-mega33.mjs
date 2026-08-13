import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/46. Embedded Systems/Microcontrollers/index.mdx': `---
title: Microcontrollers (MCUs)
description: "A compact integrated circuit designed to govern a specific operation in an embedded system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Microcontrollers (MCUs)">

A **Microcontroller (MCU)** is a complete, self-contained computer shrunk down to a single tiny chip. Unlike the CPU in your laptop (which is just the processor and requires external RAM and hard drives), a Microcontroller includes the processor, RAM, and non-volatile flash memory (the hard drive) all inside a single piece of silicon.

They are the hidden brains inside almost every modern electronic device: your microwave, your TV remote, your car's anti-lock brakes, and digital thermometers.

## MCU vs Microprocessor (MPU)

<ComparisonTable 
  headers={['Feature', 'Microcontroller (MCU)', 'Microprocessor (MPU)']} 
  rows={[
    ['Components', 'CPU, RAM, ROM/Flash, and I/O peripherals all on one chip.', 'Just the CPU. Requires external RAM and storage chips.'],
    ['Power Consumption', 'Extremely low. Can run on a coin cell battery for years.', 'High. Often requires dedicated cooling/heatsinks.'],
    ['Cost', 'Cents to a few dollars (e.g., ATmega328, ESP32).', 'Tens to hundreds of dollars (e.g., Intel Core i7).'],
    ['Operating System', 'Usually runs Bare-Metal code or an RTOS.', 'Runs general-purpose OS like Windows, Linux, or macOS.']
  ]} 
/>

## Key Components of an MCU
1. **CPU Core**: The processing unit (e.g., an 8-bit AVR or a 32-bit ARM Cortex-M).
2. **Memory**:
   - **Flash/ROM**: Stores the program/firmware (non-volatile).
   - **SRAM**: Stores temporary variables during execution (volatile).
3. **Peripherals**: Built-in hardware modules for specific tasks:
   - **GPIO**: General Purpose Input/Output pins.
   - **Timers**: For precise time-keeping.
   - **ADC/DAC**: Analog-to-Digital and Digital-to-Analog Converters.
   - **Communication Interfaces**: UART, SPI, I2C.

<Callout icon="tip" title="Popular MCUs">
The **Arduino Uno** is powered by the Atmel ATmega328P (an 8-bit MCU). The **ESP32** is a popular 32-bit MCU that famously includes built-in Wi-Fi and Bluetooth, making it the king of IoT devices.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/Firmware/index.mdx': `---
title: Firmware
description: "Specialized software programmed directly onto the read-only memory of a hardware device."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Firmware">

In the world of computers, we generally divide things into **Hardware** (the physical silicon) and **Software** (the programs you can easily download and install). 

**Firmware** is the "middle ground." It is software, but it is tightly coupled to a specific piece of hardware. It provides the low-level control that dictates how the hardware functions. 

## Characteristics of Firmware
- **Stored in Non-Volatile Memory**: It is usually written to Flash memory, ROM, or EEPROM, meaning it persists even when power is lost.
- **Hardware-Specific**: You cannot run the firmware for a Samsung TV on an LG TV. It is compiled for the exact electrical schematic and MCU of the target device.
- **Infrequently Updated**: While you might update your web browser (software) every week, you might only update your router's firmware once a year (if ever).

## Over-The-Air (OTA) Updates
Historically, updating firmware required plugging a specialized hardware programmer (like a JTAG) directly into the circuit board. 

Today, modern devices (like Tesla cars or smart thermostats) utilize **OTA Updates**. The device downloads the new firmware payload over Wi-Fi/Cellular, verifies its cryptographic signature, and flashes it directly to its own memory space, completely altering its own code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/Bare-metal programming/index.mdx': `---
title: Bare-Metal Programming
description: "Writing code that runs directly on the hardware without any intervening operating system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Bare-Metal Programming">

When you write a Python script on your laptop, you are sitting on top of an enormous tower of abstractions. You ask Python to open a file, Python asks the C standard library, the C standard library asks the Linux Kernel, the Kernel asks the file system driver, the driver asks the SSD controller.

**Bare-Metal Programming** removes the entire tower. There is no Operating System. There is no Linux Kernel. There are no files, no threads, and no network stack. There is only your C code and the raw silicon.

## How it Works
In bare-metal programming, you control the hardware by reading and writing binary values directly to specific physical memory addresses known as **Memory-Mapped Registers**.

${TICK3}c
// Example: Turning on an LED in bare-metal C
// We look up the memory address of the GPIO Port in the MCU Datasheet
#define GPIO_PORT_A 0x40020000 

void turn_on_led() {
    // We cast the hardcoded physical address to a pointer, 
    // and write the binary value directly to the silicon.
    unsigned int *port_a = (unsigned int *)GPIO_PORT_A;
    *port_a = 0b00000001; 
}
${TICK3}

## The "Super Loop" Architecture
Because there is no OS to manage background tasks or UI rendering, almost all bare-metal programs follow the exact same infinite loop architecture:

${TICK3}c
void main() {
    hardware_init();
    
    while(1) {
        read_sensors();
        process_data();
        update_outputs();
    }
}
${TICK3}

<Callout icon="warning" title="Blocking is Fatal">
In a bare-metal super loop, if TICK1process_data()TICK1 takes 5 seconds to run, the entire device is frozen for 5 seconds. You cannot read sensors or update outputs. Therefore, bare-metal code must be written to be entirely non-blocking, often relying heavily on Interrupts.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/RTOS/index.mdx': `---
title: RTOS (Real-Time Operating System)
description: "An operating system intended to serve real-time applications that process data as it comes in, typically without buffering delays."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Real-Time Operating System (RTOS)">

As embedded systems become more complex (e.g., a device that needs to read sensors, update an LCD screen, and maintain a Wi-Fi connection simultaneously), the Bare-Metal "Super Loop" architecture becomes impossible to manage. 

The solution is an **RTOS (Real-Time Operating System)** like FreeRTOS or Zephyr. An RTOS is a tiny, highly-optimized OS (often just a few kilobytes of code) that provides a Scheduler, allowing you to run multiple Tasks (threads) simultaneously on a Microcontroller.

## "Real-Time" Means Predictable, Not Fast
A common misconception is that an RTOS is "faster" than Linux. This is false.
**Real-Time means Deterministic.** 

<ComparisonTable 
  headers={['OS Type', 'Philosophy', 'Example']} 
  rows={[
    ['General Purpose OS (Linux/Windows)', 'Fairness and Throughput. Tries to keep all applications responsive. A process might be delayed by 50ms if the CPU is busy loading a game.', 'Your laptop, web servers.'],
    ['Real-Time OS (FreeRTOS)', 'Strict Deadlines. If a high-priority task (e.g., deploying an airbag) needs to run, it will preempt absolutely everything else in exactly 1.2 microseconds, guaranteed.', 'Medical ventilators, car brakes, rockets.']
  ]} 
/>

## Hard vs Soft Real-Time
- **Hard Real-Time**: Missing a deadline causes total system failure or catastrophe. (e.g., A pacemaker must fire exactly every 800ms. If it is 50ms late, the patient dies).
- **Soft Real-Time**: Missing a deadline is bad, but the system degrades gracefully. (e.g., A video decoder drops a frame, causing a slight visual glitch, but the video continues).

<Callout icon="info" title="FreeRTOS">
**FreeRTOS** is the undisputed king of the embedded world. It is open-source, written in pure C, and small enough to run on an MCU with only 4KB of RAM.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/GPIO/index.mdx': `---
title: GPIO (General-Purpose Input/Output)
description: "Uncommitted digital signal pins on an integrated circuit or electronic circuit board whose behavior can be controlled by the user at runtime."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GPIO (General-Purpose Input/Output)">

**GPIO pins** are the primary way a Microcontroller interacts with the physical world. If you look at an MCU chip, the little metal legs sticking out of it are the pins. Some pins have dedicated electrical purposes (like providing power or ground), but most are GPIOs.

"General Purpose" means they have no predefined purpose. The software developer decides what the pin will do at runtime.

## Digital Inputs and Outputs
GPIO pins are strictly digital. They only understand two states: **HIGH (1)** or **LOW (0)**. 
Electrically, HIGH is usually 3.3V or 5V, and LOW is 0V (Ground).

### 1. Configuring as an Output
When configured as an Output, the MCU actively drives voltage to the pin.
- Setting the pin HIGH outputs 3.3V. This could be used to turn on an LED, activate a relay, or signal a motor driver to move.
- Setting the pin LOW pulls it to 0V, turning the device off.

### 2. Configuring as an Input
When configured as an Input, the MCU "listens" to the voltage on the pin.
- If a user presses a physical button connected to 3.3V, the pin reads HIGH.
- If the button is released, the pin reads LOW.

## Pull-Up and Pull-Down Resistors
When an Input pin is not connected to anything (e.g., a button is not pressed), it acts like an antenna and picks up random electromagnetic noise from the environment. The MCU will rapidly read a chaotic mix of HIGH and LOW. This is called a **Floating Pin**.

To fix this, we use **Pull-Up or Pull-Down Resistors**. A Pull-Up resistor weakly ties the pin to 3.3V, ensuring it always reads HIGH until a button press forcefully pulls it LOW to Ground. Most modern MCUs have these resistors built directly into the silicon, and you can enable them with a single line of code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/PWM/index.mdx': `---
title: PWM (Pulse Width Modulation)
description: "A method of reducing the average power delivered by an electrical signal by effectively chopping it up into discrete parts."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="PWM (Pulse Width Modulation)">

GPIO pins are strictly digital: they can output exactly 3.3V (HIGH) or exactly 0V (LOW). 

But what if you want to dim an LED to 50% brightness? Or run a DC motor at half speed? A digital pin cannot output a continuous analog 1.65V.

The solution is **Pulse Width Modulation (PWM)**. PWM rapidly turns the digital pin HIGH and LOW thousands of times per second. By changing the ratio of how long the pin is ON versus how long it is OFF, we can simulate an analog voltage.

## Duty Cycle
The defining metric of PWM is the **Duty Cycle**, expressed as a percentage: the proportion of time the signal is HIGH during one cycle.

<ComparisonTable 
  headers={['Duty Cycle', 'Electrical Behavior', 'Result (LED Brightness)']} 
  rows={[
    ['0%', 'Always 0V (LOW)', 'Off (0%)'],
    ['25%', 'HIGH for 25% of the time, LOW for 75%.', 'Dim (25%)'],
    ['50%', 'HIGH for 50% of the time, LOW for 50%.', 'Medium (50%)'],
    ['100%', 'Always 3.3V (HIGH)', 'Maximum Brightness (100%)']
  ]} 
/>

## How It Works
If the frequency of the PWM is fast enough (e.g., 1000 Hz), human eyes cannot perceive the LED turning on and off 1,000 times a second. Instead, the visual persistence of the eye averages the rapid flashes into a smooth, steady dim glow.

Similarly, DC motors have physical inertia. If you hit a motor with 5V for 1 millisecond, and 0V for 1 millisecond, the physical mass of the spinning motor smooths out the electrical pulses, and it spins at exactly half speed.

<Callout icon="tip" title="Hardware PWM">
Creating PWM manually using a TICK1whileTICK1 loop and TICK1delay()TICK1 functions is terribly inefficient and consumes 100% of the CPU. Modern MCUs have dedicated hardware Timers built into the silicon. You simply tell the Timer register "Output 50% PWM on Pin 3", and the hardware takes over, generating the signal perfectly while the CPU goes back to sleep.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/Interrupts/index.mdx': `---
title: Interrupts
description: "A signal to the processor emitted by hardware or software indicating an event that needs immediate attention."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Interrupts">

How does a Microcontroller know when a user has pressed a button?

The bad way is **Polling**. The CPU runs an infinite loop, constantly asking: *"Is the button pressed? No. Is the button pressed? No."* This wastes 100% of the CPU's processing power and drains the battery immediately.

The correct way is using **Interrupts**.

## How Interrupts Work
An Interrupt is a hardware mechanism that allows the CPU to go to sleep or do other work. When the physical button is pressed, the electrical signal travels directly into the MCU's Interrupt Controller. 

The Controller forces the CPU to instantly pause its current program, save its exact state, and jump to a special function called an **Interrupt Service Routine (ISR)**. 

${TICK3}c
// This function is NOT called by the main() loop.
// It is triggered by the hardware silicon the exact microsecond Pin 2 goes HIGH.
void button_press_ISR() {
    turn_on_led();
    clear_interrupt_flag();
}

void main() {
    setup_hardware_interrupt(PIN_2, RISING_EDGE);
    
    while(1) {
        // CPU can sleep here, saving 99% battery!
        enter_low_power_sleep();
    }
}
${TICK3}

Once the ISR finishes, the CPU resumes its original task exactly where it left off.

## Interrupt Priorities
Modern MCUs can have dozens of interrupt sources (Timers, Wi-Fi chips, Buttons, UART). What happens if two interrupts trigger at the exact same millisecond?

The MCU assigns **Priorities** to every interrupt. If the CPU is executing a Low Priority ISR (like a button press), and a High Priority Interrupt arrives (like a critical motor failure), the CPU will interrupt the interrupt, handle the motor failure, then return to the button press, then return to the main code.

<Callout icon="warning" title="Keep ISRs Short!">
A golden rule of embedded programming is that an ISR must be as short and fast as possible. You should **never** put delays, loops, or complex math inside an ISR. Usually, an ISR just sets a boolean flag (e.g., TICK1button_was_pressed = trueTICK1) and immediately exits, letting the main loop handle the heavy processing later.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/46. Embedded Systems/Bootloaders/index.mdx': `---
title: Bootloaders
description: "A small program placed in the read-only memory of a microcontroller that runs immediately upon reset to load the main application."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bootloaders">

When a Microcontroller is powered on, its hardware circuit is hardwired to immediately start executing instructions from a specific memory address (usually Address TICK10x00000000TICK1).

In a simple device, your main Firmware application sits exactly at that address. But what if you want to update the Firmware over USB or Wi-Fi? You can't overwrite the application while it's currently running itself. 

This is where the **Bootloader** comes in.

## The Two-Stage Process
A Bootloader is a tiny, highly-protected program that sits at Address TICK10x00000000TICK1. Your actual Firmware application is shifted to sit further down in memory (e.g., Address TICK10x00002000TICK1).

When power is applied, the MCU boots into the Bootloader first. The Bootloader's logic is usually very simple:
1. **Check for an Update Signal**: (e.g., Is a specific button held down? Is there a payload waiting on the USB port?)
2. **Flash the Update**: If an update is present, the Bootloader reads the new firmware from the USB port and writes it into the Application Memory Space. (The Bootloader can do this safely because it is not overwriting itself).
3. **Jump to Application**: If no update is present, or the update is finished, the Bootloader instructs the CPU's Program Counter to jump to TICK10x00002000TICK1, officially starting your main Firmware.

## The Arduino Revolution
Before 2005, programming an AVR microcontroller required buying a $50 hardware programmer and connecting it to 6 specific pins on the chip.

The **Arduino** revolutionized electronics by pre-flashing every chip with the "Optiboot" Bootloader. Optiboot is designed to listen to the Serial (UART) port for 1 second upon boot. Because of this, developers could suddenly program MCUs using nothing but a standard USB cable.

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
