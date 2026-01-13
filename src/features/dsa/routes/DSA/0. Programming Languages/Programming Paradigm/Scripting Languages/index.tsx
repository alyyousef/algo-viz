import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
  {
    title: 'JIT and modern runtimes mature (2010s)',
    detail:
      'V8, PyPy, and modern interpreters improve performance, enabling scripts to scale beyond small tasks.',
  },
  {
    title: 'Serverless and edge scripting (2015+)',
    detail:
      'Cloud functions push scripts into production paths, making packaging and cold-start optimization critical.',
  },
  {
    title: 'Modern package ecosystems consolidate (2020s)',
    detail:
      'Lockfiles, virtual environments, and reproducible builds make scripting safer in production.',
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
  {
    title: 'Automation is policy',
    detail:
      'Scripts encode operational decisions; treat them as production code when they become critical.',
  },
  {
    title: 'Boundaries reduce risk',
    detail:
      'Well-defined inputs, outputs, and validation prevent cascading failures.',
  },
  {
    title: 'Latency over throughput',
    detail:
      'Scripts often value quick startup and developer feedback more than raw speed.',
  },
]

const mechanics = [
  {
    heading: 'Dynamic typing and quick feedback',
    bullets: [
      'Interpreted execution runs code line by line or via bytecode with minimal startup cost, ideal for REPLs and rapid edits.',
      'Dynamic types and duck typing keep code concise but shift some errors to runtime.',
      'Runtime introspection (reflection, eval) speeds iteration but increases risk if misused.',
    ],
  },
  {
    heading: 'Process orchestration and IO',
    bullets: [
      'Shelling out to system utilities, piping streams, and handling exit codes are core tasks.',
      'Async IO primitives (asyncio, Node promises) let scripts multiplex network calls without threads.',
      'Environment variables and simple config files often carry parameters; validation is crucial.',
      'Timeouts and retries protect against flaky external systems.',
    ],
  },
  {
    heading: 'Packaging and distribution',
    bullets: [
      'Package managers (pip, npm, RubyGems) distribute reusable modules.',
      'Single-file scripts or zipapp/pex bundles ease deployment; container images and standalone runtimes avoid version drift.',
      'Lockfiles and virtual environments stabilize dependencies across machines.',
    ],
  },
  {
    heading: 'Observability and safety',
    bullets: [
      'Structured logging and exit codes make automation auditable.',
      'Feature flags and dry-run modes reduce operational risk.',
      'Idempotent scripts prevent repeated execution from causing harm.',
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
  {
    title: 'IO bottlenecks',
    detail:
      'Most scripts are IO bound; optimizing compute rarely matters as much as network or disk latency.',
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
  {
    context: 'Data pipelines',
    detail:
      'Batch jobs stitch together ETL steps and dispatch workloads to data stores.',
  },
  {
    context: 'Monitoring and alerts',
    detail:
      'Lightweight scripts probe services and trigger notifications.',
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
  {
    title: 'Safe subprocess execution (Python)',
    code: `import subprocess

result = subprocess.run(
    ["curl", "-fsS", "https://example.com/health"],
    check=False,
    capture_output=True,
    text=True,
)

if result.returncode != 0:
    raise SystemExit("Health check failed")`,
    explanation:
      'Capture output and validate exit codes so failures are explicit.',
  },
  {
    title: 'Idempotent file update (Bash)',
    code: `grep -q "option=1" app.conf || echo "option=1" >> app.conf`,
    explanation:
      'Idempotent operations let scripts run repeatedly without duplicating work.',
  },
]

const pitfalls = [
  'Assuming external tool output is stable; fragile parsing breaks when versions change.',
  'Skipping error handling for subprocess exit codes and timeouts leads to silent failures.',
  'Unchecked dynamic typing can hide bugs until runtime; add validation and linters for guardrails.',
  'Hardcoding credentials or paths creates security and portability problems; prefer env vars or secrets managers.',
  'Version drift between environments causes "works on my machine" incidents; pin interpreter and dependency versions.',
  'Ignoring idempotency leads to repeated side effects in automation.',
  'Unbounded retries or loops cause runaway resource usage.',
]

const decisionPoints = [
  'Need quick automation or orchestration: scripting is ideal when tasks are IO bound and evolve frequently.',
  'Performance critical compute: move hotspots to native extensions or compiled services while keeping orchestration scripted.',
  'Operational constraints: if startup time or runtime availability is limited, bundle or compile to a single artifact.',
  'Team skills and portability: choose the scripting runtime with best ecosystem and deployment story for your environment.',
  'If scripts become services, introduce testing, logging, and deployment pipelines.',
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
  {
    title: 'Concurrency control',
    detail:
      'Limit parallelism to avoid overwhelming downstream systems.',
  },
  {
    title: 'Configurable scripts',
    detail:
      'Use flags and environment-based configuration to avoid hardcoded behavior.',
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
  'Idempotency and observability turn scripts into dependable automation.',
  'Modern scripting runtimes and tooling make production scripting safer than ever.',
]

const toolingEcosystem = [
  {
    title: 'Languages',
    detail:
      'Bash, Python, Ruby, JavaScript, PowerShell, and Perl dominate automation across platforms.',
  },
  {
    title: 'Package managers',
    detail:
      'pip, npm, gem, and Poetry manage dependencies and lock versions.',
  },
  {
    title: 'Linting and formatting',
    detail:
      'ShellCheck, black, ruff, ESLint, and shfmt reduce errors and improve consistency.',
  },
  {
    title: 'Runtimes and packaging',
    detail:
      'Zipapps, containers, and standalone runtimes improve reproducibility.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Reproduce locally',
    detail:
      'Capture inputs and environment variables to recreate issues.',
  },
  {
    title: 'Trace execution',
    detail:
      'Use verbose flags or tracing modes to follow command execution.',
  },
  {
    title: 'Check exit codes',
    detail:
      'Fail fast when subprocesses error rather than continuing silently.',
  },
  {
    title: 'Add logs',
    detail:
      'Log key decisions and external calls to speed up diagnosis.',
  },
]

const productionChecklist = [
  {
    title: 'Reliability',
    detail:
      'Handle errors, timeouts, and retries consistently.',
  },
  {
    title: 'Security',
    detail:
      'Avoid hardcoded secrets and sanitize inputs.',
  },
  {
    title: 'Performance',
    detail:
      'Limit concurrency and avoid unnecessary heavy dependencies.',
  },
  {
    title: 'Maintainability',
    detail:
      'Document usage, flags, and expected outputs.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Shell basics, file IO, and process execution.',
  },
  {
    step: 'Scripting skills',
    detail: 'Parsing, error handling, and modular scripts.',
  },
  {
    step: 'Automation at scale',
    detail: 'CI/CD, configuration management, and packaging.',
  },
  {
    step: 'Production scripting',
    detail: 'Observability, security, and reproducibility.',
  },
]

export default function ScriptingLanguagesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Scripting Languages</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div className="win95-stack">
              <div className="win95-subheading">Glue code for automation and orchestration</div>
              <p className="win95-text">
                Scripting languages thrive at connecting systems: they shell out to tools, call APIs, and massage text and data with
                minimal ceremony. They prioritize rapid iteration and portability over raw speed, making them indispensable for
                automation, glue services, and experimentation.
              </p>
              <p className="win95-text">
                Scripting trades ahead-of-time optimization for immediacy. With quick start times, dynamic types, and rich standard
                libraries, scripts orchestrate other programs and services, moving data between them with lightweight code.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {milestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-3">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                For IO bound work, focus on retries, backoff, and robust parsing rather than micro-optimizing loops. For CPU bound
                sections, delegate to native extensions or compiled helpers instead of rewriting entire scripts.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and ecosystem</legend>
            <div className="win95-grid win95-grid-2">
              {toolingEcosystem.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Debugging workflow</legend>
            <div className="win95-grid win95-grid-2">
              {debuggingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Production checklist</legend>
            <div className="win95-grid win95-grid-2">
              {productionChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and frontiers</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Further reading and sources</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {sources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

