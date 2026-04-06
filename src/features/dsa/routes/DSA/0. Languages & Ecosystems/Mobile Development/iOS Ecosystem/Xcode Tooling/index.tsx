import { useEffect } from 'react'
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

const PAGE_TITLE = 'Xcode Tooling'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Xcode Tooling is the practical development and delivery environment around Apple platform apps. It includes the Xcode IDE, project and workspace configuration, build settings, schemes, simulators, Interface Builder, Instruments, code signing, testing tools, archive and distribution flows, and command-line automation through tools such as xcodebuild and simctl.',
  'The right mental model is not just "the app editor for iOS," but "the operational surface for building, validating, debugging, signing, packaging, and shipping software across Apple platforms." Most Apple app work eventually flows through Xcode tooling even when the application code itself is written with SwiftUI, UIKit, React Native, Flutter, or another higher-level stack.',
  'This page is intentionally comprehensive. It covers the Xcode programming environment, projects and workspaces, schemes and build configurations, simulators and devices, debugging, profiling, testing, signing and provisioning, archives and distribution, automation, practical workflows, tradeoffs, examples, and a glossary of terms that appear frequently in real Apple-platform development.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Xcode Tooling is the integrated development environment and build surface for Apple platform applications. In practice it is where teams edit source, manage targets and packages, run simulators, inspect logs, sign builds, run tests, produce archives, and prepare releases for TestFlight or App Store distribution.',
      'Its importance comes from the fact that Apple platform development is not only about writing Swift or Objective-C. It also involves provisioning, entitlements, device runtimes, archive artifacts, debug symbols, simulator orchestration, and store-facing distribution requirements. Xcode is the control plane for that larger system.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Xcode Tooling Matters',
    paragraphs: [
      'Xcode Tooling matters because Apple platform applications must pass through opinionated native workflows. Even cross-platform teams usually hit Xcode for iOS builds, signing, simulator execution, native dependency integration, and final release packaging. If the tooling workflow is weak, the app workflow eventually becomes weak too.',
      'It also matters because the tooling affects team speed directly. Build reliability, simulator turnaround time, project organization, scheme hygiene, and predictable signing all shape how quickly a team can validate changes and ship releases. Good Xcode usage is therefore an engineering-leverage issue, not just an IDE preference.',
    ],
    bullets: [
      'Central to building and shipping for Apple platforms.',
      'Controls simulator, device, signing, test, and archive workflows.',
      'Affects developer productivity through build and debug speed.',
      'Remains relevant even in many cross-platform app stacks.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of Xcode Tooling as a layered environment. At the top are editing, previews, simulator runs, and interactive debugging. Underneath are targets, build settings, schemes, signing identities, dependency managers, compiler invocations, and archive packaging. The user interface is only one layer of a broader build and release system.',
      'This mental model is useful because many frustrating Xcode issues are not editor issues. They are usually configuration, signing, dependency, simulator, cache, or build-graph issues. Teams work more effectively when they understand which layer of the tooling they are actually debugging.',
    ],
    bullets: [
      'Editor and previews are only the surface layer.',
      'Targets, schemes, and build settings drive actual build behavior.',
      'Signing and provisioning determine whether a build can run or ship.',
      'Automation and CLI tooling matter as much as IDE clicks in serious teams.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Xcode Tooling Fits Best',
    paragraphs: [
      'Xcode Tooling fits best in any project targeting iOS, iPadOS, macOS, watchOS, tvOS, visionOS, or Apple-adjacent runtimes that depend on the native SDK stack. It is the default environment for Swift and Objective-C development, but it also matters for teams integrating Swift packages, CocoaPods, native frameworks, extensions, widgets, and signing-sensitive release processes.',
      'It is especially valuable when the team needs integrated debugging, platform SDK updates, simulator management, asset catalogs, localization tooling, performance profiling, or archive and distribution workflows that align directly with Apple platform expectations.',
    ],
    bullets: [
      'Native Apple platform app development.',
      'Cross-platform projects that still ship through native iOS build flows.',
      'Teams that need integrated simulator, debug, profile, and archive tooling.',
      'Projects with extensions, widgets, capabilities, or entitlement-heavy configurations.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where Xcode Tooling Is Not the Whole Answer',
    paragraphs: [
      'Xcode Tooling is essential for Apple app delivery, but it is not a complete software platform by itself. It does not replace backend systems, feature flagging, product analytics, CI design, release governance, or broader mobile platform strategy. It is one critical environment inside a larger engineering system.',
      'It can also be the wrong place to centralize every automation concern manually. Serious teams usually complement Xcode with source control workflows, CI pipelines, scriptable build steps, package management discipline, and artifact policies rather than treating the IDE as the only operational interface.',
    ],
    bullets: [
      'Not a substitute for CI/CD and release process design.',
      'Not the only place mobile engineering workflow should live.',
      'Needs complementary tooling for collaboration and automation.',
      'Can become brittle if the team relies only on manual IDE actions.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A standard workflow begins with opening a project or workspace, selecting the right scheme and destination, building and running on a simulator or device, and iterating through logs or debugger output. As the app matures, teams add tests, package dependencies, signing setup, archive generation, and distribution-specific configuration for different environments or app targets.',
      'Production workflows extend this with automation. Xcodebuild is used in CI, simulator devices are scripted, archives are exported predictably, and signing assets are managed carefully. The best teams treat the local IDE workflow and the automated pipeline as two views of the same build system rather than separate worlds.',
    ],
    bullets: [
      'Open the correct project or workspace.',
      'Choose scheme, configuration, and simulator or device target correctly.',
      'Debug locally before formal archive and distribution steps.',
      'Mirror local build behavior in CI through scriptable commands.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Xcode Tooling is best understood as the operational environment for Apple platform application development rather than just an editor. Its value comes from connecting code, build settings, simulator behavior, signing rules, debugging, profiling, and release packaging into one coherent flow.',
      'If a team builds for Apple platforms, Xcode Tooling is a first-class engineering concern. Reliable schemes, clear signing setup, reproducible builds, and scriptable automation matter more than memorizing interface clicks or relying on one developer machine that "just works."',
    ],
    bullets: [
      'Treat Xcode as a build and release system, not only an IDE.',
      'Configuration hygiene matters as much as source code quality.',
      'Local and CI workflows should align closely.',
      'Signing, simulator, and archive behavior are part of the real product workflow.',
    ],
  },
]
const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What Xcode Tooling Actually Is',
    paragraphs: [
      'Xcode Tooling is the practical software-development environment around Apple platform SDKs. It includes the Xcode IDE, but also the project model, workspace model, compiler integration, build system, simulator orchestration, debugger, test runners, profiler integrations, signing flows, and distribution paths.',
      'This layered identity matters because most real issues in Apple development are not only source-code issues. They can come from scheme selection, build-configuration drift, provisioning mismatches, simulator runtime differences, stale derived data, package resolution, or export configuration errors.',
    ],
  },
  {
    id: 'core-projects-workspaces',
    title: 'Projects, Workspaces, Targets, and Schemes',
    paragraphs: [
      'An Xcode project describes buildable entities, settings, groups, and targets. A workspace can combine one or more projects and often becomes the entry point when package or dependency tooling creates a broader build graph around the app. Understanding whether the correct entry point is a project or workspace is a basic but important discipline.',
      'Targets describe what can be built, such as the main app, tests, widgets, app extensions, frameworks, or helper bundles. Schemes organize build, run, test, profile, archive, and analyze behavior for selected targets. Teams that do not keep schemes and targets tidy often experience confusing build behavior and inconsistent CI results.',
    ],
    bullets: [
      'Projects define buildable entities and settings.',
      'Workspaces coordinate larger multi-project environments.',
      'Targets represent concrete build outputs such as apps or tests.',
      'Schemes control which targets and actions run in each workflow mode.',
    ],
  },
  {
    id: 'core-build-settings',
    title: 'Build Settings and Configurations',
    paragraphs: [
      'Xcode build behavior is driven heavily by build settings such as bundle identifiers, deployment targets, code-signing values, linker flags, Swift compiler settings, Info.plist paths, and search paths for frameworks or packages. These settings can exist at project level, target level, and configuration-specific levels, which means their effective value is the result of layered resolution rather than one obvious field.',
      'Build configurations such as Debug and Release are critical because local development behavior often differs from shipping behavior. Teams commonly add staging or internal configurations as well. Good configuration hygiene means knowing which settings truly belong in each layer and avoiding duplication that silently diverges over time.',
    ],
    bullets: [
      'Project and target settings can override one another.',
      'Debug and Release should be treated as meaningfully different workflows.',
      'Setting sprawl creates hard-to-debug inconsistencies.',
      'Configuration clarity matters for both local and CI builds.',
    ],
  },
  {
    id: 'core-dependencies',
    title: 'Dependencies, Packages, and Native Integration',
    paragraphs: [
      'Modern Xcode projects often integrate dependencies through Swift Package Manager, and some stacks still involve CocoaPods, binary frameworks, or mixed native modules from other ecosystems. Dependency integration affects indexing, build graphs, simulator compatibility, and sometimes signing behavior.',
      'This is why dependency management is not a side topic. When packages break, the failure often surfaces as build-setting confusion, duplicate symbols, architecture mismatches, or simulator/device inconsistencies. A good team treats dependency resolution as part of the build system rather than as an afterthought added to source code.',
    ],
    bullets: [
      'Swift Package Manager is common and increasingly central.',
      'Dependency tooling changes the effective workspace and build graph.',
      'Architecture and symbol issues often trace back to integration details.',
      'Native dependency discipline is especially important in mixed-stack apps.',
    ],
  },
  {
    id: 'core-simulator-devices',
    title: 'Simulators and Physical Devices',
    paragraphs: [
      'The simulator is one of the most heavily used parts of Xcode Tooling because it provides fast iteration, reproducible environment switching, and easy access to multiple device profiles. However, it is not identical to real hardware. Camera access, push behavior, performance characteristics, sensors, memory pressure, thermal constraints, and some entitlement-dependent paths still require device testing.',
      'Physical devices introduce signing and provisioning realities more directly. They also surface performance and lifecycle issues that may not appear on a simulator. Mature teams therefore treat simulator runs as necessary but incomplete validation.',
    ],
    bullets: [
      'Simulators speed iteration and reproduce multiple device shapes.',
      'Simulators are not perfect stand-ins for hardware behavior.',
      'Device testing is essential for release confidence.',
      'Provisioning problems often appear first when running on real devices.',
    ],
  },
  {
    id: 'core-debugging',
    title: 'Debugging and Logging',
    paragraphs: [
      'Xcode provides integrated debugging through breakpoints, stack inspection, variable inspection, console logs, symbolic breakpoints, memory graph debugging, and runtime issue surfacing. The important point is not only that these tools exist, but that they connect directly to build configuration, simulator or device state, and the running app process.',
      'In practice, strong debugging in Apple projects means combining several signals: IDE breakpoints, structured logging, OS-level console output, crash reports, and issue reproduction across different destinations. Relying on only one of those channels usually slows problem isolation.',
    ],
    bullets: [
      'Use breakpoints and logs together rather than as competing approaches.',
      'Symbolic and exception breakpoints can save time on framework-level failures.',
      'The running destination affects what logs and runtime behaviors appear.',
      'Debugging quality depends on reproducibility and build clarity, not just IDE familiarity.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing in Xcode',
    paragraphs: [
      'Xcode Tooling supports unit tests, UI tests, test plans, code coverage, and simulator-driven test execution. The scheme and destination selected for testing matter because build configuration, runtime environment, and entitlement setup can change test outcomes significantly.',
      'The main point is that testing is part of the native workflow, not something bolted on later. A project that cannot run tests predictably through Xcode or xcodebuild usually also has deeper problems in scheme organization, dependency setup, or simulator discipline.',
    ],
    bullets: [
      'Tests should run predictably under both local and CI workflows.',
      'Schemes and destinations influence test behavior directly.',
      'UI tests require more environment discipline than simple unit tests.',
      'Coverage is useful, but only after test reliability exists.',
    ],
  },
  {
    id: 'core-signing',
    title: 'Code Signing, Provisioning, and Capabilities',
    paragraphs: [
      'Code signing and provisioning are among the most operationally important parts of Xcode Tooling. A build can compile successfully and still fail to run on a device or fail to distribute if certificates, provisioning profiles, entitlements, bundle identifiers, or capabilities are inconsistent.',
      'Capabilities such as push notifications, app groups, keychain sharing, associated domains, background modes, and sign-in services are tightly coupled to signing configuration. This is why signing should be treated as system configuration work rather than as an annoying final checkbox before release.',
    ],
    bullets: [
      'Compilation success does not guarantee runnable or shippable output.',
      'Signing, entitlements, and provisioning must stay aligned.',
      'Capabilities add operational requirements, not just feature toggles.',
      'Signing drift is one of the most common causes of release pipeline pain.',
    ],
  },
  {
    id: 'core-archives-distribution',
    title: 'Archives, Export, and Distribution',
    paragraphs: [
      'Building an archive is different from simply running the app. Archives collect the release-intended product, related metadata, and symbol information into an artifact suitable for export and distribution. Export options then determine how that archive becomes an installable or shippable package for internal testing, enterprise distribution, or App Store submission paths.',
      'This distinction matters because release problems often appear only in archive or export mode. Debug-only assumptions, missing assets, signing mismatches, and release-configuration drift can all hide during development builds. Teams should therefore validate archive flows as a first-class part of release readiness.',
    ],
    bullets: [
      'Run builds and archive builds are not the same thing.',
      'Export options influence distribution behavior materially.',
      'Release validation must include archive-specific checks.',
      'Archive artifacts are a core input to TestFlight and App Store flows.',
    ],
  },
  {
    id: 'core-profiling-performance',
    title: 'Profiling and Performance Analysis',
    paragraphs: [
      'Performance work in Apple apps usually extends beyond the debugger. Xcode integrates with profiling workflows such as Instruments, time profiling, memory analysis, allocation inspection, leaks detection, hangs analysis, and startup tracing. These tools reveal behavior the ordinary debug loop does not make obvious.',
      'The main point is that performance investigation is workflow-dependent. Simulator traces can be useful, but real-device traces often matter more for launch time, animation smoothness, memory pressure, thermal behavior, and battery-relevant patterns. Strong teams treat profiling as part of normal release hardening rather than as emergency triage only after complaints arrive.',
    ],
    bullets: [
      'Debugging correctness and profiling performance are different tasks.',
      'Real-device traces are often more meaningful than simulator traces.',
      'Launch time, memory, hangs, and responsiveness need dedicated analysis.',
      'Performance tooling should be part of routine engineering, not only crisis response.',
    ],
  },
  {
    id: 'core-automation-cli',
    title: 'Command-line Automation with xcodebuild and simctl',
    paragraphs: [
      'Serious teams rarely rely only on clicking through the Xcode interface. Command-line tools such as xcodebuild and simctl make builds, tests, simulator control, and archive generation scriptable. This is essential for CI, reproducibility, and team-wide consistency.',
      'The value of the CLI is not merely speed. It exposes the actual parameters behind many IDE actions. That helps teams reason about schemes, destinations, build configurations, and archive paths more explicitly, which reduces the number of workflows that only function on one developers machine.',
    ],
    bullets: [
      'CLI workflows should mirror important local IDE workflows.',
      'Scriptable builds improve CI reliability and reproducibility.',
      'Simulator automation is often as important as build automation.',
      'A healthy Apple build pipeline is rarely IDE-only.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'Xcode Tooling is powerful, but it is also highly stateful and configuration-sensitive. Teams can lose large amounts of time to misnamed schemes, stale derived data, mismatched runtimes, provisioning drift, hidden target setting overrides, or workspace confusion. The tooling rewards disciplined configuration far more than trial-and-error clicking.',
      'Another common pitfall is separating local and CI behavior too far. If a release pipeline uses commands, destinations, or export settings that nobody runs locally, failure modes accumulate silently. The best operational posture is to make the important automated path understandable and reproducible on a developer machine.',
    ],
    bullets: [
      'Hidden configuration drift causes more pain than most syntax errors.',
      'Do not let one machine become the only machine that can archive successfully.',
      'Local and CI workflows should be intentionally aligned.',
      'Tooling state should be made explicit wherever possible.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-build-run',
    title: 'Build and Run a Scheme from the Command Line',
    description: [
      'This is the most basic automation path for local validation or CI smoke checks. The scheme, destination, and configuration together define what gets built and where it runs.',
      'The important lesson is that command-line execution should describe the same build intent that developers rely on in the IDE.',
    ],
    code: `xcodebuild \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  build`,
    notes: [
      'Use the workspace rather than the project when package or dependency tooling expects it.',
      'Make destinations explicit in scripts so simulator behavior is reproducible.',
    ],
  },
  {
    id: 'ex-test',
    title: 'Run Tests with xcodebuild',
    description: [
      'A healthy native workflow includes test execution that works outside the GUI. This example runs a scheme test action against a simulator destination that CI can reproduce.',
      'The main operational point is that test stability depends on scheme setup and destination clarity as much as on the test code itself.',
    ],
    code: `xcodebuild \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  test`,
    notes: [
      'Keep test schemes and destinations explicit rather than inheriting whatever the IDE last selected.',
      'If UI tests are involved, simulator state management often matters for reliability.',
    ],
  },
  {
    id: 'ex-archive-export',
    title: 'Archive and Export an iOS Build',
    description: [
      'Release workflows typically separate archive creation from export. The archive captures the release-intended build, and the export step turns it into a distributable package using explicit options.',
      'This is one of the most important distinctions in Xcode tooling because many release issues appear only during archive or export, not during normal debug runs.',
    ],
    code: `xcodebuild \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Release \
  -archivePath build/MyApp.xcarchive \
  archive

xcodebuild \
  -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/export`,
    notes: [
      'Archive and export should be tested before release day, not only during the final submission push.',
      'Export options are part of the release contract and should be versioned with care.',
    ],
  },
  {
    id: 'ex-simulator-control',
    title: 'Control Simulators with simctl',
    description: [
      'Simulator automation becomes valuable quickly in CI and even in local troubleshooting. Simctl can boot devices, install apps, launch apps, capture screenshots, and reset environments without relying on manual UI navigation.',
      'This makes simulator behavior more scriptable and therefore more reproducible across team members and pipelines.',
    ],
    code: `xcrun simctl boot 'iPhone 16'
xcrun simctl install booted build/Debug-iphonesimulator/MyApp.app
xcrun simctl launch booted com.example.myapp
xcrun simctl screenshot booted build/screenshot.png`,
    notes: [
      'Simulator scripting is often useful for UI testing, screenshots, and environment resets.',
      'Prefer explicit simulator names or identifiers in automation rather than relying on the currently booted device implicitly.',
    ],
  },
  {
    id: 'ex-xcconfig',
    title: 'Use xcconfig Files for Reusable Build Settings',
    description: [
      'Xcconfig files help move important settings out of opaque point-and-click interfaces into versioned text configuration. They are especially useful when a team wants environment-specific values or wants build-setting logic to be reviewed like normal code.',
      'This does not remove all Xcode configuration work, but it makes more of the important behavior inspectable and reproducible.',
    ],
    code: `PRODUCT_BUNDLE_IDENTIFIER = com.example.myapp
SWIFT_VERSION = 5.0
IPHONEOS_DEPLOYMENT_TARGET = 17.0
CODE_SIGN_STYLE = Automatic
DEVELOPMENT_TEAM = ABCDE12345
CURRENT_PROJECT_VERSION = 42
MARKETING_VERSION = 2.3.0`,
    notes: [
      'Text-based configuration is often easier to review and reason about than hidden UI-only settings.',
      'Use xcconfig deliberately rather than scattering key settings across multiple override layers without documentation.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-build-structure',
    title: 'Build Structure',
    terms: [
      {
        term: 'Project',
        definition: 'An Xcode container that defines targets, groups, build settings, and related build configuration metadata.',
      },
      {
        term: 'Workspace',
        definition: 'A container that coordinates one or more projects and often serves as the correct entry point for dependency-managed builds.',
      },
      {
        term: 'Target',
        definition: 'A concrete buildable output such as an app, framework, extension, or test bundle.',
      },
      {
        term: 'Scheme',
        definition: 'A named set of actions and target selections that controls how Xcode builds, runs, tests, profiles, or archives a project.',
      },
      {
        term: 'Build configuration',
        definition: 'A named settings profile such as Debug or Release that changes how the build is compiled, signed, and optimized.',
      },
      {
        term: 'Derived Data',
        definition: 'Xcodes intermediate build and indexing output area, which can affect build state, caching, and troubleshooting.',
      },
    ],
  },
  {
    id: 'glossary-runtime-debug',
    title: 'Runtime and Debugging',
    terms: [
      {
        term: 'Simulator',
        definition: 'A software environment that emulates many device behaviors for Apple platforms without requiring physical hardware.',
      },
      {
        term: 'Destination',
        definition: 'The selected runtime target for a build action, such as a specific simulator or connected device.',
      },
      {
        term: 'Breakpoint',
        definition: 'A debug instruction that pauses execution so state can be inspected.',
      },
      {
        term: 'Memory graph',
        definition: 'A debugging view used to inspect object relationships and potential retain cycles or leaks.',
      },
      {
        term: 'Instruments',
        definition: 'A profiling environment used for performance analysis such as time profiling, memory analysis, and hangs investigation.',
      },
      {
        term: 'simctl',
        definition: 'A command-line utility for scripting and controlling Apple simulators.',
      },
    ],
  },
  {
    id: 'glossary-signing-release',
    title: 'Signing and Release',
    terms: [
      {
        term: 'Code signing',
        definition: 'The process of applying cryptographic identity to a build so Apple platforms can trust and run or distribute it.',
      },
      {
        term: 'Provisioning profile',
        definition: 'A configuration artifact that links app identifiers, certificates, devices, and capabilities for development or distribution.',
      },
      {
        term: 'Entitlement',
        definition: 'A signed capability declaration that grants an app permission to use certain platform services.',
      },
      {
        term: 'Archive',
        definition: 'A release-oriented build artifact produced for export, validation, and distribution workflows.',
      },
      {
        term: 'Export options plist',
        definition: 'A configuration file that tells Xcode how to export an archive for a chosen distribution method.',
      },
      {
        term: 'xcodebuild',
        definition: 'The command-line interface for building, testing, archiving, and exporting Xcode projects and workspaces.',
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

const xcodeToolingHelpStyles = `
.xcode-tooling-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.xcode-tooling-help98-window {
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

.xcode-tooling-help98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.xcode-tooling-help98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.xcode-tooling-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.xcode-tooling-help98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.xcode-tooling-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.xcode-tooling-help98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  color: #000;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.xcode-tooling-help98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.xcode-tooling-help98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.xcode-tooling-help98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.xcode-tooling-help98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.xcode-tooling-help98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.xcode-tooling-help98-toc-list li {
  margin: 0 0 8px;
}

.xcode-tooling-help98-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.xcode-tooling-help98-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.xcode-tooling-help98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.xcode-tooling-help98-section {
  margin: 0 0 20px;
}

.xcode-tooling-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.xcode-tooling-help98-content p,
.xcode-tooling-help98-content li,
.xcode-tooling-help98-content dd,
.xcode-tooling-help98-content dt {
  font-size: 12px;
  line-height: 1.5;
}

.xcode-tooling-help98-content p,
.xcode-tooling-help98-content dd {
  margin: 0 0 10px;
}

.xcode-tooling-help98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.xcode-tooling-help98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.xcode-tooling-help98-codebox {
  margin: 8px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.xcode-tooling-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

.xcode-tooling-help98-glossary {
  margin: 0;
}

.xcode-tooling-help98-glossary dt {
  margin: 0 0 2px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .xcode-tooling-help98-main {
    grid-template-columns: 1fr;
  }

  .xcode-tooling-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .xcode-tooling-help98-content {
    padding: 14px 14px 20px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="xcode-tooling-help98-section">
      <h2 className="xcode-tooling-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="xcode-tooling-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="xcode-tooling-help98-section">
      <h2 className="xcode-tooling-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="xcode-tooling-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="xcode-tooling-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="xcode-tooling-help98-section">
      <h2 className="xcode-tooling-help98-heading">{section.title}</h2>
      <dl className="xcode-tooling-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="xcode-tooling-help98-divider" /> : null}
    </section>
  )
}
export default function XcodeToolingPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${PAGE_TITLE} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: PAGE_TITLE,
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
    <div className="xcode-tooling-help98-page">
      <style>{xcodeToolingHelpStyles}</style>
      <div className="xcode-tooling-help98-window" role="presentation">
        <header className="xcode-tooling-help98-titlebar">
          <span className="xcode-tooling-help98-title">{PAGE_TITLE}</span>
          <div className="xcode-tooling-help98-controls">
            <button
              className="xcode-tooling-help98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="xcode-tooling-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="xcode-tooling-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`xcode-tooling-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="xcode-tooling-help98-main">
          <aside className="xcode-tooling-help98-toc" aria-label="Table of contents">
            <h2 className="xcode-tooling-help98-toc-title">Contents</h2>
            <ul className="xcode-tooling-help98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="xcode-tooling-help98-content">
            <h1 className="xcode-tooling-help98-doc-title">{PAGE_TITLE}</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <hr className="xcode-tooling-help98-divider" />

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) => renderContentSection(section, index === bigPictureSections.length - 1))
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) => renderExampleSection(section, index === exampleSections.length - 1))
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
