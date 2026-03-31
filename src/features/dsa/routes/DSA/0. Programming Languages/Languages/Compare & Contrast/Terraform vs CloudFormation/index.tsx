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
  'Terraform and AWS CloudFormation both solve the same central problem: expressing infrastructure as code so teams can provision, update, and review cloud resources systematically instead of through manual console changes. The serious comparison is not whether either can create an AWS VPC or RDS instance. Both can. The meaningful differences are platform scope, language model, state handling, review workflow, AWS integration depth, and which organizational model each tool supports best.',
  'Terraform is a cloud-agnostic infrastructure-as-code tool centered on HCL, providers, modules, state, and the plan or apply model. CloudFormation is AWS\'s native infrastructure-as-code service built around stacks, templates, change sets, drift detection, nested stacks, and StackSets. Terraform generally optimizes for a common declarative model across many providers. CloudFormation generally optimizes for deep AWS-native integration and first-party service alignment inside the AWS ecosystem.',
  'This page is intentionally comprehensive. It covers multi-cloud versus AWS-native orientation, HCL versus JSON or YAML templates, state and stack models, change sets, drift, providers versus AWS resource types, modules versus nested stacks, StackSets, CI workflow, governance, migration tradeoffs, and the environments where one tool is materially more appropriate than the other.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Terraform is the broader infrastructure-as-code standard across many organizations because it offers one common language and workflow for many cloud providers and infrastructure services. Teams write HCL, use providers, compose modules, manage state, and run plan or apply operations regardless of whether they are working with AWS, Azure, GCP, Kubernetes, or many SaaS platforms.',
      'CloudFormation is AWS\'s first-party infrastructure-as-code service. It is focused on AWS and deeply integrated into AWS concepts such as stacks, change sets, nested stacks, StackSets, and drift detection. For AWS-centric organizations, this native integration can be a significant advantage because the tool is built around the platform rather than layered across many providers.',
      'The central choice is whether infrastructure standardization across many platforms matters more than staying close to AWS-native tooling and service semantics.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'Terraform is intentionally external to cloud vendors. Even when used heavily with AWS, it still treats AWS as a provider within a broader provider model. That makes Terraform attractive when the organization wants one infrastructure language and one operational pattern across many environments.',
      'CloudFormation is part of the AWS platform experience. It is not trying to be the common language for every infrastructure target. It is trying to be the most native infrastructure declaration system for AWS itself. That difference in mission shapes everything from update behavior to service launch alignment to organizational adoption patterns.',
    ],
    bullets: [
      'Terraform is multi-cloud by design.',
      'CloudFormation is AWS-native by design.',
      'Terraform emphasizes one cross-platform IaC workflow.',
      'CloudFormation emphasizes tight integration with AWS service concepts and governance.',
    ],
  },
  {
    id: 'bp-when-terraform-fits',
    title: 'When Terraform Is Usually the Better Fit',
    paragraphs: [
      'Terraform is usually the better fit when the organization uses more than AWS, expects to manage Kubernetes or SaaS infrastructure alongside cloud resources, or wants one shared IaC model across teams and providers. It is also a strong fit when platform engineering wants to reduce vendor-specific fragmentation and standardize on modules, state management patterns, and plan review practices across many domains.',
      'Even inside AWS-heavy companies, Terraform can still be the better choice when the organization expects to integrate AWS resources with other platforms under one workflow or wants to leverage the broader Terraform provider ecosystem and shared industry conventions.',
    ],
    bullets: [
      'Multi-cloud or hybrid infrastructure.',
      'AWS plus many external providers or SaaS systems.',
      'Organizations standardizing on HCL and Terraform modules.',
      'Teams that value one cross-provider review and state model.',
    ],
  },
  {
    id: 'bp-when-cloudformation-fits',
    title: 'When CloudFormation Is Usually the Better Fit',
    paragraphs: [
      'CloudFormation is usually the better fit when the organization is deeply AWS-centric and prefers first-party tooling, first-party documentation alignment, and native AWS service integration. It is especially attractive when infrastructure governance already lives inside AWS accounts, IAM patterns, and organization-level AWS management workflows.',
      'It is also a strong fit when the team wants to minimize external infrastructure tooling dependencies and stay close to AWS-native operational models such as stacks, change sets, drift detection, and StackSets.',
    ],
    bullets: [
      'AWS-only or strongly AWS-centric environments.',
      'Teams that prefer first-party platform tooling.',
      'Organizations already operating heavily within AWS-native governance models.',
      'Cases where StackSets and AWS account-level rollout patterns are central.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Both Do Well',
    paragraphs: [
      'Both tools let teams declare AWS infrastructure, preview intended changes, organize reusable patterns, deploy consistently across environments, and reduce manual console drift. Both support serious production systems and both are widely used by professional platform teams.',
      'This matters because the comparison is not about whether one is real infrastructure-as-code and the other is not. The comparison is about whether your team wants to anchor itself to an AWS-native ecosystem or a broader cross-platform one.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Terraform\'s cloud-agnostic model does not automatically make AWS infrastructure cleaner. Teams can still create poor module boundaries, confusing variables, oversized states, and brittle review workflows. Standardization is only valuable when the organization actually applies consistent standards.',
      'CloudFormation\'s first-party status does not automatically make templates pleasant or architecture elegant. Teams can still create unreadable templates, deeply nested stack hierarchies, hard-to-maintain parameter surfaces, and painful update dependencies. Native does not mean effortless.',
      'The right choice therefore depends less on ideology and more on which operational complexity your organization is better prepared to manage.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The first question is whether AWS is truly your whole world or just one major part of it. If AWS is only one part, Terraform usually deserves priority because it gives you a common IaC language across domains. If AWS is the whole world and likely to remain so, CloudFormation becomes much more attractive.',
      'The second question is whether the team values first-party AWS service alignment more than a broader ecosystem and common tooling model. Answering those two questions usually gets you most of the way to the correct decision.',
    ],
    bullets: [
      'Choose Terraform when platform scope extends beyond AWS.',
      'Choose CloudFormation when AWS-native integration is the primary advantage.',
      'Do not choose Terraform only because it is more popular.',
      'Do not choose CloudFormation only because it is first-party if cross-provider standardization is strategically important.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-model',
    title: 'Language Model: HCL Versus CloudFormation Templates',
    paragraphs: [
      'Terraform uses HCL, a domain-specific language designed for readable infrastructure configuration. HCL is often seen as easier to read and author than raw JSON and generally more ergonomic than large YAML templates for many teams. Its syntax is intentionally infrastructure-centered, which keeps reviews focused on resources, variables, modules, outputs, and expressions.',
      'CloudFormation templates are typically authored in YAML or JSON and expressed through AWS resource types, properties, parameters, mappings, conditions, outputs, and intrinsic functions. This can be powerful, but large templates often become harder to read because YAML or JSON is only the container. Much of the real complexity lives in intrinsic function composition and resource property nesting.',
      'This is one reason many engineers prefer Terraform ergonomics even for AWS-only work. HCL often feels like a more humane infrastructure authoring language.',
    ],
  },
  {
    id: 'core-state-stacks',
    title: 'State Model Versus Stack Model',
    paragraphs: [
      'Terraform maintains explicit state as a central operational concept. The state file records the resources Terraform manages and their last known values so Terraform can calculate plans and updates. Remote backends, locking, and state isolation are therefore fundamental operational concerns in Terraform-based teams.',
      'CloudFormation manages infrastructure around stacks. The service itself tracks the deployed stack state, resource relationships, and update lifecycle inside AWS. This means teams do not typically manage a separate explicit state backend in the same way they do with Terraform. Operationally, this can feel simpler because AWS owns more of the machinery.',
      'The tradeoff is conceptual. Terraform gives explicit control over state strategy across many platforms. CloudFormation gives AWS-native lifecycle management for AWS stacks.',
    ],
  },
  {
    id: 'core-plan-changesets',
    title: 'Terraform Plans Versus CloudFormation Change Sets',
    paragraphs: [
      'Terraform is built culturally around `plan` followed by `apply`. The plan is a first-class part of the review model and many teams center CI, approvals, and change governance on inspecting plans before execution.',
      'CloudFormation has Change Sets, which play a similar review role for stack updates. They allow teams to inspect how a stack would change before executing the update. This makes CloudFormation less blind than some engineers assume. The difference is not that Terraform can preview changes and CloudFormation cannot. The difference is that Terraform\'s plan workflow is more central to the tool\'s overall identity.',
      'If your organization treats planned infrastructure diffs as a ritualized review artifact, Terraform often feels more natural. If AWS-native stack updates with Change Sets are sufficient, CloudFormation may be entirely adequate.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Provider Ecosystem Versus AWS Service Alignment',
    paragraphs: [
      'Terraform has one of the broadest infrastructure provider ecosystems in the industry. That matters because even AWS-centric teams often also need GitHub, Datadog, Cloudflare, PagerDuty, Kubernetes, SaaS identity platforms, and many other services under the same automation umbrella.',
      'CloudFormation is strongest when the problem is specifically AWS infrastructure and adjacent AWS-native services. Its tight alignment with AWS means it benefits from first-party service semantics and AWS-specific operational patterns. But it does not aim to be the one common layer across every infrastructure or SaaS domain in the way Terraform does.',
    ],
  },
  {
    id: 'core-reuse',
    title: 'Modules Versus Nested Stacks',
    paragraphs: [
      'Terraform reuses infrastructure through modules. Modules are one of Terraform\'s strongest design tools because they let teams package resource patterns behind clear input and output interfaces. Versioning and registry usage can further standardize module adoption across an organization.',
      'CloudFormation reuses through nested stacks and other AWS ecosystem patterns. Nested stacks can help organize large deployments into composable stack units, but many teams find Terraform modules easier to reason about as reusable infrastructure building blocks than deeply nested template hierarchies.',
      'This is not an absolute rule, but it is a recurring practical preference: Terraform modules often feel like a more ergonomic reuse model than large nested CloudFormation template systems.',
    ],
  },
  {
    id: 'core-stacksets',
    title: 'StackSets and Multi-Account AWS Rollout',
    paragraphs: [
      'CloudFormation has a significant native advantage in one specific AWS-centric pattern: StackSets. StackSets let teams deploy stacks across multiple AWS accounts and regions using AWS-native organizational rollout patterns. In large AWS organizations, this can be strategically important.',
      'Terraform can absolutely manage multi-account AWS environments, but it does so through its own workspace, provider aliasing, module, and orchestration conventions rather than through AWS-native StackSet semantics. If account-spanning AWS-native rollout is central to your operating model, CloudFormation becomes more attractive.',
    ],
  },
  {
    id: 'core-drift',
    title: 'Drift Detection and Operational Visibility',
    paragraphs: [
      'CloudFormation includes drift detection as part of its AWS-native stack management capabilities. This is valuable in environments where console changes or out-of-band automation can introduce divergence between templates and deployed infrastructure.',
      'Terraform also deals with drift, but it approaches the problem through refresh and planning against state rather than through the exact same service-native model CloudFormation uses. Operationally, Terraform drift reasoning is often centered on the state file and plan results rather than on stack-native AWS service views.',
      'Neither tool eliminates drift. The difference is whether the operational vocabulary around drift lives in Terraform state and plans or in AWS stack management.',
    ],
  },
  {
    id: 'core-governance',
    title: 'Governance, IAM, and AWS Native Integration',
    paragraphs: [
      'CloudFormation is deeply embedded in AWS operational and security models. That matters for teams whose governance lives primarily inside IAM, Organizations, account boundaries, and AWS-native service workflows. It can feel operationally clean to stay within one vendor\'s first-party model.',
      'Terraform can also be governed very effectively, but its governance model is often more tool-centric and platform-team-centric rather than AWS-service-native. This can be better or worse depending on whether the organization wants cloud governance to be vendor-neutral or AWS-specific.',
    ],
  },
  {
    id: 'core-ci',
    title: 'CI, Review, and Workflow Design',
    paragraphs: [
      'Terraform pipelines are widely standardized: format, validate, plan, review, apply. This shared industry rhythm is one of Terraform\'s biggest organizational advantages. It is easy to hire for, easy to document, and supported by a large amount of existing tooling and practice.',
      'CloudFormation pipelines often revolve around linting or validation, template packaging as needed, change set creation, review, and stack execution. This can be entirely workable, especially in AWS-first organizations, but the surrounding ecosystem conventions are narrower because the tool is focused on one platform.',
    ],
  },
  {
    id: 'core-cognitive-load',
    title: 'Cognitive Load and Readability',
    paragraphs: [
      'Terraform often wins the readability argument for many teams because HCL is more purpose-built for infrastructure than large YAML or JSON documents full of intrinsic functions. This is especially noticeable once templates become large and cross-resource relationships become dense.',
      'CloudFormation can still be very manageable in disciplined teams, but the template language often feels more syntactic and more verbose, particularly when sophisticated conditions, references, and nested structures accumulate. Teams who spend a lot of time reading IaC in code reviews often feel this difference sharply.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration and Strategic Lock-In',
    paragraphs: [
      'Moving from CloudFormation to Terraform is usually justified when an organization wants a broader infrastructure language across many providers or simply finds Terraform modules and HCL more maintainable than large CloudFormation templates. The move is not free, because stack structure, deployment workflows, and operational habits must change.',
      'Staying on CloudFormation is often the disciplined choice when the organization is AWS-only, strongly invested in AWS-native governance, and not suffering meaningful pain from the template model. The right answer depends on whether vendor alignment or cross-platform standardization is the more durable strategic need.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Structure',
    paragraphs: [
      'Terraform often fits platform teams, multi-cloud organizations, and companies that want one shared IaC language across many internal groups. It also fits teams that value the broader ecosystem and want to avoid rewriting infrastructure practices around each provider separately.',
      'CloudFormation often fits AWS platform teams, security-conscious AWS-native organizations, and teams whose infrastructure governance is already deeply coupled to AWS organizations, IAM, and service-native operational models.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One common misconception is that CloudFormation is only relevant if you do not know Terraform. That is wrong. CloudFormation can be the right strategic choice in highly AWS-native environments. Another misconception is that Terraform is automatically overkill for AWS-only teams. That is also wrong. Many AWS-only teams still prefer Terraform ergonomics and modules enough to justify it.',
      'The mature framing is not vendor-neutral good versus vendor-native bad. It is cross-platform standardization versus first-party platform alignment.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-terraform-resource',
    title: 'Basic Terraform AWS Resource',
    description: [
      'Terraform uses HCL resources and providers to describe AWS infrastructure in a cloud-agnostic workflow model.',
    ],
    code: `resource "aws_s3_bucket" "logs" {
  bucket = "company-logs-prod"

  tags = {
    Environment = "prod"
    ManagedBy   = "terraform"
  }
}`,
    notes: [
      'The syntax is concise and infrastructure-focused.',
      'This code fits naturally into Terraform\'s provider, module, and plan workflow across many infrastructure domains.',
    ],
  },
  {
    id: 'examples-cloudformation-resource',
    title: 'Basic CloudFormation AWS Resource',
    description: [
      'CloudFormation represents AWS infrastructure as template resources inside a stack definition, typically in YAML or JSON.',
    ],
    code: `Resources:
  LogsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: company-logs-prod
      Tags:
        - Key: Environment
          Value: prod
        - Key: ManagedBy
          Value: cloudformation`,
    notes: [
      'This is deeply aligned with AWS resource type semantics.',
      'The template is native to AWS stack workflows and change-set review.',
    ],
  },
  {
    id: 'examples-reuse',
    title: 'Reuse Model Comparison',
    description: [
      'The reuse story is one of the biggest practical differences in how large organizations structure IaC.',
    ],
    code: `Terraform mindset:
  create reusable modules
  expose variables and outputs
  version modules centrally
  use one module pattern across providers

CloudFormation mindset:
  create nested stacks
  organize templates by deployment domain
  use StackSets for broad AWS rollout
  stay close to AWS-native stack semantics`,
    notes: [
      'Terraform modules often feel more ergonomic for broad reuse.',
      'CloudFormation nested stacks fit naturally when the organization thinks in AWS stack boundaries.',
    ],
  },
  {
    id: 'examples-review',
    title: 'Review Workflow Comparison',
    description: [
      'Both tools support preview-oriented review, but the surrounding operational rhythm feels different.',
    ],
    code: `Terraform workflow:
  plan
  inspect diff
  approve
  apply

CloudFormation workflow:
  create change set
  inspect changes
  approve
  execute stack update`,
    notes: [
      'Terraform plan review is one of the tool\'s strongest cultural defaults.',
      'CloudFormation change sets provide a comparable review checkpoint inside AWS-native stack operations.',
    ],
  },
  {
    id: 'examples-selection',
    title: 'Selection Heuristic',
    description: [
      'These rules are usually more useful than generic arguments about which IaC tool is superior.',
    ],
    code: `Choose Terraform when:
  infrastructure extends beyond AWS
  one common IaC language matters
  HCL ergonomics are preferred
  provider ecosystem breadth is important

Choose CloudFormation when:
  AWS is the real platform center
  first-party integration matters most
  StackSets and stack-native governance matter
  external IaC dependencies should be minimized`,
    notes: [
      'This heuristic fits many real enterprise decisions.',
      'The answer usually depends on organizational scope more than on raw AWS resource parity.',
    ],
  },
  {
    id: 'examples-drift',
    title: 'Drift and Operations Lens',
    description: [
      'Operational thinking often sounds different in Terraform and CloudFormation even when the real underlying problem is the same.',
    ],
    code: `Terraform operators ask:
  what does state say?
  what does plan show?
  what changed outside Terraform?

CloudFormation operators ask:
  what does the stack show?
  what does drift detection report?
  what will the change set modify?`,
    notes: [
      'The operational vocabulary shapes team habits.',
      'Choose the vocabulary that fits the way your organization already reasons about infrastructure change.',
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
          'HashiCorp Configuration Language, the infrastructure language used by Terraform.',
      },
      {
        term: 'Provider',
        definition:
          'A plugin that lets Terraform manage a specific cloud or service API.',
      },
      {
        term: 'Module',
        definition:
          'A reusable package of Terraform configuration with inputs and outputs.',
      },
      {
        term: 'State',
        definition:
          'Terraform\'s record of managed resources and their last known attributes.',
      },
      {
        term: 'Plan',
        definition:
          'A preview of the changes Terraform intends to make during apply.',
      },
      {
        term: 'Backend',
        definition:
          'The storage mechanism for Terraform state, such as local or remote backends.',
      },
    ],
  },
  {
    id: 'glossary-cloudformation',
    title: 'CloudFormation Terms',
    terms: [
      {
        term: 'Stack',
        definition:
          'A deployed CloudFormation unit containing resources managed together by AWS.',
      },
      {
        term: 'Template',
        definition:
          'A JSON or YAML document describing AWS resources and related configuration for a CloudFormation stack.',
      },
      {
        term: 'Change Set',
        definition:
          'A preview of how a CloudFormation stack would change before executing the update.',
      },
      {
        term: 'Drift Detection',
        definition:
          'A CloudFormation capability for detecting whether actual resources have diverged from the stack template.',
      },
      {
        term: 'Nested Stack',
        definition:
          'A stack referenced from another stack to help break large templates into smaller units.',
      },
      {
        term: 'StackSet',
        definition:
          'A CloudFormation feature for deploying stacks across multiple AWS accounts and regions.',
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
          'Managing infrastructure through versioned code and automated execution rather than manual console work.',
      },
      {
        term: 'Desired State',
        definition:
          'The target resource configuration the IaC system aims to converge toward.',
      },
      {
        term: 'Drift',
        definition:
          'A mismatch between declared infrastructure and the actual deployed environment.',
      },
      {
        term: 'Idempotence',
        definition:
          'The property that repeated application of the same intended infrastructure should converge without unintended repeated changes.',
      },
      {
        term: 'Governance',
        definition:
          'The policies, permissions, and review controls applied to infrastructure changes.',
      },
      {
        term: 'Multi-Cloud',
        definition:
          'An environment where infrastructure spans more than one major cloud provider or platform domain.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-terraform-fits', label: 'When Terraform Fits' },
    { id: 'bp-when-cloudformation-fits', label: 'When CloudFormation Fits' },
    { id: 'bp-shared-strengths', label: 'Shared Strengths' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-language-model', label: 'Language Model' },
    { id: 'core-state-stacks', label: 'State Versus Stack Model' },
    { id: 'core-plan-changesets', label: 'Plan Versus Change Sets' },
    { id: 'core-ecosystem', label: 'Ecosystem and Service Alignment' },
    { id: 'core-reuse', label: 'Modules Versus Nested Stacks' },
    { id: 'core-stacksets', label: 'StackSets and Multi-Account AWS' },
    { id: 'core-drift', label: 'Drift Detection and Operations' },
    { id: 'core-governance', label: 'Governance and AWS Integration' },
    { id: 'core-ci', label: 'CI and Review Workflow' },
    { id: 'core-cognitive-load', label: 'Cognitive Load and Readability' },
    { id: 'core-migration', label: 'Migration and Lock-In' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-terraform-resource', label: 'Basic Terraform AWS Resource' },
    { id: 'examples-cloudformation-resource', label: 'Basic CloudFormation Resource' },
    { id: 'examples-reuse', label: 'Reuse Model Comparison' },
    { id: 'examples-review', label: 'Review Workflow Comparison' },
    { id: 'examples-selection', label: 'Selection Heuristic' },
    { id: 'examples-drift', label: 'Drift and Operations Lens' },
  ],
  glossary: [
    { id: 'glossary-terraform', label: 'Terraform Terms' },
    { id: 'glossary-cloudformation', label: 'CloudFormation Terms' },
    { id: 'glossary-shared', label: 'Shared IaC Terms' },
  ],
}

const pageStyles = `
.tf-cfn-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.tf-cfn-help-window {
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

.tf-cfn-help-titlebar {
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

.tf-cfn-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.tf-cfn-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.tf-cfn-help-control {
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

.tf-cfn-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.tf-cfn-help-tab {
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

.tf-cfn-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.tf-cfn-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.tf-cfn-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.tf-cfn-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.tf-cfn-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tf-cfn-help-toc-item {
  margin: 0 0 8px;
}

.tf-cfn-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.tf-cfn-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.tf-cfn-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.tf-cfn-help-section {
  margin: 0 0 20px;
}

.tf-cfn-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.tf-cfn-help-content p,
.tf-cfn-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.tf-cfn-help-content p {
  margin: 0 0 10px;
}

.tf-cfn-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.tf-cfn-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.tf-cfn-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.tf-cfn-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .tf-cfn-help-main {
    grid-template-columns: 1fr;
  }

  .tf-cfn-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .tf-cfn-help-window {
    min-height: auto;
  }

  .tf-cfn-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .tf-cfn-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .tf-cfn-help-controls {
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
    <section key={section.id} id={section.id} className="tf-cfn-help-section">
      <h2 className="tf-cfn-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="tf-cfn-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tf-cfn-help-section">
      <h2 className="tf-cfn-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="tf-cfn-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="tf-cfn-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tf-cfn-help-section">
      <h2 className="tf-cfn-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="tf-cfn-help-divider" />}
    </section>
  )
}

export default function TerraformVsCloudFormationPage(): JSX.Element {
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
    document.title = `Terraform vs CloudFormation (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Terraform vs CloudFormation',
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
    <div className="tf-cfn-help-page">
      <style>{pageStyles}</style>
      <div className="tf-cfn-help-window" role="presentation">
        <header className="tf-cfn-help-titlebar">
          <span className="tf-cfn-help-titletext">Terraform vs CloudFormation</span>
          <div className="tf-cfn-help-controls">
            <button
              className="tf-cfn-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="tf-cfn-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="tf-cfn-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tf-cfn-help-tab ${activeTab === tab.id ? 'tf-cfn-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tf-cfn-help-main">
          <aside className="tf-cfn-help-toc" aria-label="Table of contents">
            <h2 className="tf-cfn-help-toc-title">Contents</h2>
            <ul className="tf-cfn-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="tf-cfn-help-toc-item">
                  <a href={`#${section.id}`} className="tf-cfn-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="tf-cfn-help-content">
            <h1 className="tf-cfn-help-doc-title">Terraform vs CloudFormation</h1>
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
