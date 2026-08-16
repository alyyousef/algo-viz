import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Bazel/index.mdx': `---
title: Bazel
description: An open-source software tool used for the automation of building and testing of software.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Bazel"
  subtitle="Google's Monorepo Titan"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bazel_logo.svg/512px-Bazel_logo.svg.png"
  description="Bazel is the open-source version of Google's internal 'Blaze' build system. It is specifically engineered to mathematically compile massive, polyglot monorepos exponentially faster than traditional build tools."
  yearCreated={2015}
  creator="Google"
  isOpenSource={true}
  websiteUrl="https://bazel.build/"
>

If you have a monorepo containing a Python backend, a React frontend, and a Go microservice, you typically need to run \`pip\`, \`npm\`, and \`go build\` separately. 

Bazel unifies everything. It mathematically parses the entire repository across all languages and builds a single, massive dependency graph.

<Callout icon="success" title="Hermetic & Reproducible Builds">
  Bazel's greatest strength is its **Hermeticity**. 
  
  When Bazel compiles a C++ file, it physically sandboxes the compiler. It mathematically guarantees that the build cannot accidentally rely on a random library installed on the developer's laptop. If it compiles successfully on your laptop, it is mathematically guaranteed to compile identically on the CI/CD server, completely eliminating the "It works on my machine" problem.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Cargo/index.mdx': `---
title: Cargo
description: The Rust package manager.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Cargo"
  subtitle="The gold standard of package managers"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/512px-Rust_programming_language_black_logo.svg.png"
  description="Cargo is the official build system and package manager for the Rust programming language. It is widely considered by the industry to be the single best package manager ever created."
  yearCreated={2014}
  creator="Yehuda Katz (Rust Foundation)"
  isOpenSource={true}
  websiteUrl="https://doc.rust-lang.org/cargo/"
>

Historically, C and C++ lacked a unified package manager, resulting in a fractured ecosystem of CMake, Makefiles, and manual DLL linking.

The creators of Rust mathematically learned from this. They shipped Rust with **Cargo** built-in on Day 1.

<Callout icon="tip" title="Vertical Integration">
  Cargo is not just a package downloader. It mathematically handles everything.
  - \`cargo build\` invokes the Rust compiler.
  - \`cargo test\` runs the unit tests.
  - \`cargo fmt\` formats the code.
  - \`cargo publish\` uploads the package to crates.io.
  
  Because there is exactly one official way to build a Rust project, the Rust ecosystem is mathematically cohesive and devoid of the toolchain fatigue found in JavaScript.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Chocolatey/index.mdx': `---
title: Chocolatey
description: A machine-level, command-line package manager and installer for software on Microsoft Windows.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Chocolatey"
  subtitle="apt-get for Windows"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolatey_icon.png/512px-Chocolatey_icon.png"
  description="Chocolatey brought Linux-style command-line package management to Windows. It mathematically automates the tedious process of downloading .exe installers and clicking 'Next' 15 times."
  yearCreated={2011}
  creator="Rob Reynolds"
  isOpenSource={true}
  websiteUrl="https://chocolatey.org/"
>

Before Chocolatey, provisioning a new Windows laptop required a developer to open Chrome, navigate to 20 different websites (Node.js, Git, VS Code, Python), download 20 MSIs, and manually execute them.

<Callout icon="success" title="Silent Automation">
  With Chocolatey, a developer simply opens PowerShell as Administrator and types:
  \`choco install nodejs git vscode python -y\`
  
  Chocolatey mathematically downloads the official installers, injects "silent install" flags to bypass all GUI prompts, and automatically maps the binaries into the system's \`PATH\` environment variable.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/winget/index.mdx': `---
title: winget (Windows Package Manager)
description: A free and open-source package manager designed by Microsoft for Windows 10 and Windows 11.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="winget"
  subtitle="Microsoft's official Chocolatey killer"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Windows_Package_Manager_Icon.svg/512px-Windows_Package_Manager_Icon.svg.png"
  description="After watching Chocolatey dominate Windows automation for a decade, Microsoft mathematically surrendered and built their own official, first-party command-line package manager."
  yearCreated={2020}
  creator="Microsoft"
  isOpenSource={true}
  websiteUrl="https://github.com/microsoft/winget-cli"
>

\\\`winget\\\` is physically built into modern Windows 11 installations by default. 

Unlike Chocolatey (which requires community volunteers to package \\\`.nupkg\\\` files), \\\`winget\\\` acts primarily as a mathematical manifest reader. It reads a YAML file hosted on GitHub, grabs the official download URL from the publisher, and executes it silently.

Because it is native, \\\`winget\\\` can mathematically detect and upgrade software that the user previously installed manually via Chrome, a feature that third-party package managers struggle with.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Composer/index.mdx': `---
title: Composer
description: An application-level package manager for the PHP programming language that provides a standard format for managing dependencies of PHP software and required libraries.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Composer"
  subtitle="The savior of PHP"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Composer_logo.svg/512px-Composer_logo.svg.png"
  description="Before 2012, the PHP ecosystem was notoriously chaotic, relying on manual \`include\` statements and fractured PEAR packages. Composer mathematically unified the entire language."
  yearCreated={2012}
  creator="Nils Adermann & Jordi Boggiano"
  isOpenSource={true}
  websiteUrl="https://getcomposer.org/"
>

Composer was heavily inspired by Node's \`npm\` and Ruby's \`Bundler\`. It introduced the \`composer.json\` file and mathematically connected the PHP ecosystem to the central **Packagist** repository.

<Callout icon="info" title="PSR-4 Autoloading">
  Composer's greatest mathematical innovation was standardizing **Autoloading**.
  
  Historically, developers had to manually write \`require_once('vendor/lib/math.php')\` at the top of every file. Composer introduced a mathematically strict namespace-to-directory mapping (PSR-4). It generates a single \`autoload.php\` file; the developer simply requires it once, and PHP dynamically loads classes into RAM only exactly when they are instantiated.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Go modules/index.mdx': `---
title: Go modules
description: The official dependency management system for the Go programming language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Go modules">

For the first decade of Go's existence, its dependency management was mathematically terrifying. It relied on the \`GOPATH\`—a strict requirement that all code on a developer's laptop had to live in exactly one physical directory tree.

**Go modules (vgo)** was introduced in Go 1.11 to finally bring modern dependency management to the language.

<Callout icon="warning" title="Decentralized Versioning">
  Unlike \`npm\` or \`pip\`, Go does not have a central registry server (like \`npmjs.com\`). 
  
  Go imports mathematically point directly to Git repositories: \`import "github.com/google/uuid"\`. 
  
  When you run \`go build\`, the Go compiler physically connects to GitHub, downloads the tagged release, and calculates a strict cryptographic checksum saved in the \`go.sum\` file to prevent supply-chain attacks.
</Callout>

## Minimal Version Selection (MVS)

Go mathematically approaches dependency resolution differently than npm. Instead of upgrading packages to the absolute highest possible version, Go's **MVS** algorithm selects the *oldest* possible version that satisfies the requirements. This mathematical conservatism prevents unexpected breaking changes from silently destroying production builds.

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Gradle/index.mdx': `---
title: Gradle
description: An open-source build automation tool that is designed to be flexible enough to build almost any type of software.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Gradle"
  subtitle="The Android Build Engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Gradle_logo.svg/512px-Gradle_logo.svg.png"
  description="Gradle is a massive, mathematically complex JVM build system. It abandoned XML for a Groovy/Kotlin DSL, allowing developers to write actual Turing-complete code to dictate how their software builds."
  yearCreated={2007}
  creator="Hans Dockter"
  isOpenSource={true}
  websiteUrl="https://gradle.org/"
>

Maven relied on incredibly strict, declarative XML (\`pom.xml\`). If a developer needed to execute a custom mathematical script during the build process, Maven made it notoriously difficult.

Gradle solved this by making the build file (\`build.gradle\`) a literal executable script. 

<Callout icon="success" title="The Android Standard">
  Gradle achieved absolute global dominance when Google mathematically forced it to become the official build system for **Android Studio**. 
  
  Android builds are incredibly complex (compiling Kotlin, shrinking byte-code with ProGuard, packaging XML resources into an APK, generating multiple Flavors for Free vs. Paid apps). Gradle's task-based DAG (Directed Acyclic Graph) architecture was the only mathematical engine capable of handling this complexity efficiently.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Maven/index.mdx': `---
title: Maven
description: A build automation tool used primarily for Java projects.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Maven"
  subtitle="The strict Java patriarch"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Apache_Maven_logo.svg/512px-Apache_Maven_logo.svg.png"
  description="Before Gradle, there was Maven. It mathematically standardized the chaotic Java ecosystem by enforcing strict project architectures and introducing the concept of remote dependency downloading."
  yearCreated={2004}
  creator="Jason van Zyl"
  isOpenSource={true}
  websiteUrl="https://maven.apache.org/"
>

In 2003, Java developers used \`Ant\`, which was just a blank canvas for executing scripts. Every company structured their code differently.

Maven mathematically enforced **Convention over Configuration**. It declared: "Your source code *must* live in \`src/main/java\`. Your tests *must* live in \`src/test/java\`." If you followed the rules, you didn't have to write any build scripts; Maven just knew exactly what to do.

<Callout icon="info" title="The POM and Maven Central">
  Maven introduced the \`pom.xml\` (Project Object Model). It was the first system to mathematically define remote dependencies. 
  
  Instead of committing massive \`.jar\` files into Subversion, developers typed \`<dependency>\` tags. Maven automatically downloaded them from **Maven Central**, creating the architectural blueprint that \`npm\` and \`pip\` would later copy.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/MSBuild/index.mdx': `---
title: MSBuild
description: The build platform for Microsoft and Visual Studio.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="MSBuild"
  subtitle="The engine of the Windows ecosystem"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Visual_Studio_2022_Icon.svg/512px-Visual_Studio_2022_Icon.svg.png"
  description="MSBuild (Microsoft Build Engine) is the monolithic XML-based build system that mathematically powers Visual Studio and the entire .NET ecosystem."
  yearCreated={2005}
  creator="Microsoft"
  isOpenSource={true}
  websiteUrl="https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild"
>

When you click "Build" in Visual Studio, the GUI mathematically parses your \`.sln\` (Solution) and \`.csproj\` (Project) files, and invisibly passes them to the \`MSBuild.exe\` compiler engine in the background.

While it is heavily tied to Windows, Microsoft mathematically open-sourced MSBuild and integrated it into the cross-platform \`.NET Core\` CLI. Today, when a developer runs \`dotnet build\` on a Linux server, they are physically executing the MSBuild architectural engine natively on Linux.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Ninja/index.mdx': `---
title: Ninja
description: A small build system with a focus on speed.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Ninja"
  subtitle="The hyper-fast C++ compiler"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ninja_build_logo.svg/512px-Ninja_build_logo.svg.png"
  description="Ninja is a mathematical build system specifically engineered to be as biologically fast as possible. It is designed to replace 'Make' by removing all high-level features and focusing purely on parallel compilation."
  yearCreated={2012}
  creator="Evan Martin (Google)"
  isOpenSource={true}
  websiteUrl="https://ninja-build.org/"
>

When Google was compiling the Chromium browser (a physically massive C++ codebase), they realized that \`make\` was taking 15 seconds mathematically just to figure out *which* files needed to be compiled, before it even started compiling them.

<Callout icon="warning" title="The Low-Level Architecture">
  Ninja is intentionally "dumb". You are not supposed to write Ninja files by hand. 
  
  Instead, you use **CMake** to generate the \`build.ninja\` file. Because Ninja strips away all variables, conditionals, and logic, it mathematically reads the dependency graph instantly, spawns a massive parallel CPU thread pool, and executes C++ compilers at the absolute physical limits of the hardware.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/NuGet/index.mdx': `---
title: NuGet
description: The package manager for .NET.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="NuGet"
  subtitle="Microsoft's dependency engine"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NuGet_project_logo.svg/512px-NuGet_project_logo.svg.png"
  description="NuGet is the official package manager for the Microsoft .NET ecosystem, mathematically allowing C# and F# developers to seamlessly integrate third-party DLLs into their projects."
  yearCreated={2010}
  creator="Outercurve Foundation (Microsoft)"
  isOpenSource={true}
  websiteUrl="https://www.nuget.org/"
>

Before NuGet, Windows developers had to manually download \`.dll\` files from random forums, place them in a \`lib/\` folder, and mathematically right-click Visual Studio to "Add Reference". If the DLL updated, it was a manual nightmare.

NuGet completely integrated into Visual Studio and MSBuild. Today, adding Entity Framework or Newtonsoft.Json is as simple as running \`dotnet add package Newtonsoft.Json\`, completely automating the complex XML modifications required in the \`.csproj\` file.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/RubyGems/index.mdx': `---
title: RubyGems
description: A package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="RubyGems"
  subtitle="The foundation of the Rails ecosystem"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/512px-Ruby_logo.svg.png"
  description="RubyGems is the mathematical package manager for Ruby. The packages themselves are universally referred to as 'Gems'."
  yearCreated={2004}
  creator="Chad Fowler & Richard Kilmer"
  isOpenSource={true}
  websiteUrl="https://rubygems.org/"
>

RubyGems mathematically predates \`npm\` and \`pip\`, and its elegant CLI design heavily influenced the entire modern package management ecosystem.

<Callout icon="success" title="Bundler">
  While RubyGems installs packages, the true mathematical power of Ruby dependency management comes from **Bundler**. 
  
  Invented in 2010, Bundler introduced the \`Gemfile\` and the \`Gemfile.lock\`. It was the very first tool in software engineering history to mathematically prove the necessity of lockfiles to prevent dependency drift across environments, paving the way for \`yarn.lock\` and \`package-lock.json\`.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/CMake/index.mdx': `---
title: CMake
description: An open-source, cross-platform family of tools designed to build, test and package software.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="CMake"
  subtitle="The C++ Meta-Build System"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Cmake.svg/512px-Cmake.svg.png"
  description="CMake is not a compiler. It is a 'Meta-Build System'. It mathematically generates the actual build files (Makefiles or Ninja builds) required to compile C/C++ code across different operating systems."
  yearCreated={2000}
  creator="Kitware"
  isOpenSource={true}
  websiteUrl="https://cmake.org/"
>

If you write a C++ program on Linux, you use \`make\` (GCC). If you write it on Windows, you use \`MSBuild\` (Visual Studio). 

CMake solved this fracturing. You write a single \`CMakeLists.txt\` file. 
When a Linux user runs CMake, it mathematically generates a Linux \`Makefile\`. When a Windows user runs CMake, it mathematically generates a Windows \`.sln\` Visual Studio project. It is the absolute, undisputed standard for cross-platform C++.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Make/index.mdx': `---
title: Make
description: A build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles which specify how to derive the target program.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Make"
  subtitle="The grandfather of build automation"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/512px-Tux.svg.png"
  description="Invented in 1976 at Bell Labs, 'make' is a command-line tool that mathematically evaluates dependency graphs to compile massive C/C++ projects efficiently."
  yearCreated={1976}
  creator="Stuart Feldman"
  isOpenSource={true}
  websiteUrl="https://www.gnu.org/software/make/"
>

If you have a C program with 500 \`.c\` files, running \`gcc\` 500 times manually is mathematically impossible. 

You write a **Makefile** that maps which files depend on each other. 
When you type \`make\`, it reads the graph. If you only edited exactly 1 file (\`main.c\`), \`make\` is mathematically smart enough to recompile *only* \`main.c\` and link the other 499 cached binaries. It turns a 2-hour compile time into a 5-second compile time.

<Callout icon="warning" title="The Tab Character Trap">
  Makefiles are notoriously hated for their syntax. The commands mathematically MUST be indented with a physical \`Tab\` character. If a developer uses 4 spaces instead of a Tab, \`make\` will instantly crash with a cryptic "missing separator" error.
</Callout>

</TechnologyTemplate>
`,
}

async function generateMega98() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega98().catch(console.error)
