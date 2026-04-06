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
  'Google Play Console is the operational control panel for shipping and maintaining Android apps on Google Play. The important point is not merely that it is where an app gets uploaded. It is where release management, testing tracks, app signing, store presence, policy declarations, statistics, crash visibility, monetization setup, and production rollout all converge.',
  'For Android teams, Play Console sits downstream from development but upstream from users. Gradle, app bundles, signing, testing, release notes, country availability, content declarations, and store listings all eventually have to land here in a production-safe way. That makes Play Console part of the delivery system, not just an admin website.',
  'This page is intentionally comprehensive. It covers account and app setup, tracks, app bundles, Play App Signing, rollout strategy, store listing work, testing, policy and content declarations, Android vitals and quality signals, monetization surfaces, team access, automation touchpoints, and the common mistakes teams make when they treat publishing as a last-minute button press instead of a managed release process.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Google Play Console is the control surface for publishing and operating Android apps on Google Play. It is where a developer account, one or more apps, release artifacts, testing groups, store metadata, policy declarations, and production rollout decisions are tied together.',
      'The key engineering insight is that Play Console is not only a final upload destination. It is part of the release pipeline. App bundles produced by the build system, signing choices, testing strategy, staged rollout discipline, release notes, country targeting, and quality monitoring all become actionable here.',
      'For a mature Android team, Play Console is closer to release operations than to a simple dashboard. It connects build outputs to actual users, which means mistakes here are production mistakes.',
    ],
  },
  {
    id: 'bp-why-play-console-matters',
    title: 'Why Play Console Matters',
    paragraphs: [
      'Android development does not end when the app compiles. Real distribution requires listing content, package identity, version control, signing, policy compliance, testing tracks, production rollout, and ongoing monitoring. Play Console is the platform through which those concerns are managed for Google Play distribution.',
      'That is why teams that treat publishing as an afterthought usually end up improvising release operations. The healthier model is to consider Play Console part of the product delivery system from the beginning.',
    ],
    bullets: [
      'It manages how builds move from internal testing to production.',
      'It controls store presence, assets, listing text, and distribution settings.',
      'It is where policy and content declarations are maintained.',
      'It surfaces release, quality, and growth signals after launch.',
    ],
  },
  {
    id: 'bp-release-lifecycle',
    title: 'The Release Lifecycle Through Play',
    paragraphs: [
      'A typical lifecycle starts with app creation, package naming, signing setup, and store configuration. From there, teams upload app bundles, assign them to test tracks or production, review generated warnings and quality signals, and then roll out carefully.',
      'Testing and production are not one continuous blur. Play Console intentionally separates internal testing, closed testing, open testing, and production. That separation is operationally important because release confidence should grow before exposure grows.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Play Console Fits in Android Delivery',
    paragraphs: [
      'Gradle and CI generate artifacts. Developers and QA validate builds. Product and design teams refine listing assets and rollout timing. Legal or policy stakeholders may review content declarations. Play Console is the layer where those streams converge before release.',
      'Because of that, access control and change discipline matter. Publishing should be treated as a managed workflow with clear ownership rather than a shared casual login used by everyone.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What Play Console Does Not Replace',
    paragraphs: [
      'Play Console does not replace source control, CI, code review, local QA, or proper release notes written in the engineering process. It also does not replace architecture or test coverage. It distributes the product and exposes operational controls, but it cannot rescue a weak app lifecycle upstream.',
      'It is also not a place to keep business knowledge implicit. Teams that rely on memory instead of documented release procedures eventually publish the wrong artifact, the wrong listing text, or the wrong rollout configuration.',
    ],
    bullets: [
      'It does not replace build automation.',
      'It does not replace local and CI-based quality checks.',
      'It does not remove policy responsibility from the team.',
      'It should not be the only place release knowledge exists.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, Play Console work is rarely just upload and publish. Teams deal with staged rollouts, release halts, tester groups, store listing changes, review timing, app signing implications, crash visibility, and changing policy requirements. The operational burden is manageable, but only with discipline.',
      'As of March 31, 2026, Play Console workflows also continue to reflect stronger verification, testing, and policy enforcement expectations than many older tutorials assume. Teams should rely on current official guidance rather than recycled publishing checklists from years ago.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When preparing a Play release, the useful questions are concrete. Is the bundle correct? Is the version code unique? Is the app signing path clear? Is the release going to the correct track? Are the testers correct? Are the listing assets and declarations current? Is the rollout strategy appropriate for the risk?',
      'Most publishing mistakes come from unclear process rather than from complex technology. The best response is a documented release flow and a narrow set of responsible owners.',
    ],
    bullets: [
      'Treat release operations as a repeatable workflow.',
      'Separate testing, review, and production decisions clearly.',
      'Keep listing, policy, and artifact changes synchronized.',
      'Use staged rollout and monitoring when risk is meaningful.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-account-app-setup',
    title: 'Developer Account and App Setup',
    paragraphs: [
      'Play distribution begins with a developer account and a specific app record in Play Console. Creating the app establishes core identity information such as default language, app name, package identity expectations, and the initial operational shell for releases, listings, and declarations.',
      'This matters because an app listing is not just metadata pasted in later. The Play app record becomes the long-lived container for every subsequent release, test track, policy declaration, and visibility decision.',
    ],
  },
  {
    id: 'core-package-identity',
    title: 'Package Name, Versioning, and Artifact Identity',
    paragraphs: [
      'Play Console expects a stable package identity and valid version progression. The package name is effectively the long-term identity of the Android app on Play, while version codes must move forward correctly for updates to be accepted.',
      'This is why release operations depend on disciplined build outputs. If package naming, version codes, or signing change unexpectedly, Play Console will surface the mismatch immediately because the store must protect app continuity for users.',
    ],
  },
  {
    id: 'core-app-bundle',
    title: 'Android App Bundles and Upload Artifacts',
    paragraphs: [
      'Modern Play distribution centers on the Android App Bundle rather than treating raw APK upload as the main strategy. The bundle format lets Play generate optimized delivery artifacts for devices, which is one reason the build and publishing pipeline is so closely connected.',
      'For teams, this means the release artifact is not just a file. It is a structured package whose package identity, versioning, signing path, and included content must match the expectations already established in Play.',
    ],
  },
  {
    id: 'core-app-signing',
    title: 'Play App Signing and Key Management',
    paragraphs: [
      'Play App Signing is a central operational concept. Instead of treating signing as a purely local detail, Play can manage the app signing key while developers upload artifacts signed with an upload key. This separates ongoing release operations from the most sensitive signing material.',
      'The practical lesson is that signing is not just a build checkbox. It is part of release security and app continuity. Teams must understand whether they are using Play App Signing, which key is used where, and how key management affects future updates.',
    ],
  },
  {
    id: 'core-tracks',
    title: 'Internal, Closed, Open, and Production Tracks',
    paragraphs: [
      'Play Console supports multiple release tracks so teams can control exposure. Internal testing is optimized for fast limited distribution. Closed testing is for selected groups. Open testing broadens exposure without declaring full production readiness. Production is the general public release surface.',
      "This staged model is operationally valuable because confidence should increase before audience size does. Teams that skip track discipline lose one of Play Console's most important risk-management tools.",
    ],
  },
  {
    id: 'core-rollouts',
    title: 'Staged Rollouts, Halts, and Release Control',
    paragraphs: [
      'Production release does not have to mean instant exposure to all users. Staged rollout lets a team release to a percentage of the audience first, observe behavior, and then expand if quality looks healthy. That is one of the safest ways to ship meaningful changes.',
      'The engineering point is that rollout percentage is part of release strategy, not marketing decoration. Risky builds should generally not skip progressive exposure when the platform offers it.',
    ],
  },
  {
    id: 'core-listing-store-presence',
    title: 'Store Listing, Assets, and Store Presence',
    paragraphs: [
      'Play Console is also where the public face of the app is maintained. Titles, short and full descriptions, screenshots, feature graphics, localized listings, categories, and contact details all influence discovery and conversion.',
      'This is not purely a marketing concern. Listing accuracy affects user expectations, policy compliance, and support burden. A misleading listing can be both a product problem and a policy problem.',
    ],
  },
  {
    id: 'core-policy-declarations',
    title: 'Policy, Content, and App Content Declarations',
    paragraphs: [
      'Publishing on Play requires more than a binary artifact. Developers must maintain policy-related declarations such as app content information, target audience details where applicable, data and privacy disclosures, and other Play-required metadata.',
      'These declarations are operationally significant because they can block releases or create compliance risk when they drift away from the actual app behavior. Product changes and declarations must stay synchronized.',
    ],
  },
  {
    id: 'core-testing-prelaunch',
    title: 'Testing Surfaces and Pre-Launch Signals',
    paragraphs: [
      'Play Console offers testing infrastructure beyond simple upload. Teams can manage tester groups and review platform-generated quality signals such as pre-launch testing outputs where available. This helps catch device and stability issues before broad exposure.',
      'The main discipline is to treat Play testing surfaces as an additional safety layer, not as a substitute for your own QA. They are most valuable when integrated into an already serious testing process.',
    ],
  },
  {
    id: 'core-vitals-quality',
    title: 'Android Vitals, Crashes, and Quality Monitoring',
    paragraphs: [
      'After release, Play Console becomes a quality-monitoring surface. Crash trends, ANR-related signals, user-impact metrics, and release-level health views help teams decide whether a rollout is healthy or whether production exposure should be paused.',
      'This is why Play Console belongs in incident response and release review processes. A store publishing surface that also exposes quality signals is part of operations, not just distribution.',
    ],
  },
  {
    id: 'core-monetization-growth',
    title: 'Monetization, Pricing, and Growth Surfaces',
    paragraphs: [
      'Play Console is also where monetization-related settings, pricing choices, in-app product surfaces, and some growth-oriented configuration are coordinated. For paid apps, subscriptions, or in-app items, the console becomes part of the commercial system as well as the technical release system.',
      'That means publishing operations often intersect with finance, product, and support decisions. Teams should not assume engineering alone owns every console change, even if engineering owns the release artifact.',
    ],
  },
  {
    id: 'core-access-roles',
    title: 'Users, Permissions, and Operational Ownership',
    paragraphs: [
      'Play Console supports role-based access. That is important because release management, store listing editing, finance, and policy administration are often different responsibilities. Proper access boundaries reduce both accidental mistakes and security risk.',
      'The right pattern is usually narrow permissions plus documented ownership. Shared credentials or overly broad admin access make publishing much more fragile than it needs to be.',
    ],
  },
  {
    id: 'core-automation',
    title: 'Automation and API-Adjacent Workflows',
    paragraphs: [
      'Although Play Console is a web interface, many teams integrate publishing with automated workflows using tools that interact with Play distribution and metadata management. That can reduce manual error, especially for repetitive internal or staged releases.',
      'Automation should not hide release intent. The safest automation reinforces review, version control, and track discipline instead of silently pushing artifacts without human clarity.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Google Play Console Mistakes',
    paragraphs: [
      'Common mistakes include uploading the wrong build to the wrong track, mismatching version codes, letting store listings drift from real product behavior, leaving declarations outdated after feature changes, and giving too many people too much console access.',
      'Another frequent mistake is skipping staged rollout on risky releases. Teams sometimes assume the build is done because CI passed, but release safety depends on exposure strategy and monitoring as much as it depends on compilation success.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-versioning',
    title: 'Build-Side Versioning That Matches Play Expectations',
    description: [
      'Play release operations depend on the uploaded artifact having the correct package identity and a monotonically increasing version code.',
    ],
    code: `android {
  defaultConfig {
    applicationId = "com.example.app"
    versionCode = 42
    versionName = "2.3.0"
  }
}`,
    notes: [
      'If the version code does not advance correctly, Play will reject the update path.',
      'Artifact identity discipline begins in the build, not in the console UI.',
    ],
  },
  {
    id: 'examples-track-flow',
    title: 'A Disciplined Track Progression',
    description: [
      'Play Console is safest when releases move through tracks intentionally rather than jumping straight to full production exposure.',
    ],
    code: `internal -> closed -> open -> production

candidate build:
  1. upload AAB
  2. validate testers and notes
  3. review quality signals
  4. start staged rollout
  5. expand if stable`,
    notes: [
      'This is an operational example, not a required universal sequence.',
      'The important idea is progressive confidence before progressive exposure.',
    ],
  },
  {
    id: 'examples-fastlane',
    title: 'Automated Metadata or Release Upload',
    description: [
      'Teams often reduce manual publishing errors by driving repetitive release steps from versioned automation instead of re-entering everything manually.',
    ],
    code: `fastlane supply \\
  --aab app-release.aab \\
  --track internal \\
  --release_status draft`,
    notes: [
      'Automation is helpful when it preserves reviewability and track clarity.',
      'The exact toolchain can vary, but version-controlled publishing steps are usually safer than memory-driven ones.',
    ],
  },
  {
    id: 'examples-app-signing',
    title: 'Upload Key Versus App Signing Key',
    description: [
      'A clear signing model is one of the most important release concepts for Play distribution.',
    ],
    code: `local build -> sign with upload key -> upload to Play
Play App Signing -> signs delivery artifacts with app signing key`,
    notes: [
      'Teams should document which key is used for upload and which key Play manages for app signing.',
      'Confusion here creates long-term update and security risk.',
    ],
  },
  {
    id: 'examples-release-checklist',
    title: 'Release Checklist Snapshot',
    description: [
      'Even when release steps happen partly inside the console, a repeatable checklist keeps operational decisions explicit.',
    ],
    code: `release checklist
---------------
[ ] correct AAB selected
[ ] version code verified
[ ] release notes updated
[ ] track confirmed
[ ] declarations current
[ ] staged rollout chosen
[ ] monitoring owner assigned`,
    notes: [
      'This kind of checklist is often more valuable than a complicated publishing ritual.',
      'Ownership after rollout matters as much as the upload itself.',
    ],
  },
  {
    id: 'examples-team-access',
    title: 'Role Separation by Responsibility',
    description: [
      'Play Console works better when responsibilities map to roles instead of everyone receiving full access.',
    ],
    code: `engineering: releases, tracks, artifacts
product/marketing: listing text, assets
finance: payments and monetization surfaces
compliance/legal: policy and declarations review`,
    notes: [
      'Exact team boundaries vary, but role clarity reduces operational mistakes.',
      'Permission design is part of release safety.',
    ],
  },
  {
    id: 'examples-monitoring',
    title: 'Post-Release Monitoring Loop',
    description: [
      'Publishing is incomplete until the team watches the result and decides whether the rollout remains healthy.',
    ],
    code: `after rollout:
  inspect crash and ANR signals
  review tester or user feedback
  confirm store listing reflects live build
  continue or halt staged rollout`,
    notes: [
      'Play Console is useful precisely because release and monitoring are connected.',
      'The safest teams define this response path before pressing publish.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-release',
    title: 'Release and Distribution Terms',
    terms: [
      {
        term: 'Google Play Console',
        definition:
          'The web-based management surface for distributing and operating Android apps on Google Play.',
      },
      {
        term: 'Track',
        definition:
          'A release channel such as internal, closed, open, or production used to control audience exposure.',
      },
      {
        term: 'Staged rollout',
        definition:
          'A production release strategy that exposes an update to only a percentage of users at first.',
      },
      {
        term: 'App bundle',
        definition:
          'An Android App Bundle upload artifact used by Play to generate optimized delivery artifacts.',
      },
      {
        term: 'Version code',
        definition:
          'An integer version identifier that must progress correctly for update delivery on Play.',
      },
      {
        term: 'Release notes',
        definition: 'Text associated with a release to describe what changed for a given update.',
      },
      {
        term: 'Country availability',
        definition: 'The set of regions in which an app is distributed through Google Play.',
      },
      {
        term: 'Production release',
        definition: 'The general public track through which an app update reaches normal users.',
      },
    ],
  },
  {
    id: 'glossary-security-policy',
    title: 'Security, Policy, and Review Terms',
    terms: [
      {
        term: 'Play App Signing',
        definition:
          'A Play-managed signing model in which Google Play manages the app signing key while developers upload with an upload key.',
      },
      {
        term: 'Upload key',
        definition:
          'The key used by a developer to sign artifacts before uploading them to Play when Play App Signing is enabled.',
      },
      {
        term: 'App signing key',
        definition: 'The key used for final app signing continuity in Play distribution.',
      },
      {
        term: 'Policy declaration',
        definition:
          'Required information in Play Console about app behavior, content, data handling, or compliance-sensitive areas.',
      },
      {
        term: 'App content',
        definition:
          'Play Console configuration area used for content-related and compliance-related declarations.',
      },
      {
        term: 'Managed publishing',
        definition:
          'A release control mode that lets approved changes wait until the developer chooses to publish them.',
      },
      {
        term: 'Review',
        definition:
          'The process by which Google Play may evaluate app submissions and changes before or during publication.',
      },
      {
        term: 'Permissions and roles',
        definition:
          'Access controls that determine what each user in Play Console is allowed to manage.',
      },
    ],
  },
  {
    id: 'glossary-quality-growth',
    title: 'Quality, Testing, and Growth Terms',
    terms: [
      {
        term: 'Internal testing',
        definition: 'A limited rapid-distribution testing track for a small set of testers.',
      },
      {
        term: 'Closed testing',
        definition: 'A restricted testing track for selected groups before broader exposure.',
      },
      {
        term: 'Open testing',
        definition:
          'A broader public test track that is still distinct from general production release.',
      },
      {
        term: 'Android vitals',
        definition:
          'Play quality signals related to app stability and user-impacting technical health.',
      },
      {
        term: 'Pre-launch report',
        definition:
          'Play-provided testing output intended to help identify issues before broad release.',
      },
      {
        term: 'Store listing',
        definition:
          'The public-facing Play page content for an app, including text and visual assets.',
      },
      {
        term: 'Acquisition',
        definition:
          'The process of attracting users to install the app through discovery and conversion.',
      },
      {
        term: 'Monetization surface',
        definition:
          'A Play-managed area related to pricing, purchases, subscriptions, or commercial setup.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-play-console-matters', label: 'Why Play Console Matters' },
    { id: 'bp-release-lifecycle', label: 'Release Lifecycle' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-account-app-setup', label: 'Account and App Setup' },
    { id: 'core-package-identity', label: 'Package Identity and Versioning' },
    { id: 'core-app-bundle', label: 'App Bundles' },
    { id: 'core-app-signing', label: 'Play App Signing' },
    { id: 'core-tracks', label: 'Release Tracks' },
    { id: 'core-rollouts', label: 'Staged Rollouts' },
    { id: 'core-listing-store-presence', label: 'Store Listing and Assets' },
    { id: 'core-policy-declarations', label: 'Policy and Declarations' },
    { id: 'core-testing-prelaunch', label: 'Testing and Pre-Launch Signals' },
    { id: 'core-vitals-quality', label: 'Vitals and Quality Monitoring' },
    { id: 'core-monetization-growth', label: 'Monetization and Growth' },
    { id: 'core-access-roles', label: 'Users and Permissions' },
    { id: 'core-automation', label: 'Automation Workflows' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-versioning', label: 'Versioning' },
    { id: 'examples-track-flow', label: 'Track Progression' },
    { id: 'examples-fastlane', label: 'Automated Upload' },
    { id: 'examples-app-signing', label: 'Signing Flow' },
    { id: 'examples-release-checklist', label: 'Release Checklist' },
    { id: 'examples-team-access', label: 'Role Separation' },
    { id: 'examples-monitoring', label: 'Post-Release Monitoring' },
  ],
  glossary: [
    { id: 'glossary-release', label: 'Release and Distribution Terms' },
    { id: 'glossary-security-policy', label: 'Security and Policy Terms' },
    { id: 'glossary-quality-growth', label: 'Quality and Growth Terms' },
  ],
}

const pageStyles = `
.play-console-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.play-console-help-window {
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

.play-console-help-titlebar {
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

.play-console-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.play-console-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.play-console-help-control {
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

.play-console-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.play-console-help-tab {
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

.play-console-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.play-console-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.play-console-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.play-console-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.play-console-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.play-console-help-toc-item {
  margin: 0 0 8px;
}

.play-console-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.play-console-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.play-console-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.play-console-help-section {
  margin: 0 0 20px;
}

.play-console-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.play-console-help-content p,
.play-console-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.play-console-help-content p {
  margin: 0 0 10px;
}

.play-console-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.play-console-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.play-console-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.play-console-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .play-console-help-main {
    grid-template-columns: 1fr;
  }

  .play-console-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .play-console-help-window {
    min-height: auto;
  }

  .play-console-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .play-console-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .play-console-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="play-console-help-section">
      <h2 className="play-console-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="play-console-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="play-console-help-section">
      <h2 className="play-console-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="play-console-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="play-console-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="play-console-help-section">
      <h2 className="play-console-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="play-console-help-divider" />}
    </section>
  )
}

export default function GooglePlayConsolePage(): JSX.Element {
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
    document.title = `Google Play Console (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Google Play Console',
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
    <div className="play-console-help-page">
      <style>{pageStyles}</style>
      <div className="play-console-help-window" role="presentation">
        <header className="play-console-help-titlebar">
          <span className="play-console-help-titletext">Google Play Console</span>
          <div className="play-console-help-controls">
            <button
              className="play-console-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="play-console-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="play-console-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`play-console-help-tab ${activeTab === tab.id ? 'play-console-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="play-console-help-main">
          <aside className="play-console-help-toc" aria-label="Table of contents">
            <h2 className="play-console-help-toc-title">Contents</h2>
            <ul className="play-console-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="play-console-help-toc-item">
                  <a href={`#${section.id}`} className="play-console-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="play-console-help-content">
            <h1 className="play-console-help-doc-title">Google Play Console</h1>
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
