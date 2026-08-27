import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Terraform Cloud/index.mdx': `---
title: Terraform Cloud
description: A managed, cloud-hosted service provided by HashiCorp designed to mathematically orchestrate Terraform runs, securely manage state files, and enforce Policy-as-Code across large enterprise teams.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Terraform Cloud"
  subtitle="Enterprise Terraform Orchestration"
  tags={['Terraform', 'Cloud', 'DevOps', 'HashiCorp']}
>

Running TICK1terraform applyTICK1 from a developer's laptop is mathematically dangerous. The developer's laptop must contain the highly sensitive AWS Root Credentials, and if their Wi-Fi drops halfway through the execution, the state file can corrupt.

## 1. Remote Execution Engine
Terraform Cloud shifts the execution context from the laptop to the cloud.
When a developer runs TICK1terraform applyTICK1, their local CLI mathematically calculates nothing. It simply zips up their HCL code and transmits it to Terraform Cloud. HashiCorp's secure, ephemeral Linux containers actually execute the API calls against AWS. The AWS credentials mathematically never leave Terraform Cloud, and the developer's laptop never sees them.

## 2. The Private Module Registry
Large organizations require standardized infrastructure.
Terraform Cloud hosts a Private Module Registry. The Security team can write a module for a highly secure AWS S3 bucket, mathematically guaranteeing it blocks public access and encrypts data at rest. They publish this to the internal Registry. When developers write their own code, they mathematically import the module from the Registry, ensuring the entire corporation adheres to the Security team's baseline architecture.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Variables/index.mdx': `---
title: Variables
description: The mathematical input parameters in Terraform that allow infrastructure modules to be dynamic and reusable across completely different cloud environments without altering the core HCL source code.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Variables"
  subtitle="Dynamic Infrastructure Inputs"
  tags={['Terraform', 'Configuration', 'Architecture', 'Code Quality']}
>

If you hardcode TICK1instance_type = "t3.micro"TICK1 into your main Terraform code, your code is mathematically rigid. You can never use that code to deploy a massive TICK1p3.16xlargeTICK1 server in production.

## 1. Type Constraints and Validation
Terraform variables are strictly typed. 
You can mathematically enforce that a variable is a TICK1stringTICK1, a TICK1numberTICK1, a TICK1list(string)TICK1, or a complex TICK1objectTICK1.
Furthermore, you can define **Custom Validation Rules**. 
TICK3hcl
variable "instance_type" {
  type = string
  validation {
    condition     = can(regex("^t3\\.", var.instance_type))
    error_message = "The instance type must be a t3 family instance."
  }
}
TICK3
If a user attempts to pass TICK1m5.largeTICK1, Terraform mathematically evaluates the regex before touching the cloud, and throws a fatal error, preventing non-compliant infrastructure from ever being planned.

## 2. Variable Precedence
Terraform uses a strict mathematical hierarchy to determine variable values.
If the same variable is defined in multiple places, Terraform resolves it in this order (from lowest to highest precedence):
1. Environment variables (e.g., TICK1TF_VAR_instance_typeTICK1)
2. The TICK1terraform.tfvarsTICK1 file
3. TICK1.auto.tfvarsTICK1 files
4. Command-line flags (e.g., TICK1-var="instance_type=t3.micro"TICK1)

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/38.1 Terraform Specifics/Workspaces/index.mdx': `---
title: Workspaces
description: A feature in Terraform that allows a single directory of HCL configuration files to mathematically map to multiple, distinctly separate state files, facilitating multi-environment deployments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Workspaces"
  subtitle="Parallel State Management"
  tags={['Terraform', 'State Management', 'Architecture', 'Environments']}
>

Imagine you have a single TICK1main.tfTICK1 file that defines a web server. You want to deploy this exact server to both a "Development" AWS account and a "Production" AWS account. If you just run TICK1terraform applyTICK1 twice, the second run will mathematically overwrite the state of the first run.

## 1. Mathematical State Isolation
Workspaces solve this by isolating the state file.
When you type TICK1terraform workspace new prodTICK1, Terraform creates a completely separate, mathematically isolated state file bucket (e.g., TICK1terraform.tfstate.d/prodTICK1). 
When you are in the TICK1prodTICK1 workspace, any changes you make mathematically only apply to the TICK1prodTICK1 state file. You can switch to the TICK1devTICK1 workspace, and Terraform physically ignores the TICK1prodTICK1 infrastructure, allowing you to use the exact same HCL code to manage parallel universes.

## 2. Dynamic Code Execution
Terraform exposes the current workspace name via a mathematical variable: TICK1terraform.workspaceTICK1.
You can use this to mathematically alter the deployment based on the environment:
TICK3hcl
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "prod" ? "m5.large" : "t3.micro"
}
TICK3
If you are in the TICK1prodTICK1 workspace, it provisions a massive server. If you switch to the TICK1devTICK1 workspace, it automatically provisions a tiny server to save money, all from the same codebase.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/ARM templates/index.mdx': `---
title: ARM Templates
description: Azure Resource Manager (ARM) Templates are the native Infrastructure as Code mechanism for Microsoft Azure, utilizing mathematically precise JSON to declaratively define cloud infrastructure deployments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="ARM Templates"
  subtitle="Native Azure Infrastructure as Code"
  tags={['Azure', 'Infrastructure as Code', 'JSON', 'Cloud']}
>

While Terraform is cloud-agnostic, ARM Templates are the absolute, mathematical bedrock of Microsoft Azure. Every single action taken in the Azure Portal GUI is mathematically translated into ARM JSON behind the scenes before it hits the Azure API.

## 1. Pure Declarative JSON
An ARM Template is a massive JSON file. It is not a script; it is a mathematical declaration.
You declare: *"I require a Virtual Network with this specific CIDR block, and a Storage Account."* You submit this JSON to the Azure Resource Manager. The Manager acts as the mathematical engine; it determines the current state, calculates the required API calls, handles the dependency graph (ensuring the VNet is created before the VM that relies on it), and provisions the resources.

## 2. The JSON Complexity Problem
Because JSON is a data-interchange format and not a programming language, writing complex ARM templates is mathematically brutal for humans.
To implement a simple TICK1forTICK1 loop to create 3 servers, a developer must write complex, heavily nested JSON arrays and utilize clumsy built-in mathematical functions like TICK1"[concat('server-', copyIndex())]"TICK1. This extreme verbosity and lack of readability drove Microsoft to eventually invent **Bicep** as a human-friendly abstraction layer over raw ARM JSON.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/AWS CDK/index.mdx': `---
title: AWS CDK
description: The AWS Cloud Development Kit (CDK) is an advanced framework that mathematically synthesizes imperative, general-purpose programming languages (like TypeScript or Python) into declarative AWS CloudFormation templates.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Cloud Development Kit (CDK)"
  subtitle="Infrastructure as Real Code"
  tags={['AWS', 'Infrastructure as Code', 'TypeScript', 'Cloud']}
>

Terraform and CloudFormation use declarative configuration languages (HCL and YAML). You declare what you want. But software engineers mathematically prefer imperative languages (like TypeScript) where they can use standard TICK1forTICK1 loops, TICK1if/elseTICK1 statements, and object-oriented classes.

## 1. The Mathematical Synthesis
The AWS CDK bridges this gap.
A developer writes standard TypeScript code, defining AWS resources as Object-Oriented classes. 
When the developer runs TICK1cdk synthTICK1, the CDK engine executes the TypeScript code. As the code runs, the CDK mathematically translates those object instantiations into a massive, thousands-of-lines-long declarative CloudFormation YAML file. That YAML is then deployed to AWS. The developer gets the power of a real programming language, while AWS gets the safe, declarative state engine of CloudFormation.

## 2. Level 2 and Level 3 Constructs
The greatest mathematical power of the CDK is **Constructs**.
If you write raw CloudFormation to create a secure VPC, it requires 300 lines of complex YAML. 
In the CDK, AWS provides "L2 Constructs"—pre-built mathematical classes endowed with best practices. A developer simply writes TICK1new ec2.Vpc(this, 'MyVpc', { maxAzs: 3 });TICK1. The CDK mathematically expands that single line of TypeScript into the 300 lines of perfect, highly-secure CloudFormation YAML, saving massive amounts of engineering time.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/Bicep/index.mdx': `---
title: Bicep
description: A domain-specific language (DSL) developed by Microsoft to serve as a mathematically elegant, human-readable abstraction layer directly over the complex JSON of Azure ARM Templates.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Bicep"
  subtitle="The Elegant Azure DSL"
  tags={['Azure', 'Infrastructure as Code', 'Cloud', 'DSL']}
>

Writing raw JSON ARM Templates is an exercise in mathematical frustration due to excessive brackets, quotes, and complex function syntax. Microsoft created Bicep as the direct, native solution to this developer experience nightmare.

## 1. Transparent Transpilation
Bicep is mathematically similar to Terraform's HCL (HashiCorp Configuration Language). It is clean, declarative, and drops the requirement for JSON syntax.
However, the Azure API does not mathematically understand Bicep. When you deploy a Bicep file, the Bicep CLI acts as a transpiler (similar to how TypeScript transpiles to JavaScript). It mathematically compiles the clean Bicep code down into the verbose, raw JSON ARM Template, and submits that JSON to Azure. 

## 2. Day Zero Support
Because Bicep transpiles directly to ARM, it has a massive mathematical advantage over Terraform on Azure: **Day Zero Support**.
When Microsoft releases a brand new cloud service (e.g., Azure Quantum), the Terraform team must manually write Go code to update the Terraform Azure Provider to support the new API, which can take months. Because Bicep is natively tied to the Azure API specifications, it mathematically supports the new service on the exact day it is released, requiring zero provider updates.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/Chef/index.mdx': `---
title: Chef
description: A legacy, Ruby-based configuration management tool designed to mathematically automate the provisioning and configuration of operating systems across massive fleets of physical and virtual servers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Chef"
  subtitle="Imperative Configuration Management"
  tags={['Configuration Management', 'Ruby', 'Legacy', 'Infrastructure']}
>

Before Docker containers existed, companies maintained fleets of 10,000 Linux servers. Ensuring every server mathematically possessed the exact same version of Nginx and the exact same SSH configuration was impossible to do manually. Chef was built to automate this.

## 1. The Pull Architecture
Chef operates on a mathematical **Pull Architecture**.
You maintain a central "Chef Server." You write configuration scripts (called **Recipes** and **Cookbooks**) in the Ruby programming language. 
You install a "Chef Client" agent on all 10,000 servers. Every 30 minutes, the agent mathematically pulls the latest Recipe from the central server. The agent executes the Ruby code locally, checking if Nginx is installed. If it isn't, the agent installs it. If a human manually uninstalls Nginx, the agent will mathematically reinstall it on the next 30-minute loop, ensuring absolute configuration drift prevention.

## 2. Imperative Complexity
Chef's mathematical downfall in the modern era is its reliance on **Imperative Ruby code**.
Instead of mathematically declaring *"I want a file to exist"* (like Terraform or Ansible), Chef requires developers to write complex Ruby logic detailing *how* to create the file. As infrastructure shifted toward immutable Docker containers (where you simply rebuild the image rather than maintaining long-lived servers), the heavy mathematical complexity of Chef Cookbooks became an anti-pattern for modern cloud-native teams.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/Google Deployment Manager/index.mdx': `---
title: Google Deployment Manager
description: The native infrastructure deployment service for Google Cloud Platform (GCP), mathematically orchestrating the creation and management of Google Cloud resources using declarative YAML or Python/Jinja2 templates.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Google Deployment Manager"
  subtitle="Native GCP Orchestration"
  tags={['GCP', 'Infrastructure as Code', 'Cloud', 'Declarative']}
>

Just as AWS has CloudFormation and Azure has ARM, Google Cloud Platform (GCP) provides **Google Deployment Manager** as its native mathematical engine for declarative infrastructure provisioning.

## 1. YAML and Python/Jinja2
At its core, a deployment is defined using a declarative YAML configuration file. 
However, raw YAML lacks mathematical logic (like TICK1forTICK1 loops). To solve this, Deployment Manager natively supports **Python** and **Jinja2** templates. A developer can write a Python script that mathematically loops 10 times to generate 10 unique GCP Compute Engine configurations. Deployment Manager executes the Python, renders the final static YAML, and provisions the infrastructure.

## 2. The Terraform Shift
While mathematically robust, Deployment Manager suffers from a lack of multi-cloud capability. It only speaks GCP.
Because the industry overwhelmingly standardized on HashiCorp Terraform for its cloud-agnostic mathematical model, Google themselves have heavily shifted their engineering resources. Rather than aggressively updating Deployment Manager, Google now writes massive amounts of code directly for the open-source **Terraform GCP Provider**, effectively acknowledging Terraform as the defacto standard for managing Google Cloud infrastructure.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/OpenTofu/index.mdx': `---
title: OpenTofu
description: A direct, open-source fork of HashiCorp Terraform, mathematically created and maintained by the Linux Foundation in response to HashiCorp's transition from an open-source to a restrictive Business Source License.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OpenTofu"
  subtitle="The Open-Source Fork of Terraform"
  tags={['Infrastructure as Code', 'Open Source', 'Terraform', 'Linux Foundation']}
>

For nearly a decade, Terraform was the open-source darling of the DevOps world. In 2023, HashiCorp mathematically altered the software license of Terraform from the open-source Mozilla Public License (MPL) to the restrictive Business Source License (BSL), legally preventing competitors from offering Terraform as a hosted service.

## 1. The Linux Foundation Fork
In response to this mathematical shift in licensing, a massive coalition of DevOps companies (including Gruntwork, Spacelift, and env0) immediately forked the last open-source version of the Terraform codebase (v1.5.5).
They donated the codebase to the Linux Foundation, officially naming it **OpenTofu**. OpenTofu is mathematically guaranteed to remain truly open-source forever.

## 2. Drop-in Replacement
The primary mathematical directive of the OpenTofu engineering team is absolute backwards compatibility.
For a DevOps engineer, migrating from Terraform to OpenTofu is a mathematically trivial operation. OpenTofu uses the exact same HCL syntax, reads the exact same TICK1terraform.tfstateTICK1 files, and utilizes the exact same provider plugins (like the AWS and Azure providers). A developer simply uninstalls the TICK1terraformTICK1 CLI binary, installs the TICK1tofuTICK1 CLI binary, and continues deploying infrastructure with zero code modifications.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/38. Infrastructure as Code/Puppet/index.mdx': `---
title: Puppet
description: A pioneering configuration management tool that mathematically enforces the declarative state of massive server fleets using its own specialized Domain-Specific Language (DSL) and a master-agent architecture.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Puppet"
  subtitle="Declarative Fleet Management"
  tags={['Configuration Management', 'Infrastructure', 'Legacy', 'DevOps']}
>

Alongside Chef, Puppet defined the mathematical discipline of Configuration Management in the 2010s. While Chef leaned heavily into imperative Ruby coding, Puppet took a strict, mathematically declarative approach.

## 1. The Declarative DSL
Puppet uses its own proprietary Domain-Specific Language (DSL).
Instead of writing a script that says *"Execute apt-get install nginx"*, a Puppet developer writes mathematical declarations: *"Ensure that the Package 'nginx' is in the state 'installed'."* 
The Puppet Agent on the server reads this declaration. It mathematically queries the local operating system to see if Nginx exists. If it does, Puppet does absolutely nothing. If it does not, Puppet determines the exact shell commands required (abstracting away whether the server is Ubuntu or CentOS) and installs it. This mathematical idempotency was revolutionary.

## 2. The Master-Agent Architecture
Like Chef, Puppet utilizes a Pull architecture.
A central **Puppet Master** server mathematically compiles the "Catalogs" (the final JSON representation of exactly what a specific server should look like). The **Puppet Agents** run as background daemons on thousands of Linux/Windows servers, polling the Master every 30 minutes. If a server's mathematical state drifts (e.g., someone deletes a required user account), the Agent automatically reconstructs the user, providing relentless, mathematical configuration enforcement.

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
