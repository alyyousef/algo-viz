import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/VS Code/index.mdx': `---
title: VS Code (Visual Studio Code)
description: "A free, cross-platform code editor made by Microsoft that has completely dominated the modern software development landscape."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="VS Code"
  icon="vscode"
  creator="Microsoft"
  year={2015}
  website="https://code.visualstudio.com/"
  repository="https://github.com/microsoft/vscode"
>

**Visual Studio Code** is not an IDE (Integrated Development Environment) out of the box; it is an incredibly fast, highly extensible text editor built on Electron. Through its massive marketplace of extensions, developers turn it into a custom IDE for Python, TypeScript, Rust, C++, or any other language imaginable.

## Why Did It Win?
Before VS Code, developers had to choose between highly functional but incredibly bloated Java-based IDEs (like Eclipse or IntelliJ), or fast but bare-bones text editors (like Sublime Text or Atom).

VS Code struck the perfect balance. It was faster and more stable than Atom (which was also Electron-based but suffered terrible performance issues), but it offered the **Language Server Protocol (LSP)**.

### The LSP Revolution
Before the LSP, every code editor had to write custom logic to parse and understand every programming language. 
Microsoft introduced the LSP with VS Code: a standardized protocol where the editor asks a separate background process (the Language Server) "What are the errors here?" or "What should autocomplete show when the user types a dot?". 

Because of LSP, as soon as a new language (like Zig) is created, its creators just write *one* Language Server, and instantly every editor (VS Code, Neovim, Emacs) gets perfect syntax highlighting and autocomplete.

<Callout icon="tip" title="Monaco Editor">
The actual text-editing component inside VS Code is called **Monaco**. Microsoft extracted this into a standalone library, which is why when you edit code directly on GitHub or in CodeSandbox, the editor feels *exactly* like VS Code.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Visual Studio/index.mdx': `---
title: Visual Studio
description: "Microsoft's flagship, massive, feature-rich Integrated Development Environment, primarily used for C#, .NET, and C++ enterprise development."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Visual Studio"
  icon="visualstudio"
  creator="Microsoft"
  year={1997}
  website="https://visualstudio.microsoft.com/"
>

Often confused by beginners with its lightweight sibling (VS Code), **Visual Studio (VS)** is a heavy, enterprise-grade IDE. It is the absolute standard tool for building Windows desktop applications, massive C# .NET enterprise backends, and AAA video games in C++.

If VS Code is a Swiss Army Knife that you can attach tools to, Visual Studio is an entire mechanic's garage that takes 45 minutes to install.

## Core Strengths

1. **The Ultimate Debugger**: Visual Studio is universally praised for having one of the most powerful graphical debuggers ever created. Peeking into complex memory structures in C++ or stepping through multithreaded C# code is unparalleled.
2. **First-Class .NET Integration**: For C# developers, Visual Studio is heavily optimized to manage NuGet packages, run massive test suites, and scaffold boilerplate code with zero configuration.
3. **GUI Builders**: Need to build a Windows app? You can drag and drop buttons and text fields directly onto a canvas, and it generates the XAML/C# code for you.

<Callout icon="warning" title="The Purple Behemoth">
Because of its massive feature set, Visual Studio has a reputation for being slow to start up and resource-heavy. While Microsoft has improved performance over the years, many modern web developers prefer the speed and simplicity of VS Code unless they are strictly working in the Microsoft/C++ ecosystem.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/IntelliJ IDEA/index.mdx': `---
title: IntelliJ IDEA
description: "The flagship Java and Kotlin IDE developed by JetBrains, renowned for its incredibly deep static analysis and refactoring capabilities."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="IntelliJ IDEA"
  icon="intellij"
  creator="JetBrains"
  year={2001}
  website="https://www.jetbrains.com/idea/"
>

**IntelliJ IDEA** is the undisputed king of Java development. Before IntelliJ, developers suffered through the slow, plugin-hell of Eclipse. JetBrains introduced an IDE that *actually understood* the code on a fundamental structural level.

## The JetBrains Ecosystem
JetBrains used the core platform of IntelliJ to spawn an entire empire of language-specific IDEs:
- **PyCharm** (Python)
- **WebStorm** (JavaScript/TypeScript)
- **GoLand** (Go)
- **CLion** (C/C++)
- **Rider** (C# / Unity)
- **Android Studio** (Built in partnership with Google)

## Deep Code Understanding

Unlike text editors (like VS Code) which rely on Language Servers for hints, IntelliJ parses your entire project into a massive internal Abstract Syntax Tree (AST). 
This requires significant RAM and indexing time when you first open a project, but it enables "god-tier" refactoring:

- **Extract Interface**: Highlight a Java class, right-click, and extract an interface. It will automatically update all 500 places in your codebase that used the class to use the new interface.
- **Smart Completion**: If it knows a method expects a TICK1UserTICK1 object, its autocomplete will instantly search your local variables, find the TICK1currentUserTICK1 variable, and suggest it first.

<Callout icon="info" title="Paid vs Community">
IntelliJ IDEA has a free "Community" edition that is excellent for pure Java/Kotlin development. The paid "Ultimate" edition includes deep support for enterprise frameworks (like Spring Boot), databases, and web development (unlocking WebStorm features inside IntelliJ).
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Vim/index.mdx': `---
title: Vim
description: "A highly configurable text editor built to enable efficient text editing. Known for its steep learning curve and modal editing paradigm."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Vim (Vi IMproved)"
  icon="vim"
  creator="Bram Moolenaar"
  year={1991}
  website="https://www.vim.org/"
>

**Vim** is not an IDE. It is a terminal-based text editor. It is famous for two things: being installed by default on almost every Unix/Linux server on Earth, and the joke that nobody knows how to exit it (type TICK1:q!TICK1).

## The Power of Modal Editing
Most text editors (Notepad, VS Code) are "modeless." If you press 'j', the letter 'j' appears on the screen.

Vim is **Modal**. By default, it opens in **Normal Mode**. 
In Normal Mode, the keyboard is not for typing words; the keyboard is a video game controller for manipulating text.
- Pressing TICK1jTICK1 moves the cursor down one line.
- Pressing TICK1wTICK1 jumps the cursor forward by one word.
- Pressing TICK1ddTICK1 deletes the entire line.
- Pressing TICK1cwTICK1 (Change Word) deletes the word you are on and instantly drops you into **Insert Mode**.

Now you are in Insert Mode. If you type 'j', it types 'j'. When you are done typing, you press TICK1EscapeTICK1 to return to Normal Mode.

## The Grammar of Vim
Vim commands are a language composed of **Verbs** (actions) and **Nouns** (objects):
- TICK1dTICK1 = Delete (Verb)
- TICK1iTICK1 = Inside (Modifier)
- TICK1"TICK1 = Quotes (Noun)

If you place your cursor inside a string like TICK1"Hello World"TICK1 and press TICK1di"TICK1, Vim instantly deletes "Hello World", leaving the quotes intact. A VS Code user would have to reach for their mouse, highlight the words, and press backspace. The Vim user never moves their hands from the home row of the keyboard.

<Callout icon="warning" title="Vimscript">
Historically, extending Vim required writing plugins in **Vimscript**, a clunky, archaic scripting language. This limitation is what drove the community to fork Vim and create **Neovim**.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Neovim/index.mdx': `---
title: Neovim
description: "An aggressive refactor of Vim, bringing asynchronous plugins, an embedded Lua runtime, and modern architectural standards to the classic editor."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Neovim (Nvim)"
  icon="neovim"
  creator="Thiago de Arruda (and community)"
  year={2014}
  website="https://neovim.io/"
  repository="https://github.com/neovim/neovim"
>

By 2014, Vim's codebase was over 20 years old, bloated with support for obsolete operating systems (like AmigaOS), and maintained almost entirely by a single person who resisted modern features like asynchronous execution. If a Vim plugin needed to format your code, the entire editor would physically freeze until the formatting was done.

**Neovim** was born as a hard fork of Vim. The creators deleted thousands of lines of legacy code and modernized the architecture.

## Why Neovim Replaced Vim for Power Users

1. **Lua Instead of Vimscript**: Neovim embedded the lightning-fast Lua programming language directly into the editor. This allowed developers to write highly complex, performant plugins in a real programming language instead of archaic Vimscript.
2. **Native LSP Support**: Neovim built the Language Server Protocol client directly into its core. With a few lines of Lua configuration, a terminal editor instantly gained the exact same error-checking and autocomplete intelligence as VS Code.
3. **Asynchronous Architecture**: Plugins run in the background. The UI never freezes.
4. **Treesitter Integration**: Neovim integrates natively with Treesitter, a parser generator that builds an AST of your code in real-time. This allows for incredibly accurate, semantic syntax highlighting (e.g., coloring variables differently based on their scope, not just using simple Regex).

<Callout icon="tip" title="Pre-configured Distributions">
Because configuring Neovim from scratch requires writing hundreds of lines of Lua code, many users install "Distributions" like **LazyVim**, **LunarVim**, or **AstroNvim**. These are pre-packaged, highly optimized Neovim configurations that make it act like a modern IDE out of the box.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Xcode/index.mdx': `---
title: Xcode
description: "Apple's official IDE for macOS, used to develop software for iOS, macOS, watchOS, and tvOS."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Xcode"
  icon="xcode"
  creator="Apple"
  year={2003}
  website="https://developer.apple.com/xcode/"
>

If you want to publish an app to the Apple App Store, you *must* use a Mac, and you *must* use **Xcode** at some point in the pipeline (even if you are using React Native or Flutter, the final build is handled by Xcode's build tools).

It is the official, monolithic IDE provided by Apple for writing Swift and Objective-C.

## Features and Pain Points

### 1. Interface Builder & SwiftUI
Historically, iOS developers dragged and dropped UI elements onto a canvas (Storyboards). This generated massive, unreadable XML files that caused terrifying merge conflicts in Git. 
Today, Xcode heavily pushes **SwiftUI**, a modern, declarative UI framework (similar to React). Xcode provides incredibly fast "Canvas Previews," allowing developers to see the UI update in real-time as they type Swift code.

### 2. Instruments
Xcode includes "Instruments," a world-class profiling tool. It allows developers to track memory leaks, CPU spikes, and battery consumption with stunning precision, ensuring iPhone apps don't drain the user's battery.

### 3. The "Xcode Experience"
Xcode is infamous in the developer community for its immense file size (often over 12GB to download), its tendency to crash mysteriously, and its unhelpful error messages (like the dreaded "Derived Data" corruption, which requires developers to nuke a specific hidden folder just to make the project compile again).

<Callout icon="warning" title="Vendor Lock-in">
Xcode is the ultimate example of a walled garden. It is completely proprietary, runs only on macOS, and is the absolute gatekeeper to a multi-billion dollar app ecosystem.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Android Studio/index.mdx': `---
title: Android Studio
description: "The official Integrated Development Environment for Google's Android operating system, built on JetBrains' IntelliJ IDEA software."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Android Studio"
  icon="androidstudio"
  creator="Google (via JetBrains)"
  year={2013}
  website="https://developer.android.com/studio"
>

Before 2013, Android developers suffered through using the Eclipse IDE with an unstable Android plugin. Recognizing this pain, Google partnered with JetBrains (creators of IntelliJ IDEA) to create **Android Studio**, the official and mandatory IDE for native Android development.

Because it is built on IntelliJ, it inherits world-class Java and Kotlin refactoring, deep static analysis, and a highly polished interface.

## Key Features

1. **Gradle Build System**: Android apps are incredibly complex to build (requiring different assets for different screen sizes, obfuscation, and signing). Android Studio integrates deeply with Gradle, allowing developers to configure build variants (e.g., a "Free" version and a "Pro" version) from the same codebase.
2. **The Android Emulator**: Testing an app on physical devices is tedious. Android Studio ships with a highly optimized Emulator that can simulate any Android phone, tablet, or watch, including simulating GPS location, battery levels, and incoming phone calls.
3. **Jetpack Compose**: Similar to Apple's SwiftUI, Android has moved away from XML-based layouts to **Jetpack Compose** (declarative Kotlin UI). Android Studio provides live, interactive previews of Compose components directly next to the code.

<Callout icon="warning" title="RAM Devourer">
Because it runs the JVM (IntelliJ), the Gradle daemon (JVM), and potentially the Android Emulator (a literal virtual machine) simultaneously, Android Studio is notorious for instantly consuming 8GB to 16GB of RAM. Trying to run it on a low-end laptop is an exercise in extreme patience.
</Callout>

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/51. Developer Tools & Productivity/51.1 IDEs & Editors/Zed/index.mdx': `---
title: Zed
description: "A lightning-fast, collaborative code editor written in Rust, built by the original creators of Atom and Tree-sitter."
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<TechnologyTemplate 
  name="Zed"
  icon="zed"
  creator="Nathan Sobo (Zed Industries)"
  year={2024}
  website="https://zed.dev/"
  repository="https://github.com/zed-industries/zed"
>

**Zed** is the newest major player in the text editor space, built by the same developers who created GitHub's Atom editor and the Tree-sitter parsing library. 

Where Atom and VS Code used web technologies (Electron/JavaScript), which inherently carry memory and performance overhead, Zed is written entirely in **Rust** and renders its UI directly to the GPU (using Vulkan/Metal).

## The Obsession with Speed
The core thesis of Zed is that editors have become too slow. There should be exactly zero latency between pressing a key and seeing the character on the screen. By bypassing the browser engine entirely, Zed achieves performance that rivals terminal editors like Neovim, but with a modern GUI.

## Core Differentiators

1. **Multiplayer by Default**: Zed was built from day one for collaborative coding. Instead of a clunky "Live Share" plugin, multiple developers can seamlessly jump into a workspace, see each other's cursors, and even share terminal sessions as if they were in a Google Doc.
2. **Native AI Integration**: Unlike VS Code where GitHub Copilot is an extension bolted on top, Zed integrates AI deeply into the editor's core UX, providing incredibly fast inline code generation and a native AI chat panel that understands your codebase.
3. **Vim Mode Built-in**: Recognizing that power users demand modal editing, Zed ships with a highly accurate, native Vim mode out of the box, without needing to install a slow javascript-based extension.

<Callout icon="info" title="The Electron Backlash">
Zed represents a broader industry trend (alongside tools like Tauri or native Rust apps) of moving away from Electron. Developers are tired of their chat app, music player, and code editor each running a separate, massive instance of the Chromium browser in the background and draining laptop batteries.
</Callout>

</TechnologyTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
