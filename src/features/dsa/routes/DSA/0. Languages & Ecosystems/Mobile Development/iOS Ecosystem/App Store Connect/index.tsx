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

const PAGE_TITLE = 'App Store Connect'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  "App Store Connect is Apple's operational portal for managing iOS apps after they exist as real products rather than only as Xcode projects. It is where teams handle app records, builds, metadata, pricing, territories, review submission, release control, analytics, testers, roles, subscriptions, and other business-side workflows around shipping software through Apple's ecosystem.",
  'The useful mental model is that App Store Connect sits between engineering, product, design, QA, operations, marketing, finance, and Apple review. Xcode creates the build, but App Store Connect is the system that turns that build into a managed release artifact with compliance information, screenshots, version notes, rollout rules, and distribution state.',
  'This page focuses on App Store Connect in practical iOS delivery work. It covers app records, builds and versions, metadata, pricing and availability, review workflows, release management, TestFlight relationships, analytics, roles and permissions, subscription management, examples, and the terms that matter when a team is actually shipping an iPhone or iPad app.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      "App Store Connect is Apple's distribution and operations control plane for App Store apps. It is not a code editor and not a build system; it is the administrative system that manages how apps are described, reviewed, priced, tested, delivered, and measured after binaries are uploaded from the development pipeline.",
      'That means its importance is both technical and operational. Engineering teams use it to connect builds to releases, but product and release teams also depend on it for metadata, localization, territory settings, phased release, crash reporting context, subscriptions, analytics, and role-based access to shipping workflows.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters',
    paragraphs: [
      'App Store Connect matters because releasing an iOS app is not just a matter of compiling and signing a binary. The app also needs a store record, screenshots, privacy declarations, version notes, pricing, availability settings, and a reviewable submission package that Apple can process. App Store Connect is where those requirements become operational reality.',
      'It also matters because production app delivery is ongoing. Teams ship updates, stage rollouts, react to review issues, manage subscription products, invite testers, inspect sales and analytics, and coordinate internal permissions over time. App Store Connect is therefore part of the steady-state release workflow, not just a one-time launch portal.',
    ],
    bullets: [
      'Bridges build artifacts to public store releases.',
      'Holds metadata, review, pricing, and release controls.',
      'Supports ongoing operational workflows after launch.',
      'Acts as a cross-functional interface between engineering and business teams.',
    ],
  },
  {
    id: 'bp-relationship-to-tools',
    title: 'Relationship to Xcode, TestFlight, and the App Store',
    paragraphs: [
      'Xcode and CI pipelines create signed builds. App Store Connect receives and organizes those builds, attaches them to app versions, and coordinates testing and release configuration. TestFlight lives under the App Store Connect umbrella as the beta distribution path, while the public App Store is the external customer-facing storefront reached after approval and release.',
      'This distinction matters because teams often confuse the systems. Xcode is for development and build creation. TestFlight is for controlled beta distribution. App Store Connect is the operational management layer that governs both beta and public release workflows. The App Store itself is the customer-facing distribution endpoint.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where It Fits in the Delivery Lifecycle',
    paragraphs: [
      'A typical lifecycle looks like this: developers implement a feature, CI or Xcode archives a build, the build is uploaded, App Store Connect processes it, the team attaches it to a version or TestFlight group, fills in version metadata, resolves compliance questions, submits for review if needed, then either releases immediately, schedules a release, or uses phased rollout controls.',
      'At each stage, App Store Connect is the source of truth for distribution state. A build can exist without being releasable, a version can be configured without being approved, and a review can be approved without the team choosing immediate release. Understanding those states is critical for predictable release operations.',
    ],
  },
  {
    id: 'bp-risks',
    title: 'Operational Risks and Failure Modes',
    paragraphs: [
      'App Store Connect mistakes are rarely syntax mistakes; they are workflow mistakes. Teams may attach the wrong build to a version, forget required localized metadata, misunderstand review status, publish to unintended territories, misconfigure subscription availability, or assume a processed build is automatically ready for release. These are release-management failures more than coding failures.',
      'Because of that, strong teams treat App Store Connect as part of production operations. They use checklists, clearly defined release ownership, version naming discipline, pre-submission review passes, and permission boundaries that reduce the chance of accidental release or metadata regressions.',
    ],
    bullets: [
      'Wrong build attached to the wrong version.',
      'Incomplete or inconsistent metadata at submission time.',
      'Confusion between processed, approved, and released states.',
      'Weak permissions or release discipline causing accidental changes.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'App Store Connect is best understood as the release and operations system for shipping Apple-platform apps. It sits downstream of development but upstream of customer distribution, bridging binaries, metadata, policy, review, and commercialization.',
      'Teams succeed with it when they treat it as an operational system with states, permissions, and release rules rather than as a website they visit only after coding is done. The difference between smooth delivery and chaotic release often lives here.',
    ],
    bullets: [
      'It is the operational layer of iOS app distribution.',
      'Release state and metadata state are just as important as the binary itself.',
      'Cross-functional ownership matters in App Store Connect workflows.',
      'Strong release hygiene reduces preventable launch and update issues.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-app-records',
    title: 'App Records, Bundle Identity, and Versioning',
    paragraphs: [
      'An app record is the canonical representation of an app inside App Store Connect. It is tied to identity choices such as app name, bundle identifier lineage, platform, SKU, and store presence. Once this record exists, future builds and versions attach to it rather than creating a new product from scratch each time.',
      'Versioning is separate from build numbering. A version is the customer-facing release line, while builds are the uploaded binaries that can be attached to that version or to TestFlight workflows. Teams need discipline here because release mistakes often start with inconsistent version/build semantics across Xcode, CI, and App Store Connect.',
    ],
    bullets: [
      'The app record is the long-lived store identity of the product.',
      'Versions are customer-facing release units.',
      'Build numbers track binary revisions within that versioning scheme.',
      'Identity and numbering mistakes can create avoidable release confusion.',
    ],
  },
  {
    id: 'core-builds-processing',
    title: 'Build Upload and Processing',
    paragraphs: [
      'After a build is uploaded from Xcode or CI, App Store Connect processes it before it can be used for testing or release configuration. Processing checks and indexing happen before the build becomes selectable in downstream workflows. A successful upload does not mean the build is immediately usable.',
      'Operationally, this means release pipelines should account for processing delay and visibility lag. Teams that assume upload equals instant readiness often waste time debugging problems that are simply state transitions still in flight.',
    ],
  },
  {
    id: 'core-metadata',
    title: 'Metadata, Localization, and Store Presentation',
    paragraphs: [
      'App Store Connect holds the customer-facing description of the app: name, subtitle, promotional text, keywords, screenshots, previews, support URLs, marketing URLs, release notes, and localized variations of those assets. These fields affect review, discoverability, user expectation, and product presentation.',
      'This is not cosmetic paperwork. Metadata quality affects conversion, review friction, and correctness of how the app is represented to customers. Teams should treat it as part of the release artifact with the same seriousness as the binary itself.',
    ],
    bullets: [
      'Localization needs deliberate ownership and review.',
      'Screenshots and copy should match the actual shipped experience.',
      'Release notes are part of product communication, not an afterthought.',
      'Metadata drift can create review issues and user trust issues.',
    ],
  },
  {
    id: 'core-pricing-availability',
    title: 'Pricing, Availability, and Territories',
    paragraphs: [
      'Pricing and availability settings determine where the app can be distributed and under what commercial terms. That includes whether the app is free or paid, which storefronts and countries are enabled, when availability changes take effect, and how in-app purchases or subscriptions align with those settings.',
      'These controls are operationally important because rollout strategy is often not global and simultaneous. Teams may stage launches by territory, withhold regions for compliance or localization reasons, or align app availability with backend readiness and support coverage.',
    ],
  },
  {
    id: 'core-review',
    title: 'App Review and Submission Workflow',
    paragraphs: [
      'App Store review is coordinated through App Store Connect. Teams prepare a submission, answer review questions, attach the target build to the target version, provide review notes, and track status changes such as waiting for review, in review, metadata rejected, developer rejected, approved, or ready for distribution depending on the exact workflow state.',
      'Understanding state transitions matters because approval does not always mean automatic release, and rejection does not always mean the binary itself is technically broken. Review outcomes can be driven by metadata, policy interpretation, missing explanations, privacy declarations, or feature discoverability.',
    ],
    bullets: [
      'Submission packages include more than just the binary.',
      'Review notes can materially reduce confusion for reviewers.',
      'Status changes should be treated as operational signals, not vague labels.',
      'Metadata and compliance issues can block release even when the build works.',
    ],
  },
  {
    id: 'core-release-control',
    title: 'Release Control, Scheduling, and Phased Rollout',
    paragraphs: [
      'App Store Connect lets teams choose when an approved version becomes available. That may mean manual release, automatic release after approval, scheduled release timing, or phased rollout where the update reaches increasing portions of the audience over time. This is a major operational control surface, not just a convenience toggle.',
      'Release control matters because engineering readiness, support readiness, marketing timing, and backend readiness do not always line up. Strong release teams use these controls deliberately to reduce blast radius and coordinate launch timing across the broader business.',
    ],
  },
  {
    id: 'core-testflight-relationship',
    title: 'Relationship to TestFlight',
    paragraphs: [
      'TestFlight is operationally adjacent to App Store releases but serves a different purpose. It distributes beta builds to internal and external testers, while App Store Connect uses those same build-management capabilities for production release workflows. The systems are connected, but they are not interchangeable.',
      'A common pattern is to validate a processed build in TestFlight first, gather confidence through internal and external testing, then attach a production-ready build to an App Store version record. That relationship is one reason teams should think of App Store Connect as a broader release platform rather than only a publishing form.',
    ],
  },
  {
    id: 'core-roles-permissions',
    title: 'Roles, Permissions, and Operational Boundaries',
    paragraphs: [
      'App Store Connect supports role-based access so different people can manage different slices of the workflow. Engineering, release management, finance, support, marketing, and external partners often need different visibility and change permissions. Good access design reduces risk.',
      'This is especially important in mature organizations. Too much access creates accidental change risk. Too little access slows releases because the wrong people become approval bottlenecks. Permissions should reflect operational responsibility rather than convenience.',
    ],
    bullets: [
      'Permissions should match release responsibilities.',
      'Avoid giving broad production-release rights by default.',
      'Cross-functional collaboration still needs clear ownership boundaries.',
      'Role design is a reliability issue, not just an admin detail.',
    ],
  },
  {
    id: 'core-subscriptions-iap',
    title: 'Subscriptions, In-App Purchases, and Commercial Artifacts',
    paragraphs: [
      'App Store Connect is also where teams define and manage in-app purchases, subscriptions, pricing schedules, localization for product display, promotional metadata, and related product availability settings. These are not separate from the app release story because the app binary often depends on these commercial artifacts being configured correctly.',
      'A production-ready app can still fail as a business product if the associated subscription products are misconfigured, unavailable in key territories, missing review assets, or not aligned with backend entitlement logic. Teams need to treat these artifacts as first-class release dependencies.',
    ],
  },
  {
    id: 'core-analytics-reporting',
    title: 'Analytics, Sales, and Post-Release Visibility',
    paragraphs: [
      'After release, App Store Connect provides sales, trends, download, subscription, engagement, and sometimes crash-related operational views that help teams understand how the app is performing commercially and distribution-wise. This is important because release is not the end of the operational lifecycle.',
      'Teams use this information to detect rollout issues, evaluate store conversion performance, track market response, understand subscription behavior, and coordinate decisions about pricing, localization, promotion, and future releases.',
    ],
  },
  {
    id: 'core-release-discipline',
    title: 'Release Discipline and Checklists',
    paragraphs: [
      'Strong App Store Connect usage is procedural. Teams benefit from explicit release checklists covering build identity, metadata completeness, screenshots, privacy declarations, review notes, territory settings, pricing, subscription dependencies, backend readiness, and post-release monitoring. That discipline reduces avoidable mistakes.',
      'The portal itself cannot guarantee good process. It only exposes state and controls. Reliable releases come from teams that treat those states and controls as part of an engineered delivery system rather than as a last-minute manual step.',
    ],
    bullets: [
      'Use repeatable release checklists.',
      'Treat metadata review as part of release review.',
      'Verify commercial and backend dependencies before submission.',
      'Post-release monitoring should start immediately after rollout begins.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-release-flow',
    title: 'Typical Release Flow Outline',
    description: [
      'A normal App Store Connect workflow is not just "upload and publish." It moves through several explicit operational states that should be checked deliberately. The exact sequence varies, but the core release outline tends to be stable across teams.',
      'This example summarizes the flow as an operational checklist rather than as code because App Store Connect work is mostly about state management and release sequencing.',
    ],
    code: `1. Archive and upload a signed build from Xcode or CI.
2. Wait for build processing to complete in App Store Connect.
3. Attach the intended build to the target app version.
4. Fill in release notes, screenshots, metadata, privacy details, and review notes.
5. Verify pricing, territory availability, and commercial dependencies.
6. Submit the version for App Review.
7. If approved, release manually, schedule release, or enable phased rollout.
8. Monitor rollout, support channels, analytics, and crash signals after release.`,
    notes: [
      'The portal state should be checked at each transition rather than assumed.',
      'Release readiness includes metadata and operations, not only binary readiness.',
      'Manual release is often safer when launch timing matters.',
    ],
  },
  {
    id: 'examples-metadata-check',
    title: 'Metadata Review Checklist',
    description: [
      'Metadata mistakes are a common source of avoidable delay. A lightweight pre-submission pass helps catch issues that would otherwise appear during review or after release.',
      'This example is a practical checklist for what a team should confirm before hitting submit.',
    ],
    code: `- App name, subtitle, and promotional text match the shipped feature set.
- Screenshots reflect the current UI on the correct device classes.
- Release notes describe actual user-visible changes.
- Support and marketing URLs are valid.
- Localized text has been reviewed, not machine-dumped blindly.
- Privacy declarations and review notes match real app behavior.
- Subscription and IAP display text aligns with the app experience.`,
    notes: [
      'Metadata review should be owned, not assumed.',
      'Screenshots and review notes can materially affect review smoothness.',
      'Commercial text and product text should be internally consistent.',
    ],
  },
  {
    id: 'examples-role-design',
    title: 'Simple Role Separation Pattern',
    description: [
      'Many release problems come from unclear ownership. Even a simple role separation pattern can reduce accidental edits and bottlenecks.',
      'This example shows a pragmatic split of responsibilities rather than a rigid universal model.',
    ],
    code: `Engineering:
- Upload builds
- Verify build provenance and versioning
- Provide review notes for technical edge cases

Release/Product:
- Own store metadata and release timing
- Submit versions for review
- Control phased rollout or manual release

Finance/Commercial:
- Review pricing, territories, subscriptions, and tax-sensitive settings`,
    notes: [
      'Roles should reflect real accountability, not org-chart vanity.',
      'Too much broad access increases operational risk.',
      'Clear ownership speeds incident response when release issues appear.',
    ],
  },
  {
    id: 'examples-rollout-decision',
    title: 'Choosing a Rollout Strategy',
    description: [
      'Release strategy should reflect risk and coordination needs. Not every approved version should go live immediately to everyone.',
      'This example frames the decision as an operational choice based on confidence, dependency readiness, and blast radius tolerance.',
    ],
    code: `Immediate release:
- Use when the change is low risk and timing matters.

Manual release after approval:
- Use when marketing, backend switches, or support readiness must be coordinated.

Phased rollout:
- Use when the change is significant and the team wants to limit blast radius while monitoring real-world behavior.`,
    notes: [
      'Approval state and release state are not the same thing.',
      'Phased rollout is a risk-control tool, not a default requirement.',
      'The right release mode depends on operational context, not habit.',
    ],
  },
  {
    id: 'examples-submission-notes',
    title: 'Useful Review Notes Pattern',
    description: [
      'Review notes should reduce reviewer confusion, especially for gated flows, demo accounts, or features that depend on non-obvious setup.',
      'A concise note often prevents avoidable back-and-forth during review.',
    ],
    code: `Review Notes:
- Demo account: reviewer@example.com / Password123
- The subscription paywall appears after onboarding step 3.
- Camera access is used only for profile-photo upload.
- Region-specific feature flags are enabled only for US storefront testing.
- If a backend delay occurs, retry the dashboard after sign-in.`,
    notes: [
      'Good review notes explain behavior that is not obvious from normal exploration.',
      'They should be concise, accurate, and actively maintained.',
      'Stale review notes can be almost as harmful as missing ones.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-release',
    title: 'Release and Build Terms',
    terms: [
      {
        term: 'App record',
        definition:
          'The long-lived product entry in App Store Connect that holds builds, versions, metadata, pricing, and related distribution settings for an app.',
      },
      {
        term: 'Version',
        definition:
          'The customer-facing release identifier associated with an App Store submission line.',
      },
      {
        term: 'Build',
        definition:
          'The uploaded binary artifact processed by App Store Connect and attached to TestFlight or App Store release workflows.',
      },
      {
        term: 'Processed build',
        definition:
          'A build that App Store Connect has finished ingesting and made available for further testing or submission workflows.',
      },
      {
        term: 'Ready for distribution',
        definition:
          'A post-review state indicating the app version is approved and positioned for release according to the configured release controls.',
      },
      {
        term: 'Phased release',
        definition:
          'A rollout mode that gradually exposes an approved update to increasing portions of the eligible audience over time.',
      },
    ],
  },
  {
    id: 'glossary-store',
    title: 'Store and Metadata Terms',
    terms: [
      {
        term: 'Localization',
        definition:
          'Store text and media variants tailored for different supported languages or regions.',
      },
      {
        term: 'Promotional text',
        definition:
          'Store copy shown on the App Store listing that can highlight updates or positioning without requiring a new binary.',
      },
      {
        term: 'Release notes',
        definition:
          'Version-specific text shown to users describing what changed in the submitted update.',
      },
      {
        term: 'Territory availability',
        definition:
          'The storefront or country selection controlling where the app can be distributed.',
      },
      {
        term: 'SKU',
        definition:
          'An internal identifier associated with the app record, commonly used for organizational or operational tracking.',
      },
      {
        term: 'App Review notes',
        definition:
          'Submission notes provided to Apple reviewers to explain accounts, gated flows, feature access, or context needed to review the app correctly.',
      },
    ],
  },
  {
    id: 'glossary-ops',
    title: 'Operational Terms',
    terms: [
      {
        term: 'TestFlight',
        definition:
          "Apple's beta distribution system inside the broader App Store Connect platform.",
      },
      {
        term: 'Role',
        definition:
          'A permission grouping that controls what a user can see or change within App Store Connect.',
      },
      {
        term: 'Submission',
        definition:
          "The package of metadata, build selection, review information, and release intent sent into Apple's review workflow.",
      },
      {
        term: 'Subscription product',
        definition:
          "A recurring commercial offering configured in App Store Connect and linked to the app's monetization model.",
      },
      {
        term: 'Sales and trends',
        definition:
          'App Store Connect reporting views that summarize downloads, purchases, subscriptions, and related commercial performance signals.',
      },
      {
        term: 'Manual release',
        definition:
          'A release mode where the team waits to publish the approved version until it explicitly chooses to do so.',
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
    <section key={section.id} id={section.id} className="app-store-connect-help98-section">
      <h2 className="app-store-connect-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="app-store-connect-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="app-store-connect-help98-section">
      <h2 className="app-store-connect-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="app-store-connect-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="app-store-connect-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="app-store-connect-help98-section">
      <h2 className="app-store-connect-help98-heading">{section.title}</h2>
      <dl className="app-store-connect-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="app-store-connect-help98-divider" /> : null}
    </section>
  )
}

export default function AppStoreConnectPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'App Store Connect Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="App Store Connect Page"
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
