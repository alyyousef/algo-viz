import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '8. Artificial Intelligence & ML/TensorFlow/index.mdx': `---
title: TensorFlow
description: End-to-end open source machine learning platform by Google.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="TensorFlow">

TensorFlow is an open-source software library for machine learning and artificial intelligence. It can be used across a range of tasks but has a particular focus on training and inference of deep neural networks. It was developed by the Google Brain team for internal Google use in research and production.

<Callout icon="tip" title="Tensors">
  The name TensorFlow derives from the operations that such neural networks perform on multidimensional data arrays, which are referred to as **tensors**.
</Callout>

## Ecosystem

<ComparisonTable 
  headers={['Tool', 'Purpose', 'Deployment Environment']}
  rows={[
    ['TensorFlow Core', 'Developing and training models.', 'Desktop, Cloud, Server'],
    ['TensorFlow Lite', 'Running inference on mobile and IoT devices.', 'iOS, Android, Raspberry Pi'],
    ['TensorFlow.js', 'Training and deploying models in the browser.', 'Web Browsers, Node.js'],
    ['TensorFlow Extended (TFX)', 'Deploying production ML pipelines.', 'Cloud, Enterprise Servers']
  ]}
/>

## Keras API

TensorFlow 2.x heavily relies on **Keras** as its high-level API. Keras makes building neural networks extremely intuitive by stacking layers.

<pre className="bin98-codebox">
<code>
{\`import tensorflow as tf
from tensorflow.keras import layers, models

# Build a simple sequential model
model = models.Sequential([
  layers.Dense(128, activation='relu', input_shape=(784,)),
  layers.Dropout(0.2),
  layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])\`}
</code>
</pre>

</TechnologyTemplate>
`,
  '8. Artificial Intelligence & ML/PyTorch/index.mdx': `---
title: PyTorch
description: Open source machine learning framework developed by Meta.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="PyTorch">

PyTorch is a machine learning library based on the Torch library, used for applications such as computer vision and natural language processing. Originally developed by Meta AI (formerly Facebook AI Research), it is now part of the Linux Foundation.

<Callout icon="info" title="Dynamic Computational Graph">
  Unlike older versions of TensorFlow which used a static graph, PyTorch utilizes a **Dynamic Computational Graph** (define-by-run). This means the graph is built on-the-fly as operations are executed, making debugging much easier and allowing for dynamic control flow (standard Python loops and if statements).
</Callout>

## PyTorch vs TensorFlow

<ComparisonTable 
  headers={['Feature', 'PyTorch', 'TensorFlow']}
  rows={[
    ['Graph Type', 'Dynamic (Define-by-run)', 'Static (historically) / Dynamic (TF 2.x)'],
    ['Target Audience', 'Researchers, Academia', 'Industry, Production Deployment'],
    ['Deployment Tools', 'TorchServe (getting better)', 'TFX, TensorFlow Serving (highly mature)'],
    ['Primary Language', 'Pythonic and intuitive', 'Has a steeper learning curve without Keras']
  ]}
/>

## Tensor Basics

<pre className="bin98-codebox">
<code>
{\`import torch

# Create a tensor initialized with random numbers
x = torch.rand(5, 3)
print(x)

# Perform operations, which automatically track gradients for backprop
y = torch.ones(5, 3, requires_grad=True)
z = x + y
print(z)\`}
</code>
</pre>

</TechnologyTemplate>
`,
  '8. Artificial Intelligence & ML/Scikit-learn/index.mdx': `---
title: Scikit-learn
description: Machine learning library for the Python programming language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Scikit-learn">

Scikit-learn (formerly scikits.learn) is a free software machine learning library for the Python programming language. It features various classification, regression and clustering algorithms including support-vector machines, random forests, gradient boosting, and k-means.

<Callout icon="tip" title="Classical Machine Learning">
  While TensorFlow and PyTorch are the kings of Deep Learning, Scikit-learn remains the absolute standard for **Classical Machine Learning** on structured/tabular data. If you don't need a neural network, use Scikit-learn.
</Callout>

## Core API Design

Scikit-learn is famous for its clean, uniform API. Almost all objects share a common interface:

<ComparisonTable 
  headers={['Method', 'Purpose', 'Object Types']}
  rows={[
    ['fit(X, y)', 'Trains the algorithm on the training data.', 'Estimators, Transformers'],
    ['predict(X)', 'Predicts target values for new data.', 'Estimators'],
    ['transform(X)', 'Transforms data (e.g., scaling, PCA).', 'Transformers'],
    ['fit_transform(X)', 'Fits the model and transforms the data in one step.', 'Transformers']
  ]}
/>

## Example Pipeline

<pre className="bin98-codebox">
<code>
{\`from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import load_iris

# Load sample dataset
X, y = load_iris(return_X_y=True)

# Build a pipeline with scaling and classification
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=100))
])

# Train the model
pipe.fit(X, y)

# Predict on new data
predictions = pipe.predict(X[:5])\`}
</code>
</pre>

</TechnologyTemplate>
`,
  '8. Artificial Intelligence & ML/NumPy/index.mdx': `---
title: NumPy
description: The fundamental package for scientific computing with Python.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="NumPy">

NumPy (Numerical Python) is the fundamental package for scientific computing in Python. It provides a high-performance multidimensional array object, and tools for working with these arrays.

<Callout icon="info" title="The C-Backend">
  Python lists are slow because they are arrays of pointers to scattered objects. NumPy arrays are homogeneous and stored in contiguous memory blocks, heavily optimized with backend C and Fortran code, making them orders of magnitude faster.
</Callout>

## Key Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['ndarray', 'The core N-dimensional array object.'],
    ['Broadcasting', 'A powerful mechanism that allows NumPy to perform arithmetic operations on arrays of different shapes.'],
    ['Vectorization', 'Performing operations on entire arrays without using explicit Python loops.']
  ]}
/>

## Example Usage

<pre className="bin98-codebox">
<code>
{\`import numpy as np

# Create an array
a = np.array([1, 2, 3])

# Create a 2D array of zeros
b = np.zeros((2, 3))

# Element-wise operations (Vectorization)
c = np.array([10, 20, 30])
print(a + c) # Output: [11 22 33]

# Broadcasting: adding a scalar to an array
print(a * 5) # Output: [5 10 15]\`}
</code>
</pre>

</TechnologyTemplate>
`,
  '8. Artificial Intelligence & ML/Pandas/index.mdx': `---
title: Pandas
description: Open source data analysis and manipulation tool for Python.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Pandas">

Pandas is a fast, powerful, flexible and easy to use open source data analysis and manipulation tool, built on top of the Python programming language. It is the gold standard for data wrangling and preparation.

<Callout icon="tip" title="Under the Hood">
  Pandas is heavily dependent on NumPy. While NumPy provides the fundamental multi-dimensional array structures, Pandas provides high-level data structures like Series and DataFrames, along with SQL-like joining and filtering capabilities.
</Callout>

## Data Structures

<ComparisonTable 
  headers={['Structure', 'Dimensions', 'Description']}
  rows={[
    ['Series', '1D', 'A one-dimensional labeled array capable of holding any data type.'],
    ['DataFrame', '2D', 'A two-dimensional, size-mutable, potentially heterogeneous tabular data structure (like a spreadsheet or SQL table).']
  ]}
/>

## Common Operations

<pre className="bin98-codebox">
<code>
{\`import pandas as pd

# Load data from a CSV file
df = pd.read_csv('data.csv')

# View the first 5 rows
print(df.head())

# Filter rows where age is greater than 30
adults = df[df['age'] > 30]

# Group by department and calculate the mean salary
avg_salary = df.groupby('department')['salary'].mean()

# Fill missing values
df.fillna(0, inplace=True)\`}
</code>
</pre>

</TechnologyTemplate>
`,
  '8. Artificial Intelligence & ML/Matplotlib/index.mdx': `---
title: Matplotlib
description: Comprehensive library for creating visualizations in Python.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Matplotlib">

Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python. It was originally designed to emulate the plotting capabilities of MATLAB.

<Callout icon="info" title="The Foundation">
  Matplotlib is the foundational plotting library in Python. Many higher-level visualization libraries, such as **Seaborn** and Pandas own df.plot(), are actually wrappers built directly on top of Matplotlib.
</Callout>

## The Two Interfaces

Matplotlib provides two different ways to create plots:

<ComparisonTable 
  headers={['Interface', 'Style', 'Best For']}
  rows={[
    ['Pyplot (State-based)', 'MATLAB-like, implicit state tracking.', 'Quick scripts, simple interactive plots.'],
    ['Object-Oriented (OO)', 'Explicitly creating Figure and Axes objects.', 'Complex plots, embedding in applications, multiple subplots.']
  ]}
/>

## Object-Oriented Example

<pre className="bin98-codebox">
<code>
{\`import matplotlib.pyplot as plt
import numpy as np

# Generate data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create a Figure and an Axes explicitly (OO style)
fig, ax = plt.subplots()

# Plot data on the Axes
ax.plot(x, y, label='Sine Wave', color='blue')

# Customize the Axes
ax.set_title('Simple Plot')
ax.set_xlabel('X axis')
ax.set_ylabel('Y axis')
ax.legend()

# Display the plot
plt.show()\`}
</code>
</pre>

</TechnologyTemplate>
`,
}

async function writeBatch2() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Updated ${relativePath} with rich content.`)
  }
}

writeBatch2().catch(console.error)
