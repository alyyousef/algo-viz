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
  'MonoGame is a C# game-development framework descended from the XNA style of development. It is not a full editor-centered engine in the Unity or Unreal sense. The most important practical distinction is that MonoGame is code-first. Developers usually build the game loop, scene flow, rendering architecture, content organization, and tooling conventions themselves instead of relying on a large built-in visual editor and an opinionated production pipeline.',
  'That code-first nature is MonoGame main attraction. It gives developers direct control over application structure while still providing a substantial framework layer for graphics, input, audio, content loading, timing, and platform abstractions. The result sits between low-level graphics programming and full game engines: lower-level and more hands-on than Unity, but far more productive than starting from raw graphics APIs.',
  'MonoGame matters because it remains one of the clearest ways to build 2D or lightweight 3D games in idiomatic C# without adopting an editor-heavy engine architecture. It is especially attractive for developers who want to understand the game loop, rendering flow, and content management directly rather than hiding those concerns behind large engine systems.',
  'As of April 3, 2026, the official MonoGame documentation still centers on the classic `Game`-class model, `GraphicsDeviceManager`, `ContentManager`, `SpriteBatch`, MGCB content-pipeline workflows, and API reference pages built around the MonoGame 3.8.x line. This page therefore explains MonoGame as a current maintained framework, but it treats it as a framework-first environment rather than a feature-maximal engine.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'MonoGame is a framework for writing games in C#. It provides a windowed application model, timing and update hooks, graphics-device access, sprite rendering utilities, input APIs, audio support, and content-loading patterns.',
      'The key difference from a full engine is that MonoGame gives you building blocks, not a giant production environment. You are expected to assemble architecture yourself: scene systems, entity models, UI strategy, animation handling, collision structure, level formats, and editor tooling are mostly your responsibility unless you bring in additional libraries or write them yourself.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why MonoGame Matters',
    paragraphs: [
      'MonoGame matters because it preserves a clean, understandable game-programming model. The developer owns the game loop, update timing, drawing order, asset loading decisions, and most architectural boundaries. That makes it excellent for learning how real-time games work and for teams that want framework control without starting from raw graphics APIs.',
      'It also matters because C# is productive, widely known, and expressive enough for both hobby and professional game code. MonoGame gives C# developers a straightforward path into game architecture without requiring them to adopt a fully editor-driven engine.',
    ],
    bullets: [
      'Code-first game architecture with few hidden engine layers.',
      'C# productivity without an editor-heavy engine stack.',
      'Good fit for 2D games and custom lightweight engines.',
      'Clear ownership of the main loop, rendering flow, and content organization.',
    ],
  },
  {
    id: 'bp-framework-not-engine',
    title: 'Framework, Not Full Engine',
    paragraphs: [
      'This distinction matters a lot. MonoGame does not try to be Unity or Unreal. It does not come with a large scene editor, prefab workflow, built-in visual scripting, or a giant out-of-the-box gameplay architecture. That is not a flaw; it is part of the product definition.',
      'The consequence is freedom paired with responsibility. You get fewer constraints and less engine overhead, but you also inherit more architectural work. MonoGame is strongest when that tradeoff is something the team actually wants.',
    ],
  },
  {
    id: 'bp-xna-lineage',
    title: 'XNA Lineage',
    paragraphs: [
      'MonoGame is often understood through its XNA lineage. The `Game` class, `Update`, `Draw`, `SpriteBatch`, content pipeline concepts, and much of the API shape reflect that heritage. This is one reason the framework often feels simple and direct compared with later editor-centric engines.',
      'That heritage also shapes expectations. MonoGame developers often think in terms of handcrafted game architecture rather than built-in engine workflows. That style remains one of the frameworks core identities.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where MonoGame Fits Best',
    paragraphs: [
      'MonoGame is strongest for developers who want control, a small conceptual core, and the ability to build their own engine-like layers in C#. It is especially well suited to 2D games, custom rendering approaches, educational projects, jam projects for experienced programmers, and studios that prefer code ownership over editor-driven production.',
      'It is less ideal when the project depends on heavy built-in tooling, large designer-facing workflows, advanced integrated engine systems, or an art pipeline that expects a large editor ecosystem out of the box. MonoGame can be extended, but it does not start from the same baseline as a full engine.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-game-class',
    title: 'The Game Class and Main Loop',
    paragraphs: [
      'The `Game` class is the center of a typical MonoGame application. The framework calls lifecycle methods such as `Initialize`, `LoadContent`, `Update`, and `Draw`, and the developer places game logic into those hooks. This model is intentionally direct: update game state, then render the current state.',
      'The practical architectural lesson is that MonoGame makes the game loop visible. Developers are expected to reason about frame updates, timing, order of operations, and what work belongs in load time versus per-frame execution.',
    ],
  },
  {
    id: 'core-graphics-device',
    title: 'GraphicsDeviceManager and the Graphics Device',
    paragraphs: [
      'A typical MonoGame project uses `GraphicsDeviceManager` to configure graphics behavior for the `Game`. This includes presentation settings such as preferred back-buffer size and other display-related configuration. The `GraphicsDevice` itself is the lower-level graphics context the game uses during rendering.',
      'This matters because MonoGame sits closer to rendering details than full engines do. Developers usually think more explicitly about clear color, render targets, viewport behavior, draw order, and graphics state changes. The framework gives structure, but it does not hide graphics concepts behind a large editor layer.',
    ],
  },
  {
    id: 'core-spritebatch',
    title: 'SpriteBatch and 2D Rendering',
    paragraphs: [
      'For 2D work, `SpriteBatch` is one of the best-known MonoGame classes. It batches sprite and text draw calls through a `Begin` and `End` pattern and is central to many MonoGame rendering pipelines. This is why so much MonoGame learning material starts with drawing textures and fonts through `SpriteBatch`.',
      'The important point is that `SpriteBatch` is useful but not a complete rendering architecture. Real games still need camera transforms, layering strategy, UI draw ordering, animation state, asset organization, and often custom batching or render-target techniques as complexity grows.',
    ],
  },
  {
    id: 'core-content-pipeline',
    title: 'ContentManager and the Content Pipeline',
    paragraphs: [
      'MonoGame applications commonly load assets through `ContentManager`, while content processing is often managed through the MonoGame content pipeline and MGCB tooling. This separates raw source assets from processed runtime content and gives the framework a structured loading story.',
      'The practical lesson is that asset loading is not an afterthought. Developers need naming conventions, content folder discipline, build-step clarity, and explicit loading ownership. MonoGame is smaller than a full engine, but it still rewards teams that take content management seriously.',
    ],
  },
  {
    id: 'core-input-audio',
    title: 'Input, Audio, and Platform Abstractions',
    paragraphs: [
      'MonoGame provides framework APIs for keyboard, mouse, gamepad, touch where relevant, and audio playback. These APIs are part of why MonoGame is productive: the developer does not need to build every platform abstraction from raw OS APIs.',
      'Still, the framework expects the game architecture around those APIs to be written by the developer. Input mapping, rebinding, action abstraction, audio-mixing strategy, and state-driven sound behavior usually live in project code rather than in a large built-in editor system.',
    ],
  },
  {
    id: 'core-time-and-state',
    title: 'GameTime, Update Discipline, and State Management',
    paragraphs: [
      'MonoGame provides `GameTime` in update and draw methods so developers can reason about elapsed time and frame progression. This is central to movement, animation timing, cooldowns, transitions, and many other real-time behaviors.',
      'Because MonoGame leaves architecture largely to the project, teams need discipline here. State management is not solved by the framework. Menus, gameplay screens, pause logic, scene transitions, entity lifetimes, and simulation rules must be structured intentionally instead of growing as ad hoc conditionals inside one massive `Game1` file.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'You Build the Architecture',
    paragraphs: [
      'This is one of the biggest MonoGame concepts to internalize: the framework does not prescribe a full gameplay architecture. There is no single official scene graph, ECS, prefab model, or editor-time object model that defines how every project should be built.',
      'That freedom is powerful, but it means teams need to decide how to represent entities, scenes, collisions, cameras, UI layers, animation playback, save data, and serialization. MonoGame rewards architectural clarity because there are fewer built-in engine guardrails to lean on.',
    ],
    bullets: [
      'Define screen or scene management explicitly.',
      'Keep rendering concerns separate from gameplay state where practical.',
      'Avoid letting `Game1` become the entire game architecture.',
      'Build reusable engine-like layers only when the project actually needs them.',
    ],
  },
  {
    id: 'core-2d-3d-scope',
    title: '2D Strength and 3D Reality',
    paragraphs: [
      'MonoGame is often associated with 2D games because the framework is especially approachable there and `SpriteBatch` makes 2D rendering productive. That said, MonoGame is not limited to 2D. It also exposes lower-level graphics concepts that can support 3D rendering.',
      'The practical difference is workload. A simple 2D project can become productive quickly. A serious 3D project usually demands much more custom graphics and tooling work than it would in a large engine. Teams should choose MonoGame because they want that control, not because they expect a feature parity baseline with editor-heavy 3D engines.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Project Workflow',
    paragraphs: [
      'MonoGame tooling is lighter than a full engine editor stack. Projects typically live comfortably in standard C# development environments, with source control, build tooling, and code review workflows that look more like ordinary application development than like giant proprietary editor pipelines.',
      'That can be a strategic advantage for teams that want predictable code-centric workflows. It can also be a limitation when designers, artists, or level builders need rich in-engine authoring tools that the team is not prepared to build or integrate separately.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Thinking',
    paragraphs: [
      'MonoGame performance work usually centers on per-frame allocations, draw call behavior, texture usage, render-state changes, content-loading patterns, update cost, and any custom architecture built on top of the framework. Because the framework is relatively thin, performance bottlenecks are often easier to reason about than in very large engines.',
      'That does not mean performance is automatic. A code-first framework still punishes careless architecture. Excessive allocations, bad batching, large update loops, unnecessary asset churn, and poorly designed data structures can all become visible quickly.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-game-class',
    title: 'A Minimal Game Class Shape',
    description: [
      'This shows the standard MonoGame flow: initialize framework objects, load content, update state, and draw the current frame.',
    ],
    code: `using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

public class Game1 : Game
{
    private GraphicsDeviceManager graphics;
    private SpriteBatch spriteBatch;

    public Game1()
    {
        graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
    }

    protected override void LoadContent()
    {
        spriteBatch = new SpriteBatch(GraphicsDevice);
    }

    protected override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.CornflowerBlue);
        base.Draw(gameTime);
    }
}`,
    notes: [
      'The `Game` subclass is the center of the normal MonoGame application lifecycle.',
      'This model keeps update and draw flow explicit rather than hidden behind a large engine runtime.',
    ],
  },
  {
    id: 'examples-spritebatch',
    title: 'Drawing with SpriteBatch',
    description: [
      'For 2D games, drawing a texture through `SpriteBatch` is one of the most common MonoGame patterns.',
    ],
    code: `private Texture2D playerTexture;
private Vector2 playerPosition = new(100f, 120f);

protected override void LoadContent()
{
    spriteBatch = new SpriteBatch(GraphicsDevice);
    playerTexture = Content.Load<Texture2D>("player");
}

protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);

    spriteBatch.Begin();
    spriteBatch.Draw(playerTexture, playerPosition, Color.White);
    spriteBatch.End();

    base.Draw(gameTime);
}`,
    notes: [
      '`Begin` and `End` define a sprite-batch pass.',
      'Real projects usually add layering, transforms, camera logic, and UI ordering on top of this basic pattern.',
    ],
  },
  {
    id: 'examples-gametime',
    title: 'Using GameTime for Movement',
    description: [
      'Frame-rate-independent movement usually depends on elapsed time from `GameTime` rather than fixed pixel jumps per frame.',
    ],
    code: `private Vector2 position;
private float speed = 180f;

protected override void Update(GameTime gameTime)
{
    float dt = (float)gameTime.ElapsedGameTime.TotalSeconds;
    position.X += speed * dt;

    base.Update(gameTime);
}`,
    notes: [
      'Using elapsed time helps movement remain consistent across varying frame rates.',
      'Time-based logic is one of the most fundamental real-time programming habits in MonoGame.',
    ],
  },
  {
    id: 'examples-content-load',
    title: 'Loading Content Through ContentManager',
    description: [
      'MonoGame commonly loads processed assets through the content manager using string-based asset names.',
    ],
    code: `private SpriteFont font;
private SoundEffect clickSound;

protected override void LoadContent()
{
    spriteBatch = new SpriteBatch(GraphicsDevice);
    font = Content.Load<SpriteFont>("UIFont");
    clickSound = Content.Load<SoundEffect>("click");
}`,
    notes: [
      'The asset name refers to processed content known to the content pipeline.',
      'Teams benefit from strict naming and folder conventions because asset loading is explicit.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core MonoGame Terms',
    terms: [
      {
        term: 'MonoGame',
        definition:
          'A C# game-development framework in the XNA tradition, focused on code-first architecture.',
      },
      {
        term: 'Game',
        definition: 'The central MonoGame base class that defines the main application lifecycle.',
      },
      {
        term: 'GameTime',
        definition: 'Timing information provided during update and draw calls.',
      },
      {
        term: 'GraphicsDevice',
        definition: 'The graphics context used for rendering operations.',
      },
      {
        term: 'GraphicsDeviceManager',
        definition: 'A manager commonly used to configure graphics settings for a MonoGame `Game`.',
      },
    ],
  },
  {
    id: 'glossary-rendering',
    title: 'Rendering and Content Terms',
    terms: [
      {
        term: 'SpriteBatch',
        definition: 'A MonoGame class commonly used for batched 2D sprite and text drawing.',
      },
      {
        term: 'ContentManager',
        definition: 'The MonoGame loading mechanism commonly used for runtime asset access.',
      },
      {
        term: 'MGCB',
        definition:
          'The MonoGame content-build tooling used to process assets for runtime loading.',
      },
      {
        term: 'Render target',
        definition: 'A texture-like rendering destination used for off-screen drawing workflows.',
      },
      {
        term: 'Back buffer',
        definition: 'The render surface presented to the screen after drawing is complete.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture Terms',
    terms: [
      {
        term: 'Game loop',
        definition: 'The repeating update-and-draw flow that drives real-time game execution.',
      },
      {
        term: 'Fixed time step',
        definition: 'A timing mode where updates target a fixed simulation interval.',
      },
      {
        term: 'Scene or screen manager',
        definition:
          'A project-defined architecture layer that controls menus, gameplay states, and transitions.',
      },
      {
        term: 'Batching',
        definition: 'Grouping draw work to reduce rendering overhead.',
      },
      {
        term: 'Code-first',
        definition:
          'A workflow where project structure and systems are primarily defined in code rather than in a large visual editor.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-framework-not-engine', label: 'Framework vs Engine' },
    { id: 'bp-xna-lineage', label: 'XNA Lineage' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
  ],
  'core-concepts': [
    { id: 'core-game-class', label: 'Game Class' },
    { id: 'core-graphics-device', label: 'Graphics Device' },
    { id: 'core-spritebatch', label: 'SpriteBatch' },
    { id: 'core-content-pipeline', label: 'Content Pipeline' },
    { id: 'core-input-audio', label: 'Input and Audio' },
    { id: 'core-time-and-state', label: 'GameTime and State' },
    { id: 'core-architecture', label: 'Architecture Ownership' },
    { id: 'core-2d-3d-scope', label: '2D and 3D Scope' },
    { id: 'core-tooling', label: 'Tooling' },
    { id: 'core-performance', label: 'Performance' },
  ],
  examples: [
    { id: 'examples-game-class', label: 'Game Class' },
    { id: 'examples-spritebatch', label: 'SpriteBatch' },
    { id: 'examples-gametime', label: 'GameTime' },
    { id: 'examples-content-load', label: 'Content Loading' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-rendering', label: 'Rendering Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="monogame-help-section">
      <h2 className="monogame-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="monogame-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="monogame-help-section">
      <h2 className="monogame-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="monogame-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="monogame-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="monogame-help-section">
      <h2 className="monogame-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="monogame-help-divider" />}
    </section>
  )
}

export default function MonoGamePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'MonoGame',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="MonoGame"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">MonoGame</h1>
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
