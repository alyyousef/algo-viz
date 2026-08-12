import fs from 'fs/promises'
import path from 'path'

const contentMap = {
  'src/features/kb/routes/KB/14. Web Fundamentals/HTTP/index.mdx': `---
title: HTTP (Hypertext Transfer Protocol)
description: The foundational protocol of the World Wide Web used to transmit hypermedia documents across the internet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTP (Hypertext Transfer Protocol)">

**HTTP** is the backbone of the World Wide Web. Designed by Tim Berners-Lee in 1989, it is an application-layer protocol built on top of TCP/IP that dictates how web browsers and web servers communicate.

At its core, HTTP is a **Client-Server, Request-Response** protocol. A client (your browser) sends an HTTP Request to a server, and the server returns an HTTP Response. 

<Callout icon="info" title="Stateless by Design">
  HTTP is inherently **stateless**. Every single request is executed independently, without any knowledge of the requests that came before it. This makes scaling servers incredibly easy, but it means developers must use features like **Cookies** or **Sessions** to keep a user logged in across multiple page loads.
</Callout>

## The Anatomy of an HTTP Request

When you visit a website, your browser sends a text-based request looking something like this:

\`\`\`http
GET /articles/http-guide HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
\`\`\`

1. **Method**: The verb indicating the desired action (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`).
2. **Path**: The specific resource being requested (\`/articles/http-guide\`).
3. **Version**: The protocol version (e.g., HTTP/1.1, HTTP/2).
4. **Headers**: Key-value pairs providing metadata about the request (like the browser type or authentication tokens).
5. **Body**: (Optional) The actual data being sent to the server (used heavily in \`POST\` requests to submit forms or JSON).

## The Anatomy of an HTTP Response

The server replies with a text-based response:

\`\`\`http
HTTP/1.1 200 OK
Date: Mon, 23 May 2024 22:38:34 GMT
Content-Type: text/html
Content-Length: 138

<html><body><h1>Hello World!</h1></body></html>
\`\`\`

1. **Status Code**: A 3-digit number indicating success or failure.
   - **2xx**: Success (e.g., \`200 OK\`)
   - **3xx**: Redirection (e.g., \`301 Moved Permanently\`)
   - **4xx**: Client Error (e.g., \`404 Not Found\`, \`403 Forbidden\`)
   - **5xx**: Server Error (e.g., \`500 Internal Server Error\`)
2. **Headers**: Metadata about the response (e.g., \`Content-Type\` tells the browser how to render the body).
3. **Body**: The actual requested data (HTML, JSON, Images, etc.).

## The Evolution of HTTP

- **HTTP/1.1 (1997)**: The standard for two decades. It introduced persistent connections (keep-alive) to prevent opening a new TCP connection for every single image on a page. However, it suffered from "Head-of-Line Blocking," where one slow request would block all subsequent requests on the same connection.
- **HTTP/2 (2015)**: A massive overhaul. It introduced **Multiplexing**, allowing multiple requests and responses to fly back and forth simultaneously over a single TCP connection. It also compressed headers to save bandwidth.
- **HTTP/3 (2022)**: Ditched the TCP protocol entirely in favor of **QUIC (built on UDP)**. This dramatically speeds up connection times, especially on mobile networks where users constantly switch between Wi-Fi and Cellular towers.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/HTTPS/index.mdx': `---
title: HTTPS & TLS
description: The secure, encrypted version of HTTP, utilizing TLS/SSL to protect data in transit.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HTTPS (HTTP Secure)">

**HTTPS** is simply the HTTP protocol wrapped inside a secure, encrypted tunnel called **TLS** (Transport Layer Security) — formerly known as SSL. 

Without HTTPS, any HTTP request sent across the internet is sent in **plaintext**. This means anyone sitting between you and the server (like your ISP, the coffee shop Wi-Fi admin, or a malicious hacker) can read your passwords, credit card numbers, and session cookies.

<Callout icon="success" title="The Default Standard">
  Today, HTTPS is strictly mandatory for the web. Modern browsers like Chrome will explicitly mark any non-HTTPS website as **"Not Secure"** and often block users from entering passwords on them. Even simple blogs with no login fields must use HTTPS to prevent ISPs from injecting ads into the plaintext HTML.
</Callout>

## How HTTPS Works: The TLS Handshake

Before any HTTP data is sent, the client and server must establish a secure connection using cryptography. This is called the TLS Handshake.

1. **Client Hello**: The browser says "Hello, I want to connect securely. Here are the encryption algorithms I support."
2. **Server Hello & Certificate**: The server replies, picks an algorithm, and sends its **Digital Certificate**. This certificate contains the server's **Public Key** and is digitally signed by a trusted Certificate Authority (CA), proving the server is who it claims to be (e.g., "I am actually google.com").
3. **Key Exchange (Asymmetric Encryption)**: The browser uses the server's Public Key to encrypt a secret "Session Key" and sends it to the server. Only the server has the Private Key required to decrypt it.
4. **Secure Communication (Symmetric Encryption)**: Now that both sides share the secret Session Key, they use incredibly fast Symmetric Encryption (like AES) to encrypt all subsequent HTTP requests and responses.

## Why use two types of encryption?

You might wonder why we don't just use the Public/Private key pair (Asymmetric Encryption) for the whole session. 
**Performance.** Asymmetric encryption requires heavy, slow mathematics. It is only used for the first millisecond to securely agree on a shared password (the Session Key). Once the password is agreed upon, they switch to Symmetric Encryption, which is blazing fast and can handle streaming 4K video with zero lag.

## Let's Encrypt

Historically, getting an SSL/TLS Certificate cost hundreds of dollars a year. In 2015, the **Let's Encrypt** initiative was launched, providing completely free, automated certificates to anyone in the world. This single-handedly pushed the web from ~40% HTTPS adoption to over 95% today.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/DNS/index.mdx': `---
title: DNS (Domain Name System)
description: The phonebook of the internet, translating human-readable domain names into machine-readable IP addresses.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNS (Domain Name System)">

Computers on the internet communicate using **IP Addresses** (like \`142.250.190.46\`). Humans, however, are terrible at remembering random strings of numbers. We prefer readable names like \`google.com\`.

The **Domain Name System (DNS)** is the massive, globally distributed database that translates human-readable domain names into IP addresses. It is literally the phonebook of the internet.

<Callout icon="warning" title="Always Blame DNS">
  In DevOps and networking, there is a famous joke: *"It's not DNS. There's no way it's DNS. It was DNS."*
  Because DNS relies on heavy caching at multiple layers (Browser, OS, Router, ISP), when a DNS record is updated, it can take anywhere from 5 minutes to 48 hours to propagate globally. This leads to incredibly confusing bugs where a website works for one developer but is completely broken for another.
</Callout>

## The DNS Resolution Journey

When you type \`www.example.com\` into your browser and press Enter, a complex race occurs in milliseconds:

1. **Browser Cache**: The browser checks its own internal cache. If it knows the IP, it stops here.
2. **OS Cache**: If the browser doesn't know, it asks the Operating System. The OS checks its cache (and the \`/etc/hosts\` file).
3. **Recursive Resolver (ISP)**: If the OS doesn't know, it sends a query to your ISP's DNS Server (or a public one like Google's \`8.8.8.8\` or Cloudflare's \`1.1.1.1\`). This server will now do the heavy lifting on your behalf.
4. **Root Name Server**: The Resolver asks a Global Root Server, "Where can I find \`.com\`?"
5. **TLD Name Server**: The Root points to the Top-Level Domain (TLD) server for \`.com\`. The Resolver asks the TLD, "Where can I find \`example.com\`?"
6. **Authoritative Name Server**: The TLD points to the specific server that holds the records for \`example.com\` (often hosted by AWS Route53 or Cloudflare). This server replies with the final IP address: \`93.184.216.34\`.
7. **Cache & Return**: The Recursive Resolver caches this IP for future use and returns it to your browser. Your browser finally makes the HTTP request to the IP.

## Common DNS Record Types

When you buy a domain, you configure these records in your DNS dashboard:

- **A Record**: Maps a domain directly to an IPv4 address (e.g., \`example.com -> 1.1.1.1\`).
- **AAAA Record**: Maps a domain to an IPv6 address.
- **CNAME Record**: Maps a domain to *another domain* (an alias). Often used to map \`www.example.com\` to \`example.com\`, or point a domain to an AWS Load Balancer URL.
- **MX Record**: Mail Exchange. Tells email servers where to route emails sent to \`@example.com\`.
- **TXT Record**: Text records used for verifying domain ownership (e.g., proving to Google Workspace that you own the domain) and email security (SPF, DKIM).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/CORS/index.mdx': `---
title: CORS (Cross-Origin Resource Sharing)
description: A browser security mechanism that restricts web pages from making requests to a different domain than the one that served the web page.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CORS (Cross-Origin Resource Sharing)">

If you have ever tried to fetch data from an API in a frontend React app and seen a massive red error in your browser console saying **"Blocked by CORS policy,"** you have encountered one of the most misunderstood security features of the web.

CORS is an extension of the **Same-Origin Policy (SOP)**. 

### The Same-Origin Policy

By default, web browsers strictly forbid JavaScript running on one website (e.g., \`evil.com\`) from making an HTTP request to a different website (e.g., \`bank.com/api/transfer\`). 
If this policy didn't exist, you could visit a malicious website, and the malicious JavaScript could secretly ping your bank's API to transfer money using your saved session cookies. 

An "Origin" is defined by the combination of the **Protocol + Domain + Port**. 
(e.g., \`https://api.example.com:443\`).

### Enter CORS

While SOP is great for security, the modern web requires cross-origin requests. Your frontend React app hosted at \`https://my-app.vercel.app\` *needs* to talk to your backend Node API hosted at \`https://api.my-backend.com\`.

**CORS** is the protocol that allows the server to tell the browser: *"It's okay, I trust this specific origin, let them read my data."*

<Callout icon="warning" title="CORS is Enforced by the Browser, Not the Server">
  A common misconception is that CORS protects the server. **It does not.** A hacker using \`curl\` or Postman can hit your API all day long—CORS will not stop them because Postman is not a web browser. CORS strictly protects the *User* in the browser from malicious websites executing scripts on their behalf.
</Callout>

## How CORS Works (The Preflight Request)

When your frontend tries to make a complex request (like a \`POST\` request with a JSON body) to a different origin, the browser intercepts it and performs a **Preflight Request**.

1. **The Preflight (OPTIONS)**: The browser pauses the actual \`POST\` request and sends an \`OPTIONS\` request to the API asking, "Hey, I'm at \`my-app.com\` and I want to send a POST request with JSON. Is that allowed?"
2. **The Server's Blessing**: The backend server receives the \`OPTIONS\` request. If it is configured correctly, it responds with specific HTTP Headers:
   - \`Access-Control-Allow-Origin: https://my-app.com\`
   - \`Access-Control-Allow-Methods: POST, GET, OPTIONS\`
   - \`Access-Control-Allow-Headers: Content-Type, Authorization\`
3. **The Actual Request**: The browser reads these headers. Seeing that \`my-app.com\` is allowed to \`POST\`, it finally sends the actual HTTP request.

If the server forgets to send the \`Access-Control-Allow-Origin\` header, or sends the wrong domain, the browser immediately blocks the request and throws the infamous CORS error in the console.

## Fixing CORS

To fix CORS errors, you do not change frontend code. You must configure the **Backend API** to explicitly include the frontend's domain in the allowed CORS list. In Express/Node, this is usually a one-liner middleware: \`app.use(cors({ origin: 'https://my-app.com' }))\`.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/WebSockets/index.mdx': `---
title: WebSockets (Browser API)
description: A protocol providing full-duplex, real-time communication channels over a single, long-lived TCP connection.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebSockets (Browser API)">

Historically, the web was built strictly on the HTTP Request-Response model: The client must ask the server for data, and the server replies. The server *cannot* initiate contact with the client.

If you were building a real-time Chat App or a Live Stock Ticker using traditional HTTP, the only way to get new messages was to use **Long Polling**—having the Javascript aggressively ping the server every 1 second asking, "Do you have new data? Do you have new data?". This is incredibly inefficient and wastes massive amounts of server resources.

**WebSockets** fundamentally solve this by providing a persistent, bidirectional (full-duplex) connection between the browser and the server.

<Callout icon="success" title="Real-Time Magic">
  With WebSockets, the connection stays open indefinitely. When a new chat message arrives in the database, the server can instantly push that data directly down to the specific browser without the browser ever asking for it.
</Callout>

## How the Connection Starts

WebSockets actually begin their life as a standard HTTP request!
The browser sends an HTTP \`GET\` request with a special header: \`Upgrade: websocket\`.
If the server supports WebSockets, it replies with an HTTP \`101 Switching Protocols\` status code. 

At that exact moment, the HTTP protocol is abandoned, and the TCP connection is left wide open to stream raw WebSocket frames back and forth. Because there are no bulky HTTP headers attached to every message, WebSockets have extremely low latency and bandwidth overhead.

## The Browser Implementation

The browser provides a native \`WebSocket\` object. It is event-driven:

\`\`\`javascript
// 1. Establish the connection (using ws:// or wss:// instead of http://)
const socket = new WebSocket('wss://api.chat-app.com/socket');

// 2. Listen for the connection opening
socket.addEventListener('open', () => {
  console.log('Connected to server!');
  // Send data TO the server
  socket.send(JSON.stringify({ type: 'join', room: 'general' }));
});

// 3. Listen for data pushed FROM the server
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('New message received:', data.text);
});

// 4. Handle disconnects
socket.addEventListener('close', () => {
  console.log('Server disconnected.');
});
\`\`\`

## When NOT to use WebSockets

While WebSockets are amazing for real-time apps, multiplayer games, and live collaboration (like Google Docs), they are overkill for standard websites. Maintaining thousands of open TCP connections requires significantly more server memory and complex load balancing compared to standard stateless HTTP requests.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/14. Web Fundamentals/Server-Sent Events/index.mdx': `---
title: Server-Sent Events (SSE)
description: A lightweight protocol for establishing a one-way, real-time data stream from the server to the browser over standard HTTP.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Server-Sent Events (SSE)">

When developers need real-time data updates, they immediately jump to WebSockets. However, WebSockets introduce massive complexity to your backend infrastructure (requiring stateful load balancers and complex scaling architectures).

If your application only requires the server to push data **TO** the client, and the client rarely sends data back (e.g., Live Sports Scores, News Feeds, or ChatGPT typing out a response stream), you should use **Server-Sent Events (SSE)**.

<Callout icon="info" title="The One-Way Street">
  SSE is strictly a **unidirectional** flow. The server pushes data to the browser over a single HTTP connection. It is significantly simpler to implement than WebSockets because it runs entirely over standard HTTP/1.1 or HTTP/2. It requires zero custom protocols or heavy backend rewrites.
</Callout>

## How SSE Works

1. The browser makes a standard HTTP \`GET\` request.
2. The server responds with the header \`Content-Type: text/event-stream\`.
3. The server intentionally keeps the HTTP response "open," never closing the connection.
4. Whenever the server has a new update, it simply writes a small block of text to the open response stream, formatted like this:
   \`data: {"score": "2-1", "minute": 88}\\n\\n\`
5. The browser natively parses this stream and fires JavaScript events.

## The Browser Implementation (EventSource)

Browsers natively support SSE via the \`EventSource\` interface. It is incredibly simple and, unlike raw WebSockets, **it automatically handles reconnecting** if the network drops!

\`\`\`javascript
// 1. Open the connection
const eventSource = new EventSource('https://api.sports.com/live-scores');

// 2. Listen for messages pushed from the server
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Goal! New Score:", data.score);
};

// 3. Listen for specific custom event types
eventSource.addEventListener('match_ended', (event) => {
  console.log("The match is over.");
  eventSource.close(); // Close the connection explicitly
});
\`\`\`

## SSE vs WebSockets

| Feature | Server-Sent Events (SSE) | WebSockets |
| :--- | :--- | :--- |
| **Direction** | Unidirectional (Server -> Client) | Bidirectional (Full Duplex) |
| **Protocol** | Standard HTTP | Custom Protocol (over TCP) |
| **Data Format** | UTF-8 Text Only | Text and Binary Data |
| **Auto-Reconnect** | Built-in native support | Must write custom JS logic to handle |
| **Best For** | ChatGPT streams, live feeds, notifications | Multiplayer games, Chat apps, Video conferencing |

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/APIs/index.mdx': `---
title: APIs (Application Programming Interfaces)
description: The foundational concept of how different software systems communicate and exchange data with one another.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="APIs (Application Programming Interfaces)">

An **API (Application Programming Interface)** is a set of rules and protocols that allows one software application to talk to another. It abstracts away the complex internal logic of a system, providing a clean, predictable "interface" for other developers to use.

<Callout icon="info" title="The Waiter Analogy">
  Think of an API as a waiter in a restaurant. You (the client) sit at the table with a menu (the API Documentation). You cannot go into the kitchen (the database/backend) to cook the food yourself. Instead, you give your order (the Request) to the waiter (the API). The waiter takes it to the kitchen, the chef cooks it, and the waiter brings you the food (the Response). 
</Callout>

## Types of APIs

While "API" is most commonly used today to describe web services, the concept is much broader:

1. **Hardware/OS APIs**: When you write a Python script to save a file, Python calls the Operating System's file-system API.
2. **Library APIs**: When you use a library like React or Lodash, the functions they expose for you to use are their API.
3. **Web APIs**: Interfaces accessible over the internet using HTTP. This is how a mobile app fetches your bank balance from the bank's servers.

## Anatomy of a Web API

A modern Web API (often returning JSON) is defined by a few core concepts:

- **Endpoints**: The specific URLs where the API can be accessed (e.g., \`https://api.github.com/users\`).
- **Methods**: The HTTP verbs indicating the action (GET to read, POST to create, DELETE to remove).
- **Headers**: Metadata sent with the request (e.g., an Authorization token to prove who you are).
- **Payload/Body**: The actual data sent to the API (e.g., a JSON object containing a new user's username and password).
- **Response**: The data returned by the server, along with a Status Code (e.g., \`200 OK\` or \`404 Not Found\`).

## The Importance of the Contract

An API represents a strict **Contract** between the provider and the consumer. If Stripe provides an API for charging credit cards, thousands of businesses write code relying on that exact URL structure and JSON format. 
If Stripe decides to suddenly change the name of the \`amount_usd\` field to \`total_dollars\`, thousands of businesses will instantly break. Because of this, API design and **Versioning** (e.g., \`/api/v1/...\` vs \`/api/v2/...\`) are critical software engineering disciplines.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/REST/index.mdx': `---
title: REST (Representational State Transfer)
description: The dominant architectural style for designing networked web APIs, relying on stateless operations and standard HTTP methods.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="REST (Representational State Transfer)">

Defined by Roy Fielding in 2000, **REST** is an architectural style—not a strict protocol—for designing Web APIs. Over the last two decades, it entirely displaced clunky, XML-heavy protocols like SOAP to become the undisputed standard for building web services.

An API that adheres to REST principles is called a **RESTful API**.

<Callout icon="success" title="Resource-Oriented Design">
  The core philosophy of REST is that everything is a **Resource** (e.g., a User, an Article, a Product). Resources are identified by standard URLs, and you perform actions on those resources using standard HTTP verbs. You do not design endpoints based on *actions* (like \`/create-user\`); you design them based on *nouns* (like \`/users\`).
</Callout>

## The Six Constraints of REST

To be truly RESTful, an architecture must adhere to six constraints (though many APIs bend the rules):
1. **Client-Server Architecture**: The frontend UI and backend data storage are completely decoupled.
2. **Statelessness**: The server stores absolutely no session state about the client. Every single request must contain all the information necessary to authenticate and process it (e.g., a JWT token).
3. **Cacheability**: Responses must declare whether the client is allowed to cache the data to improve performance.
4. **Layered System**: The client doesn't need to know if it's talking directly to the database server or a proxy/load-balancer in the middle.
5. **Uniform Interface**: The API must follow consistent naming conventions and standard HTTP methods.
6. **Code on Demand (Optional)**: Servers can temporarily extend the client by sending executable code (like Javascript).

## Standard CRUD Operations in REST

A perfect RESTful API maps the standard database CRUD (Create, Read, Update, Delete) operations directly to HTTP methods on a specific resource URL:

| Operation | HTTP Method | URL Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **C**reate | \`POST\` | \`/api/users\` | Creates a brand new user. |
| **R**ead | \`GET\` | \`/api/users\` | Fetches a list of all users. |
| **R**ead | \`GET\` | \`/api/users/123\` | Fetches the specific user with ID 123. |
| **U**pdate | \`PUT\` | \`/api/users/123\` | Replaces the entire user 123 with new data. |
| **U**pdate | \`PATCH\` | \`/api/users/123\` | Partially updates user 123 (e.g., only changing their email). |
| **D**elete | \`DELETE\`| \`/api/users/123\` | Deletes user 123. |

## The JSON Standard

While REST technically allows returning data in any format (XML, CSV, HTML), modern REST APIs almost exclusively exchange data using **JSON** (JavaScript Object Notation) due to its lightweight nature and native compatibility with frontend web frameworks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/GraphQL/index.mdx': `---
title: GraphQL
description: A query language for APIs developed by Facebook that allows clients to request exactly the data they need, nothing more and nothing less.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GraphQL">

Created by Facebook in 2012 to solve massive data-fetching issues in their mobile apps, **GraphQL** is a powerful alternative to the traditional REST API architecture.

In a REST API, the *Server* dictates what data is returned. If you hit \`/api/users/123\`, the server might return 50 fields of data, even if the frontend only needed the user's name. Furthermore, if you also need that user's recent posts, you must make a second HTTP request to \`/api/users/123/posts\`. 
This leads to two massive problems: **Over-fetching** (downloading too much unused data) and **Under-fetching** (requiring multiple waterfall network requests).

<Callout icon="success" title="The Client is in Control">
  GraphQL solves this by flipping the power dynamic. The Server simply exposes a "Graph" of all possible data. The *Client* sends a specific query asking for exactly what it wants. In a single HTTP request, the client can ask for the User's name, their last 3 posts, and the authors of those posts. The server returns a JSON object perfectly matching that exact shape.
</Callout>

## How it Works

Unlike REST, which has dozens of endpoints (\`/users\`, \`/posts\`), a GraphQL API typically has only **one single endpoint** (e.g., \`/graphql\`). The client always sends a \`POST\` request to this endpoint containing a Query string.

### The Query (Sent by Client)
\`\`\`graphql
query {
  user(id: "123") {
    name
    email
    recentPosts(limit: 2) {
      title
    }
  }
}
\`\`\`

### The Response (Returned by Server)
\`\`\`json
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com",
      "recentPosts": [
        { "title": "Understanding GraphQL" },
        { "title": "Why REST is legacy" }
      ]
    }
  }
}
\`\`\`

## The Schema (Strong Typing)

The backbone of GraphQL is the **Schema**. Written in the Schema Definition Language (SDL), it acts as a strict, strongly-typed contract between the frontend and backend. 

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String
  recentPosts: [Post!]!
}
\`\`\`

Because the schema is strictly typed, tooling around GraphQL is incredible. Frontend IDEs provide perfect autocomplete for API queries, and tools like Apollo Client can automatically generate React Hooks and TypeScript interfaces based on the schema.

## Downsides

While GraphQL provides unmatched developer experience for frontend engineers, it shifts a massive burden onto backend engineers. Because the client can ask for incredibly complex, nested data in a single request, it is very easy for a client to accidentally trigger a query that grinds the database to a halt (e.g., fetching a user, their friends, their friends' friends, etc.). Backend teams must carefully implement rate limiting and query-depth analysis.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/gRPC/index.mdx': `---
title: gRPC (gRPC Remote Procedure Calls)
description: A high-performance, open-source universal RPC framework created by Google, heavily utilized for microservice-to-microservice communication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="gRPC (gRPC Remote Procedure Calls)">

While REST and GraphQL are phenomenal for communicating between a frontend web browser and a backend server, they are often too slow and bulky for communicating *between* backend servers (Microservices). 

If Service A needs to ask Service B for data a million times a second, parsing human-readable JSON over HTTP/1.1 creates massive CPU overhead and latency.

**gRPC**, developed by Google, is a modern evolution of the classic Remote Procedure Call (RPC) architecture. It allows a program on one machine to call a function on another machine as if it were a local function call, completely hiding the complex network logic.

<Callout icon="warning" title="Raw Performance">
  gRPC is built for blistering speed. It abandons JSON entirely in favor of **Protocol Buffers (Protobufs)**—a strictly typed, heavily compressed binary format. It also abandons HTTP/1.1, running exclusively on **HTTP/2**, allowing multiplexed streaming of millions of messages over a single connection.
</Callout>

## Protocol Buffers (Protobuf)

In gRPC, you define your API contract using a \`.proto\` file. You define the exact shape of the data and the functions available.

\`\`\`protobuf
syntax = "proto3";

// The Data Shape
message UserRequest {
  int32 user_id = 1;
}

message UserResponse {
  string name = 1;
  string email = 2;
}

// The API Service
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}
\`\`\`

You then run the Protobuf Compiler (\`protoc\`). It reads this file and automatically generates the highly-optimized networking code for your server and client. 
The magic of gRPC is its **polyglot nature**. You can generate a server written in Go, and instantly generate a client in Python, Java, or Rust that knows exactly how to talk to the Go server with strict type safety.

## JSON vs Protobuf (Binary Serialization)

When you send \`{"age": 25}\` in JSON, it is sent as a string of text characters. The receiving server must read the string, parse the curly braces, read the key "age", and parse the string "25" into an integer. 

In Protobuf, the exact structure is already known by both servers via the compiled \`.proto\` file. The payload sent across the wire is literally just the binary bits representing the number \`25\`. There are no strings, no keys, and no parsing overhead. It is significantly smaller in bandwidth and requires almost zero CPU to deserialize.

## When to use gRPC

- **Microservices**: It is the undisputed standard for internal backend architectures where services communicate rapidly (e.g., inside Kubernetes clusters).
- **Streaming**: Because it runs on HTTP/2, gRPC supports bidirectional streaming natively, perfect for IoT telemetry or voice/video routing.
- **Not for the Browser**: Because browsers do not expose fine-grained control over HTTP/2 framing, standard gRPC cannot easily be used directly from a web browser (though a bridge called gRPC-Web exists).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/WebSockets/index.mdx': `---
title: WebSockets (Backend Architecture)
description: The server-side implementation and architectural challenges of maintaining persistent, stateful WebSocket connections at scale.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="WebSockets (Backend Architecture)">

While the frontend implementation of WebSockets is as simple as \`new WebSocket(url)\`, the backend architecture required to support WebSockets at scale is notoriously difficult.

Standard REST APIs are **Stateless**. If a server crashes, the load balancer simply routes the next HTTP request to a different server. No data is lost, and the user never notices.

WebSockets, however, are **Stateful**. They maintain a persistent, open TCP connection. If a server has 10,000 active WebSocket connections (e.g., 10,000 users in a live chat room) and that server crashes, all 10,000 connections are violently severed, and all clients must immediately attempt to reconnect, causing a massive "thundering herd" traffic spike.

<Callout icon="info" title="The Scaling Problem">
  If User A is connected to **Server 1**, and User B is connected to **Server 2**, how does User A send a chat message to User B? Server 1 cannot talk directly to User B's browser. Server 1 must have a way to broadcast the message to Server 2, so Server 2 can push it down its open socket to User B.
</Callout>

## The Pub/Sub Solution (Redis)

To scale WebSockets horizontally across multiple servers, backend engineers introduce a **Pub/Sub (Publish/Subscribe) Message Broker**, almost always **Redis**.

Here is the standard architecture for scaling a real-time app:

1. **Connection**: Users connect via a Load Balancer to whatever WebSocket server has free capacity.
2. **Subscription**: When a server boots up, it subscribes to the Redis \`chat_events\` channel.
3. **Publishing**: User A (on Server 1) sends a message. Server 1 doesn't try to find User B. Instead, Server 1 publishes the message to the central Redis instance.
4. **Broadcasting**: Redis instantly blasts that message to *all* subscribed WebSocket servers (Server 1, Server 2, Server 3).
5. **Delivery**: Every server receives the message from Redis, checks its local memory to see if the recipient (User B) is currently connected to it, and if so, pushes the message down the socket.

## Popular Frameworks

Managing low-level TCP frames, reconnect logic, and ping/pong heartbeats (to keep connections alive through strict corporate firewalls) is tedious. Developers rely on battle-tested frameworks:

- **Socket.io (Node.js)**: The industry standard. It provides automatic fallback to HTTP Long-Polling if a corporate proxy aggressively blocks WebSocket traffic, ensuring the app always works.
- **SignalR (.NET)**: Microsoft's incredibly robust real-time framework for the C# ecosystem.
- **ActionCable (Ruby on Rails)**: Integrated real-time features for the Rails framework.
- **Managed Services**: Because scaling sockets is so difficult, many companies outsource the infrastructure entirely to services like **Pusher**, **Ably**, or **AWS API Gateway WebSockets**.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/Authentication/index.mdx': `---
title: Authentication & Authorization
description: The foundational security concepts differentiating "Who you are" from "What you are allowed to do."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Authentication vs. Authorization">

In backend development and security, Authentication and Authorization are the two most critical concepts to master. They are often abbreviated as **AuthN** (Authentication) and **AuthZ** (Authorization). While frequently used interchangeably by beginners, they mean entirely different things.

<Callout icon="warning" title="The Passport Analogy">
  **Authentication (AuthN)** is showing your passport at border control. It verifies your identity. ("I am John Doe").
  **Authorization (AuthZ)** is your visa status. Even though border control knows exactly who you are, your visa dictates what you are allowed to do. ("John Doe is allowed to visit, but is forbidden from legally working").
</Callout>

## Authentication (AuthN): "Who are you?"

Authentication is the process of verifying that a user or machine is who they claim to be. The system challenges the entity to provide proof of identity.

This proof traditionally falls into three factors:
1. **Something you know**: A password, a PIN, or the answer to a security question.
2. **Something you have**: A physical security key (YubiKey), a mobile phone receiving an SMS code, or a Time-Based One-Time Password (TOTP) from an authenticator app.
3. **Something you are**: Biometrics, such as a fingerprint, FaceID, or retinal scan.

**Multi-Factor Authentication (MFA)** requires the user to provide at least two different types of these factors, drastically reducing the risk of compromised passwords.

### Common AuthN Protocols
- Username / Password (with secure hashing like bcrypt or Argon2)
- OpenID Connect (OIDC) (e.g., "Sign in with Google")
- SAML (Used heavily in corporate enterprise Single Sign-On)

## Authorization (AuthZ): "What can you do?"

Once the system knows exactly who you are, Authorization dictates what resources you can read, modify, or delete. 

If Alice and Bob are both correctly authenticated users of a SaaS platform, Authorization ensures that Alice cannot secretly view Bob's billing data.

### Common AuthZ Strategies

1. **Role-Based Access Control (RBAC)**: The most common strategy. Users are assigned Roles (e.g., \`Admin\`, \`Editor\`, \`Viewer\`). Permissions are granted to the Role, not the individual user. (e.g., Only the \`Admin\` role can hit the \`DELETE /database\` endpoint).
2. **Attribute-Based Access Control (ABAC)**: More granular. Access is granted based on dynamic attributes. (e.g., A user can edit a document *only if* the document's \`department_id\` matches the user's \`department_id\`, and it is between 9 AM and 5 PM).
3. **OAuth 2.0**: A protocol specifically designed to grant a third-party application limited authorization to access your data without giving them your password.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/OAuth 2.0/index.mdx': `---
title: OAuth 2.0
description: The industry-standard protocol for authorization, allowing secure delegated access to APIs without sharing passwords.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OAuth 2.0">

**OAuth 2.0** is an **Authorization** protocol (not an Authentication protocol, though it is often confusingly used for both). It solves a very specific, dangerous problem on the web: **Delegated Access**.

Imagine you sign up for a new startup called "ResumeBuilder," and they say, "We can automatically build your resume by reading your LinkedIn profile. Please enter your LinkedIn Username and Password here."
This is a catastrophic security risk. You would be giving a random startup absolute control over your LinkedIn account.

<Callout icon="success" title="The OAuth Solution">
  OAuth 2.0 solves this. Instead of giving ResumeBuilder your password, ResumeBuilder redirects you to LinkedIn's official website. You log in to LinkedIn securely, and LinkedIn asks: *"ResumeBuilder wants to read your profile. Do you allow this?"* You click Yes. LinkedIn then redirects you back to ResumeBuilder, handing them a temporary **Access Token** that *only* has permission to read your profile, and nothing else.
</Callout>

## The Four Actors in OAuth

To understand the complex OAuth flows, you must understand the terminology:
1. **Resource Owner**: You, the human user. You own the data.
2. **Client**: The application trying to access the data (e.g., ResumeBuilder).
3. **Authorization Server**: The server that authenticates you and issues the tokens (e.g., LinkedIn's login server).
4. **Resource Server**: The API that holds the actual data, which accepts the token (e.g., LinkedIn's API).

## The Authorization Code Flow

The most common and secure OAuth flow used by web applications involves a "backend channel" exchange to keep tokens completely hidden from the browser.

1. **The Redirect**: The Client redirects the user's browser to the Authorization Server, passing a \`client_id\` and requesting specific \`scopes\` (e.g., \`read:profile\`).
2. **The Consent**: The user authenticates and clicks "Allow."
3. **The Code**: The Authorization Server redirects the user back to the Client's URL, appending a temporary, single-use string called an **Authorization Code** to the URL (e.g., \`?code=abc123\`).
4. **The Secret Exchange**: The Client's backend server secretly contacts the Authorization Server, providing the Authorization Code along with a highly classified \`client_secret\`. 
5. **The Token**: Because the \`client_secret\` proves the backend is legitimate, the Authorization Server responds with the final **Access Token**.
6. **API Access**: The Client uses the Access Token in the HTTP Headers (\`Authorization: Bearer <token>\`) to request data from the Resource Server.

## OpenID Connect (OIDC)

Because OAuth 2.0 is strictly for *Authorization*, it provides an Access Token, but it doesn't actually tell the Client *who* the user is. 
To fix this, the industry built **OpenID Connect (OIDC)** on top of OAuth 2.0. OIDC adds a new token called the **ID Token** (usually a JWT), which contains the user's profile information (name, email, profile picture), turning OAuth into a robust Authentication system (the magic behind "Sign in with Google").

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/18. Backend Development/18.1 Concepts/JWT/index.mdx': `---
title: JWT (JSON Web Tokens)
description: A compact, URL-safe means of representing claims to be transferred between two parties, widely used for stateless API authentication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JWT (JSON Web Tokens)">

Pronounced "jot," a **JSON Web Token (JWT)** is an open standard for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed using cryptography.

JWTs have become the dominant mechanism for **Stateless Authentication** in modern REST APIs and Single Page Applications (React, Vue).

<Callout icon="warning" title="Signed, Not Encrypted">
  A critical misconception is that JWTs hide data. **They do not.** By default, anyone who intercepts a JWT can decode it and read the JSON payload (like the user's email or ID). The cryptography in a standard JWT is used for a **Signature**, which guarantees the data has not been *tampered with* by a hacker, but it does not encrypt the data. Never put passwords or sensitive secrets inside a JWT payload.
</Callout>

## The Anatomy of a JWT

If you look at a JWT, it appears to be a long, random string of gibberish separated by two periods: 
\`xxxxx.yyyyy.zzzzz\`

It is actually three distinct Base64-encoded JSON strings glued together:

1. **Header (\`xxxxx\`)**: Contains metadata about the token, specifically the algorithm used to sign it (e.g., HMAC SHA256 or RSA).
2. **Payload (\`yyyyy\`)**: Contains the "Claims" (the actual data). This usually includes the user's ID, their roles, and crucial timestamps like \`iat\` (Issued At) and \`exp\` (Expiration Time).
3. **Signature (\`zzzzz\`)**: The magic part. The server takes the Header, the Payload, and a highly classified **Secret Key** (that only the server knows), and runs them through a hashing algorithm. This generates the Signature.

## How Stateless Authentication Works

Historically, servers used Stateful Sessions. When a user logged in, the server created a record in its memory/database mapping a random Session ID cookie to that user. Every API request required a database lookup to verify the session.

With JWTs, we eliminate the database lookup:

1. The user logs in with an email and password.
2. The server verifies the password, creates a JSON object with the user's ID (\`{ sub: 123 }\`), signs it with its Secret Key to create a JWT, and sends it to the client.
3. The client saves the JWT (usually in an HttpOnly Cookie or LocalStorage).
4. On subsequent requests, the client attaches the JWT to the HTTP Header: \`Authorization: Bearer <token>\`.
5. The server receives the request. It mathematically recalculates the signature using its Secret Key. If the calculated signature perfectly matches the signature attached to the token, the server *mathematically guarantees* the token is authentic and hasn't been modified. It can trust the \`{ sub: 123 }\` payload instantly, without ever querying the database.

## The Invalidation Problem

The biggest flaw with JWTs is that because they are stateless, **they cannot be easily revoked**. If a hacker steals a user's JWT, or an admin bans a user, the JWT remains mathematically valid until its expiration time (\`exp\`). 
To mitigate this, architectures use incredibly short-lived Access Tokens (e.g., expiring in 15 minutes) paired with stateful, revocable **Refresh Tokens**.

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
