import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type Section = { id: string; title: string; paragraphs: string[]; bullets?: string[] }
type Example = { id: string; title: string; description: string[]; code: string; notes: string[] }
type GlossarySection = {
  id: string
  title: string
  terms: Array<{ term: string; definition: string }>
}

const PAGE_TITLE = 'Terraform'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Terraform is an infrastructure as code tool for defining and operating infrastructure through declarative configuration. It is used for cloud resources, networking, DNS, Kubernetes-adjacent objects, SaaS integrations, platform foundations, and other systems that expose stable APIs through Terraform providers.',
  'The key mental model is desired state plus provider plugins plus state. You describe what the world should look like in HCL, Terraform compares that configuration with recorded state and remote objects, and then it produces a plan showing what must be created, updated, replaced, imported, or destroyed to converge reality toward the declared design.',
  'This page keeps all of the core Terraform ideas in one place: HCL, providers, resources, data sources, variables, locals, outputs, modules, plan and apply, state, drift, backends, workspaces, import, tradeoffs, examples, and glossary terms.',
] as const

const bigPictureSections: Section[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Terraform is one of the most widely used infrastructure as code tools because it gives teams a consistent workflow for declaring infrastructure rather than scripting every provisioning step manually. Instead of saying how to click or call APIs in order, you say what the infrastructure should be and Terraform computes an execution graph from that configuration.',
      'It matters because reproducibility, reviewability, and environment consistency are hard to get from manual console work. Terraform turns infrastructure changes into versioned code plus a plan step, which makes operations easier to audit and safer to review before anything changes.',
    ],
    bullets: [
      'Declarative infrastructure management rather than imperative provisioning scripts.',
      'Plan-before-apply workflow for safer operational changes.',
      'Cross-platform provider model instead of a single-cloud-only approach.',
      'Strong fit for reusable platform modules and reviewed infrastructure changes.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The useful mental model is not "a tool that creates resources once." Terraform is a stateful system that keeps track of infrastructure it manages. Each run compares desired configuration, current state, and provider-read remote data to decide what actions are necessary.',
      'That stateful model is why Terraform is stronger than ad hoc API scripts for lifecycle management, but it is also why state design, imports, locking, and ownership boundaries matter so much in real teams.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Terraform Fits Best',
    paragraphs: [
      'Terraform is strongest when infrastructure should be repeatable, reviewed, and shared across teams. It is commonly used for VPC or VNet setup, subnets, load balancers, clusters, managed databases, storage, DNS, IAM-adjacent resources, monitoring integrations, and reusable platform foundations.',
      'It is especially useful when a team needs one workflow across several systems. Providers let the same repository manage AWS, Azure, GCP, Kubernetes, Cloudflare, GitHub, Datadog, and many other APIs with the same plan and apply lifecycle.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where Terraform Is Not the Best Default',
    paragraphs: [
      'Terraform is not ideal for high-frequency runtime changes, event-driven operational workflows, or logic-heavy programs that really want a general-purpose language. It also becomes awkward when teams try to force application behavior or day-to-day runtime orchestration into HCL.',
      'Another common misuse is putting too much unrelated infrastructure into one state. Terraform can technically manage a lot, but large shared states create more blast radius, more review noise, and more coordination cost than many teams expect.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A normal workflow is init, validate, plan, review, and apply. Configuration declares providers, variables, resources, and modules. Terraform initializes plugins, evaluates expressions, builds a dependency graph, compares state and remote values, and then proposes a plan before any write occurs.',
      'As teams mature, they usually add remote state, locking, CI-based plan review, module versioning, import workflows for pre-existing infrastructure, and environment separation strategies built around risk and ownership rather than convenience alone.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Terraform is desired-state infrastructure management, not shell scripting with nicer syntax. HCL is only the front end. The real system includes providers, graph planning, state, refresh behavior, module interfaces, and operational workflow discipline.',
      'Teams get the most value when they keep state small, review plans carefully, version providers deliberately, and treat module boundaries and imports as engineering design decisions rather than one-off mechanics.',
    ],
  },
]

const coreConceptSections: Section[] = [
  {
    id: 'core-hcl',
    title: 'HCL and Declarative Configuration',
    paragraphs: [
      'Terraform configurations are written in HCL, a declarative language built around blocks, arguments, expressions, and references. The language is designed to stay readable as infrastructure grows, which is why it emphasizes structure over arbitrary programming constructs.',
      'The file order is usually not what controls execution. References and graph relationships do. That is a major shift for people coming from imperative scripts or CI jobs.',
    ],
  },
  {
    id: 'core-providers-resources',
    title: 'Providers, Resources, and Data Sources',
    paragraphs: [
      'Providers connect Terraform to real APIs. They define resource types for managed objects and data sources for read-only lookups. Resource blocks are persistent managed objects tracked over time in state, while data sources read external information without claiming ownership of lifecycle.',
      'Provider quality matters. Import support, replacement behavior, drift visibility, timeouts, and update semantics all depend heavily on provider implementation rather than Terraform core alone.',
    ],
    bullets: [
      'Resources are managed objects with lifecycle ownership.',
      'Data sources are read-only lookups for external facts.',
      'Provider version constraints improve reproducibility.',
      'References between resources create implicit dependency edges.',
    ],
  },
  {
    id: 'core-values',
    title: 'Variables, Locals, and Outputs',
    paragraphs: [
      'Variables define inputs into a root module or child module. Locals define named derived expressions inside a module. Outputs publish selected values back to operators, parent modules, or automation that depends on Terraform results.',
      'These are the pieces that make modules reusable rather than copy-pasted. Good Terraform code has stable interfaces, typed variables, and outputs that expose what consumers actually need instead of leaking every internal detail.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Modules and Reuse Boundaries',
    paragraphs: [
      'A module is a package of Terraform files treated as one reusable unit. The working directory is the root module, and anything it calls is a child module. Modules are how teams standardize networking, clusters, data platforms, and application foundations across environments.',
      'Good modules hide unnecessary internal complexity but keep their interface understandable. Over-abstracted modules often become less reusable because nobody can predict the lifecycle behavior they hide.',
    ],
  },
  {
    id: 'core-expressions',
    title: 'Expressions and Meta-Arguments',
    paragraphs: [
      'Terraform expressions let you compose values with references, conditionals, collection transforms, and built-in functions. Meta-arguments such as for_each, count, depends_on, lifecycle, and provider influence how blocks behave rather than what the managed remote object is.',
      'These features are powerful, but they are also where many maintainability problems begin. Clever HCL can become opaque very quickly if it tries to imitate a general-purpose programming language.',
    ],
    bullets: [
      'Use for_each when instance identity should be keyed and stable.',
      'Use count when simple indexing is sufficient.',
      'Use depends_on only when references cannot represent the dependency naturally.',
      'Use lifecycle rules carefully because they change replacement and drift behavior.',
    ],
  },
  {
    id: 'core-plan-apply',
    title: 'Plan, Apply, Destroy, and Import',
    paragraphs: [
      'Terraform usually moves through init, validate, plan, and apply. Plan previews the intended changes, apply executes them, and destroy removes managed objects. Modern Terraform also supports import blocks so existing infrastructure can be brought under management more explicitly in source control.',
      'Import is never just a command. The difficult part is making configuration match the real remote object closely enough that the next plan is safe and unsurprising.',
    ],
  },
  {
    id: 'core-state',
    title: 'State, Backends, and Locking',
    paragraphs: [
      'State is the mapping between Terraform objects and real infrastructure. It records what Terraform believes it manages and stores values needed for future planning. Because of that, state is operationally critical, not just implementation detail.',
      'Remote backends and locking exist because concurrent writes or lost state can make infrastructure changes unsafe very quickly. Teams should design state boundaries around ownership and blast radius rather than around convenience alone.',
    ],
  },
  {
    id: 'core-drift-workspaces',
    title: 'Drift, Refresh, and Workspaces',
    paragraphs: [
      'Drift happens when infrastructure changes outside the Terraform workflow or when provider reads reveal differences from recorded state. Terraform can detect much of that during planning, but what it can see depends on provider schema coverage and read behavior.',
      'Workspaces provide separate state instances for one configuration, but they are not a universal environment strategy. Many teams are better served by separate root modules or stronger isolation when production risk is real.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation, Testing, and Delivery Discipline',
    paragraphs: [
      'Good Terraform workflows include formatting, validation, plan review, controlled applies, and often static analysis or policy checks. Syntax correctness is useful, but it does not protect against bad module boundaries, accidental replacement, or unclear state ownership.',
      'The biggest Terraform failures are usually operational rather than syntactic: unreviewed changes, console drift, oversized states, weak provider versioning, and poor import discipline.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Comparisons',
    paragraphs: [
      'Compared with CloudFormation, Terraform usually offers broader provider reach and a more portable workflow. Compared with Pulumi, Terraform offers a dedicated declarative language and a very mature provider and module ecosystem, while Pulumi offers general-purpose language ergonomics and different abstraction tradeoffs.',
      'Compared with raw scripts, Terraform is stronger at lifecycle tracking, reviewability, and repeatability, but weaker for arbitrary logic. Use it where desired state and stateful lifecycle are advantages, not where unrestricted programming is the real need.',
    ],
  },
]

const exampleSections: Example[] = [
  {
    id: 'ex-basic',
    title: 'Basic Provider, Variable, Resource, and Output',
    description: [
      'This is the standard Terraform shape: provider setup, typed input, a managed resource, and an output that exposes part of the resulting state.',
      'The point is to show how a small amount of HCL defines a persistent managed object rather than a one-time provisioning command.',
    ],
    code: `terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

resource "aws_s3_bucket" "logs" {
  bucket = "acme-platform-logs-prod"
}

output "logs_bucket_name" {
  value = aws_s3_bucket.logs.bucket
}`,
    notes: [
      'Version constraints and typed variables make the configuration more predictable.',
      'Terraform keeps ownership of the bucket through state across future runs.',
    ],
  },
  {
    id: 'ex-module',
    title: 'Module Composition',
    description: [
      'Modules are how teams standardize infrastructure patterns. A root module passes inputs to a child module and then uses outputs as a stable interface.',
      'This is what turns Terraform from one directory of resources into a reusable platform toolkit.',
    ],
    code: `module "network" {
  source      = "../../modules/network"
  environment = var.environment
  cidr_block  = "10.40.0.0/16"
}

resource "aws_security_group" "app" {
  name   = "app-\${var.environment}"
  vpc_id = module.network.vpc_id
}

output "vpc_id" {
  value = module.network.vpc_id
}`,
    notes: [
      'Modules should expose deliberate outputs rather than leaking every internal resource.',
      'Module boundaries should follow ownership and repeated platform patterns.',
    ],
  },
  {
    id: 'ex-for-each',
    title: 'Locals and for_each',
    description: [
      'for_each is usually the right choice when repeated resources need stable identity by key. Locals help normalize values before the repeated resource block consumes them.',
      'This keeps the configuration explicit without repeating the same resource body by hand.',
    ],
    code: `variable "subdomains" {
  type    = set(string)
  default = ["api", "docs", "status"]
}

locals {
  fqdn_map = {
    for name in var.subdomains :
    name => "\${name}.example.com"
  }
}

resource "cloudflare_record" "service" {
  for_each = local.fqdn_map

  zone_id = var.zone_id
  name    = each.value
  type    = "CNAME"
  value   = "edge.example.com"
}`,
    notes: [
      'for_each is usually easier to refactor safely than count when identity matters.',
      'Locals improve readability when derived values would otherwise be repeated.',
    ],
  },
  {
    id: 'ex-import',
    title: 'Import Existing Infrastructure',
    description: [
      'Import brings an already-existing object under Terraform management. The configuration must describe the real object accurately enough that the next plan is understandable and safe.',
      'Import blocks make that adoption flow more explicit and reviewable in source control.',
    ],
    code: `resource "aws_s3_bucket" "logs" {
  bucket = "acme-platform-logs-prod"
}

import {
  to = aws_s3_bucket.logs
  id = "acme-platform-logs-prod"
}`,
    notes: [
      'Import adds a state binding; it does not magically guarantee the configuration already matches every remote detail.',
      'Always inspect the post-import plan before trusting the resource as fully managed.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'HCL',
        definition:
          'HashiCorp Configuration Language, the declarative language Terraform uses for configuration.',
      },
      {
        term: 'Provider',
        definition:
          'A plugin that lets Terraform interact with an external API and exposes resource types and data sources.',
      },
      {
        term: 'Resource',
        definition: 'A managed object declared in configuration and tracked over time in state.',
      },
      {
        term: 'Data source',
        definition:
          'A read-only lookup that fetches information without claiming lifecycle ownership.',
      },
      {
        term: 'Desired state',
        definition: 'The intended end condition of infrastructure described by configuration.',
      },
      {
        term: 'Module',
        definition: 'A reusable package of Terraform files with inputs and outputs.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow Terms',
    terms: [
      {
        term: 'Plan',
        definition: 'The preview of actions Terraform intends to take to reach the declared state.',
      },
      { term: 'Apply', definition: 'The execution step that performs the planned changes.' },
      { term: 'Destroy', definition: 'The lifecycle operation that removes managed resources.' },
      { term: 'Variable', definition: 'An input value accepted by a root module or child module.' },
      {
        term: 'Local value',
        definition: 'A named internal expression used to simplify configuration logic.',
      },
      {
        term: 'Output',
        definition:
          'A published value exposed from a module to users, parent modules, or automation.',
      },
    ],
  },
  {
    id: 'glossary-state',
    title: 'State and Operations Terms',
    terms: [
      {
        term: 'State',
        definition:
          'The mapping between Terraform configuration objects and real infrastructure instances.',
      },
      { term: 'Backend', definition: 'The mechanism Terraform uses to store and access state.' },
      {
        term: 'Locking',
        definition:
          'Protection against concurrent state writes that could corrupt infrastructure tracking.',
      },
      {
        term: 'Drift',
        definition: 'A difference between recorded or desired state and the actual remote system.',
      },
      { term: 'Workspace', definition: 'A separate state instance for the same configuration.' },
      {
        term: 'Import',
        definition: 'The process of bringing an existing object under Terraform state management.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderSection(section: Section, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="terraform-help98-section">
      <h2 className="terraform-help98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {!isLast ? <hr className="terraform-help98-divider" /> : null}
    </section>
  )
}

function renderExample(section: Example, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="terraform-help98-section">
      <h2 className="terraform-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="terraform-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="terraform-help98-divider" /> : null}
    </section>
  )
}

function renderGlossary(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="terraform-help98-section">
      <h2 className="terraform-help98-heading">{section.title}</h2>
      <dl className="terraform-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="terraform-help98-divider" /> : null}
    </section>
  )
}

export default function TerraformPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Terraform Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Terraform Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{PAGE_TITLE}</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <hr className="bin98-divider" />

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderSection(section, index === bigPictureSections.length - 1),
          )
        : null}
      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderSection(section, index === coreConceptSections.length - 1),
          )
        : null}
      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExample(section, index === exampleSections.length - 1),
          )
        : null}
      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossary(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
