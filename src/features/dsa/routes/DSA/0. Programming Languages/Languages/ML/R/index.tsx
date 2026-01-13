import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'R evolves from S (1993)',
    detail:
      'R grew out of the S language at Bell Labs, focusing on statistical computing and graphics.',
  },
  {
    title: 'Base packages and formula syntax mature (1990s)',
    detail:
      'Core modeling functions and formula interfaces established R as the default statistics environment.',
  },
  {
    title: 'CRAN organizes packages (mid 1990s)',
    detail:
      'The Comprehensive R Archive Network standardized package distribution and documentation.',
  },
  {
    title: 'Tidyverse changes workflows (2010s)',
    detail:
      'dplyr, ggplot2, tidyr, and friends made data transformation and visualization consistent and expressive.',
  },
  {
    title: 'RStudio and notebooks mature (2010s-2020s)',
    detail:
      'IDE and report tools made R popular for reproducible research and analytics.',
  },
  {
    title: 'Quarto and modern tooling (2020s)',
    detail:
      'Quarto and improved package management streamlined publishing and team collaboration.',
  },
]

const mentalModels = [
  {
    title: 'Statistics-first language',
    detail:
      'R treats statistical modeling and visualization as first-class tasks rather than add-ons.',
  },
  {
    title: 'Dataframes as the core object',
    detail:
      'Tables are central. Most workflows start with dataframes and end with plots or model outputs.',
  },
  {
    title: 'Pipelines and verbs',
    detail:
      'The pipe operator connects data transformation verbs into readable, linear workflows.',
  },
  {
    title: 'Formula interfaces everywhere',
    detail:
      'Model definitions use formulas like y ~ x1 + x2, enabling expressive statistical specs.',
  },
  {
    title: 'NA-aware computing',
    detail:
      'Missing values are explicit and flow through functions unless handled.',
  },
]

const languageFundamentals = [
  {
    title: 'Interactive and interpreted',
    detail:
      'R evaluates expressions in an interactive session, favoring exploration and iteration.',
  },
  {
    title: 'Vectorized by default',
    detail:
      'Vectors, matrices, and data frames are the core types for numeric work.',
  },
  {
    title: 'Functional programming patterns',
    detail:
      'Functions are first-class; apply-family and purrr make transformations concise.',
  },
  {
    title: 'Non-standard evaluation',
    detail:
      'Tidyverse verbs capture expressions to build readable data pipelines.',
  },
]

const runtimePipeline = [
  {
    stage: 'Parse and evaluate',
    description: 'R parses code and evaluates expressions in the current environment.',
  },
  {
    stage: 'Bytecode execution',
    description: 'The interpreter executes bytecode for improved performance.',
  },
  {
    stage: 'Native extensions',
    description: 'Packages call C/C++/Fortran for heavy computation.',
  },
  {
    stage: 'Vectorized kernels',
    description: 'BLAS/LAPACK and compiled code power matrix operations.',
  },
]

const typeSystemDetails = [
  {
    title: 'Dynamic typing',
    detail:
      'Types are resolved at runtime, enabling flexible data structures and rapid prototyping.',
  },
  {
    title: 'Factors and categorical data',
    detail:
      'Factor levels control modeling behavior and plotting order.',
  },
  {
    title: 'S3 and S4 systems',
    detail:
      'Object systems provide polymorphism for models and predictions.',
  },
  {
    title: 'Tibbles vs data.frames',
    detail:
      'Tibbles provide stricter printing and avoid surprises with strings and row names.',
  },
]

const ecosystemPillars = [
  {
    heading: 'Data wrangling',
    bullets: [
      'dplyr for filtering, grouping, and summarizing.',
      'tidyr for reshaping and cleaning.',
      'data.table for fast, memory-efficient operations.',
    ],
  },
  {
    heading: 'Visualization',
    bullets: [
      'ggplot2 for layered statistical graphics.',
      'plotly for interactive charts.',
      'shiny for dashboards and web apps.',
    ],
  },
  {
    heading: 'Reporting and publishing',
    bullets: [
      'Quarto and R Markdown for reports.',
      'knitr for reproducible documents.',
      'flexdashboard for rapid dashboards.',
    ],
  },
  {
    heading: 'Statistical modeling',
    bullets: [
      'lm, glm, and survival models are built-in.',
      'caret and tidymodels standardize ML workflows.',
      'Mixed-effects models via lme4.',
    ],
  },
  {
    heading: 'Machine learning',
    bullets: [
      'xgboost and ranger for tree-based models.',
      'keras and torch bindings for deep learning.',
      'mlr3 for modular ML pipelines.',
    ],
  },
  {
    heading: 'MLOps and production',
    bullets: [
      'plumber for APIs and model endpoints.',
      'vetiver and pins for model packaging.',
      'targets for reproducible pipelines.',
    ],
  },
  {
    heading: 'Reproducible research',
    bullets: [
      'R Markdown and Quarto for reports.',
      'renv for dependency locking.',
      'Targets for reproducible pipelines.',
    ],
  },
  {
    heading: 'Interoperability',
    bullets: [
      'reticulate to call Python from R.',
      'Rcpp for C++ integration.',
      'Database connectors via DBI.',
    ],
  },
]

const performanceNotes = [
  {
    title: 'Vectorize when possible',
    detail:
      'Vectorized operations use optimized C loops behind the scenes and avoid per-row overhead.',
  },
  {
    title: 'Use data.table for large data',
    detail:
      'data.table is memory-efficient and fast for joins and aggregations.',
  },
  {
    title: 'Reduce object copies',
    detail:
      'Avoid repeated mutations on large frames; use in-place updates where supported.',
  },
  {
    title: 'Profile with profvis',
    detail:
      'Identify slow blocks and avoid premature optimization.',
  },
  {
    title: 'Avoid repeated copying',
    detail:
      'R often copies data frames; be mindful of large object manipulation.',
  },
  {
    title: 'Parallelize carefully',
    detail:
      'Use future or parallel for CPU-heavy tasks, but watch memory duplication.',
  },
]

const realWorldUses = [
  {
    context: 'Biostatistics and epidemiology',
    detail:
      'R is dominant in clinical studies, survival analysis, and statistical reporting.',
  },
  {
    context: 'Experiment analysis',
    detail:
      'A/B testing workflows and statistical power analyses are common use cases.',
  },
  {
    context: 'Data journalism',
    detail:
      'Analysts use R to clean data and produce publication-quality visuals.',
  },
  {
    context: 'Research and academia',
    detail:
      'R excels at reproducible notebooks and advanced statistical methods.',
  },
  {
    context: 'Financial analytics',
    detail:
      'Risk modeling and time-series analysis rely on R packages and diagnostics.',
  },
  {
    context: 'Public policy',
    detail:
      'Government and NGOs use R for survey analysis and impact evaluation.',
  },
]

const examples = [
  {
    title: 'Tidyverse pipeline for summaries',
    code: `library(dplyr)

sales %>%
  filter(region == "East") %>%
  group_by(product) %>%
  summarize(
    revenue = sum(price * units),
    avg_units = mean(units)
  ) %>%
  arrange(desc(revenue))`,
    explanation:
      'Pipelines connect readable verbs and avoid manual loops.',
  },
  {
    title: 'data.table aggregation',
    code: `library(data.table)

dt <- as.data.table(sales)
dt[region == "East", .(
  revenue = sum(price * units),
  avg_units = mean(units)
), by = product][order(-revenue)]`,
    explanation:
      'data.table provides fast, memory-efficient operations for large data.',
  },
  {
    title: 'ggplot2 visualization',
    code: `library(ggplot2)

ggplot(df, aes(x = age, y = income)) +
  geom_point(alpha = 0.4) +
  geom_smooth(method = "lm") +
  labs(title = "Income vs Age")`,
    explanation:
      'ggplot layers build plots with a consistent grammar of graphics.',
  },
  {
    title: 'Fit a logistic regression',
    code: `model <- glm(
  churn ~ tenure + monthly_charges + contract_type,
  data = customers,
  family = binomial()
)
summary(model)`,
    explanation:
      'GLM models are built-in and widely used for interpretable classification.',
  },
  {
    title: 'Tidymodels workflow sketch',
    code: `library(tidymodels)

split <- initial_split(df, prop = 0.8)
train <- training(split)
test <- testing(split)

rec <- recipe(target ~ ., data = train) %>%
  step_normalize(all_numeric_predictors())

model <- rand_forest(trees = 500) %>%
  set_engine("ranger") %>%
  set_mode("classification")

wf <- workflow() %>% add_recipe(rec) %>% add_model(model)
fit(wf, data = train)`,
    explanation:
      'Tidymodels standardizes preprocessing and model training.',
  },
  {
    title: 'Shiny dashboard sketch',
    code: `library(shiny)

ui <- fluidPage(
  sliderInput("bins", "Bins", 5, 50, 20),
  plotOutput("hist")
)

server <- function(input, output) {
  output$hist <- renderPlot({
    hist(faithful$eruptions, breaks = input$bins)
  })
}

shinyApp(ui, server)`,
    explanation:
      'Shiny turns R analyses into interactive dashboards.',
  },
]

const pitfalls = [
  'Ignoring factor levels and encoding, leading to incorrect model behavior.',
  'Accidentally converting strings to factors and breaking joins.',
  'Forgetting to set a random seed for reproducibility.',
  'Copying large data frames repeatedly and exhausting memory.',
  'Using base plots for complex visuals when ggplot offers clearer control.',
  'Silently dropping NAs, which can bias estimates if untracked.',
  'Overusing tidyverse abstractions in very large data without profiling.',
]

const decisionGuidance = [
  'Need advanced statistics and high-quality visuals: R is a great fit.',
  'Need reproducible reports and notebooks: R Markdown and Quarto are strong.',
  'Need large-scale production ML services: consider Python or mixed stacks.',
  'Need fast data manipulation at scale: learn data.table alongside tidyverse.',
  'Need integration with databases or Python: R has mature interop tooling.',
  'Need transparent model diagnostics and interpretability: R excels.',
]

const advancedInsights = [
  {
    title: 'Model interpretability',
    detail:
      'R shines in statistical modeling with rich diagnostics and summary tooling.',
  },
  {
    title: 'Functional programming tools',
    detail:
      'purrr and the apply family allow concise transformations without manual loops.',
  },
  {
    title: 'Report automation',
    detail:
      'Parameterized R Markdown reports make it easy to generate recurring analyses.',
  },
  {
    title: 'Package hygiene',
    detail:
      'Use renv or packrat to lock dependencies and prevent environment drift.',
  },
  {
    title: 'Bayesian modeling',
    detail:
      'rstan and brms provide advanced Bayesian inference with flexible modeling.',
  },
]

const takeaways = [
  'R is the leading language for statistical analysis and visualization.',
  'Dataframes and pipelines make data exploration fast and readable.',
  'Performance depends on vectorization and smart data handling.',
  'R excels in research, analytics, and report automation.',
  'Its ecosystem prioritizes transparency and statistical rigor.',
]

const toolingWorkflow = [
  {
    title: 'RStudio and Posit tools',
    detail:
      'Integrated IDE, notebooks, and project workflows streamline analysis.',
  },
  {
    title: 'Versioning and environments',
    detail:
      'renv snapshots package versions for reproducibility.',
  },
  {
    title: 'Testing and linting',
    detail:
      'testthat and lintr keep analysis code maintainable.',
  },
  {
    title: 'Reporting',
    detail:
      'Quarto and R Markdown publish PDFs, HTML, and slides.',
  },
]

const concurrencyOptions = [
  {
    title: 'future and furrr',
    detail:
      'High-level parallelism for map-style operations.',
  },
  {
    title: 'parallel package',
    detail:
      'Built-in clusters for multi-core computation.',
  },
  {
    title: 'data.table threading',
    detail:
      'Internal multi-threading speeds up joins and aggregations.',
  },
  {
    title: 'GPU via torch and keras',
    detail:
      'Deep learning packages offload compute to GPUs.',
  },
]

const interopOptions = [
  {
    title: 'Python via reticulate',
    detail:
      'Call Python libraries directly from R sessions.',
  },
  {
    title: 'C++ via Rcpp',
    detail:
      'Write fast native extensions while keeping R-facing APIs.',
  },
  {
    title: 'Databases via DBI',
    detail:
      'Connect to Postgres, BigQuery, and other data sources.',
  },
  {
    title: 'Spark integration',
    detail:
      'sparklyr connects R to distributed data processing.',
  },
]

const deploymentOptions = [
  {
    title: 'APIs and services',
    detail:
      'plumber turns R models into REST services.',
  },
  {
    title: 'Shiny hosting',
    detail:
      'Deploy dashboards via Posit Connect or Shiny Server.',
  },
  {
    title: 'Model packaging',
    detail:
      'vetiver and pins manage model artifacts and deployments.',
  },
  {
    title: 'Batch pipelines',
    detail:
      'targets and cron scheduling run recurring jobs.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to Python',
    detail:
      'R offers stronger built-in statistics and visualization, while Python dominates production ML.',
  },
  {
    title: 'Compared to Julia',
    detail:
      'R is more mature for statistics, while Julia provides higher numerical performance.',
  },
  {
    title: 'Compared to SAS',
    detail:
      'R is open-source with broader community packages, while SAS has enterprise tooling.',
  },
  {
    title: 'Compared to Excel',
    detail:
      'R is programmable and scalable for reproducible analysis.',
  },
]

const learningPath = [
  {
    title: 'Core R and data frames',
    detail:
      'Learn vectors, factors, data frames, and indexing.',
  },
  {
    title: 'Tidyverse fundamentals',
    detail:
      'Use dplyr, tidyr, and ggplot2 for clean analysis workflows.',
  },
  {
    title: 'Modeling basics',
    detail:
      'Apply linear and logistic regression with diagnostics.',
  },
  {
    title: 'Reproducible reporting',
    detail:
      'Build reports in Quarto or R Markdown.',
  },
  {
    title: 'Scaling and production',
    detail:
      'Explore data.table, targets, and API deployment.',
  },
]

export default function RPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">R</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Statistical computing with expressive data workflows</div>
              <p className="win95-text">
                R is purpose-built for statistics, data analysis, and visualization. It combines an interactive environment,
                an enormous ecosystem of statistical packages, and a culture of reproducible research, making it a mainstay
                in analytics and data science.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                R focuses on data exploration, statistical inference, and visualization. It excels when the goal is insight,
                model interpretability, and report-ready charts rather than raw system throughput.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Language fundamentals</legend>
            <div className="win95-grid win95-grid-2">
              {languageFundamentals.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Runtime pipeline</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>What happens</th>
                  </tr>
                </thead>
                <tbody>
                  {runtimePipeline.map((item) => (
                    <tr key={item.stage}>
                      <td>{item.stage}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Type system and data design</legend>
            <div className="win95-grid win95-grid-2">
              {typeSystemDetails.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: ecosystem pillars</legend>
            <div className="win95-grid win95-grid-3">
              {ecosystemPillars.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and workflow</legend>
            <div className="win95-grid win95-grid-2">
              {toolingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance checklist</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                R performance comes from vectorization and memory awareness. The fastest workflows keep data operations in
                optimized libraries rather than per-row loops.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Concurrency and parallelism</legend>
            <div className="win95-grid win95-grid-2">
              {concurrencyOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interoperability and deployment</legend>
            <div className="win95-grid win95-grid-2">
              {interopOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-2">
              {deploymentOptions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Comparisons and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {comparisonNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

