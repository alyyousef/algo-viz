import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/26. Deep Learning/Weight initialisation/index.mdx': `---
title: Weight Initialization
description: The critical mathematical step of assigning starting values to neural network weights to prevent exploding or vanishing gradients before training even begins.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Weight Initialization">

If you mathematically initialize all weights in a Neural Network to absolute $0$, every single neuron will compute the exact same gradient during Backpropagation. The network will mathematically never learn anything. 
If you initialize them with numbers that are slightly too large, the mathematical signals will instantly explode to infinity. **Weight Initialization** algorithms are strictly required to ensure the network is mathematically stable at Epoch 1.

## 1. Xavier / Glorot Initialization
Designed specifically for networks using Sigmoid or Tanh activation functions, **Xavier Initialization** draws weights from a mathematical distribution (like a Normal distribution) with a specific variance. 
It mathematically guarantees that the variance of the outputs of a layer is exactly equal to the variance of its inputs. This perfect balance prevents the signal from dying or exploding as it passes through 100 layers.

## 2. He (Kaiming) Initialization
Xavier Initialization mathematically assumes the activation function is linear. When the industry switched to ReLU, Xavier failed catastrophically because ReLU mathematically deletes 50% of the signal (all negative numbers). 
**He Initialization** solves this by mathematically doubling the variance of the initialization. This perfectly offsets the massive loss of signal caused by ReLU, allowing incredibly deep convolutional networks (like ResNet) to train successfully.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Variational autoencoders (VAEs)/index.mdx': `---
title: Variational Autoencoders (VAEs)
description: A probabilistic generative model that learns a continuous mathematical latent space, allowing it to generate entirely new, unseen data points.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Variational Autoencoders (VAEs)">

A standard Autoencoder learns to perfectly compress an image of a cat into a tiny vector, and then decompress it back into a cat. The problem is that its latent space is mathematically jagged and discrete. If you randomly generate a new vector and decompress it, you get garbage. 
**Variational Autoencoders (VAEs)** solve this by forcing the latent space to be a smooth, continuous mathematical distribution.

## 1. The Probabilistic Latent Space
Instead of compressing an image into a single, rigid vector (e.g., $[2.5, 3.1]$), the VAE mathematically compresses the image into two vectors:
1. **A Vector of Means** ($\mu$)
2. **A Vector of Standard Deviations** ($\sigma$)

These two vectors define a mathematical Gaussian (Normal) Distribution. To generate the final compressed state, the network randomly *samples* a point from this distribution.

## 2. The KL-Divergence Penalty
To mathematically force the latent space to be smooth and continuous, the VAE's Loss Function includes a **KL-Divergence** penalty. This algebraically punishes the network if its latent distributions stray too far from a standard Normal distribution (Mean of 0, Variance of 1). 
This forces all the different classes (Cats, Dogs, Cars) to mathematically overlap and blend smoothly into one another inside the latent space.

## 3. Generative AI
Because the latent space is a perfect, continuous sphere of probabilities, you can mathematically pick any random point inside that space and decompress it. The Decoder will successfully generate a completely unique, highly realistic image that has never existed before.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Tanh/index.mdx': `---
title: Tanh Activation Function
description: The hyperbolic tangent function, a mathematical improvement over Sigmoid that centers outputs strictly around zero.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tanh (Hyperbolic Tangent)">

The **Tanh** (Hyperbolic Tangent) activation function looks mathematically identical to Sigmoid (an S-shaped curve), but with one massive architectural improvement: it is **Zero-Centered**.

## 1. The Mathematical Shift
- Sigmoid squashes inputs between $0$ and $1$.
- Tanh mathematically squashes inputs between $-1$ and $+1$.
  - $\tanh(0) = 0$
  - $\tanh(10) \approx +1$
  - $\tanh(-10) \approx -1$

## 2. Why Zero-Centered Matters
In a Deep Neural Network, if you use Sigmoid, every single activation passing to the next layer is mathematically guaranteed to be a positive number. 
During Backpropagation, if all inputs to a neuron are positive, the mathematical gradients passed backward will always be *entirely positive* or *entirely negative*. This forces the weights to update in a highly erratic, zig-zagging trajectory. 
Because Tanh outputs a healthy mix of positive and negative numbers (centered at 0), the gradients can flow freely in any direction, meaning Tanh mathematically converges significantly faster than Sigmoid.

## 3. The Shared Flaw
Despite being superior to Sigmoid, Tanh still suffers from the exact same fatal mathematical flaw: the **Vanishing Gradient Problem**. At the edges of the curve (near $+1$ or $-1$), the mathematical derivative is extremely flat ($0$). This instantly kills the gradient, which is why Tanh was ultimately replaced by ReLU in modern hidden layers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Swish)/index.mdx': `---
title: Swish Activation Function
description: A smooth, non-monotonic activation function discovered by Google's Neural Architecture Search that mathematically outperforms ReLU in extremely deep networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Swish Activation Function">

For years, ReLU was the undisputed king of activation functions. In 2017, Google unleashed an automated AI (Neural Architecture Search) to mathematically test millions of mathematical functions to see if any could beat ReLU. The AI discovered **Swish**.

## 1. The Mathematical Equation
$Swish(x) = x \cdot \text{Sigmoid}(x)$
$f(x) = \frac{x}{1 + e^{-x}}$

It mathematically multiplies the input by the Sigmoid of the input. 
Like ReLU, if $x$ is highly positive, Swish lets it pass unharmed. Like ReLU, if $x$ is highly negative, Swish crushes it to zero.

## 2. The Non-Monotonic Dip
The mathematical magic of Swish happens slightly below zero. 
Unlike ReLU (which harshly cuts off at exactly 0), Swish produces a smooth, continuous curve that actually mathematically dips *slightly below zero* before rising again. 
This is mathematically known as being **Non-Monotonic** (the function goes down before it goes up). This slight negative dip provides a critical, non-zero gradient that mathematically prevents neurons from permanently dying, while retaining small negative inputs that might hold valuable context.

## 3. Production Use
Swish mathematically outperforms ReLU by roughly 1-2% on massive Computer Vision benchmarks (like ImageNet). However, because computing a Sigmoid is mathematically more expensive than a simple $\max(0, x)$ operation, Swish is strictly reserved for ultra-deep, state-of-the-art architectures (like EfficientNet) where the accuracy boost outweighs the slight compute penalty.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Distributed training (data-model-pipeline parallelism)/index.mdx': `---
title: Distributed Training (Parallelism)
description: The extreme engineering architecture required to mathematically split and train massive foundation models across thousands of GPUs simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Training">

You cannot train GPT-4 on a single GPU. It mathematically requires tens of thousands of GPUs working in perfect synchronization. Because a single 70B model requires hundreds of gigabytes of VRAM just to exist, researchers must use highly advanced mathematical splitting techniques (Parallelism).

## 1. Data Parallelism (DDP)
The simplest approach. The model is small enough to completely fit inside the VRAM of a single GPU.
1. You mathematically clone the exact same model onto 8 different GPUs.
2. You split your massive dataset into 8 chunks.
3. Every GPU calculates the mathematical gradients on its own chunk of data.
4. Before updating the weights, the GPUs synchronize over the network, mathematically average their gradients together, and update simultaneously.

## 2. Tensor (Model) Parallelism
What if the model is so massive (e.g., a 100B parameter Transformer) that it physically cannot fit inside the VRAM of a single GPU?
**Tensor Parallelism** mathematically slices the actual matrices inside the network. 
If a layer has a $1000 \times 1000$ matrix, you slice it in half. GPU 1 holds the left half. GPU 2 holds the right half. When data flows through, GPU 1 calculates the math for its half, GPU 2 calculates its half, and they instantly synchronize over extremely high-speed interconnects (NVLink) to mathematically fuse the final answer.

## 3. Pipeline Parallelism
If slicing individual matrices is too complex, **Pipeline Parallelism** slices the model by layers.
GPU 1 holds Layers 1-10. GPU 2 holds Layers 11-20. 
GPU 1 calculates the mathematical forward pass and hands the activation vector to GPU 2. 
*The Flaw (The Bubble)*: While GPU 1 is calculating, GPU 2 is doing absolutely nothing. To fix this mathematical inefficiency, frameworks use "Micro-batches" to constantly keep data flowing through the pipeline like an assembly line, virtually eliminating idle time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/Ray/index.mdx': `---
title: Ray
description: A unified compute framework designed specifically to scale AI Python workloads from a single laptop to a massive Kubernetes cluster effortlessly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ray">

Writing Python code that mathematically executes on a single CPU is easy. Writing Python code that mathematically orchestrates thousands of GPUs across 100 physical servers to train an AI is a distributed systems nightmare. **Ray** solves this.

## 1. The Distributed Primitive
Ray replaces Python's standard multiprocessing with a highly advanced, ultra-low latency distributed engine. By adding a single simple Python decorator (TICK1@ray.remoteTICK1) above a function or class, Ray mathematically hijacks that object and executes it on any available CPU or GPU in the cluster. It automatically handles the complex mathematical serialization, memory management, and network routing in the background.

## 2. The AI Ecosystem (Ray Train & Ray Serve)
While Ray can execute any Python script, it is specifically designed to be the ultimate infrastructure layer for AI:
- **Ray Train**: Automatically wraps PyTorch or TensorFlow code, mathematically distributing the training process across thousands of GPUs using Data Parallelism.
- **Ray Tune**: A hyperparameter optimization engine that mathematically orchestrates thousands of simultaneous training runs to discover the perfect architecture (NAS).
- **Ray Serve**: A highly scalable inference engine that allows you to mathematically deploy massive models (like LLaMA) in production, dynamically auto-scaling the hardware based on traffic.

## 3. Industry Dominance
Ray is the absolute industry standard for massive AI scaling. It was famously the core infrastructure used by OpenAI to mathematically distribute the Reinforcement Learning training process of ChatGPT across their massive Azure supercomputer.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/PyTorch Lightning/index.mdx': `---
title: PyTorch Lightning
description: A lightweight wrapper built on top of PyTorch that mathematically structures code, drastically reducing boilerplate and standardizing AI research.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PyTorch Lightning">

While raw PyTorch is incredibly powerful and flexible, writing the actual training loop (iterating over data, zeroing gradients, calculating loss, stepping the optimizer, moving tensors to the GPU) requires hundreds of lines of repetitive, error-prone boilerplate code. **PyTorch Lightning** mathematically abstracts this chaos into a perfect, standardized structure.

## 1. The LightningModule
Lightning forces the Data Scientist to mathematically organize their code into a single, highly structured class (the TICK1LightningModuleTICK1). 
You strictly define the mathematical architecture in TICK1__init__TICK1, the forward pass in TICK1forward()TICK1, and the loss calculation in TICK1training_step()TICK1. 
Lightning takes this object and completely handles the massive engineering loop automatically.

## 2. Zero-Code Engineering Features
Because the code is mathematically standardized, Lightning can automatically inject massive engineering features that would normally require months of custom code:
- **Distributed Training**: You can mathematically switch from training on 1 GPU to training on 1,000 GPUs across 10 servers by simply changing a single parameter: TICK1Trainer(devices=1000)TICK1.
- **Mixed Precision**: Switching to 16-bit math is a single flag: TICK1Trainer(precision=16)TICK1.
- **Hardware Agnostic**: The exact same Lightning code will run flawlessly on CPUs, NVIDIA GPUs, Apple Metal, or Google TPUs without changing a single line of mathematical logic.

## 3. The Standard for Research
Because Lightning enforces a rigid mathematical structure, it makes reproducing AI research vastly easier. Instead of hunting through 10 files to figure out exactly when the optimizer steps, researchers can immediately look at the TICK1LightningModuleTICK1 and instantly understand the pure mathematical logic of the model.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/ONNX/index.mdx': `---
title: ONNX (Open Neural Network Exchange)
description: The industry-standard open mathematical format for representing machine learning models, allowing seamless deployment across any hardware or framework.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ONNX (Open Neural Network Exchange)">

A model trained in PyTorch is saved as a TICK1.ptTICK1 file. A model trained in TensorFlow is saved as a TICK1.pbTICK1 file. Neither framework can mathematically read the other's file. This creates a massive nightmare in production. 
**ONNX** was created by Microsoft and Meta as the absolute industry standard universal translator.

## 1. The Universal Computation Graph
When you export a model to ONNX, it does not save the Python code. It mathematically traces the exact execution of the model and saves it as a pure, language-agnostic **Computation Graph**. 
It mathematically defines exactly what a Convolution is, what a Matrix Multiplication is, and what the weights are. Because it is pure math, it can be mathematically read and executed by anything.

## 2. The Deployment Advantage (ONNX Runtime)
Because ONNX is a highly optimized mathematical standard, Microsoft built the **ONNX Runtime**, a blazing-fast execution engine written in C++. 
1. You train your complex model using Python and PyTorch.
2. You export it to ONNX.
3. You deploy the ONNX file into production using C++, C#, or Rust via the ONNX Runtime.

The ONNX Runtime mathematically optimizes the graph (fusing layers together) and executes it significantly faster than native PyTorch, while completely removing the bloated Python dependency from your production servers.

## 3. Hardware Acceleration
Hardware manufacturers (NVIDIA, Intel, Apple, Qualcomm) only need to optimize their silicon for one mathematical standard: ONNX. If a model is in ONNX format, it will automatically leverage the absolute maximum hardware acceleration available on an iPhone, an Intel CPU, or a massive NVIDIA GPU.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/MXNet/index.mdx': `---
title: Apache MXNet
description: A highly scalable deep learning framework originally championed by Amazon AWS, known for its extreme mathematical efficiency in massive distributed training.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Apache MXNet">

Before PyTorch completely dominated the AI landscape, the industry was fragmented. **Apache MXNet** was a major contender, famously selected by Amazon (AWS) as their official, premier deep learning framework due to its unparalleled mathematical efficiency at massive scale.

## 1. The Hybrid Architecture
Deep Learning frameworks traditionally fell into two mathematical camps:
- **Imperative (PyTorch)**: Executes math line-by-line dynamically. Highly flexible, but mathematically slow.
- **Symbolic (TensorFlow 1.0)**: Compiles the entire massive math equation before running. Extremely fast, but impossibly hard to debug.

MXNet mathematically supported *both*. It allowed developers to write highly flexible imperative code using its **Gluon API**, and then automatically compile it into a rigid, highly optimized symbolic graph for massive production speedups.

## 2. Extreme Distributed Scalability
MXNet's true superpower was its mathematical scaling efficiency. It was engineered from the ground up for massive distributed clusters. When training a model across 256 GPUs, other frameworks suffered massive mathematical networking bottlenecks. MXNet boasted an almost perfect linear scaling curve (adding $2\\times$ the GPUs resulted in exactly $2\\times$ the mathematical speed).

## 3. The Decline
Despite its incredible mathematical architecture and AWS backing, MXNet lost the usability war. PyTorch's native Pythonic feel and TensorFlow's massive ecosystem mathematically starved MXNet of open-source researchers. Today, it is largely considered a legacy framework, with AWS pivoting fully toward PyTorch.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/JAX/index.mdx': `---
title: JAX
description: Google's high-performance numerical computing framework that supercharges standard NumPy with extreme mathematical differentiation and XLA compilation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JAX">

While PyTorch and TensorFlow were built strictly for Deep Learning, **JAX** is something mathematically purer. Built by Google, JAX is technically not a Deep Learning framework; it is an ultra-high-performance mathematical engine that can execute arbitrary Python code at blistering speeds on massive TPU clusters.

## 1. Autograd (Automatic Differentiation)
The core magic of JAX is its ability to mathematically take the derivative of *any* native Python function. 
If you write a standard Python loop using NumPy, you can wrap it in TICK1jax.grad()TICK1. JAX will mathematically tear apart your Python code and perfectly calculate the exact gradient, allowing you to optimize bizarre mathematical structures that traditional Deep Learning frameworks cannot handle.

## 2. XLA (Accelerated Linear Algebra)
JAX uses Google's **XLA Compiler**. When you wrap a function in TICK1@jax.jitTICK1 (Just-In-Time compilation), JAX mathematically fuses all your separate math operations (like multiplying a matrix, then adding a bias, then applying ReLU) into one single, monolithic mathematical kernel. This mathematically eliminates memory bottlenecks and allows the code to run terrifyingly fast on GPUs and TPUs.

## 3. The Functional Paradigm
Unlike PyTorch, which is highly Object-Oriented (using classes and states), JAX mathematically forces you to write **Pure Functional Code**. Functions cannot have "side effects," and arrays are strictly mathematically immutable (you cannot modify them in place). 
While this makes JAX notoriously difficult to learn, this strict mathematical purity is exactly what allows the XLA compiler to safely distribute the code across 10,000 TPUs perfectly. Today, JAX is heavily favored by Google DeepMind for cutting-edge AI research.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/Keras/index.mdx': `---
title: Keras
description: A high-level, extremely user-friendly deep learning API that drastically simplified neural network creation, now acting as the official interface for TensorFlow.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Keras">

In 2015, building a Neural Network required writing hundreds of lines of complex, low-level mathematical C++ and Python code. **Keras** was introduced as an ultra-high-level API that allowed developers to construct massive, mathematically complex models using a beautiful, Lego-like syntax in just 5 lines of code.

## 1. The Multi-Backend Magic
Originally, Keras was not a mathematical execution engine itself. It was a universal API wrapper. You wrote your code in Keras, and Keras would mathematically translate it to run on top of whatever backend you preferred (TensorFlow, Theano, or CNTK). It completely abstracted the horrific mathematical syntax of the underlying engines.

## 2. Assimilation into TensorFlow
Keras became so overwhelmingly popular that Google mathematically surrendered. In TensorFlow 2.0, Google completely abandoned their own complex, low-level APIs and officially adopted Keras as the absolute standard, default interface for all TensorFlow development (TICK1tf.kerasTICK1).

## 3. Keras 3.0 (The Return of the Multi-Backend)
In a shocking mathematical pivot, Keras 3.0 was recently released, returning to its roots. You can now write a model in pure Keras syntax, and dynamically choose to execute that exact same code on the **TensorFlow**, **PyTorch**, or **JAX** mathematical engines. It allows Data Scientists to write beautiful code while leveraging the unique mathematical advantages (like JAX's XLA compiler) of whatever framework they choose.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/Hugging Face Transformers/index.mdx': `---
title: Hugging Face Transformers
description: The absolute industry standard open-source library and repository for downloading, utilizing, and fine-tuning state-of-the-art Large Language Models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hugging Face Transformers">

Before Hugging Face, if you wanted to use a massive AI model, you had to read a 40-page research paper, mathematically recreate the architecture from scratch in PyTorch, hunt down the massive 50GB weight files on an obscure university FTP server, and write a custom tokenizer.
**Hugging Face Transformers** mathematically abstracted this entire nightmare into 3 lines of Python code, triggering the Generative AI revolution.

## 1. The Unified API
The TICK1transformersTICK1 library provides a mathematically standardized API for virtually every AI model in existence (BERT, GPT, LLaMA, Stable Diffusion). 
To download, mathematically initialize, and run a 7-Billion parameter LLM, you simply call TICK1AutoModel.from_pretrained("meta-llama/Llama-2-7b")TICK1. The library automatically downloads the weights, constructs the PyTorch architecture, and loads the model into VRAM.

## 2. The Model Hub (The GitHub of AI)
Hugging Face is not just a library; it is a massive cloud repository hosting over 500,000 open-source AI models and datasets. It is the absolute central hub of the AI universe, mathematically functioning as the "GitHub for Machine Learning."

## 3. Democratization (PEFT & LoRA)
Hugging Face mathematically democratized AI by aggressively integrating optimization techniques. Using their TICK1PEFTTICK1 (Parameter-Efficient Fine-Tuning) library, developers can mathematically freeze the massive master weights of a 70B model, inject tiny adapter matrices (LoRA), and successfully fine-tune massive foundation models on a single consumer GPU, an act that previously required a $100,000 server.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/FastAI/index.mdx': `---
title: FastAI
description: A pragmatic, top-down deep learning library built on PyTorch that democratized AI by providing state-of-the-art results with minimal, highly optimized code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="FastAI">

Most AI frameworks (like PyTorch) require you to mathematically build everything from the ground up, forcing you to manually manage Learning Rates, Momentum, and GPU transfers. 
**FastAI** is a highly opinionated, top-down library built on top of PyTorch. It is designed to mathematically inject absolute state-of-the-art research techniques into your training loop automatically, allowing beginners to beat world-class Kaggle experts with 10 lines of code.

## 1. Sane Defaults
If you train a Computer Vision model in PyTorch, you must mathematically guess the optimal Learning Rate, batch size, and weight decay. 
FastAI mathematically hardcodes the absolute best practices directly into the API. It automatically applies Data Augmentation, dynamically freezes and unfreezes layers during fine-tuning, and mathematically optimizes the loss function without the user ever writing a line of code.

## 2. The Learning Rate Finder
One of FastAI's most famous contributions is the automated **Learning Rate Finder**. 
Before training begins, FastAI mathematically runs a mock-training loop, rapidly increasing the learning rate on every batch while tracking the loss. It plots a mathematical curve, allowing the Data Scientist to visually pinpoint the exact, scientifically perfect Learning Rate for their specific dataset before real training starts.

## 3. The One-Cycle Policy
FastAI heavily popularized the **One-Cycle Policy**. Instead of slowly decaying the learning rate, it mathematically forces the learning rate to violently spike to a massive number early in training, before sharply crashing down to zero. This mathematical shockwave allows the model to instantly blast out of sharp local minima, famously allowing models to converge to state-of-the-art accuracies $10\\times$ faster than standard training.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/26.1 Frameworks/DeepSpeed/index.mdx': `---
title: DeepSpeed
description: A highly advanced deep learning optimization library developed by Microsoft that mathematically shatters memory constraints, allowing massive billion-parameter models to train on standard GPUs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DeepSpeed">

Training a 100-Billion parameter Large Language Model mathematically requires over 1 Terabyte of VRAM just to hold the optimizer states and gradients. Because the largest NVIDIA GPU only has 80GB of VRAM, training these models used to be impossible without extreme, custom engineering. 
**Microsoft DeepSpeed** is the optimization library that solved this mathematical bottleneck, powering massive models like ChatGPT and Megatron.

## 1. The ZeRO Optimizer (Zero Redundancy Optimizer)
In standard Data Parallel training, every single GPU holds an exact, 100% duplicate copy of the entire massive model, the gradients, and the Adam optimizer states. This is mathematically catastrophic for VRAM.
**ZeRO** is DeepSpeed's flagship breakthrough. It mathematically slices the optimizer states and weights, and distributes them across the GPUs. 
- **ZeRO Stage 1**: Partitions the Optimizer States.
- **ZeRO Stage 2**: Partitions the Gradients.
- **ZeRO Stage 3**: Partitions the actual Model Weights.

Instead of all 10 GPUs holding the full 100GB model, they mathematically coordinate to hold just 10GB each, seamlessly streaming the missing mathematical pieces over the network precisely when the forward pass needs them.

## 2. CPU Offloading
If the model is so massive that it mathematically exceeds the combined VRAM of *all* the GPUs in the cluster, DeepSpeed ZeRO-Offload automatically evicts the massive optimizer states out of the VRAM and mathematically offloads them into the cheap, abundant RAM of the CPU. The CPU mathematically calculates the weight updates, and streams them back to the GPU.

## 3. The Industry Standard
DeepSpeed is almost entirely responsible for the open-source LLM revolution. By integrating DeepSpeed with Hugging Face, researchers were suddenly able to train mathematically massive models on tiny, consumer-grade server clusters, completely destroying the monopoly held by trillion-dollar tech giants.

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
