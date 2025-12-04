import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Unix shells popularize pipelines (1970s)',
    detail:
      'Bourne shell and its successors let users compose native tools with simple scripts, proving that orchestration can be lightweight and powerful.',
  },
  {
    title: 'Perl and Tcl bring glue to the web and GUI (1980s-1990s)',
    detail:
      'Perl automated system tasks and early CGI, while Tcl embedded scripts into applications, showing the value of embedded interpreters.',
  },
  {
    title: 'Python and Ruby emphasize readability and batteries (1990s)',
    detail:
      'They lowered barriers for automation and web development with rich standard libraries and friendly syntax, extending scripting beyond sysadmin niches.',
  },
  {
    title: 'JavaScript becomes the browser scripting default (mid 1990s)',
    detail:
      'Bundled with browsers, JavaScript made client-side interactivity ubiquitous, and later powered servers via Node.js.',
  },
  {
    title: 'Infrastructure as code and DevOps rise (2010s)',
    detail:
      'Tools like Ansible and Terraform adopt script-like DSLs to define environments declaratively, treating automation as first class code.',
  },
]

const mentalModels = [
  {
    title: 'Glue and orchestration',
    detail:
      'Scripting stitches together programs, APIs, and files. Think of scripts as conductors directing specialized performers rather than performing heavy computation themselves.',
  },
  {
    title: 'Interpreter as shell',
    detail:
      'The runtime is always present, providing IO primitives, string handling, and dynamic dispatch. Fast iteration matters more than raw constant factors.',
  },
  {
    title: 'Text as a universal interface',
    detail:
      'Many scripts parse and emit text streams. Robust parsing and error handling guard against brittle assumptions about external tools.',
  },
]

const mechanics = [
  {
    heading: 'Dynamic typing and quick feedback',
    bullets: [
      'Interpreted execution runs code line by line or via bytecode with minimal startup cost, ideal for REPLs and rapid edits.',
      'Dynamic types and duck typing keep code concise but shift some errors to runtime.',
    ],
  },
  {
    heading: 'Process orchestration and IO',
    bullets: [
      'Shelling out to system utilities, piping streams, and handling exit codes are core tasks.',
      'Async IO primitives (asyncio, Node promises) let scripts multiplex network calls without threads.',
      'Environment variables and simple config files often carry parameters; validation is crucial.',
    ],
  },
  {
    heading: 'Packaging and distribution',
    bullets: [
      'Package managers (pip, npm, RubyGems) distribute reusable modules.',
      'Single-file scripts or zipapp/pex bundles ease deployment; container images and standalone runtimes avoid version drift.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotics vs overhead',
    detail:
      'Big-O matches compiled counterparts, but interpreter dispatch and dynamic types add constant overhead. For IO bound tasks this is often negligible.',
  },
  {
    title: 'Startup and cold start',
    detail:
      'Small scripts start fast, but large dependency trees or slow interpreter startup can hurt serverless cold starts.',
  },
  {
    title: 'Reliability costs',
    detail:
      'Lax typing can defer bugs to production. Defensive checks and linting recover safety without losing speed of iteration.',
  },
]

const applications = [
  {
    context: 'Automation and DevOps',
    detail:
      'Provisioning servers, deploying builds, rotating certificates, and wiring CI pipelines are natural fits for scripts interacting with CLIs and APIs.',
  },
  {
    context: 'Data wrangling and reporting',
    detail:
      'Ad hoc data cleaning, CSV munging, and report generation benefit from quick iterations and strong string/JSON handling.',
  },
  {
    context: 'Glue code between systems',
    detail:
      'Bridging HTTP APIs, message queues, and databases with lightweight services or cron jobs keeps integration overhead low.',
  },
  {
    context: 'Prototyping and experiments',
    detail:
      'Short scripts validate ideas before committing to larger systems. REPLs and notebooks encourage exploration.',
  },
]

const examples = [
  {
    title: 'Shell pipeline for log insights',
    code: `cat access.log \\
  | awk '{print $7}' \\
  | sort \\
  | uniq -c \\
  | sort -nr \\
  | head -n 5`,
    explanation:
      'Pipes compose simple tools to surface the top requested paths. Each stage does one job; together they form a quick report.',
  },
  {
    title: 'HTTP automation (Python)',
    code: `import requests

def fetch_status(endpoints):
    return {url: requests.get(url, timeout=5).status_code for url in endpoints}

if __name__ == "__main__":
    urls = ["https://api.example.com/health", "https://example.com/"]
    print(fetch_status(urls))`,
    explanation:
      'Readable code orchestrates network calls. The interpreter handles imports and IO without compilation steps.',
  },
  {
    title: 'Async scripting (Node.js)',
    code: `import fs from "fs/promises";

async function readConfigs(paths) {
    const files = await Promise.all(paths.map((p) => fs.readFile(p, "utf8")));
    return files.map(JSON.parse);
}
`,
    explanation:
      'Async primitives keep scripts responsive when handling multiple files or network requests concurrently.',
  },
]

const pitfalls = [
  'Assuming external tool output is stable; fragile parsing breaks when versions change.',
  'Skipping error handling for subprocess exit codes and timeouts leads to silent failures.',
  'Unchecked dynamic typing can hide bugs until runtime; add validation and linters for guardrails.',
  'Hardcoding credentials or paths creates security and portability problems; prefer env vars or secrets managers.',
  'Version drift between environments causes “works on my machine” incidents; pin interpreter and dependency versions.',
]

const decisionPoints = [
  'Need quick automation or orchestration: scripting is ideal when tasks are IO bound and evolve frequently.',
  'Performance critical compute: move hotspots to native extensions or compiled services while keeping orchestration scripted.',
  'Operational constraints: if startup time or runtime availability is limited, bundle or compile to a single artifact.',
  'Team skills and portability: choose the scripting runtime with best ecosystem and deployment story for your environment.',
]

const advancedInsights = [
  {
    title: 'FFI and native extensions',
    detail:
      'Python C-extensions, Node native addons, and Rust ffi let scripts call optimized code, blending productivity with speed.',
  },
  {
    title: 'Sandboxing and security',
    detail:
      'Restrict interpreter capabilities for untrusted scripts. Use containers, seccomp, or language level sandboxes to limit damage.',
  },
  {
    title: 'Packaging for reproducibility',
    detail:
      'Lockfiles, virtual environments, and vendorized dependencies stabilize deployments. Single-binary packagers reduce interpreter drift.',
  },
  {
    title: 'Observability for brittle glue',
    detail:
      'Add logging around external calls, parse errors, and retries. Small scripts benefit from the same telemetry as services when they become critical.',
  },
]

const sources = [
  'Advanced Programming in the Unix Environment for shell scripting patterns and pitfalls.',
  'Automate the Boring Stuff with Python for practical scripting recipes.',
  'Node.js and Python official docs for subprocess, async IO, and packaging guidance.',
  'GeeksforGeeks: scripting language overviews for quick contrasts.',
  'ShellCheck and linting tools documentation for reliable shell scripting practices.',
]

const takeaways = [
  'Scripting languages excel at glue, automation, and fast iteration, trading some performance and static guarantees for speed of change.',
  'Interpreter overhead is often irrelevant for IO bound tasks; robustness hinges on error handling and stable interfaces.',
  'Guard against brittleness with validation, logging, and pinned environments; offload heavy compute to native paths when needed.',
  'Treat important scripts like software: tests, version control, and packaging pay off as scripts become operationally critical.',
]

export default function ScriptingLanguagesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Scripting Languages"
      subtitle="Glue code for automation and orchestration"
      intro="Scripting languages thrive at connecting systems: they shell out to tools, call APIs, and massage text and data with minimal ceremony. They prioritize rapid iteration and portability over raw speed, making them indispensable for automation, glue services, and experimentation."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Scripting trades ahead-of-time optimization for immediacy. With quick start times, dynamic types, and rich standard
          libraries, scripts orchestrate other programs and services, moving data between them with lightweight code.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {milestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-3">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          For IO bound work, focus on retries, backoff, and robust parsing rather than micro-optimizing loops. For CPU bound
          sections, delegate to native extensions or compiled helpers instead of rewriting entire scripts.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Further reading and sources">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {sources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
