import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Rate limiting/index.mdx': `---
title: Rate Limiting
description: "A defensive architectural mechanism that mathematically restricts the number of API requests a single client or IP address can make within a specific time window, protecting the system from DDoS attacks and accidental resource exhaustion."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Rate Limiting"
  subtitle="Protecting the Mathematical Bottleneck"
  tags={['API', 'Security', 'Architecture', 'Networking']}
>

If a malicious user runs a Python script that hits your TICK1POST /loginTICK1 endpoint 10,000 times per second, they will mathematically overwhelm your database's connection pool, causing a Denial of Service (DoS) for all legitimate users.

## 1. The Token Bucket Algorithm
Rate Limiting is mathematically implemented using algorithms like the **Token Bucket**.
Imagine a bucket that holds a maximum of 100 tokens.
- Every time a user makes an API request, 1 token is mathematically subtracted from the bucket.
- A background process automatically drops 1 new token into the bucket every second.
If the script hits the API 200 times instantly, the bucket empties. The API Gateway mathematically rejects the 101st request with an HTTP TICK1429 Too Many RequestsTICK1 status code, forcing the client to wait until the bucket refills.

## 2. Distributed State
In a Microservice architecture, rate limiting cannot rely on local server RAM, because the user might hit Server A on request 1, and Server B on request 2. 
To mathematically enforce a global limit, the API Gateway uses a highly available, ultra-fast, in-memory data store like **Redis**. The user's IP address or API Key acts as the Redis key, and the remaining token count is the value, allowing all gateways to synchronize rate limits globally in under 2 milliseconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/REST/index.mdx': `---
title: REST (Representational State Transfer)
description: "An architectural style introduced by Roy Fielding in 2000 that defines a set of strict mathematical constraints for creating web services, emphasizing stateless communication, standard HTTP methods, and hypermedia."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="REST (Representational State Transfer)"
  subtitle="The Architecture of the Web"
  tags={['API', 'REST', 'Web', 'Architecture']}
>

Before REST, web services used SOAP and XML-RPC, which were mathematically complex, stateful, and ignored the underlying architecture of the internet (HTTP).

## 1. The Resource Paradigm (Nouns)
The fundamental mathematical unit of REST is the **Resource** (a Noun).
Instead of writing an RPC endpoint like TICK1/getUsersTICK1, you define the Resource URL: TICK1/usersTICK1.
To perform actions on that Resource, you use the standard mathematical **HTTP Verbs**:
- **GET TICK1/usersTICK1**: Read a list of users.
- **POST TICK1/usersTICK1**: Create a new user.
- **PUT TICK1/users/1TICK1**: Fully replace user 1.
- **PATCH TICK1/users/1TICK1**: Partially update user 1.
- **DELETE TICK1/users/1TICK1**: Remove user 1.

## 2. The Stateless Constraint
The most important architectural constraint of REST is **Statelessness**.
The server is mathematically forbidden from storing any client state (like a Session ID) between requests. Every single HTTP request from the client must contain 100% of the mathematical information (like a JWT Authorization header) required for the server to understand and authorize the request. This constraint allows REST APIs to mathematically scale to infinity, because a load balancer can route Request 1 to Server A, and Request 2 to Server B, without the servers needing to share session memory.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/RESTful maturity model (Richardson)/index.mdx': `---
title: Richardson Maturity Model
description: "A heuristic mathematical model developed by Leonard Richardson that grades web APIs on a scale from Level 0 to Level 3, measuring how deeply they embrace the architectural constraints of REST."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Richardson Maturity Model"
  subtitle="The 4 Levels of REST"
  tags={['API', 'REST', 'Architecture', 'Web']}
>

Almost every API claims to be "RESTful," but mathematically, 90% of them are simply RPC systems communicating over HTTP. Leonard Richardson created a mathematical grading rubric to classify true REST.

## 1. Levels 0 and 1
- **Level 0 (The Swamp of POX)**: The API uses HTTP strictly as a transport mechanism (like SOAP). It has exactly one URL endpoint (e.g., TICK1/apiTICK1) and uses only TICK1POSTTICK1 to send complex XML/JSON commands.
- **Level 1 (Resources)**: The API introduces Nouns (Resources). Instead of one master endpoint, it has many URLs (TICK1/usersTICK1, TICK1/ordersTICK1). However, it still only uses TICK1POSTTICK1 for everything.

## 2. Levels 2 and 3
- **Level 2 (HTTP Verbs)**: The API mathematically maps CRUD operations to the correct HTTP methods (GET, POST, PUT, DELETE) and utilizes standard HTTP status codes (TICK1200 OKTICK1, TICK1404 Not FoundTICK1, TICK1201 CreatedTICK1). (This is where 99% of modern "REST APIs" stop).
- **Level 3 (Hypermedia / HATEOAS)**: The ultimate mathematical zenith of REST. The API responses contain **Hyperlinks** telling the client exactly what actions they can perform next. The client never hardcodes URLs; they dynamically traverse the state machine provided by the API's hypermedia.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/RPC/index.mdx': `---
title: RPC (Remote Procedure Call)
description: "A distributed computing paradigm where a computer program mathematically causes a subroutine or procedure to execute in a different address space (on a remote server), coded as if it were a normal local procedure call."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="RPC (Remote Procedure Call)"
  subtitle="Invoking Functions Across the Network"
  tags={['API', 'RPC', 'Architecture', 'Distributed Systems']}
>

While REST focuses on interacting with Data Resources (Nouns), RPC mathematically focuses entirely on executing Actions (Verbs).

## 1. The Illusion of Local Execution
The mathematical goal of RPC is transparency. The developer writing the Client code should not need to worry about TCP sockets, HTTP headers, or JSON serialization.
They simply call a method: TICK1let balance = bankServer.calculateInterest(accountId, rate);TICK1
Under the hood, the RPC framework (like gRPC or JSON-RPC) mathematically intercepts the function call, serializes the arguments (accountId, rate), transmits them over the network, executes the function on the remote server, and returns the result, creating the perfect illusion that the function executed locally on the client's CPU.

## 2. When to Use RPC
REST is excellent for standard CRUD operations (Create, Read, Update, Delete) on web entities.
RPC is mathematically superior for highly complex, verb-heavy operations where mapping the action to a Noun feels forced and unnatural (e.g., TICK1convertVideoFormat()TICK1, TICK1restartServer()TICK1, TICK1calculateCryptography()TICK1). Microservices heavily utilize RPC (specifically gRPC) because it is strictly typed and mathematically faster than REST.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/SOAP/index.mdx': `---
title: SOAP (Simple Object Access Protocol)
description: "A highly rigorous, XML-based messaging protocol specification used for exchanging structured information in the implementation of web services, heavily favored in legacy enterprise and banking environments."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SOAP (Simple Object Access Protocol)"
  subtitle="Strict XML Messaging"
  tags={['API', 'SOAP', 'Enterprise', 'Legacy']}
>

Before REST and JSON took over the internet, enterprise architectures relied entirely on SOAP. While "Simple" is in the name, SOAP is mathematically one of the most complex and verbose API protocols ever invented.

## 1. The XML Envelope
Unlike REST (which uses the HTTP headers and URL to define the action), a SOAP request uses HTTP purely as a dumb transport tunnel (Level 0 on the Richardson Maturity Model).
The entire request is mathematically bundled into a massive XML **Envelope** containing a Header and a Body.
TICK3xml
<soapenv:Envelope>
   <soapenv:Body>
      <req:CalculateTaxes>
         <req:Amount>100.00</req:Amount>
      </req:CalculateTaxes>
   </soapenv:Body>
</soapenv:Envelope>
TICK3

## 2. WSDL and Mathematical Rigor
The true power (and pain) of SOAP is the **WSDL (Web Services Description Language)**.
A WSDL is a massive XML file that mathematically defines the exact, strict schema of every single object and method the API supports. Because the schema is so mathematically rigid, enterprise Java and C# tools can read a WSDL and instantly generate 100% type-safe client code. SOAP is still used in banking because it has built-in, protocol-level support for ACID transactions (WS-AtomicTransaction) and advanced cryptography (WS-Security) that REST mathematically lacks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Sorting/index.mdx': `---
title: API Sorting
description: "The architectural practice of allowing clients to dynamically dictate the mathematical order in which a dataset is returned by the API, usually implemented via URL query parameters in RESTful systems."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="API Sorting"
  subtitle="Ordering the Result Set"
  tags={['API', 'REST', 'Architecture', 'Web']}
>

If an API endpoint TICK1GET /productsTICK1 returns a list of laptops, the default order is usually just the order they were inserted into the SQL database (by Primary Key). This is mathematically useless to a user who wants to see the cheapest laptops first.

## 1. URL Parameter Standards
To support dynamic sorting, APIs use query parameters. There are several mathematical standards:
- **Simple**: TICK1GET /products?sort=price_ascTICK1
- **Prefix (Stripe/JSON:API)**: TICK1GET /products?sort=-priceTICK1 (The minus sign mathematically indicates descending order).
- **Multiple Fields**: TICK1GET /products?sort=-price,ratingTICK1 (Mathematically sorts by price descending, and if two prices are identical, it sorts by rating ascending).

## 2. Database Indexes and Performance
When the API receives TICK1sort=-priceTICK1, it translates this into the SQL clause: TICK1ORDER BY price DESCTICK1.
If the database table has 10 million rows, and the TICK1priceTICK1 column does not have a mathematical B-Tree Index, the database must perform a "Full Table Scan" and execute an O(N log N) sorting algorithm in RAM, completely crashing the database. API designers must mathematically ensure that any column exposed via the TICK1sortTICK1 API parameter is strictly backed by a physical database index.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Swagger/index.mdx': `---
title: Swagger
description: "A suite of open-source tools built around the OpenAPI Specification that mathematically helps developers design, build, document, and consume RESTful web services using interactive, machine-readable interfaces."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Swagger"
  subtitle="Interactive API Documentation"
  tags={['API', 'REST', 'Documentation', 'Tooling']}
>

Note: In 2015, the "Swagger Specification" was donated to the Linux Foundation and renamed the **OpenAPI Specification**. Today, "OpenAPI" refers to the mathematical specification (the YAML file), while "Swagger" refers to the suite of UI tools that interact with it.

## 1. Swagger UI
The most famous tool is **Swagger UI**.
It is a JavaScript/HTML application that reads the mathematical OpenAPI YAML file and dynamically generates a beautiful web page.
Crucially, it is not just static text. Swagger UI generates interactive HTML forms. A developer can click a button on the documentation page, fill in the JSON body, and mathematically execute a real HTTP POST request directly against the API, turning the documentation into a fully functional Postman-style testing client.

## 2. Swagger Codegen
Because the OpenAPI YAML file is mathematically precise, the **Swagger Codegen** tool can read the file and automatically generate the physical source code for the API Client in over 50 languages (TypeScript, Java, Python, Go). This mathematically guarantees that the frontend team's API fetching code is perfectly synchronized with the backend team's API endpoints.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.4 API Design/Webhooks/index.mdx': `---
title: Webhooks
description: "A mathematical architectural pattern often called 'Reverse APIs', where the server asynchronously pushes data to the client's URL via HTTP POST the exact moment a specific event occurs, eliminating the need for polling."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Webhooks"
  subtitle="The Reverse API"
  tags={['API', 'Architecture', 'Event-Driven', 'Networking']}
>

If your application integrates with Stripe, and you need to know when a customer's monthly subscription payment successfully clears, how do you mathematically find out?

## 1. The Inefficiency of Polling
You could write a script that makes a standard REST API request to TICK1GET /paymentsTICK1 every 60 seconds to check for new data. This is called **Polling**.
It is mathematically terrible. 99% of the time, the response is "No new payments," wasting your CPU, Stripe's CPU, and network bandwidth.

## 2. Event-Driven Push
Webhooks solve this by mathematically inverting the relationship.
You build an endpoint on *your* server (e.g., TICK1POST https://your-app.com/stripe-webhookTICK1) and give the URL to Stripe.
You do nothing. You do not poll.
At 3:00 AM, when the customer's credit card clears, Stripe's servers mathematically initiate an HTTP POST request *to your server*, containing a JSON payload with the payment details. You receive the data instantly (in milliseconds) exactly when the event occurs, mathematically eliminating the need for polling and drastically improving system efficiency.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Clean code/index.mdx': `---
title: Clean Code
description: "A philosophy of software craftsmanship, popularized by Robert C. Martin (Uncle Bob), that emphasizes writing code that is mathematically simple, highly readable, and easily maintainable by human engineers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Clean Code"
  subtitle="Writing for the Human, Not the Machine"
  tags={['Process', 'Clean Code', 'Engineering', 'Architecture']}
>

A compiler mathematically does not care if your variables are named TICK1aTICK1, TICK1bTICK1, and TICK1cTICK1, or if your function is 5,000 lines long. The computer will execute it perfectly. Clean Code is the realization that source code is written for *human beings* to read.

## 1. The Reading to Writing Ratio
Robert C. Martin mathematically observed that engineers spend 10 times as much time *reading* old code as they do writing new code.
Therefore, optimizing code so that it is "fast to type" (by using short, cryptic variable names) is a mathematical catastrophe. Code must be optimized for readability.
- **Bad**: TICK1int d; // elapsed time in daysTICK1
- **Clean**: TICK1int elapsedTimeInDays;TICK1

## 2. Core Principles
Clean Code dictates strict mathematical heuristics:
- **Functions should be small**: A function should do exactly one thing (Single Responsibility Principle) and ideally be shorter than 20 lines.
- **No Side Effects**: A function named TICK1checkPassword()TICK1 must mathematically only check the password. It must not secretly initialize a user session in the background.
- **Meaningful Names**: The name of a variable, function, or class should mathematically answer all the big questions: why it exists, what it does, and how it is used. Comments are considered a failure to express the intent mathematically in the code itself.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Code linting/index.mdx': `---
title: Code Linting
description: "The automated mathematical process of running a static analysis tool against source code to flag programming errors, bugs, stylistic violations, and suspicious constructs before the code is compiled or executed."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Code Linting"
  subtitle="Automated Static Analysis"
  tags={['Process', 'Clean Code', 'Tooling', 'JavaScript']}
>

In a team of 50 developers, arguments about whether to use spaces or tabs, or whether to put curly braces on a new line, are mathematically a massive waste of expensive engineering time.

## 1. Automated Enforcer
A Linter (like ESLint for JavaScript or SonarQube for Java) solves this by mathematically enforcing the rules.
The architectural team defines a configuration file (TICK1.eslintrcTICK1). The Linter parses the source code into an Abstract Syntax Tree (AST) and mathematically checks it against the rules.
If a developer forgets a semicolon, leaves an unused variable, or uses a dangerous mathematical operator (like TICK1==TICK1 instead of TICK1===TICK1 in JS), the Linter paints the IDE red and throws an error.

## 2. CI/CD Integration
Linters are mathematically integrated directly into the CI/CD pipeline (Continuous Integration).
When a developer opens a Pull Request on GitHub, the CI server runs the Linter. If the code violates the mathematical styling rules, the CI server instantly fails the build and blocks the PR from merging. This automates code formatting, completely eliminating styling arguments during human Code Review.

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
