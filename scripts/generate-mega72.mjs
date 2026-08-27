import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/23. Data Science & Analytics/Data cleaning/index.mdx': `---
title: Data Cleaning
description: The rigorous, mathematically essential process of identifying, correcting, or discarding corrupted, inaccurate, or incomplete records from a raw dataset.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Cleaning">

"Garbage In, Garbage Out" is the fundamental mathematical law of Data Science. Even the most advanced neural network in the world will produce catastrophic predictions if the training data is corrupted. Data Cleaning (or Data Wrangling) consumes up to 80% of a Data Scientist's time.

## 1. Handling Missing Data (Imputation)
When a dataset has missing values (TICK1NaNTICK1), you cannot mathematically run an algorithm on it. You have two choices:
- **Deletion**: Drop the entire row. This is mathematically safe but destroys valuable data.
- **Imputation**: Mathematically guess the missing value. You can fill it with the Mean (average) of the column, the Median, or use advanced Machine Learning (like K-Nearest Neighbors) to predict what the missing value *should* have been based on the surrounding data.

## 2. Outlier Detection
An Outlier is a data point that mathematically deviates massively from the rest of the dataset.
If you are analyzing average human height, and one row says a person is 500 feet tall, it will mathematically destroy the Mean calculation. 
Data Scientists use mathematical boundaries, like the **Z-Score** or **Interquartile Range (IQR)**. Any data point that falls outside of 3 Standard Deviations from the Mean is mathematically flagged as an Outlier and removed or investigated before the data is passed to a machine learning model.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Data collection/index.mdx': `---
title: Data Collection
description: The systematic architectural process of gathering massive, raw datasets from distributed sources into a centralized, mathematically analyzable storage system.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Collection">

Before any mathematical analysis can begin, the data must be physically acquired. In modern architecture, this involves ingesting Terabytes or Petabytes of data per day.

## 1. Batch vs. Streaming Ingestion
- **Batch Processing**: The legacy method. Once a night, a script wakes up, runs a massive SQL query against the production database, and physically copies 10 million rows into the Data Warehouse.
- **Streaming (Real-Time)**: The modern approach (using Apache Kafka or AWS Kinesis). Every time a user clicks a button, a tiny mathematical Event is instantly fired into a Message Broker. The Data Warehouse mathematically ingests these events in real-time, allowing Data Scientists to analyze user behavior within milliseconds of it happening.

## 2. The Data Lake
When data is collected, it is often unstructured (raw JSON, server logs, images, audio files).
You cannot mathematically store this in a rigid SQL database. Instead, the raw data is dumped into a **Data Lake** (like AWS S3). A Data Lake is an incredibly cheap, mathematically infinite object storage system. It acts as the absolute source of truth. Later, ETL pipelines will pull this raw data, mathematically transform it, and load it into a structured Data Warehouse for actual analysis.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Data visualisation/index.mdx': `---
title: Data Visualization
description: The mathematical translation of massive numerical datasets into visual geometry (graphs, charts, maps) to leverage human cognitive pattern recognition.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Visualization">

A mathematical model that predicts a stock price with 99% accuracy is useless if an executive cannot understand the output. Data Visualization bridges the gap between complex mathematics and human cognition.

## 1. The Grammar of Graphics
Modern visualization (like Python's TICK1ggplotTICK1 or D3.js) is built on the mathematical theory called "The Grammar of Graphics." 
Instead of just calling TICK1drawPieChart()TICK1, developers mathematically map Data variables to visual Aesthetics.
- **X/Y Coordinates**: Mapped to Continuous mathematical variables (e.g., Time, Price).
- **Color/Hue**: Mapped to Categorical variables (e.g., Region, Product Type).
- **Size**: Mapped to Magnitude (e.g., Total Sales Volume).
By defining these strict mathematical mappings, complex, multi-dimensional data can be rendered into a single, highly readable image.

## 2. Avoiding Visualization Bias
Data Visualization can easily be mathematically manipulated to lie.
If a bar chart's Y-Axis starts at 50 instead of 0, a 5% difference between two bars will visually look like a 500% difference. Data Scientists must adhere to strict mathematical integrity when designing visualizations, ensuring that the physical area or slope of the visual geometry accurately and proportionally represents the underlying mathematics.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Experiment design/index.mdx': `---
title: Experiment Design
description: The strict mathematical blueprint governing how an A/B test or scientific study is constructed to ensure statistically valid, unbiased results.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Experiment Design">

If you run an A/B test without strict mathematical Experiment Design, the results will be statistically meaningless (Noise). You must define the mathematical parameters before the experiment even begins.

## 1. Statistical Power and Sample Size
Before launching an experiment, a Data Scientist must mathematically calculate the required **Sample Size**.
If you only show the new red button to 10 users, and 5 click it, the sample size is mathematically too small to prove anything. 
Using a Power Calculation, the Data Scientist determines: "To mathematically detect a 1% increase in conversion, with 95% confidence, we must expose exactly 142,500 users to the red button." If you stop the experiment before reaching this mathematical threshold (called "Peeking"), you will generate a False Positive.

## 2. Defining the Primary Metric (OEC)
An experiment must have a single Overall Evaluation Criterion (OEC).
If you track 50 different metrics during an A/B test (Clicks, Time on Site, Scroll Depth, etc.), the mathematical laws of probability guarantee that at least one of them will randomly spike (the Multiple Comparisons Problem). By defining a single, mathematically rigorous OEC *before* the experiment, you prevent engineers from "cherry-picking" random metrics that happened to look good just to claim the experiment was a success.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Exploratory data analysis (EDA)/index.mdx': `---
title: Exploratory Data Analysis (EDA)
description: The initial, mathematically open-ended phase of Data Science where analysts use statistical summaries and visualizations to discover hidden patterns in raw data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Exploratory Data Analysis (EDA)">

Before a Data Scientist attempts to train a complex Machine Learning model, they must deeply understand the mathematical topology of the dataset. This is EDA.

## 1. Statistical Profiling
The first step of EDA is generating a mathematical profile of every single column.
For numerical columns, the scientist calculates the **Summary Statistics**: Mean, Median, Standard Deviation, Min, Max, and Quartiles. 
If the Mean is 50, but the Max is 9,000,000, the scientist instantly knows the data is mathematically skewed and contains extreme outliers that will destroy a standard regression model.

## 2. Correlation Matrices
To understand relationships, scientists generate a mathematically massive grid called a **Correlation Matrix**.
It compares every column against every other column, generating a Pearson Correlation Coefficient (a number between -1 and 1).
If "Square Footage" and "House Price" have a correlation of 0.95, they are mathematically nearly identical in terms of predictive power. If two input columns have a 0.99 correlation with *each other* (Multicollinearity), the scientist will mathematically drop one of them, because feeding redundant data into a Machine Learning model causes mathematical instability.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Feature engineering/index.mdx': `---
title: Feature Engineering
description: The mathematically creative process of transforming raw data columns into highly optimized, predictive signals designed specifically for Machine Learning algorithms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Feature Engineering">

Machine Learning algorithms are purely mathematical; they cannot understand context. Feature Engineering is the process of physically altering the data to make the hidden mathematical patterns obvious to the algorithm.

## 1. Mathematical Transformations
If a dataset contains a "Date of Birth" column (e.g., TICK11990-05-15TICK1), a neural network sees it as a useless string of text.
Through Feature Engineering, the Data Scientist applies a mathematical transformation: TICK1Current_Year - Birth_YearTICK1. They drop the Date column and create a brand new column called "Age" (TICK134TICK1). The algorithm can now mathematically understand the concept of Age, instantly increasing the model's predictive accuracy.

## 2. One-Hot Encoding
Algorithms cannot do math on categorical strings (like "Red", "Green", "Blue").
If you arbitrarily assign them numbers (Red=1, Green=2, Blue=3), the algorithm will mathematically assume that Blue is "greater than" Red, which destroys the model.
Instead, Data Scientists use **One-Hot Encoding**. They mathematically split the single column into three separate columns: TICK1is_redTICK1, TICK1is_greenTICK1, and TICK1is_blueTICK1. The values are purely binary (1 or 0). This mathematically perfectly represents categories to the algorithm without introducing false numerical hierarchy.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Jupyter/index.mdx': `---
title: Jupyter Notebooks
description: An interactive web-based mathematical environment that allows Data Scientists to weave raw Python code, rich text, and dynamic visualizations into a single document.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Jupyter"
  subtitle="Interactive Data Science Notebook"
  tags={['Python', 'Data Science', 'Analytics', 'Visualization']}
>

Jupyter (Julia, Python, and R) revolutionized Data Science by replacing traditional, monolithic script execution with a highly interactive, mathematically stateful Cell architecture.

## 1. The REPL Architecture
Traditional Python scripts execute top-to-bottom and exit. If an analysis takes 10 minutes to load the data, you must wait 10 minutes every time you tweak the code.
Jupyter uses a Read-Eval-Print Loop (REPL) backed by a persistent mathematical **Kernel**. 
The notebook is divided into "Cells." You can write code to load a 5GB dataset in Cell 1 and execute it. The Kernel mathematically holds that 5GB object in RAM permanently. You can then write analysis code in Cell 2 and execute it instantly, thousands of times, without ever reloading the data, resulting in massive mathematical efficiency.

## 2. Reproducible Research
Because Jupyter Notebooks (TICK1.ipynbTICK1) mathematically combine Markdown text, LaTeX equations, raw code, and the actual generated Charts into a single JSON file, they have become the absolute standard for sharing scientific research. A researcher can publish a Notebook, and anyone in the world can mathematically execute the exact same cells to verify the results.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Looker/index.mdx': `---
title: Looker
description: An enterprise Business Intelligence platform acquired by Google, famous for its proprietary LookML language that mathematically models raw SQL data for visualization.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Looker"
  subtitle="Enterprise BI and Data Modeling"
  tags={['BI', 'Data Visualization', 'SQL', 'GCP']}
>

Looker is not just a dashboarding tool; it is a mathematical semantic layer that sits between the Data Warehouse and the Business Users.

## 1. The LookML Semantic Layer
In traditional BI, every time an executive wants a dashboard, an analyst writes a massive, custom SQL query. This creates mathematical chaos, as two analysts might write slightly different SQL to calculate "Total Revenue," resulting in conflicting reports.
Looker forces engineers to use **LookML**. LookML mathematically defines exactly how tables join and exactly how metrics are calculated in a centralized, version-controlled repository. When a user clicks a button to generate a chart, Looker mathematically compiles the LookML into highly optimized SQL and executes it against the Data Warehouse. This guarantees absolute mathematical consistency across the entire company.

## 2. In-Database Architecture
Unlike Tableau, which often extracts data into its own proprietary memory engine, Looker operates mathematically in-place. It never extracts the data. It mathematically pushes all the complex aggregations down into the underlying Data Warehouse (like Snowflake or BigQuery). This makes Looker mathematically capable of querying Petabytes of data in real-time, limited only by the horsepower of the Warehouse itself.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Tableau/index.mdx': `---
title: Tableau
description: The industry-leading Business Intelligence and Data Visualization software, renowned for its highly intuitive, drag-and-drop mathematical interface.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Tableau"
  subtitle="Interactive Data Visualization"
  tags={['BI', 'Analytics', 'Visualization']}
>

Tableau abstracts the complex mathematics of Data Visualization behind a fluid, drag-and-drop interface, allowing non-technical analysts to explore massive datasets visually.

## 1. VizQL (Visual Query Language)
Under the hood, Tableau is powered by a proprietary mathematical translation engine called **VizQL**.
When an analyst drags a "Region" pill onto the Columns shelf and a "Sales" pill onto the Rows shelf, VizQL instantly mathematically translates that physical UI action into highly optimized SQL (or MDX). It sends the query to the database, receives the aggregated numbers, and mathematically renders the geometry (bars, maps, scatter plots) in milliseconds.

## 2. The Hyper Data Engine
While Tableau can query databases live, doing complex mathematics on slow SQL servers is painful.
Tableau solved this by inventing **Hyper**, an incredibly fast, proprietary, in-memory mathematical database. Analysts can mathematically extract billions of rows from their slow SQL server and compress them into a TICK1.hyperTICK1 file. The Hyper engine loads this directly into the server's RAM, allowing executives to filter and pivot massive dashboards in absolute real-time without ever hitting the production database.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/abstractive)/index.mdx': `---
title: Abstractive Summarization
description: A mathematically complex AI technique where a Neural Network actually comprehends a document and generates a brand new, human-like summary from scratch.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Abstractive Summarization">

In Natural Language Processing (NLP), there are two ways to summarize text. Extractive Summarization simply highlights and copies the most important sentences. Abstractive Summarization is mathematically far more advanced.

## 1. Mathematical Comprehension
Abstractive Summarization does not copy text. It uses massive Transformer architectures (like GPT or T5).
The model mathematically reads the entire document and compresses the conceptual meaning into a high-dimensional mathematical vector (the Latent Space). It then mathematically decodes that vector, generating entirely brand new sentences, using vocabulary and phrasing that did not physically exist in the original document. It is mathematically simulating human reading comprehension.

## 2. The Hallucination Problem
Because the Neural Network is mathematically generating new text based on probability distributions, it suffers from **Hallucinations**.
If the mathematical probabilities skew slightly, the model might generate a summary that includes facts that are completely contradictory to the original text. Solving this mathematical alignment problem is one of the most critical ongoing research areas in modern Artificial Intelligence.

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
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
