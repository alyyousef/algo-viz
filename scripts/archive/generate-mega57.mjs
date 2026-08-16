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
description: The foundational architecture of modern deep learning, inspired by the human brain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Neural Networks">

Artificial Neural Networks (ANNs) are computing systems inspired by the biological neural networks that constitute animal brains. They are the absolute foundation of all modern Deep Learning, from ChatGPT to self-driving cars.

<Callout icon="info" title="The Biological Inspiration">
  Just as biological neurons receive signals via dendrites, process them in the soma, and pass them on via axons, artificial neurons receive numerical inputs, multiply them by **weights**, sum them up, apply an **activation function**, and pass the result to the next layer.
</Callout>

## Core Components

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['Neuron (Node)', 'The basic computing unit. Holds a mathematical value representing activation.'],
    ['Weights', 'The learnable parameters. The "strength" of the connection between two neurons. This is where the actual "knowledge" of the network is stored.'],
    ['Biases', 'An extra parameter added to the neuron\\'s sum before the activation function, allowing the activation function to be shifted left or right.'],
    ['Layers', 'Groups of neurons. Networks typically have an Input Layer, multiple Hidden Layers, and an Output Layer.']
  ]}
/>

</ConceptTemplate>
`,
  '26. Deep Learning/Perceptrons/index.mdx': `---
title: Perceptrons
description: The simplest and oldest model of an artificial neuron, invented in 1957.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Perceptrons">

The Perceptron, invented by Frank Rosenblatt in 1957, is a mathematical model of a biological neuron and the earliest form of a neural network. It is a binary classifier that takes a vector of inputs, multiplies them by weights, sums them, and passes them through a step function.

<Callout icon="warning" title="The XOR Problem">
  In 1969, Marvin Minsky and Seymour Papert proved mathematically that a single-layer perceptron is completely incapable of learning the XOR logical operation because XOR is not "linearly separable." This devastating revelation caused the first "AI Winter," freezing funding for neural network research for over a decade.
</Callout>

## How it works

1. **Input:** Takes real-valued inputs (e.g., $x_1, x_2$).
2. **Weights:** Multiplies inputs by their respective weights (e.g., $w_1, w_2$).
3. **Summation:** Adds all the weighted inputs together, plus a bias ($b$).
4. **Activation:** If the sum is greater than 0, output 1. Otherwise, output 0. (The Heaviside Step Function).

</ConceptTemplate>
`,
  '26. Deep Learning/Multi-layer perceptrons/index.mdx': `---
title: Multi-Layer Perceptrons (MLPs)
description: The classic feedforward neural network that solves the linear separability problem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Layer Perceptrons (MLPs)">

A Multi-Layer Perceptron (MLP) is a class of feedforward artificial neural network. An MLP consists of at least three layers of nodes: an input layer, a hidden layer, and an output layer. 

By stacking perceptrons and using **non-linear activation functions** (like Sigmoid or ReLU) instead of a simple binary step function, MLPs can mathematically approximate any continuous mathematical function.

<Callout icon="success" title="Universal Approximation Theorem">
  The Universal Approximation Theorem mathematically guarantees that an MLP with a single, sufficiently wide hidden layer and a non-linear activation function can approximate ANY continuous function, no matter how complex. This solved the XOR problem that plagued the original perceptrons.
</Callout>

## Architecture

<ComparisonTable 
  headers={['Layer Type', 'Function']}
  rows={[
    ['Input Layer', 'Passively receives the raw features (e.g., pixel intensities of an image).'],
    ['Hidden Layers', 'The computational engine. Each neuron here learns to detect increasingly abstract features. The "Deep" in Deep Learning refers to having many hidden layers.'],
    ['Output Layer', 'Produces the final prediction (e.g., probability of "Cat" vs "Dog").']
  ]}
/>

</ConceptTemplate>
`,
  '26. Deep Learning/Backpropagation/index.mdx': `---
title: Backpropagation
description: The mathematical engine that allows neural networks to learn by calculating gradients backwards from the error.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Backpropagation">

Backpropagation (short for "backward propagation of errors") is the fundamental mathematical algorithm used to train neural networks. It is an efficient method for computing the gradient of the loss function with respect to every single weight in the network, using the **Chain Rule of Calculus**.

<Callout icon="tip" title="The Forward and Backward Pass">
  Training involves two phases:
  1. **Forward Pass:** The data flows through the network to generate a prediction. The prediction is compared to the ground truth to calculate the Error (Loss).
  2. **Backward Pass:** Backpropagation calculates exactly how much each weight contributed to that Error by taking partial derivatives.
</Callout>

## The Mathematics

1. Calculate the Loss ($L$) at the output layer.
2. Use the Chain Rule to calculate the partial derivative of the Loss with respect to the output layer\\'s weights ($\\frac{\\partial L}{\\partial W_{out}}$).
3. "Propagate" these error gradients backward to the previous layer.
4. Repeat until you have the gradient for every single weight in the entire network. Once you have the gradients, you use an optimizer (like Gradient Descent) to slightly adjust the weights in the opposite direction of the gradient.

</ConceptTemplate>
`,
  '26. Deep Learning/Gradient descent/index.mdx': `---
title: Gradient Descent
description: The foundational optimization algorithm used to minimize the loss function in Machine Learning models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gradient Descent">

Gradient Descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function. In the context of Deep Learning, it is the mechanism that actually updates the network\\'s weights based on the gradients computed by Backpropagation.

<Callout icon="info" title="The Mountain Analogy">
  Imagine you are blindfolded on a rugged mountain and need to reach the lowest valley (minimum error). You feel the slope of the ground beneath your feet (the gradient). You take a step in the steepest downward direction. You repeat this until the ground is flat. That is Gradient Descent.
</Callout>

## Variants

<ComparisonTable 
  headers={['Variant', 'Mechanism', 'Pros & Cons']}
  rows={[
    ['Batch Gradient Descent', 'Calculates the gradient over the ENTIRE training dataset before taking a single step.', 'Guarantees convergence to the global minimum (for convex functions), but is computationally impossible for massive datasets.'],
    ['Stochastic Gradient Descent (SGD)', 'Calculates the gradient and updates weights for a SINGLE randomly chosen data point at a time.', 'Extremely fast and memory efficient, but the path to the minimum is highly chaotic and noisy.'],
    ['Mini-Batch Gradient Descent', 'The industry standard. Calculates the gradient over a small batch (e.g., 32 or 64 samples) before updating.', 'The perfect middle ground. Exploits GPU vectorization for speed while maintaining a stable path to the minimum.']
  ]}
/>

</ConceptTemplate>
`,
  '26. Deep Learning/CNNs/index.mdx': `---
title: Convolutional Neural Networks (CNNs)
description: The specialized neural network architecture that revolutionized Computer Vision.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Convolutional Neural Networks (CNNs)">

A Convolutional Neural Network (CNN) is a class of deep neural networks heavily utilized for analyzing visual imagery. Before CNNs, attempting to feed raw pixels into a standard Multi-Layer Perceptron required an astronomical amount of weights, making image processing practically impossible.

<Callout icon="success" title="The ImageNet Breakthrough">
  In 2012, a CNN named **AlexNet** decimated all non-deep-learning competitors in the ImageNet visual recognition challenge. This moment single-handedly ignited the modern Deep Learning boom.
</Callout>

## Core Operations

<ComparisonTable 
  headers={['Operation', 'Description']}
  rows={[
    ['Convolution', 'Sliding a small matrix (a filter/kernel) across the image to mathematically detect features like edges, curves, and textures. This shares weights across the image, drastically reducing computation.'],
    ['Pooling (Subsampling)', 'Shrinking the dimensions of the feature maps (e.g., Max Pooling keeps only the brightest pixel in a 2x2 grid). This makes the network invariant to small shifts and distortions.'],
    ['Fully Connected Layers', 'After multiple rounds of convolution and pooling, the 2D feature maps are flattened into a 1D vector and fed into standard dense layers to make the final classification.']
  ]}
/>

</ConceptTemplate>
`,
  '26. Deep Learning/RNNs/index.mdx': `---
title: Recurrent Neural Networks (RNNs)
description: Neural networks designed to handle sequential data by maintaining an internal state (memory).
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Recurrent Neural Networks (RNNs)">

Recurrent Neural Networks (RNNs) are a class of neural networks designed to process sequential data (like time series, text, or audio). Unlike standard feedforward networks, RNNs have loops in them, allowing information to persist.

<Callout icon="warning" title="The Vanishing Gradient Problem">
  Standard RNNs suffer catastrophically from the **Vanishing Gradient Problem**. During Backpropagation Through Time (BPTT), gradients are multiplied repeatedly. If the gradients are slightly less than 1, they exponentially shrink to zero, meaning the RNN mathematically cannot learn long-term dependencies (it "forgets" earlier parts of the sequence).
</Callout>

## How they maintain state

In a standard MLP, $Output = Activation(Weights \\times Input)$.

In an RNN, the output depends not just on the current input, but on the hidden state from the *previous* time step:
$HiddenState_t = Activation(Weights_{input} \\times Input_t + Weights_{hidden} \\times HiddenState_{t-1})$

This means an RNN processing the word "World" in the sentence "Hello World" mathematically "remembers" that it just saw the word "Hello". This made them the dominant architecture for Natural Language Processing before Transformers were invented.

</ConceptTemplate>
`,
  '26. Deep Learning/Transformers/index.mdx': `---
title: Transformers
description: The architecture that powers LLMs, replacing recurrence with parallelizable self-attention.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Transformers">

Introduced by Google researchers in the seminal 2017 paper *"Attention Is All You Need"*, the Transformer architecture completely discarded the sequential nature of RNNs. Instead, it processes all tokens in a sequence simultaneously using **Self-Attention mechanisms**.

This architecture powers ChatGPT (Generative Pre-trained Transformer), Claude, and essentially all state-of-the-art AI systems today.

<Callout icon="success" title="The Hardware Advantage">
  Because RNNs are sequential, you cannot compute step 5 until you finish step 4. This made them terrible for GPUs. Transformers process the entire sequence in parallel via massive matrix multiplications, which is exactly what modern GPUs (like Nvidia H100s) are built to do at astronomical speeds.
</Callout>

## Core Innovations

<ComparisonTable 
  headers={['Innovation', 'Description']}
  rows={[
    ['Self-Attention', 'Allows each word in a sequence to mathematically "look at" every other word to gather context. For example, understanding that "bank" means a river bank versus a financial bank based on the surrounding words.'],
    ['Positional Encoding', 'Because the network ingests all words simultaneously, it has no concept of order. Positional encodings mathematically inject sine/cosine waves into the word embeddings so the network knows the position of each word.'],
    ['Multi-Head Attention', 'Running the self-attention mechanism multiple times in parallel, allowing the network to simultaneously focus on different types of relationships (e.g., grammar vs semantics).']
  ]}
/>

</ConceptTemplate>
`,
  '26. Deep Learning/Attention mechanisms/index.mdx': `---
title: Attention Mechanisms
description: The mathematical concept allowing neural networks to focus on specific parts of the input.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Attention Mechanisms">

Attention mechanisms were originally introduced to solve the bottleneck problem in sequence-to-sequence RNNs (like language translation). Instead of trying to compress an entire sentence into a single fixed-length vector, Attention allows the decoder to "look back" at specific, relevant words in the input sentence while generating each translated word.

<Callout icon="info" title="The Query, Key, Value Model">
  Modern attention (especially in Transformers) uses the **QKV database abstraction**:
  - **Query (Q):** What I am currently looking for.
  - **Key (K):** What I have to offer.
  - **Value (V):** The actual content.
  
  The mathematical similarity (dot product) between a Query and all Keys determines how much "Attention" is paid to the corresponding Values.
</Callout>

## Scaled Dot-Product Attention
The mathematical core of Transformer attention is defined as:

$Attention(Q, K, V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V$

1. $QK^T$ computes the similarity scores between all tokens.
2. We divide by the square root of the dimension size ($\\sqrt{d_k}$) to prevent gradients from exploding.
3. We apply a $softmax$ function to turn the scores into probabilities (summing to 1).
4. We multiply by $V$ to get the final weighted representation.

</ConceptTemplate>
`,
  '26. Deep Learning/Loss functions/index.mdx': `---
title: Loss Functions
description: The mathematical objective functions that neural networks attempt to minimize during training.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Loss Functions">

A Loss Function (or Cost Function) is a mathematical algorithm that evaluates how well your algorithm models your dataset. It outputs a single scalar value representing the "Error". The entire goal of training a neural network via Backpropagation and Gradient Descent is to find the weights that minimize this Loss Function.

<Callout icon="warning" title="Choosing the Wrong Loss">
  If you use Mean Squared Error (MSE) for a classification problem, the mathematics of the gradients will be extremely unstable and the network may fail to learn entirely. You must pair the mathematical objective with the specific problem type.
</Callout>

## Standard Loss Functions

<ComparisonTable 
  headers={['Loss Function', 'Problem Type', 'Mechanism']}
  rows={[
    ['Mean Squared Error (MSE)', 'Regression (Predicting continuous numbers like house prices)', 'Calculates the average of the squared differences between the predicted values and the actual values. Heavily penalizes large outliers.'],
    ['Binary Cross-Entropy (Log Loss)', 'Binary Classification (e.g., Spam vs Not Spam)', 'Measures the performance of a classification model where the prediction is a probability value between 0 and 1. Punishes confident but wrong predictions severely.'],
    ['Categorical Cross-Entropy', 'Multi-class Classification (e.g., identifying 10 different types of animals)', 'The standard loss for networks outputting probabilities across multiple mutually exclusive classes (usually paired with a Softmax output layer).']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega11() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega11().catch(console.error)
