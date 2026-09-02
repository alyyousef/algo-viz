import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/Web Audio API/index.mdx',
    content: `---
title: Web Audio API
description: "A high-level, high-performance JavaScript API for processing and synthesizing audio mathematically in web applications, bypassing the basic <audio> element."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Web Audio API">
      {children}
    </ConceptTemplate>
  )
}

Historically, playing audio on the web meant using the TICK1<audio>TICK1 HTML tag. This is fine for playing a podcast, but it is mathematically useless for building a video game or a Digital Audio Workstation (DAW) like GarageBand. The TICK1<audio>TICK1 tag suffers from high latency, cannot mix multiple tracks simultaneously, and cannot apply real-time mathematical effects like Reverb or EQ.

The **Web Audio API** solves this by introducing a highly optimized mathematical **Audio Routing Graph**. It allows developers to generate, manipulate, and spatialize audio streams with microsecond precision directly inside the browser's C++ audio thread, completely independent of the main JavaScript UI thread.

## 1. Deep Dive & Mechanics

The Web Audio API is built entirely on the concept of **Audio Nodes**. 

You create an **AudioContext** (the mathematical universe where the sound exists), and then you chain together various mathematical nodes, similar to plugging guitar pedals into an amplifier.

1. **Source Nodes:** Where the sound begins. This can be an MP3 file (TICK1AudioBufferSourceNodeTICK1), your laptop's microphone (TICK1MediaStreamAudioSourceNodeTICK1), or a mathematically generated sine wave (TICK1OscillatorNodeTICK1).
2. **Processing Nodes:** The mathematical filters. You pass the source through a Volume control (TICK1GainNodeTICK1), an Equalizer (TICK1BiquadFilterNodeTICK1), or a Spatializer (TICK1PannerNodeTICK1) to make the sound appear as if it's behind your left ear.
3. **Destination Node:** The final output. Usually TICK1audioCtx.destinationTICK1, which mathematically maps directly to your physical laptop speakers or headphones.

## 2. Mathematical / Theoretical Foundation

The true power of the Web Audio API is its ability to execute mathematical synthesis (Oscillators) and DSP (Digital Signal Processing) at the sample rate level.

A standard audio file plays at **44,100 Hz** (Samples per second). This means the browser must mathematically calculate the exact electrical voltage of the speaker 44,100 times every single second to generate a smooth sound wave. 

If you attempt to do this in standard JavaScript using a TICK1whileTICK1 loop, the V8 garbage collector will eventually pause your code for 5 milliseconds, causing the audio to audibly crackle and pop (buffer underrun).

The Web Audio API solves this by moving all the heavy DSP mathematics into a dedicated background C++ thread. You define the graph in JavaScript, but the actual 44.1 kHz mathematical crunching happens in highly optimized C++ (or WebAssembly via TICK1AudioWorkletTICK1), guaranteeing zero crackling even if the main UI thread freezes.

## 3. Real-World Implementation

Here is how you mathematically synthesize a musical note (A4 = 440 Hz) and fade it out smoothly.

TICK3javascript
// 1. Create the mathematical universe (Requires a user click to start due to autoplay policies)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSynthesizer() {
  // 2. Create the Source: A mathematical Sine Wave oscillating at 440 Hz
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine'; // Could be 'square', 'sawtooth', 'triangle'
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // 440 Hz (Note A4)

  // 3. Create a Processing Node: Volume Control (Gain)
  const gainNode = audioCtx.createGain();
  
  // 4. Mathematical Automation: Fade the volume from 1.0 (Max) down to 0.0 over 2 seconds
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);

  // 5. Connect the Graph: Oscillator -> Volume -> Laptop Speakers
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // 6. Start the mathematical generation
  oscillator.start();
  
  // Clean up memory after 2 seconds when the sound has faded out
  oscillator.stop(audioCtx.currentTime + 2);
}
TICK3

## 4. Visualizations

TICK3mermaid
graph LR
    subgraph The Audio Routing Graph
        Src1[Oscillator (Synth)] --> Gain1[Gain Node (Volume)]
        Src2[Microphone] --> EQ[Biquad Filter (Bass Boost)]
        
        Gain1 --> Reverb[Convolver Node (Reverb)]
        EQ --> Reverb
        
        Reverb --> Dest[AudioContext.destination (Speakers)]
    end

    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    class Dest highlight;
TICK3

## 5. Interview Prep

**Q: What is spatial audio, and how does the Web Audio API handle it?**
**A:** Spatial audio mathematically tricks the human brain into hearing sound in 3D space using standard stereo headphones. The TICK1PannerNodeTICK1 uses HRTF (Head-Related Transfer Functions) mathematics. If you program an explosion at coordinates TICK1(x: 10, y: 0, z: 0)TICK1 (far to the right), the API mathematically delays the sound reaching the left ear by a fraction of a millisecond and muffles the high frequencies (simulating the physical shadow of the human head), creating a perfect 3D illusion.

**Q: Why does TICK1audioCtx.resume()TICK1 exist? (The Autoplay Policy problem)**
**A:** Historically, advertisers abused the Web Audio API to blast audio the millisecond a webpage loaded. In 2018, Google mathematically broke this by enforcing the **Autoplay Policy**. When a page loads, the TICK1AudioContextTICK1 starts in a "suspended" state. It mathematically cannot make sound until the user explicitly interacts with the DOM (a click or a tap). The developer must hook into that click event and execute TICK1audioCtx.resume()TICK1 to unlock the audio thread.

**Q: What is an TICK1AudioWorkletTICK1?**
**A:** The standard API provides pre-built nodes (like Reverb or EQ). But what if you want to build a custom distortion pedal with entirely new mathematics? Historically, developers used TICK1ScriptProcessorNodeTICK1, which executed custom JS on the main thread (causing terrible crackling). **AudioWorklet** is the modern replacement. It allows you to write custom DSP math (in JS or highly optimized WebAssembly) and inject it *directly* into the browser's dedicated C++ audio rendering thread, ensuring perfect, glitch-free performance.

## 6. Production Use Cases

- **Web-Based DAWs and Synthesizers:** Applications like Soundtrap (acquired by Spotify) or web-based drum machines are built entirely on the Web Audio API. They load hundreds of raw audio buffers into RAM, mathematically schedule their playback on a microscopic timeline, and route them through massive graphs of EQs and Compressors, replicating the functionality of $500 desktop software entirely in the browser.
- **Audio Visualizers (Music Visualizers):** The TICK1AnalyserNodeTICK1 is a specific processing node that does not alter the sound. Instead, it continuously performs a mathematical **Fast Fourier Transform (FFT)** on the audio stream as it passes through. It outputs an array of integers representing the precise energy of the bass, mid, and treble frequencies at that exact millisecond. Developers pump this mathematical array into the Canvas API (or WebGL) 60 times a second to draw reactive, bouncing 3D EQ bars.

<Callout icon="info" title="Precision Scheduling">
Never use \`setTimeout()\` to schedule music in JavaScript. The main thread is unpredictable; your drum beat will drift out of time. The Web Audio API provides its own high-precision hardware clock: \`audioCtx.currentTime\`. If you want a drum to hit exactly 5.5 seconds from now, you use \`source.start(audioCtx.currentTime + 5.5)\`. The C++ audio thread mathematically guarantees the sound will fire at that exact nanosecond, completely bypassing JavaScript's event loop latency.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '\`\`\`')
      .replace(/TICK1/g, '\`')
      
    await fs.writeFile(filePath, processedContent, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
