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
  'Xamarin was Microsofts .NET-based mobile application stack for building native apps with C#. The name covered both the platform-specific products Xamarin.Android, Xamarin.iOS, and Xamarin.Mac, and the higher-level UI-sharing framework Xamarin.Forms. In practice, Xamarin gave teams a way to reuse large amounts of .NET code while still shipping real native applications to platform stores.',
  'The most important distinction is between Xamarin Native and Xamarin.Forms. Xamarin Native meant writing platform-specific user interfaces against Android and iOS SDK concepts directly, while sharing business logic, models, networking, and other .NET code. Xamarin.Forms sat one layer higher and let teams share substantial user interface code in C# or XAML, with controls rendered as native platform views underneath.',
  'Xamarin matters historically because it was the Microsoft answer to cross-platform mobile development before .NET MAUI. It brought C#, .NET libraries, NuGet, MVVM-style architecture, and Visual Studio tooling into native mobile work. It also introduced many teams to the idea that cross-platform engineering is a spectrum between code sharing, UI sharing, and platform-specific customization.',
  'Support status is now a first-order fact rather than a footnote. Microsofts official policy states that Xamarin support ended on May 1, 2024. As of April 3, 2026, Xamarin is out of support, Xamarin.Forms has ended support, Xamarin.Essentials has retired, and the supported migration path is .NET for Android, .NET for iOS, .NET for Mac, and .NET MAUI depending on the application type.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Xamarin was a family of tools and frameworks for building native applications with .NET. It let developers target Android, iOS, and macOS with C#, and it let Xamarin.Forms developers share a large portion of UI code across platforms. The shared-code story was the main selling point, but the output was still native applications rather than browser wrappers.',
      'That matters because Xamarin was never just a visual layer. It was a platform strategy built around .NET code reuse, platform bindings, packaging, debugging, deployment, NuGet dependencies, and Visual Studio workflows. The apps you shipped still had to obey native platform rules for signing, release, performance, permissions, lifecycle, and store submission.',
    ],
  },
  {
    id: 'bp-why-it-existed',
    title: 'Why Xamarin Existed',
    paragraphs: [
      'Before Xamarin and similar cross-platform approaches became common, mobile teams often had to write separate applications in separate languages with separate architecture stacks for iOS and Android. Xamarin reduced that fragmentation for organizations already invested in C# and .NET by letting them share domain logic, API clients, models, validation, and in many cases significant parts of the user interface.',
      'The goal was not only code reuse. Xamarin also gave .NET teams a familiar engineering environment. Developers could use C#, .NET libraries, NuGet packages, Visual Studio debugging, asynchronous patterns with async and await, and MVVM architecture instead of switching fully into Swift, Objective-C, Java, or Kotlin for every mobile project.',
    ],
    bullets: [
      'Share application logic across mobile targets.',
      'Reuse .NET skills, libraries, and architecture patterns.',
      'Target native platforms instead of using a webview shell.',
      'Choose between platform-specific UI and shared UI depending on product needs.',
    ],
  },
  {
    id: 'bp-product-line',
    title: 'What the Xamarin Name Covered',
    paragraphs: [
      'The Xamarin name was used broadly, and that often confused newcomers. Xamarin.Android and Xamarin.iOS were platform-specific products that exposed the native SDKs to C#. Xamarin.Mac did a similar job for macOS. Xamarin.Forms was the higher-level cross-platform UI framework built on top of those platform targets. Xamarin.Essentials provided cross-platform APIs for common device features such as connectivity, secure storage, sensors, app info, and launch operations.',
      'When teams said a product was built with Xamarin, they could mean very different things. A Xamarin Native codebase might have fully different screens per platform while sharing only core logic. A Xamarin.Forms app might share a large part of its page structure and controls. Understanding that distinction is essential when reading legacy code or estimating migration work.',
    ],
  },
  {
    id: 'bp-ui-sharing-spectrum',
    title: 'The UI Sharing Spectrum',
    paragraphs: [
      'Xamarin sat on a spectrum rather than forcing one extreme. At one end, Xamarin.Android and Xamarin.iOS let teams write native UIs for each platform while still sharing large amounts of backend-facing and domain code. At the other end, Xamarin.Forms let teams declare shared pages and controls and rely on renderers to translate those controls into native platform widgets.',
      'This spectrum is one reason Xamarin was useful in real projects. Not every screen should be shared equally. Teams could share a large common core, keep some pages nearly identical, and still write platform-specific experiences when the product truly needed native interaction patterns or OS-specific capabilities.',
    ],
  },
]
const bigPictureSectionsTail: ContentSection[] = [
  {
    id: 'bp-platforms-tooling',
    title: 'Platforms and Tooling',
    paragraphs: [
      'Historically, Xamarin Native targeted Android, iOS, and macOS. Xamarin.Forms documentation centered on Android and iOS most heavily, while also supporting UWP and, through additional support paths, platforms such as Tizen, macOS, GTK, and WPF. Those platform details mattered because supported targets depended not only on Xamarin itself but also on external platform toolchains such as Xcode and Android SDK releases.',
      'The typical toolchain depended on the target. Visual Studio on Windows could build Android directly, but iOS development still required access to a Mac build host with the required Apple tooling. This was always part of the real operational cost of Xamarin and remains relevant when assessing older repositories today.',
    ],
  },
  {
    id: 'bp-status',
    title: 'Current Status and Support Reality',
    paragraphs: [
      'This is the most important date-sensitive point on the page: Microsoft states that Xamarin support ended on May 1, 2024. The official support policy also states that Xamarin.Android, Xamarin.iOS, and Xamarin.Mac are integrated directly into .NET starting with .NET 6 as .NET for Android, .NET for iOS, and .NET for Mac, while Xamarin.Forms evolved into .NET MAUI.',
      'That means Xamarin should now be treated as legacy technology in active product planning. Existing apps may continue to exist internally, but they are outside supported Microsoft lifecycle coverage. Teams maintaining such apps need to think in terms of containment, risk, platform-compatibility pressure, and migration sequencing rather than greenfield investment.',
      'The official policy also notes that Android API 34 and Xcode 15 era SDKs were the final versions targeted by existing Xamarin SDKs. Once platform vendors move on, unsupported Xamarin stacks become increasingly difficult to keep aligned with new store requirements and new OS releases.',
    ],
    bullets: [
      'End of support date: May 1, 2024.',
      'Xamarin.Forms migration direction: .NET MAUI.',
      'Xamarin.Android and Xamarin.iOS migration direction: .NET SDK-style platform projects.',
      'Legacy Xamarin work should be evaluated through support and migration risk, not nostalgia.',
    ],
  },
  {
    id: 'bp-where-you-still-see-it',
    title: 'Where You Still See Xamarin',
    paragraphs: [
      'Xamarin still appears in long-lived enterprise mobile products, internal business apps, field service tools, healthcare and logistics applications, and line-of-business systems where the codebase is stable enough that teams have postponed migration. You also still see Xamarin in tutorials, old Stack Overflow answers, archived samples, and historical Microsoft guidance.',
      'The key engineering mistake is to read those materials as if they describe the current supported path for new projects. They do not. They remain useful for understanding older architecture and legacy code, but not for choosing a modern greenfield framework stack.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-xamarin-is',
    title: 'What Xamarin Actually Was',
    paragraphs: [
      'Xamarin was not a single library. It was a mobile development stack for writing native apps in C# using .NET while targeting platform-native APIs. At the lower level, Xamarin.Android and Xamarin.iOS exposed the underlying Android and iOS SDKs to managed code. At the higher level, Xamarin.Forms provided a cross-platform UI abstraction so developers could share pages and controls.',
      'That distinction matters because architecture, debugging strategy, migration difficulty, and performance discussions all depend on which part of the stack a project used. A team maintaining a Xamarin.Forms app will face different issues from a team maintaining Xamarin.iOS and Xamarin.Android apps with separate native UIs and only shared libraries beneath them.',
    ],
  },
  {
    id: 'core-native-vs-forms',
    title: 'Xamarin Native vs Xamarin.Forms',
    paragraphs: [
      'Xamarin Native usually meant platform-specific user interface code for Android and iOS, with shared .NET code for business logic, networking, data access, and utility layers. This gave teams maximum platform fidelity at the UI layer while still keeping language and logic reuse across mobile targets.',
      'Xamarin.Forms was for teams that wanted a larger amount of shared UI. Pages could be declared once in XAML or C# and then rendered into native controls on each target platform. This reduced duplication, especially for line-of-business applications and content-oriented apps, but it also introduced another abstraction layer that teams had to understand when custom behavior or performance tuning became necessary.',
    ],
  },
  {
    id: 'core-solution-structure',
    title: 'Typical Solution Structure',
    paragraphs: [
      'A classic Xamarin solution often contained separate platform projects plus one or more shared libraries. Shared code might live in a .NET Standard library or other reusable .NET project, while platform-specific startup, packaging, resources, and UI entry points remained in Android and iOS projects. Xamarin.Forms applications also included the shared Forms project that defined pages, controls, resources, and view models.',
      'The structure itself taught an important architectural lesson. Cross-platform mobile success depended on keeping the shared core clean and keeping platform dependencies deliberate. The more a supposedly shared layer leaked platform assumptions everywhere, the harder the codebase became to test, port, and migrate.',
    ],
  },
  {
    id: 'core-ui-models',
    title: 'User Interface Models',
    paragraphs: [
      'With Xamarin Native, the UI model followed the target platform. Android screens used Android concepts such as activities, fragments, layouts, and resources. iOS screens used UIKit concepts such as view controllers, storyboards, and native controls. Xamarin gave developers C# access to those APIs, but it did not erase native platform structure.',
      'With Xamarin.Forms, the UI model became page-and-control oriented. Developers could declare ContentPage, StackLayout, Grid, Label, Entry, Button, CollectionView, and similar controls in shared code. The framework then mapped those controls to native implementations for each target. This was the key productivity tradeoff: faster shared UI authoring in exchange for another layer to understand when behavior diverged.',
    ],
  },
  {
    id: 'core-xaml-binding-mvvm',
    title: 'XAML, Data Binding, and MVVM',
    paragraphs: [
      'Xamarin.Forms strongly encouraged XAML and MVVM-style architecture. Data binding connected controls to view-model properties and commands through BindingContext, letting teams keep UI markup cleaner and business logic out of the view layer. Microsoft guidance around Xamarin frequently emphasized XAML, data binding, and MVVM because these patterns scaled better than page code-behind that tried to do everything.',
      'This was one of Xamarin.Forms biggest practical strengths for enterprise apps. Teams could organize logic around view models, services, and domain models instead of hard-coding state transitions in event handlers. That did not make Xamarin.Forms magically maintainable, but it provided a mature architectural path that many .NET teams already understood from WPF, UWP, and related ecosystems.',
    ],
    bullets: [
      'XAML improved shared UI readability and hierarchy.',
      'Binding reduced repetitive UI synchronization code.',
      'Commands fit naturally with MVVM interaction patterns.',
      'View models made testing and reasoning easier than heavy code-behind.',
    ],
  },
]

const combinedBigPictureSections = [...bigPictureSections, ...bigPictureSectionsTail]
const coreConceptSectionsTail: ContentSection[] = [
  {
    id: 'core-navigation',
    title: 'Navigation and App Flow',
    paragraphs: [
      'Navigation in Xamarin.Forms evolved over time. Early applications often used NavigationPage, MasterDetailPage, TabbedPage, and custom routing patterns. Later, Xamarin.Forms Shell provided a more structured navigation model with routes, flyout navigation, tab organization, and URI-style navigation flows.',
      'Navigation mattered because it was often where cross-platform apps became messy. Teams that did not establish a clear navigation model early tended to accumulate brittle page transitions, inconsistent back behavior, and tightly coupled view models. Shell helped standardize some of this, but only if the app actually embraced it instead of mixing too many patterns at once.',
    ],
  },
  {
    id: 'core-renderers-effects',
    title: 'Renderers, Effects, and Platform Customization',
    paragraphs: [
      'Custom renderers were one of the defining Xamarin.Forms concepts. They let teams drop below the shared abstraction and customize how a Forms control became a native control on each platform. This was the escape hatch that made Xamarin.Forms usable for products that needed more than the default out-of-the-box visual behavior.',
      'Effects were a lighter-weight mechanism for smaller platform tweaks. Instead of replacing the rendering behavior of a whole control, an effect could attach a focused customization such as a shadow, platform-specific style tweak, or small native behavior adjustment.',
    ],
  },
  {
    id: 'core-dependencyservice',
    title: 'DependencyService and Platform Services',
    paragraphs: [
      'Xamarin.Forms included DependencyService as a built-in way to call platform-specific functionality from shared code. A shared interface would be defined in common code, platform-specific implementations would be registered in the iOS or Android projects, and shared code could resolve the platform service at runtime.',
      'This pattern was useful, but it was also a design boundary that teams needed to manage carefully. When used sparingly for true platform capabilities, it kept shared code clean. When used everywhere without discipline, it turned into a service locator style dependency web that made maintenance harder.',
    ],
  },
  {
    id: 'core-essentials',
    title: 'Xamarin.Essentials',
    paragraphs: [
      'Xamarin.Essentials bundled cross-platform APIs for common device features. Instead of writing custom bindings immediately for every basic capability, developers could access connectivity, app information, preferences, secure storage, launcher functionality, and many other device-facing services through a unified API surface.',
      'This library reduced a large amount of repetitive platform plumbing and became an important part of the Xamarin developer experience. It also influenced the modern .NET MAUI platform integration model, because many teams depended on exactly these kinds of APIs in line-of-business mobile applications.',
    ],
  },
  {
    id: 'core-build-deploy',
    title: 'Build, Signing, and Deployment',
    paragraphs: [
      'Xamarin always shipped into native release processes. Android builds had to align with Android SDK levels, package signing, and Play Store requirements. iOS builds had to align with Apple certificates, provisioning profiles, Xcode compatibility, and App Store rules. Cross-platform did not remove these obligations; it only changed how much of the app code could be shared before those steps.',
      'This operational fact is central to understanding both the strength and the fragility of Xamarin. The framework could share application code broadly, but it still depended on external platform toolchains. That is one reason support dates and dependency alignment became so important once official Xamarin support ended.',
    ],
  },
  {
    id: 'core-performance-migration',
    title: 'Performance, Testing, and Migration',
    paragraphs: [
      'Xamarin Native performance questions usually centered on startup time, linking, memory pressure, interop boundaries, list virtualization, image handling, and platform-specific rendering behavior. Xamarin.Forms added further concerns such as deep visual trees, excessive nesting, heavy bindings, renderer complexity, and page composition choices. Testing combined unit tests for shared logic with emulator, simulator, and real-device verification.',
      'Migration depends on what the app used. Xamarin.Android and Xamarin.iOS projects generally move toward .NET SDK-style platform projects. Xamarin.Forms projects move toward .NET MAUI if the product still benefits from a shared UI abstraction. The amount of custom renderer code, platform-specific service work, third-party control dependencies, and old project-system assumptions heavily affects cost.',
    ],
    bullets: [
      'Measure real bottlenecks rather than arguing in abstractions.',
      'Test shared logic and platform behavior separately.',
      'Inventory renderers, Essentials usage, and third-party controls before migration.',
      'Treat old Xamarin guidance as historical context, not current greenfield advice.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-solution',
    title: 'Classic Xamarin.Forms Solution Layout',
    description: [
      'A typical Xamarin.Forms app separated the shared UI and logic from the platform startup projects. The exact names varied, but the shape was common across many repositories.',
    ],
    code: `MyApp/
  MyApp/                // shared Xamarin.Forms project
  MyApp.Android/        // Android startup, manifests, resources
  MyApp.iOS/            // iOS startup, info plist, assets
  MyApp.Core/           // shared services, models, domain logic
  MyApp.Tests/          // unit tests for shared logic`,
    notes: [
      'This structure reflects the central Xamarin idea: share the right layers, not every platform concern.',
      'Older repositories often vary between shared projects, PCL-era patterns, and .NET Standard libraries.',
    ],
  },
  {
    id: 'examples-xaml-binding',
    title: 'XAML Page with MVVM Binding',
    description: [
      'Xamarin.Forms commonly used XAML plus BindingContext-driven view models. This reduced repetitive UI synchronization code and fit naturally with MVVM.',
    ],
    code: `<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.MainPage">
    <StackLayout Padding="24">
        <Label Text="{Binding Title}" FontSize="24" />
        <Entry Text="{Binding SearchText}" Placeholder="Search" />
        <Button Text="Load" Command="{Binding LoadCommand}" />
    </StackLayout>
</ContentPage>`,
    notes: [
      'BindingContext supplied the source object for the bound properties and command.',
      'This style kept shared UI readable and reduced the amount of imperative page code.',
    ],
  },
  {
    id: 'examples-viewmodel',
    title: 'Simple ViewModel with Command',
    description: [
      'The page above usually paired with a view model that exposed bindable state and actions. Many Xamarin.Forms codebases used ICommand plus property-change notifications.',
    ],
    code: `public class MainPageViewModel : INotifyPropertyChanged
{
    private string _searchText = string.Empty;

    public string Title => "Customer Lookup";

    public string SearchText
    {
        get => _searchText;
        set
        {
            _searchText = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(SearchText)));
        }
    }

    public ICommand LoadCommand { get; }

    public MainPageViewModel()
    {
        LoadCommand = new Command(async () => await LoadAsync());
    }
}`,
    notes: [
      'This is deliberately small, but it shows the shape of MVVM-oriented Xamarin.Forms state.',
      'Large apps usually extracted API calls, storage, and domain behavior into injected services.',
    ],
  },
]

const combinedCoreConceptSections = [...coreConceptSections, ...coreConceptSectionsTail]
const exampleSectionsTail: ExampleSection[] = [
  {
    id: 'examples-dependencyservice',
    title: 'DependencyService for a Platform Capability',
    description: [
      'DependencyService let shared code call into platform-specific implementations. This pattern appeared often for features that were not directly available in a shared abstraction.',
    ],
    code: `public interface IDeviceInfoService
{
    string GetDeviceName();
}

var deviceName = DependencyService.Get<IDeviceInfoService>()?.GetDeviceName();`,
    notes: [
      'The interface lived in shared code while each platform project supplied its own implementation.',
      'This was convenient, but many teams later preferred more explicit dependency injection patterns for larger systems.',
    ],
  },
  {
    id: 'examples-renderer',
    title: 'Custom Renderer Concept',
    description: [
      'Custom renderers were the standard Xamarin.Forms escape hatch when a shared control needed deeper native customization.',
    ],
    code: `public class BorderlessEntry : Entry
{
}

[assembly: ExportRenderer(typeof(BorderlessEntry), typeof(BorderlessEntryRenderer))]

public class BorderlessEntryRenderer : EntryRenderer
{
    protected override void OnElementChanged(ElementChangedEventArgs<Entry> e)
    {
        base.OnElementChanged(e);
    }
}`,
    notes: [
      'The specific native API varied by platform, but the architectural point was consistent: shared control above, native customization below.',
      'Legacy Xamarin.Forms codebases often contain many renderer classes, and that strongly affects migration planning.',
    ],
  },
  {
    id: 'examples-shell',
    title: 'Shell-Based Navigation',
    description: [
      'Later Xamarin.Forms apps frequently used Shell to organize flyout navigation, tabs, and route-based navigation more consistently.',
    ],
    code: `<Shell xmlns="http://xamarin.com/schemas/2014/forms"
       xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
       x:Class="MyApp.AppShell">
    <TabBar>
        <ShellContent Title="Home" ContentTemplate="{DataTemplate local:HomePage}" />
        <ShellContent Title="Settings" ContentTemplate="{DataTemplate local:SettingsPage}" />
    </TabBar>
</Shell>`,
    notes: [
      'Shell introduced more structure than ad hoc navigation stacks and helped standardize larger app flows.',
      'Not every Xamarin.Forms app used Shell because many older apps predated it or mixed multiple navigation models.',
    ],
  },
  {
    id: 'examples-essentials',
    title: 'Xamarin.Essentials Device API Usage',
    description: [
      'Xamarin.Essentials gave Xamarin apps a unified API for common device tasks that otherwise required repetitive platform code.',
    ],
    code: `var current = Connectivity.NetworkAccess;

if (current == NetworkAccess.Internet)
{
    await Launcher.OpenAsync("https://example.com");
}`,
    notes: [
      'This illustrates the value of Essentials: simple cross-platform APIs for device-facing capabilities.',
      'Essentials is now retired with Xamarin, but the capability category remains important in migration work.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Xamarin Terms',
    terms: [
      {
        term: 'Xamarin',
        definition:
          'The Microsoft-owned .NET mobile application stack that enabled native app development for Android, iOS, and macOS with C#.',
      },
      {
        term: 'Xamarin Native',
        definition:
          'A practical term for Xamarin.Android and Xamarin.iOS projects that used platform-specific user interfaces while sharing .NET code underneath.',
      },
      {
        term: 'Xamarin.Forms',
        definition:
          'The higher-level cross-platform UI framework that let developers share user interface code in C# or XAML while rendering native controls underneath.',
      },
      {
        term: 'Xamarin.Essentials',
        definition:
          'A cross-platform library that exposed common device capabilities such as connectivity, launcher, preferences, and secure storage through a unified API.',
      },
    ],
  },
  {
    id: 'glossary-ui',
    title: 'UI and Architecture Terms',
    terms: [
      {
        term: 'XAML',
        definition:
          'A declarative markup language used heavily in Xamarin.Forms to describe page layout, bindings, and UI resources.',
      },
      {
        term: 'BindingContext',
        definition:
          'The data context object that Xamarin.Forms bindings resolve against, commonly set to a view model.',
      },
      {
        term: 'MVVM',
        definition:
          'Model-View-ViewModel, a UI architecture pattern commonly used in Xamarin.Forms to separate presentation from logic and state.',
      },
      {
        term: 'Renderer',
        definition:
          'The Xamarin.Forms mechanism that maps a shared control to a native platform control and allows deep customization.',
      },
      {
        term: 'DependencyService',
        definition:
          'A Xamarin.Forms mechanism for resolving platform-specific implementations from shared code.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Build, Tooling, and Migration Terms',
    terms: [
      {
        term: 'Build host',
        definition:
          'A machine required for platform-specific build steps, especially a Mac for iOS build and signing workflows from Windows-based development setups.',
      },
      {
        term: 'NuGet',
        definition:
          'The package manager used heavily in Xamarin solutions for framework references and third-party libraries.',
      },
      {
        term: 'SDK-style project',
        definition:
          'The newer .NET project format used by modern .NET platform tooling and migration targets.',
      },
      {
        term: '.NET MAUI',
        definition:
          'The modern supported evolution of Xamarin.Forms for cross-platform UI development on .NET.',
      },
      {
        term: 'End of support',
        definition:
          'The point after which Microsoft no longer provides fixes, updates, or official technical assistance. For Xamarin this date was May 1, 2024.',
      },
    ],
  },
]

const combinedExampleSections = [...exampleSections, ...exampleSectionsTail]
const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-existed', label: 'Why Xamarin Existed' },
    { id: 'bp-product-line', label: 'Product Line' },
    { id: 'bp-ui-sharing-spectrum', label: 'UI Sharing Spectrum' },
    { id: 'bp-platforms-tooling', label: 'Platforms and Tooling' },
    { id: 'bp-status', label: 'Current Status' },
    { id: 'bp-where-you-still-see-it', label: 'Where It Still Appears' },
  ],
  'core-concepts': [
    { id: 'core-what-xamarin-is', label: 'What Xamarin Was' },
    { id: 'core-native-vs-forms', label: 'Native vs Forms' },
    { id: 'core-solution-structure', label: 'Solution Structure' },
    { id: 'core-ui-models', label: 'UI Models' },
    { id: 'core-xaml-binding-mvvm', label: 'XAML and MVVM' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-renderers-effects', label: 'Renderers and Effects' },
    { id: 'core-dependencyservice', label: 'DependencyService' },
    { id: 'core-essentials', label: 'Xamarin.Essentials' },
    { id: 'core-build-deploy', label: 'Build and Deployment' },
    { id: 'core-performance-migration', label: 'Performance and Migration' },
  ],
  examples: [
    { id: 'examples-solution', label: 'Solution Layout' },
    { id: 'examples-xaml-binding', label: 'XAML Binding' },
    { id: 'examples-viewmodel', label: 'ViewModel' },
    { id: 'examples-dependencyservice', label: 'DependencyService' },
    { id: 'examples-renderer', label: 'Custom Renderer' },
    { id: 'examples-shell', label: 'Shell Navigation' },
    { id: 'examples-essentials', label: 'Essentials API' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-ui', label: 'UI and Architecture Terms' },
    { id: 'glossary-operations', label: 'Build and Migration Terms' },
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

export default function XamarinPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Xamarin',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Xamarin"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Xamarin</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? combinedBigPictureSections.map((section, index) =>
            renderContentSection(section, index === combinedBigPictureSections.length - 1),
          )
        : null}

      {activeTab === 'core-concepts'
        ? combinedCoreConceptSections.map((section, index) =>
            renderContentSection(section, index === combinedCoreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? combinedExampleSections.map((section, index) =>
            renderExampleSection(section, index === combinedExampleSections.length - 1),
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
