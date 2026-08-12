import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/23. Data Science & Analytics/A-B testing/index.mdx': `---
title: A/B Testing
description: The rigorous statistical methodology of randomized controlled trials applied to software, measuring the causal impact of product changes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="A/B Testing">

In modern software development, you cannot rely on intuition to determine if a new feature increases revenue. **A/B Testing** is the application of Randomized Controlled Trials (the gold standard of medical research) to software engineering.

## 1. The Mathematical Framework
An A/B Test mathematically divides incoming traffic into two groups:
- **Control (Group A)**: The existing version of the software.
- **Variant (Group B)**: The software with the new feature (e.g., a red "Buy" button instead of blue).

### The Null Hypothesis ($H_0$)
To conduct the test, you mathematically assume the **Null Hypothesis**: "The red button and the blue button generate the exact same revenue. Any observed difference is purely due to random statistical noise."
The goal of the A/B test is to collect enough data to mathematically *reject* the null hypothesis.

## 2. Statistical Significance and p-values
You run the test for 2 weeks. Group A generates $10,000. Group B generates $10,500. 
Is the red button actually better, or did Group B simply happen to get a few wealthy customers by pure random chance?

To answer this, Data Scientists calculate the **p-value**.
- The p-value is the mathematical probability of seeing a $500 difference *if the Null Hypothesis were actually true*.
- If the p-value is 0.02 (2%), it means there is only a 2% chance this result is random noise. 
- Because 2% is less than the standard threshold of **Alpha ($\alpha = 0.05$)**, we reject the null hypothesis and declare the test **Statistically Significant**.

## 3. Common Pitfalls

### Peeking
If you calculate the p-value every single day, you will eventually hit statistical significance purely by random chance (the mathematical concept of false positives scaling with repeated testing). You must determine the **Sample Size** beforehand (using a Power Calculation) and absolutely refuse to look at the p-value until the test finishes.

### The Novelty Effect
When you change the UI, users often click the new button simply because it is different, causing a massive spike in metrics. After 3 weeks, the metrics plummet back to normal. If you run the A/B test for only 3 days, you will mathematically fall victim to the Novelty Effect.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Business intelligence (BI)/index.mdx': `---
title: Business Intelligence (BI)
description: The discipline of transforming massive datasets into actionable strategic insights through highly-optimized visual dashboards and reporting.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Business Intelligence (BI)">

**Business Intelligence (BI)** is the final layer of the Data Engineering pipeline. After data has been extracted, transformed, and loaded into a Data Warehouse, the BI layer is responsible for mathematically aggregating that data and presenting it to non-technical business leaders (CEOs, CFOs) to drive strategic decisions.

## 1. The Architecture of BI
BI is not simply "making charts". It is a complex architectural discipline.

### The Semantic Layer
If you ask the Sales team and the Marketing team to define "Active User", they will give you two different mathematical definitions. If they build their own dashboards directly on the raw tables, the CEO will see conflicting numbers.
Modern BI tools enforce a **Semantic Layer**—a centralized repository where the mathematical definition of every metric (e.g., TICK1Revenue = Gross_Sales - RefundsTICK1) is hardcoded. Dashboards pull from the Semantic Layer, ensuring absolute enterprise consistency.

### OLAP Cubes and Aggregation
To render a dashboard showing 10 years of revenue instantly, the BI tool cannot execute a raw TICK1SELECT SUM()TICK1 query over 5 billion rows every time the CEO opens the page. 
Historically, BI tools built **OLAP Cubes**—pre-calculating the mathematical aggregations across every possible dimension (Time, Geography, Product) and storing them in memory for instant retrieval.

## 2. Descriptive vs Predictive Analytics
BI is strictly focused on **Descriptive Analytics** and **Diagnostic Analytics**.
- *Descriptive*: "What happened?" (Revenue dropped by 15% last month).
- *Diagnostic*: "Why did it happen?" (Drilling down into the dashboard reveals the drop occurred entirely in the European market due to a localized server outage).

It does *not* do Predictive Analytics (Machine Learning). BI tells you the past; Data Science attempts to predict the future.

## 3. The Modern BI Tool Landscape
The industry is dominated by massive enterprise platforms:
- **Tableau (Salesforce)**: The gold standard for complex visual exploration.
- **Power BI (Microsoft)**: Deeply integrated into the Microsoft ecosystem, dominating the corporate enterprise space.
- **Looker (Google)**: Famous for its rigid semantic layer (LookML), forcing software engineering practices onto dashboard creation.
- **Metabase / Superset**: Lightweight, open-source alternatives for fast SQL-to-Chart generation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Causal inference/index.mdx': `---
title: Causal Inference
description: The advanced statistical discipline of mathematically proving cause-and-effect relationships from observational data when A/B testing is impossible.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Causal Inference">

"Correlation does not imply Causation."
Ice cream sales and shark attacks are highly correlated. However, buying ice cream does not cause shark attacks (they are both caused by a third variable: Summer weather).

In software, if you launch a new feature and revenue goes up, did the feature *cause* the revenue increase, or was it just a coincidence? The easiest way to prove causation is an **A/B Test** (Randomized Controlled Trial). 
However, A/B testing is often illegal, unethical, or mathematically impossible (you cannot A/B test a national television ad). In these scenarios, Data Scientists use **Causal Inference**.

## 1. Confounding Variables
A confounding variable is the hidden "Summer weather". It is a variable that mathematically influences both the Independent Variable (Treatment) and the Dependent Variable (Outcome).

If you want to measure if a new "Pro" subscription increases user retention, you look at observational data. You see that Pro users have a 90% retention rate, while Free users have a 40% retention rate. 
Does the Pro tier *cause* retention? 
No. The confounding variable is "User Wealth" or "User Engagement". Highly engaged users were already going to stay, and they are also the ones who bought the Pro tier.

## 2. Methods of Causal Inference

### Difference-in-Differences (DiD)
You launch a massive marketing campaign in New York (Treatment Group), but not in Chicago (Control Group). You cannot simply compare NY to Chicago, because NY might naturally have higher sales anyway.
Instead, you mathematically measure the *trend* before the campaign, and compare it to the *trend* after the campaign. If NY and Chicago were moving in parallel, and suddenly NY spikes drastically after the campaign, you can mathematically infer causality.

### Propensity Score Matching
If you cannot run an A/B test, you look at historical data and use Machine Learning to mathematically calculate the "Propensity" (probability) of a user receiving the treatment based on their demographics. You then pair a treated user with an untreated user who has the exact same propensity score, effectively mimicking a randomized A/B test using observational data.

### Synthetic Control
If a new law is passed in California, how do you measure its effect? There is only one California. 
You mathematically create a "Synthetic California" by blending the data of 5 other states (e.g., 40% Texas + 30% New York + 30% Oregon) that historically matched California's trends perfectly. You then compare the real California to the Synthetic California after the law passes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Tableau/index.mdx': `---
title: Tableau
description: The industry-leading enterprise BI platform renowned for its unparalleled drag-and-drop visual exploration and deep mathematical aggregations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Tableau">

Acquired by Salesforce for $15 Billion, **Tableau** is widely considered the gold standard for complex visual Data Analytics. It allows analysts to connect to massive Data Warehouses and mathematically explore petabytes of data without writing a single line of SQL.

## 1. VizQL (Visual Query Language)
Tableau's core mathematical innovation is **VizQL**. 
When a user drags the "Region" pill to the Columns shelf and the "Revenue" pill to the Rows shelf, Tableau does not just render a chart. It mathematically compiles those drag-and-drop actions into a highly-optimized SQL query.

It sends that SQL query to the underlying database (e.g., Snowflake), retrieves the aggregated results, and translates them into visual geometry. This abstraction allows non-technical users to execute incredibly complex mathematical GROUP BY and JOIN operations visually.

## 2. Hyper Data Engine
Executing raw SQL queries against a database for every click makes dashboards agonizingly slow.
Tableau solves this with **Hyper**, its proprietary in-memory Data Engine. 

Instead of executing live queries, Tableau mathematically extracts the data from the database and compresses it into a highly-optimized columnar TICK1.hyperTICK1 file stored locally in RAM on the Tableau Server. Because the data is stored in memory and mathematically structured specifically for Tableau's analytical processing, dashboards render in milliseconds, even when filtering 100 million rows.

## 3. Level of Detail (LOD) Expressions
The most powerful mathematical feature in Tableau is the **LOD Expression**.

If you are looking at a bar chart of Revenue by City, the "Level of Detail" of the chart is the City. 
What if you want to calculate what percentage of the *National* revenue that City represents? You need to mathematically escape the chart's current Level of Detail.

LOD expressions (TICK1FIXEDTICK1, TICK1INCLUDETICK1, TICK1EXCLUDETICK1) allow you to explicitly define the aggregation level, independent of what is currently dragged onto the visual canvas.
TICK3sql
-- A FIXED LOD calculation in Tableau
{ FIXED [Region] : SUM([Revenue]) }
TICK3
This mathematically forces Tableau to calculate the total revenue for the Region, even if the visual chart is only displaying data at the City level.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Data cleaning/index.mdx': `---
title: Data Cleaning
description: The rigorous mathematical process of identifying, correcting, and formatting corrupted or inaccurate records from a dataset.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Cleaning">

"Garbage In, Garbage Out."
If you train a massive Deep Learning model on a dataset containing corrupted strings, null values, and duplicate rows, the mathematical output of the model will be entirely worthless. Data Cleaning often consumes 80% of a Data Scientist's time.

## 1. Handling Duplicates
Duplicate records mathematically skew aggregations (like averages and sums) and destroy Machine Learning models by causing data leakage (if a duplicate row ends up in both the training set and the testing set).
- **Exact Duplicates**: Easily removed mathematically (e.g., TICK1df.drop_duplicates()TICK1 in Pandas).
- **Fuzzy Duplicates**: "John Doe" vs "J. Doe". This requires mathematical string distance algorithms (like Levenshtein distance) or clustering algorithms to identify and merge records.

## 2. Standardization and Formatting
Data scraped from the real world is chaotic.
- **Dates**: One system logs dates as TICK1MM/DD/YYYYTICK1, another as TICK1YYYY-MM-DDTICK1. Data cleaning requires mathematically converting all temporal data into strict ISO-8601 formats or Unix Timestamps.
- **Categorical Inconsistencies**: "New York", "NY", "new york", and "N.Y." must be mathematically mapped to a single standard categorical identifier to prevent the algorithm from treating them as 4 separate cities.
- **Data Type Casting**: Ensuring that a column containing "42.5" is mathematically cast as a Floating-Point number, not a String, so that numerical aggregations can be performed.

## 3. Structural Cleaning (Tidy Data)
Hadley Wickham defined the mathematical framework of **Tidy Data**:
1. Every variable must have its own column.
2. Every observation must have its own row.
3. Every value must have its own cell.

If you receive a spreadsheet where columns are years (TICK12020_RevenueTICK1, TICK12021_RevenueTICK1), this is structurally untidy. Data Cleaning requires using operations like TICK1MeltTICK1 or TICK1PivotTICK1 to physically restructure the matrix into three columns: TICK1CompanyTICK1, TICK1YearTICK1, and TICK1RevenueTICK1, making it mathematically viable for machine learning processing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Data collection/index.mdx': `---
title: Data Collection
description: The methodologies and architectures required to ethically and accurately harvest raw data from the real world into digital systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Collection">

Before Data Engineering can build pipelines, and before Data Science can build models, data must physically be collected. The mathematical accuracy and ethical sourcing of this data form the absolute foundation of the entire analytics ecosystem.

## 1. Modalities of Collection

### First-Party Telemetry
Data collected directly from your own software applications.
- **Event Tracking**: Software engineers instrument the frontend code (using tools like Segment or Snowplow) to emit a JSON payload every time a user clicks a button, scrolls a page, or watches a video. 
- **Database CDC**: Capturing the raw operational transactions (purchases, account creations) directly from the backend PostgreSQL databases via Change Data Capture.

### Web Scraping
Mathematically extracting unstructured data from external websites.
- Utilizing headless browsers (Puppeteer/Playwright) or HTML parsers (BeautifulSoup) to navigate DOM trees and extract text. This is heavily restricted by rate-limiting, CAPTCHAs, and legal boundaries (Terms of Service and Robots.txt).

### Third-Party APIs and Syndication
Purchasing or accessing structured data from external vendors.
- Examples include integrating the Stripe API for financial data, the Twitter Firehose for sentiment analysis, or purchasing massive demographic datasets from Nielsen or Experian.

## 2. Sampling Bias
The most critical mathematical danger in Data Collection is **Selection Bias**.
If you want to train an AI to recognize human faces, and you collect your data by scraping images from a Swedish university website, your dataset will be overwhelmingly white. If you deploy this model globally, it will mathematically fail to recognize people of color. 

Data Scientists must rigorously evaluate the data collection methodology to ensure the sample is mathematically representative of the true global population they intend to model.

## 3. Privacy and Compliance (GDPR/CCPA)
Modern data collection is strictly governed by international law.
- **Consent**: You cannot legally collect tracking cookies without explicit user consent.
- **Anonymization**: Collecting Personally Identifiable Information (PII) like Social Security Numbers or IP addresses requires mathematical hashing or tokenization. 
- **Right to be Forgotten**: The architecture must support the mathematical ability to completely purge a user's collected data upon request.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Data visualisation/index.mdx': `---
title: Data Visualization
description: The mathematical and psychological discipline of encoding quantitative data into visual geometry to expose patterns and insights.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Data Visualization">

The human brain cannot mathematically process a spreadsheet containing 10 million rows. **Data Visualization** leverages the brain's highly evolved visual cortex to instantly recognize trends, outliers, and patterns by encoding numbers into shapes, colors, and spatial positions.

## 1. The Grammar of Graphics
Developed by Leland Wilkinson, the **Grammar of Graphics** is the mathematical framework that underpins modern visualization libraries (like ggplot2 in R, or Altair in Python). 

It states that any chart can be mathematically deconstructed into orthogonal components:
- **Data**: The raw matrix of values.
- **Aesthetics (aes)**: The mathematical mapping of data to visual properties. (e.g., Mapping the "Revenue" column to the Y-axis, and the "Country" column to the Color).
- **Geometries (geom)**: The physical shapes rendered on screen (Bars, Points, Lines).
- **Facets**: Mathematically splitting a single chart into a grid of small multiples based on a categorical variable.

## 2. Encoding Effectiveness
Not all visual encodings are mathematically equal. Research by Cleveland and McGill proved that humans are highly accurate at decoding some visual properties, and terrible at others.

- **Most Accurate (Spatial)**: Position along a common scale (e.g., a Bar Chart or Scatter Plot). Humans can easily see if one bar is exactly twice as tall as another.
- **Moderate**: Length and Angle (e.g., a Pie Chart). Humans are notoriously bad at comparing angles, which is why Data Scientists aggressively avoid Pie Charts.
- **Least Accurate**: Color saturation and Area (e.g., a Heatmap or Bubble Chart). Humans cannot accurately determine if a bubble has exactly 3x the mathematical area of another bubble.

## 3. Deceptive Visualizations
Visualization can be used to mathematically lie.
- **Truncated Y-Axis**: Starting a bar chart's Y-axis at 50 instead of 0. This mathematically exaggerates a 1% difference between two bars, making it look like a 500% massive difference.
- **Cumulative Graphs**: Using a cumulative line chart (which mathematically can never go down) to mask the fact that daily new sales are actively crashing.
- **3D Charts**: Adding a 3D tilt to a Pie Chart mathematically warps the visual area of the slices, completely destroying the user's ability to judge the true proportions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Experiment design/index.mdx': `---
title: Experiment Design
description: The rigorous statistical methodology of structuring tests to ensure validity, minimize variance, and eliminate confounding variables.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Experiment Design">

Before executing an A/B Test or a clinical trial, the experiment must be mathematically designed. A poorly designed experiment will yield statistically significant results that are completely, mathematically false.

## 1. Randomization and Control
The absolute core of Experiment Design is the **Randomized Controlled Trial (RCT)**.
- **Control Group**: The baseline group that receives no treatment. This mathematically accounts for external variables (like a sudden economic recession) that might affect the metric regardless of your software.
- **Randomization**: Users must be assigned to groups using a mathematically uniform random hashing function (e.g., hashing their User ID). This ensures that confounding variables (like User Wealth) are evenly distributed between both groups.

## 2. Statistical Power and Sample Size
If you flip a coin 4 times and get 3 Heads, you cannot mathematically conclude the coin is rigged. The sample size is too small.

Before starting an experiment, Data Scientists execute a **Power Calculation** to determine exactly how many users they need to test.
- **Power ($1 - \beta$)**: The mathematical probability that the test will correctly detect a difference if a difference actually exists (usually set to 80%).
- **Minimum Detectable Effect (MDE)**: The smallest impact you care about. If you want to detect a massive 50% increase in revenue, you only need 1,000 users. If you want to detect a tiny 1% increase, the mathematics dictates you might need 5,000,000 users to overcome the statistical noise.

## 3. Network Effects and Interference
In social networks (like Facebook) or two-sided marketplaces (like Uber), standard A/B testing breaks down mathematically due to **Interference** (SUTVA violations).

If you give 50% of Uber drivers a new algorithm that makes them faster (Treatment Group), they will mathematically steal all the riders from the Control Group drivers. The Control Group's metrics will plummet, making the Treatment Group look artificially brilliant.

To solve this, companies design experiments using:
- **Cluster Randomization**: Instead of randomizing by Driver, you randomize by City. All of New York gets the treatment, all of Chicago gets the control.
- **Time-Split Testing**: Turning the algorithm ON globally for 1 hour, then OFF globally for 1 hour, alternating for weeks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Exploratory data analysis (EDA)/index.mdx': `---
title: Exploratory Data Analysis (EDA)
description: The critical first step in Data Science, utilizing statistical summaries and visualizations to understand the mathematical shape of a new dataset.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Exploratory Data Analysis (EDA)">

Coined by the legendary statistician John Tukey, **Exploratory Data Analysis (EDA)** is the mathematical detective work performed before any Machine Learning models are trained. It is the process of summarizing the main characteristics of a dataset, often using visual methods.

## 1. The Goal of EDA
You cannot blindly feed data into an AI algorithm. You must first mathematically understand the data.
- **Distribution**: Is the "Income" column normally distributed (a bell curve), or is it heavily right-skewed (a few billionaires pulling the average to infinity)?
- **Anomalies**: Are there impossible values? (e.g., a user with an age of -5, or a temperature of 9,000 degrees).
- **Correlations**: Does the "Square Footage" of a house highly correlate with the "Price"?

## 2. Univariate Analysis
Examining a single column mathematically in isolation.
- **Continuous Variables**: For numerical data (like Height), you calculate the mathematical Mean, Median, Standard Deviation, and Interquartile Range. You visualize it using **Histograms** or **Box Plots** to instantly identify outliers.
- **Categorical Variables**: For text data (like Country), you calculate the frequency counts and visualize it using **Bar Charts**.

## 3. Bivariate & Multivariate Analysis
Examining the mathematical relationships between multiple columns simultaneously.

### Correlation Matrices
Data Scientists mathematically compute the **Pearson Correlation Coefficient** (ranging from -1 to 1) for every single pair of numerical columns. 
- A correlation of 0.95 means the two variables move perfectly together. 
- A correlation of 0 means they have zero mathematical relationship.
This matrix is often visualized as a massive color-coded **Heatmap**.

### Scatter Plots
Plotting Variable A against Variable B. This is critical because the Pearson correlation only detects *linear* relationships. If Variable A and B have a perfect U-shaped *quadratic* relationship, the Pearson math will report a correlation of 0. The human eye looking at a Scatter Plot will instantly spot the U-shape.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Feature engineering/index.mdx': `---
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

  'src/features/kb/routes/KB/23. Data Science & Analytics/Jupyter/index.mdx': `---
title: Jupyter Notebooks
description: The ubiquitous interactive computing environment allowing Data Scientists to seamlessly blend executable Python code, rich mathematics, and visualizations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Jupyter Notebooks">

In traditional Software Engineering, you write a 1,000-line Python script, execute it, and wait for the final output. 
In Data Science, this is impossible. Training a model can take 5 hours. You cannot re-run the entire script just because you want to change the color of a Matplotlib chart.

Project **Jupyter** (Julia, Python, R) revolutionized the industry by introducing the interactive Notebook architecture.

## 1. The REPL Architecture
A Jupyter Notebook is mathematically split into **Cells**.
- **Code Cells**: Contain executable Python code.
- **Markdown Cells**: Contain rich text, LaTeX equations, and documentation.

### The Kernel
When you start a Notebook, it boots up a persistent background process called the **Kernel**. 
When you execute Cell 1 (which loads a massive 10GB dataset into a Pandas DataFrame), the Kernel executes it and mathematically holds that 10GB DataFrame in RAM. 
When you execute Cell 2, it instantly accesses that RAM. You can tweak and re-run Cell 2 a hundred times without ever re-loading the data.

## 2. The Dominance in Data Science
Jupyter is the absolute industry standard for Exploratory Data Analysis (EDA) and model prototyping because it allows for exploratory, non-linear coding. 
When you execute a cell containing a data visualization, the chart is rendered directly inline below the code, creating a beautiful narrative document blending logic, math, and visuals.

## 3. The Engineering Anti-Pattern
While brilliant for exploration, Jupyter Notebooks are considered an absolute nightmare for Production Software Engineering.
- **Hidden State**: Because cells can be executed out of order, the variables in memory might not mathematically match the code written on the screen. A Notebook that works perfectly for the Data Scientist might instantly crash when someone else clicks "Run All".
- **Version Control**: Notebooks are saved as massive JSON files (TICK1.ipynbTICK1) containing base64-encoded images. Standard Git diffs are completely unreadable, destroying CI/CD workflows.

Modern architectures (like Netflix's Papermill or Databricks Notebooks) attempt to bridge this gap by mathematically parametrizing and scheduling notebooks as production jobs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Looker/index.mdx': `---
title: Looker
description: Google's enterprise BI platform renowned for its strict semantic modeling layer (LookML) and heavy engineering-focused architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Looker">

Acquired by Google for $2.6 Billion, **Looker** is an enterprise Business Intelligence platform that fundamentally altered the architecture of dashboarding. Instead of focusing purely on drag-and-drop visuals like Tableau, Looker focuses entirely on mathematical governance and code-based semantic modeling.

## 1. LookML (The Semantic Layer)
In legacy BI tools, a business user could easily create a calculation on their specific dashboard that defined "Gross Profit" incorrectly, leading to boardroom disasters.

Looker completely prevents this by enforcing **LookML** (Looker Modeling Language). 
LookML is a Git-version-controlled codebase written by Data Engineers. It mathematically defines the exact relationships between tables, the join keys, and the exact mathematical formulas for every single business metric.

TICK3yaml
# LookML Example
view: orders {
  sql_table_name: public.orders ;;

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  measure: total_revenue {
    type: sum
    sql: ${TABLE}.revenue ;;
    value_format: "$#,##0.00"
  }
}
TICK3

Once the LookML code is merged and deployed, business users explore the data via the UI. When they click "Total Revenue", Looker mathematically references the LookML model, guarantees the exact correct SQL is generated, and ensures every single dashboard in the company reports the exact same number.

## 2. In-Database Execution
Unlike Tableau (which extracts data into its proprietary Hyper engine) or Power BI (which loads data into VertiPaq), Looker mathematically refuses to store data.

Looker operates 100% in-database. When a user interacts with a dashboard, Looker mathematically compiles the LookML into highly-optimized SQL dialects (e.g., Snowflake SQL or BigQuery SQL) and pushes the execution down into the Cloud Data Warehouse. 
This leverages the infinite compute power of modern cloud warehouses, ensuring Looker never becomes a processing bottleneck.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/23. Data Science & Analytics/Matplotlib/index.mdx': `---
title: Matplotlib
description: The foundational, highly-customizable, low-level plotting library for the Python data science ecosystem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Matplotlib">

**Matplotlib** is the undisputed grandfather of Python data visualization. Created by John Hunter in 2003, it was originally engineered to mathematically replicate the plotting capabilities of MATLAB in Python.

## 1. The Architecture
Matplotlib is a massive, highly-complex, low-level library. It does not magically understand your data; it forces you to manually construct the mathematical geometry of the chart pixel by pixel.

It operates on a dual-architecture hierarchy:
- **Figure**: The overall blank canvas. A single Figure can contain multiple sub-charts.
- **Axes**: The actual mathematical plotting area (the X/Y coordinate system).

TICK3python
import matplotlib.pyplot as plt

# Explicit Object-Oriented Architecture
fig, ax = plt.subplots()

# Mathematically mapping X and Y arrays to line geometry
ax.plot([1, 2, 3, 4], [10, 20, 25, 30], label='Revenue')

# Manually configuring the visual components
ax.set_title("Q1 Growth")
ax.set_xlabel("Weeks")
ax.set_ylabel("Dollars (USD)")
ax.legend()

plt.show()
TICK3

## 2. Strengths and Weaknesses
- **Absolute Control**: Because it is so low-level, you have absolute mathematical control over every single pixel. You can draw arbitrary lines, annotations, and shapes anywhere on the canvas. It is heavily used in academia to generate strict, publication-ready PDF charts for scientific journals.
- **Verbosity**: To create a complex, beautiful, multi-layered chart in Matplotlib can take 50 lines of highly verbose code. 
- **Static Output**: Matplotlib mathematically renders static images (PNG, SVG). It is completely non-interactive, making it useless for modern web dashboards (which require hovering, zooming, and tooltips).

## 3. The Foundation for Others
Because Matplotlib is so verbose, the Python ecosystem built higher-level abstractions directly on top of it.
Libraries like **Seaborn** or the native TICK1pandas.DataFrame.plot()TICK1 API do not reinvent the wheel; they mathematically translate simple commands into complex Matplotlib code under the hood, utilizing Matplotlib as their hidden rendering engine.

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
