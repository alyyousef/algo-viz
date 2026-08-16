import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Scalability/index.mdx': `---
title: Scalability
description: The mathematical capability of a system to handle a growing amount of work, or its potential to be enlarged to accommodate that growth.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scalability">

If your web application is built to handle 100 users, what happens when it goes viral and 100,000 users show up tomorrow? **Scalability** is the mathematical measure of how easily your system can adapt to massive increases in load without completely falling over or degrading performance.

<Callout icon="info" title="Scalability vs. Performance">
  These are often confused. If a database takes 5 seconds to query a single record, it has terrible **Performance**. If that same database still takes exactly 5 seconds when 10,000 concurrent users query it, it has terrible performance but perfect **Scalability**.
</Callout>

## Dimensions of Scalability

A system can scale in several dimensions, depending on the mathematical bottleneck it faces:

<ComparisonTable 
  headers={['Dimension', 'Bottleneck Type', 'Solution Examples']}
  rows={[
    ['Compute (CPU)', 'Heavy mathematical calculations (e.g., video rendering, machine learning inference).', 'Adding more CPU cores, or spinning up more worker instances behind a Load Balancer.'],
    ['Memory (RAM)', 'Reading data from disk is too slow; the system needs to hold the entire dataset in fast memory.', 'Adding more RAM, or introducing a distributed cache like Redis/Memcached.'],
    ['Storage (Disk)', 'The database has grown to petabytes of data, exceeding the physical limits of a single hard drive.', 'Database Sharding, Partitioning, or moving to an object storage system like Amazon S3.'],
    ['Network (I/O)', 'The physical ethernet cables cannot mathematically transmit the sheer volume of gigabytes per second.', 'Upgrading network hardware, or placing a CDN (Content Delivery Network) at the edge to offload traffic.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Vertical scaling/index.mdx': `---
title: Vertical Scaling (Scaling Up)
description: The process of adding more resources (CPU, RAM, Disk) to an existing single server or node.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vertical Scaling (Scaling Up)">

When a server begins to mathematically choke under heavy load, the easiest and most intuitive solution is to simply buy a bigger, faster server. This is known as **Vertical Scaling** (or "Scaling Up").

If your database server currently has 16GB of RAM and an 8-core CPU, vertical scaling means shutting it down, physically swapping the motherboard for a 256GB RAM / 64-core beast, and turning it back on.

<Callout icon="success" title="The Advantage: Zero Code Changes">
  The primary mathematical benefit of Vertical Scaling is that it requires absolutely zero changes to your application architecture. The application code still thinks it is talking to a single database; that database is just magically much faster now.
</Callout>

## The Mathematical Limits of Vertical Scaling

Vertical Scaling is fantastic for startups, but it eventually hits a hard, mathematical wall:

1. **Hardware Ceilings:** You cannot mathematically buy a single server with 50,000 CPU cores. Eventually, you reach the absolute limit of modern physical hardware.
2. **Exponential Cost:** A server with twice as much RAM does not cost twice as much money; it often costs four or five times as much. The price curve for ultra-high-end enterprise hardware is exponential.
3. **Single Point of Failure (SPOF):** No matter how expensive and powerful your single mainframe is, if the power supply mathematically explodes, your entire application goes offline globally.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Horizontal scaling/index.mdx': `---
title: Horizontal Scaling (Scaling Out)
description: The process of adding more individual nodes or servers to a system, distributing the load across a cluster.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Horizontal Scaling (Scaling Out)">

Instead of buying one massive, $500,000 supercomputer (Vertical Scaling), **Horizontal Scaling** (or "Scaling Out") involves buying one thousand cheap, $500 commodity computers and mathematically linking them together to act as a single system.

<Callout icon="tip" title="Infinite Scalability">
  Unlike Vertical Scaling, Horizontal Scaling has no mathematical ceiling. If Google needs more search capacity, they don't buy a faster CPU; they simply wheel another rack of 1,000 cheap servers into the datacenter and plug them into the network.
</Callout>

## Architectural Complexity

While horizontal scaling provides infinite mathematical capacity, it introduces massive software complexity. You are now building a **Distributed System**.

<ComparisonTable 
  headers={['Component', 'Vertical Architecture', 'Horizontal Architecture Challenge']}
  rows={[
    ['State Management', 'The web server holds user sessions in local RAM.', 'Requests are load-balanced. If User A hits Server 1, and their next request hits Server 2, Server 2 does not know who they are. State must be externalized to Redis.'],
    ['Database Writes', 'A single PostgreSQL database handles all \`INSERT\` statements. ACID guarantees are easy.', 'Writes must be mathematically split across multiple databases (Sharding). Transactions across multiple shards (Two-Phase Commit) are painfully slow.'],
    ['Failure Handling', 'If the server dies, the app goes down.', 'In a cluster of 1,000 servers, it is mathematically guaranteed that one server will die every single day. The software must automatically detect dead nodes and reroute traffic.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Latency/index.mdx': `---
title: Latency
description: The time delay between the cause and the effect of some physical change in the system being observed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Latency">

In computing, **Latency** is the mathematically measurable time it takes for a single packet of data to travel from point A to point B. It is typically measured in milliseconds (ms).

If Throughput is the *width* of the highway (how many cars can fit side-by-side), Latency is the *speed limit* (how fast a single car can travel from New York to LA).

<Callout icon="warning" title="The Speed of Light">
  Latency is strictly bound by physics. The speed of light through a fiber-optic cable means that data traveling from London to Sydney will *always* take at least ~130 milliseconds mathematically, regardless of how much money you spend on the router. 
</Callout>

## The Latency Numbers Every Programmer Should Know

To architect high-performance systems, engineers must understand the mathematical magnitude of different operations (approximations):

<ComparisonTable 
  headers={['Operation', 'Latency', 'Human Scale Equivalent']}
  rows={[
    ['L1 Cache Reference', '~0.5 nanoseconds', '1 heartbeat (0.5s)'],
    ['Branch Mispredict', '~5 nanoseconds', '10 heartbeats (5s)'],
    ['Main Memory (RAM) Reference', '~100 nanoseconds', '3 minutes'],
    ['Read 1MB sequentially from SSD', '~1,000,000 ns (1 ms)', '1 month'],
    ['Send a packet CA -> EU -> CA', '~150,000,000 ns (150 ms)', '15 years!']
  ]}
/>

*Conclusion:* The most powerful optimization you can make is preventing data from crossing the network if it can be kept in RAM, and preventing it from hitting RAM if it can be kept in the L1 CPU cache.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Throughput/index.mdx': `---
title: Throughput
description: The rate of production or the rate at which something is processed over a specific period of time.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Throughput">

In System Design, **Throughput** is the mathematical measurement of how much actual work a system can complete in a given time period.

For a web server, it is typically measured in **Requests Per Second (RPS)** or **Queries Per Second (QPS)**. For a data pipeline, it is measured in megabytes or gigabytes per second.

<Callout icon="info" title="The Highway Analogy">
  If Latency is the speed a single car travels down a highway, Throughput is the total number of cars that can pass through the tollbooth every minute. You can mathematically increase Throughput without improving Latency simply by adding more lanes to the highway (Horizontal Scaling).
</Callout>

## Optimizing Throughput

If a system's throughput is hitting a mathematical ceiling, engineers typically look at:

1. **Connection Pooling:** Opening a new TCP connection to the database takes massive overhead. Connection pools keep a set of connections open permanently, drastically increasing the throughput of database queries.
2. **Batching:** Sending 1,000 individual \`INSERT\` statements to a database over the network will bottleneck throughput due to network overhead. Sending one single \`INSERT\` statement containing 1,000 rows mathematically maximizes network efficiency.
3. **Asynchronous I/O:** Using non-blocking architectures (like Node.js or Golang routines) ensures the CPU does not sit idle while waiting for network responses, allowing it to process thousands of other requests concurrently.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Availability/index.mdx': `---
title: Availability (The Nines)
description: The probability that a system will work as required when required during the period of a mission.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Availability">

**Availability** is the mathematical percentage of time a system is fully operational and able to serve legitimate user requests. 

It is calculated simply as: \`Uptime / (Uptime + Downtime)\`. In the industry, availability is colloquially referred to by the "Number of Nines."

<Callout icon="warning" title="The Exponential Cost of Nines">
  Going from 99% to 99.9% availability might cost $10,000 in architectural upgrades. Going from 99.99% to 99.999% ("Five Nines") might cost $10,000,000. It requires globally distributed, mathematically perfect active-active multi-region failover systems.
</Callout>

## The "Nines" Cheat Sheet

This is the mathematical translation of availability percentages into allowed downtime per year:

<ComparisonTable 
  headers={['Availability %', 'Colloquial Term', 'Downtime Allowed per Year', 'Typical Use Case']}
  rows={[
    ['99%', 'Two Nines', '3.65 Days', 'Internal batch processing tools, staging environments.'],
    ['99.9%', 'Three Nines', '8.77 Hours', 'Standard B2B SaaS applications, basic e-commerce.'],
    ['99.99%', 'Four Nines', '52.6 Minutes', 'Enterprise core services, major consumer apps (Netflix, Spotify).'],
    ['99.999%', 'Five Nines', '5.26 Minutes', 'Telecommunications, core banking ledgers, cloud provider control planes.'],
    ['99.9999%', 'Six Nines', '31.5 Seconds', 'Aviation control systems, military nuclear defense grids.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Reliability/index.mdx': `---
title: Reliability
description: The probability that a system will produce correct outputs up to some given time, under specified operating conditions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Reliability">

While *Availability* asks "Is the server turned on?", **Reliability** asks "Is the server actually doing the math correctly?"

A system can be 100% Highly Available (always returning an HTTP 200 OK status code), but if it mathematically returns the wrong bank account balance to the user, it has zero Reliability.

<Callout icon="tip" title="MTBF and MTTR">
  Reliability engineering is heavily driven by two mathematical metrics:
  1. **MTBF (Mean Time Between Failures):** The average time the system runs perfectly before encountering an error. You want this number to be as high as possible.
  2. **MTTR (Mean Time To Recovery):** Once a failure occurs, how fast can the automated systems detect and fix it? You want this number to be close to zero.
</Callout>

## Building Reliable Systems

1. **Idempotency:** A critical mathematical property. If a user clicks the "Pay Now" button twice due to a network stutter, the system must mathematically guarantee they are only charged once. The operation must be idempotent.
2. **Chaos Engineering:** Instead of hoping the system doesn't fail, engineers deliberately inject mathematical chaos (e.g., randomly shutting down databases in production using tools like Netflix's Chaos Monkey) to mathematically prove the system recovers correctly.
3. **Data Integrity Checks:** Using checksums, hashes, and foreign-key constraints to ensure data doesn't silently corrupt on the hard drive over time.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Fault tolerance/index.mdx': `---
title: Fault Tolerance
description: The property that enables a system to continue operating properly in the event of the failure of some of its components.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Fault Tolerance">

At scale, hardware failure is not a possibility; it is a mathematical certainty. Hard drives will explode, fiber optic cables will be cut by construction backhoes, and datacenters will catch on fire.

**Fault Tolerance** is the architectural design that mathematically guarantees the application will survive these specific, localized failures without the end-user ever noticing a drop in availability.

<Callout icon="success" title="Redundancy is the Key">
  The core mathematical mechanism for Fault Tolerance is Redundancy (N+1 architecture). If you mathematically require 3 web servers to handle the traffic load, you intentionally deploy 4. If one catches on fire, the remaining 3 can absorb the load without failing.
</Callout>

## Layers of Fault Tolerance

<ComparisonTable 
  headers={['Failure Layer', 'Fault Tolerant Design Pattern']}
  rows={[
    ['Hard Drive Failure', 'RAID (Redundant Array of Independent Disks). Data is mathematically striped or mirrored across multiple physical disks inside the same server.'],
    ['Server Failure', 'Load Balancing. If the EC2 instance dies, the Load Balancer instantly detects the mathematical loss of heartbeat and routes traffic to healthy instances in the cluster.'],
    ['Datacenter Failure', 'Multi-AZ (Availability Zone). Replicating the database synchronously across three physically separate buildings powered by different municipal power grids.'],
    ['Regional Disaster (Earthquake)', 'Multi-Region Active-Passive or Active-Active deployment (e.g., US-East routing traffic to EU-West via global DNS failover).']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Consistency/index.mdx': `---
title: Consistency (Distributed)
description: A guarantee that every read receives the most recent write or an error.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Consistency">

In a distributed system, you cannot store all data on one machine. To achieve fault tolerance, data is mathematically replicated to multiple nodes (e.g., Node A in New York, Node B in London).

**Consistency** asks a critical mathematical question: If I write a value to Node A, and immediately read from Node B, will Node B give me the new value, or the old value?

<Callout icon="error" title="The Speed of Light Problem">
  It is physically impossible for the New York node to instantly teleport the data to the London node. It takes ~70 milliseconds for light to travel the Atlantic. During that 70ms window, the system is mathematically inconsistent.
</Callout>

## The Consistency Spectrum

<ComparisonTable 
  headers={['Consistency Model', 'Mathematical Guarantee', 'Use Case']}
  rows={[
    ['Strong Consistency', 'Every read is guaranteed to return the absolute most recent write. Node A will lock the database and refuse to acknowledge the write until Node B confirms it has the data.', 'Banking ledgers, financial trading systems. (Slow performance, high safety).'],
    ['Eventual Consistency', 'Node A accepts the write instantly and asynchronously sends it to Node B. If you read from Node B too fast, you might get stale data, but "eventually" it converges.', 'Social media likes, YouTube view counts, DNS records. (High performance, low safety).'],
    ['Read-Your-Own-Writes', 'A hybrid model. A user is mathematically guaranteed to see their own updates immediately, but other users might see stale data for a few seconds.', 'Posting a Facebook status update.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.1 System Design Concepts/Durability/index.mdx': `---
title: Durability
description: The ACID property which guarantees that transactions that have committed will survive permanently.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Durability">

**Durability** is the absolute mathematical guarantee that once a database tells the user "Success! Your data is saved", that data will survive a catastrophic failure (like someone instantly ripping the power cord out of the server wall).

<Callout icon="warning" title="The OS Page Cache Lie">
  When an application tells the Operating System to write to a file, the OS lies. It puts the data in a fast RAM buffer (the Page Cache) and returns "Success!" to the application. It flushes the RAM to the physical hard drive later. If the power cuts out before the flush, the data vanishes.
</Callout>

## How Databases Achieve True Durability

To achieve true mathematical durability, databases use a mechanism called a **Write-Ahead Log (WAL)**.

1. The database receives an \`INSERT\` command.
2. It appends the raw command to an append-only file (the WAL).
3. Crucially, the database executes a system call like \`fsync()\` or \`fdatasync()\`. This mathematically forces the OS to bypass the RAM cache and physically burn the bytes onto the magnetic platters or SSD flash chips before returning.
4. Only after the physical hardware confirms the burn does the database return "Success" to the user.
5. If the server loses power a microsecond later, upon reboot, the database reads the WAL from the hard drive and perfectly reconstructs the mathematical state.

</ConceptTemplate>
`,
}

async function generateMega70() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega70().catch(console.error)
