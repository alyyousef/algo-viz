import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '49. Graphics, Game Development & Simulation/Unreal Engine/index.mdx': `---
title: Unreal Engine
description: A 3D computer graphics game engine developed by Epic Games, renowned for its extreme visual fidelity and used in AAA gaming and film production.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Unreal Engine"
  subtitle="The absolute pinnacle of AAA graphics"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Unreal_Engine_4_logo.svg/512px-Unreal_Engine_4_logo.svg.png"
  description="Unreal Engine is the industry-standard C++ game engine used to build the highest-end, hyper-realistic AAA video games (like Gears of War, Fortnite) and even Hollywood CGI (The Mandalorian)."
  yearCreated={1998}
  creator="Epic Games"
  isOpenSource={false}
  websiteUrl="https://www.unrealengine.com/"
>

Unreal Engine is mathematically massive. The source code is literally millions of lines of C++. 

It provides an unparalleled, out-of-the-box rendering pipeline designed specifically for hyper-realism, making it the undisputed king of First-Person Shooters, open-world RPGs, and Hollywood Virtual Production.

<Callout icon="success" title="Nanite and Lumen (UE5)">
  Unreal Engine 5 mathematically revolutionized real-time graphics:
  - **Nanite (Virtual Geometry):** Historically, artists had to mathematically optimize 3D models (LODs) to prevent the GPU from crashing. Nanite automatically scales geometry down to the sub-pixel level in real-time. You can drop a 1-billion-polygon movie asset directly into the game, and Nanite renders it at 60 FPS.
  - **Lumen (Global Illumination):** A hybrid software/hardware Ray Tracing system that calculates infinite light bounces in real-time, completely destroying the need for artists to pre-bake static lightmaps.
</Callout>

## Blueprints (Visual Scripting)

Unreal Engine is programmed in brutal, highly customized C++. Because C++ is terrifying for designers, Epic created **Blueprints**—a massive, node-based Visual Scripting language. You can program an entire AAA game by literally dragging and dropping mathematical logic wires between boxes, without typing a single line of C++.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Unity/index.mdx': `---
title: Unity
description: A cross-platform game engine developed by Unity Technologies, dominating the mobile, indie, and AR/VR markets.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Unity"
  subtitle="The engine of the Indie and Mobile revolution"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/512px-Unity_Technologies_logo.svg.png"
  description="Unity is the most widely used game engine on Earth by sheer volume. While Unreal dominates AAA PC/Console games, Unity absolutely dominates Mobile games (iOS/Android), Indie PC games, and AR/VR applications."
  yearCreated={2005}
  creator="Unity Technologies"
  isOpenSource={false}
  websiteUrl="https://unity.com/"
>

If Unreal Engine is a massive V8 Ferrari, Unity is an incredibly reliable, highly modular Toyota. 

Unity democratized game development. Instead of writing C++, developers use **C#** (via the Mono/IL2CPP runtimes). It provides an incredibly intuitive, component-based Editor that allows small indie teams to prototype games in days instead of years.

<Callout icon="warning" title="The Architecture Paradigm">
  Unity heavily relies on a **Component-Based** architecture (specifically, \`MonoBehaviour\`). 
  You create an empty \`GameObject\`, attach a \`Rigidbody\` component for gravity, attach a \`MeshRenderer\` for visuals, and attach a custom \`C# Script\` component for logic. 
  
  However, because \`MonoBehaviour\` relies heavily on Reflection and scattered heap memory, Unity recently introduced **DOTS (Data-Oriented Technology Stack)**—a brutal, pure ECS architecture designed to mathematically squeeze maximum multi-threading performance out of the CPU.
</Callout>

## The "Build Once, Deploy Anywhere" Promise

Unity's greatest mathematical strength is its compiler. You write a game once in C#, and Unity mathematically cross-compiles it to 25 different physical architectures: iOS, Android, Windows, macOS, Linux, PS5, Xbox, Nintendo Switch, and WebGL.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Godot/index.mdx': `---
title: Godot
description: A cross-platform, free and open-source game engine released under the MIT license, known for its unique node-based architecture.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Godot"
  subtitle="The Open-Source rebel"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Godot_icon.svg/512px-Godot_icon.svg.png"
  description="Godot is the 'Blender' of game engines. It is 100% free, fiercely open-source (MIT License), and takes exactly 0% of your game's revenue. It has exploded in popularity among indie developers."
  yearCreated={2014}
  creator="Juan Linietsky and Ariel Manzur"
  isOpenSource={true}
  websiteUrl="https://godotengine.org/"
>

Unreal takes a 5% royalty fee. Unity recently attempted a highly controversial "Runtime Fee" business model. Because **Godot** is MIT Licensed, you legally own 100% of the game you build.

<Callout icon="tip" title="The Node Hierarchy Architecture">
  Unlike Unity's flat \`GameObject\` list, Godot relies on a strict **Tree Hierarchy of Nodes**.
  
  In Godot, everything is a Node. A \`Player\` is not an object; it is a Scene containing a tree of nodes (a \`KinematicBody\` node, which contains a \`CollisionShape\` node and a \`Sprite\` node). You can mathematically instance this entire \`Player\` scene directly inside a \`Level\` scene. It is incredibly clean, modular, and strongly resembles the DOM tree in web development.
</Callout>

## GDScript

While Godot supports C# and C++, its primary language is **GDScript**—a custom, Python-like language mathematically optimized specifically for Godot's internal Node architecture. It is incredibly fast to write, perfectly integrated into the editor, and bypasses the heavy compilation times of C#.

</TechnologyTemplate>
`,
  '49. Graphics, Game Development & Simulation/Animation systems/index.mdx': `---
title: Animation Systems
description: The programmatic and mathematical systems used to interpolate between different poses, frames, and states of a 3D or 2D character over time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Animation Systems">

In a movie, animation is just playing a static video file. In a video game, animation is highly dynamic and purely mathematical.

If a player is running forward and suddenly presses "Attack," the engine mathematically cannot simply jump to Frame 1 of the Attack animation; the character's geometry will violently snap, breaking the physics.

<Callout icon="info" title="Animation Blending">
  Modern engines use **Blend Trees**. 
  
  The engine mathematically interpolates (cross-fades) the skeletal rotations of the \`Run\` animation with the skeletal rotations of the \`Attack\` animation over exactly 0.2 seconds. This mathematical blending ensures the character smoothly transitions between states without any geometric snapping.
</Callout>

## Inverse Kinematics (IK) in Animation

If a character walks up a flight of stairs, the pre-recorded walking animation assumes the floor is perfectly flat. The character's foot will visually clip through the stairs.

To fix this, the Animation System runs real-time **Inverse Kinematics (IK)**. It shoots a mathematical raycast from the foot down to the stair. It calculates the exact XYZ collision point, mathematically overrides the pre-recorded animation, and forces the ankle, knee, and hip joints to physically rest perfectly on the geometry of the stair.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Rigging/index.mdx': `---
title: Skeletal Rigging
description: A technique in computer animation in which a character is represented in two parts: a surface representation used to draw the character, and a hierarchical set of interconnected bones used to animate the mesh.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Skeletal Rigging">

A 3D character is just a massive array of 50,000 triangles (the Mesh). If you want the character to bend its elbow, mathematically modifying the XYZ coordinates of 50,000 individual triangles by hand every frame is impossible.

This is solved via **Skeletal Rigging**.

<Callout icon="warning" title="Bones and Weight Painting">
  An artist creates an invisible mathematical skeleton (Armature) inside the 3D mesh. 
  
  The artist then performs **Weight Painting**. They mathematically assign every single triangle in the mesh a percentage of influence to a specific bone. 
  - The bicep triangles are weighted 100% to the Upper_Arm bone.
  - The elbow triangles are mathematically split: 50% weighted to the Upper_Arm bone, and 50% to the Forearm bone.
</Callout>

## Skeletal Mesh Deformation

In the game engine, the programmer only rotates the invisible Forearm Bone. 

The engine's Vertex Shader mathematically calculates the transformation matrix of the bone, looks at the Weight Paint data, and instantly deforms the 50,000 physical triangles of the mesh to follow the bone. Because the elbow triangles are weighted 50/50, they mathematically stretch and compress perfectly, simulating human skin and muscle.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Particle systems/index.mdx': `---
title: Particle Systems
description: A technique in game physics and computer graphics that uses a large number of very small sprites, 3D models, or other graphic objects to simulate certain kinds of "fuzzy" phenomena.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Particle Systems">

How do you mathematically render fire, smoke, rain, or a massive explosion?

You cannot build a 3D model of fire. It has no solid geometry. Instead, graphics engines use **Particle Systems**.

<Callout icon="tip" title="The Billboard Trick">
  A Particle System is a massive mathematical emitter that spawns 10,000 tiny 2D images (Sprites) of smoke per second. 
  
  Because 3D math is expensive, these 10,000 images are usually rendered as **Billboards**. The GPU mathematically forces the 2D image to permanently rotate and face the Camera perfectly, no matter where the player is standing. It creates a flawless optical illusion of volumetric 3D smoke using almost zero GPU geometry.
</Callout>

## GPU Compute Particles

Historically, the CPU had to calculate the physics (gravity, wind, lifetime) for all 10,000 particles, which bottlenecked the system. 

Modern AAA games (like *Returnal*) use **GPU Compute Particles** (Niagara in Unreal Engine). The engine offloads the entire particle simulation to the GPU Compute Shaders. Because the GPU has 5,000 cores, it can mathematically calculate physics and collisions for **10 million particles** simultaneously, creating terrifyingly realistic fluid and spark simulations.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Procedural generation/index.mdx': `---
title: Procedural Generation
description: In computing, procedural generation is a method of creating data algorithmically as opposed to manually, typically through a combination of human-generated assets and algorithms coupled with computer-generated randomness and processing power.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Procedural Generation">

If you want a video game map the size of the real-world Earth (like *Minecraft* or *No Man's Sky*), it is mathematically impossible for a human level-designer to manually place 10 trillion trees. Furthermore, the 3D data for an Earth-sized map would require 50 Petabytes of hard drive space.

The solution is **Procedural Generation**. 

<Callout icon="success" title="Noise Algorithms (Perlin / Simplex)">
  Procedural Generation is not "pure random." Pure randomness creates white noise static. 
  
  Instead, engines use mathematical **Gradient Noise Algorithms** (like Perlin Noise). Perlin Noise generates a smooth, continuously flowing mathematical wave of numbers between 0 and 1. 
  - If the number is \`0.1\`, the engine renders an Ocean.
  - If the number is \`0.5\`, it renders Grass.
  - If the number is \`0.9\`, it renders a Mountain.
</Callout>

## The Seed

The most powerful mathematical property of Procedural Generation is the **Seed**. 
Because the algorithm is deterministic, if you input the exact same mathematical Seed (e.g., \`12345\`), the algorithm will output the exact same 10 trillion trees in the exact same physical coordinates every single time. This allows a 50-Petabyte universe to mathematically fit inside a 5-Megabyte game file.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Level design/index.mdx': `---
title: Level Design
description: A discipline of game development involving the creation of video game levels—locales, stages, or missions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Level Design">

**Level Design** is the intersection of architecture, psychology, and gameplay mathematics. It is the process of physically building the environment the player will navigate.

<Callout icon="info" title="The Whitebox Phase">
  A level designer never starts by placing high-resolution 3D assets or lighting. 
  
  They start with **Whiteboxing (Blockout)**. They use raw, untextured grey cubes to mathematically block out the walls, cover, and distances. The entire focus is purely on metrics: "Is this gap exactly 5 meters wide so the player's jump physics can mathematically clear it?" Once the geometry plays perfectly, the artists replace the grey cubes with high-resolution castles or spaceships.
</Callout>

## Leading the Player

Because players get lost easily, level designers use subconscious psychological triggers to guide them without using UI arrows:
- **Lighting:** Humans mathematically walk toward light sources. Putting a bright spotlight above a door guarantees the player will notice it.
- **Color Theory (The "Yellow Paint" trope):** In games like *Resident Evil* or *Horizon*, climbable ledges are splashed with highly contrasting yellow paint to immediately draw the player's eye.
- **Weenies:** A term invented by Walt Disney. A massive, towering landmark (like a giant volcano) visible from anywhere in the level that mathematically provides constant geographic orientation.

</ConceptTemplate>
`,
  '49. Graphics, Game Development & Simulation/Game monetization models/index.mdx': `---
title: Game Monetization Models
description: The methods and strategies by which video game developers and publishers generate revenue from their products.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Game Monetization Models">

Building a video game is a massive software engineering feat, but it is ultimately a business. **Monetization** is the economic mathematics of how a game sustains its server costs and development team.

<Callout icon="warning" title="The Shift to F2P">
  Historically, games used a **Premium (Buy-to-Play)** model. You paid $60 once, and owned the game forever. 
  
  Today, the industry is overwhelmingly dominated by the **Free-to-Play (F2P)** model. The game is given away mathematically for free to maximize the total addressable market (playerbase), and revenue is extracted surgically via microtransactions.
</Callout>

## Primary Economic Models

1. **Gacha / Loot Boxes:** Mathematically mimicking a casino. Players pay real money for a 1% statistical probability of unlocking a rare character. Incredibly lucrative, but heavily regulated or banned in several European countries due to gambling laws.
2. **Battle Pass:** The psychological genius of modern retention (popularized by *Fortnite*). Players pay $10 to unlock a progression track. They do not get the items immediately; they must mathematically grind the game for 50 hours to unlock the items they already paid for, guaranteeing massive Daily Active User (DAU) retention.
3. **Cosmetic Microtransactions:** Players pay for visual changes (Skins) that offer zero mathematical advantage to the gameplay physics, ensuring the game is not "Pay-to-Win."

</ConceptTemplate>
`,
}

async function generateMega91() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega91().catch(console.error)
