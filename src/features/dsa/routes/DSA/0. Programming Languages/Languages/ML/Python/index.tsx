import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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

export default function PythonMlPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Python</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The ML workhorse language for experimentation, production, and tooling</div>
              <p className="win95-text">
                Python powers most of the modern ML ecosystem. Its readable syntax makes models easy to express, while optimized
                libraries deliver high performance under the hood. This page highlights the history, ecosystem, and practical
                patterns that make Python the default choice for ML workflows.
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
                Python succeeds in ML because it acts as the orchestration layer for high-performance native libraries. Researchers
                prototype quickly in notebooks, then production systems reuse the same APIs with better data pipelines and hardware.
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
            <legend>Type system and design</legend>
            <div className="win95-grid win95-grid-2">
              {typingAndDesign.map((item) => (
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
                Python performance is about reducing interpreter work. Push heavy math into NumPy, PyTorch, or compiled extensions,
                and keep the Python layer focused on orchestration and control flow.
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

