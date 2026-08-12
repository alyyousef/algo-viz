import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/23. Data Science & Analytics/Metabase/index.mdx': `---
title: Metabase
description: A lightweight, open-source BI tool designed for blistering-fast setup and empowering non-technical users to query databases visually.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Metabase">

While tools like Tableau or Looker require dedicated servers, specialized engineering teams, and weeks of setup, **Metabase** is a lightweight, open-source BI alternative. You can mathematically deploy Metabase as a single Docker container, connect it to your PostgreSQL database, and have a beautiful dashboard running in 5 minutes.

## 1. Visual Query Builder
Metabase focuses heavily on democratizing data. It features a highly intuitive Visual Query Builder that allows non-technical users to mathematically execute SQL operations (TICK1FILTERTICK1, TICK1GROUP BYTICK1, TICK1JOINTICK1) simply by clicking buttons in the UI.

Metabase mathematically compiles these visual actions into standard SQL, pushes them down to the underlying database, and renders the result as a chart. 

## 2. X-Ray and Automated Exploration
Metabase attempts to automate Exploratory Data Analysis. 
If you click on the "Users" table and click the **X-Ray** button, Metabase will mathematically scan the table structure. It will instantly generate a 20-chart dashboard showing the mathematical distribution of ages, the geographical concentration of users, and the timeline of signups, all without a human writing a single query.

## 3. The Lack of a Rigid Semantic Layer
Metabase's greatest strength (speed and simplicity) is also its architectural weakness for massive enterprises. 
It historically lacked a rigorous, code-based Semantic Layer (like LookML). This means users can easily create conflicting dashboards by calculating metrics slightly differently, leading to data governance issues at massive scale.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Missing value imputation/index.mdx': `---
title: Missing Value Imputation
description: The mathematical and statistical strategies used to handle null or missing data in datasets before feeding them to Machine Learning algorithms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Missing Value Imputation">

Machine Learning algorithms are purely mathematical equations (like $y = mx + b$). If a user forgets to fill out the "Age" field on a signup form, the resulting TICK1NaNTICK1 (Not a Number) value will mathematically crash the entire algorithm. You cannot multiply a string or a null.

Data Scientists must meticulously handle missing data through **Imputation**.

## 1. Types of Missing Data
Before you fix the missing data, you must mathematically diagnose *why* it is missing:
- **MCAR (Missing Completely at Random)**: A server glitch dropped 5% of all rows randomly. The missing data has zero mathematical relationship to the other columns.
- **MAR (Missing at Random)**: Men are less likely to fill out a "Depression Score" survey than women. The missingness mathematically correlates with the "Gender" column.
- **MNAR (Missing Not at Random)**: People with incredibly low incomes refuse to fill out the "Income" field. The missingness is mathematically caused by the very value that is missing. This is incredibly dangerous to impute.

## 2. Deletion Strategies
- **Listwise Deletion (Drop Rows)**: If a row has a missing value, you mathematically delete the entire row. This is safe for MCAR, but if the data is MNAR, deleting the rows will mathematically destroy the model (e.g., deleting all poor people from a financial model).
- **Drop Columns**: If the "Hair Color" column is 95% null, you mathematically delete the entire column because it holds no predictive power.

## 3. Imputation Strategies
Replacing the missing TICK1NaNTICK1 with a calculated mathematical value.
- **Mean/Median Imputation**: Replacing all missing ages with the mathematical Average age (e.g., 34). This preserves the row, but it mathematically reduces the variance of the dataset, artificially compressing the distribution.
- **Forward Fill (Time Series)**: If a stock price tracker fails at 10:05 AM, you mathematically copy the price from 10:04 AM forward.
- **Algorithmic Imputation (KNN or MICE)**: Using Machine Learning to predict the missing values based on the other columns. If a row is missing "Age", but the user is a "Vice President" with a $300k income, the KNN algorithm will mathematically impute an older age rather than the global mean of 34.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/NumPy/index.mdx': `---
title: NumPy (Numerical Python)
description: The absolute foundational mathematical library of the Python data science ecosystem, bringing C-level speeds to massive matrix operations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NumPy (Numerical Python)">

Python is a fantastic language, but it is dynamically typed and mathematically slow. If you write a standard Python TICK1forTICK1 loop to multiply 10 million integers, it will take several seconds.

**NumPy** is the absolute foundation of modern Machine Learning. It mathematically bridges the ease of Python with the blistering execution speed of C.

## 1. The Ndarray (N-Dimensional Array)
The core architecture of NumPy is the TICK1ndarrayTICK1.
A standard Python list can hold multiple types: TICK1[1, "hello", True]TICK1. Because of this, Python must store complex memory pointers for every single item, ruining cache locality.

A NumPy array mathematically forces all items to be the exact same Data Type (e.g., all 64-bit integers). Because they are identical, NumPy stores them in a single, continuous, highly-dense block of C-memory. This allows the CPU to fetch them instantly.

## 2. Mathematical Vectorization
NumPy completely eliminates the need for slow Python loops through **Vectorization**.

If you have two arrays (A and B) with 10 million numbers each, and you want to add them together:
TICK3python
import numpy as np

# A NumPy Vectorized Addition
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])
C = A + B  # Result: [5, 7, 9]
TICK3
When you execute TICK1A + BTICK1, the operation drops out of the slow Python interpreter completely. NumPy mathematically pushes the execution down into highly-optimized C and Fortran code, utilizing SIMD (Single Instruction, Multiple Data) CPU architecture to calculate all 10 million additions simultaneously in milliseconds.

## 3. Broadcasting
NumPy allows mathematical operations between arrays of different shapes through **Broadcasting**.
If you multiply a massive 100x100 matrix by a scalar TICK15TICK1, NumPy mathematically "broadcasts" (stretches) the 5 across the entire matrix seamlessly in C-memory, without explicitly copying the number 10,000 times, saving massive amounts of RAM.

Almost every single Data Science library (Pandas, Scikit-Learn, TensorFlow, PyTorch) mathematically builds directly on top of NumPy's underlying C-architecture.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Outlier detection/index.mdx': `---
title: Outlier Detection
description: The mathematical algorithms used to identify anomalous data points that deviate so drastically from the norm that they threaten model integrity.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Outlier Detection">

If you calculate the average net worth of 10 random people in a coffee shop, it might be $50,000. If Elon Musk walks in, the average mathematically skyrockets to $20 Billion. Elon Musk is an **Outlier**. 

Machine Learning models (especially linear regressions) are incredibly sensitive to outliers. A single corrupted data point (e.g., someone typing their age as 999) will pull the mathematical line of best fit entirely off course, destroying the model's accuracy for normal users.

## 1. Statistical Methods (Z-Score & IQR)
For normally distributed data, Data Scientists use pure mathematics.
- **Z-Score**: You mathematically calculate how many Standard Deviations a data point is from the Mean. If a data point has a Z-Score greater than 3 (meaning it is further out than 99.7% of the data), you flag it as an outlier and mathematically drop it.
- **Interquartile Range (IQR)**: A more robust mathematical method. You calculate the 25th percentile (Q1) and the 75th percentile (Q3). The IQR is Q3 - Q1. Any data point that lies outside TICK1Q1 - 1.5 * IQRTICK1 or TICK1Q3 + 1.5 * IQRTICK1 is mathematically flagged.

## 2. Machine Learning Methods (Isolation Forests)
In complex, high-dimensional data, a user might have a normal Age, and a normal Income, but having that specific Age *with* that specific Income is anomalous. Simple statistics fail here.

**Isolation Forests** are the industry standard ML algorithm for anomaly detection (widely used in credit card fraud). 
The algorithm mathematically builds a random Decision Tree. Because normal data is clustered closely together, it takes many mathematical splits to isolate a normal data point into a leaf node. 
However, because outliers are far away from the cluster, they are mathematically isolated in just 1 or 2 splits. The algorithm uses this "path length" to score anomalies.

## 3. Domain Knowledge
Not all outliers are errors. If a credit card registers a $50,000 transaction, it might be mathematically anomalous, but it is real data representing a massive fraud event. Dropping it would destroy the exact signal you are trying to learn. Outlier Detection requires intense business context.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Pandas/index.mdx': `---
title: Pandas
description: The undisputed titan of Python data manipulation, providing the DataFrame architecture for relational data analysis in memory.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pandas">

Built by Wes McKinney, **Pandas** is arguably the most famous and widely utilized library in the entire Data Science ecosystem. It provides the mathematical structures necessary to manipulate tabular, relational data (like Excel spreadsheets or SQL tables) directly in Python.

## 1. The DataFrame Architecture
The core mathematical structure of Pandas is the **DataFrame** (heavily inspired by R dataframes).
A DataFrame is a two-dimensional, mutable table with labeled axes (rows and columns). 

Under the hood, Pandas is built entirely on top of **NumPy**. A Pandas DataFrame is essentially a collection of 1-Dimensional NumPy arrays (called Pandas Series) stitched together. Because it uses NumPy, Pandas operations are mathematically vectorized and incredibly fast.

TICK3python
import pandas as pd

# Loading a CSV into a DataFrame
df = pd.read_csv("users.csv")

# Mathematical Vectorization (Instantly doubling all incomes)
df['income'] = df['income'] * 2

# SQL-like filtering and aggregations
high_earners = df[df['income'] > 100000]
avg_income_by_city = df.groupby('city')['income'].mean()
TICK3

## 2. Data Manipulation Power
Pandas effectively replaces SQL for Data Scientists working in memory. It provides hundreds of mathematical functions to slice, dice, and transform data:
- **Merging**: Performing complex INNER, OUTER, LEFT, and RIGHT joins between DataFrames.
- **Pivoting**: Reshaping tables (like Excel Pivot Tables) using TICK1pivot_table()TICK1 or TICK1melt()TICK1.
- **Time Series**: Unparalleled mathematical support for parsing datetime indexes, executing rolling window calculations (e.g., 30-day moving averages), and shifting data.

## 3. The Memory Bottleneck
While Pandas is brilliant, it has a fatal architectural flaw: **In-Memory Constraints**.
Pandas mathematically requires the entire dataset to fit into your computer's RAM. In fact, due to its internal memory representations, loading a 5GB CSV file might mathematically consume 20GB of RAM.

If you have a 500GB dataset, Pandas will instantly throw an TICK1Out Of MemoryTICK1 exception and crash. To solve this, the industry utilizes Big Data engines like **Apache Spark (PySpark)** or modern optimized alternatives like **Polars**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Plotly/index.mdx': `---
title: Plotly
description: A powerful, interactive, D3.js-based visualization library bringing rich, web-ready interactive charts to Python and R.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Plotly">

While Matplotlib and Seaborn render beautiful but static image files (PNGs), modern data analysis demands interactivity. Data Scientists need to hover over a dot on a scatter plot and see the exact user data it represents.

**Plotly** is an industry-standard library that mathematically bridges Python analytics with highly interactive web technologies.

## 1. The JSON and D3.js Architecture
When you execute a Plotly script in Python, it does not render pixels to an image file. 
Instead, it mathematically compiles your Python chart into a massive, highly-structured **JSON** payload. 

This JSON payload is then rendered in the browser using Plotly.js (which is built on top of the legendary **D3.js** and WebGL). This architecture means every single chart is inherently interactive:
- You can mathematically zoom into specific timeframes.
- You can toggle categories on and off in the legend dynamically.
- You can hover over visual elements to trigger rich tooltips, without writing a single line of JavaScript.

## 2. Plotly Express
Historically, configuring the massive JSON payload for Plotly was painfully verbose. 
Plotly released **Plotly Express**, a high-level API mathematically designed to be as simple as Seaborn, but with the interactivity of Plotly.

TICK3python
import plotly.express as px

# Render an interactive scatter plot in 1 line of code
fig = px.scatter(df, x="gdp", y="life_expectancy", color="continent", hover_name="country")
fig.show()
TICK3

## 3. Dash (Building Web Apps)
Plotly's most powerful enterprise feature is **Dash**.
Dash is a Python framework that allows Data Scientists to build full-stack, highly interactive web applications and BI dashboards entirely in Python. It mathematically links Plotly charts to interactive UI components (Dropdowns, Sliders). When a user drags a slider, Dash routes the event back to the Python server, mathematically recalculates the Pandas DataFrame, and live-updates the Plotly chart via AJAX.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Polars/index.mdx': `---
title: Polars
description: A blazing-fast DataFrame library written in Rust, utilizing Apache Arrow and multithreading to mathematically destroy Pandas performance benchmarks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Polars">

For a decade, Pandas was the undisputed king of Python data analysis. However, as datasets grew larger, Pandas' reliance on single-threaded execution and inefficient memory mapping became a massive mathematical bottleneck.

**Polars** is the modern successor. It is a DataFrame library written entirely in **Rust**, explicitly engineered to be the fastest data processing engine available on a single machine.

## 1. Apache Arrow In-Memory Format
Pandas mathematically relies on NumPy for its underlying architecture, which is brilliant for matrices but terrible for Strings and Missing Values.
Polars is built directly on top of **Apache Arrow**, a modern, cross-language columnar memory format. This provides immense mathematical advantages:
- Strings are stored continuously in C-memory (unlike Pandas, which stores slow Python object pointers).
- Missing data (Nulls) are mathematically tracked using extremely fast bitmaps.

## 2. Multi-threaded Execution
Python is fundamentally limited by the **GIL (Global Interpreter Lock)**, meaning a standard Python script can only utilize one CPU core at a time. If you have a 16-core laptop, Pandas will use 1 core, and 15 cores will sit idle.

Because Polars is written in Rust, it completely bypasses the Python GIL. 
When you execute a Polars calculation (like summing revenue by country), Polars mathematically slices the data and distributes the workload across all 16 CPU cores in parallel, regularly running 10x to 50x faster than Pandas.

## 3. Lazy Evaluation and Query Optimization
In Pandas, execution is **Eager**. If you load a 10GB CSV and then filter it down to 1GB, Pandas mathematically loads the entire 10GB into RAM first, potentially crashing your machine.

Polars supports **Lazy Evaluation**.
You build a complex execution graph, but nothing runs until you call TICK1.collect()TICK1. 
Before execution, Polars utilizes a mathematical Query Optimizer. It scans the graph and performs **Predicate Pushdown**. It mathematically realizes you only need 1GB of data, so it pushes the filter directly down into the CSV parser, ensuring the other 9GB is never even read from disk, saving your RAM.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Power BI/index.mdx': `---
title: Power BI
description: Microsoft's dominant enterprise Business Intelligence platform, tightly integrated into the Office 365 ecosystem and powered by the VertiPaq engine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Power BI">

**Power BI** is Microsoft's flagship analytics platform. Due to its deep integration into the enterprise Microsoft ecosystem (Excel, Azure, Active Directory), it is overwhelmingly the most deployed BI tool in corporate environments, competing directly with Tableau.

## 1. The VertiPaq Engine (Analysis Services)
Power BI is not just a visualization layer; it contains a massive, heavily optimized mathematical database engine under the hood called **VertiPaq**.

When you import data into Power BI, it does not store it as raw rows. VertiPaq is an in-memory columnar database. It applies extreme mathematical compression (Value Encoding, Hash Encoding, and Run-Length Encoding). 
A 10GB CSV file can mathematically be compressed into a 1GB Power BI model, loaded entirely into the computer's RAM, allowing for blistering-fast aggregations on millions of rows instantly.

## 2. DAX (Data Analysis Expressions)
To execute complex mathematical business logic, Power BI relies on **DAX**.
DAX looks very similar to Excel formulas, but it is mathematically vastly more complex. It operates on columns and tables rather than cells.

The defining feature of DAX is **Filter Context**. 
TICK3dax
-- Calculate the Sales, but mathematically force the filter to ignore User Selections
Total Sales (All Regions) = CALCULATE(SUM(Sales[Amount]), ALL(Region))
TICK3
When a user clicks a specific Country on the dashboard, Power BI mathematically passes that Filter Context down into every single DAX equation. DAX allows engineers to explicitly override or modify that mathematical context to calculate complex metrics like "Percent of Total" or "Year-Over-Year Growth".

## 3. Power Query (M Language)
Before data enters the VertiPaq engine, it must be cleaned. 
Power BI includes **Power Query**, an ETL tool powered by the functional **M Language**. It allows users to visually pivot, unpivot, clean, and join messy Excel sheets and SQL databases into pristine Star Schemas before the DAX calculations are ever applied.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Seaborn/index.mdx': `---
title: Seaborn
description: A high-level Python visualization library built on top of Matplotlib, designed specifically to render complex statistical graphics effortlessly.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Seaborn">

While Matplotlib is incredibly powerful, generating a beautiful, complex statistical chart requires writing 30 lines of highly verbose code. **Seaborn** was engineered to mathematically abstract Matplotlib, providing a high-level API that allows Data Scientists to generate stunning statistical visualizations with a single line of code.

## 1. Deep Integration with Pandas
Matplotlib mathematically plots arrays of numbers. It does not understand the concept of a "Table".
Seaborn is mathematically deeply integrated with **Pandas**. It natively understands the structure of a DataFrame. 

You do not need to manually slice the DataFrame into arrays. You simply pass the entire DataFrame to Seaborn, tell it which column is X and which is Y, and Seaborn handles all the mathematical mapping, axis labeling, and color legends automatically.

TICK3python
import seaborn as sns

# Render a complex scatter plot, colored by 'species', in one line
sns.scatterplot(data=iris_df, x="sepal_length", y="sepal_width", hue="species")
TICK3

## 2. Statistical Aggregation
Seaborn natively performs complex mathematics *during* the rendering process.

If you create a TICK1sns.lineplot()TICK1 and your dataset has 5 different measurements for a single day, Matplotlib would draw a chaotic, scribbled line. 
Seaborn automatically recognizes the duplicates. It mathematically calculates the Mean of those 5 measurements, draws a smooth line, and then mathematically calculates the **95% Confidence Interval** (via bootstrapping) and draws a beautiful shaded uncertainty band around the line—all entirely automatically.

## 3. High-Level Statistical Charts
Seaborn provides out-of-the-box functions for complex mathematical EDA (Exploratory Data Analysis):
- **sns.pairplot()**: Automatically renders a massive grid of scatter plots, comparing every single numeric column against every other column to instantly visualize correlations.
- **sns.violinplot()**: A mathematically advanced version of a box plot. It renders a KDE (Kernel Density Estimate) to show the exact probability distribution curve of the data, instantly revealing if the data is bimodal.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Statistical analysis/index.mdx': `---
title: Statistical Analysis
description: The mathematical foundation of Data Science, providing the rigorous frameworks to summarize data, calculate probability, and infer truths about populations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Statistical Analysis">

Machine Learning is not magic; it is simply applied Statistics executing at massive scale. **Statistical Analysis** is the mathematical foundation of all Data Science. It is divided into two primary disciplines: Descriptive Statistics and Inferential Statistics.

## 1. Descriptive Statistics
Descriptive Statistics mathematically summarizes the *exact dataset* you possess. It makes no predictions.

- **Measures of Central Tendency**: 
  - **Mean**: The mathematical average. (Highly sensitive to outliers).
  - **Median**: The exact middle value when sorted. (Robust to outliers).
- **Measures of Dispersion (Spread)**: 
  - **Variance**: The mathematical average of the squared differences from the Mean.
  - **Standard Deviation ($\sigma$)**: The square root of the Variance. It mathematically dictates the width of the bell curve. In a normal distribution, exactly 68% of the data lies within 1 Standard Deviation, and 99.7% lies within 3 Standard Deviations (The Empirical Rule).

## 2. Inferential Statistics
You cannot mathematically survey the height of all 8 billion humans on Earth (The Population). You can only survey 1,000 humans (The Sample).
Inferential Statistics is the mathematical discipline of using that tiny Sample to confidently infer the true height of the massive Population.

### The Central Limit Theorem (CLT)
The CLT is the most critical mathematical theorem in Statistics. 
It states that if you take enough samples from a population, the *averages* of those samples will mathematically form a perfect, normal Bell Curve, **even if the underlying population is not a bell curve at all**. 
Because we know it forms a normal distribution, we can use probability math to accurately estimate the true population mean.

## 3. Probability Distributions
Data Science heavily relies on mapping real-world chaos to mathematical probability functions:
- **Normal (Gaussian) Distribution**: The classic bell curve (heights, IQ scores).
- **Binomial Distribution**: The mathematical probability of discrete success/failure events (e.g., getting exactly 6 heads in 10 coin flips).
- **Poisson Distribution**: The mathematical probability of events occurring in a fixed interval of time (e.g., how many users will click the "Buy" button in the next 5 minutes).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Statistical testing/index.mdx': `---
title: Statistical Testing
description: The rigorous mathematical methodology of Hypothesis Testing, calculating p-values and confidence intervals to validate scientific assertions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Statistical Testing">

**Hypothesis Testing** is the mathematical engine that powers all scientific discovery and A/B testing. It provides a rigid framework to determine if an observed anomaly is real, or just random mathematical noise.

## 1. The Core Framework
1. **Null Hypothesis ($H_0$)**: The mathematical assumption that nothing interesting is happening. (e.g., "The new drug has exactly zero effect on blood pressure").
2. **Alternative Hypothesis ($H_A$)**: Your assertion. (e.g., "The new drug lowers blood pressure").
3. **The Test Statistic**: You execute the trial, calculate the difference, and mathematically map it to a standardized score (like a T-score or Z-score).
4. **The P-Value**: The probability of observing this result *if the Null Hypothesis were true*. If p = 0.03, there is a 3% chance this is just random noise. Since 3% is less than the standard 5% threshold ($\alpha = 0.05$), we reject the Null Hypothesis.

## 2. Types of Statistical Tests
Data Scientists select different mathematical tests based on the shape and type of the data.

### T-Test (Comparing Means)
Used to mathematically compare the averages of two groups. 
- *Example*: Comparing the average checkout value of Group A vs Group B. 
- It relies on Student's T-distribution, which adjusts mathematically for the uncertainty of having a small sample size.

### Chi-Square Test (Categorical Data)
Used for discrete, categorical data (counts and percentages) rather than continuous numbers.
- *Example*: Comparing the conversion rate (Yes/No) of a red button vs a blue button. It mathematically calculates the difference between the "Expected" clicks and the "Observed" clicks.

### ANOVA (Analysis of Variance)
Used when comparing the means of **three or more groups** simultaneously.
If you have a Red, Blue, and Green button, running three separate T-Tests mathematically increases the chance of a false positive (Type I error). ANOVA mathematically analyzes the variance *between* the groups versus the variance *within* the groups in a single test.

## 3. Type I vs Type II Errors
- **Type I Error (False Positive)**: Mathematically rejecting the Null Hypothesis when it was actually true. (Telling a healthy patient they have a disease). Controlled by $\alpha$.
- **Type II Error (False Negative)**: Mathematically accepting the Null Hypothesis when it was actually false. (Telling a diseased patient they are healthy). Controlled by $\beta$ (Statistical Power).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Survey methodology/index.mdx': `---
title: Survey Methodology
description: The rigorous architectural discipline of designing questionnaires and sampling frameworks to extract unbiased, mathematically sound data from human populations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Survey Methodology">

Data Science is useless if the underlying data is mathematically corrupted by human bias. **Survey Methodology** is the discipline of designing data collection protocols to minimize psychological bias and maximize statistical validity.

## 1. Sampling Architectures
You cannot survey 300 million Americans. You must extract a Sample. 

- **Simple Random Sampling**: The mathematical gold standard. Every single person has an exactly equal probability of being selected (like pulling names from a hat).
- **Stratified Sampling**: If the population is 60% Female and 40% Male, random sampling might accidentally pick 80% Females. Stratified sampling mathematically forces the sample to exactly match the demographic ratios of the true population.
- **Convenience Sampling**: Surveying whoever is easiest to reach (e.g., polling people on Twitter). This is mathematically worthless, as it induces massive Selection Bias (only highly-online, opinionated people will respond).

## 2. Questionnaire Bias
The physical wording of a question mathematically alters the statistical outcome.

- **Leading Questions**: "Do you agree that our amazing new product is excellent?" This mathematically skews the data toward positivity.
- **Double-Barreled Questions**: "Do you like our app's speed and design?" If the user loves the speed but hates the design, they cannot mathematically answer the question, corrupting the dataset.
- **Acquiescence Bias**: Human psychology dictates that people generally want to be agreeable. If you ask Yes/No questions, you will artificially inflate the "Yes" count. Good survey architecture forces users to choose between two opposing statements.

## 3. Non-Response Bias
If you send out 10,000 surveys to a company, and only the 500 angriest employees respond, your dataset is mathematically destroyed by **Non-Response Bias**. 

Data Scientists must mathematically account for this by attempting to contact non-responders to ensure their data (which is usually moderate) is included, or by mathematically weighting the responses to correct the demographic imbalances.

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
