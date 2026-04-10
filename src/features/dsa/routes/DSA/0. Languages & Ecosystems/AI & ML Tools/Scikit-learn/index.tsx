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

const PAGE_TITLE = 'Scikit-learn'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Scikit-learn is the standard general-purpose machine learning library for classical supervised and unsupervised learning in Python. It provides a unified estimator API for preprocessing, feature extraction, model training, evaluation, model selection, pipelines, and inspection across algorithms such as linear models, decision trees, random forests, support vector machines, nearest neighbors, clustering methods, and dimensionality reduction techniques.',
  'The most useful mental model is not just "a bag of algorithms," but "a coherent interface for the full classical ML workflow." Scikit-learn gives teams a consistent way to scale features, encode categories, split data, train estimators, run cross-validation, search hyperparameters, evaluate metrics, and compose preprocessing with models in one reproducible pipeline.',
  'This page is intentionally comprehensive. It covers the estimator API, transformers, pipelines, feature preprocessing, supervised and unsupervised learning, model selection, cross-validation, metrics, inspection tools, practical workflows, tradeoffs, examples, and a glossary for the concepts that appear most often in real scikit-learn projects.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Scikit-learn is a high-level machine learning library focused on classical algorithms and reusable workflow structure. It is designed around clean Python APIs and interoperates naturally with NumPy arrays, pandas data frames, and the broader scientific Python ecosystem.',
      'Its greatest strength is consistency. Instead of each algorithm exposing unrelated training and prediction conventions, scikit-learn normalizes the interface so preprocessing steps, estimators, metrics, and search procedures can be composed predictably. That design is a major reason it became the default baseline framework for applied machine learning in Python.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Scikit-learn Matters',
    paragraphs: [
      'Scikit-learn matters because many real machine learning problems are not deep learning problems. Classification, regression, clustering, anomaly detection, feature engineering, and model selection over structured datasets are still common, and scikit-learn provides a mature, reliable way to solve them.',
      'It also matters because it teaches good workflow habits. Cross-validation, preprocessing inside pipelines, separation of fit and transform stages, and explicit estimator interfaces encourage more reproducible and less leakage-prone modeling than ad hoc notebook code.',
    ],
    bullets: [
      'Excellent for classical machine learning on structured data.',
      'Unified API lowers the cognitive cost of trying many algorithms.',
      'Strong workflow tools help reduce leakage and evaluation mistakes.',
      'Often the first serious baseline before heavier frameworks are considered.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of scikit-learn as a pipeline-oriented estimator framework. Data goes through transformers that learn preprocessing state from training data, then flows into estimators that learn predictive or structural patterns. Cross-validation, metrics, and search procedures wrap around that pipeline rather than living outside it as notebook glue.',
      'The key advantage is interface uniformity. Once you understand fit, transform, predict, score, and pipeline composition, a large part of the library becomes mechanically understandable even when the underlying algorithms are very different.',
    ],
    bullets: [
      'Transformers prepare data.',
      'Estimators learn from data.',
      'Pipelines keep preprocessing and modeling together.',
      'Model selection tools wrap the whole workflow rather than isolated steps.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Scikit-learn Fits Best',
    paragraphs: [
      'Scikit-learn is strongest on tabular, feature-based, and medium-scale structured datasets where classical models are appropriate. It is a strong fit for baseline modeling, interpretable workflows, educational use, rapid experimentation, business analytics, risk modeling, churn prediction, recommendation baselines, feature preprocessing, and any project where model quality must be balanced with reproducibility and simplicity.',
      'It is particularly effective when the data can be represented as rows and columns, the training set fits comfortably in memory, and the task benefits from trying several families of models and preprocessing strategies quickly.',
    ],
    bullets: [
      'Structured tabular prediction and classification tasks.',
      'Feature-engineered workflows rather than raw unstructured modalities.',
      'Teams needing fast, reliable baselines with strong API consistency.',
      'Projects where cross-validation and pipeline hygiene matter.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where Scikit-learn Is Not the Best Default',
    paragraphs: [
      'Scikit-learn is not the best default for very large-scale deep learning, raw image or language modeling, GPU-first neural training, or workloads that demand highly custom automatic differentiation. It also becomes limiting when the dataset is too large for its in-memory workflow assumptions or when online or streaming training needs dominate.',
      'It can also be the wrong choice when teams expect one library to solve feature stores, experiment tracking, deployment serving, and deep production MLOps. Scikit-learn is a strong modeling framework, not a full end-to-end ML platform.',
    ],
    bullets: [
      'Raw text, image, audio, and sequence modeling usually need other tools.',
      'Very large or distributed workloads may exceed its typical operating model.',
      'GPU-centric deep learning is outside its main design center.',
      'Operational lifecycle tooling usually requires surrounding infrastructure.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A standard scikit-learn workflow begins with data splitting, preprocessing design, and an initial baseline estimator. The next step is often wrapping preprocessing and modeling into a Pipeline so that cross-validation and hyperparameter search evaluate the actual end-to-end transformation path instead of a manually leaked approximation.',
      'From there, teams iterate on feature selection, estimator choice, regularization, class imbalance handling, metric selection, and search strategy. Inspection, calibration, and threshold tuning often happen after the first acceptable baseline is stable.',
    ],
    bullets: [
      'Split data before learning any preprocessing statistics.',
      'Put preprocessing and the estimator in a Pipeline early.',
      'Use cross-validation before believing single-split results.',
      'Tune metrics, thresholds, and calibration based on the real task.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Scikit-learn is best understood as the standard framework for disciplined classical machine learning in Python. Its real power is not one single algorithm, but the uniform workflow it creates across preprocessing, fitting, evaluation, and search.',
      'If the problem is structured, the data is not massive, and a classical model family is plausible, scikit-learn is usually one of the highest-value starting points. Good pipelines, leakage control, and evaluation design matter more than cycling blindly through estimators.',
    ],
    bullets: [
      'The consistent API is a feature, not just a convenience.',
      'Pipelines and cross-validation are central to correct usage.',
      'Scikit-learn is usually a baseline framework before more specialized tools.',
      'Workflow quality often matters more than algorithm novelty.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What Scikit-learn Actually Is',
    paragraphs: [
      'Scikit-learn is a Python library for classical machine learning built on top of NumPy, SciPy, and the scientific Python ecosystem. It provides supervised estimators, unsupervised estimators, transformers, model selection tools, metrics, and utilities for building reusable ML workflows.',
      'Its design philosophy is practical and API-driven. Instead of creating one giant training framework with many implicit behaviors, it standardizes interfaces across many algorithms so that experimentation and workflow composition become easier.',
    ],
  },
  {
    id: 'core-estimator-api',
    title: 'The Estimator API',
    paragraphs: [
      'The estimator API is the foundation of scikit-learn. Most objects expose fit, and then optionally transform, predict, predict_proba, decision_function, score, or inverse_transform depending on what kind of object they are. This consistency is what lets pipelines, cross-validation helpers, and hyperparameter search tools work across many model families.',
      'Once this interface clicks, much of the library becomes easier to reason about. A scaler, an imputer, a PCA transformer, and a classifier may do very different work internally, but the outer lifecycle remains structurally similar.',
    ],
    bullets: [
      'fit learns state from training data.',
      'transform applies a learned transformation.',
      'predict produces outputs from a fitted estimator.',
      'score is a convenience, but explicit metrics are usually safer.',
    ],
  },
  {
    id: 'core-transformers',
    title: 'Transformers and Preprocessing',
    paragraphs: [
      'Transformers are estimators that learn how to modify data. Typical examples include standardization, one-hot encoding, imputation, dimensionality reduction, polynomial feature expansion, and feature selection. In scikit-learn, preprocessing is treated as a learnable stage rather than informal data cleaning that happens somewhere else.',
      'This is one of the biggest workflow advantages in the library. By putting preprocessing into transformers, teams can ensure that statistics are learned on training folds only and then applied consistently to validation and test data.',
    ],
    bullets: [
      'Scaling and encoding are usually learned, not hardcoded.',
      'Imputation should live inside the pipeline, not in pre-split notebook code.',
      'Feature engineering can often be formalized as transformers.',
      'Transformers are essential for leakage-safe evaluation.',
    ],
  },
  {
    id: 'core-pipelines',
    title: 'Pipelines and ColumnTransformer',
    paragraphs: [
      'Pipelines combine several steps into one composite estimator so the whole workflow can be fit, validated, and tuned as a single unit. This is central to correct scikit-learn practice because it prevents accidental train-test contamination and makes preprocessing reproducible.',
      'ColumnTransformer extends this idea by allowing different preprocessing branches for different subsets of columns. This is especially useful for mixed tabular data where numeric features need scaling while categorical features need encoding and text features may need vectorization.',
    ],
    bullets: [
      'Pipeline is the standard way to combine preprocessing and a final model.',
      'ColumnTransformer is the standard way to preprocess heterogeneous columns safely.',
      'Pipelines reduce notebook glue and make search spaces more consistent.',
      'A good pipeline is usually more valuable than a slightly fancier estimator.',
    ],
  },
  {
    id: 'core-supervised',
    title: 'Supervised Learning Families',
    paragraphs: [
      'Scikit-learn includes many supervised algorithms: linear regression and classification models, logistic regression, SVMs, nearest-neighbor methods, naive Bayes models, decision trees, random forests, gradient boosting variants, and more. The point of the library is not that every algorithm is state of the art, but that many strong baselines and interpretable models are available behind a coherent interface.',
      'Good modeling in scikit-learn often means trying multiple families rather than assuming the first plausible estimator is correct. Bias-variance behavior, sensitivity to scaling, calibration, interpretability, and training time vary significantly across these families.',
    ],
  },
  {
    id: 'core-unsupervised',
    title: 'Unsupervised Learning and Representation Tools',
    paragraphs: [
      'The library also supports clustering, dimensionality reduction, decomposition, manifold learning, anomaly detection, and feature extraction methods. Common examples include k-means, DBSCAN, Gaussian mixture models, PCA, truncated SVD, isolation forests, and nearest-neighbor techniques.',
      'These tools are useful not only as final outputs but also as analysis aids. Dimensionality reduction can help visualization or denoising, clustering can support exploratory segmentation, and anomaly detection can provide heuristics for data quality and rare-event workflows.',
    ],
  },
  {
    id: 'core-model-selection',
    title: 'Train-Test Splits, Cross-validation, and Search',
    paragraphs: [
      'Scikit-learn has a strong model selection toolkit. It supports train-test splitting, K-fold and stratified cross-validation, grouped and time-aware splitters where applicable, and grid or randomized hyperparameter search. These tools are central to using the library correctly because classical ML performance is often highly sensitive to data splitting and regularization choices.',
      'A common mistake is treating cross-validation as optional. In practice, a single favorable split can hide instability, leakage, or selection bias. Search procedures should evaluate the full pipeline on a trustworthy validation protocol, not only the estimator in isolation.',
    ],
    bullets: [
      'Choose splitters that match the data-generating process.',
      'Stratification matters for imbalanced classification.',
      'Grouped or temporal leakage can invalidate naive random splits.',
      'Search the pipeline, not just the model step.',
    ],
  },
  {
    id: 'core-metrics',
    title: 'Metrics, Thresholds, and Calibration',
    paragraphs: [
      'Scikit-learn provides a wide range of metrics for classification, regression, ranking-style evaluation, clustering quality, and calibration. Choosing the right metric is one of the most consequential modeling decisions because different metrics reward very different behaviors.',
      'A strong validation result is not always the end of the decision process. For probabilistic classification, threshold tuning and probability calibration may matter as much as the underlying estimator. AUC, for example, is not the same thing as well-calibrated probabilities or business-optimal decisions.',
    ],
  },
  {
    id: 'core-feature-inspection',
    title: 'Feature Inspection and Interpretation',
    paragraphs: [
      'Scikit-learn supports inspection through model coefficients, feature importances for supported tree models, permutation importance, partial dependence-style tools, and various diagnostics. These are useful for understanding how a fitted model behaves, though they are not proofs of causality.',
      'Interpretation should be paired with slice-based evaluation, error analysis, and domain review. Features that appear influential statistically may be proxies for bias or leakage, and low apparent importance does not mean a variable is irrelevant in a different model family.',
    ],
  },
  {
    id: 'core-preprocessing-details',
    title: 'Scaling, Encoding, and Feature Hygiene',
    paragraphs: [
      'Different estimators react differently to feature scale, sparsity, and encoding choices. Distance-based methods, linear models with regularization, and SVMs often require standardized features. Tree-based models usually care less about monotonic scaling but still depend on clean missing-value and category handling strategies.',
      'This is why preprocessing should be estimator-aware rather than ritualized. Not every pipeline needs the same transforms, and not every transform improves every model family.',
    ],
    bullets: [
      'Scale features when the algorithm is scale-sensitive.',
      'Encode categories in ways compatible with the estimator and evaluation protocol.',
      'Use imputation and feature selection inside pipelines.',
      'Treat preprocessing as part of model design, not housekeeping.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Practical Limits',
    paragraphs: [
      'Scikit-learn is fast for many medium-scale problems, especially when backed by efficient NumPy and SciPy operations, but it is not designed as a general distributed ML framework. Many estimators assume data fits in memory, and some algorithms degrade sharply as dataset size or dimensionality grows.',
      'The right performance mindset is therefore pragmatic. Choose estimators appropriate to data size, use sparse matrices when needed, avoid unnecessary copies, and recognize when the problem should move to a different class of tooling rather than forcing scikit-learn to be something it is not.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Role',
    paragraphs: [
      'Scikit-learn sits at the center of the classical Python ML stack. It works naturally with pandas for tabular preparation, NumPy for arrays, matplotlib or seaborn for diagnostics, and other libraries for boosted trees, experiment tracking, or deployment wrappers. Many organizations use it as the default baseline or tabular-modeling layer even when the broader stack includes deep learning frameworks elsewhere.',
      'That role is important because scikit-learn often defines the workflow conventions for a project even when the final model later comes from another library. Good preprocessing, splitting, and metric discipline are transferable habits.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Use Cases',
    paragraphs: [
      'Scikit-learn is common in churn prediction, credit scoring baselines, lead scoring, quality control, fraud-screening baselines, recommendation candidate filtering, document classification with engineered features, anomaly detection, tabular forecasting baselines, and educational ML workflows.',
      'It is especially attractive when stakeholders need interpretable baselines, rapid experimentation, and a workflow that can be communicated clearly to analysts and engineers.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'Scikit-learn is mature and stable, but it does not protect teams from leakage, bad splits, target leakage in preprocessing, wrong metric choices, or poor feature engineering. A tidy API can create false confidence if the evaluation design is weak.',
      'Another common pitfall is overusing default scores or default model settings without understanding the cost function or calibration behavior. The library is easy to use at a surface level, but high-quality modeling still requires domain judgment and disciplined validation.',
    ],
    bullets: [
      'Do not preprocess the full dataset before splitting.',
      'Do not trust a single train-test split when the stakes are real.',
      'Do not confuse a convenient metric with the right business objective.',
      'Do not compare models fairly unless the whole pipeline was evaluated consistently.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast',
    paragraphs: [
      'Compared with deep learning frameworks, scikit-learn is simpler, lighter, and usually better for classical structured-data workflows, but it is not designed for large neural models or GPU-centric training. Compared with specialized boosted-tree libraries like XGBoost or LightGBM, scikit-learn offers stronger workflow coherence across many model families, while those libraries may outperform it on specific tabular prediction tasks.',
      'Compared with writing one-off ML code directly in NumPy or pandas, scikit-learn provides a much safer and more reusable structure. Its real advantage is not raw novelty; it is disciplined consistency.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Practical Scikit-learn Checklist',
    paragraphs: [
      'A strong scikit-learn project starts by defining the task, split protocol, and evaluation metric before estimator shopping begins. Next, preprocessing should be moved into transformers and pipelines so that cross-validation evaluates the true workflow.',
      'After that, estimator choice, regularization, search space, and thresholding can be tuned with far less risk of fooling yourself. The point is to make the workflow correct first and fancy second.',
    ],
    bullets: [
      'Define the target and metric before choosing models.',
      'Split early and keep leakage-sensitive preprocessing inside the pipeline.',
      'Use cross-validation that matches the data structure.',
      'Search pipeline parameters, not only model hyperparameters.',
      'Inspect calibration, slices, and error patterns after baseline accuracy is acceptable.',
      'Prefer the simplest model that meets the task and governance constraints.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-pipeline-classification',
    title: 'Tabular Classification Pipeline',
    description: [
      'This example shows the standard scikit-learn pattern for mixed tabular data: separate preprocessing for numeric and categorical columns, combined into a ColumnTransformer, then wrapped with a classifier in a Pipeline.',
      'The important point is not the specific classifier. The important point is that preprocessing and prediction are evaluated together so validation sees the real workflow rather than a leaked approximation.',
    ],
    code: `from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier

numeric_features = ["age", "income", "tenure"]
categorical_features = ["country", "segment"]

numeric_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

categorical_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore")),
])

preprocess = ColumnTransformer([
    ("num", numeric_pipe, numeric_features),
    ("cat", categorical_pipe, categorical_features),
])

model = Pipeline([
    ("preprocess", preprocess),
    ("clf", RandomForestClassifier(random_state=42)),
])

model.fit(X_train, y_train)
pred = model.predict(X_valid)`,
    notes: [
      'Keep all learnable preprocessing inside the pipeline.',
      'Changing the classifier should not require rewriting the data-cleaning workflow.',
    ],
  },
  {
    id: 'ex-crossval-search',
    title: 'Cross-validation with Grid Search',
    description: [
      'Hyperparameter search should usually be applied to the whole pipeline, not just the final estimator. This ensures that any preprocessing choices and model choices are evaluated under the same validation discipline.',
      'The parameter names use the pipeline step prefix, which is how scikit-learn exposes search spaces for nested components.',
    ],
    code: `from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ("preprocess", preprocess),
    ("clf", LogisticRegression(max_iter=2000)),
])

param_grid = {
    "clf__C": [0.1, 1.0, 10.0],
    "clf__penalty": ["l2"],
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

search = GridSearchCV(
    estimator=pipeline,
    param_grid=param_grid,
    scoring="roc_auc",
    cv=cv,
    n_jobs=-1,
)

search.fit(X_train, y_train)
best_model = search.best_estimator_`,
    notes: [
      'Search over too many parameters too early can waste time if the split or metric is wrong.',
      'The best score is only meaningful if the cross-validation protocol matches the real problem.',
    ],
  },
  {
    id: 'ex-text-pipeline',
    title: 'Text Classification with a Pipeline',
    description: [
      'Scikit-learn is also strong for classical text workflows using token counts or TF-IDF features plus linear models. This remains a strong baseline for many document classification problems where deep learning may be unnecessary.',
      'Pipelines keep vectorization and classification tied together, which is especially important when search or evaluation is involved.',
    ],
    code: `from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

text_model = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=3)),
    ("clf", LogisticRegression(max_iter=2000)),
])

text_model.fit(train_texts, train_labels)
pred = text_model.predict(valid_texts)`,
    notes: [
      'Linear text baselines can be surprisingly strong when labels are limited and latency matters.',
      'The vocabulary and vectorization settings are part of the model, not just preprocessing trivia.',
    ],
  },
  {
    id: 'ex-clustering',
    title: 'Clustering with Standardization',
    description: [
      'Unsupervised workflows still benefit from preprocessing discipline. Distance-based clustering is highly sensitive to feature scales, so standardization is often necessary before k-means or similar methods.',
      'The goal of clustering is exploratory structure, not ground-truth prediction, so evaluation and interpretation should stay modest and domain-aware.',
    ],
    code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

cluster_model = Pipeline([
    ("scale", StandardScaler()),
    ("kmeans", KMeans(n_clusters=4, random_state=42, n_init="auto")),
])

cluster_model.fit(X_unlabeled)
labels = cluster_model.named_steps["kmeans"].labels_`,
    notes: [
      'Clustering outputs are often unstable if scale and feature choice are poor.',
      'Interpret clusters as analytical tools, not automatically as true latent classes.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'Estimator',
        definition:
          'A scikit-learn object that learns from data through fit and may later transform, predict, or score.',
      },
      {
        term: 'Transformer',
        definition: 'An estimator that learns how to modify data and exposes transform.',
      },
      {
        term: 'Predictor',
        definition:
          'An estimator that produces predictions after fitting, such as a classifier or regressor.',
      },
      {
        term: 'Pipeline',
        definition:
          'A composite estimator that chains preprocessing and modeling steps into one reusable workflow.',
      },
      {
        term: 'ColumnTransformer',
        definition:
          'A utility for applying different preprocessing pipelines to different subsets of columns.',
      },
      {
        term: 'Fit',
        definition: 'The stage where an estimator learns parameters or state from training data.',
      },
      {
        term: 'Transform',
        definition: 'The stage where learned preprocessing is applied to data.',
      },
      {
        term: 'Predict',
        definition: 'The stage where a fitted model produces outputs for new inputs.',
      },
    ],
  },
  {
    id: 'glossary-model-selection',
    title: 'Model Selection Terms',
    terms: [
      {
        term: 'Cross-validation',
        definition:
          'A validation procedure that repeatedly splits data to estimate generalization more reliably than a single split.',
      },
      {
        term: 'Grid search',
        definition: 'An exhaustive search over a specified hyperparameter grid.',
      },
      {
        term: 'Randomized search',
        definition:
          'A hyperparameter search procedure that samples candidate settings rather than testing every combination.',
      },
      {
        term: 'Scoring',
        definition: 'The metric definition used to compare models during validation or search.',
      },
      {
        term: 'Stratification',
        definition:
          'A splitting strategy that preserves class proportions across folds or train-test partitions.',
      },
      {
        term: 'Regularization',
        definition: 'A mechanism that limits model complexity to reduce overfitting.',
      },
      {
        term: 'Hyperparameter',
        definition:
          'A configuration value chosen before or during search rather than learned directly from the data.',
      },
      {
        term: 'Leakage',
        definition:
          'Any use of information during training or preprocessing that would not truly be available at prediction time.',
      },
    ],
  },
  {
    id: 'glossary-inspection',
    title: 'Inspection and Evaluation Terms',
    terms: [
      {
        term: 'Feature importance',
        definition:
          'A measure of how much a fitted model appears to rely on a feature under a chosen accounting method.',
      },
      {
        term: 'Permutation importance',
        definition:
          'An inspection method that measures how performance changes when a feature is shuffled.',
      },
      {
        term: 'Calibration',
        definition:
          'The alignment between predicted probabilities and observed outcome frequencies.',
      },
      {
        term: 'Decision threshold',
        definition: 'The cutoff used to convert scores or probabilities into discrete decisions.',
      },
      {
        term: 'Confusion matrix',
        definition: 'A summary of predicted versus actual classes in classification.',
      },
      {
        term: 'Dimensionality reduction',
        definition:
          'A transformation that reduces the number of features while preserving useful structure or variance.',
      },
      {
        term: 'Clustering',
        definition:
          'An unsupervised process for grouping similar observations without labeled targets.',
      },
      {
        term: 'Sparse matrix',
        definition:
          'A memory-efficient representation for data where most entries are zero, common in text and one-hot workflows.',
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
    <section key={section.id} id={section.id} className="sklearn-help98-section">
      <h2 className="sklearn-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="sklearn-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="sklearn-help98-section">
      <h2 className="sklearn-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="sklearn-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="sklearn-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="sklearn-help98-section">
      <h2 className="sklearn-help98-heading">{section.title}</h2>
      <dl className="sklearn-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="sklearn-help98-divider" /> : null}
    </section>
  )
}

export default function ScikitLearnPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Scikit Learn Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Scikit Learn Page"
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
