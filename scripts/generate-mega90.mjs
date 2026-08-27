import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/34. MLOps & LLMOps/Model versioning/index.mdx': `---
title: Model Versioning
description: The rigorous MLOps practice of immutably cataloging the specific mathematical weights, hyperparameters, and dataset lineage of every neural network trained, ensuring strict rollback capabilities in production.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model Versioning">

In traditional software, you version code using Git (e.g., TICK1v1.4.2TICK1). In Machine Learning, the code is identical every time. What changes are the mathematical weights inside the TICK1.ptTICK1 file. If you overwrite TICK1model.ptTICK1, you have irrevocably destroyed history.

## 1. Cryptographic Hashing
Model Versioning systems (like MLflow or DVC) do not just name files TICK1model_v2.ptTICK1. 
They calculate the SHA-256 hash of the exact physical bytes of the weights file. This hash acts as an immutable mathematical fingerprint. If a Data Scientist claims they are testing TICK1v2TICK1, but the hash does not perfectly match the Registry's hash, the system mathematically proves the file was tampered with or corrupted, and blocks deployment.

## 2. The Lineage Triad
A model version is useless if you do not know how it was made. 
A proper Model Versioning system mathematically links three things:
1. **The Code**: The Git Commit Hash of the Python training script.
2. **The Data**: The DVC Hash of the exact training dataset.
3. **The Weights**: The SHA-256 Hash of the output model.
If a production model (Version 14) starts generating biased predictions, engineers can use this Triad to perfectly reconstruct the exact environment, code, and data from six months ago to forensically investigate the mathematical root cause of the bias.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/34. MLOps & LLMOps/Prompt versioning/index.mdx': `---
title: Prompt Versioning
description: The LLMOps discipline of treating natural language prompts as executable code, enforcing strict version control and regression testing to prevent catastrophic failure in Generative AI systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Prompt Versioning">

In LLMOps, the Prompt is the Source Code. Changing one word in a 500-word System Prompt can mathematically alter the entire probability distribution of the LLM, breaking the application.

## 1. Prompts as Code
You cannot hardcode prompts in Python strings. 
Modern LLMOps platforms (like LangSmith or Helicone) decouple the Prompt from the Code. The Prompt is stored in a centralized, version-controlled repository (e.g., TICK1SystemPrompt-v4TICK1). 
The Python application calls the API: *"Fetch the latest production prompt, inject the user's variables, and send it to GPT-4."* This allows non-technical Prompt Engineers to update the prompt without requiring a full Kubernetes deployment of the backend.

## 2. A/B Testing and Regression
Because Prompts are mathematical instructions, you must test them.
If you update a prompt to TICK1v5TICK1, you do not deploy it immediately. The LLMOps platform runs a **Regression Test**. It takes 1,000 historical user inputs, mathematically runs them through the TICK1v4TICK1 prompt and the TICK1v5TICK1 prompt side-by-side, and uses an LLM-as-a-Judge to grade the differences. If TICK1v5TICK1 scores lower on factual accuracy, the version is mathematically blocked from production.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/34. MLOps & LLMOps/Shadow deployment/index.mdx': `---
title: Shadow Deployment
description: The safest ML deployment strategy, where a new model is deployed to live production servers to process real user traffic, but its mathematical predictions are secretly logged and never shown to the user.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Shadow Deployment">

A Canary deployment exposes 1% of users to risk. A Shadow Deployment exposes 0% of users to risk, while still providing 100% of the mathematical validation.

## 1. The Dual-Routing Architecture
In a Shadow Deployment, the API Gateway duplicates the incoming HTTP request.
- **Request A** goes to the Legacy Model. The Legacy Model calculates the prediction and returns it to the user.
- **Request B** (the exact same data) goes to the Shadow Model. The Shadow Model calculates the prediction, but the API Gateway *silently discards the HTTP response*. The user never sees it. 
However, the MLOps system secretly logs both the Legacy Prediction and the Shadow Prediction to a database.

## 2. Offline Mathematical Comparison
Because the Shadow Model is processing live, real-world data at full scale, engineers can monitor its exact CPU usage, VRAM spikes, and latency without any consequences.
More importantly, they can run statistical queries comparing the two models. *"In the last 24 hours, out of 5 million requests, on which 10,000 requests did the Shadow Model mathematically disagree with the Legacy Model?"* Data Scientists manually review those 10,000 edge cases to determine if the new model is actually smarter, or if it has a fatal flaw, before ever turning it "On."

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/34. MLOps & LLMOps/TensorFlow Serving/index.mdx': `---
title: TensorFlow Serving
description: Google's ultra-high-performance, C++ based model serving system, mathematically engineered for absolute maximum throughput and minimal latency when deploying TensorFlow models in enterprise production.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="TensorFlow Serving"
  subtitle="Google's Enterprise Inference Engine"
  tags={['MLOps', 'TensorFlow', 'C++', 'Serving']}
>

If you try to serve a TensorFlow model using a Python Flask API, the Python Global Interpreter Lock (GIL) and the memory overhead will bottleneck your GPU. TensorFlow Serving bypasses Python entirely, running pure, hyper-optimized C++.

## 1. The SavedModel Format
TensorFlow Serving does not execute Python scripts. It requires a mathematically frozen **SavedModel**.
A SavedModel is a protocol buffer (protobuf) that contains the exact computational graph (the mathematical nodes and edges) and the static weights of the Neural Network. Because there is no Python code, TF Serving can load the graph directly into GPU VRAM and execute the tensor math with zero interpretation overhead.

## 2. Dynamic Batching and Versioning
TF Serving is famous for its ruthless optimization.
- **Dynamic Batching**: If 50 requests hit the server within 5 milliseconds, TF Serving intercepts them, fuses the 50 independent tensors into one massive tensor array, runs a single vectorized matrix multiplication on the GPU, and splits the results.
- **Hot Swapping**: TF Serving supports zero-downtime version swapping. If you drop TICK1model_v2TICK1 into the directory, TF Serving mathematically loads the new weights into VRAM in the background, smoothly routes new traffic to V2, and unloads V1 without dropping a single active HTTP request.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/34. MLOps & LLMOps/TorchServe/index.mdx': `---
title: TorchServe
description: The official, production-ready model serving engine for PyTorch, developed jointly by AWS and Meta to provide high-performance, dynamic batching and lifecycle management for PyTorch models.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="TorchServe"
  subtitle="The PyTorch Inference Engine"
  tags={['MLOps', 'PyTorch', 'Serving', 'AWS']}
>

For years, researchers loved PyTorch for training, but hated it for production (defaulting to TensorFlow Serving). TorchServe was built to solve this, providing an enterprise-grade C++/Java backend to serve PyTorch models at scale.

## 1. The MAR Archive (Model Archive)
To use TorchServe, you cannot just upload a TICK1.ptTICK1 weight file. You must use the TICK1torch-model-archiverTICK1 CLI.
This tool mathematically packages your weights, your custom Python preprocessing script (the Handler), and your dependencies into a single TICK1.marTICK1 file. TorchServe loads this archive, instantiates the neural network, and exposes a high-performance REST/gRPC API.

## 2. Multi-Model and GPU Scaling
A single 80GB GPU is wasted on a tiny 2GB model. 
TorchServe allows you to load dozens of different TICK1.marTICK1 models onto a single GPU simultaneously. It acts as a mathematical traffic cop, dynamically allocating VRAM and compute cycles between the models. Furthermore, it supports built-in metrics (Prometheus/Grafana integration), allowing DevOps teams to mathematically track exact GPU utilization, inference latency, and queue depths in real-time.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/34. MLOps & LLMOps/Triton Inference Server/index.mdx': `---
title: Triton Inference Server
description: NVIDIA's ultimate, hardware-optimized serving engine, mathematically designed to squeeze absolute maximum performance out of GPUs by supporting multiple frameworks (PyTorch, TF, ONNX) simultaneously.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Triton Inference Server"
  subtitle="NVIDIA's Hardware-Optimized Server"
  tags={['MLOps', 'NVIDIA', 'GPU', 'Serving']}
>

If you are paying $30,000 for an NVIDIA GPU, you do not want software bottlenecks. Triton is written directly by NVIDIA. It sits directly on top of CUDA and TensorRT, bypassing almost all high-level software overhead to achieve theoretical maximum mathematical throughput.

## 1. Framework Agnostic
TorchServe only runs PyTorch. TF Serving only runs TensorFlow. Triton runs *everything*.
You can load a PyTorch model, a TensorFlow model, an XGBoost tree, and an ONNX graph into Triton simultaneously. Triton physically translates all of them down to its highly optimized C++ backend. This allows a company to standardize their entire MLOps deployment pipeline on a single technology, regardless of what the Data Scientists used to train the models.

## 2. Concurrent Model Execution
Triton understands the physical silicon of the GPU better than any other server.
If you have two small models, Triton will mathematically execute them *concurrently* on the exact same GPU clock cycle using CUDA streams, rather than sequentially. Combined with dynamic batching and TensorRT optimization (which fuses mathematical operations together in hardware), Triton routinely delivers 3x to 5x higher throughput and lower latency than native Python serving solutions.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/34. MLOps & LLMOps/Weights & Biases/index.mdx': `---
title: Weights & Biases (W&B)
description: The industry-leading, developer-first MLOps platform for experiment tracking, dataset versioning, and hyperparameter optimization, renowned for its beautiful, real-time mathematical visualizations.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Weights & Biases (W&B)"
  subtitle="The Developer's MLOps Dashboard"
  tags={['MLOps', 'Tracking', 'Visualization', 'SaaS']}
>

While MLflow is often managed by DevOps teams, Weights & Biases (W&B) is beloved by AI researchers. It requires exactly two lines of Python code to transform a chaotic training script into a beautifully visualized, mathematically rigorous experiment.

## 1. Real-Time Telemetry
You add TICK1wandb.init()TICK1 and TICK1wandb.log({"loss": loss})TICK1 to your training loop.
Instantly, W&B streams the mathematical loss curves directly to a cloud dashboard. You can watch your neural network learn in real-time from your phone. W&B also automatically hooks into the underlying hardware, streaming live graphs of GPU Temperature, VRAM usage, and CPU bottlenecks, allowing researchers to instantly spot if their data-loading pipeline is starving the GPU.

## 2. W&B Sweeps (Hyperparameter Optimization)
Finding the optimal architecture is a mathematical nightmare. W&B Sweeps automates this.
You define a YAML file with a mathematical search space (e.g., Number of Layers = [3, 4, 5], Dropout = [0.1, 0.2, 0.3]). W&B acts as the master controller. You spin up 10 GPU servers, point them at the Sweep ID, and W&B mathematically orchestrates the search using Bayesian Optimization. It automatically kills underperforming runs early to save money, and generates a massive **Parallel Coordinates Plot**, allowing you to visually trace the exact mathematical combination of hyperparameters that led to the lowest validation loss.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/API Gateway/index.mdx': `---
title: Amazon API Gateway
description: A fully managed AWS service that acts as the physical "front door" for applications, providing secure, mathematically scalable HTTP routing, throttling, and authentication for backend microservices.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon API Gateway"
  subtitle="The Front Door of AWS"
  tags={['AWS', 'Networking', 'Serverless', 'API']}
>

If you write an AWS Lambda function, it exists in the cloud, but the internet cannot talk to it. API Gateway provides the physical URL and handles the complex mathematical traffic routing required to securely expose that function to the public.

## 1. Request Routing and Transformation
API Gateway intercepts every incoming HTTP request. 
It mathematically inspects the URL path (e.g., TICK1/users/123TICK1) and the HTTP Method (TICK1GETTICK1, TICK1POSTTICK1). Based on the rules you define, it routes the request to the correct backend (a Lambda function, an EC2 server, or another AWS service).
Crucially, it can perform **Mapping Templates**. If an old mobile app sends data in XML, API Gateway can mathematically transform the XML payload into JSON before handing it to your modern backend, entirely decoupling the client from the server architecture.

## 2. Throttling and Protection
If a hacker hits your Lambda function 100,000 times a second, AWS will happily auto-scale, and you will receive a $50,000 bill. 
API Gateway prevents this using **Throttling**. You set a mathematical limit (e.g., 1,000 requests per second). If traffic exceeds this, the Gateway mathematically rejects the request, instantly returning a TICK1429 Too Many RequestsTICK1 error. It acts as an absolute mathematical shield, protecting your expensive backend compute from DDoS attacks and traffic spikes.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Athena/index.mdx': `---
title: Amazon Athena
description: A powerful, serverless interactive query service that allows data analysts to use standard SQL to mathematically query petabytes of raw data stored directly in Amazon S3 without needing a database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Athena"
  subtitle="Serverless SQL for S3"
  tags={['AWS', 'Data', 'SQL', 'Serverless']}
>

Traditionally, if you have 10TB of raw CSV logs in S3, you must provision a massive database, write an ETL script, wait hours for the data to load, and *then* run your SQL query. Athena bypasses the database entirely. 

## 1. Schema on Read
Athena uses a mathematical concept called **Schema on Read**.
The data in S3 remains raw (CSV, JSON, Parquet). You use AWS Glue to define a logical schema (e.g., "Column 1 is an Integer, Column 2 is a String"). 
When you execute a SQL query in Athena, a massive fleet of hidden servers mathematically parses the raw text files in S3 in parallel, applies the schema dynamically, executes the SQL aggregation math, returns the answer, and immediately vanishes.

## 2. Cost and Columnar Optimization
Athena charges based purely on the amount of data mathematically scanned (e.g., $5.00 per Terabyte scanned).
If you query a 1TB CSV file to find one row, Athena must physically scan all 1TB of text. You pay $5.00.
Data Engineers optimize this by converting CSV files to **Parquet**, a columnar storage format. If you run the exact same SQL query on a Parquet file, Athena uses the mathematical metadata in the file to only scan the specific column you requested (e.g., scanning only 10GB instead of 1TB). Your query runs 100x faster, and you only pay 5 cents.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Aurora/index.mdx': `---
title: Amazon Aurora
description: A cloud-native, highly advanced relational database built by AWS, mathematically engineered to be fully compatible with MySQL and PostgreSQL while delivering 5x the physical throughput of traditional systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Aurora"
  subtitle="Cloud-Native Relational Database"
  tags={['AWS', 'Database', 'SQL', 'Storage']}
>

Traditional databases (like standard MySQL) tightly couple the Compute (CPU) and the Storage (Hard Drive). If the hard drive fills up, the entire database crashes. AWS mathematically decoupled them to create Aurora.

## 1. The Distributed Storage Volume
In Aurora, the Compute Node (the server processing the SQL queries) has no local storage. 
When a transaction is committed, the Compute Node mathematically pushes the log record down into a massive, distributed, multi-tenant Storage Fleet. 
This Storage Fleet automatically replicates every single piece of data **6 times across 3 Availability Zones** (physical data centers). If a meteor destroys two data centers, the Aurora math guarantees zero data loss and seamlessly continues operating using the surviving copies.

## 2. Mathematical IO Optimization
Writing data in standard MySQL requires immense Disk IO (updating table files, index files, and transaction logs simultaneously). This physical limitation bottlenecks throughput.
Aurora physically pushes all of this mathematical processing down into the Storage Fleet. The Compute Node only sends the raw transaction log over the network. The Storage nodes handle the complex math of generating the data blocks asynchronously. By reducing the physical network IO by orders of magnitude, Aurora mathematically achieves 5x the throughput of standard MySQL running on the exact same hardware.

</TechnologyTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
