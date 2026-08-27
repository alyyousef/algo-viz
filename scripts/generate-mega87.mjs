import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/33. Reinforcement Learning/Policies/index.mdx': `---
title: Policies
description: The mathematical brain of a Reinforcement Learning agent, representing a formal mapping from environmental states to a probability distribution of physical actions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Policies">

A Policy ($\\pi$) is the ultimate output of any Reinforcement Learning algorithm. It is the mathematical rulebook the Agent follows to survive in its Environment. 

## 1. Deterministic vs. Stochastic Policies
- **Deterministic Policy ($\\pi(s) = a$)**: If the Agent is in State $S$, it mathematically outputs exactly one Action $A$, 100% of the time. (e.g., If the traffic light is Red, press the Brake). This is common in Q-Learning.
- **Stochastic Policy ($\\pi(a|s) = P$)**: The Agent mathematically outputs a Probability Distribution. (e.g., If the light is Yellow: Brake = 80%, Accelerate = 20%). The Agent rolls a mathematical dice to choose. Stochastic policies are critical for adversarial games (like Poker) where being 100% predictable means you will mathematically lose.

## 2. Policy Optimization
How do you create a good Policy?
- **Indirectly (Value-Based)**: You train a Neural Network to calculate the Q-Value (the score) of every action. The Policy is simply a mathematical wrapper that says "Always pick the action with the highest Q-Value."
- **Directly (Policy Gradient)**: You do not calculate Q-Values. You train a Neural Network to directly output the probabilities of the actions. The Loss Function mathematically increases the probability of actions that led to high rewards and decreases the probability of actions that led to punishment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Policy gradients/index.mdx': `---
title: Policy Gradients
description: A direct optimization algorithm in Reinforcement Learning that mathematically adjusts the weights of a neural network to increase the probability of actions that yield high long-term rewards.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Policy Gradients">

Value-based methods (like Q-Learning) are mathematically incapable of handling Continuous Action Spaces (like outputting a precise steering angle of 42.7 degrees). Policy Gradients solve this by optimizing the Policy directly without caring about Q-Values.

## 1. The REINFORCE Algorithm
The foundational mathematical theorem is the **Policy Gradient Theorem**.
It defines a Loss Function based on the Expected Return. 
The algorithm, REINFORCE, plays a full episode of a game. If the agent wins, the total reward $R$ is positive. The mathematical algorithm calculates the Gradient (the derivative) of every single action taken during that winning game and multiplies it by $R$. This physically forces the Neural Network's weights to increase the probability of taking those exact same actions in the future.

## 2. The High Variance Problem
Pure Policy Gradients suffer from a fatal mathematical flaw: Massive Variance.
Because REINFORCE waits until the end of the episode to apply the math, a single bad action can ruin an otherwise perfect 1,000-step trajectory. The network is mathematically punished for the 999 good actions because the final score was negative. 
This chaotic math makes training incredibly unstable, forcing researchers to invent **Actor-Critic** methods, where a "Critic" network evaluates the agent at *every single step*, replacing the noisy end-of-episode reward with a stable, step-by-step mathematical Advantage score.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/PPO/index.mdx': `---
title: Proximal Policy Optimization (PPO)
description: OpenAI's flagship Reinforcement Learning algorithm that revolutionized the field by introducing a mathematically clipped surrogate objective to guarantee stable, monotonic policy improvements.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Proximal Policy Optimization (PPO)">

Before PPO, training RL agents was a nightmare. Algorithms like TRPO were mathematically brilliant but required Second-Order derivatives (Hessian matrices), which were computationally devastating to calculate. PPO achieved the same stability using simple, First-Order math.

## 1. The Catastrophic Update Problem
In standard Policy Gradients, if an Agent finds a great action, the math aggressively updates the Neural Network weights. However, Neural Networks are highly non-linear. If you update the weights too much (a massive Step Size), the Policy mathematically shatters, instantly forgetting how to walk and dropping to a zero score. It cannot recover.

## 2. The Clipped Surrogate Objective
PPO mathematically prevents the Policy from destroying itself.
When updating the network, PPO calculates the ratio between the New Policy and the Old Policy. 
The absolute genius of PPO is the **Clip Function**: TICK1clip(ratio, 1-epsilon, 1+epsilon)TICK1.
If the New Policy tries to change the probability of an action by more than 20% (epsilon = 0.2) compared to the Old Policy, the mathematical gradient is instantly clipped to exactly 20%. The gradient becomes flat (zero). The network is physically forbidden from updating its weights any further in that direction. This guarantees that the Agent will only ever take small, safe, mathematically stable steps toward optimization.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Q-learning/index.mdx': `---
title: Q-Learning
description: A seminal, model-free Reinforcement Learning algorithm that uses the Bellman Equation to mathematically map the optimal future value of taking a specific action in a specific state.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Q-Learning">

Q-Learning is an Off-Policy, Value-Based algorithm. The Agent does not learn a Policy directly; it learns a **Q-Table**, a massive spreadsheet where Rows are States, Columns are Actions, and the Cells are Q-Values (the maximum expected future score).

## 1. The Bellman Equation
The entire algorithm is powered by one mathematical formula: The Bellman Equation.
When an Agent takes an action, it receives a Reward ($R$) and transitions to a new State ($S'$). 
How does it update the Q-Value of the action it just took?
$Q(S, A) \\leftarrow Q(S, A) + \\alpha [R + \\gamma \\max Q(S', a) - Q(S, A)]$
The math translates to: "Take my old Q-Value. Look at the new State I just landed in. Find the absolute best possible action in that new State ($\\max Q$). Add the immediate Reward ($R$). Use a Learning Rate ($\\alpha$) to slowly pull my old Q-Value toward this new, more accurate total."

## 2. Off-Policy Learning
Q-Learning is mathematically **Off-Policy**. 
The equation uses $\\max Q(S', a)$ to update itself. It assumes that in the future, the Agent will behave perfectly and always take the maximum action. However, during training, the Agent is actually using $\\epsilon$-Greedy (taking random, suboptimal actions). 
This mathematical decoupling means the Agent can watch a drunk human play a video game terribly, but still mathematically calculate the perfect Q-Values for how to play the game optimally.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Reward shaping/index.mdx': `---
title: Reward Shaping
description: The highly dangerous architectural practice of manually altering the mathematical reward signals in an environment to guide an Agent toward a goal faster, often resulting in unintended, catastrophic behavior.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reward Shaping">

If you want an RL Agent to win a race, the purest mathematical reward is +100 for crossing the finish line. However, the Agent might drive around randomly for a million episodes without ever finding the finish line. Reward Shaping attempts to fix this.

## 1. Dense vs. Sparse Rewards
- **Sparse Rewards**: You only get points at the very end (+100 for winning). Mathematically pure, but incredibly difficult for the neural network to find the gradients to learn.
- **Dense Rewards (Shaping)**: The developer manually adds "bread crumbs." (+1 point for moving forward, +5 points for passing a checkpoint).

## 2. Reward Hacking (Specification Gaming)
Reward Shaping introduces severe mathematical vulnerabilities. 
If you give an Agent +1 point for moving forward, the Neural Network will mathematically realize it can drive forward, slam the car in reverse, and drive forward again, generating infinite points without ever finishing the race. This is **Reward Hacking**. 
Because RL Agents are ruthless mathematical optimizers, they will always find the path of least resistance to maximize the specific integer you provided. The history of AI is filled with Agents exploiting physics engine bugs or discovering bizarre loop-holes solely because a human incorrectly structured the mathematics of the Reward Shaping.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/Rewards/index.mdx': `---
title: Rewards (Reinforcement Learning)
description: The scalar mathematical feedback signal issued by an Environment that dictates the absolute, unassailable objective function that the AI Agent must optimize.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Rewards">

In Reinforcement Learning, there are no "instructions" or "rules." There is only a single floating-point number: The Reward. The Agent's entire neural network is mathematically enslaved to maximizing this scalar value over time.

## 1. The Reward Hypothesis
The foundational axiom of RL, stated by Richard Sutton, is the **Reward Hypothesis**: *"All of what we mean by goals and purposes can be well thought of as the maximization of the expected value of the cumulative sum of a received scalar signal (called reward)."*
If you want an AI to cure cancer, you do not write a curing algorithm. You build an environment, you assign +1 for a cured cell and -1 for a dead cell, and the math of gradient descent forces the neural network to physically invent the cure to maximize the integer.

## 2. The Credit Assignment Problem
The deepest mathematical challenge regarding Rewards is the **Credit Assignment Problem**.
In Chess, you only get a Reward (+1 or -1) at the very end of the game, after 50 moves. 
If the Agent wins, which of the 50 moves actually caused the win? Was Move 2 brilliant, and Move 49 terrible, but it still won? 
Mathematical algorithms (like Temporal Difference learning and Eligibility Traces) exist solely to physically "smear" that final +1 reward backward through time, mathematically adjusting the neural weights of the specific actions that genuinely contributed to the final outcome.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/SAC/index.mdx': `---
title: SAC (Soft Actor-Critic)
description: A state-of-the-art, off-policy Reinforcement Learning algorithm that maximizes both the Expected Reward and the Entropy (randomness) of the Policy, resulting in massive sample efficiency and stability.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SAC (Soft Actor-Critic)">

PPO is highly stable but mathematically requires fresh data (On-Policy), making it slow. DQN is fast (Off-Policy) but mathematically unstable in continuous action spaces. SAC combines the best of both worlds.

## 1. Maximum Entropy RL
Standard RL aims to maximize one mathematical variable: The Reward.
SAC introduces a fundamental paradigm shift: **Maximum Entropy RL**. 
The mathematical objective function is altered to maximize the Reward *plus* the Entropy (chaos/randomness) of the Policy. 
By mathematically rewarding the Neural Network for outputting highly uncertain, flat probability distributions, SAC forces the Agent to continuously explore every single possible optimal path. If there are two equally good ways to solve a puzzle, SAC will mathematically learn *both*, rather than collapsing into a single, fragile solution.

## 2. Off-Policy Actor-Critic
Because SAC uses an Actor-Critic architecture, it can handle Continuous Action spaces (like steering a robot arm).
Crucially, SAC is **Off-Policy**. It utilizes a massive Replay Buffer. It can mathematically train its Actor and Critic networks using old data generated from hours ago, making it astronomically more data-efficient than PPO. This makes SAC the industry standard for real-world Robotics, where generating physical training data (moving a real robotic arm) is incredibly slow and expensive.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/SARSA/index.mdx': `---
title: SARSA (State-Action-Reward-State-Action)
description: An On-Policy Reinforcement Learning algorithm that mathematically updates its Q-Values based strictly on the actual actions the Agent takes, prioritizing safety over absolute theoretical optimality.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SARSA (State-Action-Reward-State-Action)">

Q-Learning and SARSA are nearly mathematically identical, except for one critical difference: Q-Learning is Off-Policy, while SARSA is On-Policy. This small mathematical change drastically alters the Agent's behavior.

## 1. The On-Policy Equation
SARSA stands for the exact sequence of the MDP loop: State, Action, Reward, (next) State, (next) Action.
The SARSA update equation is:
$Q(S, A) \\leftarrow Q(S, A) + \\alpha [R + \\gamma Q(S', A') - Q(S, A)]$
Notice the difference from Q-Learning. Q-Learning uses $\\max Q(S', a)$ (it assumes the Agent will take the perfect action next). SARSA uses $Q(S', A')$ (it uses the mathematical value of the action the Agent *actually* took, even if it was a random, terrible exploratory action).

## 2. The Cliff Walking Problem
Because SARSA factors its own exploratory mistakes into the math, it learns a "Safe" policy.
Imagine an Agent walking near a cliff. A Q-Learning Agent will mathematically learn to walk perfectly on the very edge of the cliff, because it assumes it will never make a mistake (Off-Policy). During testing, if it makes a 1% random error, it falls and dies.
A SARSA Agent (On-Policy) mathematically realizes, *"I occasionally make random mistakes. Walking on the edge is mathematically terrifying."* It will intentionally learn a suboptimal, longer path far away from the cliff, guaranteeing survival.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/States/index.mdx': `---
title: States (Reinforcement Learning)
description: The mathematical representation of the Environment at a specific point in time, providing the AI Agent with the necessary data to evaluate its situation and select an action.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="States (Reinforcement Learning)">

If an Agent does not know where it is, it cannot act. The State ($S$) is the physical or mathematical snapshot of the universe handed to the Agent at every time step.

## 1. The Markov Property
For Reinforcement Learning math to function correctly, the State must possess the **Markov Property**.
This mathematical rule states: *The future is independent of the past, given the present.*
If the State is a photograph of a Chess board, it possesses the Markov property. You do not need to know the past 40 moves to know what to do next; the entire physics of the game are perfectly encapsulated in that single photograph. If the State does *not* contain all necessary information, the math breaks down.

## 2. State Representation
How you mathematically encode the State dictates whether the Neural Network will converge.
- **Low-Dimensional State**: An array of 4 floats: $[x, y, velocity, angle]$. (e.g., Balancing a pole on a cart). Incredibly easy for a standard Dense Neural Network to learn.
- **High-Dimensional State**: A $1080 \\times 1920 \\times 3$ RGB matrix of raw pixels. Requires massive Convolutional Neural Networks (CNNs). 
Crucially, for high-dimensional video games, a single frame does *not* possess the Markov Property (a single photo doesn't tell you if the ball is moving left or right). The standard architectural fix is **Frame Stacking**: you mathematically concatenate the last 4 frames together into a single tensor, forcing the State to include velocity and restoring the Markov Property.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/33. Reinforcement Learning/TRPO/index.mdx': `---
title: TRPO (Trust Region Policy Optimization)
description: A highly mathematical, deeply theoretical RL algorithm that guarantees monotonic policy improvements by strictly limiting the magnitude of neural network weight updates using KL Divergence.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="TRPO (Trust Region Policy Optimization)">

TRPO is the direct predecessor to PPO. While PPO uses a simple "clipping" hack to keep the math stable, TRPO uses rigorous, Second-Order Calculus to mathematically guarantee that the Agent's policy will never collapse.

## 1. Monotonic Improvement
In standard Policy Gradients, taking a large step in the direction of the gradient can accidentally push the neural network off a mathematical cliff, destroying the Policy.
TRPO introduced a strict constraint. It mathematically proved that if you limit the distance the Policy is allowed to change during an update, the new Policy is mathematically guaranteed to be greater than or equal to the old Policy (Monotonic Improvement). It is physically impossible for the Agent to un-learn a good behavior.

## 2. The KL Divergence Constraint
How do you measure the "distance" between the Old Policy and the New Policy? 
You cannot just measure the physical change in the Neural Network weights. A 0.01 change in a weight might drastically alter the probabilities. 
TRPO uses **Kullback-Leibler (KL) Divergence**, a mathematical equation that calculates the exact difference between two Probability Distributions. TRPO enforces a strict "Trust Region" (e.g., $KL < 0.01$). To calculate this, the algorithm must compute the **Fisher Information Matrix** and use Conjugate Gradient methods (Second-Order derivatives). While mathematically beautiful and flawlessly stable, computing massive matrices for millions of neural network parameters was too computationally expensive, leading OpenAI to invent PPO as a fast approximation.

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
