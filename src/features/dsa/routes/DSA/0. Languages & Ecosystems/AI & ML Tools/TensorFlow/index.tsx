import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

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
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const PAGE_TITLE = 'TensorFlow'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'TensorFlow is an end-to-end machine learning framework centered on tensor computation, automatic differentiation, model building, data pipelines, distributed training, and deployment across servers, mobile devices, browsers, and specialized accelerators. It is used for deep learning, differentiable numerical computation, recommender systems, computer vision, natural language processing, time series, and production-scale ML platforms.',
  'The right mental model is not just "a neural network library." TensorFlow is a layered system. At the top, many teams use Keras to define and train models. Underneath, TensorFlow provides tensors, ops, automatic gradients, graph tracing, compilation pathways, input pipelines, device placement, checkpointing, SavedModel export, serving paths, and distribution strategies.',
  'This page is intentionally comprehensive. It covers the TensorFlow programming model, eager execution, graphs, tf.function, tensors, Keras APIs, custom training loops, tf.data, automatic differentiation, distributed training, deployment formats, performance tuning, ecosystem tools, production tradeoffs, examples, and a practical glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'TensorFlow is a general machine learning framework built around numerical operations on tensors and the ability to differentiate computations automatically. In day-to-day use, it often appears as a high-level neural network framework through Keras, but that view is incomplete. TensorFlow also includes lower-level primitives for graph tracing, device-aware execution, input pipelines, checkpointing, export, and distributed execution.',
      'Its main appeal is breadth. A single stack can support experimentation, training, performance-oriented graph execution, large-scale data input, distributed acceleration, and deployment to several runtime targets. That breadth is why TensorFlow became both a research tool and a production platform.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why TensorFlow Matters',
    paragraphs: [
      'TensorFlow matters because it helped standardize a full lifecycle approach to machine learning engineering. Instead of only providing model layers and optimizers, it pushed toward an ecosystem where data ingestion, gradient computation, tracing, serialization, serving, mobile inference, and deployment pipelines could all live in one family of tools.',
      'That matters most in organizations where models do not stop at notebooks. Teams need repeatable training, exportable artifacts, scalable serving, hardware acceleration, and operational discipline. TensorFlow became important by addressing that broader production problem, not just by offering matrix multiplication and neural network layers.',
    ],
    bullets: [
      'Combines model development with deployment-oriented infrastructure.',
      'Supports CPUs, GPUs, TPUs, and multiple inference targets.',
      'Pairs high-level Keras ergonomics with lower-level control when needed.',
      'Remains a major framework for production deep learning systems.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of TensorFlow as a programmable differentiable computation system. You express computations as operations over tensors, TensorFlow records or traces the relevant computation, computes gradients where needed, and executes the work on available devices. Keras sits on top of that system to make common model-building workflows easier.',
      'Another useful way to think about it is layered abstraction. Many users only interact with models, layers, losses, optimizers, and fit. More advanced users move down to tf.function, GradientTape, tf.data, and explicit distribution strategies when they need performance, customization, or production control.',
    ],
    bullets: [
      'Tensors and operations are the core computational vocabulary.',
      'Automatic differentiation enables gradient-based learning.',
      'Keras provides a high-level training interface on top of TensorFlow primitives.',
      'Tracing and graph execution can make the same code more portable and optimizable.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where TensorFlow Fits Best',
    paragraphs: [
      'TensorFlow fits best when the problem involves neural networks or differentiable computation and the team needs more than a small research script. It is a strong fit for vision models, sequence models, recommender systems, multimodal systems, large-scale training, structured deployment, and environments where export or edge inference matters.',
      'It is also attractive when a team wants a stable high-level API through Keras but still needs access to lower-level control over custom losses, custom layers, training loops, distributed execution, or deployment formats.',
    ],
    bullets: [
      'Deep learning workflows that need both experimentation and production paths.',
      'Projects requiring tf.data, SavedModel, TensorFlow Lite, or serving infrastructure.',
      'Teams that want a batteries-included ML platform rather than only an eager research library.',
      'Workloads that benefit from accelerator-aware training and deployment.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where TensorFlow Is Not the Best Default',
    paragraphs: [
      'TensorFlow is not automatically the best choice for every machine learning problem. Classical tabular tasks may be better served by tree methods or linear models. Small one-off research experiments may feel faster in frameworks with a more minimal surface area if deployment is not a concern.',
      'It can also be a poor fit when the team only needs a straightforward estimator and does not want to manage the conceptual overhead of graphs, input pipelines, serialization formats, and a broad ecosystem. The framework repays complexity only when that complexity is actually useful.',
    ],
    bullets: [
      'Simple tabular problems often do not need a deep learning framework.',
      'Very small projects may not benefit from the ecosystem breadth.',
      'Teams without appetite for ML infrastructure can find the stack heavy.',
      'If the main requirement is transparency and small-model simplicity, other tools may fit better.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A common TensorFlow workflow starts with data ingestion and preprocessing, often through tf.data, followed by model definition with Keras layers or subclassed models. Training may begin with model.compile and model.fit for speed of iteration, then move toward custom training loops or tf.function-decorated steps when the workload needs more control.',
      'Once training is stable, the workflow often continues into checkpointing, evaluation, export to SavedModel, serving or edge conversion, and performance profiling. In serious systems, data pipeline quality and deployment compatibility matter as much as architecture design.',
    ],
    bullets: [
      'Build a reproducible data pipeline before tuning the model.',
      'Start high-level with Keras unless custom control is clearly required.',
      'Use validation, checkpointing, and callbacks early.',
      'Plan export and inference targets while the model is still being designed.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'TensorFlow is best understood as a full machine learning systems framework, not just a neural network API. Its real value is the combination of model-building ergonomics, automatic differentiation, graph and tracing capabilities, deployment formats, and platform-level tooling.',
      'The framework works best when the team is deliberate about abstraction levels. Use Keras for standard flows, drop lower when customization is necessary, and always keep data pipelines, monitoring, export, and target runtime constraints in view.',
    ],
    bullets: [
      'TensorFlow is broad because it addresses the full ML lifecycle.',
      'Keras is the usual entry point, but not the whole framework.',
      'Performance, deployment, and data pipelines are first-class concerns.',
      'Choose abstraction levels intentionally instead of mixing them casually.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What TensorFlow Actually Is',
    paragraphs: [
      'TensorFlow is a software framework for numerical computation with tensors, automatic differentiation, and machine learning model development. In practice, it contains several layers: core tensor operations, eager execution, graph tracing via tf.function, Keras modeling APIs, data input pipelines, distributed execution tools, serialization formats, and deployment runtimes.',
      'This layered identity is important because it explains why TensorFlow can feel very simple or very large depending on how deeply a project uses it. A tutorial built around model.fit shows only one part of the framework. Production systems often engage many more layers.',
    ],
  },
  {
    id: 'core-tensors-and-ops',
    title: 'Tensors, Operations, and Devices',
    paragraphs: [
      'The basic values in TensorFlow are tensors: multidimensional arrays with a dtype and shape. Operations consume tensors and produce tensors, and TensorFlow can place those operations on available devices such as CPUs, GPUs, or TPUs. The framework therefore treats machine learning as a structured computational graph over numerical data rather than just as ad hoc Python loops.',
      'Understanding tensors, shapes, broadcasting, dtype behavior, and device placement is foundational. Many TensorFlow bugs are really shape mismatches, unintended dtype conversions, or assumptions about where computation is running.',
    ],
    bullets: [
      'A tensor has values, shape, and dtype.',
      'Ops compose into larger computations over those tensors.',
      'Device placement affects both correctness assumptions and performance.',
      'Shape discipline is one of the most important debugging skills in TensorFlow.',
    ],
  },
  {
    id: 'core-eager-and-graphs',
    title: 'Eager Execution and Graph Execution',
    paragraphs: [
      'Modern TensorFlow runs eagerly by default, which means operations execute immediately and behave much like ordinary Python numerical code. This makes debugging, prototyping, and interactive experimentation much easier than older graph-first workflows.',
      'At the same time, TensorFlow can trace computations into graphs for optimization, portability, and structured execution. That dual model is one of the defining TensorFlow ideas: write code in a Python-friendly way, then selectively stage or trace it when performance and deployment benefit from graph execution.',
    ],
    bullets: [
      'Eager mode is easier to debug and reason about directly.',
      'Graph execution can improve portability and optimization opportunities.',
      'The same project may use both modes at different layers.',
      'Understanding the boundary between Python behavior and traced graph behavior is essential.',
    ],
  },
  {
    id: 'core-tf-function',
    title: 'tf.function and Tracing',
    paragraphs: [
      'tf.function converts a Python function into a traced TensorFlow graph. This can improve execution speed, enable serialization paths, and remove some Python overhead, but it also changes how control flow and side effects behave because the computation is being staged.',
      'A common source of confusion is assuming that all Python logic executes the same way inside a traced function as it does in eager mode. In reality, Python side effects, shape specialization, retracing, and autograph-converted control flow can all affect behavior. Teams using TensorFlow seriously should understand tf.function beyond surface syntax.',
    ],
    bullets: [
      'Use tf.function when repeated execution benefits from graph tracing.',
      'Be careful with Python side effects, mutable state, and dynamic control flow.',
      'Retracing can create performance problems if input signatures vary too much.',
      'Tracing is powerful, but it rewards disciplined mental models.',
    ],
  },
  {
    id: 'core-keras',
    title: 'Keras as the High-level API',
    paragraphs: [
      'For most users, Keras is the primary way to interact with TensorFlow. It provides layers, models, losses, optimizers, metrics, callbacks, and training loops that cover a large percentage of real-world deep learning workflows without forcing users to write every optimization step by hand.',
      'The practical value of Keras is not only convenience. It provides structure. Models become composable, training becomes repeatable, and callback-based workflows make checkpointing, learning-rate scheduling, and validation monitoring easier to standardize across teams.',
    ],
    bullets: [
      'Sequential API is useful for simple linear stacks of layers.',
      'Functional API handles multi-input, multi-output, and DAG-style architectures.',
      'Subclassing allows maximum flexibility for custom behavior.',
      'compile and fit are usually the fastest path to a solid baseline.',
    ],
  },
  {
    id: 'core-autodiff',
    title: 'Automatic Differentiation and GradientTape',
    paragraphs: [
      'TensorFlow can automatically compute gradients of differentiable computations, which is central to training neural networks. Under the hood, gradients are tracked through operations so optimizers can update parameters according to the chosen loss.',
      'When the default Keras training loop is not enough, tf.GradientTape exposes direct gradient recording for custom training steps. This is a major escape hatch: it lets teams implement custom objectives, adversarial routines, reinforcement-learning loops, or mixed training procedures while still using the TensorFlow execution engine.',
    ],
    bullets: [
      'Automatic differentiation is the core mechanism behind learning.',
      'GradientTape records differentiable operations for custom updates.',
      'Custom loops trade convenience for flexibility and control.',
      'Incorrect tape scope or detached tensors can silently break training.',
    ],
  },
  {
    id: 'core-model-building',
    title: 'Layers, Models, and Parameter Management',
    paragraphs: [
      'TensorFlow models are usually built from reusable layers that manage trainable parameters and define forward computations. A model can then be treated as a larger layer, which makes compositional design natural. This pattern supports everything from small MLPs to complex multi-branch architectures.',
      'Parameter management matters because variables, initialization, checkpointing, and trainable or frozen status all affect training correctness. Clear separation between model definition, forward logic, and training configuration helps keep large codebases maintainable.',
    ],
  },
  {
    id: 'core-data',
    title: 'tf.data and Input Pipelines',
    paragraphs: [
      "The tf.data API is one of TensorFlow's most important production features. It lets teams construct streaming, parallel, batched, shuffled, cached, prefetched, and transformed input pipelines that feed training and inference efficiently.",
      'This matters because model quality is only part of the system. Slow or inconsistent input pipelines can starve accelerators, create reproducibility problems, or accidentally introduce leakage and ordering errors. In large TensorFlow systems, data input is often as important as model code.',
    ],
    bullets: [
      'Dataset pipelines support map, batch, shuffle, cache, and prefetch operations.',
      'Input throughput strongly affects accelerator utilization.',
      'Data pipeline correctness is part of model correctness.',
      'Use tf.data early when training volume or deployment realism matters.',
    ],
  },
  {
    id: 'core-training-loops',
    title: 'Training Loops and Callbacks',
    paragraphs: [
      'TensorFlow supports several training styles. The highest-level path is model.fit, which handles batching, metrics, validation, callbacks, and optimizer steps automatically. Beneath that, teams can override training steps or write full custom loops for workloads that do not fit the standard supervised pattern.',
      'Callbacks make training operationally sane. Early stopping, checkpointing, tensorboard logging, learning-rate schedules, and custom monitoring logic are often what separate an ad hoc experiment from a reproducible training routine.',
    ],
  },
  {
    id: 'core-distribution',
    title: 'Distributed Training and Strategies',
    paragraphs: [
      'TensorFlow includes tf.distribute strategies for training across multiple devices or workers. These abstractions help replicate models, coordinate gradients, and manage device-specific execution without forcing each project to build distributed training from scratch.',
      'Distributed training is not only about speed. It changes batch semantics, optimizer dynamics, checkpoint behavior, and debugging complexity. Teams should adopt it when the scale justifies the operational overhead, not just because the framework supports it.',
    ],
    bullets: [
      'Mirrored strategies are common for single-host multi-GPU training.',
      'Multi-worker strategies add network and synchronization concerns.',
      'Distribution affects effective batch size and optimizer behavior.',
      'Measure the scaling benefit rather than assuming parallelism is free.',
    ],
  },
  {
    id: 'core-saving-and-serving',
    title: 'Saving, Export, and Serving',
    paragraphs: [
      'TensorFlow supports checkpointing during training and exportable model artifacts for later reuse. In practice, teams often save weights while training, then export a full model artifact for serving or downstream deployment once the model behavior is stable.',
      'This is a major reason TensorFlow is attractive in production settings. The artifact is not just a bag of numbers. It can capture the executable computation needed for inference, which enables serving systems, conversion workflows, and deployment into different environments.',
    ],
    bullets: [
      'Checkpoints support recovery and long-running training jobs.',
      'Exportable model artifacts enable reproducible inference behavior.',
      'Serving paths should be designed with signatures and preprocessing in mind.',
      'Serialization choices made during development affect deployment options later.',
    ],
  },
  {
    id: 'core-deployment-targets',
    title: 'Deployment Targets',
    paragraphs: [
      'TensorFlow is unusual in how many runtime targets it can support. Server inference commonly uses exported models and dedicated serving stacks. Edge and mobile paths can use TensorFlow Lite. Browser delivery may rely on TensorFlow.js after appropriate conversion workflows. The important point is that deployment is part of the ecosystem design, not an afterthought.',
      'That also means teams should think about target constraints early. Model size, operator support, quantization needs, latency budgets, and preprocessing assumptions all influence which deployment path is realistic.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Optimization',
    paragraphs: [
      'TensorFlow performance depends on more than model architecture. Input pipeline throughput, graph tracing quality, batch sizing, mixed precision, device placement, kernel availability, and operator fusion all influence training speed and inference latency.',
      'The right performance mindset is empirical. Measure step time, profile input stalls, check device utilization, and verify that the expensive part of the system is actually where you think it is. In many practical systems, the bottleneck is the pipeline or Python overhead rather than the network itself.',
    ],
    bullets: [
      'Use profiling tools before guessing about bottlenecks.',
      'Data input stalls can waste expensive accelerators.',
      'Mixed precision can materially improve throughput on supported hardware.',
      'Tracing and export decisions affect both speed and deployment portability.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Around TensorFlow',
    paragraphs: [
      'TensorFlow sits inside a broader ecosystem that includes TensorBoard for experiment visualization, TensorFlow Lite for edge deployment, TensorFlow Serving for model serving, tf.data for input pipelines, and adjacent platform tooling for end-to-end ML pipelines. Many teams also combine TensorFlow with notebooks, orchestration systems, experiment trackers, feature stores, and custom serving infrastructure.',
      'The ecosystem angle matters because TensorFlow often enters an organization as part of a larger systems decision. The question is rarely only "can it train this network?" The real question is often whether it fits the operational path from data to training to deployment to monitoring.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Use Cases',
    paragraphs: [
      'TensorFlow is common in computer vision, text classification, translation, speech, recommendation systems, ranking, forecasting, anomaly detection, representation learning, and multimodal modeling. It is especially useful when the problem benefits from deep learning and the team needs export, serving, or accelerator-aware training.',
      'It is also used for differentiable scientific and engineering computations where the automatic differentiation stack is useful outside classic neural-network prediction tasks.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'TensorFlow offers a lot, but that breadth has a cost. It can be conceptually heavy for small teams, and mixing abstraction levels carelessly can create code that is hard to debug. Many TensorFlow frustrations come from shape mistakes, tracing misunderstandings, weak input pipelines, hidden Python side effects, or export constraints that were ignored early on.',
      'Another common mistake is focusing only on model architecture while underinvesting in data pipeline correctness, monitoring, and serving compatibility. A brilliant architecture with a brittle input pipeline or an incompatible export path is not a production success.',
    ],
    bullets: [
      'Do not mix eager-only assumptions into traced code without understanding the consequences.',
      'Watch for silent shape broadcasting and dtype mismatches.',
      'Design preprocessing and serving signatures before the final export phase.',
      'Use the simplest abstraction that satisfies the project, then go lower only when necessary.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast',
    paragraphs: [
      'Compared with PyTorch, TensorFlow is often perceived as more deployment- and platform-oriented, while PyTorch is often perceived as more immediately ergonomic for research-first workflows. Compared with JAX, TensorFlow offers a more integrated application framework for many teams, while JAX often appeals to users who want composable functional transformations and a different research style.',
      'Compared with classical ML libraries such as scikit-learn or boosted trees, TensorFlow is far more suitable for deep representation learning but usually comes with higher complexity, heavier compute demands, and a stronger need for disciplined data engineering and experiment management.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Practical TensorFlow Checklist',
    paragraphs: [
      'A strong TensorFlow workflow starts by choosing the right abstraction level and getting the data pipeline correct. From there, the team should verify shapes, metrics, callbacks, checkpointing, and export assumptions before turning to larger-scale optimization and distributed training.',
      'The goal is not just to get a model to train. The goal is to build a model that can be repeated, monitored, exported, and used in the runtime environment that actually matters.',
    ],
    bullets: [
      'Start with Keras unless the project clearly requires custom loops.',
      'Build and profile the input pipeline early.',
      'Validate shapes, dtypes, and device placement before long runs.',
      'Add checkpoints, metrics, and TensorBoard logging from the beginning.',
      'Confirm serving or edge-export requirements before model architecture hardens.',
      'Adopt distributed training only when the workload justifies the extra complexity.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-keras-fit',
    title: 'Keras Model with model.fit',
    description: [
      'This is the standard starting point for supervised deep learning in TensorFlow. A Keras model, compiled loss, optimizer, and metric definitions cover a large share of production-grade baseline workflows.',
      'The example pairs a small dense network with a tf.data pipeline and callback-based validation monitoring. That pattern scales better than hand-written loops when the objective is still standard supervised training.',
    ],
    code: `import tensorflow as tf

train_ds = (
    tf.data.Dataset.from_tensor_slices((x_train, y_train))
    .shuffle(10000)
    .batch(128)
    .prefetch(tf.data.AUTOTUNE)
)

valid_ds = (
    tf.data.Dataset.from_tensor_slices((x_valid, y_valid))
    .batch(128)
    .prefetch(tf.data.AUTOTUNE)
)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(128,)),
    tf.keras.layers.Dense(256, activation="relu"),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(1, activation="sigmoid"),
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-3),
    loss=tf.keras.losses.BinaryCrossentropy(),
    metrics=[tf.keras.metrics.AUC(name="auc")],
)

model.fit(
    train_ds,
    validation_data=valid_ds,
    epochs=20,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(
            patience=3,
            restore_best_weights=True,
        )
    ],
)`,
    notes: [
      'Use tf.data even for simple examples when the real system will train at scale.',
      'Callbacks are part of operational discipline, not just convenience.',
    ],
  },
  {
    id: 'ex-functional-api',
    title: 'Functional API for Multi-input Models',
    description: [
      'The Functional API is the right tool when a model is not a single linear stack of layers. It supports DAG-style architectures, shared submodules, multi-input systems, and multi-output heads cleanly.',
      'This pattern is common in recommendation, ranking, and multimodal applications where separate feature groups need different encoders before they are merged.',
    ],
    code: `import tensorflow as tf

numeric_input = tf.keras.Input(shape=(10,), name="numeric")
text_embed = tf.keras.Input(shape=(64,), name="text_embed")

x_num = tf.keras.layers.Dense(64, activation="relu")(numeric_input)
x = tf.keras.layers.Concatenate()([x_num, text_embed])
x = tf.keras.layers.Dense(128, activation="relu")(x)
score = tf.keras.layers.Dense(1, activation="sigmoid", name="score")(x)

model = tf.keras.Model(
    inputs=[numeric_input, text_embed],
    outputs=score,
)

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"],
)`,
    notes: [
      'Functional models are usually easier to visualize and export than ad hoc imperative wiring.',
      'Use clear input names early when the model will be served later.',
    ],
  },
  {
    id: 'ex-gradient-tape',
    title: 'Custom Training Step with GradientTape',
    description: [
      'When the built-in fit loop is not flexible enough, TensorFlow lets you write a custom training step. This is useful for custom objectives, multi-stage updates, contrastive learning, RL-style loops, or unusual gradient logic.',
      'The code below keeps Keras components for the model and optimizer, but owns the update step directly.',
    ],
    code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(10),
])

optimizer = tf.keras.optimizers.Adam(1e-3)
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

@tf.function
def train_step(x_batch, y_batch):
    with tf.GradientTape() as tape:
        logits = model(x_batch, training=True)
        loss = loss_fn(y_batch, logits)

    grads = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(grads, model.trainable_variables))
    return loss
`,
    notes: [
      'Custom loops are powerful, but they remove some guardrails and conveniences from fit.',
      'Decorating the step with tf.function can improve repeated execution performance.',
    ],
  },
  {
    id: 'ex-export',
    title: 'Exporting a Model for Inference',
    description: [
      'A TensorFlow model is usually not finished when training ends. It also needs a clean export path for inference. This example shows the typical save and reload workflow for a Keras model.',
      'In real systems, export should be tested with real inference inputs and clear signatures rather than treated as a final afterthought.',
    ],
    code: `import tensorflow as tf

model.save("artifacts/fraud_model.keras")

reloaded = tf.keras.models.load_model("artifacts/fraud_model.keras")
pred = reloaded(tf.random.normal((4, 128)), training=False)`,
    notes: [
      'Saving and reload testing should happen during development, not only at release time.',
      'If the deployment target is mobile, browser, or a strict serving runtime, validate that path explicitly.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'Tensor',
        definition:
          'A multidimensional array value with a defined shape and dtype, used as the core data structure in TensorFlow.',
      },
      {
        term: 'Operation',
        definition: 'A computation that consumes tensors and produces tensors.',
      },
      {
        term: 'Eager execution',
        definition:
          'The default execution mode in which operations run immediately as normal Python code proceeds.',
      },
      {
        term: 'Graph execution',
        definition:
          'A staged execution mode where computations are traced into an optimized graph representation.',
      },
      {
        term: 'Automatic differentiation',
        definition:
          'The mechanism TensorFlow uses to compute gradients of differentiable computations.',
      },
      {
        term: 'Keras',
        definition:
          'The high-level model-building API commonly used as the main interface to TensorFlow.',
      },
      {
        term: 'Layer',
        definition:
          'A reusable computation block that may own trainable variables and define a forward transformation.',
      },
      {
        term: 'Model',
        definition:
          'A composition of layers representing the trainable computation used for inference and learning.',
      },
    ],
  },
  {
    id: 'glossary-training',
    title: 'Training and Execution Terms',
    terms: [
      {
        term: 'tf.function',
        definition:
          'A decorator that traces a Python function into a TensorFlow graph for staged execution.',
      },
      {
        term: 'GradientTape',
        definition:
          'A TensorFlow API that records differentiable operations so gradients can be computed manually.',
      },
      {
        term: 'Optimizer',
        definition:
          'The algorithm responsible for updating trainable parameters using computed gradients.',
      },
      {
        term: 'Loss function',
        definition: 'The scalar objective minimized during training.',
      },
      {
        term: 'Metric',
        definition:
          'A reported quantity used to monitor model quality during training or evaluation.',
      },
      {
        term: 'Callback',
        definition:
          'A hook that adds behavior around training, such as checkpointing, early stopping, or logging.',
      },
      {
        term: 'tf.data',
        definition: 'The TensorFlow API for building scalable and composable input pipelines.',
      },
      {
        term: 'Retracing',
        definition:
          'The process of creating a new traced graph when a tf.function sees inputs that do not match an existing trace signature.',
      },
    ],
  },
  {
    id: 'glossary-deployment',
    title: 'Deployment and Scale Terms',
    terms: [
      {
        term: 'Checkpoint',
        definition:
          'A saved snapshot of model and optimizer state used for recovery or continued training.',
      },
      {
        term: 'SavedModel',
        definition:
          'A TensorFlow export format used to serialize executable model behavior for reuse and serving.',
      },
      {
        term: 'TensorFlow Lite',
        definition:
          'A TensorFlow deployment path and runtime for mobile and edge inference scenarios.',
      },
      {
        term: 'TensorFlow Serving',
        definition:
          'A serving system commonly used to host exported TensorFlow models for inference.',
      },
      {
        term: 'Distribution strategy',
        definition:
          'A TensorFlow abstraction for running training across multiple devices or workers.',
      },
      {
        term: 'Mixed precision',
        definition:
          'A performance technique that uses lower-precision arithmetic where safe to improve throughput on supported hardware.',
      },
      {
        term: 'Device placement',
        definition:
          'The assignment of TensorFlow operations to CPUs, GPUs, TPUs, or other execution devices.',
      },
      {
        term: 'TensorBoard',
        definition:
          'A visualization and experiment monitoring tool commonly used with TensorFlow training workflows.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  'core-concepts': coreConceptSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  examples: exampleSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  glossary: glossarySections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="bin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      <dl className="bin98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

export default function TensorFlowPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: PAGE_TITLE,
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title={PAGE_TITLE}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{PAGE_TITLE}</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <hr className="bin98-divider" />

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
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

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
