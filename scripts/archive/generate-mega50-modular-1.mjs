import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/26. Deep Learning/Activation functions (ReLU/index.mdx': `---
title: ReLU (Rectified Linear Unit)
description: The foundational activation function of Deep Learning that mathematically solved the vanishing gradient problem using a simple piecewise linear function.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ReLU (Rectified Linear Unit)">

Before **ReLU**, Neural Networks relied on smooth, curve-based activation functions like Sigmoid or Tanh. However, as networks grew deeper (more layers), those functions mathematically crushed the gradients down to microscopic numbers, halting learning entirely (the Vanishing Gradient Problem). ReLU solved this with brute-force mathematical simplicity.

## 1. The Mathematical Function
The equation for ReLU is startlingly simple:
$f(x) = \max(0, x)$

- If the input is negative, output exactly $0$.
- If the input is positive, output the exact input.

This means the mathematical derivative (the slope) is either exactly $0$ or exactly $1$. Because the gradient is $1$ for all positive values, the mathematical signal passes through a 100-layer Neural Network without degrading or vanishing.

## 2. Sparse Activation
Because ReLU outputs absolute $0$ for any negative input, it mathematically "turns off" specific neurons. In a dense network, maybe only 30% of neurons fire for a specific input image. This **sparsity** mimics the human brain and makes the network vastly more computationally efficient. 

## 3. The Dying ReLU Problem
The fatal flaw of ReLU is its harsh cutoff. If a neuron's weights update in such a way that it always receives a negative input, it will always output $0$. The derivative of $0$ is $0$, meaning Gradient Descent can mathematically never update its weights again. The neuron is permanently "dead". 
Variants like **Leaky ReLU** ($f(x) = \max(0.01x, x)$) mathematically fix this by allowing a tiny, non-zero gradient for negative inputs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Adam/index.mdx': `---
title: Adam (Adaptive Moment Estimation)
description: The absolute standard optimization algorithm in Deep Learning, dynamically adjusting the learning rate for every single parameter based on historical gradients.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Adam (Adaptive Moment Estimation)">

Standard Stochastic Gradient Descent (SGD) applies one single, global Learning Rate to every weight in the network. **Adam** (Adaptive Moment Estimation) mathematically tracks the history of each individual weight and dynamically adjusts its specific learning rate, leading to significantly faster convergence.

## 1. The Mathematical Intuition (Momentum + RMSProp)
Adam mathematically combines the best features of two older optimization algorithms:

1. **Momentum (First Moment)**: Adam calculates a rolling average of past gradients. If the algorithm has been rolling downhill in the same direction for the last 100 steps, it mathematically builds "momentum" and speeds up, easily blasting through shallow local minima.
2. **RMSProp (Second Moment)**: Adam tracks the *squared* gradients to measure variance. If a specific parameter (like a rare vocabulary word) updates very infrequently, Adam mathematically increases its individual learning rate to ensure it doesn't get ignored. If a parameter updates wildly, Adam mathematically throttles its learning rate down to prevent explosions.

## 2. Bias Correction
Because Adam initializes its momentum trackers at absolute zero, the first few training steps are mathematically biased towards zero (making the algorithm sluggish at the very beginning). 
Adam applies an algebraic **Bias Correction** formula to artificially inflate the momentum during the first few epochs, ensuring rapid initial learning before naturally decaying back to the raw averages.

## 3. The Tradeoff vs SGD
While Adam converges vastly faster than standard SGD during training, it is mathematically prone to settling into slightly inferior, sharper local minima. In massive computer vision competitions (like ImageNet), researchers sometimes train with Adam for the first 80%, and then manually switch to standard SGD with Momentum to mathematically guarantee the absolute optimal convergence.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/AdamW/index.mdx': `---
title: AdamW (Adam with Weight Decay)
description: An evolution of the Adam optimizer that decouples weight decay from the gradient update, mathematically fixing a fundamental flaw in how Adam handles regularization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AdamW (Adam with Weight Decay)">

In standard Deep Learning, **L2 Regularization** (Weight Decay) is mathematically applied by artificially adding the squared magnitude of the weights directly into the Loss Function. This prevents the model from relying too heavily on any single neuron, preventing overfitting. 
While this works perfectly for standard SGD, it is mathematically broken when used inside the Adam optimizer. **AdamW** was created to fix this bug.

## 1. The Mathematical Flaw in Adam
Adam works by dynamically dividing the learning rate by a moving average of the squared gradients. 
If you apply standard L2 Regularization, you are artificially increasing the gradient of massive weights. Adam sees this massive gradient, assumes the parameter is wildly unstable, and mathematically *throttles the learning rate down*.
This completely defeats the purpose. The weights that most desperately need to decay are mathematically prevented from doing so.

## 2. The AdamW Fix (Decoupling)
AdamW solves this by **mathematically decoupling** Weight Decay from the Loss Function. 
Instead of polluting the gradient calculation, AdamW allows Adam to calculate the pure, unadulterated gradient and update the momentum. Only *after* the momentum step is complete, AdamW manually subtracts a tiny fraction of the weight directly from the parameter itself.

## 3. Production Impact
The introduction of AdamW was a massive breakthrough. For years, researchers believed SGD was fundamentally better at generalizing than Adam. AdamW proved the issue wasn't the optimizer, but the math of the regularization. AdamW is now the absolute standard optimizer used to train massive Transformer models (like GPT-4 and Llama).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Batch normalisation/index.mdx': `---
title: Batch Normalisation
description: A transformative technique that stabilizes deep neural networks by mathematically normalizing the inputs of each layer across the mini-batch during training.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Batch Normalisation">

In a Deep Neural Network, Layer 5 relies on the outputs of Layer 4. But as the network trains, Layer 4 is constantly updating its weights, meaning the distribution of the data it passes to Layer 5 is constantly shifting. This is mathematically known as **Internal Covariate Shift**. It makes training deep networks painfully slow and unstable.

## 1. The Mathematical Solution
**Batch Normalisation (BatchNorm)** adds a mathematical operation between layers.
For every mini-batch of data passing through the layer, it:
1. Calculates the **Mean** ($\mu$) of the batch.
2. Calculates the **Variance** ($\sigma^2$) of the batch.
3. Mathematically normalizes the batch so the mean is $0$ and the standard deviation is $1$.

By mathematically guaranteeing that Layer 5 will *always* receive data perfectly centered at $0$, the network is stabilized and can be trained with vastly higher Learning Rates.

## 2. The Gamma and Beta Parameters
If we strictly force the data to a mean of $0$ and variance of $1$, we mathematically destroy the expressive power of the network. (Maybe the network *wants* the data to be shifted to the right to trigger a specific ReLU activation).
BatchNorm introduces two learnable parameters:
- **Gamma ($\gamma$)**: Scales the variance.
- **Beta ($\beta$)**: Shifts the mean.
The network can mathematically learn to restore the original distribution if it is optimal, but it now has full algebraic control over the flow.

## 3. The Flaw (Small Batches)
Because BatchNorm relies on statistical averages, it mathematically collapses if the batch size is too small. If your batch size is 2, the mean and variance are statistically meaningless, and the network will rapidly destabilize. For tasks requiring tiny batches (like massive LLMs), **Layer Normalisation** is used instead.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Dropout/index.mdx': `---
title: Dropout
description: A brutal, highly effective regularization technique that prevents Neural Networks from overfitting by randomly disabling a percentage of neurons during training.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dropout">

Deep Neural Networks have millions of parameters, meaning they easily memorize the training data (Overfitting) instead of mathematically learning the underlying patterns. **Dropout** is a regularization technique that forces the network to become robust by introducing chaos.

## 1. The Mechanism of Chaos
During training, a Dropout layer mathematically "turns off" a random percentage of neurons (usually 20% to 50%) in every single forward pass.
- If a layer has 1,000 neurons, and Dropout is set to $0.5$, 500 neurons will mathematically output absolute $0$ for that specific batch of data. 
- On the very next batch, a *different* random 500 neurons are disabled.

## 2. The Mathematical Impact
Why does crippling the network improve it? 
It mathematically prevents **Co-Adaptation**. In a standard network, Neuron A might become lazy and rely entirely on Neuron B to detect edges. If Neuron B is randomly shut off via Dropout, Neuron A is forced to learn how to detect edges itself. 
Dropout mathematically forces the network to build redundant, independent pathways, making the final model vastly more generalized and robust to unseen data.

## 3. Inference Mode (Scaling)
Dropout is strictly a training mechanism. When the model is deployed to production (Inference), you absolutely do not want random neurons turning off. 
However, there is a mathematical catch: during training, if 50% of neurons were dropped, the next layer only received half the mathematical signal. During inference, when 100% of neurons are active, the signal will mathematically double, blowing up the network. 
To fix this, the framework mathematically multiplies all weights by $0.5$ during inference to exactly replicate the expected signal strength.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/GELU/index.mdx': `---
title: GELU (Gaussian Error Linear Unit)
description: A probabilistic activation function that weights inputs by their statistical probability, serving as the standard for state-of-the-art Transformers like GPT-4.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GELU (Gaussian Error Linear Unit)">

While ReLU is the standard for Computer Vision, the **GELU** activation function is the mathematical standard for almost all modern Large Language Models (including BERT, GPT-3, and GPT-4). It replaces the harsh, rigid cutoff of ReLU with a smooth, statistically grounded curve.

## 1. The Mathematical Intuition
ReLU uses a harsh absolute rule: *If $x < 0$, drop it. If $x > 0$, keep it.* 
GELU uses a probabilistic rule based on the Gaussian (Normal) Distribution. It asks: *"What is the mathematical probability that a random input is less than $x$?"*

$GELU(x) = x \cdot P(X \le x)$

- If $x$ is highly negative (e.g., -3), the probability of finding a number smaller than -3 in a normal distribution is mathematically near 0%. So GELU multiplies $x$ by 0, dropping it (like ReLU).
- If $x$ is highly positive (e.g., +3), the probability is near 100%. So GELU multiplies $x$ by 1, keeping it (like ReLU).

## 2. The Critical Difference (The Smooth Dip)
The magic of GELU happens near zero. 
In ReLU, -0.1 is instantly crushed to 0. 
In GELU, because it relies on the Cumulative Distribution Function (CDF), slightly negative values are multiplied by a small probability (e.g., -0.1 * 0.46 = -0.046). 
This creates a mathematically smooth, non-monotonic "dip" below zero before rising. This smoothness provides a perfect, non-zero gradient for Gradient Descent, completely eliminating the "Dying ReLU" problem while allowing the network to retain slightly negative information.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Gradient descent/index.mdx': `---
title: Gradient Descent
description: The fundamental mathematical optimization algorithm that trains all Neural Networks by iteratively adjusting weights in the opposite direction of the gradient.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gradient Descent">

If the Loss Function defines how "wrong" a Neural Network is, **Gradient Descent** is the mathematical engine that figures out exactly how to fix it. It is the core algorithm that allows AI to mathematically "learn".

## 1. The Calculus of the Gradient
Imagine standing on a mountain blindfolded, trying to reach the valley floor (the lowest possible error). You cannot see the valley, but you can feel the slope of the ground beneath your feet. 
Using Calculus (Backpropagation), the network calculates the **Gradient**: the vector of partial derivatives representing the exact mathematical slope of the Loss Function with respect to every single weight in the network.

## 2. The Update Rule
The Gradient mathematically points in the direction of the *steepest ascent* (up the mountain). To minimize the error, we must mathematically move in the opposite direction.

$W_{new} = W_{old} - (\text{Learning Rate} \cdot \text{Gradient})$

By subtracting the Gradient, we mathematically force the weights to roll downhill toward a lower error.

## 3. The Variants
Standard Gradient Descent requires calculating the error on the entire massive dataset before taking a single step, which is computationally impossible for modern AI.
- **Stochastic Gradient Descent (SGD)**: Calculates the gradient using a single random data point. It is blazing fast, but highly erratic.
- **Mini-Batch Gradient Descent**: The industry standard. Calculates the gradient using a small batch (e.g., 32 or 256 images). It mathematically balances the speed of SGD with the algebraic stability of full batch processing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/GRUs/index.mdx': `---
title: GRUs (Gated Recurrent Units)
description: A streamlined, highly efficient alternative to LSTMs that uses a reset and update gate to solve the vanishing gradient problem in sequential data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GRUs (Gated Recurrent Units)">

Before Transformers, sequential data (like text or stock prices) was processed by Recurrent Neural Networks (RNNs). However, basic RNNs suffered from the Vanishing Gradient problem and couldn't remember long-term dependencies. 
LSTMs solved this using a complex cell state. **GRUs (Gated Recurrent Units)** are a mathematically streamlined, modern alternative that achieve the exact same performance with significantly less computational overhead.

## 1. The Mathematical Gates
While an LSTM has three gates (Input, Output, Forget) and a separate Cell State, a GRU simplifies the architecture into just two gates and a single Hidden State:

1. **The Update Gate**: Mathematically decides exactly how much of the past knowledge (the previous hidden state) should be passed along to the future. It acts as both the forget and input gate simultaneously.
2. **The Reset Gate**: Mathematically decides exactly how much of the past knowledge should be entirely forgotten before analyzing the current input. 

## 2. The Efficiency Advantage
Because GRUs mathematically merge the Cell State and Hidden State into one vector, and reduce the gate count from 3 to 2, they have significantly fewer tensor operations and parameters than an LSTM. 
This means a GRU trains vastly faster and requires less memory, making it the superior mathematical choice for smaller datasets or embedded systems where compute is strictly limited, while matching LSTM performance on almost all benchmarks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Knowledge distillation/index.mdx': `---
title: Knowledge Distillation
description: A powerful model compression technique where a massive, highly accurate "Teacher" model mathematically trains a smaller, faster "Student" model to replicate its nuanced probability distributions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Knowledge Distillation">

Massive Large Language Models (like a 70-Billion parameter LLaMA) are highly accurate, but computationally impossible to run on a standard smartphone. **Knowledge Distillation** solves this by using the massive model (the Teacher) to train a tiny model (the Student) to mathematically replicate its exact behavior.

## 1. The Mathematical Problem with Hard Labels
In standard training, a model is trained on "Hard Labels": e.g., the image is 100% a Dog, 0% a Cat, 0% a Car.
The problem is that a tiny model struggles to learn complex boundaries from rigid 1/0 data. It lacks the parameter count to build deep mathematical abstractions.

## 2. Dark Knowledge (Soft Targets)
When the massive Teacher model looks at an image of a Dog, it doesn't output 100%. It outputs a mathematical probability distribution (Soft Targets):
- Dog: $85\%$
- Cat: $14\%$
- Car: $1\%$

This distribution contains what researchers call **Dark Knowledge**. The Teacher model is mathematically communicating that a Dog is visually similar to a Cat, but looks absolutely nothing like a Car. 
During Knowledge Distillation, the Student model is trained to mathematically minimize the KL-Divergence between its own outputs and the Teacher's *Soft Targets*. 
By learning the nuanced probabilities rather than rigid 1/0 labels, the tiny Student model is mathematically guided into replicating the exact complex decision boundaries of the Teacher, achieving accuracies impossible to reach if trained from scratch.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/26. Deep Learning/Layer normalisation/index.mdx': `---
title: Layer Normalisation
description: The absolute standard normalization technique for Transformers, calculating mean and variance across the features of a single data point rather than across the batch.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Layer Normalisation">

While **Batch Normalisation** is the standard for Computer Vision (CNNs), it mathematically collapses in Natural Language Processing. 
In NLP, sequences have variable lengths, and batch sizes are often tiny due to massive model sizes. Batch Normalisation relies on calculating averages *across the batch*. If the batch size is 2, the variance calculation is mathematically chaotic. **Layer Normalisation** is the architectural fix that makes Transformers (like GPT) possible.

## 1. The Mathematical Pivot
Instead of calculating the mean and variance for one specific feature across 32 different images, Layer Normalisation calculates the mean and variance for *all features* across *one single sequence*.

If a sentence is embedded into a vector of 512 numbers, Layer Normalisation mathematically looks only at those 512 numbers. It finds their mean, finds their variance, and normalizes them.
Because it mathematically isolates each data point from the rest of the batch, Layer Normalisation functions perfectly even if the batch size is exactly 1.

## 2. Pre-Norm vs Post-Norm
In the original Transformer paper, Layer Normalisation was applied *after* the self-attention mechanism (Post-Norm). 
Modern LLMs (like LLaMA and GPT-4) mathematically flipped this to **Pre-Norm** (applying Layer Normalisation immediately *before* self-attention). This seemingly minor architectural tweak mathematically stabilizes the gradients in ultra-deep networks, preventing the model from collapsing during the early stages of training.

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
