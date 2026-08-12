import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '49. Graphics, Game Development & Simulation/Unity/index.mdx': `---
title: Unity
description: A cross-platform game engine developed by Unity Technologies.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Unity">

Unity is a cross-platform game engine developed by Unity Technologies. It is the most popular game engine in the world for indie games, mobile games, and AR/VR development. It uses C# as its primary scripting language.

<Callout icon="info" title="Component-Based Architecture">
  Unity uses an Entity-Component-System (ECS) heavily inspired pattern. In Unity, everything in the scene is a \`GameObject\` (the Entity). To give a GameObject behavior (like physics, rendering, or custom logic), you attach \`Components\` (like a \`Rigidbody\` or a custom C# \`MonoBehaviour\`).
</Callout>

## The Unity Editor & Workflow

Unity provides a visual editor where you drag-and-drop assets, build scenes, and configure components via the Inspector.

<ComparisonTable 
  headers={['Window', 'Purpose']}
  rows={[
    ['Scene View', 'Where you visually construct your game levels.'],
    ['Game View', 'Simulates what the player will see through the main camera.'],
    ['Hierarchy', 'A tree list of every GameObject currently in the active Scene.'],
    ['Inspector', 'Shows the properties and attached Components of the currently selected GameObject.']
  ]}
/>

## Example: A Simple Player Controller

A standard Unity script inherits from \`MonoBehaviour\`, giving it access to lifecycle hooks like \`Start()\` and \`Update()\`.

\`\`\`csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5.0f;

    // Update is called once per frame
    void Update()
    {
        // Get input from WASD or Arrow Keys (-1 to 1)
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");

        // Calculate movement vector
        Vector3 movement = new Vector3(moveHorizontal, 0.0f, moveVertical);

        // Apply movement scaled by time to ensure smooth framerate-independent speed
        transform.Translate(movement * speed * Time.deltaTime);
    }
}
\`\`\`

## Unity Build Pipeline

Unity handles compiling your C# code and packaging your assets for over 20 different platforms.

<ArchitectureDiagram chart={\`
graph TD
  Source[C# Scripts & Assets]
  Engine[Unity Engine\\n(C++ Core)]
  IL2CPP[IL2CPP Compiler]
  
  subgraph Target Platforms
    iOS[iOS / App Store]
    Android[Android / Google Play]
    PC[Windows / Steam]
    Console[Xbox / PlayStation]
  end
  
  Source --> Engine
  Engine -- Converts C# to C++ --> IL2CPP
  IL2CPP -- Native Compilation --> iOS
  IL2CPP -- Native Compilation --> Android
  IL2CPP -- Native Compilation --> PC
  IL2CPP -- Native Compilation --> Console
\`} />

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Unreal Engine/index.mdx': `---
title: Unreal Engine
description: A powerful 3D creation tool by Epic Games.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Unreal Engine">

Unreal Engine (UE) is a 3D computer graphics game engine developed by Epic Games. Initially designed for PC first-person shooters, it is now heavily used in AAA game development, film and television virtual production (like *The Mandalorian*), and architectural visualization.

<Callout icon="warning" title="Steep Learning Curve">
  Unreal Engine is incredibly powerful, offering photorealistic rendering (Nanite, Lumen) out of the box, but it is notoriously complex to learn compared to Unity or Godot. It utilizes C++ instead of C#, which requires manual memory management awareness.
</Callout>

## Blueprints vs C++

Unreal offers two primary ways to script game logic:

<ComparisonTable 
  headers={['Method', 'Description', 'Pros / Cons']}
  rows={[
    ['Blueprints', 'A visual node-based scripting system.', 'Extremely fast iteration, designer-friendly. Can become visually messy ("spaghetti code").'],
    ['C++', 'Standard C++ integrated with Unreal\\'s macro system.', 'Maximum performance. Requires compilation times, harder to debug.']
  ]}
/>

## Example: C++ Actor

An \`Actor\` in Unreal is any object that can be placed in a level.

\`\`\`cpp
#include "MyActor.h"

AMyActor::AMyActor()
{
    // Set this actor to call Tick() every frame
    PrimaryActorTick.bCanEverTick = true;
}

void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    UE_LOG(LogTemp, Warning, TEXT("Hello from Unreal C++!"));
}

void AMyActor::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);

    // Move the actor upwards every frame
    FVector NewLocation = GetActorLocation();
    NewLocation.Z += 100.0f * DeltaTime;
    SetActorLocation(NewLocation);
}
\`\`\`

## Core Subsystems

Unreal includes massive built-in frameworks that you would normally have to write yourself in other engines.

<ArchitectureDiagram chart={\`
graph TD
  Game[Your Game]
  
  subgraph Unreal Engine Core
    GAS[Gameplay Ability System\\n(Spells, Buffs, Stats)]
    Lumen[Lumen\\n(Global Illumination)]
    Nanite[Nanite\\n(Virtual Geometry)]
    Chaos[Chaos\\n(Physics & Destruction)]
  end
  
  Game --> GAS
  Game --> Lumen
  Game --> Nanite
  Game --> Chaos
\`} />

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Godot/index.mdx': `---
title: Godot
description: A free and open-source game engine.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Godot">

The Godot Engine is a free, all-in-one, cross-platform game engine that makes it easy for developers to create 2D and 3D games. It is completely open-source under the MIT license, meaning no royalties, no subscription fees, and no strings attached.

<Callout icon="tip" title="The Node Tree Paradigm">
  Unlike Unity's component-based system, Godot uses an object-oriented approach where everything is a **Node**. Nodes are arranged in a tree structure. A Scene is just a tree of Nodes, and Scenes can be nested inside other Scenes endlessly.
</Callout>

## GDScript

While Godot supports C# and C++ (via GDExtension), its primary language is **GDScript**, a Python-like dynamically typed language built specifically for the engine. It is tightly integrated, meaning no compile times and instant hot-reloading.

<ComparisonTable 
  headers={['Language', 'Integration', 'Use Case']}
  rows={[
    ['GDScript', 'Native, seamless', 'Gameplay logic, UI, rapid prototyping.'],
    ['C#', '.NET module', 'Heavy computational tasks, existing enterprise developers.'],
    ['C++ / Rust', 'GDExtension', 'Maximum performance, engine modification, custom physics.']
  ]}
/>

## Example: A Simple Godot Script

Scripts are attached directly to Nodes. This script moves a Node to the right.

\`\`\`gdscript
extends CharacterBody2D

var speed: float = 400.0

func _ready():
    print("Node is ready and entered the scene tree!")

func _physics_process(delta: float):
    # Get input direction (-1, 0, or 1)
    var direction = Input.get_axis("ui_left", "ui_right")
    
    # Update velocity
    velocity.x = direction * speed
    
    # Built-in function to handle collision and movement
    move_and_slide()
\`\`\`

## Architecture & Signals

Godot uses the Observer pattern extensively via **Signals**. Instead of Nodes tightly coupling and calling functions on each other directly, they emit Signals (events) that other Nodes can listen to.

<ArchitectureDiagram chart={\`
graph TD
  Button[Button Node]
  Player[Player Node]
  Audio[AudioStreamPlayer Node]
  
  Button -- emits "pressed" signal --> Player
  Button -- emits "pressed" signal --> Audio
  
  Player -. _on_button_pressed() .-> Action[Jumps]
  Audio -. _on_button_pressed() .-> Sound[Plays "Click.wav"]
\`} />

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/OpenGL/index.mdx': `---
title: OpenGL
description: A cross-language, cross-platform API for rendering 2D and 3D vector graphics.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="OpenGL">

OpenGL (Open Graphics Library) is a cross-language, cross-platform application programming interface (API) for rendering 2D and 3D vector graphics. The API is typically used to interact with a Graphics Processing Unit (GPU), to achieve hardware-accelerated rendering.

<Callout icon="warning" title="Legacy Status">
  While OpenGL is still widely used in older games and educational software, Apple has deprecated it in favor of Metal, and the Khronos Group (creators of OpenGL) have created **Vulkan** as its modern, low-overhead successor. 
</Callout>

## The Graphics Pipeline

OpenGL is a state machine. You set the state (bind textures, load shaders, set buffers), and then issue a draw call. The data then flows through the programmable graphics pipeline.

<ComparisonTable 
  headers={['Pipeline Stage', 'Type', 'Purpose']}
  rows={[
    ['Vertex Shader', 'Programmable', 'Transforms 3D coordinates into 2D screen coordinates.'],
    ['Primitive Assembly', 'Fixed', 'Connects vertices into triangles or lines.'],
    ['Rasterization', 'Fixed', 'Converts triangles into fragments (pixels).'],
    ['Fragment Shader', 'Programmable', 'Calculates the final color and lighting of each pixel.']
  ]}
/>

## Architecture

OpenGL uses a client-server architecture where your C++ program is the client, and the GPU is the server.

<ArchitectureDiagram chart={\`
graph LR
  CPU[CPU (C++ Program)]
  RAM[System RAM]
  VRAM[(GPU VRAM)]
  GPU[GPU Cores]
  Screen[Display]
  
  CPU -- Load Vertices --> RAM
  CPU -- glBufferData --> VRAM
  CPU -- glDrawArrays --> GPU
  VRAM -. Read Data .-> GPU
  GPU -- Rasterize --> Screen
\`} />

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/WebGL/index.mdx': `---
title: WebGL
description: A JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="WebGL">

WebGL (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins. WebGL is fully integrated with other web standards, allowing GPU-accelerated usage of physics and image processing and effects as part of the web page canvas.

<Callout icon="info" title="It's just OpenGL ES">
  WebGL 1.0 is almost a direct port of **OpenGL ES 2.0** (the mobile version of OpenGL) into JavaScript. WebGL 2.0 brings it up to parity with OpenGL ES 3.0.
</Callout>

## Three.js & Frameworks

Because raw WebGL requires hundreds of lines of boilerplate just to draw a single colored triangle, almost no one writes raw WebGL. Instead, developers use wrapper libraries.

<ComparisonTable 
  headers={['Library', 'Use Case']}
  rows={[
    ['Three.js', 'The absolute industry standard for 3D web graphics. Handles scene graphs, cameras, and lighting.'],
    ['PixiJS', 'Highly optimized 2D WebGL renderer, often used for 2D browser games.'],
    ['Babylon.js', 'A powerful 3D engine created by Microsoft, often used for complex games and enterprise simulations.']
  ]}
/>

## Example: WebGL via Three.js

A minimal example of spinning a green cube using Three.js.

\`\`\`javascript
import * as THREE from 'three';

// 1. Setup Scene, Camera, and WebGL Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// 2. Create Geometry and Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 3. Render Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate cube every frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}
animate();
\`\`\`

</TechnologyTemplate>
`,
}

async function generateGames() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateGames().catch(console.error)
