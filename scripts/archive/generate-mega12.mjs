import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Linear regression/index.mdx': `---
title: Linear Regression
description: The mathematical foundation of predictive modeling, Ordinary Least Squares, and gradient descent optimization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Linear Regression">

Linear Regression is the fundamental building block of all Machine Learning. It mathematically models the relationship between a scalar response (dependent variable) and one or more explanatory variables (independent variables).

## 1. The Mathematical Model
For a dataset with TICK1nTICK1 features, the hypothesis function TICK1h_θ(x)TICK1 is defined as:

**TICK1h_θ(x) = θ_0 + θ_1 x_1 + θ_2 x_2 + ... + θ_n x_nTICK1**

- TICK1x_iTICK1: The input features (e.g., square footage of a house, number of bedrooms).
- TICK1θ_iTICK1: The weights (parameters) the model learns.
- TICK1θ_0TICK1: The bias term (y-intercept).

## 2. The Cost Function (MSE)
To evaluate how wrong our model is, we define the **Mean Squared Error (MSE)** Cost Function, TICK1J(θ)TICK1:

TICK1J(θ) = (1 / 2m) * Σ (h_θ(x^(i)) - y^(i))^2TICK1

Where TICK1mTICK1 is the number of training examples. The goal of linear regression is to mathematically minimize TICK1J(θ)TICK1.

## 3. Optimization Algorithms

<ComparisonTable 
  headers={['Algorithm', 'Mechanism', 'Use Case']} 
  rows={[
    ['Ordinary Least Squares (Normal Equation)', 'Solves for θ directly using matrix inversion: θ = (X^T X)^-1 X^T y', 'Small datasets (N < 10,000) where matrix inversion is computationally fast.'],
    ['Gradient Descent', 'Iteratively updates θ by moving against the gradient of the cost function.', 'Massive datasets (N > 1,000,000) where matrix operations would crash RAM.']
  ]} 
/>

### Gradient Descent Update Rule
For each parameter TICK1θ_jTICK1, the update rule is:
TICK1θ_j := θ_j - α * (∂ / ∂θ_j) J(θ)TICK1

Where TICK1αTICK1 is the **Learning Rate**. If TICK1αTICK1 is too small, the algorithm takes years to converge. If TICK1αTICK1 is too large, it mathematically overshoots the minimum and diverges to infinity.

<Callout icon="warning" title="Assumptions of Linear Regression">
Linear regression assumes a linear relationship between features and the target. It is highly sensitive to **outliers** (because the error is squared) and suffers catastrophically from **multicollinearity** (when two input features are highly correlated).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Logistic regression/index.mdx': `---
title: Logistic Regression
description: The core statistical model for binary classification, utilizing the Sigmoid function and Cross-Entropy loss.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Logistic Regression">

Despite its name, Logistic Regression is **not** a regression algorithm; it is the fundamental algorithm for **Binary Classification**. It outputs a mathematical probability between 0 and 1.

## 1. The Sigmoid Function
If we used standard Linear Regression for classification, the output could be TICK1-5.2TICK1 or TICK142.7TICK1, which mathematically makes no sense as a probability.

To fix this, Logistic Regression wraps the linear output TICK1θ^T xTICK1 in the **Sigmoid (Logistic) Function**:

**TICK1σ(z) = 1 / (1 + e^-z)TICK1**

The Sigmoid function asymptotes at exactly 0 and 1. If TICK1σ(z) >= 0.5TICK1, we predict Class 1. If TICK1σ(z) < 0.5TICK1, we predict Class 0.

## 2. The Log Loss (Cross-Entropy) Cost Function
We cannot use Mean Squared Error (MSE) for Logistic Regression because wrapping MSE with the Sigmoid function creates a non-convex mathematical landscape filled with local minima, trapping Gradient Descent.

Instead, we use the **Binary Cross-Entropy (Log Loss)** cost function:

TICK1J(θ) = -1/m * Σ [ y^(i) * log(h_θ(x^(i))) + (1 - y^(i)) * log(1 - h_θ(x^(i))) ]TICK1

### Why this works:
- If the true label TICK1y = 1TICK1, the second half of the equation zeros out. The cost becomes TICK1-log(h_θ(x))TICK1. If our model predicts TICK10.001TICK1, TICK1-log(0.001)TICK1 approaches infinity. We massively penalize confident, wrong predictions.
- If the true label TICK1y = 0TICK1, the first half zeros out, and the inverse logic applies.

## 3. Multiclass Classification (Softmax)
To extend Logistic Regression beyond two classes (e.g., predicting whether an image is a Cat, Dog, or Bird), we mathematically generalize the Sigmoid function into the **Softmax Function**, which converts a vector of raw scores (logits) into a normalized probability distribution where all values sum to 1.

<Callout icon="tip" title="Linearly Separable Data">
Logistic Regression fundamentally draws a single straight line (or hyperplane) to separate classes. If your data is geometrically concentric (e.g., a circle of Class 1 surrounded by a ring of Class 0), Logistic Regression will completely fail without feature engineering (like polynomial features).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Decision trees/index.mdx': `---
title: Decision Trees
description: A non-parametric supervised learning method for classification and regression using Gini Impurity and Information Gain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Decision Trees">

A **Decision Tree** mathematically splits the dataset into smaller and smaller subsets based on feature thresholds, forming a tree structure of if-else rules.

## 1. How the Tree Splits
At every node, the algorithm evaluates all possible splits across all features to find the one that mathematically results in the "purest" child nodes. Purity is calculated using one of two primary metrics:

### Gini Impurity (Used by CART)
Measures the probability of incorrectly classifying a randomly chosen element if it was randomly labeled according to the distribution of labels in the node.
**TICK1Gini = 1 - Σ(p_i)^2TICK1**
A Gini score of 0 means the node is perfectly pure (contains only one class).

### Entropy & Information Gain (Used by ID3/C4.5)
Measures the mathematical chaos or unpredictability of the node.
**TICK1Entropy = -Σ p_i * log2(p_i)TICK1**
The algorithm chooses the split that mathematically maximizes **Information Gain** (the reduction in Entropy after the split).

## 2. Advantages & Disadvantages

<ComparisonTable 
  headers={['Advantages', 'Disadvantages']} 
  rows={[
    ['Highly interpretable (White-box model)', 'Massively prone to overfitting if not pruned'],
    ['Requires almost zero data preprocessing (no scaling)', 'Greedy algorithm; does not guarantee global optimum'],
    ['Can inherently handle non-linear relationships', 'Highly sensitive to small data changes (high variance)']
  ]} 
/>

## 3. Overfitting & Pruning
A Decision Tree left to its own devices will mathematically grow until every single leaf node contains exactly 1 data point (Gini = 0). This results in 100% training accuracy but catastrophic test accuracy (massive overfitting).

To prevent this, engineers apply **Regularization Hyperparameters**:
- TICK1max_depthTICK1: Limits how deep the tree can mathematically grow.
- TICK1min_samples_splitTICK1: The minimum number of samples required to allow a node to split.

<Callout icon="info" title="The Stepping Stone">
In modern Machine Learning, a single Decision Tree is almost never deployed in production because its variance is too high. Instead, they act as the mathematical building blocks for powerful ensemble models like Random Forests and XGBoost.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Random forests/index.mdx': `---
title: Random Forests
description: An ensemble learning method that mathematically crushes variance by averaging the predictions of hundreds of un-correlated decision trees.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Random Forests">

A single Decision Tree is highly sensitive to noise and prone to catastrophic overfitting (High Variance). **Random Forests** solve this mathematically by employing an ensemble technique called **Bagging (Bootstrap Aggregating)** combined with feature randomness.

## 1. The Mathematical Algorithm
Instead of training one massive tree, a Random Forest trains hundreds of deep, overfitted trees independently, and averages their results. However, if you train 100 trees on the exact same data, you get 100 identical trees. The magic lies in introducing mathematical randomness in two ways:

### A. Bootstrapping (Row Sampling)
Each of the 100 trees is trained on a *random subset* of the rows, sampled **with replacement**. Mathematically, about 63% of the original data is used for each tree, leaving 37% as Out-Of-Bag (OOB) data.

### B. Feature Randomness (Column Sampling)
At *every single node split*, the tree is not allowed to search all TICK1nTICK1 features for the best split. It is mathematically restricted to a random subset of features (typically TICK1sqrt(n)TICK1). 
This forces the forest to explore suboptimal paths, explicitly un-correlating the trees.

## 2. Why it Works (The Wisdom of Crowds)
If a single tree has a 70% chance of being correct, the probability of the majority of 100 un-correlated trees being wrong mathematically approaches zero. 
By averaging the predictions, the **Bias** remains the same as a single tree, but the **Variance** is geometrically reduced.

## 3. Out-Of-Bag (OOB) Error
Because each tree only saw ~63% of the data during training, it can instantly be tested on the remaining 37% (the OOB data). By averaging these results, a Random Forest mathematically calculates its own validation score during training, eliminating the strict need for a separate validation holdout set.

<Callout icon="tip" title="Feature Importance">
Random Forests natively calculate Feature Importance. By calculating how much the Gini Impurity decreases every time a specific feature is chosen for a split across all 100 trees, the algorithm provides a highly accurate mathematical ranking of which features are driving the predictions.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/SVM/index.mdx': `---
title: Support Vector Machines (SVM)
description: A mathematically rigorous classifier that maximizes the geometric margin between classes and utilizes the Kernel Trick for non-linear boundaries.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Support Vector Machines (SVM)">

**Support Vector Machines (SVM)** are mathematically elegant models that find the optimal hyperplane to separate classes by maximizing the geometric margin.

## 1. The Maximum Margin Hyperplane
Logistic Regression simply draws any line that separates the classes. SVM goes further: it mathematically guarantees finding the specific line that maximizes the distance (margin) to the nearest data points of both classes. 

These closest data points are called the **Support Vectors**. 
Astonishingly, once the Support Vectors are identified, every other data point in the dataset could be deleted, and the exact same boundary would mathematically remain.

## 2. The Soft Margin (C Hyperparameter)
In real-world data, classes are never perfectly linearly separable; there are outliers.
SVM introduces a slack variable (TICK1ξTICK1) and a regularization hyperparameter **C**.

- **High C**: Strict. The model heavily penalizes misclassifications, resulting in a narrow margin and a highly complex boundary (Risk of Overfitting).
- **Low C**: Soft. The model prioritizes a wider margin, gracefully ignoring extreme outliers (Risk of Underfitting).

## 3. The Kernel Trick (Non-Linear Separability)
If data is arranged in a concentric circle (e.g., Class A is an inner ring, Class B is an outer ring), no 2D line can separate them. 

SVMs utilize the **Kernel Trick**. Mathematically, they project the 2D data into a highly complex 3D or Infinite-Dimensional space where the data *does* become linearly separable by a flat 2D plane. When projected back down to 2D, the boundary appears as a complex, non-linear circle.

### Common Kernels:
- **Linear Kernel**: For data already linearly separable.
- **Polynomial Kernel**: Projects data into TICK1dTICK1-dimensional space.
- **RBF (Radial Basis Function)**: The most powerful kernel. Mathematically, it projects data into an *infinite-dimensional* space, measuring the distance from every point to every other point.

<Callout icon="warning" title="Computational Complexity">
SVMs are mathematically beautiful, but their runtime complexity is generally TICK1O(n^2)TICK1 to TICK1O(n^3)TICK1. They are phenomenally effective on small, high-dimensional datasets (like text classification), but absolutely catastrophic on datasets with millions of rows.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/K-Means/index.mdx': `---
title: K-Means Clustering
description: An unsupervised learning algorithm that partitions datasets into K distinct, non-overlapping mathematical clusters.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="K-Means Clustering">

**K-Means** is the most widely used **Unsupervised Learning** algorithm. Unlike classification, there are no labels in the dataset. The algorithm mathematically discovers hidden geometric groupings (clusters) on its own.

## 1. The Algorithm
The goal is to mathematically minimize the **Inertia** (Within-Cluster Sum of Squares) — the sum of squared distances between each point and its cluster's center (Centroid).

1. **Initialization**: Randomly drop TICK1KTICK1 centroids into the geometric space.
2. **Assignment Step**: Iterate through every data point. Mathematically calculate its Euclidean distance to all TICK1KTICK1 centroids. Assign the point to the closest centroid.
3. **Update Step**: Calculate the mathematical mean (average) of all points assigned to a specific centroid. Move the centroid to this exact new coordinate.
4. **Repeat**: Repeat steps 2 and 3 until the centroids mathematically stop moving (Convergence).

## 2. Choosing K (The Elbow Method)
The algorithm requires the engineer to define TICK1KTICK1 manually. To find the optimal TICK1KTICK1, we use the **Elbow Method**:
1. Run K-Means for TICK1K=1TICK1 through TICK1K=10TICK1.
2. Plot the resulting Inertia for each TICK1KTICK1.
3. The curve will drop rapidly and then plateau. The point where the curve violently bends (the "elbow") represents the mathematically optimal number of clusters, balancing variance reduction with simplicity.

## 3. Limitations of K-Means

<ComparisonTable 
  headers={['Limitation', 'Mathematical Reason']} 
  rows={[
    ['Assumes Spherical Clusters', 'It relies exclusively on Euclidean distance from a central point. If data is shaped like concentric rings, K-Means fails catastrophically (use DBSCAN instead).'],
    ['Requires Feature Scaling', 'If Feature A ranges from 0-1 and Feature B ranges from 0-1000, Feature B will mathematically dominate the Euclidean distance calculation. You MUST apply StandardScaler.'],
    ['Local Minima Trap', 'If the initial random centroids are poorly placed, the algorithm can get mathematically trapped in a terrible local minimum. (Solved by using the K-Means++ initialization algorithm).']
  ]} 
/>

<Callout icon="info" title="Time Complexity">
Lloyd's Algorithm (the standard K-Means implementation) runs in TICK1O(n * K * I * d)TICK1 where TICK1ITICK1 is iterations and TICK1dTICK1 is dimensions. It is extremely fast and scalable to massive datasets.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/PCA/index.mdx': `---
title: Principal Component Analysis (PCA)
description: A powerful unsupervised technique for dimensionality reduction, feature extraction, and mathematically fighting the Curse of Dimensionality.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Principal Component Analysis (PCA)">

**Principal Component Analysis (PCA)** is an unsupervised mathematical technique used for **Dimensionality Reduction**. It crushes a dataset with 1,000 features down to 10 features while retaining 95% of the original variance (information).

## 1. The Curse of Dimensionality
In Machine Learning, adding more features usually helps—until it doesn't. 
As the number of dimensions approaches the hundreds or thousands, the mathematical volume of the space explodes exponentially. Data points become so isolated that algorithms can no longer find patterns, and distance metrics (like Euclidean distance in KNN) become mathematically meaningless.

## 2. The Mathematics of PCA
PCA does not simply delete columns. It executes a strict linear transformation to project the data onto a brand new coordinate system.

1. **Standardize**: The data must be mathematically centered to have a mean of 0 and a variance of 1.
2. **Covariance Matrix**: Calculate the covariance matrix to understand how variables mathematically correlate with each other.
3. **Eigen Decomposition**: Calculate the **Eigenvectors** and **Eigenvalues** of the covariance matrix.
   - The **Eigenvectors** represent the directions (Principal Components) in the new coordinate system.
   - The **Eigenvalues** represent the magnitude of variance captured along that vector.
4. **Sort and Project**: Sort the Eigenvectors by highest Eigenvalue. The very first Eigenvector (PC1) mathematically guarantees capturing the absolute maximum possible variance of any straight line through the data. PC2 is mathematically constrained to be absolutely orthogonal (perpendicular) to PC1, capturing the next highest variance, and so on.

## 3. Real-World Applications

- **Data Compression**: Storing a 1000-dimension dataset in 50 dimensions saves massive amounts of RAM and speeds up downstream algorithms like SVMs.
- **Visualization**: Human brains cannot perceive 50-dimensional space. By mathematically crushing a complex dataset down to exactly PC1 and PC2, engineers can plot a 2D scatter graph and visually observe distinct clusters.

<Callout icon="warning" title="Loss of Interpretability">
When you apply PCA, your features are no longer "Square Footage" and "Bedrooms". PC1 might be a mathematical amalgamation of TICK10.45 * SqFt - 0.21 * Bedrooms + 0.12 * ZipCodeTICK1. The resulting model becomes a total black-box to business stakeholders.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/XGBoost/index.mdx': `---
title: XGBoost
description: Extreme Gradient Boosting. The undisputed king of tabular data, sequentially minimizing residual errors using gradient descent.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="XGBoost">

**XGBoost (Extreme Gradient Boosting)** is arguably the most successful Machine Learning algorithm of the 21st century. Before Deep Learning took over images and text, XGBoost mathematically dominated every Kaggle competition involving standard tabular data (CSVs, databases).

## 1. Boosting vs Bagging
Unlike Random Forests (Bagging) which train 100 deep trees *in parallel* independently, XGBoost (Boosting) trains shallow trees **sequentially**. 
Every new tree is mathematically obsessed with correcting the specific errors made by the *previous* tree.

## 2. The Mathematical Architecture
1. **Initial Prediction**: The algorithm starts with a naive base prediction (e.g., the mean of all targets, typically 0.5).
2. **Calculate Residuals**: It mathematically calculates the **Residuals** (the difference between the actual value and the current prediction).
3. **Train a Weak Learner**: A shallow Decision Tree (often a "stump" with depth 3-6) is trained NOT on the actual target values, but strictly to predict the mathematical *Residuals*.
4. **Update via Gradient Descent**: The new tree's predictions are multiplied by a **Learning Rate** (e.g., 0.1) and added to the cumulative model.
5. **Repeat**: The residuals get mathematically smaller and smaller. The model slowly creeps towards perfection using Gradient Descent in functional space.

## 3. Why XGBoost is "Extreme"
Standard Gradient Boosting Machines (GBMs) existed before XGBoost. Tianqi Chen mathematically revolutionized them by adding:

- **Second-Order Gradients**: While standard GBMs use the first derivative of the loss function, XGBoost mathematically calculates the second derivative (Hessian matrix), resulting in vastly superior convergence.
- **L1/L2 Regularization**: XGBoost natively penalizes complex trees directly in the mathematical objective function, dramatically preventing overfitting.
- **Hardware Optimization**: It mathematically optimizes CPU cache utilization and employs a highly optimized algorithm for finding tree splits in parallel across RAM.

<Callout icon="tip" title="Handling Missing Data">
XGBoost is mathematically brilliant at handling TICK1NaNTICK1 (null) values. During training, if a value is missing, the algorithm explicitly tests pushing it down the Left branch and the Right branch, calculating which direction mathematically minimizes the loss. It mathematically learns the optimal default path for missing data.
</Callout>

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
