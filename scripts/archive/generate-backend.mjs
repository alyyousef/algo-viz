import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '18. Backend Development/18.2 Runtimes & Frameworks/Node.js/index.mdx': `---
title: Node.js
description: An asynchronous event-driven JavaScript runtime.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Node.js">

Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Created by Ryan Dahl in 2009, it revolutionized web development by enabling developers to use JavaScript to write command line tools and for server-side scripting.

<Callout icon="info" title="The Single-Threaded Myth">
  While Node.js JavaScript execution is single-threaded (using an event loop), the underlying C++ libraries (libuv) maintain a thread pool to handle heavy I/O tasks like file reading or network requests asynchronously.
</Callout>

## The Event Loop Architecture

The core of Node.js's non-blocking I/O model is the **Event Loop**. Instead of spinning up a new thread for every request (like traditional Apache servers), Node.js operates on a single thread, delegating heavy operations to the OS.

<ArchitectureDiagram chart={\`
graph TD
  Request[Incoming HTTP Request]
  
  subgraph Node.js Process
    V8[V8 Engine / Call Stack]
    EventLoop[Event Loop]
    Worker[Worker Threads / libuv]
  end
  
  OS[(Operating System Kernel)]
  
  Request --> V8
  V8 -- Async Task (e.g. fs.readFile) --> EventLoop
  EventLoop -- Offload --> Worker
  Worker -- OS Call --> OS
  OS -- Interrupt / Done --> Worker
  Worker -- Callback to Queue --> EventLoop
  EventLoop -- Push to Stack --> V8
\`} />

## Non-Blocking I/O Example

Traditional servers block execution while reading a file. Node.js executes the request, hands the file read to the OS, and moves on to serve the next user instantly.

\`\`\`javascript
const fs = require('fs');

console.log('1. Starting file read...');

// This is NON-BLOCKING. The callback fires when the OS finishes reading.
fs.readFile('massive-file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('3. File read complete!');
});

console.log('2. Continuing to do other work...');

// Output Order: 1, 2, 3
\`\`\`

## Common Use Cases
- **REST APIs & GraphQL Servers** (Express, NestJS, Fastify)
- **Real-time Chat Applications** (Socket.io)
- **Streaming Servers** (Netflix uses Node.js heavily for UI serving)
- **CLI Tools** (Webpack, Vite, npm)

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/21.1 Relational Databases/PostgreSQL/index.mdx': `---
title: PostgreSQL
description: The World's Most Advanced Open Source Relational Database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="PostgreSQL">

PostgreSQL, also known as Postgres, is a free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance. It was originally named POSTGRES, referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley.

<Callout icon="tip" title="More than just Relational">
  While primarily an RDBMS, PostgreSQL has incredibly robust support for NoSQL features. Its \`JSONB\` data type allows you to store, index, and query JSON documents with performance rivaling dedicated document stores like MongoDB.
</Callout>

## Core Capabilities & Features

PostgreSQL is often considered the gold standard for robust, transactional databases.

<ComparisonTable 
  headers={['Feature', 'Description', 'Use Case']}
  rows={[
    ['ACID Compliance', 'Guarantees that database transactions are processed reliably.', 'Banking, Financial ledgers, Critical user data.'],
    ['MVCC', 'Multi-Version Concurrency Control prevents read locks from blocking writes.', 'High-traffic apps with concurrent reads/writes.'],
    ['JSONB', 'Binary JSON storage with specialized indexing (GIN).', 'Hybrid schema-less architectures.'],
    ['PostGIS', 'An extension that adds support for geographic objects.', 'Uber, Maps, Location-based queries.']
  ]}
/>

## Standard SQL Operations

PostgreSQL strictly adheres to the SQL standard while providing massive extensions.

\`\`\`sql
-- Creating a table with constraints and default values
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Querying deep inside a JSONB column
SELECT username, metadata->>'plan' as subscription_plan
FROM users
WHERE metadata @> '{"is_active": true}';
\`\`\`

## High Availability & Replication Architecture

Postgres achieves scale through robust primary-replica streaming architectures.

<ArchitectureDiagram chart={\`
graph LR
  Client[Web Application]
  
  subgraph Cluster
    Primary[(Primary DB\\nRead/Write)]
    Replica1[(Replica 1\\nRead Only)]
    Replica2[(Replica 2\\nRead Only)]
  end
  
  Client -- Writes --> Primary
  Client -- Reads --> Replica1
  Client -- Reads --> Replica2
  
  Primary -- WAL Streaming --> Replica1
  Primary -- WAL Streaming --> Replica2
\`} />

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/21.2 NoSQL - Document - Key-Value/MongoDB/index.mdx': `---
title: MongoDB
description: A document-oriented NoSQL database program.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="MongoDB">

MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

<Callout icon="warning" title="When to use (and when not to)">
  MongoDB is excellent for rapidly evolving schemas, content management, and storing polymorphic data. However, if your data is highly relational (requiring many JOINs across many tables) or requires complex multi-document ACID transactions, a traditional RDBMS like PostgreSQL is usually a better choice.
</Callout>

## The Document Paradigm

Instead of tables and rows, MongoDB uses **Collections** and **Documents**. Documents use a binary JSON format called **BSON** (Binary JSON), which allows for native storage of rich data types like Dates, Geo-coordinates, and nested arrays.

<ComparisonTable 
  headers={['RDBMS (SQL)', 'MongoDB']}
  rows={[
    ['Database', 'Database'],
    ['Table', 'Collection'],
    ['Row', 'Document'],
    ['Column', 'Field'],
    ['JOIN', '$lookup (Aggregation)']
  ]}
/>

## Example Document Structure

In MongoDB, related data is often embedded directly into a single document to improve read performance, rather than being normalized across multiple tables.

\`\`\`json
{
  "_id": ObjectId("507f191e810c19729de860ea"),
  "username": "alice_wonder",
  "email": "alice@example.com",
  "tags": ["developer", "gaming", "ai"],
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "zip": "94105"
  }
}
\`\`\`

## Architecture & Sharding

MongoDB is designed to scale horizontally across multiple servers through a process called **Sharding**.

<ArchitectureDiagram chart={\`
graph TD
  App[Application / Driver]
  Router(mongos Router)
  
  subgraph Shard 1
    P1[(Primary)]
    S1A[(Secondary)]
    S1B[(Secondary)]
  end
  
  subgraph Shard 2
    P2[(Primary)]
    S2A[(Secondary)]
  end
  
  App --> Router
  Router -- Hash(A-M) --> P1
  Router -- Hash(N-Z) --> P2
  
  P1 -. Replication .-> S1A
  P1 -. Replication .-> S1B
\`} />

</TechnologyTemplate>
`,
  '21. Databases - Fundamentals/21.2 NoSQL - Document - Key-Value/Redis/index.mdx': `---
title: Redis
description: An open-source, in-memory data structure store, used as a database, cache, and message broker.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Redis">

Redis (Remote Dictionary Server) is an open-source, in-memory storage, used as a distributed, in-memory key–value database, cache and message broker, with optional durability. Because it holds all data in RAM, Redis is exceptionally fast.

<Callout icon="tip" title="Blazing Fast">
  Redis routinely handles hundreds of thousands of reads and writes per second on standard hardware with sub-millisecond latency. It is the backbone of modern web caching.
</Callout>

## Common Use Cases

<ComparisonTable 
  headers={['Use Case', 'Redis Data Structure', 'Example']}
  rows={[
    ['Session Caching', 'Strings', 'Storing JWT tokens or user login sessions for quick validation.'],
    ['Rate Limiting', 'Strings / INCR', 'Limiting an API key to 100 requests per minute.'],
    ['Leaderboards', 'Sorted Sets (ZSET)', 'Ranking players in a game by their score automatically.'],
    ['Pub/Sub', 'Channels', 'Broadcasting a chat message to multiple connected WebSocket servers.']
  ]}
/>

## Interacting with Redis

Redis commands are extremely simple and atomic. The single-threaded nature of Redis ensures that race conditions generally do not occur on simple increments.

\`\`\`bash
# Setting a key with a TTL (Time to Live) of 60 seconds
> SETEX user_session_123 60 "active"
OK

# Implementing a simple page view counter
> INCR page_views:home
(integer) 1
> INCR page_views:home
(integer) 2

# Storing a high score in a sorted set
> ZADD gaming_leaderboard 5000 "PlayerOne"
(integer) 1
> ZADD gaming_leaderboard 8500 "PlayerTwo"
(integer) 1

# Get the top player
> ZREVRANGE gaming_leaderboard 0 0 WITHSCORES
1) "PlayerTwo"
2) "8500"
\`\`\`

## Caching Architecture (Look-Aside Cache)

The most common way Redis is deployed is as a "Look-Aside" cache sitting in front of a slower, persistent database (like PostgreSQL).

<ArchitectureDiagram chart={\`
graph TD
  App[API Server]
  Redis[(Redis Cache\\nIn-Memory)]
  DB[(PostgreSQL\\nDisk)]
  
  App -- 1. Read Data --> Redis
  Redis -- 2a. Cache Hit (Fast Return) --> App
  Redis -. 2b. Cache Miss .-> DB
  DB -- 3. Fetch Data (Slow) --> App
  App -- 4. Save to Cache --> Redis
\`} />

</TechnologyTemplate>
`,
  '18. Backend Development/18.1 Concepts/GraphQL/index.mdx': `---
title: GraphQL
description: A query language for APIs and a runtime for fulfilling those queries with your existing data.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="GraphQL">

GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. Developed internally by Facebook in 2012 before being publicly released in 2015, GraphQL provides a complete and understandable description of the data in your API, giving clients the power to ask for exactly what they need and nothing more.

<Callout icon="error" title="The REST Problem">
  GraphQL was invented to solve two massive problems with REST APIs: **Over-fetching** (downloading a huge payload just to get a user's name) and **Under-fetching** (having to make 5 sequential API calls to fetch a user, their posts, and their comments).
</Callout>

## Core Concepts

Unlike REST which uses multiple URLs for multiple resources (e.g., \`/users\`, \`/posts\`), GraphQL typically exposes a **single endpoint** (e.g., \`/graphql\`) and uses HTTP POST requests to send queries.

<ComparisonTable 
  headers={['REST API', 'GraphQL']}
  rows={[
    ['Endpoints', 'Multiple (one per resource/action)'],
    ['Endpoints', 'Single Endpoint (\`/graphql\`)'],
    ['Data Fetching', 'Server defines what data is returned'],
    ['Data Fetching', 'Client specifies exactly what data it wants'],
    ['Versioning', 'Requires v1/v2 URLs to avoid breaking clients'],
    ['Versioning', 'Schema evolution. Deprecate fields without breaking existing queries']
  ]}
/>

## GraphQL Query Example

The client explicitly defines the shape of the data it requires. The response will mirror the query exactly in JSON.

\`\`\`graphql
# The Client Query
query GetUserProfile {
  user(id: "123") {
    name
    email
    friends(limit: 2) {
      name
    }
  }
}
\`\`\`

\`\`\`json
// The Server Response
{
  "data": {
    "user": {
      "name": "Mark Zuckerberg",
      "email": "mark@meta.com",
      "friends": [
        { "name": "Eduardo" },
        { "name": "Dustin" }
      ]
    }
  }
}
\`\`\`

## Architecture & Resolvers

To make GraphQL work, the backend developer defines a **Schema** (the types) and **Resolvers** (functions that actually fetch the data for each field).

<ArchitectureDiagram chart={\`
graph TD
  Client[React Frontend]
  
  subgraph GraphQL Server
    Engine[GraphQL Execution Engine]
    
    subgraph Resolvers
      R_User(Query.user)
      R_Posts(User.posts)
    end
  end
  
  DB1[(PostgreSQL\\nUsers)]
  DB2[(MongoDB\\nPosts)]
  
  Client -- "query { user { name, posts { title } } }" --> Engine
  Engine --> R_User
  Engine --> R_Posts
  
  R_User --> DB1
  R_Posts --> DB2
\`} />

By decoupling the schema from the storage mechanism, GraphQL can easily act as an API Gateway, aggregating data from multiple microservices and legacy databases into a single cohesive graph.

</TechnologyTemplate>
`,
}

async function generateBackend() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough backend content for ${relativePath}`)
  }
}

generateBackend().catch(console.error)
