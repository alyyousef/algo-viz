import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/41. Testing/pytest/index.mdx': `---
title: pytest
description: "A mature, full-featured Python testing tool that mathematically simplifies writing test suites by leveraging native Python assert statements and an advanced dependency injection system via fixtures."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="pytest"
  subtitle="The Pythonic Testing Standard"
  tags={['Testing', 'Unit Testing', 'Python', 'Tooling']}
>

While Python's standard library includes TICK1unittestTICK1 (which forces developers into rigid, Java-style Object-Oriented TICK1TestCaseTICK1 classes), **pytest** embraces pure Pythonic simplicity.

## 1. Native Assertions
In TICK1unittestTICK1, developers must memorize 50 different methods like TICK1assertEqual()TICK1, TICK1assertTrue()TICK1, or TICK1assertDictContainsSubset()TICK1.
In pytest, you simply write standard mathematical Python:
TICK3python
def test_addition():
    assert 2 + 2 == 4
TICK3
If the test fails, pytest mathematically intercepts the AST (Abstract Syntax Tree) during execution and performs "Assertion Introspection," printing out exactly *why* it failed (e.g., TICK1assert 5 == 4TICK1), providing beautiful error messages without requiring custom assertion methods.

## 2. Advanced Fixtures
pytest replaces traditional setup/teardown methods with **Fixtures**, a powerful Dependency Injection system.
TICK3python
@pytest.fixture
def database():
    db = connect()
    yield db      # Test runs here
    db.close()    # Teardown happens automatically

def test_user(database): # pytest mathematically injects the fixture
    assert database.has_user("Alice")
TICK3
Fixtures can be mathematically scoped to run once per function, once per module, or once per entire test session, drastically reducing boilerplate and setup times.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Regression testing/index.mdx': `---
title: Regression Testing
description: "A mathematical verification process in software engineering performed after a code modification, designed to ensure that previously working, older functionality has not been accidentally broken by the new changes."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Regression Testing"
  subtitle="Preventing the Return of Old Bugs"
  tags={['Testing', 'Quality Assurance', 'Process', 'Agile']}
>

In a complex, mathematically coupled system, fixing a bug in the "Payment" module might accidentally break the "Shipping" module. A **Regression** is a software bug that makes a feature stop functioning as intended after a certain event (usually a code deployment).

## 1. The Regression Suite
A Regression Test Suite is a massive collection of Unit, Integration, and End-to-End tests that mathematically prove the *existing* system works.
When a developer writes a new feature, they add 5 new tests. But before the code is merged to the main branch, the CI/CD pipeline runs the entire Regression Suite (all 5,000 existing tests).
If test #2,412 (written three years ago) suddenly fails, the pipeline halts. The developer has caused a regression.

## 2. Bug Fix Driven Testing
A core rule of Regression Testing: **Every time a manual bug is reported in production, you must write an automated test for it before you fix it.**
If a user reports that "Typing a negative age crashes the app", the developer must:
1. Write a test that injects a negative age. Mathematically watch it fail (Red).
2. Fix the code.
3. Watch the test pass (Green).
This test is permanently added to the Regression Suite. The company mathematically guarantees that this specific bug will *never* reach production again.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Sanity testing/index.mdx': `---
title: Sanity Testing
description: "A narrow, focused mathematical subset of Regression Testing performed quickly on a new software build to verify that a specific bug fix or new feature is working correctly, before running the massive full regression suite."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Sanity Testing"
  subtitle="The Quick Verification Check"
  tags={['Testing', 'Quality Assurance', 'Process', 'Deployment']}
>

If a massive enterprise application takes 6 hours to run its full 10,000-test Regression Suite, QA cannot afford to run it for every minor typo fix.

## 1. Focused Verification
Sanity Testing is a highly targeted, unscripted check.
If the developer pushes a fix for the "Forgot Password" button, the QA engineer deploys the new build and performs a **Sanity Test**.
They do not test the shopping cart. They do not test the payment gateway. They mathematically execute only the exact path related to the "Forgot Password" flow.
- If it works: The build is "sane," and QA triggers the 6-hour Regression Suite.
- If it fails: The build is mathematically insane. QA instantly rejects the build and sends it back to the developer, saving 6 hours of testing time.

## 2. Sanity vs Smoke Testing
These are often confused, but mathematically distinct:
- **Smoke Testing**: Broad and shallow. It tests the entire system at a high level (Can you log in? Can you load the homepage?). The goal is to check if the app is physically on fire.
- **Sanity Testing**: Narrow and deep. It tests a very specific component deeply to verify a recent, specific code change.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Security testing/index.mdx': `---
title: Security Testing
description: "A specialized branch of software testing designed to mathematically uncover vulnerabilities, threats, and architectural risks in a system, ensuring data confidentiality, integrity, and availability."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Security Testing"
  subtitle="Mathematical Exploitation"
  tags={['Testing', 'Security', 'Process', 'Architecture']}
>

A standard Unit Test verifies that the system works when the user types a valid name. Security Testing mathematically verifies that the system survives when a hacker types TICK1' OR '1'='1TICK1.

## 1. DAST (Dynamic Application Security Testing)
While SAST tools read the source code statically, DAST tools mathematically attack the running application from the outside, acting like a hacker.
Tools like OWASP ZAP or Burp Suite intercept HTTP traffic and mathematically fuzz every single input field, cookie, and header with thousands of known exploit payloads (XSS, SQLi, CSRF, Path Traversal). If the application returns a raw database error or executes a malicious script, the DAST tool flags the vulnerability.

## 2. Penetration Testing (Pentesting)
Automated tools can only find mathematically known vulnerabilities. **Pentesting** involves hiring human ethical hackers to attack the system.
Humans chain vulnerabilities together. For example, a DAST tool might find a low-risk Info-Disclosure bug. A human pentester will combine that Info-Disclosure bug with a complex business-logic flaw to mathematically bypass the 2FA system and gain Administrator access—something automated scanners cannot comprehend.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Selenium/index.mdx': `---
title: Selenium
description: "The historical open-source standard for automating web browsers, providing a mathematical API to control Firefox, Chrome, and Edge via an external WebDriver protocol across a network."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Selenium"
  subtitle="The Original Browser Automator"
  tags={['Testing', 'E2E', 'Web', 'Tooling']}
>

Created in 2004, Selenium mathematically revolutionized software testing by allowing developers to write Java, Python, or C# code that actually opened a real web browser and clicked buttons.

## 1. The WebDriver Architecture
Selenium operates on an external client-server architecture.
1. The developer writes code: TICK1driver.findElement(By.id("submit")).click();TICK1
2. The code sends a mathematical REST API request to the **WebDriver** (a separate C++ executable running on the OS).
3. The WebDriver translates the REST request into a browser-specific command and sends it to Chrome.
This decoupled architecture allows Selenium to mathematically run tests on a remote server farm (like BrowserStack) testing Internet Explorer on Windows, while the code is running on a Mac in California.

## 2. The Flakiness Problem
Because Selenium operates outside the browser over a network, it is mathematically blind to the internal state of the JavaScript framework (React/Angular). 
If React takes 500ms to render a button, but Selenium tries to click it in 10ms, the test throws a TICK1NoSuchElementExceptionTICK1. Engineers must write extensive "Explicit Waits" (TICK1wait.until(ExpectedConditions.elementToBeClickable(...))TICK1) to mathematically synchronize the test with the DOM, leading to famously brittle and flaky test suites.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Smoke testing/index.mdx': `---
title: Smoke Testing
description: "A preliminary, rapid testing phase that mathematically checks the absolute most critical functions of a software build, determining if the build is stable enough to proceed with further, rigorous testing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Smoke Testing"
  subtitle="Checking for Fire"
  tags={['Testing', 'Quality Assurance', 'Process', 'Deployment']}
>

The term comes from hardware engineering: if you plug in a new circuit board and it physically starts smoking, you immediately unplug it. You don't bother testing the individual capacitors.

## 1. The Build Verification Test (BVT)
In software, a Smoke Test is mathematically the absolute minimum set of automated tests executed immediately after a deployment.
If you deploy a massive E-Commerce update, the Smoke Test executes exactly three mathematical paths:
1. Can the app connect to the Database? (HTTP 200 on health check).
2. Can a user log in?
3. Can a user add an item to a cart?
If *any* of these three tests fail, the build is instantly marked as "Broken".

## 2. The Fail-Fast Strategy
Smoke Testing is a mathematical "Fail-Fast" optimization.
It prevents QA engineers from wasting 4 hours testing edge-cases on a build where the database connection string is broken. Smoke tests are usually automated in the CI/CD pipeline, taking less than 5 minutes to run, mathematically blocking terrible deployments from ever reaching the Staging environment.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Stress testing/index.mdx': `---
title: Stress Testing
description: "An extreme form of performance testing designed to mathematically push a system far beyond its anticipated operational capacity until it physically breaks, in order to observe its failure modes and recovery."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Stress Testing"
  subtitle="Testing to Destruction"
  tags={['Testing', 'Performance', 'Architecture', 'DevOps']}
>

While Load Testing verifies that the system works at *expected* peaks (e.g., 5,000 users), **Stress Testing** mathematically demands that you push the system to 50,000 users with the explicit intent of destroying it.

## 1. Finding the Breaking Point
The primary mathematical goal of a Stress Test is to find the absolute breaking point.
You configure a tool like Gatling to slowly ramp up from 0 to 100,000 users over 1 hour. At some mathematical point, the system will snap.
- Does the API Gateway crash?
- Does the Database connection pool exhaust?
- Does the Redis cache run out of RAM?
Knowing exactly *where* the system breaks allows architects to mathematically provision auto-scaling rules (e.g., "When CPU hits 80%, spin up 3 more EC2 instances").

## 2. Observing Graceful Degradation
The secondary goal is to mathematically observe *how* the system dies.
- **Catastrophic Failure**: The database crashes, corrupting data, and the web server returns raw stack traces to the user.
- **Graceful Degradation**: The API Gateway detects the stress, activates a Circuit Breaker, mathematically drops new incoming connections with an HTTP 429 "Please Try Again Later", but successfully processes the users who are already in the checkout queue. Stress testing verifies that your fail-safes actually work.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Stubs/index.mdx': `---
title: Stubs
description: "A simple type of Test Double used in Unit Testing that provides pre-programmed, hardcoded, mathematically fixed answers to calls made during a test, completely ignoring any input variables."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Test Stubs"
  subtitle="Hardcoded Test Answers"
  tags={['Testing', 'Unit Testing', 'Clean Code', 'Patterns']}
>

When isolating a class for a Unit Test, you must mathematically sever its connection to external dependencies. A Stub is the simplest, "dumbest" way to do this.

## 1. The Brainless Double
A Stub contains absolutely no mathematical logic. It does not contain variables. It does not check arguments. It simply returns a fixed, hardcoded value.
Imagine testing a TICK1CheckoutServiceTICK1 that depends on an TICK1IWeatherAPITICK1. You do not want the test to fail just because it's raining outside.
TICK3java
class SunnyWeatherStub implements IWeatherAPI {
    // Mathematically ignores the zipcode argument
    public String getWeather(int zipcode) {
        return "SUNNY"; 
    }
}
TICK3
You inject the TICK1SunnyWeatherStubTICK1 into the test. The test is now mathematically deterministic; it will always execute the "sunny day" logic.

## 2. Stubs vs Mocks
- A **Stub** provides data *to* the system under test (State Verification). You use a Stub to force the code down a specific mathematical TICK1if/elseTICK1 path.
- A **Mock** verifies that the system under test called the dependency correctly (Behavior Verification). You use a Mock to assert that TICK1emailService.send()TICK1 was mathematically executed exactly one time.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Test doubles/index.mdx': `---
title: Test Doubles
description: "A generic mathematical term (analogous to a movie stunt double) encompassing any object used to replace a real dependency in a system for the purposes of isolated unit testing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Test Doubles"
  subtitle="The Stunt Doubles of Software"
  tags={['Testing', 'Unit Testing', 'Clean Code', 'Terminology']}
>

Gerard Meszaros coined the term "Test Double" to mathematically categorize the different ways engineers fake dependencies in Unit Tests. Many developers incorrectly call all of these "Mocks."

## 1. The 5 Types of Test Doubles
1. **Dummy**: Objects passed around just to satisfy the compiler (e.g., passing TICK1nullTICK1 or an empty string into a required parameter that the test mathematically doesn't care about).
2. **Stub**: Provides hardcoded answers to method calls (e.g., always returns TICK1trueTICK1).
3. **Spy**: A Stub that also secretly records mathematical data about how it was called (e.g., recording how many times TICK1sendEmail()TICK1 was executed so the test can assert it later).
4. **Mock**: An advanced object pre-programmed with mathematical *expectations*. If the Mock expects to be called twice, and the code only calls it once, the Mock itself throws an exception and fails the test.
5. **Fake**: A lightweight, mathematically functioning implementation of a dependency (e.g., an In-Memory Database that actually saves data to a RAM array).

## 2. The Danger of Over-Mocking
Using too many Test Doubles mathematically couples your Unit Tests to the *implementation details* of the code, rather than the output. If a test is 90% Mocks and 10% real code, the test will mathematically break every time you refactor a private method, creating massive technical debt.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Vitest/index.mdx': `---
title: Vitest
description: "A blazing fast, next-generation Unit Testing framework powered by Vite, mathematically designed to drop-in replace Jest while offering native TypeScript support, ESM compatibility, and instant Hot Module Reloading."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Vitest"
  subtitle="The Modern Successor to Jest"
  tags={['Testing', 'JavaScript', 'TypeScript', 'Tooling']}
>

For years, Jest was the king of JavaScript testing. However, as the ecosystem mathematically shifted to Native ES Modules (ESM) and Vite replaced Webpack, Jest's heavy reliance on CommonJS and Babel transpilation made it incredibly slow and difficult to configure.

## 1. The Vite Advantage
**Vitest** mathematically shares the exact same configuration file (TICK1vite.config.tsTICK1) and transformation pipeline as your main application.
If you use Vite to build your Vue or React app, Vitest instantly understands your aliases, CSS imports, and TypeScript settings without requiring any extra Babel plugins. Because it uses esbuild under the hood, Vitest executes tests mathematically faster than Jest.

## 2. API Compatibility
Vitest was architected to mathematically steal Jest's user base. It implements the exact same API (TICK1describeTICK1, TICK1itTICK1, TICK1expectTICK1, TICK1vi.fn()TICK1). An engineering team can migrate a massive Jest test suite to Vitest simply by changing the import statements, immediately gaining a 3x speed boost and native TypeScript support without rewriting thousands of tests.

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
