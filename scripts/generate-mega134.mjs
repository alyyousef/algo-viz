import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/SOLID/index.mdx': `---
title: SOLID Principles
description: "An acronym representing five foundational mathematical principles of object-oriented class design, formulated by Robert C. Martin, aimed at making software architectures more understandable, flexible, and maintainable."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="SOLID Principles"
  subtitle="The 5 Pillars of Object-Oriented Architecture"
  tags={['Process', 'Clean Code', 'Architecture', 'Design Principles']}
>

If an engineer ignores SOLID, their codebase will mathematically degrade into "Spaghetti Code" where a single change to the UI breaks the database.

## 1. SRP & OCP
- **(S) Single Responsibility Principle**: A class must have exactly one mathematical reason to change. A TICK1UserTICK1 class should hold data; it should *not* contain the SQL query to save itself to the database (TICK1UserRepositoryTICK1 should do that).
- **(O) Open-Closed Principle**: Software entities must be mathematically *open for extension, but closed for modification*. If you need to add a "Bitcoin" payment method, you should mathematically create a new TICK1BitcoinStrategyTICK1 class, not open the existing TICK1PaymentProcessorTICK1 file and add another TICK1if/elseTICK1 statement.

## 2. LSP, ISP & DIP
- **(L) Liskov Substitution Principle**: A child class must be mathematically swappable with its parent class without breaking the program. If TICK1BirdTICK1 has a TICK1fly()TICK1 method, creating a TICK1PenguinTICK1 class that extends TICK1BirdTICK1 and throws a TICK1CannotFlyExceptionTICK1 mathematically violates LSP.
- **(I) Interface Segregation Principle**: A client should never be forced to implement an interface it doesn't use. Instead of one massive TICK1IWorkerTICK1 interface with TICK1work()TICK1 and TICK1eat()TICK1, split it into TICK1IWorkableTICK1 and TICK1IFeedableTICK1, so a TICK1RobotTICK1 class isn't forced to implement TICK1eat()TICK1.
- **(D) Dependency Inversion Principle**: High-level modules must not mathematically depend on low-level modules; both should depend on abstractions (Interfaces). A TICK1CheckoutServiceTICK1 must never instantiate a physical TICK1MySQLDatabaseTICK1; it must depend on an abstract TICK1IDatabaseTICK1.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/Static analysis tools/index.mdx': `---
title: Static Analysis Tools
description: "Automated software tools that mathematically analyze source code without executing it, searching for syntax errors, security vulnerabilities, memory leaks, and violations of clean code principles."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Static Analysis Tools"
  subtitle="Mathematical Code Inspection"
  tags={['Process', 'Tooling', 'Security', 'Clean Code']}
>

Human code review is excellent for verifying business logic, but humans are mathematically terrible at spotting a missing null-check on line 5,432 of a massive pull request.

## 1. How They Work
Unlike Dynamic Analysis (which requires running the code and observing its behavior in RAM), **Static Analysis** tools parse the raw text of the source code into a mathematical Abstract Syntax Tree (AST).
They traverse the AST to find known anti-patterns.
- **Linters** (e.g., ESLint, Pylint): Check for formatting, unused variables, and stylistic violations.
- **SAST (Static Application Security Testing)** (e.g., Checkmarx, Fortify): Search the AST specifically for mathematical vulnerabilities like SQL Injection, Hardcoded Passwords, or Cross-Site Scripting (XSS).

## 2. SonarQube
The industry standard for Static Analysis is **SonarQube**.
It runs automatically during the CI/CD pipeline and mathematically generates a holistic "Quality Gate" score.
It calculates:
- **Technical Debt Ratio**: "You have 15 days of technical debt."
- **Code Coverage**: "Only 45% of your code has unit tests."
- **Cyclomatic Complexity**: "This function has 15 nested IF statements; it is mathematically too complex to maintain."
If the Quality Gate fails, the CI pipeline mathematically blocks the deployment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/40. Software Engineering — Process & Architecture/40.5 Coding Quality/YAGNI/index.mdx': `---
title: YAGNI (You Aren't Gonna Need It)
description: "A foundational principle of Extreme Programming (XP) mathematically stating that a programmer should not add functionality until deemed strictly necessary, avoiding the massive costs of premature abstraction."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="YAGNI (You Aren't Gonna Need It)"
  subtitle="The Antidote to Over-Engineering"
  tags={['Process', 'Agile', 'Clean Code', 'Philosophy']}
>

Junior engineers build exactly what is asked. Intermediate engineers build massive, complex abstraction layers because they try to predict what the business will ask for next year. Senior engineers apply YAGNI.

## 1. The Mathematical Cost of Prediction
If a developer thinks, *"I should build this database layer to support Oracle, MySQL, and Postgres, just in case the client wants to switch databases in the future,"* they have violated YAGNI.
By building for the future, the developer mathematically incurs three massive costs today:
1. **Time**: It takes 3x longer to build the abstraction.
2. **Complexity**: The code is now 3x harder to read and debug for the rest of the team.
3. **Maintenance**: The team now has to write unit tests for the Postgres connector, even though it isn't being used.

## 2. Agile Deferment
Statistically, 80% of the features developers "think" they will need in the future never actually materialize, because business requirements change rapidly.
YAGNI states you must mathematically defer the architectural decision until the very last possible moment. Build only what is needed today. When the future arrives, and the requirement is *actually* solidified, then you refactor.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Acceptance testing/index.mdx': `---
title: Acceptance Testing
description: "The final phase of software testing, performed mathematically from the end-user's perspective, to verify that the completed system satisfies the original business requirements and is ready for production release."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Acceptance Testing"
  subtitle="Validating the Business Value"
  tags={['Testing', 'QA', 'Agile', 'Process']}
>

A Unit Test mathematically verifies that a single function returns TICK1trueTICK1. An Acceptance Test mathematically verifies that the user can actually buy a product.

## 1. UAT (User Acceptance Testing)
Traditionally, UAT is the final manual step before deployment. The actual end-users (or business stakeholders) sit in front of the application in a "Staging" environment. They mathematically execute the real-world business scenarios (e.g., "Add 3 items to cart, apply coupon code, checkout"). If the system passes UAT, the stakeholders formally "accept" the software and sign off on the production release.

## 2. Automated Acceptance Testing (BDD)
In modern Agile environments, UAT is automated using **Behavior-Driven Development (BDD)** tools like Cucumber.
The Product Owner writes the requirement in plain English using Gherkin syntax:
TICK3gherkin
Given a user with a valid credit card
When they attempt to purchase a $50 item
Then the transaction is approved
TICK3
QA Engineers write code that mathematically parses this English sentence and automatically drives the web browser to click the buttons and verify the result. This transforms a manual business requirement into an automated, executable mathematical test suite.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Contract testing/index.mdx': `---
title: Contract Testing
description: "A specialized mathematical testing methodology used in Microservice architectures to verify that two separate services (a consumer and a provider) have a shared understanding of the API payload structure."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Contract Testing"
  subtitle="Preventing Microservice Integration Failures"
  tags={['Testing', 'Microservices', 'API', 'Architecture']}
>

In a Microservice architecture, Team A builds the UI (Consumer) and Team B builds the API (Provider).
If Team B renames the JSON field TICK1firstNameTICK1 to TICK1first_nameTICK1, their internal unit tests will pass perfectly. But the moment they deploy, the UI built by Team A will mathematically crash. 

## 1. The Danger of End-to-End (E2E) Tests
Traditionally, teams caught this via E2E testing (spinning up both microservices and testing them together). However, E2E tests are mathematically slow, flaky, and require complex database state management.

## 2. The Consumer-Driven Contract
**Contract Testing** (using tools like Pact) solves this mathematically without needing E2E tests.
1. The UI (Consumer) writes a mathematical "Contract": *"I expect the API to return TICK1{ firstName: string }TICK1."*
2. This Contract is physically saved as a JSON file and uploaded to a central Broker.
3. During Team B's CI/CD pipeline, the Pact tool downloads the Contract, mocks the UI, and mathematically forces the API (Provider) to fulfill the contract.
If the API fails to provide TICK1firstNameTICK1, Team B's CI pipeline fails instantly, mathematically preventing them from deploying the breaking change, all without ever actually spinning up the UI service.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Cypress/index.mdx': `---
title: Cypress
description: "A modern, JavaScript-based front-end testing tool built for the modern web, allowing developers to write fast, mathematically reliable End-to-End (E2E) tests that execute directly inside the browser."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Cypress"
  subtitle="Next-Generation E2E Testing"
  tags={['Testing', 'JavaScript', 'Web', 'Tooling']}
>

For 15 years, the industry standard for End-to-End web testing was Selenium. Selenium is mathematically notorious for being flaky; it communicates with the browser over an external network protocol, leading to catastrophic timing issues where the test clicks a button before the React component has mathematically rendered.

## 1. Execution Within the Browser
Cypress revolutionized E2E testing by mathematically executing its tests *inside* the exact same run-loop as the application itself.
Because Cypress is running in the same browser tab as the React/Vue code, it has native, synchronous access to the DOM, the Window object, and local storage.

## 2. Automatic Waiting
The greatest mathematical feature of Cypress is **Automatic Waiting**.
TICK3javascript
cy.get('#submit-button').click()
cy.get('.success-message').should('be.visible')
TICK3
In Selenium, if the network takes 2 seconds to load the success message, the test fails instantly unless the developer hardcodes a TICK1Thread.sleep(3000)TICK1.
Cypress mathematically understands the DOM state. It will automatically wait (poll) and retry the TICK1getTICK1 assertion for up to 4 seconds, mathematically eliminating "flakiness" and network timing errors without the developer needing to write complex wait logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Fakes/index.mdx': `---
title: Fakes
description: "A specific type of Test Double in software engineering that mathematically implements a working, lightweight version of a dependency, bypassing the massive overhead of spinning up the real infrastructure."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Test Fakes"
  subtitle="Working Implementations for Testing"
  tags={['Testing', 'Unit Testing', 'Clean Code', 'Patterns']}
>

When writing a Unit Test, you must mathematically isolate the code from external infrastructure like Databases or Stripe APIs. You use "Test Doubles" (Mocks, Stubs, or Fakes) to replace them.

## 1. The Definition of a Fake
A **Fake** is mathematically different from a Mock or a Stub.
- A **Stub** is hardcoded to return a specific value (e.g., TICK1return "Alice"TICK1).
- A **Fake** actually has working, logical code, but it takes a mathematically simpler shortcut.
The most common example is an **In-Memory Database**.

## 2. Example: InMemoryUserRepository
If your application uses a TICK1MySQLUserRepositoryTICK1 that takes 5 seconds to connect to AWS, your unit tests will be too slow.
Instead, you implement a Fake: TICK1InMemoryUserRepositoryTICK1.
TICK3java
class InMemoryUserRepository implements IUserRepository {
    private List<User> database = new ArrayList<>();
    
    public void save(User user) { database.add(user); }
    public User getById(int id) { return database.get(id); }
}
TICK3
This is a Fake. It mathematically works exactly like the real database. You can save a user, query the user, and delete the user, but the data is just sitting in a simple RAM Array. It allows the Unit Tests to execute in 2 milliseconds without touching a real database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Fixtures/index.mdx': `---
title: Test Fixtures
description: "A mathematical testing concept referring to the fixed, known state of the environment required to run a test successfully, ensuring that every test executes in a perfectly predictable, isolated sandbox."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Test Fixtures"
  subtitle="Establishing the Baseline State"
  tags={['Testing', 'Unit Testing', 'Process', 'Tooling']}
>

A unit test is mathematically invalid if it depends on the random state of the computer running it. If a test passes on the developer's laptop but fails on the CI/CD server, it is a flaky test.

## 1. Establishing the Baseline
To mathematically guarantee deterministic results, every test must start from a **Test Fixture**—a rigidly defined baseline state.
Examples of Fixtures:
- Loading a specific JSON file of fake users into the in-memory database.
- Initializing the exact variables needed for a class to compile.
- Setting the system clock to a fixed mathematical date (so tests checking "Is the user over 18?" don't suddenly fail next year).

## 2. Setup and Teardown
Modern testing frameworks (JUnit, PyTest, Jest) provide specific lifecycle hooks to manage fixtures.
- TICK1beforeEach()TICK1 / TICK1setUp()TICK1: Mathematically executes before *every single test*, ensuring the database is wiped clean and repopulated with the exact same 3 fake users. This guarantees that Test A cannot corrupt the database state for Test B.
- TICK1afterEach()TICK1 / TICK1tearDown()TICK1: Mathematically cleans up the environment (closing file handles, deleting temporary directories) so the RAM is perfectly clean for the next test.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Gatling/index.mdx': `---
title: Gatling
description: "A highly advanced, open-source load and performance testing tool written in Scala, designed to mathematically simulate thousands of concurrent users hammering an API to identify precise architectural bottlenecks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Gatling"
  subtitle="Mathematical Load Testing"
  tags={['Testing', 'Performance', 'DevOps', 'Architecture']}
>

If an API mathematically works perfectly for 1 user, it might completely crash when 5,000 users attempt to log in simultaneously on Black Friday. You cannot discover this with Unit Tests; you must perform Load Testing.

## 1. Asynchronous Architecture
Older load testing tools (like Apache JMeter) operate on a "one thread per user" mathematical model. If you want to simulate 10,000 users, JMeter must spawn 10,000 physical OS threads, which crashes the testing machine's CPU before it even touches the API.
**Gatling** uses an advanced asynchronous, non-blocking architecture (built on Akka and Netty). A single Gatling instance can mathematically simulate tens of thousands of concurrent virtual users using only a handful of physical OS threads.

## 2. Code as Configuration
Unlike JMeter (which uses a clunky XML GUI), Gatling scenarios are written in pure Scala code.
TICK3scala
val scn = scenario("Black Friday Surge")
  .exec(http("Login").post("/login"))
  .pause(2) // Simulate user reading the screen
  .exec(http("Checkout").post("/cart/checkout"))

setUp(
  scn.inject(rampUsers(5000).during(60.seconds)) // Ramp up to 5k users in 1 minute
).protocols(httpProtocol)
TICK3
Gatling then generates massive, highly detailed mathematical HTML reports showing exactly when the API's P99 latency degraded from 50ms to 4000ms.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Jest/index.mdx': `---
title: Jest
description: "A massively popular, zero-configuration JavaScript testing framework developed by Facebook, featuring a mathematically isolated parallel runner, built-in assertion libraries, and native snapshot testing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Jest"
  subtitle="The Standard for JavaScript Testing"
  tags={['Testing', 'JavaScript', 'React', 'Tooling']}
>

Before Jest, JavaScript developers had to manually glue together 5 different libraries to write a unit test (Mocha for the runner, Chai for assertions, Sinon for mocking, Istanbul for coverage).

## 1. Zero Configuration
Facebook built Jest to be an all-in-one, zero-configuration framework. You install TICK1jestTICK1, and it mathematically includes the runner, the expect assertions (TICK1expect(a).toBe(b)TICK1), the mocking engine (TICK1jest.fn()TICK1), and code coverage metrics right out of the box.

## 2. Parallel Isolation and Snapshots
- **Mathematical Isolation**: Jest spawns a separate worker process for every test file. If Test A mathematically pollutes the global TICK1windowTICK1 object, Test B is completely unaffected because it runs in a separate isolated OS process.
- **Snapshot Testing**: The most famous feature of Jest. When testing a React UI component, asserting that exactly 15 DIVs were rendered is tedious. Instead, Jest renders the HTML and mathematically saves it as a text string in a TICK1.snapTICK1 file. On the next test run, it re-renders the component and performs a mathematical string-diff against the snapshot. If the HTML changed, the test fails, forcing the developer to confirm the UI alteration.

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
