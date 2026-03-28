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
  'iOS and Android are the two dominant mobile application platforms, but they differ in product economics, hardware diversity, ecosystem rules, developer tooling, design conventions, and release strategy. The useful comparison is not simply which one has better devices or a better language. It is which platform characteristics matter most for the app, the audience, and the organization building it.',
  'In practice, many teams ship on both. The decision is often about prioritization rather than exclusivity: where to launch first, how to allocate engineering effort, what native tradeoffs to accept, and how to handle differences in device fragmentation, app review, monetization, and UI expectations.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'iOS is the mobile platform built around Apple hardware, Apple development tooling, and a tightly controlled ecosystem. Its biggest strengths are hardware and OS consistency, polished platform conventions, predictable device targets, and a generally cohesive developer and user experience.',
      'Android is the mobile platform built around a far wider hardware landscape and a more open ecosystem. Its biggest strengths are device reach, market breadth, flexibility, hardware diversity, and deep platform penetration across a wide range of price points and manufacturers.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Are Both Trying to Enable',
    paragraphs: [
      'Both platforms support serious mobile products, rich UI frameworks, secure application models, local and cloud data access, push notifications, offline behavior, biometrics, payments, and modern performance expectations. Both can support world-class consumer and enterprise applications.',
      'The real differences show up in consistency versus variety, review control versus flexibility, and the amount of device complexity the team must absorb during development and QA.',
    ],
    bullets: [
      'Both can power large consumer and enterprise apps.',
      'Both support modern mobile performance and security models.',
      'Both have mature SDKs, tooling, and app distribution channels.',
      'Both can be excellent first-class targets depending on the product.',
    ],
  },
  {
    id: 'bp-when-ios-fits',
    title: 'When iOS Is Usually the Better First Priority',
    paragraphs: [
      'iOS is often the better first priority when the team wants a narrower device matrix, more consistent hardware behavior, and a more tightly curated ecosystem. It is commonly favored by teams optimizing for premium user experience, faster QA focus, and platform polish.',
      'It is also attractive when the target audience is concentrated in markets or segments where iPhone usage, retention, and monetization are especially strong.',
    ],
    bullets: [
      'Products prioritizing consistent hardware and OS behavior.',
      'Teams with limited QA capacity that benefit from a smaller device matrix.',
      'Apps where premium UX polish and platform coherence are central.',
      'Launch strategies focused on narrower but often high-value audience segments.',
    ],
  },
  {
    id: 'bp-when-android-fits',
    title: 'When Android Is Usually the Better First Priority',
    paragraphs: [
      'Android is often the better first priority when broad device reach, market coverage, and distribution flexibility matter most. It is especially valuable when the product targets large global audiences, varied device price points, or emerging markets where Android adoption is dominant.',
      'It is also attractive when the app benefits from deeper device variety, hardware experimentation, or more flexible distribution patterns within the platform rules.',
    ],
    bullets: [
      'Products targeting the broadest possible device footprint.',
      'Apps aimed at diverse global markets and price ranges.',
      'Use cases where hardware variety is a feature rather than a burden.',
      'Distribution strategies that benefit from Android’s wider ecosystem.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The real question is not Which platform is superior. The real question is Which platform characteristics align best with the product strategy, user base, testing budget, monetization model, and engineering organization.',
    ],
    bullets: [
      'Prioritize iOS when consistency and polish dominate.',
      'Prioritize Android when reach and device diversity dominate.',
      'Plan for both when the product is mainstream and cross-market.',
      'Let audience, monetization, and QA realities drive the order of investment.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-device-landscape',
    title: 'Device Landscape and Fragmentation',
    paragraphs: [
      'iOS runs on a relatively small and controlled family of devices. This dramatically simplifies testing, performance tuning, and UI predictability. Engineers can usually reason about a smaller matrix of screen sizes, chipsets, OS support behavior, and vendor-specific quirks.',
      'Android runs across a much broader range of manufacturers, screen sizes, hardware capabilities, and software customizations. This creates more engineering and QA complexity, but it also enables much broader reach and access to more device categories and user segments.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Development Experience',
    paragraphs: [
      'iOS development is centered around Xcode, Swift, and Apple’s platform tooling. The environment is opinionated and tightly integrated, which many teams find productive once they are inside the Apple ecosystem.',
      'Android development is centered around Android Studio, Kotlin and Java, and a more open device and build landscape. It offers strong tooling as well, but the broader ecosystem means developers more often deal with a wider range of runtime and device scenarios.',
    ],
  },
  {
    id: 'core-language-frameworks',
    title: 'Languages and Native Frameworks',
    paragraphs: [
      'Modern iOS development is strongly associated with Swift and SwiftUI or UIKit, depending on app maturity and UI strategy. Swift is expressive and highly aligned with Apple’s platform evolution.',
      'Modern Android development is strongly associated with Kotlin and Jetpack Compose or the traditional Android view system. Kotlin is expressive, pragmatic, and broadly admired for its balance of safety and productivity.',
    ],
  },
  {
    id: 'core-design-expectations',
    title: 'Design Conventions and UX Expectations',
    paragraphs: [
      'iOS users and designers often expect strong alignment with Apple platform conventions, smooth animation, careful typography, and a polished interaction model. Platform consistency matters because the ecosystem is tightly curated and deviations are more visible.',
      'Android has strong design systems as well, especially through Material design principles, but the platform is generally more varied in hardware and OEM presentation. This can make adaptability and responsiveness more important than strict uniformity.',
    ],
  },
  {
    id: 'core-release-review',
    title: 'Release Process and Store Review',
    paragraphs: [
      'iOS distribution is shaped heavily by Apple’s review process and platform policies. This can improve consistency and trust, but it also means teams must plan around stricter gatekeeping and less flexibility in some product decisions.',
      'Android distribution through Google Play still involves review and policy requirements, but the broader ecosystem historically offers somewhat more distribution flexibility. The operational implication is that teams may experience fewer bottlenecks in some release scenarios, though policy compliance remains essential.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-performance-testing',
    title: 'Performance and Testing Reality',
    paragraphs: [
      'iOS often feels easier to optimize and validate because the hardware and OS combinations are more constrained. That does not make optimization trivial, but it means performance investigations often start from a more stable baseline.',
      'Android performance and testing can demand more device-aware planning because users may be on very different hardware tiers and OEM environments. This increases the value of representative device coverage, performance budgets, and careful handling of background behavior and memory constraints.',
    ],
  },
  {
    id: 'core-market-reach',
    title: 'Market Reach and Audience Strategy',
    paragraphs: [
      'iOS is often associated with strong monetization in certain regions and premium consumer segments. For some products, especially those targeting a narrower high-value audience, this can justify launching on iOS first.',
      'Android usually offers broader reach across global markets and a much wider range of devices. For products optimizing for total addressable audience, mass adoption, or device accessibility across many price points, Android often becomes a strategic priority.',
    ],
  },
  {
    id: 'core-enterprise-internal',
    title: 'Enterprise and Internal App Considerations',
    paragraphs: [
      'In enterprise environments, iOS may be favored where device fleets are standardized and operational control is tight. That can reduce support variability and simplify device management policies.',
      'Android may be favored in enterprise or field environments where hardware diversity, rugged devices, custom OEM capabilities, or budget flexibility matter more than uniformity. The right answer depends heavily on how the devices will actually be used in the business.',
    ],
  },
  {
    id: 'core-cross-platform-impact',
    title: 'Impact on Cross-Platform Strategy',
    paragraphs: [
      'The iOS versus Android decision also affects whether teams invest in native development, shared business logic, or cross-platform UI frameworks. Platform differences are sometimes small enough to abstract, but often large enough that native polish or platform-specific behavior still matters.',
      'Even in cross-platform teams, understanding the native tradeoffs matters because product decisions, QA strategy, device support, and release policy are still platform-specific.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'iOS often wins on consistency, predictability, and a highly controlled user and developer environment. Android often wins on reach, device diversity, and ecosystem breadth. Those are strategic tradeoffs, not merely technical details.',
      'The common mistake is to treat one platform as the premium choice and the other as the scale choice in every case. The right answer depends on audience, geography, product category, monetization, distribution model, and the engineering capacity to support platform differences well.',
    ],
    bullets: [
      'Choose iOS for consistency and focused device support.',
      'Choose Android for reach and hardware diversity.',
      'Invest in both when the product is broadly consumer facing.',
      'Let product strategy and QA realities drive prioritization.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the team is building two native apps, design shared product logic and service contracts carefully so platform-specific UI and system integration differences do not create unnecessary divergence. Shared architecture matters even when the codebases are separate.',
      'If the team must choose a launch order, prioritize the platform whose users, device constraints, and monetization profile align best with the first phase of the product. Native platform strategy is part of product strategy, not just implementation detail.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-device-matrix',
    title: 'Testing Matrix Contrast',
    description: [
      'One of the most practical differences between the platforms is the testing surface area that teams must support.',
    ],
    code: `iOS testing focus:
small set of device families
consistent vendor control
tighter OS and hardware pairing

Android testing focus:
many manufacturers
many screen sizes and hardware tiers
greater variation in runtime behavior`,
    notes: [
      'This difference affects QA budget, release confidence, and performance verification.',
      'The product decision often has an immediate operational testing consequence.',
    ],
  },
  {
    id: 'examples-native-stack',
    title: 'Typical Native Stack',
    description: [
      'Each platform has a native language and UI stack that shapes development style and platform idioms.',
    ],
    code: `iOS:
Swift
SwiftUI or UIKit
Xcode

Android:
Kotlin
Jetpack Compose or View system
Android Studio`,
    notes: [
      'The stacks are both mature, but their surrounding ecosystems and conventions differ.',
      'Hiring and team familiarity often influence the choice as much as product requirements do.',
    ],
  },
  {
    id: 'examples-release-path',
    title: 'Release Path Thinking',
    description: [
      'Platform choice changes how teams think about release friction, review timing, and operational planning.',
    ],
    code: `iOS release mindset:
plan around stricter review expectations
optimize for platform consistency

Android release mindset:
plan for broader device variation
optimize for distribution reach`,
    notes: [
      'Neither platform is effortless; the friction just appears in different places.',
      'Release planning is part of platform strategy, not just a final deployment step.',
    ],
  },
  {
    id: 'examples-product-priority',
    title: 'Product Priority Example',
    description: [
      'In practice, launch order often follows product strategy more than engineering preference.',
    ],
    code: `Launch iOS first when:
premium UX and constrained QA matrix matter more

Launch Android first when:
reach, market breadth, and device accessibility matter more`,
    notes: [
      'This is a strategic framing rather than a universal rule.',
      'Audience and market shape should drive the initial platform bet.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-ios',
    title: 'iOS Terms',
    terms: [
      {
        term: 'Swift',
        definition:
          'Apple’s modern programming language for iOS and other Apple-platform development.',
      },
      {
        term: 'SwiftUI',
        definition: 'A declarative UI framework used to build Apple-platform interfaces.',
      },
      {
        term: 'UIKit',
        definition: 'A long-established imperative UI framework for iOS application development.',
      },
      {
        term: 'App Review',
        definition:
          'The approval process applied before distributing apps through Apple’s store ecosystem.',
      },
    ],
  },
  {
    id: 'glossary-android',
    title: 'Android Terms',
    terms: [
      {
        term: 'Kotlin',
        definition: 'The modern preferred language for native Android development.',
      },
      {
        term: 'Jetpack Compose',
        definition: 'Android’s declarative UI toolkit for building native interfaces.',
      },
      {
        term: 'OEM',
        definition:
          'Original equipment manufacturer, referring to vendors that produce Android devices and often customize the platform.',
      },
      {
        term: 'Fragmentation',
        definition:
          'Variation across devices, manufacturers, hardware capabilities, and OS environments within the Android ecosystem.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Mobile Terms',
    terms: [
      {
        term: 'Device Matrix',
        definition:
          'The set of device types, screen sizes, OS versions, and hardware tiers an app team must support and test.',
      },
      {
        term: 'Native App',
        definition:
          'An application built specifically for a platform using that platform’s primary SDKs and runtime conventions.',
      },
      {
        term: 'App Store Distribution',
        definition:
          'The process of shipping an app through the official platform marketplace and its associated rules.',
      },
      {
        term: 'Monetization Profile',
        definition:
          'The revenue behavior and business characteristics of a product within a specific audience or platform ecosystem.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-ios-fits', label: 'When iOS Fits' },
    { id: 'bp-when-android-fits', label: 'When Android Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-device-landscape', label: 'Device Landscape and Fragmentation' },
    { id: 'core-tooling', label: 'Tooling and Development Experience' },
    { id: 'core-language-frameworks', label: 'Languages and Native Frameworks' },
    { id: 'core-design-expectations', label: 'Design Conventions and UX Expectations' },
    { id: 'core-release-review', label: 'Release Process and Store Review' },
    { id: 'core-performance-testing', label: 'Performance and Testing Reality' },
    { id: 'core-market-reach', label: 'Market Reach and Audience Strategy' },
    { id: 'core-enterprise-internal', label: 'Enterprise and Internal Apps' },
    { id: 'core-cross-platform-impact', label: 'Cross-Platform Impact' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-device-matrix', label: 'Testing Matrix Contrast' },
    { id: 'examples-native-stack', label: 'Typical Native Stack' },
    { id: 'examples-release-path', label: 'Release Path Thinking' },
    { id: 'examples-product-priority', label: 'Product Priority Example' },
  ],
  glossary: [
    { id: 'glossary-ios', label: 'iOS Terms' },
    { id: 'glossary-android', label: 'Android Terms' },
    { id: 'glossary-shared', label: 'Shared Mobile Terms' },
  ],
}

const pageStyles = `
.ios-android-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ios-android-help-window {
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

.ios-android-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  min-height: 24px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ios-android-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.ios-android-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.ios-android-help-control {
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

.ios-android-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.ios-android-help-tab {
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

.ios-android-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.ios-android-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.ios-android-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.ios-android-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ios-android-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ios-android-help-toc-item {
  margin: 0 0 8px;
}

.ios-android-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ios-android-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.ios-android-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.ios-android-help-section {
  margin: 0 0 20px;
}

.ios-android-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ios-android-help-content p,
.ios-android-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ios-android-help-content p {
  margin: 0 0 10px;
}

.ios-android-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ios-android-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.ios-android-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.ios-android-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .ios-android-help-main {
    grid-template-columns: 1fr;
  }

  .ios-android-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .ios-android-help-page {
    min-height: auto;
  }

  .ios-android-help-window {
    min-height: auto;
  }

  .ios-android-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .ios-android-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    white-space: normal;
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
    <section key={section.id} id={section.id} className="ios-android-help-section">
      <h2 className="ios-android-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="ios-android-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ios-android-help-section">
      <h2 className="ios-android-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="ios-android-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="ios-android-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ios-android-help-section">
      <h2 className="ios-android-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="ios-android-help-divider" />}
    </section>
  )
}

export default function IOSVsAndroidPage(): JSX.Element {
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
    document.title = `iOS vs Android (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'iOS vs Android',
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
    <div className="ios-android-help-page">
      <style>{pageStyles}</style>
      <div className="ios-android-help-window" role="presentation">
        <header className="ios-android-help-titlebar">
          <span className="ios-android-help-titletext">iOS vs Android</span>
          <div className="ios-android-help-controls">
            <button
              className="ios-android-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="ios-android-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ios-android-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ios-android-help-tab ${activeTab === tab.id ? 'ios-android-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ios-android-help-main">
          <aside className="ios-android-help-toc" aria-label="Table of contents">
            <h2 className="ios-android-help-toc-title">Contents</h2>
            <ul className="ios-android-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="ios-android-help-toc-item">
                  <a href={`#${section.id}`} className="ios-android-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ios-android-help-content">
            <h1 className="ios-android-help-doc-title">iOS vs Android</h1>
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
