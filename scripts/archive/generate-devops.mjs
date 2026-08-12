import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '37. Containers & Kubernetes/Docker/index.mdx': `---
title: Docker
description: An open platform for developing, shipping, and running applications in isolated containers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Docker">

Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called **Containers**. Containers are isolated from one another and bundle their own software, libraries and configuration files.

<Callout icon="info" title="The Container Revolution">
  Before Docker, developers struggled with the "It works on my machine!" problem. Docker solved this by allowing developers to package the exact OS dependencies, runtimes, and code into a single, immutable artifact (an Image) that runs exactly the same everywhere.
</Callout>

## Virtual Machines vs Containers

<ComparisonTable 
  headers={['Feature', 'Virtual Machines (VMs)', 'Docker Containers']}
  rows={[
    ['Architecture', 'Runs a full Guest OS on top of a Hypervisor.', 'Shares the Host OS Kernel. Does not run a full Guest OS.'],
    ['Startup Time', 'Minutes (Booting an OS).', 'Milliseconds (Just starting a process).'],
    ['Size', 'Gigabytes.', 'Megabytes.'],
    ['Isolation', 'Hardware-level isolation (Very secure).', 'Process-level isolation via namespaces/cgroups (Less secure).']
  ]}
/>

## Example: Dockerfile

A \`Dockerfile\` is a text document that contains all the commands a user could call on the command line to assemble an image.

\`\`\`dockerfile
# Start from a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "start"]
\`\`\`

## Architecture

Docker uses a client-server architecture. The Docker Client talks to the Docker Daemon, which does the heavy lifting.

<ArchitectureDiagram chart={\`
graph LR
  Client[Docker CLI]
  
  subgraph Docker Host
    Daemon(Docker Daemon)
    Images[(Local Images)]
    Containers[Running Containers]
  end
  
  Registry[(Docker Hub\\nRemote Registry)]
  
  Client -- "docker build" --> Daemon
  Client -- "docker pull" --> Daemon
  Client -- "docker run" --> Daemon
  
  Daemon -. fetches from .-> Registry
  Daemon -. builds .-> Images
  Daemon -. spins up .-> Containers
\`} />

</TechnologyTemplate>
`,
  '54. Cloud-Native, Platform Engineering & FinOps/54.1 Cloud-Native/Kubernetes/index.mdx': `---
title: Kubernetes (K8s)
description: An open-source system for automating deployment, scaling, and management of containerized applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Kubernetes">

Kubernetes (often abbreviated as **K8s**) is an open-source container orchestration system originally designed by Google and now maintained by the Cloud Native Computing Foundation (CNCF). 

While Docker is great for running one container on one laptop, what happens when you need to run 5,000 containers across 200 servers, and you need them to auto-scale, self-heal, and talk to each other? That is what Kubernetes solves.

<Callout icon="warning" title="Extreme Complexity">
  Kubernetes is incredibly powerful, but notoriously difficult to set up and maintain. Most companies opt to use managed Kubernetes services like Amazon EKS, Google GKE, or Azure AKS rather than building clusters from scratch.
</Callout>

## Core Concepts

Kubernetes abstracts away individual servers and treats the entire data center as a single pool of resources.

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['Pod', 'The smallest deployable unit in Kubernetes. A Pod contains one or more containers (usually one).'],
    ['Deployment', 'A declarative way to tell K8s "I want exactly 3 replicas of my web app running at all times."'],
    ['Service', 'An abstraction that provides a stable IP address and DNS name to a set of Pods (since Pod IPs constantly change).'],
    ['Ingress', 'Manages external access to the services in a cluster, typically HTTP (like an API Gateway/Load Balancer).']
  ]}
/>

## Example: Deployment YAML

Kubernetes is entirely declarative. You write YAML files describing the *desired state*, and the Kubernetes Control Plane constantly works to make the *actual state* match it.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
\`\`\`

## The Control Plane Architecture

<ArchitectureDiagram chart={\`
graph TD
  Dev[Developer (kubectl)]
  
  subgraph Master Node (Control Plane)
    API[kube-apiserver]
    Scheduler[kube-scheduler]
    Controller[kube-controller-manager]
    ETCD[(etcd Database)]
    
    API <--> ETCD
    API <--> Scheduler
    API <--> Controller
  end
  
  subgraph Worker Node 1
    Kubelet1[kubelet]
    Pod1[Pod A]
    Pod2[Pod B]
    Kubelet1 --> Pod1
    Kubelet1 --> Pod2
  end
  
  subgraph Worker Node 2
    Kubelet2[kubelet]
    Pod3[Pod C]
    Kubelet2 --> Pod3
  end
  
  Dev -- HTTP REST --> API
  API -. commands .-> Kubelet1
  API -. commands .-> Kubelet2
\`} />

</TechnologyTemplate>
`,
  '38. Infrastructure as Code/Terraform/index.mdx': `---
title: Terraform
description: An infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Terraform">

Terraform is an open-source infrastructure as code (IaC) software tool created by HashiCorp. Users define and provide data center infrastructure using a declarative configuration language known as HashiCorp Configuration Language (HCL).

<Callout icon="tip" title="Cloud Agnostic">
  Unlike AWS CloudFormation which only works on AWS, Terraform uses a "Provider" architecture, allowing you to manage AWS, Azure, Google Cloud, Cloudflare, and Kubernetes all from the exact same tool and workflow.
</Callout>

## The Terraform Workflow

Terraform relies on three core commands to safely manage infrastructure.

<ComparisonTable 
  headers={['Command', 'What it does']}
  rows={[
    ['terraform init', 'Initializes the working directory, downloads the required cloud Providers (e.g., AWS plugin).'],
    ['terraform plan', 'Creates an execution plan. It compares your code to the real world and shows you exactly what it *will* create, modify, or destroy.'],
    ['terraform apply', 'Executes the plan and actually provisions the infrastructure via cloud APIs.']
  ]}
/>

## Example: Provisioning an AWS Server

\`\`\`hcl
# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

# Define an EC2 Instance (Virtual Machine)
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" # Ubuntu Linux
  instance_type = "t2.micro"

  tags = {
    Name = "HelloWorldServer"
    Env  = "Production"
  }
}

# Output the public IP address after creation
output "server_public_ip" {
  value = aws_instance.web.public_ip
}
\`\`\`

## The State File

Terraform must keep track of what it has created so it can modify or destroy it later. It does this via a **State File** (\`terraform.tfstate\`).

<ArchitectureDiagram chart={\`
graph LR
  Code[Terraform Code\\n(.tf files)]
  TF{Terraform CLI}
  State[(Terraform State\\n.tfstate)]
  AWS[AWS Cloud API]
  
  Code --> TF
  TF <--> State
  TF -- API Calls --> AWS
\`} />

</TechnologyTemplate>
`,
  '36. DevOps, CI-CD & Version Control/36.2 CI-CD Concepts/CI-CD/index.mdx': `---
title: CI/CD (Continuous Integration & Continuous Deployment)
description: A method to frequently deliver apps to customers by introducing automation into the stages of app development.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="CI/CD">

CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment of applications. Modern CI/CD practices enable teams to deploy to production 50 times a day rather than once every 6 months.

<Callout icon="error" title="The Integration Hell">
  Before CI/CD, developers would work on isolated branches for months. When they finally tried to merge their code together ("Integration"), it resulted in massive, unresolvable merge conflicts and broken code. CI solves this by forcing developers to merge small changes multiple times a day.
</Callout>

## CI vs CD

<ComparisonTable 
  headers={['Phase', 'Definition', 'Core Activities']}
  rows={[
    ['Continuous Integration (CI)', 'Automating the merging and testing of code.', 'Linting, Compiling, Running Unit Tests, Building Docker Images.'],
    ['Continuous Delivery (CD)', 'Automating the release process up to staging.', 'Deploying to Staging/UAT. Requires human approval to push to Production.'],
    ['Continuous Deployment (CD)', 'Automating the entire pipeline through to production.', 'If tests pass, the code goes live to customers immediately with zero human intervention.']
  ]}
/>

## The Pipeline Lifecycle

A typical modern pipeline using GitHub Actions, GitLab CI, or Jenkins.

<ArchitectureDiagram chart={\`
graph LR
  Code[Developer Pushes Code]
  
  subgraph CI Pipeline
    Lint[Lint & Format]
    Test[Run Unit Tests]
    Build[Build Docker Image]
    Lint --> Test --> Build
  end
  
  subgraph CD Pipeline
    Push[(Push Image to Registry)]
    Deploy[Deploy to K8s/Server]
    Push --> Deploy
  end
  
  Code --> Lint
  Build --> Push
\`} />

</TechnologyTemplate>
`,
  '35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Amazon Web Services (AWS)/index.mdx': `---
title: Amazon Web Services (AWS)
description: The world's most comprehensive and broadly adopted cloud platform.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Amazon Web Services (AWS)">

AWS is Amazon's cloud computing platform, launched in 2006. It completely revolutionized the software industry by allowing developers to rent servers and databases by the second over the internet, rather than spending millions of dollars building physical data centers. AWS holds the largest market share in the cloud industry.

<Callout icon="tip" title="Regions and Availability Zones (AZs)">
  AWS is physically divided into **Regions** (e.g., us-east-1 in Virginia). Each Region consists of multiple isolated **Availability Zones** (AZs), which are separate physical data centers. To build highly available apps, you must deploy resources across multiple AZs.
</Callout>

## Core Services

AWS offers over 200 fully featured services, but 90% of applications rely on these core building blocks.

<ComparisonTable 
  headers={['Service Name', 'Category', 'Description']}
  rows={[
    ['EC2 (Elastic Compute Cloud)', 'Compute', 'Virtual Machines. You pick the OS, CPU, and RAM.'],
    ['S3 (Simple Storage Service)', 'Storage', 'Object storage. Used to store images, backups, and static websites. Infinite capacity.'],
    ['RDS (Relational Database Service)', 'Database', 'Managed PostgreSQL, MySQL, or SQL Server. Handles backups and patching for you.'],
    ['Lambda', 'Compute / Serverless', 'Run code without provisioning servers. You only pay for the milliseconds your code executes.'],
    ['VPC (Virtual Private Cloud)', 'Networking', 'Your own isolated private network inside AWS to secure your resources.']
  ]}
/>

## Architecture: A Standard Web App on AWS

<ArchitectureDiagram chart={\`
graph TD
  Internet((Internet))
  R53[Route 53\\n(DNS)]
  ALB[Application Load Balancer]
  
  subgraph AWS Cloud (VPC)
    subgraph Public Subnet
      NAT[NAT Gateway]
    end
    
    subgraph Private Subnet (Web Tier)
      EC2_1[EC2 Web Server 1]
      EC2_2[EC2 Web Server 2]
    end
    
    subgraph Private Subnet (DB Tier)
      RDS[(RDS PostgreSQL Primary)]
      RDS_Rep[(RDS Replica)]
    end
  end
  
  Internet --> R53
  R53 --> ALB
  ALB --> EC2_1
  ALB --> EC2_2
  
  EC2_1 --> RDS
  EC2_2 --> RDS
  RDS -. Replicates to .-> RDS_Rep
\`} />

</TechnologyTemplate>
`,
}

async function generateDevops() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateDevops().catch(console.error)
