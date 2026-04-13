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

const PAGE_TITLE = 'TestFlight'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  "TestFlight is Apple's beta distribution system for iOS, iPadOS, watchOS, tvOS, visionOS, and related Apple-platform application builds before full App Store release. It sits between build creation and public shipment, allowing internal and external testers to install pre-release versions, submit feedback, and validate release candidates through an Apple-managed distribution flow.",
  'The right mental model is not just "invite people to test the app," but "the controlled pre-release distribution and validation stage in Apple\'s release pipeline." TestFlight is where build eligibility, beta review, tester groups, distribution windows, release notes, feedback loops, and operational readiness come together before production publication.',
  'This page is intentionally comprehensive. It covers what TestFlight is, where it fits in the Apple release workflow, internal and external testing, build lifecycle, beta review, tester management, feedback handling, release operations, automation-adjacent workflows, practical tradeoffs, examples, and a glossary for the terms that appear most often in real TestFlight usage.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'TestFlight is the official Apple channel for distributing beta builds to approved testers before a full store release. It is tightly connected to App Store Connect, archive uploads, build processing, beta metadata, tester groups, and eventually App Store submission workflows.',
      'Its main purpose is controlled release validation. Teams use TestFlight to verify product behavior, collect tester feedback, catch release-specific issues, and coordinate staged rollout confidence without publishing directly to the App Store. In practice it becomes a critical part of the shipping pipeline rather than an optional extra.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why TestFlight Matters',
    paragraphs: [
      'TestFlight matters because release confidence on Apple platforms depends on more than local simulator runs or ad hoc device installs. Teams need a repeatable way to distribute builds, validate signing and packaging, organize tester cohorts, capture feedback, and ensure that release candidates behave correctly in near-production conditions.',
      'It also matters because App Store release mistakes are expensive. TestFlight provides a structured place to catch crashes, entitlement issues, onboarding regressions, backend-environment mistakes, feature-flag problems, and UX issues before a build becomes the public version users actually see.',
    ],
    bullets: [
      'Provides official pre-release distribution for Apple apps.',
      'Improves release confidence before App Store publication.',
      'Supports controlled tester segmentation and feedback collection.',
      'Acts as the practical bridge between build creation and production release.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of TestFlight as the managed beta lane of the Apple distribution system. A team creates and uploads a signed archive, Apple processes the build, the build becomes eligible for internal or external testing under the right conditions, and testers receive access through group assignment and distribution metadata.',
      'That means TestFlight is as much an operational system as a product feature. Build processing, review status, tester communication, expiration windows, and environment coordination all matter. A working beta program depends on process quality as much as on code quality.',
    ],
    bullets: [
      'Upload and processing come before tester access.',
      'Internal and external testing behave differently.',
      'Beta distribution is governed by metadata and operational rules.',
      'Release readiness depends on how well the whole system is managed.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where TestFlight Fits Best',
    paragraphs: [
      'TestFlight fits best in any serious Apple app workflow that needs controlled pre-release validation. It is especially useful for teams with QA phases, staged feature validation, product stakeholders, internal dogfooding, external beta programs, enterprise review loops, or release trains that need confidence before store submission.',
      'It is also valuable when the app has meaningful backend dependencies, entitlement-sensitive features, payments, notifications, onboarding flows, or environment toggles that must be validated in a realistic build rather than through purely local development testing.',
    ],
    bullets: [
      'Internal dogfooding and staff validation.',
      'External beta programs with curated tester groups.',
      'Release candidate verification for complex mobile systems.',
      'Builds that need realistic device, environment, and distribution checks.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where TestFlight Is Not the Whole Solution',
    paragraphs: [
      'TestFlight is essential for beta distribution, but it is not a full QA strategy by itself. It does not replace local development testing, automated tests, backend observability, crash reporting pipelines, or disciplined release management. A weak engineering process does not become strong just because builds are distributed through TestFlight.',
      'It is also not a substitute for intentional tester operations. If the wrong users get the wrong build with the wrong expectations and no structured feedback path, the program becomes noisy instead of informative. TestFlight is most effective when paired with clear release goals and tester communication.',
    ],
    bullets: [
      'Not a replacement for automated tests or local validation.',
      'Not a complete QA or release-management system on its own.',
      'Needs disciplined tester operations and feedback triage.',
      'Does not compensate for weak build, signing, or environment practices.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A typical TestFlight workflow starts with creating a release-intended archive in Xcode or CI, uploading it to App Store Connect, waiting for build processing, assigning or approving the build for internal or external groups, and monitoring installation, usage, and feedback during the beta period.',
      'As release maturity grows, teams add beta notes, environment toggles, versioning discipline, rollout groups, QA checklists, triage processes, and go or no-go decision points based on beta behavior. The strongest teams treat TestFlight as an operational checkpoint in the release train rather than just a place where builds happen to land.',
    ],
    bullets: [
      'Create a release-quality archive rather than a casual debug build.',
      'Upload and verify processing status in App Store Connect.',
      'Assign the right tester groups with clear expectations.',
      'Use beta feedback as part of a structured release decision process.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'TestFlight is best understood as the controlled beta-distribution layer of the Apple release pipeline rather than merely a convenience for sharing builds. Its value comes from combining build processing, tester access, feedback collection, and release validation in one Apple-native path.',
      'If a team ships Apple apps seriously, TestFlight should be treated as a first-class operational environment. Clear build discipline, version clarity, tester segmentation, and feedback triage matter more than simply getting a build uploaded successfully.',
    ],
    bullets: [
      'Treat TestFlight as a release stage, not just a distribution shortcut.',
      'Operational discipline matters as much as code quality.',
      'Build processing and tester management are part of the product workflow.',
      'A strong beta program reduces public release surprises.',
    ],
  },
]
const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What TestFlight Actually Is',
    paragraphs: [
      "TestFlight is Apple's managed beta distribution service integrated into App Store Connect. It allows teams to deliver pre-release builds to internal and external testers through Apple-managed install flows rather than through ad hoc local installs or side-channel device provisioning approaches.",
      'This matters because TestFlight is not just an upload bucket. It is part of a governed distribution system with build processing, review states, tester groups, expiration logic, and feedback channels. Understanding that broader system is what turns it from a convenient link into a reliable release practice.',
    ],
  },
  {
    id: 'core-build-lifecycle',
    title: 'Build Lifecycle in TestFlight',
    paragraphs: [
      'A TestFlight build begins as an archive or uploaded build artifact. After upload, Apple processes the build, validates metadata and package structure, and makes it eligible for beta distribution under the correct conditions. Only then can the team start assigning it to tester groups or preparing it for broader external testing.',
      'This lifecycle matters operationally because the upload step is not the end of release prep. Processing delays, metadata mismatches, entitlement changes, export mistakes, or versioning confusion can all block or complicate what looks at first like a successful build submission.',
    ],
    bullets: [
      'Upload is followed by Apple-side processing.',
      'Processing state determines beta availability.',
      'Version and build-number discipline affect release clarity.',
      'A build that uploads is not automatically a build that can be distributed well.',
    ],
  },
  {
    id: 'core-internal-external',
    title: 'Internal vs External Testing',
    paragraphs: [
      'Internal testing is typically the fastest path because it is intended for members of the development organization who have the appropriate access. External testing is broader and more operationally sensitive because it usually involves a larger audience and beta-review considerations before distribution opens up more widely.',
      'This distinction matters because teams often misuse the two channels. Internal testing is ideal for fast iteration and team validation, while external testing is better for broader user feedback or release-candidate confidence. The wrong audience at the wrong stage creates either noise or delay.',
    ],
    bullets: [
      'Internal testing is usually faster and more direct.',
      'External testing supports broader pre-release feedback.',
      'Audience choice should match the release objective.',
      'Testing channel strategy is part of release planning.',
    ],
  },
  {
    id: 'core-beta-review',
    title: 'Beta Review and Eligibility',
    paragraphs: [
      'External TestFlight distribution often depends on Apple beta review. That review is not the same as final App Store review, but it still means external beta access is governed rather than purely self-controlled. Teams should therefore plan for review timing rather than assuming every uploaded build is instantly shareable outside the organization.',
      "The deeper point is that TestFlight is inside Apple's trust and distribution model. A team is operating on Apple's platform, not on a private artifact store. That shapes scheduling, release communication, and the kind of operational buffer a team should keep before a public launch target.",
    ],
    bullets: [
      'External beta distribution may require review-dependent timing.',
      'Beta review is distinct from final App Store review.',
      'Operational schedules should account for review latency and retries.',
      'Distribution rules are part of the release system, not a separate concern.',
    ],
  },
  {
    id: 'core-tester-groups',
    title: 'Tester Groups and Release Segmentation',
    paragraphs: [
      'Tester groups are a practical release-management tool. They let teams distribute different builds or the same build to different audiences such as engineering, QA, stakeholders, pilot customers, or regional cohorts. This makes TestFlight useful not only for broad beta programs but also for controlled staged validation.',
      'Segmentation matters because feedback quality depends heavily on audience fit. A build intended for backend contract verification should not necessarily go to a large design-review audience, and a broad usability beta should not necessarily depend on the same note-taking style as an internal regression pass.',
    ],
    bullets: [
      'Groups are about operational intent, not just convenience.',
      'Different tester cohorts can serve different release questions.',
      'Segmentation reduces noise and improves actionability of feedback.',
      'Group hygiene is part of maintaining a sustainable beta program.',
    ],
  },
  {
    id: 'core-feedback',
    title: 'Feedback, Crash Signals, and Triage',
    paragraphs: [
      'TestFlight provides a feedback path from testers, but feedback is only useful if the receiving team can triage it. Screenshots, reproduction notes, device context, and build references help, but the real operational work is turning scattered reports into release decisions or bug tickets with clear ownership.',
      'The most mature teams combine TestFlight feedback with crash analytics, backend telemetry, feature-flag state, and internal release notes. This matters because a beta program is only valuable when the team can connect tester experience back to a specific build and its known changes.',
    ],
    bullets: [
      'Feedback needs triage, ownership, and release context.',
      'Build identity and release notes improve report usefulness.',
      'Crash data and telemetry should complement subjective tester reports.',
      'A beta program without triage discipline mostly creates noise.',
    ],
  },
  {
    id: 'core-expiration-release',
    title: 'Build Expiration and Release Cadence',
    paragraphs: [
      'TestFlight builds are not perpetual. Beta distribution operates within a time-bounded lifecycle, which means release cadence and tester expectations need to be managed actively. Letting builds expire without a replacement or communication plan creates confusion and can interrupt structured testing efforts.',
      'This is one reason versioning discipline matters. Teams should know which beta build is current, what changed from the previous build, which issues are expected, and when a new build should replace the last one. TestFlight works best when the beta stream feels intentional rather than random.',
    ],
    bullets: [
      'Beta builds operate inside a bounded lifecycle.',
      'Teams need a replacement and communication rhythm.',
      'Version clarity reduces tester confusion and internal ambiguity.',
      'Release cadence is part of beta program design.',
    ],
  },
  {
    id: 'core-versioning-metadata',
    title: 'Versioning, Notes, and Metadata',
    paragraphs: [
      'Version numbers, build numbers, beta descriptions, tester-facing notes, and known-issue context all influence whether a TestFlight program is understandable. Beta distribution is not only about installing bits on a device. It is also about communicating what the build is for, what changed, and what testers should pay attention to.',
      'Good metadata reduces wasted effort. When testers know that a build is focused on onboarding, purchase restoration, or notification behavior, feedback becomes more targeted and more useful. Poorly described betas invite broad but low-signal reactions that are harder to act on.',
    ],
    bullets: [
      'Version clarity is operationally important, not cosmetic.',
      'Tester notes should guide attention intentionally.',
      'Known issues should be communicated so expected defects do not create duplicate noise.',
      'Beta metadata is part of release management.',
    ],
  },
  {
    id: 'core-environments',
    title: 'Environments, Feature Flags, and Backend Coordination',
    paragraphs: [
      'Many TestFlight issues are not purely mobile-client issues. They come from environment mismatches, incomplete backend rollouts, feature-flag misconfiguration, missing content, entitlement assumptions, or staging-production boundary confusion. A build can be technically fine and still fail as a beta experience if the surrounding environment is wrong.',
      'This is why TestFlight should be treated as a system-validation step rather than just an app binary validation step. Teams should know what backend environment the build uses, which flags are enabled, what tester accounts are needed, and how beta-only behavior differs from production behavior.',
    ],
    bullets: [
      'Beta success depends on backend and environment readiness too.',
      'Feature flags and account setup need explicit coordination.',
      'Build notes should reflect environment assumptions clearly.',
      'System validation is usually more realistic than app-only validation.',
    ],
  },
  {
    id: 'core-automation-ops',
    title: 'Automation and Operational Discipline',
    paragraphs: [
      'Although TestFlight is a graphical Apple distribution surface, serious teams rarely manage everything manually. Build creation, upload, release notes generation, changelog assembly, group assignment policies, and release checklists often connect to CI or scripted workflows around the TestFlight step.',
      'The deeper point is that TestFlight should feel like a reliable operational stage, not an artisanal process performed from one machine. Repeatable upload and release routines reduce human error and make it easier to diagnose what changed when a beta release behaves unexpectedly.',
    ],
    bullets: [
      'Manual beta distribution does not scale cleanly for serious teams.',
      'Automation improves consistency around uploads and notes.',
      'The TestFlight step should fit into the broader release pipeline.',
      'Operational repeatability matters more than one-off success.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'TestFlight is powerful, but it introduces its own coordination overhead. Teams can lose time to unclear build naming, expired betas, group confusion, review timing surprises, environment mismatches, and vague feedback that is impossible to reproduce. The platform works best when a beta program is designed rather than improvised.',
      'Another common pitfall is treating TestFlight as the first time the build is taken seriously. If signing, release notes, environment toggles, and archive validation all happen only at the TestFlight step, the beta lane becomes overloaded with basic release hygiene problems that should have been solved earlier in the pipeline.',
    ],
    bullets: [
      'Beta distribution adds operational work that must be owned intentionally.',
      'Unclear build identity creates avoidable confusion fast.',
      'TestFlight should not be the first place release hygiene begins.',
      'The value of the beta depends on the structure around it.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-release-notes',
    title: 'Beta Release Notes Checklist',
    description: [
      'A high-quality TestFlight release is not only a new build. It also includes concise tester-facing notes that explain what changed, what to focus on, and what is already known. That dramatically improves the usefulness of the feedback that comes back.',
      'This example shows the sort of operational note structure that makes beta distribution more actionable.',
    ],
    code: `Build: 2.4.0 (173)
Focus areas:
- New onboarding flow
- Push notification permissions
- Subscription restore path
Known issues:
- Dark mode spacing issue on iPad settings screen
Tester guidance:
- Please verify account creation, logout/login, and push delivery`,
    notes: [
      'Release notes should direct tester attention toward the decision the build is trying to validate.',
      'Known issues reduce duplicate noise and improve trust in the beta process.',
    ],
  },
  {
    id: 'ex-internal-flow',
    title: 'Internal Beta Flow',
    description: [
      'Internal testing is usually the fastest lane for validating release candidates with engineering, QA, product, and internal stakeholders. The main goal is quick signal before a build is exposed more broadly.',
      'This example shows the operational sequence teams often follow.',
    ],
    code: `1. Archive and upload build
2. Wait for processing in App Store Connect
3. Add build to internal tester group
4. Share testing scope in release notes
5. Triage feedback and crash reports
6. Decide whether to promote or replace the build`,
    notes: [
      'Internal testing should answer clear release questions rather than becoming vague general exploration every time.',
      'Short feedback loops are one of the main advantages of internal distribution.',
    ],
  },
  {
    id: 'ex-external-flow',
    title: 'External Beta Readiness Checklist',
    description: [
      'External testing involves more scrutiny, so teams usually apply a stronger readiness filter before promoting a build outside the organization. That includes beta notes, environment stability, support expectations, and known-issue communication.',
      'The checklist below reflects the kind of discipline that keeps external programs useful instead of chaotic.',
    ],
    code: `- Release candidate passes smoke tests on real devices
- Backend environment is ready for the beta audience
- Beta notes are written and versioned
- Known issues are documented
- External group membership is current
- Support or triage owners are assigned
- Rollback or replacement plan exists if major issues appear`,
    notes: [
      'External beta exposure should be intentional because broad noisy betas create support cost quickly.',
      'Treat external testing as a communication event as well as a build event.',
    ],
  },
  {
    id: 'ex-triage-template',
    title: 'Feedback Triage Template',
    description: [
      'TestFlight feedback becomes far more useful when the receiving team triages it consistently. The template below helps connect each report to a concrete build, tester, reproduction path, and ownership decision.',
      'The point is not bureaucracy. It is preserving enough context to turn beta reports into release decisions instead of anecdotes.',
    ],
    code: `Issue title:
Build number:
Tester group:
Device and OS:
Reproduction steps:
Expected behavior:
Observed behavior:
Crash or logs attached:
Severity:
Owner:
Decision: fix now / known issue / defer / cannot reproduce`,
    notes: [
      'Beta programs get noisy quickly when issues are not tied to a specific build and tester context.',
      'A small structured template often improves release operations more than collecting more raw feedback volume.',
    ],
  },
  {
    id: 'ex-go-no-go',
    title: 'Go or No-Go Decision Inputs',
    description: [
      'The final purpose of a beta lane is not just to generate activity. It is to support release decisions. Teams should know what signals actually matter before they decide to ship, delay, or replace a build.',
      'This example lists the kinds of signals that commonly inform a release decision from TestFlight results.',
    ],
    code: `Decision inputs:
- Crash-free behavior across target devices
- Completion of critical user journeys
- Acceptable backend and environment stability
- No unresolved blocker regressions
- Beta feedback volume and severity trend
- Stakeholder signoff where required
- Confidence that release notes and support teams are ready`,
    notes: [
      'A beta build should be judged against explicit release criteria rather than vague feelings of readiness.',
      'The more complex the app, the more valuable it is to make go or no-go signals explicit before the beta starts.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-distribution',
    title: 'Distribution Concepts',
    terms: [
      {
        term: 'Internal testing',
        definition:
          'A TestFlight distribution lane intended for members of the organization with appropriate App Store Connect access.',
      },
      {
        term: 'External testing',
        definition:
          'A broader TestFlight beta distribution lane used for people outside the internal development organization.',
      },
      {
        term: 'Beta review',
        definition:
          'An Apple-governed review step that can affect whether a build is eligible for external beta distribution.',
      },
      {
        term: 'Tester group',
        definition:
          'A collection of testers used to organize who receives which builds and communications in TestFlight.',
      },
      {
        term: 'Build processing',
        definition:
          'The Apple-side stage after upload where a build is validated and prepared for beta availability.',
      },
      {
        term: 'Build expiration',
        definition:
          'The bounded lifetime of a TestFlight build during which it remains available for beta use.',
      },
    ],
  },
  {
    id: 'glossary-release-ops',
    title: 'Release Operations',
    terms: [
      {
        term: 'Release notes',
        definition:
          'Tester-facing communication that explains what changed, what to focus on, and what known issues already exist.',
      },
      {
        term: 'Release candidate',
        definition:
          'A build that is close enough to production quality to be evaluated for final release readiness.',
      },
      {
        term: 'Go or no-go',
        definition:
          'A release decision point based on beta confidence, defects, environment stability, and operational readiness.',
      },
      {
        term: 'Triage',
        definition:
          'The process of categorizing beta feedback or defects by severity, ownership, reproducibility, and release impact.',
      },
      {
        term: 'Dogfooding',
        definition:
          'Internal use of pre-release builds by the team or organization before broader distribution.',
      },
      {
        term: 'Rollback or replacement build',
        definition:
          'A newer build distributed to supersede a problematic beta and restore confidence in the testing lane.',
      },
    ],
  },
  {
    id: 'glossary-systems',
    title: 'System Context',
    terms: [
      {
        term: 'Archive',
        definition:
          'A release-oriented build artifact produced before upload into App Store Connect or related Apple distribution paths.',
      },
      {
        term: 'App Store Connect',
        definition:
          "Apple's management portal for application metadata, builds, testers, beta distribution, and store release operations.",
      },
      {
        term: 'Environment drift',
        definition:
          'A mismatch between the backend, configuration, or feature-flag setup expected by a beta build and the environment it actually runs against.',
      },
      {
        term: 'Feature flag',
        definition:
          'A runtime control used to enable, disable, or segment app functionality during beta or production operation.',
      },
      {
        term: 'Release train',
        definition:
          'A regular operational cadence in which builds move through defined stages such as QA, beta, and production release.',
      },
      {
        term: 'Feedback signal',
        definition:
          'Actionable information from testers, crashes, telemetry, or observations that informs release decisions.',
      },
    ],
  },
]
const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  'core-concepts': coreConceptSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  examples: exampleSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  glossary: glossarySections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="bin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      <dl className="bin98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

export default function TestFlightPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: PAGE_TITLE,
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title={PAGE_TITLE}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
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
