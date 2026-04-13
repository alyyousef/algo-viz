import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Unity is a real-time engine and editor-centered development platform used for games and other interactive applications. It is not only a graphics renderer and not only a scripting API. In practice, Unity combines the editor, asset pipeline, scene tools, animation systems, physics, UI frameworks, audio, packaging, platform deployment, and a large C#-based scripting environment in one production stack.',
  'The practical mental model is editor-first. Teams work inside the Unity Editor, assemble scenes, import assets, attach components to GameObjects, write C# scripts, configure prefabs, and then build to their target platforms. That workflow is different from starting with a mostly empty framework where the runtime shape is defined almost entirely by user code.',
  'Unity matters because it offers a relatively approachable production environment with broad platform reach, a strong asset-store and package ecosystem, and a component-oriented model that many teams can learn quickly. Its tradeoffs are also real: large projects can become hard to govern without architectural discipline, and Unity supports multiple overlapping systems that require deliberate choices rather than passive defaults.',
  'As of April 3, 2026, current Unity documentation is centered on Unity 6.x era concepts such as GameObjects and components, the modern package-based ecosystem, Scriptable Render Pipelines like URP and HDRP, and optional data-oriented technology paths such as Entities. This page therefore frames Unity as a current engine rather than a historical Unity 5 or early-2020s snapshot.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Unity is a full development environment for real-time interactive software. Rendering, input, animation, physics, UI, audio, asset import, scene editing, build tooling, and deployment all sit inside one connected workflow.',
      'That means adopting Unity is more than adopting a graphics library or a scripting runtime. A team is also adopting the editor, the scene and prefab model, the package ecosystem, and a particular way of organizing game objects and project assets.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Unity Matters',
    paragraphs: [
      'Unity matters because it lowers the barrier to shipping across many platforms while still supporting serious production work. Small teams can get productive quickly, but larger teams can also build substantial pipelines around the editor, asset workflows, custom tools, and reusable gameplay architecture.',
      'Its importance also comes from accessibility. The GameObject and component model is easier to approach than some heavier engine architectures, which is one reason Unity is common in education, indie development, mobile games, mid-scale 3D production, simulation, and XR projects.',
    ],
    bullets: [
      'Component-oriented architecture is approachable and flexible.',
      'C# scripting is widely known and productive.',
      'Unity Editor provides a strong visual workflow for scenes and assets.',
      'Platform reach and package ecosystem are major practical advantages.',
    ],
  },
  {
    id: 'bp-gameobjects-components',
    title: 'GameObjects and Components',
    paragraphs: [
      'The heart of classic Unity architecture is the GameObject plus Component model. A GameObject is a container in a scene, and behavior or capabilities are added by attaching components such as transforms, colliders, rigidbodies, renderers, audio sources, or user scripts.',
      'This matters because Unity architecture is largely compositional. Instead of giant inheritance chains for everything, teams often build behavior by combining reusable components and editor configuration. That flexibility is a strength, but without conventions it can also lead to scattered logic.',
    ],
  },
  {
    id: 'bp-render-pipelines',
    title: 'Render Pipelines and Modern Unity',
    paragraphs: [
      'Modern Unity discussion is strongly influenced by render-pipeline choices. Current Unity documentation distinguishes the Built-in Render Pipeline from Scriptable Render Pipeline options such as URP and HDRP. Those choices affect lighting workflows, shader tooling, performance strategy, platform targets, and visual ambition.',
      'This means there is no single Unity rendering story that fits every project. Teams need to select the render path that matches the product instead of assuming the engine has one universal default architecture for visuals.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Unity Fits Best',
    paragraphs: [
      'Unity is strongest when a team wants broad platform reach, approachable tooling, a component-based workflow, fast iteration in C#, and an engine that works well across 2D, 3D, mobile, XR, and many mid-scale real-time applications.',
      'It is less ideal when the project depends on a rendering-first high-end pipeline that matches other engines more naturally, or when the team wants a highly opinionated architecture chosen for them. Unity is flexible, and flexibility is helpful only when the team is disciplined enough to use it well.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-gameobject-component',
    title: 'GameObjects and Components',
    paragraphs: [
      'Unity documentation presents every object in a scene as a GameObject, with functionality attached by components. This is one of the defining concepts of the engine. The Transform component gives every GameObject position, rotation, and scale, and additional components add rendering, physics, audio, input hooks, and custom gameplay behavior.',
      'The practical lesson is that Unity codebases usually grow through composition. A player object might combine movement logic, colliders, rigidbody physics, health, animation hooks, and UI references through several components rather than through one giant class that tries to own everything.',
    ],
  },
  {
    id: 'core-monobehaviour',
    title: 'MonoBehaviour and Script Lifecycle',
    paragraphs: [
      'Most classic Unity gameplay scripting starts with MonoBehaviour. Scripts derived from MonoBehaviour can be attached to GameObjects, participate in engine lifecycle methods such as Awake, Start, Update, FixedUpdate, and OnEnable, and interact with other components in the scene.',
      'The real architectural issue is not memorizing callback names. It is understanding when code should run, what assumptions are safe during initialization, what belongs in frame updates versus physics updates, and how to avoid hidden coupling between many scripts that all depend on scene timing.',
    ],
    bullets: [
      'Use lifecycle methods intentionally rather than filling every script with many callbacks.',
      'Keep per-frame work focused because Update-driven sprawl hurts clarity and performance.',
      'Separate scene orchestration from reusable domain logic where possible.',
    ],
  },
  {
    id: 'core-scenes-prefabs',
    title: 'Scenes and Prefabs',
    paragraphs: [
      'Scenes represent collections of GameObjects and content that form levels, menus, or runtime spaces. Prefabs are reusable GameObject templates that can be instantiated repeatedly and edited centrally. Together, scenes and prefabs form much of Unity production workflow.',
      'This matters because large Unity projects are heavily asset and editor driven. Project organization, prefab boundaries, variant strategy, scene loading structure, and dependency discipline often have as much impact on maintainability as C# class design does.',
    ],
  },
  {
    id: 'core-scriptableobjects',
    title: 'ScriptableObjects and Data Architecture',
    paragraphs: [
      'ScriptableObject is one of the most useful Unity concepts for keeping data and configuration out of scene-bound MonoBehaviour state. ScriptableObjects can store shared data assets, designer-editable configuration, tables, item definitions, enemy stats, and other project data that should exist as assets rather than as duplicated scene instances.',
      'This is an important architectural pressure valve. Teams that put too much logic and too much data directly into scene instances often end up with fragile inspector wiring and difficult duplication problems. ScriptableObjects help move projects toward clearer data ownership.',
    ],
  },
  {
    id: 'core-serialization-inspector',
    title: 'Serialization and the Inspector',
    paragraphs: [
      'Unity development is tightly connected to serialization and inspector-driven workflows. Fields can be serialized and exposed for editing in the inspector, references can be assigned visually, and many runtime objects are configured through editor state rather than only code constructors.',
      'That is productive, but it changes how developers should think. Correctness depends not only on code but also on scene data, prefab state, serialized fields, and asset references. Debugging Unity often means checking both the C# source and the editor data model.',
    ],
  },
  {
    id: 'core-animation-ui-physics',
    title: 'Animation, UI, Physics, and Other Major Systems',
    paragraphs: [
      'Unity includes major subsystems for animation, UI, physics, audio, navigation, and more. A real production project usually coordinates several of them at once. Character behavior may involve animation state, rigidbody or character-controller motion, UI feedback, sound triggers, and scene event logic simultaneously.',
      'The key lesson is that game behavior is usually systemic. Teams should avoid treating every feature as an isolated script. The hard part is often how systems interact, not how each subsystem works individually.',
    ],
  },
  {
    id: 'core-render-pipelines',
    title: 'Built-in, URP, and HDRP',
    paragraphs: [
      'Current Unity documentation distinguishes the Built-in Render Pipeline from the Scriptable Render Pipeline family, especially Universal Render Pipeline and High Definition Render Pipeline. These are not superficial checkboxes. They define major parts of the rendering stack, available features, shader workflows, platform fit, and production assumptions.',
      'Teams need to choose deliberately. URP is often favored where broad device coverage and performance efficiency matter, while HDRP is aimed at higher-end visual fidelity targets. A project that treats render-pipeline choice as an afterthought usually pays for that later.',
    ],
  },
  {
    id: 'core-packages-ecosystem',
    title: 'Packages and the Unity Ecosystem',
    paragraphs: [
      'Modern Unity is heavily package based. Important capabilities can be delivered through official packages, sample content, add-ons, and external ecosystem tools. This makes Unity flexible, but it also means project architecture includes package management decisions, version compatibility, and long-term maintenance choices.',
      'Healthy Unity teams avoid importing packages casually. Every dependency affects upgrade safety, project size, editor complexity, and support burden. Package discipline is part of engineering discipline.',
    ],
  },
  {
    id: 'core-dots-entities',
    title: 'DOTS, ECS, and Data-Oriented Paths',
    paragraphs: [
      'Unity also offers data-oriented technology paths, especially Entities-based ECS workflows, for projects that benefit from a data-oriented architecture and high-scale simulation patterns. This is important because modern Unity is not limited to only classic MonoBehaviour architecture, even though the classic model remains central for many teams.',
      'The practical lesson is to treat ECS as a deliberate architectural choice, not as a fashionable default. It can be powerful for the right problems, but it adds conceptual cost. Teams should adopt it because their data and performance needs justify it, not because they assume newer always means better.',
    ],
  },
  {
    id: 'core-tooling-builds',
    title: 'Editor Tooling, Profiling, and Builds',
    paragraphs: [
      'The Unity Editor is where projects are assembled, debugged, profiled, and prepared for deployment. Inspectors, scene view, prefab editing, import settings, build configuration, and profiling tools all shape daily development work. Unity is therefore not just a runtime API. It is also a tooling environment.',
      'This matters because successful Unity teams invest in editor workflows, profiling habits, and build reproducibility. They do not treat the editor as a black box around C# scripts. Custom inspectors, validation tools, clean project structure, and disciplined build setup often pay back heavily over time.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Thinking',
    paragraphs: [
      'Unity performance work spans scripting overhead, update frequency, allocations and garbage collection, batching, draw calls, shader cost, asset loading, animation cost, physics configuration, and render-pipeline choices. There is no single Unity performance rule that solves everything.',
      'The correct mindset is profiling first. Many Unity problems come from unnecessary per-frame work, overconnected object graphs, excessive instantiation patterns, or expensive rendering choices. Performance should be measured in the context of the specific project rather than argued from engine reputation alone.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-monobehaviour',
    title: 'A Basic MonoBehaviour Script',
    description: [
      'This is the common Unity starting point: a C# script attached to a GameObject that participates in the engine lifecycle.',
    ],
    code: `using UnityEngine;

public class Rotator : MonoBehaviour
{
    [SerializeField] private float speed = 90f;

    private void Update()
    {
        transform.Rotate(0f, speed * Time.deltaTime, 0f);
    }
}`,
    notes: [
      'MonoBehaviour scripts are attached to GameObjects.',
      'SerializeField keeps data editable in the inspector without making it public.',
      'Update is convenient, but teams should avoid filling large projects with unnecessary per-frame logic.',
    ],
  },
  {
    id: 'examples-component-access',
    title: 'Working with Other Components',
    description: [
      'Unity behavior is often composed by reading or controlling other components on the same GameObject or related objects.',
    ],
    code: `using UnityEngine;

public class JumpController : MonoBehaviour
{
    private Rigidbody body;

    private void Awake()
    {
        body = GetComponent<Rigidbody>();
    }

    public void Jump(float force)
    {
        body.AddForce(Vector3.up * force, ForceMode.Impulse);
    }
}`,
    notes: [
      'Composition through components is a normal Unity architecture pattern.',
      'Awake is commonly used for reference initialization before gameplay starts.',
    ],
  },
  {
    id: 'examples-scriptableobject',
    title: 'A ScriptableObject Data Asset',
    description: [
      'ScriptableObjects are often used to keep reusable configuration data out of scene-only objects.',
    ],
    code: `using UnityEngine;

[CreateAssetMenu(menuName = "Data/Weapon Definition")]
public class WeaponDefinition : ScriptableObject
{
    public string weaponName;
    public float damage;
    public float cooldown;
}`,
    notes: [
      'This creates an asset type that designers can author in the editor.',
      'Using assets for shared configuration often scales better than duplicating values across many prefabs or scenes.',
    ],
  },
  {
    id: 'examples-prefab-instantiate',
    title: 'Instantiating a Prefab',
    description: [
      'Prefab instantiation is one of the most common Unity runtime patterns for enemies, effects, projectiles, and UI objects.',
    ],
    code: `using UnityEngine;

public class Spawner : MonoBehaviour
{
    [SerializeField] private GameObject enemyPrefab;
    [SerializeField] private Transform spawnPoint;

    public void Spawn()
    {
        Instantiate(enemyPrefab, spawnPoint.position, spawnPoint.rotation);
    }
}`,
    notes: [
      'Prefabs are reusable templates, not just copied scene objects.',
      'Instantiation patterns should be paired with lifecycle and pooling decisions in larger projects.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Unity Terms',
    terms: [
      {
        term: 'Unity',
        definition:
          'A real-time engine and editor-centered platform for games and other interactive applications.',
      },
      {
        term: 'GameObject',
        definition: 'A Unity scene object that acts as a container for components.',
      },
      {
        term: 'Component',
        definition: 'A modular unit of behavior or capability attached to a GameObject.',
      },
      {
        term: 'MonoBehaviour',
        definition:
          'The base class most commonly used for classic Unity gameplay scripts attached to GameObjects.',
      },
      {
        term: 'Transform',
        definition: 'The core component that gives every GameObject position, rotation, and scale.',
      },
    ],
  },
  {
    id: 'glossary-assets',
    title: 'Scene and Asset Terms',
    terms: [
      {
        term: 'Scene',
        definition:
          'A collection of GameObjects and content that forms a level, menu, or runtime space.',
      },
      {
        term: 'Prefab',
        definition: 'A reusable GameObject template that can be instantiated and edited centrally.',
      },
      {
        term: 'ScriptableObject',
        definition:
          'A Unity asset type commonly used for shared configuration and data that should not live only in scenes.',
      },
      {
        term: 'Inspector',
        definition:
          'The Unity editor panel used to view and edit serialized object data and component settings.',
      },
      {
        term: 'SerializeField',
        definition:
          'A Unity attribute that allows a non-public field to be serialized and edited in the inspector.',
      },
    ],
  },
  {
    id: 'glossary-rendering',
    title: 'Rendering and Modern Architecture Terms',
    terms: [
      {
        term: 'URP',
        definition:
          'Universal Render Pipeline, a Scriptable Render Pipeline option aimed at broad platform coverage and efficiency.',
      },
      {
        term: 'HDRP',
        definition:
          'High Definition Render Pipeline, a Scriptable Render Pipeline option aimed at higher-end visual fidelity.',
      },
      {
        term: 'SRP',
        definition:
          'Scriptable Render Pipeline, the Unity rendering architecture family that includes URP and HDRP.',
      },
      {
        term: 'Entities',
        definition:
          'Unity data-oriented ECS technology used for certain large-scale or performance-sensitive architectures.',
      },
      {
        term: 'Profiler',
        definition:
          'The Unity tooling used to measure CPU, rendering, memory, and other runtime behavior.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-gameobjects-components', label: 'GameObjects and Components' },
    { id: 'bp-render-pipelines', label: 'Render Pipelines' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
  ],
  'core-concepts': [
    { id: 'core-gameobject-component', label: 'GameObjects and Components' },
    { id: 'core-monobehaviour', label: 'MonoBehaviour' },
    { id: 'core-scenes-prefabs', label: 'Scenes and Prefabs' },
    { id: 'core-scriptableobjects', label: 'ScriptableObjects' },
    { id: 'core-serialization-inspector', label: 'Serialization and Inspector' },
    { id: 'core-animation-ui-physics', label: 'Major Systems' },
    { id: 'core-render-pipelines', label: 'Render Pipelines' },
    { id: 'core-packages-ecosystem', label: 'Packages' },
    { id: 'core-dots-entities', label: 'DOTS and Entities' },
    { id: 'core-tooling-builds', label: 'Tooling and Builds' },
    { id: 'core-performance', label: 'Performance' },
  ],
  examples: [
    { id: 'examples-monobehaviour', label: 'MonoBehaviour' },
    { id: 'examples-component-access', label: 'Components' },
    { id: 'examples-scriptableobject', label: 'ScriptableObject' },
    { id: 'examples-prefab-instantiate', label: 'Prefab Instantiate' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-assets', label: 'Scene and Asset Terms' },
    { id: 'glossary-rendering', label: 'Rendering Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="bin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

export default function UnityPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Unity',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Unity"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Unity</h1>
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
    </TopicPageShell>
  )
}
