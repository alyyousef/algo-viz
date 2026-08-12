import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '41. Testing/Unit testing/index.mdx': `---
title: Unit Testing
description: The practice of testing individual units or components of a software in isolation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Unit Testing">

Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure. In object-oriented programming, a unit is often an entire interface, such as a class, but could be an individual method.

<Callout icon="tip" title="The Testing Pyramid">
  Unit tests form the massive foundational base of the Testing Pyramid. They should be incredibly fast to run (milliseconds) and highly numerous. A healthy codebase might have thousands of unit tests that run every time a developer saves a file.
</Callout>

## The AAA Pattern

Nearly all unit tests follow the industry-standard AAA pattern:

<ComparisonTable 
  headers={['Step', 'Name', 'Description']}
  rows={[
    ['1', 'Arrange', 'Set up the conditions for the test. Initialize objects, set variables, and prepare any necessary mock data.'],
    ['2', 'Act', 'Execute the specific function or method you are trying to test.'],
    ['3', 'Assert', 'Verify that the result of the action matches your expected outcome.']
  ]}
/>

## Example: Jest / Vitest

\`\`\`javascript
// math.js
export const add = (a, b) => a + b;

// math.test.js
import { add } from './math';

test('adds positive numbers correctly', () => {
  // Arrange
  const a = 5;
  const b = 10;
  
  // Act
  const result = add(a, b);
  
  // Assert
  expect(result).toBe(15);
});
\`\`\`

## Architecture of Isolation

A true unit test must be completely isolated. It cannot hit a real database, make a real network request, or interact with the file system. Doing so makes it an Integration Test.

<ArchitectureDiagram chart={\`
graph TD
  Test[Unit Test]
  
  subgraph The Unit
    Func[Pure Function\\n(Business Logic)]
  end
  
  DB[(Database)]
  API[External API]
  
  Test --> Func
  Func -. "NOT ALLOWED" .-> DB
  Func -. "NOT ALLOWED" .-> API
\`} />

</TechnologyTemplate>
`,
  '41. Testing/Integration testing/index.mdx': `---
title: Integration Testing
description: Testing how different components or systems work together.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Integration Testing">

Integration testing is the phase in software testing in which individual software modules are combined and tested as a group. While unit tests verify that a function works in perfect isolation, integration tests verify that the function still works when hooked up to a real database, a real file system, or another service.

<Callout icon="warning" title="The Integration Hell">
  Historically, teams would write thousands of unit tests in isolation, assume everything was fine, and then try to wire everything together at the very end of the project. This led to "Integration Hell"—where nothing actually worked together. Modern CI/CD practices enforce continuous integration testing to prevent this.
</Callout>

## Unit vs Integration

<ComparisonTable 
  headers={['Trait', 'Unit Tests', 'Integration Tests']}
  rows={[
    ['Scope', 'A single function or class', 'Multiple components working together'],
    ['Speed', 'Extremely fast (milliseconds)', 'Slower (seconds or minutes)'],
    ['Dependencies', 'Mocks and Stubs only', 'Real Databases, Files, or external modules'],
    ['Reliability', 'Highly deterministic', 'Prone to flakiness (e.g. network timeouts)']
  ]}
/>

## Architecture

In an integration test, you actively want to test the *boundaries* between systems.

<ArchitectureDiagram chart={\`
graph LR
  Test[Integration Test]
  
  subgraph System Under Test
    Service[User Service]
    DB[(Test Database)]
    
    Service <--> DB
  end
  
  Test -- "1. Seed Data" --> DB
  Test -- "2. Call Service" --> Service
  Test -- "3. Verify DB State" --> DB
\`} />

## Test Containers

A modern best practice for integration testing is using **Testcontainers**. Instead of mocking a database or relying on a fragile shared staging database, the test suite spins up a lightweight, ephemeral Docker container (like a real PostgreSQL instance), runs the tests against it, and instantly destroys the container when finished.

</TechnologyTemplate>
`,
  '41. Testing/End-to-end testing/index.mdx': `---
title: End-to-End (E2E) Testing
description: Testing the entire application from start to finish, exactly as a real user would experience it.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="End-to-End (E2E) Testing">

End-to-end (E2E) testing is a methodology used to test whether the flow of an application is performing as designed from start to finish. The purpose of carrying out end-to-end tests is to identify system dependencies and to ensure that the right information is passed between various system components and systems.

<Callout icon="error" title="The Top of the Pyramid">
  E2E tests sit at the very top of the Testing Pyramid. Because they launch real browsers, click real buttons, and hit real backend servers, they are incredibly slow, expensive to maintain, and highly prone to flakiness. You should only write E2E tests for the most critical user journeys (e.g., the Checkout Flow).
</Callout>

## Popular Frameworks

<ComparisonTable 
  headers={['Framework', 'Description']}
  rows={[
    ['Cypress', 'A wildly popular JavaScript-based E2E framework that runs directly inside the browser, offering excellent debugging and time-travel capabilities.'],
    ['Playwright', 'Built by Microsoft, supports multiple languages (JS, Python, Java) and natively supports parallel execution across Chromium, WebKit, and Firefox.'],
    ['Selenium', 'The ancient, heavy-duty industry standard. Uses WebDriver to control browsers. Highly robust but slower and harder to set up than modern alternatives.']
  ]}
/>

## How It Works

An E2E test doesn't know about your code. It doesn't call functions. It simply opens a browser, finds elements on the screen, and interacts with them.

\`\`\`javascript
// Playwright Example
test('User can log in', async ({ page }) => {
  await page.goto('https://myapp.com/login');
  
  // Interact exactly like a user
  await page.fill('#email', 'user@example.com');
  await page.fill('#password', 'secret123');
  await page.click('button[type="submit"]');
  
  // Assert the UI updated
  await expect(page.locator('.welcome-message')).toHaveText('Welcome, User!');
});
\`\`\`

## Architecture

<ArchitectureDiagram chart={\`
graph TD
  E2E[E2E Test Runner\\n(Playwright/Cypress)]
  
  Browser[Headless Browser\\n(Chrome)]
  
  Frontend[React / Vue Frontend]
  Backend[Node.js / Go Backend]
  DB[(Production-like DB)]
  ThirdParty[Stripe API]
  
  E2E -- Controls --> Browser
  Browser -- Clicks/Types --> Frontend
  Frontend -- HTTP / REST --> Backend
  Backend <--> DB
  Backend <--> ThirdParty
\`} />

</TechnologyTemplate>
`,
  '41. Testing/Mocking/index.mdx': `---
title: Mocking
description: Creating fake versions of external dependencies so that you can unit test code in complete isolation.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Mocking">

Mocking is a process used in unit testing where the unit being tested has external dependencies. The purpose of mocking is to isolate and focus on the code being tested and not on the behavior or state of external dependencies. In mocking, the dependencies are replaced by closely controlled replacements objects that simulate the behavior of the real ones.

<Callout icon="tip" title="Why Mock?">
  If you are testing a function that sends an email to a user, you DO NOT want your test suite to actually send thousands of spam emails every time it runs. You mock the email service so it just *pretends* to send the email and returns a success code.
</Callout>

## Types of Test Doubles

"Test Double" is the generic term for any fake object (like a stunt double in a movie). Mocks are just one type.

<ComparisonTable 
  headers={['Type', 'Description']}
  rows={[
    ['Dummy', 'Objects that are passed around but never actually used. Usually just used to fill parameter lists.'],
    ['Stub', 'Provides canned, hard-coded answers to calls made during the test (e.g., \`return true\`).'],
    ['Spy', 'A stub that also records some information based on how it was called (e.g., "Was I called exactly 3 times?").'],
    ['Mock', 'Pre-programmed with expectations which form a specification of the calls they are expected to receive.']
  ]}
/>

## Example: Mocking an API Call

Instead of waiting for a slow API over the internet, we force the fake API to return exactly what we want instantly.

\`\`\`javascript
import { fetchUserData } from './api';
import { displayUser } from './ui';

// Tell Jest to replace the real file with a fake one
jest.mock('./api');

test('displays user name', async () => {
  // Arrange: Force the mock to return specific data
  fetchUserData.mockResolvedValue({ name: 'Alice' });
  
  // Act
  const uiText = await displayUser(123);
  
  // Assert
  expect(uiText).toBe('Hello, Alice');
  expect(fetchUserData).toHaveBeenCalledWith(123); // Spy behavior
});
\`\`\`

## Architecture of a Mock

<ArchitectureDiagram chart={\`
graph LR
  Test[Unit Test]
  
  Func[Business Logic]
  
  subgraph Dependency Injection
    Real[Real Email Service\\n(Sends real emails)]
    Mock[Mock Email Service\\n(Does nothing, returns True)]
  end
  
  Test -- Tests --> Func
  Test -- Injects Mock --> Func
  Func --> Mock
  Func -.-x Real
\`} />

</TechnologyTemplate>
`,
  '41. Testing/Test-driven development (TDD)/index.mdx': `---
title: Test-Driven Development (TDD)
description: A software development process relying on software requirements being converted to test cases before software is fully developed.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Test-Driven Development (TDD)">

Test-driven development (TDD) is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases. This is opposed to software being developed first and test cases created later.

<Callout icon="info" title="The Mindset Shift">
  In traditional development, you write code, then write a test to prove it works. 
  
  In TDD, you write a test that *fails*, and then you write the exact minimum amount of code required to make that test pass. You design the API of your code from the perspective of the *consumer* (the test) first.
</Callout>

## The Red-Green-Refactor Cycle

TDD is entirely built around a strict, rapid, continuous loop known as Red-Green-Refactor.

<ComparisonTable 
  headers={['Phase', 'Action', 'Description']}
  rows={[
    ['🔴 Red', 'Write a Failing Test', 'Write a small test for a new feature. Run it. It MUST fail (because the feature doesn\\'t exist yet). If it passes, your test is broken.'],
    ['🟢 Green', 'Make it Pass', 'Write the absolute simplest, ugliest, fastest code possible just to make the test pass. Do not worry about architecture.'],
    ['🔵 Refactor', 'Clean it Up', 'Now that the test passes, refactor the ugly code into clean, well-designed code. The passing test acts as a safety net ensuring you didn\\'t break anything.']
  ]}
/>

## Why use TDD?

1. **Prevents Over-engineering**: Because you are only allowed to write code that makes a test pass, you never write massive, speculative architectural frameworks that you don't actually need yet.
2. **High Code Coverage**: By definition, 100% of your production code was written in response to a test, resulting in incredibly high test coverage.
3. **Living Documentation**: The tests serve as perfect, executable documentation for how the code is supposed to be used.

## Architecture of the Loop

<ArchitectureDiagram chart={\`
graph TD
  Start[Start New Feature]
  
  Red[1. Write a Test\\n(It Fails: RED)]
  Green[2. Write Minimum Code\\n(It Passes: GREEN)]
  Refactor[3. Refactor Code\\n(Stays GREEN)]
  
  Start --> Red
  Red --> Green
  Green --> Refactor
  Refactor -- Loop for next feature --> Red
\`} />

</TechnologyTemplate>
`,
}

async function generateTesting() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateTesting().catch(console.error)
