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

const PAGE_TITLE = 'Keras'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Keras is a high-level deep learning API focused on models, layers, losses, optimizers, metrics, callbacks, and structured training workflows. It helps teams build neural-network systems with less boilerplate and with clearer lifecycle boundaries around training, validation, and saving.',
  'The most useful mental model is not just "a simpler neural-network library," but "a model-centric interface for disciplined deep learning work." Keras gives teams a consistent path from architecture definition to fit loops, monitoring, checkpointing, and inference artifacts.',
  'This page is intentionally comprehensive. It covers Keras abstractions, Sequential and Functional APIs, subclassing, compile and fit, callbacks, custom training logic, saving and deployment concerns, practical tradeoffs, examples, and a glossary of the concepts that matter most in real Keras workflows.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Keras is a high-level framework for deep learning model development. In practice it provides the abstractions many teams use first: reusable layers, trainable models, optimizers, losses, metrics, callbacks, and a training surface that makes common supervised learning workflows concise and readable.',
      'Its real value is not just fewer lines of code. It turns a deep-learning project into a structured workflow where architecture, optimization, monitoring, and artifact management are explicit instead of scattered across ad hoc notebook code.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Keras Matters',
    paragraphs: [
      'Keras matters because many applied deep-learning projects do not begin with unusual optimization research. They begin with a need to define a model clearly, train it reproducibly, monitor validation behavior, checkpoint progress, and ship something another system can reload. Keras reduces friction in those standard paths.',
      'It also matters because training structure scales across teams. A stable API for compile, fit, callbacks, and saving means different people can read, review, and extend the same project without every codebase inventing a different trainer pattern.',
    ],
    bullets: [
      'High-level API for common deep-learning workflows.',
      'Clear structure around training, validation, and saving.',
      'Good default path for teams that want readable model code.',
      'Supports escalation into more custom behavior when required.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of Keras as a model lifecycle interface. Layers define transformations, models organize those layers into a trainable graph, compile binds optimization semantics to the model, fit coordinates iteration and callbacks, and save persists an inference-ready artifact.',
      'That separation is important because it makes deep-learning systems easier to reason about. Architecture, optimization, monitoring, and deployment-related concerns stop being implicit and become named concepts in the code.',
    ],
    bullets: [
      'Layers express computation.',
      'Models package trainable systems.',
      'Compile defines losses, optimizers, and metrics.',
      'Fit manages the standard training lifecycle.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Keras Fits Best',
    paragraphs: [
      'Keras fits best when the project needs deep learning productivity with clear structure. It is strong for baseline supervised models, transfer learning, multimodal architectures, tabular neural baselines, image and sequence models, and teams that value a readable training surface over writing every training detail from scratch.',
      'It is especially effective when most of the workflow is standard but a few pieces may later need customization. Teams can start high-level, then add custom layers, subclassed models, or custom training steps without discarding the broader Keras lifecycle.',
    ],
    bullets: [
      'Common supervised deep-learning workflows.',
      'Teams that want maintainable training code.',
      'Projects using callbacks, checkpoints, and exported model artifacts.',
      'Workloads that may begin simple and become more customized later.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where Keras Is Not the Best Default',
    paragraphs: [
      'Keras is not always the ideal starting point when the project begins with highly unusual low-level training logic, experimental autograd behavior, or a requirement to own every optimization detail from the first prototype. In those cases a lower-level style may be more direct.',
      'It is also not a substitute for real modeling discipline. Keras can make weak experimentation look tidy, but it cannot fix bad labels, unrealistic validation, weak input pipelines, or missing deployment constraints.',
    ],
    bullets: [
      'Not ideal when fully custom optimization behavior dominates from day one.',
      'Does not replace good validation and data engineering.',
      'Can feel restrictive if a project intentionally avoids high-level workflow structure.',
      'Still depends on understanding the underlying backend and data path.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A standard Keras workflow starts with model shape design and a first architecture using Sequential or the Functional API. The next step is choosing an optimizer, loss, and metrics through compile, then training with fit while monitoring validation through callbacks such as early stopping and model checkpointing.',
      'From there, teams refine the data path, regularization, schedules, architecture, and export flow. If the project becomes less conventional, they can add custom layers, subclassed models, or overridden train_step behavior while still preserving the broader Keras model lifecycle.',
    ],
    bullets: [
      'Define inputs and architecture clearly.',
      'Compile with task-appropriate loss and metrics.',
      'Train with fit plus callbacks for monitoring and recovery.',
      'Customize only where the standard path stops being sufficient.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Keras is best understood as a structured interface for deep-learning systems rather than just a convenience wrapper. Its real power comes from turning training behavior, monitoring, and serialization into explicit reusable pieces.',
      'If the team wants a clear high-level path through deep learning without giving up the option to customize later, Keras is often one of the best starting points. The API improves workflow clarity, but outcomes still depend on data quality, evaluation realism, and deployment discipline.',
    ],
    bullets: [
      'Keras is strongest when clarity and repeatability matter.',
      'The standard compile and fit path solves a large share of real workloads.',
      'High-level structure and customization can coexist.',
      'Good modeling practice still dominates results.',
    ],
  },
]
const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What Keras Actually Is',
    paragraphs: [
      'Keras is a high-level deep-learning API built around models, layers, losses, optimizers, metrics, callbacks, and saving tools. In practical use, it is the interface many teams reach for when they want deep-learning code that remains understandable as the project grows.',
      'That identity matters because Keras is not only about saving time. It shapes the workflow. A model becomes an explicit object with a training lifecycle, monitoring becomes structured, and saving or reload paths become part of the normal development loop.',
    ],
  },
  {
    id: 'core-abstraction-levels',
    title: 'Abstraction Levels',
    paragraphs: [
      'Keras supports multiple abstraction levels. The simplest path uses Sequential models and fit. More expressive projects use the Functional API. More customized systems add subclassed layers, subclassed models, or overridden train_step logic.',
      'This range of abstraction is one of Keras greatest practical strengths. Teams can stay high-level for common workflows and only drop lower when a concrete project requirement justifies the extra complexity.',
    ],
    bullets: [
      'Sequential for simple linear stacks.',
      'Functional API for graph-shaped architectures.',
      'Subclassing for advanced or dynamic behavior.',
      'Custom training hooks for unusual optimization needs.',
    ],
  },
  {
    id: 'core-layers-models',
    title: 'Layers and Models',
    paragraphs: [
      'A layer is a reusable computation unit that may hold trainable weights and transforms inputs into outputs. Layers can be combined into deeper structures, which lets complex architectures emerge from small understandable parts.',
      'A model is a trainable composition of layers. It packages forward computation, trainable variables, and the surrounding lifecycle that compile, fit, evaluate, and save can operate on.',
    ],
    bullets: [
      'Layers encapsulate local logic and parameters.',
      'Models organize layers into trainable systems.',
      'Nested composition improves reuse and readability.',
      'A clear model boundary helps saving and inference later.',
    ],
  },
  {
    id: 'core-sequential-functional',
    title: 'Sequential vs Functional API',
    paragraphs: [
      'Sequential is appropriate when the model is a plain ordered stack from input to output. It is fast to read and fast to prototype, which makes it a strong default for first baselines.',
      'The Functional API is better once a model has branches, merges, multiple inputs, multiple outputs, skip connections, or internal graph structure that matters. It keeps those relationships explicit rather than burying them inside ad hoc code.',
    ],
    bullets: [
      'Sequential is best for straight stacks.',
      'Functional is best for graph-shaped architectures.',
      'Use the simplest abstraction that still matches the topology.',
      'Switching to Functional early is often better than over-stretching Sequential.',
    ],
  },
  {
    id: 'core-subclassing',
    title: 'Subclassing Layers and Models',
    paragraphs: [
      'Subclassing is the path for workloads where built-in abstractions are no longer expressive enough. A custom layer can encapsulate unusual reusable logic, and a subclassed model can express a more specialized forward pass or training contract.',
      'This flexibility is useful, but it also shifts more responsibility onto the developer. Testing, serialization behavior, shape discipline, and training correctness all need more deliberate attention once the workflow becomes highly custom.',
    ],
    bullets: [
      'Use subclassing to solve real modeling constraints, not for style alone.',
      'Prefer small custom layers over custom everything when possible.',
      'More freedom means more responsibility around correctness and maintenance.',
      'Keep custom components testable and reusable.',
    ],
  },
  {
    id: 'core-compile-fit',
    title: 'Compile and Fit',
    paragraphs: [
      'Compile defines how a model should learn and be evaluated. This usually includes the optimizer, loss, and metrics. It turns a raw architecture into a trainable system with explicit optimization semantics.',
      'Fit then coordinates epoch iteration, batching, validation, callback execution, and metric reporting. This is where Keras earns much of its value because a large class of training workflows can be expressed clearly without rewriting trainer boilerplate.',
    ],
    bullets: [
      'Compile binds optimization behavior to the model.',
      'Fit manages the standard supervised training lifecycle.',
      'Validation and callbacks become first-class concerns.',
      'Most teams should exhaust this path before going fully custom.',
    ],
  },
  {
    id: 'core-losses-metrics',
    title: 'Losses and Metrics',
    paragraphs: [
      'Losses drive optimization. Metrics describe performance from an evaluation perspective. They are related, but they do not have to be identical because the quantity that is convenient for training may differ from the quantity that matters for product or business decisions.',
      'This distinction is important in practice. A model can improve its training loss and still be weak at the threshold, ranking, calibration, or slice behavior that matters in deployment. Keras makes it easy to track multiple quantities, but it is still the teams job to choose the right ones.',
    ],
    bullets: [
      'Loss is what optimization follows.',
      'Metrics are what people use to judge behavior.',
      'Monitor the quantity that matters for the real task.',
      'Do not confuse a smooth training loss with a deployable model.',
    ],
  },
  {
    id: 'core-optimizers-callbacks',
    title: 'Optimizers, Schedules, and Callbacks',
    paragraphs: [
      'Keras exposes optimizers such as SGD and Adam through a consistent interface. Learning-rate schedules, weight decay, and optimizer state all influence whether training is stable and whether the final model generalizes well.',
      'Callbacks are equally important because training is also a managed process. Early stopping, model checkpointing, learning-rate reduction, and logging are all examples of training control that often matter as much as architecture changes.',
    ],
    bullets: [
      'Learning-rate behavior often matters more than optimizer brand swapping.',
      'Callbacks control lifecycle behavior around the main loop.',
      'Checkpointing and monitored stopping should be normal defaults.',
      'The training process is more than repeated gradient steps.',
    ],
  },
  {
    id: 'core-custom-training',
    title: 'Custom Training Logic',
    paragraphs: [
      'Keras does not force a choice between total convenience and total control. Projects can override train_step, define custom metrics, create custom losses, or integrate lower-level operations while still preserving much of the model lifecycle around evaluation and saving.',
      'This selective customization is often the right approach. The project keeps the organizational benefits of Keras while taking direct control over the small part of the optimization loop that is truly nonstandard.',
    ],
    bullets: [
      'Override only the pieces that truly need custom behavior.',
      'Keep the broader Keras lifecycle where it still helps.',
      'Selective customization is often better than full reinvention.',
      'The more custom the loop, the more deliberate the tests and monitoring must be.',
    ],
  },
  {
    id: 'core-evaluation-saving',
    title: 'Evaluation, Saving, and Deployment',
    paragraphs: [
      'A Keras project is not finished when the training loop stops. It also needs realistic evaluation, stable validation protocols, and a saving path that can be reloaded without surprises. The model artifact is part of the product surface, not just a byproduct of experimentation.',
      'This is where Keras is practically useful for production teams. It treats saving and reload behavior as part of the normal workflow instead of leaving them as improvised scripts around the model code.',
    ],
    bullets: [
      'Validate with realistic splits and monitored metrics.',
      'Save and reload should be part of normal testing.',
      'Persist the inference contract around the model, not only the weights.',
      'Deployment correctness begins during development, not after it.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'Keras improves ergonomics, but ergonomics can create false confidence. A clean API does not guarantee correct labels, realistic validation, or a sound deployment path. Teams can still overfit, leak information, monitor the wrong metric, or save an artifact that does not match the real inference contract.',
      'Another common mistake is abandoning fit too early. Many projects become harder to debug because they drop to custom loops before the standard workflow has actually become a constraint. The best Keras usage is usually pragmatic: stay high-level until a real need forces a change.',
    ],
    bullets: [
      'Concise code is not the same thing as correct modeling.',
      'Do not drop to custom loops prematurely.',
      'Do not ignore saving and inference consistency.',
      'Do not mistake tidy training histories for reliable deployment behavior.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-sequential',
    title: 'Sequential Model with compile and fit',
    description: [
      'This is the standard Keras pattern for straightforward supervised learning. A model is declared as a stack of layers, compile defines optimization behavior, and fit handles iteration, validation, and metric reporting.',
      'It is the canonical baseline because it solves a large class of real work without forcing the team to own every training detail manually.',
    ],
    code: `import keras

model = keras.Sequential([
    keras.layers.Input(shape=(128,)),
    keras.layers.Dense(256, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(1, activation="sigmoid"),
])

model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss=keras.losses.BinaryCrossentropy(),
    metrics=[keras.metrics.AUC(name="auc")],
)

history = model.fit(
    X_train,
    y_train,
    validation_data=(X_valid, y_valid),
    epochs=50,
    batch_size=256,
)`,
    notes: [
      'Use callbacks for early stopping and checkpointing once the baseline path is correct.',
      'The simplest high-level workflow is often the right place to start.',
    ],
  },
  {
    id: 'ex-functional',
    title: 'Functional API for Multiple Inputs',
    description: [
      'The Functional API is the correct choice when a model has multiple inputs or a nontrivial graph structure. This makes connectivity explicit instead of hiding it in a less readable custom forward path.',
      'It is commonly used for multimodal systems, multi-task outputs, and graph-like architectures.',
    ],
    code: `import keras

numeric = keras.Input(shape=(10,), name="numeric")
profile = keras.Input(shape=(32,), name="profile")

x_num = keras.layers.Dense(64, activation="relu")(numeric)
x = keras.layers.Concatenate()([x_num, profile])
x = keras.layers.Dense(128, activation="relu")(x)
score = keras.layers.Dense(1, activation="sigmoid", name="score")(x)

model = keras.Model(inputs=[numeric, profile], outputs=score)`,
    notes: [
      'Use named inputs and outputs when model interfaces matter downstream.',
      'Functional models are often the best balance between simplicity and expressive power.',
    ],
  },
  {
    id: 'ex-custom-layer',
    title: 'Custom Layer by Subclassing',
    description: [
      'Custom layers let teams encapsulate specialized reusable logic while still keeping the rest of the model in a normal Keras workflow. This is usually a better first customization step than rebuilding the whole training process.',
      'The example below shows a small reusable residual-style dense block.',
    ],
    code: `import keras
from keras import ops

class ResidualDenseBlock(keras.layers.Layer):
    def __init__(self, units, **kwargs):
        super().__init__(**kwargs)
        self.proj = keras.layers.Dense(units)
        self.hidden = keras.layers.Dense(units, activation="relu")

    def call(self, inputs):
        skip = self.proj(inputs)
        x = self.hidden(skip)
        return ops.relu(x + skip)`,
    notes: [
      'Keep custom layers small and testable.',
      'Reach for custom reusable blocks when built-in layers stop fitting the problem cleanly.',
    ],
  },
  {
    id: 'ex-custom-train-step',
    title: 'Overriding train_step',
    description: [
      'Overriding train_step is often the right middle ground when the default fit behavior is close but not enough. The project keeps a Keras model and training lifecycle while owning the exact update step.',
      'This pattern is useful for custom objectives, extra logging, or unusual batch logic.',
    ],
    code: `import keras

class CustomModel(keras.Model):
    def train_step(self, data):
        x, y = data
        with keras.backend.GradientTape() as tape:
            y_pred = self(x, training=True)
            loss = self.compute_loss(x=x, y=y, y_pred=y_pred)

        gradients = tape.gradient(loss, self.trainable_variables)
        self.optimizer.apply_gradients(zip(gradients, self.trainable_variables))
        self.compute_metrics(x, y, y_pred)
        return {metric.name: metric.result() for metric in self.metrics}`,
    notes: [
      'Override only the step that truly needs custom behavior.',
      'The more custom the training path becomes, the more explicit the tests should be.',
    ],
  },
  {
    id: 'ex-save-load',
    title: 'Saving and Reloading a Model',
    description: [
      'Saving and reload validation are part of the normal Keras workflow because deployment depends on reproducible inference behavior. A training run is not complete if the artifact cannot be reloaded reliably.',
      'The example below shows the standard model artifact path.',
    ],
    code: `import keras

model.save("artifacts/churn_model.keras")
reloaded = keras.models.load_model("artifacts/churn_model.keras")
pred = reloaded.predict(X_batch)`,
    notes: [
      'Validate reload behavior before calling a model production-ready.',
      'Persist preprocessing assumptions and input contracts alongside the model file.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundations',
    terms: [
      {
        term: 'Layer',
        definition:
          'A reusable computation block that transforms inputs into outputs and may contain trainable weights.',
      },
      {
        term: 'Model',
        definition: 'A trainable composition of layers with a defined forward path and lifecycle.',
      },
      {
        term: 'Sequential',
        definition:
          'A simple stack-based model API for architectures that flow directly from one layer to the next.',
      },
      {
        term: 'Functional API',
        definition:
          'A graph-oriented API for models with multiple inputs, outputs, or internal branching.',
      },
      {
        term: 'Subclassing',
        definition:
          'A customization style where user-defined classes implement specialized layer or model behavior.',
      },
      {
        term: 'Compile',
        definition:
          'The step that binds optimizer, loss, and metrics to a model before standard training.',
      },
      {
        term: 'Fit',
        definition:
          'The high-level training entry point that handles epochs, batches, validation, callbacks, and metrics.',
      },
    ],
  },
  {
    id: 'glossary-training',
    title: 'Training and Evaluation',
    terms: [
      {
        term: 'Loss function',
        definition: 'The optimization target the model tries to minimize during learning.',
      },
      {
        term: 'Metric',
        definition:
          'An evaluation quantity used to describe model behavior during training or validation.',
      },
      {
        term: 'Optimizer',
        definition: 'The algorithm that converts gradients into parameter updates.',
      },
      {
        term: 'Callback',
        definition:
          'A hook object that reacts to training events such as metric improvement or epoch completion.',
      },
      {
        term: 'Early stopping',
        definition:
          'A callback strategy that halts training when validation behavior stops improving usefully.',
      },
      {
        term: 'Checkpoint',
        definition: 'A saved model state used for recovery, comparison, or deployment.',
      },
      {
        term: 'Batch size',
        definition: 'The number of examples processed together in one update step.',
      },
    ],
  },
  {
    id: 'glossary-deployment',
    title: 'Saving and Deployment',
    terms: [
      {
        term: 'Serialization',
        definition: 'Saving a model artifact so it can be restored and reused later.',
      },
      {
        term: 'Inference contract',
        definition:
          'The full expectation around model inputs, outputs, preprocessing, and runtime behavior needed for correct prediction.',
      },
      {
        term: 'History object',
        definition: 'The record returned by fit that contains per-epoch metric traces.',
      },
      {
        term: 'Trainable variables',
        definition:
          'The parameters in a model that receive gradient-based updates during training.',
      },
      {
        term: 'Custom train_step',
        definition:
          'An overridden model method that defines how a single training step should behave while preserving much of the fit workflow.',
      },
      {
        term: 'Regularization',
        definition:
          'Any strategy that helps control overfitting, such as dropout, penalties, or early stopping.',
      },
    ],
  },
]
const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="keras-help98-section">
      <h2 className="keras-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="keras-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="keras-help98-section">
      <h2 className="keras-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="keras-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="keras-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="keras-help98-section">
      <h2 className="keras-help98-heading">{section.title}</h2>
      <dl className="keras-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="keras-help98-divider" /> : null}
    </section>
  )
}

export default function KerasPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Keras Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Keras Page"
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
