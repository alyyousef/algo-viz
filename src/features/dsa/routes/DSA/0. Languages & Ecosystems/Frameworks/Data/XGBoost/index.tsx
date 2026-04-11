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
  const { activeTab, setActiveTab } = useTopicTabs({
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
