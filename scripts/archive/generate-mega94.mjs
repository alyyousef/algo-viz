import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Android Studio/index.mdx': `---
title: Android Studio
description: The official integrated development environment (IDE) for Google's Android operating system, built on JetBrains' IntelliJ IDEA software.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Android Studio"
  subtitle="The monolithic Android compiler"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Android_Studio_icon_%282023%29.svg/512px-Android_Studio_icon_%282023%29.svg.png"
  description="Android Studio is the absolute standard for native Android development. Built on top of IntelliJ IDEA, it is a massive, incredibly powerful (and resource-heavy) environment tailored specifically for compiling Kotlin/Java into Android APKs."
  yearCreated={2013}
  creator="Google & JetBrains"
  isOpenSource={true}
  websiteUrl="https://developer.android.com/studio"
>

Before 2013, developers had to use the Eclipse IDE with a buggy, unstable Android plugin. Google partnered with JetBrains to build a dedicated, vertically integrated Android environment.

<Callout icon="warning" title="The RAM Monolith">
  Android Studio is infamous for its physical memory consumption. Because it runs the IntelliJ Java runtime, a live XML Layout editor, the Gradle build daemon, and a fully emulated 3D Android Virtual Device (AVD) simultaneously, running Android Studio smoothly requires a bare minimum of 16GB of RAM.
</Callout>

## The Gradle Integration

The core architectural shift of Android Studio was abandoning Ant/Maven and adopting **Gradle** as the official build system. The IDE is deeply integrated with the \`build.gradle\` file, allowing developers to mathematically inject massive third-party libraries, compile multiple different Product Flavors (e.g., a Free app and a Paid app), and manage SDK versions natively.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Eclipse/index.mdx': `---
title: Eclipse
description: An integrated development environment used in computer programming, and is the most widely used Java IDE.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Eclipse"
  subtitle="The legacy Java titan"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eclipse-Icon.svg/512px-Eclipse-Icon.svg.png"
  description="In the 2000s and early 2010s, Eclipse was the undisputed king of Java development. It is an incredibly extensible, open-source IDE that relies on a massive ecosystem of plugins to support almost every language."
  yearCreated={2001}
  creator="IBM (Eclipse Foundation)"
  isOpenSource={true}
  websiteUrl="https://www.eclipse.org/ide/"
>

Eclipse was originally developed by IBM for $40 million to kill Microsoft Visual Studio's dominance. They open-sourced it, and it mathematically consumed the enterprise Java world.

<Callout icon="info" title="The Plugin Architecture">
  Eclipse itself is just a bare-bones framework (the Equinox OSGi framework). 
  
  Its entire philosophy is based on **Plugins**. If you want to write Java, you download the JDT plugin. If you want C++, you download the CDT plugin. While this makes it incredibly versatile, the lack of vertical integration meant plugins often crashed each other, leading to a notoriously unstable developer experience compared to modern IDEs.
</Callout>

## The Fall from Grace

Eclipse's market share collapsed in the late 2010s due to the rise of **IntelliJ IDEA**. IntelliJ provided a significantly faster, mathematically smarter, and vertically integrated Out-Of-The-Box experience. Today, Eclipse is mostly maintained for massive legacy Enterprise Java codebases.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Emacs/index.mdx': `---
title: Emacs
description: A family of text editors that are characterized by their extensibility.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Emacs"
  subtitle="The Lisp Operating System disguised as an Editor"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/EmacsIcon.svg/512px-EmacsIcon.svg.png"
  description="Emacs is not a text editor; it is a Lisp Machine. It is an infinitely extensible environment where every single keystroke and function can be mathematically reprogrammed on the fly."
  yearCreated={1976}
  creator="Richard Stallman"
  isOpenSource={true}
  websiteUrl="https://www.gnu.org/software/emacs/"
>

*"Emacs is a great operating system, lacking only a decent editor."* - Classic Programmer Joke.

<Callout icon="error" title="Emacs Lisp (Elisp)">
  The core architecture of Emacs is written in C, but 90% of the functionality is written in **Emacs Lisp**. 
  
  Because of this, Emacs is mathematically self-documenting and entirely mutable. You can write a Lisp script that turns Emacs into a Web Browser, an Email Client, a Tetris game, or a Psychiatric Chatbot (\`M-x doctor\`).
</Callout>

## The Holy War: Emacs vs Vim

For 40 years, the greatest religious war in Computer Science has been Emacs vs Vim. 
- **Vim** is focused purely on modal text editing speed (Normal mode vs Insert mode). 
- **Emacs** relies on massive, chorded keyboard shortcuts (\`Ctrl-Alt-Shift-X\`), leading to the joke that Emacs stands for *"Escape Meta Alt Control Shift."* 

Today, many users bridge the gap using **Evil-Mode** (Extensible VI Layer), which mathematically injects Vim's modal keybindings directly into the Emacs ecosystem.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/IntelliJ IDEA/index.mdx': `---
title: IntelliJ IDEA
description: An integrated development environment written in Java for developing computer software, developed by JetBrains.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="IntelliJ IDEA"
  subtitle="The smartest IDE on Earth"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/IntelliJ_IDEA_Icon.svg/512px-IntelliJ_IDEA_Icon.svg.png"
  description="IntelliJ IDEA mathematically conquered the Java world by proving that an IDE should not just read text; it should possess a deep, structural understanding of the code's Abstract Syntax Tree (AST)."
  yearCreated={2001}
  creator="JetBrains"
  isOpenSource={false}
  websiteUrl="https://www.jetbrains.com/idea/"
>

Unlike Eclipse's chaotic plugin ecosystem, IntelliJ is heavily curated. 

Its defining feature is its **Code Analysis Engine**. When you type code in IntelliJ, it doesn't just check for syntax errors; it mathematically analyzes the control flow, identifying variables that are biologically impossible to reach, NullPointerException risks, and automatically suggesting structural lambda refactors.

<Callout icon="success" title="The JetBrains Empire">
  IntelliJ IDEA is the foundational architecture for the entire JetBrains ecosystem. 
  
  JetBrains mathematically stripped the Java parts out of IntelliJ and injected Python to create **PyCharm**. They injected JavaScript to create **WebStorm**. They injected Go to create **GoLand**. Every JetBrains IDE is physically the exact same underlying IntelliJ platform, ensuring identical keyboard shortcuts and settings across every language.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Neovim/index.mdx': `---
title: Neovim
description: A hyperextensible Vim-based text editor built for users who want the good parts of Vim, and more.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Neovim"
  subtitle="Vim, rewritten for the modern era"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Neovim-mark.svg/512px-Neovim-mark.svg.png"
  description="Neovim is an aggressive fork of Vim. It mathematically modernized the 30-year-old C codebase, introduced asynchronous plugins, and replaced Vimscript with Lua."
  yearCreated={2015}
  creator="Thiago de Arruda"
  isOpenSource={true}
  websiteUrl="https://neovim.io/"
>

By 2014, the original Vim codebase had become an unmaintainable nightmare of legacy 1990s C macros. When a developer submitted a patch to add asynchronous plugin support, Vim's creator (Bram Moolenaar) rejected it. 

The community revolted, mathematically forked Vim, and created **Neovim**.

<Callout icon="tip" title="The Lua Revolution">
  Vim's legacy configuration language (Vimscript) is notoriously slow and terrible to write. 
  
  Neovim natively embedded **LuaJIT** (an insanely fast, lightweight scripting language) directly into the editor. This caused a massive explosion of modern, hyper-fast Neovim plugins (Telescope, Nvim-Tree, Harpoon), completely revitalizing the terminal-editor ecosystem.
</Callout>

## Language Server Protocol (LSP)

Neovim's greatest strength is its native, first-class support for Microsoft's **LSP (Language Server Protocol)**. It allows Neovim, a terminal editor, to mathematically connect to the exact same background intelligence engines used by VS Code, providing native IDE-level auto-completion and error checking inside a terminal window.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/PyCharm/index.mdx': `---
title: PyCharm
description: An integrated development environment used in computer programming, specifically for the Python language.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="PyCharm"
  subtitle="The ultimate Python IDE"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/PyCharm_Icon.svg/512px-PyCharm_Icon.svg.png"
  description="Built on the IntelliJ platform, PyCharm is the industry-standard IDE for professional Python developers, specifically optimized for Django, Data Science, and Virtual Environments."
  yearCreated={2010}
  creator="JetBrains"
  isOpenSource={false}
  websiteUrl="https://www.jetbrains.com/pycharm/"
>

Python is a dynamically typed language. If you type \`user.name\`, a normal text editor has mathematically no idea if \`user\` is a String, a Database Object, or an Integer. 

**PyCharm** solves this by physically parsing your entire project, executing deep static analysis and Type Hint inference, providing Java-level auto-completion in a dynamic language.

<Callout icon="info" title="Virtual Environment Integration">
  Python's greatest weakness is package management. 
  
  PyCharm mathematically abstracts this away. It natively detects and automatically activates \`venv\`, \`Conda\`, or \`Poetry\` environments. It provides a visual GUI to \`pip install\` packages, removing the need for developers to ever touch the terminal when managing dependencies.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Sublime Text/index.mdx': `---
title: Sublime Text
description: A commercial source code editor. It natively supports many programming languages and markup languages.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Sublime Text"
  subtitle="The speed demon"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Sublime_Text_icon.svg/512px-Sublime_Text_icon.svg.png"
  description="Before VS Code, there was Sublime Text. It revolutionized modern text editing by introducing Multiple Cursors, the Command Palette, and opening instantly with absolutely zero lag."
  yearCreated={2008}
  creator="Jon Skinner"
  isOpenSource={false}
  websiteUrl="https://www.sublimetext.com/"
>

In 2010, opening Eclipse or Visual Studio took 45 seconds and 2GB of RAM. 

Sublime Text was written in pure, highly-optimized C++. It opened in exactly 0.2 seconds. It mathematically proved that a text editor could be as fast as Notepad, but as powerful as an IDE via its Python-based plugin ecosystem.

<Callout icon="warning" title="The Command Palette">
  Sublime Text invented the **Command Palette (Ctrl+Shift+P)**. 
  
  Instead of digging through 15 nested GUI menus to find "Format Document," the user presses a hotkey and types "format". This mathematically flattened the UI hierarchy and was so successful that it was blatantly copied by VS Code, Atom, and almost every modern editor since.
</Callout>

## The Fall to VS Code

Sublime Text cost $80, and development was notoriously slow. When Microsoft released VS Code (which copied all of Sublime's best features, added native TypeScript/LSP support, and made it 100% Free), Sublime's market share collapsed. However, it is still used heavily by developers who demand pure, C++ performance over Electron/Chromium bloat.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/VS Code/index.mdx': `---
title: Visual Studio Code (VS Code)
description: A source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Visual Studio Code"
  subtitle="The undeniable king of modern editors"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png"
  description="VS Code mathematically conquered the world. It is a free, Electron-based editor that perfectly threads the needle between the speed of Sublime Text and the power of IntelliJ, backed by an unstoppable extension ecosystem."
  yearCreated={2015}
  creator="Microsoft"
  isOpenSource={true}
  websiteUrl="https://code.visualstudio.com/"
>

VS Code is an architectural masterpiece. It is built on **Electron** (HTML/JS running in a Chromium window) and utilizes the **Monaco Editor** engine. 

While purists claimed a web-based editor would be too slow, Microsoft engineered it brilliantly, separating the UI thread from the Extension Host thread so a crashing plugin mathematically cannot freeze the typing interface.

<Callout icon="success" title="The LSP Revolution">
  VS Code's greatest contribution to Computer Science is the **Language Server Protocol (LSP)**.
  
  Historically, if you wanted Python auto-complete, you had to write a Python parser specifically for Sublime, and another specifically for Eclipse. 
  Microsoft created the LSP: a standalone background program that analyzes Python. The editor simply asks the LSP, *"What methods does this object have?"* This mathematically decoupled language intelligence from the editor GUI, forever changing the industry.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Vim/index.mdx': `---
title: Vim
description: A highly configurable text editor built to make creating and changing any kind of text very efficient. It is an improved version of the vi editor distributed with most UNIX systems.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Vim"
  subtitle="The language of text editing"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vimlogo.svg/512px-Vimlogo.svg.png"
  description="Vim is not just a text editor; it is a mathematical programming language for manipulating text. Instead of using a mouse, developers use specific, chorded verbs and nouns to edit code at blinding speeds."
  yearCreated={1991}
  creator="Bram Moolenaar"
  isOpenSource={true}
  websiteUrl="https://www.vim.org/"
>

How do you delete 3 words in Notepad? You click the mouse, highlight the words, and press Backspace. 

In Vim, you type exactly 3 keystrokes: \`d3w\`.
- \`d\` = Delete (Verb)
- \`3\` = Count (Adjective)
- \`w\` = Word (Noun)

<Callout icon="warning" title="Modal Editing">
  Normal editors are always in "Insert" mode. If you press 'J', a 'j' appears on the screen.
  
  Vim is fundamentally **Modal**:
  1. **Normal Mode (Default):** Keystrokes are commands. Pressing 'J' mathematically moves the cursor down one line.
  2. **Insert Mode:** You press 'i' to enter Insert mode. Now, pressing 'J' types the letter 'j'. You must press \`Escape\` to return to Normal Mode. 
</Callout>

## The Ubiquity of Vim

Because Vim runs entirely in the terminal with zero GUI, it is mathematically guaranteed to be installed on almost every Linux server on Earth. If a DevOps engineer SSHs into a broken Ubuntu server, VS Code is not there; Vim is.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Visual Studio/index.mdx': `---
title: Visual Studio
description: An integrated development environment from Microsoft. It is used to develop computer programs, as well as websites, web apps, web services and mobile apps.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Visual Studio"
  subtitle="The Windows C# / C++ Monolith"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Visual_Studio_2022_Icon.svg/512px-Visual_Studio_2022_Icon.svg.png"
  description="Not to be confused with VS Code, Visual Studio (often called 'Purple VS') is Microsoft's massive, flagship IDE designed specifically for C#, .NET Enterprise software, and AAA C++ Game Development."
  yearCreated={1997}
  creator="Microsoft"
  isOpenSource={false}
  websiteUrl="https://visualstudio.microsoft.com/"
>

Visual Studio is physically massive. A full installation with all C++ and C# workloads can mathematically exceed 40 Gigabytes on a hard drive. 

It is the undisputed standard for developing Windows Desktop applications, Unity/Unreal game programming, and Enterprise ASP.NET APIs.

<Callout icon="info" title="The Greatest Debugger on Earth">
  Visual Studio is widely considered to have the most mathematically advanced, bulletproof Debugger in the industry. 
  
  It allows developers to physically pause a C++ application mid-execution, inspect the exact raw Hex values in the RAM heap, alter the CPU instruction pointer, and resume execution without recompiling.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/WebStorm/index.mdx': `---
title: WebStorm
description: An integrated development environment for JavaScript and related technologies. Like other JetBrains IDEs, it makes your development experience more enjoyable, automating routine work and helping you handle complex tasks with ease.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="WebStorm"
  subtitle="The premium JavaScript IDE"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/WebStorm_Icon.svg/512px-WebStorm_Icon.svg.png"
  description="WebStorm is JetBrains' dedicated IDE for Web Development. While VS Code is free, thousands of developers pay for WebStorm because its out-of-the-box JavaScript/TypeScript refactoring intelligence is unmatched."
  yearCreated={2010}
  creator="JetBrains"
  isOpenSource={false}
  websiteUrl="https://www.jetbrains.com/webstorm/"
>

VS Code requires you to download 50 plugins (ESLint, Prettier, GitLens, Jest runners) to create a working React environment. 

**WebStorm** provides it instantly. Because it is a paid, vertically integrated product, JetBrains mathematically guarantees that the TypeScript compiler, the test runner, and the Git UI work together flawlessly with zero configuration.

<Callout icon="tip" title="Deep Structural Refactoring">
  VS Code's refactoring relies on the TS Server, which is sometimes text-based. 
  
  WebStorm uses the IntelliJ AST (Abstract Syntax Tree) engine. If you rename a React Component prop in WebStorm, it mathematically parses the JSX graph and guarantees the prop is renamed in every single file that consumes it, physically preventing undefined errors.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Xcode/index.mdx': `---
title: Xcode
description: Apple's integrated development environment for macOS, used to develop software for macOS, iOS, iPadOS, watchOS, and tvOS.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Xcode"
  subtitle="The inescapable Apple gatekeeper"
  logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Xcode_icon.png/512px-Xcode_icon.png"
  description="Xcode is Apple's proprietary IDE. If you want to mathematically compile an app for an iPhone or a Mac, you are biologically and legally forced to use Xcode running on macOS hardware."
  yearCreated={2003}
  creator="Apple"
  isOpenSource={false}
  websiteUrl="https://developer.apple.com/xcode/"
>

You cannot compile an iOS app on Windows. Apple mathematically hardcodes their compilers (Clang/Swift) and physical device provisioning profiles exclusively into Xcode. 

<Callout icon="error" title="The Provisioning Nightmare">
  Xcode is notorious among developers for its **Code Signing** requirements. 
  
  To load an app onto a physical iPhone, Xcode must mathematically verify an incredibly complex chain of cryptographic certificates, provisioning profiles, and App ID bundles connecting the developer's Apple Developer Account to the physical silicon chip on the phone. This process historically failed constantly, leading to hours of lost productivity.
</Callout>

## Interface Builder & SwiftUI

Historically, Xcode utilized **Interface Builder (Storyboards)**—a massive XML-based GUI drag-and-drop tool for designing screens. It was notoriously prone to mathematical Git merge conflicts. 

Apple recently replaced it with **SwiftUI**, a declarative, code-only UI framework directly integrated into Xcode's live preview canvas, bringing iOS development closer to React's paradigm.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.1 IDEs & Editors/Zed/index.mdx': `---
title: Zed
description: A high-performance, multiplayer code editor from the creators of Atom and Tree-sitter.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Zed"
  subtitle="The Rust-powered speed freak"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Zed_logo.svg/512px-Zed_logo.svg.png"
  description="Created by the original founders of the Atom Editor, Zed is a brutal, hyper-optimized editor written entirely in Rust and rendered directly on the GPU, designed to completely destroy VS Code's Electron lag."
  yearCreated={2024}
  creator="Zed Industries"
  isOpenSource={true}
  websiteUrl="https://zed.dev/"
>

VS Code is built on web technologies (HTML/JS/Electron). This creates inherent biological lag. 

**Zed** is written in pure Rust. It bypasses the web browser entirely and uses a custom UI framework (GPUI) that mathematically renders text directly to the user's Vulkan/Metal GPU at 120 FPS. Typing in Zed feels physically instantaneous compared to VS Code.

<Callout icon="success" title="Native Multiplayer">
  Zed's architecture was designed from Day 1 for **Multiplayer CRDTs (Conflict-free Replicated Data Types)**. 
  
  Unlike VS Code's "Live Share" (which requires logging into a clunky server plugin), Zed allows multiple developers to mathematically type in the exact same file simultaneously, with zero lag, natively built into the core Rust engine.
</Callout>

## The Battle Ahead

While Zed mathematically wins on pure performance, VS Code has a 10-year head start on its massive Extension Ecosystem. Zed's current objective is implementing a WebAssembly (Wasm) plugin architecture to allow extensions to run at native speed without compromising the editor's legendary performance.

</TechnologyTemplate>
`,
}

async function generateMega94() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega94().catch(console.error)
