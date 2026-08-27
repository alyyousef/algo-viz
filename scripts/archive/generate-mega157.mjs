import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/gradients)/index.mdx': `---
title: Gradients
description: "The multivariable extension of the derivative, representing a vector that points in the direction of the steepest ascent of a function, driving all AI training."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Gradients"
  subtitle="The Compass of Steepness"
  tags={['Mathematics', 'Calculus', 'Machine Learning']}
>

In a single-variable function $f(x)$, the derivative $f'(x)$ is a single number representing the slope. In a multi-variable function $f(x, y, z...)$, the slope depends entirely on which direction you step. The **Gradient** combines all possible slopes into a single master vector.

## 1. The Gradient Vector ($\\nabla$)
The Gradient (denoted by the symbol $\\nabla$, called Nabla or Del) is a vector containing all the partial derivatives of a function.
If $f(x, y) = x^2 + y^3$, the Gradient is:
$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix} = \\begin{bmatrix} 2x \\\\ 3y^2 \\end{bmatrix}$

## 2. Geometric Properties
The Gradient vector has two profoundly important geometric properties:
1. **Direction**: It always points perfectly in the direction of the steepest possible ascent at that specific point. (If you want to climb a mountain as fast as possible, follow the Gradient).
2. **Magnitude**: The length of the vector tells you exactly how steep that steepest path is.

Because of this, if you want to find the bottom of a valley (to minimize an error function), you simply calculate the Gradient, and take a step in the exact opposite direction ($-\\nabla f$). This is the algorithm known as Gradient Descent.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/gradient-based methods)/index.mdx': `---
title: Gradient-Based Methods
description: "The family of iterative optimization algorithms that use the mathematical gradient of a function to systematically navigate toward minimums, forming the core of AI optimization."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Gradient-Based Optimization"
  subtitle="Navigating the Loss Landscape"
  tags={['Mathematics', 'Optimization', 'Machine Learning', 'Algorithms']}
>

Because modern Neural Networks have billions of parameters, using exact algebraic formulas to find the lowest point of the Loss Function is computationally impossible. Instead, AI uses **Gradient-Based Methods** to iteratively "walk" down the mathematical mountain until it reaches the bottom.

## 1. Gradient Descent
The vanilla algorithm. At your current position in the multi-dimensional landscape, calculate the Gradient (the vector pointing up the steepest slope). Multiply it by a small negative number (the **Learning Rate**), and add it to your position. You have now taken a small step downhill.
$x_{n+1} = x_n - \\alpha \\nabla f(x_n)$

## 2. Stochastic Gradient Descent (SGD)
Calculating the exact, perfect gradient for a 10-billion parameter AI requires processing the entire 1-Petabyte training dataset for every single step. This is too slow.
**SGD** takes a tiny, random sample of the data (a Mini-Batch), and calculates a "noisy" gradient. Because it's noisy, the algorithm takes a drunken, zig-zag path down the mountain. While each step is slightly inaccurate, you can take thousands of steps per second, making it exponentially faster overall.

<Callout type="success" title="Adam Optimizer (Adaptive Moment Estimation)">
  The modern gold-standard algorithm in AI. Adam doesn't just blindly follow the gradient. It acts like a heavy ball rolling down a hill (Momentum). If the gradient has been pointing South for 100 steps, Adam mathematically builds up "velocity" and accelerates South. It also dynamically shrinks the Learning Rate for parameters that are swinging wildly.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/eigenvalues/index.mdx': `---
title: Eigenvalues
description: "The scalar multiplier associated with an Eigenvector, defining exactly how much the spatial axis stretches or compresses during a linear transformation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Eigenvalues"
  subtitle="The Scale of Transformation"
  tags={['Mathematics', 'Linear Algebra', 'Physics', 'Data Science']}
>

When a matrix transforms a space, its **Eigenvectors** are the directional axes that don't get knocked off their geometric line. The **Eigenvalue** ($\\lambda$) is the numerical factor by which that eigenvector is stretched, squished, or reversed.

## 1. The Mathematical Definition
$A\\vec{v} = \\lambda\\vec{v}$
- If $\\lambda = 2$: The matrix stretches that axis to double its size.
- If $\\lambda = 1$: The axis is completely unaffected by the transformation (a rotation axis).
- If $\\lambda = 0$: The matrix collapses that entire dimension out of existence (projecting 3D down to 2D).
- If $\\lambda = -1$: The axis is flipped perfectly backward (a reflection).

## 2. Solving for Eigenvalues
To find them, you must solve the Characteristic Equation:
$\\det(A - \\lambda I) = 0$
This algebraic formula finds the exact values of $\\lambda$ that mathematically force the matrix transformation to squish space into a lower dimension (determinant = 0).

## 3. Real-World Applications
- **Structural Engineering**: In physics, the eigenvalues of a building's mass/stiffness matrix represent its natural resonant frequencies. If an earthquake hits with a frequency matching an eigenvalue, the building mathematically resonates and collapses.
- **Quantum Mechanics**: In the Schrödinger equation, the state of a quantum system is an Eigenvector, and the actual physical, measurable properties (like exact energy levels) are its Eigenvalues.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Differential equations (ODEs/index.mdx': `---
title: Ordinary Differential Equations (ODEs)
description: "Equations that mathematically relate a function of a single variable to its derivatives, used to precisely model physics, population growth, and mechanical systems."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Ordinary Differential Equations"
  subtitle="Modeling Dynamic Systems"
  tags={['Mathematics', 'Calculus', 'Physics', 'Simulation']}
>

An **Ordinary Differential Equation (ODE)** is an equation containing an unknown function (of one variable) and its derivatives. If algebra is solving for an unknown *number* ($x = 5$), differential equations are solving for an unknown *function* (e.g., finding the exact formula for a pendulum's swing over time).

## 1. The Setup
A classic ODE is Newton's Second Law of Motion: $F = ma$.
Since Acceleration ($a$) is the second derivative of Position ($x$) over Time ($t$), the equation is actually an ODE:
$F = m \\frac{d^2x}{dt^2}$
By solving this ODE, you derive the exact formula for where an object will be at any future point in time.

## 2. Order and Linearity
- **Order**: The highest derivative present. ($y'' + y = 0$ is a Second-Order ODE).
- **Linearity**: A linear ODE only has derivatives to the first power. Nonlinear ODEs (like the Navier-Stokes equations) are notoriously chaotic and mathematically impossible to solve analytically.

## 3. Algorithmic Solutions
Because most real-world ODEs cannot be solved with clean algebra, computer scientists use Numerical Methods to step through time and approximate the function.
- **Euler's Method**: The simplest algorithm. Calculate the derivative, draw a straight line, step forward by $\\Delta t$, recalculate. Very fast, but accumulates massive mathematical error over time.
- **Runge-Kutta (RK4)**: The gold-standard algorithm used in physics engines (like Kerbal Space Program). It calculates 4 different slopes at each timestep and mathematically weights them, producing insanely accurate physics simulations without requiring supercomputers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/ANOVA)/index.mdx': `---
title: Analysis of Variance (ANOVA)
description: "A statistical method used to test differences between three or more group means simultaneously, analyzing whether the variance between groups is greater than the variance within them."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Analysis of Variance (ANOVA)"
  subtitle="Comparing Multiple Groups"
  tags={['Mathematics', 'Statistics', 'Data Science', 'Testing']}
>

If you want to know if Version B of a website is better than Version A, you use a standard T-Test. But what if you are A/B testing 5 different versions of a website simultaneously? If you run 10 separate T-Tests comparing every combination, the statistical probability of a False Positive skyrockets (The Multiple Comparisons Problem).
To solve this, statisticians use **ANOVA**.

## 1. The Core Concept
ANOVA mathematically asks one question: *Is the difference BETWEEN the groups significantly larger than the random noise WITHIN the groups?*
If the average conversion rate of the 5 website versions is wildly different, but the daily traffic is also fluctuating insanely (high internal variance), ANOVA will mathematically conclude that the differences are just random noise.

## 2. The F-Statistic
ANOVA outputs an **F-Statistic**, calculated as:
$F = \\frac{\\text{Variance Between Groups}}{\\text{Variance Within Groups}}$
- If $F \\approx 1$: The groups are mathematically identical. Any differences are purely random noise.
- If $F \\gg 1$: The variance between the groups is massive compared to the internal noise. You have mathematically proven that at least one group is statistically significantly different from the others.

## 3. Post-Hoc Testing
ANOVA only tells you that *at least one* group is different, but it doesn't tell you which one. If the ANOVA is statistically significant (P-Value < 0.05), data scientists then run strict "Post-Hoc" tests (like Tukey's HSD) to mathematically isolate exactly which versions beat the others, without inflating the False Positive rate.

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
