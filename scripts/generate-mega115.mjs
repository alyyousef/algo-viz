import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/Volumes/index.mdx': `---
title: Volumes
description: The fundamental Kubernetes abstraction that allows a Pod's containers to mathematically mount directories from various storage backends, solving the ephemeral nature of the standard container filesystem.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Volumes"
  subtitle="Solving Ephemeral Storage"
  tags={['Kubernetes', 'Storage', 'Architecture', 'Infrastructure']}
>

By definition, Docker containers are ephemeral. When a container restarts, its root filesystem is mathematically wiped clean. A Kubernetes **Volume** provides a directory (possibly containing data) that is mathematically accessible to all containers running within a specific Pod.

## 1. Ephemeral vs. Persistent Volumes
Kubernetes mathematically distinguishes between two main categories of volumes:
- **Ephemeral Volumes (e.g., TICK1emptyDirTICK1)**: These share the exact mathematical lifecycle of the Pod. If the Pod crashes and restarts on the same Node, the TICK1emptyDirTICK1 data persists. But if the Pod is completely deleted and rescheduled to a different Node, the TICK1emptyDirTICK1 data is permanently destroyed. This is used for temporary cache or scratch space.
- **Persistent Volumes**: These have a lifecycle mathematically independent of the Pod (see PersistentVolumes). If the Pod is deleted, the data on the underlying AWS EBS or Google Persistent Disk remains perfectly intact.

## 2. Pod-Level Sharing
A crucial mathematical property of a Volume is that it is defined at the *Pod* level, not the *Container* level.
If you have a Pod with two containers (Container A and Container B), you can mathematically define a single TICK1emptyDirTICK1 Volume. Container A can mount that Volume at TICK1/var/log/appTICK1 (and write logs to it). Container B can mount that exact same Volume at TICK1/fluentd/logsTICK1 (and read those logs to send to a central server). The Volume mathematically bridges the filesystem gap between isolated containers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/37. Containers & Kubernetes/37.2 Kubernetes/VPA/index.mdx': `---
title: Vertical Pod Autoscaler (VPA)
description: A Kubernetes controller that mathematically analyzes the historical CPU and Memory utilization of Pods and automatically adjusts their resource requests and limits to optimize cluster efficiency.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Vertical Pod Autoscaler (VPA)"
  subtitle="Mathematical Right-Sizing"
  tags={['Kubernetes', 'Scaling', 'Optimization', 'Automation']}
>

While the Horizontal Pod Autoscaler (HPA) mathematically adds *more* Pods (scaling out), the **Vertical Pod Autoscaler (VPA)** mathematically makes existing Pods *bigger* or *smaller* (scaling up/down).

## 1. The Right-Sizing Problem
Developers are notoriously terrible at guessing resource requirements. A developer might request 4GB of RAM for a microservice that mathematically only ever uses 200MB. This results in massive cluster waste (paying AWS for unused RAM).
Conversely, if a developer requests 200MB and the app needs 500MB, the Linux OOM Killer will mathematically assassinate the Pod.
The VPA continuously analyzes Prometheus metrics. It mathematically calculates the true historical P90 utilization of the Pod.

## 2. Automatic Updates
If configured in "Auto" mode, the VPA mathematically enforces its recommendations.
If it determines a Pod requesting 4GB only needs 500MB, the VPA cannot mathematically shrink the running Pod (Linux kernel limitations). Instead, it gracefully evicts the Pod. When the ReplicaSet controller restarts the Pod, a VPA Admission Webhook mathematically intercepts the creation request and rewrites the YAML, injecting the optimized 500MB request before it saves to etcd.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Backends/index.mdx': `---
title: Backends
description: The mathematical configuration block in Terraform that defines exactly where and how the critical state file (terraform.tfstate) is stored, secured, and accessed by the execution engine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Backends"
  subtitle="The State Storage Engine"
  tags={['Terraform', 'State Management', 'Infrastructure', 'Configuration']}
>

By default, Terraform utilizes a "local" backend. It writes the mathematical state of your infrastructure to a local file called TICK1terraform.tfstateTICK1 on your laptop. If you are working on a team of 5 DevOps engineers, this is mathematically catastrophic.

## 1. The Remote Backend
To enable collaboration, you must configure a **Remote Backend**.
You mathematically define a block in your code instructing Terraform to store the state file in a centralized, highly-available location (like an AWS S3 Bucket, Google Cloud Storage, or HashiCorp Terraform Cloud). 
When Engineer A runs TICK1terraform planTICK1, their local Terraform executable mathematically reaches out to the S3 bucket to read the current state before calculating the diff.

## 2. State Locking
If Engineer A and Engineer B run TICK1terraform applyTICK1 at the exact same millisecond, the mathematical state of the cloud infrastructure could be irreparably corrupted.
Remote Backends solve this via **State Locking**. When using AWS S3 as a backend, you mathematically pair it with an Amazon DynamoDB table. When Engineer A starts an apply, Terraform writes a "Lock" token to the DynamoDB table. If Engineer B tries to run an apply, their Terraform client checks the table, sees the mathematical lock, and safely aborts the execution with an error, preventing race conditions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Data sources/index.mdx': `---
title: Data Sources
description: A Terraform mechanism that mathematically allows your configuration to fetch, query, and utilize read-only data defined outside of your immediate Terraform workspace, such as existing cloud infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Data Sources"
  subtitle="Mathematical Read-Only Queries"
  tags={['Terraform', 'Configuration', 'Infrastructure', 'Cloud']}
>

Terraform TICK1resourceTICK1 blocks are mathematically designed to *create, update, or destroy* infrastructure. Terraform TICK1dataTICK1 blocks are mathematically designed strictly to *read* information about infrastructure that already exists.

## 1. Querying the Cloud
Imagine your Security team manually created a specific AWS VPC (Virtual Private Cloud) a year ago. You need to deploy a new EC2 server into that exact VPC using Terraform.
You do not want to hardcode the VPC ID (e.g., TICK1vpc-01a2b3c4TICK1) into your code, because if the ID changes, your code mathematically breaks.
Instead, you write a Data Source:
TICK3hcl
data "aws_vpc" "security_vpc" {
  tags = {
    Environment = "Production-Security"
  }
}
TICK3
When Terraform runs, it makes a mathematical API call to AWS, finds the VPC matching that tag, and pulls its ID into memory.

## 2. Dynamic Interpolation
Once the Data Source fetches the information, you can mathematically interpolate it into your resources.
You create your server using TICK1vpc_id = data.aws_vpc.security_vpc.idTICK1. This mathematically decouples your code from static IDs, making your Terraform configuration highly dynamic, reusable, and robust across different environments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/lifecycle rules/index.mdx': `---
title: Lifecycle Rules
description: A specialized configuration block within Terraform resources that allows engineers to mathematically override the default creation, update, and destruction behaviors of the Terraform engine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Lifecycle Rules"
  subtitle="Overriding the Engine"
  tags={['Terraform', 'Configuration', 'State Management', 'Infrastructure']}
>

By default, Terraform's mathematical algorithm for updating infrastructure is: **Destroy First, Then Recreate**. If you change the operating system image of an EC2 server, Terraform will delete the live server, and then build the new one. In production, this causes mathematical downtime.

## 1. create_before_destroy
You can override this by injecting a TICK1lifecycleTICK1 block into the resource.
TICK3hcl
lifecycle {
  create_before_destroy = true
}
TICK3
When Terraform detects a destructive change, it mathematically reverses its algorithm. It provisions the brand new server *first*. Once the new server is confirmed healthy, it mathematically re-routes the load balancer, and *then* deletes the old server. This achieves mathematically zero-downtime infrastructure replacements.

## 2. prevent_destroy and ignore_changes
Two other critical mathematical overrides exist:
- TICK1prevent_destroy = trueTICK1: If a junior engineer accidentally removes the Production Database resource from the code, Terraform will attempt to delete it. This lifecycle rule mathematically causes the TICK1terraform planTICK1 command to throw a fatal error, physically preventing the deletion.
- TICK1ignore_changes = [tags]TICK1: If an external system (like a billing script) dynamically updates the tags on a resource, Terraform will detect a mathematical divergence and try to revert the tags. This rule tells Terraform to mathematically ignore specific fields during the diff calculation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Locals/index.mdx': `---
title: Locals
description: A Terraform mechanism for declaring mathematical constants and complex computed expressions within a module, preventing code repetition and ensuring the DRY (Don't Repeat Yourself) principle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Locals"
  subtitle="Mathematical Computed Constants"
  tags={['Terraform', 'Configuration', 'Variables', 'Code Quality']}
>

In Terraform, an input TICK1variableTICK1 is a value provided by the user at runtime. A TICK1localTICK1 is a value mathematically computed and strictly locked *inside* the module, inaccessible from the outside.

## 1. The DRY Principle
If your company standardizes that every single cloud resource must be tagged with a specific string (e.g., TICK1Company-Project-EnvironmentTICK1), you do not want to manually type TICK1AcmeCorp-Billing-ProdTICK1 fifty times across your codebase.
You define a Local block:
TICK3hcl
locals {
  common_tags = {
    Owner       = "AcmeCorp"
    Project     = var.project_name
    Environment = var.environment
  }
}
TICK3
You then apply TICK1tags = local.common_tagsTICK1 to every resource. If the company changes the tagging standard, you mathematically only have to update the code in one single location.

## 2. Complex Mathematical Transformations
Locals are not just static strings; they can execute complex mathematical and string manipulations.
You can use a local to read a list of 10 IP addresses from an input variable, use the TICK1cidrsubnet()TICK1 mathematical function to calculate new subnets, use TICK1merge()TICK1 to combine dictionaries, and output a clean, formatted list that the rest of the Terraform module consumes effortlessly.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Modules/index.mdx': `---
title: Modules
description: The fundamental mathematical unit of code organization in Terraform, allowing engineers to package, version, and reuse complex collections of infrastructure resources across multiple environments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Modules"
  subtitle="Reusable Infrastructure Packages"
  tags={['Terraform', 'Architecture', 'Code Quality', 'Infrastructure']}
>

If you copy and paste the same 500 lines of Terraform code to create the "Dev" environment and the "Prod" environment, you have mathematically failed at Infrastructure as Code. You must use Modules.

## 1. The Mathematical Encapsulation
A Module is simply a directory containing Terraform files. 
If creating a secure AWS VPC requires 12 different resources (Subnets, Route Tables, Internet Gateways), you place them all inside a TICK1/modules/vpcTICK1 folder.
In your main TICK1prodTICK1 directory, you mathematically "call" the module, passing in specific variables (like TICK1environment = "prod"TICK1 and TICK1cidr_block = "10.0.0.0/16"TICK1). The 12 resources are encapsulated. The developer using the module does not need to understand the complex routing mathematics; they just need to provide the inputs.

## 2. The Module Registry
Modules enable mathematical scale across massive corporations. 
A central Platform Team can mathematically engineer a highly secure, compliant "Corporate Kubernetes Cluster" module. They publish this to a private Terraform Registry (or a Git repository) and version it (e.g., TICK1v1.2.0TICK1). The 50 different product teams in the company simply import TICK1source = "git::https://.../k8s-cluster.git?ref=v1.2.0"TICK1. If a security patch is needed, the Platform Team releases TICK1v1.3.0TICK1, and the product teams update their version numbers, ensuring mathematical consistency across the entire company.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Outputs/index.mdx': `---
title: Outputs
description: The mechanism in Terraform used to mathematically extract, format, and return specific data values from a module or configuration to the user's terminal or to other downstream systems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Outputs"
  subtitle="Extracting Mathematical Results"
  tags={['Terraform', 'Configuration', 'Automation', 'Integration']}
>

When Terraform mathematically communicates with a cloud provider to create a database, the cloud provider generates dynamic data (like the final database connection URL or the autogenerated admin password). If you don't use Outputs, that data remains mathematically trapped inside the Terraform state file.

## 1. Module-to-Module Data Passing
If you have a strict architectural separation using Modules, Outputs are mathematically required for the modules to communicate.
If Module A creates a VPC, and Module B creates a server that needs to live in that VPC, Module B needs the VPC ID. Module A must define an TICK1output "vpc_id"TICK1. The root module mathematically captures that output and passes it as an input variable to Module B.

## 2. CI/CD Integration
Outputs are heavily utilized by downstream automation systems.
At the end of a CI/CD pipeline, the CI server can run TICK1terraform output -jsonTICK1. Terraform mathematically returns a pure JSON object containing the IP address of the newly created web server. The CI server can parse that JSON and mathematically inject the IP address into an Ansible playbook or a Slack notification, fully automating the deployment lifecycle.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Remote state/index.mdx': `---
title: Remote State Data Source
description: A specialized Terraform data source that mathematically allows one isolated Terraform configuration to read the outputs (state) of a completely different, separately managed Terraform configuration.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Remote State"
  subtitle="Cross-Workspace Mathematical Links"
  tags={['Terraform', 'Architecture', 'State Management', 'Integration']}
>

In a massive enterprise, it is mathematically dangerous to have one single Terraform state file for the entire company. It takes 45 minutes to run a TICK1terraform planTICK1, and a single syntax error breaks the whole company. State must be mathematically split into isolated workspaces.

## 1. The Dependency Problem
Assume the Platform Team manages the "Networking" workspace (VPCs, Firewalls), and the Product Team manages the "Application" workspace (EC2 servers).
The Application workspace mathematically needs the ID of the VPC created by the Networking workspace in order to launch its servers. But because the state files are physically isolated in different S3 buckets, they cannot directly communicate.

## 2. terraform_remote_state
The Product Team solves this by using the TICK1terraform_remote_stateTICK1 data source.
Their code mathematically reaches into the Platform Team's S3 bucket, decrypts the Networking state file, and reads its exported Outputs (in a strictly read-only manner). 
TICK3hcl
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "platform-team-state-bucket"
    key    = "networking/terraform.tfstate"
  }
}
TICK3
The Product Team can now launch their servers using TICK1vpc_id = data.terraform_remote_state.network.outputs.vpc_idTICK1. This provides extreme mathematical decoupling while maintaining necessary architectural links.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Sentinel policies/index.mdx': `---
title: Sentinel Policies
description: A proprietary Policy-as-Code framework by HashiCorp that mathematically evaluates Terraform plans against strict organizational rules before allowing the infrastructure to be physically provisioned.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Sentinel Policies"
  subtitle="Mathematical Infrastructure Governance"
  tags={['Terraform', 'Security', 'Compliance', 'Policy as Code']}
>

While Terraform mathematically guarantees that the infrastructure will look like your code, it does not guarantee that your code is actually legal, secure, or cheap. Sentinel (a feature of Terraform Cloud/Enterprise) enforces these mathematical rules.

## 1. The Pre-Apply Mathematical Gate
Sentinel operates strictly *between* the TICK1terraform planTICK1 and TICK1terraform applyTICK1 phases.
When a developer initiates a run, Terraform generates the mathematical plan (the diff). Sentinel intercepts this diff and runs it against a repository of policies.
For example, a company policy might state: *"No AWS EC2 instance can be mathematically larger than a TICK1t3.largeTICK1."* If the developer's plan attempts to provision an expensive TICK1p3.16xlargeTICK1 GPU instance, Sentinel mathematically evaluates the rule, fails, and physically aborts the pipeline, preventing the company from incurring a massive cloud bill.

## 2. Enforcement Levels
Sentinel policies are mathematically graded by severity:
- **Advisory**: The mathematical rule is broken, but Sentinel just prints a warning and allows the deployment to proceed.
- **Soft Mandatory**: The deployment is blocked, but a senior manager can click an "Override" button in the UI to allow it.
- **Hard Mandatory**: The deployment is mathematically terminated. Absolutely no one can override it without modifying the Sentinel code itself (used for strict legal compliance, like preventing S3 buckets from being public).

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
