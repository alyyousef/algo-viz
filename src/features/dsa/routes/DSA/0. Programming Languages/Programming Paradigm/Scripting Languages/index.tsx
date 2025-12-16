import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #C0C0C0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 12px;
  line-height: 1.35;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-page a:focus,
.win95-button:focus,
.win95-control:focus {
  outline: 1px dotted #000;
  outline-offset: -2px;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  border-radius: 0;
  box-shadow: none;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.win95-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
  color: #000;
  text-decoration: none;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin: 0 0 10px;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  margin: 0 0 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-code {
  margin: 6px 0 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
}
`

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
  'Version drift between environments causes "works on my machine" incidents; pin interpreter and dependency versions.',
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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Scripting Languages</span>
          <button className="win95-control" type="button" aria-label="Close window">
            X
          </button>
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
