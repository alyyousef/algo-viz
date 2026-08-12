import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/10. Operating Systems/IPC/index.mdx': `---
title: Inter-Process Communication (IPC)
description: The mechanisms provided by the Operating System that allow heavily isolated processes to securely pass data to each other.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Inter-Process Communication (IPC)">

By design, the Operating System enforces strict memory isolation between Processes. Process A is physically incapable of reading or writing to the RAM of Process B. This prevents a crashing web browser from bringing down the entire OS.

However, sometimes processes *need* to talk to each other. A web server process needs to send SQL queries to a database process. Because they cannot just read each other's variables, they must use **Inter-Process Communication (IPC)**.

## The Cost of IPC

IPC is fundamentally slow because it usually requires crossing the Kernel boundary. 
When Process A wants to send a message to Process B:
1. Process A executes a System Call, switching the CPU into Kernel Space (Ring 0).
2. The Kernel copies the message from Process A's memory into Kernel memory.
3. The Kernel wakes up Process B.
4. Process B executes a System Call to read the message.
5. The Kernel copies the data from Kernel memory into Process B's memory.

This double-copy and double-context-switch is computationally expensive. Because of this, OS architects have invented many different flavors of IPC, each trading off speed for convenience and security.

<Callout icon="info" title="The IPC Toolkit">
  Modern operating systems provide several distinct mechanisms for IPC:
  - **Pipes**: For simple byte-stream communication between parent and child processes.
  - **Message Queues**: For structured, packet-based communication.
  - **Shared Memory**: The fastest IPC mechanism, bypassing the Kernel entirely after setup.
  - **Sockets**: For communication between processes that might be on entirely different computers over a network.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Shared memory/index.mdx': `---
title: Shared Memory
description: The absolute fastest form of IPC, where the OS maps the same block of physical RAM into the virtual memory spaces of two distinct processes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Shared Memory">

Standard IPC (like Pipes or Sockets) is slow because every message must be copied from Process A, into the Kernel, and then into Process B. 

**Shared Memory** is a highly specialized OS feature that bypasses this limitation, making it the absolute fastest form of Inter-Process Communication available.

## How It Works

1. Process A asks the OS to create a Shared Memory segment.
2. The OS allocates a block of physical RAM.
3. Crucially, the OS programs the CPU's Memory Management Unit (MMU) to map this specific physical block into Process A's Virtual Memory space, AND simultaneously maps it into Process B's Virtual Memory space.

<Callout icon="success" title="Zero-Copy Communication">
  Once the memory is mapped, the OS gets completely out of the way. 
  When Process A writes a byte to the shared memory, it is instantly visible to Process B. There are no System Calls, no Context Switches, and no data copying. The speed is limited only by the physical clock speed of the RAM chips.
</Callout>

## The Fatal Flaw

Because Shared Memory behaves exactly like two threads sharing a Heap, it re-introduces the nightmare of **Race Conditions**. 

If Process A and Process B attempt to modify the shared memory at the exact same nanosecond, the data will be silently corrupted. Therefore, developers using Shared Memory must also use strict Synchronization mechanisms (like cross-process Mutexes or Semaphores) to lock the memory during writes, which adds complexity back into the system.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Pipes/index.mdx': `---
title: Pipes (Anonymous Pipes)
description: A unidirectional byte stream used to pass the standard output of one process directly into the standard input of another.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pipes (Anonymous Pipes)">

A **Pipe** is one of the oldest and most fundamental IPC mechanisms, originating in Unix in 1973. It provides a simple, unidirectional (one-way) byte stream between two processes.

Think of a Pipe exactly like a physical water pipe. Process A pumps bytes into one end (the Write end), and Process B drinks the bytes from the other end (the Read end).

## The Linux Command Line

If you have ever used the Linux terminal, you have used Pipes. The TICK1|TICK1 character is the physical manifestation of this IPC mechanism.

TICK3bash
cat my_file.txt | grep "Error" | wc -l
TICK3

When you execute this command:
1. The OS spawns three completely separate processes (TICK1catTICK1, TICK1grepTICK1, and TICK1wcTICK1).
2. The OS creates an Anonymous Pipe between TICK1catTICK1 and TICK1grepTICK1. The output of TICK1catTICK1 is wired directly into the input of TICK1grepTICK1.
3. The OS creates a second Anonymous Pipe between TICK1grepTICK1 and TICK1wcTICK1.

<Callout icon="info" title="The Buffer Limit">
  Pipes are managed entirely by the OS Kernel in RAM. They usually have a strict buffer size limit (e.g., 64 Kilobytes). If Process A writes data too fast and the buffer fills up, the OS will automatically pause Process A until Process B reads some data and clears space. 
</Callout>

## Anonymous vs Named
Standard Pipes are "Anonymous", meaning they have no name and no file on the hard drive. Because of this, they can *only* be used to connect processes that are directly related to each other (e.g., a Parent process spawning a Child process). You cannot use an Anonymous Pipe to connect two completely unrelated programs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Named pipes/index.mdx': `---
title: Named Pipes (FIFOs)
description: An extension of standard Pipes that exist as visible files on the filesystem, allowing completely unrelated processes to communicate.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Named Pipes (FIFOs)">

Standard Pipes are incredibly useful, but they have a fatal limitation: they can only connect related processes (like a parent and child). If you launch a Database on Monday, and a Web Server on Tuesday, they cannot use an Anonymous Pipe to talk to each other.

To solve this, operating systems provide **Named Pipes** (also known as FIFOs - First In, First Out).

## The Filesystem Illusion

A Named Pipe appears as an actual, physical file sitting on your hard drive (e.g., TICK1/tmp/my_pipeTICK1). 

<Callout icon="warning" title="It's not a real file!">
  Although you can see it with the TICK1lsTICK1 command, a Named Pipe does not consume any space on your hard drive. The file is merely a visible anchor point. When processes read or write to it, the data is entirely handled in RAM by the Kernel.
</Callout>

## How it works
1. **Creation**: You create a Named Pipe using a command like TICK1mkfifo /tmp/my_pipeTICK1.
2. **Writing**: Process A (the database) opens the file in "Write" mode and starts dumping data into it.
3. **Reading**: Process B (the web server) opens the exact same file in "Read" mode and streams the data out.

Because the Named Pipe exists on the filesystem, *any* process with the correct file permissions can open it, allowing completely unrelated applications to establish high-speed IPC.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Message queues/index.mdx': `---
title: Message Queues
description: A robust IPC mechanism that allows processes to send structured, discrete packets of data rather than an unstructured stream of bytes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Message Queues">

Pipes (both Anonymous and Named) are **Byte Streams**. They do not understand the data they are carrying. If Process A writes 10 bytes, and then 5 bytes, Process B might read all 15 bytes at once, completely losing the boundary between the two messages. 

If a process needs to send structured, distinct packets of data, it uses a **Message Queue**.

## Discrete Messages

A Message Queue is managed by the OS Kernel. Instead of a continuous stream of water, think of it as a post office mailbox. 
Process A places a sealed envelope (a Message) into the mailbox. Process B pulls out one envelope at a time. The boundary of the envelope is perfectly preserved.

<Callout icon="success" title="Asynchronous Delivery">
  Unlike Pipes, which require both the Reader and Writer to be actively running at the same time, Message Queues are **Asynchronous**. 
  Process A can send 50 messages to the queue and instantly terminate itself. The OS Kernel will safely hold those 50 messages in memory until Process B launches hours later to read them.
</Callout>

## Priority Routing

Modern Message Queues (like POSIX TICK1mqTICK1) allow messages to have attached Priorities. 
If Process A sends 100 low-priority "logging" messages, and then sends 1 high-priority "shutdown" message, the OS will automatically push the high-priority message to the very front of the queue, ensuring Process B receives it immediately on its next read.

*(Note: OS-level message queues are for processes on the same computer. Distributed systems use networked equivalents like RabbitMQ or Apache Kafka).*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Signals/index.mdx': `---
title: Signals
description: A primitive, violent form of IPC used to send abrupt software interrupts to processes, typically to force them to shut down or reload.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Signals">

Not all Inter-Process Communication is used for sending data. Sometimes, the OS (or another program) just needs to violently poke a process to get its attention. This is done using **Signals**.

A Signal is a software interrupt. When a process receives a signal, the OS violently pauses the process's normal execution and forces it to run a specific "Signal Handler" function.

## Common Signals

There are standard signals defined by the POSIX specification:
- TICK1SIGINTTICK1 (Signal Interrupt): Sent when you press TICK1Ctrl+CTICK1 in the terminal. Asks the program to shut down cleanly.
- TICK1SIGTERMTICK1 (Signal Terminate): The standard signal sent by the TICK1killTICK1 command. A polite request to exit.
- TICK1SIGSEGVTICK1 (Segmentation Fault): Sent by the OS hardware when a program tries to read illegal memory. Causes instant death.

<Callout icon="warning" title="SIGKILL (The Unstoppable Assassin)">
  A process is allowed to write custom code to "catch" or ignore almost any signal. For example, a web server can catch TICK1SIGTERMTICK1 and delay its shutdown until it finishes serving its current users.
  However, TICK1SIGKILLTICK1 (Kill -9) cannot be caught or ignored. If the OS sends a TICK1SIGKILLTICK1, the Kernel bypasses the program entirely and instantly destroys it without mercy.
</Callout>

## The Limitations

Signals are incredibly fast, but they carry exactly zero data. You cannot send a string or a JSON payload through a Signal; you can only send the signal ID number (e.g., Signal 15). They are strictly used for control flow, not data transfer.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Memory management/index.mdx': `---
title: Memory Management
description: The complex orchestration of physical RAM, ensuring every process gets the memory it needs while maintaining strict security isolation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Memory Management">

In the very early days of computing (like MS-DOS), memory management didn't exist. Programs were loaded directly into physical RAM at whatever address they wanted. 

If a video game needed memory, it simply wrote data to physical address TICK10x1000TICK1. If the Operating System happened to be storing critical network data at TICK10x1000TICK1, the game would overwrite it, and the entire computer would instantly crash.

<Callout icon="warning" title="The Three Goals">
  Modern Operating Systems must solve three massive problems simultaneously:
  1. **Allocation**: Dynamically giving memory to processes as they ask for it, without fragmenting the RAM into useless tiny chunks.
  2. **Isolation**: Ensuring Process A physically cannot read the passwords stored in Process B's memory.
  3. **Virtualization**: Creating the illusion that a program has access to infinite RAM, even if the physical computer only has 4GB installed.
</Callout>

## The Modern Solution

To achieve these goals, modern Operating Systems completely abandon the idea of letting programs talk to Physical RAM. 

Instead, the OS Kernel utilizes a hardware chip inside the CPU called the **Memory Management Unit (MMU)** to enforce a system called **Virtual Memory**. Every single memory request made by every single program is intercepted by the MMU and mathematically translated on the fly, creating a perfect, secure illusion for the software.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Virtual memory/index.mdx': `---
title: Virtual Memory
description: The ultimate abstraction that gives every single process the illusion that it has an infinite, empty RAM space all to itself.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Virtual Memory">

**Virtual Memory** is arguably the most brilliant abstraction in all of computer science. 

When you write a C program and print the memory address of a variable, it might say TICK10x0000FFFFTICK1. **This is a lie.** 
That variable is not actually located at physical RAM chip address TICK10x0000FFFFTICK1. The Operating System is lying to your program.

## The Illusion

The OS gives every single process its own massive, private, contiguous block of fake memory called Virtual Memory. 
On a 64-bit OS, every single process genuinely believes it has access to **16 Exabytes** of empty RAM, even if your laptop only physically has 8 Gigabytes.

<Callout icon="success" title="The Translation Layer">
  When your program tries to save data to its fake Virtual Address TICK10x0000FFFFTICK1, the CPU's hardware **Memory Management Unit (MMU)** intercepts the request. 
  The MMU looks at a secret map created by the OS Kernel, translates the fake Virtual Address into a real Physical Address (e.g., TICK10x99990000TICK1), and writes the data to the physical RAM chip. Your program has no idea this translation occurred.
</Callout>

## Security Through Deception

Because every process lives in its own fake Virtual reality, **Isolation is mathematically guaranteed**. 

Process A might store a password at Virtual Address TICK10x1000TICK1. 
Process B might store an image at Virtual Address TICK10x1000TICK1. 
Because the MMU translates Process A's TICK10x1000TICK1 to Physical Address TICK10x5555TICK1, and translates Process B's TICK10x1000TICK1 to Physical Address TICK10x9999TICK1, they never collide. 

Process A physically cannot steal Process B's data, because Process A literally has no way to express or calculate the physical location of Process B's memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Paging/index.mdx': `---
title: Paging
description: The mechanical implementation of Virtual Memory, chopping RAM into tiny, manageable blocks to eliminate fragmentation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Paging">

How does the Operating System actually map 16 Exabytes of fake Virtual Memory down to 8 Gigabytes of real Physical RAM? It uses a system called **Paging**.

Instead of trying to map memory byte-by-byte (which would require a map larger than the RAM itself), the OS chops all of memory into identical, fixed-size blocks called **Pages**. 
On almost all modern systems, a Page is exactly **4 Kilobytes**.

## The Page Table

The OS Kernel maintains a massive dictionary in RAM called the **Page Table**. 
The Page Table maps *Virtual Pages* to *Physical Frames*.

1. When a program asks for 12 KB of memory, the OS allocates three 4KB Virtual Pages.
2. The OS finds three empty 4KB Physical Frames on the RAM sticks. (Crucially, these physical frames do *not* need to be next to each other).
3. The OS writes the translation into the Page Table.

<Callout icon="warning" title="The TLB (Translation Lookaside Buffer)">
  Because every single memory read requires a lookup in the Page Table, memory speeds would theoretically be cut in half. To fix this, CPUs have a highly specialized hardware cache called the **TLB**. The TLB stores the 100 most recent Page Table translations directly inside the CPU silicon, allowing translation to happen in zero clock cycles.
</Callout>

## Eliminating Fragmentation

Historically, memory suffered from **External Fragmentation**. If a program needed a 10MB chunk of RAM, the OS had to find a contiguous 10MB empty space. If the RAM was scattered with tiny gaps, the allocation would fail, even if there was 100MB of total free space.

Paging permanently solves this. Because Virtual Memory is an illusion, the OS can take 2,500 heavily scattered 4KB physical frames, map them consecutively in the Page Table, and the program will see a perfectly contiguous 10MB block of Virtual Memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Page replacement algorithms/index.mdx': `---
title: Page Replacement Algorithms
description: The difficult decisions the OS must make when the physical RAM is 100% full and a new program demands memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Page Replacement Algorithms">

What happens when your computer only has 8GB of physical RAM, but you open 15 tabs in Google Chrome, a video editor, and a video game, demanding a total of 12GB of RAM?

The system does not crash. Instead, the OS Kernel utilizes the hard drive as an emergency overflow for RAM (a process called Swapping/Paging Out). 
To make room for the video game, the OS must brutally evict some of Chrome's memory from the physical RAM sticks and write it to the slow SSD. 

But *which* 4KB Page of memory should the OS evict? This is decided by **Page Replacement Algorithms**.

<Callout icon="warning" title="The Cost of a Bad Guess">
  If the OS evicts a memory page that Chrome needs to use 10 milliseconds from now, Chrome will freeze while the OS painstakingly reads that page back from the slow SSD (a Page Fault). If the OS guesses wrong constantly, the system enters **Thrashing**, where the computer spends 100% of its time moving data to and from the SSD, bringing the machine to a halt.
</Callout>

## Common Algorithms

1. **FIFO (First-In, First-Out)**: The OS evicts the oldest page in RAM. (Terrible idea. The oldest page might be the core OS kernel code that is used every second).
2. **LRU (Least Recently Used)**: The OS tracks exactly when every page was last read. It evicts the page that hasn't been touched in the longest time. (Excellent algorithm, but computationally impossible to perfectly track in real-time).
3. **Clock (Second Chance)**: The algorithm actually used by modern OSs. It approximates LRU using a single hardware bit. The OS sweeps through memory like the hand of a clock. If a page has been used recently, it clears the bit (giving it a second chance). If it sweeps again and the bit is still clear, it evicts the page. It is incredibly fast and highly accurate.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Swapping/index.mdx': `---
title: Swapping (Paging Out)
description: The mechanical process of the OS seamlessly moving inactive RAM data to the hard drive to prevent Out-Of-Memory crashes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Swapping (Paging Out)">

When the Page Replacement Algorithm decides that a specific 4KB page of physical RAM hasn't been used in a while, it initiates a process called **Swapping** (or Paging Out).

## The Page Fault Illusion

1. **Eviction**: The OS Kernel takes the 4KB of physical RAM, writes it to a hidden file on the SSD (the TICK1pagefile.sysTICK1 in Windows, or the Swap Partition in Linux), and marks the RAM frame as empty.
2. **The Trap**: Crucially, the OS updates the Page Table. It marks that Virtual Page as "Invalid". 
3. **The Awakening**: Three hours later, the program wakes up and tries to read that memory address. 
4. **The Page Fault**: The CPU's MMU looks at the Page Table, sees it is marked "Invalid", and throws a massive hardware exception called a **Page Fault**.
5. **The Rescue**: The CPU instantly pauses the program and jumps into the OS Kernel. The Kernel sees the Page Fault, realizes the data is on the SSD, reads the 4KB from the SSD back into a new RAM frame, updates the Page Table, and resumes the program.

The program *never knew the data was missing*. It just experienced a slight 5-millisecond lag spike while the OS silently fetched the data from the SSD.

<Callout icon="info" title="Swapping vs Paging">
  Historically, "Swapping" meant moving an *entire process* (like a 50MB program) to the hard drive all at once. "Paging" means moving individual 4KB blocks. Today, modern operating systems only do Paging, but the term "Swap File" and "Swapping" stuck around colloquially.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/Filesystems (structure/index.mdx': `---
title: Filesystem Structure
description: The complex data structures the OS uses to turn a massive, flat array of magnetic bits into a usable hierarchy of folders and files.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Filesystem Structure">

A Hard Drive or SSD is incredibly dumb. It has no concept of "Folders", "Files", or "Images". To the hardware, a 1 Terabyte SSD is just a massive, flat array of 1 Trillion magnetic blocks. You can ask the SSD for "Block #500", and it will return 4 Kilobytes of raw binary data.

A **Filesystem** (like NTFS on Windows, APFS on macOS, or EXT4 on Linux) is the software abstraction built by the Operating System to turn that flat array into the beautiful tree of folders and files you see on your desktop.

## The Logical Layout

When you format a drive with a filesystem, the OS divides the physical drive into several logical zones:

1. **The Boot Block**: The very first sector of the drive, containing the tiny Bootloader code required to start the Operating System.
2. **The Superblock**: The master configuration file for the filesystem. It stores the total size of the drive, how many blocks are free, and the location of the root directory. If the Superblock is corrupted, the entire drive becomes unreadable.
3. **The Inode Table**: A massive database storing the metadata (permissions, file size, creation date) for every single file on the drive.
4. **The Data Blocks**: The vast majority of the drive, where the actual binary content of your photos, videos, and text files is stored.

<Callout icon="success" title="Everything is a Tree">
  In modern filesystems, directories (folders) are not special magical entities. A directory is simply a standard file that contains a list of text mappings. It contains rows of data saying: *"The file named 'vacation.jpg' is located at Inode #5092"*.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/inodes/index.mdx': `---
title: Inodes (Index Nodes)
description: The hidden metadata database entries that actually define a file, completely independent of the file's human-readable name.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Inodes (Index Nodes)">

In Unix-based filesystems (like EXT4 on Linux), a file is not defined by its name. A file is defined by its **Inode** (Index Node).

An Inode is a fixed-size data structure (usually 256 bytes) stored in a massive table on the hard drive. Every single file and folder on your computer has exactly one corresponding Inode.

## What is inside an Inode?
The Inode stores all the Metadata about the file, including:
- **File Size**: (e.g., 50 Kilobytes).
- **Permissions**: (e.g., Read/Write for Admin, Read-Only for Users).
- **Timestamps**: Creation time, Last Modified time.
- **Data Pointers**: The exact physical block numbers on the hard drive where the file's actual data is stored.

<Callout icon="warning" title="The Missing Piece">
  Notice what is *not* in the Inode: **The File Name**. 
  Inodes do not know the name of the file. The human-readable name (like TICK1resume.pdfTICK1) is stored in the Directory (Folder) file, which simply points to the Inode number.
</Callout>

## Hard Links

Because the name is decoupled from the Inode, you can have multiple different File Names pointing to the exact same Inode! This is called a **Hard Link**.

You can have TICK1/documents/resume.pdfTICK1 and TICK1/desktop/work.pdfTICK1 both pointing to Inode #555. They are not copies of the file; they are literally the exact same file on the hard drive. If you edit one, the other instantly changes. The file is only physically deleted from the hard drive when *all* names pointing to the Inode are deleted, dropping the Inode's reference count to zero.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/10. Operating Systems/journaling)/index.mdx': `---
title: Filesystem Journaling
description: A catastrophic-recovery mechanism that prevents filesystems from corrupting when the computer violently loses power mid-write.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Filesystem Journaling">

Saving a file is a highly complex operation. If you save a new photo to your desktop, the Filesystem must perform multiple physical writes to the hard drive:
1. Write the actual image data to empty Data Blocks.
2. Write a new Inode with the file's metadata.
3. Update the Directory file to add the name "photo.jpg".
4. Update the Superblock's free-space bitmap to mark the data blocks as taken.

**The Danger:** What happens if the power goes out *exactly* after step 2, but before step 3? 
The hard drive is now in a corrupt, inconsistent state. The data blocks are taken, but there is no file name pointing to them. The hard drive is permanently bleeding storage space (an Orphaned Inode).

## The Solution: The Journal

In the 1990s, recovering from this required running TICK1fsckTICK1 (Filesystem Check), which would take hours to manually scan the entire 100GB hard drive looking for inconsistencies.

Modern filesystems (NTFS, EXT4, APFS) solve this using a **Journal**. 
The Journal is a small, dedicated scratchpad area on the hard drive. 

<Callout icon="success" title="Write-Ahead Logging">
  Before the filesystem modifies the actual hard drive, it writes a "Note to Self" in the Journal: *"I am about to write photo.jpg to Inode 50 and Data Block 99."*
  Only after the Journal entry is safely saved to the disk does the filesystem actually perform the real writes. Once the real writes are finished, it crosses the note out of the Journal.
</Callout>

If the power violently goes out mid-write, the OS simply reboots, looks at the tiny Journal, sees the unfinished task, and either instantly finishes it or instantly rolls it back. The filesystem recovers from corruption in milliseconds, rather than hours.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    // This entirely avoids JSON/regex parsing issues.
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    await fs.writeFile(fullPath, finalContent.trim() + '\\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
