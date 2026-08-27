import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Lagrange multipliers/index.mdx': `---
title: Lagrange Multipliers
description: "A mathematical strategy for finding the local maxima and minima of a function subject to equality constraints, heavily used in optimization and machine learning."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Lagrange Multipliers"
  subtitle="Constrained Optimization"
  tags={['Mathematics', 'Calculus', 'Optimization', 'Machine Learning']}
>

In multivariable calculus, finding the highest or lowest point of a function is usually done by finding where the gradient is zero. But what if you need the highest point *while restricted to a specific path*? That is where **Lagrange Multipliers** come in.

## 1. The Core Intuition
Imagine you are hiking a mountain (represented by the function $f(x,y)$), and you want to find the absolute highest altitude. Standard calculus just tells you to walk to the peak.
However, suppose you are restricted to walking *only* on a specific trail (represented by a constraint equation $g(x,y) = c$). You cannot go to the absolute peak if the trail doesn't go there. You want to find the highest point *on the trail*.

At the exact point where the trail reaches its highest altitude, the contour line of the mountain and the path of the trail must be perfectly tangent (parallel) to each other. 
Since the Gradient vectors are always perpendicular to contour lines, the gradient of the mountain $\\nabla f$ and the gradient of the trail $\\nabla g$ must point in the exact same (or directly opposite) direction.

## 2. The Mathematical Formula
Because the gradients must align, one gradient is simply a scaled version of the other. We introduce a scalar value $\\lambda$ (the Lagrange Multiplier):
$\\nabla f(x,y) = \\lambda \\nabla g(x,y)$

By solving this system of equations alongside the original constraint $g(x,y) = c$, you can mathematically find the exact coordinate of constrained maximums and minimums.

## 3. Usage in Computer Science
In Machine Learning, Support Vector Machines (SVMs) rely entirely on Lagrange Multipliers to find the optimal hyperplane that separates data classes while maximizing the margin between them (a constrained optimization problem).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/SVD/index.mdx': `---
title: Singular Value Decomposition (SVD)
description: "One of the most profound algorithms in linear algebra, decomposing any matrix into three simple geometric transformations, used for data compression and recommendation engines."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Singular Value Decomposition (SVD)"
  subtitle="The Ultimate Matrix Factorization"
  tags={['Mathematics', 'Linear Algebra', 'Data Science', 'Machine Learning']}
>

Not every matrix is a perfect, square matrix that has Eigenvectors. How do you find the underlying mathematical skeleton of messy, rectangular, real-world data (like a database of 10,000 users and 500 movies)? You use **Singular Value Decomposition (SVD)**.

## 1. The Theorem
SVD mathematically proves that *any* matrix $A$, no matter how weird or rectangular, can be perfectly decomposed into a multiplication of three very specific matrices:
$A = U \\Sigma V^T$

1. **$V^T$ (Rotation)**: Aligns the data with the optimal axes.
2. **$\\Sigma$ (Scaling)**: Stretches or squishes the data. The values on the diagonal are the "Singular Values", sorted from most important to least important.
3. **$U$ (Rotation)**: A final rotation into the target space.

## 2. The Netflix Prize (Recommendation Engines)
In 2006, Netflix offered $1,000,000 to anyone who could improve their recommendation algorithm by 10%. The winning team famously used SVD.
If you have a massive, sparse matrix of Users vs. Movie Ratings, you run SVD. The algorithm mathematically discovers hidden "latent concepts". It might figure out that User 14 loves Action movies, even though "Action" isn't explicitly labeled in the data. The mathematical decomposition naturally clusters related users and movies.

## 3. Data Compression (Dimensionality Reduction)
Because the $\\Sigma$ matrix sorts the Singular Values by mathematical importance, you can simply throw away the bottom 80% of the values (setting them to zero) and multiply the matrices back together. 
The result is a highly compressed matrix that still retains almost all the original, meaningful variance. This is mathematically equivalent to Principal Component Analysis (PCA).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Probability (distributions/index.mdx': `---
title: Probability Distributions
description: "Mathematical functions that describe the likelihood of all possible outcomes of a random event, forming the foundation of statistics and probabilistic algorithms."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Probability Distributions"
  subtitle="Mapping the Shape of Randomness"
  tags={['Mathematics', 'Probability', 'Statistics', 'Data Science']}
>

A **Probability Distribution** is a mathematical formula that provides the exact probabilities of occurrence for different possible outcomes in an experiment.

## 1. Discrete vs Continuous
- **Discrete Distributions**: Used when outcomes are distinct and countable (e.g., rolling a dice, the number of emails received in an hour). The probabilities of all possible outcomes must perfectly sum up to 1.0.
- **Continuous Distributions**: Used when outcomes can be any value within a range (e.g., human height, the exact time a server request takes). Because there are infinite possible decimals, the probability of hitting one *exact* number (like 5.000000...) is mathematically 0. Instead, you calculate the probability of a range using the Integral (area under the curve).

## 2. Common Distributions
- **Uniform Distribution**: Every outcome is equally likely (like a fair dice roll or `Math.random()`).
- **Binomial Distribution**: Models the number of successes in a fixed number of independent Yes/No trials (e.g., flipping a coin 10 times).
- **Poisson Distribution**: Models the number of events occurring in a fixed interval of time (e.g., how many database crashes happen per month).
- **Normal (Gaussian) Distribution**: The famous "Bell Curve". Models continuous data that clusters around a mean. Due to the Central Limit Theorem, almost all random noise in the universe naturally forms a Normal Distribution.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/random variables/index.mdx': `---
title: Random Variables
description: "A mathematical formalization of a random process, converting outcomes into quantifiable numbers that can be algebraically analyzed."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Random Variables"
  subtitle="Quantifying Randomness"
  tags={['Mathematics', 'Probability', 'Statistics']}
>

In mathematics, a **Random Variable** (usually denoted by $X$) is not a variable like $x$ in algebra. It is a mathematical *function* that maps the outcomes of a random process to measurable numbers.

## 1. The Abstraction
If you flip a coin, the outcome is "Heads" or "Tails". You cannot do calculus on the word "Heads".
A Random Variable $X$ assigns numbers to these events:
- Let $X = 1$ if Heads.
- Let $X = 0$ if Tails.
Now, $X$ is a quantifiable variable, and we can state $P(X=1) = 0.5$.

## 2. Expected Value ($E[X]$)
Once randomness is converted into a Random Variable, we can mathematically calculate its **Expected Value** (the long-term average). 
For a discrete variable, $E[X]$ is the sum of every possible value multiplied by its probability.
If you play a game where a coin flip pays $10 for Heads and $0 for Tails:
$E[X] = (10 \\times 0.5) + (0 \\times 0.5) = $5.00. 

## 3. Stochastic Processes
In computer science, algorithms that rely heavily on random variables are called **Randomized Algorithms** or Stochastic processes. Examples include:
- **Monte Carlo Simulations**: Using millions of random variable generations to estimate complex outcomes (like pricing financial derivatives).
- **Simulated Annealing**: An optimization algorithm that uses randomness to avoid getting stuck in local minimums.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/expectation/index.mdx': `---
title: Expected Value
description: "The mathematical calculation of the long-term average outcome of a random variable, serving as the basis for risk analysis and algorithm performance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Expected Value"
  subtitle="The Long-Term Average"
  tags={['Mathematics', 'Probability', 'Statistics']}
>

The **Expected Value** (or Expectation) of a random variable is the theoretical long-run average value of repetitions of the experiment it represents. 

## 1. The Formula
For a discrete random variable $X$, the Expected Value $E[X]$ is calculated by multiplying each possible outcome by its probability, and summing them all up.
$E[X] = \\sum x_i P(x_i)$

- **Example (A Dice Roll)**: $E[X] = 1(\\frac{1}{6}) + 2(\\frac{1}{6}) + 3(\\frac{1}{6}) + 4(\\frac{1}{6}) + 5(\\frac{1}{6}) + 6(\\frac{1}{6}) = 3.5$
Notice that 3.5 is mathematically impossible to roll on a single die, but it is the exact average if you roll the die a million times.

## 2. Linearity of Expectation
One of the most mathematically powerful properties in statistics is the **Linearity of Expectation**. It states that the expected value of a sum of random variables is equal to the sum of their individual expected values, *even if the variables are dependent*.
$E[X + Y] = E[X] + E[Y]$

<Callout type="success" title="Algorithmic Application">
  In Computer Science, this property is heavily used to prove the Expected Time Complexity of randomized algorithms. For example, the expected runtime of Randomized Quicksort is mathematically proven to be $O(N \\log N)$ purely through the Linearity of Expectation on the random pivot choices.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/variance)/index.mdx': `---
title: Variance and Standard Deviation
description: "Mathematical measures of how spread out a dataset or probability distribution is, quantifying uncertainty, risk, and noise."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Variance & Standard Deviation"
  subtitle="Measuring the Spread of Data"
  tags={['Mathematics', 'Probability', 'Statistics', 'Data Science']}
>

If the Expected Value tells you where the "center" of the data is, **Variance** and **Standard Deviation** tell you how wildly the data swings away from that center.

## 1. Variance ($\\sigma^2$)
Variance calculates the average of the *squared* differences from the Mean.
Why squared? Because if you just averaged the differences, the negative swings would perfectly cancel out the positive swings, resulting in zero. Squaring them forces all deviations to be mathematically positive, penalizing large outliers heavily.

$Variance(X) = E[(X - \\mu)^2]$

## 2. Standard Deviation ($\\sigma$)
Because Variance squares the numbers, its units are distorted (if you measure height in meters, Variance is in "meters squared"). 
The **Standard Deviation** is simply the square root of the Variance, mathematically bringing the measurement back down to the original units.

## 3. The 68-95-99.7 Rule
For any Normally Distributed data (a Bell Curve):
- ~68% of the data falls within exactly **One Standard Deviation** ($\\pm 1\\sigma$) of the mean.
- ~95% falls within **Two Standard Deviations** ($\\pm 2\\sigma$).
- ~99.7% falls within **Three Standard Deviations** ($\\pm 3\\sigma$).

In software engineering, if a server's response time is usually 50ms with a standard deviation of 5ms, a 70ms response time is a $4\\sigma$ event—a statistical anomaly that should likely trigger a monitoring alert.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/conditional probability/index.mdx': `---
title: Conditional Probability
description: "The mathematical calculation of the likelihood of an event occurring, given that another specific event has already occurred, updating our beliefs with new data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Conditional Probability"
  subtitle="Updating Beliefs with Evidence"
  tags={['Mathematics', 'Probability', 'Statistics', 'Machine Learning']}
>

In the real world, events do not happen in isolated vacuums. **Conditional Probability** is the measure of the probability of an event ($A$) occurring, *given* that another event ($B$) has already occurred. It is mathematically written as $P(A | B)$.

## 1. The Formula
The formula for conditional probability restricts the "universe" of possibilities down strictly to the times when $B$ occurred.
$P(A | B) = \\frac{P(A \\cap B)}{P(B)}$
(The probability of both happening, divided by the probability of B).

## 2. Independent Events
If $A$ and $B$ are completely independent (like two separate coin flips), knowing $B$ provides absolutely zero new mathematical information about $A$.
Therefore, if independent: $P(A | B) = P(A)$.

## 3. Application: Spam Filtering
Conditional probability is the bedrock of **Naive Bayes Classifiers**, the original algorithm for email spam filters. 
The algorithm calculates: $P(Spam | \\text{Contains the word "Viagra"})$. 
By analyzing thousands of historical emails, it mathematically determines the conditional probability that an email is spam *given* the presence of specific words.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Bayes theorem/index.mdx': `---
title: Bayes' Theorem
description: "A foundational mathematical formula for determining conditional probability, allowing for the rigorous updating of hypotheses as new evidence is introduced."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Bayes' Theorem"
  subtitle="The Mathematics of Changing Your Mind"
  tags={['Mathematics', 'Probability', 'Statistics', 'Machine Learning']}
>

**Bayes' Theorem** (named after Reverend Thomas Bayes) is arguably the most famous and important equation in probability theory. It provides a mathematical framework for updating our beliefs or hypotheses when given new, conditional evidence.

## 1. The Equation
$P(A | B) = \\frac{P(B | A) \\times P(A)}{P(B)}$

- **$P(A)$ (The Prior)**: What you believed before seeing the evidence.
- **$P(B | A)$ (The Likelihood)**: How likely the evidence $B$ is, assuming your hypothesis $A$ is true.
- **$P(B)$ (The Marginal Likelihood)**: How likely the evidence $B$ is overall.
- **$P(A | B)$ (The Posterior)**: Your updated, mathematically correct new belief.

## 2. The Medical Test Paradox
Bayes' Theorem solves massive human cognitive biases.
Imagine a disease affects 1% of the population ($P(A) = 0.01$). A test for the disease is 99% accurate (If you have it, it reads positive 99% of the time, and if you don't, it reads negative 99% of the time).
You take the test. It is Positive. What is the actual mathematical probability you have the disease?

Most humans intuitively guess 99%. 
Using Bayes' theorem, the true answer is exactly **50%**. Because the disease is so rare (1%), the sheer volume of "False Positives" from the 99% healthy population mathematically matches the volume of "True Positives" from the sick population. Bayes' Theorem mathematically proves why doctors do not administer rare disease tests to the general public.

## 3. Bayesian Machine Learning
In AI, Bayesian inference allows models to explicitly calculate their own uncertainty. Instead of an AI confidently guessing "This image is a Dog", a Bayesian neural network outputs a probability distribution, effectively saying "I am 80% confident this is a Dog, but due to lack of training data, there is a 20% variance."

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Statistics (hypothesis testing/index.mdx': `---
title: Hypothesis Testing
description: "The formal statistical methodology for evaluating whether an observed result in data is statistically significant, or if it simply occurred due to random chance."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Hypothesis Testing"
  subtitle="The Science of Statistical Proof"
  tags={['Mathematics', 'Statistics', 'Data Science', 'A/B Testing']}
>

In data science, if you run an A/B test on a website and Version B gets 2% more clicks, how do you mathematically prove that Version B is actually better, and it wasn't just a random fluke of traffic? You use **Hypothesis Testing**.

## 1. The Null and Alternative Hypotheses
- **Null Hypothesis ($H_0$)**: The assumption of the status quo, stating there is absolutely no difference, and any observed change is purely random noise. (e.g., "Version B is exactly equal to Version A").
- **Alternative Hypothesis ($H_A$)**: The theory you are attempting to prove. (e.g., "Version B is better than Version A").

## 2. The P-Value
You run your data through a statistical test (like a T-Test). The test outputs a **P-Value**.
The P-Value answers one specific question: *If the Null Hypothesis was mathematically 100% true, how likely is it that we would see this extreme result purely by random chance?*

<Callout type="warning" title="The 0.05 Threshold">
  By scientific convention, if the P-Value is less than 0.05 (5%), the result is considered "Statistically Significant". You mathematically reject the Null Hypothesis, concluding that the 2% increase in clicks is a real, structural improvement, not a fluke. 
</Callout>

## 3. Type I and Type II Errors
- **Type I Error (False Positive)**: Rejecting the Null Hypothesis when it was actually true. (You pushed Version B to production, but it was actually a fluke).
- **Type II Error (False Negative)**: Failing to reject the Null Hypothesis when it was actually false. (You threw away Version B, even though it was genuinely better).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/confidence intervals/index.mdx': `---
title: Confidence Intervals
description: "A statistical range of values that mathematically guarantees, with a specific level of certainty, that the true population parameter falls within its bounds."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Confidence Intervals"
  subtitle="Quantifying Uncertainty"
  tags={['Mathematics', 'Statistics', 'Data Science', 'Analysis']}
>

In statistics, taking a sample of 1,000 users to calculate a metric (like average time spent on an app) gives you a single "Point Estimate" (e.g., 4.2 minutes). But because it's just a sample, the true average of all 1,000,000 users is almost certainly not exactly 4.2. 
A **Confidence Interval** provides a mathematical range (e.g., $4.2 \\pm 0.3$) to quantify how accurate that estimate actually is.

## 1. The 95% Confidence Interval
A 95% Confidence Interval means that if you were to repeat this exact experiment 100 times, pulling 100 different random samples, 95 of those calculated ranges would successfully contain the true, objective population average.

## 2. The Formula
For a large sample size, the Confidence Interval for a mean is calculated as:
$CI = \\bar{x} \\pm Z \\left( \\frac{\\sigma}{\\sqrt{n}} \\right)$

- $\\bar{x}$: The sample mean (e.g., 4.2)
- $Z$: The Z-score for the desired confidence level (1.96 for 95%)
- $\\sigma$: The standard deviation
- $n$: The sample size

## 3. The Margin of Error
The term $Z (\\sigma / \\sqrt{n})$ is the **Margin of Error**. 
Notice the math: Because $n$ (sample size) is in the denominator, increasing your sample size mathematically shrinks the Margin of Error. However, because it is under a square root ($\\sqrt{n}$), the math has diminishing returns. To cut your Margin of Error in half, you must mathematically quadruple your sample size.

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
    await fs.writeFile(fullPath, finalContent.trim() + '\\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
