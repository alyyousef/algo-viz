import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Prometheus vs Grafana/index.mdx': `---
title: Prometheus vs Grafana
description: "A clarification of the modern observability stack, detailing how Prometheus acts as the mathematical time-series database and alerting engine, while Grafana acts as the pure visualization and dashboarding layer."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Prometheus vs Grafana"
  subtitle="The Observability Stack"
  tags={['Comparison', 'DevOps', 'Infrastructure', 'Monitoring']}
>

Prometheus and Grafana are almost always mentioned together because they perfectly complement each other to form the industry-standard observability stack. They do not compete; they mathematically rely on each other.

## 1. Prometheus (The Engine)
- **Role**: Data Collection and Storage.
- **Architecture**: A massive, mathematically optimized **Time-Series Database (TSDB)**. It uses a "Pull" model. It reaches out to all your web servers every 15 seconds, mathematically scrapes their metrics (CPU usage, memory, HTTP error rates), and stores them.
- **Superpower**: PromQL (Prometheus Query Language). It allows engineers to write intense mathematical alerts (e.g., *"Trigger PagerDuty if the 99th percentile latency of the checkout service exceeds 500ms for more than 5 minutes"*).
- **Limitation**: Its built-in UI for viewing graphs is mathematically functional but visually atrocious.

## 2. Grafana (The Dashboard)
- **Role**: Data Visualization.
- **Architecture**: A pure frontend dashboarding tool. Grafana mathematically contains exactly zero of your metric data. 
- **Mechanism**: You connect Grafana to a "Data Source" (usually Prometheus, but it also supports Elasticsearch, InfluxDB, and Datadog). Grafana translates your visual dashboard panels into PromQL queries, fetches the data from Prometheus, and renders beautiful, real-time mathematical charts.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Python vs Java/index.mdx': `---
title: Python vs Java
description: "An architectural comparison between the two most taught languages in academia: Java's strict, statically typed enterprise architecture versus Python's dynamic, highly readable scripting syntax."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Python vs Java"
  subtitle="Enterprise Architecture vs Developer Velocity"
  tags={['Comparison', 'Languages', 'Architecture', 'Fundamentals']}
>

Java and Python are fundamentally opposed in their mathematical approach to software engineering, balancing runtime safety against developer velocity.

## 1. Java (The Statically Typed Enterprise)
- **Typing**: **Static and Strong**. You must mathematically define every variable type upfront (TICK1int x = 5;TICK1). The Compiler checks the entire codebase. If you try to pass a String into a function expecting an Integer, Java refuses to compile, mathematically guaranteeing type safety before the code ever runs.
- **Architecture**: Pure Object-Oriented. Everything must exist inside a Class. This forces massive architectural structure, making it mathematically perfect for massive teams (100+ engineers) working on million-line banking systems.
- **Performance**: High. The JVM (Java Virtual Machine) uses Just-In-Time (JIT) compilation to run nearly as fast as C++.

## 2. Python (The Dynamically Typed Script)
- **Typing**: **Dynamic and Strong**. You do not declare types (TICK1x = 5TICK1). The interpreter figures it out at runtime. This allows for blisteringly fast prototyping and scripting. (However, if a function expects an integer and gets a string, the program will violently crash at runtime).
- **Architecture**: Multi-paradigm (Procedural, OOP, Functional). You can write a single 5-line script without a single Class.
- **Performance**: Mathematically terrible. The Global Interpreter Lock (GIL) prevents true multi-threading, and dynamic type-checking causes immense CPU overhead. It only survives in Machine Learning because Python acts merely as a wrapper, outsourcing all the heavy math to C and C++ libraries (NumPy, TensorFlow).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Python vs R/index.mdx': `---
title: Python vs R
description: "A comparison of Data Science languages, contrasting R's absolute mathematical supremacy in pure statistical analysis with Python's versatility in Machine Learning and production deployment."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Python vs R"
  subtitle="General Purpose vs Pure Statistics"
  tags={['Comparison', 'Data Science', 'Machine Learning', 'Statistics']}
>

The Data Science ecosystem is mathematically split between Python (the general-purpose engineering language) and R (the dedicated statistical language).

## 1. R (The Statistician's Language)
- **History**: Built by statisticians, for statisticians. 
- **Superpower**: Unmatched mathematical analysis out of the box. R natively understands complex statistical distributions, hypothesis testing, and time-series analysis without needing 3rd-party libraries.
- **Ecosystem**: **CRAN** (Comprehensive R Archive Network) contains over 10,000 highly specialized mathematical packages. **ggplot2** is widely considered the most beautiful and powerful data visualization library on earth.
- **Limitation**: R is mathematically awful for general software engineering. You would not use R to build a REST API or a web scraper.

## 2. Python (The Engineer's Language)
- **History**: A general-purpose language that accidentally became the king of AI due to libraries like NumPy and Pandas.
- **Superpower**: **Productionizing**. You can clean data in Pandas, train a Neural Network in PyTorch, and immediately wrap it in a FastAPI backend using the exact same language.
- **The Verdict**: R mathematically dominates academia, bioinformatics, and pure statistical research. Python dominates Machine Learning, Deep Learning, and enterprise production environments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/PyTorch vs TensorFlow/index.mdx': `---
title: PyTorch vs TensorFlow
description: "A historical overview of the Deep Learning framework wars, detailing how Google's TensorFlow initially dominated production while Meta's PyTorch mathematically conquered the research community with dynamic computation graphs."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="PyTorch vs TensorFlow"
  subtitle="The Deep Learning War"
  tags={['Comparison', 'Machine Learning', 'AI', 'Architecture']}
>

If you are training massive Neural Networks, you are using one of these two open-source frameworks. Over the last 5 years, the landscape has radically shifted.

## 1. TensorFlow (Google)
- **History**: The first truly massive framework. It used **Static Computation Graphs**. You had to mathematically define the entire neural network structure upfront before feeding it any data. 
- **Pros**: This static nature allowed TensorFlow to mathematically optimize the graph, making it incredibly fast and easy to deploy to mobile devices (TensorFlow Lite) and web browsers (TensorFlow.js).
- **Cons**: It was famously a nightmare to debug. Because the graph was static, you couldn't use standard Python print statements to see what was happening inside the network. (They fixed this in TF 2.0 with Eager Execution, but the damage was done).

## 2. PyTorch (Meta/Facebook)
- **History**: Released specifically to solve TensorFlow's debuggability problem. It uses **Dynamic Computation Graphs**. The network is built on the fly, line-by-line, as the data flows through it.
- **Pros**: It feels like native Python. You can use standard TICK1if/elseTICK1 statements and TICK1print()TICK1 exactly where the math is happening.
- **The Verdict**: Because of its mathematical flexibility, PyTorch absolutely conquered academia. Over 90% of papers published at top AI conferences now use PyTorch. Almost all modern GenAI (HuggingFace, LLaMA, Stable Diffusion) is built on PyTorch. TensorFlow is mostly maintained for legacy production systems.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/RAG vs fine-tuning/index.mdx': `---
title: RAG vs Fine-Tuning
description: "A comparison of two fundamental methods for teaching Large Language Models new information: permanently altering the model's mathematical weights (Fine-Tuning) versus injecting context dynamically via search (RAG)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="RAG vs Fine-Tuning"
  subtitle="Customizing Large Language Models"
  tags={['Comparison', 'Machine Learning', 'AI', 'Architecture']}
>

If you have a massive internal database of corporate documents and want an LLM (like ChatGPT) to answer questions about them, you face a massive architectural decision.

## 1. Fine-Tuning
- **Mechanism**: You take your documents, convert them into Q&A pairs, and run a mathematical training algorithm (like Backpropagation or LoRA) to permanently alter the physical weights (parameters) inside the Neural Network.
- **Pros**: The model mathematically learns the "tone" and "style" of your company. It becomes natively fluent in your specific domain vocabulary.
- **Cons**: Mathematically terrible for memorizing exact facts. The LLM will still hallucinate. If a document changes tomorrow, you must re-train the entire model. Training requires massive GPU computing power.

## 2. RAG (Retrieval-Augmented Generation)
- **Mechanism**: The LLM's weights are completely untouched. Instead, you mathematically convert your documents into Vectors and store them in a Vector Database (like Pinecone). When a user asks a question, you perform a similarity search, retrieve the 3 most relevant paragraphs, and paste them into the LLM's prompt: *"Answer the user's question using only this context: [Paragraphs]"*.
- **Pros**: Zero hallucinations (the model is strictly constrained to the provided context). Instant updates (if a document changes, you just update the database). Mathematically requires zero GPU training.
- **The Verdict**: Use Fine-Tuning to teach a model *how* to speak (tone, formatting, logic). Use RAG to teach a model *what* to say (facts, dynamic knowledge). Most enterprise systems use both.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Redis vs Memcached/index.mdx': `---
title: Redis vs Memcached
description: "A comparison of In-Memory data stores, detailing how Redis mathematically obsoleted Memcached by introducing complex data structures, disk persistence, and single-threaded event loop architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Redis vs Memcached"
  subtitle="The In-Memory Cache War"
  tags={['Comparison', 'Databases', 'Architecture', 'System Design']}
>

When a standard database (PostgreSQL) is too slow for 100,000 requests per second, engineers place an In-Memory Cache in front of it. Both Memcached and Redis store data entirely in RAM, but Redis has mathematically conquered the industry.

## 1. Memcached (The Legacy Pioneer)
- **Architecture**: A pure, mathematically simple Key-Value store. It only understands Strings. 
- **Superpower**: True multi-threading. It can mathematically utilize every single core on a CPU to serve requests simultaneously.
- **Limitation**: If the server loses power, all data in RAM is instantly and permanently destroyed. 

## 2. Redis (The Modern Standard)
- **Architecture**: A Data Structure Server. Unlike Memcached, Redis mathematically understands complex structures: Lists, Sets, Hashes, Geospatial coordinates, and HyperLogLogs. (e.g., You can mathematically push an item to the end of a Redis List in O(1) time without downloading the entire list to your backend).
- **Persistence**: Redis can optionally save snapshots of RAM to the Hard Drive. If the server explodes, Redis can mathematically restore the cache on reboot.
- **Concurrency**: Redis is famously **Single-Threaded**. It handles 100,000+ requests per second on a *single core* using an ultra-efficient event loop (epoll), mathematically bypassing all thread synchronization overhead and race conditions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/REST vs GraphQL/index.mdx': `---
title: REST vs GraphQL
description: "An architectural comparison of API design, contrasting REST's strict, resource-based URL endpoints with GraphQL's flexible, single-endpoint, client-driven query language."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="REST vs GraphQL"
  subtitle="The Evolution of APIs"
  tags={['Comparison', 'System Design', 'Architecture', 'Web Development']}
>

REST has been the mathematical standard for APIs for two decades, but as mobile frontends became more complex, Facebook invented GraphQL to solve REST's fundamental inefficiencies.

## 1. REST (Representational State Transfer)
- **Architecture**: Resource-based. Every entity has its own URL endpoint (e.g., TICK1/users/123TICK1). You use HTTP verbs (GET, POST, PUT, DELETE) to interact with them.
- **The Problem (Over-fetching)**: If the frontend only needs the User's name, hitting TICK1/users/123TICK1 returns the entire 50-field JSON object, mathematically wasting bandwidth.
- **The Problem (Under-fetching)**: If the frontend needs the User's name AND their last 5 posts, it must mathematically make two completely separate network requests (TICK1/users/123TICK1, then TICK1/users/123/postsTICK1), increasing latency (the N+1 problem).

## 2. GraphQL
- **Architecture**: Client-driven query language. There is only exactly one endpoint (e.g., TICK1/graphqlTICK1). You always use POST.
- **The Solution**: The client sends a mathematically precise JSON-like query specifying *exactly* the fields it wants, and the server returns *only* those fields. You can fetch a User, their Posts, and the Comments on those Posts all in a single, massive mathematical query.
- **The Tradeoff**: GraphQL is mathematically much harder to cache at the CDN level (because every request goes to the same URL), and it opens the door to malicious users requesting infinitely nested data, requiring complex Rate Limiting and Query Depth analysis.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/REST vs gRPC/index.mdx': `---
title: REST vs gRPC
description: "A deep dive into backend-to-backend communication, contrasting REST's human-readable JSON over HTTP/1.1 with gRPC's ultra-fast, binary Protocol Buffers over HTTP/2."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="REST vs gRPC"
  subtitle="Microservice Communication"
  tags={['Comparison', 'System Design', 'Networking', 'Architecture']}
>

While REST and GraphQL are used for Frontend-to-Backend communication, when hundreds of internal Microservices need to talk to each other at massive scale, REST becomes a mathematical bottleneck. Google invented gRPC to solve this.

## 1. REST (JSON over HTTP/1.1)
- **Format**: JSON (JavaScript Object Notation). It is pure text. It is beautifully human-readable.
- **The Problem**: JSON is mathematically massive. A boolean TICK1trueTICK1 takes 4 bytes of text (plus quotes and keys). To send it, the backend must serialize the object to a string, send it over a slow HTTP/1.1 connection, and the receiving backend must parse the string back into an object. This serialization mathematical overhead crushes CPU performance at scale.

## 2. gRPC (Protocol Buffers over HTTP/2)
- **Format**: Protobuf (Protocol Buffers). You define your data schema in a TICK1.protoTICK1 file. Google's compiler then generates native C++, Java, or Go code for you.
- **The Solution**: gRPC mathematically compresses the data into raw binary. A boolean takes exactly 1 bit. There are no keys sent over the network (the schema maps the bits by index). 
- **The Network**: It strictly requires **HTTP/2**, allowing multiplexing (sending 100 requests simultaneously over a single TCP connection) and bi-directional streaming.
- **The Tradeoff**: It is completely unreadable by humans. You cannot use Postman or TICK1curlTICK1 to debug it easily, making it terrible for public-facing APIs, but mathematically perfect for internal microservices.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Scikit-learn vs TensorFlow/index.mdx': `---
title: Scikit-learn vs TensorFlow
description: "A comparison of Machine Learning libraries, delineating the absolute boundary between traditional, mathematically elegant statistical models (Scikit-Learn) and massive, GPU-accelerated Neural Networks (TensorFlow)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Scikit-learn vs TensorFlow"
  subtitle="Traditional ML vs Deep Learning"
  tags={['Comparison', 'Machine Learning', 'AI', 'Data Science']}
>

A common mistake for beginners is attempting to solve every problem with a Neural Network. In reality, traditional Machine Learning is often mathematically superior for standard tabular data.

## 1. Scikit-learn (Traditional Machine Learning)
- **Algorithms**: Random Forests, Support Vector Machines (SVM), Logistic Regression, K-Means Clustering, PCA.
- **Use Case**: **Tabular Data** (CSVs, SQL databases). If you are trying to predict house prices based on Square Footage and Zip Code, Scikit-learn is the mathematically correct tool. 
- **Performance**: Extremely fast to train on a standard CPU. Models are highly interpretable (you can mathematically explain exactly *why* a Random Forest denied a loan).

## 2. TensorFlow / PyTorch (Deep Learning)
- **Algorithms**: Deep Neural Networks, Convolutional Networks (CNNs), Transformers (LLMs).
- **Use Case**: **Unstructured Data** (Images, Audio, Raw Text). If you are building a self-driving car vision system or ChatGPT, traditional algorithms mathematically fail. You *must* use Deep Learning.
- **Performance**: Requires massive datasets (millions of examples) and expensive GPUs to train. The resulting models are mathematical "Black Boxes"; it is nearly impossible to explain exactly why a neural network made a specific decision.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/65. Comparison Pages (Reference)/Spring Boot vs ASP.NET Core/index.mdx': `---
title: Spring Boot vs ASP.NET Core
description: "An architectural comparison of the world's most dominant Enterprise web frameworks, contrasting Java's massive Spring ecosystem with Microsoft's blistering fast, cross-platform C# redesign."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Spring Boot vs ASP.NET Core"
  subtitle="The Enterprise Backend War"
  tags={['Comparison', 'Architecture', 'Enterprise', 'Web Development']}
>

If you are building a mission-critical backend for a massive bank or airline, you are almost certainly using one of these two monolithic, dependency-injected frameworks. 

## 1. Spring Boot (Java)
- **History**: Spring was created to fix the nightmare of Java EE. Spring Boot mathematically automated all the XML configuration, providing a massive ecosystem of "Starters" (Spring Data JPA, Spring Security).
- **Architecture**: Deeply rooted in Annotation-driven configuration (e.g., TICK1@RestControllerTICK1, TICK1@AutowiredTICK1) and mathematical Inversion of Control (IoC).
- **Ecosystem**: Unmatched. The integration with Apache Kafka, Hadoop, and massive legacy enterprise systems is flawless. However, the JVM overhead can result in massive memory usage and slow boot times (though GraalVM Native Image is mathematically solving this).

## 2. ASP.NET Core (C#)
- **History**: Microsoft completely rewrote ASP.NET from scratch to break free from Windows. ASP.NET Core is fully open-source and runs natively on Linux.
- **Architecture**: Exceptionally modular and mathematically streamlined. It uses a modern middleware pipeline and native Dependency Injection.
- **Performance**: Blisteringly fast. In the TechEmpower Web Framework Benchmarks, ASP.NET Core consistently destroys Spring Boot (and Node.js/Python), processing millions of plaintext requests per second, making it mathematically one of the fastest full-stack frameworks on earth.

</ConceptTemplate>
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
