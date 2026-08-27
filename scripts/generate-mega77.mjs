import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Text generation/index.mdx': `---
title: Text Generation
description: The mathematical process of Autoregressive Language Modeling, where an AI synthesizes human-like text by iteratively calculating the probability distribution of the next word.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Text Generation">

An LLM like ChatGPT does not "think." It executes a massive mathematical loop called Autoregressive Generation, predicting exactly one Token at a time until it reaches a special TICK1<STOP>TICK1 token.

## 1. The Softmax Probability Distribution
When the AI is given the prompt "The sky is", it processes those vectors through billions of parameters. 
The final layer of the network is a massive **Softmax Layer** containing every single word in the English vocabulary. The network mathematically outputs a probability for every word:
- "blue" (95.0%)
- "dark" (4.0%)
- "falling" (0.9%)
- "apple" (0.0001%)

## 2. Temperature and Sampling
If the AI always picks the 95% word (Greedy Decoding), it sounds extremely robotic and repetitive.
To make it sound human, engineers use **Temperature Sampling**. If you increase the Temperature variable in the math equation, it mathematically flattens the probability curve. "Blue" might drop to 60%, and "falling" might rise to 15%. The AI then rolls a mathematical dice and randomly selects a word based on these new probabilities. This controlled mathematical randomness is what gives Generative AI its "creativity."

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Text-to-image (Stable Diffusion/index.mdx': `---
title: Stable Diffusion
description: A groundbreaking, open-source Text-to-Image model that mathematically democratized AI art by executing complex Diffusion processes entirely within a compressed Latent Space.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Stable Diffusion"
  subtitle="Open-Source Latent Diffusion"
  tags={['AI', 'Generative', 'Open Source', 'Diffusion']}
>

Before Stable Diffusion, generating high-resolution images required massive server farms. Stable Diffusion proved that world-class image generation could run mathematically on a consumer laptop.

## 1. Latent Diffusion Models (LDM)
Standard Diffusion models mathematically manipulate raw pixels (Pixel Space), which requires immense VRAM.
Stable Diffusion uses an Autoencoder (VAE) to mathematically crush the 512x512 image into a tiny 64x64 **Latent Tensor**. 
The entire complex mathematical denoising process (adding and removing static noise based on the text prompt) occurs solely inside this tiny 64x64 matrix. Because the mathematical grid is 64 times smaller, the processing time and VRAM requirements drop by orders of magnitude, allowing it to run on standard Nvidia consumer GPUs.

## 2. ControlNet
Stable Diffusion's open-source nature led to massive architectural innovations, primarily **ControlNet**.
A raw text prompt ("A man dancing") lacks spatial precision. ControlNet mathematically attaches a secondary Neural Network to the Diffusion process. You can feed ControlNet a stick-figure skeleton (a Pose Map) or a Canny Edge map. The mathematics explicitly force the Diffusion model to generate the "dancing man" exactly matching the spatial coordinates of the skeleton, granting artists absolute physical control over the AI's hallucination.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Text-to-video/index.mdx': `---
title: Text-to-Video
description: The frontier of Generative AI, requiring networks to mathematically master both 2D spatial coherence (like an image) and strict 3D temporal physics across thousands of sequential frames.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Text-to-Video">

Generating a single image is mathematically hard. Generating a 10-second video at 30 FPS requires generating 300 images that mathematically obey the laws of physics over time.

## 1. Temporal Consistency
If you ask an image generator to draw "A dog running" 300 times, you will get 300 completely different breeds of dogs in different locations. 
Text-to-Video models (like OpenAI's Sora or Runway Gen-2) introduce **Temporal Attention Layers**. 
When the network is mathematically generating Frame 45, it is explicitly calculating mathematical connections back to Frame 44, Frame 10, and Frame 1. This forces the AI to mathematically remember the specific geometry of the dog it drew in Frame 1, ensuring the fur pattern and lighting remain flawlessly consistent as the dog moves through 3D space.

## 2. Spacetime Patches
Sora revolutionized video generation by treating video not as a sequence of frames, but as a single mathematical block of "Spacetime."
It mathematically chops the entire 10-second video into 3D cubes (Spacetime Patches), containing width, height, and time duration. By training a massive Diffusion Transformer on these 3D patches, the AI mathematically learns the physics of the real world (e.g., gravity, occlusion, fluid dynamics) without ever being explicitly programmed with a physics engine.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/VAEs/index.mdx': `---
title: Variational Autoencoders (VAEs)
description: A probabilistic neural network architecture that mathematically compresses data into a smooth, continuous Latent Space, allowing for the interpolation and generation of new data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Variational Autoencoders (VAEs)">

An Autoencoder compresses data (Encoder) and decompresses it (Decoder). However, standard Autoencoders create a mathematically disjointed Latent Space that cannot generate *new* things. VAEs solve this using statistics.

## 1. The Probabilistic Latent Space
Instead of mathematically compressing an image of a cat into a single, exact, hardcoded Vector (e.g., TICK1[2.5, -1.0]TICK1), a VAE forces the Encoder to output a **Probability Distribution**.
It outputs a Mean and a Variance. The model mathematically says, "The cat is located somewhere inside this blurry circle in the Latent Space." 

## 2. Interpolation and Generation
Because the VAE forces these "blurry circles" to overlap smoothly across the entire Latent Space, the space becomes mathematically continuous.
This allows for **Interpolation**. You can mathematically plot a point halfway between the Latent Vector for "Cat" and the Latent Vector for "Dog." Because the space is continuous, when you pass that halfway point to the Decoder, it will physically generate an image of a hybrid creature that looks exactly 50% cat and 50% dog. This smooth mathematical generation is impossible with standard compression algorithms.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Video generation/index.mdx': `---
title: Video Generation
description: The overarching field of AI that synthesizes moving imagery, encompassing Text-to-Video, Image-to-Video, and the algorithmic mathematical modeling of temporal fluid dynamics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Video Generation">

Video Generation encompasses a wide array of mathematical approaches beyond just Text-to-Video, focusing heavily on manipulating existing frames and predicting future temporal states.

## 1. Image-to-Video (Animation)
A more controllable workflow than Text-to-Video is Image-to-Video. 
The user provides a perfectly composed starting image (Frame 1). The AI's mathematical job is purely temporal prediction: "Given this exact physical state, what do the physics look like in Frame 2?" 
By providing motion vectors (e.g., mathematically telling the AI "Pan the camera left" or "Add wind to the hair"), the AI calculates the optical flow and animates the still image with mathematically accurate fluid dynamics (like rippling water or flickering fire).

## 2. Frame Interpolation
Video Generation is also used to mathematically upscale frame rates. 
If you have a 30 FPS video, and you want 60 FPS slow-motion, standard software just duplicates the frames (resulting in stutter). 
AI Frame Interpolation reads Frame 1 and Frame 2, and mathematically calculates the physical motion vector of every single pixel. It then synthesizes a brand new Frame 1.5, placing the moving objects at the exact mathematical midpoint between the two frames, resulting in flawlessly smooth artificial slow-motion.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Voice cloning/index.mdx': `---
title: Voice Cloning
description: A highly specialized application of Audio Generation where AI mathematically analyzes a tiny sample of a person's speech to extract their unique vocal biometrics and synthesize new speech in their voice.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Voice Cloning">

Traditional Text-to-Speech (TTS) models took weeks of recording in a studio to train a single voice. Zero-Shot Voice Cloning (like ElevenLabs) mathematically requires only 3 seconds of reference audio.

## 1. The Speaker Embedding
Voice Cloning relies on a mathematical separation of variables. 
The AI is trained on thousands of different voices. It mathematically learns to separate *What* is being said (The Text/Phonemes) from *Who* is saying it (The Speaker Identity).
When you provide a 3-second clip of your voice, the AI passes it through an Encoder that mathematically ignores the words and extracts only the physical properties of your vocal cords and resonance chamber. This is compressed into a single, dense mathematical vector called the **Speaker Embedding**.

## 2. Conditioned Generation
To generate new speech, you type a prompt. The Text-to-Speech engine generates the Phonemes.
During the final synthesis step (often a Diffusion model or a Vocoder), the mathematical engine is explicitly conditioned on your Speaker Embedding. It mathematically forces the generated audio waves to conform to the acoustic constraints of your specific vocal tract, perfectly replicating your pitch, timbre, and accent.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Actor model programming/index.mdx': `---
title: Actor Model Programming
description: A highly robust concurrency paradigm where independent "Actors" manage their own private state and communicate exclusively by passing asynchronous mathematical messages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Actor Model Programming">

Traditional multithreading (using Mutexes and Shared Memory) is mathematically chaotic and prone to Deadlocks. The Actor Model (famous in Erlang and Akka) solves this by completely eliminating shared memory.

## 1. The Autonomous Actor
In this paradigm, the fundamental unit of computation is the **Actor**.
An Actor is a mathematically isolated object. It has its own private state (variables) and its own private execution thread. Crucially, it is mathematically impossible for Actor A to directly read or mutate the variables inside Actor B. They share absolutely zero memory.

## 2. Asynchronous Message Passing
To communicate, Actor A must serialize its request into an immutable Message and place it in Actor B's **Mailbox** (a mathematical queue). 
Actor B reads its Mailbox one message at a time, processing them sequentially. Because Actor B only ever processes one message at a time, it mathematically never requires a Mutex Lock. 
Furthermore, this mathematical isolation provides incredible fault tolerance (Supervision Trees). If Actor B encounters a fatal error and crashes, it cannot mathematically corrupt the memory of the rest of the system; the Supervisor simply restarts Actor B from a clean state.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Array programming/index.mdx': `---
title: Array Programming
description: A highly mathematical programming paradigm that treats massive data structures (Arrays/Matrices) as primitive types, automatically applying operations to the entire structure simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Array Programming">

If you want to multiply every number in an array by 2 in a standard language (like Java), you must write a TICK1forTICK1 loop, mathematically incrementing an index and modifying each element sequentially. Array Programming eliminates the loop.

## 1. Scalar vs. Vector Operations
Array Programming languages (like APL, Fortran, or Python's NumPy library) mathematically promote Arrays to first-class citizens.
If TICK1ATICK1 is a massive matrix containing 1 million numbers, you simply write TICK1B = A * 2TICK1. 
The mathematical compiler/interpreter automatically understands that the scalar TICK12TICK1 must be broadcast across the entire structure. The programmer never writes a TICK1forTICK1 loop. This declarative syntax drastically reduces code size and explicitly maps to the underlying mathematics of Linear Algebra.

## 2. SIMD Hardware Acceleration
Because the programmer does not write a sequential TICK1forTICK1 loop, the Array Programming compiler is free to heavily optimize the mathematics.
It automatically leverages **SIMD (Single Instruction, Multiple Data)** instructions on the CPU (or GPU). Instead of mathematically multiplying the numbers one by one, SIMD hardware mathematically multiplies 4, 8, or 16 numbers in a single physical clock cycle. By using Array Programming, developers unlock massive hardware acceleration without writing low-level C code.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Aspect-oriented programming/index.mdx': `---
title: Aspect-Oriented Programming (AOP)
description: A paradigm designed to mathematically extract "cross-cutting concerns" (like logging or security) from the main business logic and automatically weave them back in during compilation or runtime.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Aspect-Oriented Programming (AOP)">

In a banking application, every single method (Deposit, Withdraw, Transfer) must implement Logging, Security Checks, and Database Transactions. If you hardcode this into every method, the business logic is mathematically buried under boilerplate (Code Tangling).

## 1. Cross-Cutting Concerns
AOP isolates these repetitive tasks into independent modules called **Aspects**. 
You write the Security Check mathematically exactly once inside a TICK1SecurityAspectTICK1. You write the actual business logic inside the TICK1WithdrawTICK1 method, completely free of any security code.

## 2. Pointcuts and Weaving
How does the Security code actually execute? You define a **Pointcut**. 
A Pointcut is a mathematical regular expression for the compiler. You define a rule: TICK1"Before any method starting with 'Transfer' is executed, run the SecurityAspect."TICK1
During compilation (or dynamically at runtime), the AOP framework performs **Weaving**. It mathematically intercepts the method calls, automatically injecting the Aspect code exactly where the Pointcut dictates. This results in an incredibly clean, mathematically modular codebase (popularized by frameworks like Spring in Java).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/3. Programming Paradigms & Language Theory/3.1 Paradigms/Concurrent programming/index.mdx': `---
title: Concurrent Programming
description: The architectural paradigm of structuring a program into mathematically independent tasks that can execute out-of-order or in partial overlap without altering the final correct outcome.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Concurrent Programming">

Concurrency is often confused with Parallelism. Parallelism is a hardware physical state (two CPU cores executing math at the exact same physical millisecond). Concurrency is a software architecture state (structuring code so it *could* be executed in parallel).

## 1. Non-Deterministic Execution
In a sequential program, Step A mathematically finishes before Step B starts. The execution order is Deterministic (100% predictable).
In a Concurrent program, Task A and Task B are spawned simultaneously. It is mathematically impossible to predict which one will finish first, because it depends entirely on the Operating System's thread scheduler and hardware interrupts. The developer must mathematically design the architecture to guarantee the correct result regardless of the execution order (Non-Determinism).

## 2. The Shared State Problem
The fundamental mathematical nightmare of Concurrency is Shared Mutable State.
If Task A and Task B are executing concurrently and both mathematically try to add TICK11TICK1 to a shared global variable TICK1XTICK1, a Data Race occurs. They might both read TICK1XTICK1 as 5, both calculate 6, and both write 6 back to RAM. Mathematically, TICK1XTICK1 should be 7, but data corruption occurred. 
Concurrent programming relies heavily on synchronization primitives (Mutexes, Semaphores, Atomic Variables) or alternative paradigms (Actor Model, pure Functional Programming) to mathematically prevent these race conditions.

</ConceptTemplate>
`
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
