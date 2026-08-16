import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/curl/index.mdx': `---
title: curl (Client URL)
description: A command-line tool and library for transferring data with URLs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="curl">

If you want to download a webpage, you use Google Chrome. If a *Linux server* needs to download a webpage, it uses **\`curl\`**.

\`curl\` is the absolute universal standard for making HTTP requests directly from the terminal. It supports almost every protocol on Earth (HTTP, HTTPS, FTP, SCP, LDAP).

<Callout icon="info" title="Testing APIs">
  Developers primarily use \`curl\` to mathematically test REST APIs without writing any code.
  
  \`curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d '{"name": "Alice"}'\`
  
  This command physically constructs an HTTP POST request, injects the JSON headers, attaches the JSON body payload, and mathematically executes the network request, printing the server's raw response to the terminal.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/wget/index.mdx': `---
title: wget
description: A computer program that retrieves content from web servers, part of the GNU Project.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="wget">

While \`curl\` is designed to *transfer* data (both sending and receiving), **\`wget\`** is designed exclusively to *download* data to the hard drive.

<Callout icon="warning" title="Recursive Mirroring">
  The true mathematical power of \`wget\` is its **Recursive (\`-r\`)** flag. 
  
  \`wget -r -l 2 https://example.com\`
  
  This command will mathematically download the index page of \`example.com\`. It will then parse the HTML, find every single \`<a>\` link on the page, and automatically download those pages too, up to 2 levels deep. It allows a developer to perfectly mirror an entire website to their local hard drive for offline viewing.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/ssh/index.mdx': `---
title: SSH (Secure Shell)
description: A cryptographic network protocol for operating network services securely over an unsecured network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SSH (Secure Shell)">

In the 1980s, administrators used \`Telnet\` to connect to remote servers. \`Telnet\` sent everything in raw, unencrypted plain text. If you typed your root password, anyone on the WiFi network could read it.

**SSH (Secure Shell)** replaced Telnet. It is a mathematical protocol that creates a perfectly encrypted, cryptographic tunnel between your laptop and the remote server.

<Callout icon="success" title="Public Key Cryptography">
  Instead of typing a password every time, SSH relies on **RSA / Ed25519 Key Pairs**.
  
  You mathematically generate a Private Key (which stays on your laptop) and a Public Key (which you upload to the server's \`~/.ssh/authorized_keys\` file). When you run \`ssh root@server\`, the server sends a mathematical cryptographic challenge that only your Private Key can solve. You are logged in instantly, with zero passwords, and it is mathematically impossible to brute-force.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/scp/index.mdx': `---
title: SCP (Secure Copy Protocol)
description: A means of securely transferring computer files between a local host and a remote host or between two remote hosts.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SCP (Secure Copy)">

If you want to move a file from your laptop to a remote Linux server, you cannot drag and drop it. 

You use **SCP**. It uses the exact same encrypted cryptographic tunnel as SSH, but it is specifically designed to transfer raw file bytes instead of terminal commands.

<Callout icon="info" title="The Syntax">
  The mathematical syntax of SCP is strictly: \`scp [SOURCE] [DESTINATION]\`
  
  \`scp ./database.sql root@192.168.1.50:/var/backups/\`
  
  This command mathematically connects to the remote server, authenticates using your SSH keys, and securely streams the \`database.sql\` file directly into the \`/var/backups/\` directory.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/rsync/index.mdx': `---
title: rsync
description: A utility for efficiently transferring and synchronizing files between a computer and a storage drive and across networked computers.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="rsync">

SCP is mathematically stupid. If you use SCP to copy a 100-Gigabyte folder containing 10,000 files to a server, and 1 file fails, you have to restart the entire 100-Gigabyte transfer from zero.

**\`rsync\`** is mathematically brilliant. It is a differential synchronization algorithm.

<Callout icon="tip" title="Delta Transfer Algorithm">
  If you run \`rsync\` on that 100GB folder, it mathematically calculates the checksum hashes of all 10,000 files on your laptop, and compares them to the hashes of the files on the server.
  
  It realizes that 9,999 files are completely identical. It mathematically refuses to transfer them. It only transfers the exact byte-diffs of the 1 file that changed. What would take 2 hours in SCP takes 0.2 seconds in \`rsync\`.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/DBeaver/index.mdx': `---
title: DBeaver
description: A free and open source universal database tool for developers and database administrators.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="DBeaver"
  subtitle="The Universal Database Client"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/DBeaver_logo.svg/512px-DBeaver_logo.svg.png"
  description="DBeaver is an incredibly popular, Java-based universal database client. Instead of needing 5 different IDEs for 5 different databases, DBeaver connects to almost everything."
  yearCreated={2010}
  creator="Serge Rider"
  isOpenSource={true}
  websiteUrl="https://dbeaver.io/"
>

If a developer works at a company using PostgreSQL for the backend, MySQL for a legacy app, and MongoDB for analytics, they traditionally needed three separate software clients.

DBeaver solves this by using **JDBC Drivers**. It mathematically abstracts the database connection. You provide DBeaver with the database URL, and it automatically downloads the exact Java driver required to talk to PostgreSQL, MySQL, SQLite, Oracle, or Cassandra, providing a single, unified GUI to query them all.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/DataGrip/index.mdx': `---
title: DataGrip
description: A cross-platform IDE for databases and SQL by JetBrains.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="DataGrip"
  subtitle="The IntelliJ of SQL"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/DataGrip_Icon.svg/512px-DataGrip_Icon.svg.png"
  description="DataGrip is JetBrains' premium, paid database IDE. It applies the exact same terrifying mathematical AST intelligence of IntelliJ IDEA directly to SQL."
  yearCreated={2015}
  creator="JetBrains"
  isOpenSource={false}
  websiteUrl="https://www.jetbrains.com/datagrip/"
>

Writing raw SQL in a text editor is dangerous because there is no compiler. If you type \`SELECT usr_name FROM users\`, the text editor doesn't know that the column is actually spelled \`user_name\`. It will mathematically fail at runtime.

DataGrip physically connects to the database, downloads the entire mathematical schema, and provides real-time, IDE-level auto-completion and error checking. If you misspell a column name, DataGrip mathematically underlines it in red *before* you execute the query.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/MySQL Workbench/index.mdx': `---
title: MySQL Workbench
description: A unified visual tool for database architects, developers, and DBAs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="MySQL Workbench"
  subtitle="The official MySQL architect"
  logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/MySQL_Workbench_logo.png/512px-MySQL_Workbench_logo.png"
  description="MySQL Workbench is the official, first-party GUI tool provided by Oracle for designing, developing, and administrating MySQL databases."
  yearCreated={2005}
  creator="Oracle"
  isOpenSource={false}
  websiteUrl="https://www.mysql.com/products/workbench/"
>

While tools like DBeaver are great for writing \`SELECT\` queries, MySQL Workbench is built for **Database Architecture**.

<Callout icon="info" title="EER Diagram Generation">
  Workbench's most powerful feature is its reverse-engineering engine. 
  
  You can point it at a massive, undocumented legacy MySQL database with 500 tables. It will mathematically parse the Foreign Key constraints and instantly generate a massive, visually interactive **Entity-Relationship (EER) Diagram**, allowing architects to visually comprehend the database structure in seconds.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/pgAdmin/index.mdx': `---
title: pgAdmin
description: The most popular and feature rich Open Source administration and development platform for PostgreSQL.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="pgAdmin"
  subtitle="The official PostgreSQL manager"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/512px-Postgresql_elephant.svg.png"
  description="pgAdmin is the de facto open-source GUI for managing PostgreSQL databases. It is a web-based application (often run locally) that provides deep access to Postgres-specific internals."
  yearCreated={1998}
  creator="The pgAdmin Development Team"
  isOpenSource={true}
  websiteUrl="https://www.pgadmin.org/"
>

Because PostgreSQL supports incredibly advanced mathematical features (like JSONB indexing, PostGIS geographic data, and complex materialized views), generic database clients often fail to display this data correctly.

pgAdmin is built exclusively for Postgres. It allows DBAs to visually manage Users, Roles, Tablespaces, and execute visual query plans (EXPLAIN ANALYZE) to mathematically identify exactly which table scan is causing a slow query.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/SQL Developer/index.mdx': `---
title: Oracle SQL Developer
description: A free, integrated development environment that simplifies the development and management of Oracle Database in both traditional and Cloud deployments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Oracle SQL Developer"
  subtitle="The Enterprise Oracle titan"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png"
  description="Oracle SQL Developer is the monolithic, Java-based IDE required to interact with enterprise Oracle Databases."
  yearCreated={2005}
  creator="Oracle"
  isOpenSource={false}
  websiteUrl="https://www.oracle.com/database/technologies/appdev/sqldeveloper.html"
>

Oracle Databases are mathematically massive, often powering the billing systems for entire global banks. You cannot manage an Oracle DB with a simple text editor.

SQL Developer provides deep, proprietary integration with Oracle's **PL/SQL** language. It includes a step-by-step debugger that allows developers to mathematically pause PL/SQL stored procedures executing on the database server, inspect the memory state, and step through the logic line by line.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/JupyterLab/index.mdx': `---
title: JupyterLab
description: The latest web-based interactive development environment for notebooks, code, and data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="JupyterLab"
  subtitle="The IDE of Data Science"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/512px-Jupyter_logo.svg.png"
  description="JupyterLab (and Jupyter Notebooks) completely revolutionized Data Science. It is a web-based IDE that allows scientists to write Python code, execute it in small chunks, and render visual data graphs directly inline."
  yearCreated={2018}
  creator="Project Jupyter"
  isOpenSource={true}
  websiteUrl="https://jupyter.org/"
>

In a standard IDE (like VS Code), if you have a script that takes 5 minutes to download a 10GB CSV file and 1 second to print a graph, you must mathematically wait 5 minutes every single time you change the color of the graph.

<Callout icon="success" title="The REPL Cell Architecture">
  Jupyter mathematically isolates the execution state into **Cells**. 
  
  You execute Cell 1 (which downloads the 10GB CSV into the \`df\` variable in RAM). It takes 5 minutes.
  You then edit the graph color in Cell 2 and execute *only* Cell 2. It runs in 1 millisecond, utilizing the \`df\` variable already stored in the kernel's RAM. This allows for instantaneous, highly iterative mathematical data exploration.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/cmake/index.mdx': `---
title: CMake
description: An open-source, cross-platform family of tools designed to build, test and package software.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="CMake"
  subtitle="The C++ Meta-Build System"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Cmake.svg/512px-Cmake.svg.png"
  description="CMake is not a compiler. It is a 'Meta-Build System'. It mathematically generates the actual build files (Makefiles or Visual Studio Solutions) required to compile C/C++ code across different operating systems."
  yearCreated={2000}
  creator="Kitware"
  isOpenSource={true}
  websiteUrl="https://cmake.org/"
>

If you write a C++ program on Linux, you use \`make\` (GCC). If you write it on Windows, you use \`MSBuild\` (Visual Studio). If you want your open-source C++ library to run on both, you historically had to maintain two completely separate mathematical build systems.

CMake solved this. You write a single \`CMakeLists.txt\` file. 
When a Linux user runs CMake, it mathematically generates a Linux \`Makefile\`. When a Windows user runs CMake, it mathematically generates a Windows \`.sln\` Visual Studio project. It is the absolute standard for cross-platform C++.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.2 CLI & Data Tools/make/index.mdx': `---
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

If you have a C program with 500 \`.c\` files, running \`gcc\` 500 times manually is impossible. 

You write a **Makefile** that mathematically maps which files depend on each other. 
When you type \`make\`, it reads the graph. If you only edited exactly 1 file (\`main.c\`), \`make\` is mathematically smart enough to recompile *only* \`main.c\` and link the other 499 cached binaries. It turns a 2-hour compile time into a 5-second compile time.

<Callout icon="warning" title="The Tab Character Trap">
  Makefiles are notoriously hated for their syntax. The commands mathematically MUST be indented with a physical \`Tab\` character. If a developer uses 4 spaces instead of a Tab, \`make\` will instantly crash with a cryptic "missing separator" error.
</Callout>

</TechnologyTemplate>
`,
}

async function generateMega96() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega96().catch(console.error)
