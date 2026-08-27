import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/regression/index.mdx': `---
title: Regression Analysis
description: "The mathematical modeling of relationships between variables, allowing us to predict continuous numerical outputs based on given input data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Regression Analysis"
  subtitle="Predicting the Future with Math"
  tags={['Mathematics', 'Statistics', 'Machine Learning', 'Data Science']}
>

If Classification is the math of categorizing data ("Is this a Cat or a Dog?"), **Regression** is the math of predicting continuous, infinite numerical values ("How much will this house sell for?"). 

## 1. Simple Linear Regression
The most basic form of regression draws a straight line of "best fit" through a scatterplot of data. The equation is the classic algebraic line:
$y = mx + b$
- $y$: The dependent variable you want to predict (e.g., House Price).
- $x$: The independent variable you know (e.g., Square Footage).
- $m$: The slope of the line (how much price increases per square foot).
- $b$: The y-intercept (base price).

## 2. Ordinary Least Squares (OLS)
How does an algorithm mathematically know where to draw the perfect line? It uses **Ordinary Least Squares**. 
For any given line, the algorithm measures the vertical distance between the line and every single actual data point. These distances are the "Errors" (or Residuals). 
The algorithm squares every error (to make them positive and penalize big misses), adds them up, and uses calculus to find the exact line that produces the absolute minimum possible sum.

<Callout type="warning" title="Correlation vs Causation">
  A regression model might find a perfectly mathematical line showing that as Ice Cream sales increase, Shark Attacks increase. The math is 100% correct. But regression cannot prove causation (the hidden variable is Summer Heat). Relying blindly on regression coefficients without domain knowledge is incredibly dangerous.
</Callout>

## 3. Multiple Regression
In the real world, you don't predict a house price just on square footage. You use bedrooms, zip code, and age. 
Multiple Regression expands the equation into higher dimensions:
$y = m_1x_1 + m_2x_2 + m_3x_3 + b$
This creates a multi-dimensional mathematical plane of best fit, which is the foundational starting point for almost all predictive Machine Learning models.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/PDEs)/index.mdx': `---
title: Partial Differential Equations (PDEs)
description: "Advanced mathematical equations involving multivariable functions and their partial derivatives, fundamentally used to simulate fluid dynamics, heat transfer, and quantum mechanics."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Partial Differential Equations"
  subtitle="The Math of Spacetime and Simulation"
  tags={['Mathematics', 'Calculus', 'Physics', 'Simulation']}
>

While an Ordinary Differential Equation (ODE) deals with functions of a *single* variable (like how a pendulum swings over time), a **Partial Differential Equation (PDE)** deals with functions of *multiple* variables (like how heat spreads across a 3D metal plate over time).

## 1. The Core Concept
A PDE contains unknown multivariable functions and their partial derivatives. They are the mathematical language used to describe almost all continuous physical phenomena in the universe.
- **The Heat Equation**: Describes how temperature distributes over space and time.
- **The Wave Equation**: Describes the propagation of light and sound waves.
- **The Navier-Stokes Equations**: Describes the exact flow of fluids (water, air). 

## 2. Why Are They So Hard?
Unlike basic algebra, there is no single algorithmic way to perfectly solve most real-world PDEs. In fact, proving that a smooth, mathematical solution even *exists* for the 3D Navier-Stokes equations is a $1,000,000 Millennium Prize problem.
Because they are so mathematically chaotic, humans cannot solve them by hand.

## 3. Computational Fluid Dynamics (CFD)
Because PDEs cannot be solved algebraically, computer scientists use **Numerical Methods** to approximate them.
Instead of trying to find the perfect mathematical formula for the aerodynamics of a Formula 1 car, software chops the 3D space around the car into millions of tiny cubes (a Mesh). The computer then uses massive matrix multiplication to calculate the PDE physics for one cube, pass the result to the neighboring cube, and step forward by 0.001 seconds. This is why simulating physics requires massive supercomputers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/partial derivatives/index.mdx': `---
title: Partial Derivatives
description: "The mathematical calculation of the rate of change in a multi-dimensional function by freezing all variables except one, isolating specific directional slopes."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Partial Derivatives"
  subtitle="Isolating Dimensional Change"
  tags={['Mathematics', 'Calculus', 'Machine Learning']}
>

In standard calculus, the derivative $\\\\frac{dy}{dx}$ tells you exactly how much $y$ changes when you slightly push $x$. But if you have a function with a million inputs, pushing one input affects the output, but so do the other 999,999. A **Partial Derivative** mathematically isolates that one single input.

## 1. The Mechanics
Let's say you have a function modeling the altitude of a mountain: $f(x, y) = x^2 + 3xy + y^2$.
To find the partial derivative with respect to $x$ (written as $\\\\frac{\\\\partial f}{\\\\partial x}$), you mathematically pretend that $y$ is just a static, boring constant number (like 5).
- $\\\\frac{\\\\partial}{\\\\partial x} (x^2) = 2x$
- $\\\\frac{\\\\partial}{\\\\partial x} (3xy) = 3y$ (because $3y$ is treated as a constant attached to $x$)
- $\\\\frac{\\\\partial}{\\\\partial x} (y^2) = 0$ (because the derivative of any constant is zero).
So, $\\\\frac{\\\\partial f}{\\\\partial x} = 2x + 3y$.

## 2. Geometric Meaning
Geometrically, this represents slicing the 3D mountain perfectly along the X-axis, ignoring the Y-axis completely. It tells you exactly how steep the mountain is *if and only if* you walk strictly due East, taking zero steps North or South.

## 3. The Bedrock of AI
In a neural network, the "Loss" is a massive mathematical function of thousands of "Weights" (variables). To train the AI, the computer must know exactly how tweaking Weight #42 will change the Loss. It calculates the **Partial Derivative** of the Loss with respect to Weight #42, freezing all other weights. It does this for every single weight in the network simultaneously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Optimisation (convex optimisation/index.mdx': `---
title: Convex Optimization
description: "A specialized subfield of optimization focusing on mathematically perfect 'bowl-shaped' functions, guaranteeing that any local minimum discovered is the absolute global minimum."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Convex Optimization"
  subtitle="The Guarantee of Perfection"
  tags={['Mathematics', 'Optimization', 'Machine Learning', 'Algorithms']}
>

In applied mathematics and machine learning, "Optimization" is the process of finding the absolute lowest (or highest) point of a function. The biggest nightmare in optimization is getting stuck in a **Local Minimum** (a small dip in the mountain) while failing to find the true **Global Minimum** (the actual bottom).

## 1. What is Convexity?
A mathematical function is **Convex** if, geometrically, it is shaped like a perfectly smooth bowl. 
The strict mathematical definition: If you draw a straight line between *any* two points on the curve, the entire curve between those points must lie below or exactly on the line.

## 2. The Golden Guarantee
Convex functions have one magical, incredibly valuable mathematical property: **Every local minimum is guaranteed to be the absolute global minimum.**
If an algorithm is mathematically walking down a convex function and it hits the bottom of a dip, it is mathematically proven that it has solved the problem perfectly. It does not need to check anywhere else.

<Callout type="info" title="The Non-Convex Reality of Deep Learning">
  Linear Regression and Support Vector Machines (SVMs) are Convex. They will mathematically always find the perfect answer.
  However, Neural Networks are highly **Non-Convex**. Their loss landscapes look like jagged mountain ranges with millions of local minimums. AI researchers use massive amounts of compute and randomized algorithms (like Stochastic Gradient Descent) to try and bounce out of local minimums, but true perfection in deep learning is mathematically impossible to guarantee.
</Callout>

## 3. Convex Optimization Solvers
Because the math is so clean, computer scientists have developed highly efficient, deterministic algorithms (like Interior Point Methods) that can solve massive convex problems with millions of variables in seconds, used heavily in supply chain logistics, finance, and control systems.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Numerical methods (root finding/index.mdx': `---
title: Numerical Methods (Root Finding)
description: "Algorithmic strategies for approximating the mathematical roots (where a function equals zero) when exact algebraic solutions are impossible."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Root Finding Algorithms"
  subtitle="Approximating the Impossible"
  tags={['Mathematics', 'Algorithms', 'Calculus']}
>

In algebra, finding the "Root" of a function means finding the exact $x$ where $f(x) = 0$. For a quadratic equation ($ax^2 + bx + c$), you use the quadratic formula. But for something like $x^5 - 3x^2 + \\\\sin(x) = 0$, there is mathematically no algebraic formula in existence. Computer scientists must use **Numerical Methods** to approximate the answer iteratively.

## 1. The Bisection Method
The most reliable, foolproof algorithm. It is essentially Binary Search for math.
1. Find an $a$ where $f(a)$ is negative, and a $b$ where $f(b)$ is positive. (Because the function crosses zero between them).
2. Calculate the midpoint $c = (a+b)/2$.
3. If $f(c)$ is negative, the root must be between $c$ and $b$. Replace $a$ with $c$.
4. Repeat endlessly. Every step cuts the search space exactly in half, mathematically guaranteeing convergence.

## 2. Newton's Method (Newton-Raphson)
A significantly faster, more aggressive algorithm that uses Calculus (Derivatives).
Instead of blindly searching, it picks a random starting point, calculates the exact mathematical slope (tangent line) at that point, and follows that straight line down to the x-axis to guess the next point.
The formula: $x_{n+1} = x_n - \\\\frac{f(x_n)}{f'(x_n)}$
Because it follows the curve's actual geometry, it converges incredibly fast (quadratically), but can mathematically explode and fail if the derivative hits zero (a flat spot).

## 3. The Trade-off
This represents the classic computer science trade-off: The Bisection method is slow ($O(\\\\log N)$ precision) but mathematically guaranteed to work safely. Newton's method is blisteringly fast, but mathematically dangerous and requires the function to be differentiable.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/numerical integration/index.mdx': `---
title: Numerical Integration
description: "Algorithmic techniques used to calculate the approximate area under a curve when an exact, algebraic integral is mathematically impossible to find."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Numerical Integration"
  subtitle="Approximating Areas"
  tags={['Mathematics', 'Algorithms', 'Calculus', 'Simulation']}
>

In calculus, you evaluate an integral $\\\\int f(x) dx$ algebraically. However, for many complex functions (like the bell curve equation $e^{-x^2}$), it is mathematically proven that an algebraic anti-derivative *does not exist*. Computers must approximate the area using **Numerical Integration**.

## 1. Riemann Sums (Rectangles)
The most basic approximation. You chop the area under the curve into $N$ rectangles. You calculate the height of the curve at the left edge of each rectangle, multiply by the width, and sum them up. It is computationally easy, but highly inaccurate unless $N$ is massive.

## 2. The Trapezoidal Rule
Instead of drawing flat rectangles (which miss chunks of the curve), this algorithm draws a straight angled line between the left edge and the right edge, creating a Trapezoid. This fits the curve much more tightly, vastly reducing the mathematical error for the same amount of computational work.

<Callout type="success" title="Simpson's Rule (Parabolas)">
  If the Trapezoidal Rule connects points with straight lines, **Simpson's Rule** mathematically connects every three points with a curved Parabola. Because real-world functions are usually curved, fitting parabolas to them is insanely accurate. For very smooth functions, Simpson's Rule converges to the true answer incredibly fast.
</Callout>

## 3. Monte Carlo Integration
In 1D math, Simpson's rule is perfect. But what if you are calculating a 100-dimensional integral for a physics simulation? Creating a grid of trapezoids across 100 dimensions would require more calculations than there are atoms in the universe (The Curse of Dimensionality).
**Monte Carlo Integration** abandons grids entirely. It throws millions of purely random darts at the mathematical space, checks what percentage hit "inside" the function, and uses probability to estimate the total volume. In high dimensions, randomness is mathematically far more efficient than rigid structure.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/matrix decompositions)/index.mdx': `---
title: Matrix Decompositions
description: "The mathematical process of breaking a complex matrix down into a multiplication of simpler, structurally pure matrices to radically speed up computational algorithms."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Matrix Decompositions"
  subtitle="Factoring the Grid"
  tags={['Mathematics', 'Linear Algebra', 'Algorithms', 'Data Science']}
>

In normal algebra, factoring the number 60 into $(2 \\\\times 2 \\\\times 3 \\\\times 5)$ makes it easier to work with. In linear algebra, **Matrix Decomposition** (or Factorization) breaks a massive, chaotic matrix into a multiplication of simpler matrices, which is the secret behind almost all fast computer graphics and AI.

## 1. LU Decomposition
Any square matrix $A$ can be decomposed into $L \\\\times U$:
- **$L$ (Lower Triangular)**: A matrix where all numbers above the diagonal are mathematically zero.
- **$U$ (Upper Triangular)**: A matrix where all numbers below the diagonal are zero.

**Why?** Solving a system of 1,000 equations (like $Ax = b$) takes a massive amount of CPU time. But if the matrix is Triangular, a computer can instantly solve it using "Forward Substitution" (like a zipper). LU Decomposition is the standard algorithmic way computers solve massive equation systems.

## 2. QR Decomposition
Decomposes a matrix into $Q \\\\times R$:
- **$Q$**: An Orthogonal matrix (all vectors are perfectly perpendicular and length 1. Rotating space without stretching it).
- **$R$**: An Upper Triangular matrix.
QR Decomposition is the algorithmic bedrock used by computers to calculate Eigenvalues, and for solving Least Squares regressions.

## 3. Eigendecomposition and SVD
As discussed in their own sections, breaking a matrix down into its Eigenvectors (or Singular Values for non-square matrices) isolates the fundamental axes of transformation, making it possible to compress data, invert matrices instantly, or calculate $A^{1000}$ in nanoseconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/interpolation)/index.mdx': `---
title: Interpolation
description: "Mathematical algorithms used to construct new, continuous data points perfectly within the range of a discrete set of known data points."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Interpolation"
  subtitle="Connecting the Dots Mathematically"
  tags={['Mathematics', 'Algorithms', 'Graphics', 'Data Science']}
>

If you have 5 known data points, **Interpolation** is the mathematical process of figuring out exactly what the data looks like *between* those points. (Unlike Extrapolation, which guesses what happens *outside* the known points).

## 1. Linear Interpolation (Lerp)
The simplest method: drawing a perfectly straight line between Point A and Point B.
If you know it's 50 degrees at 1:00 PM, and 60 degrees at 2:00 PM, Linear Interpolation guesses it was exactly 55 degrees at 1:30 PM.
In game development, the TICK1Lerp(start, end, time)TICK1 function is used constantly to smoothly move a camera or character from one coordinate to another over time.

## 2. Polynomial Interpolation
Straight lines are jagged. If you have $N$ points, you can use algebra (like Lagrange Polynomials) to mathematically construct a single polynomial equation of degree $N-1$ that curves perfectly through every single point.
However, for large datasets, high-degree polynomials suffer from **Runge's Phenomenon**—the math violently oscillates and explodes at the edges of the dataset, making the curve totally useless.

## 3. Spline Interpolation (B-Splines & Bezier Curves)
To avoid the mathematical explosions of massive polynomials, computer graphics use **Splines**.
Instead of one massive equation, the computer connects the points with hundreds of tiny, low-degree polynomials (usually cubic, $x^3$), mathematically forcing the joints where they meet to have matching derivatives. This ensures the line is perfectly, butter-smooth.
This is the exact mathematics behind Vector Graphics (SVGs), Adobe Illustrator, and 3D modeling (NURBS).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Information theory basics/index.mdx': `---
title: Information Theory
description: "The mathematical study of the quantification, storage, and communication of digital data, founded by Claude Shannon in 1948, establishing the absolute physical limits of data compression and network bandwidth."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Information Theory"
  subtitle="The Mathematics of Data"
  tags={['Mathematics', 'Computer Science', 'Networking', 'Compression']}
>

In 1948, Claude Shannon published a paper that single-handedly invented the digital age. He proved that "Information" is not an abstract human concept—it is a mathematically quantifiable physical property, measured in **Bits**.

## 1. Shannon Entropy ($H$)
Entropy is the mathematical measure of uncertainty, surprise, or "unpredictability" in a dataset. 
If a coin is double-headed, flipping it provides 0 bits of information (you already knew the outcome, there is no surprise). If a coin is perfectly fair, flipping it provides exactly 1 Bit of mathematical entropy.

The equation for Entropy is:
$H(X) = - \\\\sum P(x) \\\\log_2 P(x)$

<Callout type="warning" title="The Limit of Compression">
  Shannon's Source Coding Theorem mathematically proves that **Entropy is the absolute minimum limit of lossless data compression**. If a 10MB text file has a mathematical Entropy of 3MB, it is physically impossible to compress that file below 3MB without destroying data. Algorithms like ZIP and GZIP simply try to push files as close to their Shannon Entropy limit as possible.
</Callout>

## 2. The Noisy-Channel Coding Theorem
If you send a Wi-Fi signal through a wall, noise will flip some 1s to 0s. How do you guarantee perfectly accurate downloads?
Shannon proved that every communication channel has a mathematical speed limit, called the **Channel Capacity**. He proved that as long as your data transmission rate is below this capacity limit, it is mathematically guaranteed that you can design Error-Correcting Codes (adding redundant bits) to achieve 100% error-free communication, no matter how noisy the environment is. 

## 3. Impact
Information Theory is why we can compress 4K video (H.264), why we can transmit error-free data from the Voyager space probe 15 billion miles away, and why deep learning models minimize "Cross-Entropy Loss" to learn optimally.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Graph theory applications/index.mdx': `---
title: Graph Theory Applications
description: "How the abstract mathematics of Nodes and Edges is actively deployed in the real world to route internet traffic, optimize delivery networks, and power social media architectures."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Graph Theory in Practice"
  subtitle="Applying the Math of Networks"
  tags={['Mathematics', 'Algorithms', 'Networking', 'Databases']}
>

While Graph Theory is a branch of pure mathematics, it is heavily applied in almost every layer of modern software architecture. When abstracted into Nodes and Edges, seemingly impossible logistical problems become easily solvable algorithms.

## 1. Internet Routing (Shortest Path)
The internet is a massive, weighted graph where routers are Nodes, and fiber-optic cables are Edges. The "weight" of the edge is the latency in milliseconds.
When you request a webpage, your packets must navigate this graph. Protocols like OSPF use **Dijkstra's Algorithm**—a mathematical graph theory algorithm that guarantees it will find the absolute shortest path from Router A to Router B by systematically exploring the lowest-weight edges.

## 2. Supply Chains (Minimum Spanning Trees)
If a telecom company wants to lay fiber-optic cables to connect 1,000 cities, laying cables between *every* city is too expensive. They need to connect everyone using the absolute minimum amount of total cable.
This is a classic Graph Theory problem solved by **Kruskal's Algorithm** or **Prim's Algorithm**. These algorithms analyze the graph and mathematically isolate the "Minimum Spanning Tree"—a subset of edges that connects all nodes together without any cyclic loops, guaranteeing the cheapest possible infrastructure cost.

## 3. Social Networks and Graph Databases
Facebook and LinkedIn do not use standard SQL tables to find "Friends of Friends". They use **Graph Databases** (like Neo4j).
In a Graph Database, the data is physically stored as Nodes (Users) and Edges (Friendships). Because the mathematical relationships are first-class citizens, executing a query like "Find me a path of 3 connections between User A and User B" (a Breadth-First Search) takes milliseconds, whereas a relational SQL database would mathematically choke on the massive TICK1JOINTICK1 operations.

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
