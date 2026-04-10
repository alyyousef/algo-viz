import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'Expo vs React Native CLI'
const pageSubtitle = 'Comparing the Expo framework path with React Native without a framework.'
const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What the comparison really means now',
    paragraphs: [
      'This topic is commonly phrased as “Expo vs React Native CLI,” but the current React Native documentation is more precise: React Native recommends using a framework such as Expo for most new apps, and the alternative path is “React Native without a framework,” which uses the Community CLI rather than the old global `react-native-cli` package.',
      'That wording matters because many older blog posts still frame the decision as managed Expo versus fully native React Native. That is no longer a good mental model. Expo today can include custom native code, local native modules, development builds, and prebuild-driven native projects.',
    ],
  },
  {
    title: 'What Expo is',
    paragraphs: [
      'Expo is a framework and toolchain around React Native. It provides project scaffolding, dev tooling, APIs, app services, web support, routing options, update workflows, and a development model that aims to remove a large amount of mobile build-system friction.',
      'The React Native framework page currently says, “To build a new app with React Native, we recommend a framework like Expo.” That is the clearest current signal from the React Native docs about where most teams should start.',
    ],
  },
  {
    title: 'What the no-framework path is',
    paragraphs: [
      'React Native without a framework means your project is closer to raw React Native plus native iOS and Android projects, Gradle, Xcode, CocoaPods, and the Community CLI path. You are working more directly with the underlying native build environment and with the React Native project template itself.',
      'This path gives maximal control and the shortest distance to native configuration, but it also means your team owns more build setup, more low-level integration work, and more of the operational complexity around native tooling.',
    ],
  },
  {
    title: 'What people often get wrong',
    paragraphs: [
      'The old claim that Expo is only for simple apps is outdated. Expo’s current docs explicitly cover development builds, adding custom native code, local Expo modules, prebuild, and even brownfield integration patterns.',
      'The old claim that React Native CLI is always more professional is also shallow. The real question is not professionalism. The real question is whether your team benefits more from a framework that standardizes the workflow or from owning the native project surface directly from day one.',
    ],
  },
  {
    title: 'Short version',
    paragraphs: [
      'Choose Expo when you want the recommended modern React Native framework path, faster onboarding, less build-system friction, and a stronger default developer experience. Choose the no-framework Community CLI path when you know you need direct native project ownership, unusual native setup, or a workflow that does not fit Expo’s framework assumptions.',
      'For many teams in 2026, Expo is the right default and the no-framework path is the deliberate exception, not the prestige option.',
    ],
  },
]

const decisionGuide: Array<{ title: string; choice: string }> = [
  {
    title: 'Need the default recommended starting point for most new React Native apps',
    choice: 'Prefer Expo.',
  },
  {
    title: 'Need direct control over native projects from the first commit',
    choice: 'Prefer React Native without a framework.',
  },
  {
    title: 'Need faster onboarding for web-first or JavaScript-first teams',
    choice: 'Prefer Expo.',
  },
  {
    title:
      'Need to integrate an unusual native SDK or custom native architecture immediately and heavily',
    choice: 'Prefer the no-framework path unless Expo prebuild or modules clearly cover it.',
  },
  {
    title: 'Need Expo’s tooling, services, development builds, updates, and polished DX',
    choice: 'Prefer Expo.',
  },
  {
    title:
      'Need full ownership of Gradle, Xcode targets, native dependency wiring, and manual native customization',
    choice: 'Prefer React Native without a framework.',
  },
  {
    title: 'Need to move quickly on a standard mobile app with normal native requirements',
    choice: 'Expo is usually the better default.',
  },
  {
    title: 'Already have a team deeply comfortable with native iOS and Android project maintenance',
    choice: 'The no-framework path may be reasonable if that control is actually useful.',
  },
  {
    title: 'Need web support and a strongly integrated cross-platform tooling story',
    choice: 'Expo is usually stronger out of the box.',
  },
  {
    title: 'Need a brownfield integration strategy into an existing native app',
    choice:
      'The no-framework path is often more direct, though Expo also documents brownfield approaches.',
  },
]

const historyAndDirection: string[] = [
  'The React Native docs now explicitly recommend using a framework like Expo for new apps, which is a major shift from older community narratives where raw CLI setup was often treated as the default.',
  'Expo has moved far beyond the old managed-workflow stereotype. Development builds, prebuild, local Expo modules, and custom native code support have narrowed the gap between Expo and the no-framework path.',
  'The phrase “React Native CLI” is historically sticky but technically imprecise now. The current React Native docs describe the alternative path as “without a framework,” centered on the Community CLI and direct native tooling ownership.',
  'Because of that shift, the modern decision is less about whether Expo is too limited and more about whether the team actually needs to bypass Expo’s framework layer.',
]

const decisionQuestions: string[] = [
  'Do you actually need direct native project control today, or do you merely want the option someday?',
  'Would your team benefit more from faster iteration and less mobile-tooling overhead, or from lower-level native freedom from day one?',
  'Are your native requirements standard enough that Expo prebuild, development builds, and native modules can cover them?',
  'Is the team primarily JavaScript and product focused, or is it already strong in native iOS and Android build tooling?',
  'Do you need to support platform targets or workflows that are better served by direct React Native native-project ownership?',
  'If Expo did not exist, would you choose the no-framework path because of real requirements or because of developer identity and habit?',
]

const coreConceptSections: Array<{ id: string; heading: string; paragraphs: string[] }> = [
  {
    id: 'core-terminology',
    heading: 'Terminology Matters',
    paragraphs: [
      'The phrase “React Native CLI” is still useful as shorthand, but it can hide the current architecture of the ecosystem. The React Native site now divides the world into framework-based development and “without a framework” development, and it explicitly recommends the framework path for most new projects.',
      'That means a current comparison should really be read as “Expo framework versus React Native without a framework.” If teams do not update that mental model, they often make decisions using 2020-era assumptions about what Expo can and cannot do.',
    ],
  },
  {
    id: 'core-dx',
    heading: 'Developer Experience and Onboarding',
    paragraphs: [
      'Expo is optimized to make the first several weeks of development smoother. Project creation, device testing, common APIs, debugging, updates, and development builds all follow a more guided path. This is valuable because mobile build friction is one of the main reasons product teams lose velocity early.',
      'The no-framework path exposes more of the real native environment immediately. That can be a strength for teams that want control, but it also means developers confront more Gradle, CocoaPods, simulator and emulator setup, native build issues, signing, and project configuration from the start.',
    ],
  },
  {
    id: 'core-native',
    heading: 'Native Code and Native Modules',
    paragraphs: [
      'The old idea that Expo means “no native code” is outdated. Expo’s documentation covers adding custom native code, creating local Expo modules, using development builds, and generating native projects through prebuild. Expo Go has limitations, but Expo as a framework does not stop at Expo Go.',
      'The no-framework path still provides the most direct route when the team wants to edit native projects without any framework mediation. If your workflow depends on deep custom native wiring from the beginning, that directness may still matter.',
    ],
  },
  {
    id: 'core-prebuild',
    heading: 'Prebuild and Continuous Native Generation',
    paragraphs: [
      'Expo prebuild is one of the most important concepts in this comparison. It lets a project start with framework ergonomics while still producing native iOS and Android projects when needed. This collapses part of the old managed-versus-bare distinction.',
      'The tradeoff is that prebuild introduces another layer of convention. For many teams that is a net benefit because it keeps native changes reproducible. For some teams it feels like an extra abstraction between them and the underlying native project files.',
    ],
  },
  {
    id: 'core-builds',
    heading: 'Build and Release Workflow',
    paragraphs: [
      'Expo offers a more integrated build story, especially when paired with Expo Application Services and development builds. The framework path is designed to keep common release workflows coherent without forcing every team to become expert in native build plumbing immediately.',
      'The no-framework path gives maximal freedom but also maximal responsibility. You own the native build graph more directly, which can be an advantage for specialized setups and a drag for ordinary product teams that simply need dependable mobile releases.',
    ],
  },
  {
    id: 'core-updates',
    heading: 'Updates, Delivery, and Operational Model',
    paragraphs: [
      'Expo’s ecosystem includes a clearer story for over-the-air JavaScript and asset updates, environment management, and deployment ergonomics. That is part of why it feels more like a framework than a thin wrapper.',
      'The no-framework path can achieve similar product outcomes, but you assemble more of the operational workflow yourself. This is often acceptable for experienced teams and unnecessary overhead for smaller ones.',
    ],
  },
  {
    id: 'core-platforms',
    heading: 'Platform Coverage',
    paragraphs: [
      'Expo has strong Android, iOS, and web support and provides a cohesive workflow across those targets. For teams building one codebase across common consumer-platform surfaces, that coherence is a real advantage.',
      'React Native without a framework can be the more direct path when a team needs platform targets or native customizations that sit outside Expo’s core assumptions, or when the project needs tighter control over the native app shell for existing enterprise or platform-specific requirements.',
    ],
  },
  {
    id: 'core-dependencies',
    heading: 'Library Compatibility and Ecosystem Fit',
    paragraphs: [
      'Expo works best when the dependency set fits within Expo’s supported ecosystem or can be brought in through development builds and native modules cleanly. For most mainstream app stacks, that is increasingly fine.',
      'The no-framework path reduces the number of framework-level compatibility questions because you are closer to raw React Native integration. The cost is that you perform more integration work and own more native troubleshooting yourself.',
    ],
  },
  {
    id: 'core-upgrades',
    heading: 'Upgrades and Version Discipline',
    paragraphs: [
      'Expo upgrades tend to be organized around Expo SDK releases. That can make upgrades more coherent, but it also means the team often moves with Expo’s release train rather than adopting every new React Native release the moment it lands.',
      'The no-framework path can adopt upstream React Native changes more directly. That sounds attractive until you remember that it also means your team absorbs more of the upgrade burden and native breakage risk directly.',
    ],
  },
  {
    id: 'core-debugging',
    heading: 'Debugging and Failure Surfaces',
    paragraphs: [
      'Expo reduces some low-level failure surfaces by standardizing the workflow. When something breaks, the issue is often inside a more opinionated and documented environment. That can make debugging easier for teams that are not mobile-infrastructure specialists.',
      'The no-framework path gives more direct visibility into native build issues, which can be valuable for experts. It also gives more opportunities to create those issues in the first place because the team is operating closer to the metal.',
    ],
  },
  {
    id: 'core-brownfield',
    heading: 'Brownfield and Existing Native Apps',
    paragraphs: [
      'If you are embedding React Native into an existing iOS or Android app, the no-framework route is often the most natural starting point because you are already working inside native projects and native release processes.',
      'Expo now documents brownfield approaches too, which is notable because it shows how far the framework has expanded. Even so, brownfield work often rewards the shortest path to direct native ownership.',
    ],
  },
  {
    id: 'core-team-shape',
    heading: 'Team Shape and Organizational Fit',
    paragraphs: [
      'Expo is usually strongest when the team is product-oriented, JavaScript-heavy, and trying to move quickly without staffing a deep mobile-platform function. It lowers the amount of native tooling expertise required to be effective.',
      'The no-framework path is often strongest when the team already has real native competence or when the organization needs to make non-standard native changes regularly enough that direct control is worth the cost.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost and Ownership Tradeoff',
    paragraphs: [
      'Expo often lowers the total engineering cost of shipping a normal app because it reduces mobile environment setup, release complexity, and general workflow variance. That matters more than ideological arguments about “purity.”',
      'The no-framework path can be cheaper only when the extra control is actually used. If the team mostly builds standard product features, owning the entire native project surface can become expensive ceremony rather than useful freedom.',
    ],
  },
  {
    id: 'core-recommendations',
    heading: 'What Usually Matters Most',
    paragraphs: [
      'For most teams, the choice turns on one question: do you need to own the native project surface directly right now, or do you mainly need a fast and maintainable way to build a React Native app? If it is the second case, Expo is usually the stronger answer.',
      'The strongest reason to reject Expo is not pride. It is a concrete native requirement or workflow mismatch that Expo’s framework model does not serve well enough for your project.',
    ],
  },
]

const operatingNotes: Array<{ title: string; detail: string }> = [
  {
    title: 'Expo Go and Expo are not the same thing',
    detail:
      'Many outdated arguments confuse limitations of Expo Go with limitations of the Expo framework as a whole. Development builds and prebuild change that conversation materially.',
  },
  {
    title: 'The no-framework path is not automatically better engineered',
    detail:
      'It is simply lower level. That is valuable only when the team truly needs the extra control enough to justify the extra build and integration burden.',
  },
  {
    title: 'Most teams overestimate future native needs',
    detail:
      'Teams often choose the harder path because they might need custom native work later, even when Expo could have served them well for months or years before that point.',
  },
  {
    title: 'Upgrade control cuts both ways',
    detail:
      'Being closer to upstream React Native gives you earlier access and earlier pain. Expo’s release train can be a feature because it packages and stabilizes common workflow pieces.',
  },
  {
    title: 'Framework recommendation is now official',
    detail:
      'The current React Native docs recommending a framework like Expo should materially update any older decision rubric still assuming raw CLI is the default.',
  },
  {
    title: 'Brownfield is the main place the no-framework path keeps a strong natural edge',
    detail:
      'When React Native is entering an already-native app, direct native project ownership is often the simpler mental model.',
  },
]

const workloadFitCases: Array<{ title: string; detail: string }> = [
  {
    title: 'Greenfield consumer mobile app',
    detail:
      'Expo is usually the better default because it optimizes for speed, iteration, and a cleaner cross-platform workflow.',
  },
  {
    title: 'Startup team with strong JavaScript skills but limited native expertise',
    detail:
      'Expo is usually the stronger fit because it lowers the skill floor needed to ship confidently on mobile.',
  },
  {
    title: 'Enterprise app with significant native customization and platform-specific build rules',
    detail:
      'The no-framework path may be the better fit if those constraints are present from the start and central to the project.',
  },
  {
    title: 'Existing iOS or Android app adopting React Native incrementally',
    detail:
      'React Native without a framework is often the more direct path because the work already lives inside native build systems and native release workflows.',
  },
  {
    title: 'Cross-platform app including web where the team wants cohesive tooling',
    detail:
      'Expo is usually stronger because the ecosystem is designed to make that multi-target workflow feel intentional rather than bolted on.',
  },
  {
    title: 'Team with staff who actively maintain native modules and build infrastructure',
    detail:
      'The no-framework path can make sense if that direct ownership is already core to how the organization works.',
  },
]

const pitfalls: string[] = [
  'Using 2020-era arguments about Expo limitations without accounting for development builds, prebuild, and custom native code support.',
  'Treating “React Native CLI” as if it still means the old global CLI package rather than the broader no-framework Community CLI path.',
  'Choosing the no-framework path for prestige rather than for concrete technical requirements.',
  'Choosing Expo and then assuming Expo Go limitations describe the whole framework.',
  'Underestimating how much native build-system work the no-framework path adds for ordinary product teams.',
  'Assuming Expo blocks all native SDK usage instead of checking whether the SDK is supported through modules, prebuild, or development builds.',
  'Assuming future native flexibility is free even when the team does not plan to use it.',
  'Ignoring brownfield constraints when integrating React Native into an existing native application.',
]

const examples: Array<{ id: string; title: string; code: string; explanation: string }> = [
  {
    id: 'ex-create-expo',
    title: 'Create an Expo app',
    code: `npx create-expo-app@latest my-app
cd my-app
npx expo start`,
    explanation:
      'This is the clean framework-first path the current React Native docs recommend for most new projects.',
  },
  {
    id: 'ex-create-rn',
    title: 'Create React Native without a framework',
    code: `npx @react-native-community/cli@latest init MyApp
cd MyApp
npx react-native run-android`,
    explanation:
      'This is closer to the modern “without a framework” path than the older shorthand phrase “React Native CLI” suggests.',
  },
  {
    id: 'ex-dev-build',
    title: 'Expo development-build mental model',
    code: `Expo Go
  -> fast testing, limited native surface

Expo development build
  -> your app shell
  -> your native modules
  -> Expo tooling and workflow`,
    explanation:
      'This is the concept many outdated Expo comparisons miss. Expo development builds change what Expo can realistically support.',
  },
  {
    id: 'ex-prebuild',
    title: 'Expo prebuild mental model',
    code: `app config + Expo modules + plugins
  -> expo prebuild
  -> ios/ and android/ native projects
  -> native build tooling continues from there`,
    explanation:
      'Prebuild is why the modern Expo story is not accurately described as “no native projects.”',
  },
  {
    id: 'ex-decision',
    title: 'Decision shortcut',
    code: `Need the default modern React Native path?
  -> Expo

Need direct native ownership from day one for real reasons?
  -> React Native without a framework

Not sure?
  -> Start with Expo unless a native constraint is already proven`,
    explanation:
      'That rule matches the current direction of the official React Native documentation more closely than older community folklore does.',
  },
]

const glossaryTerms: Array<{ term: string; definition: string }> = [
  {
    term: 'Expo',
    definition:
      'A framework and toolchain built around React Native that provides project scaffolding, APIs, development tools, web support, build services, and structured workflows.',
  },
  {
    term: 'Expo Go',
    definition:
      'A shared runtime app for quickly previewing compatible Expo projects. Its limitations should not be confused with the limits of Expo as a framework.',
  },
  {
    term: 'Development build',
    definition:
      'An Expo-built app shell that includes your own native code and libraries while keeping Expo’s development tooling.',
  },
  {
    term: 'Prebuild',
    definition:
      'Expo’s process for generating native iOS and Android projects from the app configuration and installed modules.',
  },
  {
    term: 'Continuous Native Generation',
    definition:
      'Expo’s idea that native projects can be generated and kept reproducible from higher-level app configuration rather than being treated as manually curated first-class artifacts from day one.',
  },
  {
    term: 'React Native without a framework',
    definition:
      'The modern React Native path where you work directly with the React Native project template, Community CLI, and native iOS and Android project tooling without Expo as the framework layer.',
  },
  {
    term: 'Community CLI',
    definition:
      'The current CLI path used for React Native without a framework. It is the practical modern replacement for what many people still casually call “React Native CLI.”',
  },
  {
    term: 'Brownfield',
    definition:
      'Adding React Native to an existing native iOS or Android application instead of starting a completely new app from scratch.',
  },
  {
    term: 'Native module',
    definition:
      'Code written for iOS, Android, or another native platform that exposes platform capabilities to JavaScript in a React Native app.',
  },
  {
    term: 'EAS',
    definition:
      'Expo Application Services, Expo’s hosted service suite for building, updating, signing, and distributing apps.',
  },
]

const pageSources: string[] = [
  'https://reactnative.dev/docs/environment-setup',
  'https://reactnative.dev/docs/getting-started-without-a-framework',
  'https://reactnative.dev/docs/getting-started-with-a-framework',
  'https://reactnative.dev/docs/community-cli',
  'https://docs.expo.dev/',
  'https://docs.expo.dev/get-started/start-developing/',
  'https://docs.expo.dev/develop/development-builds/introduction/',
  'https://docs.expo.dev/workflow/customizing/',
  'https://docs.expo.dev/modules/get-started/',
  'https://docs.expo.dev/more/expo-cli/',
  'https://docs.expo.dev/brownfield/overview/',
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
    { id: 'bp-decision', label: 'Decision Guide' },
    { id: 'bp-history', label: 'History and Direction' },
    { id: 'bp-questions', label: 'Decision Questions' },
  ],
  'core-concepts': [
    { id: 'core-terminology', label: 'Terminology' },
    { id: 'core-dx', label: 'Developer Experience' },
    { id: 'core-native', label: 'Native Code' },
    { id: 'core-prebuild', label: 'Prebuild' },
    { id: 'core-builds', label: 'Builds and Releases' },
    { id: 'core-updates', label: 'Updates' },
    { id: 'core-platforms', label: 'Platform Coverage' },
    { id: 'core-dependencies', label: 'Dependencies' },
    { id: 'core-upgrades', label: 'Upgrades' },
    { id: 'core-debugging', label: 'Debugging' },
    { id: 'core-brownfield', label: 'Brownfield' },
    { id: 'core-team-shape', label: 'Team Fit' },
    { id: 'core-cost', label: 'Cost and Ownership' },
    { id: 'core-recommendations', label: 'What Matters Most' },
    { id: 'core-notes', label: 'Operating Notes' },
    { id: 'core-workload-fit', label: 'Workload Fit' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ExpoVsReactNativeCliPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Expo Vs React Native Cli Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Expo Vs React Native Cli Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-subheading">{pageSubtitle}</p>
      <p>
        This page compares Expo with the path often called “React Native CLI,” but the current React
        Native docs frame that alternative more accurately as React Native without a framework. The
        real question is whether your team benefits more from Expo’s framework layer or from direct
        ownership of the native project surface.
      </p>
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="expo-rncli-help-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-decision" className="bin98-section">
            <h2 className="bin98-heading">Decision Guide</h2>
            <ul>
              {decisionGuide.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.choice}
                </li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History and Direction</h2>
            <ul>
              {historyAndDirection.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-questions" className="bin98-section">
            <h2 className="bin98-heading">Decision Questions</h2>
            <ul>
              {decisionQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {coreConceptSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="core-notes" className="bin98-section">
            <h2 className="bin98-heading">Operating Notes</h2>
            {operatingNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-workload-fit" className="bin98-section">
            <h2 className="bin98-heading">Workload Fit by Scenario</h2>
            {workloadFitCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
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
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
          <h3 className="bin98-subheading">Primary Source Set</h3>
          <ul>
            {pageSources.map((source) => (
              <li key={source}>
                <a
                  href={source}
                  className="expo-rncli-help-inline-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </TopicPageShell>
  )
}
