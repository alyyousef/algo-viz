import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '28. Large Language Models/Speculative decoding/index.mdx': `---
title: Speculative Decoding
description: A powerful inference optimization that uses a small draft model to massively accelerate the generation of a large model.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Speculative Decoding">

Standard autoregressive generation is entirely memory-bandwidth bound. A 70B parameter model must load 140GB of weights from VRAM into the compute cores to generate a single token, leaving the GPU\\'s actual math units mostly idle.

**Speculative Decoding** solves this by generating multiple tokens at once using a tiny "Draft" model, and then verifying them in parallel with the massive "Target" model.

<Callout icon="success" title="Speedup without Quality Loss">
  Because the massive Target model always gets the final say, Speculative Decoding guarantees the exact same mathematical output as standard generation, but often 2x to 3x faster.
</Callout>

## The Mechanism

1. **Drafting:** A tiny, incredibly fast model (e.g., 1B parameters) guesses the next $K$ tokens (e.g., $K=4$).
2. **Verification:** The massive model (e.g., 70B parameters) processes all $K$ tokens in a single forward pass. Because modern GPUs have massive parallel compute capabilities, evaluating 4 tokens takes almost the exact same time as evaluating 1 token.
3. **Accept/Reject:** If the Target model agrees with the Draft model\\'s guess for token 1, it accepts it. If it disagrees on token 2, it rejects token 2 (and all subsequent drafted tokens) and uses its own generation for token 2. The process then repeats.

</ConceptTemplate>
`,
  '28. Large Language Models/rotary-RoPE/index.mdx': `---
title: Rotary Position Embedding (RoPE)
description: The industry-standard positional encoding method allowing LLMs to extrapolate to extremely long context windows.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rotary Position Embedding (RoPE)">

Transformers inherently have no concept of word order. The word "Dog" looks mathematically identical at the beginning or end of a sentence. Positional encodings are required to inject the concept of "position" into the tokens.

**Rotary Position Embedding (RoPE)** is the state-of-the-art technique used by almost all modern open-weight models (like Llama 3 and Mistral).

<Callout icon="tip" title="The Problem with Absolute Encodings">
  Older models (like GPT-2) added a fixed positional vector to the token embedding. This means the model memorized absolute positions. If you trained the model on 2,048 tokens, it mathematically crashed if you gave it 2,049 tokens because it had never learned an embedding for position 2,049.
</Callout>

## The Rotary Math

Instead of adding a vector, RoPE mathematically **rotates** the Query and Key vectors in a complex 2D plane. 
- The amount of rotation is proportional to the absolute position of the token.
- Because of trigonometric properties, the dot product between a Query and a Key (the core of the Attention mechanism) depends purely on the **relative distance** between the two tokens, rather than their absolute positions.
- This allows models to naturally extrapolate to longer sequences than they were trained on, enabling the massive 100k+ token context windows we see today.

</ConceptTemplate>
`,
  '28. Large Language Models/RLAIF/index.mdx': `---
title: Reinforcement Learning from AI Feedback (RLAIF)
description: Using a massive AI model as the judge to align a smaller AI model, eliminating the human bottleneck.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reinforcement Learning from AI Feedback (RLAIF)">

Reinforcement Learning from Human Feedback (RLHF) was the secret sauce that created ChatGPT. However, hiring thousands of humans to rate AI outputs is slow, expensive, and scales poorly as models become smarter than average humans.

**RLAIF** replaces the human rater with a state-of-the-art AI model (like GPT-4).

<Callout icon="info" title="The Alignment Pipeline">
  In RLAIF, you give a prompt to the model you are training, and it generates Response A and Response B. You then send the prompt and both responses to an "AI Judge" (e.g., Claude 3.5 Sonnet) along with a strict rubric. The Judge evaluates which response is better, and that AI-generated preference data is used to train the Reward Model.
</Callout>

## Advantages over Humans

<ComparisonTable 
  headers={['Factor', 'Human Feedback', 'AI Feedback (RLAIF)']}
  rows={[
    ['Cost and Speed', 'High cost, weeks or months to collect.', 'Pennies via API, collected in hours.'],
    ['Consistency', 'Humans naturally disagree, get tired, and have personal biases.', 'An AI judge strictly adheres to the mathematical prompt and rubric, producing highly consistent ratings.'],
    ['Complex Domains', 'Humans struggle to evaluate complex code or deep scientific research.', 'A frontier AI model can verify code syntax and logical proofs much faster than a human grader.']
  ]}
/>

</ConceptTemplate>
`,
  '28. Large Language Models/Quantisation (GPTQ/index.mdx': `---
title: Post-Training Quantization (GPTQ)
description: A revolutionary mathematical compression technique to shrink LLMs so they fit on consumer GPUs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Post-Training Quantization (GPTQ)">

A 70-Billion parameter model stored in standard 16-bit precision requires over 140GB of VRAM just to load the weights. This requires a server with multiple $40,000 Nvidia H100 GPUs. 

**Quantization** mathematically compresses the weights from 16-bit floating-point numbers down to 8-bit, 4-bit, or even 2-bit integers, drastically reducing memory usage with surprisingly little loss in "smartness".

<Callout icon="success" title="The GPTQ Algorithm">
  GPTQ is a specific, highly advanced quantization algorithm. It doesn\\'t just blindly round numbers. It analyzes the model\\'s activation patterns on a calibration dataset and uses second-order mathematical approximations (Hessian matrices) to intelligently adjust the remaining weights to compensate for the precision lost during rounding.
</Callout>

## Why Quantization Works

Neural networks are incredibly robust to noise. A weight of \`0.81234\` (16-bit) might be rounded to \`0.8\` (4-bit). The exact precision rarely matters for the final output logic. The bottleneck in LLM inference is **memory bandwidth** (moving weights from VRAM to the processor), not compute. By shrinking the weights, you move them 4x faster, actually increasing text generation speed on consumer hardware.

</ConceptTemplate>
`,
  '28. Large Language Models/QLoRA/index.mdx': `---
title: QLoRA (Quantized Low-Rank Adaptation)
description: The breakthrough technique that democratized LLM fine-tuning by allowing massive models to be trained on a single gaming GPU.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="QLoRA (Quantized Low-Rank Adaptation)">

Fine-tuning a massive LLM requires astronomically more memory than just running it, because you must store the optimizer states and gradients for every parameter. For a 65B model, standard fine-tuning requires 780GB of VRAM (10x A100 GPUs).

**QLoRA** combined Quantization with Parameter-Efficient Fine-Tuning (LoRA) to mathematically smash this memory barrier, reducing the requirement from 780GB to just 48GB.

<Callout icon="info" title="The Mathematical Magic">
  QLoRA quantizes the massive base model down to a special 4-bit format (NormalFloat4). The base model is completely frozen. Then, a tiny set of 16-bit LoRA adapter weights are attached. During training, the 4-bit weights are mathematically "dequantized" on the fly to calculate gradients, but only the tiny 16-bit LoRA weights are actually updated.
</Callout>

## QLoRA Innovations

<ComparisonTable 
  headers={['Innovation', 'Description']}
  rows={[
    ['4-bit NormalFloat (NF4)', 'A mathematically optimal data type designed specifically for the normal distribution of neural network weights, retaining far more accuracy than standard 4-bit integers.'],
    ['Double Quantization', 'Quantizing the quantization constants themselves, saving an additional 0.37 bits per parameter (which equals 3GB of VRAM on a 65B model).'],
    ['Paged Optimizers', 'Using Nvidia Unified Memory to mathematically page optimizer states to CPU RAM if the GPU VRAM runs out, preventing catastrophic Out Of Memory (OOM) crashes.']
  ]}
/>

</ConceptTemplate>
`,
  '28. Large Language Models/Positional encoding (absolute/index.mdx': `---
title: Absolute Positional Encoding
description: The original mathematical trick used by the 2017 Transformer to understand word order.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Absolute Positional Encoding">

Because the Transformer processes an entire sentence simultaneously in parallel (unlike the sequential RNN), it naturally has no concept of order. It sees the sentence as a "bag of words."

The original *Attention Is All You Need* paper solved this by mathematically injecting **Absolute Positional Encodings** directly into the word embeddings before they entered the network.

<Callout icon="warning" title="The Extrapolation Problem">
  Absolute encodings are rarely used in modern LLMs because they fail at extrapolation. If you train a model on 512 tokens, it learns the absolute encoding for position 512. If you pass it a 600-token prompt during inference, the math breaks down because the model has never seen the encoding for position 513. This was replaced by relative encodings like RoPE.
</Callout>

## The Sine and Cosine Math

To ensure the model could recognize position mathematically, the creators used alternating sine and cosine functions of different frequencies:

$PE_{(pos, 2i)} = \\sin(pos / 10000^{2i/d_{model}})$
$PE_{(pos, 2i+1)} = \\cos(pos / 10000^{2i/d_{model}})$

This complex mathematical wave ensures that every single position has a completely unique, deterministic vector, and that the mathematical distance between position 5 and 6 is identical to the distance between position 500 and 501.

</ConceptTemplate>
`,
  '28. Large Language Models/Model evaluation benchmarks/index.mdx': `---
title: Model Evaluation Benchmarks
description: The standardized tests used to mathematically evaluate and compare the intelligence of LLMs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model Evaluation Benchmarks">

As hundreds of new LLMs are released monthly, the industry requires standardized, mathematical benchmarks to compare their capabilities. However, evaluating an LLM is notoriously difficult because language is highly subjective, and models often "cheat" by having the benchmark data accidentally included in their training sets (Data Contamination).

<Callout icon="tip" title="The LMSYS Chatbot Arena">
  Because static benchmarks are often "gamed" by models, the community largely relies on the **LMSYS Chatbot Arena**. It is a blind, crowdsourced A/B testing platform where a human provides a prompt, two anonymous models generate answers, and the human votes on the winner. The models are then ranked using the mathematical Elo rating system (like in Chess).
</Callout>

## Standard Static Benchmarks

<ComparisonTable 
  headers={['Benchmark', 'Domain', 'Description']}
  rows={[
    ['MMLU (Massive Multitask Language Understanding)', 'General Knowledge', 'The gold standard. 57 subjects across STEM, humanities, and others. Evaluates if the model possesses world knowledge and problem-solving ability.'],
    ['HumanEval', 'Coding', 'A set of 164 hand-written programming problems. The model must write a Python function, which is then executed against hidden unit tests. Measures actual logic, not just syntax.'],
    ['GSM8K', 'Mathematics', 'Grade School Math word problems. Tests the model\\'s ability to perform multi-step mathematical reasoning.']
  ]}
/>

</ConceptTemplate>
`,
  '28. Large Language Models/GGUF)/index.mdx': `---
title: GGUF Format
description: The file format that revolutionized running local LLMs on CPUs and consumer hardware.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GGUF Format">

Historically, saving and loading neural networks relied on Python-specific formats like \`pickle\` or \`PyTorch tensors\`. These required massive Python environments and were tightly coupled to Nvidia GPUs.

**GGUF** (GPT-Generated Unified Format) is a revolutionary binary format created by the \`llama.cpp\` community. It allows massive LLMs to be distributed as a single file and executed on almost any hardware—including Apple MacBooks and standard Intel CPUs—with extreme efficiency.

<Callout icon="success" title="The Quantization Integration">
  GGUF\\'s massive popularity stems from its native support for quantization. You can download a 7B parameter model quantized to 4-bits as a single 4GB \`.gguf\` file, and run it locally on an old laptop using entirely CPU RAM, with incredible inference speed.
</Callout>

## Key Advantages

<ComparisonTable 
  headers={['Advantage', 'Description']}
  rows={[
    ['Single File Deployment', 'A GGUF file contains the entire model: the weights, the tokenizer vocabulary, and all hyperparameter metadata. No external configuration files are needed.'],
    ['Extensibility', 'It is a key-value based format. If a new architecture requires a new metadata field, it can be added to the GGUF file without breaking older software that parses it.'],
    ['mmap Capability', 'The file can be mathematically memory-mapped directly from the SSD to RAM, meaning loading a 40GB model takes seconds instead of minutes.']
  ]}
/>

</ConceptTemplate>
`,
  '28. Large Language Models/AWQ/index.mdx': `---
title: Activation-aware Weight Quantization (AWQ)
description: A highly efficient quantization technique that preserves LLM performance by protecting the most mathematically important weights.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Activation-aware Weight Quantization (AWQ)">

When you quantize a model from 16-bit to 4-bit, you are mathematically rounding numbers and destroying precision. Standard quantization degrades the "smartness" of the model significantly. 

**AWQ** solves this by discovering that not all weights are created equal. Roughly 1% of the weights in an LLM are absolutely critical to its reasoning capabilities.

<Callout icon="info" title="The Activation Insight">
  AWQ does not look at the weights themselves to determine importance. Instead, it looks at the **Activations**—the actual data flowing through the network when given a sample of text. If a specific weight constantly interacts with massive activation values, AWQ flags it as "salient" (important).
</Callout>

## How AWQ Works

1. **Calibration:** Run a small dataset through the 16-bit model and mathematically monitor the activations.
2. **Identification:** Identify the top 1% of weights corresponding to the largest activations.
3. **Scaling:** Instead of keeping the 1% in 16-bit (which complicates GPU memory management), AWQ mathematically multiplies the important weights by a large scaling factor, and divides the subsequent activation by the same factor.
4. **Quantization:** When the scaled weights are rounded to 4-bit, the scaling factor ensures they retain significantly more mathematical precision than the unimportant weights. 

</ConceptTemplate>
`,
  '28. Large Language Models/Adapters/index.mdx': `---
title: Adapters
description: Small modular neural network blocks inserted into pre-trained LLMs to add specialized knowledge without retraining the base model.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Adapters">

Adapters are the foundational concept behind Parameter-Efficient Fine-Tuning (PEFT). Instead of mathematically updating the billions of weights in a massive foundation model to teach it a new task, you freeze the base model entirely. 

You then insert tiny, trainable neural network modules—**Adapters**—between the existing layers of the Transformer.

<Callout icon="success" title="Modular Intelligence">
  Because the base model remains frozen, you can train 50 different adapters for 50 different tasks (e.g., Medical Adapter, Legal Adapter, Python Adapter). During inference, you just load the 70B base model into VRAM once, and hot-swap the tiny 50MB adapters in milliseconds depending on the user\\'s question.
</Callout>

## Standard Adapter Architecture

The original adapter design (proposed by Houlsby et al.) uses a mathematical "bottleneck" structure:

1. **Down-projection:** A linear layer shrinks the massive incoming dimension (e.g., 4096) down to a tiny dimension (e.g., 64).
2. **Non-linearity:** A standard activation function (like ReLU or GELU) processes the compressed data.
3. **Up-projection:** A second linear layer scales the 64-dimension data back up to 4096.
4. **Residual Connection:** The output is mathematically added back to the original input.

This bottleneck forces the adapter to compress and learn only the most essential task-specific knowledge.

</ConceptTemplate>
`,
  '28. Large Language Models/ALiBi)/index.mdx': `---
title: ALiBi (Attention with Linear Biases)
description: A positional encoding method that allows models to extrapolate to longer contexts by mathematically penalizing distant tokens.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ALiBi (Attention with Linear Biases)">

ALiBi is a positional encoding technique designed to solve the context window extrapolation problem. While RoPE (Rotary Position Embeddings) mathematically rotates vectors, ALiBi takes a radically simpler approach: it directly manipulates the Attention scores.

<Callout icon="tip" title="The Intuition">
  The core idea of ALiBi is that words closer together are usually more relevant to each other than words far apart. Therefore, ALiBi mathematically subtracts a penalty from the Attention score between two tokens, and that penalty grows linearly as the distance between the tokens increases.
</Callout>

## The Mathematics of ALiBi

In standard Attention, the score between a Query and a Key is simply their dot product. 

In ALiBi, the Attention score is modified before the softmax is applied:
$AttentionScore = (Q \\cdot K) - (m \\times distance)$

- **distance:** The number of tokens separating the Query and Key.
- **m (slope):** A fixed, head-specific scalar penalty. Some attention heads have a steep penalty (focusing only on adjacent words), while others have a very shallow penalty (allowing them to look far back in the context).

Because ALiBi relies purely on relative distance and requires no complex trigonometric embeddings, a model trained on 1024 tokens can seamlessly be handed a 2048-token prompt during inference without breaking down.

</ConceptTemplate>
`,
}

async function generateMega60() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega60().catch(console.error)
