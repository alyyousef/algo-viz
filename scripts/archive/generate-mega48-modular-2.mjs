import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Knowledge representation & reasoning/index.mdx': `---
title: Knowledge Representation & Reasoning
description: The classical AI subfield dedicated to mathematically structuring information so algorithms can deduce facts and solve complex logical problems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Knowledge Representation & Reasoning (KRR)">

Before Deep Learning, AI systems could not "read" text. If you wanted an AI to understand that a "Dog is a Mammal", you had to mathematically encode that fact into a strict, machine-readable format. This is the domain of **Knowledge Representation & Reasoning (KRR)**.

## 1. Propositional and First-Order Logic
The mathematical foundation of KRR is strict formal logic.

- **Propositional Logic**: Using Boolean symbols to represent facts. 
  - $P \rightarrow Q$ (If it rains, the grass is wet).
- **First-Order Logic (Predicate Calculus)**: A vastly more powerful mathematical framework that introduces objects and quantifiers ($\forall$ For All, $\exists$ Exists).
  - $\forall x (Dog(x) \rightarrow Mammal(x))$ (For all objects x, if x is a Dog, it mathematically implies x is a Mammal).

## 2. Knowledge Graphs and Semantic Networks
Humans do not think in First-Order Logic equations; we think in connections. KRR mathematically modeled this using **Semantic Networks**.

A Semantic Network (or Knowledge Graph) represents concepts as Nodes, and relationships as directed mathematical Edges.
- Node: TICK1DogTICK1
- Edge: TICK1Is-ATICK1
- Node: TICK1MammalTICK1

When Google processes a search for "Who is the CEO of Apple", it doesn't just scan web text. It mathematically traverses its massive proprietary Knowledge Graph, moving from the TICK1AppleTICK1 node, across the TICK1CEO_OfTICK1 edge, and instantly lands on the TICK1Tim_CookTICK1 node, providing an exact factual answer rather than a list of websites.

## 3. Automated Reasoning (Inference)
Once the knowledge is mathematically represented, the AI must *Reason* to discover new facts that were never explicitly programmed.

If the system knows $\forall x (Dog(x) \rightarrow Mammal(x))$ and it knows $Dog(Fido)$, it uses the mathematical rule of **Modus Ponens** to instantly deduce $Mammal(Fido)$. 
This mathematical deduction powered the Expert Systems of the 1980s, allowing them to diagnose diseases by chaining together thousands of logical facts. While Deep Learning is vastly superior for perception (vision/audio), KRR is still the undisputed king of rigid, mathematical fact-checking.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Machine learning/index.mdx': `---
title: Machine Learning (Overview)
description: The foundational shift in AI where algorithms mathematically learn patterns directly from data, bypassing the need for explicit human programming.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Machine Learning (Overview)">

For 50 years, Software Engineering was governed by a strict mathematical paradigm: Humans write the Rules (code), supply the Data, and the CPU outputs the Answers. 

**Machine Learning (ML)** mathematically reversed this paradigm: Humans supply the Data, supply the Answers, and the CPU outputs the Rules.

## 1. Supervised Learning
The most common ML paradigm. You feed the algorithm massive amounts of labeled data (e.g., thousands of pictures of houses, mathematically tagged with their final sale price). 
The algorithm (like a Random Forest or Linear Regression) calculates the mathematical relationship between the features (Square Footage, Zip Code) and the target variable (Price). Once trained, you can feed it a new house, and it mathematically infers the correct price.

## 2. Unsupervised Learning
You feed the algorithm a massive dataset of user behavior, but you provide *zero answers* (no labels).
The algorithm (like K-Means Clustering) mathematically explores the data on its own. It might independently calculate that the data perfectly clusters into 3 distinct groups. A human later inspects the math and realizes the AI successfully clustered users into "Bargain Hunters", "Luxury Shoppers", and "Window Shoppers", entirely on its own. This is heavily used for anomaly detection and market segmentation.

## 3. The Math Under the Hood (Loss Functions)
Machine Learning is not magic; it is optimization calculus.
When training begins, the algorithm guesses randomly. It predicts a house is worth $10. 
The mathematical engine calculates the **Loss Function** (e.g., Mean Squared Error): the exact difference between the $10 guess and the actual $500k price. 

The algorithm then uses mathematical optimization (like Gradient Descent) to slightly adjust its internal equation to lower the Loss Function. It repeats this millions of times until the Loss is as close to zero as mathematically possible.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Multi-agent systems/index.mdx': `---
title: Multi-Agent Systems
description: A complex branch of AI where multiple autonomous agents interact, cooperate, or compete within a shared mathematical environment.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Agent Systems (MAS)">

While a single AI Agent playing Pac-Man is impressive, the real world consists of billions of humans interacting simultaneously. **Multi-Agent Systems (MAS)** study how multiple AI algorithms interact within a shared mathematical environment. 

## 1. Cooperation vs Competition
Multi-Agent Systems are governed heavily by mathematical **Game Theory**.

- **Cooperative Systems**: A fleet of 50 Amazon warehouse robots. They share a global objective (Move all packages efficiently). If Robot A is carrying a heavy load, it mathematically communicates its trajectory to Robot B, and Robot B dynamically alters its path to yield, optimizing the global mathematical throughput.
- **Competitive Systems (Zero-Sum Games)**: Chess or Poker. Agent A's mathematical reward is precisely Agent B's mathematical loss. The agents must learn highly complex, adversarial strategies (like bluffing in Poker) to mathematically defeat the other agent.

## 2. The Tragedy of the Commons
In decentralized Multi-Agent Systems, where agents do not share a global "hive mind", catastrophic mathematical failures can occur.

If you program 1,000 autonomous trading agents to maximize their own individual profit on the stock market, they will mathematically execute trades flawlessly. However, their combined actions might trigger a "Flash Crash", destroying the entire market. 
Research in MAS focuses on mathematically designing the environment's rules (mechanism design) so that the selfish actions of individual agents naturally result in a globally optimal outcome (Nash Equilibrium).

## 3. Swarm Intelligence
Inspired by biological systems (ant colonies, flocks of birds), Swarm Intelligence features hundreds of incredibly simple AI agents. 
No individual ant agent is intelligent, and there is no central leader. However, by following 2 or 3 strict mathematical rules based entirely on their immediate local surroundings (e.g., "follow the strongest pheromone trail"), the swarm exhibits breathtakingly complex, globally intelligent behavior, such as calculating the mathematically shortest path to a food source.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/NLP/index.mdx': `---
title: Natural Language Processing (Overview)
description: The intersection of linguistics and deep learning, teaching algorithms to mathematically parse, understand, and generate human language.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Natural Language Processing (NLP)">

Human language is mathematically chaotic. It relies on sarcasm, double meanings, context, and slang. **Natural Language Processing (NLP)** is the discipline of forcing this chaotic unstructured text into rigid mathematical structures that a computer can process.

## 1. Classical NLP (Bag of Words)
Before Deep Learning, NLP algorithms could not understand "meaning". 
To analyze a sentence, they mathematically destroyed it using the **Bag of Words** model. 

The sentence *"The quick brown fox"* was mathematically tokenized and mapped to a sparse vector matrix of 1s and 0s: TICK1[1, 1, 1, 1, 0, 0]TICK1. 
This mathematical representation completely destroyed the word order and context. The algorithm did not know what a "fox" was; it just knew the vector appeared frequently in articles about animals.

## 2. Word Embeddings (Word2Vec)
In 2013, Google revolutionized NLP by inventing **Word2Vec**. 
Instead of 1s and 0s, words were mathematically mapped into a dense, 300-dimensional vector space.

Words with similar semantic meanings were mathematically clustered together in the vector space. Because meaning was now represented by pure geometry, you could perform literal algebra on words:
$King - Man + Woman = Queen$. 
The AI mathematically understood the concept of royalty and gender.

## 3. The Transformer Revolution
While Word Embeddings were brilliant, they were static. The word "Bank" had the exact same mathematical vector whether it meant "River Bank" or "Financial Bank".

In 2017, the **Transformer Architecture (Attention is All You Need)** was invented. It introduced the mathematical concept of **Self-Attention**. 
When reading the word "Bank", the neural network mathematically scans the entire surrounding sentence. If it sees the word "River" earlier in the sentence, it dynamically shifts the mathematical vector for "Bank" to represent nature instead of finance. 
This dynamic mathematical context awareness unlocked the creation of Large Language Models (LLMs) like GPT-4, solving natural language generation forever.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Ontologies/index.mdx': `---
title: Ontologies
description: The rigid mathematical taxonomies used to formally define the relationships, properties, and constraints of entities within a specific domain.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Ontologies">

An **Ontology** is a formal, explicit, mathematical specification of a shared conceptualization. 
In simpler terms, it is a massive, rigidly structured dictionary where a computer is mathematically taught exactly how every concept in a specific domain relates to every other concept.

## 1. Components of an Ontology
Ontologies are mathematically defined using a triple structure (Subject, Predicate, Object).
- **Classes (Concepts)**: "Vehicle", "Car", "Engine".
- **Attributes (Properties)**: A Car has a "Top Speed", "Color", "Weight".
- **Relations**: A Car TICK1Is-ATICK1 Vehicle. A Car TICK1Has-ATICK1 Engine.
- **Restrictions**: A mathematical rule stating "A Bicycle cannot have an Engine".

By defining these mathematically, you create a rigid structure that an AI can use to reason about the world without needing to parse human language.

## 2. Web Ontology Language (OWL)
In the early 2000s, the W3C attempted to build the "Semantic Web"—an internet where data was machine-readable, not just human-readable. 

They created **OWL (Web Ontology Language)**, built on top of XML and RDF. Using OWL, a hospital could mathematically encode their entire medical knowledge base. An AI reading the OWL file would instantly understand that "Aspirin" mathematically TICK1TreatsTICK1 "Headaches", and is a subclass of "NSAIDs", allowing for automated drug conflict detection.

## 3. The Decline and Rebirth
Constructing massive Ontologies (like Cyc, which spent 30 years trying to manually encode all human common sense) failed because the real world is too messy to be captured in rigid mathematical taxonomy. Deep Learning proved that statistically learning from messy data was vastly superior.

However, Ontologies are currently experiencing a massive rebirth through **RAG (Retrieval-Augmented Generation)**. LLMs are prone to hallucination. By plugging an LLM into a rigid corporate Ontology (Knowledge Graph), the LLM is mathematically forced to ground its answers in the rigid, verified facts of the ontology, guaranteeing accuracy.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Planning/index.mdx': `---
title: AI Planning
description: The computational subfield focused on mathematically calculating a sequence of actions required to transition a system from a starting state to a goal state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="AI Planning">

In classical AI, an agent cannot act randomly. If a robotic arm needs to assemble a car engine, it must mathematically calculate the exact sequence of 5,000 movements required before it even moves its first actuator. This is the domain of **Automated Planning**.

## 1. State-Space Representation
To plan, the AI must mathematically represent the universe.
- **Initial State**: The robot is at coordinates (0,0). The bolt is at (5,5).
- **Goal State**: The bolt is attached to the engine block.
- **Actions**: A mathematical list of everything the robot can do (Move, Grab, Rotate), accompanied by strict Preconditions and Effects.
  - *Action: Grab(Bolt)*
  - *Precondition*: Robot is at (5,5) AND Robot Hand is Empty.
  - *Effect*: Robot Hand holds Bolt.

## 2. The Planning Algorithm (STRIPS / PDDL)
The AI uses languages like **PDDL (Planning Domain Definition Language)** to define the world.
The Planning Engine mathematically searches through the massive tree of possible actions. It realizes it cannot execute *Grab(Bolt)* because the precondition (Robot is at 5,5) is false. Therefore, it mathematically works backward, realizing it must first insert a *Move(0,0 -> 5,5)* action into the sequence. 
Once the entire sequence is mathematically proven to reach the goal state, the plan is executed.

## 3. Real-World Complexity
Classical planning works perfectly in a deterministic, observable environment (like Chess).
However, the real world is chaotic. A human might step in front of the robotic arm. 

Modern AI Planning utilizes **MDPs (Markov Decision Processes)**. Instead of calculating a single fragile sequence of steps, an MDP mathematically calculates a **Policy**. The Policy dictates the mathematically optimal action for the robot to take *regardless* of what state it accidentally ends up in, allowing it to dynamically recover from real-world chaos.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Reinforcement learning/index.mdx': `---
title: Reinforcement Learning (Overview)
description: A paradigm of Machine Learning where agents mathematically learn to achieve optimal strategies by interacting with an environment and receiving rewards or punishments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reinforcement Learning (Overview)">

Supervised Learning teaches an AI to recognize a picture of a car. **Reinforcement Learning (RL)** teaches the AI how to physically *drive* the car. It is the closest mathematical approximation to how biological brains learn through trial and error.

## 1. The Mathematical Framework (MDPs)
RL is formally modeled as a **Markov Decision Process (MDP)**.
1. The Agent observes the current **State** (e.g., the exact pixel layout of the Super Mario screen).
2. The Agent takes an **Action** (e.g., press Jump).
3. The Environment mathematically calculates the result, moving the Agent to a new State, and dispensing a **Reward** (e.g., +100 points for hitting a coin, -1,000 points for hitting a Goomba).

The AI's singular mathematical objective is to maximize the cumulative reward over time.

## 2. Exploration vs. Exploitation
A critical mathematical dilemma in RL.
If the AI discovers that walking to the right yields +10 points, it might greedily exploit that knowledge, walking to the right forever. But if it never jumps, it will never discover the hidden pipe that yields +10,000 points. 
The algorithm must mathematically balance **Exploitation** (using known good strategies) with **Exploration** (taking random, suboptimal actions in hopes of discovering a massive future payoff).

## 3. Deep Reinforcement Learning (AlphaGo)
Historically, RL algorithms (like Q-Learning) mathematically memorized the exact value of every possible state in a lookup table. This works for Tic-Tac-Toe (which has a tiny state space). It is mathematically impossible for Chess or Go.

In 2016, DeepMind combined Deep Learning with RL to create **AlphaGo**. Instead of a lookup table, it used a massive Deep Neural Network to mathematically estimate the value of the board state. By playing millions of games against clones of itself (Self-Play), the AI discovered mathematical strategies completely alien to humanity, decisively defeating the human world champion of Go.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Robotics/index.mdx': `---
title: Robotics (Overview)
description: The intersection of Artificial Intelligence and mechanical engineering, dealing with the physical embodiment of algorithms in the real world.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Robotics (Overview)">

AI software running on a server operates in a mathematically perfect digital world. **Robotics** forces AI to operate in the chaotic, physically imperfect real world, dealing with friction, gravity, and sensor noise. It is often considered the ultimate final frontier of Artificial Intelligence.

## 1. Kinematics and Inverse Kinematics
If a robotic arm needs to pick up a coffee cup, the AI must mathematically calculate the exact angles for its shoulder, elbow, and wrist joints.

- **Forward Kinematics**: The math is easy. If I set the shoulder to 45 degrees and the elbow to 90 degrees, exactly what XYZ coordinates will the hand end up at?
- **Inverse Kinematics (IK)**: The math is incredibly difficult. I want the hand to be exactly at XYZ coordinates (10, 5, 2) to grab the cup. What exact joint angles do I need to achieve this? 
Because there are often multiple joint configurations that reach the same point, solving IK requires complex mathematical optimization and calculus.

## 2. SLAM (Simultaneous Localization and Mapping)
If you place a robot vacuum in a brand new house, it faces a mathematical paradox: To build a map of the house, it must know exactly where it is. But to know exactly where it is, it needs a map of the house.

**SLAM** solves this mathematically using probabilistic algorithms (like Kalman Filters or Particle Filters). As the robot moves, its LiDAR sensors bounce lasers off the walls. The algorithm mathematically updates the map, whilst simultaneously updating its estimated location within that map, allowing autonomous navigation without GPS.

## 3. Moravec's Paradox
In the 1980s, AI researchers discovered a profound paradox: 
It is mathematically easy to program a computer to exhibit adult-level performance on intelligence tests or playing Chess. It is mathematically nearly impossible to program a computer to have the sensorimotor skills of a 1-year-old human baby (like walking up a flight of stairs without falling). 

We are finally overcoming Moravec's Paradox using **Deep Reinforcement Learning**, where bipedal robots (like Boston Dynamics' Atlas) learn to balance mathematically by running millions of physics simulations, rather than relying on hardcoded human logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Search algorithms/index.mdx': `---
title: Search Algorithms
description: The foundational algorithmic discipline of mathematically exploring vast state spaces to find optimal paths or winning strategies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Search Algorithms">

If a Google Maps server needs to calculate the fastest route from New York to Los Angeles, it mathematically analyzes a graph containing billions of roads. This is the domain of **Search Algorithms**, the absolute foundation of classical AI.

## 1. Uninformed Search (Blind Search)
These algorithms have no knowledge of the goal's location. They mathematically blindly explore the graph.
- **Breadth-First Search (BFS)**: Explores all neighboring nodes first before moving deeper. Mathematically guarantees finding the shortest path (if all roads take the same time), but consumes massive amounts of RAM.
- **Depth-First Search (DFS)**: Plunges as deep as possible down a single path until it hits a dead end, then backtracks. Uses very little RAM, but mathematically provides zero guarantees of finding an optimal path.

## 2. Informed Search (Heuristic Search)
If you are driving to Los Angeles, you don't randomly drive to Canada first. You know LA is West. 
Informed search uses a **Heuristic**—a mathematical "rule of thumb" that estimates how close you are to the goal.

- **A* (A-Star) Search**: The undisputed king of pathfinding algorithms (used in video games and GPS routing). It mathematically evaluates a node based on two functions: $f(n) = g(n) + h(n)$.
  - $g(n)$: The exact cost to travel from the start to the current node.
  - $h(n)$: The Heuristic (e.g., straight-line mathematical distance to the goal).
  As long as the heuristic is mathematically "admissible" (never overestimates the true cost), A* will flawlessly find the mathematically absolute shortest path while ignoring 90% of the irrelevant roads.

## 3. Adversarial Search (Minimax)
Used when playing a game against a human opponent (like Chess).
The AI mathematically generates a massive tree of all possible future moves. 
The **Minimax** algorithm assumes the human will always play perfectly. 
- The AI mathematically attempts to **Maximize** its own score.
- The AI assumes the human will take the path that **Minimizes** the AI's score.
Because the game tree for Chess is larger than the number of atoms in the universe, the AI uses **Alpha-Beta Pruning** to mathematically chop off branches of the tree it knows are terrible without ever explicitly evaluating them, saving massive compute.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/24. Artificial Intelligence — Overview/Symbolic AI (GOFAI)/index.mdx': `---
title: Symbolic AI (GOFAI)
description: Good Old-Fashioned AI, the dominant paradigm of the 20th century, focused on explicitly programming human logic using strict mathematical symbols and rules.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Symbolic AI (GOFAI)">

**Symbolic AI**, often referred to as **GOFAI (Good Old-Fashioned AI)**, was the absolute dominant architecture of Artificial Intelligence from its inception in the 1950s until the Deep Learning revolution of the 2010s.

## 1. The Core Philosophy
Modern Deep Learning is a mathematical "Black Box" based on probability and statistics. 
GOFAI researchers vehemently rejected probability. They believed that human intelligence was fundamentally the manipulation of symbols according to strict logical rules. 

If you wanted to teach an AI to play Chess, you did not show it millions of games and ask it to find statistical patterns. You explicitly programmed the mathematical rules of how the Knight moves, and gave it an evaluation function based on pure logic.

## 2. Physical Symbol System Hypothesis
Proposed by Allen Newell and Herbert Simon (AI pioneers), this hypothesis mathematically stated:
*"A physical symbol system has the necessary and sufficient means for general intelligent action."*

They believed that by creating a vast, hierarchical web of IF-THEN rules and manipulating them using Boolean logic, LISP code, and tree-search algorithms, they would mathematically achieve Artificial General Intelligence (AGI).

## 3. The Downfall of GOFAI
GOFAI achieved massive early successes. It mathematically proved geometry theorems, solved algebra word problems, and defeated the human world champion in Chess (IBM's Deep Blue in 1997 was essentially a massive GOFAI search algorithm).

However, GOFAI hit a catastrophic mathematical wall: **The Real World**.
You can easily write strict IF-THEN rules for Chess. You mathematically *cannot* write strict IF-THEN rules for facial recognition. 
How do you write a rule to detect a dog? "IF it has 4 legs AND fur THEN Dog". What if the dog lost a leg in an accident? The strict Boolean logic fails instantly. 

Because the real world is messy, chaotic, and probabilistic, rigid Symbolic AI was ultimately abandoned for perception tasks, completely usurped by the statistical probability engines of Deep Neural Networks.

</ConceptTemplate>
`,
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
