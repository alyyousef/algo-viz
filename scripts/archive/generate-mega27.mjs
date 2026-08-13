import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/38. Infrastructure as Code/Terraform/index.mdx': `---
title: Terraform
description: "The industry standard, cloud-agnostic Infrastructure as Code tool developed by HashiCorp."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Terraform">

**Terraform** is an open-source Infrastructure as Code (IaC) tool created by HashiCorp. It allows you to define both cloud and on-premise resources (like VMs, load balancers, and databases) in human-readable configuration files that you can version, reuse, and share.

Terraform uses a declarative language called **HCL (HashiCorp Configuration Language)**. You simply state *what* you want the final architecture to look like, and Terraform figures out *how* to make the API calls to the cloud provider to achieve that state.

## 1. Cloud Agnostic (The Provider Model)
Unlike AWS CloudFormation or Azure ARM templates, which are strictly locked into their respective clouds, Terraform is **cloud-agnostic**.

It achieves this through a plugin ecosystem called **Providers**. There is an AWS provider, an Azure provider, a GitHub provider, and even a Spotify provider. You can manage multiple cloud resources simultaneously within the exact same configuration file.

## 2. Declarative vs Imperative
- **Imperative (e.g., Bash script with AWS CLI)**: "Create Server A. Then wait. Then attach Network B to Server A. If Server A exists, do nothing." (You must handle the logic and edge cases).
- **Declarative (Terraform)**: "I want Server A and Network B attached." (Terraform calculates the dependency graph, builds Network B first, creates Server A, and attaches them. If Server A already exists, it does nothing).

<Callout icon="info" title="OpenTofu">
In 2023, HashiCorp changed Terraform's open-source license (MPL) to a Business Source License (BSL). In response, the Linux Foundation forked the project to create **OpenTofu**, an open-source, drop-in replacement for Terraform.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/AWS CloudFormation/index.mdx': `---
title: AWS CloudFormation
description: "Amazon's native, proprietary Infrastructure as Code service for modeling and provisioning AWS resources."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="AWS CloudFormation">

**AWS CloudFormation** is Amazon's native Infrastructure as Code service. It allows you to model your entire AWS infrastructure in a single text file (formatted in JSON or YAML).

When you submit a CloudFormation template to AWS, it creates a **Stack**. A Stack is a logical grouping of all the resources defined in your template (e.g., 1 VPC, 2 EC2 instances, and 1 RDS database). If you delete the Stack, AWS automatically deletes all the resources within it.

## 1. CloudFormation vs Terraform

<ComparisonTable 
  headers={['Feature', 'AWS CloudFormation', 'Terraform']} 
  rows={[
    ['Scope', 'AWS only (mostly).', 'Cloud-agnostic (AWS, Azure, GCP, etc.).'],
    ['Language', 'YAML / JSON.', 'HCL (HashiCorp Configuration Language).'],
    ['State Management', 'AWS manages the state remotely and invisibly.', 'You must manage the TICK1terraform.tfstateTICK1 file yourself (or use an S3 backend).'],
    ['Execution Execution', 'Executed server-side by AWS.', 'Executed client-side from your laptop or CI/CD runner.']
  ]} 
/>

## 2. Drift Detection
A common issue in IaC is "Drift"—when a developer manually logs into the AWS console and changes a security group rule, bypassing the IaC pipeline. The code no longer matches reality.

CloudFormation has a native **Drift Detection** feature that compares the current stack template against the actual live AWS resources and highlights any manual changes that have occurred.

<Callout icon="tip" title="AWS CDK">
Because writing raw CloudFormation YAML can be incredibly tedious, Amazon released the **AWS CDK (Cloud Development Kit)**. CDK allows you to write infrastructure in TypeScript, Python, or Java, which then compiles down into standard CloudFormation YAML.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/Ansible/index.mdx': `---
title: Ansible
description: "An open-source automation tool primarily focused on configuration management and application deployment."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Ansible">

While Terraform is designed for **Infrastructure Provisioning** (creating the EC2 server), **Ansible** is designed for **Configuration Management** (installing Nginx and configuring the firewall on that newly created EC2 server). 

Developed by Red Hat, Ansible is renowned for its simplicity and its agentless architecture.

## 1. Agentless Architecture
Unlike older configuration management tools like Chef or Puppet, which required you to install a heavy "agent" daemon on every single target server, Ansible is **agentless**. 

It simply connects to the target servers over standard **SSH** (for Linux) or **WinRM** (for Windows) and executes Python scripts. This makes onboarding new servers into Ansible virtually instantaneous.

## 2. Playbooks and Inventories
- **Inventory**: A text file (usually INI or YAML) containing the IP addresses or hostnames of your servers, often grouped logically (e.g., TICK1[webservers]TICK1, TICK1[databases]TICK1).
- **Playbook**: A YAML file describing a series of "Tasks" (the desired state) to be executed against the hosts in the inventory.

## Provisioning vs Configuration Management

<ComparisonTable 
  headers={['Tool', 'Category', 'Primary Job', 'Metaphor']} 
  rows={[
    ['Terraform', 'Provisioning (Declarative)', 'Creating the hardware (VPCs, VMs, Load Balancers).', 'Building the house.'],
    ['Ansible', 'Configuration (Imperative/Declarative hybrid)', 'Configuring the OS (installing software, copying config files).', 'Painting the walls and buying furniture.']
  ]} 
/>

<Callout icon="tip" title="Better Together">
A standard industry pattern is to use Terraform to spin up 5 blank Ubuntu VMs on AWS, and then have Terraform automatically trigger an Ansible Playbook to SSH into those VMs and install the actual application stack.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/Pulumi/index.mdx': `---
title: Pulumi
description: "A modern IaC platform that allows you to define infrastructure using general-purpose programming languages."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Pulumi">

**Pulumi** is a modern Infrastructure as Code tool that challenges Terraform's dominance by changing *how* you write infrastructure.

Instead of forcing you to learn a domain-specific language (like Terraform's HCL) or write thousands of lines of static markup (like CloudFormation's YAML), Pulumi allows you to provision infrastructure using standard, general-purpose programming languages: **TypeScript, Python, Go, or C#**.

## 1. The Power of Real Code
Because you are using a real programming language, you gain massive advantages:
- **Native For-Loops**: Need 5 identical S3 buckets? Just write a standard JavaScript TICK1forTICK1 loop. (Terraform requires complex TICK1countTICK1 or TICK1for_eachTICK1 meta-arguments).
- **IDE Support**: You get native autocompletion, type-checking, and inline documentation in VS Code without needing specialized plugins.
- **Testing**: You can write standard unit tests (using Jest or PyTest) to validate your infrastructure logic before deploying it.
- **Package Managers**: You can publish reusable infrastructure components as standard NPM packages or Python wheels.

## 2. How it works
Under the hood, Pulumi is highly declarative. When you run a Pulumi program, it doesn't immediately create resources. 
1. It executes your TypeScript/Python code to dynamically build a target state graph.
2. The Pulumi Engine compares this graph to the current state.
3. It makes the necessary API calls to the cloud providers to reconcile the differences.

<Callout icon="info" title="Pulumi vs AWS CDK">
While both allow you to write infrastructure in real languages, **AWS CDK** only works for AWS (compiling down to CloudFormation). **Pulumi** is cloud-agnostic and interacts directly with the cloud provider's APIs, just like Terraform.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Providers/index.mdx': `---
title: Terraform Providers
description: "Plugins that Terraform uses to translate HCL code into API calls for specific cloud platforms or services."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Terraform Providers">

The core Terraform binary is actually quite dumb—it doesn't know how to talk to AWS, it doesn't know how to create an Azure VM, and it doesn't know what an S3 bucket is. 

All of that logic is outsourced to **Providers**.

## 1. What is a Provider?
A Provider is a plugin (a separate Go binary downloaded during TICK1terraform initTICK1) that understands the API interactions for a specific service.
- When you define an TICK1aws_s3_bucketTICK1, Terraform Core hands that request to the AWS Provider. 
- The AWS Provider knows how to authenticate via IAM, construct the correct JSON payload, and send the HTTP POST request to the AWS API.

## 2. Configuring Providers
You must declare which providers your code requires in a TICK1terraformTICK1 block, and then optionally configure them (e.g., passing in access keys or specifying regions).

${TICK3}hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
  # Authentication is usually picked up automatically from ENV vars
}
${TICK3}

## 3. Multiple Providers (Aliasing)
You can use multiple providers in the same project, or even multiple instances of the *same* provider. For example, if you need to deploy an S3 bucket in TICK1us-east-1TICK1 and a backup bucket in TICK1eu-west-1TICK1, you use Provider Aliases.

<Callout icon="tip" title="The Provider Registry">
HashiCorp maintains a public registry (registry.terraform.io) hosting thousands of providers. There are providers for major clouds (AWS, GCP, Azure), SaaS platforms (GitHub, Datadog, Stripe), and even localized services (Active Directory, PostgreSQL).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Resources/index.mdx': `---
title: Terraform Resources & Data Sources
description: "The fundamental building blocks of Terraform used to create infrastructure and query external information."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Resources & Data Sources">

Every object in Terraform is defined using blocks. The two most important block types are **Resources** (things you create) and **Data Sources** (things you query).

## 1. Resources
A TICK1resourceTICK1 block instructs Terraform to create, update, or destroy a physical piece of infrastructure. 

${TICK3}hcl
resource "aws_instance" "web_server" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"

  tags = {
    Name = "My Production Web Server"
  }
}
${TICK3}

- **Provider Type**: TICK1"aws_instance"TICK1 (Defined by the AWS provider).
- **Local Name**: TICK1"web_server"TICK1 (An arbitrary name used to reference this block elsewhere in your code).
- **Arguments**: Inside the block, you specify the configuration parameters.

## 2. Data Sources
A TICK1dataTICK1 block allows Terraform to read information defined *outside* of Terraform, or computed by another separate Terraform configuration. It is read-only.

For example, instead of hardcoding an AMI ID (which changes frequently), you can use a data source to query AWS for the most recent Ubuntu AMI.

${TICK3}hcl
data "aws_ami" "latest_ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical's AWS Account ID
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# Later in your code...
resource "aws_instance" "web_server" {
  ami           = data.aws_ami.latest_ubuntu.id
  instance_type = "t2.micro"
}
${TICK3}

<ComparisonTable 
  headers={['Block Type', 'Action', 'Lifecycle Management']} 
  rows={[
    ['TICK1resourceTICK1', 'Write / Create', 'Terraform completely manages the lifecycle (Create, Update, Delete).'],
    ['TICK1dataTICK1', 'Read / Query', 'Terraform only fetches the data; it cannot modify or delete the target.']
  ]} 
/>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/State/index.mdx': `---
title: Terraform State
description: "The mapping mechanism Terraform uses to keep track of the real-world infrastructure it manages."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Terraform State">

Terraform needs a way to map the resources defined in your HCL code to the actual, physical resources deployed in the cloud. It accomplishes this using the **State File** (TICK1terraform.tfstateTICK1).

## 1. Why State is Necessary
If you write TICK1resource "aws_instance" "web"TICK1 and run Terraform, it creates an EC2 instance with ID TICK1i-0abcd1234TICK1. 

If you run Terraform again, how does it know whether to create a *second* EC2 instance, or update the *first* one?
It looks at the state file. The state file contains a JSON mapping indicating that the local HCL identifier TICK1aws_instance.webTICK1 corresponds specifically to AWS ID TICK1i-0abcd1234TICK1.

## 2. Remote State
By default, Terraform stores state locally in a file named TICK1terraform.tfstateTICK1 on your laptop. 
**This is incredibly dangerous for teams.**
- **Concurrency**: If Alice and Bob run Terraform at the same time, they will overwrite each other's changes and corrupt the infrastructure.
- **Secrets**: The state file stores all resource properties in *plaintext*, including database passwords and API keys.

In production, you must use a **Remote Backend** (like an AWS S3 Bucket combined with a DynamoDB table).
- The S3 bucket securely stores the state file centrally.
- The DynamoDB table acts as a **State Lock**. When Alice runs Terraform, it locks the table. If Bob tries to run Terraform, it fails and tells him to wait, preventing corruption.

## 3. State Drift
If someone manually logs into the AWS console and deletes an EC2 instance, the Terraform state file doesn't instantly know. 

During the next TICK1terraform planTICK1, Terraform performs a **Refresh**. It reads the state file, queries the AWS APIs to check the real-world status of those resources, notices the instance is missing, and updates the state in memory before calculating the plan (which will propose re-creating the instance).

<Callout icon="warning" title="Never edit state manually">
The TICK1terraform.tfstateTICK1 file is a massive JSON document. You should never edit it by hand using a text editor. If you need to manipulate state (e.g., removing a resource without destroying it), use CLI commands like TICK1terraform state rmTICK1.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/plan-apply-destroy-import/index.mdx': `---
title: Core Terraform Workflow
description: "The primary commands used to initialize, plan, execute, and destroy infrastructure using Terraform."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Init, Plan, Apply, Destroy">

The standard Terraform workflow consists of a rigid sequence of CLI commands designed to ensure safety and predictability.

## 1. terraform init
Before you can do anything in a new Terraform project, you must initialize the working directory.
TICK1terraform initTICK1 looks at your HCL code, identifies which Providers and Modules are required, and downloads the necessary binaries into a hidden TICK1.terraform/TICK1 folder. It also configures your backend for state storage.

## 2. terraform plan
This is a dry run. TICK1terraform planTICK1 evaluates your code, compares it to the current state, and generates an execution plan outlining exactly what actions it *intends* to take.

It uses a Git-diff style output:
- **TICK1+TICK1 (Green)**: Resource will be created.
- **TICK1-TICK1 (Red)**: Resource will be destroyed.
- **TICK1~TICK1 (Yellow)**: Resource will be updated in-place.
- **TICK1-/+TICK1 (Red/Green)**: Resource must be destroyed and entirely recreated (usually because you changed an immutable property).

## 3. terraform apply
TICK1terraform applyTICK1 actually executes the proposed changes against the cloud provider's APIs. By default, it will run a TICK1planTICK1 and pause, prompting you to type TICK1yesTICK1 to confirm before proceeding.
In CI/CD pipelines, this is often run as TICK1terraform apply -auto-approveTICK1.

## 4. terraform destroy
When you are done with a project (e.g., tearing down a temporary staging environment), TICK1terraform destroyTICK1 deletes every single resource currently tracked in the state file. It calculates the dependency graph in reverse, ensuring that the EC2 instance is deleted *before* the VPC it resides in.

## 5. terraform import (Advanced)
What if an AWS S3 bucket already exists (created manually via the console), and you want Terraform to start managing it?
You cannot just write the HCL code and run TICK1applyTICK1—Terraform will try to create a new bucket and fail because the name is taken.

You use TICK1terraform import aws_s3_bucket.my_bucket my-real-bucket-nameTICK1. This command maps the real-world AWS resource into your state file, linking it to your local HCL identifier.

<Callout icon="tip" title="Saving the Plan">
In automated CI/CD pipelines, you should always run TICK1terraform plan -out=tfplanTICK1, and then pass that exact file to TICK1terraform apply tfplanTICK1. This guarantees that the apply phase executes *exactly* what was reviewed in the plan phase, eliminating race conditions.
</Callout>

</ConceptTemplate>
`,
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
