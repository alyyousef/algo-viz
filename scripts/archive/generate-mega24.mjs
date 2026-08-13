import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/41. Testing/Unit testing/index.mdx': `---
title: Unit Testing
description: "The practice of testing the smallest testable parts of an application, typically individual functions or classes, in complete isolation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Unit Testing">

**Unit Testing** forms the foundation of the testing pyramid. The goal is to validate that each individual, isolated "unit" of code (usually a function or a method) performs exactly as expected under various conditions.

Because unit tests isolate the code from databases, file systems, and external APIs (using mocks and stubs), they run incredibly fast—often executing thousands of tests per second.

## 1. Anatomy of a Unit Test
Most unit tests follow the **AAA Pattern** (Arrange, Act, Assert):
1. **Arrange**: Set up the initial state, instantiate objects, and define the input data.
2. **Act**: Execute the specific function or method being tested.
3. **Assert**: Verify that the actual output matches the expected outcome.

${TICK3}javascript
// Example using Jest
test('calculates total with tax', () => {
  // Arrange
  const subtotal = 100;
  const taxRate = 0.1;
  
  // Act
  const total = calculateTotal(subtotal, taxRate);
  
  // Assert
  expect(total).toBe(110);
});
${TICK3}

## 2. Benefits of Unit Testing
- **Immediate Feedback**: Developers know instantly if their recent code change broke existing logic.
- **Living Documentation**: Well-written unit tests serve as executable documentation showing exactly how a function is intended to be used.
- **Refactoring Confidence**: You can aggressively refactor the internal implementation of a class, knowing the tests will catch any regressions in behavior.

## 3. Limitations
<ComparisonTable 
  headers={['What Unit Tests Do Well', 'What Unit Tests CANNOT Do']} 
  rows={[
    ['Catch off-by-one errors in logic.', 'Catch integration issues between two different microservices.'],
    ['Verify edge cases (e.g., passing null or negative numbers).', 'Verify that a database query is syntactically valid.'],
    ['Run in milliseconds in a CI pipeline.', 'Ensure the UI looks correct in a browser.']
  ]} 
/>

<Callout icon="tip" title="Test Coverage">
While achieving 100% Code Coverage is a noble goal, it often leads to writing low-value tests just to satisfy a metric. Aim for 80% coverage, focusing strictly on complex business logic and domain rules, while ignoring trivial getters/setters.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Integration testing/index.mdx': `---
title: Integration Testing
description: "The phase of software testing in which individual software modules are combined and tested as a group to verify they work together correctly."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Integration Testing">

While Unit Tests verify that individual functions work in isolation, **Integration Testing** verifies that those functions work correctly when connected to other components, such as databases, external APIs, or other microservices.

## 1. The "Two Doors" Problem
A famous programming joke illustrates the need for integration testing: 
*Two separate locks are installed on a door. One lock works perfectly. The other lock works perfectly. But when placed next to each other, you can't slide the door open because the handles collide.*
Both components passed their unit tests, but the integration failed.

## 2. Types of Integration Tests
- **Database Integration**: Testing that a repository class correctly connects to a real PostgreSQL database, executes an INSERT statement, and retrieves the correct row.
- **API Integration**: Testing that your application correctly formats a JSON payload, sends it to the Stripe API, and correctly handles a simulated 402 Payment Required error.
- **Component Integration (React/Vue)**: Testing that clicking a button in the TICK1<Checkout>TICK1 component correctly updates the state in the TICK1<Cart>TICK1 component.

## 3. Setting Up Integration Tests
Because integration tests require real infrastructure, they are slower and harder to maintain than unit tests. Modern teams use tools like **Testcontainers** (spinning up temporary Docker containers for databases during the test run) or in-memory databases (like SQLite) to make integration testing more deterministic.

<Callout icon="warning" title="The Flaky Test Problem">
Integration tests are highly susceptible to "flakiness" (tests that pass sometimes and fail other times without code changes). This is usually caused by network latency, shared database state between parallel tests, or API rate limits. Ensure every test runs in an isolated transaction that rolls back after execution.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/End-to-end testing/index.mdx': `---
title: End-to-End (E2E) Testing
description: "A testing methodology that validates the entire software application from start to finish, simulating real user scenarios in a production-like environment."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="End-to-End (E2E) Testing">

**End-to-End (E2E) Testing** sits at the very top of the testing pyramid. It verifies that the entire system—the frontend UI, the backend API, the database, and third-party integrations—all work together to deliver a successful user journey.

In web development, E2E testing involves a robot (like Cypress, Playwright, or Selenium) physically opening a real web browser, clicking buttons, typing in forms, and asserting that the correct text appears on the screen.

## 1. The Value of E2E
A system can have 100% passing unit tests and 100% passing integration tests, but if a CSS class accidentally sets the "Submit Order" button to TICK1display: noneTICK1, the business makes no money. E2E tests are the ultimate safety net because they test exactly what the user experiences.

## 2. Example E2E Scenario (E-commerce)
1. Robot opens Chrome and navigates to TICK1/loginTICK1.
2. Enters valid username and password, clicks "Login".
3. Navigates to a product page.
4. Clicks "Add to Cart".
5. Navigates to checkout.
6. Enters dummy credit card info.
7. Asserts that the "Order Successful" confirmation page is rendered.

## 3. The Testing Pyramid Trade-offs

<ComparisonTable 
  headers={['Metric', 'Unit Tests', 'E2E Tests']} 
  rows={[
    ['Execution Speed', 'Milliseconds (extremely fast).', 'Minutes (very slow).'],
    ['Cost to Write/Maintain', 'Low.', 'High (UI changes frequently break tests).'],
    ['Confidence Level', 'Low (doesn\\'t prove the app works).', 'High (proves the user can use the app).'],
    ['Debugging', 'Easy (points exactly to the broken line of code).', 'Hard (did the network fail? Did the DB time out?).']
  ]} 
/>

<Callout icon="tip" title="The E2E Rule of Thumb">
Because E2E tests are slow and brittle, you should not use them to test edge cases (like testing 15 different invalid email formats). Use Unit Tests for exhaustive edge cases. Reserve E2E tests for your core "Happy Paths" (Login, Signup, Checkout, Core Workflows).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Test-driven development (TDD)/index.mdx': `---
title: Test-Driven Development (TDD)
description: "A software development process where developers write the automated tests before writing the actual production code."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Test-Driven Development (TDD)">

**Test-Driven Development (TDD)** flips the traditional development process upside down. Instead of writing code and then writing tests to verify it, you write the test first, watch it fail, and then write the minimum amount of code required to make it pass.

## 1. The Red-Green-Refactor Cycle
TDD is driven by a strict, repetitive three-step cycle:

1. **Red**: Write a test for the next piece of functionality you want to add. Run the test suite. It will fail (show Red) because the functionality doesn't exist yet.
2. **Green**: Write the absolute simplest, ugliest, most hard-coded production code possible just to make that specific test pass (show Green).
3. **Refactor**: Now that the test passes, you have a safety net. Clean up the code, remove duplication, and apply design patterns, ensuring the test stays Green.

## 2. Why use TDD?
- **Forces Testable Design**: If you write the test first, you are forced to design your classes to be modular, decoupled, and easily mockable. You cannot accidentally write untestable spaghetti code.
- **YAGNI (You Aren't Gonna Need It)**: Because you only write code to make a failing test pass, TDD prevents you from over-engineering features that the requirements didn't ask for.
- **Fearless Refactoring**: The test suite grows organically with the codebase, providing a 100% reliable safety net for future changes.

<Callout icon="warning" title="The TDD Learning Curve">
TDD is notoriously difficult for beginners to adopt. It feels counter-intuitive and significantly slows down initial development speed. However, advocates argue that the time lost writing tests upfront is paid back tenfold by preventing long debugging sessions and regressions in the future.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Behaviour-driven development (BDD)/index.mdx': `---
title: Behaviour-Driven Development (BDD)
description: "An agile software development process that encourages collaboration among developers, QA, and non-technical business participants by defining system behavior in plain text."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Behaviour-Driven Development (BDD)">

While TDD focuses on *how* the code is written, **Behaviour-Driven Development (BDD)** focuses on *what* the system should do. It bridges the communication gap between technical teams and business stakeholders (Product Managers, Business Analysts) by using human-readable domain language.

## 1. The Gherkin Syntax
BDD relies on a structured natural language framework, most commonly **Gherkin** (used by tools like Cucumber). Scenarios are defined using TICK1GivenTICK1, TICK1WhenTICK1, and TICK1ThenTICK1 keywords.

${TICK3}gherkin
Feature: User Authentication
  As a registered user
  I want to log into the application
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    And the user has a registered account with email "john@example.com"
    When the user enters "john@example.com" and "password123"
    And the user clicks the login button
    Then the user should be redirected to the dashboard
    And a welcome message should be displayed
${TICK3}

## 2. Executable Specifications
The magic of BDD is that these plain-text files are actually executable code. Developers write "Step Definitions" (in Java, JavaScript, Python, etc.) that map to each line of the Gherkin text.
When the test suite runs, it reads the plain English text and executes the corresponding code, acting as a living, self-validating requirement document.

## 3. Benefits of BDD
- **Shared Understanding**: Eliminates ambiguity. The Product Manager writes the requirements, and the developer runs those exact requirements as tests.
- **Focus on User Value**: Forces the team to think about system behavior from the end-user's perspective rather than implementation details.

<Callout icon="warning" title="Maintenance Overhead">
Maintaining the mapping between the plain-text Gherkin steps and the underlying automation code can become a massive maintenance burden for QA teams. BDD is highly effective for complex domain logic but is often overkill for simple CRUD applications.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Mocking/index.mdx': `---
title: Mocking & Test Doubles
description: "The practice of creating simulated objects that mimic the behavior of real objects in controlled ways, used to isolate code during unit testing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Mocking & Test Doubles">

If you are unit testing a function that calculates a user's invoice, and that function internally makes a network call to the Stripe API, you have a problem. Your test will fail if the internet goes down, and you might accidentally charge a real credit card.

The solution is **Mocking** (more broadly known as using **Test Doubles**). You replace the real Stripe API client with a fake, simulated version that always returns a predictable, hard-coded response.

## 1. Types of Test Doubles (Gerard Meszaros' definitions)

<ComparisonTable 
  headers={['Type', 'Definition', 'Example']} 
  rows={[
    ['Dummy', 'Objects passed around but never actually used/executed. Used just to satisfy parameter lists.', 'Passing an empty TICK1{}TICK1 to a function that requires a config object but never reads it in the test path.'],
    ['Stub', 'Provides canned, hard-coded answers to calls made during the test.', 'A database stub that always returns TICK1[{id: 1, name: "Alice"}]TICK1 when queried.'],
    ['Spy', 'A stub that also records some information based on how it was called.', 'Recording that an TICK1emailService.send()TICK1 method was called exactly twice.'],
    ['Mock', 'Objects pre-programmed with expectations which form a specification of the calls they are expected to receive.', 'Asserting that the test fails if TICK1stripe.charge()TICK1 is NOT called with exactly $50.00.']
  ]} 
/>

## 2. Mocking Frameworks
Modern testing libraries come with powerful mocking utilities built-in.
- **JavaScript**: Jest (TICK1jest.fn()TICK1), Vitest.
- **Python**: TICK1unittest.mockTICK1.
- **Java**: Mockito.

## 3. The Danger of Over-Mocking
<Callout icon="warning" title="Testing Implementation, Not Behavior">
A common anti-pattern is mocking out every single internal function dependency. This creates highly brittle tests that break every time you rename a variable or refactor internal logic, even if the final output remains correct. Aim to mock *only* external I/O boundaries (Databases, Network APIs, File Systems, Dates/Randomness), while letting purely mathematical or logical helper functions run normally.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Snapshot testing/index.mdx': `---
title: Snapshot Testing
description: "A testing technique where the output of a component is captured and compared against a previously stored reference baseline to detect unexpected changes."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Snapshot Testing">

Traditional assertions verify specific values (e.g., TICK1expect(title).toBe('Hello')TICK1). **Snapshot Testing** is a much broader technique primarily used in Frontend development (React, Vue) to ensure UI components do not change unexpectedly.

## 1. How it Works
1. The first time a test runs, the testing framework renders the UI component (into a string of HTML or JSON) and saves it to a local file called a **Snapshot**.
2. The developer commits this snapshot file to version control (Git).
3. On subsequent test runs, the framework renders the component again and compares the new output to the saved snapshot.
4. If there is a 100% exact match, the test passes. If even a single CSS class or HTML tag differs, the test fails, highlighting a diff.

## 2. Updating Snapshots
If the test fails, the developer must inspect the diff.
- If the change was an accident (a regression), the developer fixes the code.
- If the change was intentional (the designer asked to change the button color from blue to red), the developer runs a command (e.g., TICK1jest -uTICK1) to overwrite the old snapshot with the new baseline.

## 3. Visual Regression Testing
While standard snapshot testing compares HTML/JSON strings, **Visual Snapshot Testing** compares actual pixels. Tools like Percy or Cypress take screenshots of a webpage rendered in a headless browser and use image-comparison algorithms to detect if a specific div shifted by 2 pixels to the left.

<Callout icon="warning" title="Snapshot Fatigue">
Because snapshots capture *everything*, they are incredibly brittle. Changing a global wrapper component might cause 500 snapshot tests to fail simultaneously. Developers often suffer from "Snapshot Fatigue," where they blindly press "Update Snapshots" without actually reviewing the diff, entirely defeating the purpose of the test.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Performance testing/index.mdx': `---
title: Performance & Load Testing
description: "Non-functional testing methodologies designed to determine how a system performs in terms of responsiveness and stability under a particular workload."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate title="Performance & Load Testing">

Unit and E2E tests ensure your application works for *one* user. **Performance Testing** ensures your application works when 10,000 users try to access it simultaneously. 

It is used to identify bottlenecks (e.g., slow database queries, memory leaks, insufficient CPU resources) before the application crashes in a production environment.

## 1. Types of Performance Tests

<ComparisonTable 
  headers={['Test Type', 'Goal', 'Example Scenario']} 
  rows={[
    ['Load Testing', 'Assess system behavior under anticipated, normal peak load conditions.', 'Testing an e-commerce site with 1,000 concurrent users adding items to a cart over 1 hour.'],
    ['Stress Testing', 'Push the system beyond normal limits to find its breaking point and observe how it fails.', 'Gradually increasing users to 50,000 until the database crashes. Does it fail gracefully?'],
    ['Spike Testing', 'Evaluate the system\\'s response to sudden, extreme bursts of traffic.', 'Simulating the exact moment a viral tweet drops, sending 10,000 users in 3 seconds.'],
    ['Soak Testing', 'Run a normal load over an extended period (hours or days) to find long-term issues.', 'Testing for memory leaks or gradual database fragmentation over a 48-hour period.']
  ]} 
/>

## 2. Key Metrics
When analyzing a performance test report (using tools like k6, JMeter, or Gatling), engineers look at:
- **Throughput**: Requests per second (RPS) the server successfully handles.
- **Latency / Response Time**: Measured in percentiles (e.g., the p95 response time is 200ms, meaning 95% of requests completed in under 200ms).
- **Error Rate**: The percentage of requests that returned 5xx server errors due to timeouts or crashes.

<Callout icon="tip" title="Testing in Production-like Environments">
Running a load test against your local developer laptop is useless. Performance tests must be run against a Staging environment that perfectly mirrors Production infrastructure (same server sizes, same load balancers, same database configurations).
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
