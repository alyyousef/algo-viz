import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  takeaway: string
}

const DATA_FRAMEWORKS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks/data'

const frameworkDirectory = ['PyTorch', 'Scikit-learn', 'TensorFlow', 'XGBoost']

const introParagraphs = [
  'Data and ML Frameworks is the overview page for the part of Languages & Ecosystems that focuses on training systems, numerical computation stacks, model-building workflows, and the tools used to move from raw data to predictive or generative models.',
  'These frameworks are still frameworks even when they are presented as scientific computing libraries. They define model abstractions, training loops, data pipelines, tensor operations, experiment structure, serialization behavior, hardware integration, and the surrounding workflow for turning data into usable systems.',
  'Use this page as a guide to the ecosystem-level ideas behind machine learning and data frameworks before drilling into a specific tool such as PyTorch, TensorFlow, Scikit-learn, or XGBoost.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'data98-overview',
    title: 'Overview',
    paragraphs: [
      'Data and ML frameworks are structured systems for building analytics workflows, feature pipelines, classical machine learning models, deep learning systems, and training or inference programs that depend on numerical computation. They organize how data is represented, transformed, fed into models, optimized, evaluated, serialized, and deployed.',
      'They are frameworks because they do more than provide isolated algorithms. They define abstractions such as tensors, datasets, estimators, computational graphs, modules, training loops, optimizers, metrics, and model artifacts. Once a team adopts one, that abstraction model shapes the whole workflow from experimentation to production.',
      'This makes framework choice consequential in data work. It affects how reproducible experiments are, how easily models can move between research and serving, how much hardware acceleration is available, how teams debug training behavior, and how maintainable the broader ML platform becomes.',
    ],
  },
  {
    id: 'data98-why',
    title: 'Why Data and ML Frameworks Matter',
    paragraphs: [
      'Without frameworks, data and ML work quickly becomes a pile of custom scripts, one-off notebooks, inconsistent feature transforms, and ad hoc evaluation logic. Frameworks matter because they provide repeatable structure for the parts of the workflow that recur: loading data, fitting models, measuring quality, saving artifacts, and reusing the same logic later.',
      'They also matter because the data workflow is usually broader than model code alone. There are train-test boundaries, feature preprocessing, hardware concerns, distributed execution, experiment tracking, hyperparameter search, and deployment constraints. A framework helps turn that workflow into something more coherent and less fragile.',
      'The deeper reason they matter is that model quality depends on process quality. Reproducibility, validation discipline, consistent evaluation, and clean experiment boundaries are often more important than any single algorithm choice.',
    ],
    bullets: [
      'They reduce repeated numerical and modeling boilerplate.',
      'They standardize training, evaluation, and serialization workflows.',
      'They help teams move from experimentation toward repeatable systems.',
      'They expose hardware acceleration and optimized computation models.',
      'They influence reproducibility, maintainability, and deployment fit.',
    ],
  },
  {
    id: 'data98-what-they-solve',
    title: 'What These Frameworks Usually Solve',
    paragraphs: [
      'Data and ML frameworks exist because model-building work contains repeating categories of complexity. Teams need ways to represent datasets, vectorize transforms, define models, train them, evaluate them honestly, tune parameters, save outputs, and later serve or retrain them without rebuilding every step from scratch.',
      'Different frameworks solve different slices of this landscape. Scikit-learn focuses strongly on classical ML workflows and clean estimator interfaces. XGBoost focuses on efficient gradient boosting. TensorFlow and PyTorch focus more heavily on deep learning, automatic differentiation, and hardware-accelerated tensor computation. The broader category also includes data-processing and orchestration frameworks, even when this subsection is currently centered on model frameworks.',
    ],
    bullets: [
      'Dataset representation and preprocessing.',
      'Model definition and parameterization.',
      'Optimization and training loops.',
      'Evaluation, metrics, and validation discipline.',
      'Hardware acceleration and large-scale computation.',
      'Model serialization, portability, and inference pathways.',
    ],
  },
  {
    id: 'data98-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'A useful mental model is that data and ML frameworks are computation-and-workflow frameworks for turning data into a trained or fitted system. They own some combination of array operations, model structure, optimization rules, estimator APIs, feature transformation pipelines, and artifact boundaries.',
      'That means they are not only about algorithms. They are also about lifecycle: how data enters the pipeline, how model state is updated, how evaluation is separated from training, how experiments are compared, and how a trained artifact is reused later.',
      'The right comparison question is therefore not simply which framework is fastest or most popular. It is which framework gives the right workflow structure for the kind of modeling, team habits, and production path the system actually needs.',
    ],
  },
  {
    id: 'data98-landscape',
    title: 'Framework Landscape in This Section',
    paragraphs: [
      'This subsection currently includes four concrete reference pages representing major parts of the model-framework ecosystem. Together they cover deep learning, classical machine learning, and high-performance gradient boosting as common starting points for comparing data and ML workflow styles.',
    ],
    bullets: frameworkDirectory,
  },
  {
    id: 'data98-why-hard',
    title: 'Why This Domain Feels Hard',
    paragraphs: [
      'Data and ML frameworks feel hard because they sit at the intersection of statistics, software engineering, numerical computing, and product requirements. It is not enough to write code that runs. Teams also need to think about leakage, evaluation bias, feature drift, optimization stability, hardware limits, and whether the trained model solves the real problem.',
      'The second reason is that much of the complexity is indirect. A model can appear to work in a notebook and still fail under production distribution shifts, hidden data-quality issues, weak labels, or poorly designed evaluation. Frameworks help impose structure, but they do not remove the need for sound reasoning.',
      'This is why strong teams treat ML frameworks as part of a larger system of experimentation, measurement, data quality, and deployment discipline rather than as magic model factories.',
    ],
  },
  {
    id: 'data98-when-to-use',
    title: 'When These Frameworks Are the Right Tool',
    paragraphs: [
      'Data and ML frameworks are the right tool when the problem genuinely benefits from data-driven modeling and when the team needs repeatable ways to experiment, validate, and reuse learned behavior. They are especially useful when the same preprocessing, fitting, and evaluation patterns appear repeatedly across projects or services.',
      'They also become valuable when hardware acceleration, large datasets, or model-composition abstractions would be too expensive to build from primitives. In those cases, the framework is not convenience alone. It is the practical way to work at all.',
    ],
  },
  {
    id: 'data98-when-not-to-use',
    title: 'Where They Can Hurt',
    paragraphs: [
      'These frameworks can hurt when teams use them where simple rules, SQL logic, or straightforward analytics would have been enough. A model framework adds complexity in data management, validation, retraining, and observability. If the product problem does not benefit materially from learned behavior, that complexity may not be justified.',
      'They also hurt when people adopt a powerful framework and then treat it as a substitute for proper data understanding. No framework compensates for weak labels, poor feature design, invalid evaluation, or unclear success criteria.',
      'The real question is not whether ML frameworks are impressive. It is whether they make the specific system more effective and maintainable than simpler alternatives.',
    ],
  },
  {
    id: 'data98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'This page provides a roadmap for the subsection and keeps deeper follow-on topics aligned with the same coverage goals.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'data98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Data and ML frameworks are workflow frameworks for numerical modeling, not just algorithm collections. Their value comes from structuring preprocessing, training, evaluation, optimization, and artifact handling in ways that can be repeated and improved over time.',
      'Good framework choices depend on model type, team workflow, production path, and the need for hardware acceleration or estimator simplicity. The right tool is the one that makes sound experimentation and reliable deployment easier, not just the one with the loudest ecosystem.',
    ],
    bullets: [
      'Treat ML frameworks as system-design choices, not only coding conveniences.',
      'Prefer workflows that keep training, evaluation, and serving boundaries clear.',
      'Choose the framework that matches the modeling problem and team habits.',
      'Remember that data quality and evaluation discipline matter more than hype.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'data98-representation',
    title: 'Data Representation and Preprocessing',
    paragraphs: [
      'A data framework needs a way to represent inputs consistently. That includes tabular matrices, tensors, sparse structures, labels, batches, and feature transforms. The representation model matters because it shapes how easily the framework can compose preprocessing with training and inference.',
      'Scikit-learn often emphasizes explicit preprocessing pipelines for tabular work. Deep learning frameworks emphasize tensor-centric representations that generalize across images, sequences, embeddings, and multimodal data. The important question is whether the framework makes data boundaries explicit and reusable.',
      'Good preprocessing support is not cosmetic. It is where leakage prevention, feature consistency, normalization, encoding, and reproducibility often live.',
    ],
  },
  {
    id: 'data98-model-abstractions',
    title: 'Model Abstractions and API Shape',
    paragraphs: [
      'Different frameworks expose different mental models for model construction. Scikit-learn uses estimators with fit and predict style contracts. XGBoost focuses on high-performance gradient-boosted tree training. TensorFlow and PyTorch emphasize graph or module-based tensor computation with automatic differentiation and optimizer-driven updates.',
      'These abstractions matter because they influence how much work is explicit, how custom models are expressed, and how easily the framework handles common versus unusual tasks. A clean estimator interface can accelerate classical modeling. A flexible tensor graph can enable architectures that would be awkward in simpler abstractions.',
      'The practical question is whether the framework abstraction matches the shape of the modeling work rather than forcing every problem into one style unnecessarily.',
    ],
  },
  {
    id: 'data98-training',
    title: 'Training Loops and Optimization',
    paragraphs: [
      'A major distinction among data and ML frameworks is how training happens. Some frameworks hide most of the training loop behind fit-style APIs. Others expose the loop more directly so developers can control batching, gradient computation, optimizer steps, clipping, scheduling, and checkpointing.',
      'This tradeoff is important. A hidden loop can be excellent for common supervised workflows and faster iteration. An explicit loop can be essential when models or losses are unconventional, when debugging optimization behavior matters, or when the training process itself is research-heavy.',
      'Framework choice here is partly a question of control. How much of the optimization process does the team need to inspect or customize?',
    ],
  },
  {
    id: 'data98-evaluation',
    title: 'Evaluation, Metrics, and Validation Discipline',
    paragraphs: [
      'Frameworks do not eliminate the need for valid evaluation, but they strongly influence how easy it is to perform. Cross-validation helpers, train-test split utilities, metric modules, callback hooks, and experiment-friendly APIs all help teams evaluate models more consistently.',
      'The key architectural boundary is separating training from evaluation honestly. Metrics that look strong on leaked data or weakly separated validation sets are worse than useless. Good data frameworks support disciplined evaluation rather than encouraging accidental optimism.',
      'This is one reason why simple estimator-style frameworks remain valuable. They often make sound validation patterns easier to apply consistently across ordinary workloads.',
    ],
  },
  {
    id: 'data98-hardware',
    title: 'Numerical Computation and Hardware Acceleration',
    paragraphs: [
      'Many data and ML workloads are computationally heavy, so framework value often depends on optimized numerical kernels, vectorized operations, GPU support, mixed precision options, and distributed execution pathways. Deep learning frameworks are especially shaped by this concern.',
      'The abstraction around tensors and computation graphs is not only a mathematical convenience. It is also a route to efficient execution on accelerators. A framework that makes hardware use straightforward can unlock model classes and iteration speeds that would otherwise be impractical.',
      'At the same time, hardware support adds system complexity. Device placement, memory pressure, precision tradeoffs, and distributed synchronization become part of normal engineering work once the workload scales.',
    ],
  },
  {
    id: 'data98-pipelines',
    title: 'Pipelines, Composition, and Reuse',
    paragraphs: [
      'Real-world ML systems need more than isolated training scripts. They need repeatable pipelines for preprocessing, feature extraction, fitting, evaluation, serialization, and later inference or retraining. Framework quality often shows up in how well those parts compose.',
      'Scikit-learn pipelines are a classic example of frameworking composition for tabular workflows. In deep learning ecosystems, composition may show up as modular datasets, model modules, trainer scaffolding, callbacks, or export flows. The underlying theme is the same: repeated workflow pieces should be reusable and testable.',
      'Pipelines matter because they reduce the gap between research code and maintainable application code.',
    ],
  },
  {
    id: 'data98-artifacts',
    title: 'Serialization, Checkpoints, and Model Artifacts',
    paragraphs: [
      'A framework is also responsible for how trained state leaves memory and becomes an artifact. Checkpoints, model weights, preprocessing metadata, exported graphs, saved estimators, and versioned feature configurations all matter if the model is going to be reused later.',
      'Artifact quality affects reproducibility and deployment. A saved model without the right preprocessing assumptions, framework version context, or evaluation metadata can become difficult to trust or even impossible to serve correctly.',
      'This is why serialization is not a minor detail. In many teams it is the boundary between experimentation and operational use.',
    ],
  },
  {
    id: 'data98-experiments',
    title: 'Experimentation and Iteration Workflow',
    paragraphs: [
      'Data work is iterative by nature. Teams try model families, tune hyperparameters, compare feature variants, inspect failure cases, and revisit assumptions about labels and targets. Frameworks influence how easy this experimentation cycle feels.',
      'A good framework does not need to include every experiment-tracking tool directly, but it should fit naturally with repeatable experimentation. That means predictable APIs, composable components, reproducible randomness controls where relevant, and easy ways to compare models and metrics.',
      'When experimentation is chaotic, framework usage tends to become chaotic too. The framework helps most when it lowers the cost of disciplined iteration.',
    ],
  },
  {
    id: 'data98-production',
    title: 'Training-to-Serving Boundary',
    paragraphs: [
      'A recurring challenge in ML systems is crossing the line from training code to production use. The serving environment may have latency constraints, different hardware, limited memory, or stricter reproducibility requirements than the training environment.',
      'Framework selection affects this directly. Some tools make exported models and serving pathways relatively straightforward. Others are strongest in research or fitting ergonomics but need additional tooling to move cleanly into production.',
      'The important architectural question is not only whether a model can be trained. It is whether the training framework leaves behind artifacts, preprocessing assumptions, and interfaces that can be served safely later.',
    ],
  },
  {
    id: 'data98-operations',
    title: 'Operational and Organizational Concerns',
    paragraphs: [
      'Data and ML frameworks also create operational obligations: retraining schedules, feature consistency, model monitoring, drift detection, inference cost, hardware allocation, and reproducibility across environments. Teams should evaluate whether the framework fits the actual operational model of the organization.',
      'This includes softer questions too. How easy is it to onboard new engineers? How mature is the documentation? How stable is the ecosystem? How painful are upgrades? How many custom abstractions will the team need to build on top of the framework?',
      'A framework can be technically powerful and still be the wrong organizational choice if it creates too much workflow friction for the team that has to live with it.',
    ],
  },
  {
    id: 'data98-comparisons',
    title: 'Compare and Contrast',
    paragraphs: [
      'Scikit-learn versus PyTorch is usually a comparison between estimator-centric classical ML workflows and tensor-centric model-building workflows. TensorFlow versus PyTorch is often a comparison of deep learning ecosystems, execution models, tooling preferences, and production pathways. XGBoost versus neural frameworks is often really a problem-shape comparison: boosted trees versus learned representations on different data types.',
      'The useful comparison is therefore by workload and abstraction. Is the problem tabular? Does the team need deep custom models? Is hardware acceleration central? Does interpretability matter more than architectural flexibility? The names only become meaningful after those questions are answered.',
      'This is why framework selection in ML is not a general popularity contest. It is a modeling and workflow fit question.',
    ],
  },
  {
    id: 'data98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Recurring mistakes include using a deep learning framework for simple tabular problems that did not need it, relying on notebook state instead of reproducible pipelines, confusing validation success with generalization, and treating framework power as a substitute for data understanding.',
      'Another common failure mode is production myopia in the opposite direction: choosing a framework only for training convenience and only later discovering that serving, export, reproducibility, or retraining workflows are brittle.',
    ],
    bullets: [
      'Picking the framework because it is fashionable rather than appropriate.',
      'Ignoring preprocessing consistency between training and inference.',
      'Allowing evaluation leakage or weak train-validation separation.',
      'Treating notebooks as the whole system architecture.',
      'Overlooking artifact versioning and deployment boundaries.',
    ],
  },
  {
    id: 'data98-selection',
    title: 'Selection Checklist',
    paragraphs: [
      'When choosing a data or ML framework, start with the problem shape. Is the data mostly tabular, image, sequence, embedding-based, graph-structured, or multimodal? Are you fitting standard estimators or building custom deep architectures? Do you need GPU acceleration, distributed training, or straightforward classical baselines?',
      'Then move to workflow questions. How much experimentation flexibility is required? How important are production export paths? How experienced is the team with tensor-based training? Does the framework support the right balance of control, readability, and deployment fit?',
    ],
    bullets: [
      'Does the framework match the actual model family you need?',
      'Do you need estimator simplicity or low-level training control?',
      'How important are GPU support and scaling pathways?',
      'Can the framework support reproducible preprocessing and evaluation?',
      'Will the resulting artifacts be practical to serve and maintain?',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'data98-example-sklearn',
    title: 'Example: Classical ML Pipeline with Scikit-learn',
    description: [
      'Estimator-centric frameworks make tabular workflows compact and explicit. A preprocessing step and model can be combined into one reusable pipeline that trains and predicts consistently.',
      'This kind of structure is why classical ML frameworks remain valuable for many production problems.',
    ],
    code: `pipeline = Pipeline([
  ("scale", StandardScaler()),
  ("model", LogisticRegression())
])

pipeline.fit(X_train, y_train)`,
    takeaway:
      'Framework value often comes from keeping preprocessing and fitting in one repeatable contract.',
  },
  {
    id: 'data98-example-pytorch',
    title: 'Example: Explicit Training Loop in PyTorch',
    description: [
      'Deep learning frameworks often expose the optimization loop more directly. This gives the team fine-grained control over batching, gradients, optimizer steps, and model debugging.',
      'That flexibility is useful when the training process itself is part of the problem.',
    ],
    code: `for batch_x, batch_y in loader:
  optimizer.zero_grad()
  preds = model(batch_x)
  loss = criterion(preds, batch_y)
  loss.backward()
  optimizer.step()`,
    takeaway:
      'An explicit training loop is valuable when model behavior or optimization needs close control.',
  },
  {
    id: 'data98-example-tensorflow',
    title: 'Example: Keras-style TensorFlow Model Definition',
    description: [
      'Some frameworks emphasize higher-level model construction APIs on top of tensor computation. This can speed up common deep learning workflows while still benefiting from hardware acceleration and export pathways.',
      'The abstraction is higher than a raw training loop but still centered on tensor-based modeling.',
    ],
    code: `model = keras.Sequential([
  keras.layers.Dense(128, activation="relu"),
  keras.layers.Dense(1, activation="sigmoid")
])`,
    takeaway:
      'High-level APIs can accelerate common model-building tasks when their abstraction fits the workload.',
  },
  {
    id: 'data98-example-xgboost',
    title: 'Example: Gradient Boosting with XGBoost',
    description: [
      'Specialized frameworks often win because they are extremely good at one family of problems. Gradient boosting frameworks are a common example for structured tabular data.',
      'This is a reminder that the right framework is often the one aligned with the problem shape rather than the most general framework available.',
    ],
    code: `model = XGBClassifier(
  n_estimators=300,
  max_depth=6,
  learning_rate=0.05
)
model.fit(X_train, y_train)`,
    takeaway:
      'A narrowly focused framework can outperform broader choices when the workload matches its strengths.',
  },
  {
    id: 'data98-example-evaluation',
    title: 'Example: Explicit Validation Split and Metrics',
    description: [
      'A data framework should make evaluation easy to treat as a first-class concern rather than as an afterthought inside the training script.',
      'This is where honest model assessment begins.',
    ],
    code: `preds = pipeline.predict(X_valid)
score = f1_score(y_valid, preds)
print({"f1": score})`,
    takeaway: 'Framework ergonomics should encourage clear evaluation boundaries, not hide them.',
  },
  {
    id: 'data98-example-artifact',
    title: 'Example: Saving a Reusable Model Artifact',
    description: [
      'Training is only one phase of the lifecycle. The framework must also make it possible to save the trained state and later reuse it safely.',
      'Artifact handling is one of the main bridges from experimentation to deployment.',
    ],
    code: `joblib.dump(pipeline, "customer_churn_model.joblib")`,
    takeaway:
      'A model is operationally useful only when its artifact boundary is explicit and reproducible.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Estimator',
    definition:
      'A model object with a standardized interface for fitting data and producing predictions or transformations.',
  },
  {
    term: 'Tensor',
    definition:
      'A multidimensional numerical array used as the core data structure in many deep learning frameworks.',
  },
  {
    term: 'Training loop',
    definition:
      'The repeated process of feeding batches through a model, computing loss, backpropagating gradients, and updating parameters.',
  },
  {
    term: 'Automatic differentiation',
    definition:
      'A framework capability that computes gradients through program operations so optimization can be automated.',
  },
  {
    term: 'Preprocessing pipeline',
    definition:
      'A repeatable sequence of feature transformations applied consistently before model fitting or inference.',
  },
  {
    term: 'Feature engineering',
    definition:
      'The process of constructing useful input variables or transformations from raw data.',
  },
  {
    term: 'Validation set',
    definition:
      'A dataset split used to evaluate model behavior separately from the training data.',
  },
  {
    term: 'Leakage',
    definition:
      'The accidental use of information during training or preprocessing that would not be available at true prediction time.',
  },
  {
    term: 'Checkpoint',
    definition:
      'A saved snapshot of model parameters and sometimes optimizer state during or after training.',
  },
  {
    term: 'Gradient boosting',
    definition:
      'An ensemble technique that builds models sequentially so each new learner corrects residual errors from previous ones.',
  },
  {
    term: 'Inference',
    definition: 'Using a trained model to produce outputs for new inputs.',
  },
  {
    term: 'Artifact',
    definition:
      'A saved model or pipeline output that can be versioned, transferred, and reused later.',
  },
  {
    term: 'Overfitting',
    definition:
      'When a model learns training-specific patterns too closely and performs poorly on unseen data.',
  },
  {
    term: 'Hyperparameter',
    definition:
      'A configuration value chosen before or around training that shapes model behavior or optimization.',
  },
  {
    term: 'Batch',
    definition: 'A subset of training examples processed together during one optimization step.',
  },
  {
    term: 'Hardware acceleration',
    definition:
      'The use of GPUs or other accelerators to speed up numerical computation and model training.',
  },
  {
    term: 'Experiment tracking',
    definition:
      'The recording of models, datasets, metrics, parameters, and artifacts across iterative training runs.',
  },
  {
    term: 'Train-serving skew',
    definition:
      'A mismatch between the training pipeline and the inference environment that causes degraded real-world behavior.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'data98-overview', label: 'Overview' },
    { id: 'data98-why', label: 'Why Data and ML Frameworks Matter' },
    { id: 'data98-what-they-solve', label: 'What These Frameworks Usually Solve' },
    { id: 'data98-mental-model', label: 'Mental Model' },
    { id: 'data98-landscape', label: 'Framework Landscape in This Section' },
    { id: 'data98-why-hard', label: 'Why This Domain Feels Hard' },
    { id: 'data98-when-to-use', label: 'When These Frameworks Are the Right Tool' },
    { id: 'data98-when-not-to-use', label: 'Where They Can Hurt' },
    { id: 'data98-roadmap', label: 'Coverage Roadmap' },
    { id: 'data98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'data98-representation', label: 'Data Representation and Preprocessing' },
    { id: 'data98-model-abstractions', label: 'Model Abstractions and API Shape' },
    { id: 'data98-training', label: 'Training Loops and Optimization' },
    { id: 'data98-evaluation', label: 'Evaluation, Metrics, and Validation Discipline' },
    { id: 'data98-hardware', label: 'Numerical Computation and Hardware Acceleration' },
    { id: 'data98-pipelines', label: 'Pipelines, Composition, and Reuse' },
    { id: 'data98-artifacts', label: 'Serialization, Checkpoints, and Model Artifacts' },
    { id: 'data98-experiments', label: 'Experimentation and Iteration Workflow' },
    { id: 'data98-production', label: 'Training-to-Serving Boundary' },
    { id: 'data98-operations', label: 'Operational and Organizational Concerns' },
    { id: 'data98-comparisons', label: 'Compare and Contrast' },
    { id: 'data98-failure-modes', label: 'Common Failure Modes' },
    { id: 'data98-selection', label: 'Selection Checklist' },
  ],
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'data98-glossary', label: 'Terms' }],
}

function toFrameworkRoute(name: string): string {
  return `${DATA_FRAMEWORKS_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="data98-section">
      <h2 className="data98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toFrameworkRoute(item)} className="data98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="data98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="data98-section">
      <h2 className="data98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="data98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="data98-divider" />}
    </section>
  )
}

export default function DataAndMlFrameworksPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Data and ML Frameworks',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Data and ML Frameworks"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Data and ML Frameworks</h1>
      <p className="data98-doc-subtitle">
        Help-style overview of data pipelines, model frameworks, numerical computation, training
        workflows, and production tradeoffs in the data and ML ecosystem.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1, {
              linkedBullets: frameworkDirectory,
            }),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary' ? (
        <section id="data98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      ) : null}
    </TopicPageShell>
  )
}
