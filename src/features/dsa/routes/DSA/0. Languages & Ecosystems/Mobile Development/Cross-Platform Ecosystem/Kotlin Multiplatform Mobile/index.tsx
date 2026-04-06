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
  'Kotlin Multiplatform Mobile, often abbreviated KMM in older discussions, is best understood today as the mobile-focused use of Kotlin Multiplatform. The important point is that it is not a cross-platform UI framework in the same sense as React Native or MAUI. Its core value is sharing business logic, networking, data, domain models, and other non-UI code across Android and iOS while still allowing each platform to keep native UI when that is the right product choice.',
  'That distinction is what makes Kotlin Multiplatform strategically different. It is designed for teams that want cross-platform code reuse without fully abandoning native platform development. Android can remain Kotlin-first and native. iOS can remain Swift or SwiftUI or UIKit-based. Shared code lives in Kotlin modules that both sides consume.',
  'This page is intentionally comprehensive. It covers what Kotlin Multiplatform Mobile actually is, how it relates to modern Kotlin Multiplatform, source sets, shared code boundaries, expect or actual mechanisms, interoperability, shared networking and persistence patterns, native UI strategy, build tooling, architecture choices, performance implications, and the common mistakes teams make when they assume KMM should behave like a one-stack-everywhere framework.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kotlin Multiplatform Mobile is the mobile-focused application of Kotlin Multiplatform for sharing code between Android and iOS. The central idea is not to force both platforms into one UI layer. It is to share the code that actually benefits from sharing while leaving room for native UI and native platform strengths.',
      'That usually means sharing domain logic, networking, serialization, repository logic, use cases, validation, business rules, and sometimes persistence abstractions, while Android and iOS keep platform-specific presentation layers. This makes KMM fundamentally different from UI-first cross-platform frameworks.',
      'The strategic appeal is that teams can reduce duplicate product logic without giving up native user experience. It is a selective-sharing model rather than an all-or-nothing portability model.',
    ],
  },
  {
    id: 'bp-why-kmm-matters',
    title: 'Why KMM Matters',
    paragraphs: [
      'Many mobile teams want to reduce duplication but do not want to accept a single shared UI runtime for both platforms. Kotlin Multiplatform matters because it offers a middle path: shared logic where it is valuable, native UI where it is valuable, and Kotlin as the shared implementation language.',
      'This is especially attractive for Android-first organizations that already use Kotlin heavily and want stronger iOS sharing without discarding the native platform model.',
    ],
    bullets: [
      'It reduces duplication in domain and data layers.',
      'It keeps native UI possible on both platforms.',
      'It fits naturally with Kotlin-heavy Android teams.',
      'It treats cross-platform as selective sharing rather than total unification.',
    ],
  },
  {
    id: 'bp-modern-kmp-context',
    title: 'KMM in the Modern Kotlin Multiplatform Context',
    paragraphs: [
      'Historically, "Kotlin Multiplatform Mobile" was used to describe the Android and iOS use case of Kotlin Multiplatform. In current ecosystem language, the broader term Kotlin Multiplatform is more central, and mobile sharing is one prominent application of it.',
      'That distinction matters because older tutorials sometimes talk as if KMM were a fully separate product. In practice, teams should think in terms of Kotlin Multiplatform capabilities applied to mobile platforms.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where KMM Fits Best',
    paragraphs: [
      'KMM is strongest when the product has meaningful non-UI logic that both Android and iOS need, and when the team wants to preserve native UI and platform-specific polish. It is also a good fit when Android expertise is strong and the organization wants Kotlin to carry more of the shared logic story.',
      'It is less about "write once, run anywhere" and more about "share what is worth sharing without flattening the platforms." Teams that understand that distinction tend to evaluate it more realistically.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What KMM Does Not Replace',
    paragraphs: [
      'KMM does not replace native app development. Android and iOS still exist as native targets with native build pipelines, native UI choices, native release workflows, and native platform capabilities. Shared code does not remove those responsibilities.',
      'It also does not remove architectural discipline. If the shared module becomes a dumping ground for every possible concern, the result is not elegance. It is a harder-to-maintain shared core with unclear ownership.',
    ],
    bullets: [
      'It does not replace native UI frameworks.',
      'It does not remove Android and iOS build responsibilities.',
      'It does not guarantee every feature should be shared.',
      'It does not remove the need for strong app architecture.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, KMM teams usually converge on a selective-sharing strategy. The shared module owns logic, networking, models, and core rules. The platform apps own presentation, platform behavior, and UX details. The healthier the boundary, the healthier the project.',
      'As of March 31, 2026, Kotlin Multiplatform is mature enough that official guidance increasingly frames the model broadly rather than as a narrow experiment, but the mobile use case still requires clear architectural decisions. Teams should rely on current official documentation because older KMM material often reflects outdated naming, tooling, or assumptions.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When evaluating KMM, the useful questions are concrete. How much domain logic is duplicated today? Does the team want native UI on both platforms? Is Kotlin a strategic language in the organization? Can the team support iOS interoperability from shared Kotlin code? Are shared-module boundaries likely to stay disciplined?',
      'Most KMM disappointments come from boundary confusion. The best candidates are teams that want meaningful code sharing but do not want to flatten the entire mobile stack into one abstraction.',
    ],
    bullets: [
      'Share logic deliberately, not everything by default.',
      'Keep platform UI ownership explicit.',
      'Expect real Android and iOS integration work.',
      'Use KMM where business logic duplication is the true pain point.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-kmm-is',
    title: 'What Kotlin Multiplatform Mobile Actually Is',
    paragraphs: [
      'KMM is the use of Kotlin Multiplatform to share code between Android and iOS. Developers write common code in shared source sets and provide platform-specific implementations where required.',
      'The key idea is not just code reuse. The key idea is source-set-based organization with explicit shared and platform-specific boundaries, all within the Kotlin compiler and Gradle ecosystem.',
    ],
  },
  {
    id: 'core-source-sets',
    title: 'Source Sets and Shared Boundaries',
    paragraphs: [
      'Kotlin Multiplatform projects are organized around source sets such as `commonMain`, `androidMain`, and `iosMain`. Shared code lives in common source sets, while platform-specific code lives in their platform source sets.',
      'This structure is one of the most important conceptual tools in KMM because it expresses architecture directly in the project layout. The shared boundary is not vague. It is encoded in the source-set model.',
    ],
  },
  {
    id: 'core-expect-actual',
    title: 'expect and actual for Platform Differences',
    paragraphs: [
      'When shared code needs a platform capability that cannot be implemented identically, Kotlin Multiplatform provides `expect` and `actual` declarations. Shared code expresses the expected contract, and each platform provides the actual implementation.',
      'This is powerful because it keeps the shared module honest about what is truly shared and what still requires native behavior.',
    ],
  },
  {
    id: 'core-shared-logic',
    title: 'What Usually Gets Shared',
    paragraphs: [
      'The most successful KMM projects usually share domain models, use cases, validation, repository logic, serialization, networking clients, caching strategy, and other non-UI logic. These are the areas where duplication is expensive and platform-specific UI is less important.',
      'This is why KMM tends to shine in business-heavy products. When large amounts of product logic exist on both mobile platforms, the shared module can pay off quickly.',
    ],
  },
  {
    id: 'core-native-ui',
    title: 'Native UI Strategy',
    paragraphs: [
      'KMM does not require a shared UI layer. In many teams, Android uses Jetpack Compose or traditional Android UI patterns, while iOS uses SwiftUI or UIKit. The shared module feeds data and behavior into those native UIs.',
      'This is often a strength rather than a compromise. It lets each platform preserve its native feel while still reducing duplicated product logic underneath.',
    ],
  },
  {
    id: 'core-interop',
    title: 'Interoperability with Android and iOS',
    paragraphs: [
      'On Android, shared code integration feels relatively natural because Kotlin is already the dominant language. On iOS, the shared Kotlin code is exposed for use from Swift or Objective-C-facing boundaries. That interop story is central to practical KMM adoption.',
      'This means KMM success depends not only on shared Kotlin quality but also on how cleanly the shared API is designed for platform consumers, especially on iOS.',
    ],
  },
  {
    id: 'core-networking-persistence',
    title: 'Shared Networking and Persistence Patterns',
    paragraphs: [
      'A common KMM pattern is to share networking, serialization, and parts of persistence logic. This reduces duplicated request models, parsing, error mapping, and core data rules across platforms.',
      'The important engineering question is not whether sharing is possible. It is whether the abstraction remains clear. Shared networking and data logic pay off when they represent real common product behavior, not when they hide too much platform-specific complexity.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and Module Design',
    paragraphs: [
      'KMM works best when the shared codebase has a narrow, intentional responsibility. Many teams use a clean architecture or repository-driven model in which the shared layer owns domain and data behavior, while the platform applications own presentation and platform integration.',
      'Without that discipline, the shared module can become bloated and harder to evolve than the duplicated code it was supposed to replace.',
    ],
  },
  {
    id: 'core-build-tooling',
    title: 'Gradle, Tooling, and Project Setup',
    paragraphs: [
      'KMM lives inside the Kotlin and Gradle ecosystem. Build configuration, targets, source sets, dependencies, and publication or integration details are expressed through Gradle and Kotlin Multiplatform tooling.',
      'This is a practical advantage for Android-heavy teams because the build system is familiar, but it also means build clarity matters. A confused multiplatform build becomes difficult quickly.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Shared Code',
    paragraphs: [
      'One of the strongest benefits of KMM is that shared business logic can be tested once at the shared layer instead of re-implemented and re-tested separately on both platforms. This is one of the clearest sources of long-term leverage.',
      'The key is to keep the shared code testable and not over-entangle it with platform-specific behavior that belongs elsewhere.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Reality',
    paragraphs: [
      'KMM performance discussions are usually less about cross-platform UI rendering and more about shared runtime behavior, interop boundaries, data transformations, memory behavior, and how often the shared layer crosses into platform-specific layers.',
      'The practical rule is the same as elsewhere: measure real bottlenecks. KMM is not automatically slow, and it is not automatically free. What matters is where the shared module sits and how it is used.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Reality',
    paragraphs: [
      'KMM is especially attractive to Android-led teams because Kotlin is already native to their workflow. But adoption also depends on iOS team comfort with shared Kotlin modules, interop boundaries, and collaboration patterns around shared ownership.',
      'This is why framework fit is organizational as much as technical. The code can compile while the team model still struggles.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common KMM Mistakes',
    paragraphs: [
      'Common mistakes include trying to share too much too early, treating KMM like a shared UI framework, designing poor shared APIs for iOS consumers, and letting the shared module accumulate unrelated concerns just because it is technically accessible from both platforms.',
      'Another recurring mistake is underestimating the need for native platform expertise. KMM reduces duplication, but it does not erase iOS or Android engineering responsibilities.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-source-sets',
    title: 'Basic Multiplatform Source Set Layout',
    description: [
      'KMM architecture starts with source-set boundaries, so the project layout itself communicates what is shared and what is platform-specific.',
    ],
    code: `src/
  commonMain/
  commonTest/
  androidMain/
  iosMain/`,
    notes: [
      'This is one of the clearest reasons KMM feels different from ad hoc code sharing.',
      'The shared boundary is part of the build model, not just team convention.',
    ],
  },
  {
    id: 'examples-expect-actual',
    title: 'expect and actual Boundary',
    description: [
      'Platform-specific capabilities can be represented cleanly instead of leaking platform checks throughout the shared layer.',
    ],
    code: `// commonMain
expect class PlatformInfo() {
  fun name(): String
}

// androidMain
actual class PlatformInfo {
  actual fun name(): String = "Android"
}`,
    notes: [
      'Shared code stays focused on the contract, while platform code owns the implementation.',
      'This pattern is useful when the capability truly differs by platform.',
    ],
  },
  {
    id: 'examples-shared-repository',
    title: 'Shared Repository Logic',
    description: [
      'A typical KMM win is sharing data-fetching and domain mapping rather than reimplementing it separately on both platforms.',
    ],
    code: `class UserRepository(
  private val api: UserApi,
) {
  suspend fun loadUser(id: String): User {
    return api.getUser(id).toDomain()
  }
}`,
    notes: [
      'This kind of code is high-value to share because it usually reflects real product behavior.',
      'It reduces duplicated business logic more effectively than trying to over-share UI.',
    ],
  },
  {
    id: 'examples-targets',
    title: 'Targets in a Multiplatform Build',
    description: [
      'Build configuration expresses which platforms are part of the shared module contract.',
    ],
    code: `kotlin {
  androidTarget()
  iosX64()
  iosArm64()
  iosSimulatorArm64()
}`,
    notes: [
      'Targets are an explicit build concern, not an implicit promise.',
      'Shared code works because the build knows which platforms it must support.',
    ],
  },
  {
    id: 'examples-swift-consumption',
    title: 'iOS Consumption Mindset',
    description: [
      'The iOS side consumes shared Kotlin output, so API design should remain understandable from Swift-facing code.',
    ],
    code: `shared module
  -> exposes stable domain-facing APIs
  -> avoids leaking confusing internals
  -> keeps platform integration boundaries clear`,
    notes: [
      'Interop quality is a product of API design, not only compiler support.',
      'A shared module that is awkward for iOS consumers will create organizational friction.',
    ],
  },
  {
    id: 'examples-shared-testing',
    title: 'Testing Shared Logic Once',
    description: [
      'One of the biggest long-term benefits of KMM is reducing duplicate testing for shared domain behavior.',
    ],
    code: `class UserValidatorTest {
  @Test
  fun rejectsBlankName() {
    assertFalse(UserValidator.isValid(""))
  }
}`,
    notes: [
      'Testing shared rules at the shared layer is a major source of leverage.',
      'Platform UI tests still matter, but domain duplication can be reduced significantly.',
    ],
  },
  {
    id: 'examples-native-ui',
    title: 'Native UI on Top of Shared Logic',
    description: [
      'KMM is often strongest when both platforms keep native UI while consuming the same shared logic underneath.',
    ],
    code: `Android UI -> shared use cases and repositories
iOS UI -> shared use cases and repositories`,
    notes: [
      'This model preserves platform feel while still reducing duplicated logic.',
      'It captures the core tradeoff that makes KMM attractive to many teams.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core KMM Terms',
    terms: [
      {
        term: 'Kotlin Multiplatform',
        definition:
          'A Kotlin capability for sharing code across multiple targets while still allowing platform-specific implementations.',
      },
      {
        term: 'Kotlin Multiplatform Mobile',
        definition:
          'The mobile-focused use of Kotlin Multiplatform for Android and iOS code sharing.',
      },
      {
        term: 'Source set',
        definition:
          'A named grouping of code in a multiplatform project, such as commonMain or iosMain.',
      },
      {
        term: 'commonMain',
        definition:
          'The shared source set where common cross-platform implementation code typically lives.',
      },
      {
        term: 'androidMain',
        definition:
          'The Android-specific source set for code that only the Android target should compile.',
      },
      {
        term: 'iosMain',
        definition: 'The iOS-specific source set for code that only the iOS target should compile.',
      },
      {
        term: 'expect or actual',
        definition:
          'A Kotlin Multiplatform mechanism for declaring a shared contract and implementing it separately per platform.',
      },
      {
        term: 'Shared module',
        definition:
          'The Kotlin Multiplatform module that contains code reused by multiple platforms.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Platform Terms',
    terms: [
      {
        term: 'Native UI',
        definition:
          'Platform-specific user interface implementation such as Jetpack Compose, SwiftUI, UIKit, or other native frameworks.',
      },
      {
        term: 'Interop',
        definition:
          'The ability for shared Kotlin code to integrate with Android and iOS application layers.',
      },
      {
        term: 'Domain logic',
        definition:
          'Core product rules, validation, use cases, and business behavior that often benefit from sharing.',
      },
      {
        term: 'Repository',
        definition:
          'An application-layer component that coordinates data access and domain-facing operations.',
      },
      {
        term: 'Boundary design',
        definition:
          'The practice of deciding what belongs in shared code versus platform-specific code.',
      },
      {
        term: 'Platform-specific implementation',
        definition:
          'Code written only for Android or only for iOS when true platform divergence exists.',
      },
      {
        term: 'Shared API design',
        definition:
          'The shape of the shared module interfaces exposed to consuming platform applications.',
      },
      {
        term: 'Selective sharing',
        definition:
          'A cross-platform strategy that shares only the layers that truly benefit from sharing.',
      },
    ],
  },
  {
    id: 'glossary-build',
    title: 'Build, Tooling, and Workflow Terms',
    terms: [
      {
        term: 'Gradle target',
        definition:
          'A declared platform target in the multiplatform build configuration, such as androidTarget or iosArm64.',
      },
      {
        term: 'Multiplatform plugin',
        definition:
          'The Kotlin Gradle plugin support that enables multiplatform source sets, targets, and compilation behavior.',
      },
      {
        term: 'Shared test',
        definition:
          'A test written once against shared logic so multiple platforms benefit from the same verification.',
      },
      {
        term: 'Android integration',
        definition:
          'The way the Android app consumes the shared Kotlin module in a multiplatform project.',
      },
      {
        term: 'iOS integration',
        definition:
          'The way the iOS app consumes the shared Kotlin output from the multiplatform project.',
      },
      {
        term: 'Publication',
        definition:
          'The packaging or distribution of a shared module for use by other projects or platform applications.',
      },
      {
        term: 'Version alignment',
        definition:
          'Keeping Kotlin, Gradle, plugins, and platform integrations compatible over time.',
      },
      {
        term: 'Toolchain',
        definition:
          'The combined build and runtime environment used to compile, test, and integrate shared Kotlin code across targets.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-kmm-matters', label: 'Why KMM Matters' },
    { id: 'bp-modern-kmp-context', label: 'KMM and Modern KMP' },
    { id: 'bp-where-it-fits', label: 'Where KMM Fits' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-kmm-is', label: 'What KMM Is' },
    { id: 'core-source-sets', label: 'Source Sets' },
    { id: 'core-expect-actual', label: 'expect and actual' },
    { id: 'core-shared-logic', label: 'Shared Logic' },
    { id: 'core-native-ui', label: 'Native UI Strategy' },
    { id: 'core-interop', label: 'Android and iOS Interop' },
    { id: 'core-networking-persistence', label: 'Networking and Persistence' },
    { id: 'core-architecture', label: 'Architecture and Module Design' },
    { id: 'core-build-tooling', label: 'Build and Tooling' },
    { id: 'core-testing', label: 'Testing Shared Code' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-source-sets', label: 'Source Set Layout' },
    { id: 'examples-expect-actual', label: 'expect and actual' },
    { id: 'examples-shared-repository', label: 'Shared Repository' },
    { id: 'examples-targets', label: 'Build Targets' },
    { id: 'examples-swift-consumption', label: 'iOS Consumption' },
    { id: 'examples-shared-testing', label: 'Shared Testing' },
    { id: 'examples-native-ui', label: 'Native UI on Shared Logic' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core KMM Terms' },
    { id: 'glossary-architecture', label: 'Architecture and Platform Terms' },
    { id: 'glossary-build', label: 'Build and Workflow Terms' },
  ],
}

const pageStyles = `
.kmm-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.kmm-help-window {
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

.kmm-help-titlebar {
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

.kmm-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.kmm-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.kmm-help-control {
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

.kmm-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.kmm-help-tab {
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

.kmm-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.kmm-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.kmm-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.kmm-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.kmm-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.kmm-help-toc-item {
  margin: 0 0 8px;
}

.kmm-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.kmm-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.kmm-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.kmm-help-section {
  margin: 0 0 20px;
}

.kmm-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.kmm-help-content p,
.kmm-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.kmm-help-content p {
  margin: 0 0 10px;
}

.kmm-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.kmm-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.kmm-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.kmm-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .kmm-help-main {
    grid-template-columns: 1fr;
  }

  .kmm-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .kmm-help-window {
    min-height: auto;
  }

  .kmm-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .kmm-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .kmm-help-controls {
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
    <section key={section.id} id={section.id} className="kmm-help-section">
      <h2 className="kmm-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="kmm-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kmm-help-section">
      <h2 className="kmm-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="kmm-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="kmm-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kmm-help-section">
      <h2 className="kmm-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="kmm-help-divider" />}
    </section>
  )
}

export default function KotlinMultiplatformMobilePage(): JSX.Element {
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
    document.title = `Kotlin Multiplatform Mobile (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Kotlin Multiplatform Mobile',
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
    <div className="kmm-help-page">
      <style>{pageStyles}</style>
      <div className="kmm-help-window" role="presentation">
        <header className="kmm-help-titlebar">
          <span className="kmm-help-titletext">Kotlin Multiplatform Mobile</span>
          <div className="kmm-help-controls">
            <button
              className="kmm-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="kmm-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="kmm-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`kmm-help-tab ${activeTab === tab.id ? 'kmm-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="kmm-help-main">
          <aside className="kmm-help-toc" aria-label="Table of contents">
            <h2 className="kmm-help-toc-title">Contents</h2>
            <ul className="kmm-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="kmm-help-toc-item">
                  <a href={`#${section.id}`} className="kmm-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="kmm-help-content">
            <h1 className="kmm-help-doc-title">Kotlin Multiplatform Mobile</h1>
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
