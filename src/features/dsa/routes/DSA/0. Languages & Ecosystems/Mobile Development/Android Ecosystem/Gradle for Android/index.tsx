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
  'Gradle is the build system underneath modern Android development, but that statement is too shallow to be useful by itself. The practical reality is that Android builds are a layered system: the Gradle build tool provides the task and dependency model, the Android Gradle Plugin adds Android-specific build behavior, and Android Studio sits on top of that model for sync, editing, and running.',
  'If Kotlin for Android changes how application code is written, Gradle for Android changes how the project itself is assembled. Dependencies, build variants, packaging, manifests, resources, code generation, signing, tests, and release outputs all pass through this build system. That is why Gradle is not just tooling trivia. It is part of the architecture of an Android codebase.',
  'This page is intentionally comprehensive. It covers what Gradle and the Android Gradle Plugin each do, project structure, build files, wrapper usage, tasks, the build lifecycle, dependencies, build variants, source sets, repositories, custom build logic, performance, sync versus execution, and the common mistakes teams make when they treat Android builds as magic instead of maintainable engineering systems.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Gradle is the general-purpose build system used by Android projects, while the Android Gradle Plugin adds Android-specific behavior on top of that foundation. Together they define how source code, resources, manifests, generated code, dependencies, tests, and release artifacts are turned into installable Android outputs.',
      'The important point is that Gradle for Android is not just a command runner. It models a project as tasks, configurations, plugins, variants, and inputs and outputs. That model is what makes incremental builds, dependency management, variant-aware outputs, IDE sync, and large multi-module Android projects possible.',
      'For everyday Android engineering, understanding Gradle means understanding how the project is assembled, how dependencies enter the build, how modules relate to one another, and how different build variants are produced without duplicating entire apps.',
    ],
  },
  {
    id: 'bp-why-gradle-matters',
    title: 'Why Gradle Matters on Android',
    paragraphs: [
      'Android projects are unusually build-heavy. They include Java or Kotlin compilation, resources, assets, manifests, code generation, packaging, testing, signing, and often multiple product flavors and build types. A simple build script can hide a lot of behavior that becomes strategically important once the project grows.',
      'Gradle matters because it is the layer where engineering policy becomes executable. Which dependencies are allowed, how release builds differ from debug builds, how generated code is wired in, how modules depend on each other, and how CI produces artifacts are all expressed here.',
    ],
    bullets: [
      'It manages dependencies and repositories.',
      'It defines how modules are configured and assembled.',
      'It controls variants such as debug, release, and flavors.',
      'It is the backbone for CI, testing, packaging, and release automation.',
    ],
  },
  {
    id: 'bp-gradle-agp-studio',
    title: 'Gradle, Android Gradle Plugin, and Android Studio',
    paragraphs: [
      'Teams often flatten these into one idea, but they are different layers. Gradle is the build tool. The Android Gradle Plugin, usually abbreviated AGP, is the plugin that knows what an Android application or library module is and how to build one. Android Studio uses the Gradle model for sync, indexing, running, and many editor features.',
      'That distinction matters because many build issues are really AGP configuration issues, plugin compatibility issues, or Gradle version alignment problems rather than generic Android Studio problems.',
    ],
    bullets: [
      'Gradle provides the task model and execution engine.',
      'AGP adds Android-specific tasks and configuration blocks.',
      'Android Studio consumes that build model for IDE behavior.',
      'The Gradle Wrapper pins the Gradle distribution used by the project.',
    ],
  },
  {
    id: 'bp-when-gradle-fits',
    title: 'Where Gradle Fits in Daily Android Work',
    paragraphs: [
      'Most Android developers interact with Gradle whether they want to or not. Adding a library, defining a new build type, enabling code shrinking, wiring in KSP or kapt, configuring tests, splitting modules, or changing an app id all involve the build system.',
      'Small apps can often ignore some of the deeper mechanics for a while, but large codebases cannot. The larger the project becomes, the more the build itself becomes a first-class engineering concern.',
    ],
  },
  {
    id: 'bp-what-gradle-does-not-replace',
    title: 'What Gradle Does Not Replace',
    paragraphs: [
      'Gradle is not the application architecture, not the dependency injection system, and not the source code itself. It orchestrates how those pieces are built and combined, but it does not rescue poor module boundaries, unclear ownership, or weak code structure.',
      'It is also not a reason to push all engineering logic into build scripts. Good teams keep build logic maintainable and focused on build concerns rather than turning Gradle files into an alternative application layer.',
    ],
    bullets: [
      'Gradle does not replace app architecture.',
      'Gradle does not make dependency choices good by itself.',
      'Build scripts should support the codebase, not become the codebase.',
      'Overly clever build logic creates maintenance risk quickly.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Production Android builds are often slower, more layered, and more fragile than teams expect early on. Multi-module graphs, annotation processing, generated sources, tests, lint, signing, and CI constraints all add complexity. That complexity is manageable, but only if the build is treated as real engineering work.',
      'The healthiest Android projects usually have restrained build logic, explicit plugin and dependency versions, a clear wrapper and plugin upgrade strategy, and a build structure that reflects module boundaries rather than historical accidents.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When evaluating or improving an Android build, the useful questions are concrete. Are plugin versions aligned? Is the wrapper current enough for the plugin? Are modules reasonably separated? Are variant definitions deliberate? Are dependencies scoped correctly? Are custom tasks justified?',
      'Most build pain is not caused by Gradle being mysterious. It is caused by build logic growing without discipline. The right response is usually simpler structure, clearer ownership, and better version management rather than more build magic.',
    ],
    bullets: [
      'Keep the wrapper and AGP versions intentionally aligned.',
      'Prefer simple, explicit module configuration.',
      'Use variants and dependencies deliberately, not casually.',
      'Treat build performance and build readability as real engineering concerns.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-gradle-is',
    title: 'What Gradle Actually Is',
    paragraphs: [
      'Gradle is a build automation system. It models build logic using plugins, tasks, dependency configurations, and a lifecycle that includes initialization, configuration, and execution. Android relies on this system rather than inventing an entirely separate build tool.',
      'That matters because many Android build concepts are really Gradle concepts first. Tasks, task dependencies, plugins, repositories, and build scripts are all part of Gradle generally, while Android-specific semantics are layered on by AGP.',
    ],
  },
  {
    id: 'core-what-agp-is',
    title: 'What the Android Gradle Plugin Adds',
    paragraphs: [
      'The Android Gradle Plugin provides the Android-specific extension blocks, tasks, and conventions that make an Android application or library build possible. It understands concepts such as `android {}`, manifests, resources, packaging, signing, and build variants.',
      'Without AGP, Gradle would still be a build tool, but it would not know how to assemble an APK or AAB from an Android module. This is why Android build questions should often be framed as Gradle plus AGP, not Gradle alone.',
    ],
  },
  {
    id: 'core-project-structure',
    title: 'Project Structure and Important Build Files',
    paragraphs: [
      'Android projects usually include `settings.gradle.kts` for declaring included modules and top-level build configuration, one or more module build files such as `app/build.gradle.kts`, a Gradle Wrapper in `gradle/wrapper`, and often `gradle.properties` for build-related settings.',
      'The root of the project coordinates shared plugin declarations and repositories, while each module declares what kind of module it is and what it needs. Application modules, library modules, and test-related modules can differ meaningfully in their configuration.',
    ],
  },
  {
    id: 'core-kotlin-dsl',
    title: 'Kotlin DSL and Groovy DSL',
    paragraphs: [
      'Gradle supports different DSL styles, most commonly Groovy and Kotlin DSL. Modern Android documentation now commonly uses Kotlin DSL examples, which is why files such as `build.gradle.kts` and `settings.gradle.kts` are increasingly normal in Android projects.',
      'Kotlin DSL brings stronger editor support and better type-aware tooling for many teams, but the underlying Gradle model is the same. The important engineering point is consistency. A codebase is easier to maintain when the build style is uniform rather than mixed without reason.',
    ],
  },
  {
    id: 'core-wrapper',
    title: 'The Gradle Wrapper',
    paragraphs: [
      'The Gradle Wrapper is the project-owned mechanism for pinning the Gradle version used to execute the build. Instead of assuming each machine has the right Gradle installation globally, the wrapper ensures the project runs against the version it expects.',
      'This is a core reproducibility feature. CI, local development, and onboarding are safer when the wrapper is the standard entry point. Wrapper alignment is especially important because AGP supports only certain Gradle versions.',
    ],
  },
  {
    id: 'core-build-lifecycle',
    title: 'The Build Lifecycle',
    paragraphs: [
      'Gradle builds move through initialization, configuration, and execution. During initialization, Gradle figures out which projects participate. During configuration, it evaluates the build scripts and creates the task model. During execution, it runs the tasks required for the requested work.',
      'This lifecycle explains many confusing behaviors. Code in a build script may run during configuration even if the task itself is never executed. Teams that do not understand this often write slow or surprising build logic.',
    ],
  },
  {
    id: 'core-tasks',
    title: 'Tasks and the Task Graph',
    paragraphs: [
      'Tasks are the executable units of work in Gradle. Compilation, packaging, lint, tests, manifest processing, code generation, and assemble tasks are all examples. Gradle builds a task graph so that required dependencies run in the right order.',
      'Android modules gain many tasks from AGP automatically. Understanding a build often means understanding which tasks exist, which tasks depend on others, and which tasks are variant-specific.',
    ],
  },
  {
    id: 'core-dependencies-repositories',
    title: 'Dependencies and Repositories',
    paragraphs: [
      'Dependencies tell Gradle what external libraries or internal modules are needed. Repositories tell Gradle where those artifacts can be resolved. Android projects typically depend on Jetpack libraries, Kotlin libraries, third-party libraries, and internal modules through this mechanism.',
      'The configuration used for a dependency matters. A dependency added for implementation is not the same as one added only for tests, debug builds, KSP processing, kapt, or an individual variant. Correct scoping keeps builds cleaner and more predictable.',
    ],
  },
  {
    id: 'core-build-variants',
    title: 'Build Variants, Build Types, and Product Flavors',
    paragraphs: [
      "One of AGP's most important responsibilities is variant management. Build types such as debug and release define broad build behavior. Product flavors define alternative product lines or environments. AGP combines them into concrete variants such as `freeDebug` or `paidRelease`.",
      'This mechanism is powerful because it avoids duplicating whole projects. It also introduces complexity, especially when dependencies, resources, or source sets become variant-specific. Teams should create only the variants they can justify and maintain.',
    ],
  },
  {
    id: 'core-source-sets',
    title: 'Source Sets and Variant-Specific Code',
    paragraphs: [
      'Source sets let Android builds organize code and resources for shared and variant-specific behavior. A module can have common code, debug-only code, release-only code, or flavor-specific code without turning the project into a mess of manual copy-paste.',
      'This is useful, but it can become hard to follow when too much behavior is hidden in variant-specific directories. Source sets should support meaningful differences, not become a dumping ground for build complexity.',
    ],
  },
  {
    id: 'core-dependency-configurations',
    title: 'Dependency Configurations and Scope',
    paragraphs: [
      'Gradle dependency scope is not just bookkeeping. The difference between `implementation`, `api`, `testImplementation`, `androidTestImplementation`, `debugImplementation`, `ksp`, and `kapt` affects compile classpaths, build speed, generated code behavior, and the visibility of libraries across modules.',
      'Android projects stay healthier when every dependency is placed in the narrowest correct configuration. Overly broad dependency scope leaks implementation details and increases build and maintenance cost.',
    ],
  },
  {
    id: 'core-sync-vs-build',
    title: 'IDE Sync Versus Actual Build Execution',
    paragraphs: [
      'Android Studio sync and command-line build execution are related but not identical concerns. Sync imports the Gradle model into the IDE so the project can be understood, indexed, and worked with effectively. A build executes tasks to produce outputs.',
      'This distinction matters because a project can have sync problems, build problems, or both. Treating every issue as an IDE issue usually wastes time. Many problems are actually misconfigured Gradle or plugin state.',
    ],
  },
  {
    id: 'core-version-alignment',
    title: 'Version Alignment and Tool Compatibility',
    paragraphs: [
      'Android builds rely on compatible combinations of the Gradle version, AGP version, Kotlin plugin version, and often other ecosystem plugins. The wrapper does not merely control convenience. It is part of compatibility management.',
      'A disciplined upgrade strategy is important. Build upgrades are safest when versions are moved intentionally, verified in CI, and kept understandable rather than being changed opportunistically whenever something breaks.',
    ],
  },
  {
    id: 'core-custom-build-logic',
    title: 'Custom Build Logic and Shared Conventions',
    paragraphs: [
      'As Android projects grow, teams often need shared build behavior across many modules. The disciplined answer is usually reusable convention plugins or centralized build logic, not copy-pasting the same configuration into every module.',
      'The key is restraint. Shared build logic should simplify the build and standardize policy. If it becomes a maze of hidden side effects, the project becomes harder to onboard and harder to debug.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Build Performance and Practical Discipline',
    paragraphs: [
      'Build performance is influenced by dependency size, annotation or symbol processing, module boundaries, task configuration cost, caching behavior, and the overall complexity of the task graph. Android builds benefit when teams minimize unnecessary work and keep configuration predictable.',
      'Performance tuning is most effective when it is evidence-driven. Blindly adding build tricks is usually less useful than understanding which tasks are slow, which modules are overly coupled, and which processors or plugins add cost.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Gradle Mistakes in Android Projects',
    paragraphs: [
      'Common mistakes include version drift between wrapper and plugins, putting dependencies in the wrong scope, creating too many variants, copying large blocks of build logic between modules, and hiding important behavior in ad hoc script fragments that nobody owns.',
      'Another recurring problem is treating the build as untouchable once it works. Android builds age like application code. If nobody curates them, they become slower, more fragile, and harder to reason about.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-top-level-plugins',
    title: 'Top-Level Plugin Declarations',
    description: [
      'A common modern pattern is to declare plugin versions once at the top level and apply them selectively in modules. This keeps versions centralized without applying every plugin everywhere.',
    ],
    code: `plugins {
  id("com.android.application") version "8.5.0" apply false
  id("com.android.library") version "8.5.0" apply false
  id("org.jetbrains.kotlin.android") version "2.0.21" apply false
}`,
    notes: [
      'This pattern helps keep plugin versions consistent across modules.',
      'Each module still decides which plugin it actually applies.',
    ],
  },
  {
    id: 'examples-app-module',
    title: 'Basic Android Application Module',
    description: [
      'An application module usually declares the Android plugin, Kotlin plugin, namespace, SDK levels, and dependencies in one focused file.',
    ],
    code: `plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
}

android {
  namespace = "com.example.app"
  compileSdk = 35

  defaultConfig {
    applicationId = "com.example.app"
    minSdk = 24
    targetSdk = 35
    versionCode = 1
    versionName = "1.0"
  }
}

dependencies {
  implementation("androidx.core:core-ktx:1.13.1")
}`,
    notes: [
      'The module build file is where app-specific Android configuration usually lives.',
      'Application modules and library modules are similar but not interchangeable.',
    ],
  },
  {
    id: 'examples-build-types-flavors',
    title: 'Build Types and Product Flavors',
    description: [
      'Android variants are created by combining build types with product flavors. This lets one codebase produce different outputs without cloning the whole project.',
    ],
    code: `android {
  buildTypes {
    debug {
      applicationIdSuffix = ".debug"
    }
    release {
      isMinifyEnabled = true
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro",
      )
    }
  }

  flavorDimensions += "tier"
  productFlavors {
    create("free") { dimension = "tier" }
    create("paid") { dimension = "tier" }
  }
}`,
    notes: [
      'A variant like `freeDebug` is created from one flavor and one build type.',
      'Variants are powerful, but too many of them can make builds harder to manage.',
    ],
  },
  {
    id: 'examples-variant-dependency',
    title: 'Variant-Specific Dependencies',
    description: [
      'Dependency configurations can target only certain variants or build types, which keeps debug tools out of release builds and allows flavor-specific libraries when needed.',
    ],
    code: `dependencies {
  implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.4")
  debugImplementation("androidx.compose.ui:ui-tooling:1.7.0")
  freeImplementation("com.google.firebase:firebase-ads:23.3.0")
}`,
    notes: [
      'Scope dependencies as narrowly as practical.',
      'Variant-aware dependency resolution is one reason Android builds stay manageable at scale.',
    ],
  },
  {
    id: 'examples-ksp-kapt',
    title: 'Code Generation Dependencies',
    description: [
      'Annotation processing and symbol processing belong in dedicated configurations rather than ordinary implementation dependencies.',
    ],
    code: `plugins {
  id("com.google.devtools.ksp")
}

dependencies {
  implementation("androidx.room:room-runtime:2.6.1")
  ksp("androidx.room:room-compiler:2.6.1")
}`,
    notes: [
      'Use processor-specific configurations rather than mixing processors into the compile classpath.',
      'For Kotlin projects, KSP is generally preferred when a library supports it.',
    ],
  },
  {
    id: 'examples-settings',
    title: 'settings.gradle.kts for Modules and Repositories',
    description: [
      'The settings file defines which modules participate in the build and often centralizes repository policy for the project.',
    ],
    code: `pluginManagement {
  repositories {
    google()
    mavenCentral()
    gradlePluginPortal()
  }
}

dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    google()
    mavenCentral()
  }
}

rootProject.name = "SampleApp"
include(":app")
include(":feature:profile")`,
    notes: [
      'This file sits above any single module and describes the overall build.',
      'Centralized repository policy reduces drift across modules.',
    ],
  },
  {
    id: 'examples-wrapper',
    title: 'Wrapper Usage',
    description: [
      'The wrapper should be the normal entry point for build commands in local development and CI.',
    ],
    code: `./gradlew assembleDebug
./gradlew test
./gradlew lint
./gradlew :app:dependencies`,
    notes: [
      'The wrapper ensures the project uses the pinned Gradle version.',
      'Task-scoped commands are useful for inspection as well as for building.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Gradle Terms',
    terms: [
      {
        term: 'Gradle',
        definition:
          'A build automation system that models projects, tasks, dependencies, plugins, and execution.',
      },
      {
        term: 'Android Gradle Plugin',
        definition:
          'The Gradle plugin that adds Android-specific build behavior such as variants, packaging, and Android module configuration.',
      },
      {
        term: 'Task',
        definition:
          'A unit of executable build work, such as compilation, packaging, lint, or testing.',
      },
      {
        term: 'Task graph',
        definition:
          'The dependency-aware execution plan Gradle creates to determine which tasks must run.',
      },
      {
        term: 'Configuration phase',
        definition:
          'The build phase where scripts are evaluated and tasks are configured before execution begins.',
      },
      {
        term: 'Gradle Wrapper',
        definition:
          'The project-owned launcher that pins and downloads the correct Gradle distribution.',
      },
      {
        term: 'Plugin',
        definition:
          'Reusable build logic that extends Gradle with new tasks, extensions, or behavior.',
      },
      {
        term: 'Repository',
        definition: 'A source from which Gradle resolves plugins or library artifacts.',
      },
    ],
  },
  {
    id: 'glossary-android',
    title: 'Android Build Terms',
    terms: [
      {
        term: 'Build type',
        definition:
          'A named build configuration such as debug or release that changes how an app is built.',
      },
      {
        term: 'Product flavor',
        definition:
          'A variant dimension used to create different versions of an app from one codebase.',
      },
      {
        term: 'Build variant',
        definition:
          'A concrete output created by combining a build type with product flavor selections.',
      },
      {
        term: 'Source set',
        definition:
          'A structured grouping of code and resources associated with a module or variant.',
      },
      {
        term: 'Namespace',
        definition:
          'The package namespace AGP uses for generated and compiled Android code in a module.',
      },
      {
        term: 'AAB',
        definition: 'Android App Bundle, a publishing format used for Play distribution.',
      },
      {
        term: 'APK',
        definition: 'Android Package, an installable output format for Android applications.',
      },
      {
        term: 'Manifest merge',
        definition:
          'The process by which Android manifest information from multiple sources is combined.',
      },
    ],
  },
  {
    id: 'glossary-dependencies',
    title: 'Dependency and Build Logic Terms',
    terms: [
      {
        term: 'implementation',
        definition:
          'A dependency configuration for code needed by a module at implementation time without exposing it as public API.',
      },
      {
        term: 'api',
        definition:
          'A dependency configuration typically used in library modules when consumers need that dependency on their compile classpath.',
      },
      {
        term: 'debugImplementation',
        definition: 'A dependency configuration that applies only to debug builds.',
      },
      {
        term: 'ksp',
        definition:
          'A configuration for Kotlin Symbol Processing dependencies used for supported code generators.',
      },
      {
        term: 'kapt',
        definition:
          'A Kotlin annotation processing tool used by libraries that rely on annotation processors.',
      },
      {
        term: 'Convention plugin',
        definition:
          'A reusable internal plugin used to share build logic and standards across modules.',
      },
      {
        term: 'Version alignment',
        definition:
          'Keeping related tool and plugin versions compatible, especially Gradle and AGP.',
      },
      {
        term: 'Dependency graph',
        definition:
          'The full resolved network of direct and transitive dependencies used by a build.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-gradle-matters', label: 'Why Gradle Matters' },
    { id: 'bp-gradle-agp-studio', label: 'Gradle, AGP, and Android Studio' },
    { id: 'bp-when-gradle-fits', label: 'Where Gradle Fits' },
    { id: 'bp-what-gradle-does-not-replace', label: 'What Gradle Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-gradle-is', label: 'What Gradle Is' },
    { id: 'core-what-agp-is', label: 'What AGP Adds' },
    { id: 'core-project-structure', label: 'Project Structure' },
    { id: 'core-kotlin-dsl', label: 'Kotlin DSL and Groovy DSL' },
    { id: 'core-wrapper', label: 'Gradle Wrapper' },
    { id: 'core-build-lifecycle', label: 'Build Lifecycle' },
    { id: 'core-tasks', label: 'Tasks and Task Graph' },
    { id: 'core-dependencies-repositories', label: 'Dependencies and Repositories' },
    { id: 'core-build-variants', label: 'Build Variants' },
    { id: 'core-source-sets', label: 'Source Sets' },
    { id: 'core-dependency-configurations', label: 'Dependency Scope' },
    { id: 'core-sync-vs-build', label: 'Sync Versus Build' },
    { id: 'core-version-alignment', label: 'Version Alignment' },
    { id: 'core-custom-build-logic', label: 'Custom Build Logic' },
    { id: 'core-performance', label: 'Build Performance' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-top-level-plugins', label: 'Top-Level Plugins' },
    { id: 'examples-app-module', label: 'App Module' },
    { id: 'examples-build-types-flavors', label: 'Build Types and Flavors' },
    { id: 'examples-variant-dependency', label: 'Variant Dependencies' },
    { id: 'examples-ksp-kapt', label: 'KSP and kapt' },
    { id: 'examples-settings', label: 'settings.gradle.kts' },
    { id: 'examples-wrapper', label: 'Wrapper Usage' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Gradle Terms' },
    { id: 'glossary-android', label: 'Android Build Terms' },
    { id: 'glossary-dependencies', label: 'Dependency and Build Logic Terms' },
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

export default function GradleForAndroidPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Gradle for Android',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Gradle for Android"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Gradle for Android</h1>
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
