# Instructions for the Next Agent

Hello! If you are reading this, you are picking up where the previous agents left off in building the **Win96 Algorithm Visualizer / Knowledge Base (algo-viz)**.

The user wants you to continue the massive, autonomous hydration of the Knowledge Base taxonomy. Here is exactly what we have done so far, and how you should proceed.

## Context and Goal

The `algo-viz` project contains a massive MDX-based knowledge base (`src/features/kb/routes/KB/`). We generated thousands of empty/placeholder `.mdx` files representing a complete Computer Science curriculum.
Your primary goal is to systematically "hydrate" these empty `.mdx` files with high-quality, comprehensive content.

## The Workflow (The "MEGA Batch" Pattern)

We have found that generating content one file at a time is too slow. Instead, we use "MEGA Batches" (generating 10+ pages per turn via a Node script). You should continue this exact pattern:

1. **Identify Unimplemented Pages:**
   - Run a PowerShell command like `Get-ChildItem -Recurse src\features\kb\routes\KB -Filter *.mdx | Select-Object FullName | Select-String "TopicName"` to find paths for a specific theme (e.g., Cryptography, WebGL, Machine Learning).
2. **Create a Generator Script:**
   - Create a file at `scripts/generate-mega11.mjs` (incrementing the number from 10).
   - Use the standard script template (see below) to write the content map and use `fs/promises` to bulk-write the files.
3. **Format and Components:**
   - Every MDX file MUST have frontmatter (`title` and `description`).
   - Every MDX file MUST import and wrap the content in `<TechnologyTemplate>`:
     ```mdx
     import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'
     <TechnologyTemplate title="Your Title"> ... </TechnologyTemplate

     >
     ```
   - Use custom components to make the design WOW the user:
     - `<Callout icon="info|success|warning|error|tip" title="Title">...</Callout>`
     - `<ComparisonTable headers={['A', 'B']} rows={[['A1', 'B1']]} />`
   - **CRITICAL MDX RULE:** Be extremely careful with unescaped single quotes (`'`) inside inline code blocks (`` `...` ``) or array literals, as Acorn will throw a parsing error during the Vite build.

4. **Execute and Archive:**
   - Run the script: `node scripts/generate-mega11.mjs`
   - Move it to the archive: `Move-Item scripts/generate-mega11.mjs scripts/archive/`
5. **Verify:**
   - You MUST run `npm run build` after your batch to ensure you didn't introduce any MDX syntax errors that break the Vite compiler. If it fails, fix the quoting errors in the generated files.

6. **Track Progress:**
   - Keep the local `task.md` and `walkthrough.md` artifacts updated with your progress.

## What has been done so far

We have successfully run MEGA Batches 1 through 10 (covering roughly 100 pages).
Themes already covered:

- **Batch 1-5:** Algorithms, Data Structures, OOP, Databases, Cybersecurity, System Design, GraphQL, WebAssembly.
- **Batch 6:** Software Engineering, Agile, Docker, K8s, Design Patterns.
- **Batch 7:** Git, Linux Administration, Virtual Memory, Deadlocks.
- **Batch 8:** Microservices, Event-Driven Arch, Kafka, Redis, Webhooks.
- **Batch 9:** Web Frameworks (React, Vue, Angular, Next.js), JS Event Loop, Promises, Streams, DOM XSS.
- **Batch 10:** Cloud Wars (AWS vs Azure vs GCP), EC2, S3, DynamoDB, DNS, CDNs, Virtual Machines.

## Your Immediate Next Steps

When you are initialized, begin by searching for empty pages in domains we haven't fully fleshed out yet. Good targets include:

- AI & Machine Learning (Transformers, CNNs, LLMs)
- Advanced Networking (TCP/IP, BGP, OSI Model)
- Cryptography (RSA, AES, Hashing)
- Advanced Data Structures (B-Trees, Tries, Bloom Filters)

Just keep generating MEGA batches, verifying the builds, and wowing the user!
