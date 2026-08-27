import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CDK/index.mdx': `---
title: AWS Cloud Development Kit (CDK)
description: A groundbreaking infrastructure-as-code framework that allows developers to define complex cloud architectures using familiar imperative programming languages like TypeScript and Python instead of static YAML.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Cloud Development Kit (CDK)"
  subtitle="Infrastructure as True Code"
  tags={['AWS', 'IaC', 'TypeScript', 'DevOps']}
>

Writing thousands of lines of static JSON or YAML (CloudFormation) to define a VPC is error-prone and unreadable. AWS CDK solves this by turning infrastructure into an object-oriented software engineering problem.

## 1. Imperative to Declarative Compilation
In CDK, you write standard TypeScript. 
You instantiate a VPC as a Class: TICK1const vpc = new ec2.Vpc(this, 'MyVpc')TICK1. 
You can use standard programming constructs like TICK1forTICK1 loops, TICK1ifTICK1 statements, and functions to dynamically generate infrastructure. 
When you run TICK1cdk synthTICK1, the CDK compiler executes your TypeScript, mathematically calculates the dependency graph of all the objects, and automatically generates the massive, flawless, declarative CloudFormation YAML template required by AWS.

## 2. L2 and L3 Constructs (Abstraction)
The true power of CDK is mathematical abstraction.
- **L1 Constructs**: A 1-to-1 mapping of a raw CloudFormation resource.
- **L2 Constructs**: AWS-provided classes with mathematically safe defaults. If you instantiate an L2 TICK1BucketTICK1, CDK automatically applies industry-standard encryption and IAM policies, saving you 50 lines of boilerplate.
- **L3 Constructs (Patterns)**: Massive architectural templates. With a single line of code (TICK1ApplicationLoadBalancedFargateServiceTICK1), CDK will mathematically synthesize an entire architecture: a VPC, subnets, an Application Load Balancer, an ECS Cluster, a Fargate Task, and all the exact IAM security groups required to wire them together securely.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CloudFormation/index.mdx': `---
title: AWS CloudFormation
description: The foundational Infrastructure as Code (IaC) engine in AWS that mathematically parses declarative YAML/JSON templates to automatically provision, configure, and safely orchestrate cloud resources.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS CloudFormation"
  subtitle="The IaC Engine of AWS"
  tags={['AWS', 'IaC', 'YAML', 'Orchestration']}
>

If you manually click through the AWS Console to create a server, you cannot version control your clicks. CloudFormation turns your entire physical datacenter architecture into a single, version-controlled text file.

## 1. Declarative State Machine
CloudFormation is strictly **Declarative**. You do not tell AWS *how* to build the server; you mathematically define what the final State should look like.
You write a YAML file declaring: *"I need an S3 Bucket and an EC2 Instance."* 
CloudFormation mathematically calculates the **Dependency Graph**. If the EC2 instance needs to read from the S3 bucket, CloudFormation knows it must physically provision the Bucket *first*, generate its physical ARN, and then inject that ARN into the EC2 instance's configuration. It handles all mathematical orchestration and timing automatically.

## 2. Drift Detection and Rollbacks
CloudFormation acts as the absolute source of truth.
If a rogue developer logs into the console and manually deletes a database index, the physical reality diverges from the YAML file. CloudFormation's **Drift Detection** mathematically compares the live API state to the YAML template and flags the exact line of configuration that was tampered with.
Furthermore, if you deploy a broken YAML file, CloudFormation uses transactional math. If step 45 of 50 fails, it mathematically executes an automated **Rollback**, deleting the first 44 resources in reverse order to ensure your AWS account never gets stuck in a broken, half-deployed state.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CloudFront/index.mdx': `---
title: Amazon CloudFront
description: A massive, globally distributed Content Delivery Network (CDN) that caches static and dynamic web content at the physical edges of the internet to mathematically minimize latency for end users.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon CloudFront"
  subtitle="AWS's Global CDN"
  tags={['AWS', 'CDN', 'Networking', 'Edge']}
>

If your web server is in Virginia, and a user in Tokyo requests a 5MB image, the data must physically travel through deep-sea fiber optic cables across the Pacific Ocean, which takes 200 milliseconds. CloudFront solves this geographical physics problem.

## 1. Edge Locations and Caching
CloudFront consists of hundreds of **Points of Presence (PoPs)** located in major cities around the globe.
When the Tokyo user requests the image, the request is mathematically routed via DNS to the Tokyo PoP. If the image is not there (a Cache Miss), CloudFront fetches it from Virginia, delivers it to the user, and *saves a copy in Tokyo*. The next million users in Tokyo who request that image get it directly from the local PoP in 5 milliseconds. This mathematically reduces the load on your Virginia server to near zero.

## 2. Edge Compute (Lambda@Edge)
CloudFront is not just dumb storage; it is a distributed compute engine.
Using **Lambda@Edge** or **CloudFront Functions**, you can execute JavaScript directly inside the Tokyo PoP before the request even reaches your main server. 
You can mathematically inspect the HTTP headers, realize the user is on an iPhone, and rewrite the URL to serve a mobile-optimized image, all in sub-milliseconds at the edge of the network, drastically improving security, routing, and user experience.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CloudTrail/index.mdx': `---
title: AWS CloudTrail
description: The absolute foundational security and compliance service in AWS that continuously and immutably logs every single API call made across the entire account for forensic auditing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS CloudTrail"
  subtitle="The Immutable API Ledger"
  tags={['AWS', 'Security', 'Auditing', 'Governance']}
>

In AWS, everything is an API call. Clicking a button in the console is just a visual wrapper for an API call. CloudTrail is the un-deletable security camera that mathematically records who made that call, when, and from what IP address.

## 1. The Anatomy of an Event
If a database is suddenly deleted, you check CloudTrail. 
CloudTrail will output a JSON mathematical proof containing:
- **Identity**: The exact IAM User, Role, or temporary credential that authorized the action.
- **Event Name**: TICK1DeleteDBInstanceTICK1.
- **Source IP**: 192.168.1.45.
- **Time and Region**: The exact UTC microsecond the API was hit.
This data is the absolute bedrock of cloud forensics.

## 2. Immutability and Log Validation
Hackers know about CloudTrail. If they breach an account, their first action is often trying to delete the CloudTrail logs to cover their tracks.
To prevent this, architects configure CloudTrail to push logs into a central S3 bucket in a completely separate, highly restricted AWS Account. Furthermore, CloudTrail uses **Log File Integrity Validation**. It mathematically calculates a SHA-256 cryptographic hash of every log file and signs it with a digital certificate. If a hacker manages to open a log file and delete a single line of text, the mathematical hash instantly breaks, alerting security teams to the forensic tampering.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CloudWatch/index.mdx': `---
title: Amazon CloudWatch
description: The central nervous system of AWS, providing a unified mathematical telemetry platform for collecting logs, visualizing performance metrics, and triggering automated alarms across all cloud infrastructure.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon CloudWatch"
  subtitle="The Telemetry Hub"
  tags={['AWS', 'Monitoring', 'Logs', 'Metrics']}
>

If an EC2 server runs out of memory and crashes in the cloud, you cannot physically look at its screen. CloudWatch is the mathematical dashboard that allows you to "see" the internal state of your entire architecture.

## 1. Metrics and Alarms
Every AWS service automatically pushes mathematical **Metrics** to CloudWatch (e.g., EC2 pushes CPU Utilization, DynamoDB pushes Consumed Read Capacity).
You can mathematically define an **Alarm** on these metrics. For example: *"If the Average CPU Utilization of this server exceeds 80% for 3 consecutive 5-minute periods, trigger an Alarm."* 
This Alarm does not just send an email. It can execute an automated mathematical response, such as triggering an Auto Scaling Group to instantly provision three new servers to handle the traffic spike, preventing downtime.

## 2. CloudWatch Logs
Metrics are numbers; Logs are text.
If your Python backend throws a TICK1NullReferenceExceptionTICK1, that text is streamed directly into CloudWatch Logs. 
Because wading through millions of lines of text is impossible, CloudWatch provides **Log Insights**, a purpose-built query language. You can mathematically parse the raw text logs on the fly, extracting JSON fields and writing SQL-like queries to instantly find exactly how many times a specific Error Code was thrown in the last 24 hours.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CodeBuild/index.mdx': `---
title: AWS CodeBuild
description: A fully managed, serverless Continuous Integration (CI) service that compiles source code, runs automated mathematical testing suites, and produces deployment-ready software packages.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS CodeBuild"
  subtitle="Serverless CI Compilation"
  tags={['AWS', 'CI/CD', 'DevOps', 'Docker']}
>

When a developer pushes code, it must be compiled, tested, and packaged into a Docker container. Running a dedicated Jenkins server to do this is expensive and requires constant maintenance. CodeBuild is the serverless solution.

## 1. The Buildspec Abstraction
CodeBuild is driven by a mathematical instruction manual called the TICK1buildspec.ymlTICK1 file, which lives directly inside the source code repository.
It divides the build into strict logical phases:
- **Install**: Run TICK1npm installTICK1 or TICK1pip installTICK1.
- **Pre-build**: Run the mathematical unit tests and code linters.
- **Build**: Compile the code and run TICK1docker buildTICK1.
- **Post-build**: Push the final Docker image to a registry (like ECR).
Because the instructions are version-controlled alongside the code, the build process is mathematically reproducible for any Git commit in history.

## 2. Serverless Ephemerality
CodeBuild charges by the minute. 
When a build is triggered, AWS dynamically provisions an isolated compute container, clones the code, executes the TICK1buildspecTICK1, outputs the artifacts, and immediately destroys the container. There is no idle server sitting around wasting money. If 50 developers push code at the exact same second, CodeBuild mathematically scales horizontally, spinning up 50 parallel isolated containers so no one has to wait in a queue.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/CodePipeline/index.mdx': `---
title: AWS CodePipeline
description: A fully managed Continuous Delivery (CD) orchestration service that automatically models, visualizes, and mathematically executes the exact steps required to release software from Git to Production.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS CodePipeline"
  subtitle="The CI/CD Orchestrator"
  tags={['AWS', 'CI/CD', 'DevOps', 'Pipelines']}
>

CodeBuild compiles the code, but it does not orchestrate the release. CodePipeline is the overarching State Machine that defines the absolute physical flow of code from a developer's laptop to a live production server.

## 1. The Pipeline Stages
A Pipeline is mathematically divided into Stages, and each Stage contains Actions.
1. **Source Stage**: The pipeline detects a new Git push in GitHub or CodeCommit. It mathematically extracts the ZIP file of the code.
2. **Build Stage**: It passes the ZIP to CodeBuild. CodeBuild runs the tests and outputs a compiled Docker Image.
3. **Staging/Deploy Stage**: It passes the Docker Image to ECS or EKS to deploy to a private testing environment.
4. **Manual Approval Stage**: The pipeline physically halts. It sends an email to a QA Manager. The mathematical state machine will not proceed until a human clicks "Approve."
5. **Production Stage**: It mathematically executes a safe, rolling deployment to the live user-facing servers.

## 2. Artifact Passing
The stages do not talk to each other directly. They communicate via an S3 Bucket.
When the Source stage finishes, it writes the raw code to S3 (an Artifact). The Build stage downloads that Artifact, compiles it, and writes the Output Artifact to S3. This decoupled mathematical architecture ensures that if the Production deployment fails, you do not need to recompile the code; the pipeline simply grabs the exact Output Artifact from the Build stage and tries again.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Cognito/index.mdx': `---
title: Amazon Cognito
description: A massively scalable Customer Identity and Access Management (CIAM) service that handles secure user sign-up, authentication, and token generation for web and mobile applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Cognito"
  subtitle="Managed User Authentication"
  tags={['AWS', 'Security', 'Identity', 'JWT']}
>

Writing your own cryptography to hash passwords and manage session tokens in a database is a massive security risk. Cognito outsources the complex mathematics of user authentication to AWS.

## 1. User Pools (Authentication)
A **User Pool** is the managed database of your users. 
It handles the entire lifecycle: Sign-Up, Email Verification, Password Resets, and Multi-Factor Authentication (MFA). 
When a user successfully logs in, Cognito executes cryptographic math to generate three **JSON Web Tokens (JWTs)**:
- **ID Token**: Contains the user's profile data (Email, Name).
- **Access Token**: Contains the OAuth scopes (what the user is allowed to do).
- **Refresh Token**: Used to securely get new Access Tokens when the old one expires.
The frontend application mathematically attaches the Access Token to every API request to prove identity.

## 2. Identity Pools (Authorization)
A User Pool proves *who* you are. An **Identity Pool** dictates *what* AWS resources you can touch.
If you want your mobile app users to upload profile pictures directly to an S3 bucket (without going through your backend API), the app sends the Cognito JWT to the Identity Pool. The Identity Pool mathematically verifies the cryptographic signature of the token, and exchanges it for temporary, highly restricted AWS IAM Credentials that only allow that specific user to write to their specific folder in S3.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Control Tower/index.mdx': `---
title: AWS Control Tower
description: An enterprise governance service that automates the mathematical provisioning of a secure, multi-account AWS environment (a Landing Zone) enforced by strict, un-bypassable compliance guardrails.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Control Tower"
  subtitle="Multi-Account Governance"
  tags={['AWS', 'Security', 'Enterprise', 'Governance']}
>

If a massive enterprise puts 500 developers in a single AWS account, the Blast Radius of a single mistake is the entire company. The architectural solution is to use AWS Organizations to give every team their own isolated AWS account. Control Tower manages the chaos of hundreds of accounts.

## 1. The Landing Zone
When you activate Control Tower, it uses CloudFormation to mathematically synthesize a **Landing Zone**. 
It automatically creates a structural hierarchy of AWS Accounts:
- **Log Archive Account**: A locked-down account where every CloudTrail log from all 500 sub-accounts is immutably stored.
- **Security Account**: An account for the Infosec team containing cross-account auditing tools (Security Hub, GuardDuty).
When a new team needs an environment, they use the Account Factory. Control Tower automatically spins up a mathematically pristine, pre-configured AWS account that is instantly wired into the central billing and security architecture.

## 2. Detective and Preventive Guardrails
Control Tower enforces absolute mathematical rules across all 500 accounts using **Guardrails**.
- **Preventive Guardrails** (powered by Service Control Policies - SCPs): A mathematical absolute. For example, *"No one, not even the Root User of a sub-account, is allowed to disable CloudTrail or provision servers outside of the US-East-1 region."* The API mathematically blocks the action.
- **Detective Guardrails** (powered by AWS Config): *"If any developer creates an S3 bucket that is public, instantly flag it as Non-Compliant and trigger an automated Lambda function to mathematically rewrite the bucket policy to Private."*

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/DynamoDB/index.mdx': `---
title: Amazon DynamoDB
description: A fully managed, multi-region NoSQL key-value and document database designed by AWS to deliver mathematically guaranteed single-digit millisecond latency at literally any scale.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon DynamoDB"
  subtitle="The Infinite NoSQL Database"
  tags={['AWS', 'Database', 'NoSQL', 'Serverless']}
>

Relational SQL databases (like Postgres) hit a mathematical physical limit when scaling vertically. DynamoDB is designed for horizontal infinity. Whether your table has 10 rows or 100 billion rows, DynamoDB mathematically guarantees the exact same 5-millisecond read time.

## 1. Consistent Hashing and Partitions
DynamoDB achieves infinite scale by destroying the concept of a "single server."
Under the hood, your data is mathematically shredded across thousands of physical storage nodes (Partitions). 
When you write an item, you must provide a **Partition Key** (e.g., TICK1UserID = 123TICK1). DynamoDB runs the Partition Key through a cryptographic Hash Function. The output integer dictates exactly which physical server will store the data. 
When you read TICK1UserID = 123TICK1, the mathematical hash instantly calculates the exact server IP. The database does not need to search; it routes the query directly to the correct SSD, enabling $O(1)$ constant-time lookups regardless of how massive the database grows.

## 2. The Trade-off: Query Flexibility
The mathematical cost of infinite scale is the loss of SQL TICK1JOINTICK1 operations and flexible querying. 
Because the data for User 123 and User 456 are on physically different servers, you cannot efficiently run a query like *"Find all users who bought red shoes."* (This requires a Full Table Scan, which is financially ruinous in DynamoDB).
To use DynamoDB correctly, developers must use **Single-Table Design**, pre-calculating and physically co-locating related data into the same Partition, optimizing the physical layout of the bytes for the exact Access Patterns the API requires.

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
