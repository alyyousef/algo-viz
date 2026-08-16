import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/npm/index.mdx': `---
title: npm (Node Package Manager)
description: The default package manager for the JavaScript runtime environment Node.js.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="npm"
  subtitle="The largest software registry in human history"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/512px-Npm-logo.svg.png"
  description="npm is the default package manager for Node.js. It mathematically revolutionized software development by allowing developers to instantly download and share millions of open-source JavaScript libraries."
  yearCreated={2010}
  creator="Isaac Z. Schlueter"
  isOpenSource={true}
  websiteUrl="https://www.npmjs.com/"
>

Before npm, if you wanted to use jQuery, you mathematically had to go to the jQuery website, download a \`.js\` file, put it in your folder, and link it in an HTML \`<script>\` tag. If jQuery updated, you had to manually do it again.

<Callout icon="success" title="The package.json Revolution">
  npm introduced the \`package.json\` file. 
  
  You simply run \`npm install express\`. npm connects to the global registry, mathematically downloads the Express library into the \`node_modules\` folder, and automatically resolves and downloads every single nested dependency that Express relies on.
</Callout>

## The node_modules Black Hole

npm's dependency resolution mathematically isolates every package. If Package A needs \`lodash v1\` and Package B needs \`lodash v2\`, npm physically downloads *both* versions into nested \`node_modules\` folders. This ensures version safety but famously results in the \`node_modules\` folder consuming gigabytes of disk space, leading to the joke that \`node_modules\` is the heaviest object in the universe.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Yarn/index.mdx': `---
title: Yarn
description: A software packaging system developed in 2016 by Facebook for the Node.js JavaScript runtime environment.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Yarn"
  subtitle="Facebook's npm killer"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Yarn_logo.svg/512px-Yarn_logo.svg.png"
  description="In 2016, npm was mathematically slow and lacked determinism. Facebook engineered Yarn to solve npm's massive caching and security flaws, forcing the entire JavaScript ecosystem to evolve."
  yearCreated={2016}
  creator="Facebook"
  isOpenSource={true}
  websiteUrl="https://yarnpkg.com/"
>

Historically, if Developer A ran \`npm install\`, they might mathematically get different sub-dependency versions than Developer B running the same command 5 minutes later. This caused catastrophic production bugs.

<Callout icon="tip" title="The Lockfile Innovation">
  Yarn introduced the \`yarn.lock\` file. 
  
  When you install a package, Yarn mathematically calculates the exact cryptographic hash and version of every single nested sub-dependency and writes it to the lockfile. This guarantees that every developer on Earth gets the exact same biological byte-code when they install the project.
</Callout>

*(Note: npm mathematically copied this feature a year later with \`package-lock.json\`, restoring its dominance).*

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/pnpm/index.mdx': `---
title: pnpm
description: Fast, disk space efficient package manager.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="pnpm"
  subtitle="The disk-space savior"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pnpm-logo.svg/512px-Pnpm-logo.svg.png"
  description="pnpm mathematically solves the 'node_modules black hole' problem. Instead of copying gigabytes of identical dependencies into every project, it uses a global hard-link store."
  yearCreated={2017}
  creator="Zoltan Kochan"
  isOpenSource={true}
  websiteUrl="https://pnpm.io/"
>

If you have 100 React projects on your laptop, npm mathematically downloads the \`react\` library 100 separate times, consuming 100x the disk space.

<Callout icon="success" title="The Global Store & Hard Links">
  **pnpm** mathematically downloads the \`react\` library exactly **once** to a hidden global store on your hard drive. 
  
  In your 100 projects, it creates a physical OS-level **Hard Link** from your \`node_modules\` directly to the global store. It mathematically tricks Node.js into thinking the files are local, but they consume exactly 0 extra bytes of disk space. It is drastically faster and vastly more efficient than both npm and Yarn.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/npm scripts/index.mdx': `---
title: npm scripts
description: Scripts defined in the package.json file to automate development tasks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="npm scripts">

Before modern JS development, engineers used complex task runners like Gulp or Grunt to compile SCSS, minify JavaScript, and start servers. 

Today, the industry mathematically relies entirely on **npm scripts** embedded directly in the \`package.json\`.

<Callout icon="info" title="The Abstraction Layer">
  \`\`\`json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "jest"
  }
  \`\`\`
  
  Instead of telling a new developer to "Install Vite globally, run the TypeScript compiler, and then execute Vite's build command", you just tell them to run \`npm run build\`. 
  
  npm mathematically abstracts the underlying CLI tools, ensuring that the project uses the exact localized versions of Vite and TypeScript installed in \`node_modules/.bin\`, preventing global version conflicts.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Webpack/index.mdx': `---
title: Webpack
description: A static module bundler for modern JavaScript applications.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Webpack"
  subtitle="The undisputed king of JavaScript bundling"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Webpack.svg/512px-Webpack.svg.png"
  description="Webpack completely redefined frontend architecture. It mathematically treats every file (JavaScript, CSS, PNGs) as a module, parses their dependencies, and compiles them into a single, highly optimized static bundle."
  yearCreated={2012}
  creator="Tobias Koppers"
  isOpenSource={true}
  websiteUrl="https://webpack.js.org/"
>

Historically, browsers mathematically could not understand \`import\` statements. If you had 50 JavaScript files, you had to manually order 50 \`<script>\` tags in your HTML file, hoping you didn't mess up the global variables.

<Callout icon="warning" title="The Dependency Graph">
  Webpack mathematically parses your \`index.js\` file, finds every \`import\`, opens those files, finds their \`imports\`, and recursively maps a massive mathematical Dependency Graph. 
  
  It then injects Loaders (like Babel to compile React JSX, or SASS-loader to compile CSS), and bundles everything into exactly one \`main.js\` file that the browser can perfectly execute.
</Callout>

While Webpack is incredibly powerful, its configuration (\`webpack.config.js\`) is notoriously complex, leading to the rise of Zero-Config tools like Vite.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Vite/index.mdx': `---
title: Vite
description: A local development server written by Evan You and used by default by Vue and React project templates.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Vite"
  subtitle="The Webpack killer"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/512px-Vitejs-logo.svg.png"
  description="Vite (French for 'fast') mathematically solved Webpack's agonizingly slow startup times. By utilizing native Browser ES Modules and the Go-based esbuild compiler, Vite starts massive React projects in milliseconds."
  yearCreated={2020}
  creator="Evan You"
  isOpenSource={true}
  websiteUrl="https://vitejs.dev/"
>

When you run Webpack in development, it mathematically has to crawl your entire 5,000-file project and bundle it *before* the server starts. This can take 30+ seconds on large projects.

<Callout icon="success" title="Native ES Modules (ESM)">
  Vite mathematically reverses this process. 
  
  It instantly starts the server in 50 milliseconds. It does *not* bundle the code. Instead, it serves the raw ES Modules directly to the browser. When the browser hits a screen that needs a specific React component, Vite dynamically compiles *only that one component* on-demand using **esbuild** (which is written in Go and is 100x faster than Webpack's JS engine).
</Callout>

For production, Vite uses **Rollup** to mathematically bundle the final static assets, ensuring perfect optimization.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Rollup/index.mdx': `---
title: Rollup
description: A module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Rollup"
  subtitle="The library builder"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Rollup_logo.svg/512px-Rollup_logo.svg.png"
  description="While Webpack is used to build complex web applications, Rollup is strictly engineered to build highly optimized JavaScript Libraries (like React or Three.js)."
  yearCreated={2015}
  creator="Rich Harris"
  isOpenSource={true}
  websiteUrl="https://rollupjs.org/"
>

Rollup's mathematical claim to fame is inventing **Tree-Shaking**.

<Callout icon="tip" title="Tree-Shaking (Dead Code Elimination)">
  If you install \`lodash\`, it contains 200 mathematical functions. If you only \`import { merge } from 'lodash'\`, Webpack historically bundled all 200 functions into your final app, wasting massive amounts of user bandwidth.
  
  Rollup mathematically analyzes the AST (Abstract Syntax Tree) and physically drops the 199 functions you didn't use. It "shakes the tree" to let dead code fall out, ensuring the final compiled bundle is biologically as small as possible.
</Callout>

Vite utilizes Rollup under the hood specifically for its incredible production bundling and tree-shaking capabilities.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/pip/index.mdx': `---
title: pip (Pip Installs Packages)
description: The standard package manager for Python.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="pip"
  subtitle="The Python standard"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="pip is the absolute standard package manager for Python. It mathematically connects to PyPI (Python Package Index) to download everything from simple web frameworks to massive AI models."
  yearCreated={2008}
  creator="Ian Bicking"
  isOpenSource={true}
  websiteUrl="https://pypi.org/project/pip/"
>

Unlike \`npm\` (which safely hides dependencies in a local \`node_modules\` folder), \`pip\` historically installs Python packages **globally** into the operating system.

<Callout icon="error" title="The Global Conflict Nightmare">
  If Project A needs \`Django v2\` and Project B needs \`Django v4\`, running \`pip install\` will mathematically overwrite the global Django installation, instantly breaking one of the projects.
  
  To solve this, developers are biologically forced to use **Virtual Environments (\`venv\`)**. A \`venv\` mathematically isolates a local Python interpreter and \`pip\` binary per-project, preventing catastrophic dependency collisions.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Conda/index.mdx': `---
title: Conda
description: An open-source, cross-platform, language-agnostic package manager and environment management system.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Conda"
  subtitle="The Data Science juggernaut"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Conda_logo.svg/512px-Conda_logo.svg.png"
  description="While pip installs Python packages, Conda installs Python packages AND pre-compiled C/C++ binaries. It is the absolute standard for Machine Learning and Data Science."
  yearCreated={2012}
  creator="Anaconda, Inc."
  isOpenSource={true}
  websiteUrl="https://docs.conda.io/"
>

Libraries like NumPy, TensorFlow, and PyTorch are not written in pure Python. They are mathematically written in highly optimized C++ and CUDA. 

If you use \`pip\` to install them, you often need the correct C++ compilers installed on your Linux machine to build them. This notoriously fails.

<Callout icon="success" title="Pre-Compiled Binaries">
  Conda bypasses compilers entirely. 
  
  When you run \`conda install pytorch\`, Conda mathematically identifies your exact OS and CPU architecture and downloads the already-compiled C++ binary directly. Furthermore, Conda is not just a package manager; it is a mathematical environment manager, completely replacing the need for Python's clunky \`venv\`.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Poetry/index.mdx': `---
title: Poetry
description: Python packaging and dependency management made easy.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Poetry"
  subtitle="The modern Python workflow"
  logoUrl="https://python-poetry.org/images/logo-origami.svg"
  description="Poetry is the modern replacement for pip and requirements.txt. It mathematically brings Python dependency management into the modern era, mirroring the safety and architecture of npm and Yarn."
  yearCreated={2018}
  creator="Sébastien Eustace"
  isOpenSource={true}
  websiteUrl="https://python-poetry.org/"
>

Historically, Python developers listed dependencies in a flat \`requirements.txt\` file. It mathematically lacked version locking, meaning a production server might install a slightly different sub-dependency version than the local dev machine, causing an outage.

<Callout icon="tip" title="pyproject.toml & Lockfiles">
  Poetry mathematically solves this by introducing a strict \`pyproject.toml\` file and a \`poetry.lock\` file. 
  
  It guarantees absolute deterministic builds. Furthermore, Poetry completely abstracts Virtual Environments. When you run \`poetry install\`, it automatically creates an isolated \`venv\` in the background without the developer ever needing to manually manage it.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/uv/index.mdx': `---
title: uv
description: An extremely fast Python package installer and resolver, written in Rust.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="uv"
  subtitle="The Rust-powered pip killer"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png"
  description="Released by Astral (the creators of Ruff), 'uv' is a drop-in replacement for pip and pip-tools, written entirely in Rust. It is mathematically 10x to 100x faster than pip."
  yearCreated={2024}
  creator="Astral"
  isOpenSource={true}
  websiteUrl="https://github.com/astral-sh/uv"
>

Python's \`pip\` is written in Python. When installing a massive machine learning project with hundreds of dependencies, \`pip\` spends minutes mathematically resolving version conflicts.

<Callout icon="success" title="The Rust Revolution">
  \`uv\` mathematically replaces the Python resolution engine with a highly concurrent Rust architecture. 
  
  It uses a global cache and parallelized network requests. A complex \`pip install\` that takes 2 minutes in standard Python will mathematically resolve and install in less than 500 milliseconds using \`uv\`. It is rapidly becoming the standard for modern Python CI/CD pipelines.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/apt/index.mdx': `---
title: APT (Advanced Package Tool)
description: A free software user interface that works with core libraries to handle the installation and removal of software on Debian, Ubuntu, and related Linux distributions.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="APT"
  subtitle="The heart of Debian & Ubuntu"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/512px-Bash_Logo_Colored.svg.png"
  description="APT is the mathematical OS-level package manager for Debian and Ubuntu. If you spin up a server in AWS, the first command you type is almost always 'sudo apt update'."
  yearCreated={1998}
  creator="Debian Project"
  isOpenSource={true}
  websiteUrl="https://wiki.debian.org/Apt"
>

Before APT, Linux users mathematically had to download \`.deb\` binaries and manually install them. If a \`.deb\` required an older version of \`libc\`, the installation would crash (Dependency Hell).

<Callout icon="info" title="Dependency Resolution">
  APT completely automated this. 
  
  When you run \`apt install nginx\`, APT connects to canonical's massive global repositories, mathematically calculates every single low-level C library that Nginx requires, downloads them all, and installs them in the mathematically correct order.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/dnf/index.mdx': `---
title: DNF (Dandified YUM)
description: A software package manager that installs, updates, and removes packages on RPM-based Linux distributions.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="DNF"
  subtitle="The architect of Red Hat & Fedora"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/512px-Bash_Logo_Colored.svg.png"
  description="While Ubuntu uses APT, enterprise distributions like Red Hat (RHEL), CentOS, and Fedora use DNF. It is mathematically engineered to handle RPM packages."
  yearCreated={2013}
  creator="Red Hat"
  isOpenSource={true}
  websiteUrl="https://dnf.readthedocs.io/"
>

Historically, Red Hat systems used **YUM**. However, YUM was written in Python 2, was notoriously slow, and its dependency resolver mathematically consumed massive amounts of RAM.

<Callout icon="success" title="The SAT Solver">
  DNF completely replaced YUM by integrating **libsolv** (written by SUSE). 
  
  Dependency resolution is biologically a Boolean Satisfiability Problem (SAT). \`libsolv\` is a mathematically rigorous C/C++ engine that solves these complex dependency graphs exponentially faster and with vastly less memory than YUM ever could.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/pacman/index.mdx': `---
title: pacman (Package Manager)
description: A package management utility that tracks installed packages on a Linux system. It features dependency support, package groups, install and uninstall scripts, and automatic sync.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="pacman"
  subtitle="The speed demon of Arch Linux"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/512px-Archlinux-icon-crystal-64.svg.png"
  description="pacman is the proprietary package manager for Arch Linux. It is mathematically renowned for being one of the fastest and most brutal package managers in the Linux ecosystem."
  yearCreated={2002}
  creator="Judd Vinet"
  isOpenSource={true}
  websiteUrl="https://wiki.archlinux.org/title/pacman"
>

While APT commands are long (\`apt update && apt install firefox\`), pacman is strictly mathematical and flag-based. 
To achieve the exact same result in Arch Linux, you simply type \`pacman -Syu firefox\`.

<Callout icon="warning" title="The Bleeding Edge">
  Arch Linux is a **Rolling Release** distribution. There is no "Ubuntu 22.04" or "24.04". 
  
  When you run \`pacman -Syu\` (Sync, Refresh, Upgrade), pacman mathematically downloads the absolute newest, bleeding-edge kernels and packages available on Earth. While this gives developers the newest features instantly, it famously requires users to mathematically read update logs, as rolling releases can frequently break the operating system.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.3 Build Systems & Package Managers/Homebrew/index.mdx': `---
title: Homebrew
description: A free and open-source software package management system that simplifies the installation of software on Apple's macOS operating system and Linux.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Homebrew"
  subtitle="The missing package manager for macOS"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Homebrew-logo.svg/512px-Homebrew-logo.svg.png"
  description="Apple mathematically refuses to include a CLI package manager in macOS. Homebrew solved this, becoming the absolute, undisputed standard for installing developer tools on Apple Silicon."
  yearCreated={2009}
  creator="Max Howell"
  isOpenSource={true}
  websiteUrl="https://brew.sh/"
>

If you want to install \`node\` or \`postgresql\` on a Mac, you historically had to hunt down \`.pkg\` installers on random websites.

With Homebrew, you simply open the terminal and type \`brew install node\`. 

<Callout icon="info" title="The Ruby Architecture">
  Homebrew scripts (called "Formulas") are written entirely in **Ruby**. 
  
  When you install a package, Homebrew physically downloads the raw C++ source code from GitHub and mathematically compiles it locally on your exact CPU. It safely sandboxes all binaries inside the \`/opt/homebrew\` directory, physically preventing Apple's strict System Integrity Protection (SIP) from blocking the installation.
</Callout>

</TechnologyTemplate>
`,
}

async function generateMega97() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega97().catch(console.error)
