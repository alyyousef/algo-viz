import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '2. Web Development/APIs/index.mdx': `---
title: APIs
description: Application Programming Interfaces for building and integrating software.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Application Programming Interfaces (APIs)">

An API (Application Programming Interface) is a way for two or more computer programs to communicate with each other. It is a type of software interface, offering a service to other pieces of software.

<Callout icon="tip" title="Analogy">
  Think of an API like a waiter in a restaurant. You (the client) give your order to the waiter (the API), who takes it to the kitchen (the server). The kitchen prepares the food and the waiter brings it back to you. You don't need to know how the food is cooked, just how to order it.
</Callout>

## Common API Architectures

<ComparisonTable 
  headers={['Architecture', 'Protocol', 'Data Format', 'Description']}
  rows={[
    ['REST', 'HTTP', 'JSON (mostly)', 'Representational State Transfer. Uses standard HTTP methods (GET, POST, PUT, DELETE) and is stateless.'],
    ['GraphQL', 'HTTP', 'JSON', 'Allows clients to define the exact structure of the data required, preventing over-fetching.'],
    ['gRPC', 'HTTP/2', 'Protobuf', 'High-performance RPC framework by Google. Uses binary protocol buffers for extremely fast communication.'],
    ['SOAP', 'HTTP/SMTP', 'XML', 'Legacy enterprise protocol with strict standards and built-in security features.']
  ]}
/>

## RESTful Endpoints Example

<pre className="bin98-codebox">
<code>
GET    /api/users       -> Retrieve all users
GET    /api/users/123   -> Retrieve user 123
POST   /api/users       -> Create a new user
PUT    /api/users/123   -> Update user 123
DELETE /api/users/123   -> Delete user 123
</code>
</pre>

</ConceptTemplate>
`,
  '2. Web Development/Backend/index.mdx': `---
title: Backend Development
description: Server-side logic, databases, and application architecture.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Backend Development">

Backend development (also known as server-side development) refers to the creation and maintenance of the technology that powers the components of a website or application that exist out of sight from the user. It consists of a server, an application, and a database.

<Callout icon="info" title="Stateless vs Stateful">
  Modern backend APIs are predominantly **stateless** (RESTful), meaning no client session state is stored on the server between requests. Authentication is usually handled via tokens (like JWT) sent with every request.
</Callout>

## The Three Pillars

<ComparisonTable 
  headers={['Component', 'Role', 'Common Technologies']}
  rows={[
    ['Server / Runtime', 'Listens for requests and executes logic.', 'Node.js, JVM, Python, Go'],
    ['Web Framework', 'Simplifies routing, middleware, and request handling.', 'Express (Node), Spring Boot (Java), Django (Python), Gin (Go)'],
    ['Database', 'Persistently stores user data and application state.', 'PostgreSQL, MongoDB, Redis']
  ]}
/>

## Typical Web Request Lifecycle

<ArchitectureDiagram chart={\`
sequenceDiagram
    participant Browser
    participant LoadBalancer
    participant WebServer
    participant Database

    Browser->>LoadBalancer: HTTPS GET /profile
    LoadBalancer->>WebServer: Route to healthy instance
    WebServer->>WebServer: Validate JWT Auth Token
    WebServer->>Database: SQL SELECT * FROM users
    Database-->>WebServer: Return User Data
    WebServer-->>LoadBalancer: HTTP 200 OK (JSON)
    LoadBalancer-->>Browser: HTTP 200 OK (JSON)
\`} />

</ConceptTemplate>
`,
  '2. Web Development/Frontend/index.mdx': `---
title: Frontend Development
description: Client-side user interface and experience.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Frontend Development">

Frontend development focuses on the client-side of the application. It involves creating the graphical user interface (GUI) of a website through the use of HTML, CSS, and JavaScript so users can view and interact with the application.

<Callout icon="tip" title="Single Page Applications (SPAs)">
  Most modern web applications are SPAs. Instead of the server sending a new HTML page for every click, the server sends one initial HTML shell and a massive JavaScript bundle. React/Vue/Angular then dynamically rewrite the DOM on the fly, fetching only raw JSON data from the backend.
</Callout>

## The Holy Trinity

<ComparisonTable 
  headers={['Language', 'Purpose', 'Analogy']}
  rows={[
    ['HTML', 'Structure and semantics of the page.', 'The bones/skeleton'],
    ['CSS', 'Styling, layout, and visual presentation.', 'The skin/clothes'],
    ['JavaScript', 'Interactivity, logic, and network requests.', 'The muscles/brain']
  ]}
/>

## Component-Based Architecture

Modern frontend frameworks divide the UI into reusable components, each managing its own state and lifecycle.

<ArchitectureDiagram chart={\`
graph TD
  App(App.tsx) --> Header(Header)
  App --> Main(MainContent)
  App --> Footer(Footer)
  
  Header --> Nav(NavBar)
  Header --> Profile(UserProfile)
  
  Main --> Feed(NewsFeed)
  Main --> Sidebar(Sidebar)
  
  Feed --> Post1(Post)
  Feed --> Post2(Post)
\`} />

</ConceptTemplate>
`,
  '3. Mobile Development/iOS/index.mdx': `---
title: iOS Development
description: Developing applications for Apple mobile devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="iOS Development">

iOS development is the process of building mobile applications for Apple's ecosystem of mobile devices, primarily the iPhone and iPad. Development is typically done on macOS using Xcode.

<Callout icon="error" title="Walled Garden">
  To deploy an app to a physical device or the App Store, you must have an active Apple Developer Program membership ($99/year) and sign your application with cryptographic provisioning profiles.
</Callout>

## Core Technologies

<ComparisonTable 
  headers={['Technology', 'Role', 'Status']}
  rows={[
    ['Swift', 'Primary programming language introduced in 2014. Fast, safe, and modern.', 'Standard'],
    ['Objective-C', 'Legacy C-based language that powered NeXTSTEP and early iOS.', 'Legacy / Maintenance'],
    ['SwiftUI', 'Declarative UI framework introduced in 2019 (similar to React).', 'Modern Standard'],
    ['UIKit', 'Imperative, mature UI framework based on view controllers and storyboards.', 'Mature / Still widely used']
  ]}
/>

## Example SwiftUI Component

<pre className="bin98-codebox">
<code>
{\`import SwiftUI

struct ContentView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("You clicked \\(count) times")
            Button("Click me") {
                count += 1
            }
        }
    }
}\`}
</code>
</pre>

</ConceptTemplate>
`,
  '3. Mobile Development/Android/index.mdx': `---
title: Android Development
description: Developing applications for devices running the Android OS.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Android Development">

Android development involves building applications for devices running the Android operating system, which is based on the Linux kernel. Applications are typically developed using Android Studio.

<Callout icon="info" title="The JVM Ecosystem">
  Android apps are traditionally compiled into Dalvik Executable (DEX) bytecode and run on the Android Runtime (ART). Because of this, Android development relies heavily on JVM languages.
</Callout>

## Core Technologies

<ComparisonTable 
  headers={['Technology', 'Role', 'Status']}
  rows={[
    ['Kotlin', 'Modern, concise, null-safe language fully interoperable with Java. Google declared it the preferred language in 2019.', 'Standard'],
    ['Java', 'The original language of Android. Still powers vast amounts of legacy code.', 'Legacy / Mature'],
    ['Jetpack Compose', 'Modern declarative UI toolkit built entirely in Kotlin (similar to SwiftUI/React).', 'Modern Standard'],
    ['XML Layouts', 'Legacy imperative UI system where layouts are designed in XML files and bound to Activity classes.', 'Legacy / Widespread']
  ]}
/>

## The Application Components

Android apps are built using four core components:

<ArchitectureDiagram chart={\`
graph TD
  App(Android App)
  
  App --- Act(Activities)
  App --- Serv(Services)
  App --- BR(Broadcast Receivers)
  App --- CP(Content Providers)
  
  Act --- ActDesc[The UI and user interactions]
  Serv --- ServDesc[Background operations without UI]
  BR --- BRDesc[Listen for system-wide events e.g. low battery]
  CP --- CPDesc[Share data between different applications]
\`} />

</ConceptTemplate>
`,
}

async function writeBatch3() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Updated ${relativePath} with rich content.`)
  }
}

writeBatch3().catch(console.error)
