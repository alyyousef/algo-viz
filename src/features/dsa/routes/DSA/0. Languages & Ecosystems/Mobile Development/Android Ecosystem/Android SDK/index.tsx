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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'The Android SDK is the foundational package of APIs, tools, platform files, and utilities used to build, run, debug, profile, and ship Android applications. The important point is that the SDK is not one monolithic library. It is a layered toolkit that includes platform APIs, platform-tools, build-tools, command-line tools, emulators, system images, and supporting metadata.',
  'For Android developers, the SDK is the substrate under Android Studio, Gradle, adb, the emulator, and many parts of the CI pipeline. When a team says it is writing an Android app, it is really building against a particular compile SDK, using particular build-tools, talking to devices with platform-tools, and often testing with emulator images supplied by the SDK.',
  'This page is intentionally comprehensive. It covers what the Android SDK actually contains, how SDK packages relate to API levels, the difference between compileSdk, minSdk, and targetSdk, platform-tools and build-tools, the emulator, adb, SDK Manager, command-line tools, compatibility strategy, local versus CI installation, and the common mistakes teams make when they treat the SDK as a single checkbox in Android Studio instead of a concrete toolchain.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'The Android SDK is the tool and API foundation for Android app development. It includes the Android platform APIs that apps compile against, device communication tools such as adb, build-time utilities, emulator support, system images, and command-line tools for managing packages and automation.',
      'What makes the SDK important is that it is not merely a background installation. Every Android project is shaped by which SDK platform it compiles against, which tools version it uses, which platform-tools communicate with devices, and which emulator or system images are available for testing.',
      'For day-to-day engineering, understanding the SDK means understanding the boundary between your application code and the Android platform, and understanding the difference between the APIs your code uses, the tools that package and debug it, and the images or devices on which it runs.',
    ],
  },
  {
    id: 'bp-why-sdk-matters',
    title: 'Why the Android SDK Matters',
    paragraphs: [
      'Android development depends on multiple layers: Kotlin or Java code, Jetpack libraries, Gradle and AGP, and the Android SDK itself. The SDK is where the platform-facing part of that stack lives. Without it, there is no official platform API surface, no adb, no emulator images, and no standard packaging tools.',
      'This matters strategically because SDK choices affect compatibility, debugging, testing, and release behavior. A team can write excellent Kotlin code and still have a broken Android toolchain if the SDK setup is unclear or inconsistent.',
    ],
    bullets: [
      'It provides the Android platform API surface used during compilation.',
      'It includes tools for device communication, installation, and debugging.',
      'It provides emulator and system-image support for testing.',
      'It anchors many local and CI build workflows.',
    ],
  },
  {
    id: 'bp-what-the-sdk-contains',
    title: 'What the SDK Actually Contains',
    paragraphs: [
      'The SDK is best understood as a set of installable packages. These include SDK platforms for particular Android API levels, platform-tools such as adb, build-tools used by builds and packaging processes, command-line tools for package management, and emulator-related packages including system images.',
      'This package-based model explains why Android Studio and SDK Manager can install or update individual pieces rather than forcing a single all-or-nothing SDK download.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where the SDK Fits in the Toolchain',
    paragraphs: [
      'Android Studio sits on top of the SDK. Gradle and the Android Gradle Plugin reference SDK components to compile and package applications. adb from platform-tools communicates with physical devices or emulators. The emulator uses SDK-provided images and tooling.',
      'This is why the SDK is not separate from the rest of the Android workflow. It is the shared substrate that IDE, build system, debugging tools, and test environments rely on.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What the SDK Does Not Replace',
    paragraphs: [
      'The Android SDK is not a substitute for Jetpack, app architecture, third-party libraries, or build automation. It provides official platform capabilities and tooling, but teams still need Gradle configuration, application-layer design, testing discipline, and release workflows on top of it.',
      'It is also not enough to install the SDK once and forget it. SDK versions, tools, and images age over time, and compatibility between the SDK, AGP, and the broader Android toolchain still needs to be managed deliberately.',
    ],
    bullets: [
      'The SDK does not replace Gradle or AGP.',
      'The SDK does not replace Jetpack libraries.',
      'The SDK does not define your app architecture.',
      'SDK installation alone does not guarantee a healthy Android toolchain.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production Android teams, the SDK is part of environment management. Local machines, CI runners, emulator environments, and release builds all depend on having the expected packages installed and the correct API levels available.',
      'As of March 31, 2026, the Android SDK remains a package-oriented toolchain whose operational details still matter. Modern Android development may feel more Kotlin-first and Jetpack-first than older Android, but the platform SDK underneath is still fundamental.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When evaluating SDK setup, the useful questions are specific. Which compile SDK is the project using? Which min SDK does the product actually support? Are the correct platform-tools installed? Are emulator images aligned with test needs? Is CI using a controlled SDK installation path?',
      'Most SDK pain comes from hidden assumptions and environment drift. The best response is explicit versions, documented package requirements, and repeatable environment setup.',
    ],
    bullets: [
      'Be explicit about required SDK packages and API levels.',
      'Keep local and CI SDK expectations aligned.',
      'Understand the difference between compile, target, and min SDK values.',
      'Treat emulator and device tooling as part of the engineering baseline.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-sdk-is',
    title: 'What the Android SDK Actually Is',
    paragraphs: [
      'The Android SDK is the official software development kit for Android. At the practical level, it is a collection of platform files, tools, packages, and metadata that allow developers to compile against Android APIs, build installable artifacts, communicate with devices, and run Android images locally.',
      'It is important to think of the SDK as a toolbox rather than a single jar or framework. Different pieces of Android development rely on different packages within the SDK.',
    ],
  },
  {
    id: 'core-platform-apis',
    title: 'SDK Platforms and Android API Levels',
    paragraphs: [
      'An SDK platform package corresponds to a particular Android API level and exposes the platform APIs used during compilation. When a project declares a compile SDK version, it is selecting which Android platform API surface is available to the compiler.',
      'This does not mean the app can only run on that Android version. Runtime compatibility is determined separately by min SDK, target SDK behavior, compatibility code, and which APIs the app actually uses.',
    ],
  },
  {
    id: 'core-compile-min-target',
    title: 'compileSdk, minSdk, and targetSdk',
    paragraphs: [
      'These three values are often confused but they describe different things. `compileSdk` selects which Android platform APIs the app is compiled against. `minSdk` defines the oldest Android version the app claims to support. `targetSdk` tells the platform which behavior expectations and compatibility rules the app has been updated for.',
      'Understanding this distinction is essential. Teams frequently assume compile SDK and runtime support are the same thing, which leads to compatibility mistakes and incorrect reasoning about API usage.',
    ],
  },
  {
    id: 'core-platform-tools',
    title: 'Platform-Tools',
    paragraphs: [
      'Platform-tools are a distinct SDK package that includes utilities used to communicate with devices and emulators. The most famous tool in this package is adb, which is central to installation, shell access, debugging workflows, log inspection, and device management.',
      'This package matters independently from build-tools. A project may compile fine while local debugging fails because platform-tools are outdated or mismatched with the environment.',
    ],
  },
  {
    id: 'core-build-tools',
    title: 'Build-Tools',
    paragraphs: [
      'Build-tools are SDK components used during parts of the Android build and packaging process. They support steps such as packaging, resource processing, and artifact preparation in the broader build pipeline.',
      'In modern Android projects, AGP manages much of the direct interaction with build-tools, which is why some teams forget they exist. But they are still part of the SDK toolchain and still matter for build health and compatibility.',
    ],
  },
  {
    id: 'core-command-line-tools',
    title: 'Command-Line Tools and SDK Manager',
    paragraphs: [
      'The Android SDK includes command-line tools used to install, update, inspect, and manage SDK packages. This matters especially in CI, remote environments, or scripted setup where Android Studio is not the tool doing the installation.',
      'SDK Manager and related command-line utilities help make SDK setup reproducible. Teams that rely only on manual clicking inside the IDE usually end up with undocumented environment drift.',
    ],
  },
  {
    id: 'core-adb',
    title: 'adb and Device Communication',
    paragraphs: [
      'adb, the Android Debug Bridge, is one of the most important SDK tools. It connects the developer environment to Android devices and emulators for installation, shell commands, logging, forwarding, debugging, and general operational control.',
      'Because adb is part of platform-tools rather than the app code or Gradle configuration, it is useful to treat it as infrastructure. A lot of Android debugging is really adb usage in disguise.',
    ],
  },
  {
    id: 'core-emulator-system-images',
    title: 'Emulator, Virtual Devices, and System Images',
    paragraphs: [
      'The Android emulator depends on SDK-provided system images and tooling so developers can run Android environments locally without always relying on physical devices. This is critical for testing API-level differences, form factors, and controlled scenarios.',
      'System images are separate installable packages, which is why an emulator environment is not available automatically just because the base SDK exists. Teams need the right images for the kinds of tests they actually perform.',
    ],
  },
  {
    id: 'core-android-studio',
    title: 'Android Studio and the SDK',
    paragraphs: [
      'Android Studio makes the SDK feel integrated and unified, but under the hood it is managing and consuming SDK packages. SDK Manager inside the IDE is effectively a front end to SDK package installation and updates.',
      'This distinction matters because the SDK can be managed outside Android Studio too. For CI and reproducible environments, understanding the SDK independently from the IDE is valuable.',
    ],
  },
  {
    id: 'core-gradle-agp',
    title: 'Gradle, AGP, and SDK Integration',
    paragraphs: [
      'Gradle and the Android Gradle Plugin rely on SDK packages to compile and package Android applications. When a project references a compile SDK level or build-tools-related behavior, it is indirectly depending on what is installed in the local or CI SDK environment.',
      'This is one reason Android build failures can be environment failures rather than code failures. Missing or incompatible SDK packages can break otherwise valid projects.',
    ],
  },
  {
    id: 'core-compatibility',
    title: 'Compatibility Strategy and API Usage',
    paragraphs: [
      'Compiling against a newer SDK can expose newer APIs, but runtime compatibility still depends on guarding API usage for devices below the required level. Android development has always involved understanding this boundary between compile-time availability and runtime availability.',
      'Modern Android code often relies on Jetpack libraries and compatibility layers to smooth over platform differences, but the underlying SDK version model still governs what the platform can do directly.',
    ],
  },
  {
    id: 'core-local-vs-ci',
    title: 'Local Environments Versus CI Environments',
    paragraphs: [
      'The SDK should be treated as an environment dependency with explicit expectations. Local machines may have multiple platforms, tools, and system images installed. CI should generally use a narrower, controlled SDK setup that matches project requirements closely.',
      'When local machines and CI diverge too much, teams get misleading results. The right pattern is documented SDK requirements plus repeatable provisioning.',
    ],
  },
  {
    id: 'core-updates',
    title: 'Updating the SDK Safely',
    paragraphs: [
      'Updating the SDK is not just a housekeeping task. New platform packages, new platform-tools, emulator updates, and changing AGP expectations can all affect local and build behavior. Updates should be intentional rather than ad hoc.',
      'The safest approach is to align SDK changes with project needs, verify them in CI, and avoid allowing each machine to drift unpredictably.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Android SDK Mistakes',
    paragraphs: [
      'Common mistakes include confusing compile SDK with minimum supported runtime version, assuming Android Studio hides all SDK complexity, neglecting platform-tools updates while debugging, and failing to document required SDK packages for CI or onboarding.',
      'Another recurring problem is treating emulator setup as optional infrastructure. For many teams, emulator reliability is part of testing capability and should be handled as seriously as build tooling.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-sdk-values',
    title: 'compileSdk, minSdk, and targetSdk in Practice',
    description: [
      'These values are central to reasoning about the Android SDK, and seeing them together helps prevent common misunderstandings.',
    ],
    code: `android {
  compileSdk = 35

  defaultConfig {
    minSdk = 24
    targetSdk = 35
  }
}`,
    notes: [
      'This means the app compiles against API 35, supports devices down to API 24, and declares behavior readiness for API 35.',
      'It does not mean every API 35 call is safe on API 24 without compatibility handling.',
    ],
  },
  {
    id: 'examples-adb',
    title: 'adb for Device and App Workflow',
    description: [
      'adb is part of platform-tools and is one of the most practical SDK utilities in daily Android work.',
    ],
    code: `adb devices
adb install app-debug.apk
adb logcat
adb shell pm list packages`,
    notes: [
      'These commands cover connection, installation, logging, and shell inspection.',
      'Much of Android debugging depends on adb even when an IDE hides the command line.',
    ],
  },
  {
    id: 'examples-sdkmanager',
    title: 'SDK Package Installation from the Command Line',
    description: [
      'SDK setup can be scripted, which is especially useful in CI or onboarding documentation.',
    ],
    code: `sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"`,
    notes: [
      'Command-line installation keeps SDK requirements explicit and automatable.',
      'This is safer than relying only on manual IDE package installation.',
    ],
  },
  {
    id: 'examples-avd',
    title: 'Emulator and Virtual Device Setup',
    description: [
      'Emulator workflows depend on the right system image and virtual device definitions, not just the emulator binary itself.',
    ],
    code: `sdkmanager "system-images;android-35;google_apis;x86_64"
avdmanager create avd -n pixel-api35 -k "system-images;android-35;google_apis;x86_64"`,
    notes: [
      'System images are installable SDK packages just like platforms and tools.',
      'A working emulator environment is a managed SDK concern, not a magical IDE feature.',
    ],
  },
  {
    id: 'examples-api-guard',
    title: 'Guarding Newer Platform API Usage',
    description: [
      'Compiling against a new SDK does not remove the need to guard calls that require newer Android versions at runtime.',
    ],
    code: `if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
  // use newer platform API here
} else {
  // fallback behavior for older devices
}`,
    notes: [
      'Compile-time visibility and runtime availability are different concerns.',
      'Compatibility work remains necessary even with a modern compile SDK.',
    ],
  },
  {
    id: 'examples-ci',
    title: 'CI-Friendly SDK Provisioning',
    description: [
      'A repeatable Android build pipeline usually installs only the packages it needs, rather than assuming a preconfigured machine.',
    ],
    code: `yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"`,
    notes: [
      'CI should treat the SDK as an explicit environment dependency.',
      'Reproducibility improves when package installation is scripted and versioned.',
    ],
  },
  {
    id: 'examples-environment',
    title: 'Typical SDK Environment Variables',
    description: [
      'Many Android toolchains rely on explicit SDK paths so tools can locate the installed packages consistently.',
    ],
    code: `ANDROID_SDK_ROOT=/opt/android-sdk
PATH=$ANDROID_SDK_ROOT/platform-tools:$PATH`,
    notes: [
      'Exact path conventions vary by OS and environment.',
      'Stable SDK paths reduce confusion across local machines and automation.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core SDK Terms',
    terms: [
      {
        term: 'Android SDK',
        definition:
          'The official set of Android platform packages, tools, and supporting components used for Android development.',
      },
      {
        term: 'SDK platform',
        definition:
          'The package that provides Android platform APIs for a specific API level used during compilation.',
      },
      {
        term: 'API level',
        definition:
          'The integer identifier associated with a particular Android platform release and API surface.',
      },
      {
        term: 'compileSdk',
        definition: 'The Android API level whose platform APIs the project is compiled against.',
      },
      {
        term: 'minSdk',
        definition: 'The lowest Android API level the app declares support for at runtime.',
      },
      {
        term: 'targetSdk',
        definition:
          'The Android API level that signals which platform behavior expectations the app targets.',
      },
      {
        term: 'SDK Manager',
        definition: 'The tool or interface used to install and update Android SDK packages.',
      },
      {
        term: 'Command-line tools',
        definition:
          'SDK packages used for package management and Android development tasks outside the IDE.',
      },
    ],
  },
  {
    id: 'glossary-tools',
    title: 'Tooling and Runtime Terms',
    terms: [
      {
        term: 'Platform-tools',
        definition: 'SDK tools used for device and emulator communication, including adb.',
      },
      {
        term: 'Build-tools',
        definition: 'SDK components used during parts of the Android build and packaging process.',
      },
      {
        term: 'adb',
        definition:
          'Android Debug Bridge, a command-line utility for talking to Android devices and emulators.',
      },
      {
        term: 'Emulator',
        definition:
          'The Android runtime environment that allows virtual Android devices to run on a development machine.',
      },
      {
        term: 'System image',
        definition:
          'An installable SDK package used by the emulator to represent a particular Android environment.',
      },
      {
        term: 'AVD',
        definition:
          'Android Virtual Device, a named emulator configuration built from SDK components.',
      },
      {
        term: 'ANDROID_SDK_ROOT',
        definition:
          'An environment variable commonly used to point tools to the installed Android SDK location.',
      },
      {
        term: 'Logcat',
        definition:
          'The Android logging system commonly viewed via adb or Android Studio during debugging.',
      },
    ],
  },
  {
    id: 'glossary-compatibility',
    title: 'Compatibility and Workflow Terms',
    terms: [
      {
        term: 'Runtime compatibility',
        definition:
          'The requirement that app behavior and API usage remain valid on the Android versions the app supports.',
      },
      {
        term: 'Backward compatibility',
        definition:
          'Supporting older Android versions through guarded API usage, compatibility libraries, or fallback behavior.',
      },
      {
        term: 'Jetpack',
        definition:
          'A set of Android libraries that often complement SDK APIs and help manage compatibility or architecture concerns.',
      },
      {
        term: 'CI provisioning',
        definition:
          'The scripted setup of SDK packages and related environment dependencies in continuous integration systems.',
      },
      {
        term: 'Environment drift',
        definition:
          'The gradual divergence of local or CI tool setups that leads to inconsistent behavior.',
      },
      {
        term: 'SDK package',
        definition:
          'An individually installable component within the Android SDK ecosystem, such as a platform, tool, or image.',
      },
      {
        term: 'Physical device debugging',
        definition:
          'Running, inspecting, and debugging an app on actual Android hardware using SDK tooling such as adb.',
      },
      {
        term: 'Toolchain',
        definition:
          'The combined set of tools and packages used to build, debug, test, and ship Android software.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-sdk-matters', label: 'Why the SDK Matters' },
    { id: 'bp-what-the-sdk-contains', label: 'What the SDK Contains' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-sdk-is', label: 'What the SDK Is' },
    { id: 'core-platform-apis', label: 'SDK Platforms and API Levels' },
    { id: 'core-compile-min-target', label: 'compileSdk, minSdk, and targetSdk' },
    { id: 'core-platform-tools', label: 'Platform-Tools' },
    { id: 'core-build-tools', label: 'Build-Tools' },
    { id: 'core-command-line-tools', label: 'Command-Line Tools' },
    { id: 'core-adb', label: 'adb' },
    { id: 'core-emulator-system-images', label: 'Emulator and System Images' },
    { id: 'core-android-studio', label: 'Android Studio and the SDK' },
    { id: 'core-gradle-agp', label: 'Gradle and AGP Integration' },
    { id: 'core-compatibility', label: 'Compatibility Strategy' },
    { id: 'core-local-vs-ci', label: 'Local Versus CI' },
    { id: 'core-updates', label: 'Updating the SDK' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-sdk-values', label: 'SDK Values' },
    { id: 'examples-adb', label: 'adb Workflow' },
    { id: 'examples-sdkmanager', label: 'sdkmanager' },
    { id: 'examples-avd', label: 'AVD Setup' },
    { id: 'examples-api-guard', label: 'API Guarding' },
    { id: 'examples-ci', label: 'CI Provisioning' },
    { id: 'examples-environment', label: 'Environment Variables' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core SDK Terms' },
    { id: 'glossary-tools', label: 'Tooling and Runtime Terms' },
    { id: 'glossary-compatibility', label: 'Compatibility and Workflow Terms' },
  ],
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
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="bin98-divider" />}
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
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

export default function AndroidSdkPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Android SDK',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Android SDK"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Android SDK</h1>
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
    </TopicPageShell>
  )
}
