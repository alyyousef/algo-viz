import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/31. AI Agent Systems/Model Context Protocol (MCP)/index.mdx': `---
title: Model Context Protocol (MCP)
description: An emerging, standardized architectural protocol that allows LLMs to mathematically interface with external data sources and tools in a universally consistent, agnostic manner.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model Context Protocol (MCP)">

Historically, if you wanted an OpenAI Agent to read a Google Drive file, you had to write custom Python glue code. If you switched to Anthropic, you had to rewrite it. MCP standardizes this mathematically.

## 1. The Client-Server Architecture
MCP uses a strict Client-Server mathematical model.
- **The LLM Application (Client)**: The Agent framework (like LangChain) implements the MCP Client protocol.
- **The Data Source (Server)**: A developer builds an "MCP Server" that wraps Google Drive, exposing a standardized mathematical JSON-RPC interface.
Because the communication protocol is mathematically standardized, any LLM that speaks MCP can instantly connect to any MCP Server in the world, perfectly decoupling the intelligence layer from the physical data layer.

## 2. Dynamic Context Injection
Instead of forcing the developer to manually fetch data and paste it into the prompt, MCP handles it natively.
When the LLM decides it needs a file, it sends a standardized MCP mathematical payload to the Server. The Server retrieves the file, mathematically formats it into the exact Context format required by the LLM, and streams it back. This allows the Agent to dynamically, autonomously mount and unmount massive external databases in real-time without overflowing its context window.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Multi-agent systems/index.mdx': `---
title: Multi-Agent Systems
description: Complex AI architectures where multiple, specialized, autonomous Agents mathematically interact, negotiate, and collaborate to solve massive problems that single Agents cannot comprehend.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Agent Systems">

A single LLM cannot mathematically write an entire operating system. Its context window will overflow, and its logic will thrash. Multi-Agent Systems solve this by applying the mathematical principles of Distributed Computing to AI.

## 1. Specialization and Scope
The mathematical power of Multi-Agent Systems comes from strict scope reduction.
You do not give a single Agent the prompt "Build an app."
Instead, you define three Agents:
- **Architect**: Mathematically constrained to only output folder structures and architecture designs.
- **Coder**: Mathematically constrained to only output raw Python code.
- **Tester**: Mathematically constrained to only execute Unit Tests.
Because each Agent has a hyper-specific, narrow System Prompt, the mathematical probability of a hallucination drops to near zero within their specific domain. 

## 2. Topologies
Agents must communicate. The mathematical structure of this communication is the **Topology**:
- **Sequential**: A $\\rightarrow$ B $\\rightarrow$ C. (Strict assembly line, highly predictable).
- **Hierarchical**: Manager A delegates to Workers B, C, D. (Fault-tolerant, excellent for broad tasks).
- **Networked (Swarm)**: Any agent can mathematically talk to any other agent. (Highest potential for creative problem solving, but mathematically prone to chaotic, infinite conversation loops if not strictly monitored).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Planning/index.mdx': `---
title: Agent Planning
description: The critical architectural phase where an autonomous AI mathematically decomposes a massive, ambiguous goal into a strict, executable Directed Acyclic Graph (DAG) of sub-tasks before taking any physical action.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agent Planning">

If you tell an Agent to "Deploy a web server," and it immediately starts guessing bash commands, it will destroy the environment. Advanced Agents must mathematically *Plan* before they *Act*.

## 1. Task Decomposition
The foundational mathematical algorithm of Planning is Decomposition. 
The Agent is forced into a sandbox where it cannot execute tools. It must output a strict JSON array of Sub-Tasks. 
Goal: "Deploy web server."
Plan:
1. TICK1Install NginxTICK1
2. TICK1Write index.htmlTICK1
3. TICK1Configure port 80TICK1
4. TICK1Start serviceTICK1
By mathematically forcing the LLM to generate the steps linearly, it shifts the neural network's Attention Mechanism. When executing step 3, the math is heavily influenced by the context of steps 1 and 2, drastically increasing logic accuracy.

## 2. Tree of Thoughts (ToT)
Standard planning is linear (Chain of Thought). Advanced planning uses the **Tree of Thoughts** mathematical topology.
During the planning phase, the Agent mathematically generates *three different possible plans*. It then acts as an Evaluator, scoring each branch of the tree based on risk and efficiency. It prunes the bad branches and selects the mathematically optimal path before writing a single line of code, mimicking deep, System 2 human reasoning.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/ReAct pattern/index.mdx': `---
title: ReAct Pattern (Reason + Act)
description: The fundamental mathematical paradigm that elevated LLMs from passive text generators to active autonomous Agents by forcing them to explicitly interleave internal logic with external tool execution.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="ReAct Pattern (Reason + Act)">

Introduced by researchers at Princeton and Google, ReAct is the exact mathematical algorithm that powers almost all modern AI Agents. It forces the LLM to "think out loud" before touching an API.

## 1. The Mathematical Loop
In standard generation, an LLM predicts the next word. In ReAct, the LLM is constrained to output a very specific sequence:
1. **Thought**: The LLM outputs its mathematical reasoning. *"The user wants the weather in Paris. I need to get the coordinates of Paris first."*
2. **Action**: The LLM outputs a strict API call. *"Action: GeocodeTool('Paris')"*
The LLM mathematically pauses. The external system executes the API.
3. **Observation**: The system injects the physical result. *"Observation: Lat 48.8, Lon 2.3"*
The LLM resumes, generating Thought 2.

## 2. Why the Thought is Mandatory
If you remove the **Thought** step and force the LLM to go straight to **Action**, the Agent will mathematically fail at complex tasks. 
Generating the physical text of the "Thought" mathematically populates the Context Window with crucial logical tokens. When the Attention Mechanism calculates the next word for the "Action", it pays heavy mathematical attention to the logic it just wrote in the "Thought", acting as a self-correcting mathematical buffer that prevents erratic API calls.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Reflection/index.mdx': `---
title: Agent Reflection
description: A recursive mathematical process where an AI Agent intentionally reviews its own previous actions or outputs, critiques them for errors, and autonomously generates a corrected version.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agent Reflection">

Humans rarely write perfect code on the first try; we write, we read it, we see a bug, and we fix it. Agent Reflection forces an LLM to mathematically execute this exact self-correction loop.

## 1. The Critic Pattern
Reflection relies on a mathematical duality within the prompt or the Agent architecture.
- **Generator**: The LLM writes a Python script.
- **Critic**: The exact same LLM is mathematically re-prompted: *"You are a senior engineer. Review the script above. Find any logic errors or syntax bugs and output a list of required fixes."*
Because the Critic prompt shifts the mathematical weights of the neural network toward "bug-finding" rather than "creating," the LLM will reliably find errors in its own work.

## 2. Self-Correction Loop
Once the Critic generates the list of errors, the data is mathematically piped back into the Generator. 
*"Here is your previous code. Here are the errors found. Rewrite the code perfectly."*
This loop (Generate $\\rightarrow$ Reflect $\\rightarrow$ Correct) mathematically continues until the Critic outputs TICK1No errors foundTICK1. Reflection drastically increases the mathematical accuracy of an Agent, completely eliminating the need for the human to point out obvious mistakes.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Semantic Kernel/index.mdx': `---
title: Semantic Kernel
description: Microsoft's highly structured, enterprise-grade SDK for integrating Large Language Models into C# and Python, treating AI capabilities as mathematically standard software functions.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Semantic Kernel"
  subtitle="Enterprise LLM Orchestration"
  tags={['AI', 'Microsoft', 'C#', 'Framework']}
>

LangChain is built for rapid Python prototyping. Semantic Kernel is built by Microsoft for enterprise, strictly typed, mathematically robust integration into legacy software (like .NET).

## 1. Plugins and Semantic Functions
In Semantic Kernel, an LLM Prompt is not just a string; it is mathematically wrapped into a **Semantic Function**.
You define a Prompt in a text file, and you define a standard C# function (e.g., TICK1GetDatabaseRecord()TICK1). Both are mathematically bound together into a **Plugin**.
To the C# developer, calling the LLM looks exactly like calling a standard, strictly typed C# method. The mathematical complexity of the HTTP API call, the JSON parsing, and the token management is entirely abstracted away by the Kernel.

## 2. The Planner
Semantic Kernel contains a powerful mathematical engine called **The Planner**.
You give the Planner a Goal ("Send an email summarizing yesterday's sales"). 
The Planner mathematically analyzes the entire repository of registered Plugins. It autonomously deduces that it needs to chain the C# TICK1GetSales()TICK1 plugin into the Semantic TICK1SummarizeText()TICK1 plugin, and finally into the C# TICK1SendEmail()TICK1 plugin. It generates the Execution Graph and runs it, turning the static C# backend into an autonomous AI Agent.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Tools/index.mdx': `---
title: Agent Tools
description: The physical, executable code blocks that mathematically connect an LLM's neural network to the outside world, allowing it to perform actions like browsing the web or executing SQL.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Agent Tools">

An LLM cannot browse the internet. If you ask it for today's news, its neural weights mathematically cannot access real-time data. It must be provided a WebBrowser Tool.

## 1. The Anatomy of a Tool
A Tool is a strict mathematical contract between the LLM and the physical computer. It has three parts:
1. **Name**: e.g., TICK1execute_pythonTICK1
2. **Description**: The most critical part. The prompt mathematically explaining to the LLM *exactly* when and how to use it. (e.g., "Use this to run math equations").
3. **Arguments (Schema)**: The exact JSON structure required (e.g., TICK1{"code": "string"}TICK1).
4. **The Executable**: The actual physical Python/Node function sitting on the server that does the work.

## 2. Tool Binding and Safety
When the LLM requests a Tool, the Application Framework (LangChain, CrewAI) mathematically halts the LLM. It extracts the JSON, validates it against the Schema (preventing Malformed Tool calls), and physically executes the Python function.
**Safety is paramount.** If you give an LLM a TICK1BashTerminalTICK1 Tool without sandboxing it inside a Docker container, the LLM might hallucinate a TICK1rm -rf /TICK1 command and physically destroy your entire server infrastructure. Tools are the mathematical bridge that makes AI dangerous.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Workflow orchestration/index.mdx': `---
title: Workflow Orchestration
description: The architectural discipline of mathematically modeling, monitoring, and executing complex, long-running logic sequences across multiple AI Agents and standard APIs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Workflow Orchestration">

If you have a pipeline that requires 5 different Agents, 3 API calls, and a human approval step, you cannot just write a giant Python TICK1whileTICK1 loop. If the script crashes at step 4, you lose all progress. You need Workflow Orchestration.

## 1. Directed Acyclic Graphs (DAGs)
Tools like Temporal, Apache Airflow, or LangGraph map the entire AI process as a mathematical **Directed Graph**.
Each Agent or Tool is a Node. The Workflow Orchestrator mathematically guarantees that Node B will not execute until Node A has successfully completed. 
Crucially, the Orchestrator maintains **State**. If the server physically catches on fire while Node C is running, when the server reboots, the Orchestrator mathematically resumes the workflow exactly at Node C, preventing you from having to re-run and pay for the expensive LLM calls from Nodes A and B.

## 2. Human-in-the-Loop (HITL)
Orchestration frameworks natively support mathematical "Pause" states. 
An Agent might draft a legal contract (Node 1). The Orchestrator mathematically pauses execution and sends a Slack message to a human. The workflow sleeps indefinitely. When the human clicks "Approve", the Orchestrator wakes up and passes the State to Node 2 (Email the contract). This allows fully deterministic, safe orchestration of non-deterministic AI models in enterprise environments.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/3D vision/index.mdx': `---
title: 3D Vision
description: The advanced branch of Computer Vision that mathematically reconstructs three-dimensional geometric space and volume from flat, two-dimensional pixel arrays.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="3D Vision">

A standard camera crushes the 3D real world into a flat 2D matrix of pixels. 3D Vision uses advanced mathematics to reconstruct the lost Z-axis (Depth), essential for autonomous driving and robotics.

## 1. Stereovision and Disparity
Humans have two eyes. By calculating the slight visual difference (Disparity) between the left eye and right eye, our brains mathematically calculate depth. 
Stereo cameras do the exact same thing. By applying **Epipolar Geometry**, the algorithm mathematically compares the left pixel array with the right pixel array. If a pixel shifts drastically between the two images, the algorithm mathematically proves the object is very close to the lens. This generates a **Depth Map**, where pixel intensity represents physical distance.

## 2. LiDAR and Point Clouds
Cameras rely on light and can fail in shadows. LiDAR (Light Detection and Ranging) physically shoots lasers at the world.
It measures the exact physical time it takes for the photon to bounce back (Time of Flight). This generates a **Point Cloud**: a massive mathematical array of millions of exact $(X, Y, Z)$ coordinates. 
To process this, Neural Networks cannot use standard 2D Convolutions. They must use specialized architectures like **PointNet**, which are mathematically designed to consume unordered, chaotic arrays of 3D coordinates to detect objects (like "Pedestrian" or "Stop Sign") with absolute spatial precision.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/CLIP/index.mdx': `---
title: CLIP (Contrastive Language-Image Pretraining)
description: A revolutionary foundational model by OpenAI that mathematically maps human text and visual images into the exact same semantic Latent Space, permanently bridging the gap between Vision and Language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CLIP">

Before CLIP, if you wanted an AI to recognize a "Dog", you had to manually train it on 10,000 images labeled "Dog." If you showed it a "Cat", it mathematically broke. CLIP solved this by learning from the internet.

## 1. Contrastive Learning
CLIP consists of two Neural Networks: a Text Encoder (Transformer) and an Image Encoder (ResNet/ViT).
OpenAI scraped 400 million image-text pairs from the internet (e.g., a picture of a dog, with the caption "A happy dog in the park").
During training, CLIP mathematically pushes the Vector for the Image and the Vector for the Text as close together as possible (Contrastive Loss). Simultaneously, it mathematically pushes the Image Vector away from the text vectors of all the *other* images in the batch. 

## 2. Zero-Shot Classification
Because CLIP mathematically mapped the entire English language into the exact same geometric space as all visual pixels, it achieved **Zero-Shot Classification**.
You can give CLIP a picture it has never seen before. You give it the labels ["Car", "Dog", "Spaceship"]. CLIP mathematically embeds all three words into Vectors. It embeds the Image into a Vector. It then calculates the Cosine Similarity. If the Image Vector is geometrically closest to the "Spaceship" Vector, it classifies it as a Spaceship, without ever being explicitly trained on a Spaceship dataset. This is the mathematical foundation of all modern Text-to-Image models (like Midjourney and Stable Diffusion).

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
