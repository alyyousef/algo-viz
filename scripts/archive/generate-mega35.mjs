import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/48. Robotics/ROS/index.mdx': `---
title: ROS (Robot Operating System)
description: "An open-source robotics middleware suite providing standard operating system services, hardware abstraction, and a publisher-subscriber message-passing architecture."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="ROS (Robot Operating System)">

Despite its name, **ROS is not an Operating System**. It does not boot up your computer, and it does not manage your RAM. It runs *on top* of a real OS (almost exclusively Ubuntu Linux).

ROS is **Middleware**. It is a massive framework of tools, libraries, and communication protocols that solve the hardest problem in robotics: getting hundreds of different hardware components and software algorithms to talk to each other.

## The Problem ROS Solves
Imagine building a self-driving car. You buy a LiDAR sensor from Velodyne, a camera from Sony, and motor controllers from Bosch. None of these components speak the same language. You have to write custom C++ drivers to parse binary data from the LiDAR, convert it to an array, pass it to a Python script running OpenCV, and then pass *that* to a C script controlling the motors. 

If you swap the LiDAR for a different brand, you have to rewrite your entire codebase.

## The ROS Node Architecture
ROS solves this by enforcing a strictly decoupled, modular architecture based on the **Publish/Subscribe** model.

In ROS, every independent piece of software is a **Node**. 
1. **Camera Node**: Just talks to the physical camera and publishes a standard ROS TICK1ImageTICK1 message.
2. **LiDAR Node**: Just talks to the LiDAR and publishes a standard ROS TICK1PointCloudTICK1 message.
3. **Perception Node**: Subscribes to the TICK1ImageTICK1 and TICK1PointCloudTICK1 topics, runs neural networks, and publishes a TICK1BoundingBoxesTICK1 message.
4. **Control Node**: Subscribes to TICK1BoundingBoxesTICK1 and publishes a TICK1TwistTICK1 (velocity) message to the motors.

Because the Perception Node only expects a standard ROS TICK1ImageTICK1, you can physically swap the Sony camera for a Logitech webcam, run the Logitech ROS driver, and **the rest of your software doesn't have to change at all.**

<Callout icon="info" title="ROS vs ROS2">
ROS 1 was built for academic research. It relied on a single "Master" node to route traffic. If the Master crashed, the entire robot died. **ROS 2** was rewritten from the ground up for industrial production. It uses DDS (Data Distribution Service), removing the single point of failure and allowing real-time, deterministic performance suitable for self-driving cars and medical robots.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/Kinematics (forward-inverse)/index.mdx': `---
title: Kinematics (Forward & Inverse)
description: "The branch of classical mechanics that describes the motion of points, bodies, and systems without considering the forces that cause them."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Kinematics (Forward vs. Inverse)">

Imagine a robotic arm with a shoulder joint, an elbow joint, and a wrist joint. Attached to the wrist is a claw (the **End-Effector**). 

**Kinematics** is the pure geometry and trigonometry required to figure out where that claw is in 3D space, or how to move the joints to get the claw to a specific target. (Note: Kinematics ignores gravity, mass, and torque. That is called *Dynamics*).

## Forward Kinematics (FK)
**Given:** The exact angle of every joint (e.g., Shoulder is 45°, Elbow is 90°, Wrist is 0°).
**Find:** The X, Y, Z coordinate of the claw.

Forward Kinematics is a **solved, deterministic problem**. Using basic trigonometry and matrix multiplication (specifically Denavit-Hartenberg parameters), there is exactly one correct answer. If you know the length of the robot's "bones" and the angles of its "joints", you can calculate exactly where the hand is.

## Inverse Kinematics (IK)
**Given:** The desired X, Y, Z coordinate of the claw (e.g., "Grab that coffee cup at coordinates [10, 5, 2]").
**Find:** What angles should I set the shoulder, elbow, and wrist to?

Inverse Kinematics is an **incredibly difficult, non-linear problem**. 

<ComparisonTable 
  headers={['Why is IK so hard?', 'Explanation']} 
  rows={[
    ['Multiple Solutions', 'Reach your own hand out and touch your computer screen. Now, keep your finger on the screen, but lift your elbow into the air. You just found two different joint configurations that achieve the exact same X,Y,Z coordinate.'],
    ['No Solutions', 'If the coffee cup is 10 feet away, and the robot arm is only 3 feet long, there is no mathematical combination of joint angles that can reach it.'],
    ['Singularities', 'Specific mathematical positions where the robot loses a degree of freedom (like when your arm is perfectly straight and locked), causing IK algorithms to divide by zero and fail catastrophically.']
  ]} 
/>

<Callout icon="tip" title="How is IK solved?">
Because IK often has no perfect algebraic solution, modern robots use **Numerical Methods** (like Gradient Descent or Jacobian Inverse matrices) to iteratively "guess and check" their way to the correct joint angles hundreds of times per second.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/SLAM/index.mdx': `---
title: SLAM (Simultaneous Localization and Mapping)
description: "The computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="SLAM (Simultaneous Localization and Mapping)">

**SLAM** is arguably the most famous and difficult algorithmic problem in modern mobile robotics. It is the core technology behind robot vacuums (Roombas), self-driving cars, and Mars rovers.

## The Chicken-and-Egg Problem
To navigate a room, a robot needs two things:
1. **Localization**: "Where am I?" (To know where you are, you need a map).
2. **Mapping**: "What does the room look like?" (To draw a map, you need to know exactly where you are standing when you draw it).

SLAM is the mathematical magic of doing both at the exact same time. The robot uses its sensors (LiDAR or cameras) to look at the walls, guess its position based on the walls, and then use that position to draw more walls.

## How SLAM Works (Simplified)
1. **Odometry (Dead Reckoning)**: The robot counts its wheel rotations to guess how far it moved. *"My wheels turned 3 times, I must have moved 1 meter forward."* Because wheels slip on carpet, this guess is slightly wrong.
2. **Observation**: The LiDAR scans the room and sees a distinct corner of a wall.
3. **Movement**: The robot moves forward, Odometry guesses the new position, and LiDAR scans the room again.
4. **Scan Matching**: The SLAM algorithm compares the new LiDAR scan to the old one. If Odometry says we moved 1 meter, but the wall corner only looks like we moved 0.9 meters, SLAM uses heavy probabilistic math (usually a **Kalman Filter** or **Particle Filter**) to correct the Odometry error and update the internal map.

## Loop Closure
The biggest challenge in SLAM is **Drift**. If a robot drives down a long hallway, tiny errors in sensor readings accumulate. The map starts to bend slightly. 

If the robot drives in a massive circle around a building and returns to the exact spot it started, the accumulated drift might make the robot think it is 10 feet to the left of where it actually is. 

**Loop Closure** is when the algorithm suddenly recognizes a feature it saw 20 minutes ago. It realizes, *"Wait, I've been here before. I must have drifted!"* The SLAM algorithm then instantly snaps the entire map back into place, correcting all the accumulated errors backward through time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/Path planning/index.mdx': `---
title: Path Planning
description: "The computational problem of finding a valid sequence of configurations that moves a robot from a start state to a goal state without colliding with obstacles."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'

<ConceptTemplate title="Path Planning">

Once a robot has a Map (created by SLAM) and knows where it is, it needs to figure out how to get to its destination. This is **Path Planning**.

If you've played a video game, you've seen path planning. It's the algorithm that allows an NPC to walk around a wall to attack you. In robotics, the algorithms are very similar to standard graph search algorithms used in Computer Science.

## Common Algorithms

<ComparisonTable 
  headers={['Algorithm', 'How it Works', 'Pros / Cons']} 
  rows={[
    ['A* (A-Star)', 'Divides the map into a grid. Uses a heuristic (like straight-line distance to the goal) to prioritize exploring grid squares that get closer to the target.', 'Pros: Guarantees the shortest path. Cons: Too slow for massive maps or high-dimensional robot arms.'],
    ['Dijkstra’s Algorithm', 'Explores the grid equally in all directions like a ripple in a pond until it hits the target.', 'Pros: Guarantees shortest path. Cons: Terrible performance compared to A* because it explores useless directions.'],
    ['RRT (Rapidly-exploring Random Tree)', 'Shoots out random "branches" from the starting point into empty space. When a branch gets close to the goal, it traces the path back.', 'Pros: Extremely fast in complex, high-dimensional spaces (like a 7-jointed robotic arm). Cons: The path it finds is jagged and usually not the shortest.']
  ]} 
/>

## Configuration Space (C-Space)
A common mistake beginners make is treating the robot as a single point. If a robot is 2 meters wide, and you plan a path through a 1-meter doorway using A*, the robot will crash into the doorframe.

To solve this, roboticists use **Configuration Space (C-Space)**. Before running A*, they artificially "inflate" all the walls and obstacles on the map by the radius of the robot. 
Once the walls are artificially inflated, the robot can safely be treated as a single 1-pixel dot by the algorithm. If the dot avoids the inflated walls on the map, the physical robot will avoid the real walls in the real world.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/Motion planning/index.mdx': `---
title: Motion Planning
description: "The process of detailing the exact physical movements (velocities, accelerations, and timings) required to execute a geometric path."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Motion Planning (Trajectory Generation)">

**Path Planning** and **Motion Planning** are often confused, but they are distinct steps in the robotics pipeline.

- **Path Planning** gives you a geometric line on a map. (e.g., "Go from X to Y to Z to avoid the wall").
- **Motion Planning** takes that line and adds the physics of time, velocity, and acceleration. 

## Why Motion Planning is Necessary
If Path Planning says, *"Move from Coordinate A to Coordinate B,"* you cannot simply tell the robot's motors to spin at 100% speed instantly. 

If a 4,000-pound self-driving car instantly requests infinite acceleration, the tires will spin out. If it reaches Coordinate B and requests infinite deceleration, the passengers will fly through the windshield.

Motion Planning converts the geometric path into a **Trajectory**—a smooth sequence of setpoints that respect the physical limits of the robot.

## Velocity Profiles
To move smoothly from A to B, Motion Planners generate Velocity Profiles.

1. **Trapezoidal Profile**: The robot accelerates at a constant rate, cruises at a max velocity, and decelerates at a constant rate. (If you graph velocity over time, it looks like a trapezoid).
2. **S-Curve Profile (Jerk Control)**: A trapezoidal profile has sudden "jerks" when acceleration starts and stops (spilling coffee in a self-driving car). An S-Curve smooths out the acceleration itself, resulting in buttery-smooth robotic movement.

<Callout icon="tip" title="Dynamic Obstacles">
Motion planning is also responsible for dynamic obstacle avoidance. If Path Planning gives a route down a hallway, and a human suddenly steps in front of the robot, the Motion Planner must instantly recalculate a localized trajectory (a "Local Planner") to swerve around the human, while still following the overall global path.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/Control systems/index.mdx': `---
title: Control Systems (PID)
description: "The mathematical engineering discipline of managing and directing the behavior of dynamical systems to achieve a desired output."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Control Systems & PID Controllers">

Once a robot knows the trajectory it *wants* to take (from the Motion Planner), how does it actually make the physical motors follow that trajectory?

Because of friction, gravity, and battery voltage fluctuations, if you tell a motor to spin at 50 RPM, it might actually spin at 47 RPM. **Control Theory** is the science of using sensor feedback to constantly correct these physical errors in real-time.

## The PID Controller
The **Proportional-Integral-Derivative (PID)** controller is the most ubiquitous control algorithm in the world. It is used in cruise control, drones, 3D printers, and industrial robots.

It calculates the **Error** (the difference between where you *want* to be and where you *actually* are) and applies three distinct mathematical corrections to the motor power:

<ComparisonTable 
  headers={['Term', 'Meaning', 'Analogy (Driving a Car)']} 
  rows={[
    ['Proportional (P)', 'Present Error. The bigger the error, the harder it pushes.', 'If you are 20 mph below the speed limit, you floor the gas. If you are 2 mph below, you press it lightly.'],
    ['Integral (I)', 'Past Error. Accumulates the error over time to eliminate steady-state bias.', 'You are pressing the gas slightly, but driving up a steep hill, so you are stuck 2 mph below the limit. The "I" term realizes you have been stuck for 10 seconds and slowly adds more gas to push you over the hill.'],
    ['Derivative (D)', 'Future Error. Looks at the rate of change to prevent overshooting.', 'You floored the gas and are rapidly approaching the speed limit. The "D" term sees you approaching too fast and eases off the gas early so you don’t accidentally speed.']
  ]} 
/>

## Tuning
A PID controller is just a formula with three configurable numbers: TICK1KpTICK1, TICK1KiTICK1, and TICK1KdTICK1. 

Finding the perfect values for these three numbers is called **Tuning**. If they are tuned poorly, the robot will oscillate violently back and forth, or react so slowly it crashes. Tuning is often done through mathematical modeling, or simply empirical trial-and-error (like the Ziegler-Nichols method).

<Callout icon="info" title="Beyond PID">
While PID is great for single motors, complex robots (like a walking humanoid or a SpaceX rocket landing) require **Model Predictive Control (MPC)**. MPC uses heavy physics simulations to look several seconds into the future, calculating the optimal motor commands required to land the rocket safely without violating physical constraints.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/Computer vision for robotics/index.mdx': `---
title: Computer Vision for Robotics
description: "The algorithms and hardware that allow a robot to extract high-level understanding from digital images or videos to interact with the physical world."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computer Vision for Robotics">

A robot is blind without sensors. While LiDAR provides incredible 3D geometry, it is entirely colorblind. It can see a flat rectangular obstacle in front of the car, but it cannot tell if that rectangle is a solid brick wall or a harmless cardboard box. 

**Computer Vision (CV)** allows robots to interpret semantic meaning from RGB cameras.

## The Robotics Vision Pipeline
Modern robotic vision generally follows a pipeline dominated by Convolutional Neural Networks (CNNs).

1. **Object Detection (YOLO)**: The robot identifies bounding boxes around distinct objects. ("There is a Car at [100px, 200px] and a Pedestrian at [50px, 80px]"). Algorithms like YOLO (You Only Look Once) are heavily used because they run fast enough (60+ FPS) for real-time robotic reaction.
2. **Semantic Segmentation**: Bounding boxes aren't enough for safe navigation. Segmentation classifies *every single pixel* in the image. ("Pixels 1-400 are 'Sky', Pixels 401-800 are 'Road', Pixels 801-900 are 'Sidewalk'"). This tells the robot exactly where the drivable surface is.
3. **Sensor Fusion**: The ultimate step. The robot takes the 2D pixel classification from the camera ("This is a Stop Sign") and overlays it onto the 3D point cloud from the LiDAR. Now the robot knows it is looking at a Stop Sign that is exactly 14.3 meters away.

## Unique Challenges in Robotics
Computer Vision for a web app (like sorting user photos) is easy. Computer vision for a robot is terrifyingly hard.
- **Lighting Variability**: A self-driving car's camera gets blinded by direct sunset glare, plunged into total darkness in a tunnel, and covered by raindrops, all within 60 seconds.
- **Compute Constraints**: You cannot send video to the cloud for processing; latency will cause a crash. The heavy AI models must run locally on the robot's embedded Edge GPU (like an NVIDIA Jetson), which has strict power and thermal limits.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/48. Robotics/Swarm robotics/index.mdx': `---
title: Swarm Robotics
description: "An approach to the coordination of multiple robots as a system which consists of large numbers of mostly simple physical robots."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Swarm Robotics">

Nature provides one of the best blueprints for robotics: the ant colony. A single ant is weak, has minimal intelligence, and is highly expendable. But a colony of 10,000 ants can build bridges, find food, and defend territory with terrifying efficiency.

**Swarm Robotics** applies this biological concept to machines. Instead of building one massive, complex, $100,000 robot, you build 1,000 tiny, simple, $100 robots that work together.

## Principles of a Swarm
For a system to be considered a true "Swarm" (and not just a fleet of remote-controlled drones), it must exhibit specific characteristics:

1. **Decentralized Control**: There is no "Master Robot" or central server issuing commands. If you destroy 50% of the robots in the swarm, the remaining 50% seamlessly adapt and finish the task.
2. **Local Sensing and Communication**: Robots do not have a global map of the world. They only sense their immediate environment and communicate with neighbors directly next to them (using infrared or short-range RF).
3. **Emergent Behavior**: The robots follow incredibly simple, primitive rules (e.g., "Follow the robot in front of you, don't crash into the robot next to you"). Yet, when 500 robots execute these simple rules simultaneously, complex, highly intelligent behaviors emerge (like flocking, foraging, or surrounding an enemy).

## Real-World Applications
- **Search and Rescue**: After an earthquake, sending one large robot into a collapsed building is dangerous and slow. Deploying a swarm of 500 micro-drones allows them to rapidly map every crevice of the rubble simultaneously.
- **Agriculture**: Swarms of tiny robots can traverse a farm field, using computer vision to identify and pull individual weeds or spray micro-doses of pesticide, replacing massive, soil-compacting tractors.

<Callout icon="warning" title="The Intel Drone Shows">
Those massive drone light shows at the Olympics (often involving 2,000 drones) are **not** true Swarm Robotics. They are centrally orchestrated. A single ground computer calculates the exact GPS coordinate for every single drone and transmits the flight path. If the central computer crashes, the show stops.
</Callout>

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
