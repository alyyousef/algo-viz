import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '26. Deep Learning/Neural networks/index.mdx': `---
title: Neural Networks
description: Computing systems inspired by the biological neural networks that constitute animal brains.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Neural Networks">

An Artificial Neural Network (ANN) is a computational model inspired by the way biological neural networks in the human brain process information. It is the foundational architecture behind modern Deep Learning, allowing computers to "learn" from observational data.

<Callout icon="info" title="The Universal Approximation Theorem">
  A mathematically proven theorem stating that a neural network with just a single hidden layer containing a finite number of neurons can approximate *any* continuous function, given the right weights. In plain English: Neural networks can theoretically learn to solve any problem if given enough data and neurons.
</Callout>

## The Architecture of a Network

Neural networks are composed of nodes (artificial neurons) arranged in distinct layers.

<ComparisonTable 
  headers={['Layer Type', 'Description']}
  rows={[
    ['Input Layer', 'Takes in raw data (e.g., the RGB values of pixels in an image).'],
    ['Hidden Layers', 'The computational engine. The "Deep" in Deep Learning simply refers to having more than one Hidden Layer.'],
    ['Output Layer', 'Produces the final prediction (e.g., "98% chance this image is a Cat").']
  ]}
/>

## How Neurons Work

Inside every single neuron, a simple mathematical operation occurs:
1. It takes inputs from previous neurons and multiplies them by **Weights** (importance).
2. It adds a **Bias** (an offset).
3. It passes the sum through an **Activation Function** (like ReLU or Sigmoid) to introduce non-linearity, determining if the neuron should "fire" or not.

<ArchitectureDiagram chart={\`
graph LR
  X1[Input 1: 0.5]
  X2[Input 2: 0.8]
  X3[Input 3: 0.2]
  
  Neuron((Neuron))
  
  X1 -- "Weight: 0.4" --> Neuron
  X2 -- "Weight: -0.2" --> Neuron
  X3 -- "Weight: 0.9" --> Neuron
  
  Neuron -- "(Sum + Bias) -> Activation Function" --> Output[Output: 0.72]
\`} />

## Training the Network

Networks start completely randomized (dumb). They learn via:
1. **Forward Propagation**: Passing data through to get a prediction.
2. **Loss Function**: Calculating exactly how wrong the prediction was.
3. **Backpropagation**: Going backward through the network, using calculus (Gradient Descent) to slightly adjust every single weight so the next prediction is less wrong.

</TechnologyTemplate>
`,
  '26. Deep Learning/Backpropagation/index.mdx': `---
title: Backpropagation
description: The mathematical algorithm used to train neural networks.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Backpropagation">

Backpropagation (short for "backward propagation of errors") is the fundamental algorithm used to train neural networks. While forward propagation is how a network *makes a guess*, backpropagation is how the network actually *learns from its mistakes*.

<Callout icon="error" title="The Core Problem">
  If a neural network predicts "Dog" but the image was a "Cat", the network knows it is wrong. But a deep network has millions of weights. Which specific weight caused the error? Should it be adjusted up or down? By how much? Backpropagation answers this using calculus.
</Callout>

## The 4 Steps of Learning

<ComparisonTable 
  headers={['Step', 'Action', 'Description']}
  rows={[
    ['1', 'Forward Pass', 'The input data passes through the network to generate a prediction (e.g., 0.2).'],
    ['2', 'Calculate Loss', 'A Loss Function compares the prediction to the true target (e.g., 1.0) and computes the total error (e.g., 0.8).'],
    ['3', 'Backward Pass', 'Using the Chain Rule of calculus, compute the partial derivative (Gradient) of the Loss with respect to every single weight in the network.'],
    ['4', 'Gradient Descent', 'Slightly adjust the weights in the exact opposite direction of the gradient to minimize the loss for the next time.']
  ]}
/>

## Gradient Descent

Imagine the Loss Function as a rugged mountain landscape. The network wants to reach the absolute bottom of the valley (zero error). 
Backpropagation calculates the slope of the mountain at the current position. Gradient descent tells the network to take a step downward.

<ArchitectureDiagram chart={\`
graph TD
  Loss[High Loss / Error]
  
  subgraph Gradient Descent
    Step1(Calculate Slope / Derivative)
    Step2(Update Weights: W = W - (Learning_Rate * Slope))
  end
  
  Min[Global Minimum\\n(Lowest Error)]
  
  Loss --> Step1
  Step1 --> Step2
  Step2 -- Loop until convergence --> Min
\`} />

## The Vanishing Gradient Problem

In very deep networks (many hidden layers), as the error is propagated backward layer by layer, the gradients get multiplied together. Because these numbers are often less than 1, multiplying them repeatedly causes the gradient to shrink exponentially until it "vanishes" to zero. When the gradient is zero, the earliest layers of the network completely stop learning. 

This was solved historically by using the **ReLU** (Rectified Linear Unit) activation function instead of Sigmoid.

</TechnologyTemplate>
`,
  '26. Deep Learning/Transformers/index.mdx': `---
title: Transformers
description: The architecture that revolutionized Natural Language Processing and powers ChatGPT.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Transformers">

Introduced by Google in the landmark 2017 paper *"Attention Is All You Need"*, the Transformer is a deep learning architecture that fundamentally changed Artificial Intelligence. It completely replaced older models (like RNNs and LSTMs) and serves as the architectural foundation for all modern Large Language Models (LLMs) like GPT-4, Claude, and LLaMA.

<Callout icon="tip" title="No Recurrence">
  Before Transformers, networks read text sequentially, one word at a time (like humans do). This was slow and forgot early context. 
  
  Transformers read the **entire sentence at once** in parallel, making them incredibly fast to train on massive GPU clusters.
</Callout>

## The Secret Sauce: Self-Attention

The core innovation of the Transformer is the **Self-Attention Mechanism**. 

When processing a word, Self-Attention allows the model to look at every other word in the sentence to gather context. For example, in the sentence *"The bank of the river"*, the model uses attention to know "bank" means land, not a financial institution, by paying heavy attention to the word "river".

<ComparisonTable 
  headers={['Component', 'Function']}
  rows={[
    ['Positional Encoding', 'Because words are processed in parallel, the model has no concept of word order. Positional Encoding injects math to tell the model "this word came first, this word came second."'],
    ['Multi-Head Attention', 'Runs multiple self-attention mechanisms in parallel, allowing the model to focus on different things (e.g., Head 1 focuses on grammar, Head 2 focuses on emotion).'],
    ['Feed-Forward Network', 'A standard neural network applied to each position separately and identically to process the output of the attention mechanism.']
  ]}
/>

## Architecture

A standard Transformer consists of an **Encoder** (reads the input and builds context) and a **Decoder** (generates the output word-by-word).

<ArchitectureDiagram chart={\`
graph TD
  Input["Input: 'Bonjour'"]
  
  subgraph Encoder Block
    Attn1[Multi-Head Self Attention]
    FF1[Feed Forward Network]
    Attn1 --> FF1
  end
  
  subgraph Decoder Block
    Attn2[Masked Self Attention]
    Attn3[Encoder-Decoder Attention]
    FF2[Feed Forward Network]
    Attn2 --> Attn3 --> FF2
  end
  
  Output["Output: 'Hello'"]
  
  Input --> Attn1
  FF1 -- Context Vectors --> Attn3
  FF2 --> Output
\`} />

## Why it changed everything

Transformers aren't just for text anymore. Because they are so good at finding patterns in sequences, researchers have successfully applied Transformer architectures to **Images** (Vision Transformers), **Audio**, and even **Protein Folding** (AlphaFold).

</TechnologyTemplate>
`,
  '32. Computer Vision/Image classification/index.mdx': `---
title: Image Classification
description: The task of assigning a label or class to an entire image.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Image Classification">

Image Classification is one of the most fundamental tasks in Computer Vision. Given an image, the goal of an image classification algorithm is to predict a single label (or a probability distribution of labels) that best describes the entire image. 

<Callout icon="info" title="The Hello World of CV">
  Classifying handwritten digits (0-9) from the **MNIST dataset** is universally considered the "Hello World" of Machine Learning and Computer Vision.
</Callout>

## How Computers See Images

To a human, an image is a dog. To a computer, an image is a massive 3D matrix (tensor) of numbers. 

A 1024x1024 color image is represented as a matrix of \`1024 (Height) x 1024 (Width) x 3 (RGB Color Channels)\`. This results in over 3 million individual numbers (pixel intensities ranging from 0 to 255) that the neural network must process.

## Convolutional Neural Networks (CNNs)

Historically, passing 3 million pixels into a standard neural network required too much compute and ignored the spatial relationship between pixels. This was solved by **CNNs**.

<ComparisonTable 
  headers={['Layer', 'Purpose']}
  rows={[
    ['Convolutional Layer', 'Slides small "filters" (like a magnifying glass) over the image to extract features like edges, curves, and textures.'],
    ['Pooling Layer (Max Pooling)', 'Downsamples the image, reducing its size drastically while keeping the most important features. Helps prevent overfitting.'],
    ['Fully Connected Layer', 'At the very end, flattens the extracted features into a standard neural network to output the final classification probabilities.']
  ]}
/>

## Architecture of a Classifier

<ArchitectureDiagram chart={\`
graph LR
  Input[Raw Image\\n(Cat)]
  
  Conv1[Conv Layer\\n(Finds Edges)]
  Pool1[Max Pool\\n(Shrinks)]
  
  Conv2[Conv Layer\\n(Finds Ears/Eyes)]
  Pool2[Max Pool\\n(Shrinks)]
  
  FC[Fully Connected\\nNetwork]
  Softmax[Softmax]
  
  Out1[Cat: 94%]
  Out2[Dog: 5%]
  Out3[Car: 1%]
  
  Input --> Conv1 --> Pool1 --> Conv2 --> Pool2 --> FC --> Softmax
  Softmax --> Out1
  Softmax --> Out2
  Softmax --> Out3
\`} />

</TechnologyTemplate>
`,
  '32. Computer Vision/YOLO/index.mdx': `---
title: YOLO (You Only Look Once)
description: A revolutionary real-time object detection system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="YOLO (You Only Look Once)">

YOLO is a state-of-the-art, real-time object detection system. Before YOLO, object detection algorithms (like R-CNN) were painfully slow because they applied classifiers to hundreds of different regions in an image one by one. 

YOLO revolutionized the field by framing object detection as a single regression problem, looking at the entire image **only once** to predict bounding boxes and class probabilities simultaneously.

<Callout icon="tip" title="Blazing Fast">
  Because it processes the image in a single pass through a neural network, YOLO can easily process 45 to 150 frames per second (FPS), making it the gold standard for real-time video processing like self-driving cars and security cameras.
</Callout>

## How YOLO works

Instead of sliding a window across the image, YOLO divides the input image into an **S × S grid**.

<ComparisonTable 
  headers={['Step', 'Action']}
  rows={[
    ['1. Gridding', 'The image is split into a grid (e.g., 7x7). If the center of an object falls into a grid cell, that grid cell is responsible for detecting that object.'],
    ['2. Bounding Boxes', 'Each grid cell predicts a fixed number of Bounding Boxes (x, y, width, height) and a Confidence Score that the box actually contains an object.'],
    ['3. Class Prediction', 'Simultaneously, each grid cell predicts the probability of the object class (e.g., Dog, Car, Pedestrian).'],
    ['4. Non-Max Suppression', 'YOLO often predicts multiple overlapping boxes for the same object. Non-Max Suppression cleans this up by only keeping the box with the highest confidence.']
  ]}
/>

## Image Classification vs Object Detection

- **Image Classification**: "This image contains a dog."
- **Object Detection (YOLO)**: "This image contains a dog at coordinates (120, 45, 200, 180), a car at (400, 10, 500, 200), and a person at (300, 50, 350, 100)."

## Architecture Workflow

<ArchitectureDiagram chart={\`
graph LR
  Input[Input Image\\n(Street Scene)]
  
  Grid[Divide into\\nSxS Grid]
  
  subgraph Single Neural Network Pass
    Bbox[Predict Bounding Boxes\\n& Confidence]
    Class[Predict Class\\nProbabilities]
  end
  
  Combine[Combine Boxes & Classes]
  NMS[Non-Max Suppression\\n(Remove Duplicates)]
  
  Output[Final Bounding Boxes\\ndrawn on image]
  
  Input --> Grid
  Grid --> Bbox
  Grid --> Class
  Bbox --> Combine
  Class --> Combine
  Combine --> NMS
  NMS --> Output
\`} />

</TechnologyTemplate>
`,
}

async function generateAI() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateAI().catch(console.error)
