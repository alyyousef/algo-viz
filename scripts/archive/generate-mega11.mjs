import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/26. Deep Learning/CNNs/index.mdx': `---
title: Convolutional Neural Networks (CNNs)
description: Specialized deep learning models for processing grid-like data such as images.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Convolutional Neural Networks (CNNs)">

A Convolutional Neural Network (CNN or ConvNet) is a class of artificial neural network most commonly applied to analyze visual imagery. They are explicitly designed to process data that has a known grid-like topology, such as 2D images (pixels) or 1D time-series data.

<Callout icon="info" title="Biological Inspiration">
  The architecture of a CNN is inspired by the organization of the animal visual cortex. Individual cortical neurons respond to stimuli only in a restricted region of the visual field known as the receptive field.
</Callout>

## Core Operations

Unlike traditional multi-layer perceptrons, CNNs use three main operations to drastically reduce the number of parameters and capture spatial hierarchies:

<ComparisonTable 
  headers={['Operation', 'Description']}
  rows={[
    ['Convolution', 'Applies a filter (kernel) over the input to produce a feature map, detecting edges, colors, or textures.'],
    ['Pooling (Subsampling)', 'Reduces the spatial dimensions (width and height) of the input, making the detection of features invariant to scale and orientation.'],
    ['Fully Connected', 'Standard neural network layers at the end that use the extracted features for the final classification task.']
  ]}
/>

### The Convolution Layer

The convolution layer is the core building block of a CNN. It consists of a set of learnable filters. Each filter is spatially small (e.g., 3x3 or 5x5 pixels) but extends through the full depth of the input volume. 

During the forward pass, each filter is convolved across the width and height of the input volume, computing the dot product between the entries of the filter and the input. This produces a 2D activation map that gives the responses of that filter at every spatial position.

<Callout icon="tip" title="Parameter Sharing">
  CNNs achieve efficiency through parameter sharing. A feature (like an edge) that is useful in one part of the image is likely useful elsewhere. By applying the same filter across the entire image, the model drastically reduces the number of weights it needs to learn.
</Callout>

## Common Architectures

Over the years, several landmark CNN architectures have been developed, usually competing in the ImageNet Large Scale Visual Recognition Challenge (ILSVRC).

1. **LeNet-5 (1998)**: One of the earliest CNNs, used for recognizing handwritten digits.
2. **AlexNet (2012)**: Popularized CNNs by winning ILSVRC 2012 by a huge margin, utilizing GPUs for training.
3. **VGGNet (2014)**: Showed that simply using very small (3x3) convolution filters across the entire network works very well if the network is deep enough.
4. **ResNet (2015)**: Introduced residual connections (skip connections) to train extremely deep networks (152 layers) without suffering from the vanishing gradient problem.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/RNNs/index.mdx': `---
title: Recurrent Neural Networks (RNNs)
description: Networks designed to process sequential data by maintaining a hidden state.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Recurrent Neural Networks (RNNs)">

A Recurrent Neural Network (RNN) is a class of artificial neural networks where connections between nodes form a directed graph along a temporal sequence. This allows it to exhibit temporal dynamic behavior. Unlike feedforward neural networks, RNNs can use their internal state (memory) to process variable length sequences of inputs.

<Callout icon="info" title="The Sequence Problem">
  Traditional neural networks cannot handle sequential data natively because they assume all inputs and outputs are independent of each other. If you want to predict the next word in a sentence, it is essential to know which words came before it.
</Callout>

## How RNNs Work

An RNN processes sequences by iterating through the elements and maintaining a **hidden state** containing information relative to what it has seen so far.

At each time step $t$, the RNN takes two inputs:
1. The current input data $x_t$ (e.g., a word in a sentence).
2. The hidden state from the previous time step $h_{t-1}$.

It combines these to produce the new hidden state $h_t$ and potentially an output $y_t$.

<ArchitectureDiagram chart={\`
graph LR
  X_t[Input x_t] --> RNN((RNN Cell))
  H_prev[Hidden State h_t-1] --> RNN
  RNN --> H_next[Hidden State h_t]
  RNN --> Y_t[Output y_t]
\`} />

## The Vanishing Gradient Problem

While RNNs are theoretically capable of learning long-term dependencies (e.g., connecting a subject at the start of a paragraph to a verb at the end), they struggle in practice. 

During training using Backpropagation Through Time (BPTT), the gradients can become extremely small (vanish) as they are propagated back across many time steps. This means the weights connecting early steps are barely updated, causing the network to "forget" earlier information.

<Callout icon="error" title="Exploding Gradients">
  Conversely, gradients can also grow exponentially large (explode), causing the weights to oscillate wildly or become NaN. This is typically managed using a technique called gradient clipping.
</Callout>

To solve the vanishing gradient problem, advanced RNN architectures were created, most notably **LSTMs** and **GRUs**.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/LSTMs/index.mdx': `---
title: Long Short-Term Memory (LSTM)
description: An advanced RNN architecture designed to solve the vanishing gradient problem and remember long-term dependencies.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Long Short-Term Memory (LSTM)">

Long Short-Term Memory (LSTM) networks are a special kind of Recurrent Neural Network (RNN), capable of learning long-term dependencies. They were introduced by Hochreiter and Schmidhuber in 1997 to explicitly address the vanishing gradient problem that plagues standard RNNs.

<Callout icon="success" title="The Highway for Gradients">
  LSTMs solve the vanishing gradient problem by introducing a "cell state" that runs straight down the entire chain, with only minor linear interactions. It acts like a conveyor belt, making it very easy for information (and gradients) to flow along it unchanged.
</Callout>

## The Architecture of an LSTM

While a standard RNN has a single neural network layer (like a tanh layer) in its repeating module, an LSTM has a more complex structure with four interacting layers, often referred to as "gates."

<ComparisonTable 
  headers={['Gate', 'Purpose', 'Activation']}
  rows={[
    ['Forget Gate', 'Decides what information to throw away from the cell state.', 'Sigmoid (outputs 0 to 1)'],
    ['Input Gate', 'Decides which values from the input will be used to update the memory state.', 'Sigmoid & Tanh'],
    ['Cell State Update', 'Calculates the new candidate values and updates the main cell state.', 'Linear Addition'],
    ['Output Gate', 'Decides what the next hidden state should be, based on the cell state.', 'Sigmoid & Tanh']
  ]}
/>

### 1. The Forget Gate
The first step is deciding what information to discard. It looks at the previous hidden state $h_{t-1}$ and the current input $x_t$, and outputs a number between 0 and 1 for each number in the cell state $C_{t-1}$. A 1 means "keep completely," and a 0 means "get rid of completely."

### 2. The Input Gate
Next, it decides what new information to store. A sigmoid layer (the "input gate layer") decides which values will be updated, and a tanh layer creates a vector of new candidate values that could be added to the state.

### 3. The Output Gate
Finally, it decides what to output. The output is based on the cell state, but filtered. A sigmoid layer decides what parts of the cell state make it to the output, and the cell state is pushed through a tanh to normalize values between -1 and 1.

<Callout icon="tip" title="GRUs vs LSTMs">
  Gated Recurrent Units (GRUs) are a popular variation of LSTMs. They combine the forget and input gates into a single "update gate" and merge the cell state and hidden state. This makes them simpler to implement and faster to train than LSTMs, often with similar performance.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/GANs/index.mdx': `---
title: Generative Adversarial Networks (GANs)
description: A framework where two neural networks contest with each other in a zero-sum game to generate new data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Generative Adversarial Networks (GANs)">

Generative Adversarial Networks (GANs) are a class of machine learning frameworks designed by Ian Goodfellow and his colleagues in 2014. GANs are a method of generative modeling using deep learning methods, where two neural networks are trained simultaneously in an adversarial setting.

<Callout icon="info" title="The Counterfeiter and the Police">
  The standard analogy for a GAN is a game of cat and mouse between a counterfeiter (the Generator) trying to produce fake currency, and the police (the Discriminator) trying to detect the fakes. As the game goes on, both get better at their jobs until the fakes are indistinguishable from real currency.
</Callout>

## The Two Networks

A GAN consists of two entirely separate neural networks that compete against each other:

1. **The Generator ($G$)**: Its goal is to generate fake data (e.g., images) that look as realistic as possible. It takes random noise as input and outputs a synthetic data sample.
2. **The Discriminator ($D$)**: Its goal is to differentiate between real data (from the training set) and fake data (created by the Generator). It acts as a binary classifier.

## The Training Process

Training a GAN is a minimax game. 

- The Discriminator wants to maximize its accuracy in distinguishing real from fake.
- The Generator wants to minimize the Discriminator's accuracy (or maximize its mistake rate).

<ArchitectureDiagram chart={\`
graph LR
  Noise[Random Noise] --> Generator
  Generator --> FakeData[Fake Data]
  RealData[Real Data] --> Discriminator
  FakeData --> Discriminator
  Discriminator --> Prediction[Real or Fake?]
\`} />

The training loop alternates between two phases:
1. **Train the Discriminator**: Show it a batch of real data (label 1) and a batch of fake data from the generator (label 0). Calculate the loss and backpropagate to update *only* the Discriminator's weights.
2. **Train the Generator**: Generate a batch of fake data. Pass it to the Discriminator. Calculate the loss based on how many the Discriminator classified as *fake* (the generator wants it to be classified as real). Backpropagate this loss through the Discriminator (without updating its weights) to update the Generator's weights.

## Challenges with GANs

While incredibly powerful for tasks like image generation (e.g., DeepFakes, StyleGAN), GANs are notoriously difficult to train.

<ComparisonTable 
  headers={['Problem', 'Description']}
  rows={[
    ['Mode Collapse', 'The Generator discovers one specific output that fools the Discriminator perfectly and only produces that one output, losing all diversity.'],
    ['Non-convergence', 'The models oscillate and never reach an equilibrium (Nash equilibrium).'],
    ['Vanishing Gradients', 'If the Discriminator gets too good too fast, the Generator learns nothing because the gradients are near zero.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Autoencoders/index.mdx': `---
title: Autoencoders
description: Unsupervised neural networks that learn to compress and reconstruct data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Autoencoders">

An Autoencoder is a specific type of artificial neural network used to learn efficient codings of unlabeled data (unsupervised learning). The goal of an autoencoder is to learn a representation (encoding) for a set of data, typically for dimensionality reduction, by training the network to ignore signal "noise."

<Callout icon="info" title="Compression vs Autoencoders">
  Autoencoders are similar to compression algorithms like JPEG or MP3, but they are data-specific. An autoencoder trained on pictures of faces would do a terrible job compressing pictures of trees because the features it learned are specific to faces.
</Callout>

## The Architecture

An autoencoder consists of two main parts joined by a central bottleneck:

1. **The Encoder**: Compresses the high-dimensional input into a lower-dimensional latent space representation.
2. **The Bottleneck**: The layer that contains the compressed representation of the input data (the latent variables).
3. **The Decoder**: Reconstructs the input data from the compressed latent representation.

<ArchitectureDiagram chart={\`
graph LR
  Input[Input Data] --> Encoder
  Encoder --> Bottleneck((Latent Space))
  Bottleneck --> Decoder
  Decoder --> Output[Reconstructed Data]
\`} />

The network is trained to minimize the **Reconstruction Loss**—the difference between the original input and the reconstructed output (e.g., using Mean Squared Error).

## Why the Bottleneck?

If an autoencoder didn't have a bottleneck (if the hidden layers were wider than the input), it could simply memorize the input by passing it through the network unaltered (the identity function). By forcing the data through a smaller bottleneck, the network is forced to learn the most important, fundamental features (patterns, edges, structures) to successfully reconstruct the data on the other side.

## Types of Autoencoders

<ComparisonTable 
  headers={['Type', 'Use Case']}
  rows={[
    ['Denoising Autoencoder', 'Trained by deliberately adding noise to the input, but evaluating the loss against the original clean image. Forces the model to learn how to remove noise.'],
    ['Sparse Autoencoder', 'Adds a sparsity penalty to the loss function, forcing only a few nodes in the bottleneck to activate at once, encouraging the learning of distinct features.'],
    ['Variational Autoencoder (VAE)', 'A generative model that learns the probability distribution of the latent space, allowing it to generate entirely new, similar data.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Attention mechanisms/index.mdx': `---
title: Attention Mechanisms
description: A technique that allows models to focus on specific parts of the input sequence when producing the output.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Attention Mechanisms">

Attention is a mechanism in deep learning that dynamically weighs the importance of different parts of the input data. Originally developed for Neural Machine Translation, it solved the bottleneck problem of early Sequence-to-Sequence (Seq2Seq) models.

<Callout icon="info" title="The Cocktail Party Effect">
  Attention is biologically inspired by human cognitive focus. Just as you can focus on a single voice in a noisy room while ignoring the rest, an attention mechanism allows a neural network to focus on specific words in a sentence when translating or answering a question.
</Callout>

## The Problem with Seq2Seq

Before attention, Seq2Seq models (often using RNNs or LSTMs) worked by taking an entire input sentence and encoding it into a single, fixed-size vector (the context vector). The decoder then used this single vector to generate the output sentence.

The problem: You cannot compress a 50-word sentence into the same fixed-size vector as a 5-word sentence without losing critical information. Performance drastically degraded on long sequences.

## How Attention Solves This

Instead of relying on a single context vector, Attention provides the decoder with access to the hidden states of *all* input tokens. At every step of decoding, the model calculates an "attention score" for each input word, essentially asking: *"To generate the next output word, which input words should I focus on?"*

1. **Calculate Scores**: The decoder looks at its current state and compares it against all encoder hidden states.
2. **Apply Softmax**: The scores are passed through a softmax function, turning them into weights that sum to 1.
3. **Context Vector**: The encoder hidden states are multiplied by their respective weights and summed up to create a dynamic, step-specific context vector.

## The Key-Value-Query (QKV) Analogy

Modern attention (especially in Transformers) uses the QKV analogy, borrowed from database retrieval:
- **Query (Q)**: What the decoder is currently looking for.
- **Key (K)**: What each encoder state offers.
- **Value (V)**: The actual content of the encoder state.

The attention mechanism calculates the similarity (dot product) between the Query and all Keys. The most similar Keys get the highest weights, and the resulting Context Vector is a weighted sum of the Values.

<Callout icon="success" title="The Foundation of Transformers">
  Attention was so successful that in 2017, researchers realized they didn't need RNNs or LSTMs at all. The paper "Attention Is All You Need" introduced the Transformer architecture, which relies entirely on *Self-Attention* and fundamentally changed the AI landscape.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Diffusion models/index.mdx': `---
title: Diffusion Models
description: Generative models that learn to create data by reversing a gradual noise-addition process.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Diffusion Models">

Diffusion Models are a class of state-of-the-art generative deep learning models. They are the architecture behind modern, hyper-realistic AI image generators like Midjourney, DALL-E 3, and Stable Diffusion.

<Callout icon="info" title="Thermodynamics Inspiration">
  The concept is inspired by non-equilibrium thermodynamics. Imagine a drop of ink in a glass of water. Over time, it diffuses until the water is a uniform color (entropy). A diffusion model learns to run this physical process in reverse—turning a uniform cloud of noise back into a structured "drop of ink" (a coherent image).
</Callout>

## The Diffusion Process

Diffusion models operate in two distinct phases:

### 1. The Forward Process (Adding Noise)
During training, the model takes a clear image and systematically adds Gaussian noise to it over a series of steps (e.g., 1000 steps). By the end of the process, the image is completely destroyed and looks like pure static (isotropic Gaussian noise). This process is fixed and requires no training.

### 2. The Reverse Process (Denoising)
The neural network (typically a U-Net architecture) is trained to reverse this process. It is given a slightly noisy image and trained to predict the *noise* that was added in the previous step so it can be subtracted out.

<ComparisonTable 
  headers={['Model Type', 'How it generates data']}
  rows={[
    ['GANs', 'A single, immediate mapping from a noise vector to a complete image.'],
    ['Diffusion Models', 'An iterative, step-by-step process of refining pure noise into a coherent image over dozens of steps.']
  ]}
/>

## Why Diffusion over GANs?

While GANs were the king of image generation for years, they suffered from "mode collapse" (only generating a few types of images) and were notoriously difficult and unstable to train. 

Diffusion models, while computationally much slower during generation (because they have to run the neural network dozens of times iteratively), offer far greater stability during training and produce much higher diversity and quality in their outputs.

## Latent Diffusion Models (LDMs)

Operating directly on pixel space (a 1024x1024 image has over 3 million values) is extremely computationally expensive. 

**Stable Diffusion** solved this by introducing Latent Diffusion Models. Instead of adding noise to the actual pixels, an Autoencoder compresses the image into a smaller "latent space" (e.g., 64x64). The diffusion process (adding and removing noise) happens entirely in this compressed space, making it fast enough to run on consumer GPUs. The final latent representation is then decoded back into a full-size image.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Transformer architecture/index.mdx': `---
title: Transformer Architecture
description: A revolutionary model architecture that relies entirely on self-attention mechanisms, dispensing with recurrence.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Transformer Architecture">

The Transformer is a deep learning architecture introduced in the landmark 2017 paper *"Attention Is All You Need"* by researchers at Google. It fundamentally shifted the paradigm of Natural Language Processing (NLP) away from sequential models (RNNs, LSTMs) and laid the foundation for the current era of Large Language Models (LLMs) like GPT, BERT, and Llama.

<Callout icon="success" title="The End of Sequential Processing">
  Before the Transformer, text had to be processed sequentially (word by word), making it impossible to parallelize training. The Transformer processes all words in a sentence simultaneously, taking full advantage of modern GPU parallelism.
</Callout>

## The Core Innovation: Self-Attention

The secret to the Transformer's success is that it dispenses with recurrence and convolutions entirely, relying solely on **Self-Attention**. Self-attention allows the model to weigh the importance of every word in a sequence relative to every other word, instantly capturing context and long-range dependencies regardless of distance.

## The Architecture

The original Transformer was designed for translation and features an Encoder-Decoder structure.

<ComparisonTable 
  headers={['Component', 'Function']}
  rows={[
    ['Encoder', 'Reads the input sequence (e.g., English text) and maps it into a continuous representation that holds all the learned information.'],
    ['Decoder', 'Uses the Encoder\\'s representation to generate the output sequence (e.g., French text) one token at a time.'],
    ['Positional Encoding', 'Because the Transformer processes everything at once, it has no inherent sense of word order. Positional encodings are mathematical vectors added to the input embeddings to inject positional context.']
  ]}
/>

### Inside the Blocks

Both the Encoder and Decoder are composed of a stack of identical blocks (e.g., 6 layers in the original paper, up to 96+ in modern LLMs). Each block contains:

1. **Multi-Head Attention**: Multiple self-attention mechanisms running in parallel, allowing the model to focus on different types of relationships simultaneously (e.g., one head focuses on grammar, another on semantic meaning).
2. **Feed-Forward Network**: A standard fully connected multi-layer perceptron applied to each position independently.
3. **Layer Normalization & Residual Connections**: Used around each sub-layer to stabilize training and allow gradients to flow in deep networks.

## Evolution of the Transformer

While the original paper used an Encoder-Decoder, modern models often specialize:
- **Encoder-Only (e.g., BERT)**: Excellent for understanding tasks like sentiment analysis and classification.
- **Decoder-Only (e.g., GPT, Llama, Claude)**: Excellent for generative tasks. Autoregressively predicts the next token. This architecture dominates the modern LLM landscape.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Self-attention/index.mdx': `---
title: Self-Attention
description: A mechanism relating different positions of a single sequence to compute a representation of the sequence.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Self-Attention">

Self-Attention is the core mathematical mechanism that powers the Transformer architecture and, by extension, all modern Large Language Models (LLMs). It allows a model to weigh the importance of different words in an input sequence when encoding a specific word.

<Callout icon="info" title="Context is Everything">
  Consider the sentences: "The bank of the river" and "The bank on the corner." The word "bank" means entirely different things. Self-attention allows the model to look at "river" or "corner" to contextualize and adjust the mathematical representation of the word "bank."
</Callout>

## How it Works: The QKV System

Self-attention uses a database retrieval analogy involving **Queries (Q)**, **Keys (K)**, and **Values (V)**. For every token (word piece) in an input sequence, the model creates three distinct vectors by multiplying the token's embedding by three learned weight matrices.

1. **Query**: What I am looking for (as a token).
2. **Key**: What I have to offer (to other tokens).
3. **Value**: What I actually am (the core semantic meaning).

### The Mathematical Process

To compute the self-attention for a specific token (let's say the word "bank" in a sentence):

1. **Dot Product**: Take the Query vector of "bank" and calculate the dot product with the Key vector of *every* word in the sentence (including itself). A higher dot product means the words are highly related in this context.
2. **Scale**: Divide the results by the square root of the dimension size to stabilize gradients (Scaled Dot-Product Attention).
3. **Softmax**: Pass the scores through a Softmax function so they are all positive and sum to 1.0. This is the **Attention Matrix**.
4. **Weighted Sum**: Multiply every token's Value vector by its Softmax score, and sum them up.

The final output is a new, contextualized vector for the word "bank" that has absorbed information from the relevant words around it.

<ArchitectureDiagram chart={\`
graph TD
  Q[Queries] --> MatMul
  K[Keys] --> MatMul
  MatMul[Matrix Multiplication] --> Scale[Scale / sqrt(d_k)]
  Scale --> Softmax[Softmax]
  Softmax --> ResultMatMul
  V[Values] --> ResultMatMul[Matrix Multiplication]
  ResultMatMul --> Output[Contextualized Output]
\`} />

## Multi-Head Attention

Instead of performing a single self-attention function, Transformers use **Multi-Head Attention**. 

The Q, K, and V vectors are split into multiple "heads" (e.g., 8 or 12 heads), and attention is computed independently for each. This allows different heads to learn to focus on different linguistic phenomena simultaneously—for example, one head might track pronouns referring to nouns, while another tracks adjectives modifying subjects. The results from all heads are then concatenated back together.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Prompt engineering/index.mdx': `---
title: Prompt Engineering
description: The practice of designing and refining inputs to guide generative AI models to produce desired outputs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Prompt Engineering">

Prompt Engineering is the practice of designing, refining, and optimizing inputs (prompts) to effectively communicate with Large Language Models (LLMs) and other generative AI systems to elicit the desired output.

While it is often described casually as "talking to AI," professional prompt engineering involves understanding the underlying mechanics of how LLMs predict tokens and leveraging specific structural techniques to bound their behavior.

<Callout icon="tip" title="The Golden Rule">
  An LLM is a next-token prediction engine, not a human. It does not "understand" intent. The more explicit context, constraints, and examples you provide, the higher the probability the model will traverse the latent space to your desired output.
</Callout>

## Core Techniques

<ComparisonTable 
  headers={['Technique', 'Description']}
  rows={[
    ['Zero-Shot Prompting', 'Asking the model to perform a task without providing any examples. Relies entirely on the model\\'s pre-training.'],
    ['Few-Shot Prompting', 'Providing 2-5 examples of the desired input-output format within the prompt to establish a clear pattern for the model to follow.'],
    ['System Prompts', 'A meta-prompt that defines the persona, overarching rules, and constraints for the model before the user interaction begins (e.g., "You are a senior Python developer...").']
  ]}
/>

## Advanced Strategies

### Chain-of-Thought (CoT)
Introduced in 2022, Chain-of-Thought prompting simply asks the model to "think step by step." By forcing the model to generate the intermediate reasoning steps *before* outputting the final answer, it dedicates more computational cycles (tokens) to the problem, drastically reducing logical errors and hallucinations in complex reasoning tasks.

### Retrieval-Augmented Generation (RAG)
Prompt engineering is limited by the model's training data cutoff. RAG involves dynamically injecting retrieved documents (from a database or search engine) directly into the prompt context window before asking the question, grounding the model in external, up-to-date facts.

### XML/Markdown Framing
LLMs are heavily trained on code and markup languages. Using XML tags (like \`<instructions>\` or \`<output_format>\`) or Markdown headers helps the model structurally parse complex, multi-part prompts much better than a wall of conversational text.

## Prompt Injection (Security)
As prompt engineering has evolved, so has **Prompt Injection**—a cybersecurity vulnerability where an attacker embeds malicious instructions within the user input to override the system prompt and hijack the AI's behavior. Defending against this requires robust boundary delineation in prompt design.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Fine-tuning/index.mdx': `---
title: Fine-Tuning
description: The process of taking a pre-trained model and training it further on a smaller, domain-specific dataset.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Fine-Tuning">

Fine-Tuning is the process of taking a large, pre-trained base model (which has already learned the statistical structure of language and general facts) and training it further on a smaller, carefully curated dataset to specialize its behavior, tone, or domain knowledge.

<Callout icon="info" title="Pre-training vs Fine-tuning">
  **Pre-training** takes months, millions of dollars, and trillions of words to teach a model *how to speak*. **Fine-tuning** takes hours, a few hundred dollars, and a few thousand examples to teach the model *what you want it to say*.
</Callout>

## Why Fine-Tune?

While Prompt Engineering and RAG are effective, they consume valuable tokens in the context window and can be forgotten over long conversations. Fine-tuning bakes the desired behavior directly into the model's weights.

- **Tone and Persona**: Training a model to always answer like a pirate, or to adhere strictly to corporate brand guidelines.
- **Domain Specialization**: Teaching a model complex medical terminology or proprietary internal coding syntax that wasn't in its public training data.
- **Structured Output**: Forcing a model to reliably output perfect JSON or SQL without needing a massive prompt every time.

## Types of Fine-Tuning

### 1. Instruction Tuning (SFT)
Supervised Fine-Tuning (SFT) transforms a "base model" (which just autocomplete text) into an "instruct model" (which acts like a helpful assistant). It is trained on thousands of prompt-response pairs so it learns to follow instructions rather than just continuing the sentence.

### 2. RLHF (Reinforcement Learning from Human Feedback)
After SFT, models often undergo RLHF. Humans rate the model's outputs, and a reward model is trained to predict human preference. The LLM is then fine-tuned via reinforcement learning (using algorithms like PPO) to maximize this reward, making it safer, more helpful, and less toxic.

## Parameter-Efficient Fine-Tuning (PEFT)

Full fine-tuning requires updating billions of weights, which requires massive VRAM (multiple high-end GPUs). PEFT techniques solve this by freezing the original model weights and only training a tiny number of new parameters.

<ComparisonTable 
  headers={['Technique', 'Description']}
  rows={[
    ['LoRA (Low-Rank Adaptation)', 'Injects small, trainable rank-decomposition matrices into the transformer layers. Reduces trainable parameters by 99% while maintaining near-full performance.'],
    ['QLoRA', 'Combines LoRA with model quantization (e.g., 4-bit precision). Allows fine-tuning of massive models (like a 70B Llama) on a single consumer GPU.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Embeddings/index.mdx': `---
title: Embeddings
description: Dense vector representations of data in a continuous vector space where semantic similarities are preserved.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Embeddings">

In machine learning and NLP, an embedding is a mapping of discrete categorical variables (like words, sentences, or images) to a continuous vector of continuous numbers. It is the fundamental way that neural networks "understand" language.

<Callout icon="success" title="The Math of Meaning">
  Embeddings translate human meaning into spatial geometry. If you plot word embeddings on a 3D graph, words with similar meanings (e.g., "dog", "puppy", "hound") physically cluster closely together in that space.
</Callout>

## The Problem with One-Hot Encoding

Before embeddings, words were represented by "one-hot encoding"—a massive array of zeros with a single '1' representing the word's index in the vocabulary. 
- A vocabulary of 50,000 words meant every word was a 50,000-dimensional vector.
- One-hot vectors contain **zero semantic information**. The vector for "King" is mathematically just as far away from "Queen" as it is from "Apple."

## Dense Vectors

Embeddings solve this by creating dense vectors (typically 300 to 4096 dimensions) where every dimension represents a learned, abstract semantic feature (e.g., gender, royalty, plurality, color).

The classic demonstration of the power of word embeddings (specifically Word2Vec) is vector arithmetic:
**Vector("King") - Vector("Man") + Vector("Woman") = Vector("Queen")**

## How Embeddings are Used Today

While early embeddings (Word2Vec, GloVe) mapped a single word to a static vector, modern LLMs use contextual embeddings (where the vector for "bank" changes depending on the surrounding sentence).

Beyond LLM internals, embedding models are heavily used as standalone tools for **Semantic Search and RAG**.

<ComparisonTable 
  headers={['Use Case', 'How it works']}
  rows={[
    ['Semantic Search', 'Instead of keyword matching, a user\\'s search query is turned into an embedding vector. The database is searched for documents whose vectors are mathematically closest (via Cosine Similarity) to the query vector.'],
    ['Clustering', 'Grouping thousands of customer reviews by finding distinct clusters of embedding vectors in high-dimensional space.'],
    ['RAG', 'Retrieval-Augmented Generation relies on a vector database of embedded documents to quickly find the exact paragraphs needed to answer a user\\'s prompt.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Hallucinations/index.mdx': `---
title: Hallucinations
description: Phenomenon where AI models confidently generate false or nonsensical information.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Hallucinations">

In the context of Large Language Models (LLMs), a hallucination occurs when the model generates text that is grammatically correct and sounds confident, but is factually incorrect, nonsensical, or ungrounded in the provided source material.

<Callout icon="warning" title="Not a Bug, A Feature">
  Hallucinations are not a bug in the code; they are a fundamental feature of how generative AI works. LLMs are not databases looking up facts; they are probabilistic engines predicting the next most likely word. Sometimes, the most statistically likely sequence of words forms a factual lie.
</Callout>

## Why Hallucinations Happen

1. **Training Data Gaps**: If the model was never trained on a specific niche topic, it will attempt to extrapolate based on similar words in its latent space, often resulting in plausible-sounding fiction.
2. **Compression**: An LLM compresses terabytes of internet text into a few gigabytes of weights. Exact facts are lost, and only statistical relationships remain.
3. **Sycophancy**: Models fine-tuned via RLHF (human feedback) are trained to be helpful and polite. They will often hallucinate to agree with a user's false premise rather than correct the user and risk a negative human rating.
4. **Context Window Limitations**: If an prompt is too long, the model's attention mechanism may lose track of earlier constraints, causing it to drift off-topic and hallucinate.

## Mitigation Strategies

Because hallucinations cannot be 100% eliminated from the base architecture, engineers use external systems to bound the model's behavior.

<ComparisonTable 
  headers={['Strategy', 'Description']}
  rows={[
    ['RAG (Retrieval-Augmented Generation)', 'Providing the exact factual text in the prompt and strictly instructing the model: "Answer ONLY using the provided text."'],
    ['Chain of Thought (CoT)', 'Forcing the model to write out its reasoning steps before providing an answer. This grounds the final token generation in the logic it just produced.'],
    ['Temperature Control', 'Setting the API temperature parameter to 0.0 forces the model to always pick the most probable next token, reducing creative drift and hallucinations in factual tasks.'],
    ['Self-Correction/Critique', 'Using a second LLM agent (or a second pass from the same model) to verify the output of the first model against a set of facts.']
  ]}
/>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/28. Large Language Models/Context windows/index.mdx': `---
title: Context Windows
description: The maximum amount of text an LLM can consider at one time when generating a response.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Context Windows">

In Large Language Models, the Context Window represents the maximum amount of text (measured in tokens) that the model can hold in its "working memory" at any given time. It encompasses both the input prompt provided by the user and the output response generated by the model.

<Callout icon="error" title="The Hard Limit">
  If you paste a 15,000-word document into a model with a 10,000-token context window, the model will essentially "forget" the beginning of the document. It physically cannot process tokens that exceed its architectural limit.
</Callout>

## Tokens vs Words

Context windows are measured in **tokens**, not words. A token is a chunk of text. In English, a token is typically about 4 characters, or roughly 3/4 of a word. 
- "Apple" = 1 token
- "Unbelievable" = 3 tokens (Un-believ-able)
- Therefore, a 128k context window holds roughly 96,000 English words (about a 300-page book).

## The Quadratic Cost of Context

Historically, context windows were very small (e.g., GPT-2 had 1024 tokens). This is due to the mathematics of the **Self-Attention mechanism**. 

In standard self-attention, every token must be compared against every other token. This creates an $O(N^2)$ quadratic scaling problem for memory and compute.
- A 1,000 token context requires 1 million operations.
- A 100,000 token context requires 10 billion operations.

## The Long-Context Revolution

Recent breakthroughs in 2023 and 2024 have allowed models (like Claude 3 and Gemini 1.5) to achieve massive context windows of 200k to 2 Million tokens.

<ComparisonTable 
  headers={['Technique', 'How it enables long context']}
  rows={[
    ['FlashAttention', 'An IO-aware exact attention algorithm that fundamentally rewrites how GPUs handle memory during attention calculation, drastically speeding it up and reducing memory footprint.'],
    ['RoPE (Rotary Positional Embedding)', 'A method of injecting positional information that mathematically extrapolates better to longer sequences than absolute positional encodings.'],
    ['Ring Attention', 'A technique that distributes the attention calculation across multiple GPUs in a ring topology, overcoming the memory limits of a single GPU.']
  ]}
/>

### The "Needle in a Haystack" Problem
Just because a model *can* ingest 1 million tokens doesn't mean it processes them perfectly. The "Needle in a Haystack" evaluation tests if a model can retrieve a single hidden fact placed arbitrarily inside a massive document. Modern models achieve near 100% retrieval, but developers must still beware of "lost in the middle" syndrome, where models tend to focus more on the beginning and end of long contexts.

</TechnologyTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log(`Wrote ${filePath}`)
  }
}

main().catch(console.error)
