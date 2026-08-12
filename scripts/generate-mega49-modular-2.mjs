import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Regularisation/index.mdx': `---
title: Regularisation (L1/L2)
description: The mathematical technique of modifying the Loss Function to penalize excessive model complexity, strictly preventing overfitting.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Regularisation (L1/L2)">

Left to its own devices, a complex Machine Learning model will mathematically memorize the training data. The weights (slopes) in its mathematical equation will explode in magnitude (e.g., $y = 50,000x_1 - 49,999x_2$). This makes the model hyper-sensitive to noise. 

**Regularisation** prevents this by mathematically punishing the model for having large weights.

## 1. L2 Regularisation (Ridge)
L2 Regularisation adds a penalty term to the Loss Function equal to the **mathematical square of the magnitude of the coefficients**.

- **Formula**: $Loss = MSE + \lambda \sum w_i^2$
- **Mathematical Effect**: Because the weights are squared, a weight of 10 results in a massive penalty of 100. To minimize the Loss Function, Gradient Descent is mathematically forced to shrink all the weights down so they are very close to zero.
- **Result**: The weights never reach exactly zero. All features are kept, but their mathematical influence is smoothed out, preventing any single feature from dominating the model and preventing overfitting.

## 2. L1 Regularisation (Lasso)
L1 Regularisation adds a penalty term equal to the **mathematical absolute value of the magnitude of the coefficients**.

- **Formula**: $Loss = MSE + \lambda \sum |w_i|$
- **Mathematical Effect**: Because it uses the absolute value, the derivative of the penalty is constant. This causes a fascinating mathematical phenomenon: Gradient Descent will force the weights of irrelevant features to become **exactly 0.0**.
- **Result**: L1 performs automatic **Feature Selection**. If you feed it 10,000 columns, it might output a model where 9,900 of the weights are exactly zero, leaving you with a highly interpretable model using only the 100 most important columns.

## 3. Elastic Net
Elastic Net mathematically combines L1 and L2 regularisation into a single Loss Function.
- **Formula**: $Loss = MSE + \lambda_1 \sum |w_i| + \lambda_2 \sum w_i^2$
- **Mathematical Effect**: It gives you the best of both worlds. It drops completely useless features to exactly 0 (like L1), but if two features are highly correlated (like "Square Footage" and "Number of Rooms"), L1 would randomly drop one of them. Elastic Net (via the L2 penalty) mathematically keeps both, shrinking their weights together.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Self-supervised learning/index.mdx': `---
title: Self-Supervised Learning
description: A groundbreaking paradigm where models mathematically generate their own labels from the raw structure of the data, unlocking massive scale.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Self-Supervised Learning">

Historically, Deep Learning required **Supervised Learning** (humans manually labeling millions of images). This caused a massive mathematical bottleneck: there is infinite data on the internet, but not enough humans to label it.

**Self-Supervised Learning (SSL)** mathematically solved this. The algorithm creates its own labels by destroying parts of the input data and mathematically training itself to reconstruct the missing pieces.

## 1. SSL in NLP (Masked Language Modeling)
This mathematical breakthrough is responsible for the entire modern LLM revolution (BERT, GPT).
You take a sentence from Wikipedia: *"The capital of France is Paris."*
You mathematically mask (hide) a word: *"The capital of France is [MASK]."*

You feed this broken sentence to the Neural Network. The network mathematically predicts what word belongs in the [MASK]. It then checks the original sentence to see if it was right. 
Because the algorithm generates its own labels, you can download the entire internet, mask billions of words, and train a model with zero human intervention.

## 2. SSL in Computer Vision (Contrastive Learning)
You cannot easily "mask" pixels in an image to teach semantic meaning. Instead, Vision SSL uses **Contrastive Learning**.

You take an unlabelled image of a Dog. You mathematically apply two random augmentations to it (e.g., crop one version, turn the other version black and white). 
You feed both images into the Neural Network. The network mathematically calculates the vector embeddings for both images. 
The Loss Function mathematically forces the network to pull the two vectors together (because they came from the same image), whilst simultaneously pushing the vectors away from all other images in the batch. The network mathematically learns the concept of a "Dog" without ever seeing a human label.

## 3. The Future of AI Scale
Self-Supervised Learning is the engine of "Foundation Models". By training mathematically on raw, unlabelled data at a planetary scale, the models learn the fundamental physics of reality or the grammar of language. Once trained, they only require a tiny fraction of human-labeled data (Fine-Tuning) to adapt to specific tasks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Semi-supervised learning/index.mdx': `---
title: Semi-Supervised Learning
description: A mathematical approach that bridges supervised and unsupervised learning, leveraging a tiny amount of labeled data and a massive amount of unlabeled data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semi-Supervised Learning">

In many enterprise scenarios, acquiring unlabelled data is cheap (e.g., downloading 10 million medical X-rays), but acquiring labels is mathematically expensive (e.g., paying a doctor $500/hour to classify those X-rays as Cancer/No-Cancer).

**Semi-Supervised Learning** uses a tiny labeled dataset (1,000 X-rays) to mathematically bootstrap learning across the massive unlabelled dataset (9,999,000 X-rays).

## 1. Pseudo-Labeling
The most common mathematical approach.
1. You train a standard Supervised Learning model on the 1,000 labeled X-rays.
2. You use that trained model to mathematically predict the labels for the 9.9 million unlabelled X-rays.
3. You filter the results, keeping only the predictions where the model was mathematically incredibly confident (e.g., Probability > 99%). These are called **Pseudo-Labels**.
4. You merge the Pseudo-Labels with the true labels, and retrain the model from scratch on the massive new dataset.

## 2. Graph-Based Label Propagation
Instead of training a neural network, this uses pure mathematical geometry.
You mathematically plot all 10 million data points (labeled and unlabeled) in a high-dimensional space based on their features (using K-Nearest Neighbors). 
You mathematically "inject" the labels into the 1,000 labeled nodes. The algorithm then mathematically diffuses (propagates) those labels through the graph. If an unlabelled point is mathematically surrounded by 5 points labeled "Cancer", the algorithm assumes that point is also "Cancer".

## 3. Mathematical Assumptions
Semi-Supervised Learning relies heavily on the **Cluster Assumption**: the mathematical belief that if two points are in the same local cluster (high density region), they likely share the same label. If the unlabelled data is mathematically uniformly distributed (no distinct clusters), Semi-Supervised Learning will fail catastrophically and actually degrade the model's performance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Supervised learning/index.mdx': `---
title: Supervised Learning
description: The dominant mathematical paradigm of Machine Learning where algorithms map inputs to outputs by learning from explicitly labeled training data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Supervised Learning">

**Supervised Learning** is the workhorse of the modern AI industry. It is the mathematical process of deriving a function that maps an input to an output based on example input-output pairs. 

In this paradigm, a human acts as the "Supervisor", providing the algorithm with the exact correct mathematical answers during training.

## 1. The Mathematical Objective
You are given a dataset $D$ consisting of $N$ pairs of inputs ($X$) and targets ($Y$).
$D = \\{(x_1, y_1), (x_2, y_2), ..., (x_N, y_N)\\}$

The goal is to mathematically learn a function $f(X) \approx Y$.
During training, the algorithm predicts a value $\hat{y}$. The **Loss Function** mathematically measures the distance between the prediction $\hat{y}$ and the true label provided by the human supervisor $y$. Optimization algorithms (like Gradient Descent) adjust the function $f$ until the Loss is mathematically minimized.

## 2. Classification vs Regression
Supervised Learning is split into two massive sub-branches depending on the mathematical shape of the target variable $Y$.
- **Regression**: The target $Y$ is a continuous, infinite number (e.g., Predicting the price of a house: $543,211). Algorithms: Linear Regression, XGBoost Regressor.
- **Classification**: The target $Y$ is a discrete category (e.g., Predicting if a transaction is Fraud or Not Fraud). Algorithms: Logistic Regression, Random Forest Classifier, Support Vector Machines.

## 3. The Data Bottleneck
Because Supervised Learning relies entirely on the mathematical ground truth ($Y$), it is severely bottlenecked by human labor. 
To train an autonomous vehicle using pure Supervised Learning, humans must manually draw strict mathematical bounding boxes around every single pedestrian, stop sign, and vehicle across 10 million video frames. This economic constraint led to the rise of Self-Supervised and Reinforcement Learning.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Train-test-validation split/index.mdx': `---
title: Train-Test-Validation Split
description: The foundational mathematical procedure of partitioning data to guarantee that a Machine Learning model generalizes to unseen real-world scenarios.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Train-Test-Validation Split">

If you train a model on a dataset and then test its accuracy on that *exact same dataset*, it will mathematically achieve 100% accuracy because it simply memorized the answers. 

To scientifically prove a model has learned the true mathematical signal, it must be evaluated on data it has never seen before. This requires splitting the data.

## 1. The Training Set (Typically 70-80%)
This is the data fed into the mathematical optimization engine (Gradient Descent). The model mathematically adjusts its internal weights and biases specifically to minimize the error on this dataset. It represents the model's "Textbook".

## 2. The Validation Set (Typically 10-15%)
Once the model is trained, you need to tune its **Hyperparameters** (e.g., How deep should the Decision Tree be?). 
You evaluate the model on the Validation set. If the Validation error is high, you change the Hyperparameters and train again. 
*Crucial Mathematical Flaw*: Because the human is repeatedly tweaking the model to get a higher score on the Validation set, information from the Validation set mathematically "leaks" into the model. The model is indirectly overfitting to the Validation set.

## 3. The Holdout Test Set (Typically 10-15%)
Because the Validation set is mathematically compromised by human tweaking, you must have a final, uncompromised **Test Set**.
The Test Set is mathematically locked in a vault. It is never used for training. It is never used for hyperparameter tuning. It is evaluated exactly **once** at the very end of the project. The score generated by the Test Set is the final, mathematically true accuracy of the model that will be reported to stakeholders.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Underfitting/index.mdx': `---
title: Underfitting
description: The mathematical failure state where a Machine Learning model is too simplistic to capture the underlying patterns in the training data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Underfitting">

While Overfitting is the model memorizing the noise, **Underfitting (High Bias)** occurs when the mathematical architecture of the model is simply not powerful enough to capture the true underlying signal of the data. 

## 1. The Mathematical Symptoms
You can mathematically diagnose underfitting by tracking the Loss Function (Error) during training.
- **Training Error**: Remains stubbornly high. No matter how long you train, the model cannot mathematically reduce the error.
- **Validation Error**: Also remains high, closely matching the Training Error.

The model is failing to learn. If you try to predict housing prices using only a single feature ("Number of Windows"), the model will underfit. The mathematical reality is that housing prices are highly complex, and a single variable is mathematically insufficient to capture that variance.

## 2. Causes of Underfitting
- **Model is Too Simple**: Using a strict Linear Regression model (which can only draw straight lines) on data that is mathematically shaped like a sine wave. The straight line will fail catastrophically.
- **Excessive Regularisation**: If you set the L1/L2 penalty ($\lambda$) too high, you are mathematically suffocating the model. The optimizer is so terrified of the penalty that it forces all weights to 0.0, rendering the model useless.
- **Too Few Epochs**: You terminated the mathematical training loop (Gradient Descent) before it had time to converge on the optimal weights.

## 3. Mathematical Solutions
Fixing underfitting is straightforward: give the model more mathematical power.
- **Increase Complexity**: Switch from a Linear model to a Non-Linear model (like a Random Forest or Deep Neural Network).
- **Feature Engineering**: Mathematically combine features (e.g., $x_1 \times x_2$) to expose more complex patterns to the algorithm.
- **Reduce Regularisation**: Mathematically lower the penalty terms, allowing the model weights to grow and capture more variance.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Unsupervised learning/index.mdx': `---
title: Unsupervised Learning
description: A paradigm where algorithms mathematically deduce hidden structures, patterns, and anomalies in massive datasets without any human-provided labels.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Unsupervised Learning">

In **Unsupervised Learning**, the dataset consists entirely of inputs ($X$). There are mathematically zero target outputs ($Y$) or labels provided by humans. The algorithm is left entirely alone to mathematically discover the hidden structure of the data.

## 1. Clustering
The most prominent mathematical task in Unsupervised Learning.
You feed the algorithm a database of 1 million customer purchasing records. You do not tell the algorithm anything about the customers. 
The algorithm (e.g., K-Means) mathematically calculates the high-dimensional distance between all users. It discovers that the users mathematically cluster into three distinct groups. A human later analyzes the clusters and realizes the algorithm successfully grouped "Budget Shoppers", "Luxury Shoppers", and "Bulk Buyers" entirely on its own.

## 2. Dimensionality Reduction
Massive datasets suffer from the Curse of Dimensionality. Unsupervised algorithms (like PCA or t-SNE) mathematically compress 1,000 features down to 3 features by finding the mathematical directions of maximum variance. This allows humans to visualize massive datasets in 3D space, instantly revealing hidden separations between data points that were invisible in the raw 1,000-dimensional matrix.

## 3. Anomaly Detection
Unsupervised learning is the absolute mathematical core of cybersecurity and fraud detection.
Because fraudulent transactions are incredibly rare, there are often no labeled examples to train a Supervised model on.
Instead, an Unsupervised algorithm (like Isolation Forests) mathematically models the "normal" behavior of a credit card based on millions of transactions. If a new transaction mathematically falls severely outside that normal distribution, the algorithm instantly flags it as an **Anomaly**, even though it was never explicitly taught what fraud looks like.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.1 Core Concepts/Weakly-supervised learning/index.mdx': `---
title: Weakly-Supervised Learning
description: A pragmatic mathematical approach that trains models using noisy, limited, or imprecise labels when perfect ground-truth labels are too expensive to acquire.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Weakly-Supervised Learning">

Acquiring perfectly accurate mathematical labels for a dataset is often economically impossible. **Weakly-Supervised Learning** accepts this reality. It mathematically trains a model using massive amounts of "weak" labels—labels that are noisy, imprecise, or generated by crude heuristics.

## 1. Inexact Supervision (Multiple Instance Learning)
The mathematical label is provided at a high level, rather than a granular level.
- *Example*: You want to train an AI to find cancer cells in a massive Gigapixel biopsy image.
- A doctor provides a **Weak Label**: They label the *entire* Gigapixel image as "Cancer". They do not draw a bounding box around the specific microscopic cancer cell. 
- The algorithm uses **Multiple Instance Learning (MIL)**. It mathematically breaks the massive image into 10,000 tiny tiles. It knows that if the overall image is "Cancer", at least *one* of the 10,000 tiles must contain cancer, but it doesn't know which one. Through iterative mathematical optimization, it eventually pinpoints the exact tile.

## 2. Inaccurate Supervision (Noisy Labels)
The mathematical labels are cheap, fast, and often just wrong.
- *Example*: Scraping 1 million images from Instagram using hashtags. If an image is tagged #Dog, you label it "Dog". However, humans often use incorrect hashtags, meaning 10% of your labels are mathematically false.
- Algorithms are trained using specialized Loss Functions (like Label Smoothing or Co-Teaching) that are mathematically designed to be highly robust against noise, preventing the model from updating its weights when it encounters a blatantly wrong label.

## 3. Programmatic Labeling (Snorkel)
Developed at Stanford, Snorkel is a famous framework for Weak Supervision.
Instead of humans labeling data, humans write dozens of crude Python scripts (Heuristics). 
- *Script 1*: IF email contains "Buy Now" THEN Spam.
- *Script 2*: IF email length < 10 THEN Spam.
These scripts are highly inaccurate and often conflict. Snorkel mathematically models the statistical accuracy and correlation of these messy scripts, combining them to generate probabilistically accurate Weak Labels for millions of rows in seconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Autoencoders for anomaly detection/index.mdx': `---
title: Autoencoders (Anomaly Detection)
description: Utilizing unsupervised Deep Learning bottleneck architectures to mathematically model normal data and detect highly complex, non-linear anomalies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Autoencoders (Anomaly Detection)">

An **Autoencoder** is a brilliant, unsupervised Deep Learning architecture designed to output exactly what was inputted. By forcing the data through a mathematical bottleneck, it becomes the ultimate tool for detecting anomalies in highly complex data like images or server logs.

## 1. The Mathematical Bottleneck Architecture
An Autoencoder consists of two neural networks stitched together:
1. **The Encoder**: Takes a high-dimensional input (e.g., a 1000-pixel image of a normal server log) and mathematically compresses it into a tiny latent vector (e.g., 10 numbers). This is the **Bottleneck**.
2. **The Decoder**: Takes those 10 numbers and mathematically attempts to reconstruct the original 1000-pixel image flawlessly.

Because of the bottleneck, the network mathematically *cannot* memorize the data. It is forced to learn the fundamental underlying patterns (the essence) of the "normal" data in order to successfully decompress it.

## 2. Using Reconstruction Loss for Anomalies
You train the Autoencoder **only on normal, healthy data**.
Once trained, the Autoencoder is a master at mathematically compressing and decompressing normal data. 
- If you feed it a normal server log, it reconstructs it perfectly. The mathematical difference between the input and output (the **Reconstruction Loss**) is ~0.01.
- If a hacker attacks the server and you feed the highly anomalous log into the Autoencoder, the network panics. It has never seen this mathematical pattern before, and the bottleneck destroys the information. The Decoder outputs garbage. 
- The **Reconstruction Loss** spikes to 5.0. You simply set a mathematical threshold (e.g., Alert if Loss > 2.0) to instantly detect zero-day cyberattacks.

## 3. Variational Autoencoders (VAEs)
Standard Autoencoders can mathematically overfit to the training data.
**Variational Autoencoders** introduce probability calculus. Instead of compressing the input into 10 hard numbers, the Encoder compresses the input into a mathematical probability distribution (Means and Standard Deviations). The Decoder then samples from this distribution. This forces the latent space to be continuous and smooth, drastically improving the mathematical robustness of the anomaly detection.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/CatBoost/index.mdx': `---
title: CatBoost
description: A state-of-the-art gradient boosting algorithm developed by Yandex, mathematically optimized to handle categorical data flawlessly without preprocessing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CatBoost">

**CatBoost (Categorical Boosting)** is a cutting-edge ensemble machine learning algorithm developed by Yandex. Alongside XGBoost and LightGBM, it dominates tabular data competitions on Kaggle. CatBoost's defining mathematical breakthrough is how it handles categorical string data without requiring the human to perform One-Hot Encoding.

## 1. The Categorical Encoding Problem
Algorithms mathematically require numbers. If you have a column for "City" with 10,000 unique cities, standard algorithms require you to One-Hot Encode it, creating 10,000 new sparse binary columns. This triggers the Curse of Dimensionality, destroying memory and training speed.

If you try to use Target Encoding (replacing "New York" with the average target value of New York), you mathematically cause **Target Leakage**, overfitting the model because you used the target variable to encode the feature.

## 2. CatBoost's Mathematical Solution (Ordered Target Statistics)
CatBoost solves Target Leakage flawlessly using **Ordered Target Statistics**.
Instead of calculating the average target value for "New York" using all rows, CatBoost mathematically artificially shuffles the data to simulate time. 
To encode "New York" for Row 500, CatBoost mathematically *only looks at Rows 1 through 499*. It calculates the average target value based purely on the "past", completely eliminating Target Leakage while providing a hyper-dense, highly predictive numerical feature.

## 3. Oblivious Trees
Most Decision Trees are mathematically asymmetric. The left branch might go 5 layers deep, while the right branch stops at 1 layer. This causes overfitting.

CatBoost uses **Oblivious Trees (Symmetric Trees)**. In an Oblivious Tree, the exact same mathematical splitting criteria (e.g., Age > 30) is applied across the *entire* level of the tree. 
This results in beautifully balanced, shallow trees. Because the structure is completely uniform, the CPU can mathematically execute the predictions using highly optimized vectorized instructions, making CatBoost's prediction speed (inference) magnitudes faster than XGBoost.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/DBSCAN/index.mdx': `---
title: DBSCAN
description: A powerful, density-based unsupervised clustering algorithm capable of mathematically discovering arbitrarily shaped clusters and filtering out noise.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DBSCAN">

**DBSCAN (Density-Based Spatial Clustering of Applications with Noise)** is a foundational unsupervised clustering algorithm. While K-Means mathematically assumes all clusters are spherical and forces every single point into a cluster, DBSCAN excels at finding highly complex, twisted geometric shapes and explicitly identifying outliers.

## 1. The Core Mathematical Parameters
DBSCAN requires no assumption of the number of clusters ($K$). Instead, it relies on two strict mathematical parameters:
- **Epsilon ($\epsilon$)**: The mathematical radius around a data point.
- **MinPts**: The minimum number of data points that must exist within the $\epsilon$ radius for that region to be considered a "dense cluster".

## 2. Point Classification
The algorithm mathematically evaluates every single point in the dataset and assigns it to one of three categories:
1. **Core Point**: A point that has at least *MinPts* neighbors within its $\epsilon$ radius. It is mathematically the dense heart of a cluster.
2. **Border Point**: A point that has fewer than *MinPts* neighbors, but is physically within the $\epsilon$ radius of a Core Point. It is the outer edge of the cluster.
3. **Noise Point (Outlier)**: A point that is mathematically isolated. It is neither a Core point, nor is it close to a Core point. DBSCAN explicitly tags this as an anomaly (-1) and ignores it.

## 3. The Algorithmic Flow
1. DBSCAN picks a random unvisited point.
2. It mathematically calculates the distance (e.g., Euclidean) to all other points to find its $\epsilon$-neighbors.
3. If it is a Core Point, a new cluster is born. 
4. The algorithm then mathematically jumps to the neighbors, and then their neighbors, expanding the cluster like a sprawling vine as long as the density holds.
5. If the density drops, the cluster terminates. 
Because it only cares about local mathematical density, DBSCAN can perfectly cluster a dataset shaped like two interlocking horseshoes, a task where K-Means would fail catastrophically.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Decision trees/index.mdx': `---
title: Decision Trees
description: A highly interpretable, non-linear Machine Learning algorithm that mathematically partitions data using a hierarchy of IF-THEN rules.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Decision Trees">

**Decision Trees** are the foundational building block for the most powerful tabular algorithms in existence (Random Forests, XGBoost). They are non-linear models that mathematically recursively split the dataset into smaller, homogeneous buckets.

## 1. The Mathematical Splitting Criteria
A Decision Tree starts at the Root Node containing all 10,000 rows. It must mathematically decide exactly which feature (and what threshold) to split the data on (e.g., Age > 30).
It does this by looping through every single feature and calculating a mathematical metric of "Purity".

- **Gini Impurity (Classification)**: Mathematically measures how often a randomly chosen element would be incorrectly labeled if it was randomly labeled according to the distribution of labels in the node. The algorithm searches for the split that mathematically minimizes Gini Impurity (creating buckets that are purely 100% Cat or 100% Dog).
- **Entropy & Information Gain**: An alternative to Gini, derived from Claude Shannon's Information Theory. It mathematically measures the chaos in the node. The tree chooses the split that mathematically reduces the entropy the most.
- **MSE (Regression)**: For predicting continuous numbers (Price), the tree mathematically calculates the Variance of the target variable in the proposed child nodes, choosing the split that minimizes the Mean Squared Error.

## 2. Interpretability (White Box)
Decision Trees are mathematically exact and perfectly interpretable. 
If a bank uses a Deep Neural Network to deny a loan, it cannot legally explain why. If it uses a Decision Tree, it can trace the exact mathematical path: 
*Root (Income < $50k) $\rightarrow$ Left Branch (Credit Score < 600) $\rightarrow$ Leaf Node (Deny)*. 
This transparency makes them mandatory in highly regulated industries.

## 3. The Overfitting Catastrophe
An unconstrained Decision Tree will mathematically continue splitting the data until every single leaf node contains exactly 1 row. It will achieve 0.0 Loss on the training data, completely memorizing the noise, and fail catastrophically in production.
Data Scientists mathematically constrain trees using **Pruning**: setting strict Hyperparameters like \TICK1max_depth=5\TICK1 or \TICK1min_samples_split=20\TICK1 to force the tree to stop growing before it memorizes the noise.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Elastic Net/index.mdx': `---
title: Elastic Net
description: A highly robust linear regression algorithm that mathematically combines the L1 and L2 regularisation penalties to handle highly correlated features perfectly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Elastic Net">

When training a Linear Regression model on thousands of features, Data Scientists apply **Regularisation** to mathematically constrain the weights and prevent overfitting. 
**Elastic Net** is the ultimate compromise, mathematically combining the absolute value penalty of L1 (Lasso) with the squared penalty of L2 (Ridge) into a single Loss Function.

## 1. The Mathematical Equation
The Loss Function for Elastic Net is defined as:
$Loss = MSE + \lambda_1 \sum |w_i| + \lambda_2 \sum w_i^2$

By introducing a mixing hyperparameter (often called $\alpha$ or \TICK1l1_ratio\TICK1), you mathematically control the blend. 
- If \TICK1l1_ratio = 1.0\TICK1, the L2 penalty is mathematically erased, and the model becomes pure Lasso.
- If \TICK1l1_ratio = 0.5\TICK1, the model is a mathematically perfect 50/50 blend of L1 and L2.

## 2. Solving the Collinearity Problem
The primary reason Elastic Net exists is to solve a fatal mathematical flaw in L1 (Lasso) regarding **Multicollinearity**.

If a dataset contains three features that are mathematically highly correlated (e.g., "Square Footage", "Number of Bedrooms", "House Length"), L1 Regularisation behaves erratically. Because it forces weights to exactly zero, it will randomly pick one of those features to keep, and brutally drop the other two to 0.0. 

Elastic Net solves this. The L2 (Ridge) component mathematically desires to keep correlated features together. The result is that Elastic Net will perform feature selection (dropping totally useless columns to 0 like "Astrological Sign"), but it will mathematically group the correlated housing features together, shrinking their weights simultaneously rather than deleting them.

## 3. When to Use It
Elastic Net is the mathematically optimal choice when:
1. You have a massive dataset where $P > N$ (You have 10,000 columns, but only 5,000 rows). Standard regression mathematically crashes in this scenario.
2. You know mathematically that there is heavy correlation between your columns (like financial indicators or genetic microarray data).

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
