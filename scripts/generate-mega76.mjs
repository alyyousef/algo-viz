import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Foundation models/index.mdx': `---
title: Foundation Models
description: Massive, general-purpose Neural Networks mathematically trained on vast quantities of unlabelled data, designed to be adapted (fine-tuned) for thousands of different downstream tasks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Foundation Models">

Before 2018, if you wanted an AI to translate French, you trained a French-translation model. If you wanted it to write code, you trained a coding model. Foundation Models shattered this paradigm.

## 1. Unsupervised Pre-Training
A Foundation Model (like GPT-4 or LLaMA) is not trained to do a specific task.
It is trained using Self-Supervised Learning on the entire mathematical sum of the public internet. The model's only mathematical objective is to predict the next word (or mask a hidden word). By being forced to predict trillions of words across physics papers, Shakespeare, and Python code, the model mathematically builds an internal representation of human logic, reasoning, and syntax.

## 2. Few-Shot Adaptation
Because the pre-trained model has already mathematically mapped human reality, it requires almost zero effort to adapt it to a new task.
You do not need to train it to classify Sentiment. You simply provide it a prompt with 3 examples (Few-Shot Prompting). The model mathematically extrapolates the pattern from your 3 examples and applies the general logic it learned during pre-training to solve your specific task, acting as the "foundation" for modern AI applications.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/GANs/index.mdx': `---
title: Generative Adversarial Networks (GANs)
description: A brilliant mathematical architecture where two Neural Networks are pitted against each other in a zero-sum game to generate highly realistic synthetic data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Generative Adversarial Networks (GANs)">

Invented by Ian Goodfellow in 2014, GANs were the first AI models capable of generating truly photorealistic faces of people who never existed.

## 1. The Generator and the Discriminator
A GAN is composed of two distinct Neural Networks locked in a mathematical war.
- **The Generator**: A network that takes random mathematical noise and tries to synthesize an image of a face.
- **The Discriminator**: A network that acts as a detective. It is fed real faces from a dataset and fake faces from the Generator, and must mathematically predict which is real.

## 2. The Zero-Sum Mathematical Game
The networks are trained simultaneously. 
If the Discriminator correctly flags a fake face, the Generator receives a massive mathematical penalty during Backpropagation, forcing it to generate a better fake. If the Generator successfully fools the Discriminator, the Discriminator receives the penalty, forcing it to become a better detective.
This adversarial mathematical loop continues until the Generator becomes so flawlessly perfect that the Discriminator is mathematically forced to guess with exactly 50/50 probability. At this point, the Generator is outputting indistinguishable-from-reality data.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Image generation/index.mdx': `---
title: Image Generation
description: The computational process of synthesizing completely novel, high-resolution pixel matrices from text prompts, driven primarily by Diffusion architectures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Image Generation">

AI Image Generation has mathematically evolved from generating blurry 32x32 pixel approximations to rendering 4K, award-winning, photorealistic art in seconds.

## 1. The Latent Space
Modern image generators (like Stable Diffusion) do not mathematically operate in Pixel Space.
Operating on a 1024x1024 RGB image requires calculating 3.1 million parameters per step, which would melt a standard GPU. Instead, the AI mathematically compresses the image into a **Latent Space** (e.g., a 64x64 grid). The Diffusion process (adding and removing noise) happens entirely in this compressed mathematical realm. Once the AI finishes generating the latent vector, a mathematical Decoder massively upscales it back into the 1024x1024 physical Pixel Space, reducing compute time by 99%.

## 2. Text Conditioning (Cross-Attention)
How does the AI know to generate "A Cyberpunk City"? 
The text prompt is converted into an NLP Vector. During the Diffusion process, the Neural Network uses a mathematical **Cross-Attention Mechanism**. It physically weaves the NLP Vector into the Image Vectors at every single step of the denoising process. This mathematical fusion ensures the resulting pixels explicitly align with the semantic meaning of the words.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Image-to-image translation/index.mdx': `---
title: Image-to-Image Translation
description: A specialized Generative AI task where the mathematical structure of a source image is preserved while its physical style or domain is fundamentally altered.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Image-to-Image Translation">

If you sketch a crude outline of a shoe, Image-to-Image Translation mathematically converts that sketch into a photorealistic photograph of a Nike sneaker, preserving the exact geometry but altering the domain.

## 1. Paired Translation (Pix2Pix)
Early Image-to-Image models required strictly paired datasets. 
To train the model to colorize Black-and-White photos, scientists had to provide exactly matched pairs: (Color Photo A, B&W Photo A). The Neural Network learned a strict mathematical mapping from the B&W domain to the Color domain. But paired datasets are rare. You cannot find an exact paired dataset of "A horse running" and "That exact same horse running, but as a zebra."

## 2. Unpaired Translation (CycleGAN)
CycleGAN revolutionized the field using a mathematical trick called **Cycle Consistency Loss**.
You provide two massive, unrelated folders: 1,000 random pictures of Horses, and 1,000 random pictures of Zebras. 
The AI trains two GANs simultaneously. Generator A translates the Horse into a Zebra. Generator B translates that Zebra *back* into a Horse. The mathematical loss function explicitly checks if the reconstructed Horse perfectly matches the original Horse. If it does, the mathematical translation is deemed successful, allowing for domain translation without paired data.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Inpainting-outpainting/index.mdx': `---
title: Inpainting & Outpainting
description: The targeted mathematical alteration of an image, allowing AI to seamlessly erase and replace objects inside an image (Inpainting) or expand the canvas beyond its original borders (Outpainting).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Inpainting & Outpainting">

Unlike generating an image from scratch, Inpainting and Outpainting force the Generative AI to mathematically respect existing pixel boundaries, making them powerful tools for photo editing.

## 1. Inpainting (Masking)
If a tourist ruins your photograph, you want to remove them. 
You draw a physical Mask (a binary mathematical matrix where 1 = tourist, 0 = background) over the person. The Diffusion model is fed the original image and the mask. The mathematical rules of the model explicitly freeze the unmasked pixels; they cannot be altered. The AI is only allowed to run the Diffusion denoising process on the masked pixels, forcing it to hallucinate a background that mathematically blends perfectly with the frozen edges.

## 2. Outpainting
Outpainting is the exact same mathematics, but reversed. 
You provide an image, and you expand the canvas, leaving the new outer edges completely blank (or filled with static noise). The original image is mathematically frozen. The Diffusion model denoises the outer borders, seamlessly expanding the environment (e.g., taking the Mona Lisa and mathematically generating the rest of the room she is sitting in) while maintaining perfect lighting and perspective.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Midjourney)/index.mdx': `---
title: Midjourney
description: A proprietary, state-of-the-art Generative AI service accessed via Discord, famous for its unparalleled mathematical optimization of artistic aesthetics and photorealism.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Midjourney"
  subtitle="Aesthetic-First Image Generation"
  tags={['AI', 'Generative', 'Art', 'Diffusion']}
>

While open-source models like Stable Diffusion require intense manual prompt engineering and negative prompting to achieve good results, Midjourney is mathematically tuned to default to breathtaking artistry.

## 1. RLHF for Aesthetics
Most Image Generators are trained purely on minimizing the mathematical loss between the image and the text caption. If the prompt is "A car," and the AI draws a boring, badly-lit car, the mathematical loss is 0 (it successfully drew a car).
Midjourney utilizes massive **RLHF (Reinforcement Learning from Human Feedback)**. Millions of users on Discord mathematically vote on which images they prefer. Midjourney's engineers use this data to mathematically fine-tune the model to not just draw the object, but to prioritize specific cinematic lighting, composition rules (Rule of Thirds), and highly detailed textures, ensuring almost every generation is a masterpiece.

## 2. Continuous Latent Refinement
Midjourney is renowned for its specific rendering engine. While the exact architecture is closed-source, it heavily utilizes advanced continuous latent refinement, where the V5 and V6 models mathematically preserve intricate details (like readable text and perfect human hands) that earlier Diffusion architectures mathematically destroyed during the denoising process.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Multimodal models/index.mdx': `---
title: Multimodal Models
description: The next evolution of Artificial Intelligence, where a single, unified mathematical architecture can natively process and generate Text, Audio, Images, and Video simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multimodal Models">

Humans are multimodal. We see a stop sign (vision), read the text (language), and hear a car horn (audio) simultaneously. Early AI was unimodal (text-only or image-only). Multimodal models mathematically combine these domains.

## 1. The Universal Latent Space
How can a Neural Network understand both a Shakespeare sonnet and a photograph of a cat?
Through a **Universal Latent Space**. The model has a Text Encoder (which converts the sonnet into a math vector) and a Vision Encoder (which converts the cat into a math vector). Crucially, both vectors are mathematically projected into the *exact same* geometric space. This allows the core Transformer network to mathematically relate the pixel of a cat's ear directly to the word "feline," establishing deep cross-domain semantic understanding.

## 2. Native Multimodality (GPT-4o / Gemini)
Early multimodal systems were "stitched." If you gave it an image, a separate Image-to-Text model would write a description, and the LLM would read the text. This mathematically destroyed the nuance of the image.
Native Multimodal models (like Google Gemini and GPT-4o) do not stitch. They ingest raw image tokens, raw audio waveforms, and raw text tokens directly into the same core mathematical Attention layers. This allows the model to analyze the emotional tone of a voice clip while simultaneously identifying objects in a live video feed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Music generation/index.mdx': `---
title: Music Generation
description: The mathematically complex task of generating melodically and rhythmically coherent audio tracks, requiring AI to understand long-term temporal dependencies like verse-chorus structure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Music Generation">

Generating a 3-second sound effect of a dog barking is mathematically easy. Generating a 3-minute pop song with a coherent melody, beat, and returning chorus is one of the hardest temporal problems in AI.

## 1. The Long-Term Dependency Problem
Music is mathematically bound by time. A chorus played at 0:45 must mathematically repeat at 2:15, in the exact same key and tempo. 
Standard autoregressive models (which predict the next note) mathematically "forget" the beginning of the song after 30 seconds, resulting in aimless, wandering jazz that never resolves.
Modern models (like MusicGen or Suno) use specialized hierarchical Transformers. They mathematically generate the "macro-structure" of the song first (e.g., Intro -> Verse -> Chorus), and then condition the micro-level audio generation on that macro-structure, forcing mathematical cohesion across minutes of audio.

## 2. Symbolic vs. Audio Generation
- **Symbolic (MIDI)**: The AI does not generate audio. It mathematically generates a sheet of music (MIDI data). It says "Play C4 on a Piano for 500ms." This is computationally cheap but sounds robotic.
- **Raw Audio**: The AI generates the actual waveforms of the instruments. It must mathematically deduce how a guitar string physically vibrates when plucked, and synthesize that frequency from scratch.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/RAG/index.mdx': `---
title: Retrieval-Augmented Generation (RAG)
description: The industry-standard enterprise AI architecture that mathematically prevents LLM hallucinations by forcing the model to explicitly read retrieved, factual documents before answering.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Retrieval-Augmented Generation (RAG)">

An LLM is a mathematical probability engine, not a database. If you ask it for your company's Q3 revenue, it will hallucinate a highly probable, but factually false, number. RAG solves this.

## 1. The Retrieval Phase (Vector Search)
Before the LLM is even invoked, RAG mathematically searches your private data.
1. All your company PDFs are converted into mathematical Vectors (Embeddings) and stored in a Vector Database (like Pinecone).
2. The user asks: "What is our Q3 revenue?"
3. The question is vectorized. The database calculates the mathematical Cosine Similarity between the question vector and all document vectors, instantly retrieving the 3 paragraphs that actually contain the Q3 revenue data.

## 2. The Generation Phase (In-Context Learning)
The system mathematically constructs a massive new Prompt. 
It says: TICK1"You are an AI. Answer the user's question based ONLY on the following context. If the answer is not in the context, say 'I don't know'. CONTEXT: [Pasted Q3 Revenue Paragraphs]. QUESTION: What is our Q3 revenue?"TICK1
The LLM now acts purely as a reading comprehension engine. It mathematically synthesizes the answer directly from the injected context, guaranteeing absolute factual accuracy and mathematically eliminating hallucination.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/29. Generative AI & Multimodal/Style transfer/index.mdx': `---
title: Neural Style Transfer
description: A groundbreaking mathematical algorithm that separates the physical content of one image and fuses it with the artistic style of another image using deep convolutional layers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Neural Style Transfer">

If you take a photograph of your house, Neural Style Transfer can mathematically repaint it to look exactly as if Vincent van Gogh painted it, preserving the house's geometry but adopting his brushstrokes.

## 1. Separating Content and Style
The algorithm uses a pre-trained Convolutional Neural Network (like VGG-19).
It feeds the Photograph into the network. It does not care about the final prediction; it mathematically extracts the raw activations from the *deepest* layers of the network. These deep layers mathematically represent the **Content** (the physical geometry of the house).
It then feeds the Van Gogh painting into the network and extracts the activations from the *shallow* layers. It mathematically calculates the Gram Matrix of these layers, which captures the **Style** (the texture, color, and brushstrokes, ignoring the actual objects in the painting).

## 2. The Optimization Loop
The AI creates a brand new image of pure white noise. 
It runs a mathematical optimization loop (Gradient Descent). It mathematically twists the pixels of the white noise image until its "Content" matches the Photograph, AND its "Style" matches the Van Gogh painting. After a few hundred iterations, the resulting image is a perfect, mathematically calculated fusion of both inputs.

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
