import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/Postman/index.mdx': `---
title: Postman
description: An API platform for building and using APIs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Postman"
  subtitle="The absolute standard for API testing"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Postman_%28software%29.png/512px-Postman_%28software%29.png"
  description="Postman mathematically revolutionized backend development by providing a beautiful GUI for constructing, saving, and testing HTTP REST APIs, replacing raw terminal curl commands."
  yearCreated={2012}
  creator="Abhinav Asthana"
  isOpenSource={false}
  websiteUrl="https://www.postman.com/"
>

Before Postman, developers mathematically tested APIs using massive \`curl\` scripts. If an API required a 50-line JSON body, an OAuth token, and specific headers, testing it in the terminal was a typo-prone nightmare.

<Callout icon="success" title="Collections and Environments">
  Postman's greatest innovation was **Collections**. 
  
  A developer can mathematically map out all 50 endpoints of an API, save them into a Collection, and share it with the frontend team. 
  
  Combined with **Environments**, you can define a variable \`{{base_url}}\`. You click a dropdown to switch from "Localhost" to "Production", and every single saved API call instantly and mathematically routes to the new server, saving hundreds of hours of manual URL typing.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/Insomnia/index.mdx': `---
title: Insomnia
description: A collaborative open source API client.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Insomnia"
  subtitle="The lightweight Postman alternative"
  logoUrl="https://insomnia.rest/images/insomnia-logo.svg"
  description="As Postman evolved into a massive, heavy enterprise cloud platform requiring user accounts and syncing, Insomnia emerged as the open-source, mathematically lightweight alternative."
  yearCreated={2015}
  creator="Gregory Schier"
  isOpenSource={true}
  websiteUrl="https://insomnia.rest/"
>

Many developers mathematically despise cloud-syncing. They want an API client that is purely local, blazing fast, and doesn't require a login to test a \`localhost:3000\` endpoint.

Insomnia fulfills this role. It provides the exact same core mathematical functionality as Postman (Collections, Environments, OAuth, GraphQL support) but is built strictly for developers who prioritize biological speed and local-first data privacy.

*(Note: Insomnia recently introduced cloud syncing, leading to the rise of newer purely-local tools like Bruno).*

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/Bruno/index.mdx': `---
title: Bruno
description: An open-source API client aimed at revolutionizing the status quo represented by Postman, Insomnia and similar tools out there.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Bruno"
  subtitle="The Git-native API client"
  logoUrl="https://www.usebruno.com/favicon.ico"
  description="Bruno represents the modern rebellion against proprietary API clients. It mathematically stores all API requests as plain text files directly in your Git repository."
  yearCreated={2021}
  creator="Anoop M D"
  isOpenSource={true}
  websiteUrl="https://www.usebruno.com/"
>

Postman and Insomnia store your API collections in massive, proprietary JSON blobs or hidden SQLite databases. If you want to mathematically track changes to an API endpoint over time, you are forced to use their proprietary cloud syncing.

<Callout icon="success" title="The Bru Language">
  Bruno mathematically solves this by introducing a proprietary markup language (\`.bru\`). 
  
  Every single API request is saved as a physically distinct \`.bru\` text file inside your project folder. You commit these files to GitHub right alongside your backend source code. 
  
  If a developer changes an API endpoint, it appears as a clean, mathematically perfect Git Diff in the Pull Request. There is no cloud, no sync, and no vendor lock-in.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/OpenAPI/index.mdx': `---
title: OpenAPI Specification (OAS)
description: A broadly adopted industry standard for describing modern APIs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="OpenAPI (formerly Swagger)">

How do you tell a frontend developer exactly what JSON a backend API will return? Writing a Microsoft Word document is biologically prone to human error and instantly becomes outdated.

The **OpenAPI Specification** (formerly known as Swagger) is a mathematical standard for defining APIs in a strict YAML or JSON format.

<Callout icon="info" title="The Single Source of Truth">
  You write a \`openapi.yaml\` file that mathematically declares:
  *"The \`/users\` endpoint accepts a POST request with a \`name\` (String, required) and returns a \`201\` with a \`userId\` (UUID)."*
  
  Because the definition is strictly mathematical, you can use tools to auto-generate the frontend TypeScript interfaces, auto-generate the backend routing boilerplate, and automatically generate beautiful documentation websites, ensuring the code and documentation are biologically incapable of diverging.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/Swagger UI/index.mdx': `---
title: Swagger UI
description: A collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Swagger UI"
  subtitle="Interactive API documentation"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Swagger-logo.png/512px-Swagger-logo.png"
  description="Swagger UI physically reads an OpenAPI YAML file and mathematically renders an interactive, beautifully styled webpage where developers can read about and directly test API endpoints."
  yearCreated={2011}
  creator="SmartBear Software"
  isOpenSource={true}
  websiteUrl="https://swagger.io/tools/swagger-ui/"
>

If an API has an OpenAPI specification, providing a raw YAML file to a client is terrible developer experience.

Swagger UI is a frontend React/Vanilla app that biologically parses that YAML and generates interactive buttons. A client can go to \`api.example.com/docs\`, open the \`/users\` accordion, visually see the required JSON schema, and click a physical **"Try it out"** button to mathematically execute a real HTTP request directly from their browser window.

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/GraphQL Playground/index.mdx': `---
title: GraphQL Playground
description: A graphical, interactive, in-browser GraphQL IDE, created by Prisma and based on GraphiQL.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="GraphQL Playground"
  subtitle="The IDE for GraphQL APIs"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png"
  description="GraphQL Playground (often bundled with Apollo Server) is to GraphQL what Swagger UI is to REST. It is an interactive, browser-based IDE that mathematically allows developers to query graph data."
  yearCreated={2017}
  creator="Prisma"
  isOpenSource={true}
  websiteUrl="https://github.com/graphql/graphql-playground"
>

GraphQL APIs are mathematically self-documenting via **Introspection**. 

When you open GraphQL Playground in your browser, it silently sends an Introspection query to the server, downloading the entire mathematical AST of the database schema. 

<Callout icon="success" title="Real-Time Auto-Completion">
  Because the Playground knows the exact schema, it provides IDE-level auto-completion inside the browser window. If you start typing \`query { us... }\`, it mathematically auto-completes to \`users\` and underlines incorrect fields in red before you even send the HTTP request.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/Mock servers/index.mdx': `---
title: Mock Servers
description: Servers that simulate the behavior of real APIs for testing and development purposes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mock Servers">

If the Frontend team is hired to build a React dashboard, but the Backend team hasn't written the database code yet, the Frontend team is biologically blocked. 

**Mock Servers** mathematically unblock them.

<Callout icon="tip" title="Simulating the Backend">
  A Mock Server (like **JSON Server** or **WireMock**) mathematically intercepts HTTP requests and returns fake, static JSON data. 
  
  The Frontend developer configures their React app to point to \`localhost:4000\`. When they request \`/users\`, the Mock Server instantly replies with a fake array of users. The React developer can build the entire UI, pagination, and state management. When the real backend is finally finished 3 weeks later, the developer simply changes the URL to the real server, and the app mathematically works perfectly.
</Callout>

</ConceptTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/ngrok/index.mdx': `---
title: ngrok
description: A globally distributed reverse proxy that secures, protects and accelerates your applications and APIs.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="ngrok"
  subtitle="The ultimate localhost tunnel"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ngrok_logo.svg/512px-Ngrok_logo.svg.png"
  description="ngrok mathematically punches a hole through your router's firewall, exposing a local development server running on your laptop directly to the public internet."
  yearCreated={2015}
  creator="Alan Shreve"
  isOpenSource={false}
  websiteUrl="https://ngrok.com/"
>

If you are developing a Node.js server on \`localhost:3000\`, and you want your client in another country to see it, you cannot send them \`localhost:3000\` (that is biologically their own computer). You normally have to deploy to AWS.

<Callout icon="success" title="The Reverse Proxy Tunnel">
  You simply run: \`ngrok http 3000\`
  
  ngrok mathematically connects to its central cloud servers and generates a public URL (e.g., \`https://xyz.ngrok.app\`). When the client clicks that URL, the ngrok cloud server mathematically tunnels the HTTP traffic directly through your firewall, into your laptop, and hits your Node server. It is the absolute standard tool for testing Webhooks (like Stripe or Twilio) that mathematically require a public internet URL to send payloads to.
</Callout>

</TechnologyTemplate>
`,
  '51. Developer Tools & Productivity/51.5 API & Ecosystem Tools/LocalTunnel/index.mdx': `---
title: LocalTunnel
description: An open-source tool that exposes your localhost to the world for easy testing and sharing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="LocalTunnel"
  subtitle="The open-source ngrok alternative"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/512px-Node.js_logo.svg.png"
  description="As ngrok transitioned into a massive, heavily rate-limited, paid enterprise tool requiring user authentication, LocalTunnel emerged as the open-source, mathematically free alternative."
  yearCreated={2013}
  creator="Roman Shtylman"
  isOpenSource={true}
  websiteUrl="https://localtunnel.me/"
>

LocalTunnel provides the exact same mathematical reverse-proxy tunneling functionality as ngrok, but is distributed purely as a Node.js npm package.

You run \`npx localtunnel --port 3000\`, and it instantly assigns a randomized \`loca.lt\` subdomain pointing directly to your local server. It is heavily utilized by developers who biologically refuse to create accounts or pay subscriptions for basic port-forwarding requirements.

</TechnologyTemplate>
`,
}

async function generateMega100() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega100().catch(console.error)
