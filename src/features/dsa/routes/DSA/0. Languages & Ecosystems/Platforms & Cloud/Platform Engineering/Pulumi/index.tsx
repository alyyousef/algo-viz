import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type SectionNote = { title: string; details: string; notes: string }
type NarrativeSection = { id: string; title: string; paragraphs: string[] }
type ExampleSection = { id: string; title: string; code: string; explanation: string }
type GlossaryTerm = { term: string; definition: string }

const introParagraphs = [
  'Pulumi is infrastructure as code built around general-purpose programming languages rather than only a domain-specific configuration language. Teams define infrastructure with TypeScript, Python, Go, C#, or Java and let Pulumi evaluate, diff, and deploy the resulting resource graph.',
  'That is not only a syntax preference. It changes how a platform team models reusable abstractions, packages shared infrastructure logic, organizes state, handles configuration and secrets, and integrates infrastructure workflows with normal software engineering practices.',
  'This page focuses on Pulumi as a platform-engineering tool: the resource model, stacks and state, components and internal APIs, provider usage, Automation API, delivery workflows, and the tradeoffs that determine whether Pulumi becomes a strong platform layer or just a more powerful scripting surface.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Pulumi is an infrastructure as code platform that uses general-purpose languages to define cloud and platform resources. A Pulumi program describes desired infrastructure, compares it with recorded state, and performs an update plan to converge real systems on that model.',
    notes:
      'The important shift is that infrastructure becomes normal code with functions, types, packages, and tests, but still runs inside an infrastructure management model with previews, state, and dependency tracking.',
  },
  {
    title: 'Why teams adopt it',
    details:
      'Teams adopt Pulumi when they want stronger abstraction power than a DSL usually provides, when they want to publish reusable infrastructure libraries, or when they want application engineers to work with infrastructure using familiar language ecosystems.',
    notes:
      'This can improve reuse and expressiveness, but it also raises the bar for abstraction design because a real language makes both good and bad patterns easier to create.',
  },
  {
    title: 'Where it fits',
    details:
      'Pulumi fits when a team wants infrastructure as code with rich language features, reusable components, typed internal APIs, and integration with ordinary package managers, CI systems, and test tooling.',
    notes:
      'It is especially strong for platform teams that want to ship internal component libraries or wrap infrastructure workflows behind higher-level code interfaces.',
  },
  {
    title: 'What it is not',
    details:
      'Pulumi is not a long-running reconciliation controller, and it is not simply Terraform rewritten in TypeScript. It runs a program, calculates a plan from state, applies updates, and exits.',
    notes:
      'If the need is Kubernetes-native continuous reconciliation or namespaced self-service APIs, Crossplane may be the better fit. If the need is application delivery drift control, a GitOps controller may be the stronger tool.',
  },
]

const keyTakeaways = [
  'Pulumi defines infrastructure with general-purpose languages, not only a declarative DSL.',
  'Stacks and state are central to previews, updates, drift awareness, and environment boundaries.',
  'The strongest Pulumi platforms publish reusable components and typed internal libraries rather than repeat raw provider resources everywhere.',
  'Programming-language power is a real advantage, but it also increases the need for disciplined abstraction design and review.',
  'Pulumi often works best as one layer in a broader platform workflow alongside CI, secrets management, policy enforcement, and deployment governance.',
]

const coreSections: NarrativeSection[] = [
  {
    id: 'core-model',
    title: 'Programming model',
    paragraphs: [
      'A Pulumi program is ordinary code that declares resources through Pulumi providers and libraries. When the program runs, Pulumi tracks those resources, compares them with state, and plans the operations needed to reach the target deployment.',
      'That gives teams access to functions, loops, types, packages, and module boundaries. Those are genuinely useful for infrastructure, especially when a platform team wants to encode repeated patterns or publish internal products.',
      'The tradeoff is that infrastructure can become too clever. The more logic a program contains, the more discipline is required to keep the resulting resource model understandable to reviewers and operators.',
    ],
  },
  {
    id: 'core-io',
    title: 'Resources, inputs, outputs, and dependency flow',
    paragraphs: [
      'Pulumi resources represent desired infrastructure objects from a provider. Inputs describe what a resource needs. Outputs represent values that are not known until deployment time, such as generated identifiers, endpoints, or ARNs.',
      'Understanding outputs is central to Pulumi. Values often flow asynchronously from one resource to another, and code must respect that deployment-time dataflow instead of pretending every value is immediately available.',
      "This is one of Pulumi's biggest conceptual differences from plain application code. The syntax looks ordinary, but many values are deployment-time promises shaped by the resource graph.",
    ],
  },
  {
    id: 'core-stacks',
    title: 'Stacks, state, preview, and refresh',
    paragraphs: [
      "A stack is Pulumi's unit of isolated state and configuration. Teams usually map stacks to environments, tenants, or regions. Good stack design keeps related resources together without creating giant all-or-nothing blast-radius domains.",
      'Pulumi records state so it can calculate diffs between the program and the last known deployed world. Preview shows expected operations. Update applies them. Refresh re-reads live infrastructure so state can be reconciled with reality.',
      'State is not just storage plumbing. It is part of the operational contract. The team needs to know where it lives, how it is protected, how concurrency is handled, and how recovery works after partial failures or manual drift.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration, secrets, and environment shaping',
    paragraphs: [
      'Pulumi supports stack configuration and encrypted secrets so teams can separate stable program logic from environment-specific settings such as regions, image tags, database sizes, or sensitive credentials.',
      'Good configuration design exposes a small, documented surface that matches supported operational choices. Too much config turns the platform into a giant key-value puzzle. Too little config forces unnecessary code forks.',
      'Secrets handling is especially important in shared environments. Teams should know what is encrypted, who can decrypt it, and how those secret values flow into downstream systems.',
    ],
  },
  {
    id: 'core-components',
    title: 'Components and internal platform APIs',
    paragraphs: [
      "One of Pulumi's strongest features is ComponentResource. Components let a platform team package several low-level resources into a higher-level typed abstraction such as a service network, managed database bundle, or standard application environment.",
      'This is where Pulumi becomes more than infrastructure scripting. The platform can publish internal packages that encode defaults, policy assumptions, naming rules, and best practices behind a stable API.',
      'The best Pulumi platforms use components to create clear internal products. The weaker ones expose raw provider objects everywhere and then wonder why the codebase feels verbose but not actually simpler.',
    ],
  },
  {
    id: 'core-automation',
    title: 'Automation API and service-driven workflows',
    paragraphs: [
      'Pulumi Automation API allows stack operations to be embedded inside a larger application or platform service. This is useful for internal developer platforms that want self-service provisioning through a portal or API rather than only a CLI.',
      'Automation API is powerful because it lets the platform wrap Pulumi with approvals, policy checks, tenant logic, and business workflows. It can become the implementation engine behind a developer-facing product.',
      'The tradeoff is that the platform now owns a deployment orchestrator, not just infrastructure code. Reliability, observability, idempotency, concurrency, and credential management become part of the service design.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Delivery workflows, compare and contrast, and pitfalls',
    paragraphs: [
      'Pulumi is usually run from CI pipelines, deployment services, or controlled local workflows rather than as an always-on controller. Mature usage includes previews in review flows, controlled updates, secret-aware runtime setup, and clear promotion rules between environment stacks.',
      'Compared with Terraform, Pulumi offers more expressive abstraction power through general-purpose languages and conventional packaging ecosystems. Compared with Crossplane, it is a deployment-time IaC engine rather than a Kubernetes-native control plane with continuous reconciliation. Compared with raw cloud SDKs, it adds state, preview, diffing, and safer deployment semantics.',
      'Teams get into trouble when they build giant all-purpose Pulumi programs, expose every provider option through internal abstractions, or rely on ad hoc local execution without disciplined preview and state practices. The hard part is stable abstractions, stack boundaries, governance rules, and safe deployment workflows.',
    ],
  },
]

const designChecklist = [
  'Use components and internal libraries to publish platform products rather than repeating raw provider resources everywhere.',
  'Keep stack boundaries small enough for clear ownership and safe updates, but large enough to preserve useful lifecycle grouping.',
  'Document which values are configuration, which are secrets, and which are fixed platform defaults.',
  'Treat previews, refresh, and state recovery as first-class operational practices, not optional cleanup steps.',
  'Be careful with language power: avoid abstractions so dynamic that reviewers cannot predict the resulting resource graph.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-project',
    title: 'Define project metadata and runtime',
    code: `name: platform-network
runtime: nodejs
description: Standard VPC foundation for internal services`,
    explanation:
      'Pulumi projects start with project metadata and a runtime. This defines the package identity for the infrastructure program and the language ecosystem it depends on.',
  },
  {
    id: 'example-stack',
    title: 'Use stack configuration and secrets',
    code: `config:
  aws:region: us-east-1
  platform-network:cidrBlock: 10.42.0.0/16
  platform-network:dbPassword:
    secure: AAABAJ0...`,
    explanation:
      'Stack configuration separates environment-specific settings from program logic. Secrets can be encrypted so sensitive values do not live in plain text while still participating in deployment workflows.',
  },
  {
    id: 'example-program',
    title: 'Declare infrastructure in TypeScript',
    code: `import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const cidrBlock = config.require("cidrBlock");

const vpc = new aws.ec2.Vpc("platform-vpc", {
  cidrBlock,
  enableDnsHostnames: true,
  tags: { environment: pulumi.getStack() },
});

export const vpcId = vpc.id;`,
    explanation:
      'This shows the normal Pulumi flow: read configuration, declare resources in code, and export outputs for downstream consumption or stack references.',
  },
  {
    id: 'example-component',
    title: 'Wrap repeated infrastructure in a component',
    code: `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export class ServiceBucket extends pulumi.ComponentResource {
  public readonly bucketName: pulumi.Output<string>;

  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super("platform:storage:ServiceBucket", name, {}, opts);
    const bucket = new aws.s3.Bucket(name, {}, { parent: this });
    this.bucketName = bucket.bucket;
    this.registerOutputs({ bucketName: this.bucketName });
  }
}`,
    explanation:
      'ComponentResource is the core building block for internal platform APIs in Pulumi. It lets the platform package several low-level resources and defaults behind a typed abstraction.',
  },
  {
    id: 'example-automation',
    title: 'Embed stack execution with Automation API',
    code: `import * as auto from "@pulumi/pulumi/x/automation";

const stack = await auto.LocalWorkspace.createOrSelectStack({
  stackName: "dev",
  projectName: "platform-network",
  program: async () => {
    // declare resources here
  },
});

await stack.setConfig("aws:region", { value: "us-east-1" });
await stack.preview();
await stack.up();`,
    explanation:
      'Automation API lets a platform service wrap Pulumi inside a higher-level workflow. This is useful for self-service internal platforms, but it also means the team owns the reliability and governance of that service layer.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Pulumi',
    definition:
      'An infrastructure as code platform that uses general-purpose languages to define and deploy cloud and platform resources.',
  },
  {
    term: 'Stack',
    definition:
      "Pulumi's unit of isolated state and configuration, often mapped to an environment, tenant, or region.",
  },
  {
    term: 'State',
    definition:
      'The recorded deployment model Pulumi uses to calculate diffs, previews, and updates against real infrastructure.',
  },
  {
    term: 'Preview',
    definition: 'A planned view of changes Pulumi expects to make before an update is applied.',
  },
  {
    term: 'Refresh',
    definition:
      'An operation that re-reads live infrastructure so recorded state can be reconciled with the real world.',
  },
  {
    term: 'Input',
    definition: 'A value supplied to a Pulumi resource when declaring desired infrastructure.',
  },
  {
    term: 'Output',
    definition:
      'A deployment-time value produced by a resource, often used as an input to another resource.',
  },
  {
    term: 'ComponentResource',
    definition:
      'A reusable higher-level abstraction that groups several resources behind a typed Pulumi API.',
  },
  {
    term: 'Provider',
    definition:
      'A Pulumi package that knows how to manage a specific cloud, service, or infrastructure domain.',
  },
  {
    term: 'Automation API',
    definition:
      'A Pulumi interface for embedding stack creation, preview, and update workflows inside another application or service.',
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
    { id: 'core-model', label: 'Programming Model' },
    { id: 'core-io', label: 'Inputs and Outputs' },
    { id: 'core-stacks', label: 'Stacks and State' },
    { id: 'core-config', label: 'Config and Secrets' },
    { id: 'core-components', label: 'Components' },
    { id: 'core-automation', label: 'Automation API' },
    { id: 'core-operations', label: 'Operations and Tradeoffs' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PulumiPlatformEngineeringPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Pulumi',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Pulumi"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Pulumi</h1>
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
              Platform engineering often needs abstractions that are more expressive than plain
              templates but still safer than hand-written cloud SDK automation. Pulumi matters
              because it gives teams a real infrastructure management model with previews, state,
              providers, and dependency tracking while still letting them author that model in
              normal programming languages.
            </p>
            <p>
              It also changes reuse economics. A platform team can ship internal component
              libraries, typed APIs, and shared deployment logic using the same packaging systems
              and code review practices they already apply to software.
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
