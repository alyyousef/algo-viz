import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/API versioning/index.mdx': `---
title: API Versioning
description: The mathematical and architectural practice of managing changes to an API over time, ensuring that backward-incompatible modifications do not break existing clients that rely on the older mathematical structure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="API Versioning"
  subtitle="Managing Mathematical Evolution"
  tags={['API', 'REST', 'Architecture', 'Web']}
>

If you have a mobile app downloaded by 1 million users, and you change the API response from TICK1{ "name": "Alice" }TICK1 to TICK1{ "firstName": "Alice", "lastName": "Smith" }TICK1, the mobile app will crash instantly because it is mathematically expecting the TICK1nameTICK1 key.

## 1. The Necessity of Versioning
You mathematically cannot force 1 million users to update their app on the same day. Therefore, the server must support *both* the old and the new mathematical structures simultaneously. This is achieved via Versioning.

## 2. Versioning Strategies
There are three standard mathematical ways to route the request:
- **URI Routing**: The most common. The client explicitly requests TICK1https://api.com/v1/usersTICK1 or TICK1https://api.com/v2/usersTICK1. The load balancer routes the traffic to different controllers.
- **Header Versioning**: The URI remains clean (TICK1/usersTICK1), but the client sends a custom HTTP header: TICK1X-API-Version: 2TICK1.
- **Accept Header (Content Negotiation)**: The most mathematically RESTful, but hardest to implement. The client specifies the exact mathematical shape it expects: TICK1Accept: application/vnd.company.user.v2+jsonTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Authentication/index.mdx': `---
title: Authentication vs Authorization
description: "The two fundamental mathematical pillars of API security: Authentication cryptographically proves *who* the client is, while Authorization mathematically dictates *what* that client is allowed to do."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Authentication & Authorization"
  subtitle="The Mathematical Pillars of Identity"
  tags={['API', 'Security', 'Web', 'Architecture']}
>

In a stateless REST API, the server mathematically forgets the client exists after every HTTP request. If a client requests a bank balance, the server must cryptographically verify their identity from scratch every single time.

## 1. Authentication (Who are you?)
Authentication is the mathematical proof of identity.
When a user logs in with a password, the server verifies the hash. Because REST is stateless, the server mathematically signs a JSON Web Token (JWT) using a secret cryptographic key (e.g., HMAC-SHA256) and hands it to the client.
The client sends this token in the TICK1Authorization: Bearer <token>TICK1 header with every subsequent request. The server verifies the signature to mathematically guarantee the client is who they claim to be, without needing to query the database.

## 2. Authorization (What can you do?)
Once the server knows the client is "Alice" (Authentication), it must check **Authorization**.
Alice requests TICK1DELETE /users/bobTICK1. The API mathematically checks Alice's Role-Based Access Control (RBAC). Is Alice an Admin? No. The API rejects the request with a TICK1403 ForbiddenTICK1 status code. Authentication proved it was Alice; Authorization proved Alice didn't have the mathematical permissions.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Filtering/index.mdx': `---
title: API Filtering
description: The architectural practice of allowing API clients to mathematically specify exact criteria to narrow down a large dataset, returning only the specific records that match the requested boolean logic.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="API Filtering"
  subtitle="Mathematical Dataset Reduction"
  tags={['API', 'REST', 'Web', 'Architecture']}
>

If an API has 10,000 TICK1UsersTICK1 in the database, and the client only wants to see users who live in New York and are over the age of 21, the API mathematically must not return all 10,000 users. It would crush the mobile app's RAM and the user's data plan.

## 1. URL Query Parameters
Filtering in REST APIs is mathematically implemented using the URL query string (everything after the TICK1?TICK1).
TICK1GET /users?city=NewYork&age_gte=21TICK1
The server mathematically parses these parameters, translates them into a SQL TICK1WHERETICK1 clause (TICK1WHERE city = 'NewYork' AND age >= 21TICK1), and executes the query.

## 2. Complex Mathematical Operators
Simple key-value pairs fail when you need advanced mathematics (like "greater than" or "OR" logic). Modern APIs adopt standardized syntaxes:
- **Bracket Notation**: TICK1GET /users?age[gte]=21&age[lte]=50TICK1
- **LHS Brackets**: TICK1GET /users?age=gte:21TICK1
- **Full Query Languages**: Some APIs expose powerful mathematical querying systems like OData or GraphQL, allowing the client to send complex, nested boolean syntax directly to the API endpoint.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/GraphQL/index.mdx': `---
title: GraphQL
description: A powerful query language for APIs developed by Facebook that mathematically allows clients to request exactly the data they need—no more, no less—solving the over-fetching and under-fetching problems of REST.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GraphQL"
  subtitle="Client-Driven Mathematical Querying"
  tags={['API', 'GraphQL', 'Architecture', 'Web']}
>

In a standard REST API, the *Server* mathematically dictates the shape of the data. If TICK1GET /users/1TICK1 returns 50 fields, the mobile app receives 50 fields, even if it only needed the user's TICK1firstNameTICK1. This is **Over-fetching**.

## 1. The Client Dictates the Shape
GraphQL mathematically inverts this architecture. The Server publishes a strict mathematical Schema of what is *possible*, but the *Client* sends a query specifying exactly the shape it wants in response.
Client requests:
TICK3graphql
query {
  user(id: 1) {
    firstName
    company {
      name
    }
  }
}
TICK3

## 2. Solving Under-fetching
In REST, if you need a user's details and their recent posts, you must make two separate HTTP network calls: TICK1GET /users/1TICK1 and TICK1GET /users/1/postsTICK1. This is **Under-fetching** (the N+1 problem).
With GraphQL, the mathematical graph traversal happens on the server. The client sends one single HTTP POST request, and the server's Resolvers mathematically query the User database and the Post database simultaneously, returning the exact, nested JSON shape requested in exactly one network round-trip.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/gRPC/index.mdx': `---
title: gRPC
description: A high-performance, open-source universal RPC framework developed by Google that uses HTTP/2 and Protocol Buffers to mathematically compress data and accelerate communication between distributed Microservices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="gRPC"
  subtitle="High-Performance Microservice Communication"
  tags={['API', 'gRPC', 'Microservices', 'Networking']}
>

While REST/JSON is perfect for Web Browsers, it is mathematically terrible for internal Microservice communication. JSON is a heavy, uncompressed string format that requires massive CPU cycles to serialize and deserialize.

## 1. Protocol Buffers (Protobuf)
gRPC uses **Protocol Buffers** instead of JSON.
The developer writes a TICK1.protoTICK1 file mathematically defining the exact types and methods. The gRPC compiler reads this file and automatically generates the physical code for both the Client and Server in Java, Go, Python, etc.
When the Microservice sends data, it does not send the string TICK1"firstName": "Alice"TICK1. It mathematically compresses the data into a dense, binary stream. This reduces network payload size by 50-80% and increases CPU parsing speed by 10x compared to JSON.

## 2. HTTP/2 and Streaming
gRPC mathematically requires HTTP/2. Unlike HTTP/1.1 (which requires opening a new TCP connection for every request), HTTP/2 multiplexes thousands of concurrent requests over a single persistent TCP connection. This allows gRPC to mathematically support bi-directional, real-time streaming data between servers, making it the dominant protocol for modern cloud-native Microservices.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/HATEOAS/index.mdx': `---
title: HATEOAS
description: Hypermedia As The Engine Of Application State, the ultimate architectural constraint of REST, mathematically requiring the API to return dynamic hyperlinks that tell the client what actions are currently possible.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="HATEOAS"
  subtitle="The Ultimate REST Constraint"
  tags={['API', 'REST', 'Architecture', 'Advanced']}
>

Roy Fielding (the inventor of REST) mathematically defined that an API is *not* RESTful unless it implements HATEOAS. (99% of "REST APIs" on the internet today do not implement HATEOAS).

## 1. The State Machine
When you visit a website in your browser, you don't memorize URLs. You click the hyperlinks the server gives you. HATEOAS mathematically applies this to APIs.
If a client queries a Bank Account via API, standard JSON returns the balance. If the client wants to withdraw money, the client has to hardcode the TICK1/withdrawTICK1 URL in their mobile app.

## 2. Dynamic Hypermedia
With HATEOAS, the API mathematically returns the data *and* a list of valid links.
TICK3json
{
  "balance": 100,
  "links": [
    { "rel": "deposit", "href": "/accounts/1/deposit" },
    { "rel": "withdraw", "href": "/accounts/1/withdraw" }
  ]
}
TICK3
If the balance hits 0, the server mathematically omits the "withdraw" link from the JSON. The client app is programmed to simply read the links. If the link isn't there, it grays out the button. The API mathematically drives the entire state machine of the client, completely decoupling the client from hardcoded URLs.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Idempotency/index.mdx': `---
title: Idempotency
description: A fundamental mathematical property in API design stating that an operation can be applied multiple times without changing the result beyond the initial application, critical for ensuring safety in unreliable networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Idempotency"
  subtitle="Mathematical Safety in Retries"
  tags={['API', 'REST', 'Architecture', 'Networking']}
>

When a mobile app sends an HTTP POST request to a Stripe API to charge a credit card $100, the network might drop the HTTP Response. The mobile app doesn't know if the charge succeeded or failed. If it retries the POST request, it might accidentally charge the user $200. 

## 1. Mathematical Idempotency
An operation is mathematically **Idempotent** if TICK1f(f(x)) = f(x)TICK1.
In REST APIs, HTTP methods have strict mathematical rules regarding idempotency:
- **GET, PUT, DELETE**: Mathematically Idempotent. (If you DELETE User 5, and then accidentally execute DELETE User 5 again due to a network retry, the end state is identical: User 5 is gone).
- **POST**: Mathematically NON-Idempotent. (Executing POST twice creates two separate records).

## 2. Idempotency Keys
To safely retry POST requests (like credit card charges), APIs require an **Idempotency Key**.
The client generates a unique UUID (e.g., TICK1Key: 9b1deb4dTICK1) and includes it in the header. The Stripe API receives the POST, charges the $100, and mathematically saves the UUID in a database.
If the client retries the exact same POST request due to a timeout, Stripe sees the UUID, mathematically recognizes that it already processed this exact transaction, skips the charge, and simply returns the cached "Success" response. The user is safe from double-billing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/JSON-RPC/index.mdx': `---
title: JSON-RPC
description: A stateless, light-weight Remote Procedure Call (RPC) protocol encoded in JSON, allowing clients to mathematically trigger specific methods and functions on a remote server, ignoring RESTful resource paradigms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="JSON-RPC"
  subtitle="Action-Oriented JSON APIs"
  tags={['API', 'RPC', 'Architecture', 'Web']}
>

REST is mathematically obsessed with *Nouns* (Resources like TICK1/usersTICK1). If you want to perform a complex action that doesn't easily map to a Noun (e.g., "Calculate the orbit of a satellite"), REST forces you into awkward architectural gymnastics.

## 1. The RPC Paradigm
JSON-RPC ignores Nouns and embraces *Verbs*. It is a Remote Procedure Call.
The client mathematically treats the remote server exactly as if it were a local software library, simply calling methods by their name.
The client sends a single HTTP POST request to a single endpoint (TICK1/rpcTICK1) with a highly standardized JSON payload:
TICK3json
{
  "jsonrpc": "2.0",
  "method": "calculateOrbit",
  "params": [45, 90, 12.5],
  "id": 1
}
TICK3

## 2. Simplicity and Batching
The server executes the mathematical function and returns the result matching the TICK1idTICK1.
Because JSON-RPC is so structurally simple, it supports massive Batching. A client can mathematically pack 50 different method calls into a single JSON array, send one HTTP request, and the server will execute all 50 functions and return an array of 50 results, drastically reducing network latency.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/OpenAPI/index.mdx': `---
title: OpenAPI (Swagger)
description: A universally adopted, language-agnostic specification that mathematically describes the structure, endpoints, parameters, and authentication methods of RESTful web services, enabling automated documentation and code generation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="OpenAPI (Swagger)"
  subtitle="The Mathematical Blueprint of REST"
  tags={['API', 'REST', 'Documentation', 'Architecture']}
>

In the past, APIs were documented in MS Word or Confluence. When the developer changed the API code but forgot to update the Word document, the documentation became mathematically false, and client apps crashed.

## 1. The Machine-Readable Spec
OpenAPI (formerly Swagger) solves this by mathematically defining the entire API as a YAML or JSON file.
The file dictates every exact detail:
- The exact URL path (TICK1/users/{id}TICK1).
- The exact HTTP method (TICK1GETTICK1).
- The exact JSON Schema of the response (e.g., TICK1idTICK1 is an Integer, TICK1nameTICK1 is a String).

## 2. Automated Tooling
Because the API is now mathematically defined in a standard format, the industry built massive automation tools around it.
- **Swagger UI**: Automatically reads the YAML file and generates a beautiful, interactive webpage where developers can test the API.
- **Code Generators**: Tools like TICK1openapi-generatorTICK1 can read the YAML file and automatically generate the physical Java Spring Boot server code, and simultaneously generate the physical TypeScript client SDK, mathematically guaranteeing that the Client, the Server, and the Documentation are perfectly synchronized at all times.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Pagination/index.mdx': `---
title: Pagination
description: The mathematical and architectural strategy of dividing a massive dataset into smaller, discrete chunks (pages) for API transmission, preventing server memory exhaustion and optimizing client rendering speed.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="API Pagination"
  subtitle="Transmitting Data in Chunks"
  tags={['API', 'REST', 'Architecture', 'Databases']}
>

If an e-commerce API has 10 million products, and the client executes TICK1GET /productsTICK1, returning 10 million JSON records in a single HTTP response will mathematically crash the database, the network, and the client's mobile device.

## 1. Offset Pagination
The most common mathematical approach is **Offset Pagination** using URL parameters: TICK1GET /products?limit=50&offset=100TICK1.
The database executes TICK1SELECT * FROM products LIMIT 50 OFFSET 100TICK1.
**The Flaw**: As the offset gets huge (e.g., TICK1OFFSET 500000TICK1), SQL databases must mathematically scan and discard the first 500,000 rows to find the next 50, resulting in catastrophic O(N) performance degradation.

## 2. Keyset (Cursor) Pagination
High-scale APIs (like Twitter or Stripe) use **Cursor Pagination**.
Instead of using an offset, the client sends a mathematically unique pointer (a Cursor) to the last item they saw: TICK1GET /products?limit=50&after=id_9876TICK1.
The database executes TICK1SELECT * FROM products WHERE id > 9876 LIMIT 50TICK1.
Because the TICK1idTICK1 is indexed, the database mathematically jumps instantly to the correct row in O(1) or O(log N) time, regardless of whether the user is on page 1 or page 10,000.

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
