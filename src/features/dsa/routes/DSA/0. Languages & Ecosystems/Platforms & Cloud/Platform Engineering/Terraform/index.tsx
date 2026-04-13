import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type SectionNote = { title: string; details: string; notes: string }
type NarrativeSection = { id: string; title: string; paragraphs: string[] }
type ExampleSection = { id: string; title: string; code: string; explanation: string }
type GlossaryTerm = { term: string; definition: string }

const introParagraphs = [
  'Terraform is infrastructure as code built around a declarative configuration language, providers, modules, plans, and state. It lets teams describe desired infrastructure, compare that description with the last known deployed world, and apply a controlled change plan to reach the target result.',
  'That sounds simple until platform engineering concerns appear: how modules are designed, how state is partitioned, how providers and credentials are configured, how teams review plans safely, how drift is handled, and how reusable platform patterns avoid turning into giant variable matrices.',
  'This page treats Terraform as a platform-engineering topic rather than a syntax overview. The focus is on the resource model, providers and modules, state and plan workflows, composition and reuse, policy and governance, operational tradeoffs, and how Terraform compares with tools such as Pulumi and Crossplane.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Terraform is an infrastructure as code tool that uses declarative configuration to define resources managed through providers. It computes an execution plan from configuration plus state, then applies the operations required to converge real infrastructure on the declared model.',
    notes:
      'The key idea is not only that infrastructure is written as code. It is that infrastructure changes move through a plan-and-apply workflow with provider schemas, dependency graphs, and state-based diffing.',
  },
  {
    title: 'Why teams adopt it',
    details:
      'Teams adopt Terraform because it provides a common model for managing cloud resources across many providers, with a well-understood workflow for planning, reviewing, and applying infrastructure changes.',
    notes:
      'It is especially strong when an organization wants a declarative IaC standard with a large provider ecosystem, reusable modules, and clear separation between desired configuration and operational execution.',
  },
  {
    title: 'Where it fits',
    details:
      'Terraform fits when a team wants deployment-time infrastructure automation with predictable plans, state-backed diffs, module reuse, and a relatively explicit declarative model rather than full programming-language flexibility.',
    notes:
      'It is often used by platform teams as the shared substrate for network foundations, clusters, databases, IAM, service infrastructure, and environment bootstrapping.',
  },
  {
    title: 'What it is not',
    details:
      'Terraform is not a long-running control plane, not a continuous reconciliation controller, and not a magic abstraction layer by itself. It runs a plan/apply workflow from configuration and state, then exits.',
    notes:
      'If the need is Kubernetes-native self-service APIs with always-on reconciliation, Crossplane may be the stronger fit. If the need is richer language-native abstractions, Pulumi may be the better match.',
  },
]

const keyTakeaways = [
  'Terraform uses declarative configuration, providers, and state to manage infrastructure through plan and apply workflows.',
  'Modules are the main abstraction tool, but good module design is about stable interfaces, not exposing every possible provider option.',
  'State is central to correctness, review, and recovery, so backend design and workflow discipline matter as much as configuration syntax.',
  'Terraform is powerful for deployment-time infrastructure automation, but it is not an always-on reconciliation plane.',
  'The best Terraform platforms combine modules, reviewable plans, safe state boundaries, policy, and clear ownership models.',
]

const coreSections: NarrativeSection[] = [
  {
    id: 'core-model',
    title: 'Resource model, providers, and dependency graph',
    paragraphs: [
      'Terraform resources represent desired infrastructure objects managed by providers. Providers define the schemas, operations, and authentication paths for clouds, SaaS systems, and other infrastructure domains.',
      "Dependencies are inferred from references between resources, and the execution plan is built from that graph. This is one of Terraform's main strengths: teams can describe desired relationships declaratively and let Terraform work out safe ordering for create, update, and destroy operations.",
      'That said, the graph is only as understandable as the configuration. Hidden dependencies, overuse of dynamic patterns, or unclear resource ownership can make a plan difficult to reason about even when Terraform can technically execute it.',
    ],
  },
  {
    id: 'core-state',
    title: 'State, backends, locking, and drift',
    paragraphs: [
      'Terraform state records the last known deployed model so Terraform can compute diffs between configuration and reality. Without state, Terraform cannot reliably know what already exists, what must change, or what should be destroyed.',
      'State design is therefore an operational concern, not a minor implementation detail. Teams need to decide where state lives, how it is protected, how concurrent runs are prevented, how secrets in state are handled, and how recovery works after failed applies.',
      'Drift also matters. Manual changes, provider-side defaults, or out-of-band updates can cause plans to surprise operators unless refresh and review are part of the workflow. Terraform can manage drift, but only if the team treats state hygiene seriously.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Modules as platform abstractions',
    paragraphs: [
      "Modules are Terraform's main abstraction mechanism. They allow a platform team to package repeated infrastructure patterns such as service networks, cluster foundations, IAM bundles, or database setups behind a stable interface.",
      'A good module does not simply wrap resources. It encodes defaults, naming conventions, policy assumptions, and supported configuration choices in a way that makes consumer behavior safer and more consistent.',
      'A weak module becomes a thin wrapper with dozens of variables mirroring every underlying provider field. That creates indirection without real platform value. The hard part is choosing which knobs belong in the public interface and which should remain internal implementation details.',
    ],
  },
  {
    id: 'core-composition',
    title: 'Variables, outputs, locals, and data sources',
    paragraphs: [
      'Terraform compositions are shaped by variables, outputs, locals, and data sources. Variables define module inputs. Outputs expose results for downstream consumers. Locals help structure internal logic. Data sources read existing infrastructure that should influence new resources.',
      'These tools are useful, but they can also produce opaque configurations when overused. Too many variables can turn a module into a configuration spreadsheet. Too many data sources can blur ownership boundaries between what Terraform creates and what it merely reads.',
      'The strongest configurations keep the dataflow visible. A reviewer should be able to understand what is created, what is looked up, what is exported, and which values truly shape behavior.',
    ],
  },
  {
    id: 'core-workflow',
    title: 'Plan, apply, import, and lifecycle workflow',
    paragraphs: [
      "Terraform's workflow revolves around plan and apply. Plan is the reviewable contract that shows intended infrastructure changes before mutation. Apply executes that plan. Import brings pre-existing resources into Terraform management, while lifecycle rules influence how changes and replacements are handled.",
      'This is operationally powerful because infrastructure changes can be discussed before they happen. The plan is one of the clearest interfaces between human review and infrastructure automation.',
      'The tradeoff is that the workflow requires discipline. If teams apply unreviewed plans, mix ad hoc local state with shared environments, or import resources carelessly, Terraform quickly becomes risky even though the tool itself is designed for controlled changes.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Delivery workflows, policy, and compare and contrast',
    paragraphs: [
      'Terraform is usually run from CI pipelines, remote execution services, or tightly controlled local workflows. Mature teams define who can plan, who can apply, which workspaces or environments map to which state boundaries, and how secrets and credentials are injected into runs.',
      'Policy and governance matter because Terraform code has production power. Organizations often need rules around regions, tags, encryption, naming, IAM patterns, cost controls, and destructive changes. Some of those rules belong in modules, some in policy tooling, and some in review workflows.',
      'Compared with Pulumi, Terraform offers a more constrained declarative model and usually simpler review semantics, while Pulumi offers richer abstraction power through general-purpose languages. Compared with Crossplane, Terraform is a deployment-time IaC engine rather than a Kubernetes-native control plane with continuous reconciliation. Compared with raw cloud SDKs, Terraform adds plan, state, provider schemas, and a clearer operational workflow.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common failure modes',
    paragraphs: [
      'Teams get into trouble when they create giant state domains, publish modules with unstable or overly broad interfaces, or treat plan review as ceremonial rather than operationally meaningful.',
      'Another common problem is copying modules and variables everywhere without a real abstraction strategy. The result is a platform that technically uses reusable code but still forces every team to reason about low-level infrastructure details.',
      'The hard part is therefore not just learning HCL. The hard part is state partitioning, module design, workflow governance, drift handling, and deciding what the platform should standardize versus what it should leave flexible.',
    ],
  },
]

const designChecklist = [
  'Partition state so ownership and blast radius stay clear; avoid giant all-environment state files.',
  'Design modules around stable platform products or patterns, not around exposing every provider field.',
  'Treat plans as real review artifacts and ensure apply paths use the reviewed intent.',
  'Document which resources are managed, which are imported, and which are only read through data sources.',
  'Use variables, locals, and outputs to clarify dataflow rather than hide it behind excessive indirection.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-provider',
    title: 'Configure a provider and remote backend',
    code: `terraform {
  required_version = ">= 1.6.0"

  backend "s3" {
    bucket         = "platform-terraform-state"
    key            = "network/prod.tfstate"
    region         = "us-east-1"
    dynamodb_table = "platform-terraform-locks"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}`,
    explanation:
      'Backend and provider configuration are part of the platform contract. The backend controls where state lives and how locking works, while the provider controls how Terraform talks to the target cloud.',
  },
  {
    id: 'example-module',
    title: 'Wrap infrastructure behind a reusable module',
    code: `module "service_network" {
  source     = "../../modules/service-network"
  name       = "payments"
  cidr_block = "10.42.0.0/16"
  region     = var.region
  tags = {
    environment = var.environment
    team        = "payments"
  }
}`,
    explanation:
      'This is the normal platform pattern in Terraform: publish a reusable module with a stable interface, then consume it with environment-specific inputs instead of hand-authoring every low-level resource repeatedly.',
  },
  {
    id: 'example-resource',
    title: 'Declare resources with variables and outputs',
    code: `resource "aws_s3_bucket" "artifacts" {
  bucket = "\${var.prefix}-artifacts"

  tags = {
    environment = var.environment
  }
}

output "bucket_name" {
  value = aws_s3_bucket.artifacts.bucket
}`,
    explanation:
      'Resources, variables, and outputs are the basic Terraform building blocks. The important design question is which outputs should form part of the public module contract and which should remain internal.',
  },
  {
    id: 'example-workflow',
    title: 'Plan and apply through a controlled workflow',
    code: `terraform init
terraform fmt -check
terraform validate
terraform plan -out=tfplan
terraform apply tfplan`,
    explanation:
      'This is the core Terraform operational path. Mature teams treat the generated plan as a review artifact and avoid applying ad hoc unreviewed changes directly against shared environments.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Terraform',
    definition:
      'An infrastructure as code tool that uses declarative configuration, providers, and state to manage infrastructure through plan-and-apply workflows.',
  },
  {
    term: 'Provider',
    definition:
      'A plugin that defines how Terraform manages resources for a cloud, platform, or service.',
  },
  {
    term: 'State',
    definition:
      'Terraform’s recorded model of managed infrastructure used to calculate diffs and drive updates.',
  },
  {
    term: 'Backend',
    definition:
      'The storage and coordination mechanism used for Terraform state, often including locking support.',
  },
  {
    term: 'Module',
    definition:
      'A reusable Terraform package that groups resources and exposes inputs and outputs through a stable interface.',
  },
  {
    term: 'Plan',
    definition:
      'A preview of the actions Terraform intends to take before infrastructure is modified.',
  },
  {
    term: 'Apply',
    definition: 'The step that executes a Terraform plan against real infrastructure.',
  },
  {
    term: 'Refresh',
    definition:
      'The process of reconciling recorded state with the current real infrastructure state.',
  },
  {
    term: 'Data source',
    definition:
      'A Terraform object used to read existing infrastructure data without directly creating that resource.',
  },
  {
    term: 'Import',
    definition: 'The process of bringing an existing resource under Terraform state management.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Resource Model' },
    { id: 'core-state', label: 'State and Drift' },
    { id: 'core-modules', label: 'Modules' },
    { id: 'core-composition', label: 'Composition Tools' },
    { id: 'core-workflow', label: 'Plan and Apply' },
    { id: 'core-operations', label: 'Operations and Compare' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function TerraformPlatformEngineeringPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Terraform',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Terraform"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Terraform</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              Platform engineering needs infrastructure changes that are reviewable, repeatable, and
              understandable across teams. Terraform matters because it gives organizations a common
              plan-and-apply model for infrastructure changes instead of relying on ad hoc scripts
              or manual cloud-console workflows.
            </p>
            <p>
              It also provides a common abstraction and governance layer. A platform team can
              publish modules, define state boundaries, standardize workflows, and make
              infrastructure change control more consistent across environments and services.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}
      {activeTab === 'core-concepts' && (
        <>
          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={`${section.id}-${paragraph}`}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Design Checklist</h2>
            <ul>
              {designChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}
      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}
      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
