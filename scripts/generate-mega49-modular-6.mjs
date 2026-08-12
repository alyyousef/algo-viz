import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/MSE/index.mdx': `---
title: MSE (Mean Squared Error)
description: The foundational mathematical loss function for Regression, which squares the residuals to severely punish large predictive errors and outliers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MSE (Mean Squared Error)">

While Mean Absolute Error (MAE) treats all errors linearly, **Mean Squared Error (MSE)** is mathematically designed to be hyper-sensitive to massive outliers. It is the absolute standard Loss Function used by Gradient Descent to train Regression algorithms (like Deep Neural Networks and Linear Regression).

## 1. The Mathematical Equation
$MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$

1. The algorithm predicts a value ($\hat{y} = 10$). The true value is ($y = 15$). 
2. The error (Residual) is $5$. 
3. It takes the **Square** of the error ($5^2 = 25$). 
4. It sums up all the squared errors across the dataset, and divides by $n$ to find the mean.

## 2. The Penalty for Outliers
Why do we square the errors instead of just taking the absolute value (MAE)?
- If the model makes two errors of $5$ and $5$, the MSE sum is $25 + 25 = 50$.
- If the model makes two errors of $0$ and $10$, the MSE sum is $0 + 100 = 100$.

Notice that in both scenarios, the total raw error is 10. But MSE mathematically views the second scenario as *twice as bad* as the first. 
MSE explicitly instructs the Gradient Descent optimizer: *"It is mathematically better to make ten small errors than one catastrophic massive error."* This forces the algorithm to desperately adjust its weights to fix massive outliers.

## 3. The Derivative Advantage (Calculus)
The second major reason MSE dominates Machine Learning is pure calculus.
To optimize a Neural Network, you must mathematically calculate the derivative (the slope) of the Loss Function. 
- The absolute value function (used in MAE) creates a V-shape graph. At exactly $0$, the point is mathematically sharp, meaning the derivative is undefined (it doesn't exist).
- The squared function (used in MSE) creates a U-shape parabola. It is perfectly smooth everywhere. The derivative is easy to calculate ($2x$), making mathematical optimization vastly more stable and efficient.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/NDCG/index.mdx': `---
title: NDCG (Normalized Discounted Cumulative Gain)
description: The most advanced mathematical metric for evaluating Recommender Systems, heavily punishing models that place highly relevant items lower in the ranking.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NDCG (Normalized Discounted Cumulative Gain)">

When evaluating a search engine (like Google) or a Recommender System (like Netflix), it is not enough to simply ask "Are these movies relevant?" (Precision). You must mathematically ask: "Are the *most* relevant movies at the absolute top of the list?" 
**NDCG** is the mathematical standard for evaluating ranked lists with graded relevance.

## 1. Graded Relevance (CG)
Unlike MAP (Mean Average Precision) which assumes relevance is binary (1 or 0), NDCG assumes relevance is a gradient (e.g., 0 to 3).
- $3$: Perfect match (The exact movie the user searched for).
- $2$: Highly relevant (A movie in the exact same franchise).
- $1$: Marginally relevant (A movie in the same broad genre).
- $0$: Irrelevant.

**Cumulative Gain (CG)** simply sums the mathematical relevance of the top $K$ results. If the top 3 results are [3, 1, 2], the CG is $6$.
*Flaw*: CG doesn't care about order. A ranking of [1, 2, 3] also gets a score of $6$, even though putting the best movie last is terrible.

## 2. The Discount Factor (DCG)
**Discounted Cumulative Gain (DCG)** introduces a mathematical penalty based on the Rank (position) in the list.
$DCG = \sum \frac{relevance_i}{\log_2(i + 1)}$

By dividing the relevance by the mathematical logarithm of its rank ($i$), the algorithm brutally discounts items found lower in the list. 
If a perfectly relevant movie (score 3) is at Rank 1, its value is barely touched. If that same movie is buried at Rank 10, the logarithmic denominator mathematically crushes its value down to almost nothing.

## 3. Normalization (NDCG)
If one user searches for "Star Wars" (which has 10 highly relevant movies) and another searches for a niche indie film (which only has 1 relevant movie), their raw DCG scores will be mathematically incomparable.

**Normalized DCG** calculates the *Ideal DCG (IDCG)* by manually sorting the results into perfect descending order [3, 3, 2, 1, 0] and calculating the DCG of that perfect list. It then divides the model's actual DCG by the IDCG, resulting in a perfect, standardized mathematical metric between 0.0 and 1.0 that can be averaged across millions of diverse users.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Perplexity/index.mdx': `---
title: Perplexity
description: The foundational mathematical metric for evaluating Large Language Models, quantifying how "surprised" or confused the model is by human text.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Perplexity">

When training a Large Language Model (LLM) like GPT-4, you cannot use Accuracy. The English language has 100,000 words. If the model predicts the next word is "beautiful", but the actual word was "stunning", standard Accuracy says the model was 0% correct. 
Instead, LLMs are evaluated using **Perplexity**, a mathematical concept derived from Information Theory.

## 1. The Mathematical Definition
At its core, an LLM is a probability engine. It mathematically assigns a probability to every possible next word in the dictionary.
If you feed the model a human sentence: *"The sky is blue."*
- The model calculates: $P(blue | The sky is) = 0.90$. (High confidence).
- If the model is terrible, it might calculate: $P(blue | The sky is) = 0.001$. (Low confidence).

**Perplexity** is mathematically defined as the exponentiation of the Cross-Entropy Loss. In simpler terms, it is the inverse probability of the test set, normalized by the number of words.
$Perplexity = 2^{CrossEntropy}$

## 2. Intuitive Meaning (The Branching Factor)
A Perplexity score of 1.0 is mathematically perfect (the model predicted the exact sequence of words with 100% certainty).
If a model has a Perplexity of **10**, it means that, on average, when the model was trying to guess the next word, it was as "confused" as if it had to randomly guess between **10 equally likely words**.

- An untrained LLM guessing randomly from a 50,000-word dictionary has a Perplexity of 50,000.
- A highly trained GPT-4 model analyzing standard English might achieve a Perplexity of ~10.
The lower the Perplexity, the less "perplexed" (surprised) the model is by human language, meaning it has successfully mathematically modeled the underlying grammar of reality.

## 3. The Flaw (Overfitting to Formatting)
Perplexity strictly measures how well the model predicts the *exact* sequence of characters in the test set. 
If the test set consists entirely of Shakespeare, and you feed it modern, perfectly fluent English, the Perplexity will mathematically spike to catastrophic levels, simply because the model is surprised by the lack of "Thee" and "Thou". It measures statistical probability, not actual linguistic quality or truthfulness.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Precision/index.mdx': `---
title: Precision
description: A critical mathematical classification metric measuring the absolute trustworthiness of a model when it claims a data point is positive.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Precision">

In binary classification, Accuracy is dangerously misleading on imbalanced datasets. **Precision** isolates a highly specific mathematical question: *"Out of all the times the model screamed 'Positive!', how many times was it actually right?"*

## 1. The Mathematical Equation
Precision relies on the False Positives (FP) from the Confusion Matrix.
$Precision = \frac{True Positives}{True Positives + False Positives}$

If a spam filter flags 100 emails as "Spam", and 90 of them are actually spam, but 10 of them are legitimate emails from your boss, the Precision is $90 / 100 = 0.90$ (90%).

## 2. When to Optimize for Precision (The Cost of False Positives)
You must mathematically force your model to optimize for Precision when the business cost of a **False Positive** is catastrophic.

- **Spam Filters**: If an email is mistakenly flagged as spam (False Positive), you might miss a million-dollar contract. The system must be highly Precise. It is better to let 10 real spam emails into the inbox (low Recall) than to falsely ban 1 real email.
- **Death Penalty AI**: If an AI predicts if someone is guilty of murder, a False Positive means executing an innocent person. The model must theoretically have 100% Precision.

## 3. The Tradeoff with Recall
In Machine Learning, Precision and Recall are mathematically locked in a see-saw. 
A model outputs probabilities (e.g., 0.85). If you want to increase Precision, you mathematically raise the decision threshold (e.g., "Only predict 'Spam' if you are 99% sure"). 
Because the model is now extremely conservative, the few times it does predict Spam, it will be absolutely correct (High Precision). However, it will now miss thousands of obvious 90% spam emails, meaning its Recall mathematically plunges to near zero.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/RMSE/index.mdx': `---
title: RMSE (Root Mean Squared Error)
description: The industry standard metric for evaluating Regression models, applying a mathematical square root to return the error penalty back to the original interpretable units.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RMSE (Root Mean Squared Error)">

Mean Squared Error (MSE) is the perfect mathematical Loss Function for *training* a Neural Network, but it is a terrible metric for a human to interpret. 

If you are predicting house prices, and the model is off by $\$10,000$, the MSE mathematically squares that error, outputting a value of $100,000,000 \text{ Dollars}^2$. "Squared Dollars" is mathematically meaningless to a human.
**RMSE** solves this by applying a final square root.

## 1. The Mathematical Equation
$RMSE = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}$

By taking the square root of the MSE, the final number is mathematically returned to the exact same units as the target variable (e.g., Dollars, Degrees, Centimeters).

## 2. RMSE vs MAE (The Penalty for Outliers)
If RMSE and MAE (Mean Absolute Error) both output errors in standard units, why use RMSE?

Because RMSE mathematically squared the errors *before* averaging them, it is intensely sensitive to massive outliers. 
Assume a model makes 3 predictions. The errors are: $0$, $0$, and $30$.
- **MAE** calculates: $(0 + 0 + 30) / 3 = 10$.
- **RMSE** calculates: $\sqrt{(0^2 + 0^2 + 30^2) / 3} = \sqrt{900 / 3} = \sqrt{300} \approx 17.3$.

Even though the average error is technically 10, RMSE mathematically inflates the score to 17.3 because it wants to loudly warn the Data Scientist that the model made a catastrophic, massive outlier error of 30.

## 3. Production Usage
RMSE is the absolute standard in almost all Regression competitions (like Kaggle). It perfectly balances the mathematical stability of calculus (being smooth and differentiable for Gradient Descent) while providing a human-readable final evaluation metric that heavily punishes models for erratic, dangerous outlier predictions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/ROC/index.mdx': `---
title: ROC Curve
description: A 2D mathematical graph that plots a binary classifier's performance across every single possible decision threshold, visualizing the tradeoff between True Positives and False Positives.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ROC Curve (Receiver Operating Characteristic)">

A Logistic Regression model doesn't output "Cancer". It outputs a probability, like 0.85. 
To calculate Accuracy, a human must manually pick a Threshold (e.g., $>0.5 = \text{Cancer}$). But what if 0.5 is the wrong threshold? What if the optimal threshold is 0.7?

The **ROC Curve** mathematically plots the model's exact performance across *every single possible threshold* from 0.0 to 1.0 simultaneously.

## 1. The Mathematical Axes
The ROC Curve is plotted on a 2D graph:
- **Y-Axis (True Positive Rate / Recall)**: Out of all the people who actually have Cancer, what percentage did the model find? (We want this to be 1.0).
- **X-Axis (False Positive Rate)**: Out of all the people who are actually Healthy, what percentage did the model accidentally misdiagnose with Cancer? (We want this to be 0.0).

## 2. Reading the Curve
The algorithm starts with a threshold of 1.0. It is extremely conservative. It diagnoses no one with Cancer. Both TPR and FPR are 0. (The bottom left corner).
As you slowly lower the threshold (0.9, 0.8, 0.5...), the model gets more aggressive. It catches more real Cancer (TPR goes up), but it starts falsely diagnosing healthy people (FPR goes up).

- A **mathematically perfect model** shoots straight up the Y-axis to 1.0 (catching all cancer) without moving right at all (0 false alarms), forming a perfect right angle in the top-left corner.
- A **random guessing model** forms a perfect diagonal line from bottom-left to top-right. Gaining 10% more True Positives costs exactly 10% more False Positives.

## 3. Threshold Tuning
In production, Data Scientists look at the ROC curve to mathematically pick the optimal business threshold. 
If diagnosing Cancer, they will slide their finger along the curve and pick a point far to the right. They mathematically accept a massive 40% False Positive Rate (causing anxiety for healthy patients) because the curve shows that is the mathematical requirement to achieve a 99% True Positive Rate (ensuring no one dies of missed cancer).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/ROUGE/index.mdx': `---
title: ROUGE Score
description: The mathematical standard for evaluating AI Text Summarization, heavily prioritizing Recall to ensure the AI successfully captured all the critical facts from the original document.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ROUGE Score">

While BLEU is the standard for Machine Translation (prioritizing Precision), **ROUGE (Recall-Oriented Understudy for Gisting Evaluation)** is the absolute mathematical standard for evaluating AI **Text Summarization**.

## 1. The Mathematical Shift to Recall
If an AI summarizes a 10-page legal document, Precision (BLEU) asks: *"Were the words the AI generated correct?"* 
An AI could achieve 100% Precision by simply generating one single, safe sentence.

ROUGE relies on **Recall**. It mathematically asks: *"Out of all the critical facts in the human reference summary, how many did the AI successfully manage to extract and include?"* This brutally punishes models that generate short, safe summaries that miss the point of the document.

## 2. The ROUGE Variants
ROUGE calculates overlapping n-grams, but categorizes them specifically:
- **ROUGE-N**: Calculates the recall of unigrams (ROUGE-1) or bigrams (ROUGE-2). (Did the AI include the specific phrase "Breach of Contract"?)
- **ROUGE-L**: Measures the **Longest Common Subsequence (LCS)**. It mathematically ignores random word insertions and focuses on the underlying sentence structure. If the AI outputs *"The angry client sued the company"*, and the reference is *"The client sued the company"*, ROUGE-L identifies the sequence [The, client, sued, the, company] and gives it a massive score, even though the exact n-grams were interrupted by the word "angry".

## 3. Semantic Flaws (The LLM Era)
Exactly like BLEU, ROUGE is a rigid mathematical string-matching algorithm. 
If the human reference summary says *"The CEO resigned"*, and the LLM summarizes it as *"The executive stepped down"*, the summary is flawlessly accurate, but ROUGE mathematically gives it a score of exactly $0.0$ because the raw ASCII characters do not match. 
Modern Evaluation (like RAGAS or LLM-as-a-Judge) bypasses ROUGE by using a second LLM (like GPT-4) to mathematically evaluate the semantic meaning of the summary, rather than counting strings.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/Recall/index.mdx': `---
title: Recall (Sensitivity)
description: A critical mathematical classification metric measuring a model's ability to successfully identify all actual positive cases in a dataset, punishing false negatives heavily.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Recall (Sensitivity)">

While Precision asks *"Of the ones you flagged, how many were right?"*, **Recall** asks a much more dangerous mathematical question: *"Of all the ones that actually exist in the universe, how many did you manage to find?"*

## 1. The Mathematical Equation
Recall relies on the False Negatives (FN) from the Confusion Matrix.
$Recall = \frac{True Positives}{True Positives + False Negatives}$

If there are 100 actual terrorists in a database, and the AI flags 20 people as terrorists, it missed 80 of them. The Recall is $20 / 100 = 0.20$ (20%). It doesn't mathematically matter if those 20 flags were perfectly accurate (100% Precision); the model's Recall is a catastrophic failure.

## 2. When to Optimize for Recall (The Cost of False Negatives)
You must mathematically force your model to optimize for Recall when the business cost of a **False Negative** is fatal.

- **Cancer Detection**: A False Negative means telling a terminal cancer patient they are healthy, resulting in death. The model must have near 100% Recall. It must mathematically flag *anyone* who looks remotely suspicious, even if it causes massive False Positives (low Precision), because a biopsy can easily clear a False Positive, but nothing can fix a False Negative.
- **Fraud Detection**: If an AI misses a $10 million fraudulent wire transfer, the bank goes bankrupt. The Recall must be maximized.

## 3. The Tradeoff with Precision
In Machine Learning, Precision and Recall are mathematically locked in a see-saw. 
To increase Recall, you mathematically lower the decision threshold (e.g., "Predict 'Cancer' even if you are only 5% sure"). 
Because the model is now extremely aggressive, it will successfully find all 100 cancer patients (100% Recall). However, it will also falsely flag 10,000 healthy people as having cancer, meaning its Precision mathematically plunges to near zero. F1 Score is used to balance this.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/25. Machine Learning/25.3 Evaluation Metrics/R²/index.mdx': `---
title: R² (Coefficient of Determination)
description: The ultimate statistical metric indicating exactly what percentage of the variance in the target variable is mathematically explained by the Regression model's features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="R² (Coefficient of Determination)">

RMSE and MAE tell you exactly how many dollars or degrees your model is off by. But is an error of $50,000 good or bad? (If predicting the price of a $100M mansion, $50k is incredible. If predicting a $60k car, it is terrible).

**$R^2$** mathematically normalizes the error into a percentage, making it universally interpretable regardless of the scale of the data.

## 1. The Mathematical Equation
$R^2$ compares your complex Machine Learning model against the absolute dumbest model possible (a model that just predicts the exact Average Mean of the dataset every single time).

$R^2 = 1 - \frac{\text{Sum of Squared Errors (Your Model)}}{\text{Total Sum of Squares (Mean Model)}}$

- If $R^2 = 1.0$: Your model is mathematical perfection. It explains 100% of the variance. Every single prediction is exactly correct.
- If $R^2 = 0.0$: Your massive Deep Neural Network is mathematically no better than a script that just outputs the average value of the dataset.
- If $R^2 < 0$: Your model is mathematically worse than just guessing the average. (You have severely overfit or inverted the logic).

## 2. Interpretation (Explained Variance)
An $R^2$ of **0.85** mathematically states: *"85% of the variance in house prices is perfectly explained by the features in our dataset (Square Footage, Zip Code). The remaining 15% is due to random noise or missing variables (like the color of the paint)."*

## 3. The Flaw (Adjusted R²)
$R^2$ has a fatal mathematical flaw. If you add completely random, useless columns to your dataset (like the homeowner's "Favorite Movie"), standard $R^2$ will mathematically *always increase* (or stay flat), never decrease. This encourages Data Scientists to dump 10,000 garbage columns into the model to artificially inflate the score.

**Adjusted $R^2$** mathematically fixes this. It introduces a massive algebraic penalty for every new column added to the model. If you add a column and it doesn't significantly improve the predictions, Adjusted $R^2$ will mathematically *drop*, punishing you for increasing the complexity of the model without merit.

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
