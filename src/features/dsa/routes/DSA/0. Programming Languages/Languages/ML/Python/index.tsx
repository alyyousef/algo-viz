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
    title: 'Deep learning acceleration (2010s-2020s)',
    detail:
      'Frameworks like TensorFlow and PyTorch made Python the main interface for GPU-accelerated ML.',
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
]

const pitfalls = [
  'Assuming Python loops are fast. Use vectorization or compiled extensions for heavy math.',
  'Ignoring reproducibility. Set random seeds and track package versions.',
  'Mixing incompatible array types (NumPy vs pandas vs Torch) without explicit conversion.',
  'Underestimating memory usage when copying large arrays and dataframes.',
  'Relying on the GIL for CPU-bound parallelism; use multiprocessing or native code.',
]

const decisionGuidance = [
  'Need fast prototyping and a huge ML ecosystem: Python is the default choice.',
  'Need direct control over GPU training workflows: Python frameworks are mature.',
  'Need high throughput numerical kernels: use vectorization, JIT, or native libraries.',
  'Need minimal dependencies and tiny binaries: consider lower-level options.',
  'Need strict static typing and compile-time guarantees: evaluate alternatives like Rust or Julia.',
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
    title: 'Mixed precision training',
    detail:
      'Using float16 or bfloat16 can accelerate training while saving memory, but requires careful loss scaling.',
  },
  {
    title: 'Model serving paths',
    detail:
      'Export models to ONNX or TorchScript to run in optimized runtimes outside Python.',
  },
]

const takeaways = [
  'Python is the lingua franca of ML thanks to its ecosystem and readability.',
  'Performance comes from vectorization and native extensions, not raw Python loops.',
  'Reproducibility and environment control are as important as model accuracy.',
  'Python excels at orchestrating ML systems even when heavy compute runs elsewhere.',
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

