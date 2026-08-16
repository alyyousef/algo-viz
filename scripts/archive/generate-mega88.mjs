import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '48. Robotics/ROS/index.mdx': `---
title: ROS (Robot Operating System)
description: A flexible framework for writing robot software, providing OS-like services including hardware abstraction, low-level device control, and message-passing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ROS (Robot Operating System)"
  subtitle="The absolute backbone of global robotics"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ros_logo.svg/512px-Ros_logo.svg.png"
  description="Despite the name, ROS is NOT an Operating System (it runs on top of Ubuntu Linux). It is a massive, open-source middleware framework that provides hardware abstraction, device drivers, and a mathematical Pub/Sub messaging system."
  yearCreated={2007}
  creator="Willow Garage (Now Open Robotics)"
  isOpenSource={true}
  websiteUrl="https://www.ros.org/"
>

Before 2007, if a university wanted to build a robot, they spent 3 years writing custom C++ drivers for the LiDAR, 2 years writing a custom SLAM algorithm, and 0 years doing actual research.

**ROS** completely destroyed this paradigm. It provided a universal mathematical standard. If you buy a Hokuyo LiDAR today, you just type \`apt-get install ros-hokuyo-node\`. It instantly works and begins publishing standardized mathematical LaserScan data.

<Callout icon="success" title="The Node Architecture">
  ROS heavily utilizes a highly decoupled, distributed architecture.
  
  A robot is composed of dozens of independent **Nodes** (Python or C++ processes).
  - The \`camera_node\` talks to the physical USB port and publishes a video stream to the \`/camera/image\` Topic.
  - The \`vision_node\` subscribes to the image, runs OpenCV, and publishes bounding boxes to \`/objects\`.
  - The \`navigation_node\` subscribes to \`/objects\` and drives the motors.
  
  If the \`vision_node\` crashes, the \`camera_node\` keeps running perfectly.
</Callout>

## The Master Node (roscore)

ROS 1 was built entirely around a single, centralized mathematical server called **roscore**. 
When a Node boots up, it pings roscore and says, *"I want to publish to /camera/image."* If roscore crashes, the entire robot instantly dies because the nodes cannot discover each other. This single point of failure made ROS 1 incredible for universities, but illegal for commercial self-driving cars.

</TechnologyTemplate>
`,
  '48. Robotics/ROS2/index.mdx': `---
title: ROS 2
description: The next generation of the Robot Operating System, rebuilt from the ground up to support industrial, production, and real-time environments.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ROS 2"
  subtitle="Bringing ROS to production and self-driving cars"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ros_logo.svg/512px-Ros_logo.svg.png"
  description="ROS 2 is a total architectural rewrite of ROS 1. It mathematically removes the centralized Master Node and introduces strict Real-Time constraints, making it legal for use in industrial factories and autonomous vehicles."
  yearCreated={2017}
  creator="Open Robotics"
  isOpenSource={true}
  websiteUrl="https://docs.ros.org/"
>

While ROS 1 conquered academia, companies like Tesla and Boston Dynamics refused to use it in production. It lacked security, it could not mathematically guarantee Real-Time deadlines, and it relied on a fragile centralized \`roscore\` server.

To fix this, the community built **ROS 2**.

<Callout icon="tip" title="The DDS Backbone">
  ROS 2 mathematically stripped out the custom TCP/IP networking stack of ROS 1 and replaced it with **DDS (Data Distribution Service)**.
  
  DDS is a massive, military-grade communication standard used by the US Navy to coordinate battleships. It is completely decentralized (no \`roscore\`). It allows Nodes to mathematically discover each other via UDP multicast, and provides incredibly strict **Quality of Service (QoS)** policies, guaranteeing that a brake command reaches the wheels in exactly 2 milliseconds.
</Callout>

## Security (SROS2)

In ROS 1, anyone connected to the Wi-Fi could open a terminal, type \`rostopic pub /cmd_vel\`, and physically drive your robot into a wall. 

ROS 2 introduced **SROS2**. Every single Node requires mathematical X.509 cryptographic certificates to communicate. The traffic is fully encrypted, making it viable for NASA rovers and commercial delivery drones operating in the public sphere.

</TechnologyTemplate>
`,
  '48. Robotics/Robotic manipulation/index.mdx': `---
title: Robotic Manipulation
description: The ways robots interact with the physical world, grasp objects, and perform fine-grained mechanical tasks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Robotic Manipulation">

Driving a robot across a room (Navigation) is a solved mathematical problem. Reaching out, picking up a raw egg without crushing it, and placing it perfectly in a carton (Manipulation) is currently one of the hardest unsolved problems in robotics.

<Callout icon="warning" title="The Grasping Problem">
  Humans intuitively understand the physics of friction, weight, and fragility. 
  
  If a robotic arm attempts to grasp a coffee mug, it must mathematically calculate:
  1. **Force Closure:** Where exactly should the 3 fingers touch the mug so that gravity cannot pull it down?
  2. **Tactile Feedback:** The fingers must contain microscopic pressure sensors to stop squeezing the moment friction is achieved, preventing the ceramic from shattering.
</Callout>

## MoveIt!

In the ROS ecosystem, the absolute standard framework for manipulation is **MoveIt**. 

You feed MoveIt a 3D CAD model of your robotic arm (a URDF file). You tell MoveIt, *"I want the end-effector to touch this specific XYZ coordinate."* MoveIt uses massive mathematical planners (like OMPL) to instantly calculate the Inverse Kinematics, check for physical self-collisions (so the robot doesn't punch itself in the face), and generate a smooth velocity trajectory for all 6 joints to execute the movement.

</ConceptTemplate>
`,
  '48. Robotics/Reinforcement learning for robotics/index.mdx': `---
title: Reinforcement Learning for Robotics
description: An area of machine learning concerned with how intelligent agents ought to take actions in an environment to maximize the notion of cumulative reward.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reinforcement Learning for Robotics">

For 50 years, engineers made robots walk by manually writing brutal mathematical physics equations (calculating exact Zero-Moment Point dynamics for bipedal balancing). 

**Reinforcement Learning (RL)** mathematically throws all those equations in the trash.

<Callout icon="success" title="The Reward Function">
  Instead of programming the physics of walking, you program a **Reward Function**.
  - If the robot moves forward, give it +10 points.
  - If the robot falls over, give it -100 points.
  
  You place a digital twin of the robot inside a massive physics simulator (like Isaac Sim). The robot randomly twitches its legs for millions of iterations. Over time, the neural network mathematically discovers that a specific rhythmic oscillation of the knee and hip joints maximizes the score. The robot teaches itself how to walk.
</Callout>

## Sim-to-Real Transfer

The biggest mathematical challenge in Robotic RL is the **Sim-to-Real Gap**. 

A robot might learn to walk perfectly in a computer simulation, but when you flash that neural network into a physical robot, it instantly falls over because the simulation's mathematical approximation of friction or gravity was off by 1%. 

To solve this, researchers use **Domain Randomization** — mathematically randomizing the gravity, friction, and motor strength in the simulation every 5 minutes, forcing the neural network to become hyper-robust before ever touching the physical world.

</ConceptTemplate>
`,
  '48. Robotics/Swarm robotics/index.mdx': `---
title: Swarm Robotics
description: An approach to the coordination of multiple robots as a system which consist of large numbers of mostly simple physical robots.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Swarm Robotics">

If you want to map a massive 10-mile cave system, you can build one $500,000 highly advanced robot, but if a rock falls on it, the mission is over. 

Alternatively, you can deploy **Swarm Robotics**: 1,000 cheap, mathematically simple $50 drones. If 200 of them crash into walls, the swarm mathematically survives and completes the mission.

<Callout icon="info" title="Emergent Behavior">
  Swarm robotics is heavily inspired by biological insects (ants, bees). 
  
  There is NO centralized leader drone giving orders. Instead, every single drone runs the exact same, incredibly simple mathematical rule set (e.g., "Fly forward. If you see another drone, stay exactly 2 meters away. If you find the exit, emit a radio ping.")
  
  Out of these microscopic local rules, incredibly complex **Emergent Behavior** mathematically materializes, allowing the swarm to perfectly navigate mazes or build bridges.
</Callout>

## Mathematical Applications

- **Agriculture:** A swarm of 500 micro-drones mathematically sweeping a field to pollinate specific flowers.
- **Search and Rescue:** Deploying tiny ground robots into a collapsed building that communicate via a mathematical mesh network to locate survivors.
- **Space Exploration:** NASA deploying a swarm of autonomous rovers on Mars to map massive geological areas faster than a single monolithic rover like Curiosity.

</ConceptTemplate>
`,
  '48. Robotics/Human-robot interaction/index.mdx': `---
title: Human-Robot Interaction (HRI)
description: The study of interactions between humans and robots, integrating computer science, AI, psychology, and engineering.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Human-Robot Interaction (HRI)">

For decades, industrial robotic arms were kept inside massive steel cages. If a human stepped inside the cage, a laser tripped and mathematically cut the power, because the robot would blindly swing its arm and kill the human.

**Human-Robot Interaction (HRI)** is the science of breaking the robot out of the cage and allowing it to safely work shoulder-to-shoulder with humans.

<Callout icon="warning" title="Cobots (Collaborative Robots)">
  A **Cobot** is a robotic arm mathematically designed for HRI. 
  
  Unlike a traditional industrial robot, a Cobot's joints contain incredibly sensitive **Torque Sensors**. If the robot's arm bumps into a human shoulder, the sensor mathematically detects the tiny spike in electrical resistance and instantly freezes the motors within 1 millisecond, preventing any injury.
</Callout>

## The Psychology of Motion

HRI is not just safety; it is psychology. If a robot hands a cup of coffee to a human, it cannot move its arm in a perfectly straight, linear, mathematical line. Perfect linear motion is unnatural and terrifies human beings. 

HRI engineers use advanced motion planners to generate **biologically-inspired trajectories**, introducing slight S-curves and "breathing" idle animations so the human subconscious mathematically accepts the robot as a safe, predictable collaborator.

</ConceptTemplate>
`,
}

async function generateMega88() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega88().catch(console.error)
