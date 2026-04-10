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

const PAGE_TITLE = 'XGBoost'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'XGBoost is a high-performance gradient boosting library best known for tree-based supervised learning on structured and tabular data. It combines the core idea of additive boosting with engineering features such as regularization, sparsity-aware split finding, fast histogram-based tree construction, missing-value handling, parallel training, distributed execution, and GPU acceleration.',
  'The most useful mental model is not just "boosted trees," but "an industrial-strength system for fitting many small decision trees stage by stage so each new tree corrects the remaining error of the current ensemble." That is why XGBoost is often a strong default for regression, classification, ranking, and feature-rich business data where interactions and nonlinear boundaries matter.',
  'This page is intentionally comprehensive. It covers how XGBoost works, what makes it different from plain gradient boosting, data interfaces, objectives, boosters, training workflow, major hyperparameters, missing values, categorical support, constraints, evaluation, interpretation, scaling, production tradeoffs, examples, and a practical glossary.',
  'To use XGBoost well, it helps to separate three questions. First, is the learning problem genuinely tabular and supervised? Second, is the validation setup faithful to how the model will be used? Third, are the features and objectives aligned with the decision you actually care about? If those foundations are strong, XGBoost is often one of the most effective and fastest paths to a serious baseline or production model.',
  'The library rewards disciplined modeling more than memorized parameter recipes. Teams usually get the biggest gains from label design, leakage control, split strategy, feature engineering, sampling logic, thresholding, and model monitoring. Hyperparameter tuning matters, but it rarely rescues a weak problem formulation.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'XGBoost is an optimized implementation of gradient boosting designed for speed, scalability, and strong predictive performance on structured datasets. In practice, it is usually used with decision-tree boosters, where each tree learns from the residual error or gradient signal left by the current ensemble.',
      'Its popularity comes from two things happening at once. At the algorithm level, boosting is expressive and often highly accurate on tabular data. At the systems level, XGBoost makes that idea practical by supporting efficient split search, regularization, sparse inputs, out-of-core patterns, parallelism, and multiple language interfaces.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why XGBoost Matters',
    paragraphs: [
      'For many years, XGBoost became the standard baseline that strong tabular-modeling workflows had to beat. It was widely adopted in production systems, recommendation and ranking stacks, risk models, forecasting pipelines, and data science competitions because it could turn careful feature engineering into excellent accuracy with relatively little architectural complexity.',
      'Even as LightGBM, CatBoost, neural tabular models, and autoML systems became more common, XGBoost remained important because it is reliable, configurable, interpretable enough for many practical settings, and well integrated with Python, R, JVM tooling, and distributed data ecosystems.',
    ],
    bullets: [
      'Usually strongest on structured or engineered tabular features.',
      'Supports regression, classification, ranking, survival-style workflows, and custom objectives.',
      'Balances predictive power with operational familiarity better than many heavier model classes.',
      'Often serves as the model to benchmark before reaching for more complex systems.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of XGBoost as an additive ensemble builder. The model starts simple, then repeatedly adds a new weak learner that is trained to improve the current ensemble according to an objective function. In tree boosting, each learner is usually a shallow decision tree that partitions the feature space into regions and adds a score adjustment in each region.',
      'The ensemble gets stronger not because any single tree is large, but because many trees each contribute a small correction. Shrinkage, regularization, sampling, and early stopping keep that correction process from memorizing noise too aggressively.',
    ],
    bullets: [
      'One model equals many trees added stage by stage.',
      'Each stage reacts to the current error signal, not the raw labels alone.',
      'Tree depth, learning rate, regularization, and sampling jointly control capacity.',
      'The final prediction is the accumulated contribution of all fitted learners.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where XGBoost Fits Best',
    paragraphs: [
      'XGBoost is strongest when the problem is supervised learning over structured records: customer rows, transactions, logs, events, ranking candidates, sensor summaries, fraud signals, underwriting features, ad-serving features, search features, or any setting where useful information can be expressed as columns.',
      'It is especially effective when relationships are nonlinear, feature interactions matter, the dataset contains heterogeneous scales or missing values, and the team can invest in feature engineering or data-quality work. Tree boosting often extracts a great deal of value from modest to medium-size datasets where deep learning would be unnecessarily heavy.',
    ],
    bullets: [
      'Tabular business data and feature-engineered datasets.',
      'Problems with nonlinear effects and interaction-heavy structure.',
      'Settings where interpretability and feature importance still matter.',
      'Teams that need a strong baseline before trying more specialized models.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where XGBoost Is Not the Best Default',
    paragraphs: [
      'XGBoost is not a first-choice model for raw unstructured modalities such as images, audio, or long text unless another representation layer has already turned them into meaningful features. It is also not ideal when the problem is almost perfectly linear and a simpler model would be cheaper, more stable, and easier to calibrate.',
      'It can become an awkward choice when categorical handling dominates the problem and CatBoost-style native category logic is a better fit, or when ultra-large distributed ranking or streaming systems are better served by other specialized tooling. High accuracy is possible, but the operational and tuning burden should still be justified by the use case.',
    ],
    bullets: [
      'Raw text, image, audio, or sequence modeling without feature extraction.',
      'Problems where a linear or rules-based model already solves the task well.',
      'Situations where category-heavy data may favor alternative boosted-tree libraries.',
      'Workloads where inference cost, calibration needs, or governance constraints dominate.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A practical XGBoost workflow usually begins with data cleaning and feature engineering, followed by a train-validation split that respects time, leakage, or ranking-group boundaries. The initial model is often a conservative tree-based baseline using histogram tree building, moderate depth, subsampling, and early stopping.',
      'From there, teams iterate on objective choice, feature representation, class imbalance strategy, regularization, sampling ratios, and thresholding or calibration. Most gains come from sound validation design and feature quality before they come from heroic parameter searches.',
    ],
    bullets: [
      'Define the prediction target and a leakage-safe split.',
      'Build a baseline with sensible defaults and early stopping.',
      'Improve features and validation before heavy hyperparameter search.',
      'Tune capacity, sampling, and regularization around the actual error modes.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'XGBoost is best understood as a powerful, production-proven tabular-learning system rather than a single algorithmic trick. Its strength comes from the combination of boosting mathematics and engineering decisions that make training practical on real data.',
      'If the dataset is structured, the validation strategy is sound, and the features are meaningful, XGBoost is often one of the highest-signal models to try early. If those foundations are weak, no amount of tuning will compensate for leakage, broken objectives, or bad data representation.',
    ],
    bullets: [
      'Good data and validation matter more than exotic parameter recipes.',
      'XGBoost usually shines on structured data with interactions and nonlinear effects.',
      'Tree depth, learning rate, regularization, and sampling are the main capacity controls.',
      'Treat it as a system for disciplined supervised learning, not a magic accuracy button.',
    ],
  },
  {
    id: 'bp-why-it-performs',
    title: 'Why It Performs So Well in Practice',
    paragraphs: [
      'XGBoost performs well because boosted trees are very good at modeling nonlinear structure, threshold effects, interaction effects, heterogeneous feature scales, and missingness patterns without requiring the kind of manual basis expansion a linear model often needs. In many business datasets, that flexibility lines up unusually well with the actual data-generating process.',
      'Its engineering matters just as much as its statistics. Faster training loops mean more realistic validation, more feature iteration, more ablation studies, and more careful tuning under deadline pressure. A model class can be theoretically strong and still lose in practice if the surrounding tooling is too slow or fragile. XGBoost became durable because it made serious tabular modeling operationally practical.',
    ],
    bullets: [
      'Strong fit for nonlinear tabular structure.',
      'Robust handling of mixed numeric, sparse, and partially missing inputs.',
      'Fast enough to support disciplined experimentation.',
      'Accurate enough to remain a benchmark even when newer libraries exist.',
    ],
  },
  {
    id: 'bp-data-reality',
    title: 'What Strong XGBoost Projects Depend On',
    paragraphs: [
      'The best XGBoost systems are usually built on high-quality supervision, careful temporal or group-aware splitting, and domain-informed features. The algorithm is powerful, but it will gladly optimize any pattern the data exposes, including leakage, labeling shortcuts, feedback loops, and artifacts that look predictive in validation but collapse in deployment.',
      'That makes XGBoost less of an isolated algorithm choice and more of a modeling discipline. Teams that win with it tend to invest heavily in feature lineage, split realism, metric choice, class weighting or ranking logic, and post-training decision calibration. Those practices matter more than squeezing out tiny benchmark gains from parameter micromanagement.',
    ],
    bullets: [
      'Leakage-safe train, validation, and test design.',
      'Feature engineering that reflects how data exists at prediction time.',
      'Task-appropriate objective and evaluation metrics.',
      'Monitoring and refresh logic after deployment.',
    ],
  },
  {
    id: 'bp-lifecycle',
    title: 'Lifecycle in Real Teams',
    paragraphs: [
      'In many organizations, XGBoost starts in notebook exploration, becomes the benchmark in offline experiments, and then moves into a scheduled training or scoring pipeline. Later it may be exported, embedded in a service, batch-scored in a warehouse environment, or retrained automatically on a cadence that matches business drift.',
      'This lifecycle matters because operational constraints eventually shape model design. A very accurate ensemble with thousands of deep trees may be acceptable for nightly scoring but not for tight latency APIs. Likewise, a category encoding that works offline may fail in production if the serving stack cannot preserve the same feature typing or mapping logic.',
    ],
    bullets: [
      'Exploration phase: establish leakage-safe baselines.',
      'Iteration phase: improve features and validation realism.',
      'Production phase: manage latency, schema stability, and retraining.',
      'Maintenance phase: monitor drift, calibration, and slice performance.',
    ],
  },
  {
    id: 'bp-decision-guide',
    title: 'Decision Guide',
    paragraphs: [
      'If the data is structured, the label is supervised, the rows are independent enough for a tabular setup, and feature engineering is feasible, XGBoost is usually worth trying early. If the data is raw text, audio, images, or long sequential behavior, another representation-learning system is often a better starting point unless those modalities have already been converted into informative columns.',
      'A useful decision rule is to compare XGBoost not only against alternative models but against the total system you are willing to maintain. The best model on paper is not always the best production choice. XGBoost is often selected because it sits at a strong point on the frontier of accuracy, speed, maturity, inspectability, and deployment practicality.',
    ],
    bullets: [
      'Try it early for tabular supervised problems.',
      'Be cautious when raw modality learning is central to the task.',
      'Compare full-system cost, not just leaderboard accuracy.',
      'Prefer it when operational maturity matters alongside predictive quality.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What XGBoost Actually Is',
    paragraphs: [
      'XGBoost stands for Extreme Gradient Boosting. In practice, it is a software library that implements boosted learners with a strong emphasis on tree boosters. The term "extreme" is less about a different statistical principle and more about an aggressively optimized implementation that made gradient boosting faster and easier to use at scale.',
      'The library is not limited to one narrow interface. It exposes low-level training APIs, scikit-learn-compatible estimators in Python, language bindings in multiple ecosystems, and integration points for distributed data processing. That breadth is part of why it became a foundational tool in applied machine learning.',
    ],
  },
  {
    id: 'core-how-boosting-works',
    title: 'How Gradient Boosting Works',
    paragraphs: [
      'Gradient boosting builds a model in stages. Instead of fitting one large tree, it fits a sequence of weak learners, each chosen to reduce the current objective. For squared-error regression this often looks like fitting residuals. For more general losses, the learner is fitted against first-order or second-order information derived from the objective.',
      'XGBoost uses this incremental process with an explicit objective that includes both training loss and model complexity penalties. That means each new tree must justify its added complexity in terms of the improvement it brings. The model is therefore both greedy and regularized.',
    ],
    bullets: [
      'Boosting is additive, not one-shot fitting.',
      'Each tree corrects the current ensemble rather than starting from scratch.',
      'The objective combines predictive fit with complexity penalties.',
      'Shrinking each step with a learning rate stabilizes training.',
    ],
  },
  {
    id: 'core-boosters',
    title: 'Booster Families',
    paragraphs: [
      'The most common XGBoost booster is the tree booster, usually configured through gbtree. This is the workhorse for tabular learning and the reason most teams adopt XGBoost. It creates decision trees and sums their outputs across boosting rounds.',
      'XGBoost also supports dropout-style boosted trees through DART and a linear booster for some workflows, but the overwhelming practical use is tree-based boosting. When people say "XGBoost model" in production or competition settings, they usually mean a gradient-boosted tree ensemble.',
    ],
    bullets: [
      'gbtree: standard boosted decision trees.',
      'dart: tree boosting with dropout-like regularization across rounds.',
      'gblinear: linear boosting option for narrower use cases.',
    ],
  },
  {
    id: 'core-data-interface',
    title: 'Data Interface and DMatrix',
    paragraphs: [
      'XGBoost can consume arrays, matrices, data frames, and sparse representations through higher-level APIs, but its core training abstraction is the DMatrix. DMatrix is a data container optimized for training and prediction, especially when labels, weights, base margins, feature names, group information, or sparse structure need to be attached efficiently.',
      'The main reason this matters is performance and metadata. Many serious workflows eventually need instance weights, ranking groups, validation sets, or memory-efficient sparse handling. Understanding DMatrix helps explain why XGBoost feels more like a modeling system than a thin estimator wrapper.',
    ],
    bullets: [
      'Supports dense and sparse tabular inputs.',
      'Can attach labels, weights, feature names, and group metadata.',
      'Useful for low-level training workflows and advanced objectives.',
      'Central to efficient handling of large tabular datasets.',
    ],
  },
  {
    id: 'core-objectives',
    title: 'Objectives and Problem Types',
    paragraphs: [
      'XGBoost is used for much more than binary classification. Common objectives include squared-error regression, logistic classification, multiclass classification, ranking losses, count-style objectives, and custom objectives supplied by advanced users. The objective determines what signal each boosting round is trying to improve.',
      'This is one of the most important modeling decisions. Choosing the wrong objective can make evaluation confusing or produce a model optimized for a target that does not match the business question. The objective should align with both the label semantics and the downstream decision process.',
    ],
    bullets: [
      'Regression for continuous targets.',
      'Binary and multiclass classification for labeled categories.',
      'Learning-to-rank for ordered results within query groups.',
      'Custom objectives when domain-specific losses matter.',
    ],
  },
  {
    id: 'core-tree-construction',
    title: 'Tree Construction and Split Finding',
    paragraphs: [
      'A boosted tree model depends on how each tree searches for useful splits. XGBoost offers several tree-building strategies, and in modern workflows the histogram-based method is often the practical default because it is fast and memory efficient. Instead of evaluating every possible split exactly, values are bucketed into bins, which makes training significantly more scalable.',
      'The key point is that tree construction is both an algorithmic and systems problem. Faster split search lets teams train more rounds, tune more ideas, and operate on bigger datasets without changing the basic modeling workflow.',
    ],
    bullets: [
      'Exact split search can be accurate but expensive.',
      'Histogram-based tree methods trade some granularity for speed and scalability.',
      'Sparse-aware handling helps when many features are missing or zero.',
      'Tree construction strategy affects both memory use and wall-clock time.',
    ],
  },
  {
    id: 'core-regularization',
    title: 'Regularization and Capacity Control',
    paragraphs: [
      'XGBoost distinguishes itself from older boosting recipes by making regularization a first-class concern. Model complexity can be controlled through tree depth, minimum child weight, split penalties, leaf penalties, learning rate, number of rounds, and row or feature subsampling.',
      'These controls interact. A low learning rate with many trees is not automatically safe; deep trees with weak regularization can still overfit. Conversely, too much regularization can prevent the ensemble from learning meaningful signal. Effective tuning is about finding stable capacity for the dataset, not blindly maximizing rounds.',
    ],
    bullets: [
      'learning_rate or eta controls how much each tree contributes.',
      'max_depth and min_child_weight shape tree complexity.',
      'gamma can require larger gain before a split is accepted.',
      'reg_alpha and reg_lambda penalize overly flexible fits.',
      'n_estimators or num_boost_round sets the boosting horizon.',
    ],
  },
  {
    id: 'core-sampling',
    title: 'Sampling and Robustness',
    paragraphs: [
      'Subsample and column subsampling are practical regularizers. Row subsampling makes each boosting round see only part of the training data, while feature subsampling limits which columns are considered for a tree or split. These reduce correlation between learners and can improve both generalization and training cost.',
      'Sampling is especially helpful when the dataset is wide, noisy, or large enough that full deterministic fits produce brittle trees. It is not a replacement for strong validation, but it is one of the simplest and most effective ways to stabilize training.',
    ],
    bullets: [
      'subsample controls row sampling per boosting round.',
      'colsample_bytree, colsample_bylevel, and related knobs control feature sampling.',
      'Sampling reduces variance and often improves generalization.',
      'Aggressive sampling can hurt if the dataset is already small or sparse in signal.',
    ],
  },
  {
    id: 'core-missing-and-categorical',
    title: 'Missing Values and Categorical Features',
    paragraphs: [
      "One of XGBoost's practical strengths is that it can learn default directions for missing values when splitting tree nodes. That means missingness can be handled as part of the tree logic instead of always requiring manual imputation before modeling. In real tabular workflows, that is often a major quality-of-life advantage.",
      'Categorical features require more care. Many teams historically used one-hot or target-style encodings before feeding data into XGBoost. Newer workflows can also use native categorical handling in supported interfaces, but the right representation still depends on cardinality, validation strategy, leakage risk, and serving constraints.',
    ],
    bullets: [
      'Missing values are often handled natively during split decisions.',
      'One-hot encoding is common but not always the best choice.',
      'Native categorical support can simplify pipelines when the interface supports it.',
      'Target or mean encoding can help, but must be leakage-safe.',
    ],
  },
  {
    id: 'core-constraints',
    title: 'Constraints and Structured Priors',
    paragraphs: [
      'XGBoost can encode certain forms of prior knowledge through monotonic constraints and interaction constraints. Monotonic constraints tell the model that increasing a feature should only move the prediction in one direction, while interaction constraints limit which features may appear together in the same branch structure.',
      'These capabilities matter in regulated, scientific, and domain-constrained settings where unrestricted flexible trees may learn patterns that are statistically convenient but operationally unacceptable. Constraints do not replace good data, but they can make a model more defensible and easier to reason about.',
    ],
    bullets: [
      'Monotonic constraints can encode domain knowledge such as risk increasing with debt load.',
      'Interaction constraints can restrict feature combinations.',
      'Constraints trade some flexibility for control and interpretability.',
      'They are especially useful when governance matters as much as raw accuracy.',
    ],
  },
  {
    id: 'core-evaluation',
    title: 'Evaluation, Validation, and Early Stopping',
    paragraphs: [
      'XGBoost training is usually paired with a validation set and one or more evaluation metrics. Early stopping monitors validation performance and halts training when additional rounds stop improving the chosen metric, which is one of the most practical defenses against overfitting.',
      'The key discipline is to match the validation protocol to the real deployment setting. Random splits may be fine for iid records, but time-based, group-aware, or entity-aware splits are often necessary. A perfectly tuned model on a leaky or unrealistic split is still a bad model.',
    ],
    bullets: [
      'Always monitor a metric aligned with the task.',
      'Use early stopping when validation data is representative.',
      'Preserve query groups for ranking and chronology for forecasting.',
      'Threshold selection and calibration are separate from model fitting.',
    ],
  },
  {
    id: 'core-feature-importance',
    title: 'Feature Importance and Interpretation',
    paragraphs: [
      'XGBoost can report feature importance using several definitions such as gain, weight, or cover. These summaries are useful for quick diagnostics, but they are not the same thing as causal influence. They tell you which features the fitted ensemble relied on according to a chosen accounting method.',
      'For deeper interpretation, teams often supplement built-in importance scores with SHAP-style analyses, partial dependence checks, calibration plots, and slice-based error analysis. Interpretation should be viewed as model auditing, not as proof that the model discovered true causal structure.',
    ],
    bullets: [
      'Built-in importance metrics answer different questions.',
      'Gain often reflects contribution to split quality rather than direct business importance.',
      'Correlated features can distribute or hide importance unpredictably.',
      'Interpret results alongside validation slices and domain knowledge.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, Scaling, and Hardware',
    paragraphs: [
      'XGBoost is engineered for efficient training. Histogram tree methods, sparse-aware logic, parallel split finding, distributed execution, and GPU support are all part of the reason it became a serious production choice rather than only an academic model. Those features let teams use larger validation loops and bigger datasets without abandoning the familiar boosting workflow.',
      'That said, model speed depends on more than training throughput. Inference latency depends on the number of trees, their depth, the serving environment, and whether the model is used for single-record real-time decisions or large offline batches. Good performance work balances accuracy against both training cost and serving cost.',
    ],
    bullets: [
      'Histogram methods are usually a strong default for scalable training.',
      'GPU acceleration can materially reduce training time for suitable workloads.',
      'Inference cost grows with tree count and tree complexity.',
      'Production performance should be measured end to end, not inferred from benchmarks.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and APIs',
    paragraphs: [
      'One reason XGBoost remains durable is that it fits many ecosystem styles. In Python it works through low-level training functions and scikit-learn-style estimators. In R it integrates naturally with data-analysis workflows. It also appears in JVM and distributed settings where data engineering pipelines need a strong tabular learner.',
      'This matters for architecture. Teams can start with notebook experimentation, move to training pipelines, and later export or serve models without having to switch to an entirely different conceptual model. The library is flexible enough to meet both exploratory and production needs.',
    ],
    bullets: [
      'Python low-level API plus sklearn-compatible estimators.',
      'R interface for statistical and analytical workflows.',
      'Distributed and ecosystem integrations for larger-scale pipelines.',
      'Usable from experimentation through production deployment.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Use Cases',
    paragraphs: [
      'XGBoost appears in risk scoring, fraud detection, ad click prediction, customer churn, recommendation candidate ranking, search ranking, lead scoring, claims prediction, pricing models, demand forecasting with engineered features, and many other structured-data tasks. It is particularly effective when rich domain features encode the relevant signal.',
      'A useful rule of thumb is that if a team can describe the prediction problem as a table of rows and columns with a well-defined supervised label, XGBoost is at least worth benchmarking. It may not always win, but it often sets a high bar quickly.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'XGBoost is powerful, but it is not self-correcting. It can happily overfit, exploit leakage, amplify biased features, or optimize a metric that does not reflect the real business decision. Many disappointing XGBoost systems fail because of data and evaluation mistakes, not because the library underperformed.',
      'Another common mistake is treating hyperparameter search as the main source of improvement. In many tabular problems, feature design, label definition, train-validation splitting, imbalance strategy, and post-training thresholding matter as much or more than fine-grained tuning.',
    ],
    bullets: [
      'Beware data leakage in target encodings, aggregates, and future-derived features.',
      'Do not equate feature importance with causality or fairness.',
      'Tune against the true deployment metric, not a convenient proxy.',
      'Account for calibration and decision thresholds separately from AUC or log loss.',
      'Watch inference cost when tree count and depth grow large.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast',
    paragraphs: [
      'Compared with random forests, XGBoost usually offers stronger accuracy when tuned well, especially on complex tabular tasks, but it is more sensitive to hyperparameters and validation protocol. Compared with plain linear models, it captures nonlinearities and interactions automatically, though at the cost of greater complexity and sometimes weaker calibration.',
      'Compared with LightGBM, XGBoost is often seen as more conservative and predictable in some workflows, while LightGBM may be faster or more memory efficient for certain large problems. Compared with CatBoost, XGBoost may require more manual treatment of categorical features, while CatBoost can be especially attractive on category-heavy datasets. The correct choice depends on data shape, latency constraints, team familiarity, and the surrounding platform.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Practical Tuning Checklist',
    paragraphs: [
      'A disciplined tuning process starts with a stable baseline and a trustworthy validation split. Only after that should the team widen the search over learning rate, depth, child-weight constraints, sampling ratios, regularization, and boosting rounds.',
      'The goal is not to discover a mythical universal parameter set. The goal is to find a model that is accurate, stable across folds or time periods, operationally affordable, and understandable enough for its domain.',
    ],
    bullets: [
      'Choose the right objective and evaluation metric first.',
      'Use a leakage-safe validation split with early stopping.',
      'Start with histogram trees, moderate depth, and conservative learning rate.',
      'Tune depth and child-weight before chasing tiny gains in obscure parameters.',
      'Use subsampling and column sampling to stabilize noisy fits.',
      'Measure calibration, threshold behavior, and slice quality after training.',
    ],
  },
  {
    id: 'core-second-order',
    title: 'Objective Function, Gradients, and Hessians',
    paragraphs: [
      'A major reason XGBoost is more than a generic boosting implementation is that it uses first-order and second-order information from the objective when fitting new trees. Informally, the gradient tells the learner which direction would reduce error, and the Hessian tells it something about local curvature or confidence around that direction.',
      'That second-order formulation helps the library compute split gains and leaf weights in a principled and efficient way. It also explains why custom objectives in XGBoost are more demanding than just writing a loss function name. Advanced users may need to supply derivatives that are numerically stable and semantically aligned with the problem.',
    ],
    bullets: [
      'Gradients capture direction of improvement.',
      'Hessians help quantify curvature and local sensitivity.',
      'Split quality is tied to objective-driven gain, not just raw impurity intuition.',
      'Custom objectives require derivative logic that matches the training API.',
    ],
  },
  {
    id: 'core-split-gain',
    title: 'Leaf Scores, Split Gain, and Tree Pruning',
    paragraphs: [
      'Each candidate split in XGBoost is evaluated by how much it improves the regularized objective. The resulting gain reflects whether dividing the data into separate branches creates enough improvement to justify the additional model complexity. This is why gamma and regularization terms matter directly in tree growth behavior.',
      'Leaf weights are also computed from aggregated gradient and Hessian statistics. In practice, this means a tree is not merely memorizing labels at each branch. It is estimating score adjustments based on the local optimization landscape implied by the objective. Pruning then removes splits that do not earn their complexity cost.',
    ],
    bullets: [
      'Split gain measures objective improvement after regularization.',
      'Leaf values are derived from summarized derivative statistics.',
      'Gamma can block weak splits that add complexity without enough signal.',
      'Pruning helps keep the tree from growing into noise.',
    ],
  },
  {
    id: 'core-tree-methods',
    title: 'Tree Methods and Execution Modes',
    paragraphs: [
      'XGBoost supports multiple tree-building strategies, including exact-style search, approximate methods, and histogram-based construction. In contemporary workflows, histogram trees are often the default because they provide strong speed and memory behavior while keeping accuracy competitive. The choice of tree method is often as much about systems constraints as it is about modeling theory.',
      'There are also hardware choices layered on top of that tree logic. CPU training is common and reliable, while GPU-enabled workflows can make large experiments materially faster when the environment supports it. The right method depends on data size, feature count, sparsity, hardware availability, and whether faster experimentation changes what the team can actually validate.',
    ],
    bullets: [
      'Exact methods can be expensive on large data.',
      'Histogram methods are often the practical default.',
      'Sparse-aware logic improves training efficiency on sparse matrices or missing-heavy data.',
      'Hardware choice influences experimentation speed, not just final training time.',
    ],
  },
  {
    id: 'core-parameter-groups',
    title: 'Hyperparameter Families',
    paragraphs: [
      'It is useful to group XGBoost hyperparameters by role rather than memorizing them as a flat list. Some parameters control step size and boosting horizon, some control tree complexity, some regularize split acceptance, some sample rows or columns, and some govern optimization method or device behavior.',
      'Thinking in parameter families makes tuning more rational. If the model is underfitting, you usually adjust capacity or horizon. If it is unstable, you strengthen regularization, sampling, or validation discipline. If it is too slow, you change tree method, feature representation, or search procedure before blindly shrinking the search space.',
    ],
    bullets: [
      'Capacity controls: max_depth, min_child_weight, max_leaves, n_estimators.',
      'Step-size controls: eta or learning_rate.',
      'Regularization controls: gamma, reg_alpha, reg_lambda.',
      'Sampling controls: subsample and colsample variants.',
      'Execution controls: tree_method, device, parallel and memory choices.',
    ],
  },
  {
    id: 'core-imbalance',
    title: 'Class Imbalance and Cost Sensitivity',
    paragraphs: [
      'Imbalanced classification is common in XGBoost use cases such as fraud, risk, anomaly filtering, and medical screening. The core issue is not only that one class is rare, but that the business costs of false positives and false negatives are often asymmetric. A high AUC model can still be operationally poor if the threshold or weighting strategy does not match those costs.',
      'XGBoost can address imbalance through class weights, instance weights, sampling strategy, threshold tuning, or objective selection. Parameters such as scale_pos_weight can help in some binary settings, but they are not a universal fix. Good imbalance handling usually combines weighting with realistic validation metrics, precision-recall analysis, calibration checks, and post-training threshold selection.',
    ],
    bullets: [
      'Rare classes often require more than default thresholding.',
      'Weighting and sampling should reflect operational cost, not only label frequency.',
      'AUC alone is often insufficient for heavily imbalanced tasks.',
      'Threshold tuning is part of the modeling pipeline, not an afterthought.',
    ],
  },
  {
    id: 'core-ranking-workflows',
    title: 'Ranking Workflows and Group Structure',
    paragraphs: [
      'XGBoost is widely used for learning-to-rank tasks, where the goal is not independent label prediction but correct ordering within a group such as a search query, recommendation candidate set, or auction context. In these problems, the structure of groups is central. Mixing candidates from different groups incorrectly can invalidate the problem definition.',
      'Ranking workflows introduce their own modeling discipline. Group boundaries must be preserved in training and validation. Evaluation metrics like NDCG and MAP are more meaningful than standard classification metrics. Feature engineering often emphasizes relative comparisons, query context, and candidate interactions rather than row-independent label estimation.',
    ],
    bullets: [
      'Preserve query or group boundaries throughout the pipeline.',
      'Use ranking objectives and metrics aligned with ordering quality.',
      'Validation must mirror the real candidate-generation and ranking context.',
      'Group metadata is part of the model input contract in low-level APIs.',
    ],
  },
  {
    id: 'core-data-preparation',
    title: 'Feature Engineering and Data Preparation',
    paragraphs: [
      'XGBoost often benefits from strong feature engineering because the model can exploit useful handcrafted signals extremely well. Ratios, aggregates, lags, bucketed features, interaction proxies, domain-specific encodings, and historical summary features can all materially improve performance when they are constructed without leakage.',
      'The most important constraint is temporal and causal realism. Every feature must correspond to information genuinely available at prediction time. This becomes especially important with target encodings, rolling aggregates, group statistics, and joined reference tables. The strongest XGBoost feature sets are usually the ones with the most disciplined provenance, not the largest number of columns.',
    ],
    bullets: [
      'Feature quality usually matters more than exotic tuning.',
      'Aggregates and encodings must be leakage-safe.',
      'Schema stability matters for production scoring.',
      'Strong features often come from domain understanding rather than algorithm tricks.',
    ],
  },
  {
    id: 'core-cross-validation',
    title: 'Cross-Validation and Model Selection',
    paragraphs: [
      'Cross-validation remains useful in XGBoost, especially when dataset size is limited or one split is too noisy to trust. However, the split strategy must still respect the structure of the problem. Random folds are inappropriate for many temporal, grouped, entity-based, or ranking tasks. In those cases, grouped or time-aware validation is more important than maximizing the number of folds.',
      'Model selection should be treated as a search over modeling decisions, not just hyperparameters. Objective choice, feature sets, leakage safeguards, calibration pipeline, threshold logic, and inference constraints all belong in the selection process. The best offline score is not necessarily the best deployable model if it relies on unrealistic features or unstable behavior.',
    ],
    bullets: [
      'Use fold design that matches deployment reality.',
      'Compare full modeling pipelines, not isolated parameter sets.',
      'Track variance across folds or time blocks, not only mean score.',
      'Keep an untouched test set or final holdout whenever the workflow allows.',
    ],
  },
  {
    id: 'core-calibration-thresholds',
    title: 'Calibration, Thresholds, and Decision Policy',
    paragraphs: [
      'For classification tasks, the raw output of XGBoost is often not the end product. Teams usually need a decision threshold, a ranking cutoff, a triage band, or a probability that is calibrated enough for downstream planning. A model can rank cases very well and still produce probabilities that are poorly aligned with observed frequencies.',
      'This distinction matters in production. Thresholds should be tuned against business objectives such as review capacity, recall targets, expected profit, or intervention cost. Calibration methods may be added after training when downstream systems interpret outputs probabilistically. These are deployment decisions layered on top of model fitting, not signs that the model itself failed.',
    ],
    bullets: [
      'Ranking quality and calibrated probability quality are different goals.',
      'Choose thresholds using the real decision objective.',
      'Evaluate precision-recall tradeoffs and operating points explicitly.',
      'Calibration can improve usefulness even when discrimination is already strong.',
    ],
  },
  {
    id: 'core-model-artifacts',
    title: 'Model Persistence, Serving, and Artifacts',
    paragraphs: [
      'A trained XGBoost model is usually persisted as a booster artifact plus the metadata needed to rebuild the exact feature pipeline around it. In serious systems, the model file alone is not enough. You also need schema expectations, feature ordering or naming, category handling logic, preprocessing assumptions, evaluation provenance, and version identifiers.',
      'Serving concerns vary by environment. Batch scoring may prioritize throughput and reproducibility, while online scoring cares more about latency, memory footprint, warm starts, and failure handling. XGBoost itself can be straightforward to serialize, but the surrounding feature contract is where many deployment bugs appear.',
    ],
    bullets: [
      'Persist feature metadata alongside the model.',
      'Version the full inference contract, not only the booster binary.',
      'Validate schema and feature ordering at serve time.',
      'Plan separately for batch inference and low-latency online inference.',
    ],
  },
  {
    id: 'core-monitoring',
    title: 'Monitoring, Drift, and Retraining',
    paragraphs: [
      'An XGBoost model can degrade for reasons that are unrelated to the training algorithm. Feature distributions can shift, user behavior can change, upstream logging can break, labels can be delayed or redefined, and intervention policies can create feedback effects. Monitoring therefore needs to cover data drift, score drift, calibration drift, and business outcome drift.',
      'Retraining policy should reflect how the domain changes. Some models can be retrained weekly or monthly with stable workflows; others need event-triggered refreshes, champion-challenger evaluation, or manual sign-off. A technically strong model is still brittle if the organization has no process for detecting when it has stopped matching reality.',
    ],
    bullets: [
      'Monitor input distributions and missingness patterns.',
      'Track performance by segment, not only overall averages.',
      'Watch calibration and threshold stability over time.',
      'Design retraining cadence around business drift, not habit alone.',
    ],
  },
  {
    id: 'core-misuse-patterns',
    title: 'Common Misuse Patterns',
    paragraphs: [
      'One misuse pattern is treating XGBoost as a black box accuracy engine and skipping problem framing. Another is optimizing only one convenient metric without considering thresholding, calibration, fairness, latency, or the actual action the prediction is supposed to drive. These mistakes can produce impressive experiment dashboards and disappointing deployed systems.',
      'A different misuse pattern is over-trusting feature importance charts. Importance can be useful for auditing, but it does not establish causality, fairness, or robustness. Likewise, aggressively tuning against a single validation split can create the illusion of rigor while quietly overfitting the experimentation process itself. The solution is not less modeling power, but more disciplined validation and governance.',
    ],
    bullets: [
      'Do not confuse offline score gains with production value.',
      'Do not treat feature importance as causal explanation.',
      'Do not overfit to a single validation slice or leaderboard.',
      'Do not ignore the feature pipeline and operational contract around the model.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-sklearn-classifier',
    title: 'Binary Classification with the Scikit-learn API',
    description: [
      'This is the common entry point for tabular classification in Python. The estimator API feels familiar if the rest of the pipeline already uses scikit-learn tools for preprocessing, splitting, metrics, and model selection.',
      'The example uses histogram-based trees, conservative learning rate, row and column sampling, and early stopping on a validation set. That is a practical baseline pattern, not a magical final recipe.',
    ],
    code: `from xgboost import XGBClassifier

model = XGBClassifier(
    objective="binary:logistic",
    eval_metric="logloss",
    n_estimators=2000,
    learning_rate=0.03,
    max_depth=6,
    min_child_weight=2,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_lambda=1.0,
    tree_method="hist",
    random_state=42,
)

model.fit(
    X_train,
    y_train,
    eval_set=[(X_valid, y_valid)],
    verbose=False,
)

valid_proba = model.predict_proba(X_valid)[:, 1]`,
    notes: [
      'Increase n_estimators only when early stopping or strong validation monitoring is in place.',
      'For imbalanced data, tune thresholds separately and consider class weighting or sampling strategy.',
    ],
  },
  {
    id: 'ex-dmatrix-training',
    title: 'Low-level Training with DMatrix and Early Stopping',
    description: [
      'The lower-level API is useful when you need explicit DMatrix control, custom metadata, advanced objectives, or direct access to training results.',
      'It also makes the core training loop more visible: parameters, evaluation sets, number of boosting rounds, and validation-driven stopping are all explicit.',
    ],
    code: `import xgboost as xgb

dtrain = xgb.DMatrix(X_train, label=y_train, feature_names=feature_names)
dvalid = xgb.DMatrix(X_valid, label=y_valid, feature_names=feature_names)

params = {
    "objective": "reg:squarederror",
    "eval_metric": "rmse",
    "eta": 0.05,
    "max_depth": 8,
    "min_child_weight": 3,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "reg_lambda": 1.0,
    "tree_method": "hist",
}

booster = xgb.train(
    params=params,
    dtrain=dtrain,
    num_boost_round=5000,
    evals=[(dtrain, "train"), (dvalid, "valid")],
    early_stopping_rounds=100,
    verbose_eval=False,
)

pred = booster.predict(
    dvalid,
    iteration_range=(0, booster.best_iteration + 1),
)`,
    notes: [
      'Use the best iteration when producing predictions after early stopping.',
      'This pattern is a good fit when training metadata and monitoring need finer control than the estimator wrapper provides.',
    ],
  },
  {
    id: 'ex-categorical',
    title: 'Native Categorical Features in a Python Workflow',
    description: [
      'Some interfaces support native categorical handling so a full one-hot pipeline is not always required. This can simplify feature engineering and preserve category structure better than a wide sparse expansion.',
      'Whether native categories are the best choice still depends on cardinality, validation design, and the rest of the serving stack.',
    ],
    code: `from xgboost import XGBClassifier

X_train["city"] = X_train["city"].astype("category")
X_valid["city"] = X_valid["city"].astype("category")

model = XGBClassifier(
    objective="binary:logistic",
    eval_metric="auc",
    tree_method="hist",
    enable_categorical=True,
    max_depth=5,
    learning_rate=0.05,
)

model.fit(
    X_train,
    y_train,
    eval_set=[(X_valid, y_valid)],
    verbose=False,
)`,
    notes: [
      'Native categorical support can reduce preprocessing complexity, but you still need a serving pipeline that preserves category types consistently.',
      'High-cardinality features may still call for careful representation choices and leakage-safe encoding strategies.',
    ],
  },
  {
    id: 'ex-monotone-constraints',
    title: 'Monotonic Constraints for Domain-Guided Modeling',
    description: [
      'Monotonic constraints are useful when domain logic requires the prediction to move in a known direction as a feature changes. For example, higher debt burden might be constrained to increase default risk.',
      'This is not only a modeling convenience. It can be part of model governance when unconstrained flexible trees would otherwise learn locally implausible behavior.',
    ],
    code: `from xgboost import XGBRegressor

model = XGBRegressor(
    objective="reg:squarederror",
    tree_method="hist",
    learning_rate=0.05,
    max_depth=4,
    monotone_constraints={
        "income": 1,
        "debt_to_income": -1,
        "delinquency_count": -1,
    },
)

model.fit(X_train, y_train)`,
    notes: [
      'Constraints are strongest when the domain relationship is genuinely robust, not merely assumed.',
      'Adding constraints can reduce flexibility, so they should be validated against both accuracy and business interpretability goals.',
    ],
  },
  {
    id: 'ex-imbalanced-classification',
    title: 'Imbalanced Classification with Class Weighting',
    description: [
      'When the positive class is rare, weighting can help the model pay more attention to costly misses. This does not replace threshold tuning, but it can improve how the learner allocates capacity during training.',
      'The exact weight should be validated rather than copied mechanically. Class frequency is only a starting point; operational cost often matters more than raw prevalence.',
    ],
    code: `from xgboost import XGBClassifier

positive_weight = len(y_train[y_train == 0]) / max(len(y_train[y_train == 1]), 1)

model = XGBClassifier(
    objective="binary:logistic",
    eval_metric="aucpr",
    scale_pos_weight=positive_weight,
    learning_rate=0.05,
    max_depth=5,
    min_child_weight=4,
    subsample=0.8,
    colsample_bytree=0.8,
    tree_method="hist",
)

model.fit(
    X_train,
    y_train,
    eval_set=[(X_valid, y_valid)],
    verbose=False,
)`,
    notes: [
      'Validate against precision-recall behavior and the final decision threshold, not only ROC AUC.',
      'If costs are asymmetric, business loss may justify a weight different from the raw class ratio.',
    ],
  },
  {
    id: 'ex-sample-weights',
    title: 'Regression with Instance Weights',
    description: [
      'Many practical problems have observations that should not count equally. Recent examples may matter more than old ones, high-value customers may deserve more weight, or label reliability may vary across rows.',
      'XGBoost supports instance weighting directly, which makes it suitable for cost-sensitive regression and training schemes that reflect business exposure.',
    ],
    code: `import numpy as np
from xgboost import XGBRegressor

sample_weight = np.where(customer_value > 1000, 3.0, 1.0)

model = XGBRegressor(
    objective="reg:squarederror",
    eval_metric="rmse",
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    tree_method="hist",
)

model.fit(
    X_train,
    y_train,
    sample_weight=sample_weight,
    eval_set=[(X_valid, y_valid)],
    verbose=False,
)`,
    notes: [
      'Instance weights change the fitted model, so validation logic should reflect the same weighting philosophy.',
      'Be explicit about whether weights represent cost, exposure, recency, reliability, or sampling correction.',
    ],
  },
  {
    id: 'ex-ranking',
    title: 'Learning to Rank with Grouped Data',
    description: [
      'Ranking requires group boundaries because each query or request forms its own local ordering problem. The low-level API makes that structure explicit through group sizes on the training matrix.',
      'This is a common pattern in search, recommendation, ads, and retrieval systems where the goal is relative order, not row-independent classification.',
    ],
    code: `import xgboost as xgb

dtrain = xgb.DMatrix(X_train, label=y_train)
dvalid = xgb.DMatrix(X_valid, label=y_valid)

dtrain.set_group(train_group_sizes)
dvalid.set_group(valid_group_sizes)

params = {
    "objective": "rank:ndcg",
    "eval_metric": "ndcg@10",
    "eta": 0.05,
    "max_depth": 6,
    "min_child_weight": 2,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "tree_method": "hist",
}

booster = xgb.train(
    params=params,
    dtrain=dtrain,
    num_boost_round=2000,
    evals=[(dvalid, "valid")],
    early_stopping_rounds=50,
    verbose_eval=False,
)`,
    notes: [
      'Group sizes must match the ordering of rows exactly or the ranking problem becomes invalid.',
      'Use ranking metrics such as NDCG or MAP rather than standard classification metrics for model selection.',
    ],
  },
  {
    id: 'ex-cross-validation',
    title: 'Cross-Validation with xgb.cv',
    description: [
      'Cross-validation is useful when a single validation split is too noisy or the dataset is modest in size. The built-in CV helper can estimate a more stable boosting horizon before a final fit.',
      'Even here, split realism still matters. In grouped or temporal problems, custom fold logic is often better than default random partitioning.',
    ],
    code: `import xgboost as xgb

dtrain = xgb.DMatrix(X_train, label=y_train)

params = {
    "objective": "binary:logistic",
    "eval_metric": "auc",
    "eta": 0.05,
    "max_depth": 6,
    "min_child_weight": 3,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "tree_method": "hist",
}

cv_result = xgb.cv(
    params=params,
    dtrain=dtrain,
    num_boost_round=4000,
    nfold=5,
    early_stopping_rounds=100,
    metrics="auc",
    seed=42,
)

best_rounds = len(cv_result)`,
    notes: [
      'Cross-validation can reduce variance in model selection, but it does not excuse unrealistic fold design.',
      'After choosing a boosting horizon, retrain on the intended training split before final evaluation.',
    ],
  },
  {
    id: 'ex-save-load',
    title: 'Saving, Loading, and Reusing a Booster',
    description: [
      'Production workflows usually need an explicit model artifact. Saving and reloading the trained booster is straightforward, but the full inference contract still includes feature names, ordering, types, and preprocessing assumptions.',
      'This example focuses on the model file itself, which is only one part of a deployable system.',
    ],
    code: `import xgboost as xgb

dtrain = xgb.DMatrix(X_train, label=y_train, feature_names=feature_names)

booster = xgb.train(
    params={"objective": "reg:squarederror", "tree_method": "hist"},
    dtrain=dtrain,
    num_boost_round=300,
)

booster.save_model("xgboost-model.json")

loaded = xgb.Booster()
loaded.load_model("xgboost-model.json")

dpred = xgb.DMatrix(X_scoring, feature_names=feature_names)
pred = loaded.predict(dpred)`,
    notes: [
      'Keep feature names and column order stable between training and inference.',
      'Persist schema, preprocessing, and model version metadata alongside the serialized model.',
    ],
  },
  {
    id: 'ex-feature-importance',
    title: 'Inspecting Feature Importance and SHAP-Style Auditing',
    description: [
      'Built-in importance scores can give a fast first pass on what the ensemble relied on, but they should be treated as diagnostics rather than final explanation. They answer accounting questions, not causal ones.',
      'Teams often pair native importance with SHAP or slice analysis to understand whether strong offline signal is stable, sensible, and fair across segments.',
    ],
    code: `import xgboost as xgb

dtrain = xgb.DMatrix(X_train, label=y_train, feature_names=feature_names)

booster = xgb.train(
    params={"objective": "binary:logistic", "tree_method": "hist"},
    dtrain=dtrain,
    num_boost_round=500,
)

gain_importance = booster.get_score(importance_type="gain")
weight_importance = booster.get_score(importance_type="weight")

print(gain_importance)
print(weight_importance)`,
    notes: [
      'Importance types such as gain and weight can rank features differently because they measure different things.',
      'Use importance as one audit input alongside calibration, residual slices, stability checks, and domain review.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundations',
    terms: [
      {
        term: 'Gradient boosting',
        definition:
          'An additive modeling procedure that fits weak learners sequentially so each stage improves the current ensemble according to a loss function.',
      },
      {
        term: 'Booster',
        definition:
          'The underlying learner family used in XGBoost, most commonly boosted decision trees.',
      },
      {
        term: 'Ensemble',
        definition:
          'A model composed of many learners whose predictions are combined into one final output.',
      },
      {
        term: 'Objective',
        definition:
          'The optimization target that defines what the model is trying to minimize or maximize during training.',
      },
      {
        term: 'Evaluation metric',
        definition: 'A quantity monitored during validation, such as log loss, RMSE, AUC, or NDCG.',
      },
      {
        term: 'Boosting round',
        definition: 'One stage of training in which a new learner is added to the ensemble.',
      },
      {
        term: 'Weak learner',
        definition:
          'A simple base model, often a shallow tree, that is not very strong alone but becomes powerful when added sequentially.',
      },
      {
        term: 'Shrinkage',
        definition:
          'The learning-rate effect that reduces how much each new learner contributes to the ensemble.',
      },
    ],
  },
  {
    id: 'glossary-training',
    title: 'Training and Data',
    terms: [
      {
        term: 'DMatrix',
        definition:
          "XGBoost's optimized data container for training and prediction, often used with labels, weights, feature names, or ranking groups.",
      },
      {
        term: 'Histogram tree method',
        definition:
          'A split-finding strategy that bins feature values for faster and more memory-efficient training.',
      },
      {
        term: 'Early stopping',
        definition:
          'A validation-driven rule that halts training when additional boosting rounds stop improving the monitored metric.',
      },
      {
        term: 'Subsample',
        definition: 'The fraction of training rows sampled for a boosting round.',
      },
      {
        term: 'colsample_bytree',
        definition:
          'A parameter controlling what fraction of features are considered when building each tree.',
      },
      {
        term: 'max_depth',
        definition: 'A cap on tree depth that limits how complex each learner can become.',
      },
      {
        term: 'min_child_weight',
        definition:
          'A regularization parameter that discourages splits creating leaves with weak support.',
      },
      {
        term: 'gamma',
        definition: 'A parameter that requires a minimum gain before a split is accepted.',
      },
      {
        term: 'reg_alpha',
        definition:
          'An L1-style regularization term that can promote sparsity or shrink flexibility.',
      },
      {
        term: 'reg_lambda',
        definition:
          'An L2-style regularization term used to stabilize the model and penalize overly flexible fits.',
      },
    ],
  },
  {
    id: 'glossary-advanced',
    title: 'Advanced Concepts',
    terms: [
      {
        term: 'Missing-value default direction',
        definition:
          'The branch choice a tree learns for examples where a splitting feature is missing.',
      },
      {
        term: 'Monotonic constraint',
        definition:
          'A rule requiring the prediction to move only upward or downward as a given feature increases.',
      },
      {
        term: 'Interaction constraint',
        definition: 'A rule restricting which features may appear together in tree interactions.',
      },
      {
        term: 'Feature importance',
        definition:
          'A summary of how much the fitted ensemble relied on a feature according to a chosen accounting method such as gain or frequency.',
      },
      {
        term: 'Ranking objective',
        definition:
          'A loss designed to order items correctly within query groups rather than simply predict independent labels.',
      },
      {
        term: 'Calibration',
        definition:
          'The degree to which predicted probabilities match empirical outcome frequencies.',
      },
      {
        term: 'Leakage',
        definition:
          'Any use of information during training that would not truly be available at prediction time.',
      },
      {
        term: 'Inference latency',
        definition:
          'The time required for the trained ensemble to produce predictions in deployment.',
      },
    ],
  },
  {
    id: 'glossary-objectives-metrics',
    title: 'Objectives and Metrics',
    terms: [
      {
        term: 'Log loss',
        definition:
          'A probabilistic classification loss that penalizes confident wrong predictions more heavily than uncertain ones.',
      },
      {
        term: 'AUC',
        definition:
          'Area under the ROC curve, a ranking-oriented discrimination metric for binary classification.',
      },
      {
        term: 'AUCPR',
        definition:
          'Area under the precision-recall curve, often more informative than ROC AUC for highly imbalanced tasks.',
      },
      {
        term: 'RMSE',
        definition:
          'Root mean squared error, a regression metric that penalizes larger errors more heavily.',
      },
      {
        term: 'MAE',
        definition:
          'Mean absolute error, a regression metric that treats errors linearly and is less sensitive to large outliers than RMSE.',
      },
      {
        term: 'NDCG',
        definition:
          'Normalized discounted cumulative gain, a ranking metric that rewards correctly ordering the most important items near the top.',
      },
      {
        term: 'scale_pos_weight',
        definition:
          'A parameter commonly used in binary classification to increase the effective importance of the positive class.',
      },
      {
        term: 'Early stopping metric',
        definition:
          'The validation quantity monitored to decide when further boosting rounds are no longer worthwhile.',
      },
    ],
  },
  {
    id: 'glossary-structure',
    title: 'Tree Structure and Regularization',
    terms: [
      {
        term: 'Gain',
        definition:
          'The improvement in the regularized objective attributed to a split or feature usage pattern.',
      },
      {
        term: 'Leaf weight',
        definition:
          'The score contribution assigned to a leaf after summarizing local gradient and Hessian information.',
      },
      {
        term: 'Histogram bin',
        definition:
          'A bucketed value range used to accelerate split search by reducing candidate split granularity.',
      },
      {
        term: 'max_leaves',
        definition:
          'A limit on the number of leaves in a tree, used in some growth policies to control complexity.',
      },
      {
        term: 'Subsampling',
        definition:
          'The practice of training each boosting round on only a fraction of rows or columns to reduce variance and cost.',
      },
      {
        term: 'L1 regularization',
        definition: 'A sparsity-promoting penalty, represented in XGBoost by reg_alpha.',
      },
      {
        term: 'L2 regularization',
        definition:
          'A smoothing penalty, represented in XGBoost by reg_lambda, that discourages overly flexible fits.',
      },
      {
        term: 'Pruning',
        definition:
          'The removal of splits that do not improve the regularized objective enough to justify their complexity.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Operations and Deployment',
    terms: [
      {
        term: 'Feature pipeline',
        definition:
          'The end-to-end logic that constructs model inputs consistently in training and inference environments.',
      },
      {
        term: 'Schema drift',
        definition:
          'A change in columns, types, naming, or value representation that can silently break model assumptions.',
      },
      {
        term: 'Data drift',
        definition:
          'A shift in input feature distributions between the training environment and live usage.',
      },
      {
        term: 'Concept drift',
        definition:
          "A change in the relationship between inputs and outcomes, causing yesterday's patterns to become less predictive.",
      },
      {
        term: 'Champion-challenger',
        definition:
          'A deployment pattern in which a current production model is compared against a candidate replacement before rollout.',
      },
      {
        term: 'Batch inference',
        definition:
          'Prediction over many rows at once, often used in offline scoring, reporting, or scheduled decision systems.',
      },
      {
        term: 'Online inference',
        definition: 'Low-latency prediction for individual requests in real time.',
      },
      {
        term: 'Model card or metadata bundle',
        definition:
          'Documentation and structured metadata describing the model, training context, features, metrics, versions, and operating assumptions.',
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
    <section key={section.id} id={section.id} className="xgboost-help98-section">
      <h2 className="xgboost-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="xgboost-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="xgboost-help98-section">
      <h2 className="xgboost-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="xgboost-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="xgboost-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="xgboost-help98-section">
      <h2 className="xgboost-help98-heading">{section.title}</h2>
      <dl className="xgboost-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="xgboost-help98-divider" /> : null}
    </section>
  )
}

export default function XGBoostPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'X G Boost Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="X G Boost Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
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
