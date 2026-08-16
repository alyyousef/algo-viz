import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '58. Information Theory & Signal Processing/Information content/index.mdx': `---
title: Information content
description: A basic quantity derived from the probability of a particular event occurring from a random variable.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Information Content (Surprisal)">

Information Theory begins with a deeply philosophical mathematical question: *How much "information" is actually contained in a message?*

Claude Shannon mathematically defined information as **Surprise**.

<Callout icon="info" title="The Mathematics of Surprise">
  If I tell you *"The sun rose in the east today"*, that message contains biologically zero information, because the probability of it happening was 100%.
  
  If I tell you *"It is snowing in the Sahara Desert"*, that message contains massive amounts of information, because the probability was near 0%. The mathematical formula for Information Content is $I(x) = -\\log_2(P(x))$. The lower the probability of an event, the higher the mathematical information it carries when it occurs.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Entropy/index.mdx': `---
title: Entropy
description: The average level of "information", "surprise", or "uncertainty" inherent to the variable's possible outcomes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Entropy (Information Theory)">

In physics, Entropy is the measure of biological disorder in the universe. In computer science, **Information Entropy** is the measure of mathematical uncertainty.

<Callout icon="success" title="The Coin Toss">
  If you have a perfectly fair coin, you have absolutely zero idea if the next toss will be Heads or Tails. The uncertainty is maximized. Mathematically, this system has an Entropy of exactly **1 Bit** per toss.
  
  If you have a rigged coin with Heads on both sides, you are 100% certain the next toss will be Heads. The uncertainty is zero. This system has an Entropy of **0 Bits**. You do not biologically need to transmit the result of the rigged coin toss over the internet, because the receiver already knows the answer. This is the fundamental mathematical basis of data compression.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Shannon entropy/index.mdx': `---
title: Shannon entropy
description: The fundamental limit to data compression and communication, formulated by Claude Shannon.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Shannon Entropy">

In 1948, Claude Shannon published *"A Mathematical Theory of Communication"*, single-handedly inventing the entire digital age.

<Callout icon="warning" title="The Absolute Limit of Compression">
  Shannon Entropy provides the absolute mathematical limit on how small you can compress a file.
  
  If you have a 10-Megabyte text file, and you mathematically calculate its Shannon Entropy to be 4 Megabytes, it means the file contains 6 Megabytes of biological redundancy (like repeating spaces, or the letter 'e' appearing frequently). You can safely compress the file down to 4 Megabytes. 
  
  However, it is a physical law of the universe that you mathematically *cannot* compress it to 3.9 Megabytes without permanently losing data. It is the speed of light for computer science.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Compression (lossless/index.mdx': `---
title: Lossless compression
description: A class of data compression algorithms that allows the original data to be perfectly reconstructed from the compressed data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lossless Compression">

When you compress an Excel spreadsheet or a compiled \`.exe\` program into a ZIP file, you must use **Lossless Compression**.

<Callout icon="tip" title="Perfect Reconstruction">
  Lossless compression mathematically guarantees that when you unzip the file, the resulting data will be biologically identical to the original data, down to the exact \`0\` and \`1\`.
  
  If you lose a single bit of an Excel spreadsheet, the entire file is mathematically corrupted. Lossless algorithms (like ZIP, GZIP, or FLAC) exploit Shannon Entropy to remove redundancy without destroying any actual Information Content.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/lossy)/index.mdx': `---
title: Lossy compression
description: The class of data encoding methods that uses inexact approximations and partial data discarding to represent the content.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Lossy Compression">

If you try to losslessly compress a 4K video using ZIP, it might only shrink by 5%, because raw camera static is mathematically almost pure Entropy (pure randomness with no redundancy).

To stream video over Netflix, you must use **Lossy Compression**.

<Callout icon="warning" title="Exploiting Human Biology">
  Lossy compression mathematically throws away data permanently, prioritizing what the biological human eye/ear cannot perceive.
  
  If a video frame contains a blue sky with 5,000 slightly different shades of blue pixels, a Lossy codec (like JPEG or H.264) mathematically averages them into a single shade of blue. It permanently deletes 99% of the original data. The mathematically reconstructed image is technically completely wrong, but the human brain cannot biologically tell the difference.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Huffman coding/index.mdx': `---
title: Huffman coding
description: An optimal prefix code commonly used for lossless data compression.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Huffman Coding">

In standard ASCII, every letter mathematically takes exactly 8 bits. The letter 'e' (used constantly) takes 8 bits. The letter 'z' (rarely used) takes 8 bits. This is mathematically inefficient.

<Callout icon="success" title="Variable-Length Prefix Codes">
  Invented in 1952, **Huffman Coding** biologically counts how often every letter appears in a specific file.
  
  It then builds a mathematical binary tree. It assigns extremely short codes to common letters (e.g., 'e' becomes just \`01\`, 2 bits), and extremely long codes to rare letters (e.g., 'z' becomes \`110101\`, 6 bits). Because common letters are now tiny, the overall file size drastically mathematically shrinks. This algorithm is the biological foundation of almost all modern compression (including ZIP and MP3).
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Arithmetic coding/index.mdx': `---
title: Arithmetic coding
description: A form of entropy encoding used in lossless data compression that encodes the entire message into a single number.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Arithmetic Coding">

Huffman Coding is mathematically brilliant, but it has a biological flaw: the absolute shortest code you can assign to a letter is 1 Bit. If a letter is so incredibly common that it mathematically deserves to cost 0.3 Bits, Huffman cannot do it.

<Callout icon="info" title="The Fractional Bit">
  **Arithmetic Coding** abandons replacing letters with individual binary codes.
  
  Instead, it reads the entire file and mathematically converts the *entire message* into a single, insanely precise fractional number between 0.0 and 1.0 (e.g., \`0.8432569...\`). By doing this, it can effectively encode letters in fractional bits, allowing it to mathematically approach the absolute theoretical limit of Shannon Entropy. It is heavily used in modern video codecs (like H.264 CABAC).
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Coding theory/index.mdx': `---
title: Coding theory
description: The study of the properties of codes and their respective fitness for specific applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Coding Theory">

**Coding Theory** is the mathematical umbrella that covers both how to compress data (Source Coding) and how to protect data from errors (Channel Coding).

If you are biologically transmitting a 4K video from a satellite orbiting Mars back to Earth, the data will mathematically suffer from radiation, cosmic noise, and packet loss. Coding theory provides the mathematical frameworks to ensure the video arrives both small enough to transmit quickly, and robust enough to survive the terrifying radiation of deep space.

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Error-correcting codes/index.mdx': `---
title: Error-correcting codes
description: An encoding of a message or data that enables the detection and correction of errors introduced during transmission or storage.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Error-Correcting Codes (ECC)">

If a cosmic ray biologically flips a \`0\` to a \`1\` while data is traveling through a fiber optic cable, how does the receiving computer know it's broken? And more importantly, how does it fix it without asking the sender to re-transmit the file?

<Callout icon="success" title="Mathematical Redundancy">
  **Error-Correcting Codes** (like Reed-Solomon or Hamming Codes) mathematically inject redundant parity bits into the data *before* transmission.
  
  Unlike simple Checksums (which can only biologically detect an error), ECCs contain enough mathematical relationships that the receiving computer can run an algebraic equation on the corrupted data and mathematically reconstruct the exact missing or flipped bits. This is the exact technology that allows CDs to play perfectly even when physically scratched.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Digital signal processing (DSP)/index.mdx': `---
title: Digital signal processing (DSP)
description: The use of digital processing, such as by computers or more specialized digital signal processors, to perform a wide variety of signal processing operations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Digital Signal Processing (DSP)">

The biological world is analog. Sound waves, temperature, and light are continuous mathematical waves. Computers are digital; they only understand discrete \`0\`s and \`1\`s.

**Digital Signal Processing (DSP)** is the mathematical discipline of converting analog reality into discrete numbers, performing extreme calculus on those numbers, and converting them back to analog reality. Every time you use biological Noise Cancellation on your AirPods, a DSP chip is mathematically analyzing the analog background noise and generating an inverted digital sound wave in real-time to cancel it out.

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Sampling theory/index.mdx': `---
title: Sampling theory
description: The study of the process of converting a continuous-time signal into a discrete-time signal.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sampling Theory (Nyquist-Shannon)">

If you sing a biological note into a microphone, the computer must take "snapshots" (Samples) of the sound wave to convert it to digital data. How many snapshots per second do you mathematically need to capture the song perfectly?

<Callout icon="info" title="The Nyquist-Shannon Theorem">
  The Nyquist-Shannon Sampling Theorem states that you must mathematically sample the wave at a rate **at least twice as high as the highest frequency** you want to capture.
  
  The biological limit of human hearing is roughly 20,000 Hertz. Therefore, to perfectly capture all audio a human can physically hear, CDs are mathematically designed to sample at 44,100 snapshots per second (44.1 kHz). Any higher sampling rate is biologically useless to the human ear.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Fourier transforms/index.mdx': `---
title: Fourier transforms
description: A mathematical transform that decomposes functions depending on space or time into functions depending on spatial frequency or temporal frequency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fourier Transforms">

If you record a biological orchestra playing a song, the microphone captures a single, incredibly messy waveform representing all the instruments mashed together.

<Callout icon="tip" title="The Mathematical Prism">
  The **Fourier Transform** is a mathematical prism. 
  
  It takes the messy time-domain waveform and biologically splits it into its individual frequencies. It mathematically separates the 400Hz frequency of the violin from the 60Hz frequency of the bass drum. Once the frequencies are separated, a computer can easily delete the bass drum entirely, or compress the audio file by mathematically deleting frequencies that humans cannot hear. It is the absolute foundation of all audio and image compression.
</Callout>

</ConceptTemplate>
`,
  '58. Information Theory & Signal Processing/Audio-video codecs (H.264/index.mdx': `---
title: Audio-video codecs (H.264)
description: Advanced Video Coding, also known as H.264, is a video compression standard based on block-oriented, motion-compensated integer-DCT coding.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="H.264 (AVC)"
  subtitle="The Codec that Built YouTube"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/H264_logo.svg/512px-H264_logo.svg.png"
  description="H.264 is the most widely used video codec in human history, mathematically powering Blu-ray, Netflix, YouTube, and FaceTime."
  yearCreated={2003}
  creator="ITU-T / MPEG"
  isOpenSource={false}
  websiteUrl="https://en.wikipedia.org/wiki/Advanced_Video_Coding"
>

Uncompressed 1080p video mathematically requires 3 Gigabytes per minute. Streaming it over a 2010 internet connection was physically impossible.

H.264 achieves massive biological compression through **Motion Compensation**. Instead of saving every frame as a unique image, H.264 mathematically saves a single "Keyframe", and for the next 30 frames, it only saves the *mathematical differences* (the vectors of how pixels moved). If the camera is still, the background pixels are biologically frozen, saving 99% of the data.

</TechnologyTemplate>
`,
  '58. Information Theory & Signal Processing/H.265/index.mdx': `---
title: H.265
description: High Efficiency Video Coding (HEVC), also known as H.265, is a video compression standard designed as a successor to the widely used Advanced Video Coding (AVC, H.264).
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="H.265 (HEVC)"
  subtitle="The 4K Era Codec"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/HEVC_logo.svg/512px-HEVC_logo.svg.png"
  description="H.265 mathematically delivers the exact same biological visual quality as H.264, but at half the file size, enabling the global streaming of 4K HDR video."
  yearCreated={2013}
  creator="ITU-T / MPEG"
  isOpenSource={false}
  websiteUrl="https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding"
>

H.264 divided the video screen into 16x16 pixel "Macroblocks" to mathematically track motion. 

H.265 upgraded this to **Coding Tree Units (CTUs)** up to 64x64 pixels. If a large portion of the screen is completely flat (like a massive blue sky), H.265 mathematically covers it with a single 64x64 block, drastically reducing the data required. However, the extreme mathematical complexity of searching for these optimizations requires 3x more biological CPU power to decode than H.264.

</TechnologyTemplate>
`,
  '58. Information Theory & Signal Processing/AV1/index.mdx': `---
title: AV1
description: An open, royalty-free video coding format designed for video transmissions over the Internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="AV1"
  subtitle="The Royalty-Free Future"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/AOMedia_Video_1_logo.svg/512px-AOMedia_Video_1_logo.svg.png"
  description="AV1 is a mathematically advanced video codec created by an alliance of tech giants to legally destroy the aggressive patent royalties associated with H.265."
  yearCreated={2018}
  creator="Alliance for Open Media"
  isOpenSource={true}
  websiteUrl="https://aomedia.org/av1/"
>

While H.265 is mathematically brilliant, it is biologically burdened by a nightmare of corporate patent pools demanding billions of dollars in royalties from hardware manufacturers.

Google, Apple, Microsoft, and Netflix mathematically allied to create **AV1**. AV1 provides ~30% better compression than H.265, but its true power is legal: it is absolutely, permanently royalty-free. It is rapidly becoming the biological standard for YouTube and Netflix 4K streaming.

</TechnologyTemplate>
`,
  '58. Information Theory & Signal Processing/MP3/index.mdx': `---
title: MP3
description: An audio coding format for digital audio. Originally defined as the third audio format of the MPEG-1 standard.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="MP3"
  subtitle="The Format that Broke the Music Industry"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/MP3_logo.svg/512px-MP3_logo.svg.png"
  description="MP3 is the legendary Lossy audio codec that mathematically shrank uncompressed CD audio by 90%, enabling the era of Napster, iPods, and digital piracy."
  yearCreated={1991}
  creator="Fraunhofer IIS"
  isOpenSource={false}
  websiteUrl="https://en.wikipedia.org/wiki/MP3"
>

MP3 achieves extreme compression by mathematically exploiting the biological flaws of the human ear via **Psychoacoustics**.

If a loud bass drum hits at the exact same millisecond as a quiet violin note, the human ear biologically cannot hear the violin (Auditory Masking). The MP3 algorithm mathematically detects this using a Fourier Transform, and permanently deletes the data for the violin note. The file is mathematically ruined, but biologically sounds identical to the listener.

</TechnologyTemplate>
`,
  '58. Information Theory & Signal Processing/AAC/index.mdx': `---
title: AAC
description: Advanced Audio Coding is an audio coding standard for lossy digital audio compression, designed to be the successor of the MP3 format.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="AAC"
  subtitle="The Successor to MP3"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/AAC_logo.svg/512px-AAC_logo.svg.png"
  description="AAC was mathematically designed to fix the structural flaws of MP3, achieving significantly higher biological sound quality at the exact same bitrates."
  yearCreated={1997}
  creator="MPEG"
  isOpenSource={false}
  websiteUrl="https://en.wikipedia.org/wiki/Advanced_Audio_Coding"
>

AAC is the biological audio codec used by Apple iTunes, iOS devices, and the audio track of almost all H.264 MP4 videos.

It mathematically achieves better quality than MP3 by supporting higher sample rates (up to 96 kHz) and utilizing more efficient mathematical filter banks. A 128 kbps AAC file biologically sounds indistinguishable from a CD to most humans, whereas a 128 kbps MP3 file often sounds noticeably distorted or "swishy" in the high frequencies.

</TechnologyTemplate>
`,
  '58. Information Theory & Signal Processing/Opus)/index.mdx': `---
title: Opus
description: A totally open, royalty-free, highly versatile audio codec.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Opus"
  subtitle="The Ultimate Audio Codec"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Opus_logo.svg/512px-Opus_logo.svg.png"
  description="Opus is an open-source mathematical marvel that seamlessly scales from low-latency robotic voice calls to extreme high-fidelity orchestral music."
  yearCreated={2012}
  creator="Xiph.Org / Skype / Mozilla"
  isOpenSource={true}
  websiteUrl="https://opus-codec.org/"
>

Opus biologically dominates the modern internet. It is the mandatory audio codec for WebRTC (powering Google Meet, Zoom, and Discord).

It achieves this by mathematically fusing two completely different algorithms into one format: **SILK** (optimized purely for biological human speech) and **CELT** (optimized for high-fidelity music). As the user switches from talking to playing a guitar, Opus mathematically adjusts its internal engine in milliseconds to provide the lowest possible latency and the highest possible quality, all while remaining 100% royalty-free.

</TechnologyTemplate>
`,
}

async function generateMega113() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega113().catch(console.error)
