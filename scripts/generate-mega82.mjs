import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/31. AI Agent Systems/Agents/index.mdx': `---
title: AI Agents
description: Autonomous computational entities powered by Large Language Models that possess the architectural ability to reason, plan, and physically interact with external environments via tools.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AI Agents">

An LLM is a Brain in a jar; it can only read text and output text. An Agent is a Brain with hands; it is mathematically wired to APIs, allowing it to perform physical actions in the real world.

## 1. The ReAct Architecture (Reason + Act)
The foundational mathematical pattern for Agents is **ReAct**. 
Instead of just answering a prompt, the LLM is forced into a highly structured mathematical loop:
1. **Thought**: The LLM mathematically reasons about the problem.
2. **Action**: The LLM outputs a strictly formatted string (JSON) requesting to use a specific Tool (e.g., TICK1{"tool": "Calculator", "args": "5*5"}TICK1).
3. **Observation**: The System intercepts the Action, physically executes the Tool, and mathematically feeds the Result back into the LLM.
This loop repeats recursively until the LLM mathematically deduces that the overarching task is complete.

## 2. Tool Use (Function Calling)
How does the Agent know what "hands" it has?
During initialization, the developer provides a mathematical JSON Schema defining available Tools (e.g., TICK1SearchWebTICK1, TICK1ExecuteSQLTICK1, TICK1SendEmailTICK1) and their required arguments. The LLM's Softmax distribution is heavily conditioned on this Schema, mathematically guiding it to output perfectly formatted API requests instead of conversational text when a real-world action is required.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/AutoGen/index.mdx': `---
title: AutoGen
description: A groundbreaking framework developed by Microsoft designed explicitly to build Multi-Agent systems, where multiple specialized AI models converse and debate to solve complex tasks collaboratively.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AutoGen"
  subtitle="Multi-Agent Conversational Framework"
  tags={['AI', 'Agents', 'Microsoft', 'Multi-Agent Systems']}
>

If a single Agent gets confused, it often mathematically spirals into a hallucination loop. AutoGen solves this by creating multiple, distinct Agents that mathematically check each other's work through simulated human conversation.

## 1. The Conversational Pattern
In AutoGen, the fundamental unit of execution is not a single ReAct loop, but a **Message Passing Protocol**.
You mathematically define a TICK1CoderAgentTICK1 (prompted to write Python) and a TICK1ReviewerAgentTICK1 (prompted to find bugs). 
The User gives the Coder a task. The Coder generates the code and mathematically passes it to the Reviewer. If the Reviewer finds a bug, it replies to the Coder. This multi-turn conversational loop mathematically continues until both Agents reach a consensus or the code successfully compiles. 

## 2. Human-in-the-Loop Integration
AutoGen is mathematically designed to treat Human beings as just another Agent in the network.
A TICK1UserProxyAgentTICK1 is instantiated. During the massive AI-to-AI conversation, the System can mathematically pause execution and prompt the human via the Terminal: *"The Coder wants to delete this database. Do you approve?"* This architectural design seamlessly blends autonomous mathematical reasoning with strict human oversight.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/CrewAI/index.mdx': `---
title: CrewAI
description: A high-level, production-ready framework for orchestrating role-based, multi-agent AI systems, utilizing explicit task delegation and hierarchical management structures.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="CrewAI"
  subtitle="Role-Based Multi-Agent Orchestration"
  tags={['AI', 'Agents', 'CrewAI', 'Orchestration']}
>

While AutoGen focuses on free-flowing conversation between Agents, CrewAI imposes strict, corporate-style mathematical hierarchies on the AI models to guarantee deterministic execution flows.

## 1. Agents, Tasks, and Crews
CrewAI relies on three fundamental mathematical primitives:
1. **Agents**: LLMs defined by a strict Role, Goal, and Backstory (e.g., "Senior Data Analyst").
2. **Tasks**: Explicit, mathematically constrained goals (e.g., "Analyze this CSV and output a summary").
3. **Crew**: The overarching manager that binds Agents to Tasks.
The Crew orchestrates execution. If the architecture is set to **Sequential**, Agent A mathematically *must* finish Task 1 before Agent B is allowed to begin Task 2, using Agent A's output as its input.

## 2. Hierarchical Delegation
In advanced configurations, CrewAI uses a **Manager Agent**.
The User gives the Manager a massive goal. The Manager mathematically breaks the goal into sub-tasks and dynamically delegates them to the subordinate Agents based on their defined Roles. If a subordinate fails, the Manager mathematically reviews the error and re-assigns the task with corrected instructions, mimicking the logic of a human project manager.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/episodic)/index.mdx': `---
title: Episodic Memory in Agents
description: The architectural mechanism allowing AI Agents to mathematically record, index, and retrieve specific past events and actions, preventing them from repeating identical logic errors.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Episodic Memory in Agents">

If a human burns their hand on a stove, they remember the *episode* and never do it again. If an LLM Agent crashes a server using a bad SQL query, and its context window is cleared, it will mathematically execute the exact same bad query again. Episodic Memory solves this.

## 1. The Experience Buffer
Instead of just executing a ReAct loop (Thought $\\rightarrow$ Action $\\rightarrow$ Observation) and throwing the data away, the Agent mathematically serializes the entire "Episode" into a JSON object and saves it to a persistent Vector Database.
This Episode includes the Initial Goal, the exact Sequence of Tools used, and the Final Outcome (Success/Failure). 

## 2. Reflection and Retrieval
Before the Agent tackles a new task, it mathematically embeds the new task into a Vector and queries its Episodic Memory.
If it finds a mathematically similar past Episode that resulted in Failure, the Agent's System Prompt dynamically injects a **Reflection**: *"Last time you tried this, it failed because of a syntax error. Do not use that approach."* By maintaining a persistent, searchable database of its own mathematical failures and successes, the Agent exhibits true long-term learning across isolated sessions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Function calling/index.mdx': `---
title: Function Calling (Tool Use)
description: The strict mathematical protocol allowing Large Language Models to deterministically request the execution of predefined external code functions, acting as the foundation of all AI Agents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Function Calling">

LLMs are mathematically trained to generate human language. Getting them to generate a perfectly formatted, syntactically flawless JSON object to trigger an API was historically very difficult. OpenAI solved this mathematically at the API level with Function Calling.

## 1. The JSON Schema Definition
When calling the LLM API, the developer passes a mathematical **Schema** defining the available tools.
TICK3json
{
  "name": "get_weather",
  "description": "Get current temperature",
  "parameters": {
    "type": "object",
    "properties": { "location": { "type": "string" } }
  }
}
TICK3
The LLM is mathematically fine-tuned to recognize these schemas. If the user asks, "Is it hot in Tokyo?", the LLM calculates that answering with text is mathematically less optimal than triggering the function. 

## 2. Deterministic Interception
The LLM does *not* execute the function. It mathematically stops generating text and outputs a strict JSON payload: TICK1{"name": "get_weather", "arguments": {"location": "Tokyo"}}TICK1.
The developer's server intercepts this payload, physically executes the TICK1get_weather()TICK1 Python code, and sends the integer TICK132TICK1 back to the LLM. Only then does the LLM mathematically resume text generation, combining the physical data (32) with natural language to say, *"It is currently 32 degrees in Tokyo."*

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/LangChain/index.mdx': `---
title: LangChain
description: The foundational, massive orchestration framework for building LLM applications, standardizing the mathematical integration of Prompts, Models, Vector Databases, and Agent Tools.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="LangChain"
  subtitle="LLM Application Framework"
  tags={['AI', 'LangChain', 'Framework', 'Agents']}
>

Before LangChain, developers had to write custom API wrappers for OpenAI, Anthropic, Pinecone, and Google Search. LangChain mathematically standardized all of these into unified abstractions.

## 1. Chains and Runnables
The core mathematical concept is the **Chain**. 
A Chain is a deterministic sequence of operations. 
Using LangChain's LCEL (LangChain Expression Language), developers mathematically pipe components together: 
TICK1PromptTemplate | LLM | OutputParserTICK1.
The output of the Prompt is mathematically piped into the LLM, whose output is piped into a JSON parser. If you decide to swap OpenAI for an open-source Llama model, you change one line of code; the overarching mathematical Chain remains flawlessly intact.

## 2. Tool Binding and Agents
LangChain provides a massive standard library of Tools (Web Browsers, SQL Executers, Python Interpreters). 
It mathematically binds these tools to an LLM to create an Agent. LangChain handles the complex prompt engineering required for ReAct loops, parsing the LLM's outputs, physically executing the bound Tools, and handling the mathematical recursion until the Agent returns a final answer. 

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/LangGraph/index.mdx': `---
title: LangGraph
description: A stateful, highly cyclical orchestrator built on top of LangChain, designed specifically to model Multi-Agent systems and complex logic loops as strictly defined mathematical Directed Graphs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="LangGraph"
  subtitle="Stateful Multi-Agent Orchestration"
  tags={['AI', 'LangGraph', 'Graphs', 'Agents']}
>

Standard LangChain Chains are Directed Acyclic Graphs (DAGs)—they mathematically go from Start to Finish and cannot loop backwards. Autonomous Agents *must* loop (Thought $\\rightarrow$ Action $\\rightarrow$ Observation $\\rightarrow$ Thought). LangGraph mathematically enables cycles.

## 1. Nodes, Edges, and State
LangGraph models an Agent application as a State Machine.
- **State**: A mathematical object (like a Python Dictionary) that holds the memory of the current logic flow (e.g., "Current Error", "Current Code").
- **Nodes**: Standard Python functions that receive the State, mathematically modify it, and return the new State.
- **Edges**: Conditional mathematical logic that determines which Node to run next. 

## 2. Cyclical Execution
If Node A (Coder) generates code, the State is passed to Node B (Tester).
The Edge after Node B contains mathematical logic: *If tests pass, go to Node C (End). If tests fail, loop backward to Node A.* 
This creates a persistent, fault-tolerant mathematical loop. Because the State is explicitly defined and managed outside the LLM, developers can pause execution, manually edit the State, or resume a failed loop from a specific Node, which is mathematically impossible in standard LangChain.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/LlamaIndex/index.mdx': `---
title: LlamaIndex
description: A specialized, highly advanced framework focused entirely on the Data Ingestion and Retrieval layer of AI applications, acting as the mathematical bridge between LLMs and enterprise data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="LlamaIndex"
  subtitle="Data Framework for LLMs"
  tags={['AI', 'LlamaIndex', 'RAG', 'Data Pipelines']}
>

While LangChain focuses on what the LLM *does* (Agents/Tools), LlamaIndex focuses obsessively on what the LLM *knows* (RAG Pipelines).

## 1. Advanced Indexing Algorithms
If you dump 10,000 PDFs into a Vector Database, standard retrieval algorithms mathematically degrade. LlamaIndex introduces advanced Indexing geometries.
- **Tree Index**: Mathematically summarizes chunks into parent summaries, building a massive hierarchical tree. When queried, it traverses the tree from the root, branching down to the most mathematically relevant specific chunk, saving massive amounts of tokens.
- **Keyword Table Index**: Mathematically routes queries based on exact terminology, bypassing vector math entirely for specific use cases.

## 2. Query Engines and Data Agents
LlamaIndex mathematically automates Context Construction. 
When you query the index, it doesn't just return chunks. The **Query Engine** automatically generates the prompt, injects the optimal chunks, and synthesizes the final response. 
Furthermore, it introduces **Data Agents**—specialized LLM agents that possess Tools specifically designed for mathematically querying different indexes (e.g., An Agent that can dynamically choose between executing a SQL query on a relational database or a Vector search on a PDF database based on the user's prompt).

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/long-term/index.mdx': `---
title: Long-Term Memory (Agents)
description: The architectural implementation of persistent Vector and Graph databases that mathematically allow an AI Agent to retain facts, user preferences, and contextual history across infinite sessions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Long-Term Memory">

An LLM is mathematically stateless (amnesic). The moment an API call finishes, it forgets everything. While Short-Term Memory handles the current conversation, Long-Term Memory ensures the Agent remembers the user across weeks or years.

## 1. Vector Database Persistence
The most common implementation is a persistent Vector Store.
If a user tells the Agent, "I am a vegan," the Agent mathematically embeds that sentence into a Vector and permanently saves it. 
Three weeks later, the user says, "Find me a restaurant." Before answering, the Agent mathematically embeds the new query and searches its Long-Term Memory. It retrieves the "vegan" Vector, dynamically injects it into the System Prompt, and mathematically filters the restaurant search, simulating human-like persistent memory.

## 2. Entity Consolidation (MemGPT)
If a user says "I live in New York," and later says "I moved to Chicago," a dumb Vector Database will retrieve both conflicting facts.
Advanced memory architectures (like MemGPT) treat Long-Term memory as a mathematically constrained OS Disk. The Agent has explicit Tools to TICK1Memory.insert()TICK1, TICK1Memory.update()TICK1, and TICK1Memory.delete()TICK1. The LLM mathematically reasons that the Chicago fact overwrites the New York fact, autonomously issuing a DELETE command to the database, ensuring its persistent memory remains logically consistent over time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/31. AI Agent Systems/Memory (short-term/index.mdx': `---
title: Short-Term Memory (Agents)
description: The algorithmic mechanism of maintaining state within the finite Token Context Window of a single conversational session, mathematically constrained by hardware limitations.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Short-Term Memory">

During a conversation, an LLM must remember what was said 5 minutes ago. Because the LLM itself is mathematically stateless, the Application framework must manage Short-Term Memory by repeatedly feeding the entire conversation history back into the LLM on every single API call.

## 1. The Context Window Constraint
Every LLM has a mathematical limit (e.g., 128,000 tokens). This is the absolute physical size of its Short-Term Memory.
If you append every single chat message to an Array and pass the entire Array to the LLM, the Array will eventually exceed 128,000 tokens. The API will mathematically reject the call (Context Overflow). Furthermore, processing 128,000 tokens is incredibly expensive and slow.

## 2. Sliding Windows and Rolling Summaries
To prevent Overflow, frameworks use mathematical truncation algorithms.
- **Sliding Window**: The simplest approach. It mathematically deletes Message 1 when Message 101 is added, always maintaining a strict maximum of the most recent $N$ messages. The AI abruptly forgets older context.
- **Rolling Summary**: A sophisticated mathematical approach. When the memory buffer hits 8,000 tokens, a secondary, cheaper LLM is triggered. It reads the oldest 4,000 tokens and mathematically compresses them into a dense 200-token summary (e.g., "User and AI discussed Python syntax"). The original 4,000 tokens are deleted, and the dense summary is prepended to the memory buffer, mathematically preserving the core context while freeing up massive amounts of token space.

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
