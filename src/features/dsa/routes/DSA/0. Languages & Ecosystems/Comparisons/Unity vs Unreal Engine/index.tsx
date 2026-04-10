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
  'Unity and Unreal Engine both solve the broad problem of building interactive real-time 2D and 3D applications, but they represent different tradeoffs in engine philosophy, visual defaults, scripting model, tooling depth, team composition, and project scale. The meaningful comparison is not which engine is universally better. It is which engine matches the technical and organizational shape of the game or simulation being built.',
  'Unity has historically been strongest as a flexible general-purpose engine with an approachable C# scripting workflow, a large asset-store culture, wide platform reach, and a relatively lightweight starting point for indie, mobile, XR, education, and mid-scope production. Unreal Engine has historically been strongest when the project wants very high-end rendering, deeper native C++ engine access, a rich visual scripting system through Blueprints, and a more batteries-included feeling for large 3D productions.',
  'This page is intentionally comprehensive. It covers editor workflow, scripting, rendering, asset pipelines, animation, physics, networking, large worlds, performance, source control implications, build/export workflows, monetization and licensing concerns at a high level, and team-fit guidance. The format is Windows 98 Help; the content is a decision manual.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Unity is a real-time engine and editor environment built around scenes, GameObjects, components, packages, and C# scripting. Its strongest identity is flexibility. It can be used for mobile games, desktop games, XR experiences, educational applications, simulations, visualization, and many mid-sized 3D and 2D projects. It often appeals to teams that want a productive scripting workflow and an engine that stays relatively lightweight at the beginning of a project.',
      'Unreal Engine is a real-time engine and editor environment built around levels, actors, components, reflection-enabled C++ systems, Blueprints, strong built-in rendering features, and a deep authoring pipeline for large 3D productions. It is especially associated with visually ambitious games, cinematic presentation, large world building, and teams willing to invest more heavily in engine-facing technical work.',
      'Both engines are used professionally at scale. The real difference is not whether either can ship a commercial title. The difference is where they make you pay complexity and where they give you leverage.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'Unity generally optimizes for accessibility, iteration, and scripting productivity. Teams often get moving quickly because C# is approachable, editor concepts are comparatively direct, and many tasks can be solved through packages, prefabs, and standard MonoBehaviour-style patterns even when the project does not have a large engine team.',
      'Unreal generally optimizes for engine depth, visual ambition, and large-scale 3D production capability. Blueprints can accelerate non-programmer workflows, but serious Unreal projects often lean into the engine as a substantial technical platform. Teams that want deep runtime control, advanced rendering systems, and closer-to-engine C++ workflows often find that tradeoff worthwhile.',
    ],
    bullets: [
      'Unity usually feels lighter at project start.',
      'Unreal usually feels heavier but more built out for high-end 3D production.',
      'Unity favors C# scripting productivity.',
      'Unreal favors Blueprints plus native C++ depth.',
    ],
  },
  {
    id: 'bp-when-unity-fits',
    title: 'When Unity Is Usually the Better Fit',
    paragraphs: [
      'Unity is often the better fit for teams that care about quick onboarding, C# productivity, broad deployment targets, 2D support, mobile reach, educational and prototype workflows, and project types where the game logic and iteration speed matter more than out-of-the-box high-end rendering prestige. It is also commonly favored by smaller teams that do not want engine-level complexity to dominate early production.',
      'That does not mean Unity is only for small projects. It means Unity often shines when engineering wants a familiar managed-language workflow and the project can benefit from a large ecosystem of middleware, packages, tutorials, and established production patterns around C# gameplay code.',
    ],
    bullets: [
      '2D-heavy projects.',
      'Mobile-first projects.',
      'XR and mixed-reality work with broad device targeting.',
      'Teams that want C# gameplay code and a lower engine-entry barrier.',
    ],
  },
  {
    id: 'bp-when-unreal-fits',
    title: 'When Unreal Engine Is Usually the Better Fit',
    paragraphs: [
      'Unreal Engine is often the better fit for projects that prioritize high-end 3D visuals, cinematic presentation, deep rendering features, large-world tooling, robust built-in environment systems, and a workflow where technical artists, designers, and engineers all benefit from mature editor-side authoring tools. It is particularly strong where visual fidelity is part of the product strategy rather than a nice-to-have.',
      'It is also a strong fit when the team is comfortable with C++, is prepared for a heavier engine/toolchain footprint, and expects to work close to engine systems for performance, rendering, networking, or custom runtime behavior.',
    ],
    bullets: [
      'Photoreal or visually ambitious 3D games.',
      'Large-world productions.',
      'Teams comfortable with engine-scale tooling and C++.',
      'Projects where rendering quality and cinematic tooling are central requirements.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Both Do Well',
    paragraphs: [
      'Both engines offer a visual editor, component-oriented authoring, asset import pipelines, animation systems, physics integration, audio, UI support, packaging/export workflows, and scripting paths for gameplay logic. Both can support commercial games across multiple platforms and both have large ecosystems of tutorials, plugins, communities, and production knowledge.',
      'This matters because the comparison is rarely about absolute capability. It is about which default assumptions align with the team. If a project is ordinary enough, either engine can work. The serious engineering question is which engine makes the common case feel more natural for the type of game and team you actually have.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Unity projects often move quickly early, but that can turn into architecture drift if the team does not impose discipline around scene management, prefab strategy, code organization, asset loading, and performance budgeting. Unity gives flexibility. Flexibility without standards becomes entropy.',
      'Unreal projects often begin with more setup cost and a steeper mental model, but that early heaviness can pay off on large productions because many systems are designed with bigger 3D pipelines in mind. Unreal does not remove complexity either. It front-loads more of it into the engine and toolchain vocabulary.',
      'In both engines, success depends less on the marketing identity of the tool and more on whether the team knows how to structure the project within the engine well.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'Start by asking what matters most: 2D versus 3D emphasis, mobile versus high-end PC or console targets, C# versus C++, designer-heavy Blueprint workflows, rendering expectations, team size, and tolerance for engine complexity. Those questions usually matter more than broad community arguments about which engine is more professional.',
      'A practical rule is this: if you want faster scripting productivity, broad platform flexibility, and a relatively approachable starting point, Unity often wins. If you want high-end 3D rendering, richer built-in large-production tooling, and are comfortable investing in a heavier engine stack, Unreal often wins.',
    ],
    bullets: [
      'Choose Unity when iteration speed and C# workflow are primary advantages.',
      'Choose Unreal when rendering ambition and engine depth are primary advantages.',
      'Do not choose based on hype alone.',
      'Choose based on project type, team skill distribution, and shipping constraints.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-editor-model',
    title: 'Editor and Authoring Model',
    paragraphs: [
      'Unity organizes authoring primarily around scenes, GameObjects, components, prefabs, and packages. This is conceptually approachable: attach components, author behaviors in C#, create reusable prefabs, and compose scenes from those building blocks. For many teams, especially smaller ones, this mental model is easy to teach and fast to apply.',
      'Unreal organizes authoring around levels, actors, components, Blueprints, assets, and a more overtly engine-scale content browser and tool suite. The editor tends to feel denser because more systems are visible and more workflows are built for large 3D production needs. That can be powerful, but it also raises the baseline cognitive load.',
    ],
  },
  {
    id: 'core-scripting-model',
    title: 'Scripting Model: C# Versus C++ and Blueprints',
    paragraphs: [
      'Unity gameplay code is primarily written in C#, which is one of its biggest strategic advantages. C# is widely approachable, productive, and comfortable for many application developers who are not native-engine programmers. This reduces onboarding cost and often improves iteration speed for gameplay, tools, and editor extensions.',
      'Unreal gameplay and engine-facing systems are typically built with a mixture of C++ and Blueprints. Blueprints are a major differentiator because they allow visual scripting and designer-driven logic authoring. But serious Unreal teams frequently rely on C++ as well, especially when they need tight control, lower-level systems work, or larger-scale architecture.',
      'This is less about which language is superior and more about which workflow the team is built for. A C#-comfortable team can move very quickly in Unity. A team with strong engine/C++ skills and designers comfortable with Blueprints can be extremely productive in Unreal.',
    ],
    bullets: [
      'Unity lowers the barrier for programmer onboarding with C#.',
      'Unreal offers a hybrid authoring model through Blueprints and C++.',
      'Blueprints are a force multiplier for some teams, not a substitute for architecture.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering Pipeline and Visual Ambition',
    paragraphs: [
      'Unity supports multiple rendering paths and pipelines, including the Scriptable Render Pipeline ecosystem such as URP and HDRP. That gives Unity range, from lightweight/mobile-friendly rendering through more advanced high-fidelity pipelines. The tradeoff is that teams must understand which rendering path they are actually standardizing on, because Unity can feel more like a platform of choices than one singular visual stack.',
      'Unreal is strongly associated with high-end real-time rendering and ships with deeply integrated rendering systems such as Nanite and Lumen in modern Unreal Engine 5 workflows. That makes Unreal especially attractive when visual fidelity, cinematic lighting, and complex environment rendering are central to the product.',
      'A useful simplification is that Unity often gives more rendering-path flexibility across project types, while Unreal more often gives stronger default prestige for large-scale 3D visual work.',
    ],
  },
  {
    id: 'core-assets-content',
    title: 'Asset Pipeline, Content Browser, and Package Strategy',
    paragraphs: [
      'Unity relies on its asset database, import settings, package manager, and prefab-centric workflows. Historically it has also leaned heavily on a large Asset Store and an ecosystem of packages and middleware. This can be a major productivity win, but it also means projects need discipline around package versioning, dependency sprawl, and which subsystems are considered canonical inside the team.',
      'Unreal has a deeply integrated content browser and a production pipeline that often feels more cohesive for large 3D game asset management. The engine has a stronger sense of being a full environment for authoring, importing, organizing, and rendering content at scale. For content-heavy 3D teams, this can be a major advantage.',
    ],
  },
  {
    id: 'core-animation',
    title: 'Animation, Cinematics, and Character Pipelines',
    paragraphs: [
      'Unity supports animation controllers, timeline workflows, rigging tools, and ecosystem-driven character solutions, but teams often assemble their preferred pipeline from several pieces. This can be flexible and effective, especially for stylized or mid-scope projects, but it places more responsibility on the team to standardize well.',
      'Unreal has long been strong in animation, character tooling, sequencing, and cinematic-style workflows. Its broader production orientation often makes it feel more ready for teams building character-heavy, cinematic, or presentation-driven experiences where animation tooling is a core production surface rather than an auxiliary feature.',
    ],
  },
  {
    id: 'core-physics-gameplay',
    title: 'Physics and Gameplay Architecture',
    paragraphs: [
      'Both engines provide physics integration and component-based gameplay building blocks, but Unity often encourages teams to design their own gameplay architecture patterns on top of the basic engine objects and MonoBehaviour lifecycle. That can be a virtue because the engine does not force one dominant application architecture too early.',
      'Unreal provides strong built-in gameplay frameworks such as actors, pawns, controllers, game modes, and engine-defined class hierarchies that can make large projects feel more structured once the team understands them. The cost is that Unreal often asks teams to learn more engine vocabulary up front.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Model and Optimization Work',
    paragraphs: [
      'Unity performance depends heavily on project architecture, allocation behavior, content scale, render-pipeline choice, asset loading patterns, and platform target. It can perform very well, but teams must be deliberate about update loops, memory pressure, draw calls, batching, asset lifetime, and platform-specific limits. Unity also offers technologies such as IL2CPP and the data-oriented stack for certain kinds of performance-oriented work, but these come with their own complexity.',
      'Unreal performance work often happens closer to engine systems, rendering complexity, content scale, and platform-level tuning. Because Unreal is frequently used for visually ambitious projects, the performance challenge is often not whether the engine can do the work, but whether the production can budget its ambition correctly across CPU, GPU, streaming, and memory constraints.',
      'Neither engine gives free performance. Unity usually asks for discipline around code and content patterns. Unreal often asks for discipline around rendering and systems scale.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking and Multiplayer',
    paragraphs: [
      'Networking is one of the areas where teams should be careful not to confuse engine capability with turnkey success. Unity has had multiple networking eras and ecosystem approaches, and teams often assemble a networking stack through official packages, third-party solutions, or service combinations depending on project needs. That flexibility can be useful, but it requires deliberate choices.',
      'Unreal has long had a stronger reputation for built-in multiplayer concepts and replication-oriented architecture, especially in projects already living close to the engine model. That does not make multiplayer easy, but it does mean Unreal often feels more opinionated and more ready for larger multiplayer architecture out of the box.',
    ],
  },
  {
    id: 'core-large-worlds',
    title: 'Large Worlds, Streaming, and Open-World Tooling',
    paragraphs: [
      'Unity can support large worlds, scene streaming, additive scene loading, addressable content systems, and custom world management approaches, but teams often need to build more of their project-specific world-streaming architecture themselves. That can be entirely appropriate, especially for technical teams that want a tailored runtime structure.',
      'Unreal is especially strong in large-world discussions because its tooling and ecosystem are closely associated with open-world and large-environment production. Features such as World Partition and modern streaming workflows give it a more obvious built-in story when the project is fundamentally about managing a huge 3D world.',
    ],
  },
  {
    id: 'core-platforms',
    title: 'Platform Reach and Deployment',
    paragraphs: [
      'Unity has long been valued for broad platform deployment, especially across mobile, desktop, web-oriented experiments, console, and XR workflows. That platform breadth is one of its defining advantages for teams that need one codebase strategy across many device classes.',
      'Unreal also supports major platforms, but its center of gravity is often strongest in high-end PC, console, and visually intensive 3D production contexts. That does not mean Unreal cannot target other environments. It means its default strengths are often most apparent in more demanding 3D workloads.',
    ],
  },
  {
    id: 'core-tools-source-control',
    title: 'Tools, Build Size, and Source Control Implications',
    paragraphs: [
      'Unity projects can stay comparatively lightweight in early stages, which is good for experimentation and small-team iteration. But project health depends on package discipline, import settings consistency, and thoughtful separation between code, scenes, and content. Teams also need standards for serialized assets and prefab usage to keep merges manageable.',
      'Unreal projects often involve larger binary assets, heavier editor state, and a toolchain footprint that assumes a more substantial production environment. This can push teams toward stronger source-control discipline, asset locking conventions, and larger build infrastructure earlier in the project lifecycle.',
      'Neither engine removes the need for pipeline discipline. Unreal often makes the need obvious sooner. Unity can let teams postpone that seriousness until the project is already large enough to punish them for it.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Composition and Org Fit',
    paragraphs: [
      'Unity is often a strong match when the engineering team includes application developers, gameplay programmers, and technical generalists who are comfortable in C# and want the engine to be productive without requiring everyone to think like engine programmers. It is also a strong fit when the team is small and needs a versatile tool rather than a heavyweight platform.',
      'Unreal is often a strong match when the team includes technical artists, experienced gameplay engineers, rendering-aware engineers, and designers who can take advantage of Blueprint-driven iteration in a larger structured production. It becomes especially compelling when the project can justify deeper specialization across disciplines.',
    ],
  },
  {
    id: 'core-licensing',
    title: 'Licensing, Business Risk, and Ecosystem Stability',
    paragraphs: [
      'Engine choice is not purely technical. Teams also care about licensing predictability, cost structure, ecosystem stability, third-party support, and trust in the platform roadmap. Unity and Unreal have both had periods where business-model conversation affected developer sentiment, so teams should separate marketing noise from actual contractual and operational impact on their studio.',
      'The responsible approach is to review the current official licensing and service terms that apply to the exact products and revenue profile of the team before committing. Architecture may determine the best engine, but legal and financial constraints can still veto the technically elegant answer.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration and Switching Cost',
    paragraphs: [
      "Switching engines is expensive. It is not just code rewrite cost. It also means rebuilding editor workflows, asset import assumptions, prefab or Blueprint logic, rendering expectations, plugins, CI, build packaging, team habits, and production documentation. Much of a studio's engine knowledge is implicit and operational, not just present in source files.",
      'That means Unity versus Unreal should usually be decided as early as possible from the project type, team profile, and production constraints. Midstream migration is justified only when the current engine is creating severe technical or business risk that clearly exceeds the cost of the move.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One common misconception is that Unity is only for simple or low-end games. That is false. Unity can support sophisticated projects, but it often requires stronger internal architecture discipline because it gives teams a lot of freedom.',
      'Another misconception is that Unreal automatically makes a project look AAA. Unreal offers powerful rendering and world tools, but visual quality still depends on art direction, content quality, optimization, and production capability. A weaker team does not get a high-end product merely by opening a stronger engine.',
      'The mature comparison is not beginner engine versus professional engine. It is productivity-oriented flexibility versus engine-depth-oriented power.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-unity-script',
    title: 'Basic Unity Gameplay Script',
    description: [
      'Unity gameplay code often starts from a small C# component attached to a GameObject. This example captures why Unity feels approachable to many developers coming from application programming backgrounds.',
    ],
    code: `using UnityEngine;

public class Spinner : MonoBehaviour
{
    public float speed = 90f;

    void Update()
    {
        transform.Rotate(Vector3.up * speed * Time.deltaTime);
    }
}`,
    notes: [
      'The code is small, direct, and approachable.',
      'This style scales quickly for prototypes, but larger productions need stronger architectural boundaries than raw component scripts alone.',
    ],
  },
  {
    id: 'examples-unreal-cpp',
    title: 'Basic Unreal C++ Actor',
    description: [
      'Unreal C++ gameplay logic often lives inside engine-defined classes such as actors, pawns, components, and controllers. The engine framework is more explicit from the start.',
    ],
    code: `#include "RotatingActor.h"

ARotatingActor::ARotatingActor()
{
    PrimaryActorTick.bCanEverTick = true;
}

void ARotatingActor::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
    AddActorLocalRotation(FRotator(0.f, 90.f * DeltaTime, 0.f));
}`,
    notes: [
      'Unreal gameplay code tends to sit closer to engine framework types.',
      'This can feel heavier than Unity C#, but it also aligns the code more directly with engine architecture.',
    ],
  },
  {
    id: 'examples-blueprints',
    title: 'Blueprint Versus Script Mental Model',
    description: [
      'A useful way to compare the engines is not only by language syntax but by who can author gameplay logic comfortably and where that logic tends to live.',
    ],
    code: `Unity mindset:
small C# scripts on components
prefabs wire reusable behavior
editor tooling can be extended in C#

Unreal mindset:
Blueprints enable designer-authored gameplay flow
C++ backs deeper systems and performance-critical logic
engine framework classes shape runtime structure`,
    notes: [
      'This is one of the most important team-fit differences between the engines.',
      'The better choice depends on whether your production benefits more from C# scripting simplicity or Blueprint plus C++ collaboration.',
    ],
  },
  {
    id: 'examples-rendering-choice',
    title: 'Rendering Pipeline Decision',
    description: [
      'Visual ambition often determines the engine choice faster than language preference does.',
    ],
    code: `If the project needs:
  lightweight mobile-friendly rendering
  strong 2D support
  fast scripting iteration
then Unity is often the easier default

If the project needs:
  very high-end real-time visuals
  large 3D environments
  cinematic presentation
then Unreal is often the easier default`,
    notes: [
      'This is not a law. It is a practical default decision rule.',
      'When visuals are central to the product, Unreal frequently earns its heavier workflow.',
    ],
  },
  {
    id: 'examples-team-choice',
    title: 'Team Composition Heuristic',
    description: ['Engine decisions are often really team decisions expressed through technology.'],
    code: `Choose Unity when:
  team is small or generalist-heavy
  C# productivity matters
  mobile or XR targets dominate
  production values speed of iteration

Choose Unreal when:
  project is 3D and visually ambitious
  designers benefit from Blueprints
  team has strong engine/C++ capacity
  large-world or cinematic tooling matters`,
    notes: [
      'This heuristic is often more useful than comparing feature lists in isolation.',
      'A well-matched team on the less glamorous engine usually beats a mismatched team on the more glamorous one.',
    ],
  },
  {
    id: 'examples-migration-checklist',
    title: 'Engine Selection Checklist',
    description: [
      'These are the questions worth answering before committing to either engine for a new production.',
    ],
    code: `review:
  target platforms
  2D versus 3D emphasis
  rendering ambition
  language and hiring preference
  designer scripting needs
  networking model
  open-world or streaming requirements
  plugin and middleware dependencies
  source control and build pipeline capacity
  licensing and business constraints`,
    notes: [
      'Answering these clearly is more important than debating internet reputation.',
      'The best engine is the one whose tradeoffs line up with the project you actually intend to ship.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-unity',
    title: 'Unity Terms',
    terms: [
      {
        term: 'GameObject',
        definition:
          'A core Unity scene object that can hold components and participate in the hierarchy.',
      },
      {
        term: 'Component',
        definition:
          'A behavior or data unit attached to a GameObject, such as a transform, renderer, or script.',
      },
      {
        term: 'Prefab',
        definition: 'A reusable authored object template that can be instantiated across scenes.',
      },
      {
        term: 'MonoBehaviour',
        definition:
          'A common Unity base class for gameplay scripts tied to engine lifecycle callbacks.',
      },
      {
        term: 'Package Manager',
        definition:
          'Unity tooling for installing and versioning engine features and ecosystem packages.',
      },
      {
        term: 'URP',
        definition:
          'Universal Render Pipeline, a Unity render pipeline aimed at broad performance and platform coverage.',
      },
      {
        term: 'HDRP',
        definition:
          'High Definition Render Pipeline, a Unity render pipeline for higher-end visual targets.',
      },
      {
        term: 'IL2CPP',
        definition:
          'A Unity scripting backend that converts managed code to C++ for ahead-of-time compilation.',
      },
    ],
  },
  {
    id: 'glossary-unreal',
    title: 'Unreal Engine Terms',
    terms: [
      {
        term: 'Actor',
        definition:
          'A core Unreal gameplay object that can be placed in a level and extended through components or subclasses.',
      },
      {
        term: 'Blueprint',
        definition:
          'Unreal visual scripting and class-authoring system used heavily by designers and technical teams.',
      },
      {
        term: 'Pawn',
        definition: 'An Unreal actor type intended to be possessed or controlled by players or AI.',
      },
      {
        term: 'Game Mode',
        definition:
          'An Unreal framework class that defines high-level game rules and session behavior.',
      },
      {
        term: 'Nanite',
        definition:
          'A modern Unreal virtualized geometry system associated with high-detail rendering workflows.',
      },
      {
        term: 'Lumen',
        definition:
          'A modern Unreal global illumination and reflections system for dynamic lighting workflows.',
      },
      {
        term: 'World Partition',
        definition:
          'An Unreal world-management system for large environments and streaming workflows.',
      },
      {
        term: 'Replication',
        definition: 'Unreal networking behavior for synchronizing state across server and clients.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Real-Time Engine Terms',
    terms: [
      {
        term: 'Scene / Level',
        definition:
          'An authored runtime environment containing placed objects, assets, and gameplay context.',
      },
      {
        term: 'Render Pipeline',
        definition: 'The sequence of rendering stages and rules used to draw the frame.',
      },
      {
        term: 'Asset Pipeline',
        definition:
          'The import, processing, organization, and runtime preparation path for content such as models, textures, audio, and animations.',
      },
      {
        term: 'Serialization',
        definition: 'How engine data is stored to disk and reconstructed by the editor or runtime.',
      },
      {
        term: 'Build Pipeline',
        definition:
          'The process used to package a project into a runnable player or shipped build.',
      },
      {
        term: 'Hot Reload / Live Iteration',
        definition:
          'Workflow support for seeing logic or content changes quickly without a full manual rebuild cycle.',
      },
      {
        term: 'Large World Streaming',
        definition:
          'Loading and unloading world data in pieces so large environments remain practical at runtime.',
      },
      {
        term: 'Technical Artist',
        definition: 'A hybrid role that bridges art production and engine/tooling implementation.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-unity-fits', label: 'When Unity Fits' },
    { id: 'bp-when-unreal-fits', label: 'When Unreal Fits' },
    { id: 'bp-shared-strengths', label: 'Shared Strengths' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-editor-model', label: 'Editor and Authoring Model' },
    { id: 'core-scripting-model', label: 'Scripting Model' },
    { id: 'core-rendering', label: 'Rendering Pipeline' },
    { id: 'core-assets-content', label: 'Asset and Content Pipeline' },
    { id: 'core-animation', label: 'Animation and Cinematics' },
    { id: 'core-physics-gameplay', label: 'Physics and Gameplay Architecture' },
    { id: 'core-performance', label: 'Performance Model' },
    { id: 'core-networking', label: 'Networking and Multiplayer' },
    { id: 'core-large-worlds', label: 'Large Worlds and Streaming' },
    { id: 'core-platforms', label: 'Platform Reach and Deployment' },
    { id: 'core-tools-source-control', label: 'Tools and Source Control' },
    { id: 'core-team-fit', label: 'Team Composition and Org Fit' },
    { id: 'core-licensing', label: 'Licensing and Business Risk' },
    { id: 'core-migration', label: 'Migration and Switching Cost' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-unity-script', label: 'Basic Unity Script' },
    { id: 'examples-unreal-cpp', label: 'Basic Unreal C++ Actor' },
    { id: 'examples-blueprints', label: 'Blueprints Versus Scripts' },
    { id: 'examples-rendering-choice', label: 'Rendering Decision' },
    { id: 'examples-team-choice', label: 'Team Composition Heuristic' },
    { id: 'examples-migration-checklist', label: 'Engine Selection Checklist' },
  ],
  glossary: [
    { id: 'glossary-unity', label: 'Unity Terms' },
    { id: 'glossary-unreal', label: 'Unreal Terms' },
    { id: 'glossary-shared', label: 'Shared Engine Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="unity-unreal-help-section">
      <h2 className="unity-unreal-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="unity-unreal-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="unity-unreal-help-section">
      <h2 className="unity-unreal-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="unity-unreal-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="unity-unreal-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="unity-unreal-help-section">
      <h2 className="unity-unreal-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="unity-unreal-help-divider" />}
    </section>
  )
}

export default function UnityVsUnrealEnginePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Unity vs Unreal Engine',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Unity vs Unreal Engine"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Unity vs Unreal Engine</h1>
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
