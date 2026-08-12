import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/LightGBM/index.mdx': `---
title: LightGBM
description: A hyper-fast, leaf-wise gradient boosting framework developed by Microsoft that mathematically optimizes histogram-based decision trees for massive scale.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LightGBM">

**LightGBM (Light Gradient Boosting Machine)** is an incredibly popular algorithm developed by Microsoft. It is designed to solve the mathematical memory constraints and slow training times of traditional XGBoost, making it the industry standard for extreme-scale tabular datasets.

## 1. Histogram-Based Splitting
Standard Decision Trees (and older versions of XGBoost) are mathematically slow because, to find the best split (e.g., Age > 35), they must mathematically sort every single continuous value in a column. Sorting 100 million floats is an $O(N \log N)$ operation that destroys training time.

LightGBM mathematically bypasses this using **Histograms**. 
It discretizes (buckets) continuous floating-point values into discrete bins (e.g., 255 bins). 
Instead of sorting 100 million values, the algorithm mathematically iterates over the 255 bins, transforming the time complexity from $O(N \log N)$ to $O(Bins)$. This reduces memory usage drastically and speeds up training by 10x with almost zero loss in mathematical accuracy.

## 2. Leaf-Wise Growth Strategy
Most trees (like Random Forests) grow **Level-Wise**. They mathematically split all nodes at depth 1, then all nodes at depth 2, keeping the tree perfectly symmetrical.

LightGBM grows **Leaf-Wise (Best-First)**. It ignores symmetry completely. It mathematically searches all current leaf nodes, finds the single node with the absolute maximum mathematical Loss (the node with the most error), and splits only that node. This asymmetrical growth mathematically minimizes the global loss function vastly faster than level-wise growth, though it is highly prone to overfitting on small datasets if \TICK1max_depth\TICK1 is not capped.

## 3. GOSS (Gradient-based One-Side Sampling)
When training a boosting model, many data points are mathematically "easy" to predict (their gradients are near 0). Training on them again wastes compute.
**GOSS** mathematically drops the easy data points entirely during training. It keeps all instances with large gradients (hard predictions), and mathematically random-samples the small gradients, multiplying them by a constant to preserve the original data distribution. This massively accelerates the mathematics of gradient descent.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Linear regression/index.mdx': `---
title: Linear Regression
description: The absolute foundational mathematical algorithm of statistics, predicting continuous variables by drawing an optimal line of best fit through high-dimensional space.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Linear Regression">

**Linear Regression** is arguably the oldest and most fundamental mathematical algorithm in Machine Learning. It predicts a continuous target variable by assuming a strict, linear mathematical relationship between the input features and the output.

## 1. The Mathematical Equation
The model is defined by a simple linear equation:
$\hat{y} = w_1x_1 + w_2x_2 + ... + w_nx_n + b$
- $x$: The input features (Square Footage, Number of Rooms).
- $w$: The mathematical **Weights** (Coefficients / Slopes) the model must learn.
- $b$: The **Bias** (Y-Intercept).

## 2. Ordinary Least Squares (OLS)
How does the algorithm mathematically discover the perfect weights? It uses OLS.
1. The algorithm predicts a value ($\hat{y}$) and compares it to the true value ($y$). The difference is the **Residual**.
2. It mathematically calculates the **Mean Squared Error (MSE)**: The sum of the squares of all residuals. (Squaring them ensures negative and positive errors don't cancel each other out, and heavily punishes massive outliers).
3. Using Calculus (setting the derivative of the MSE to zero), or using matrix algebra, the algorithm mathematically solves for the exact weights that result in the absolute minimum possible MSE. 

*(Unlike Neural Networks which guess and check using Gradient Descent, standard Linear Regression can be solved perfectly in a single step using the **Normal Equation** matrix inversion).*

## 3. Mathematical Assumptions and Flaws
Linear Regression is highly interpretable, but mathematically fragile because it requires strict assumptions:
- **Linearity**: The relationship must actually be a straight line. If the data is U-shaped, the model fails.
- **No Multicollinearity**: The input features cannot be highly correlated with each other. If you include both "Temperature in Celsius" and "Temperature in Fahrenheit", the matrix inversion mathematically collapses (Matrix becomes Singular), and the weights explode to infinity.
- **Homoscedasticity**: The variance of the errors must be mathematically constant across all values.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Logistic regression/index.mdx': `---
title: Logistic Regression
description: The foundational binary classification algorithm that mathematically bounds linear output between 0 and 1 using the Sigmoid function to output probabilities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Logistic Regression">

Despite the word "Regression" in its name, **Logistic Regression** is strictly a **Classification** algorithm. It is the mathematical solution to the problem that standard Linear Regression cannot output bounded probabilities.

## 1. The Sigmoid Function
If you use Linear Regression to classify if an email is Spam (1) or Not Spam (0), the mathematical line of best fit will extend infinitely. For extreme emails, the algorithm might output a probability of $2.5$ or $-1.2$, which is mathematically meaningless for probability.

Logistic Regression solves this by wrapping the linear equation inside a **Sigmoid (Logistic) Function**:
$\sigma(z) = \frac{1}{1 + e^{-z}}$

The Sigmoid function mathematically forces any input value (from $-\infty$ to $\infty$) to be compressed precisely between $0.0$ and $1.0$, creating a beautiful S-curve. The output can now be mathematically interpreted as the true probability that the class is 1.

## 2. Log Loss (Cross-Entropy)
Because of the non-linear Sigmoid function, you cannot use Mean Squared Error (MSE) to train Logistic Regression; the mathematical landscape becomes non-convex (full of local minimum traps).

Instead, it uses **Log Loss (Binary Cross-Entropy)**:
$Loss = - [y \log(\hat{y}) + (1 - y) \log(1 - \hat{y})]$
This brilliant mathematical equation ensures that if the true label is 1, and the model predicts 0.001, the $\log$ function mathematically explodes to infinity, massively punishing the model for being confidently wrong, ensuring rapid convergence during Gradient Descent.

## 3. Interpretability (Log Odds)
Logistic Regression remains the absolute standard in the medical and financial industries due to its mathematical interpretability. 
The learned weights ($w$) represent the **Log-Odds**. If the weight for the "Smoking" feature is 1.5, a doctor can mathematically calculate the exact exponential increase in the probability of a patient developing cancer simply by plugging the weight into $e^{1.5}$, providing a highly robust, explainable risk metric.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Naive Bayes/index.mdx': `---
title: Naive Bayes
description: A wildly fast, probabilistic classification algorithm based on Bayes' Theorem that assumes strict mathematical independence between all features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Naive Bayes">

**Naive Bayes** is a probabilistic classifier based entirely on **Bayes' Theorem**. It is the absolute foundational algorithm for classical NLP tasks, particularly Spam Filtering and Sentiment Analysis, due to its blazing mathematical speed and ability to handle massive sparse datasets.

## 1. Bayes' Theorem
The entire algorithm is a direct application of this mathematical equation:
$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$

If we are classifying an email as Spam ($A$) given the words in the email ($B$):
- **$P(A|B)$ (Posterior)**: What is the probability this is Spam, given it contains the word "Viagra"?
- **$P(B|A)$ (Likelihood)**: If we look at all historical Spam emails, how often does the word "Viagra" appear?
- **$P(A)$ (Prior)**: Overall, what percentage of *all* emails are Spam?

The algorithm mathematically calculates this probability for both Spam and Not Spam, and assigns the data point to the class with the highest probability.

## 2. Why is it "Naive"?
To calculate the exact probability of an email containing the words "Buy", "Cheap", and "Viagra", the algorithm would mathematically require thousands of historical emails containing that *exact combination* of words. This is computationally impossible (Data Sparsity).

The algorithm solves this by making a mathematically "Naive" assumption: **Conditional Independence**. 
It assumes that the probability of seeing the word "Cheap" is mathematically completely independent of seeing the word "Viagra". It simply multiplies the individual probabilities together: $P(Buy) \times P(Cheap) \times P(Viagra)$. 
While this assumption is mathematically false in human language, the algorithm works surprisingly flawlessly in practice.

## 3. Laplace Smoothing
There is one fatal mathematical flaw in the Naive assumption. If a new email contains a word the algorithm has *never* seen before, the probability $P(Word|Spam)$ is exactly $0$. 
Because the algorithm multiplies all probabilities together, a single $0$ mathematically destroys the entire equation, forcing the total probability to $0.0$.
**Laplace Smoothing** mathematically fixes this by adding a tiny baseline value (e.g., $+1$) to all word counts, guaranteeing that no probability ever mathematically reaches exactly zero.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/PCA/index.mdx': `---
title: Principal Component Analysis (PCA)
description: The industry standard for linear dimensionality reduction, mathematically transforming highly correlated data into independent orthogonal components.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Principal Component Analysis (PCA)">

**PCA** is not a prediction algorithm; it is a mathematical transformation. It is the absolute king of Dimensionality Reduction, allowing Data Scientists to compress 1,000 highly correlated columns down to 10 independent columns while retaining 95% of the statistical variance.

## 1. The Mathematical Objective (Variance)
PCA operates on the mathematical premise that **Variance is Information**. If a column has zero variance (all values are identical), it contains zero information. 
PCA attempts to mathematically rotate the high-dimensional axes of the data to find the exact angle that captures the maximum possible variance (spread) of the data points.

## 2. Eigenvectors and Eigenvalues
The math of PCA is pure Linear Algebra:
1. **Covariance Matrix**: PCA mathematically calculates the covariance (correlation) between every single column.
2. **Eigen Decomposition**: It calculates the **Eigenvectors** (the mathematical direction) and **Eigenvalues** (the magnitude of variance) of the Covariance Matrix.
3. **Principal Components**: The Eigenvector with the absolute highest Eigenvalue is **Principal Component 1 (PC1)**. It is a new, synthetic mathematical axis that points directly through the longest spread of the data.
4. **Orthogonality**: PC2 is mathematically forced to be completely orthogonal (90 degrees perpendicular) to PC1, capturing the second most amount of variance. This guarantees that PC1 and PC2 have exactly $0.0$ correlation.

## 3. The Power of Compression
If you have an image dataset of faces with 10,000 pixels (dimensions), adjacent pixels are highly correlated. 
By running PCA, you can mathematically project those 10,000 pixels onto the top 150 Principal Components (Eigenfaces). You have mathematically compressed the dataset size by 98%, removing the curse of dimensionality and allowing algorithms like SVM or KNN to train 100x faster, while still retaining enough mathematical variance to easily distinguish between different human faces.

*Flaw*: PCA is strictly a linear mathematical rotation. If the data is curled in a non-linear shape (like a Swiss Roll), PCA will crush the data and destroy the topology.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Random forests/index.mdx': `---
title: Random Forests
description: The ultimate, hyper-robust ensemble algorithm that mathematically combines hundreds of independent Decision Trees to eliminate overfitting and capture extreme non-linearities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Random Forests">

An individual Decision Tree is mathematically brittle and heavily prone to overfitting. **Random Forests** solve this by generating an ensemble (a "forest") of hundreds of trees, forcing them to be mathematically uncorrelated, and averaging their predictions.

## 1. The Power of Bagging (Bootstrapping)
If you train 100 trees on the exact same dataset, you just get 100 identical trees. 
Random Forest relies on **Bagging (Bootstrap Aggregating)**. 

To train Tree 1, the algorithm mathematically generates a new dataset by randomly sampling rows from the original data *with replacement*. (This means some rows are duplicated, and ~37% of rows are left out completely). Tree 1 is trained on this unique subset. Tree 2 is trained on a completely different random subset. This mathematical variance ensures the trees all learn slightly different interpretations of the data.

## 2. The Brilliant "Random" Feature Split
Bagging is not enough. If there is one extremely dominant feature (e.g., "Credit Score"), all 100 trees will mathematically use "Credit Score" as their very first root split, making them highly correlated.

Random Forests introduce a second layer of randomness. When a tree is trying to find the best mathematical split at a node, **it is not allowed to look at all the features**. It is only mathematically permitted to select from a tiny, random subset of features (usually $\sqrt{\text{Total Features}}$). 
By artificially blinding the trees, it forces them to discover subtle mathematical patterns hidden in the weaker features.

## 3. The Ensemble Vote and OOB Error
Once trained, a new data point is passed through all 100 trees. 
- For Classification, the trees mathematically vote (Majority Wins).
- For Regression, the outputs are mathematically averaged.
Because the trees are uncorrelated, their individual overfitting noise mathematically cancels out in the average, leaving only the true signal.

Additionally, because every tree left out ~37% of the data during Bootstrapping (the "Out-of-Bag" data), the Random Forest can mathematically test itself *during training* without requiring a separate Validation set, calculating the highly accurate **OOB Error**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Ridge regression/index.mdx': `---
title: Ridge Regression (L2)
description: A regularized version of Linear Regression that mathematically utilizes a squared penalty to smoothly shrink coefficients and handle highly correlated features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ridge Regression (L2)">

**Ridge Regression** is standard Linear Regression with a critical mathematical safety net installed: **L2 Regularisation**. It is the absolute standard solution when dealing with Multicollinearity (highly correlated input variables) or datasets that threaten to mathematically overfit.

## 1. The Mathematical Objective (L2 Penalty)
Standard Linear Regression simply minimizes the Mean Squared Error (MSE). Ridge modifies this objective function:
$Loss = MSE + \lambda \sum w_i^2$

- **$\lambda$ (Alpha)**: The hyperparameter controlling the regularisation. If $\lambda = 0$, you just have standard Linear Regression.
- **$w_i^2$**: The penalty is the mathematical *square* of the weights.

## 2. The Geometry of the Penalty (Smooth Shrinkage)
Unlike Lasso (L1) which forces weights to exactly zero, Ridge (L2) shrinks them smoothly, but they never reach exactly 0.0.

Because the penalty is squared, large mathematical weights are punished exponentially. 
- A weight of $10$ adds $100$ to the Loss function. 
- A weight of $0.1$ adds only $0.01$ to the Loss function.
The Gradient Descent optimizer is mathematically terrified of large numbers, so it crushes all the weights down. However, as the weight gets closer to zero, the penalty gets infinitesimally small, so the optimizer loses the mathematical incentive to force it all the way to absolute zero. 

## 3. Solving Multicollinearity
If a dataset contains "Square Footage" and "Square Meters", they are mathematically 100% correlated. 
Standard Linear Regression matrices become singular (non-invertible) and explode. 
Lasso (L1) will randomly delete one and keep the other. 

Ridge (L2) handles this beautifully. The math dictates that minimizing $(w_1^2 + w_2^2)$ is achieved when $w_1$ and $w_2$ are exactly equal. Therefore, Ridge mathematically keeps *both* features, distributing the weight equally between them and shrinking them in tandem, making the model incredibly mathematically stable and robust against correlated noise.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/SVM/index.mdx': `---
title: Support Vector Machines (SVM)
description: A mathematically rigorous algorithm that draws hyperplanes to perfectly separate data classes, using the Kernel Trick to conquer complex non-linear geometry.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Support Vector Machines (SVM)">

Before Deep Learning dominated the 2010s, **Support Vector Machines (SVM)** were the undisputed kings of Machine Learning. They are founded on brilliant, rigid mathematical geometry rather than the messy probabilistic approximations of early Neural Networks.

## 1. The Mathematical Margin (The Street)
If you plot Red dots and Blue dots on a 2D graph, you can draw infinite straight lines between them to classify them. 
Logistic Regression just draws a line that "works". 
SVM mathematically guarantees finding the **Optimal Hyperplane**. It finds the one specific line that maximizes the geometric distance (the Margin) between the line and the closest Red/Blue dots. 

The closest data points that perfectly touch the edge of the Margin are called the **Support Vectors**. The mathematical brilliance of SVM is that the entire model is defined *exclusively* by these few Support Vectors. If you delete 99% of the other data points behind the margin, the mathematical equation of the SVM does not change at all.

## 2. The Kernel Trick (Non-Linearity)
If the Blue dots are in a dense circle, completely surrounded by a ring of Red dots, it is mathematically impossible to draw a straight line (Hyperplane) to separate them. 

SVM solves this using the **Kernel Trick**. 
Instead of trying to draw a curved line in 2D space, a Kernel (like the Radial Basis Function - RBF) mathematically calculates the distance of the points and projects the entire 2D dataset into 3D space (adding a Z-axis, like a gravity well). 
In the 3D space, the Blue circle mathematically drops down, and the Red ring stays high. The SVM can now effortlessly draw a perfectly flat, straight 2D plane through the 3D space, separating the colors flawlessly. When you project that flat plane back down to 2D, it mathematically forms a perfect circle.

## 3. The Hinge Loss
SVMs do not use Mean Squared Error or Log Loss. They use **Hinge Loss**. 
Hinge Loss mathematically states: "If a data point is correctly classified *and* is safely outside the Margin, the loss is exactly $0.0$." 
It only mathematically punishes points that violate the Margin or cross the Hyperplane, ensuring the optimizer focuses entirely on the hardest, most ambiguous edge-cases.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/UMAP/index.mdx': `---
title: UMAP (Uniform Manifold Approximation)
description: The modern state-of-the-art non-linear dimensionality reduction algorithm that mathematically preserves both local and global data topology vastly better than t-SNE.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="UMAP (Uniform Manifold Approximation and Projection)">

While PCA is fantastic for linear compression, visualizing massive, non-linear text or image embeddings requires topology. For years, t-SNE was the standard, but it was notoriously slow and destroyed global structure. **UMAP** has entirely replaced t-SNE. Based heavily on algebraic topology, it mathematically guarantees a vastly superior compression of space.

## 1. The Mathematical Foundation (Riemannian Geometry)
UMAP assumes that the dataset is mathematically distributed uniformly, but on a complex, twisted, high-dimensional **Manifold** (like a wrinkled sheet of paper). 
Because the real data is not uniform, UMAP mathematically defines a custom Riemannian geometry for every single point, distorting the concept of "distance" so that the data appears uniform. 

It constructs a **Fuzzy Simplicial Complex** (a complex mathematical web connecting the points). In this web, local neighbors are connected by thick, high-probability edges, while distant points have thin, low-probability edges.

## 2. The Low-Dimensional Projection
Once the high-dimensional mathematical web is built, UMAP initializes a random 2D scatter plot. 
It builds a second fuzzy mathematical web in the 2D space. 
It then uses **Cross-Entropy Optimization (Stochastic Gradient Descent)** to forcefully push and pull the 2D points until the 2D web mathematically perfectly matches the complex high-dimensional web. 

## 3. UMAP vs t-SNE
- **Speed**: t-SNE requires calculating dense probabilities, making it $O(N^2)$ and mathematically catastrophic for datasets > 100k rows. UMAP uses mathematical graph theory approximations, running vastly faster.
- **Global Structure**: t-SNE mathematically prioritizes *local* structure. It clusters similar points beautifully, but the distance between two clusters on a t-SNE plot is mathematically meaningless. UMAP preserves *global* topology. If Cluster A is closer to Cluster B than Cluster C on a UMAP plot, it mathematically means they are genuinely closer in the massive 1000-dimensional raw data. This makes UMAP a vastly superior tool for real scientific analysis.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/XGBoost/index.mdx': `---
title: XGBoost
description: The Extreme Gradient Boosting framework that revolutionized Machine Learning with unparalleled algorithmic speed and brutal mathematical penalization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="XGBoost (Extreme Gradient Boosting)">

For nearly a decade, **XGBoost** was the undisputed king of Kaggle and tabular Data Science. It took the theoretical concept of Gradient Boosting and mathematically engineered it into an absolute hyper-optimized weapon, capable of dominating almost any relational dataset.

## 1. 2nd-Order Taylor Approximation (The Newton Step)
Standard Gradient Boosting uses standard Gradient Descent (calculating the First Derivative of the Loss Function) to figure out how to update the trees. 

XGBoost's mathematical breakthrough was utilizing a **2nd-Order Taylor Approximation**. It calculates both the First Derivative (Gradient) *and* the Second Derivative (Hessian - the mathematical curvature of the loss surface). 
By understanding the curvature, XGBoost doesn't just know *which direction* to step, it mathematically calculates the exact *size* of the step to perfectly hit the minimum (a Newton-Raphson step). This allows XGBoost to mathematically converge vastly faster than standard boosting algorithms.

## 2. Brutal Mathematical Regularisation
Decision Trees love to overfit. XGBoost introduces explicit Regularisation parameters directly into the objective function of the tree structure itself.
- **L1 (Alpha) and L2 (Lambda)**: It applies these penalties not just to regression weights, but to the actual leaf node output values of the trees.
- **Gamma ($\gamma$)**: A strict mathematical threshold. XGBoost calculates the exact Gain of a proposed split. If the Gain is not mathematically greater than $\gamma$, the split is brutally denied, heavily pruning the tree during growth and preventing noise memorization.

## 3. Systems Engineering (Sparsity and Cache)
XGBoost is not just mathematically brilliant; it is a masterpiece of software engineering.
- **Sparsity-Aware**: If a dataset has massive amounts of missing values (Nulls), XGBoost doesn't require imputation. It mathematically learns a "Default Direction" during training. When it encounters a Null, it routes it down the optimal path automatically.
- **Cache-Aware Access**: It pre-fetches the mathematical gradients and hessians into CPU cache, ensuring the processor doesn't stall while building the histograms for tree splitting.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/t-SNE/index.mdx': `---
title: t-SNE
description: A groundbreaking, highly non-linear dimensionality reduction algorithm mathematically famous for unspooling complex data into beautiful, clustered 2D visualizations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="t-SNE (t-Distributed Stochastic Neighbor Embedding)">

Before UMAP, **t-SNE** was the absolute standard for visualizing high-dimensional embeddings (like Deep Learning activations or Word2Vec vectors). While PCA crushes non-linear data into useless overlapping blobs, t-SNE mathematically unspools complex manifolds into stunning, distinct 2D clusters.

## 1. Stochastic Neighbor Embedding (The Probabilities)
PCA focuses on preserving mathematical Variance. t-SNE focuses on preserving mathematical **Neighborhoods**.
1. In the high-dimensional space (1,000 dimensions), t-SNE centers a Gaussian (Normal) distribution over a data point. 
2. It mathematically calculates the probability that Point A would pick Point B as its neighbor. (Close points have incredibly high probabilities; distant points have near-zero probabilities).
3. It repeats this, building a massive $N \times N$ probability matrix representing the "local neighborhoods" of every single point.

## 2. The Student's t-Distribution (The Crowding Problem)
When projecting 1,000 dimensions down to 2 dimensions, you mathematically run out of physical space. In 1000D space, a point can have 500 neighbors that are all exactly equidistant from it. In 2D space, you can only fit ~6 points equidistantly around a center. 
If you try to map the high-dimensional Gaussian probabilities directly to 2D, the points will crush into a single black dot in the center of the graph (The Crowding Problem).

t-SNE's mathematical genius is replacing the Gaussian distribution in the 2D space with a **Student's t-Distribution**. The t-distribution has "heavy tails". 
This mathematical trick dictates that for two points to have the exact same low probability in 2D space as they did in high-D space, they must be pushed *much farther apart* in 2D space. This mathematically forces the different clusters to repel each other, exploding the data into beautifully separated visual islands.

## 3. Kullback-Leibler (KL) Divergence
To align the 2D map with the high-D map, t-SNE uses Gradient Descent to mathematically minimize the **KL Divergence** between the two probability matrices. 
*Fatal Flaw*: The KL Divergence math heavily punishes placing local neighbors far apart, but it does *not* mathematically punish placing distant clusters close together. Therefore, the distance between the red cluster and the blue cluster on a t-SNE plot is mathematically meaningless.

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
