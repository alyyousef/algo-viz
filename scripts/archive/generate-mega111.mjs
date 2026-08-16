import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '56. Quantum Computing/Qubits/index.mdx': `---
title: Qubits
description: The basic unit of quantum information, analogous to the classical bit.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Qubits (Quantum Bits)">

In classical computer science, every piece of data is physically stored as a **Bit**. A bit is a deterministic, biological switch on a silicon chip. It is strictly \`0\` or \`1\`.

<Callout icon="success" title="The Subatomic Switch">
  A **Qubit** (Quantum Bit) abandons deterministic silicon and uses actual subatomic particles (like a single electron, or a photon of light).
  
  Because it obeys the terrifying laws of Quantum Mechanics, a Qubit is not strictly \`0\` or \`1\`. Due to **Superposition**, a Qubit can mathematically exist in a continuous state of *both 0 and 1 simultaneously* until it is physically observed. This allows a quantum computer to process an exponential number of mathematical possibilities at the exact same time.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Superposition/index.mdx': `---
title: Superposition
description: A fundamental principle of quantum mechanics stating that, much like waves in classical physics, any two (or more) quantum states can be added together and the result will be another valid quantum state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Superposition">

If a classical computer has 3 bits, it can hold exactly 1 state at a time (e.g., \`101\`). To explore all 8 possible combinations (\`000\`, \`001\`... \`111\`), the computer must biologically calculate them one by one.

<Callout icon="warning" title="Exponential Parallelism">
  Due to **Superposition**, 3 Qubits mathematically hold *all 8 states simultaneously*.
  
  If you have 300 Qubits in superposition, they hold $2^{300}$ states simultaneously. That number is mathematically larger than the number of atoms in the entire observable universe. A quantum computer calculates all $2^{300}$ states in a single biological operation, shattering the physical limits of classical computing.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Entanglement/index.mdx': `---
title: Entanglement
description: A physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle cannot be described independently of the state of the others.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Entanglement">

Albert Einstein famously referred to Quantum Entanglement as *"Spooky action at a distance"*, because it mathematically violates the speed of light.

<Callout icon="info" title="The Invisible Thread">
  When two Qubits become **Entangled**, their mathematical states are permanently bound together.
  
  If you put one entangled Qubit in New York, and the other on Mars, and you biologically measure the Qubit in New York to be \`1\`, the Qubit on Mars will *instantaneously* become \`1\`. There is no signal traveling between them. This phenomenon allows Quantum Computers to physically link Qubits together to perform complex, synchronized algorithms.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Measurement/index.mdx': `---
title: Measurement
description: The process of interacting with a quantum system to extract information about its state, causing wave function collapse.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Measurement">

The greatest tragedy of Quantum Computing is **Measurement**.

While your 300 Qubits are mathematically processing $2^{300}$ possibilities simultaneously inside the quantum processor, you biologically cannot see them.

<Callout icon="tip" title="Wave Function Collapse">
  The moment a human or a sensor biologically "looks" at the Qubits to extract the answer (Measurement), the delicate quantum state mathematically collapses.
  
  The $2^{300}$ simultaneous states instantly collapse into a single, deterministic, classical string of 300 zeros and ones (e.g., \`10110...\`). The art of Quantum Algorithms is mathematically manipulating the probabilities *before* measurement, so that when the collapse inevitably occurs, it collapses onto the correct answer.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum gates/index.mdx': `---
title: Quantum gates
description: A basic quantum circuit operating on a small number of qubits, analogous to classical logic gates.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Gates">

In classical computing, we manipulate bits using biological silicon Logic Gates (AND, OR, NOT).

In quantum computing, we mathematically manipulate Qubits using **Quantum Gates**.

<Callout icon="success" title="Microwave Manipulation">
  Because Qubits are subatomic particles, a Quantum Gate is not a physical silicon wire. It is often a precisely timed pulse of **Microwave Radiation** or a **Laser**.
  
  For example, the **Hadamard Gate (H)** fires a laser at a Qubit, physically forcing it into a perfect 50/50 mathematical Superposition. The **CNOT Gate** uses microwaves to Entangle two Qubits together. Unlike classical gates, all quantum gates must mathematically be *reversible*.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum circuits/index.mdx': `---
title: Quantum circuits
description: A model for quantum computation in which a computation is a sequence of quantum gates, measurements, and initializations of qubits.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Circuits">

A **Quantum Circuit** is the mathematical equivalent of a classical computer program, but it looks like biological sheet music.

<Callout icon="info" title="The Timeline of Execution">
  In a quantum circuit diagram:
  - Each horizontal line represents a single physical Qubit over time.
  - The blocks placed on the lines are the **Quantum Gates** (the laser pulses).
  - The program reads strictly from left to right.
  
  You initialize the Qubits to \`0\`, apply Hadamard gates to put them into Superposition, apply CNOT gates to Entangle them, execute the algorithmic logic, and finally apply a Measurement gate at the end of the line to collapse the result into classical bits.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum algorithms/index.mdx': `---
title: Quantum algorithms
description: An algorithm which runs on a realistic model of quantum computation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Algorithms">

A quantum computer cannot biologically run Google Chrome faster than your laptop. In fact, for 99% of daily tasks, a quantum computer is mathematically slower than an iPhone.

<Callout icon="warning" title="Specific Mathematical Superiority">
  Quantum Computers are strictly designed to execute **Quantum Algorithms**. 
  
  These are highly specialized mathematical procedures that leverage Superposition and Entanglement to solve specific problems (like simulating molecular chemistry, or factoring massive prime numbers) that would biologically take a classical supercomputer a billion years to solve.
</Callout>

</ConceptTemplate>
`,
  "56. Quantum Computing/Shor's algorithm/index.mdx": `---
title: Shor's algorithm
description: A quantum algorithm for integer factorization that runs in polynomial time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Shor's Algorithm">

The entire global financial system, military communications, and internet privacy are mathematically protected by **RSA Encryption**. 

RSA relies on the biological fact that it takes a classical supercomputer 300 million years to find the prime factors of a 2,048-bit number.

<Callout icon="warning" title="The Cryptography Killer">
  Invented in 1994, **Shor's Algorithm** is a quantum algorithm that completely mathematically shatters RSA.
  
  Using a sufficiently powerful quantum computer, Shor's Algorithm exploits quantum interference to find the prime factors of a 2,048-bit number not in 300 million years, but in **minutes**. When a full-scale quantum computer is finally built, every biological password, banking record, and encrypted military file on Earth will be instantly mathematically decrypted.
</Callout>

</ConceptTemplate>
`,
  "56. Quantum Computing/Grover's algorithm/index.mdx": `---
title: Grover's algorithm
description: A quantum algorithm for unstructured search that provides a quadratic speedup over classical algorithms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Grover's Algorithm">

If you have a biological phonebook with 1,000,000 unalphabetized names, and you need to find "Alice", a classical computer must mathematically check every single name one by one (an $O(N)$ operation taking 500,000 guesses on average).

<Callout icon="success" title="The Quadratic Speedup">
  **Grover's Algorithm** is a quantum search algorithm that mathematically searches an unstructured database in $O(\sqrt{N})$ time.
  
  Instead of 500,000 guesses, Grover's Algorithm uses quantum amplitude amplification to mathematically boost the probability of Alice's location, finding her in exactly **1,000** guesses. While not exponential like Shor's Algorithm, this quadratic speedup will radically transform artificial intelligence, database searching, and password hashing (forcing the industry to upgrade from AES-128 to AES-256).
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum Fourier transform/index.mdx': `---
title: Quantum Fourier transform
description: A linear transformation on quantum bits, and is the quantum analogue of the inverse discrete Fourier transform.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Fourier Transform (QFT)">

The **Quantum Fourier Transform (QFT)** is the hidden mathematical engine powering the most devastating quantum algorithms.

<Callout icon="info" title="The Engine of Shor's Algorithm">
  A classical Fourier Transform biologically decomposes a complex audio wave into its individual musical frequencies. 
  
  The QFT does the same thing, but mathematically operates on the amplitudes of Quantum States. It is exponentially faster than a classical Fast Fourier Transform (FFT). By finding the hidden mathematical "period" (frequency) of a function, the QFT is the exact mechanism that allows Shor's Algorithm to instantly shatter RSA encryption.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum error correction/index.mdx': `---
title: Quantum error correction
description: Techniques used in quantum computing to protect quantum information from errors due to decoherence and other quantum noise.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Error Correction">

A classical bit on your hard drive is biologically stable. It will remain a \`1\` for 50 years.

A Qubit is mathematically terrifyingly fragile. If a stray cosmic ray, a tiny fluctuation in room temperature, or even the microwave pulses used to control it bump the Qubit, the Superposition collapses and the data is destroyed (Quantum Decoherence). Qubits usually only survive for about 50 microseconds.

<Callout icon="warning" title="Logical vs. Physical Qubits">
  To run Shor's algorithm, we need **Quantum Error Correction**. 
  
  You cannot simply "copy" a Qubit to back it up (due to the No-Cloning Theorem). Instead, scientists must biologically entangle 1,000 fragile "Physical Qubits" together to mathematically simulate a single, stable **"Logical Qubit"**. This means a true, fault-tolerant quantum computer requires millions of physical Qubits, which is a massive engineering hurdle.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/NISQ era/index.mdx': `---
title: NISQ era
description: Noisy Intermediate-Scale Quantum era refers to the current state of quantum computing hardware, characterized by 50 to a few hundred qubits and significant error rates.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NISQ Era (Noisy Intermediate-Scale Quantum)">

We do not currently possess millions of Qubits to create perfect Quantum Error Correction.

We are biologically living in the **NISQ Era**.

<Callout icon="tip" title="The Current Reality">
  **N**oisy: The Qubits are fragile and error-prone.
  **I**ntermediate-**S**cale: We only have computers with roughly 50 to 400 Qubits.
  
  Because we lack error correction, mathematical algorithms must be incredibly short, executing in under 50 microseconds before the Qubits biologically collapse into noise. NISQ algorithms (like VQE for chemistry simulation) use a hybrid approach: the quantum computer does a tiny, 10-microsecond burst of math, and immediately hands the result back to a classical supercomputer to clean up the noise.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum supremacy-advantage/index.mdx': `---
title: Quantum supremacy-advantage
description: The goal of demonstrating that a programmable quantum device can solve a problem that no classical computer can solve in any feasible amount of time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Supremacy (Quantum Advantage)">

**Quantum Supremacy** is the biological milestone where a Quantum Computer mathematically solves a problem that would be physically impossible for the world's fastest classical supercomputer.

<Callout icon="success" title="The Google Milestone">
  In 2019, Google achieved Quantum Supremacy with their 53-qubit Sycamore processor. 
  
  They ran a highly specific mathematical random-number sampling algorithm. The Sycamore quantum computer solved it in **200 seconds**. Google estimated that the Summit Supercomputer (the fastest classical computer on Earth at the time) would take biologically **10,000 years** to calculate the exact same mathematical result.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Quantum annealing/index.mdx': `---
title: Quantum annealing
description: A quantum computing method used to find the global minimum of a given objective function over a given set of candidate solutions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantum Annealing">

Not all quantum computers use lasers and logic gates. 

Companies like D-Wave build **Quantum Annealers**. These are biologically highly specialized machines that cannot run Shor's Algorithm or general code. They are designed to do exactly one mathematical thing: **Optimization**.

<Callout icon="info" title="The Energy Landscape">
  Imagine a massive mathematical landscape with hills and valleys, and you are trying to find the absolute deepest valley (the Optimal Solution, like the most efficient route for 10,000 FedEx trucks).
  
  A classical computer has to climb over every hill to check. A Quantum Annealer uses **Quantum Tunneling** to mathematically phase through the biological hills, instantly settling into the lowest energy state.
</Callout>

</ConceptTemplate>
`,
  '56. Quantum Computing/Qiskit/index.mdx': `---
title: Qiskit
description: An open-source SDK for working with quantum computers at the level of pulses, circuits, and application modules.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Qiskit"
  subtitle="IBM's Quantum SDK"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Qiskit_Logo.svg/512px-Qiskit_Logo.svg.png"
  description="Qiskit is the industry-standard, Python-based open-source framework developed by IBM for writing mathematical quantum circuits."
  yearCreated={2017}
  creator="IBM"
  isOpenSource={true}
  websiteUrl="https://qiskit.org/"
>

Qiskit mathematically bridges the gap between biological Python code and subatomic physics.

A developer simply writes Python code: \`circuit.h(0)\` to apply a Hadamard gate to Qubit 0, and \`circuit.cx(0, 1)\` to Entangle it with Qubit 1. 

When the user runs the script, Qiskit mathematically compiles the code into microwave pulse instructions, sends it over the internet to IBM's biological Quantum Data Center in New York, fires the lasers at the subatomic particles in a cryogenic freezer, and returns the result to your laptop.

</TechnologyTemplate>
`,
  '56. Quantum Computing/Cirq/index.mdx': `---
title: Cirq
description: A Python software library for writing, manipulating, and optimizing quantum circuits and running them against quantum computers and simulators.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Cirq"
  subtitle="Google's NISQ Framework"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png"
  description="Cirq is Google's open-source Python framework specifically mathematically optimized for creating algorithms on NISQ-era quantum processors."
  yearCreated={2018}
  creator="Google"
  isOpenSource={true}
  websiteUrl="https://quantumai.google/cirq"
>

While IBM's Qiskit focuses on broad general quantum computing, Google's Cirq is mathematically focused on the biological reality of the NISQ era (noisy hardware). 

It exposes the physical constraints of the specific quantum hardware to the developer. If Google's Sycamore chip has Qubits laid out in a 2D grid, Cirq forces the developer to mathematically acknowledge that Qubit 1 can only be entangled with Qubit 2 if they are biologically physically next to each other on the silicon chip.

</TechnologyTemplate>
`,
  '56. Quantum Computing/PennyLane/index.mdx': `---
title: PennyLane
description: A cross-platform Python library for differentiable programming of quantum computers, heavily used for Quantum Machine Learning.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="PennyLane"
  subtitle="The Quantum Machine Learning SDK"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="PennyLane is a Python library mathematically designed to merge Neural Networks (PyTorch/TensorFlow) with Quantum Circuits."
  yearCreated={2018}
  creator="Xanadu"
  isOpenSource={true}
  websiteUrl="https://pennylane.ai/"
>

PennyLane introduces the mathematical concept of **Quantum Differentiable Programming**.

It treats a Quantum Computer exactly like a biological GPU. You can build a Machine Learning model where layer 1 is a classical PyTorch neural network, layer 2 mathematically executes on an IBM Quantum Computer, and layer 3 goes back to PyTorch. PennyLane handles the insane calculus required to backpropagate gradients *through* the subatomic quantum measurements.

</TechnologyTemplate>
`,
}

async function generateMega111() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega111().catch(console.error)
