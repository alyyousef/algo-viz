import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/AUC/index.mdx': `---
title: AUC (Area Under the Curve)
description: A powerful aggregate mathematical metric that collapses the 2D ROC Curve into a single scalar value, evaluating a model's ability to separate classes across all thresholds.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AUC (Area Under the Curve)">

When evaluating a binary classifier (e.g., Cancer vs No Cancer), plotting the ROC Curve is highly informative, but you cannot easily mathematically compare two curves. 
**AUC (Area Under the Receiver Operating Characteristic Curve)** solves this by calculating the literal 2D mathematical area beneath the ROC curve.

## 1. The Mathematical Interpretation
AUC provides a single scalar value between 0.0 and 1.0.
- **AUC = 1.0**: The model is mathematically flawless. It perfectly separates the classes. 
- **AUC = 0.5**: The model is mathematically worthless. It is a random coin flip. The ROC curve is a straight diagonal line ($y=x$), and the area under that triangle is exactly 0.5.
- **AUC = 0.0**: The model is perfectly inverted. Every time it says Cancer, it means Healthy. (You can just flip the outputs to achieve 1.0).

## 2. Threshold Independence
The brilliance of AUC is that it is **threshold-independent**.
If a Logistic Regression model outputs a probability (0.8), you normally have to pick a threshold (e.g., > 0.5 = Cancer). If you pick a bad threshold, the Accuracy plunges.
AUC mathematically evaluates the model across *every single possible threshold* simultaneously. It measures the fundamental separability of the model's internal probability distributions, making it an infinitely superior metric to Accuracy during the initial model selection phase.

## 3. The Probabilistic Meaning
Beyond area, AUC has a fascinating statistical property related to the Mann-Whitney U test.
If you mathematically select one random positive patient (Cancer) and one random negative patient (Healthy) from the dataset, the AUC represents the exact **probability** that the model will mathematically assign a higher risk score to the Cancer patient than to the Healthy patient.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Accuracy/index.mdx': `---
title: Accuracy
description: The simplest and most widely misunderstood evaluation metric, measuring the mathematical percentage of correct predictions across the entire dataset.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Accuracy">

**Accuracy** is the most intuitive metric in Machine Learning, but is mathematically catastrophic if used blindly in production environments.

## 1. The Mathematical Equation
The formula is incredibly simple. It uses the components of the Confusion Matrix:
- **True Positives (TP)**
- **True Negatives (TN)**
- **False Positives (FP)**
- **False Negatives (FN)**

$Accuracy = \frac{TP + TN}{TP + TN + FP + FN}$

It is literally just: (Total Correct Predictions) / (Total Predictions).

## 2. The Imbalanced Data Fallacy (The Accuracy Paradox)
If you are building an AI to predict credit card fraud, the dataset is massively imbalanced. 99.9% of transactions are legitimate, and 0.1% are fraud.

If a Data Scientist writes a broken Python script that mathematically ignores the data and just prints \TICK1"Legitimate"\TICK1 for every single transaction, the script will achieve **99.9% Accuracy**. 
If a CEO looks only at Accuracy, they will deploy the script, and the company will lose billions to the 0.1% of fraud that slipped through. This is the **Accuracy Paradox**. Accuracy is mathematically meaningless unless the target classes are perfectly 50/50 balanced.

## 3. When to Actually Use Accuracy
You should only rely on Accuracy when:
1. The dataset is mathematically perfectly balanced (e.g., 5,000 pictures of Dogs and 5,000 pictures of Cats).
2. The mathematical cost of a False Positive is exactly identical to the cost of a False Negative. (If predicting "Cat" when it's a "Dog" is just as harmless as predicting "Dog" when it's a "Cat").

If identifying the positive class is highly critical (like cancer detection), Accuracy must be discarded in favor of Precision, Recall, and F1 Score.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/BLEU/index.mdx': `---
title: BLEU Score
description: The historical mathematical standard for evaluating Machine Translation, quantifying the exact n-gram overlap between an AI's generated text and human reference translations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BLEU Score (Bilingual Evaluation Understudy)">

Before Large Language Models, evaluating a translation AI was incredibly difficult. If the French phrase is *Le chat noir*, the reference translation is *The black cat*. But if the AI outputs *A dark feline*, a human knows it is correct, but a computer mathematically sees zero matching words.
**BLEU** was invented by IBM to mathematically automate translation evaluation using n-gram overlap.

## 1. The Mathematical Calculation (Modified N-Gram Precision)
BLEU calculates how many chunks of words (n-grams) in the AI's output mathematically exist in the human reference text.
- **1-grams (Unigrams)**: Checks single words. (Did the AI use the word "cat"?)
- **2-grams (Bigrams)**: Checks word pairs. (Did the AI output the exact phrase "black cat"?)
- **3-grams and 4-grams**: Checks larger phrases to ensure mathematical fluency and correct word order.

BLEU mathematically combines the precision of all 4 n-gram levels (using a geometric mean) to generate a final score between 0.0 (terrible) and 1.0 (perfect).

## 2. The Brevity Penalty
A fatal mathematical flaw with raw precision is that an AI could just output the single word "The". Because "The" is in the reference text, the unigram precision would mathematically be 100%. 
To stop this, BLEU introduces a **Brevity Penalty (BP)**. If the AI's generated sentence is mathematically shorter than the human reference sentence, the BLEU score is brutally exponentially penalized.

## 3. The Modern Downfall of BLEU
BLEU was the industry standard for 20 years, but is mathematically obsolete for modern LLMs. 
Because BLEU strictly checks for exact token overlap, it mathematically fails to understand synonyms or paraphrasing. If the AI outputs *A dark feline*, BLEU gives it a score of 0.0. 
Today, BLEU has been largely replaced by Neural Metrics (like BERTScore or BLEURT) which use Deep Learning vector embeddings to mathematically evaluate the *semantic meaning* of the translation, rather than relying on rigid n-gram string matching.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Calibration metrics/index.mdx': `---
title: Calibration Metrics
description: The mathematical evaluation of whether a model's predicted probabilities perfectly align with the actual, real-world frequencies of the predicted events.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Calibration Metrics">

In high-stakes industries (Finance, Medicine), it is not enough for an AI to simply classify a patient as "Cancer". The doctor needs to know the exact probability. 
If the Neural Network outputs a probability of 0.8 (80%), the mathematical law of **Calibration** dictates that if you gather 100 patients to whom the model assigned an 80% probability, exactly 80 of them should actually have Cancer in the real world. 
If only 50 of them actually have cancer, the model is mathematically **Uncalibrated** (Overconfident).

## 1. Reliability Diagrams (Calibration Curves)
To mathematically evaluate calibration, Data Scientists plot a Reliability Diagram.
1. The model's predictions (0.0 to 1.0) are mathematically binned into 10 buckets (e.g., 0.0-0.1, 0.1-0.2).
2. For all the data points in the 0.8-0.9 bucket, you calculate the average predicted probability (e.g., 85%).
3. You then mathematically calculate the *True Fraction of Positives* in that bucket. (Did 85% of those rows actually have the target class?)
4. You plot the Predicted Probabilities vs the True Probabilities. A perfectly calibrated model forms a mathematically perfect $y=x$ diagonal line.

## 2. Expected Calibration Error (ECE)
You cannot compare curves easily, so the graph is mathematically collapsed into a scalar metric: **ECE**.
ECE mathematically calculates the absolute difference between the predicted probability and the true accuracy in every single bin. It then calculates the weighted average of those differences across all bins. The closer ECE is to 0.0, the more perfectly calibrated the model is.

## 3. Modern Neural Networks are Terrible at Calibration
Deep Neural Networks (especially ResNets) are notorious for being mathematically highly accurate, but catastrophically uncalibrated. Because of massive depth and Batch Normalization, they tend to output probabilities like 99.9% even when they are completely wrong. 
To fix this, engineers apply **Platt Scaling** or **Isotonic Regression** to mathematically recalibrate the Softmax outputs post-training, forcing the probabilities back into alignment with reality.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Confusion matrix/index.mdx': `---
title: Confusion Matrix
description: The foundational mathematical grid that explicitly breaks down the exact classification errors of a model, exposing the critical difference between False Positives and False Negatives.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Confusion Matrix">

If a model has 90% accuracy, you know it got 10% wrong. But *how* did it get them wrong? Did it hallucinate diseases that didn't exist, or did it miss diseases that did exist?
The **Confusion Matrix** is a strict $N \times N$ mathematical grid that exposes the exact topology of the errors.

## 1. The 2x2 Binary Matrix
For a Binary Classification problem (Disease vs Healthy), the matrix is $2 \times 2$.
The True labels are on one axis, and the Predicted labels are on the other.

- **True Positives (TP)**: Model predicted Disease, and the patient actually had the Disease. (Correct).
- **True Negatives (TN)**: Model predicted Healthy, and the patient was Healthy. (Correct).
- **False Positives (FP) / Type I Error**: Model predicted Disease, but the patient was actually Healthy. (A false alarm).
- **False Negatives (FN) / Type II Error**: Model predicted Healthy, but the patient actually had the Disease. (A catastrophic failure).

Every single mathematical metric in classification (Accuracy, Precision, Recall, F1) is derived algebraically directly from these 4 grid squares.

## 2. The Business Asymmetry of Errors
Mathematically, an error is an error. In the real world, the costs are heavily asymmetrical.
- **Spam Filter**: A False Positive (sending a crucial email from your boss to the Spam folder) is a disaster. A False Negative (letting a spam email into your inbox) is a minor annoyance. The Confusion Matrix explicitly forces the Data Scientist to optimize the model to mathematically minimize the FP square.
- **Cancer Detection**: A False Positive (telling a healthy patient they might have cancer) causes temporary anxiety until a biopsy clears them. A False Negative (telling a terminal cancer patient they are perfectly healthy) is fatal. The model must be mathematically optimized to minimize the FN square at all costs.

## 3. Multi-Class Confusion Matrix
If you are classifying 10 types of animals, the matrix is $10 \times 10$.
The perfect model is a mathematically solid diagonal line of massive numbers from top-left to bottom-right (meaning all predictions matched the true labels). 
If the model is confusing "Dogs" and "Wolves", you will mathematically see a massive cluster of numbers at the intersection of the Dog row and the Wolf column, instantly highlighting exactly which two classes the Neural Network is struggling to differentiate.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/F1 score/index.mdx': `---
title: F1 Score
description: The harmonic mean of Precision and Recall, providing a single, robust mathematical metric that heavily punishes extreme imbalances in classification models.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="F1 Score">

When evaluating a classification model on imbalanced data, you cannot use Accuracy. You must use **Precision** and **Recall**. 
However, Precision and Recall are mathematically opposed. If you tweak the model's threshold to increase Precision, Recall will mathematically plunge, and vice versa. 

The **F1 Score** mathematically combines them into a single metric, forcing you to balance both.

## 1. The Harmonic Mean
The F1 Score is mathematically defined as the **Harmonic Mean** of Precision and Recall.
$F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}$

Why use the Harmonic Mean instead of a simple Arithmetic Mean (Average)?
- **Arithmetic Mean Flaw**: If a model has 100% Precision and 0% Recall, the standard average is 50%. The model is completely broken, but 50% looks acceptable.
- **Harmonic Mean Brilliance**: The Harmonic Mean heavily mathematically punishes extreme disparities. If a model has 1.0 Precision and 0.0 Recall, the numerator becomes $1.0 \times 0.0 = 0$. The entire equation mathematically collapses to exactly $0.0$, instantly flagging the model as useless. To get a high F1 score, both Precision and Recall must be mathematically high simultaneously.

## 2. When to Optimize for F1
F1 Score is the absolute industry standard metric when:
1. You have heavily imbalanced data (e.g., Fraud Detection, rare diseases).
2. The mathematical cost of a False Positive (Precision error) and a False Negative (Recall error) are relatively similar, and you want a model that performs robustly across both fronts.

## 3. F-Beta Score (Adjusting the Balance)
If the costs are *not* perfectly symmetrical, you use the generalized **$F_\beta$ Score**.
$F_\beta = (1 + \beta^2) \times \frac{Precision \times Recall}{(\beta^2 \times Precision) + Recall}$

- **$\beta = 1$**: This is the standard F1 Score. Precision and Recall are weighted equally.
- **$\beta = 2$ (F2 Score)**: Mathematically weights Recall twice as heavily as Precision. Used in cancer detection where minimizing False Negatives is critical.
- **$\beta = 0.5$ (F0.5 Score)**: Mathematically weights Precision twice as heavily as Recall. Used in spam filters where minimizing False Positives is paramount.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Log loss/index.mdx': `---
title: Log Loss (Cross-Entropy)
description: The foundational mathematical Loss Function for classification algorithms, brutally punishing models for being highly confident about an incorrect prediction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Log Loss (Cross-Entropy)">

While Accuracy and F1 Score are used by humans to evaluate models after they are trained, **Log Loss (Binary Cross-Entropy)** is the mathematical engine used *during* training to calculate the gradients and update the neural weights.

## 1. The Mathematical Equation
For a single prediction in binary classification:
$Loss = - [y \log(\hat{y}) + (1 - y) \log(1 - \hat{y})]$
- $y$: The true mathematical label (must be exactly 1 or 0).
- $\hat{y}$: The model's predicted probability (e.g., 0.85).

Because $y$ is always 1 or 0, one half of the mathematical equation always completely vanishes.
- If $y=1$, the equation collapses to: $- \log(\hat{y})$.
- If $y=0$, the equation collapses to: $- \log(1 - \hat{y})$.

## 2. The Exponential Punishment
Log Loss is brilliant because the mathematical logarithm ($\log$) creates an asymptotic curve. 
If a patient has Cancer ($y=1$):
- If the model predicts $0.99$, the loss is $-\log(0.99) \approx 0.01$. (Near zero loss).
- If the model predicts $0.5$, the loss is $-\log(0.5) \approx 0.69$.
- If the model predicts $0.0001$, the loss is $-\log(0.0001) \approx 9.21$.

As the model's prediction approaches the mathematically wrong answer (0.0), the logarithm explodes to infinity. Log Loss violently punishes models for being **Confidently Wrong**. If a model guesses 0.5, it gets a mild penalty. If it guarantees 0.001 and is wrong, the massive mathematical penalty forces the Gradient Descent optimizer to radically alter the weights to ensure it never makes that mistake again.

## 3. Multi-Class Cross-Entropy
If you are classifying 10 animal types, Binary Cross-Entropy is expanded into **Categorical Cross-Entropy**.
$Loss = - \sum_{i=1}^{C} y_i \log(\hat{y}_i)$
Where $C$ is the number of classes. It mathematically executes the exact same logic, using the Softmax outputs of the neural network to aggressively punish the network if the true class's output probability is close to zero.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/MAE/index.mdx': `---
title: MAE (Mean Absolute Error)
description: The most mathematically intuitive metric for Regression models, calculating the raw, unweighted average distance between predictions and true values.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MAE (Mean Absolute Error)">

When predicting continuous numbers (Regression), you must mathematically measure how far off the prediction was from the true value. **Mean Absolute Error (MAE)** is the most robust, highly interpretable metric for this task.

## 1. The Mathematical Equation
$MAE = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$

1. The algorithm predicts a house price ($\hat{y} = \$300k$). The true price is ($y = \$350k$). 
2. The mathematical error (Residual) is $-\$50k$. 
3. It takes the **Absolute Value** ($|\$50k|$), mathematically converting all negative errors into positive numbers so they don't cancel each other out.
4. It sums up all the absolute errors across the entire dataset, and divides by $n$ (the total number of rows) to find the mean (average).

## 2. The Advantage: Perfect Interpretability
MAE is heavily favored in business environments because it maps perfectly to human intuition.
If you build a model to predict the stock market, and the MAE is $5.00, you can walk into a boardroom and confidently state: *"On average, our AI is off by exactly $5.00."* 

Unlike RMSE (which squares the numbers and distorts the units), MAE maintains the exact mathematical units of the target variable.

## 3. Robustness to Outliers
MAE's greatest mathematical strength is that it treats all errors linearly. 
If a model makes three errors of $10, $10, and $1000:
- MAE mathematically views the $1000 error as exactly 100x worse than the $10 error.
- RMSE squares the errors, viewing the $1000 error as 10,000x worse, causing the metric to explode and warping the entire evaluation based on a single outlier.

Because MAE does not square the errors, it is mathematically **hyper-robust to outliers**. If your dataset contains a few massive anomalies (like a billionaire's mansion in a normal neighborhood), MAE will cleanly evaluate the model's performance on the median data without being dragged to infinity by the anomaly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/MAP/index.mdx': `---
title: MAP (Mean Average Precision)
description: The ultimate mathematical metric for evaluating Ranking algorithms, Recommender Systems, and Object Detection models, prioritizing both relevance and sequence order.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MAP (Mean Average Precision)">

If you search Google for "Machine Learning", you don't just care that Google found relevant documents; you care that the relevant documents are mathematically ordered at the very top of page 1, not buried on page 10. 
**Mean Average Precision (MAP)** is the industry standard for evaluating mathematical ranking order.

## 1. Precision at K (P@K)
To understand MAP, you must first understand **P@K**.
If an algorithm outputs 10 search results, you mathematically calculate the Precision at various "cutoffs" ($K$).
- **P@1**: Is the #1 result relevant? (Yes = 1.0, No = 0.0)
- **P@3**: Out of the top 3 results, how many are relevant? (If 2 are relevant, P@3 = 0.66)

## 2. Average Precision (AP)
P@K is flawed because it ignores the internal order within the top $K$. 
**Average Precision (AP)** mathematically fixes this. 
You calculate the P@K *only at the specific ranks where a relevant document was found*, and then average those precisions.

Example: You return 5 documents. Ranks 1, 2, and 5 are relevant.
- Precision at Rank 1: 1/1 = 1.0
- Precision at Rank 2: 2/2 = 1.0
- Precision at Rank 5: 3/5 = 0.6
$AP = \frac{1.0 + 1.0 + 0.6}{3} = 0.86$

If the algorithm returned the relevant documents at Ranks 3, 4, and 5 instead, the AP math would aggressively punish it, dropping the score significantly because the initial precisions (1/3, 2/4) are much lower.

## 3. Mean Average Precision (MAP)
Average Precision (AP) evaluates a single Google search query. 
**Mean Average Precision (MAP)** is simply the mathematical average of the AP scores across *all 10,000 user queries* in the dataset. 

MAP mathematically guarantees that your Recommender System or Object Detection AI (like YOLO calculating the Intersection over Union of bounding boxes) is being ruthlessly optimized to push the absolute best predictions to the very top of the tensor array.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/METEOR/index.mdx': `---
title: METEOR
description: An advanced NLP evaluation metric designed to mathematically solve the fatal flaws of BLEU by incorporating semantic synonyms, stemming, and exact word alignment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="METEOR">

**METEOR (Metric for Evaluation of Translation with Explicit ORdering)** was engineered specifically to address the catastrophic mathematical failures of the BLEU score. Where BLEU acts like a rigid, mindless string-matching algorithm, METEOR attempts to mathematically inject linguistic intelligence into the evaluation.

## 1. The Mathematical Failure of BLEU
BLEU relies entirely on exact string overlap.
- Reference: "The cat is furious."
- AI Output: "The feline is angry."
BLEU mathematically gives this a score of 0.0, because none of the nouns or adjectives match exactly. 

## 2. The METEOR Alignment Pipeline
METEOR solves this by mathematically calculating a **Monolingual Alignment** between the AI's output and the reference text. It attempts to map every word in the output to a word in the reference, using a 3-stage fallback pipeline:
1. **Exact Match**: Do the strings match perfectly? (e.g., "The" -> "The").
2. **Stemming Match**: If they don't match, it applies a Porter Stemmer to strip prefixes/suffixes. It mathematically realizes that "computers" and "computing" both share the stem "comput", and scores them as a match.
3. **Synonym Match**: If stemming fails, it mathematically queries the **WordNet** lexical database. It discovers that "feline" is an explicit synonym for "cat", and "angry" is a synonym for "furious", establishing a perfect mathematical alignment.

## 3. Precision, Recall, and the Chunk Penalty
Once the words are aligned, METEOR mathematically calculates Precision and Recall. Unlike BLEU (which is heavily biased toward Precision), METEOR uses a Harmonic Mean that heavily mathematically weights **Recall** (typically 9x more than Precision). 

Finally, it applies a **Fragmentation Penalty**. If the AI output the exact correct words, but they were completely out of order (high fragmentation into tiny chunks), METEOR mathematically punishes the score, ensuring that the grammatical structure and fluency of the sentence are strictly enforced.

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
