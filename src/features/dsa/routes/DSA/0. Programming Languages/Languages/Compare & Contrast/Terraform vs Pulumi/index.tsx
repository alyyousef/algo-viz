import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Terraform and Pulumi both solve the same broad problem: declaring and evolving cloud and infrastructure resources safely through code instead of hand-driven console work. The serious comparison is not whether either can create a VPC, Kubernetes cluster, or database. Both can. The meaningful differences are language model, planning workflow, state handling, reuse model, testing ergonomics, policy integration, and which kind of engineering organization the tool fits best.',
  'Terraform is built around a dedicated infrastructure language and execution model. Teams describe desired state in HashiCorp Configuration Language, rely on providers and modules, inspect plans, and apply changes against managed state. Pulumi keeps the same infrastructure-as-code goal but expresses infrastructure in general-purpose programming languages such as TypeScript, Python, Go, C#, and Java, layering infrastructure semantics such as resources, inputs, outputs, stacks, and previews on top of normal language features.',
  'This page is intentionally comprehensive. It covers declarative HCL versus general-purpose languages, state and backends, previews and plans, providers, modules versus components, interpolation versus outputs, policy, testing, CI, drift, Automation API, provider reuse, migration tradeoffs, and the cases where one tool is materially better aligned with the team.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Terraform is the most established mainstream infrastructure-as-code tool built around HCL, providers, modules, a plan or apply workflow, and explicit state management. Its strongest identity is that infrastructure is described in a domain-specific language that is intentionally narrower than a full programming language. This encourages predictability, shared conventions, and a planning model that many platform teams consider operationally clear.',
      'Pulumi is an infrastructure-as-code platform that uses general-purpose languages to define cloud resources. Instead of learning a dedicated configuration language, developers express infrastructure through familiar language constructs while still using Pulumi-specific concepts such as stacks, resources, inputs, outputs, and providers. The strongest advantage is developer ergonomics for teams already comfortable in mainstream programming languages.',
      'Both tools are serious choices for production infrastructure. The real question is whether the organization benefits more from Terraform\'s intentionally constrained declarative model or Pulumi\'s richer programming-language model.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'Terraform is deliberately not a general-purpose programming language. That is one of its strengths. It limits what teams can express so that planning, graph construction, resource lifecycle reasoning, and collaboration remain centered on infrastructure semantics rather than arbitrary code execution. Many platform teams value this because it keeps infrastructure definitions recognizable and reviewable across contributors.',
      'Pulumi takes the opposite bet. It assumes the best way to author infrastructure may be to use real programming languages with functions, loops, classes, packages, tests, and normal developer tooling. This can dramatically improve reuse, abstraction, and developer happiness, especially when infrastructure and application engineers work closely together. The tradeoff is that infrastructure code can also become more like software in all the messy ways software can become hard to reason about.',
    ],
    bullets: [
      'Terraform emphasizes a constrained declarative workflow.',
      'Pulumi emphasizes full-language developer expressiveness.',
      'Terraform often optimizes for shared infrastructure conventions.',
      'Pulumi often optimizes for developer familiarity and abstraction power.',
    ],
  },
  {
    id: 'bp-when-terraform-fits',
    title: 'When Terraform Is Usually the Better Fit',
    paragraphs: [
      'Terraform is often the better fit when the infrastructure team wants a strong standard language for infrastructure, predictable reviews, broad ecosystem maturity, deep community knowledge, and a shared operational model that many engineers and vendors already understand. It is especially strong in organizations where platform teams need a common lingua franca across cloud accounts, environments, and services.',
      'It is also a strong fit when the goal is to keep infrastructure definitions intentionally separate from general software application logic. Many teams see that separation as a governance advantage, not a limitation.',
    ],
    bullets: [
      'Large organizations standardizing on a common IaC tool.',
      'Teams that value HCL readability and broad community maturity.',
      'Environments where reviewability and conventional infrastructure workflows matter heavily.',
      'Operations or platform teams that want fewer arbitrary programming constructs in infra definitions.',
    ],
  },
  {
    id: 'bp-when-pulumi-fits',
    title: 'When Pulumi Is Usually the Better Fit',
    paragraphs: [
      'Pulumi is often the better fit when infrastructure is authored by software engineers who want to stay inside familiar languages and toolchains. If the team already lives in TypeScript, Python, Go, C#, or Java, Pulumi can reduce the psychological overhead of switching into a separate infrastructure language while making reuse and abstraction feel more natural.',
      'It is also a strong fit when the project benefits from stronger composition, code reuse, unit testing habits, packaging, and programmatic orchestration. Teams that want infrastructure to feel like first-class software engineering often find Pulumi more natural.',
    ],
    bullets: [
      'Developer-led platform teams.',
      'Organizations that want one language ecosystem across app code and infra code.',
      'Projects that benefit from richer abstraction and packaging patterns.',
      'Teams interested in programmatic orchestration through Automation API or similar workflows.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Both Do Well',
    paragraphs: [
      'Both Terraform and Pulumi support cloud resource provisioning, previews of intended changes, stack or workspace-like environment management, state tracking, provider ecosystems, modules or reusable abstractions, CI integration, and policy or governance workflows. Both can manage serious multi-cloud and Kubernetes-heavy environments.',
      'This matters because the comparison is not about whether one can do infrastructure-as-code and the other cannot. It is about workflow economics. Which one helps your team express, review, reuse, and evolve infrastructure with less long-term pain.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Terraform\'s declarative model does not guarantee good infrastructure architecture. Teams can still create module sprawl, variable confusion, weak naming standards, poor state boundaries, and brittle workflows. The tool encourages certain kinds of discipline, but the organization still has to supply the discipline.',
      'Pulumi\'s language flexibility does not automatically make infrastructure code elegant. It can just as easily invite over-engineering, hidden control flow, too much abstraction, and libraries that are clever but difficult for operations teams to review. The tool increases expressive power; it also increases the cost of poor engineering judgment.',
      'In other words, both tools work best when the team understands where to stop. Terraform needs restraint in module design. Pulumi needs restraint in abstraction design.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The best decision usually starts from who writes the infrastructure and how much governance or standardization matters. If a platform team wants a highly shared infrastructure language with a mature common model, Terraform often wins. If software engineers need infrastructure to feel like part of normal application engineering, Pulumi often wins.',
      'Another good question is whether your team wants infrastructure to be mostly declarative data plus references, or whether it wants full language power for composition, packages, loops, abstractions, and integration into broader software workflows. That question often predicts the answer better than feature checklists do.',
    ],
    bullets: [
      'Choose Terraform when standardization and declarative reviewability dominate.',
      'Choose Pulumi when language-native developer ergonomics dominate.',
      'Do not pick Pulumi only because general-purpose languages feel cooler.',
      'Do not pick Terraform only because it is more famous if your team repeatedly fights HCL for abstraction reasons.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-model',
    title: 'Language Model: HCL Versus General-Purpose Languages',
    paragraphs: [
      'Terraform uses HCL, a configuration language designed specifically for infrastructure declarations. That choice is intentional. HCL is readable, relatively constrained, and centered around resources, variables, outputs, modules, and expressions that support infrastructure graph construction. Many teams consider this narrowness a feature because it keeps infrastructure code recognizable and less likely to become a full internal framework.',
      'Pulumi uses general-purpose languages. That means you can write infrastructure in TypeScript, Python, Go, C#, or Java and use normal language features such as functions, classes, loops, conditionals, packages, and tests. This can be much more expressive. It can also make infrastructure code feel more natural to software engineers who already know those ecosystems.',
      'The real tradeoff is not declarative versus imperative as a slogan. The real tradeoff is constrained readability versus abstraction power.',
    ],
  },
  {
    id: 'core-state',
    title: 'State, Backends, and Environment Isolation',
    paragraphs: [
      'Both tools track state so they can compare the last known infrastructure shape with the desired definition and the current provider reality. Terraform has a long-established state model with local and remote backends, locking patterns depending on the backend, and many mature operational conventions around workspace separation, state isolation, and backend governance.',
      'Pulumi also uses state and organizes deployments around stacks. Official Pulumi documentation treats stacks as a core concept, and Pulumi supports state backends as part of that stack model. The experience is different in wording and workflow, but the fundamental operational truth remains the same: state design is a serious engineering concern, not a background implementation detail.',
      'In both systems, bad state boundaries cause pain. The choice of tool does not remove the need to think carefully about how stacks, environments, and ownership domains are separated.',
    ],
  },
  {
    id: 'core-plan-preview',
    title: 'Plan Versus Preview Workflow',
    paragraphs: [
      'Terraform is famous for its explicit `plan` and `apply` model. This becomes part of team culture quickly. Infrastructure changes are usually reasoned about through a textual or structured plan that reviewers inspect before changes are applied. This workflow is one of Terraform\'s biggest strengths because it trains organizations to think in explicit infrastructure diffs.',
      'Pulumi also supports previews before updates, but the culture often feels more like running a normal developer tool in a language ecosystem rather than operating inside a dedicated infrastructure configuration language. The capability is there, but the surrounding ergonomics feel different because the source code is embedded in a full programming model.',
      'If your organization cares deeply about the ritual of plan-first review as an operations practice, Terraform often feels more native. If preview is important but not culturally central, Pulumi may still fit well.',
    ],
  },
  {
    id: 'core-providers',
    title: 'Providers and Ecosystem Reach',
    paragraphs: [
      'Terraform has a very broad provider ecosystem and deep industry familiarity. Many cloud, SaaS, and infrastructure vendors document their Terraform support first or most visibly. This matters in practice because ecosystem familiarity reduces onboarding friction and often shortens the time between deciding to automate something and having a reliable pattern to start from.',
      'Pulumi also supports major providers and has a strong multi-cloud story. A particularly relevant capability is Pulumi\'s support for Any Terraform Provider, which means Pulumi can often bridge into Terraform provider ecosystems rather than forcing a strict either-or decision at the provider layer. This reduces one of the obvious objections to Pulumi in ecosystems dominated by Terraform providers.',
      'Even so, Terraform remains the default reference point in many infrastructure communities. That maturity and documentation gravity still matter.',
    ],
  },
  {
    id: 'core-reuse',
    title: 'Reuse Model: Modules Versus Components and Libraries',
    paragraphs: [
      'Terraform reuses infrastructure through modules. This is a strong and proven model. Teams package resource patterns into modules, parameterize them, version them, and consume them repeatedly. The model is intentionally centered around infrastructure building blocks rather than general application libraries.',
      'Pulumi reuses infrastructure through components, normal language abstractions, and package ecosystems. That can be much more powerful because teams can express richer interfaces, share helper libraries, package abstractions like ordinary code, and use the full host language to structure reuse. It can also become over-engineered faster if teams forget that infrastructure readers may not want to debug an abstraction framework to understand a VPC.',
      'Terraform modules tend to be narrower but easier to reason about operationally. Pulumi components can be richer but require stronger engineering taste.',
    ],
  },
  {
    id: 'core-dataflow',
    title: 'Dataflow, References, Inputs, and Outputs',
    paragraphs: [
      'Terraform uses expressions, interpolation, resource references, variables, locals, and outputs to model dependencies and dataflow through the infrastructure graph. This is consistent and learnable once the team understands how Terraform builds and evaluates resource relationships.',
      'Pulumi uses concepts such as Inputs and Outputs to represent values that may only be known as resources are provisioned. This is one of the biggest conceptual hurdles for developers new to Pulumi. Although the language is familiar, infrastructure values are still asynchronous and graph-dependent, so teams must learn Pulumi\'s resource dataflow semantics instead of assuming ordinary synchronous variable behavior.',
      'This is an important subtlety. Pulumi feels like normal code until infrastructure dependency timing reminds you that it is still infrastructure orchestration.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and Developer Tooling',
    paragraphs: [
      'Terraform supports validation, formatting, plans, policy tooling, and ecosystem testing strategies, but it does not feel like ordinary application-unit-testing culture in the same way a normal programming language ecosystem does. That is acceptable for many platform teams because infrastructure review often centers more on plan inspection and environment testing than on classic unit tests.',
      'Pulumi often fits more naturally into developer testing habits because infrastructure code lives in ordinary languages with existing test frameworks, package managers, linters, and IDE support. This can be a real advantage when teams want infrastructure packages to behave like software artifacts with normal testing and code-quality workflows.',
      'The tradeoff is that testing infrastructure code in a programming language can encourage more abstraction and helper logic, which may or may not improve operational clarity.',
    ],
  },
  {
    id: 'core-policy',
    title: 'Policy, Governance, and Guardrails',
    paragraphs: [
      'Terraform has strong mindshare in policy and governance workflows, especially in organizations that have invested in plan review, policy-as-code, remote execution, module registries, and central platform controls. The surrounding ecosystem and habits are mature.',
      'Pulumi also supports policy-oriented controls and organization-level governance. But because Pulumi is more language-native, the governance conversation often shifts from only validating configuration shape to also managing how much abstraction freedom teams are allowed in infrastructure code. This is not worse, but it is a different governance problem.',
    ],
  },
  {
    id: 'core-ci',
    title: 'CI, Automation, and Orchestration',
    paragraphs: [
      'Terraform integrates very naturally into CI pipelines through familiar commands such as format, validate, plan, and apply. This predictability is part of why it became such a standard platform tool. Teams know what the pipeline stages mean and many organizations already have strong templates for them.',
      'Pulumi also integrates into CI, but it has an additional advantage for some teams through the Automation API. That API allows Pulumi programs to be driven programmatically from other applications or workflows. This can be powerful when infrastructure provisioning is part of a broader software platform instead of a standalone IaC pipeline.',
      'If infrastructure execution needs to become a library-like capability inside a larger platform, Pulumi often looks more attractive.',
    ],
  },
  {
    id: 'core-drift',
    title: 'Drift, Refresh, and Operational Discipline',
    paragraphs: [
      'Neither Terraform nor Pulumi removes the operational problem of infrastructure drift. Manual changes, partial failures, external automation, and provider-side surprises can still create divergence between desired and actual state. Teams still need practices for review, refresh or preview discipline, and ownership boundaries.',
      'Terraform\'s long operational history means many teams already know how to talk about drift in Terraform terms. Pulumi handles the same fundamental problem but may require a bit more conceptual onboarding for teams used to Terraform\'s exact workflow language.',
    ],
  },
  {
    id: 'core-cognitive-load',
    title: 'Cognitive Load and Reviewability',
    paragraphs: [
      'Terraform often lowers review complexity because most code looks like infrastructure declarations. Reviewers can focus on resources, variables, modules, and diffs rather than interpreting arbitrary control flow. This is especially valuable in operations-heavy environments where reviewers are not all software engineers.',
      'Pulumi can lower authoring friction for developers while raising review complexity for operators if the codebase leans too heavily on abstraction, helper libraries, and non-obvious program flow. The question is not whether Pulumi reviews are impossible. The question is whether your review culture is prepared for infrastructure written like software.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Strategy and Interoperability',
    paragraphs: [
      'Migrating from Terraform to Pulumi is not only a syntax rewrite. It is also a workflow and culture change. Teams move from HCL modules and Terraform execution habits to stacks, language packages, Input or Output semantics, and often a different philosophy of reuse. That can be worth it, but it should not be treated as a cosmetic migration.',
      'Staying on Terraform and improving module quality, policy, CI discipline, and state design is often the smarter choice when the current organization already operates well on Terraform. Moving to Pulumi is most compelling when the current team keeps running into genuine limits from HCL or wants infrastructure to integrate much more tightly with normal software engineering workflows.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Structure',
    paragraphs: [
      'Terraform often fits organizations with distinct platform or infrastructure teams, strong ops review culture, and a desire for a common declarative IaC standard across business units. Its ecosystem maturity and shared vocabulary make it a safe organizational default.',
      'Pulumi often fits developer-platform teams, full-stack teams, internal platform builders, and organizations where application engineers are expected to author or package infrastructure alongside application logic. It can be especially compelling when the same people writing services also provision the services\' infrastructure.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One common misconception is that Terraform is too limited because it is declarative. In practice, that limitation is often exactly why organizations like it. Another misconception is that Pulumi is automatically better because general-purpose languages are more powerful. Raw expressive power is not always the same as operational clarity.',
      'The mature comparison is not old declarative tool versus modern real programming. It is standardized declarative infrastructure language versus language-native infrastructure engineering.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-terraform-resource',
    title: 'Basic Terraform Resource',
    description: [
      'Terraform expresses infrastructure through HCL resources, variables, outputs, and modules. The syntax is narrow by design and keeps attention on infrastructure shape rather than general program structure.',
    ],
    code: `resource "aws_s3_bucket" "logs" {
  bucket = "company-logs-prod"

  tags = {
    Environment = "prod"
    ManagedBy   = "terraform"
  }
}`,
    notes: [
      'The code is concise and infrastructure-specific.',
      'This style is easy for many reviewers to read because it minimizes unrelated programming constructs.',
    ],
  },
  {
    id: 'examples-pulumi-resource',
    title: 'Basic Pulumi Resource',
    description: [
      'Pulumi expresses the same idea in a normal programming language. This example uses TypeScript to show the developer-native workflow.',
    ],
    code: `import * as aws from "@pulumi/aws";

const logs = new aws.s3.Bucket("logs", {
  bucket: "company-logs-prod",
  tags: {
    Environment: "prod",
    ManagedBy: "pulumi",
  },
});`,
    notes: [
      'The infrastructure is written as ordinary TypeScript code.',
      'This feels natural to application developers, but reviews now inherit normal code-review complexity too.',
    ],
  },
  {
    id: 'examples-reuse',
    title: 'Reuse Model Comparison',
    description: [
      'This example captures the different abstraction instincts each tool encourages.',
    ],
    code: `Terraform mindset:
  create a reusable module
  expose variables and outputs
  version the module
  keep the interface narrow

Pulumi mindset:
  create a component or library
  expose typed constructor arguments
  package it like normal code
  compose with ordinary language features`,
    notes: [
      'Terraform reuse tends to stay closer to infrastructure declarations.',
      'Pulumi reuse can become much richer, which is both a strength and a governance challenge.',
    ],
  },
  {
    id: 'examples-dataflow',
    title: 'Dataflow and Dependency Handling',
    description: [
      'Both tools manage dependency graphs, but Pulumi\'s full-language model can hide that from new users until Inputs and Outputs become unavoidable.',
    ],
    code: `Terraform:
  resource references and outputs
  graph derived from expressions and dependencies

Pulumi:
  Inputs and Outputs model values not known immediately
  language syntax is familiar
  infrastructure timing rules still apply`,
    notes: [
      'Pulumi is not just normal code. It is normal code plus infrastructure graph semantics.',
      'Terraform makes the infrastructure graph feel more explicit from the beginning.',
    ],
  },
  {
    id: 'examples-ci',
    title: 'CI Pipeline Orientation',
    description: [
      'The pipeline shapes often reflect the philosophical difference between the tools.',
    ],
    code: `Terraform pipeline:
  fmt
  validate
  plan
  review
  apply

Pulumi pipeline:
  install dependencies
  run tests and linters
  preview
  review
  up`,
    notes: [
      'Terraform CI often looks like an infrastructure-native workflow.',
      'Pulumi CI often looks like an application-code workflow that happens to provision infrastructure.',
    ],
  },
  {
    id: 'examples-selection',
    title: 'Selection Heuristic',
    description: [
      'These rules are usually more useful than abstract arguments about which tool is more modern.',
    ],
    code: `Choose Terraform when:
  you want a common declarative IaC standard
  ops reviewability matters heavily
  HCL and module conventions are acceptable
  ecosystem maturity is a major concern

Choose Pulumi when:
  developers author lots of infrastructure
  language-native reuse matters
  tests and packages should feel like normal code
  programmatic orchestration is valuable`,
    notes: [
      'This heuristic is not absolute, but it matches many real-world team outcomes.',
      'The best choice usually depends more on the organization than on raw feature parity.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-terraform',
    title: 'Terraform Terms',
    terms: [
      {
        term: 'HCL',
        definition:
          'HashiCorp Configuration Language, the infrastructure-focused language used to define Terraform configuration.',
      },
      {
        term: 'Provider',
        definition:
          'A plugin that lets Terraform manage a specific cloud, SaaS, or infrastructure API.',
      },
      {
        term: 'Module',
        definition:
          'A reusable package of Terraform configuration with variables and outputs.',
      },
      {
        term: 'State',
        definition:
          'Terraform\'s record of managed resources and their last known attributes, used for planning and updates.',
      },
      {
        term: 'Plan',
        definition:
          'A preview of the proposed infrastructure changes before apply.',
      },
      {
        term: 'Backend',
        definition:
          'The storage mechanism for Terraform state, such as local or remote backends.',
      },
      {
        term: 'Workspace',
        definition:
          'A Terraform concept for managing multiple named states within a configuration context.',
      },
      {
        term: 'Apply',
        definition:
          'The action that executes a reviewed plan and makes the infrastructure changes.',
      },
    ],
  },
  {
    id: 'glossary-pulumi',
    title: 'Pulumi Terms',
    terms: [
      {
        term: 'Stack',
        definition:
          'A Pulumi deployment context representing a specific environment and its associated state.',
      },
      {
        term: 'Resource',
        definition:
          'A managed infrastructure object declared in Pulumi code.',
      },
      {
        term: 'Input',
        definition:
          'A Pulumi value accepted by a resource that may be plain data or derived from other infrastructure values.',
      },
      {
        term: 'Output',
        definition:
          'A Pulumi value representing data that may only become known after provisioning or dependency resolution.',
      },
      {
        term: 'Component',
        definition:
          'A reusable Pulumi abstraction composed from one or more infrastructure resources.',
      },
      {
        term: 'Preview',
        definition:
          'Pulumi\'s change preview before an update is executed.',
      },
      {
        term: 'Automation API',
        definition:
          'A Pulumi API for driving infrastructure operations programmatically from other software.',
      },
      {
        term: 'Any Terraform Provider',
        definition:
          'Pulumi support for using Terraform providers within Pulumi workflows.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared IaC Terms',
    terms: [
      {
        term: 'Infrastructure as Code',
        definition:
          'Managing infrastructure through versioned code and automation instead of manual console changes.',
      },
      {
        term: 'Drift',
        definition:
          'A mismatch between declared infrastructure and the actual deployed environment.',
      },
      {
        term: 'Desired State',
        definition:
          'The target infrastructure shape the tool is trying to converge toward.',
      },
      {
        term: 'Policy as Code',
        definition:
          'Automated rules that validate or constrain infrastructure definitions and changes.',
      },
      {
        term: 'Idempotence',
        definition:
          'The property that repeated application of the same desired state should converge without unintended repeated change.',
      },
      {
        term: 'Multi-Cloud',
        definition:
          'Managing infrastructure across more than one cloud provider through a common toolchain.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-terraform-fits', label: 'When Terraform Fits' },
    { id: 'bp-when-pulumi-fits', label: 'When Pulumi Fits' },
    { id: 'bp-shared-strengths', label: 'Shared Strengths' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-language-model', label: 'Language Model' },
    { id: 'core-state', label: 'State and Backends' },
    { id: 'core-plan-preview', label: 'Plan Versus Preview' },
    { id: 'core-providers', label: 'Providers and Ecosystem Reach' },
    { id: 'core-reuse', label: 'Reuse Model' },
    { id: 'core-dataflow', label: 'Dataflow and References' },
    { id: 'core-testing', label: 'Testing and Tooling' },
    { id: 'core-policy', label: 'Policy and Governance' },
    { id: 'core-ci', label: 'CI and Automation' },
    { id: 'core-drift', label: 'Drift and Operations' },
    { id: 'core-cognitive-load', label: 'Cognitive Load and Reviewability' },
    { id: 'core-migration', label: 'Migration Strategy' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-terraform-resource', label: 'Basic Terraform Resource' },
    { id: 'examples-pulumi-resource', label: 'Basic Pulumi Resource' },
    { id: 'examples-reuse', label: 'Reuse Model Comparison' },
    { id: 'examples-dataflow', label: 'Dataflow and Dependencies' },
    { id: 'examples-ci', label: 'CI Pipeline Orientation' },
    { id: 'examples-selection', label: 'Selection Heuristic' },
  ],
  glossary: [
    { id: 'glossary-terraform', label: 'Terraform Terms' },
    { id: 'glossary-pulumi', label: 'Pulumi Terms' },
    { id: 'glossary-shared', label: 'Shared IaC Terms' },
  ],
}

const pageStyles = `
.tf-pulumi-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.tf-pulumi-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.tf-pulumi-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.tf-pulumi-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.tf-pulumi-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.tf-pulumi-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.tf-pulumi-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.tf-pulumi-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.tf-pulumi-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.tf-pulumi-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.tf-pulumi-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.tf-pulumi-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.tf-pulumi-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tf-pulumi-help-toc-item {
  margin: 0 0 8px;
}

.tf-pulumi-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.tf-pulumi-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.tf-pulumi-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.tf-pulumi-help-section {
  margin: 0 0 20px;
}

.tf-pulumi-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.tf-pulumi-help-content p,
.tf-pulumi-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.tf-pulumi-help-content p {
  margin: 0 0 10px;
}

.tf-pulumi-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.tf-pulumi-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.tf-pulumi-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.tf-pulumi-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .tf-pulumi-help-main {
    grid-template-columns: 1fr;
  }

  .tf-pulumi-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .tf-pulumi-help-window {
    min-height: auto;
  }

  .tf-pulumi-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .tf-pulumi-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .tf-pulumi-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tf-pulumi-help-section">
      <h2 className="tf-pulumi-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="tf-pulumi-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tf-pulumi-help-section">
      <h2 className="tf-pulumi-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="tf-pulumi-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="tf-pulumi-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tf-pulumi-help-section">
      <h2 className="tf-pulumi-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="tf-pulumi-help-divider" />}
    </section>
  )
}

export default function TerraformVsPulumiPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Terraform vs Pulumi (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Terraform vs Pulumi',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="tf-pulumi-help-page">
      <style>{pageStyles}</style>
      <div className="tf-pulumi-help-window" role="presentation">
        <header className="tf-pulumi-help-titlebar">
          <span className="tf-pulumi-help-titletext">Terraform vs Pulumi</span>
          <div className="tf-pulumi-help-controls">
            <button
              className="tf-pulumi-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="tf-pulumi-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="tf-pulumi-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tf-pulumi-help-tab ${activeTab === tab.id ? 'tf-pulumi-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tf-pulumi-help-main">
          <aside className="tf-pulumi-help-toc" aria-label="Table of contents">
            <h2 className="tf-pulumi-help-toc-title">Contents</h2>
            <ul className="tf-pulumi-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="tf-pulumi-help-toc-item">
                  <a href={`#${section.id}`} className="tf-pulumi-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="tf-pulumi-help-content">
            <h1 className="tf-pulumi-help-doc-title">Terraform vs Pulumi</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
