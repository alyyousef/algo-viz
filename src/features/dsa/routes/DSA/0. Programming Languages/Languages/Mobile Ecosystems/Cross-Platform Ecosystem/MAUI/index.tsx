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
  ".NET MAUI, usually called MAUI, is Microsoft's cross-platform UI framework for building apps with .NET that can target Android, iOS, macOS, and Windows from a shared codebase. The important point is that MAUI is not only a UI toolkit. In practice it is an application stack that combines .NET runtime capabilities, platform access, handlers, XAML or C# UI authoring, dependency injection, resource management, and platform-specific extension points.",
  'MAUI sits in a different ecosystem from JavaScript-first cross-platform stacks. It is strongest for teams already invested in .NET, C#, Visual Studio tooling, and a strongly typed application architecture. That ecosystem context matters because the real question is not only whether MAUI can render mobile screens. The question is whether the surrounding .NET-based workflow, architecture patterns, and native integration model fit the product and team.',
  'This page is intentionally comprehensive. It covers what MAUI actually is, how it evolved from Xamarin.Forms, single-project structure, handlers, XAML and C# UI patterns, Shell, MVVM, dependency injection, native platform access, build and deployment workflow, performance, testing, and the common mistakes teams make when they treat MAUI as if it were simply desktop UI ported onto phones.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      ".NET MAUI is Microsoft's cross-platform app UI framework for building native applications with C# and .NET across Android, iOS, macOS, and Windows. It is the successor direction to Xamarin.Forms, but it is not just a rename. It reorganizes the stack around a broader .NET application model, handlers, and a single-project development experience.",
      'The practical value of MAUI is that it lets .NET teams share substantial application code, UI structure, resources, and architecture while still targeting native platforms. That makes it especially relevant in organizations already invested in C#, .NET, Visual Studio, and strongly typed application architecture.',
      'MAUI is best understood as a full application stack rather than only a widget catalog. UI authoring, dependency injection, configuration, resources, platform APIs, native deployment, and multi-targeting are all part of the real framework experience.',
    ],
  },
  {
    id: 'bp-why-maui-matters',
    title: 'Why MAUI Matters',
    paragraphs: [
      'MAUI matters because it gives .NET developers a first-party cross-platform path that aligns with the broader .NET ecosystem. For teams that already use ASP.NET, Blazor, Entity Framework, C#, and Microsoft tooling, MAUI can reduce language and platform fragmentation across products.',
      'The framework is not valuable simply because it is cross-platform. Its value comes from the combination of shared code, native targets, .NET libraries, typed tooling, and a familiar application model for teams that are already comfortable in that ecosystem.',
    ],
    bullets: [
      'It aligns mobile and desktop development with the .NET ecosystem.',
      'It supports large amounts of shared code across multiple targets.',
      'It integrates naturally with C#, DI, configuration, and MVVM patterns.',
      'It preserves native platform targets instead of using a web wrapper model.',
    ],
  },
  {
    id: 'bp-single-project',
    title: 'Single Project as an Ecosystem Shift',
    paragraphs: [
      "One of MAUI's defining workflow ideas is the single-project structure. Instead of treating each platform as a separate top-level app project with thin sharing on top, MAUI organizes a shared project with platform-specific folders and multi-targeting behavior underneath.",
      'This changes both project organization and developer expectations. The project becomes easier to reason about when shared assets, shared code, and platform-specific customizations live in one coherent structure rather than a loose cluster of sibling projects.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where MAUI Fits Best',
    paragraphs: [
      'MAUI is strongest for teams that want native-targeting apps but prefer the .NET stack over JavaScript-first or Kotlin-first ecosystems. It is a particularly natural fit when the team already has C# expertise, shared .NET business logic, or desktop and mobile ambitions inside one technology family.',
      'It can also fit organizations that value long-term typed code sharing and Microsoft-centered tooling more than they value following the dominant web-to-mobile ecosystem path.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What MAUI Does Not Replace',
    paragraphs: [
      'MAUI does not remove the need to understand native platform behavior, store release processes, performance tuning, or platform-specific UX. It also does not guarantee that every screen should be fully shared. Cross-platform frameworks reduce duplication, but they do not erase platform reality.',
      'It is also not a reason to ignore application architecture. A large MAUI codebase still needs clear state ownership, navigation discipline, testing strategy, and careful separation between UI and business logic.',
    ],
    bullets: [
      'It does not replace platform knowledge.',
      'It does not remove native deployment and store responsibilities.',
      'It does not make architecture decisions automatic.',
      'It does not guarantee zero platform-specific code.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, MAUI teams usually settle into a disciplined blend of shared UI, shared logic, and selective platform customization. The healthiest teams treat multi-targeting, handlers, resources, and platform services as explicit engineering concerns rather than magic hidden behind the framework name.',
      'As of March 31, 2026, MAUI remains closely tied to the broader .NET release cadence and Microsoft documentation. That means version alignment, tooling expectations, and platform support guidance should be taken from official current docs rather than from older Xamarin-era assumptions.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When evaluating MAUI, the useful questions are practical. Is the team already invested in .NET? How much UI sharing is actually desirable? How much platform customization is expected? Does Visual Studio and the .NET toolchain fit the team better than JavaScript-centric alternatives? Is the deployment model clear for all target platforms?',
      'Most MAUI disappointments come from mismatch, not from the framework being inherently unusable. The right fit is a team that wants cross-platform native targets through .NET and is willing to manage real native-platform concerns where necessary.',
    ],
    bullets: [
      'Prefer MAUI when .NET alignment is a strategic advantage.',
      'Assume some platform-specific work will still exist.',
      'Use single-project structure intentionally, not casually.',
      'Treat architecture, performance, and deployment as first-class design concerns.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-maui-is',
    title: 'What MAUI Actually Is',
    paragraphs: [
      'MAUI is a cross-platform UI framework within .NET. It lets developers build apps using C# and XAML or C# UI code while targeting multiple native platforms from one solution structure.',
      'The important point is that MAUI is not just a layout system. It sits within the .NET hosting model and works with dependency injection, configuration, resources, platform services, and common .NET application patterns.',
    ],
  },
  {
    id: 'core-xamarin-relationship',
    title: 'MAUI and the Xamarin.Forms Lineage',
    paragraphs: [
      'MAUI follows the Xamarin.Forms lineage, but teams should not think of it as only a rename. The project structure, handler model, integration with modern .NET, and multi-targeting approach make it meaningfully different operationally.',
      'This matters because migration conversations often fail when teams assume MAUI is just old Xamarin.Forms documentation with a new label. Architecture and tooling assumptions need to be updated too.',
    ],
  },
  {
    id: 'core-single-project',
    title: 'Single-Project Structure',
    paragraphs: [
      'MAUI uses a single-project model that organizes shared app code and resources together while still allowing platform-specific code under dedicated folders. This simplifies project navigation and reduces the sense that each platform app is a separate top-level product.',
      "The single-project model is one of MAUI's most important developer-experience features because it changes how multi-targeting feels in day-to-day work.",
    ],
  },
  {
    id: 'core-handlers',
    title: 'Handlers Instead of the Older Renderer Mentality',
    paragraphs: [
      'MAUI uses handlers to map cross-platform controls to native platform views. This is an important architectural concept because it changes customization strategy, control behavior, and how the framework thinks about platform mapping.',
      'Teams that understand handlers can reason more clearly about what is shared UI abstraction and what is native implementation underneath. That understanding becomes especially important when performance or customization work appears.',
    ],
  },
  {
    id: 'core-ui-authoring',
    title: 'XAML, C#, and UI Authoring Choices',
    paragraphs: [
      'MAUI supports XAML-based UI authoring and C#-based UI construction. XAML remains common because it works well with declarative layout, data binding, and MVVM-style separation. Some teams prefer more code-centric UI construction for consistency or metaprogramming reasons.',
      'The relevant engineering point is not that one syntax is universally superior. It is that the team should choose a UI authoring style that matches its maintainability and tooling needs.',
    ],
  },
  {
    id: 'core-shell',
    title: 'Shell and Navigation Structure',
    paragraphs: [
      'Shell provides a structured approach to app navigation and hierarchy in MAUI. It can define routes, flyout structures, tabbed structures, and navigation patterns at the application level.',
      'This matters because navigation is an architectural concern, not just a screen-linking concern. A coherent Shell strategy can make the app more understandable, while a confused routing model quickly makes a cross-platform app harder to maintain.',
    ],
  },
  {
    id: 'core-mvvm',
    title: 'MVVM, Binding, and Application Architecture',
    paragraphs: [
      'MAUI fits naturally with MVVM-style patterns because binding, view-model separation, commands, and declarative UI are all well aligned with that architecture. For many .NET teams, this is one of the biggest practical benefits because it matches patterns already familiar from other XAML-based application stacks.',
      'The framework does not force MVVM, but MAUI projects often become easier to maintain when UI logic, state, and domain operations are clearly separated rather than mixed inside view code.',
    ],
  },
  {
    id: 'core-di-hosting',
    title: 'Dependency Injection and the .NET App Model',
    paragraphs: [
      'A major advantage of MAUI is that it sits comfortably inside the modern .NET hosting and dependency injection mindset. Services can be registered in the application startup path, and application architecture can feel similar to other .NET application layers.',
      'This is strategically important because it lets teams share more than syntax. They can share architectural habits across mobile, desktop, and service-side .NET systems.',
    ],
  },
  {
    id: 'core-resources',
    title: 'Resources, Styling, and Shared Assets',
    paragraphs: [
      'MAUI supports shared resources, styles, images, fonts, and other assets within its single-project structure. Resource organization matters because cross-platform apps can easily become visually inconsistent or asset-heavy if teams do not standardize how shared UI assets are managed.',
      'A disciplined resource model supports theming, reusable controls, and clearer cross-platform consistency without pretending every platform nuance should disappear.',
    ],
  },
  {
    id: 'core-native-platform-access',
    title: 'Platform Access and Native Customization',
    paragraphs: [
      'Cross-platform does not mean platform-ignorant. MAUI still supports platform-specific code and native API access where needed. That is essential for hardware access, OS-level services, platform-specific capabilities, and integration with native SDKs.',
      'The right mental model is not that platform-specific code is a failure. It is that the shared surface should be broad where it makes sense and narrow where the product genuinely needs platform-specific behavior.',
    ],
  },
  {
    id: 'core-build-deploy',
    title: 'Build, Signing, and Deployment',
    paragraphs: [
      'MAUI apps still produce native platform deliverables and still follow native platform deployment rules. Android packaging, iOS signing, app store submission, Windows packaging, and macOS distribution are not abstracted away into irrelevance.',
      'This is one reason cross-platform success depends on operational discipline. Shared UI does not eliminate platform-specific build and release obligations.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing, Debugging, and Tooling',
    paragraphs: [
      'MAUI development relies heavily on .NET tooling, Visual Studio workflows, emulators or simulators, logs, device testing, and ordinary debugging practices. Teams need a plan for testing both shared code and platform-specific behavior.',
      'Tooling comfort is part of the framework fit. A team that is already productive in the .NET debugging and IDE ecosystem may find MAUI substantially more natural than a team whose workflows center elsewhere.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Handler-Aware Thinking',
    paragraphs: [
      'MAUI performance work often involves layout complexity, control choice, data-binding patterns, handler behavior, asset size, startup cost, and platform-specific rendering details. Like any cross-platform framework, it can perform well, but it does not do so automatically.',
      'The practical rule is to optimize real bottlenecks rather than abstract fears. Measure the screen, interaction, or startup path that is slow and then determine whether the issue is shared UI structure, data churn, or platform-specific behavior.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common MAUI Mistakes',
    paragraphs: [
      'Common mistakes include assuming all UI should be completely shared, importing old Xamarin assumptions without validating them against MAUI, neglecting platform-specific deployment realities, and mixing too much logic directly into page code instead of using clearer architecture.',
      'Another recurring mistake is choosing MAUI for superficial cross-platform reasons while ignoring whether the team actually wants a .NET-centered workflow. Framework fit matters as much as feature lists.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-maui-program',
    title: 'Application Startup and Dependency Injection',
    description: [
      'MAUI aligns with the broader .NET application model, so startup and service registration are a meaningful part of the ecosystem story.',
    ],
    code: `public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();

        builder
            .UseMauiApp<App>();

        builder.Services.AddSingleton<WeatherService>();
        builder.Services.AddTransient<MainPageViewModel>();

        return builder.Build();
    }
}`,
    notes: [
      'This highlights that MAUI is comfortable inside the .NET hosting and DI mindset.',
      'App architecture often becomes cleaner when services and view models are wired deliberately at startup.',
    ],
  },
  {
    id: 'examples-shell',
    title: 'Shell-Based Route Definition',
    description: [
      'Shell is one of the most important structural tools in MAUI because it shapes how screen hierarchy and navigation are expressed.',
    ],
    code: `<Shell
    xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    x:Class="SampleApp.AppShell">

    <TabBar>
        <ShellContent Title="Home" ContentTemplate="{DataTemplate local:HomePage}" />
        <ShellContent Title="Settings" ContentTemplate="{DataTemplate local:SettingsPage}" />
    </TabBar>
</Shell>`,
    notes: [
      'Navigation structure is an architectural choice, not just a convenience detail.',
      'Shell can make multi-page apps much easier to organize when used consistently.',
    ],
  },
  {
    id: 'examples-binding',
    title: 'Simple MVVM Binding',
    description: [
      'MAUI often works best when view code stays thin and screen state lives in a view model.',
    ],
    code: `public class MainPageViewModel
{
    public string Title => "MAUI Dashboard";
}

// XAML
<Label Text="{Binding Title}" />`,
    notes: [
      'This is intentionally small, because the architectural idea matters more than the syntax volume.',
      'Binding is strongest when it supports a real separation between UI and logic.',
    ],
  },
  {
    id: 'examples-handler',
    title: 'Handler-Level Customization',
    description: [
      'Handlers are a core MAUI concept because they define how cross-platform controls map onto native implementations.',
    ],
    code: `Microsoft.Maui.Handlers.EntryHandler.Mapper.AppendToMapping(
    "CustomEntry",
    (handler, view) =>
    {
        #if ANDROID
        handler.PlatformView.SetSelectAllOnFocus(true);
        #endif
    });`,
    notes: [
      'This shows how MAUI customization often happens at the handler and platform boundary.',
      'Handler awareness helps teams make more precise platform-specific changes.',
    ],
  },
  {
    id: 'examples-platform-folder',
    title: 'Platform-Specific Code in a Shared Project',
    description: [
      'Single-project structure does not eliminate platform-specific files. It organizes them more coherently.',
    ],
    code: `Platforms/
  Android/
  iOS/
  MacCatalyst/
  Windows/`,
    notes: [
      'The project remains cross-platform, but platform-specific ownership is still explicit.',
      'This structure is one reason MAUI feels different from older multi-project patterns.',
    ],
  },
  {
    id: 'examples-multi-targeting',
    title: 'Target Frameworks in the Project File',
    description: [
      'MAUI multi-platform intent is reflected directly in the project file, not hidden behind a vague framework label.',
    ],
    code: `<TargetFrameworks>net8.0-android;net8.0-ios;net8.0-maccatalyst</TargetFrameworks>
<UseMaui>true</UseMaui>`,
    notes: [
      'This makes target platforms an explicit build concern.',
      'Version and target alignment still need disciplined maintenance over time.',
    ],
  },
  {
    id: 'examples-platform-service',
    title: 'Native Service Boundary',
    description: [
      'Even in a shared app, some services naturally need platform-specific implementations.',
    ],
    code: `public interface IDeviceOrientationService
{
    string GetOrientation();
}`,
    notes: [
      'Cross-platform architecture remains healthier when platform services are abstracted clearly.',
      'Shared code should depend on contracts, not on scattered platform checks everywhere.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core MAUI Terms',
    terms: [
      {
        term: 'MAUI',
        definition:
          'The .NET Multi-platform App UI framework for building native apps across multiple platforms with .NET.',
      },
      {
        term: 'Single project',
        definition:
          'MAUI project structure that organizes shared and platform-specific code under one coordinated project layout.',
      },
      {
        term: 'Handler',
        definition:
          'The MAUI mechanism that maps a cross-platform control to its native platform implementation.',
      },
      {
        term: 'XAML',
        definition:
          'A declarative markup language commonly used in MAUI for UI layout and binding.',
      },
      {
        term: 'Shell',
        definition: 'A MAUI structure for defining application navigation hierarchy and routes.',
      },
      {
        term: 'Multi-targeting',
        definition: 'Building one MAUI codebase for multiple platform-specific target frameworks.',
      },
      {
        term: 'MauiProgram',
        definition:
          'The startup entry point where a MAUI app is typically configured and services are registered.',
      },
      {
        term: 'Platform folder',
        definition:
          'A directory within a MAUI project containing platform-specific code and configuration.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and App Terms',
    terms: [
      {
        term: 'MVVM',
        definition:
          'Model-View-ViewModel, an architectural pattern commonly used in MAUI to separate UI and logic.',
      },
      {
        term: 'Binding',
        definition:
          'The connection between UI elements and underlying data or view-model properties.',
      },
      {
        term: 'Dependency injection',
        definition:
          'The .NET architectural pattern of registering and resolving services through a container.',
      },
      {
        term: 'Shared code',
        definition: 'Application code reused across Android, iOS, macOS, and Windows targets.',
      },
      {
        term: 'Platform-specific code',
        definition:
          'Code intentionally written for one target platform when shared abstractions are not enough.',
      },
      {
        term: 'Resource dictionary',
        definition: 'A MAUI structure used to define shared styles, colors, and UI resources.',
      },
      {
        term: 'Native target',
        definition:
          'An actual OS platform such as Android or iOS for which MAUI builds a native application.',
      },
      {
        term: 'App lifecycle',
        definition:
          'The platform and framework events that govern application startup, suspension, resume, and shutdown behavior.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Build, Deployment, and Tooling Terms',
    terms: [
      {
        term: 'Visual Studio tooling',
        definition:
          'The IDE and debugging environment commonly used for MAUI development and platform deployment.',
      },
      {
        term: 'Signing',
        definition:
          'The platform-specific process of preparing an app for trusted installation or store submission.',
      },
      {
        term: 'Package',
        definition:
          'A platform-specific application output prepared for installation or store distribution.',
      },
      {
        term: 'Simulator or emulator',
        definition:
          'A virtual device environment used to test MAUI applications without always relying on physical hardware.',
      },
      {
        term: 'Hot Reload',
        definition:
          'A development workflow feature that updates parts of the running UI during iteration.',
      },
      {
        term: 'Target framework',
        definition:
          'The .NET target identifier that specifies which platform runtime a MAUI build is aimed at.',
      },
      {
        term: 'Version alignment',
        definition:
          'Keeping .NET, MAUI, workload, and platform tool versions compatible over time.',
      },
      {
        term: 'Workload',
        definition:
          'An installable .NET SDK component set that provides platform-specific capabilities such as MAUI support.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-maui-matters', label: 'Why MAUI Matters' },
    { id: 'bp-single-project', label: 'Single Project' },
    { id: 'bp-where-it-fits', label: 'Where MAUI Fits' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-maui-is', label: 'What MAUI Is' },
    { id: 'core-xamarin-relationship', label: 'Xamarin.Forms Relationship' },
    { id: 'core-single-project', label: 'Single-Project Structure' },
    { id: 'core-handlers', label: 'Handlers' },
    { id: 'core-ui-authoring', label: 'XAML and C# UI' },
    { id: 'core-shell', label: 'Shell' },
    { id: 'core-mvvm', label: 'MVVM and Binding' },
    { id: 'core-di-hosting', label: 'Dependency Injection' },
    { id: 'core-resources', label: 'Resources and Styling' },
    { id: 'core-native-platform-access', label: 'Platform Access' },
    { id: 'core-build-deploy', label: 'Build and Deployment' },
    { id: 'core-testing-debugging', label: 'Testing and Debugging' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-maui-program', label: 'Startup and DI' },
    { id: 'examples-shell', label: 'Shell Navigation' },
    { id: 'examples-binding', label: 'MVVM Binding' },
    { id: 'examples-handler', label: 'Handler Customization' },
    { id: 'examples-platform-folder', label: 'Platform Folders' },
    { id: 'examples-multi-targeting', label: 'Target Frameworks' },
    { id: 'examples-platform-service', label: 'Platform Service Boundary' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core MAUI Terms' },
    { id: 'glossary-architecture', label: 'Architecture and App Terms' },
    { id: 'glossary-operations', label: 'Build and Tooling Terms' },
  ],
}

const pageStyles = `
.maui-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.maui-help-window {
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

.maui-help-titlebar {
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

.maui-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.maui-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.maui-help-control {
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

.maui-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.maui-help-tab {
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

.maui-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.maui-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.maui-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.maui-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.maui-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.maui-help-toc-item {
  margin: 0 0 8px;
}

.maui-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.maui-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.maui-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.maui-help-section {
  margin: 0 0 20px;
}

.maui-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.maui-help-content p,
.maui-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.maui-help-content p {
  margin: 0 0 10px;
}

.maui-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.maui-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.maui-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.maui-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .maui-help-main {
    grid-template-columns: 1fr;
  }

  .maui-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .maui-help-window {
    min-height: auto;
  }

  .maui-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .maui-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .maui-help-controls {
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
    <section key={section.id} id={section.id} className="maui-help-section">
      <h2 className="maui-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="maui-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="maui-help-section">
      <h2 className="maui-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="maui-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="maui-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="maui-help-section">
      <h2 className="maui-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="maui-help-divider" />}
    </section>
  )
}

export default function MauiPage(): JSX.Element {
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
    document.title = `MAUI (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'MAUI',
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
    <div className="maui-help-page">
      <style>{pageStyles}</style>
      <div className="maui-help-window" role="presentation">
        <header className="maui-help-titlebar">
          <span className="maui-help-titletext">MAUI</span>
          <div className="maui-help-controls">
            <button
              className="maui-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="maui-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="maui-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`maui-help-tab ${activeTab === tab.id ? 'maui-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="maui-help-main">
          <aside className="maui-help-toc" aria-label="Table of contents">
            <h2 className="maui-help-toc-title">Contents</h2>
            <ul className="maui-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="maui-help-toc-item">
                  <a href={`#${section.id}`} className="maui-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="maui-help-content">
            <h1 className="maui-help-doc-title">MAUI</h1>
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
