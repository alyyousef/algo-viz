import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Godot is an open-source real-time engine and editor-centered development platform for 2D and 3D games. It is not just a scripting language host and not just a renderer. In practice, it combines the editor, scene authoring workflow, node system, animation tools, physics, UI tooling, input handling, export pipeline, and scripting environment inside one integrated stack.',
  'The most important practical distinction is that Godot is built around a scene tree made of nodes. Developers compose games by instancing scenes, attaching scripts to nodes, connecting signals, and organizing runtime behavior through the tree. That gives Godot a strong structural identity that feels different from component-centric engines like Unity and different from heavier C++ plus Blueprint production stacks like Unreal.',
  'Godot matters because it offers a comparatively approachable engine with strong 2D support, a coherent editor workflow, and an open-source ecosystem that appeals to teams who want visible engine behavior and fewer licensing or vendor-lock assumptions. Its tradeoffs are also real: teams need to evaluate whether its tooling, rendering maturity, console strategy, and ecosystem fit their production requirements.',
  'As of April 3, 2026, official stable Godot documentation is framed around the Godot 4.x generation and still centers on nodes, scenes, signals, GDScript, the scene tree, and engine-managed lifecycle callbacks. This page therefore explains Godot as a current scene-tree engine rather than as a Godot 3 era snapshot.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Godot is a full engine and editor environment. Rendering, input, animation, physics, UI, audio, scene authoring, scripting, and export workflows are all part of the same production stack.',
      'That means choosing Godot is not the same as choosing a small framework library. A team is choosing the editor, the node and scene model, the scripting environment, and the project organization style together.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Godot Matters',
    paragraphs: [
      'Godot matters because it gives developers a relatively transparent, learnable engine architecture. Nodes, scenes, and signals create a strong mental model for building behavior, and the open-source nature of the engine gives many teams confidence that the stack is inspectable and adaptable.',
      'It also matters because it is especially attractive for 2D work and for developers who want a modern integrated editor without necessarily adopting the weight or production culture of larger commercial engines.',
    ],
    bullets: [
      'Strong scene-tree mental model.',
      'Integrated editor and scripting workflow.',
      'Open-source engine and ecosystem.',
      'Good fit for many 2D and mid-scale game projects.',
    ],
  },
  {
    id: 'bp-scenes-nodes',
    title: 'Scenes and Nodes as the Core Model',
    paragraphs: [
      'Godot architecture is organized around nodes assembled into trees and saved as scenes. This is not a side detail. It is the engines central production and runtime model. A scene can represent a level, a player, a UI panel, a projectile, or a reusable subsystem. Nodes define structure and behavior inside that scene.',
      'This matters because reuse in Godot often means scene instancing, node composition, and signal-driven interaction rather than only class inheritance or purely code-defined runtime assembly.',
    ],
  },
  {
    id: 'bp-scripting-editor',
    title: 'Scripting and Editor Integration',
    paragraphs: [
      'Godot is deeply editor-integrated. Scripts are commonly attached directly to nodes, exported values are edited in the inspector, and signals can be connected visually or in code. This creates a workflow where code and editor data are tightly linked.',
      'That can be very productive, but it also means architecture should be deliberate. Developers still need clear ownership boundaries, scene organization, and naming discipline so the project does not become a web of implicit inspector wiring.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Godot Fits Best',
    paragraphs: [
      'Godot is strongest when a team wants an integrated engine with approachable structure, especially for 2D games, stylized 3D projects, gameplay-focused tools, and teams that value open-source alignment and visible engine behavior.',
      'It is less ideal when the project depends on highly specialized high-end rendering expectations, mature built-in enterprise-scale production pipelines, or platform strategies that the team cannot support through Godot current ecosystem constraints. Engine fit depends on project shape, not just on broad popularity.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-scene-tree',
    title: 'The Scene Tree',
    paragraphs: [
      'Godot documentation centers the scene tree as the core runtime structure. Nodes live in a hierarchy, inherit transforms and relationships from that hierarchy, and participate in lifecycle notifications as they enter or leave the tree.',
      'The practical lesson is that Godot architecture is spatial and structural. Parent-child relationships, scene ownership, node paths, and tree membership are not just editor concerns. They strongly influence runtime behavior, communication, and organization.',
    ],
  },
  {
    id: 'core-nodes-scenes',
    title: 'Nodes and Scenes',
    paragraphs: [
      'A node is a unit of structure or behavior, while a scene is a saved tree of nodes. This makes scenes extremely flexible. A scene can act like a level, an enemy template, a user-interface widget, or a reusable gameplay object.',
      'The key architectural insight is that Godot reuse often happens through scene instancing and composition rather than through one giant inheritance hierarchy. Teams usually get better results when they treat scenes as reusable building blocks instead of as one-off files.',
    ],
  },
  {
    id: 'core-gdscript-csharp',
    title: 'GDScript, C#, and Scripting Choices',
    paragraphs: [
      'Godot is strongly associated with GDScript, which is designed specifically for the engine and integrates naturally with nodes, signals, and editor workflows. Godot also supports C# for teams that prefer a statically typed general-purpose language and .NET tooling.',
      'The important engineering question is not which language is more prestigious. It is which language best fits the team, the codebase size, the need for engine-native ergonomics, and the surrounding tooling expectations. Godot is often most ergonomic in GDScript, but that does not make C# the wrong choice for every project.',
    ],
  },
  {
    id: 'core-signals',
    title: 'Signals and Decoupled Communication',
    paragraphs: [
      'Signals are one of Godot defining concepts. They provide an event-style communication mechanism that helps nodes react to changes without tightly hard-coding every dependency path. Buttons emit signals, timers emit signals, and custom gameplay scripts can define their own signals.',
      'Used well, signals reduce brittle direct coupling. Used carelessly, they can create hidden behavior that becomes hard to trace. The right balance is explicit signal ownership, clear naming, and avoiding a project where too much gameplay logic is scattered across loosely tracked signal connections.',
    ],
  },
  {
    id: 'core-lifecycle',
    title: 'Lifecycle Callbacks and Processing',
    paragraphs: [
      'Godot nodes participate in lifecycle callbacks such as `_ready`, `_process`, and `_physics_process`. These are analogous to engine-managed entry points for initialization and ongoing logic. The exact callback choice matters because Godot distinguishes between ordinary frame processing and physics-tick processing.',
      'The practical lesson is to place logic in the callback that matches its timing needs. Frame-driven visual behavior and physics-synchronized behavior should not be mixed casually. Godot gives the hooks, but teams must still structure update work intentionally.',
    ],
    bullets: [
      'Use `_ready` for initialization that depends on the node entering the tree.',
      'Use `_process` for frame-based logic tied to render updates.',
      'Use `_physics_process` for physics-synchronized logic.',
    ],
  },
  {
    id: 'core-autoloads',
    title: 'Autoloads and Global State',
    paragraphs: [
      'Godot supports autoloads, often used for singleton-like global services or persistent game-wide state. This can be very useful for save systems, settings, audio managers, scene navigation helpers, or cross-scene state.',
      'The engineering lesson is to use autoloads deliberately. They solve real coordination problems, but they can also become dumping grounds for unrelated global logic. A disciplined project treats autoloads as infrastructure, not as a replacement for architecture.',
    ],
  },
  {
    id: 'core-resources',
    title: 'Resources, Data, and Reuse',
    paragraphs: [
      'Beyond nodes and scenes, Godot also relies heavily on resources. Resources can store reusable data, materials, scripts, and configuration objects that are not themselves scene-tree nodes. This helps separate pure data from runtime object structure when used well.',
      'That distinction matters because not every reusable concept should be a scene. Godot projects become cleaner when developers distinguish scene-tree structure, script behavior, and data resources instead of forcing everything into one category.',
    ],
  },
  {
    id: 'core-2d-3d',
    title: '2D and 3D Systems',
    paragraphs: [
      'Godot supports both 2D and 3D workflows, but it is especially well regarded for 2D development. The node model, scene reuse, and editor workflow fit 2D game production naturally. Godot 4.x also continues to support modern 3D work, but project fit still depends on the rendering and tooling demands of the specific game.',
      'The practical point is to evaluate Godot by the actual needs of the project rather than by generic engine debates. For many 2D and stylized 3D projects, Godot can be a strong fit. For some high-end 3D production demands, teams may decide another engine aligns better with their pipeline.',
    ],
  },
  {
    id: 'core-editor-tooling',
    title: 'Editor Workflow and Tooling',
    paragraphs: [
      'Godot is highly editor-driven in day-to-day use. Developers inspect nodes, edit scene hierarchies, tune exported values, connect signals, configure input maps, preview animations, and export builds from the editor environment. That makes workflow speed one of the engines biggest advantages.',
      'Teams still need discipline, though. Editor convenience does not replace source control hygiene, scene naming, modularity, or architectural clarity. A Godot project becomes easier to maintain when the editor workflow is supported by clean conventions rather than used as an excuse for improvisation.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Thinking',
    paragraphs: [
      'Performance work in Godot spans script execution, node count, scene complexity, draw behavior, physics usage, signal churn, memory allocations, and the rendering characteristics of the target project. Like every engine, Godot can perform very well or poorly depending on the architecture built on top of it.',
      'The correct rule is to profile real bottlenecks. Node-heavy projects, overly dynamic scene trees, inefficient per-frame logic, and unnecessary allocations can all become visible. Performance should be measured in the context of the actual project rather than inferred from broad engine tribalism.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-node-script',
    title: 'A Simple Node Script in GDScript',
    description: [
      'A common Godot starting point is a script attached to a node that performs initialization in `_ready` and per-frame behavior in `_process`.',
    ],
    code: `extends Node2D

@export var speed := 120.0
var direction := Vector2.RIGHT

func _process(delta: float) -> void:
    position += direction * speed * delta`,
    notes: [
      'Scripts are commonly attached directly to scene nodes.',
      'Delta-based movement keeps behavior frame-rate aware.',
    ],
  },
  {
    id: 'examples-signal',
    title: 'Connecting and Emitting a Signal',
    description: [
      'Signals are often used to decouple gameplay events from the nodes that react to them.',
    ],
    code: `extends Node

signal health_changed(new_value: int)

var health := 100

func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health)`,
    notes: [
      'Custom signals help nodes communicate without tight direct coupling.',
      'Projects stay clearer when signal names are explicit and event ownership is obvious.',
    ],
  },
  {
    id: 'examples-ready',
    title: 'Referencing Child Nodes',
    description: [
      'Child-node references are a common Godot pattern because scene structure is central to runtime behavior.',
    ],
    code: `extends CharacterBody2D

@onready var sprite: Sprite2D = $Sprite2D
@onready var label: Label = $CanvasLayer/Label

func _ready() -> void:
    label.text = "Ready"`,
    notes: [
      '`@onready` is useful when references depend on the node being in the scene tree.',
      'Scene-path clarity matters because node hierarchy is part of the architecture.',
    ],
  },
  {
    id: 'examples-autoload',
    title: 'A Simple Autoload-Style Global',
    description: [
      'Autoloads are commonly used for global services such as settings, saves, or scene navigation helpers.',
    ],
    code: `extends Node

var coins := 0

func add_coins(amount: int) -> void:
    coins += amount`,
    notes: [
      'This kind of script is often registered as an autoload in project settings.',
      'Global state should stay narrowly scoped and intentional.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Godot Terms',
    terms: [
      {
        term: 'Godot',
        definition:
          'An open-source game engine centered on nodes, scenes, and an integrated editor workflow.',
      },
      {
        term: 'Node',
        definition:
          'A fundamental building block in Godot that participates in the scene tree.',
      },
      {
        term: 'Scene',
        definition:
          'A saved tree of nodes used as a reusable or loadable unit of game structure.',
      },
      {
        term: 'Scene tree',
        definition:
          'The runtime hierarchy of nodes that structures Godot behavior and ownership.',
      },
      {
        term: 'GDScript',
        definition:
          'Godots engine-focused scripting language designed to integrate naturally with nodes and scenes.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture Terms',
    terms: [
      {
        term: 'Signal',
        definition:
          'An event-style communication mechanism used by nodes to notify interested listeners.',
      },
      {
        term: 'Autoload',
        definition:
          'A globally available script or scene often used for persistent services or shared state.',
      },
      {
        term: 'Resource',
        definition:
          'A reusable non-node data or asset object used throughout Godot projects.',
      },
      {
        term: 'NodePath',
        definition:
          'A path-like identifier used to reference nodes in the scene tree.',
      },
      {
        term: 'Exported property',
        definition:
          'A script property exposed to the editor inspector for configuration.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow and Runtime Terms',
    terms: [
      {
        term: '_ready',
        definition:
          'A common callback invoked when a node enters the active scene tree and is ready for initialization logic.',
      },
      {
        term: '_process',
        definition:
          'A per-frame callback used for render-frame-driven logic.',
      },
      {
        term: '_physics_process',
        definition:
          'A physics-tick callback used for logic that should stay synchronized with physics updates.',
      },
      {
        term: 'Instancing',
        definition:
          'Creating a reusable scene as an active runtime object or child in another scene.',
      },
      {
        term: 'Inspector',
        definition:
          'The editor panel used to configure node properties, resources, and exported script values.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-scenes-nodes', label: 'Scenes and Nodes' },
    { id: 'bp-scripting-editor', label: 'Scripting and Editor' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
  ],
  'core-concepts': [
    { id: 'core-scene-tree', label: 'Scene Tree' },
    { id: 'core-nodes-scenes', label: 'Nodes and Scenes' },
    { id: 'core-gdscript-csharp', label: 'GDScript and C#' },
    { id: 'core-signals', label: 'Signals' },
    { id: 'core-lifecycle', label: 'Lifecycle Callbacks' },
    { id: 'core-autoloads', label: 'Autoloads' },
    { id: 'core-resources', label: 'Resources' },
    { id: 'core-2d-3d', label: '2D and 3D' },
    { id: 'core-editor-tooling', label: 'Editor Tooling' },
    { id: 'core-performance', label: 'Performance' },
  ],
  examples: [
    { id: 'examples-node-script', label: 'Node Script' },
    { id: 'examples-signal', label: 'Signal' },
    { id: 'examples-ready', label: 'Child References' },
    { id: 'examples-autoload', label: 'Autoload' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-workflow', label: 'Workflow Terms' },
  ],
}

const pageStyles = `
.godot-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.godot-help-window {
  width: 100%;
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

.godot-help-titlebar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.godot-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.godot-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.godot-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.godot-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.godot-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.godot-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.godot-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.godot-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.godot-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.godot-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.godot-help-toc-item {
  margin: 0 0 8px;
}

.godot-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.godot-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.godot-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.godot-help-section {
  margin: 0 0 20px;
}

.godot-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.godot-help-content p,
.godot-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.godot-help-content p {
  margin: 0 0 10px;
}

.godot-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.godot-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.godot-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.godot-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .godot-help-main {
    grid-template-columns: 1fr;
  }

  .godot-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="godot-help-section">
      <h2 className="godot-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="godot-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="godot-help-section">
      <h2 className="godot-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="godot-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="godot-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="godot-help-section">
      <h2 className="godot-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="godot-help-divider" />}
    </section>
  )
}

export default function GodotPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Godot (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Godot',
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

  return (
    <div className="godot-help-page">
      <style>{pageStyles}</style>
      <div className="godot-help-window" role="presentation">
        <header className="godot-help-titlebar">
          <span className="godot-help-titletext">Godot</span>
          <div className="godot-help-controls">
            <button className="godot-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="godot-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="godot-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`godot-help-tab ${activeTab === tab.id ? 'godot-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="godot-help-main">
          <aside className="godot-help-toc" aria-label="Table of contents">
            <h2 className="godot-help-toc-title">Contents</h2>
            <ul className="godot-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="godot-help-toc-item">
                  <a href={`#${section.id}`} className="godot-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="godot-help-content">
            <h1 className="godot-help-doc-title">Godot</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
