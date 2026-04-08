import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const FRAMEWORKS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks'

const overviewSections = [
  {
    title: 'What this section is',
    body: 'Frameworks is the part of Languages and Ecosystems that focuses on full or semi-full software scaffolds for building real products. A framework is more than a library. It usually imposes structure, conventions, lifecycle rules, integration patterns, and a way of organizing code so teams can build larger systems with less repeated decision-making.',
  },
  {
    title: 'Why frameworks matter',
    body: 'Frameworks matter because they reduce the number of architectural choices a team has to invent from scratch. They can standardize routing, rendering, dependency management, data access, lifecycle hooks, testing patterns, deployment assumptions, and extension mechanisms. That consistency often matters more than any one feature in isolation.',
  },
  {
    title: 'How to think about them',
    body: 'The useful mental model is that a framework is an opinionated execution environment for a category of software. It does not merely provide tools. It also decides where code lives, when it runs, how dependencies are wired, and how the application is expected to grow. Choosing a framework therefore means choosing a development model, not only an API surface.',
  },
  {
    title: 'Where this section fits',
    body: 'This section is an umbrella overview for framework families across frontend, backend, mobile, data, cloud and DevOps, and game development. It is meant to help readers understand why frameworks exist at all, what tradeoffs they introduce, and how the surrounding ecosystem changes once a framework becomes the center of development.',
  },
]

const whyItMatters = [
  'Frameworks encode architecture, not just helper functions.',
  'They reduce repeated setup work and team-level inconsistency.',
  'They often shape testing, deployment, and extension patterns across the whole project.',
  'They can accelerate delivery when their conventions match the product shape.',
  'They can also create lock-in or friction when their worldview stops fitting the problem.',
]

const historicalContext = [
  {
    title: 'Software teams repeatedly rebuilt the same infrastructure',
    detail:
      'As products grew, engineers kept re-implementing common patterns such as routing, dependency wiring, state flow, request handling, persistence access, and lifecycle hooks. Frameworks emerged because these repeated decisions were expensive and often inconsistent across teams.',
  },
  {
    title: 'Conventions became a productivity strategy',
    detail:
      'Many successful frameworks gained traction not because they exposed more primitive power than libraries, but because they encoded proven defaults. Convention over configuration, generated structure, standard lifecycles, and integrated tooling all reduced decision fatigue and onboarding cost.',
  },
  {
    title: 'Frameworks expanded beyond one domain',
    detail:
      'The idea of a framework spread from web servers and UI toolkits into mobile development, game engines, cloud infrastructure, CI systems, and data workflows. In every domain, the same tradeoff appears: less flexibility in exchange for a faster path to working systems.',
  },
  {
    title: 'Modern framework choice is an ecosystem choice',
    detail:
      'Today, adopting a framework usually means adopting an ecosystem of plugins, deployment assumptions, documentation, examples, package conventions, and community expectations. The surrounding ecosystem can be as important as the framework core itself.',
  },
]

const frameworkTracks = [
  {
    title: 'Frontend Frameworks',
    routeLabel: 'Frontend',
    body: 'Frontend frameworks organize rendering, routing, state, form handling, reactivity, and user interaction. They matter because the browser is a highly stateful environment where teams need conventions for components, pages, events, and data flow.',
  },
  {
    title: 'Backend Frameworks',
    routeLabel: 'Backend',
    body: 'Backend frameworks structure request handling, middleware, validation, persistence access, background jobs, dependency injection, and deployment surfaces. They can radically affect how quickly APIs and services are built and how maintainable they remain over time.',
  },
  {
    title: 'Mobile Frameworks',
    routeLabel: 'Mobile',
    body: 'Mobile frameworks shape widget trees, navigation, local state, native capability access, cross-platform abstractions, build pipelines, and release processes. They matter because shipping to app stores and hardware-constrained devices adds another layer of product discipline.',
  },
  {
    title: 'Data Frameworks',
    routeLabel: 'Data',
    body: 'Data frameworks and platforms standardize ingestion, orchestration, schema handling, transformation pipelines, reproducibility, and workflow automation. They are especially important when many data processes need to behave predictably across teams or environments.',
  },
  {
    title: 'Cloud and DevOps Frameworks',
    routeLabel: 'Cloud-DevOps',
    body: 'Cloud and DevOps frameworks define how infrastructure is declared, how deployment is orchestrated, how environments stay reproducible, and how teams model operational workflows. These frameworks often become the invisible architecture of delivery itself.',
  },
  {
    title: 'Game Frameworks',
    routeLabel: 'Game',
    body: 'Game frameworks and engines provide rendering loops, input models, scene management, asset pipelines, animation systems, and performance-sensitive runtime architecture. They matter because real-time interactive systems are too complex to rebuild from primitives for every project.',
  },
]

const bigPictureThemes = [
  {
    title: 'A framework is a set of opinions with consequences',
    body: 'Every framework solves some kinds of chaos by constraining how software is written. That can be excellent when the constraints align with the product and team. It can be frustrating when the constraints do not match the problem. The benefit is not free power. The benefit is coordinated structure.',
  },
  {
    title: 'The real value is usually consistency',
    body: 'Frameworks are often chosen because they help many developers solve the same kinds of problems in roughly the same way. That consistency improves onboarding, code review, documentation, operational support, and maintenance even when a raw library stack might have offered more freedom.',
  },
  {
    title: 'Frameworks trade flexibility for acceleration',
    body: 'A well-chosen framework can save enormous time by solving routing, state wiring, project layout, configuration, and lifecycle concerns. The tradeoff is that unusual requirements may require working around framework assumptions or accepting the frameworks preferred style.',
  },
  {
    title: 'Framework choice affects the whole lifecycle',
    body: 'The framework chosen at project start influences testing, build pipelines, deployment, observability, plugin decisions, team hiring, and eventual migration cost. This is why framework selection is more consequential than choosing a small utility library.',
  },
]

const keyTakeaways = [
  'Frameworks are structured ecosystems, not just code helpers.',
  'Their main value is coordinated conventions that reduce repeated design work.',
  'They improve productivity when their assumptions fit the product and team.',
  'They can create migration cost and lock-in when adopted carelessly.',
  'Framework choice should be treated as an architectural decision, not a popularity contest.',
]

const topicSignals = [
  {
    title: 'Reach for a framework when the project needs consistent structure',
    body: 'If many developers are working across the same application or product category, and repeated decisions keep appearing around routing, state, lifecycle, deployment, or extensibility, a framework often helps by giving those concerns a shared shape.',
  },
  {
    title: 'Reach for a framework when the ecosystem itself matters',
    body: 'Some frameworks are valuable not only because of their core APIs but because of their plugins, generated conventions, official tooling, and mature deployment patterns. That ecosystem effect can outweigh narrow feature differences.',
  },
  {
    title: 'Avoid frameworks when the abstraction cost outweighs the problem',
    body: 'Small or unusual projects sometimes do not benefit from the ceremony, conventions, or imposed architecture of a framework. In those cases, a smaller library set or simpler baseline may be more appropriate.',
  },
  {
    title: 'Evaluate frameworks by fit, not by general prestige',
    body: 'A framework that is excellent in one domain or team culture may be a poor fit in another. Evaluate how well the framework matches the products lifecycle, performance needs, operational model, and engineering preferences rather than asking which framework is universally best.',
  },
]

const coreFoundations = [
  {
    title: 'Inversion of control',
    body: 'One classic framework idea is inversion of control: the framework decides when your code runs rather than your code calling every piece of the system directly. This matters because lifecycle hooks, dependency injection, route matching, rendering, and startup behavior often flow from that inversion.',
  },
  {
    title: 'Project structure and conventions',
    body: 'Most frameworks teach a preferred project layout. That structure is not accidental. It is a way of making code predictable, searchable, and easier to extend across teams. Understanding the intended structure is often as important as understanding the API surface.',
  },
  {
    title: 'Extension points and plugin systems',
    body: 'Frameworks are rarely closed boxes. They usually provide middleware, hooks, plugins, adapters, directives, components, modules, or code-generation patterns so teams can extend the base model. The quality of these extension points strongly affects long-term usefulness.',
  },
  {
    title: 'Lifecycle and state ownership',
    body: 'Frameworks usually define a lifecycle: request lifecycle, render lifecycle, scene lifecycle, job lifecycle, deployment lifecycle, or workflow lifecycle. Teams need to understand where state belongs inside that lifecycle or they will end up fighting the framework.',
  },
  {
    title: 'Operational assumptions',
    body: 'Frameworks often assume particular build tools, hosting styles, deployment surfaces, state stores, or execution models. Those assumptions affect observability, performance, and portability, so they should be treated as part of the architecture rather than as implementation detail.',
  },
]

const frameworkFeatures = [
  {
    title: 'Integrated tooling and scaffolding',
    body: 'Many frameworks ship with CLIs, build presets, generators, test harnesses, or deployment helpers. This matters because it turns the framework into more than an API. It becomes a workflow engine for starting, growing, and shipping the software.',
  },
  {
    title: 'Domain-specific abstractions',
    body: 'Frameworks succeed when their abstractions match the domain they are meant to serve. UI frameworks encode components and reactivity, backend frameworks encode requests and services, mobile frameworks encode widget trees and navigation, and infrastructure frameworks encode declarative environments and rollout logic.',
  },
  {
    title: 'Community modules and extension ecosystems',
    body: 'The surrounding plugin or package ecosystem often determines whether a framework feels productive in real projects. Rich extension ecosystems reduce the need for custom glue code, but they also create versioning, compatibility, and long-term maintenance considerations.',
  },
  {
    title: 'Standardized testing and operational patterns',
    body: 'Frameworks frequently influence how teams test code, mock dependencies, run integration workflows, or perform rollout and rollback. Those patterns matter because they shape reliability and team habits just as much as runtime APIs do.',
  },
  {
    title: 'Opinionated defaults with optional escape hatches',
    body: 'Strong frameworks usually offer sensible defaults for common paths while still providing escape hatches for advanced use cases. The quality of those escape hatches often determines whether the framework remains helpful as a project becomes more specialized.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Framework overhead is sometimes structural, not only performance-related',
    body: 'A framework may introduce runtime overhead, but it can also add conceptual overhead through lifecycles, generated files, plugin ordering, or hidden extension points. Teams should evaluate both the runtime cost and the mental cost of adopting it.',
  },
  {
    title: 'Operational fit matters as much as developer ergonomics',
    body: 'A framework can feel excellent in local development but still be painful in production if it complicates observability, deployment, incident response, scaling, or version upgrades. Operational behavior is part of framework quality.',
  },
  {
    title: 'Migration cost grows with framework centrality',
    body: 'When a framework becomes the center of routing, lifecycle, build, deployment, state, and extension logic, moving away from it later can be expensive. Teams should think about framework adoption as a long-term commitment unless the system is small.',
  },
  {
    title: 'Governance and release cadence matter',
    body: 'A technically strong framework can still become risky if its release cadence is unstable, its ecosystem fragments, or its major versions require painful migrations. Framework sustainability is partly a social and governance question, not only a technical one.',
  },
]

const ecosystemUses = [
  {
    title: 'Frontend product delivery',
    body: 'Frameworks help teams standardize UI composition, rendering, routing, and state behavior so browser applications do not turn into ad hoc collections of widgets and fetch calls.',
  },
  {
    title: 'Backend service and API development',
    body: 'Backend frameworks speed up service construction by defining requests, controllers, middleware, validation, background work, and common infrastructure patterns in a repeatable way.',
  },
  {
    title: 'Mobile and cross-platform product work',
    body: 'Mobile frameworks encode the practical realities of navigation, widget layout, gestures, offline state, build tooling, and platform packaging. Without those abstractions, teams would repeatedly solve the same difficult problems.',
  },
  {
    title: 'Infrastructure and platform engineering',
    body: 'Cloud and DevOps frameworks let teams model deployments, environments, pipelines, and infrastructure changes in ways that are reproducible and reviewable. This is a form of framework thinking even when the output is not an app UI or API.',
  },
]

const comparisons = [
  {
    title: 'Frameworks versus libraries',
    body: 'Libraries usually provide capabilities you call directly, while frameworks often define the control flow and where your code plugs in. The tradeoff is freedom and simplicity versus structure and integrated guidance.',
  },
  {
    title: 'Opinionated frameworks versus minimal frameworks',
    body: 'Opinionated frameworks reduce decision space and often improve consistency, while minimal frameworks preserve flexibility at the cost of more team-owned architecture. Neither is universally better. The right choice depends on team scale, product shape, and appetite for custom design work.',
  },
  {
    title: 'Framework ecosystems versus bespoke stacks',
    body: 'A bespoke stack can fit the problem very precisely, but it also requires the team to define and maintain every integration. Framework ecosystems provide more off-the-shelf coordination, but they bring assumptions and upgrade paths that the team must accept.',
  },
  {
    title: 'Specialized frameworks versus general-purpose frameworks',
    body: 'Some frameworks are optimized for narrow domains such as game loops, infrastructure provisioning, or reactive UIs, while others aim to support broad application categories. Specialized frameworks can feel much better when the domain matches, but they may be awkward outside their intended scope.',
  },
]

const failureModes = [
  {
    title: 'Choosing the framework because it is fashionable',
    body: 'A popular framework may still be the wrong fit if its architecture, ecosystem, or operational assumptions do not match the project. Trend-following creates avoidable migration and maintenance pain.',
  },
  {
    title: 'Fighting the framework instead of using it',
    body: 'Teams sometimes adopt a framework and then immediately work around its structure because they never wanted its worldview in the first place. That usually leads to code that is more complex than either a pure framework style or a simpler custom stack would have been.',
  },
  {
    title: 'Underestimating lifecycle and hidden conventions',
    body: 'Frameworks often contain subtle ordering rules, generated behavior, plugin priorities, or implicit file conventions. Teams that ignore those details can spend a lot of time debugging behavior that is actually framework-defined rather than application-defined.',
  },
  {
    title: 'Treating all framework categories as equivalent',
    body: 'Frontend, backend, mobile, game, and infrastructure frameworks solve very different problems. Using the same evaluation criteria for all of them can produce misleading judgments because the important tradeoffs differ by domain.',
  },
  {
    title: 'Neglecting exit cost',
    body: 'A framework that touches every part of the system creates strong lock-in, even if it is open source. Teams should think early about how tightly the business logic is coupled to the framework and what a future migration would actually require.',
  },
]

const studyChecklist = [
  'Understand that a framework is a development model, not only an API bundle.',
  'Evaluate frameworks by domain fit, team fit, and operational fit rather than by popularity.',
  'Look at project structure, lifecycle, plugins, and deployment assumptions before committing.',
  'Prefer frameworks whose conventions solve real repeated problems in the project.',
  'Watch for migration cost and architectural lock-in as the framework becomes more central.',
  'Distinguish between convenience today and maintainability over the products full lifecycle.',
]

const examples = [
  {
    id: 'fw98-example-frontend',
    title: 'Example: Frontend framework component route',
    area: 'Frontend',
    intro:
      'A frontend framework often defines where page code lives, how it is rendered, and how state and data are attached to that route or component.',
    whyFit:
      'This shows that a framework does not only expose rendering helpers. It also dictates structure and lifecycle.',
    code: `export default function DashboardPage() {
  return <section>Dashboard Content</section>
}`,
    takeaway:
      'A framework adds leverage when the route or component shape stays consistent across the whole application rather than being invented per file.',
  },
  {
    id: 'fw98-example-backend',
    title: 'Example: Backend framework controller',
    area: 'Backend',
    intro:
      'A backend framework usually provides an opinionated place for request handling, validation, dependency access, and response structure.',
    whyFit:
      'This reflects how frameworks standardize service construction instead of leaving every endpoint as an ad hoc function.',
    code: `class OrdersController {
  async list() {
    return this.ordersService.listOpenOrders()
  }
}`,
    takeaway:
      'The controller is valuable not because the class syntax is special, but because the framework gives it a predictable role in the request lifecycle.',
  },
  {
    id: 'fw98-example-mobile',
    title: 'Example: Mobile framework screen tree',
    area: 'Mobile',
    intro:
      'Mobile frameworks often define a component or widget tree that controls layout, navigation, and state across device-specific constraints.',
    whyFit:
      'This highlights how a framework becomes the shape of the interface rather than a small utility around it.',
    code: `Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Profile')),
    body: const ProfileView(),
  )
}`,
    takeaway:
      'Framework value in mobile often comes from owning layout, navigation, and lifecycle in one coherent model.',
  },
  {
    id: 'fw98-example-devops',
    title: 'Example: Infrastructure framework declaration',
    area: 'Cloud and DevOps',
    intro:
      'Infrastructure frameworks let teams declare environments and delivery concerns in code rather than configuring everything manually in consoles or scripts.',
    whyFit: 'This shows that framework thinking also applies outside application runtime code.',
    code: `resource "aws_s3_bucket" "assets" {
  bucket = "example-assets-prod"
}`,
    takeaway:
      'A framework for infrastructure is valuable when it makes environments reproducible, reviewable, and predictable across teams.',
  },
  {
    id: 'fw98-example-game',
    title: 'Example: Game engine update loop hook',
    area: 'Game',
    intro:
      'Game frameworks often define how update loops, scene systems, and rendering callbacks are structured in real-time software.',
    whyFit:
      'This captures the idea that a framework may own the entire runtime loop rather than just a few helper APIs.',
    code: `void Update() {
  transform.position += velocity * Time.deltaTime;
}`,
    takeaway:
      'When the framework owns the loop, understanding its lifecycle becomes essential to both correctness and performance.',
  },
]

const glossary = [
  {
    term: 'Framework',
    definition:
      'An opinionated software structure that defines conventions, lifecycle behavior, and extension patterns for building a category of systems.',
  },
  {
    term: 'Library',
    definition:
      'A reusable code package that provides capabilities without usually dictating the full control flow of the application.',
  },
  {
    term: 'Inversion of control',
    definition:
      'A framework pattern where the framework decides when user code runs instead of user code orchestrating every step directly.',
  },
  {
    term: 'Convention over configuration',
    definition:
      'A design philosophy where predictable defaults reduce the need for repeated manual setup.',
  },
  {
    term: 'Plugin',
    definition:
      'An extension unit that adds framework behavior through a defined integration mechanism.',
  },
  {
    term: 'Lifecycle',
    definition:
      'The sequence of phases through which framework-managed code executes, such as request handling, rendering, or update loops.',
  },
  {
    term: 'Scaffolding',
    definition:
      'Framework-provided generation or setup that creates a conventional project structure quickly.',
  },
  {
    term: 'Lock-in',
    definition:
      'The cost and difficulty of moving away from a framework once core architecture depends on its patterns.',
  },
  {
    term: 'Ecosystem',
    definition:
      'The community, tooling, plugins, documentation, and conventions surrounding a framework.',
  },
  {
    term: 'Adapter',
    definition:
      'A framework integration that connects the frameworks core model to a particular runtime, platform, or service.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function FrameworksPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Frameworks (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Frameworks',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  const frameworksHelpStyles = `
.fw98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.fw98-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.fw98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.fw98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.fw98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.fw98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.fw98-control:focus-visible,
.fw98-tab:focus-visible,
.fw98-toc-link:focus-visible,
.fw98-inline-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.fw98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.fw98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.fw98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.fw98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.fw98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.fw98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.fw98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fw98-toc-item + .fw98-toc-item {
  margin-top: 8px;
}

.fw98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.fw98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.fw98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.fw98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.fw98-section {
  margin: 0 0 22px;
}

.fw98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.fw98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.fw98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.fw98-content p,
.fw98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.fw98-content p {
  margin: 0 0 10px;
}

.fw98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.fw98-content li + li {
  margin-top: 4px;
}

.fw98-inline-link {
  color: #000080;
}

.fw98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.fw98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .fw98-main {
    grid-template-columns: 1fr;
  }

  .fw98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .fw98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fw98-content {
    padding: 14px 14px 18px;
  }
}
`

  return (
    <div className="fw98-help-page">
      <style>{frameworksHelpStyles}</style>
      <div className="fw98-window" role="presentation">
        <header className="fw98-titlebar">
          <span className="fw98-title">Frameworks</span>
          <div className="fw98-title-controls">
            <button
              className="fw98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="fw98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="fw98-tabs" role="tablist" aria-label="Frameworks Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`fw98-tab ${activeTab === tab.id ? 'fw98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fw98-main">
          <aside className="fw98-toc" aria-label="Table of contents">
            <h2 className="fw98-toc-title">Contents</h2>
            <ul className="fw98-toc-list">
              {(activeTab === 'big-picture'
                ? [
                    { id: 'fw98-overview', label: 'Overview' },
                    { id: 'fw98-why', label: 'Why It Matters' },
                    { id: 'fw98-history', label: 'Historical Context' },
                    { id: 'fw98-tracks', label: 'Framework Tracks' },
                    { id: 'fw98-themes', label: 'Big Picture Themes' },
                    { id: 'fw98-takeaways', label: 'Key Takeaways' },
                  ]
                : activeTab === 'core-concepts'
                  ? [
                      { id: 'fw98-signals', label: 'Topic Signals' },
                      { id: 'fw98-foundations', label: 'Foundations' },
                      { id: 'fw98-features', label: 'Framework Features' },
                      { id: 'fw98-runtime', label: 'Runtime and Operations' },
                      { id: 'fw98-uses', label: 'Ecosystem Uses' },
                      { id: 'fw98-compare', label: 'Compare and Contrast' },
                      { id: 'fw98-failures', label: 'Failure Modes' },
                      { id: 'fw98-checklist', label: 'Study Checklist' },
                    ]
                  : activeTab === 'examples'
                    ? examples.map((example) => ({ id: example.id, label: example.title }))
                    : [{ id: 'fw98-glossary', label: 'Terms' }]
              ).map((section) => (
                <li key={section.id} className="fw98-toc-item">
                  <a href={`#${section.id}`} className="fw98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="fw98-content">
            <h1 className="fw98-doc-title">Frameworks</h1>
            <p className="fw98-intro">
              This page is an overview of software frameworks as a broad ecosystem category. It
              explains why frameworks exist, how they impose structure, how their conventions affect
              the full software lifecycle, and how the child framework domains in this section
              connect to frontend, backend, mobile, data, cloud and DevOps, and game development.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="fw98-overview" className="fw98-section">
                  <h2 className="fw98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="fw98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="fw98-divider" />

                <section id="fw98-why" className="fw98-section">
                  <h2 className="fw98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="fw98-divider" />

                <section id="fw98-history" className="fw98-section">
                  <h2 className="fw98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="fw98-divider" />

                <section id="fw98-tracks" className="fw98-section">
                  <h2 className="fw98-heading">Framework Tracks</h2>
                  {frameworkTracks.map((track) => (
                    <div key={track.title}>
                      <h3 className="fw98-subheading">
                        <Link
                          to={`${FRAMEWORKS_BASE_ROUTE}/${slugifySegment(track.routeLabel)}`}
                          className="fw98-inline-link"
                        >
                          {track.title}
                        </Link>
                      </h3>
                      <p>{track.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="fw98-divider" />

                <section id="fw98-themes" className="fw98-section">
                  <h2 className="fw98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="fw98-divider" />

                <section id="fw98-takeaways" className="fw98-section">
                  <h2 className="fw98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="fw98-signals" className="fw98-section">
                  <h2 className="fw98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-foundations" className="fw98-section">
                  <h2 className="fw98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-features" className="fw98-section">
                  <h2 className="fw98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-runtime" className="fw98-section">
                  <h2 className="fw98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-uses" className="fw98-section">
                  <h2 className="fw98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-compare" className="fw98-section">
                  <h2 className="fw98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-failures" className="fw98-section">
                  <h2 className="fw98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="fw98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fw98-checklist" className="fw98-section">
                  <h2 className="fw98-heading">Study Checklist</h2>
                  <ul>
                    {studyChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="fw98-section">
                    <h2 className="fw98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="fw98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>
                      <strong>Takeaway:</strong> {example.takeaway}
                    </p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="fw98-glossary" className="fw98-section">
                <h2 className="fw98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
