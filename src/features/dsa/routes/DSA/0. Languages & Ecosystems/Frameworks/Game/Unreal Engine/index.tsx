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
  "Unreal Engine is Epic's real-time 3D engine for games and other interactive or cinematic applications. It is not only a renderer and not only a gameplay library. It is a large production platform that includes the editor, asset pipelines, level and world tools, animation systems, physics, networking foundations, UI systems, audio, packaging workflows, visual scripting, and C++ programming support inside one ecosystem.",
  'The central practical distinction is that Unreal is editor-centered. Teams do not merely install a package and start from an empty runtime. They work inside the Unreal Editor, import and organize assets through the content pipeline, author gameplay with C++ and Blueprints, and rely on engine-provided systems such as the gameplay framework, world management, animation tooling, and build tooling.',
  'Unreal matters because it gives teams a mature, high-end real-time stack for ambitious 3D production. It is especially strong where visual fidelity, designer iteration, large worlds, cinematic integration, and collaboration between engineers and content creators are central. The tradeoff is complexity: the engine has a large surface area, heavy tooling, and a vocabulary that takes time to learn.',
  'As of April 3, 2026, current Epic documentation prominently frames Unreal around Unreal Engine 5.x systems such as Blueprints, the gameplay framework, World Partition, Nanite, and Lumen. This page therefore explains Unreal as a current UE5-era engine rather than as a historical UE4-only topic.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Unreal Engine is a full game-development environment. Rendering, input, animation, physics, UI, audio, networking, asset management, level editing, cinematics, packaging, and runtime architecture all live in one connected stack.',
      'That means choosing Unreal is not the same as choosing a narrow framework. A team is choosing an engine architecture, editor workflow, production pipeline, content system, and tooling culture in addition to the runtime itself.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Unreal Matters',
    paragraphs: [
      'Unreal matters because it combines high-end rendering, strong world-building workflows, and a production model that serves both programmers and non-programmers. Designers can work rapidly in Blueprints and editor tools, while engineers can build lower-level systems and gameplay architecture in C++.',
      'It also matters because it scales well to content-heavy 3D projects. A large part of Unreal value is not just runtime capability, but how much production infrastructure already exists around assets, cinematics, animation, levels, debugging, and deployment.',
    ],
    bullets: [
      'Strong rendering and visual-fidelity tooling.',
      'Blueprints allow rapid designer iteration.',
      'C++ supports systems programming and deeper engine control.',
      'The editor and content pipeline are designed for production-scale teams.',
    ],
  },
  {
    id: 'bp-cplusplus-blueprints',
    title: 'C++ and Blueprints Together',
    paragraphs: [
      'One of Unreal defining traits is the coexistence of C++ and Blueprints. Epic documents Blueprints as a full visual scripting system that designers and programmers use to define object behavior, gameplay flow, and game logic through node-based assets. At the same time, Unreal supports deep C++ integration for gameplay classes, reusable systems, engine extensions, and performance-sensitive logic.',
      'Professional Unreal projects are rarely all-Blueprint or all-C++. The common healthy pattern is layered: foundational architecture, reusable systems, and performance-sensitive code in C++, then exposed properties, events, and game-specific assembly in Blueprints where iteration speed is most valuable.',
    ],
  },
  {
    id: 'bp-ue5-era',
    title: 'The UE5 Era',
    paragraphs: [
      'Modern Unreal discussion is strongly shaped by UE5-era systems. Epic documentation for Nanite focuses on virtualized geometry that supports very high-detail meshes, while Lumen is documented as a fully dynamic global illumination and reflections system. Current Unreal evaluations often start with those capabilities because they affect content strategy, visual targets, and production planning.',
      'That does not mean every project should enable every high-end feature everywhere. It means current Unreal architecture and expectations are influenced by them, especially for teams building visually ambitious 3D projects on current hardware.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Unreal Fits Best',
    paragraphs: [
      'Unreal is strongest when a project benefits from advanced 3D rendering, large or complex world construction, integrated cinematic and animation tools, mature multiplayer foundations, and close collaboration between artists, designers, and engineers.',
      'It is less ideal when the team wants a minimal runtime, extremely small build and tooling overhead, or a lightweight framework-first workflow. Unreal can be used on small projects, but its advantages are most obvious when the team benefits from engine breadth rather than feeling burdened by it.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-gameplay-framework',
    title: 'Gameplay Framework',
    paragraphs: [
      'The gameplay framework is one of the first major Unreal concepts to learn. Epic documentation presents core gameplay classes such as Actor, Pawn, Character, Controller, GameMode, GameState, PlayerState, and components as the vocabulary for structuring game logic.',
      'The practical point is that Unreal already provides an opinionated gameplay architecture. Teams are not expected to reinvent every runtime role from scratch. Instead, they decide which responsibilities belong to world objects, player-controlled objects, authority-side rule objects, replicated state holders, and reusable components.',
    ],
    bullets: [
      'Actor is the base for placeable or spawnable world objects.',
      'Pawn represents an object that can be possessed by a Controller.',
      'Character is a Pawn specialized for common humanoid-style movement.',
      'GameMode defines match rules on the authority side, while GameState holds broader game state that can be shared to clients.',
    ],
  },
  {
    id: 'core-actors-components',
    title: 'Actors, Components, and Composition',
    paragraphs: [
      'Unreal uses a strong composition model. Actors are containers for behavior and world presence, while components provide reusable functionality such as mesh rendering, collision, movement, cameras, audio, and custom logic. This is central to how Unreal codebases stay modular.',
      'That means many features should be modeled as components instead of giant monolithic classes. A reusable health system, interaction detector, inventory attachment point, or camera rig often fits better as a component than as duplicated logic across many actors.',
    ],
  },
  {
    id: 'core-blueprints',
    title: 'Blueprints',
    paragraphs: [
      'Blueprints are not just a beginner convenience. They are a first-class Unreal system for visual scripting, event graphs, class authoring, animation control, UI wiring, and editor-driven gameplay assembly. Epic documentation explicitly positions Blueprints as a way to create classes and behaviors using nodes instead of handwritten code.',
      'The practical engineering lesson is to treat Blueprints seriously without pushing all architecture into them. They are excellent for exposed gameplay behaviors, designer-owned iteration, and rapid assembly. They become harder to manage when large systems are built with tangled graphs and weak architectural boundaries.',
    ],
  },
  {
    id: 'core-cplusplus-reflection',
    title: 'C++, Reflection, and the Unreal Object Model',
    paragraphs: [
      'Unreal C++ is not plain isolated standard C++ with no framework rules. Unreal uses a reflection and code-generation system centered around macros such as UCLASS, USTRUCT, UPROPERTY, and UFUNCTION. These declarations allow Unreal to expose types and members to the editor, serialization, garbage collection, networking, and Blueprints.',
      'This matters because Unreal programming is as much about cooperating with the engine object model as it is about writing ordinary C++. Developers need to understand when data should be reflected, when properties should be editable or replicated, and how framework-managed objects differ from raw unmanaged types.',
    ],
  },
  {
    id: 'core-worlds-levels',
    title: 'Worlds, Levels, and World Partition',
    paragraphs: [
      'A large part of Unreal production revolves around worlds and levels. Levels organize playable spaces and placed actors, while current UE5 workflows also emphasize World Partition for managing large worlds by dividing them into streaming cells and editor-managed partitions.',
      'This matters because world structure is both a technical and production concern. It affects loading, collaboration, memory, streaming strategy, large-environment authoring, and how teams divide map work across designers and artists.',
    ],
  },
  {
    id: 'core-assets-pipeline',
    title: 'Assets and the Content Pipeline',
    paragraphs: [
      'Unreal is heavily asset-driven. Meshes, materials, textures, animations, Blueprints, sound assets, particle systems, and maps are all managed through the content system and editor. Importing, organizing, referencing, cooking, and packaging assets are everyday parts of Unreal development, not side details.',
      'That means project architecture is never only code architecture. Folder structure, asset dependencies, naming discipline, redirectors, source control workflow, and build cooking behavior all matter. Many production problems in Unreal are asset and content-pipeline problems rather than algorithmic code problems.',
    ],
  },
  {
    id: 'core-animation-physics',
    title: 'Animation, Physics, and Character Systems',
    paragraphs: [
      'Unreal includes mature systems for skeletal meshes, animation graphs, state machines, montages, physical simulation, collision, and movement. For many game genres, these systems are not optional extras. They are where much of the playable feel is actually built.',
      'The key lesson is that gameplay programming in Unreal often means coordinating multiple subsystems rather than writing all behavior in one class. Character feel can depend on input handling, movement components, animation blending, collision responses, camera logic, and network correction working together.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering Systems: Lumen, Nanite, and Beyond',
    paragraphs: [
      'Current Unreal rendering discussion usually includes Lumen and Nanite because they change what kinds of environments and lighting workflows are practical. Lumen provides dynamic global illumination and reflections, while Nanite is designed for efficient rendering of very high-detail geometry.',
      'However, rendering choices are still production tradeoffs. Teams need to reason about target hardware, scene complexity, art direction, memory budgets, shader cost, platform constraints, and the real performance profile of their specific project rather than assuming a feature is always free because it is powerful.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking and Replication',
    paragraphs: [
      'Unreal has long included networking foundations, and replication remains a core concept for multiplayer games. Developers define which actors or properties replicate, where authority lives, and which gameplay events are server-controlled versus locally predicted or cosmetic.',
      'This is a major architectural topic because multiplayer support is not something you bolt on at the end. In Unreal, gameplay classes, property declarations, RPC patterns, movement behavior, and UI feedback all become easier or harder depending on whether replication concerns were considered early.',
    ],
  },
  {
    id: 'core-editor-builds',
    title: 'Editor Tooling, Builds, and Packaging',
    paragraphs: [
      'Unreal development is inseparable from its tooling. The editor is where teams build maps, manage content, inspect classes, author Blueprints, tweak materials, preview animation, and package builds. Build output also involves cooking content, target-platform packaging, configuration differences, and platform-specific deployment requirements.',
      'A production Unreal team therefore needs both programming discipline and pipeline discipline. Debugging gameplay logic is only part of the job. Teams also debug asset references, packaging failures, editor configuration issues, and platform build problems.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Thinking',
    paragraphs: [
      'Performance work in Unreal spans CPU, GPU, memory, streaming, shader cost, draw calls, animation cost, replication overhead, loading behavior, and editor-vs-packaged-build differences. Unreal has powerful profiling tools, but they only help if teams measure the actual bottleneck instead of arguing from general engine reputation.',
      'The healthiest performance mindset is system-level. A scene may be slow because of expensive materials, bad streaming choices, too many ticking actors, heavy Blueprint logic, high animation cost, replication volume, or world-partition configuration. There is rarely one universal Unreal optimization trick.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-actor',
    title: 'A Basic C++ Actor',
    description: [
      'A common entry point is a custom Actor subclass. This example shows the Unreal shape of a reflected class with an overridable lifecycle method.',
    ],
    code: `#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "SpinningPickup.generated.h"

UCLASS()
class ASpinningPickup : public AActor
{
  GENERATED_BODY()

public:
  ASpinningPickup();

protected:
  virtual void Tick(float DeltaSeconds) override;
};

ASpinningPickup::ASpinningPickup()
{
  PrimaryActorTick.bCanEverTick = true;
}

void ASpinningPickup::Tick(float DeltaSeconds)
{
  Super::Tick(DeltaSeconds);
  AddActorLocalRotation(FRotator(0.0f, 90.0f * DeltaSeconds, 0.0f));
}`,
    notes: [
      'UCLASS and GENERATED_BODY connect the class to the Unreal reflection system.',
      'Actor lifecycle hooks such as Tick are engine-managed extension points.',
    ],
  },
  {
    id: 'examples-blueprint-exposure',
    title: 'Exposing Data and Events to the Editor and Blueprints',
    description: [
      'UPROPERTY and UFUNCTION are central to how Unreal C++ communicates with the editor, serialization, and Blueprint workflows.',
    ],
    code: `UCLASS()
class AHealthPickup : public AActor
{
  GENERATED_BODY()

public:
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Pickup")
  float HealAmount = 25.0f;

  UFUNCTION(BlueprintCallable, Category = "Pickup")
  void ApplyTo(class AMyCharacter* Character);
};`,
    notes: [
      'EditAnywhere makes the property editable in the editor.',
      'BlueprintReadWrite and BlueprintCallable expose members to Blueprint graphs.',
      'This is a common pattern for keeping core logic in C++ while allowing fast game-specific iteration in the editor.',
    ],
  },
  {
    id: 'examples-components',
    title: 'Building an Actor from Components',
    description: [
      'Composition is the normal Unreal style. Actors often assemble mesh, collision, audio, camera, or custom behavior through components.',
    ],
    code: `AMyInteractable::AMyInteractable()
{
  RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("Root"));

  Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
  Mesh->SetupAttachment(RootComponent);

  Trigger = CreateDefaultSubobject<UBoxComponent>(TEXT("Trigger"));
  Trigger->SetupAttachment(RootComponent);
  Trigger->SetBoxExtent(FVector(50.0f));
}`,
    notes: [
      'CreateDefaultSubobject is used during construction to define component structure.',
      'Component attachment defines hierarchy and transform inheritance.',
    ],
  },
  {
    id: 'examples-replication',
    title: 'A Minimal Replicated Property',
    description: [
      'Multiplayer Unreal code often begins with explicit replicated data and clear authority rules.',
    ],
    code: `UPROPERTY(ReplicatedUsing = OnRep_CurrentHealth)
float CurrentHealth;

UFUNCTION()
void OnRep_CurrentHealth();

void AMyCharacter::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
  Super::GetLifetimeReplicatedProps(OutLifetimeProps);
  DOREPLIFETIME(AMyCharacter, CurrentHealth);
}`,
    notes: [
      'Replication is explicit rather than automatic for every property.',
      'OnRep handlers are commonly used to react to replicated state changes on clients.',
      'Multiplayer architecture depends on early decisions about authority, state ownership, and bandwidth cost.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Unreal Terms',
    terms: [
      {
        term: 'Unreal Engine',
        definition:
          'Epic Games real-time 3D engine and editor-centered production platform for games and other interactive content.',
      },
      {
        term: 'Actor',
        definition:
          'A fundamental Unreal gameplay object that can exist in a level or be spawned at runtime.',
      },
      {
        term: 'Pawn',
        definition: 'An Actor that can be possessed by a Controller.',
      },
      {
        term: 'Character',
        definition:
          'A specialized Pawn that includes movement features commonly used for character-driven games.',
      },
      {
        term: 'Blueprint',
        definition:
          'Unreal visual scripting and asset-based class authoring system used for gameplay logic and editor-driven iteration.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture Terms',
    terms: [
      {
        term: 'Component',
        definition:
          'A reusable piece of functionality attached to an Actor, such as rendering, collision, movement, or custom logic.',
      },
      {
        term: 'GameMode',
        definition:
          'A gameplay class that defines rules and flow for a game mode, typically on the authority side.',
      },
      {
        term: 'GameState',
        definition:
          'A gameplay class used to represent broader game state that can be shared with clients.',
      },
      {
        term: 'UPROPERTY',
        definition:
          'A reflection macro used to expose and manage Unreal class data for editor use, serialization, replication, and related engine systems.',
      },
      {
        term: 'UFUNCTION',
        definition:
          'A reflection macro used to expose member functions to engine systems such as Blueprints and networking.',
      },
    ],
  },
  {
    id: 'glossary-production',
    title: 'Production and Rendering Terms',
    terms: [
      {
        term: 'World Partition',
        definition:
          'A UE5 large-world system that divides worlds into streamable cells for organization and streaming.',
      },
      {
        term: 'Nanite',
        definition:
          'Unreal virtualized geometry system designed to support very high-detail meshes efficiently.',
      },
      {
        term: 'Lumen',
        definition:
          'Unreal dynamic global illumination and reflections system used heavily in current UE5-era rendering discussions.',
      },
      {
        term: 'Cooking',
        definition:
          'The build process that prepares content for a target platform before packaging.',
      },
      {
        term: 'Replication',
        definition:
          'Unreal networking behavior that synchronizes selected actors or properties across server and clients.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-cplusplus-blueprints', label: 'C++ and Blueprints' },
    { id: 'bp-ue5-era', label: 'UE5 Era' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
  ],
  'core-concepts': [
    { id: 'core-gameplay-framework', label: 'Gameplay Framework' },
    { id: 'core-actors-components', label: 'Actors and Components' },
    { id: 'core-blueprints', label: 'Blueprints' },
    { id: 'core-cplusplus-reflection', label: 'C++ and Reflection' },
    { id: 'core-worlds-levels', label: 'Worlds and Levels' },
    { id: 'core-assets-pipeline', label: 'Assets and Pipeline' },
    { id: 'core-animation-physics', label: 'Animation and Physics' },
    { id: 'core-rendering', label: 'Rendering Systems' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-editor-builds', label: 'Editor and Builds' },
    { id: 'core-performance', label: 'Performance' },
  ],
  examples: [
    { id: 'examples-actor', label: 'Basic Actor' },
    { id: 'examples-blueprint-exposure', label: 'Blueprint Exposure' },
    { id: 'examples-components', label: 'Components' },
    { id: 'examples-replication', label: 'Replication' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-production', label: 'Production Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="unreal-help-section">
      <h2 className="unreal-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="unreal-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="unreal-help-section">
      <h2 className="unreal-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="unreal-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="unreal-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="unreal-help-section">
      <h2 className="unreal-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="unreal-help-divider" />}
    </section>
  )
}

export default function UnrealEnginePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Unreal Engine',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Unreal Engine"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Unreal Engine</h1>
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
