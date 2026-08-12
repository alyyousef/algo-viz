import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '7. DevOps & Infrastructure/Terraform/index.mdx': `---
title: Terraform
description: Infrastructure as code software tool created by HashiCorp.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Terraform">

Terraform is an open-source infrastructure as code (IaC) software tool created by HashiCorp. Users define and provide data center infrastructure using a declarative configuration language known as HashiCorp Configuration Language (HCL), or optionally JSON.

<Callout icon="tip" title="State Management">
  Terraform's key differentiator is its **State File** (\`terraform.tfstate\`). It remembers the state of the infrastructure it created, so when you modify your configuration, it calculates the exact delta needed to achieve the desired state instead of tearing everything down.
</Callout>

## Terraform Workflow

<ArchitectureDiagram chart={\`
graph LR
  Write(Write Code) --> Init(terraform init)
  Init --> Plan(terraform plan)
  Plan --> Apply(terraform apply)
  Apply --> State[(State File)]
  State --> Plan
\`} />

## Core Concepts

<ComparisonTable 
  headers={['Concept', 'Description']}
  rows={[
    ['Providers', 'Plugins that allow Terraform to interact with cloud platforms (AWS, Azure, GCP, etc.).'],
    ['Resources', 'The most important element. Defines a piece of infrastructure (e.g. an EC2 instance, a Virtual Network).'],
    ['Data Sources', 'Allows Terraform to fetch information defined outside of Terraform (e.g. looking up an existing AMI ID).'],
    ['State', 'The JSON file where Terraform maps real-world resources to your configuration.']
  ]}
/>

## Example Configuration

<pre className="bin98-codebox">
<code>
{\`provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"

  tags = {
    Name = "HelloWorld"
  }
}\`}
</code>
</pre>

</TechnologyTemplate>
`,
  '7. DevOps & Infrastructure/GitHub/index.mdx': `---
title: GitHub
description: Internet hosting service for software development and version control using Git.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="GitHub">

GitHub is a web-based interface that uses Git, the open source version control software that lets multiple people make separate changes to web pages at the same time. Acquired by Microsoft in 2018, it is the world's largest repository of source code.

<Callout icon="info" title="Git != GitHub">
  Remember: **Git** is the local version control tool. **GitHub** is the cloud-based hosting service and collaboration platform built around Git.
</Callout>

## The GitHub Flow

<ArchitectureDiagram chart={\`
sequenceDiagram
    participant Dev as Developer
    participant Branch as Feature Branch
    participant PR as Pull Request
    participant Master as Main Branch
    
    Dev->>Branch: Commits code
    Dev->>PR: Opens Pull Request
    Note over PR: Code Review & CI Checks
    PR-->>Dev: Feedback
    Dev->>PR: Fixes & Push
    PR->>Master: Merge Pull Request
\`} />

## Key Features

<ComparisonTable 
  headers={['Feature', 'Purpose']}
  rows={[
    ['Pull Requests', 'The core collaboration mechanism. Propose changes, review code, and merge into the main branch.'],
    ['GitHub Actions', 'Integrated CI/CD pipelines defined in YAML files.'],
    ['GitHub Issues', 'Integrated project management and bug tracking.'],
    ['GitHub Copilot', 'AI pair programmer integrated into the IDE, trained on public GitHub repositories.']
  ]}
/>

</TechnologyTemplate>
`,
  '7. DevOps & Infrastructure/CI-CD/index.mdx': `---
title: CI/CD
description: Continuous Integration and Continuous Deployment/Delivery.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CI/CD (Continuous Integration / Continuous Deployment)">

CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development. The main concepts attributed to CI/CD are continuous integration, continuous delivery, and continuous deployment.

<Callout icon="tip" title="The Goal">
  The primary goal of CI/CD is to eliminate the "integration hell" of manual merges and deployments, replacing them with a highly reliable, automated pipeline that builds, tests, and deploys code safely every time a developer pushes a change.
</Callout>

## CI vs CD

<ComparisonTable 
  headers={['Term', 'Meaning', 'What happens?']}
  rows={[
    ['CI', 'Continuous Integration', 'Developers frequently merge code. Automated tests and builds run to ensure the code integrates cleanly.'],
    ['CD (Delivery)', 'Continuous Delivery', 'Code is built and tested automatically and is *ready* for a human to click a button to deploy it.'],
    ['CD (Deployment)', 'Continuous Deployment', 'Code is built, tested, and *automatically deployed* to production without human intervention.']
  ]}
/>

## A Standard Pipeline

<ArchitectureDiagram chart={\`
graph LR
  Code[Code Push] --> Build(Build Container)
  Build --> Test(Run Unit Tests)
  Test --> Security(Security Scan)
  Security --> Artifact[(Push to Registry)]
  Artifact --> DeployStage(Deploy to Staging)
  DeployStage --> E2E(Run E2E Tests)
  E2E --> DeployProd(Deploy to Production)
\`} />

</ConceptTemplate>
`,
  '5. Databases & Storage/NoSQL/index.mdx': `---
title: NoSQL
description: Non-tabular databases optimized for highly scalable applications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NoSQL (Not Only SQL)">

NoSQL databases (aka "not only SQL") are non-tabular databases and store data differently than relational tables. NoSQL databases come in a variety of types based on their data model.

<Callout icon="info" title="Why NoSQL?">
  NoSQL databases are highly recognized for their ease of development, flexible schema, and extreme scalability (horizontal scaling) designed to handle big data and real-time web apps.
</Callout>

## Types of NoSQL Databases

<ComparisonTable 
  headers={['Type', 'Use Case', 'Examples']}
  rows={[
    ['Document', 'Storing semi-structured data like JSON objects.', 'MongoDB, Couchbase'],
    ['Key-Value', 'Caching, session management, extreme high-speed reads.', 'Redis, DynamoDB, Memcached'],
    ['Wide-Column', 'Time-series data, huge datasets requiring massive horizontal scaling.', 'Cassandra, HBase'],
    ['Graph', 'Social networks, recommendation engines, fraud detection.', 'Neo4j, Amazon Neptune']
  ]}
/>

## Relational vs NoSQL

<ArchitectureDiagram chart={\`
graph TD
  subgraph Relational (SQL)
    SQL(Strict Schema)
    ACID(Strong ACID Consistency)
    Vertical(Vertical Scaling)
    SQL --- ACID
    ACID --- Vertical
  end
  
  subgraph NoSQL
    NoSQL_Node(Flexible/No Schema)
    BASE(Eventual Consistency / BASE)
    Horiz(Horizontal Scaling)
    NoSQL_Node --- BASE
    BASE --- Horiz
  end
\`} />

</ConceptTemplate>
`,
  '4. Software Engineering & Architecture/Distributed Systems/index.mdx': `---
title: Distributed Systems
description: Computing environments in which components are spread across multiple computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Distributed Systems">

A distributed system is a computing environment in which various components are spread across multiple computers (or other computing devices) on a network. These devices split up the work, coordinating their efforts to complete the job more efficiently than if a single device had been responsible for the task.

<Callout icon="error" title="Fallacies of Distributed Computing">
  When engineers transition from single-machine monoliths to distributed architectures, they often falsely assume: the network is reliable, latency is zero, bandwidth is infinite, the network is secure, and topology doesn't change.
</Callout>

## CAP Theorem

The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:

<ComparisonTable 
  headers={['Guarantee', 'Description']}
  rows={[
    ['Consistency (C)', 'Every read receives the most recent write or an error.'],
    ['Availability (A)', 'Every request receives a (non-error) response, without the guarantee that it contains the most recent write.'],
    ['Partition Tolerance (P)', 'The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network.']
  ]}
/>

## Monolith vs Microservices

<ArchitectureDiagram chart={\`
graph TD
  subgraph Monolithic Architecture
    MonoDB[(Database)]
    UI1(User Interface)
    BL1(Business Logic)
    DA1(Data Access)
    
    UI1 --- BL1 --- DA1 --- MonoDB
  end
  
  subgraph Microservices Architecture
    API(API Gateway)
    
    S1(Service A)
    S2(Service B)
    S3(Service C)
    
    DB1[(DB A)]
    DB2[(DB B)]
    DB3[(DB C)]
    
    API --> S1
    API --> S2
    API --> S3
    
    S1 --> DB1
    S2 --> DB2
    S3 --> DB3
  end
\`} />

</ConceptTemplate>
`,
  '4. Software Engineering & Architecture/Software Engineering/index.mdx': `---
title: Software Engineering
description: The systematic application of engineering approaches to software development.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Software Engineering">

Software engineering is the systematic application of engineering approaches to the development of software. It involves applying engineering principles to the entire software development lifecycle (SDLC) to ensure quality, reliability, and maintainability.

<Callout icon="tip" title="Not just coding">
  Software engineering differs from programming in that it focuses heavily on scale, collaboration, maintenance over time, testing, and system design, rather than just writing a script that works once.
</Callout>

## Software Development Life Cycle (SDLC)

<ArchitectureDiagram chart={\`
graph LR
  Req(Requirements) --> Design(Design)
  Design --> Dev(Implementation)
  Dev --> Test(Testing)
  Test --> Deploy(Deployment)
  Deploy --> Maint(Maintenance)
  Maint --> Req
\`} />

## Methodologies

<ComparisonTable 
  headers={['Methodology', 'Characteristics']}
  rows={[
    ['Waterfall', 'Linear, sequential phases. Rigid, but easy to manage for highly predictable projects.'],
    ['Agile', 'Iterative development, flexible to changes, close collaboration with stakeholders. Frameworks include Scrum and Kanban.'],
    ['DevOps', 'Combines development and operations to shorten the SDLC and provide continuous delivery with high quality.']
  ]}
/>

</ConceptTemplate>
`,
  '0. Computer Science Fundamentals/Computer Architecture/index.mdx': `---
title: Computer Architecture
description: The rules and methods describing the functionality of computer systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computer Architecture">

Computer architecture is a set of rules and methods that describe the functionality, organization, and implementation of computer systems. It defines how the hardware components of a computer system interact to execute software instructions.

<Callout icon="info" title="Von Neumann Architecture">
  Most modern computers follow the Von Neumann architecture, which stores both the program instructions and the data in the same memory space.
</Callout>

## The Memory Hierarchy

<ArchitectureDiagram chart={\`
graph TD
  Reg(Registers - CPU) --> L1(L1/L2/L3 Cache)
  L1 --> RAM(Main Memory / RAM)
  RAM --> SSD(Secondary Storage / SSD / HDD)
  SSD --> Cloud(Tertiary / Cloud Storage)
  
  style Reg fill:#f9f,stroke:#333,stroke-width:2px
  style L1 fill:#bbf,stroke:#333,stroke-width:2px
  style RAM fill:#dfd,stroke:#333,stroke-width:2px
\`} />

## Components

<ComparisonTable 
  headers={['Component', 'Acronym', 'Function']}
  rows={[
    ['Central Processing Unit', 'CPU', 'The brain of the computer. Executes instructions via the ALU (Arithmetic Logic Unit) and Control Unit.'],
    ['Random Access Memory', 'RAM', 'Volatile memory used to store data and instructions currently in use.'],
    ['Instruction Set Architecture', 'ISA', 'The boundary between hardware and software (e.g. x86, ARM, RISC-V).']
  ]}
/>

</ConceptTemplate>
`,
  '9. Networking & Security/Cybersecurity/index.mdx': `---
title: Cybersecurity
description: Protecting systems, networks, and programs from digital attacks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cybersecurity">

Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.

<Callout icon="error" title="The Human Element">
  Despite advanced firewalls and encryption, the weakest link in cybersecurity is almost always the human element. Phishing and social engineering account for the vast majority of successful breaches.
</Callout>

## The CIA Triad

The core foundation of information security is the CIA Triad.

<ComparisonTable 
  headers={['Pillar', 'Meaning', 'Example Defense']}
  rows={[
    ['Confidentiality', 'Only authorized users can access the data.', 'Encryption (AES), Multi-Factor Authentication (MFA)'],
    ['Integrity', 'Data is accurate and cannot be modified tampered with.', 'Hashing (SHA-256), Digital Signatures'],
    ['Availability', 'Systems and data are available when needed.', 'Redundant servers, DDoS protection (Cloudflare)']
  ]}
/>

## Common Attack Vectors

<ArchitectureDiagram chart={\`
graph TD
  Attacker((Attacker))
  
  Attacker -->|Phishing| User(End User)
  Attacker -->|SQL Injection| Web(Web Server)
  Attacker -->|DDoS| Net(Network Infrastructure)
  
  User -->|Stolen Credentials| DB[(Database)]
  Web -->|Data Exfiltration| DB
  Net -->|Denial of Service| Web
\`} />

</ConceptTemplate>
`,
}

async function writeBatch4() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Updated ${relativePath} with rich content.`)
  }
}

writeBatch4().catch(console.error)
