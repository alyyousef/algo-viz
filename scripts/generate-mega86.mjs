import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/33. Reinforcement Learning/Actions/index.mdx': `---
title: Actions (Reinforcement Learning)
description: The mathematical set of all possible decisions an Agent can physically execute within an Environment to alter the state of the system and pursue a reward.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Actions (Reinforcement Learning)">

In Supervised Learning, the AI outputs a passive classification ("That is a dog"). In Reinforcement Learning (RL), the AI outputs an **Action**. It physically changes the world.

## 1. Discrete vs. Continuous Action Spaces
The complexity of the mathematical algorithm depends entirely on the **Action Space**.
- **Discrete Action Space**: The Agent has a finite, hardcoded list of choices. (e.g., Pac-Man can only go UP, DOWN, LEFT, RIGHT). The AI outputs an integer representing one of these distinct choices. Standard Q-Learning excels here.
- **Continuous Action Space**: The Agent must output a precise floating-point number. (e.g., A self-driving car must output a steering wheel angle between -90.0 and +90.0 degrees). Because the number of possible angles is mathematically infinite, you cannot use a simple lookup table. You must use advanced Policy Gradient methods (like PPO) to mathematically regress the exact float.

## 2. The Policy Function ($\\pi$)
How does the Agent decide which Action to take? It uses a mathematical function called the **Policy** (denoted as $\\pi$).
$\\pi(a|s)$ represents the probability of taking Action $a$ given the current State $s$.
During training, the RL algorithm's entire goal is to mathematically update the weights of the Policy function so that it always outputs the Action that will maximize the long-term mathematical reward.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Actor-critic methods/index.mdx': `---
title: Actor-Critic Methods
description: A highly advanced, hybrid Reinforcement Learning architecture that mathematically couples a Policy network (the Actor) with a Value network (the Critic) to drastically stabilize training variance.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Actor-Critic Methods">

Reinforcement Learning has two main algorithms: Value-Based (Q-Learning) and Policy-Based (REINFORCE). Actor-Critic mathematically merges them to eliminate the fatal flaws of both.

## 1. The Actor and The Critic
An Actor-Critic architecture spawns two separate Neural Networks (or two heads of the same network).
- **The Actor (Policy)**: Looks at the environment and decides what to do. (e.g., *"I am going to jump."*)
- **The Critic (Value)**: Does not take actions. It acts as a mathematical judge. It looks at the environment and mathematically predicts the total future reward of being in that state. (e.g., *"Being in this position is worth 50 points."*)

## 2. The Advantage Function
Why do we need the Critic? Pure Policy networks suffer from massive mathematical variance. If an agent randomly jumps and accidentally wins the game, it thinks "Jumping is always good," which is often false.
The Critic provides a baseline. When the Actor jumps, the Critic calculates the **Advantage**: *"Did jumping yield a higher reward than I mathematically expected?"* 
If the Actor gets 60 points, but the Critic expected 50, the Advantage is +10. The Actor is mathematically rewarded. If the Actor gets 10 points, the Advantage is -40, and the Actor's weights are punished. This dual-network mathematical feedback loop is the foundation of the most powerful modern RL algorithms, including PPO and A3C.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Agents/index.mdx': `---
title: RL Agents
description: The autonomous, decision-making entity in a Reinforcement Learning system that continuously interacts with an environment, mathematically mapping observed states to physical actions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RL Agents">

An Agent is not just an algorithm; it is an active participant in a mathematical universe (the Environment). It learns not by reading a dataset, but by physical trial and error.

## 1. The State-Action-Reward Loop
An Agent is forever trapped in a strict mathematical cycle modeled as a **Markov Decision Process (MDP)**.
At time step $t$:
1. The Agent receives the current **State ($S_t$)** from the Environment.
2. The Agent consults its Policy and executes an **Action ($A_t$)**.
3. The Environment transitions to a new state and returns a **Reward ($R_{t+1}$)** and the new **State ($S_{t+1}$)**.
This loop is the absolute definition of Reinforcement Learning. 

## 2. The Goal: Maximizing Expected Return
The Agent does not care about immediate gratification; it is mathematically programmed to maximize the **Return ($G_t$)**, which is the total sum of *all future rewards* until the end of the game.
Because a reward 100 steps in the future is uncertain, the Agent uses a **Discount Factor ($\\gamma$)** (usually 0.99). A reward of 10 points today is mathematically worth 10. A reward of 10 points in the future is worth $10 \\times 0.99^n$. This mathematical discounting prevents the Agent's equations from spiraling to infinity and forces it to balance short-term survival with long-term strategy.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Deep Q-Networks (DQN)/index.mdx': `---
title: Deep Q-Networks (DQN)
description: A legendary algorithm developed by DeepMind that mathematically proved a deep Convolutional Neural Network could autonomously learn to play Atari games directly from raw screen pixels.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deep Q-Networks (DQN)">

Standard Q-Learning uses a 2D lookup table to store the value of every Action in every State. This is mathematically impossible for a video game, because there are $256^{(100 \\times 100)}$ possible pixel configurations. DeepMind solved this by replacing the lookup table with a Neural Network.

## 1. The Q-Function Approximation
Instead of a table, DQN uses a Convolutional Neural Network (CNN). 
The input to the network is the raw image of the Atari screen (the State). The output layer has exactly one node for every possible joystick movement (the Actions).
The mathematical value of the output node is the **Q-Value**: the exact predicted total future score if the agent takes that specific action. The Agent simply looks at the outputs and mathematically chooses the highest number (the $\\arg\\max$).

## 2. Experience Replay and Target Networks
If you train a neural network directly on a video game, the frames are highly correlated (Frame 2 looks almost exactly like Frame 1). This correlation causes the neural network to mathematically collapse and forget everything.
DQN introduced two brilliant architectural fixes:
- **Experience Replay**: The agent saves the last 1 million frames into a massive memory buffer. During training, it pulls a random, uncorrelated batch of 32 frames from the past to train the network, breaking the temporal correlation.
- **Target Network**: The mathematical equation for updating the Q-values requires a target. If the network updates itself while also being the target, the math chases its own tail. DQN freezes a physical copy of the network to act as a stable mathematical target, only updating the copy every 10,000 steps.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Environments/index.mdx': `---
title: Environments (Reinforcement Learning)
description: The mathematical universe in which an Agent operates, governed by absolute transition dynamics that dictate how the world reacts to the Agent's actions and issues rewards.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Environments (Reinforcement Learning)">

The Agent is the brain; the Environment is the physics engine. In Reinforcement Learning, the developer does not code the Agent's behavior; the developer codes the Environment's physics and lets the Agent figure it out.

## 1. The Transition Dynamics ($P$)
The Environment is defined by a mathematical probability matrix called the **Transition Model ($P$)**.
$P(s' | s, a)$ is the mathematical probability that the Environment will transition into State $s'$ if the Agent takes Action $a$ in State $s$.
- **Deterministic Environment**: If a chess piece moves forward, it mathematically goes forward 100% of the time. $P = 1.0$.
- **Stochastic Environment**: If a robot tries to drive on ice, it might slip. Action: "Drive forward." Result: "Skid left" (30% probability). The Agent must mathematically learn to optimize its policy despite the chaotic, random physics of the Environment.

## 2. Partial vs. Full Observability
- **Fully Observable**: The Agent can mathematically see the entire State of the universe (e.g., a Chess board). The system is a perfect Markov Decision Process (MDP).
- **Partially Observable (POMDP)**: The Agent can only see a tiny fraction of the universe (e.g., a Poker game where opponent cards are hidden, or a robot with a broken camera). The Agent must mathematically infer the true state of the world using Recurrent Neural Networks (RNN/LSTM) to remember past clues.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Exploration vs exploitation/index.mdx': `---
title: Exploration vs. Exploitation
description: The fundamental, inescapable mathematical dilemma in Reinforcement Learning of deciding whether to leverage known winning strategies or risk losing points to discover potentially superior new strategies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Exploration vs. Exploitation">

If an Agent finds a button that gives it 1 point, should it press it forever (Exploitation)? Or should it walk away and look for a button that gives 100 points (Exploration)? If it explores too much, it gets zero points. If it exploits too early, it gets stuck in a Local Optima.

## 1. Epsilon-Greedy Algorithm ($\\epsilon$)
The most common mathematical solution is the $\\epsilon$-Greedy algorithm.
You define a variable $\\epsilon$ (epsilon), usually starting at 1.0 (100%).
At every step, the Agent rolls a random number between 0.0 and 1.0. 
- If the number is $< \\epsilon$, the Agent ignores its neural network and takes a completely random action (**Explore**).
- If the number is $> \\epsilon$, the Agent mathematically chooses the action with the highest predicted Q-Value (**Exploit**).
As training progresses, you mathematically decay $\\epsilon$ (e.g., multiply it by 0.99 every episode) until it hits 0.05. The Agent starts by randomly exploring the entire universe, and slowly transitions into a hyper-optimized exploiting machine.

## 2. Entropy Bonus
In advanced algorithms like PPO or SAC, $\\epsilon$-Greedy is too primitive. 
Instead, developers mathematically add an **Entropy Bonus** directly into the Neural Network's Loss Function. Entropy is a mathematical measure of chaos or uncertainty. By rewarding the network for having high entropy (outputting a very flat, uncertain probability distribution over all actions), the algorithm physically forces the network to try new things. As it finds massive rewards, the mathematical gradients overwhelm the Entropy bonus, and the network converges on the optimal path.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Model-based RL/index.mdx': `---
title: Model-Based Reinforcement Learning
description: A highly data-efficient paradigm where the Agent mathematically deduces the internal physics engine of the Environment, allowing it to simulate and plan actions in its own imagination.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Model-Based Reinforcement Learning">

In Model-Free RL (like DQN or PPO), the Agent is blindly reacting. It has to crash a car 10,000 times to learn that walls are solid. In Model-Based RL, the Agent builds a mathematical simulation of the wall in its mind, and realizes it will crash without ever touching the steering wheel.

## 1. Learning the Dynamics Model
The Agent trains a completely separate Neural Network called the **Dynamics Model**. 
Instead of predicting Rewards, this network predicts Physics. You give it State 1 and Action A, and it must mathematically output exactly what State 2 will look like. 
Once the Dynamics Model is accurate, the Agent possesses a mathematical clone of the Environment's physics engine inside its own memory.

## 2. Planning by Hallucination (Dyna)
Because the Agent now has the physics engine in its head, it stops interacting with the real world (which is slow and expensive). 
It enters a massive, high-speed mathematical loop of **Hallucination** (or "Planning"). It uses algorithms like Monte Carlo Tree Search (MCTS) to simulate millions of possible futures entirely inside the Neural Network's memory. AlphaZero (the chess AI) is the ultimate example of this. It mathematically simulates millions of possible chess games in its head before moving a single physical piece on the board. This makes Model-Based RL astronomically more data-efficient than Model-Free RL.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Multi-agent RL/index.mdx': `---
title: Multi-Agent Reinforcement Learning (MARL)
description: An exponentially complex extension of RL where multiple autonomous Agents mathematically interact within the same environment, creating shifting dynamics of cooperation, competition, and chaos.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Agent Reinforcement Learning (MARL)">

Standard RL assumes the Environment is static. If you move left, you hit a wall. In MARL, if you move left, another AI might move right to block you. The Environment is no longer a static physics engine; it is a mathematically hostile, constantly adapting ecosystem.

## 1. The Non-Stationarity Problem
The foundational mathematical assumption of standard RL (the Markov property) breaks down in MARL. 
If Agent A is learning to play tennis against Agent B, Agent A might learn a perfect serve. But Agent B's neural network is also updating. Tomorrow, Agent B learns to block the serve. 
From Agent A's perspective, the physical laws of the universe (the Transition Dynamics) just spontaneously changed. This is called **Non-Stationarity**. Because the environment is constantly shifting beneath their feet, MARL algorithms often suffer from mathematical instability and catastrophic forgetting.

## 2. Centralized Training, Decentralized Execution (CTDE)
To solve Non-Stationarity, researchers developed the CTDE architecture (used by OpenAI Five in Dota 2).
During the **Training Phase** on the supercomputer, the system is Centralized. A massive "Critic" network mathematically sees the entire game board and the internal thoughts of *all* Agents simultaneously, stabilizing the gradients and allowing them to learn complex teamwork.
However, during **Execution** (the actual game), the Critic is deleted. The Agents are Decentralized. They can only see their own local screens and must execute their Policy networks independently. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Multi-armed bandits/index.mdx': `---
title: Multi-Armed Bandits
description: The classic foundational mathematical problem of Reinforcement Learning focusing purely on the Exploration vs. Exploitation dilemma in an environment with no shifting states.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Multi-Armed Bandits">

Imagine you are in a casino with 10 slot machines (One-Armed Bandits). You have 100 tokens. Each machine has a different, secret probability of paying out. How do you mathematically maximize your money?

## 1. A Stateless Environment
The Multi-Armed Bandit problem is the purest form of RL because it removes the concept of "State." 
Pulling Machine A does not mathematically alter the probability of Machine B. The environment never changes. The only problem the algorithm must solve is how to allocate its finite tokens to find the best machine (Exploration) while spending as many tokens as possible on that best machine (Exploitation).

## 2. UCB (Upper Confidence Bound)
While $\\epsilon$-Greedy explores randomly, UCB explores mathematically. 
UCB keeps track of two things for every machine: the average payout, and the mathematical *uncertainty* (how many times it has been pulled).
The algorithm calculates an equation: $Q_a + c \\sqrt{\\frac{\\ln t}{N_a}}$
- $Q_a$: The average payout (Exploitation).
- $N_a$: The number of times pulled. (Because it is in the denominator, machines that have rarely been pulled get a massive mathematical bonus to their score).
This formula physically forces the AI to eventually test every single machine, mathematically guaranteeing that it will never get permanently trapped at a mediocre slot machine.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Offline RL/index.mdx': `---
title: Offline Reinforcement Learning
description: A paradigm where the Agent is mathematically strictly forbidden from interacting with the environment, forced to learn an optimal policy purely from a static, historical dataset of past actions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Offline Reinforcement Learning">

If you want to train an RL Agent to control the dosage of insulin for a hospital patient, it cannot use Trial and Error. If it "explores" by injecting 500mg, the patient dies. It must learn Offline.

## 1. Learning from Static Datasets
In Offline RL, the Agent is handed a massive database of past logs (e.g., 10 years of doctor's notes, detailing Patient State, Doctor's Action, Patient Survival Reward). 
The algorithm must mathematically deduce the optimal Policy solely by analyzing these static transitions. It is essentially turning Reinforcement Learning into a Supervised Learning problem.

## 2. The Distributional Shift Problem
Offline RL suffers from a fatal mathematical flaw: **Out-of-Distribution (OOD) Actions**.
During training, the Agent's neural network might mathematically calculate that injecting 10,000mg of insulin will yield a massive reward. Because the Agent cannot physically test this in a simulator, the network's Q-Values wildly hallucinate toward infinity. 
To fix this, algorithms like **CQL (Conservative Q-Learning)** mathematically penalize the network's Loss Function anytime it predicts a high reward for an Action that does not exist in the historical dataset. The Agent is mathematically chained to reality, strictly forbidden from hallucinating policies that deviate too far from the known historical data.

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
