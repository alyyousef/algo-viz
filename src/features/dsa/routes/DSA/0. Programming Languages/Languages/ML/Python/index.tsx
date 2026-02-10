import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Python created for readability (1991)',
    detail:
      'Guido van Rossum released Python with a focus on clear syntax and batteries-included standard libraries.',
  },
  {
    title: 'Python 2 era and ecosystem growth (2000s)',
    detail:
      'The language gained momentum with web frameworks and early numerical libraries that set the stage for ML.',
  },
  {
    title: 'Scientific stack forms (2000s)',
    detail:
      'NumPy, SciPy, and matplotlib built a foundation for numerical computing on top of Python.',
  },
  {
    title: 'Data science boom (2010s)',
    detail:
      'pandas, scikit-learn, and Jupyter notebooks turned Python into the default data science workflow.',
  },
  {
    title: 'Python 3 transition completes (2020)',
    detail:
      'The community converged on Python 3, enabling better typing, async patterns, and long-term maintenance.',
  },
  {
    title: 'Deep learning acceleration (2010s-2020s)',
    detail:
      'Frameworks like TensorFlow and PyTorch made Python the main interface for GPU-accelerated ML.',
  },
  {
    title: 'Modern packaging and tooling (2020s)',
    detail:
      'Tools like pip, Poetry, uv, and conda improved dependency management for production ML systems.',
  },
]

const mentalModels = [
  {
    title: 'Glue language for ML stacks',
    detail:
      'Python orchestrates high-performance libraries written in C, C++, or CUDA.',
  },
  {
    title: 'Readable pseudocode that runs',
    detail:
      'Python syntax is close to math and plain language, making models easy to prototype and share.',
  },
  {
    title: 'Vectors and tensors as core data',
    detail:
      'NumPy arrays and tensors are the workhorses; Python coordinates them while heavy lifting happens underneath.',
  },
  {
    title: 'Ecosystem-first productivity',
    detail:
      'The language is simple; the power comes from libraries that compose across the ML lifecycle.',
  },
]

const languageFundamentals = [
  {
    title: 'Dynamic, interpreted execution',
    detail:
      'Python executes code line by line in an interpreter, emphasizing flexibility over compile-time checks.',
  },
  {
    title: 'Batteries-included standard library',
    detail:
      'Networking, data formats, and tooling utilities reduce external dependencies for many workflows.',
  },
  {
    title: 'Everything is an object',
    detail:
      'Uniform object model enables introspection, dynamic attributes, and metaprogramming.',
  },
  {
    title: 'Readable control flow',
    detail:
      'Indentation-based blocks and clean syntax reduce boilerplate in data pipelines and models.',
  },
]

const runtimePipeline = [
  {
    stage: 'Parse and compile',
    description: 'Source code compiles to bytecode for the CPython VM.',
  },
  {
    stage: 'Bytecode execution',
    description: 'The interpreter loop executes bytecode instructions.',
  },
  {
    stage: 'C-extension dispatch',
    description: 'Vectorized NumPy/Torch calls jump into optimized native kernels.',
  },
  {
    stage: 'GPU kernels',
    description: 'CUDA/XLA kernels run on accelerators while Python coordinates.',
  },
]

const typingAndDesign = [
  {
    title: 'Dynamic typing',
    detail:
      'Types are checked at runtime, enabling fast iteration and flexible APIs.',
  },
  {
    title: 'Static hints via typing',
    detail:
      'Type hints help with tooling, linters, and IDEs without changing runtime behavior.',
  },
  {
    title: 'Validation libraries',
    detail:
      'Pydantic and attrs help enforce schemas at runtime and document expectations.',
  },
  {
    title: 'Protocol-driven design',
    detail:
      'Structural typing via protocols enables flexible interfaces across libraries.',
  },
]

const ecosystemPillars = [
  {
    heading: 'Numerical computing',
    bullets: [
      'NumPy for arrays and vectorized math.',
      'SciPy for optimization, signal processing, and statistics.',
      'Numba or Cython for compiling hot loops.',
    ],
  },
  {
    heading: 'Data engineering',
    bullets: [
      'pandas for tabular data and feature engineering.',
      'Apache Arrow, Polars, and Dask for large-scale data.',
      'I/O libraries for CSV, Parquet, and database connectors.',
    ],
  },
  {
    heading: 'Data pipelines',
    bullets: [
      'Prefect, Dagster, and Airflow for orchestration.',
      'Great Expectations and Pandera for data validation.',
      'Feast for feature stores and consistency.',
    ],
  },
  {
    heading: 'Machine learning',
    bullets: [
      'scikit-learn for classical ML algorithms.',
      'XGBoost, LightGBM, CatBoost for gradient boosting.',
      'ONNX for model portability and inference.',
    ],
  },
  {
    heading: 'Deep learning',
    bullets: [
      'PyTorch and TensorFlow for neural networks.',
      'JAX for accelerated, composable transformations.',
      'Lightning and Keras for high-level training loops.',
    ],
  },
  {
    heading: 'MLOps and serving',
    bullets: [
      'MLflow for experiments and model registry.',
      'FastAPI and BentoML for inference APIs.',
      'Ray for distributed training and serving.',
    ],
  },
  {
    heading: 'Visualization',
    bullets: [
      'matplotlib for core plotting.',
      'seaborn and plotly for statistical and interactive plots.',
      'Altair for declarative visualization.',
    ],
  },
  {
    heading: 'Experiment tracking',
    bullets: [
      'MLflow, Weights and Biases, and TensorBoard.',
      'Reproducible environments with venv, pip, and conda.',
      'Model packaging with pip wheels and Docker.',
    ],
  },
]

const performanceNotes = [
  {
    title: 'Vectorize hot paths',
    detail:
      'Use NumPy operations instead of Python loops to stay in optimized C routines.',
  },
  {
    title: 'Avoid per-row pandas operations',
    detail:
      'Prefer vectorized columns, groupby, or query-style operations over apply loops.',
  },
  {
    title: 'Profile before optimizing',
    detail:
      'Tools like cProfile and line_profiler identify real bottlenecks before refactors.',
  },
  {
    title: 'Use compiled extensions',
    detail:
      'Numba, Cython, or PyPy help when vectorization is not enough.',
  },
  {
    title: 'Mind the GIL',
    detail:
      'CPU-bound threads do not run in parallel under CPython. Use multiprocessing or native extensions for parallel CPU work.',
  },
  {
    title: 'Be intentional about memory',
    detail:
      'Large arrays copy easily; watch dtypes, views, and serialization overhead.',
  },
]

const realWorldUses = [
  {
    context: 'Data science and analytics',
    detail:
      'Python dominates exploratory analysis, feature engineering, and rapid modeling.',
  },
  {
    context: 'Machine learning production',
    detail:
      'Training pipelines, model serving APIs, and feature stores often start in Python.',
  },
  {
    context: 'Automation and pipelines',
    detail:
      'Python scripts coordinate ETL, data validation, and scheduled workflows.',
  },
  {
    context: 'Education and research',
    detail:
      'Readable syntax and rich libraries make it the default in many courses and labs.',
  },
  {
    context: 'Computer vision and NLP',
    detail:
      'Python frameworks and pretrained models power applied AI in products.',
  },
  {
    context: 'Scientific computing',
    detail:
      'Domain libraries for bioinformatics, physics, and geoscience accelerate discovery.',
  },
]

const examples = [
  {
    title: 'Vectorized preprocessing with NumPy',
    code: `import numpy as np

X = np.array([[1.2, 0.7], [2.5, 1.0], [3.1, 1.8]])
mean = X.mean(axis=0)
std = X.std(axis=0)
X_norm = (X - mean) / (std + 1e-8)`,
    explanation:
      'Vectorized operations keep computation in fast native code and avoid slow Python loops.',
  },
  {
    title: 'pandas feature engineering sketch',
    code: `import pandas as pd

df = pd.read_parquet("events.parquet")
df["day"] = pd.to_datetime(df["timestamp"]).dt.date
agg = df.groupby(["user_id", "day"]).agg(
  clicks=("event", "count"),
  spend=("amount", "sum"),
).reset_index()`,
    explanation:
      'Groupby and vectorized transforms keep data work efficient and expressive.',
  },
  {
    title: 'Train a simple classifier',
    code: `from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
import pandas as pd

df = pd.read_csv("iris.csv")
X = df.drop("species", axis=1)
y = df["species"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
pred = model.predict(X_test)
print(accuracy_score(y_test, pred))`,
    explanation:
      'scikit-learn exposes a uniform estimator API, making model training and evaluation straightforward.',
  },
  {
    title: 'PyTorch training step sketch',
    code: `import torch
from torch import nn

model = nn.Sequential(nn.Linear(10, 64), nn.ReLU(), nn.Linear(64, 2))
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

X = torch.randn(32, 10)
y = torch.randint(0, 2, (32,))
logits = model(X)
loss = loss_fn(logits, y)
loss.backward()
optimizer.step()`,
    explanation:
      'PyTorch exposes tensors and autograd while still letting you write Python control flow.',
  },
  {
    title: 'JAX jit for compiled speed',
    code: `import jax
import jax.numpy as jnp

@jax.jit
def softmax(x):
  e = jnp.exp(x - x.max())
  return e / e.sum()

softmax(jnp.array([1.0, 2.0, 3.0]))`,
    explanation:
      'JAX compiles Python-defined functions into optimized XLA kernels.',
  },
  {
    title: 'Profile a slow section',
    code: `import cProfile
import pstats

def pipeline():
  ...

with cProfile.Profile() as pr:
  pipeline()

pstats.Stats(pr).sort_stats("tottime").print_stats(10)`,
    explanation:
      'Profiling reveals the true bottlenecks before you rewrite code.',
  },
]

const pitfalls = [
  'Assuming Python loops are fast. Use vectorization or compiled extensions for heavy math.',
  'Ignoring reproducibility. Set random seeds and track package versions.',
  'Mixing incompatible array types (NumPy vs pandas vs Torch) without explicit conversion.',
  'Underestimating memory usage when copying large arrays and dataframes.',
  'Relying on the GIL for CPU-bound parallelism; use multiprocessing or native code.',
  'Data leakage from improper train-test splitting or feature generation.',
  'Version conflicts between CUDA, drivers, and ML frameworks.',
]

const decisionGuidance = [
  'Need fast prototyping and a huge ML ecosystem: Python is the default choice.',
  'Need direct control over GPU training workflows: Python frameworks are mature.',
  'Need high throughput numerical kernels: use vectorization, JIT, or native libraries.',
  'Need minimal dependencies and tiny binaries: consider lower-level options.',
  'Need strict static typing and compile-time guarantees: evaluate alternatives like Rust or Julia.',
  'Need best-in-class MLOps tooling: Python has the widest vendor support.',
]

const advancedInsights = [
  {
    title: 'Interoperability as a superpower',
    detail:
      'Python connects to C, C++, Java, and CUDA ecosystems, so you can leverage the best library for each task.',
  },
  {
    title: 'Packaging and environment control',
    detail:
      'Pin versions with lock files, use virtual environments, and containerize to keep ML runs reproducible.',
  },
  {
    title: 'Async for IO-heavy systems',
    detail:
      'asyncio enables high-concurrency data ingestion and API services without threads.',
  },
  {
    title: 'Mixed precision training',
    detail:
      'Using float16 or bfloat16 can accelerate training while saving memory, but requires careful loss scaling.',
  },
  {
    title: 'Model serving paths',
    detail:
      'Export models to ONNX or TorchScript to run in optimized runtimes outside Python.',
  },
  {
    title: 'Distributed training patterns',
    detail:
      'Data parallelism and sharding are often handled by libraries like DDP, Ray, or DeepSpeed.',
  },
]

const takeaways = [
  'Python is the lingua franca of ML thanks to its ecosystem and readability.',
  'Performance comes from vectorization and native extensions, not raw Python loops.',
  'Reproducibility and environment control are as important as model accuracy.',
  'Python excels at orchestrating ML systems even when heavy compute runs elsewhere.',
  'Its tooling spans every stage from data to deployment.',
]

const toolingWorkflow = [
  {
    title: 'Interactive notebooks',
    detail:
      'Jupyter and Colab support rapid exploration and communication.',
  },
  {
    title: 'Testing and quality',
    detail:
      'pytest, ruff, and mypy keep ML codebases maintainable.',
  },
  {
    title: 'Packaging and environments',
    detail:
      'Use venv/conda plus Poetry or uv for reproducible installs.',
  },
  {
    title: 'Experiment tracking',
    detail:
      'Track metrics and artifacts with MLflow, W&B, or TensorBoard.',
  },
]

const concurrencyOptions = [
  {
    title: 'asyncio',
    detail:
      'Best for IO-bound workloads like API calls and streaming data.',
  },
  {
    title: 'Multiprocessing',
    detail:
      'Bypasses the GIL for CPU-heavy tasks using multiple processes.',
  },
  {
    title: 'Native parallelism',
    detail:
      'NumPy, PyTorch, and XGBoost release the GIL inside native kernels.',
  },
  {
    title: 'Distributed systems',
    detail:
      'Ray, Dask, and Spark coordinate tasks across machines.',
  },
]

const interopOptions = [
  {
    title: 'C/C++ extensions',
    detail:
      'pybind11 and Cython expose native performance to Python APIs.',
  },
  {
    title: 'Rust bindings',
    detail:
      'PyO3 and maturin make it easy to ship fast Rust-backed modules.',
  },
  {
    title: 'JVM ecosystems',
    detail:
      'Py4J and JPype integrate with Java or Scala data platforms.',
  },
  {
    title: 'Web and JS',
    detail:
      'Pyodide and WebAssembly make Python usable in the browser.',
  },
]

const deploymentOptions = [
  {
    title: 'Batch inference',
    detail:
      'Schedule pipelines with Airflow or Prefect and write results to data warehouses.',
  },
  {
    title: 'Online serving',
    detail:
      'FastAPI, Flask, and BentoML expose models as low-latency APIs.',
  },
  {
    title: 'Model export',
    detail:
      'ONNX and TorchScript enable serving in non-Python runtimes.',
  },
  {
    title: 'Edge and embedded',
    detail:
      'Quantization and smaller runtimes help deploy to constrained devices.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to Julia',
    detail:
      'Python has a larger ecosystem, while Julia offers faster native numerical kernels with less glue.',
  },
  {
    title: 'Compared to R',
    detail:
      'Python is more general-purpose and better suited for production services.',
  },
  {
    title: 'Compared to C++',
    detail:
      'Python trades raw speed for developer productivity and library breadth.',
  },
  {
    title: 'Compared to Java',
    detail:
      'Python is more flexible for research; Java often wins in strict enterprise systems.',
  },
]

const learningPath = [
  {
    title: 'Core language and data structures',
    detail:
      'Master lists, dicts, functions, and modules before diving into ML libraries.',
  },
  {
    title: 'Numerical computing',
    detail:
      'Learn NumPy arrays, broadcasting, and vectorized thinking.',
  },
  {
    title: 'Classical ML stack',
    detail:
      'Use pandas and scikit-learn to build and evaluate models.',
  },
  {
    title: 'Deep learning fundamentals',
    detail:
      'Pick PyTorch or TensorFlow and learn autograd and training loops.',
  },
  {
    title: 'MLOps and deployment',
    detail:
      'Track experiments, build pipelines, and deploy models reliably.',
  },
]

const glossaryTerms = [
  {
    term: 'Orchestration layer',
    definition:
      'Python orchestrates high-performance libraries written in C, C++, or CUDA.',
  },
  {
    term: 'Batteries-included standard library',
    definition:
      'Networking, data formats, and tooling utilities reduce external dependencies for many workflows.',
  },
  {
    term: 'Type hints',
    definition:
      'Type hints help with tooling, linters, and IDEs without changing runtime behavior.',
  },
  {
    term: 'Vectorization',
    definition:
      'Use NumPy operations instead of Python loops to stay in optimized C routines.',
  },
  {
    term: 'GIL',
    definition:
      'CPU-bound threads do not run in parallel under CPython. Use multiprocessing or native extensions for parallel CPU work.',
  },
  {
    term: 'Model export',
    definition:
      'ONNX and TorchScript enable serving in non-Python runtimes.',
  },
  {
    term: 'Mixed precision',
    definition:
      'Using float16 or bfloat16 can accelerate training while saving memory, but requires careful loss scaling.',
  },
  {
    term: 'Protocol-driven design',
    definition:
      'Structural typing via protocols enables flexible interfaces across libraries.',
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
    { id: 'core-typing', label: 'Type System and Design' },
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

export default function PythonMlPage(): JSX.Element {
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
    document.title = `Python (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Python',
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
          <span className="win98-title-text">Python</span>
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
            <h1 className="win98-doc-title">Python</h1>
            <p>
              The ML workhorse language for experimentation, production, and tooling. Python powers most of the modern ML ecosystem.
              Its readable syntax makes models easy to express, while optimized libraries deliver high performance under the hood.
              This page highlights the history, ecosystem, and practical patterns that make Python the default choice for ML workflows.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Python succeeds in ML because it acts as the orchestration layer for high-performance native libraries.
                    Researchers prototype quickly in notebooks, then production systems reuse the same APIs with better data
                    pipelines and hardware.
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
                <section id="core-typing" className="win98-section">
                  <h2 className="win98-heading">Type System and Design</h2>
                  {typingAndDesign.map((item) => (
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
                    Python performance is about reducing interpreter work. Push heavy math into NumPy, PyTorch, or compiled
                    extensions, and keep the Python layer focused on orchestration and control flow.
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

