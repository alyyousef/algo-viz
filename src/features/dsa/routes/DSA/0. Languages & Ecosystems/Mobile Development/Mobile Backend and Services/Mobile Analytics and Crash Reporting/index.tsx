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

const PAGE_TITLE = 'Mobile Analytics and Crash Reporting'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Mobile analytics and crash reporting are the observability layer for shipped apps. Analytics tells a team what users are doing, where funnels break, and which features are actually used. Crash reporting tells the team where the app is failing, how often, under which versions or devices, and how severe those failures are in production.',
  'The useful mental model is that these are not vanity dashboards. They are product and reliability instrumentation systems. Mobile apps are harder to patch instantly than web apps, so post-release visibility matters more. If a team cannot see event flow, error rate, or crash impact in production, it is operating the app blindly.',
  'This page focuses on analytics and crash reporting as real mobile engineering systems. It covers event schema design, funnels and attribution, privacy and consent, crash capture and symbolication, non-fatal errors, release-quality monitoring, alerting, dashboard design, data reliability, examples, and the terms that matter when using mobile telemetry in production.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Mobile analytics measures user behavior and product usage through structured events, properties, sessions, cohorts, and funnels. Crash reporting measures failures such as fatal crashes, non-fatal exceptions, ANRs, and sometimes hangs or OOM-like symptoms depending on tooling. Together they form a large part of what a team knows about a shipped app after release.',
      'Their importance is unusually high on mobile because deployment cycles are slower and runtime environments are more fragmented. Device models, OS versions, network conditions, notification state, app backgrounding, and store rollout timing all affect production behavior. Teams need telemetry to understand what actually happens outside development machines.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters',
    paragraphs: [
      'Analytics matters because product intuition is often wrong. Teams need to know whether onboarding completes, where users drop off, whether notifications lead to opens, which features are ignored, and what behavior differs across versions or platforms. Without instrumentation, product decisions become guesswork.',
      'Crash reporting matters because stability is itself a feature. A release with strong feature adoption but high crash impact is still a bad release. Crash tooling helps teams connect technical failures to business impact by showing affected users, device patterns, release-specific spikes, and regression timing.',
    ],
    bullets: [
      'Provides feedback after release, not just before it.',
      'Connects product behavior to technical behavior.',
      'Supports safer rollout and faster incident response.',
      'Turns vague user complaints into actionable evidence.',
    ],
  },
  {
    id: 'bp-what-it-is-not',
    title: 'What It Is Not',
    paragraphs: [
      'Analytics is not a replacement for judgment, and crash reporting is not a replacement for testing. Instrumentation can reveal production reality, but it cannot define the product strategy by itself. Teams still need thoughtful event design, interpretation, and domain context.',
      'It is also not harmless to log everything. Poor event design creates noisy dashboards, privacy risk, inflated cost, and misleading KPIs. Good telemetry is selective, stable, and tied to real decisions the team intends to make.',
    ],
    bullets: [
      'Not a substitute for product reasoning or QA.',
      'Not an excuse to collect excessive data indiscriminately.',
      'Not useful if events are inconsistent or undefined.',
      'Not purely a product concern or purely an infrastructure concern.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where It Fits in the Mobile Lifecycle',
    paragraphs: [
      'Instrumentation should be considered during feature design, not bolted on after release. Event names, properties, funnel checkpoints, error surfaces, and release-health metrics should be defined while the feature is being built so the app ships with meaningful visibility from day one.',
      'After release, analytics and crash reporting become part of steady-state operations. They support rollout monitoring, incident triage, experiment analysis, retention work, support investigation, and prioritization of stability or UX fixes.',
    ],
  },
  {
    id: 'bp-decision-frame',
    title: 'Decision Frame',
    paragraphs: [
      'The useful questions are: what decisions should this data support, what are the stable business events, what user properties are actually necessary, what failures count as urgent, and what privacy or consent boundaries apply. If the team cannot answer those questions, the instrumentation design is probably too vague.',
      'The best analytics and crash systems are opinionated enough to guide action. The worst systems produce large volumes of noise that nobody trusts or uses.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Mobile analytics and crash reporting are core production systems. They exist to support product learning, release safety, and incident response, not merely to decorate executive dashboards.',
      'Strong teams define event schemas carefully, monitor release health deliberately, respect privacy boundaries, and connect telemetry back to specific product and engineering decisions.',
    ],
    bullets: [
      'Instrument for decisions, not for volume.',
      'Treat crash health as a release quality signal.',
      'Define event contracts and maintain them over time.',
      'Telemetry should support action, not just observation.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-event-design',
    title: 'Event Taxonomy and Schema Design',
    paragraphs: [
      'Good analytics starts with an explicit event taxonomy. Event names should describe meaningful business actions such as signed_up, onboarding_completed, item_saved, purchase_started, or push_opened. Properties should provide context that supports analysis without becoming a dumping ground for unstable or privacy-sensitive payloads.',
      'This matters because event naming becomes part of the app contract with dashboards, experiments, and downstream analysis. Renaming or reshaping events casually can break comparisons across versions and make long-term product learning unreliable.',
    ],
    bullets: [
      'Name events by business meaning, not by button label trivia.',
      'Keep properties stable and intentionally scoped.',
      'Avoid logging raw payloads when normalized fields are enough.',
      'Treat event schema as versioned product infrastructure.',
    ],
  },
  {
    id: 'core-funnels-retention',
    title: 'Funnels, Sessions, and Retention Signals',
    paragraphs: [
      'Analytics is useful when it clarifies journeys: install to sign-up, sign-up to activation, search to purchase, notification to open, crash to abandonment, and so on. Funnel design should align with actual product milestones rather than generic screen-view counting.',
      'Retention and session analysis also need careful interpretation on mobile because app reopen patterns can be shaped by notifications, background refresh behavior, timezone, or platform-specific lifecycle quirks. Teams should define what counts as active use intentionally rather than inheriting whatever a default dashboard happens to count.',
    ],
  },
  {
    id: 'core-attribution',
    title: 'Attribution, Campaigns, and Notification Opens',
    paragraphs: [
      'Mobile teams often want to know which push notifications, campaigns, or acquisition sources actually drive opens and downstream value. Attribution is useful, but it becomes misleading if the app cannot distinguish delivered, opened, foregrounded, or truly converted behaviors clearly.',
      'The important point is to connect attribution to concrete outcomes rather than vanity metrics. An opened notification that leads nowhere is less valuable than a smaller notification cohort that completes a high-intent action cleanly.',
    ],
  },
  {
    id: 'core-privacy-consent',
    title: 'Privacy, Consent, and Data Minimization',
    paragraphs: [
      'Telemetry design is constrained by law, platform policy, and user trust. Teams need to know what identifiers they collect, what user consent is required, what can be tied to a person, and which signals are genuinely necessary for product or reliability decisions. Mobile analytics is not exempt from privacy engineering.',
      'The healthiest approach is data minimization. Capture the least information necessary to support real decisions, respect consent boundaries, and avoid logging sensitive user content or identifiers unless there is a well-justified and policy-safe reason to do so.',
    ],
    bullets: [
      'Collect what is necessary, not what is merely available.',
      'Design around consent and platform policy from the beginning.',
      'Avoid sending sensitive content into analytics or crash breadcrumbs casually.',
      'Privacy-safe telemetry is part of product quality.',
    ],
  },
  {
    id: 'core-crash-capture',
    title: 'Crash Capture, Non-Fatals, and Release Health',
    paragraphs: [
      'Crash reporting systems capture fatal crashes, stack traces, affected versions, device and OS breakdowns, and sometimes non-fatal exceptions or app hangs. This allows teams to prioritize incidents not just by technical severity but by user impact and release scope.',
      'Non-fatal reporting is especially useful when the app catches an exception but still puts the user into a degraded state. Those events may not appear in crash-free-user metrics, yet they can still damage the product experience materially.',
    ],
  },
  {
    id: 'core-symbolication',
    title: 'Symbolication, Mapping Files, and Readable Stacks',
    paragraphs: [
      'Crash reports are much more useful when stack traces are symbolicated correctly. On iOS that often means dSYMs and related symbol files. On Android that can mean ProGuard or R8 mapping files and native symbols where relevant. If symbol artifacts are missing, crash dashboards become much less actionable.',
      'This is why crash reporting depends on the release pipeline. Build jobs need to preserve and upload the correct symbol artifacts so post-release failures can be understood quickly. Observability is tightly coupled to CI-CD here.',
    ],
    bullets: [
      'Crash tooling is only as useful as the symbol files behind it.',
      'Release automation should treat symbol upload as a required step.',
      'Unreadable production stacks slow incident response dramatically.',
      'Symbol management belongs in release operations, not as an afterthought.',
    ],
  },
  {
    id: 'core-context-breadcrumbs',
    title: 'Breadcrumbs, Context, and Diagnostic Enrichment',
    paragraphs: [
      'A stack trace alone is often not enough. Good crash and error systems add breadcrumbs and contextual metadata such as screen name, last navigation event, feature flag state, user action sequence, network condition, or app version. This can turn a vague crash into a reproducible failure path.',
      'The enrichment still needs discipline. Too little context makes incidents opaque. Too much context increases noise, privacy risk, or payload bloat. The goal is enough operational context to reconstruct the failure path responsibly.',
    ],
  },
  {
    id: 'core-alerting-triage',
    title: 'Alerting, Triage, and Prioritization',
    paragraphs: [
      'Crash and analytics systems need triage rules, not just dashboards. Teams should know which regressions page immediately, which issues get batched for a release-quality review, and which analytics anomalies are strong enough to halt a rollout or revert a feature flag.',
      'The key is impact. A rare edge-case crash on an obsolete device may matter less than a non-fatal onboarding failure affecting 15 percent of new users. Prioritization should combine severity, user impact, feature criticality, and release timing.',
    ],
    bullets: [
      'Alert on impact, not only on raw count.',
      'Tie telemetry thresholds to release policy where possible.',
      'Separate urgent regression response from background product analysis.',
      'Triage rules should be documented, not improvised during incidents.',
    ],
  },
  {
    id: 'core-release-monitoring',
    title: 'Release Monitoring and Rollout Confidence',
    paragraphs: [
      'After a release, teams should actively watch crash-free users, startup stability, critical funnel breakpoints, authentication failures, purchase flow errors, and other release-sensitive indicators. This is especially important during phased rollout, beta testing, or immediately after store approval.',
      'A release is not successful because the build uploaded successfully. It is successful when the production behavior is stable enough and the key user journeys still work. Analytics and crash reporting provide that evidence.',
    ],
  },
  {
    id: 'core-data-quality',
    title: 'Data Quality, Sampling, and Schema Drift',
    paragraphs: [
      'Instrumentation systems can fail quietly. Events may stop sending after a refactor, payloads may change shape across versions, sampling may hide edge behavior, or dashboard definitions may diverge from what the code actually emits. Teams need to verify data quality continuously rather than assuming analytics is always correct because events appear on a chart.',
      'This is one reason event contracts and instrumentation tests matter. If the app treats telemetry as production infrastructure, schema drift and missing events become testable failures rather than surprises discovered weeks later.',
    ],
  },
  {
    id: 'core-tooling-strategy',
    title: 'Tooling Strategy and Vendor Boundaries',
    paragraphs: [
      'Mobile teams often combine tools rather than relying on one vendor for everything. For example, analytics might live in Firebase, product analytics in another warehouse-backed tool, and crash reporting in Crashlytics or Sentry. The right combination depends on query needs, privacy posture, cost, and how much cross-tool stitching the team can tolerate.',
      'The useful question is not which tool is most famous. It is which toolset gives the team reliable instrumentation, actionable crash triage, stable schemas, and data the organization can actually use without heroic cleanup.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-event',
    title: 'Track a Stable Business Event',
    description: [
      'A strong analytics event should represent a meaningful business or product milestone rather than a low-value click. This example shows the shape of a purchase-started event with intentionally limited properties.',
      'The goal is to preserve long-term usefulness and dashboard stability rather than logging every transient UI detail.',
    ],
    code: `analytics.logEvent('purchase_started', {
  plan_id: 'pro_monthly',
  source: 'paywall',
  experiment_variant: 'headline_b',
})`,
    notes: [
      'Event names should be stable enough to survive UI rewrites.',
      'Properties should support real segmentation decisions.',
      'Do not overload one event with every available detail.',
    ],
  },
  {
    id: 'examples-nonfatal',
    title: 'Record a Non-Fatal Error with Context',
    description: [
      'Not every important failure is a crash. Some errors are caught but still damage the user journey. Logging those as non-fatals can reveal degraded experiences that crash-free metrics alone would miss.',
      'Context should be useful but not privacy-invasive.',
    ],
    code: `Crashlytics.crashlytics().setCustomValue('checkout', forKey: 'screen')
Crashlytics.crashlytics().setCustomValue(orderId, forKey: 'order_id')
Crashlytics.crashlytics().record(error: checkoutError)`,
    notes: [
      'Non-fatal errors help surface degraded flows before they become crashes.',
      'Context should support triage without leaking sensitive user content.',
      'This belongs in deliberate error-handling paths, not indiscriminately everywhere.',
    ],
  },
  {
    id: 'examples-release-check',
    title: 'Post-Release Monitoring Checklist',
    description: [
      'Release monitoring is partly operational discipline. The team should know which metrics to inspect immediately after rollout instead of browsing dashboards aimlessly.',
      'This example shows the shape of a practical release-health checklist rather than executable code.',
    ],
    code: `- Crash-free users by app version
- Startup crash count and ANR/hang trend
- Sign-in success rate
- Onboarding completion rate
- Purchase-started vs purchase-completed funnel
- Push open rate after campaign launch
- New non-fatal error spike by feature flag or experiment`,
    notes: [
      'Release monitoring should be tied to key product journeys and known risk areas.',
      'A fixed checklist prevents blind spots during rollout pressure.',
      'Crash health and funnel health should be reviewed together.',
    ],
  },
  {
    id: 'examples-consent',
    title: 'Gate Analytics Initialization on Consent',
    description: [
      'When product or policy requirements demand consent, analytics initialization and user property setting should reflect that state explicitly rather than assuming collection is always allowed.',
      'This example shows the shape of that decision boundary in app code.',
    ],
    code: `if userConsentedToAnalytics {
  analytics.setAnalyticsCollectionEnabled(true)
  analytics.setUserProperty('beta_tester', forName: 'cohort')
} else {
  analytics.setAnalyticsCollectionEnabled(false)
}`,
    notes: [
      'Consent state should be treated as runtime configuration, not a comment in policy docs.',
      'Collection gating is part of app behavior and should be testable.',
      'Privacy boundaries belong in code paths, not only in legal text.',
    ],
  },
  {
    id: 'examples-breadcrumbs',
    title: 'Leave Breadcrumbs Before a Risky Action',
    description: [
      'Breadcrumbs can make crashes much easier to reproduce by preserving a lightweight trail of user or system actions before failure. The key is to log meaningful steps rather than every microscopic state change.',
      'This example shows the rough shape of breadcrumb usage in a crash-reporting system.',
    ],
    code: `crashReporter.leaveBreadcrumb('checkout_opened')
crashReporter.leaveBreadcrumb('payment_method_selected:card')
crashReporter.leaveBreadcrumb('purchase_confirm_tapped')`,
    notes: [
      'Breadcrumbs are most useful when they describe the failure path clearly.',
      'Too many breadcrumbs create noise instead of clarity.',
      'Sensitive content should not be logged casually in diagnostic trails.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-analytics',
    title: 'Analytics Terms',
    terms: [
      {
        term: 'Event',
        definition:
          'A structured record describing a meaningful user or system action emitted by the app for analytics.',
      },
      {
        term: 'Property',
        definition:
          'Context attached to an event or user profile that helps segment or interpret analytics data.',
      },
      {
        term: 'Funnel',
        definition:
          'A sequence of events or milestones used to measure progression through a product journey.',
      },
      {
        term: 'Retention',
        definition:
          'A measure of whether users return and continue engaging with the app over time.',
      },
      {
        term: 'Attribution',
        definition:
          'The attempt to connect user behavior or conversion to a source such as a campaign, push notification, or acquisition channel.',
      },
      {
        term: 'Schema drift',
        definition:
          'The divergence between intended analytics event definitions and the actual event data emitted by the app over time.',
      },
    ],
  },
  {
    id: 'glossary-crash',
    title: 'Crash and Error Terms',
    terms: [
      {
        term: 'Crash report',
        definition:
          'A captured record of a fatal application failure including stack information and runtime context.',
      },
      {
        term: 'Non-fatal error',
        definition:
          'A caught exception or failure that does not terminate the app but still indicates degraded behavior.',
      },
      {
        term: 'Symbolication',
        definition:
          'The process of translating raw crash addresses into readable function and file information using symbol artifacts.',
      },
      {
        term: 'dSYM',
        definition:
          'An iOS debug symbol artifact needed to symbolicate many production crash reports accurately.',
      },
      {
        term: 'Mapping file',
        definition:
          'An Android obfuscation artifact used to reconstruct readable stack traces after R8 or ProGuard processing.',
      },
      {
        term: 'Breadcrumb',
        definition:
          'A lightweight diagnostic record of recent actions or states captured to help explain the path to a failure.',
      },
    ],
  },
  {
    id: 'glossary-ops',
    title: 'Operational Terms',
    terms: [
      {
        term: 'Crash-free users',
        definition:
          'A release-health metric estimating the proportion of users who did not encounter a fatal crash in a given period.',
      },
      {
        term: 'Release health',
        definition: 'The stability and quality profile of a specific app version after rollout.',
      },
      {
        term: 'Alert threshold',
        definition:
          'A configured condition that triggers notification when a telemetry signal crosses a defined severity boundary.',
      },
      {
        term: 'Consent gating',
        definition:
          'Runtime control that enables or disables telemetry collection based on user consent or policy state.',
      },
      {
        term: 'Data minimization',
        definition:
          'The practice of collecting only the telemetry needed for legitimate product and reliability purposes.',
      },
      {
        term: 'Instrumentation contract',
        definition:
          'The agreed definition of events, properties, and telemetry behavior that the app and downstream analysis depend on.',
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
    <section key={section.id} id={section.id} className="analytics-help98-section">
      <h2 className="analytics-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="analytics-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="analytics-help98-section">
      <h2 className="analytics-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="analytics-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="analytics-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="analytics-help98-section">
      <h2 className="analytics-help98-heading">{section.title}</h2>
      <dl className="analytics-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="analytics-help98-divider" /> : null}
    </section>
  )
}

export default function MobileAnalyticsAndCrashReportingPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Mobile Analytics And Crash Reporting Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Mobile Analytics And Crash Reporting Page"
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
