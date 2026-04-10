import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const PAGE_TITLE = 'Fastlane and Mobile CI-CD'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Fastlane and mobile CI-CD refer to the automation layer that turns source code into signed, testable, reviewable, and distributable mobile artifacts with repeatable steps instead of manual clicking. In practice this usually means build orchestration, signing management, environment setup, test execution, versioning, store upload, beta distribution, and release-notes automation tied together through Fastlane and a CI system.',
  'The useful mental model is that Fastlane is not the pipeline by itself. Fastlane is an automation toolkit and workflow layer that often sits inside a broader CI-CD system such as GitHub Actions, Bitrise, GitLab CI, Jenkins, Azure DevOps, or other runners. The pipeline includes triggers, secrets, caching, concurrency control, artifact retention, and environment management around those Fastlane commands.',
  'This page focuses on Fastlane and mobile CI-CD as operational engineering systems. It covers what Fastlane automates, how CI and CD differ in mobile delivery, signing and secret management, build reproducibility, lanes and environment design, beta and store submission flows, testing strategy, failure handling, examples, and the vocabulary that shows up when teams are shipping mobile apps continuously but safely.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Mobile CI-CD is the automated pipeline that builds, tests, signs, packages, distributes, and sometimes submits mobile app artifacts. Fastlane is a common tool for expressing the mobile-specific parts of that workflow, especially around iOS and Android release tasks that would otherwise require brittle manual steps in Xcode, App Store Connect, Play Console, or signing tools.',
      'This matters because mobile release work is operationally heavier than ordinary web deployment. A mobile binary must be compiled with the right SDKs, signed with the right credentials, packaged with the correct versioning, tested on credible environments, and often pushed through store or beta channels that impose their own state transitions. Fastlane and CI-CD exist to make that process repeatable.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters',
    paragraphs: [
      'Fastlane and CI-CD matter because manual mobile release processes do not scale. A team that increments versions by hand, exports archives locally, drags files into portals, copies release notes from chat, and manages signing ad hoc will eventually ship the wrong build, lose traceability, or turn releases into risky rituals.',
      'Automation reduces those risks. It makes builds reproducible, encodes release rules in version-controlled configuration, shortens feedback loops for test failures, and creates clearer ownership around what happened, when, and from which commit. That is especially important in mobile because shipping a broken binary can take much longer to fix than shipping a broken web deploy.',
    ],
    bullets: [
      'Reduces manual release mistakes.',
      'Improves reproducibility and traceability.',
      'Shortens feedback loops for build and test failures.',
      'Turns release knowledge into code instead of tribal memory.',
    ],
  },
  {
    id: 'bp-ci-vs-cd',
    title: 'CI vs CD in Mobile Context',
    paragraphs: [
      'Continuous integration in mobile usually means every meaningful change triggers validation such as dependency resolution, linting, unit tests, build checks, and sometimes simulator or emulator UI tests. The goal is to keep the codebase continuously buildable and to surface integration problems early.',
      'Continuous delivery in mobile means taking those validated artifacts further into beta channels, internal distribution, store submission, or release-ready packaging. Mobile CD is rarely the same as instant production deployment because store review, signing rules, release windows, and staged rollouts introduce additional checkpoints.',
    ],
  },
  {
    id: 'bp-fastlane-role',
    title: 'What Fastlane Actually Does',
    paragraphs: [
      'Fastlane provides actions and lanes for common mobile automation tasks such as building with gym or gradle, signing with match, uploading betas with pilot, pushing screenshots and metadata with deliver or supply-style equivalents, incrementing versions, running tests, and coordinating release flows in a readable Ruby-based configuration layer.',
      'Its real value is not just the commands. It provides a stable vocabulary for mobile release steps that would otherwise be scattered across shell scripts, local machines, and partially documented tribal processes. When used well, Fastlane becomes the mobile-release DSL inside the larger CI pipeline.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where It Fits Best',
    paragraphs: [
      'Fastlane and mobile CI-CD fit best in teams that ship repeatedly, have multiple contributors, need beta or store distribution cadence, or support more than one environment or platform flavor. Even small teams benefit once releases stop being rare one-person events.',
      'They are especially valuable when iOS and Android releases need coordinated versioning, shared release notes, artifact retention, and predictable secrets handling across runners. The larger the release surface, the more valuable pipeline discipline becomes.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Fastlane and mobile CI-CD should be understood as a release system, not a convenience script. The point is to encode how the team safely turns commits into mobile artifacts and store actions.',
      'The strongest pipelines are reproducible, secrets-safe, environment-aware, and explicit about human approval boundaries. Automation should reduce risk, not hide risky steps behind one button.',
    ],
    bullets: [
      'Treat release automation as production infrastructure.',
      'Fastlane is a workflow layer inside a broader pipeline.',
      'Signing and secrets are central, not peripheral.',
      'Good automation clarifies release ownership instead of obscuring it.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-pipeline-shape',
    title: 'Pipeline Shape and Triggers',
    paragraphs: [
      'A healthy mobile pipeline has clear entry points: pull requests for validation, merges to main for artifact creation, release branches or tags for beta or production distribution, and sometimes manual triggers for controlled store submission. The trigger model should match release governance rather than just whatever the CI vendor makes easiest.',
      'This matters because mobile artifacts are heavier and slower than many server builds. Teams need to decide which jobs always run, which jobs are conditional, which jobs block merges, and which jobs require manual approval before distribution. Pipeline shape is an operational policy decision, not just YAML syntax.',
    ],
  },
  {
    id: 'core-lanes',
    title: 'Fastlane Lanes and Responsibility Boundaries',
    paragraphs: [
      'Fastlane lanes should represent meaningful release workflows, not random command bundles. A lane might mean build a debug beta, run iOS tests, submit to TestFlight, publish metadata, or create a signed Android release bundle. The lane name should communicate release intent clearly.',
      'Good lane design avoids giant do-everything lanes. Smaller lanes are easier to reason about, compose, and debug. They also make it clearer which steps belong in CI for every commit versus which steps belong only in release workflows.',
    ],
    bullets: [
      'Name lanes by outcome, not by implementation trivia.',
      'Prefer composable lanes over giant monolithic release scripts.',
      'Keep build, test, and submission boundaries explicit.',
      'Treat lanes as release contracts the team can understand quickly.',
    ],
  },
  {
    id: 'core-signing',
    title: 'Signing, Provisioning, and Credential Management',
    paragraphs: [
      'Signing is one of the hardest parts of mobile automation because it crosses cryptographic material, store identities, team permissions, CI secrets, and platform-specific tooling. On iOS this often means certificates, provisioning profiles, App Store Connect credentials, and keychain setup. On Android it often means keystore management, upload keys, and Play-related service credentials.',
      'Fastlane helps here through tools like match and through conventions around environment-driven secret injection, but no tool removes the need for careful credential governance. The pipeline should make signing reliable and auditable without spraying sensitive material across developer laptops or unbounded CI jobs.',
    ],
    bullets: [
      'Centralize signing materials and access policies.',
      'Never assume local-machine signing state is reproducible in CI.',
      'Separate platform identities from day-to-day code changes.',
      'Credential handling is a release-security concern, not just setup overhead.',
    ],
  },
  {
    id: 'core-secrets-env',
    title: 'Secrets, Environments, and Configuration Drift',
    paragraphs: [
      'CI systems need secrets for stores, signing, APIs, and distribution accounts. They also need environment-specific configuration for staging, QA, beta, and production variants. A mature pipeline keeps those concerns explicit so the same commit can be built in different contexts without accidental cross-environment contamination.',
      'This matters because many mobile release incidents are really environment incidents: wrong API base URL, wrong bundle identifier flavor, wrong provisioning target, wrong service account, or wrong release notes attached to the wrong environment. Pipelines should make these boundaries obvious.',
    ],
  },
  {
    id: 'core-reproducibility',
    title: 'Reproducible Builds and Deterministic Inputs',
    paragraphs: [
      'A reliable mobile pipeline uses pinned dependencies, controlled tool versions, stable runner images, and explicit build settings. The goal is that the same commit and same pipeline inputs produce the same effective release artifact or fail predictably for a known reason.',
      'This is especially important in mobile because native toolchains change over time. Xcode versions, SDK changes, CocoaPods or Swift Package resolution, Gradle plugin updates, and signing environment differences can all turn a previously green pipeline red if the inputs are not controlled.',
    ],
    bullets: [
      'Pin tool and dependency versions where practical.',
      'Use CI images that match supported build environments intentionally.',
      'Keep local and CI assumptions aligned as much as possible.',
      'A release pipeline should fail for explainable reasons, not ambient machine drift.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Strategy Inside the Pipeline',
    paragraphs: [
      'Not every test belongs in every job. Mobile pipelines need a sensible split between fast validation on every change and slower acceptance or device-driven checks on narrower triggers. Unit tests, lint, and static checks usually run often. Simulator or emulator UI tests, screenshot comparisons, or device-matrix jobs may run on merge, nightly, or release candidates.',
      'The key point is risk alignment. A pipeline that runs too little provides false confidence. A pipeline that runs everything all the time becomes slow enough that developers stop respecting it. Strong teams choose a testing mix that matches failure cost and developer workflow.',
    ],
  },
  {
    id: 'core-beta-distribution',
    title: 'Beta Distribution and Internal Release Flows',
    paragraphs: [
      'A major use of Fastlane is pushing builds to internal testing or beta channels such as TestFlight, Play internal tracks, or other artifact distribution systems. This is often where CI stops being only validation and starts becoming delivery infrastructure.',
      'The operational value is that every beta build can be traceable to a commit, branch, lane, release notes set, and environment. That traceability is critical when testers report issues against pre-release builds or when teams need to compare candidate builds quickly.',
    ],
  },
  {
    id: 'core-store-submission',
    title: 'Store Submission and Metadata Automation',
    paragraphs: [
      'Fastlane can automate not only builds but also submission-adjacent work such as uploading binaries, syncing screenshots, updating metadata, attaching changelogs, or pushing builds into review workflows. This reduces repetitive console work, but it also raises the bar for correctness because automation can perform the wrong action very efficiently if lane boundaries are sloppy.',
      'That is why store submission jobs often deserve stronger approval boundaries than build jobs. A team may want automatic beta uploads but manual production submission approval, even if the implementation uses the same underlying automation toolkit.',
    ],
  },
  {
    id: 'core-artifacts',
    title: 'Artifacts, Logs, and Release Traceability',
    paragraphs: [
      'A good mobile pipeline preserves useful artifacts: signed binaries, symbol files, test reports, screenshots, logs, and metadata snapshots where relevant. When a release fails or a tester reports a bug, the team should be able to inspect what exactly was produced without reconstructing the release from memory.',
      'This is where CI-CD becomes operational infrastructure. Artifact retention and logging are not nice extras. They are part of how the team debugs failures, verifies provenance, and maintains confidence in what actually shipped.',
    ],
  },
  {
    id: 'core-failure-handling',
    title: 'Failure Handling, Rollback, and Human Approval',
    paragraphs: [
      'Automation should make failure visible early and stop unsafe actions automatically. If signing fails, tests regress, or a release lane targets the wrong environment, the pipeline should fail loudly. Good mobile automation is conservative about actions that are hard to undo, especially public store submissions.',
      'Human approval still matters in many mobile release systems. Store submission, production rollout, metadata changes, and credential rotation are often safer with explicit approval boundaries. CI-CD should remove repetitive manual work, not eliminate human judgment where release risk is high.',
    ],
    bullets: [
      'Fail fast on unsafe or inconsistent release state.',
      'Keep strong approval boundaries for irreversible actions.',
      'Design for rollback or safe halt, not only straight-line success.',
      'Automation should surface problems, not bury them under abstraction.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-fastfile-lane',
    title: 'Simple Fastlane Beta Lane',
    description: [
      'A lane should express a meaningful workflow. This example shows a basic iOS beta lane that increments a build number, builds the app, and uploads it to TestFlight.',
      'The important part is not the exact commands. It is that the lane name communicates release intent clearly and ties several mobile-specific steps into one repeatable unit.',
    ],
    code: `lane :beta do
  increment_build_number
  build_app(scheme: "MyApp")
  upload_to_testflight(skip_waiting_for_build_processing: true)
end`,
    notes: [
      'Lanes should encode real workflows the team recognizes.',
      'Build numbering and distribution often belong in the same release lane.',
      'Avoid packing unrelated production actions into a beta lane.',
    ],
  },
  {
    id: 'examples-match',
    title: 'Use Match for Shared Signing Material',
    description: [
      'One recurring release problem is signing material living only on one developer machine. Match is commonly used to centralize iOS certificates and provisioning profiles in a controlled shared store so CI and teammates can reproduce signing state.',
      'This example shows the basic shape of a match invocation in a lane.',
    ],
    code: `lane :certs do
  match(type: "appstore", readonly: true)
end`,
    notes: [
      'Centralized signing reduces machine-specific release fragility.',
      'Readonly mode is useful in CI to avoid accidental credential mutation.',
      'Signing automation still requires strong secret governance around the backing store.',
    ],
  },
  {
    id: 'examples-github-actions',
    title: 'Fastlane Inside a CI Job',
    description: [
      'Fastlane usually runs inside a broader CI system. This example shows the shape of a GitHub Actions job that checks out code, sets up Ruby, installs dependencies, and runs a named lane.',
      'The point is that CI handles orchestration and environment, while Fastlane handles the mobile workflow steps.',
    ],
    code: `jobs:
  ios-beta:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
      - run: bundle install
      - run: bundle exec fastlane beta`,
    notes: [
      'CI and Fastlane have different responsibilities and should stay conceptually separate.',
      'The runner image and toolchain version should be chosen intentionally.',
      'Secrets and signing material need to be injected safely around this job.',
    ],
  },
  {
    id: 'examples-android-build',
    title: 'Android Release Lane Shape',
    description: [
      'Fastlane is not only for iOS. Android release automation often includes Gradle builds, version updates, signing-aware artifact generation, and pushing bundles to internal or production tracks.',
      'This example shows the shape of a straightforward Android release lane.',
    ],
    code: `lane :android_beta do
  gradle(task: "clean assembleRelease")
  upload_to_play_store(track: "internal")
end`,
    notes: [
      'Android automation still needs signing and credential discipline.',
      'Track targeting should be explicit so the wrong audience is not reached.',
      'A lane name should communicate distribution intent clearly.',
    ],
  },
  {
    id: 'examples-release-policy',
    title: 'Simple Release Policy Checklist',
    description: [
      'A pipeline is healthier when release policy is explicit. The code below is not executable code so much as the shape of a rule set a team should encode into its automation and approvals.',
      'This kind of checklist often prevents more incidents than adding another clever lane helper.',
    ],
    code: `- Pull requests: lint, unit tests, build verification
- Main branch: signed beta artifacts + internal distribution
- Release tag: production candidate build + store metadata sync
- Production submit: manual approval required
- Secrets rotation: separate controlled workflow
- Failed signing or missing env vars: stop immediately`,
    notes: [
      'Release policy should exist independently of any one CI vendor.',
      'Approval rules belong in the pipeline design, not only in team memory.',
      'Explicit failure policy makes automation safer.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-fastlane',
    title: 'Fastlane Terms',
    terms: [
      {
        term: 'Fastlane',
        definition:
          'An automation toolkit for mobile development and release workflows, often used inside broader CI-CD systems.',
      },
      {
        term: 'Lane',
        definition:
          'A named Fastlane workflow that bundles mobile automation steps into a meaningful release action.',
      },
      {
        term: 'match',
        definition:
          'A Fastlane tool commonly used to centralize and synchronize iOS signing certificates and provisioning profiles.',
      },
      {
        term: 'gym',
        definition: 'A Fastlane build action commonly used to archive and package iOS apps.',
      },
      {
        term: 'pilot',
        definition:
          'A Fastlane tool commonly used to upload and manage TestFlight beta distribution workflows.',
      },
      {
        term: 'deliver',
        definition:
          'A Fastlane tool commonly used to upload App Store metadata and submission-related assets.',
      },
    ],
  },
  {
    id: 'glossary-pipeline',
    title: 'Pipeline Terms',
    terms: [
      {
        term: 'CI',
        definition:
          'Continuous integration, the practice of automatically validating code changes through builds and tests as changes are integrated.',
      },
      {
        term: 'CD',
        definition:
          'Continuous delivery or deployment, the practice of automating artifact distribution and release workflows beyond basic validation.',
      },
      {
        term: 'Runner',
        definition:
          'The CI execution environment where pipeline jobs run, such as a macOS or Linux build machine.',
      },
      {
        term: 'Artifact',
        definition:
          'A build output or related file retained by the pipeline, such as an IPA, AAB, dSYM, log bundle, or test report.',
      },
      {
        term: 'Release candidate',
        definition:
          'A build believed to be production-worthy and pushed through higher-confidence validation or approval steps.',
      },
      {
        term: 'Approval gate',
        definition:
          'A manual or policy-based checkpoint that must be satisfied before a sensitive release action proceeds.',
      },
    ],
  },
  {
    id: 'glossary-release',
    title: 'Release Operations Terms',
    terms: [
      {
        term: 'Provisioning profile',
        definition:
          'An Apple signing artifact that ties app identity, certificates, and device or distribution authorization together.',
      },
      {
        term: 'Keystore',
        definition: 'An Android signing container used to sign release artifacts or upload keys.',
      },
      {
        term: 'Reproducible build',
        definition:
          'A build produced from controlled inputs so that results are consistent and explainable across environments.',
      },
      {
        term: 'Environment drift',
        definition:
          'The divergence between expected and actual toolchain or configuration state across developer machines and CI.',
      },
      {
        term: 'Beta distribution',
        definition:
          'The controlled release of pre-production builds to internal teams or external testers through channels like TestFlight or Play internal tracks.',
      },
      {
        term: 'Secrets management',
        definition:
          'The controlled storage and injection of credentials, signing material, and tokens needed by the release pipeline.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="fastlane-help98-section">
      <h2 className="fastlane-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="fastlane-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="fastlane-help98-section">
      <h2 className="fastlane-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="fastlane-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="fastlane-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="fastlane-help98-section">
      <h2 className="fastlane-help98-heading">{section.title}</h2>
      <dl className="fastlane-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="fastlane-help98-divider" /> : null}
    </section>
  )
}

export default function FastlaneAndMobileCiCdPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Fastlane And Mobile Ci Cd Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Fastlane And Mobile Ci Cd Page"
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
    </TopicPageShell>
  )
}
