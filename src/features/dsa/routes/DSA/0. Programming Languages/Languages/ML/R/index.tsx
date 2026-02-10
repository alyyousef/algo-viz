import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const glossaryTerms = [
  {
    term: 'Dataframes',
    definition:
      'Tables are central. Most workflows start with dataframes and end with plots or model outputs.',
  },
  {
    term: 'Formula interface',
    definition:
      'Model definitions use formulas like y ~ x1 + x2, enabling expressive statistical specs.',
  },
  {
    term: 'Tidyverse',
    definition:
      'dplyr, ggplot2, tidyr, and friends made data transformation and visualization consistent and expressive.',
  },
  {
    term: 'Factors',
    definition:
      'Factor levels control modeling behavior and plotting order.',
  },
  {
    term: 'Vectorization',
    definition:
      'Vectorized operations use optimized C loops behind the scenes and avoid per-row overhead.',
  },
  {
    term: 'Reproducible research',
    definition:
      'R Markdown and Quarto enable reports that combine code, results, and narrative.',
  },
  {
    term: 'renv',
    definition:
      'renv snapshots package versions for reproducibility.',
  },
  {
    term: 'Interoperability',
    definition:
      'reticulate to call Python from R. Rcpp for C++ integration. Database connectors via DBI.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-realworld', label: 'Real-World Applications' },
    { id: 'bp-decision', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Core Mental Models' },
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-runtime', label: 'Runtime Pipeline' },
    { id: 'core-types', label: 'Type System and Data Design' },
    { id: 'core-ecosystem', label: 'Ecosystem Pillars' },
    { id: 'core-tooling', label: 'Tooling and Workflow' },
    { id: 'core-performance', label: 'Performance Checklist' },
    { id: 'core-concurrency', label: 'Concurrency and Parallelism' },
    { id: 'core-interop', label: 'Interoperability' },
    { id: 'core-deploy', label: 'Deployment Paths' },
    { id: 'core-comparisons', label: 'Comparisons and Tradeoffs' },
    { id: 'core-learning', label: 'Learning Path' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function RPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `R (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'R',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">R</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">R</h1>
            <p>
              Statistical computing with expressive data workflows. R is purpose-built for statistics, data analysis, and
              visualization. It combines an interactive environment, an enormous ecosystem of statistical packages, and a culture
              of reproducible research, making it a mainstay in analytics and data science.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    R focuses on data exploration, statistical inference, and visualization. It excels when the goal is insight,
                    model interpretability, and report-ready charts rather than raw system throughput.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-realworld" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-decision" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-models" className="win98-section">
                  <h2 className="win98-heading">Core Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-fundamentals" className="win98-section">
                  <h2 className="win98-heading">Language Fundamentals</h2>
                  {languageFundamentals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-runtime" className="win98-section">
                  <h2 className="win98-heading">Runtime Pipeline</h2>
                  {runtimePipeline.map((item) => (
                    <p key={item.stage}>
                      <strong>{item.stage}:</strong> {item.description}
                    </p>
                  ))}
                </section>
                <section id="core-types" className="win98-section">
                  <h2 className="win98-heading">Type System and Data Design</h2>
                  {typeSystemDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-ecosystem" className="win98-section">
                  <h2 className="win98-heading">Ecosystem Pillars</h2>
                  {ecosystemPillars.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-tooling" className="win98-section">
                  <h2 className="win98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Checklist</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    R performance comes from vectorization and memory awareness. The fastest workflows keep data operations in
                    optimized libraries rather than per-row loops.
                  </p>
                </section>
                <section id="core-concurrency" className="win98-section">
                  <h2 className="win98-heading">Concurrency and Parallelism</h2>
                  {concurrencyOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-interop" className="win98-section">
                  <h2 className="win98-heading">Interoperability</h2>
                  {interopOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-deploy" className="win98-section">
                  <h2 className="win98-heading">Deployment Paths</h2>
                  {deploymentOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-comparisons" className="win98-section">
                  <h2 className="win98-heading">Comparisons and Tradeoffs</h2>
                  {comparisonNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning" className="win98-section">
                  <h2 className="win98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="win98-section">
                <h2 className="win98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="win98-subheading">{example.title}</h3>
                    <div className="win98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

