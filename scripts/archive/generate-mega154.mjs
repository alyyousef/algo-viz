import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Sets/index.mdx': `---
title: Set Theory
description: "The mathematical science of collections, forming the fundamental baseline of all modern mathematics, relational databases, and data structures."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Set Theory"
  subtitle="The Foundation of Mathematics"
  tags={['Mathematics', 'Discrete Math', 'Sets', 'Logic']}
>

Set theory is the branch of mathematical logic that studies sets, which are mathematically defined as collections of distinct objects. Every single relational database (SQL) is fundamentally just an applied engine for evaluating set theory operations on tables.

## 1. The Core Definitions
- **A Set**: An unordered collection of distinct elements. Written as $A = \\{1, 2, 3\\}$.
- **Elements**: The items within a set. If $x$ is an element of $A$, we write $x \\in A$.
- **Subset**: If every element of set $A$ is also in set $B$, then $A$ is a subset of $B$ ($A \\subseteq B$).
- **The Empty Set**: A set containing absolutely nothing, written as $\\emptyset$ or $\\{\\}$. It is mathematically a subset of *every* set.

<Callout type="info" title="The Paradox of Sets">
  In 1901, Bertrand Russell discovered a paradox that broke mathematics: *“Does the set of all sets that do not contain themselves, contain itself?”* If it does, it doesn't. If it doesn't, it does. This forced mathematicians to invent strict axiomatic rules (Zermelo-Fraenkel Set Theory) to prevent the universe of math from imploding.
</Callout>

## 2. Set Operations
Just as arithmetic has $+$, $-$, $\\times$, and $\\div$, Set Theory has its own fundamental operators:
- **Union ($\\cup$)**: Combines all elements of $A$ and $B$. ($A \\cup B$). In SQL, this is TICK1UNIONTICK1.
- **Intersection ($\\cap$)**: Returns only the elements that exist in *both* $A$ and $B$. In SQL, this is an TICK1INNER JOINTICK1.
- **Difference ($-$)**: Returns elements in $A$ that are *not* in $B$.
- **Cartesian Product ($\\times$)**: Creates a set of all possible ordered pairs $(a, b)$ where $a \\in A$ and $b \\in B$. In SQL, this is a TICK1CROSS JOINTICK1.

## 3. Sets in Computer Science
In programming, a \`Set\` is a primary data structure (e.g., \`java.util.Set\`, Python's \`set\`, JavaScript's \`Set\`). Unlike arrays, they guarantee **O(1)** lookup time for checking if an item exists, and mathematically forbid duplicate values.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Relations/index.mdx': `---
title: Mathematical Relations
description: "The formal study of how elements from one set mathematically connect to elements of another set, powering the theory behind Relational Databases and Graph edges."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Relations"
  subtitle="Connecting Sets Together"
  tags={['Mathematics', 'Discrete Math', 'Relations', 'Databases']}
>

While a Set is just a pile of objects, a **Relation** defines how those objects connect to each other. When Edgar F. Codd invented the Relational Database in 1970, he didn't use tables and rows—he used pure mathematical relations.

## 1. The Mathematical Definition
If you have two sets, $A$ and $B$, their Cartesian Product ($A \\times B$) is the set of all possible pairs $(a, b)$.
A **Relation** $R$ is simply any subset of that Cartesian product.
- Example: Let $A = \\{Alice, Bob\\}$ and $B = \\{Math, History\\}$. 
- The relation "is enrolled in" might be the subset: $R = \\{(Alice, Math), (Bob, History)\\}$.

## 2. Properties of Relations
When a relation is from a set to *itself* (e.g., "is older than" among humans), it can have specific mathematical properties:
- **Reflexive**: Every element is related to itself. (e.g., $x \\ge x$ is reflexive. $x > x$ is not).
- **Symmetric**: If $A$ relates to $B$, then $B$ relates to $A$. (e.g., "is a sibling of" is symmetric. "is a parent of" is not).
- **Transitive**: If $A$ relates to $B$, and $B$ relates to $C$, then $A$ relates to $C$. (e.g., "is taller than" is transitive).

## 3. Equivalence Relations
If a relation is mathematically **Reflexive, Symmetric, and Transitive**, it is called an Equivalence Relation. 
Equivalence relations are incredibly powerful because they perfectly partition a set into non-overlapping groups (Equivalence Classes). 
- **Example**: "Has the same birthday as". Everyone is grouped strictly into one of 366 buckets.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Propositional logic/index.mdx': `---
title: Propositional Logic
description: "The foundational algebraic system for evaluating truth and falsehood, acting as the bedrock for all computer processors, logic gates, and control flow in programming."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate
  title="Propositional Logic"
  subtitle="Boolean Algebra and Truth"
  tags={['Mathematics', 'Logic', 'Boolean Algebra', 'Hardware']}
>

**Propositional Logic** (also called Boolean Algebra) is the mathematics of True and False. It is the absolute foundational theory that allowed engineers to build logic gates out of silicon transistors, birthing the entire computer revolution.

## 1. Propositions
A Proposition is a declarative sentence that is either strictly True ($T$) or strictly False ($F$). 
- "Paris is in France" (True)
- "2 + 2 = 5" (False)
- "x > 5" (Not a proposition, because we don't know $x$. This requires Predicate Logic).

## 2. Logical Operators
We combine simple propositions using logical operators to create complex statements.

<ComparisonTable 
  headers={['Operator', 'Symbol', 'Programming', 'Meaning']}
  rows={[
    ['AND (Conjunction)', '$P \\land Q$', 'TICK1&&TICK1', 'True only if BOTH are true'],
    ['OR (Disjunction)', '$P \\lor Q$', 'TICK1||TICK1', 'True if AT LEAST ONE is true'],
    ['NOT (Negation)', '$\\neg P$', 'TICK1!TICK1', 'Inverts the truth value'],
    ['XOR (Exclusive OR)', '$P \\oplus Q$', 'TICK1^TICK1', 'True if exactly ONE is true, but not both'],
    ['IMPLIES (Condition)', '$P \\implies Q$', 'N/A', 'If P is true, Q must be true. (False only if P is True and Q is False)']
  ]}
/>

## 3. Truth Tables
A Truth Table maps out every possible combination of True/False inputs to mathematically prove the outcome of a complex logical circuit.
If a statement is mathematically True for every single possible row in its truth table, it is called a **Tautology** (e.g., $P \\lor \\neg P$). If it is False in every row, it is a **Contradiction**.

## 4. De Morgan's Laws
Augustus De Morgan mathematically proved how to distribute a NOT operation inside a parenthesis. This is crucial for simplifying complex TICK1ifTICK1 statements in code.
- $\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q$ (NOT (A AND B) equals (NOT A) OR (NOT B))
- $\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q$ (NOT (A OR B) equals (NOT A) AND (NOT B))

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Recurrence relations/index.mdx': `---
title: Recurrence Relations
description: "Mathematical equations that recursively define a sequence based on its previous terms, fundamentally used to calculate the Time Complexity of recursive algorithms."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Recurrence Relations"
  subtitle="The Mathematics of Recursion"
  tags={['Mathematics', 'Discrete Math', 'Algorithms', 'Big O']}
>

A **Recurrence Relation** is an equation that defines a mathematical sequence recursively. Every term is defined as a function of its preceding terms. In Computer Science, they are the sole mathematical tool used to calculate the Big O time complexity of a recursive function (like Merge Sort).

## 1. The Classic Example: Fibonacci
The most famous recurrence relation in history is the Fibonacci Sequence.
- **Base Cases**: $F(0) = 0$, $F(1) = 1$
- **Recurrence**: $F(N) = F(N-1) + F(N-2)$

If you write a naive recursive algorithm to calculate Fibonacci, its time complexity is exactly equal to the mathematical growth rate of this recurrence (which is roughly $O(1.618^N)$).

## 2. Algorithmic Recurrence (Divide and Conquer)
When analyzing a Divide and Conquer algorithm, we express its running time $T(n)$ as a recurrence relation.
For example, **Merge Sort**:
1. It splits the array of size $N$ into two halves (2 subproblems of size $N/2$).
2. It takes $O(N)$ time to mathematically merge them back together.
- **The Recurrence**: $T(N) = 2T(N/2) + O(N)$

## 3. Solving Recurrences: The Master Theorem
To convert a recurrence relation like $T(N) = 2T(N/2) + O(N)$ into a closed-form Big O notation, computer scientists use the **Master Theorem**. 
The Master Theorem provides an instant, plug-and-play algebraic formula for solving any recurrence of the form:
$T(N) = aT(N/b) + O(N^d)$

For Merge Sort, $a=2$, $b=2$, $d=1$. Since $2 = 2^1$, it hits Case 2 of the Master Theorem, proving mathematically that the time complexity is exactly $O(N \\log N)$.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Calculus (derivatives/index.mdx': `---
title: Calculus (Derivatives)
description: "The mathematical study of continuous change, where the Derivative calculates the exact, instantaneous rate at which a function is changing at any given infinitesimally small point."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Derivatives"
  subtitle="The Mathematics of Instantaneous Change"
  tags={['Mathematics', 'Calculus', 'Machine Learning', 'Optimization']}
>

Calculus is the mathematics of continuous change. While algebra can tell you how far a car traveled in an hour (average speed), the **Derivative** can tell you the exact speed of the car at a specific, frozen microsecond in time (instantaneous speed).

## 1. The Concept of the Limit
Before Isaac Newton and Gottfried Leibniz, calculating the slope of a curve at a single point was impossible (you need two points to calculate a slope, $\\frac{y_2 - y_1}{x_2 - x_1}$). If you use the same point twice, you divide by zero, mathematically destroying the universe.
Calculus invented the **Limit**. You take two points, and mathematically push them infinitesimally close to each other, infinitely approaching zero distance without ever *actually* reaching zero.

## 2. The Derivative ($dy/dx$)
The derivative of a function $f(x)$, written as $f'(x)$ or $\\frac{dy}{dx}$, represents the exact slope of the tangent line to the function at point $x$.
- If $f(x)$ is your Position over time.
- $f'(x)$ (the First Derivative) is your Velocity (how fast position changes).
- $f''(x)$ (the Second Derivative) is your Acceleration (how fast velocity changes).

<Callout type="success" title="The Power Rule">
  The most common algebraic shortcut in calculus is the Power Rule. To find the derivative of $x^n$, you multiply by the exponent and subtract one from the exponent.
  $\\frac{d}{dx} x^n = n x^{n-1}$
  (e.g., The derivative of $x^3$ is $3x^2$).
</Callout>

## 3. Why Computer Science Cares (Machine Learning)
In Neural Networks, an AI's "Loss Function" is a massive mathematical curve representing how wrong the AI is. The goal is to reach the absolute lowest point (the minimum loss). 
To find the bottom, the AI calculates the **Derivative** of the loss function. The derivative gives the exact slope (gradient) of the curve at that specific point. By taking a small step in the exact opposite direction of the slope, the AI mathematically walks down the hill. This algorithm is called **Gradient Descent**, and it is the entire mathematical engine of modern AI training.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/integrals/index.mdx': `---
title: Integrals
description: "The mathematical process of continuous addition, accumulating infinitely thin slices of a function to calculate total areas, volumes, and accumulated change."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Integrals"
  subtitle="The Mathematics of Accumulation"
  tags={['Mathematics', 'Calculus', 'Physics', 'Probability']}
>

If the Derivative mathematically breaks a function apart to find its instantaneous rate of change, the **Integral** is the exact opposite: it mathematically glues an infinite number of infinitesimally thin slices together to calculate a total accumulated amount.

## 1. The Area Under the Curve
The most intuitive visualization of an integral is finding the exact area underneath a curved, non-straight line.
You cannot use standard geometry ($Width \\times Height$) because the height is constantly curving.
Instead, you chop the area into thousands of microscopic rectangles. As the width of the rectangles approaches zero (the Limit), the sum of their areas becomes mathematically perfect. This is the **Definite Integral**, written with the $\\int$ symbol (an elongated S for "Sum").

## 2. The Fundamental Theorem of Calculus
In one of the most stunning, beautiful discoveries in human history, Newton and Leibniz realized that Integration and Differentiation (Derivatives) are exact mathematical opposites.
If you have a function that calculates Velocity, the **Derivative** tells you the Acceleration. The **Integral** of that same Velocity function tells you the Total Distance Traveled. They perfectly reverse each other.

## 3. Applications in Tech
- **Probability Distributions**: In statistics and machine learning, Continuous Probability Density Functions (like a Bell Curve) use integrals to calculate the exact probability that an event will happen within a specific range.
- **Physics Engines**: Video game engines use numerical integration (like Euler or Verlet integration) 60 times a second. They take the current forces (acceleration), integrate it to update the object's velocity, and integrate the velocity to update the object's position on the screen.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/multivariable calculus/index.mdx': `---
title: Multivariable Calculus
description: "The extension of calculus into multiple dimensions, analyzing functions with multiple independent inputs, serving as the mathematical backbone of Deep Learning."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Multivariable Calculus"
  subtitle="Calculus in Higher Dimensions"
  tags={['Mathematics', 'Calculus', 'Machine Learning', '3D Graphics']}
>

Standard calculus deals with curves on a flat 2D graph (one input $x$, one output $y$). **Multivariable Calculus** extends these rules into 3D space, 4D space, and mathematically infinite dimensions ($f(x, y, z...)$). It is the absolute, non-negotiable mathematical bedrock of Deep Learning.

## 1. Partial Derivatives ($\\frac{\\partial}{\\partial x}$)
In a 3D landscape (like a mountain range defined by $f(x, y)$), a single standard derivative cannot describe the slope, because you could walk North, East, or anywhere in between.
A **Partial Derivative** mathematically locks all variables except one. For example, $\\frac{\\partial f}{\\partial x}$ treats $y$ as a fixed constant, calculating the exact slope of the mountain *only* if you walk strictly parallel to the X-axis.

## 2. The Gradient ($\\nabla$)
If you calculate the partial derivative for every single dimension (X, Y, Z, etc.) and pack them together into a Vector, you get the **Gradient**, denoted by the symbol $\\nabla$ (Nabla).
The Gradient has a magical mathematical property: **It always points in the exact direction of the steepest possible ascent.** 

## 3. The Engine of AI (Backpropagation)
A Large Language Model (like GPT-4) is mathematically just a single multivariable function with 1 Trillion parameters (inputs). 
To train it, the AI calculates a Loss function in 1-Trillion-Dimensional space. By applying the Chain Rule of Multivariable Calculus (an algorithm called **Backpropagation**), it calculates the exact Partial Derivative for all 1 Trillion parameters. This forms a 1-Trillion-Dimensional Gradient vector, telling the AI exactly how to tweak every single parameter to make the model strictly smarter.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/Linear algebra (vectors/index.mdx': `---
title: Linear Algebra (Vectors)
description: "The mathematics of arrays of numbers, vectors, and spaces, acting as the fundamental language of computer graphics, physics simulations, and machine learning."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Vectors"
  subtitle="The Language of Space and Data"
  tags={['Mathematics', 'Linear Algebra', 'Machine Learning', 'Graphics']}
>

In programming, a **Vector** is a 1-Dimensional Array of numbers (e.g., \`[1.5, -2.0, 3.1]\`). In mathematics, Linear Algebra defines a vector as an abstract object possessing both Magnitude (length) and Direction in space.

## 1. Vectors as Coordinates
A vector like $\\vec{v} = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}$ can be mathematically viewed in two ways:
1. **Computer Science**: A list of two pieces of data.
2. **Geometry**: An arrow pointing from the origin $(0,0)$ to the coordinate $(3,4)$.

## 2. Vector Operations
Vectors have strict mathematical rules for interaction:
- **Addition**: Adding two vectors physically chains them together tail-to-head. Mathematically, you just add the matching array indices: $[1, 2] + [3, 4] = [4, 6]$.
- **Scalar Multiplication**: Multiplying a vector by a single number scales its length. $2 \\times [3, 4] = [6, 8]$.

<Callout type="info" title="The Dot Product">
  The **Dot Product** takes two vectors and mathematically crushes them down into a single scalar number. It measures how much two vectors "align" with each other. In Machine Learning, the dot product is heavily used in Attention Mechanisms (Transformers) to calculate how strongly two different words in a sentence relate to each other mathematically.
</Callout>

## 3. Vector Embeddings (AI)
In modern AI, neural networks cannot read English words. Instead, they mathematically translate every word into a dense Vector with hundreds of dimensions (a **Word Embedding**).
For example, the word "King" might become a 300-dimension array. Because they are mathematical vectors, you can do algebra on concepts! The most famous proof of this is:
$\\vec{King} - \\vec{Man} + \\vec{Woman} \\approx \\vec{Queen}$.
The AI learns that the mathematical vector distance representing gender is universally applicable across royalty.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/matrices/index.mdx': `---
title: Matrices
description: "Two-dimensional grids of numbers that mathematically represent linear transformations, serving as the computational workhorse of 3D rendering and neural networks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Matrices"
  subtitle="The Engines of Linear Transformations"
  tags={['Mathematics', 'Linear Algebra', 'Graphics', 'Machine Learning']}
>

If a Vector is a 1D Array, a **Matrix** is a 2D Array (a grid of rows and columns). In Linear Algebra, matrices are not just spreadsheets of data; they are mathematical functions that mutate, warp, and transform space.

## 1. Matrices as Transformations
If you have a 2D Vector (a point on a screen), you can multiply it by a $2 \\times 2$ Matrix. The matrix mathematically acts as a set of instructions, warping the vector to a new location.
- By using specific Transformation Matrices, you can instruct the math to **Rotate** the vector 90 degrees, **Scale** it to twice its size, or **Shear** it.

## 2. Matrix Multiplication
When you multiply a Matrix by another Matrix, you are mathematically chaining transformations together. If Matrix $A$ represents "Rotate 90 degrees" and Matrix $B$ represents "Scale by 2", multiplying $A \\times B$ creates a single Matrix $C$ that does both instantly.
*Note: Matrix multiplication is NOT commutative. $A \\times B \\neq B \\times A$. (Rotating then scaling is mathematically different from scaling then rotating).*

## 3. GPUs and Hardware
Why do we need specialized Graphics Processing Units (GPUs)?
Because rendering a 3D video game requires taking millions of vertex vectors (the 3D models) and multiplying them against projection matrices (the camera) 60 times a second. 
A CPU does math sequentially (one at a time). A GPU is a massive hardware grid explicitly engineered to perform millions of Matrix Multiplications completely in parallel. This exact same matrix-multiplication hardware is why GPUs are universally used to train AI Neural Networks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.2 Applied Mathematics/eigenvectors/index.mdx': `---
title: Eigenvectors & Eigenvalues
description: "The mathematical anchors of a matrix transformation—special vectors that do not get knocked off their geometric path when the space around them is warped."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Eigenvectors & Eigenvalues"
  subtitle="The Pillars of Transformation"
  tags={['Mathematics', 'Linear Algebra', 'Data Science', 'Google PageRank']}
>

When a Matrix mathematically transforms (warps, stretches, or rotates) a space, almost every single vector in that space is knocked entirely off its original directional line. However, a select few magical vectors remain perfectly on their original geometric line. These are the **Eigenvectors**.

## 1. The Core Definition
For a given square Matrix $A$, an **Eigenvector** $v$ is a vector that, when multiplied by $A$, only changes in scale (length), not in direction.
Mathematically: $A\\vec{v} = \\lambda\\vec{v}$
The amount the vector is stretched or squished is called its **Eigenvalue** ($\\lambda$).

## 2. Why Do They Matter?
Eigenvectors mathematically reveal the fundamental axes of a system. They cut through the noise and tell you the true "skeleton" of the data.
- If you have a 3D object and you apply a matrix to spin it, the **Eigenvector** of that matrix is the physical axis of rotation (because the axis line itself doesn't change direction while everything spins around it).

## 3. Google PageRank (The $1 Trillion Eigenvector)
When Google launched in 1998, they crushed all competing search engines using an algorithm called PageRank. 
Larry Page mathematically modeled the entire World Wide Web as a massive Matrix of links (if site A links to site B, the matrix has a 1). 
To find which websites were objectively the most important, Google calculated the dominant **Eigenvector** of the entire internet matrix. The resulting Eigenvector provided a strict numerical authority score for every single web page, creating the modern search industry.

## 4. Principal Component Analysis (PCA)
In Data Science, if you have a dataset with 10,000 dimensions and want to compress it to 2 dimensions for visualization, you calculate the Eigenvectors of the data's Covariance Matrix. The eigenvectors with the largest eigenvalues represent the "Principal Components"—the mathematical directions where the data has the most meaningful variance.

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
