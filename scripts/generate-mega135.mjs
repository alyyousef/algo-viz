import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/41. Testing/JMeter/index.mdx': `---
title: Apache JMeter
description: "A legendary, open-source, Java-based desktop application designed to mathematically simulate heavy loads on a server, network, or object to test its strength or to analyze overall performance under different load types."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Apache JMeter"
  subtitle="The Original Load Tester"
  tags={['Testing', 'Performance', 'Tooling', 'Java']}
>

Before modern asynchronous tools like Gatling or k6 existed, Apache JMeter was the absolute industry standard for Load Testing.

## 1. Thread-Based Simulation
JMeter operates on a mathematically simple paradigm: **One Thread = One Virtual User**.
Using a graphical XML-based interface, the QA engineer configures a "Thread Group". If they set the Thread Count to 500, JMeter will ask the Java Virtual Machine to spawn exactly 500 physical OS threads. Each thread executes the HTTP requests sequentially, perfectly simulating 500 independent humans clicking around a website.

## 2. The Scaling Limitation
Because physical OS threads are mathematically heavy (each requiring a dedicated block of RAM), a single machine running JMeter often maxes out its own CPU/Memory at around 1,000 to 2,000 threads.
If a company needs to mathematically simulate 50,000 concurrent users for Black Friday, they cannot run JMeter on one laptop. They must configure a **Distributed JMeter Cluster**, where one "Master" JMeter node orchestrates 25 "Slave" EC2 instances, firing coordinated HTTP requests at the target server simultaneously.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/JUnit/index.mdx': `---
title: JUnit
description: "The foundational Unit Testing framework for the Java programming language, heavily utilizing mathematical annotations and reflection to automate the execution and validation of isolated code blocks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="JUnit"
  subtitle="The Father of xUnit"
  tags={['Testing', 'Unit Testing', 'Java', 'Tooling']}
>

Created by Kent Beck and Erich Gamma, JUnit is the mathematical blueprint for almost every testing framework in existence today (the "xUnit" family, which inspired NUnit, PyTest, and PHPUnit).

## 1. Annotation-Driven Execution
Before JUnit 4, developers had to name their methods with specific prefixes (e.g., TICK1testCalculateTICK1) so the framework could find them via reflection.
JUnit revolutionized this by introducing mathematical **Annotations**.
TICK3java
@Test
@DisplayName("Addition should work mathematically")
public void shouldAddNumbers() {
    assertEquals(4, calculator.add(2, 2));
}
TICK3
The JUnit runner scans the compiled bytecode for the TICK1@TestTICK1 annotation and executes them in a mathematically isolated environment.

## 2. Assertions and Lifecycle
JUnit mathematically defines the test lifecycle:
- TICK1@BeforeEachTICK1 / TICK1@AfterEachTICK1: Mathematically guarantees a clean fixture state before every single test.
- TICK1@BeforeAllTICK1 / TICK1@AfterAllTICK1: Executes exactly once per class (useful for spinning up a heavy Docker container).
- **Assertions**: The mathematical core of the test (TICK1assertTrueTICK1, TICK1assertThrowsTICK1). If the assertion fails, JUnit intercepts the exception and marks the test as red in the IDE.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/k6/index.mdx': `---
title: k6
description: "A modern, open-source load testing tool developed by Grafana, designed specifically for developers, allowing them to write mathematically complex performance tests using standard JavaScript (ES6)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="k6"
  subtitle="Developer-Centric Load Testing"
  tags={['Testing', 'Performance', 'DevOps', 'JavaScript']}
>

Historically, load testing was done by isolated QA teams using clunky GUI tools like JMeter. k6 brings load testing mathematically back to the developers by making it pure code.

## 1. JavaScript API, Go Engine
The brilliant architectural trick of k6 is that you write the tests in familiar JavaScript, but the tests are executed by a highly optimized mathematical engine written in **Go (Golang)**.
TICK3javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = { vus: 1000, duration: '30s' };

export default function () {
  let res = http.get('https://api.example.com/data');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
TICK3
Because Go uses lightweight "Goroutines" instead of heavy OS threads, a single laptop running k6 can mathematically generate tens of thousands of concurrent virtual users (VUs) without crashing, completely outperforming JMeter.

## 2. Observability Integration
Because k6 is owned by Grafana, it is mathematically designed for modern DevOps. Instead of generating static HTML reports, k6 streams its performance metrics (latency, throughput, error rates) in real-time directly into InfluxDB, Datadog, or Prometheus, allowing engineers to watch the system buckle live on their Grafana dashboards.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Load testing/index.mdx': `---
title: Load Testing
description: "A mathematical subset of performance testing that specifically measures a system's behavior under anticipated peak load conditions, verifying that architecture and databases can handle concurrent user stress."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Load Testing"
  subtitle="Preparing for the Surge"
  tags={['Testing', 'Performance', 'Architecture', 'DevOps']}
>

If an algorithm runs in O(N^2) time, it might execute in 1 millisecond for 1 user. But if 1,000 users execute it simultaneously, the mathematical exponential growth will instantly crash the server CPU.

## 1. The Goal of Load Testing
The goal is *not* to break the system (that is called "Stress Testing").
The goal of Load Testing is to mathematically verify that the system can handle its **Service Level Agreement (SLA)** under expected peak conditions.
Example Requirement: *"The API must maintain a P99 latency of < 200ms when handling 5,000 concurrent active connections."*

## 2. The Bottleneck Hunt
When the load test runs (using tools like Gatling or k6), the system will mathematically begin to degrade. The engineer's job is to find the bottleneck:
- **CPU Spikes**: Indicates inefficient algorithms, heavy JSON serialization, or lack of caching.
- **Memory Leaks**: The RAM mathematically fills up until the garbage collector panics (OOM - Out of Memory).
- **Database Connection Pool Exhaustion**: The web server is mathematically fine, but the database can only handle 100 concurrent connections, forcing the 101st user to wait in a queue, spiking latency to 10 seconds.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Locust/index.mdx': `---
title: Locust
description: "An easy-to-use, distributed, user load testing tool intended for load-testing web sites and systems, mathematically allowing developers to define user behavior purely in Python code."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Locust"
  subtitle="Python-Powered Load Testing"
  tags={['Testing', 'Performance', 'Python', 'Tooling']}
>

While k6 uses JavaScript and Gatling uses Scala, **Locust** brings load testing to the massive Python ecosystem.

## 1. Swarming the Server
Locust operates on the mathematical concept of a "Swarm."
Developers write a Python script defining the exact mathematical behavior of a single user.
TICK3python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def view_product(self):
        self.client.get("/product/42")
TICK3
When the developer clicks "Start Swarming" in the Locust web UI, the tool uses Python's TICK1geventTICK1 (asynchronous coroutines) to spawn thousands of virtual users, all executing the Python logic simultaneously.

## 2. Highly Complex User Scenarios
Because Locust tests are just standard Python files, developers can write incredibly complex mathematical scenarios. A Locust user can read a CSV file, execute an algorithm, calculate an HMAC-SHA256 signature, and then send the HTTP request. This makes Locust the premier tool for load testing highly secure, mathematically complex APIs that require custom data manipulation before every request.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Mutation testing/index.mdx': `---
title: Mutation Testing
description: "The ultimate mathematical validation of a test suite, where an automated tool intentionally injects bugs (mutations) into the source code to verify that the unit tests mathematically fail and catch the sabotage."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Mutation Testing"
  subtitle="Testing the Tests"
  tags={['Testing', 'Advanced', 'Quality Assurance', 'Process']}
>

"Code Coverage" is mathematically a lie. A developer can write a Unit Test that executes every line of a function, achieving 100% Code Coverage, but forget to write a single TICK1assert()TICK1 statement. The test is useless.

## 1. Injecting Mathematical Mutants
Mutation Testing solves this by mathematically sabotaging the source code.
Tools like Stryker (JS) or PIT (Java) parse the code and create "Mutants".
Original code: TICK1if (age >= 18)TICK1
Mutant 1: TICK1if (age > 18)TICK1
Mutant 2: TICK1if (age < 18)TICK1
Mutant 3: TICK1if (true)TICK1

## 2. Surviving Mutants
The tool mathematically compiles Mutant 1 and runs your Unit Test suite against it.
- If your Unit Test fails (because it caught the bug), the Mutant is **Killed**. This is a good thing; your test suite works.
- If your Unit Test passes (despite the code being mathematically broken), the Mutant **Survives**. This proves your test suite is weak and missing critical assertions.
Mutation Testing is incredibly CPU-intensive (requiring thousands of compilations), but it is the absolute mathematical gold standard for software quality.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/NUnit/index.mdx': `---
title: NUnit
description: "An open-source unit testing framework for Microsoft .NET, originally ported from JUnit, utilizing C# attributes to mathematically define, organize, and execute automated tests."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="NUnit"
  subtitle="The Standard for C# and .NET"
  tags={['Testing', 'Unit Testing', '.NET', 'C#']}
>

While Microsoft provides its own testing framework (MSTest), NUnit (and increasingly xUnit.net) is the mathematical standard for the open-source C# ecosystem.

## 1. Attributes and Assertions
Like JUnit, NUnit relies on mathematical Attributes applied to classes and methods.
TICK3csharp
[TestFixture]
public class CalculatorTests
{
    [Test]
    public void Addition_Should_Work()
    {
        Assert.That(2 + 2, Is.EqualTo(4));
    }
}
TICK3
The TICK1Assert.That()TICK1 syntax is NUnit's "Constraint Model," allowing developers to write mathematically readable assertions (e.g., TICK1Assert.That(array, Has.Exactly(1).EqualTo("Apple"))TICK1).

## 2. Parameterized Tests
NUnit mathematically excels at Data-Driven Testing.
Instead of writing 5 separate tests to check 5 different passwords, a developer uses the TICK1[TestCase]TICK1 attribute.
TICK3csharp
[TestCase("password123", false)]
[TestCase("Secure!99", true)]
public void Test_Password_Strength(string pass, bool expected)
{
    Assert.That(Validator.Check(pass), Is.EqualTo(expected));
}
TICK3
The NUnit runner will mathematically execute the exact same test method twice, injecting the different parameters, drastically reducing code duplication and adhering to DRY principles.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Playwright/index.mdx': `---
title: Playwright
description: "A modern, extremely fast End-to-End testing framework developed by Microsoft that mathematically controls Chromium, Firefox, and WebKit via a single API, offering native auto-waiting and network interception."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Playwright"
  subtitle="The Successor to Cypress and Selenium"
  tags={['Testing', 'E2E', 'Tooling', 'Web']}
>

While Cypress dominated the 2010s by running inside the browser, it had a fatal mathematical flaw: it couldn't easily test multiple browser tabs, iframes, or Safari. Microsoft built Playwright to solve everything.

## 1. Out-of-Process Architecture
Playwright operates *outside* the browser, using modern WebSocket-based debugging protocols (like Chrome DevTools Protocol) instead of the old, slow WebDriver protocol used by Selenium.
This allows Playwright to mathematically control the browser at a fundamental level. It can simulate mobile devices, geolocation, offline network states, and interact across multiple tabs and iframes simultaneously.

## 2. Tracing and Debugging
When a Playwright test fails in CI/CD, debugging is mathematically trivial.
Playwright generates a **Trace Viewer**. This is a zip file that contains a mathematically perfect snapshot of the DOM, the network requests, and the console logs for every single millisecond of the test. A developer can literally scrub a timeline slider back and forth to see exactly what the web page looked like the exact millisecond the test clicked the button, completely eliminating the mystery of "flaky tests."

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Postman/index.mdx': `---
title: Postman
description: "An API platform and GUI client used by millions of developers to mathematically construct, execute, and save complex HTTP requests, transitioning API testing from the command-line to a collaborative workspace."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Postman"
  subtitle="The API Testing GUI"
  tags={['Testing', 'API', 'Tooling', 'Process']}
>

Before Postman, developers had to mathematically construct complex API requests using the TICK1curlTICK1 command in the terminal, manually pasting 50-line JSON strings and Authorization headers, which was incredibly error-prone.

## 1. The Graphical Request Builder
Postman provides a UI where developers mathematically assemble an HTTP request.
You select TICK1POSTTICK1 from a dropdown, paste the URL, type headers into a table, and write a JSON body. Postman executes the request and perfectly formats the JSON response, highlighting syntax and calculating the exact network latency in milliseconds.

## 2. Automated Test Scripts
Postman is not just a manual client; it is a full mathematical testing framework.
Developers can write JavaScript code in the "Tests" tab of a request:
TICK3javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("User ID is numeric", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.be.a('number');
});
TICK3
Using **Newman** (Postman's CLI runner), a company can take a Collection of 500 Postman API requests, and mathematically execute all 500 tests in parallel during the CI/CD pipeline, ensuring the backend API is perfectly stable before deploying.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/41. Testing/Property-based testing/index.mdx': `---
title: Property-Based Testing
description: "An advanced mathematical testing paradigm where the developer defines the universal properties a function must hold true, and the framework automatically generates thousands of randomized inputs to attempt to break those properties."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Property-Based Testing"
  subtitle="Mathematical Proof by Fuzzing"
  tags={['Testing', 'Advanced', 'Mathematics', 'Functional Programming']}
>

In a standard Unit Test, the developer manually hardcodes specific inputs: TICK1assert(sort([3,1,2]) == [1,2,3])TICK1. The problem is that human developers mathematically suffer from confirmation bias; they only test the scenarios they anticipate.

## 1. Defining the Invariants
In Property-Based Testing (popularized by Haskell's QuickCheck), you do not provide specific inputs. You define the mathematical **Properties** (Invariants) that must always be true, regardless of the input.
If testing a TICK1sort()TICK1 function, the properties are:
1. The output array must be exactly the same length as the input array.
2. Every element in the output array must be TICK1<=TICK1 the next element.

## 2. Automated Fuzzing
Once the properties are defined, the framework takes over. It mathematically generates 10,000 completely random, bizarre arrays (empty arrays, arrays with negative numbers, arrays with 10 million identical numbers, arrays with nulls).
It feeds all 10,000 into the TICK1sort()TICK1 function. If even one random array causes the length to change, the test fails, and the framework mathematically "shrinks" the failing array down to the smallest possible example that triggers the bug, uncovering edge cases a human would never dream of testing.

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
