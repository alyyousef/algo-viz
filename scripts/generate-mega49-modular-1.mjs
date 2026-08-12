import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Bias-variance tradeoff/index.mdx': `---
title: Bias-Variance Tradeoff
description: The fundamental mathematical dilemma in Machine Learning, balancing a model's ability to learn complex patterns without memorizing random noise.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bias-Variance Tradeoff">

The **Bias-Variance Tradeoff** is the central mathematical problem in all of Machine Learning. It dictates that you cannot simultaneously minimize both the errors introduced by simplifying assumptions (Bias) and the errors introduced by hypersensitivity to training data (Variance).

## 1. High Bias (Underfitting)
**Bias** is the error introduced by approximating a real-world, highly complex problem with a mathematically simplistic model.
- If you attempt to predict complex housing prices using a simple straight line (Linear Regression), the line will mathematically fail to capture the nuances (like a sudden drop in price for ancient houses). 
- The model is **Underfitting**. It has High Bias. It performs terribly on the training data, and terribly on the test data, because it is too simple.

## 2. High Variance (Overfitting)
**Variance** is the error introduced by the model being mathematically too sensitive to the tiny fluctuations (noise) in the training data.
- If you use a massive, unconstrained Decision Tree to predict housing prices, it will mathematically draw a boundary around every single house perfectly. It will achieve 100% accuracy on the training data.
- However, it has mathematically memorized the *noise* (e.g., "A house with exactly 3 windows on a Tuesday sold for 10% less"). When you show it a new house, the model shatters. 
- The model is **Overfitting**. It has High Variance. It performs perfectly on the training data, but catastrophically on the test data.

## 3. The Mathematical Tradeoff
The Total Error of any Machine Learning model is mathematically defined as:
$Error = Bias^2 + Variance + Irreducible Error$

Data Scientists must mathematically tune the model's **Complexity**.
- As model complexity increases (adding Deep Neural Network layers), Bias drops rapidly, but Variance begins to skyrocket.
- The goal is to find the mathematical "Sweet Spot" (the minimum of the Total Error curve) where the model is complex enough to learn the true signal, but constrained enough to ignore the noise. This is usually achieved via **Regularisation**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Classification/index.mdx': `---
title: Classification
description: The supervised learning task of mathematically assigning an input data point to one of several predefined discrete categories.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Classification">

In Supervised Machine Learning, if the target variable you are trying to predict is a continuous number (e.g., Price), it is Regression. If the target variable is a discrete category (e.g., "Dog", "Cat", "Spam"), it is **Classification**.

## 1. Binary Classification
The simplest and most mathematically common form of classification, where there are exactly two possible outcomes (0 or 1).
- *Examples*: "Is this email Spam or Not Spam?", "Does this patient have Cancer or No Cancer?"
- **Mathematical Output**: The algorithm (like Logistic Regression) typically does not output a hard "1". It outputs a continuous probability between 0.0 and 1.0 (e.g., 0.85). A human-defined **Decision Threshold** (usually 0.5) is applied to mathematically snap the probability into a hard categorical prediction.

## 2. Multi-Class Classification
Classification where there are three or more possible categories, but each data point mathematically belongs to *exactly one* category.
- *Example*: An AI reading handwritten digits (MNIST). The image must be exactly one number between 0 and 9. It cannot be both a 3 and a 4.
- **Mathematical Output**: The neural network uses a **Softmax** activation function on the final layer. Softmax mathematically forces the probabilities of all 10 possible classes to sum perfectly to 1.0. The network predicts the class with the highest probability.

## 3. Multi-Label Classification
Classification where a single data point can mathematically belong to *multiple* categories simultaneously.
- *Example*: A movie genre classifier. A single movie like "The Matrix" can be classified as ["Action", "Sci-Fi", "Thriller"] simultaneously.
- **Mathematical Output**: Instead of Softmax, the network uses a **Sigmoid** activation function on every single output node independently. The probability of "Action" being 0.9 does not mathematically reduce the probability of "Sci-Fi" also being 0.9.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Clustering/index.mdx': `---
title: Clustering
description: The unsupervised learning task of mathematically grouping unlabeled data points based on their inherent geometric or statistical similarities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Clustering">

In Supervised Learning, you tell the algorithm what the answers are. In Unsupervised Learning, you provide zero labels. **Clustering** is the mathematical process of asking the algorithm to discover the hidden structure of the data entirely on its own by grouping similar points together.

## 1. The Mathematics of Similarity (Distance Metrics)
To group data, the algorithm must mathematically define "Similarity". This is usually done by calculating the spatial distance between points in a high-dimensional vector space.

- **Euclidean Distance**: The standard straight-line distance (Pythagorean theorem) between two points. Very effective for standard spatial clustering.
- **Cosine Similarity**: Mathematically measures the *angle* between two vectors, ignoring their magnitude. Heavily used in NLP clustering (grouping similar text documents), because two documents might be about "Sports", but one is 10 pages long and the other is 1 page. Euclidean distance would fail here; Cosine succeeds.

## 2. Centroid-Based Clustering (K-Means)
The most famous clustering algorithm. You mathematically specify the number of clusters ($K$). 
The algorithm places $K$ random "Centroids" in the space. It assigns every data point to the nearest centroid. It then mathematically recalculates the centroid's position to be the exact center of its newly assigned points. It repeats this loop until the centroids mathematically stop moving (Convergence). 
*Flaw*: It forces every point into a spherical cluster, and struggles heavily with strange, non-circular data shapes.

## 3. Density-Based Clustering (DBSCAN)
Unlike K-Means, DBSCAN does not require you to guess $K$. 
It mathematically defines a cluster as a continuous region of high data density, separated by regions of low density. 
It randomly picks a point and mathematically checks how many neighbors are within a tiny radius (Epsilon). If there are enough neighbors, it expands the cluster. If a point is alone in the middle of nowhere, DBSCAN mathematically ignores it, flagging it as an **Outlier**. This allows it to cluster highly complex, non-spherical shapes flawlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Cross-validation/index.mdx': `---
title: Cross-Validation
description: A rigorous mathematical resampling procedure used to evaluate machine learning models on limited data, preventing overfitting and lucky splits.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cross-Validation">

If you have 1,000 rows of data, the standard practice is to randomly split it: 80% for Training, 20% for Testing. 
However, what if you get mathematically "lucky"? What if the random split puts all the easy-to-predict rows into the 20% Test set? Your model will report 99% accuracy, you will deploy it, and it will immediately fail in production. 

**Cross-Validation (CV)** mathematically eliminates this risk.

## 1. K-Fold Cross-Validation
The absolute industry standard for model evaluation. Instead of splitting the data once, you split it $K$ times (usually $K = 5$ or $K = 10$).

If $K=5$:
1. The dataset is mathematically divided into 5 equal chunks (Folds).
2. **Iteration 1**: The model trains on Folds 1, 2, 3, 4, and tests on Fold 5. It records the accuracy.
3. **Iteration 2**: The model mathematically throws away its weights, trains from scratch on Folds 1, 2, 3, 5, and tests on Fold 4.
4. This repeats 5 times, so *every single fold* has been used as the Test set exactly once.
5. You mathematically average the 5 accuracy scores to get the true, unbiased performance of the model.

## 2. Stratified K-Fold
In Classification, standard K-Fold can mathematically destroy a model if the data is imbalanced. 
If 90% of patients are Healthy and 10% have Cancer, a random Fold 5 might accidentally contain 0 Cancer patients. The model will test flawlessly by just guessing "Healthy".

**Stratified K-Fold** mathematically forces the split. It guarantees that every single one of the 5 Folds maintains the exact 90/10 ratio of the original dataset, ensuring the mathematical integrity of the test.

## 3. Leave-One-Out Cross-Validation (LOOCV)
If your dataset is incredibly tiny (e.g., only 50 rows of a rare disease), splitting off 20% leaves you with almost no data to train on.
In LOOCV, $K$ is mathematically set to the exact number of rows in the dataset ($K=50$). 
The model trains on 49 rows and tests on 1 row. It loops 50 times. It maximizes the training data, but is computationally catastrophic for massive datasets.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Dimensionality reduction/index.mdx': `---
title: Dimensionality Reduction
description: The mathematical process of compressing a massive number of input features (dimensions) into a smaller, dense representation while preserving the critical underlying signal.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Dimensionality Reduction">

If you feed a Machine Learning model an image that is 1000x1000 pixels, that represents 1,000,000 mathematical dimensions. The algorithm will likely crash due to the **Curse of Dimensionality** (the mathematical phenomenon where the volume of the space increases so exponentially that the available data becomes uselessly sparse).

**Dimensionality Reduction** mathematically shrinks 1,000,000 dimensions down to 100 dimensions, while retaining 95% of the important information.

## 1. Feature Elimination vs Extraction
- **Elimination**: Literally deleting columns that don't matter (e.g., deleting "Hair Color" when predicting "Credit Score").
- **Extraction**: Mathematically creating entirely new, dense columns by blending the old ones. (e.g., Compressing 1,000,000 raw pixels into a 100-number vector that represents the "essence" of a face).

## 2. Principal Component Analysis (PCA)
PCA is the absolute mathematical king of linear dimensionality reduction.
It relies on linear algebra (Eigenvectors and Eigenvalues). It mathematically rotates the high-dimensional axes to find the direction that contains the absolute maximum variance (spread) in the data. This direction becomes "Principal Component 1". It then finds a second, mathematically orthogonal (90 degree) direction for PC2. 

You can drop a 1,000-column dataset down to just PC1 and PC2, which might mathematically capture 90% of all the variance in the original 1,000 columns, allowing you to easily plot it on a 2D graph.

## 3. Non-Linear Reduction (t-SNE and UMAP)
PCA is linear. If the data is twisted like a mathematical Swiss Roll, PCA will crush it and destroy the structure.

**t-SNE** (t-Distributed Stochastic Neighbor Embedding) and **UMAP** are mathematically designed for highly non-linear data. They calculate the probability that two points are neighbors in high-dimensional space, and then mathematically force them to be neighbors in a new 2D space. They are the industry standard for visualizing massive datasets (like millions of Word Embeddings) in 2D scatter plots.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Ensembles/index.mdx': `---
title: Ensembles
description: The mathematical strategy of combining multiple weak machine learning models together to create a single, highly robust, and hyper-accurate super-model.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ensembles">

"The Wisdom of the Crowd." If you ask one person to guess the weight of a cow, they will be wildly wrong. If you ask 1,000 people and mathematically average their answers, the result is astonishingly accurate.

**Ensemble Learning** is the application of this concept to Machine Learning. It mathematically combines multiple models to drastically reduce Variance and Bias.

## 1. Bagging (Bootstrap Aggregating)
Bagging mathematically reduces **Variance** (Overfitting). 
The most famous bagging algorithm is the **Random Forest**.

If you train one massive Decision Tree, it will overfit and memorize the noise.
Instead, Bagging takes the training dataset and mathematically generates 1,000 new datasets using **Bootstrapping** (sampling rows *with replacement*). It trains 1,000 separate, shallow Decision Trees independently on these 1,000 different datasets. 
When making a prediction, all 1,000 trees vote. The mathematical average of their votes is the final answer. Because they all overfit in slightly different ways, their errors mathematically cancel each other out.

## 2. Boosting
Boosting mathematically reduces **Bias** (Underfitting). 
Algorithms like **XGBoost** or **Gradient Boosting**.

Instead of training 1,000 trees independently in parallel, Boosting trains trees sequentially. 
1. Tree 1 is incredibly weak and makes terrible predictions.
2. The algorithm mathematically calculates exactly which rows Tree 1 got wrong.
3. Tree 2 is trained, but the algorithm mathematically forces Tree 2 to focus entirely on the rows that Tree 1 failed on.
4. Tree 3 focuses on Tree 2's failures.
By chaining hundreds of weak models sequentially, the ensemble mathematically forces itself to learn the most complex, difficult patterns in the data.

## 3. Stacking
Stacking is the mathematical process of combining completely different types of models (e.g., combining a Neural Network, an SVM, and a Random Forest).
You train all 3 base models to make predictions. Then, you train a *Meta-Model* (usually a Logistic Regression) that mathematically learns how to weight the predictions of the 3 base models. (e.g., "The Meta-Model learns that the Neural Network is always right about images of Cats, but the SVM is better at Dogs, so it dynamically adjusts their voting power").

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Feature engineering/index.mdx': `---
title: Feature Engineering
description: The mathematical art of transforming raw data into highly optimized input variables (features) to maximize the predictive accuracy of Machine Learning models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Feature Engineering">

"Applied machine learning is basically feature engineering." — Andrew Ng

Machine Learning algorithms are purely mathematical equations. They cannot read text, they cannot understand dates, and they struggle with raw, unscaled numbers. **Feature Engineering** is the process of mathematically transforming the raw data into a format that exposes the underlying patterns to the algorithm.

## 1. Numerical Transformations
If you have a column for "Income", ranging from $10,000 to $10,000,000, and a column for "Age", ranging from 18 to 90, algorithms (like K-Means or Neural Networks) will mathematically panic. The massive numbers in the Income column will dominate the loss function, completely ignoring Age.

- **Standardization (Z-Score)**: Mathematically scaling a column so it has a Mean of 0 and a Standard Deviation of 1.
- **Normalization (Min-Max)**: Scaling all values to explicitly fit between 0 and 1.
- **Log Transformation**: If a column is heavily right-skewed (like Income), applying a logarithmic function mathematically compresses the massive outliers, pulling the data into a beautiful bell-curve normal distribution.

## 2. Categorical Encoding
Algorithms cannot mathematically multiply the string "New York".
- **One-Hot Encoding**: Creating a new binary column for every possible category. If a row is "New York", the TICK1is_NYTICK1 column gets a 1, and the TICK1is_ChicagoTICK1 column gets a 0.
- **Target Encoding**: Replacing the string "New York" with the mathematical average of the Target Variable for all rows in New York. (Highly prone to data leakage if not done carefully).

## 3. Feature Creation (Domain Knowledge)
The most powerful mathematical gains come from creating entirely new columns based on human intuition.

- **Temporal Features**: A raw Timestamp (TICK11718293819TICK1) is useless to an algorithm. Feature engineering mathematically extracts it into multiple columns: TICK1is_weekendTICK1 (0 or 1), TICK1hour_of_dayTICK1 (0-23), and TICK1is_holidayTICK1.
- **Interaction Features**: If you are predicting house prices, you have TICK1lengthTICK1 and TICK1widthTICK1 columns. You mathematically multiply them to create a new TICK1total_areaTICK1 feature, which the algorithm will find vastly more predictive than the raw dimensions alone.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Feature selection/index.mdx': `---
title: Feature Selection
description: The mathematical process of discarding irrelevant or redundant variables from a dataset to improve model accuracy, training speed, and interpretability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Feature Selection">

If you feed a Machine Learning model 10,000 columns of data, and 9,000 of those columns are completely random noise (e.g., the user's astrological sign when predicting credit score), the model will mathematically overfit to the noise and fail. 

**Feature Selection** is the mathematical discipline of identifying and keeping only the columns that actually matter.

## 1. Filter Methods (Statistical Independence)
Filter methods do not use a Machine Learning model. They use pure mathematics to evaluate the relationship between a Feature and the Target variable independently.

- **Pearson Correlation**: Mathematically checks if a continuous feature (Age) linearly correlates with the continuous target (Income). If the correlation is 0, the feature is dropped.
- **Chi-Square Test**: Mathematically checks if a categorical feature (Gender) is statistically independent of a categorical target (Purchased_Product).
- **Variance Threshold**: Mathematically drops any column where 99% of the rows have the exact same value (e.g., a "Country" column where 99.9% of users are from the USA). It holds zero predictive variance.

## 2. Wrapper Methods (Search Algorithms)
Wrapper methods mathematically train a real Machine Learning model over and over again to test combinations of features.
- **Recursive Feature Elimination (RFE)**: You train a model (like an SVM) on all 1,000 features. You look at the mathematical weights. You delete the 1 feature with the absolute lowest weight. You then re-train the model on 999 features. You repeat this loop mathematically until you reach the desired number of optimal features. Highly accurate, but computationally catastrophic.

## 3. Embedded Methods (L1 Regularisation)
Embedded methods perform feature selection *while* the model is training.
The most famous is **L1 Regularisation (Lasso Regression)**. 

During the mathematical gradient descent optimization, the L1 penalty mathematically forces the weights of irrelevant features to become exactly, literally $0.0$. By the time the model finishes training, it has mathematically deleted the irrelevant columns internally, providing built-in feature selection without requiring an external search loop.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Hyperparameter optimisation/index.mdx': `---
title: Hyperparameter Optimisation
description: The mathematical search process required to find the absolute optimal configuration settings for a Machine Learning algorithm before training begins.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hyperparameter Optimisation">

In Machine Learning, a **Parameter** is a mathematical weight the algorithm learns internally during training (e.g., the slope of the line). 
A **Hyperparameter** is an architectural configuration that the human must set *before* training begins (e.g., the depth of a Decision Tree, or the Learning Rate of a Neural Network).

Because the human has no idea what the perfect Learning Rate is, Data Scientists must execute **Hyperparameter Optimisation**—a massive mathematical search algorithm to find the best settings.

## 1. Grid Search (The Brute Force)
The most mathematically basic search. You explicitly define a grid of values you want to test.
- Learning Rate: TICK1[0.1, 0.01, 0.001]TICK1
- Max Depth: TICK1[3, 5, 7]TICK1
- Estimators: TICK1[100, 500]TICK1

The algorithm mathematically generates every single possible combination ($3 \times 3 \times 2 = 18$ combinations). It trains 18 completely separate Machine Learning models, scores their accuracy using Cross-Validation, and returns the mathematically best combination. It guarantees finding the best configuration in your grid, but is computationally catastrophic for massive models.

## 2. Random Search
Instead of testing every combination, you provide a mathematical distribution (e.g., a uniform distribution between 0.001 and 0.1) and tell the algorithm: "Pick 50 random combinations and test them."

Mathematically, Random Search is vastly superior to Grid Search. In a Grid Search, if the "Max Depth" parameter doesn't actually affect the model, you just wasted 60% of your compute time testing useless grid intersections. Random Search explores a much wider mathematical variance in the hyperparameter space in a fraction of the compute time.

## 3. Bayesian Optimisation
Grid and Random Search are mathematically blind. When Random Search tests Model #5 and it fails, it does not use that failure to inform Model #6.

**Bayesian Optimisation** uses AI to tune the AI.
It treats the hyperparameter search as a mathematical function to be solved. It trains a surrogate probability model (usually a Gaussian Process) to predict how well a combination will perform before it actually trains the massive AI. 
If it tests a Learning Rate of 0.1 and gets 80% accuracy, and 0.05 gets 90% accuracy, the Bayesian math updates its posterior distribution and realizes: "I should mathematically concentrate my next search around 0.04", drastically reducing the total number of models that need to be trained.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Model evaluation/index.mdx': `---
title: Model Evaluation
description: The critical mathematical discipline of rigorously assessing a trained Machine Learning model to guarantee its real-world generalizability and correctness.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model Evaluation">

If a Data Scientist trains an AI, looks at the "Accuracy", and pushes it to production, the project will almost certainly fail. **Model Evaluation** is the strict mathematical discipline of verifying that a model has learned the true underlying signal, rather than memorizing the training noise (Overfitting).

## 1. The Train/Test Split Fallacy
The absolute baseline of evaluation is splitting the dataset into Training data and Testing data. 
However, this leads to a mathematical flaw: **Information Leakage**.

If you train a model, test it on the Test Set, and get 80% accuracy, you might tweak the Hyperparameters and train it again. It gets 85%. You tweak again, it gets 90%. 
By repeatedly tweaking the model based on the Test Set results, the human has mathematically leaked the Test Set knowledge into the model. The 90% is a lie.

The mathematical solution is a 3-way split: **Train, Validation, and Holdout Test**. You tune the model using the Validation set, and the final Holdout Test set is mathematically locked in a vault, executed exactly *once* at the very end of the project to provide the true unbiased metric.

## 2. Choosing the Right Metric
"Accuracy" is often a mathematically catastrophic metric.
If you are building an AI to detect a rare disease that affects 1 in 10,000 people, a broken AI that simply prints "Healthy" for every single person will mathematically achieve **99.99% Accuracy**. 

Evaluation requires choosing the mathematically correct metric for the business context:
- **Precision**: If I predict you have the disease, how mathematically certain am I? (Crucial when false positives are fatal).
- **Recall**: Out of all the people who actually have the disease, how many did the AI mathematically find? (Crucial when false negatives are fatal, e.g., missing a cancer diagnosis).

## 3. The ROC Curve and AUC
For Binary Classification, models output a probability (e.g., 0.85). 
The **ROC Curve (Receiver Operating Characteristic)** mathematically plots the model's performance across *every single possible probability threshold* (0.0 to 1.0). 
It plots the True Positive Rate against the False Positive Rate. The **AUC (Area Under the Curve)** collapses that graph into a single mathematical number from 0 to 1. An AUC of 1.0 is a mathematically perfect model; an AUC of 0.5 is a coin flip.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Model selection/index.mdx': `---
title: Model Selection
description: The strategic and mathematical process of choosing the optimal algorithmic architecture for a specific dataset and business objective.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model Selection">

There is no single "best" Machine Learning algorithm. **The No Free Lunch Theorem** mathematically proves that averaged over all possible problems, every single optimization algorithm performs exactly as well as random chance. 
Therefore, **Model Selection** is the process of matching the mathematical assumptions of a specific algorithm to the mathematical shape of a specific dataset.

## 1. The Decision Matrix

### Data Size and Shape
- **Tiny Datasets (< 10,000 rows)**: Deep Neural Networks will mathematically overfit immediately and fail. You must select algorithms that enforce strong mathematical assumptions (High Bias algorithms), like **Linear Regression** or **Naive Bayes**.
- **Massive Tabular Datasets**: The absolute undisputed king of relational CSV/SQL data is the ensemble tree family (**XGBoost, Random Forest, LightGBM**). They mathematically handle missing values, non-linear relationships, and lack of scaling flawlessly.
- **Unstructured Data (Images, Text, Audio)**: Tree algorithms completely fail to process 2D pixel arrays. You mathematically *must* select **Deep Learning (CNNs, Transformers)**.

### Interpretability vs Performance
If you are a bank denying someone a loan, it is legally required that you explain *why*.
- **White Box Models**: Linear Regression or Decision Trees. You can mathematically trace exactly why the model made a decision. (High Interpretability, Lower Performance).
- **Black Box Models**: Deep Neural Networks. It is mathematically nearly impossible to explain why the 50 billion weights resulted in a specific answer. (Low Interpretability, Highest Performance).

## 2. Empirical Selection (The Bake-Off)
Because humans cannot magically intuit the perfect model, the industry standard is to automate the selection mathematically.
Data Scientists use libraries (like Scikit-Learn or AutoML frameworks) to instantiate a "Bake-Off". 
The code mathematically loops over 10 different algorithms (SVM, KNN, Random Forest, Logistic Regression), trains them all on the exact same Cross-Validation folds, and mathematically compares their AUC or RMSE scores side-by-side to declare a winner before engaging in deep Hyperparameter Optimisation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Overfitting/index.mdx': `---
title: Overfitting
description: The catastrophic mathematical failure where a model perfectly memorizes the training data noise but utterly fails to generalize to the real world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Overfitting">

**Overfitting** is the most common and dangerous mathematical failure in all of Machine Learning. It occurs when a model is mathematically too complex for the amount of data provided. Instead of learning the underlying signal (the true trend), it mathematically memorizes the exact coordinates of every single data point, including the random noise.

## 1. The Mathematical Symptoms
You can mathematically diagnose overfitting by tracking the Loss Function (Error) during training.
- **Training Error**: Plummets to zero. The model is predicting the training data with 99.9% accuracy.
- **Validation Error**: Drops initially, but suddenly hits an inflection point and begins to rapidly *increase*. 

This divergence is the absolute mathematical signature of overfitting. The model has become so hyper-specialized to the training data that its ability to generalize to unseen data is collapsing.

## 2. Causes of Overfitting
- **Model Complexity**: Using a massive Deep Neural Network with 10 million parameters to predict a simple CSV file with 500 rows. The network has so much mathematical capacity it will just memorize the 500 rows like a lookup table.
- **Lack of Data**: If you only show the model 3 pictures of cats, and all 3 cats happen to be sitting on a red rug, the model will mathematically overfit, assuming the definition of a "Cat" requires a red rug.
- **Too Many Epochs**: Training the model for too many loops. Eventually, it extracts all the true signal and starts mathematically extracting the noise.

## 3. Mathematical Solutions (Regularisation)
To stop overfitting, Data Scientists mathematically constrain the model.
- **Early Stopping**: A script monitors the Validation Error. The exact millisecond the Validation Error stops decreasing and starts going up, the script terminates the training, mathematically freezing the weights at their optimal generalization point.
- **L1/L2 Regularisation**: Adding a mathematical penalty to the Loss Function that punishes the model for having weights that are too large, forcing the model to remain simple.
- **Dropout (Deep Learning)**: During training, randomly shutting off 50% of the neurons on every pass. This mathematically prevents the neurons from co-adapting and memorizing highly specific noise patterns.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Regression/index.mdx': `---
title: Regression
description: The supervised learning task of mathematically predicting a continuous, infinite numerical output based on input features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Regression">

In Supervised Machine Learning, if the target variable is a category ("Dog" vs "Cat"), it is Classification. If the target variable is a continuous numerical value (e.g., predicting the exact temperature tomorrow, the price of a house, or the stock market), it is mathematically defined as **Regression**.

## 1. Linear Regression
The absolute foundational algorithm of statistics and Machine Learning. 
It attempts to draw a mathematically perfect straight line through a scatter plot of data.
Equation: $y = mx + b$ (or for multiple variables, $y = w_1x_1 + w_2x_2 + b$).

### Ordinary Least Squares (OLS)
How does the algorithm mathematically find the perfect line? It uses OLS. 
It calculates the distance (the Residual) from every single data point to the line. It mathematically squares those distances (to remove negative numbers and heavily punish massive outliers), and sums them up. The algorithm adjusts the slope ($w$) until that sum is the absolute mathematical minimum.

## 2. Non-Linear Regression
Linear Regression assumes the relationship between variables is a straight line. If the data forms a U-shape (e.g., age vs healthcare costs), Linear Regression mathematically fails.

- **Polynomial Regression**: Mathematically squares or cubes the input features ($y = w_1x + w_2x^2 + b$), allowing the model to draw curves instead of straight lines.
- **Tree-Based Regression**: Algorithms like Random Forest Regressors do not draw lines at all. They mathematically split the data into discrete buckets. If you want to predict a house price, it traverses the tree (Is it > 2000 sqft? Yes. Does it have a pool? No). It reaches a leaf node containing 5 historical houses, and outputs the mathematical average price of those 5 houses.

## 3. Evaluation Metrics
You cannot use "Accuracy" to evaluate Regression. (If the house is $500,000 and the model predicts $500,001, it is technically 0% "accurate").
Instead, you mathematically measure the error distance:
- **MAE (Mean Absolute Error)**: The average dollar amount the model was off by. Highly interpretable.
- **RMSE (Root Mean Squared Error)**: Squares the errors before averaging them, mathematically punishing the model heavily for massive outliers.

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
