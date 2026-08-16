import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '65. Comparison Pages (Reference)/AWS vs Azure/index.mdx': `---
title: AWS vs Azure
description: A comparison between the two largest public cloud providers in the world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AWS vs. Azure">

This is the ultimate biological battle for the Cloud.

- **AWS**: The mathematical pioneer. AWS launched in 2006 and mathematically defined what the Cloud is. It biologically dominates startups, pure tech companies, and open-source infrastructure. Its UI is a chaotic, mathematical control panel built by engineers, for engineers.
- **Azure**: The enterprise behemoth. Launched years later, Microsoft biologically leveraged its absolute monopoly over Enterprise IT (Active Directory, Office 365, Windows Server) to force Fortune 500 companies into Azure. If a corporation already uses C# and Windows, Azure is the mathematically friction-less choice.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/AWS vs Azure vs GCP vs OCI/index.mdx': `---
title: AWS vs Azure vs GCP vs OCI
description: A comparison of the top four major public cloud computing platforms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Cloud Quadrant: AWS vs Azure vs GCP vs OCI">

- **AWS (Amazon)**: The biological default. 32% market share. It has the most services, the most tutorials, and the highest mathematical adoption among startups.
- **Azure (Microsoft)**: The enterprise default. 23% market share. It mathematically dominates hybrid-cloud and C# ecosystems.
- **GCP (Google)**: The data default. 10% market share. It biologically struggles with enterprise sales, but is the absolute mathematical king of Big Data (BigQuery), Machine Learning (TPUs), and Kubernetes (GKE).
- **OCI (Oracle)**: The legacy giant. It arrived incredibly late, but mathematically targets massive, legacy Oracle Database users, offering aggressive biological pricing and extreme high-performance computing (HPC) networks.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/AWS vs GCP/index.mdx': `---
title: AWS vs GCP
description: A comparison between Amazon Web Services and Google Cloud Platform.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AWS vs. GCP">

While AWS battles Azure for the biological enterprise, AWS battles GCP for the mathematical edge.

- **AWS**: Mathematically older, more mature, and has more features. However, configuring an AWS network (VPCs, Subnets, Route Tables) is biologically complex and error-prone.
- **GCP**: Mathematically elegant. Google biologically designed GCP's global network to be infinitely simpler than AWS. A GCP VPC is natively global, completely eliminating the regional networking nightmares of AWS. GCP is the mathematically superior choice for AI/ML and Kubernetes, as Google literally invented Kubernetes.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Android vs iOS/index.mdx': `---
title: Android vs iOS
description: A comparison of the two dominant mobile operating systems in the world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Android vs. iOS">

The biological duopoly of mobile computing.

- **Android (Google)**: Mathematically open (AOSP). It allows biological hardware manufacturers (Samsung, Motorola) to customize the OS. It is heavily fragmented, meaning developers must mathematically test their apps on 10,000 different screen sizes. Apps are historically written in Java/Kotlin.
- **iOS (Apple)**: Mathematically closed. Apple biologically controls both the hardware and the software, creating an infinitely tighter, more optimized ecosystem. There is no fragmentation, making iOS development (Swift) mathematically much easier, but it requires a biological Mac to compile code.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Angular vs Vue/index.mdx': `---
title: Angular vs Vue
description: A comparison between two popular JavaScript frameworks for building user interfaces.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Angular vs. Vue">

The battle of the structured enterprise vs. the elegant progressive framework.

- **Angular (Google)**: A massive, rigid, batteries-included MVC framework. It mathematically forces you to use TypeScript, Dependency Injection, and RxJS Observables. It is biologically favored by massive enterprise banks because it forces 100 developers to write code exactly the same way.
- **Vue (Evan You)**: A lightweight, progressive framework. It biologically took the mathematical best parts of React (Virtual DOM) and Angular (Directives like \`v-if\`) and combined them into an incredibly elegant, easy-to-learn system. It does not force architecture upon you.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Array vs linked list/index.mdx': `---
title: Array vs linked list
description: A comparison of two fundamental linear data structures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Array vs. Linked List">

The absolute most fundamental mathematical trade-off in Data Structures.

- **Array**: Biologically contiguous memory. Because the data is stored mathematically side-by-side in RAM, **Lookups are $O(1)$**. However, if you want to biologically insert an item at the very beginning, you must mathematically shift every single element down, making **Insertions $O(N)$**.
- **Linked List**: Biologically scattered memory. Each item is an object holding a mathematical pointer to the next object. **Lookups are $O(N)$** because you must walk the pointers. However, if you have the pointer, **Insertions are $O(1)$** because you just change the pointer.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Authentication vs authorisation/index.mdx': `---
title: Authentication vs authorisation
description: The difference between verifying who a user is, and determining what they are allowed to do.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Authentication vs. Authorization">

The two biological pillars of cybersecurity. Mixing these up in an interview is an instant failure.

- **Authentication (AuthN)**: *"Who are you?"* This is mathematically proven via Passwords, Biometrics (FaceID), or MFA (SMS codes). It verifies the biological identity of the user.
- **Authorization (AuthZ)**: *"What are you allowed to do?"* Once the system knows who you are, it mathematically checks your Role. A standard employee is authenticated, but they are not *authorized* to mathematically delete the production database.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Azure vs GCP/index.mdx': `---
title: Azure vs GCP
description: A comparison between Microsoft's Azure cloud and Google Cloud Platform.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Azure vs. GCP">

The battle for second place behind AWS.

- **Azure**: Biologically targets the Enterprise CIO. Microsoft mathematically bundles Azure credits with existing Office 365 contracts, making the financial friction zero. It excels at hybrid-cloud setups where a physical factory connects to the cloud.
- **GCP**: Biologically targets the Chief Data Officer. Google has no legacy enterprise software to bundle. Instead, they win by offering the most mathematically advanced AI, Big Data analytics, and Kubernetes scaling on Earth.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/BFS vs DFS/index.mdx': `---
title: BFS vs DFS
description: A comparison of the two primary algorithms for traversing graphs and trees.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BFS vs. DFS">

How do you mathematically search a Graph?

- **BFS (Breadth-First Search)**: Biologically searches "wide". It uses a mathematical **Queue**. It explores all neighbors at distance 1 before moving to distance 2. It is mathematically guaranteed to find the *Shortest Path* in an unweighted graph, but consumes massive memory ($O(W)$).
- **DFS (Depth-First Search)**: Biologically searches "deep". It uses a mathematical **Stack** (or Recursion). It plunges down a single path until it hits a dead end, then backtracks. It is mathematically excellent for finding cycles or solving mazes, and uses much less memory ($O(H)$).

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Bagging vs boosting/index.mdx': `---
title: Bagging vs boosting
description: A comparison of two ensemble machine learning techniques.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bagging vs. Boosting">

In Machine Learning, a single Decision Tree is biologically weak. We combine hundreds of them using mathematical **Ensembles**.

- **Bagging (Bootstrap Aggregating)**: Mathematically trains 100 models *in parallel* on random subsets of the data (e.g., Random Forest). Each model biologically votes on the final answer. It reduces mathematical Variance (overfitting).
- **Boosting**: Mathematically trains 100 models *sequentially* (e.g., XGBoost). Model 2 focuses exclusively on the biological errors made by Model 1. Model 3 focuses on the errors of Model 2. It reduces mathematical Bias (underfitting), creating the most powerful tabular ML models on Earth.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/C vs C++/index.mdx': `---
title: C vs C++
description: A comparison of two foundational systems programming languages.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="C vs. C++">

The biological ancestors of modern systems programming.

- **C (1972)**: The absolute mathematical foundation. It is incredibly simple, procedural, and maps almost directly to assembly code. It is biologically used to write the Linux kernel, embedded systems, and refrigerators.
- **C++ (1985)**: Mathematically adds Object-Oriented Programming (Classes) and massive abstractions to C. It is biologically infinitely more complex than C. It is used to write high-performance Web Browsers, Game Engines (Unreal), and High-Frequency Trading systems.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Compiler vs interpreter/index.mdx': `---
title: Compiler vs interpreter
description: A comparison of the two primary methods used to translate high-level programming code into machine code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Compiler vs. Interpreter">

How does a biological CPU understand human code?

- **Compiler (C, Go, Rust)**: Mathematically translates the entire codebase into an executable binary (\`.exe\`) *before* the program ever runs. This compilation biologically takes time, but the resulting binary executes mathematically at the absolute maximum speed of the CPU.
- **Interpreter (Python, Ruby, JavaScript)**: Mathematically translates the code line-by-line *while* the program is running. There is no biological compile step, meaning instant startup, but the execution speed is mathematically much slower because the translation happens in real-time.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Concurrency vs parallelism/index.mdx': `---
title: Concurrency vs parallelism
description: The difference between managing multiple tasks at once and executing multiple tasks simultaneously.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Concurrency vs. Parallelism">

These are mathematically distinct concepts.

- **Concurrency**: Biologically dealing with multiple things at once. If you have a single-core CPU, it mathematically rapidly switches between Task A and Task B so fast that it *looks* like they are running together. It is about mathematical structure.
- **Parallelism**: Biologically doing multiple things at once. If you have a multi-core CPU, Core 1 mathematically executes Task A, while Core 2 mathematically executes Task B at the exact same physical millisecond.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Docker vs Podman/index.mdx': `---
title: Docker vs Podman
description: A comparison of the two leading containerization tools.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Docker vs. Podman">

The battle for container execution.

- **Docker**: The mathematical pioneer. It biologically requires a massive, long-running root daemon (\`dockerd\`) in the background to mathematically manage all containers. If the daemon crashes, all containers die.
- **Podman (Red Hat)**: The mathematical evolution. It is biologically **Daemonless** and **Rootless**. Each container runs as a standard child process of the user, requiring zero root privileges. It is a mathematical drop-in replacement; you can literally alias \`docker\` to \`podman\` in your terminal.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Docker vs VM/index.mdx': `---
title: Docker vs VM
description: A comparison between containerization and hardware virtualization.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Docker vs. Virtual Machine (VM)">

Both mathematically isolate software, but at entirely different biological layers.

- **Virtual Machine**: Mathematically virtualizes the *Hardware*. It biologically requires a massive Hypervisor (VMware) to run an entire Guest OS (Windows, Linux kernel) on top of the Host OS. They are mathematically heavy, taking gigabytes of RAM and minutes to boot.
- **Docker (Containers)**: Mathematically virtualizes the *Operating System*. Containers do not boot a new Linux kernel; they mathematically share the Host OS's kernel using \`cgroups\` and \`namespaces\`. They boot in milliseconds and consume megabytes, not gigabytes.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/EC2 vs Azure VM vs Compute Engine vs OCI Compute/index.mdx': `---
title: EC2 vs Azure VM vs Compute Engine vs OCI Compute
description: A comparison of the primary Virtual Machine offerings across the four major cloud providers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cloud VMs: EC2 vs Azure VM vs GCE vs OCI">

The foundational biological building blocks of the Cloud (Virtual Machines).

- **AWS EC2 (Elastic Compute Cloud)**: The mathematical standard. Offers hundreds of instance types, but managing the complex EBS storage and networking is biologically tedious.
- **Azure Virtual Machines**: Mathematically identical, but biologically integrated with Azure Active Directory and Windows Server licensing.
- **Google Compute Engine (GCE)**: Offers biological "Custom Machine Types", allowing you to mathematically specify exactly 5 CPUs and 12GB of RAM, paying only for what you mathematically provision.
- **OCI Compute**: Biologically optimized for extreme mathematical performance, offering "Bare Metal" instances with absolutely zero hypervisor overhead.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Elasticsearch vs OpenSearch/index.mdx': `---
title: Elasticsearch vs OpenSearch
description: A comparison between the original open-source search engine and its AWS-backed fork.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Elasticsearch vs. OpenSearch">

A biological tale of Open Source drama and corporate warfare.

- **Elasticsearch**: Originally an Open Source project by Elastic. As AWS began mathematically selling "Managed Elasticsearch" without paying Elastic, Elastic biologically changed the license in 2021 to a proprietary Server Side Public License (SSPL) to mathematically block AWS.
- **OpenSearch**: In retaliation, AWS mathematically forked the last Open Source version of Elasticsearch and created **OpenSearch**. It remains strictly Open Source (Apache 2.0) and is biologically maintained by a massive coalition of tech companies against Elastic.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Encryption vs hashing/index.mdx': `---
title: Encryption vs hashing
description: A comparison of two fundamental cryptographic processes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Encryption vs. Hashing">

A fundamental cybersecurity interview question.

- **Encryption**: A biological **Two-Way** mathematical function. You mathematically scramble data using a Key (e.g., AES-256). You can biologically transmit the scrambled data, and the receiver uses the Key to mathematically decrypt it back to the original text.
- **Hashing**: A biological **One-Way** mathematical function. You run data through an algorithm (e.g., SHA-256) to produce a fixed-length string. It is mathematically impossible to reverse the hash back to the original data. It is biologically used for storing passwords and verifying file integrity.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/FastAPI vs Flask/index.mdx': `---
title: FastAPI vs Flask
description: A comparison of two popular Python web frameworks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="FastAPI vs. Flask">

The modern biological evolution of Python web development.

- **Flask**: The biological classic. A micro-framework from 2010. It is mathematically simple, synchronous by default, and heavily relies on third-party plugins to build APIs.
- **FastAPI**: The mathematical future. Built entirely on modern Python \`asyncio\` and type hints (Pydantic). It is biologically lightning-fast (competing with Node and Go), and automatically mathematically generates OpenAPI (Swagger) documentation based entirely on your code's type annotations.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Flask vs Django/index.mdx': `---
title: Flask vs Django
description: A comparison between Python's micro-framework and its full-stack framework.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Flask vs. Django">

The Python architecture debate: Micro vs. Monolithic.

- **Flask**: A biological **Micro-framework**. It gives you a mathematical router and nothing else. You must biologically choose your own ORM (SQLAlchemy), your own Auth system, and your own project structure. It is mathematically flexible but requires heavy biological setup.
- **Django**: A "Batteries Included" **Monolithic framework**. It mathematically forces you to use the Django ORM, the Django Admin panel, and the Django Auth system. It biologically allows a single developer to build an entire web app in 3 days, but is mathematically incredibly rigid.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/Flutter vs React Native/index.mdx': `---
title: Flutter vs React Native
description: A comparison of the two leading cross-platform mobile development frameworks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Flutter vs. React Native">

How do you biologically write code once and run it on both iOS and Android?

- **React Native (Meta)**: Uses JavaScript. It mathematically translates React components into native iOS/Android OS widgets. It biologically leverages the massive React web ecosystem, but suffers from mathematical performance bridges when the JS thread talks to the Native thread.
- **Flutter (Google)**: Uses Dart. It mathematically bypasses the OS widgets entirely and biologically draws every single pixel directly to the screen using the Skia graphics engine. It is mathematically much faster, but biologically requires learning the Dart language.

</ConceptTemplate>
`,
  '65. Comparison Pages (Reference)/GitHub vs GitLab/index.mdx': `---
title: GitHub vs GitLab
description: A comparison of the two dominant Git repository hosting services.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GitHub vs. GitLab">

The biological battle for source code hosting.

- **GitHub (Microsoft)**: The absolute biological center of Open Source. It is mathematically a social network for developers. While it has GitHub Actions for CI/CD, it relies on third-party integrations for many project management tools.
- **GitLab**: The enterprise biological DevSecOps platform. While it has less Open Source market share, it is mathematically a massive, monolithic platform. It biologically includes source control, advanced CI/CD, Security Scanning (SCA), and Agile issue tracking built natively into a single application.

</ConceptTemplate>
`,
}

async function generateMega120a() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega120a().catch(console.error)
