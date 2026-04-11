import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

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
  takeaway: string
}

const GAME_FRAMEWORKS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks/game'

const frameworkDirectory = ['Godot', 'Unity', 'Unreal Engine', 'MonoGame']

const introParagraphs = [
  'Game Frameworks is the overview page for the part of Languages & Ecosystems that focuses on engines and frameworks used to build interactive games, simulations, and real-time experiences. It explains the ideas that repeat across scene-based engines, ECS-oriented runtimes, rendering toolkits, editor-driven environments, and lower-level game development frameworks before the reader drills into any single product.',
  'The useful question is not only what language or editor a game framework uses. The more important question is what the framework chooses to standardize: rendering loop, scene organization, input handling, physics, animation, asset pipelines, scripting, tooling, deployment targets, and the workflow for turning a prototype into a shipped game.',
  'The child pages in this section cover specific ecosystems such as Godot, Unity, Unreal Engine, and MonoGame. This overview page is the broader field guide that explains why game frameworks exist, what they help with, what tradeoffs they impose, and how to reason about them without reducing the decision to visual polish, popularity, or one demo project.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'game98-overview',
    title: 'Overview',
    paragraphs: [
      'A game framework is a structured foundation for building real-time interactive software. Instead of starting from raw graphics APIs, custom asset formats, handwritten editors, and hand-rolled game loops, teams start with a system that already knows how to update game state, render frames, handle input, manage assets, and organize gameplay code.',
      'What makes a game framework or engine different from a loose collection of graphics and math libraries is that it usually shapes the entire development model. It defines how worlds are represented, how objects are updated, how scenes are loaded, how assets are imported, how scripting interacts with rendering and physics, and often how designers and programmers collaborate inside shared tooling.',
      'That is why game framework choice is architectural. Choosing one means choosing a runtime model, an editor model, a content pipeline, and a workflow for building, testing, profiling, and shipping interactive systems over time.',
    ],
  },
  {
    id: 'game98-why',
    title: 'Why Game Frameworks Matter',
    paragraphs: [
      'Games are some of the most cross-cutting kinds of software teams build. Rendering, audio, input, physics, animation, persistence, AI, UI, networking, tooling, and platform deployment all interact under real-time constraints. Frameworks matter because they turn these repeated concerns into coherent systems instead of leaving every project to reinvent them from scratch.',
      'Without a framework, teams repeatedly recreate scene loading, coordinate systems, asset import, camera logic, input abstraction, collision handling, build packaging, and debugging tooling. That does not usually produce freedom. It usually produces fragile infrastructure that steals time from actual game design.',
      'They also matter socially. A mature engine can give programmers, technical artists, designers, and level builders a shared workspace and shared abstractions. A thinner framework preserves more control, but then the team must build the missing editor support, content pipeline, and workflow discipline themselves.',
    ],
    bullets: [
      'They reduce repeated rendering, input, and asset-management boilerplate.',
      'They define the game loop and overall runtime organization.',
      'They influence performance, tooling, content workflow, and deployment.',
      'They trade off low-level control against built-in productivity.',
      'They shape how code, art assets, scenes, and gameplay systems evolve together.',
    ],
  },
  {
    id: 'game98-problems',
    title: 'What Game Frameworks Usually Solve',
    paragraphs: [
      'Game frameworks exist because raw platform APIs leave too many recurring systems unsolved. Every serious game needs a coherent answer to the same categories of questions: how frames are updated, how input is sampled, how assets are loaded and referenced, how scenes or levels are organized, how entities are represented, how animation and physics integrate, and how builds are packaged for multiple targets.',
      'Different frameworks solve these problems with different levels of opinionation. Some provide a full editor, scene graph, shader pipeline, animation tools, and export system. Others provide only the rendering loop and core abstractions, leaving content workflows and game architecture mostly up to the team.',
      'The goal is not to treat every engine as a magical black box. The goal is to understand the shared problem space clearly enough to see what a framework is standardizing, what it is leaving open, and what extra infrastructure the team will need beyond the framework itself.',
    ],
    bullets: [
      'Rendering loop and frame scheduling.',
      'Input handling and device abstraction.',
      'Scene, level, or world organization.',
      'Asset import, storage, and runtime loading.',
      'Physics, animation, audio, and camera systems.',
      'Editor workflows, debugging, and build/export tooling.',
      'Cross-platform deployment and runtime performance constraints.',
    ],
  },
  {
    id: 'game98-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'A practical mental model is that a game framework is a policy engine for real-time simulation. It answers how time advances, how world state is updated, how rendering and logic coordinate, what an entity or object boundary means, and how game code interacts with assets, tools, and the engine runtime.',
      'Once viewed this way, many debates become easier to reason about. Scene graph versus ECS, editor-driven workflows versus code-first workflows, built-in physics versus external middleware, and scripting layer versus native layer are all questions about where the framework chooses to place complexity and how explicit it makes that complexity to the team.',
      'This is why game frameworks should be evaluated as system design, not as screenshots or trailer quality. A beautiful editor can still hide awkward code architecture or painful asset workflows. A lower-level framework can still be the right choice if the team needs explicit control and has the discipline to build the surrounding pipeline.',
    ],
  },
  {
    id: 'game98-spectrum',
    title: 'The Game Framework Spectrum',
    paragraphs: [
      'Game frameworks span several overlapping categories. Some are full engines with editors, visual tooling, asset importers, and integrated systems for physics, animation, UI, and deployment. Some are slimmer frameworks that provide rendering, content loading, and the basic game loop while leaving architecture and tooling largely to the developer. Some are designed for 2D-heavy workflows, some for large 3D productions, and some for a wide range of projects.',
      'This spectrum matters because two tools can both produce a playable game while pushing complexity into completely different places. One may make level editing and content authoring easy but impose a heavy engine model and specific runtime assumptions. Another may make code architecture more explicit but require the team to build editor helpers, animation pipelines, and deployment glue themselves.',
      'The wrong mental model is that all engines differ only in visual power. The better model is that each framework is a different compromise between tooling, control, runtime overhead, iteration speed, team specialization, and how much production infrastructure is already included.',
    ],
  },
  {
    id: 'game98-directory',
    title: 'Frameworks in This Section',
    paragraphs: [
      'The entries below are the concrete framework pages present under Game Frameworks. They represent different points on the spectrum from fully integrated engines to code-centric frameworks and cover different tradeoffs in tooling, scripting, rendering, and production workflow.',
    ],
    bullets: frameworkDirectory,
  },
  {
    id: 'game98-why-hard',
    title: 'Why Game Development Feels Hard',
    paragraphs: [
      'Game development feels hard because almost every subsystem is live at the same time. Input, physics, rendering, camera movement, animation, collision, audio, UI, persistence, and content streaming all interact under a frame budget the player can feel directly. Problems are not only logical; they are experiential and performance-sensitive.',
      'The second reason it feels hard is that many failures are cross-disciplinary. An animation setup decision affects code hooks. A scene organization decision affects streaming and loading times. Asset import choices affect memory usage. Camera and physics design affect level design. Tooling choices affect how quickly designers can iterate.',
      'Frameworks help because they give shape to these interactions, but they can also hide cost. Teams still need to understand where time, memory, complexity, and production friction are being spent if they want a project to scale beyond a prototype.',
    ],
  },
  {
    id: 'game98-when-to-use',
    title: 'When a Game Framework Is the Right Tool',
    paragraphs: [
      'A game framework is usually the right tool when the project needs repeatable systems for rendering, input, content loading, and deployment, and when the team wants to spend more effort on gameplay than on basic engine infrastructure. That includes most serious 2D and 3D games, simulations, and interactive real-time tools.',
      'Frameworks are especially useful when iteration speed matters. Editors, inspectors, live reload, asset import pipelines, profilers, and export tooling can save enormous time compared with building those capabilities from scratch.',
      'They are also useful when multiple disciplines must collaborate. An engine with solid tooling can create a shared workflow between programmers, artists, level designers, and technical designers instead of forcing everything through code-only pipelines.',
    ],
  },
  {
    id: 'game98-when-not-to-use',
    title: 'Where Frameworks Can Hurt',
    paragraphs: [
      'Game frameworks can hurt when teams choose them for prestige instead of project fit. A heavyweight engine can burden a small stylized 2D game with too much tooling, too much runtime overhead, or too much workflow ceremony. A thin framework can leave a content-heavy team without the editor support and asset pipeline they actually needed.',
      'They also hurt when teams mistake engine adoption for production readiness. An engine does not automatically provide good game architecture, disciplined content organization, scalable save systems, clean state management, or a realistic shipping pipeline.',
      'The important tradeoff is not framework versus no framework in the abstract. It is whether the framework removes enough accidental complexity from the real game to justify the constraints, abstractions, and learning curve it introduces.',
    ],
  },
  {
    id: 'game98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'This page provides a roadmap for the subsection and sets priorities for deeper follow-on topics.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'game98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Game frameworks are coordination tools for real-time simulation, rendering, content workflow, and shipping. They matter because games combine code, assets, tools, and performance constraints in one live system. The right framework choice depends on what kinds of gameplay and production complexity the team needs help standardizing.',
      'Strong framework choices usually come from understanding runtime model, tooling model, asset workflow, team composition, and deployment needs. Visual polish or community hype matters less than whether the framework makes the real project easier to build, iterate on, and ship.',
    ],
    bullets: [
      'Choose a game framework for workflow and runtime fit, not only for visuals or popularity.',
      'Treat update loop, asset pipeline, tooling, and deployment as architectural concerns.',
      'Expect framework choice to influence iteration speed, performance, team collaboration, and shipping risk.',
      'Assume the right amount of engine opinionation depends on the project scale and team structure.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'game98-loop',
    title: 'Game Loop and Frame Update Model',
    paragraphs: [
      'Every game framework has to answer one foundational question: how does time advance? The game loop is the repeating structure that processes input, updates simulation, resolves animation and physics, and submits rendering work. Some engines make this highly visible through explicit update callbacks. Others wrap more of it in engine-managed systems.',
      'Understanding the loop is fundamental because nearly every gameplay behavior depends on it. Movement, cooldowns, collision checks, AI ticks, UI updates, and audio transitions all live inside some frame-based or timestep-based model.',
      'The practical question is not simply whether the engine has an update function. It is how clearly it separates fixed-step simulation from render updates, how predictable the order of systems is, and how easy it is to reason about frame-dependent behavior.',
    ],
  },
  {
    id: 'game98-world',
    title: 'World Representation: Scenes, Entities, and Components',
    paragraphs: [
      'Game frameworks need a way to represent what exists in the world. This may be a scene tree, actor hierarchy, entity-component system, object graph, or some hybrid structure. The representation model matters because it determines how behavior is attached, how references are managed, and how large projects stay understandable.',
      'Scene-oriented engines often make composition and authoring intuitive because objects are visible in editors and arranged hierarchically. ECS-oriented approaches often improve large-scale simulation clarity and data-oriented performance. Traditional object models can be approachable but may drift into tangled inheritance if the team is not disciplined.',
      'The important design question is whether the frameworks world model stays legible as gameplay systems accumulate. Good world representation makes ownership, lifecycle, and dependencies explicit enough for both tools and code to remain manageable.',
    ],
  },
  {
    id: 'game98-rendering',
    title: 'Rendering Pipeline and Camera Model',
    paragraphs: [
      'Rendering in a game framework is not only about drawing meshes or sprites. It is about how cameras view the world, how materials and shaders are applied, how post-processing works, how UI overlays integrate with world space, and how much direct access developers have to low-level graphics behavior.',
      'Different frameworks expose very different rendering models. Some make it easy to author visuals through editor tools and material systems. Others expose lower-level graphics control and expect developers to build more custom rendering paths. This affects both art pipeline flexibility and performance profiling.',
      'The camera model is also central. 2D camera stacks, orthographic versus perspective behavior, split-screen, cutscene cameras, and world-to-screen UI all depend on how the framework treats view management as part of the runtime.',
    ],
  },
  {
    id: 'game98-input',
    title: 'Input Abstraction and Player Interaction',
    paragraphs: [
      'Games often need to unify keyboard, mouse, controller, touch, and sometimes custom input devices under one gameplay abstraction. A good framework separates physical inputs from gameplay actions so rebinding, accessibility, and cross-platform behavior stay manageable.',
      'Input handling also interacts with timing and state. Menus, gameplay, dialogue, cutscenes, and editor tools may all require different input contexts. Frameworks that make context switching explicit can reduce subtle interaction bugs.',
      'The useful question is not only whether the engine supports controllers. It is whether the engine makes input mapping, event timing, analog values, dead zones, and action ownership clear enough for real production use.',
    ],
  },
  {
    id: 'game98-assets',
    title: 'Asset Pipeline and Content Import',
    paragraphs: [
      'Games are asset-heavy systems. Textures, models, animations, sounds, fonts, shaders, levels, and scripted content all move through an import pipeline before they become runtime objects. A framework with a strong asset pipeline can radically improve iteration speed and reduce integration friction between code and content.',
      'Asset handling is not just a convenience layer. It affects memory usage, load times, versioning, build size, and how safely content references survive refactors. Frameworks differ in how much metadata they attach, how much they automate, and how much of the pipeline is editor-managed versus code-managed.',
      'Teams should evaluate whether the framework supports the kinds of assets the project depends on and whether the pipeline remains understandable once the game contains thousands of imported resources.',
    ],
  },
  {
    id: 'game98-physics',
    title: 'Physics, Collision, and Spatial Reasoning',
    paragraphs: [
      'Many games depend on collision queries, rigid-body behavior, character controllers, triggers, raycasts, and other spatial systems. A framework may include physics directly, wrap established middleware, or provide only simpler collision helpers. That choice influences both gameplay style and debugging workflow.',
      'Physics systems are often where prototype convenience and production discipline collide. It is easy to build gameplay that appears to work until timestep edge cases, tunneling, unstable stacks, or desynchronized animations appear. Good framework support helps make these problems visible and testable.',
      'Even games that do not need realistic physics still need spatial reasoning. Tilemaps, navigation, hitboxes, camera bounds, and interaction volumes all depend on how the framework models space.',
    ],
  },
  {
    id: 'game98-animation',
    title: 'Animation, State Machines, and Timing',
    paragraphs: [
      'Animation in game frameworks is broader than playing clips. It includes blend trees, sprite animation, animation events, transitions, timing hooks, procedural layers, and how gameplay state synchronizes with motion and presentation.',
      'Many engines expose visual state machines for animation, which can be productive for designers but can also become hard to reason about if they grow without discipline. Lower-level frameworks may leave animation more explicit in code, which can improve clarity at the cost of more setup work.',
      'The important design question is whether animation behavior stays inspectable. Combat timing, hit confirms, anticipation frames, UI transitions, and locomotion all depend on a reliable connection between animation systems and gameplay rules.',
    ],
  },
  {
    id: 'game98-ui',
    title: 'UI, Menus, and HUD Systems',
    paragraphs: [
      'Games need menus, HUDs, pause screens, dialogue systems, inventories, and overlays that coexist with real-time simulation. Some frameworks provide mature UI systems with layout tooling, animations, and editor support. Others provide only primitives or expect custom UI code.',
      'UI in games is often harder than it first appears because it crosses many systems: localization, scaling, input focus, controller navigation, save-state display, performance overlays, and platform-specific safe areas. The framework helps when it makes UI composition and interaction predictable instead of becoming a separate mini-engine inside the project.',
      'The useful evaluation question is whether the frameworks UI model can handle both simple HUD work and deeper interaction-heavy menus without becoming brittle.',
    ],
  },
  {
    id: 'game98-tooling',
    title: 'Editor Tooling and Developer Workflow',
    paragraphs: [
      'Tooling is a first-class part of game development. Scene inspectors, profilers, debuggers, asset browsers, visual script tools, import settings, live play modes, and build pipelines all affect how quickly a team can learn from a prototype and iterate on it.',
      'This is one of the biggest differences between a full engine and a lighter framework. A full engine may save months by providing tooling out of the box. A light framework may be cleaner architecturally for experienced programmers but forces the team to build or live without many productivity layers.',
      'The right question is not only whether the editor looks powerful. It is whether the workflow remains stable and comprehensible when many people and many assets are moving through it at once.',
    ],
  },
  {
    id: 'game98-scripting',
    title: 'Scripting, Native Code, and Extensibility',
    paragraphs: [
      'Game frameworks differ strongly in how gameplay code is written and extended. Some favor managed languages with editor integrations. Some expose native C++ layers. Some support scripting languages for fast iteration. Some encourage mixing scripting and native systems strategically.',
      'This matters because language choice is also workflow choice. Faster iteration can improve design exploration. Lower-level native access can improve performance and systems control. The right balance depends on the project and team, not on abstract language ideology.',
      'Extensibility also matters at the engine boundary. Teams should understand how hard it is to add custom tools, shaders, importers, runtime systems, and platform-specific behaviors when the default engine features are not enough.',
    ],
  },
  {
    id: 'game98-performance',
    title: 'Performance, Memory, and Real-Time Constraints',
    paragraphs: [
      'Game performance is experiential. Frame hitches, long loads, memory spikes, shader stutter, poor batching, and unstable physics are visible to players immediately. A framework therefore influences not only raw performance but also how measurable and debuggable performance issues are.',
      'The critical question is where the framework helps and where it obscures cost. Good profiling tools, asset streaming controls, visibility into CPU versus GPU work, and predictable memory behavior matter as much as theoretical renderer speed.',
      'Framework choice changes the default performance envelope, but it does not remove the need for engineering discipline. Teams still need to profile real scenes, real assets, and real gameplay loops rather than assuming the engine will solve every bottleneck automatically.',
    ],
    bullets: [
      'Measure real frame time, not only average FPS.',
      'Treat memory budgets and asset streaming as production constraints.',
      'Profile CPU, GPU, physics, animation, and loading separately.',
      'Do not confuse engine marketing demos with your actual project workload.',
    ],
  },
  {
    id: 'game98-shipping',
    title: 'Build Pipeline, Platforms, and Shipping',
    paragraphs: [
      'Game frameworks are also deployment frameworks. They affect how projects are packaged, how platform-specific assets are handled, how patches are built, how save data behaves, and how export targets differ across desktop, console, web, and mobile.',
      'Platform support is not only a checkbox. It includes input differences, performance ceilings, certification constraints where relevant, store packaging, controller support, resolution scaling, and platform-specific debugging tools.',
      'A framework becomes much more valuable when its build and export model reduces shipping friction instead of forcing the team to learn platform quirks from scratch at the end of the project.',
    ],
  },
  {
    id: 'game98-testing',
    title: 'Testing, Debugging, and Production Reliability',
    paragraphs: [
      'Game testing is harder than testing many other applications because much of the behavior is emergent, time-based, and interaction-heavy. Still, frameworks influence how easy it is to test deterministic systems, inspect scene state, reproduce bugs, and automate parts of the workflow.',
      'Runtime debugging tools, console logs, profilers, frame debuggers, visual gizmos, collision overlays, and editor play modes all matter. A framework becomes painful when most debugging consists of guessing what the engine is doing behind the scenes.',
      'Production reliability includes more than crash resistance. It includes build reproducibility, asset reference stability, save compatibility, and how safely the team can iterate late in development without breaking foundational systems.',
    ],
  },
  {
    id: 'game98-selection',
    title: 'How to Evaluate a Game Framework',
    paragraphs: [
      'Framework evaluation should start with the game itself. Is the project a 2D action game, a narrative-heavy project, a systems-heavy simulation, a mobile game, a stylized indie production, or a large 3D world? Does it need heavy editor support, cinematic tooling, networking, low-level rendering control, or very fast scripting iteration?',
      'Then evaluate the surrounding workflow. Documentation, editor stability, asset pipeline quality, platform export support, profiler quality, plugin ecosystem, language fit, and team familiarity often matter more than any single rendering feature.',
      'Finally, evaluate organizational fit. A framework is successful when its abstractions align with the team that will actually ship the project. The best engine on paper can still be the wrong choice if it creates too much workflow friction for the disciplines involved.',
    ],
  },
  {
    id: 'game98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Game projects fail in recurring ways regardless of engine. Teams overcommit to visuals before validating gameplay, accumulate tangled scene dependencies, overload global managers, ignore asset organization until builds become chaotic, and postpone profiling until performance debt is deep.',
      'Another common failure mode is choosing a framework whose strengths do not match the project. Teams adopt a full engine but fight its workflow at every step, or they pick a thinner framework and spend too much of development rebuilding editor and content systems instead of shipping the game.',
      'The best protection is to use the framework as a structure, not as a substitute for design discipline. Understand its runtime model, content workflow, and extension boundaries early enough that production decisions remain deliberate.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'game98-example-godot',
    title: 'Example: Godot Node Script and Frame Update',
    description: [
      'This example shows a simple Godot script attached to a node. The important idea is that the framework already provides a scene graph, lifecycle callbacks, and input helpers, so gameplay code plugs into an existing runtime rather than building the runtime first.',
      'Node-based composition is one reason engines like Godot can be productive for small and medium projects that benefit from visible scene structure and editor iteration.',
    ],
    code: `extends CharacterBody2D

@export var speed := 220.0

func _physics_process(delta: float) -> void:
    var direction := Input.get_vector('move_left', 'move_right', 'move_up', 'move_down')
    velocity = direction * speed
    move_and_slide()`,
    takeaway:
      'A full engine helps when gameplay code can focus on behavior while the runtime already owns scenes, timing, and movement primitives.',
  },
  {
    id: 'game98-example-unity',
    title: 'Example: Unity MonoBehaviour Update',
    description: [
      'Unity popularized a component-driven model where scripts attach to scene objects and respond to engine lifecycle callbacks such as Start, Update, and OnCollisionEnter.',
      'The exact API is less important than the architectural point: the engine decides object lifetime, serialization, scene presence, and the main update cycle, while game code fills in behavior.',
    ],
    code: `using UnityEngine;

public class Spinner : MonoBehaviour
{
    [SerializeField] private float speed = 90f;

    private void Update()
    {
        transform.Rotate(Vector3.up * speed * Time.deltaTime);
    }
}`,
    takeaway:
      'Engine-managed lifecycle methods can speed up iteration, but teams still need discipline around component boundaries and scene dependencies.',
  },
  {
    id: 'game98-example-unreal',
    title: 'Example: Unreal Actor Tick',
    description: [
      'Unreal Engine exposes a heavyweight but powerful runtime model with actors, components, reflection, tooling, and deep C++ extensibility. This example shows a simple actor updating over time.',
      'The broader lesson is that a large engine can offer strong tooling and rendering power while also imposing a deeper engine model the team must actually learn.',
    ],
    code: `void ARotatingPickup::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);

    FRotator Rotation = GetActorRotation();
    Rotation.Yaw += 45.0f * DeltaTime;
    SetActorRotation(Rotation);
}`,
    takeaway:
      'A powerful engine can expose low-level control and high-end tooling together, but the architectural cost is usually a steeper engine model and workflow surface.',
  },
  {
    id: 'game98-example-monogame',
    title: 'Example: MonoGame Explicit Update and Draw',
    description: [
      'MonoGame sits closer to the framework end of the spectrum. It gives the developer an explicit game loop, graphics device access, and content loading, but expects more architecture to be built in project code.',
      'This is attractive when a team wants direct control and is comfortable building more of the surrounding systems itself.',
    ],
    code: `protected override void Update(GameTime gameTime)
{
    var keyboard = Keyboard.GetState();

    if (keyboard.IsKeyDown(Keys.Left))
        playerPosition.X -= 180f * (float)gameTime.ElapsedGameTime.TotalSeconds;

    if (keyboard.IsKeyDown(Keys.Right))
        playerPosition.X += 180f * (float)gameTime.ElapsedGameTime.TotalSeconds;

    base.Update(gameTime);
}

protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.CornflowerBlue);

    spriteBatch.Begin();
    spriteBatch.Draw(playerTexture, playerPosition, Color.White);
    spriteBatch.End();

    base.Draw(gameTime);
}`,
    takeaway:
      'Lower-level frameworks provide clarity and control, but they shift more production responsibility onto the team.',
  },
  {
    id: 'game98-example-scene',
    title: 'Example: Scene Transition and Game State Boundary',
    description: [
      'Real projects need explicit transitions between menus, gameplay, pause states, and loading states. This example shows the general idea of making those transitions a first-class boundary instead of sprinkling them across unrelated objects.',
      'Frameworks help most when they provide clean places to attach state transitions, loading, and asset preparation.',
    ],
    code: `function enterLevel(nextLevelId) {
  saveCheckpoint();
  unloadCurrentScene();
  preloadLevelAssets(nextLevelId);
  currentScene = loadScene(nextLevelId);
  gameMode = 'playing';
}`,
    takeaway:
      'Scene and state transitions are architectural boundaries, not only UI events or loading tricks.',
  },
  {
    id: 'game98-example-profiler',
    title: 'Example: Frame-Time Mindset',
    description: [
      'Games should be profiled in terms of time spent per frame, not only broad impressions of smoothness. The point of this example is the reasoning structure: measure, isolate, then optimize.',
      'A good framework makes it easier to break frame time into CPU simulation, rendering, physics, animation, and asset loading costs.',
    ],
    code: `frame_time_ms = cpu_update_ms + physics_ms + render_submit_ms + gpu_wait_ms

if frame_time_ms > 16.67:
    identify_largest_subsystem_cost()
    reduce_work_or_spread_it_across_frames()`,
    takeaway:
      'Performance work becomes much clearer when the framework and team both think in budgets and subsystem costs instead of generic feelings of slowness.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Game loop',
    definition:
      'The repeating runtime structure that processes input, updates simulation, and renders frames.',
  },
  {
    term: 'Scene graph',
    definition:
      'A hierarchical representation of objects in a world or UI where parent-child relationships affect transform and organization.',
  },
  {
    term: 'Entity-component system',
    definition:
      'A data-oriented architecture where entities are identifiers and behavior or data is attached through components and systems.',
  },
  {
    term: 'Frame time',
    definition: 'The total time required to produce one frame, usually measured in milliseconds.',
  },
  {
    term: 'Fixed timestep',
    definition:
      'A simulation update model where logic or physics advances using consistent time increments for stability and predictability.',
  },
  {
    term: 'Delta time',
    definition:
      'The elapsed time since the previous frame or update, commonly used to make movement and timing frame-rate independent.',
  },
  {
    term: 'Asset pipeline',
    definition:
      'The process that imports, converts, stores, and packages art and content resources for use by the game at runtime.',
  },
  {
    term: 'Prefab or packed scene',
    definition:
      'A reusable authored object or object hierarchy that can be instantiated multiple times in a level or scene.',
  },
  {
    term: 'Collision layer',
    definition:
      'A filtering mechanism that determines which objects can detect or respond to one another in spatial queries or physics.',
  },
  {
    term: 'Rigid body',
    definition:
      'A physics object whose movement and collisions are simulated by the engine or physics middleware.',
  },
  {
    term: 'Hitbox',
    definition:
      'A collision volume used for gameplay interactions such as damage, pickups, or trigger detection.',
  },
  {
    term: 'Blend tree',
    definition:
      'An animation structure that combines or interpolates between multiple motions based on gameplay parameters.',
  },
  {
    term: 'Animation event',
    definition:
      'A timed callback or signal emitted from an animation timeline to coordinate gameplay behavior with motion.',
  },
  {
    term: 'HUD',
    definition:
      'Heads-up display elements presented during gameplay, such as health, ammo, minimaps, or objective markers.',
  },
  {
    term: 'Profiler',
    definition:
      'A tool used to measure time, memory, rendering cost, or other runtime behavior across subsystems.',
  },
  {
    term: 'Content streaming',
    definition:
      'Loading and unloading assets incrementally so large worlds or scenes do not require everything in memory at once.',
  },
  {
    term: 'Build target',
    definition:
      'A platform-specific output format such as Windows, Linux, Web, Android, or console deployment.',
  },
  {
    term: 'Editor extension',
    definition:
      'A custom tool, inspector, panel, or workflow enhancement added to the engine editor environment.',
  },
  {
    term: 'Serialization',
    definition:
      'Converting runtime data into a stored representation so scenes, assets, or save files can persist across sessions.',
  },
  {
    term: 'Save compatibility',
    definition:
      'The ability for saved game data to remain readable and meaningful across updates or content changes.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'game98-overview', label: 'Overview' },
    { id: 'game98-why', label: 'Why They Matter' },
    { id: 'game98-problems', label: 'What They Solve' },
    { id: 'game98-mental-model', label: 'Mental Model' },
    { id: 'game98-spectrum', label: 'Framework Spectrum' },
    { id: 'game98-directory', label: 'Framework Directory' },
    { id: 'game98-why-hard', label: 'Why It Feels Hard' },
    { id: 'game98-when-to-use', label: 'When To Use One' },
    { id: 'game98-when-not-to-use', label: 'Where They Hurt' },
    { id: 'game98-roadmap', label: 'Coverage Roadmap' },
    { id: 'game98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'game98-loop', label: 'Game Loop' },
    { id: 'game98-world', label: 'World Representation' },
    { id: 'game98-rendering', label: 'Rendering and Camera' },
    { id: 'game98-input', label: 'Input' },
    { id: 'game98-assets', label: 'Asset Pipeline' },
    { id: 'game98-physics', label: 'Physics and Collision' },
    { id: 'game98-animation', label: 'Animation' },
    { id: 'game98-ui', label: 'UI and HUD' },
    { id: 'game98-tooling', label: 'Editor Tooling' },
    { id: 'game98-scripting', label: 'Scripting and Native Code' },
    { id: 'game98-performance', label: 'Performance' },
    { id: 'game98-shipping', label: 'Platforms and Shipping' },
    { id: 'game98-testing', label: 'Testing and Debugging' },
    { id: 'game98-selection', label: 'Framework Evaluation' },
    { id: 'game98-failure-modes', label: 'Failure Modes' },
  ],
  examples: [
    { id: 'game98-example-godot', label: 'Godot Node Script' },
    { id: 'game98-example-unity', label: 'Unity MonoBehaviour' },
    { id: 'game98-example-unreal', label: 'Unreal Actor Tick' },
    { id: 'game98-example-monogame', label: 'MonoGame Loop' },
    { id: 'game98-example-scene', label: 'Scene Transition' },
    { id: 'game98-example-profiler', label: 'Frame-Time Mindset' },
  ],
  glossary: [{ id: 'game98-glossary', label: 'Glossary' }],
}

function toFrameworkRoute(name: string): string {
  return `${GAME_FRAMEWORKS_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="game98-section">
      <h2 className="game98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toFrameworkRoute(item)} className="game98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="game98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="game98-section">
      <h2 className="game98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="game98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="game98-divider" />}
    </section>
  )
}

export default function GameFrameworksPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Game Frameworks',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Game Frameworks"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Game Frameworks</h1>
      <p className="game98-doc-subtitle">
        Help-style overview of game engine architecture, runtime models, tooling, content workflow,
        and the framework pages available in this subsection.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1, {
              linkedBullets: frameworkDirectory,
            }),
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

      {activeTab === 'glossary' ? (
        <section id="game98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      ) : null}
    </TopicPageShell>
  )
}
