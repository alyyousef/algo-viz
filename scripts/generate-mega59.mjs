import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/Gremlin/index.mdx': `---
title: Gremlin
description: The graph traversal language of Apache TinkerPop, designed to mathematically describe complex paths through graph databases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Gremlin">

Created in 2009 by Marko Rodriguez, Gremlin is a functional, data-flow language that serves as the query language for the Apache TinkerPop graph computing framework. While Cypher uses ASCII-art to match patterns, Gremlin uses mathematical functional steps to traverse the graph.

## 1. The Functional Pipeline
A Gremlin query is a chain of mathematical operations, heavily inspired by functional programming (like map, filter, and reduce).
TICK3groovy
g.V().has('name', 'John').out('knows').out('knows').values('name')
TICK3
This mathematically reads as: "Get the graph (TICK1gTICK1), find all Vertices (TICK1V()TICK1), filter for the name 'John', step out to his friends, step out to their friends, and map the output to their names."

## 2. Turing Completeness
Unlike Cypher or SQL, which are strictly declarative, Gremlin is Turing-complete. You can mathematically write loops, variables, and complex conditional branching logic directly inside the traversal pipeline. Because Gremlin can be embedded in almost any host language (Java, Python, Javascript), the traversal steps compile directly into native objects, allowing seamless integration between application code and database queries.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/JMESPath/index.mdx': `---
title: JMESPath
description: A deeply mathematical query language for extracting and transforming elements from massive JSON documents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JMESPath">

JMESPath (JSON Matching Expression Paths) is a mathematical query language specifically designed for JSON. It is the underlying technology that powers the AWS Command Line Interface (CLI) TICK1--queryTICK1 parameter.

## 1. Declarative Extraction
When hitting an API that returns 5,000 lines of deeply nested JSON, writing a Python script with nested TICK1forTICK1 loops and TICK1try/exceptTICK1 blocks to extract specific values is mathematically fragile.
JMESPath solves this by providing a declarative query string.
TICK3jmespath
locations[?state == 'WA'].name | sort(@)
TICK3
This mathematically instructs the parser to: "Go into the TICK1locationsTICK1 array, filter (TICK1?TICK1) only the objects where the state is 'WA', extract only the TICK1nameTICK1 field, and pipe (TICK1|TICK1) the resulting array into a sorting function."

## 2. Cross-Language Consistency
JMESPath is mathematically rigorously defined by a formal specification. Unlike regex or custom JSON parsers, a JMESPath query is mathematically guaranteed to return the exact same result whether you run it in Python, Go, Rust, or Javascript, making it an incredibly reliable standard for microservice communication.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/JSONPath/index.mdx': `---
title: JSONPath
description: The spiritual successor to XPath, designed to mathematically query and extract data from JSON structures.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="JSONPath">

Proposed by Stefan Goessner in 2007, JSONPath was created to bring the mathematical querying power of XPath (used for XML) to JSON documents.

## 1. Syntax and Traversal
JSONPath uses a dot-notation syntax combined with mathematical brackets to traverse the document tree. The root object is always represented by TICK1$TICK1.
- TICK1$.store.book[*].authorTICK1 : Mathematically extracts all authors from every book in the store.
- TICK1$..book[?(@.price < 10)]TICK1 : Mathematically performs a deep recursive descent (TICK1..TICK1) finding any book anywhere in the document that costs less than 10.

## 2. Standardization Issues
Unlike JMESPath, which has a strict mathematical specification, JSONPath was originally just a blog post. As a result, different programming languages implemented JSONPath with slightly different mathematical behaviors (especially regarding how filters and arrays are handled). While incredibly useful for quick data extraction, this lack of strict standardization can cause bugs when migrating queries between backend systems.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/KQL (Kusto)/index.mdx': `---
title: KQL (Kusto Query Language)
description: Microsoft's immensely powerful query language designed for real-time analytics on massive streams of telemetry and log data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="KQL (Kusto Query Language)">

Created by Microsoft for the Azure Data Explorer (project name "Kusto"), KQL is a highly mathematical, read-only query language explicitly built to process petabytes of telemetry and log data in near real-time.

## 1. The Piped Data Flow
While SQL mathematically nests queries inside out (TICK1SELECT ... FROM (SELECT ...)TICK1), KQL uses a left-to-right, pipeline-based mathematical approach (heavily inspired by PowerShell and Bash).
TICK3kql
StormEvents 
| where StartTime between (datetime(2007-11-01) .. datetime(2007-12-01))
| where State == "FLORIDA"
| count
TICK3
This mathematical flow—taking a massive table, streaming it through a time filter, streaming that through a state filter, and aggregating the result—makes reading and writing complex analytical queries significantly easier than SQL.

## 2. Built for Telemetry
KQL is not designed for transactional updates (there is no TICK1UPDATETICK1 or TICK1INSERTTICK1). It is mathematically optimized for time-series analysis, unstructured text searching (like parsing gigabytes of error logs using Regex instantly), and statistical aggregations (percentiles, moving averages) required by modern DevOps and Cloud telemetry dashboards.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/MDX/index.mdx': `---
title: MDX
description: MultiDimensional eXpressions, the query language used to mathematically slice, dice, and query complex OLAP Data Cubes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="MDX (MultiDimensional eXpressions)">

Created by Microsoft in 1997 for SQL Server Analysis Services, MDX is a query language designed specifically for **OLAP (Online Analytical Processing) Cubes**. 

## 1. Multidimensional Mathematics
SQL is mathematically designed to query two-dimensional tables (Rows and Columns). 
MDX is designed to query N-dimensional mathematical Cubes. 
If a corporation has data categorized by Time, Geography, Product, and Salesperson, that data mathematically exists in a 4-dimensional hypercube. MDX allows an analyst to mathematically "slice" this cube (e.g., locking Time to 2023) and "dice" it (e.g., looking at Geography vs Product) instantly, because the cube has pre-calculated the mathematical intersections.

## 2. Tuples and Sets
The fundamental mathematical units of MDX are not rows, but Tuples and Sets.
- A **Tuple** defines a specific, multidimensional intersection in the cube: TICK1([Geography].[City].[New York], [Time].[Year].[2023])TICK1.
- A **Set** is an ordered mathematical collection of Tuples.
While the syntax resembles SQL (TICK1SELECT ... FROM ... WHERETICK1), the mathematical execution is entirely different. An MDX query does not scan tables; it mathematically maps geometric coordinates on the cube to return pre-aggregated numerical values.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/PL-pgSQL/index.mdx': `---
title: PL/pgSQL
description: The procedural language extension for PostgreSQL, adding mathematical loops, variables, and complex logic directly inside the database engine.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PL/pgSQL">

SQL is a declarative language (you state *what* you want, not *how* to get it). PL/pgSQL (Procedural Language/PostgreSQL) is an imperative programming language mathematically embedded directly inside the PostgreSQL database engine.

## 1. Moving Logic to Data
In a standard application architecture, a Node.js server queries data from the database, pulls it across the network into RAM, performs mathematical calculations, and sends the update back. 
If the data involves 5 million rows, moving it across the network is mathematically catastrophic for performance.
PL/pgSQL allows you to write TICK1IF/ELSETICK1 statements, TICK1WHILETICK1 loops, and variable assignments directly in the database. You compile this logic into a Stored Procedure. When executed, the mathematical logic runs directly on the database CPU, touching the physical disk immediately without any network latency.

## 2. Triggers
PL/pgSQL is most commonly used to write **Triggers**. A Trigger is a mathematical rule that automatically executes a function when a specific event occurs (e.g., TICK1BEFORE INSERTTICK1). This allows database administrators to mathematically enforce complex data integrity rules (like updating an audit log or recalculating a live inventory count) universally, regardless of which backend application is accessing the database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/PL-SQL/index.mdx': `---
title: PL/SQL
description: Oracle's proprietary procedural extension to SQL, providing immense mathematical power and exception handling for enterprise databases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PL/SQL">

Introduced by Oracle in the late 1980s, PL/SQL (Procedural Language/Structured Query Language) is the heavyweight enterprise standard for database programming. It mathematically extends standard SQL with procedural features from the Ada programming language.

## 1. The Block Structure
A PL/SQL program is mathematically organized into blocks:
TICK3sql
DECLARE
   -- Mathematical Variables defined here
BEGIN
   -- Execution logic (Loops, IF statements, SQL queries)
EXCEPTION
   -- Mathematical error handling
END;
TICK3
This structure allows developers to wrap complex, multi-step transactional logic into a single, mathematically secure block. If an error occurs on step 4 of 5, the TICK1EXCEPTIONTICK1 block mathematically catches the error and rolls back the entire transaction, ensuring absolute data integrity in massive financial systems.

## 2. Performance and Packages
Oracle mathematically optimizes PL/SQL execution by integrating the engine directly with the SQL execution engine. Furthermore, it supports **Packages**—encapsulated modules of variables, procedures, and functions (similar to a Class in Java). This allows banks and telecom companies to build massive, highly structured, Object-Oriented software architectures entirely within the Oracle database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/PromQL/index.mdx': `---
title: PromQL
description: The deeply mathematical querying language for Prometheus, designed to extract insights from multi-dimensional time-series metrics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="PromQL">

PromQL (Prometheus Query Language) is a functional mathematical language used to query the Prometheus time-series database. It is the absolute standard for monitoring modern Kubernetes and microservice architectures.

## 1. Time-Series Mathematics
In Prometheus, data is not stored in tables; it is stored as mathematically continuous streams of numbers over time (e.g., CPU usage).
PromQL is designed to perform mathematical aggregations over these time vectors.
TICK3promql
rate(http_requests_total{status="500"}[5m])
TICK3
This mathematically reads as: "Take the total number of HTTP 500 errors, look at a rolling 5-minute window, and calculate the mathematical per-second rate of increase." This allows DevOps teams to instantly visualize the speed at which a system is failing.

## 2. Multi-Dimensional Labels
Instead of using relational JOINs, PromQL uses a multi-dimensional mathematical data model based on Labels (key-value pairs). 
If you want to divide the total memory used by the total memory available across 500 different servers, you just mathematically divide the two metric names. PromQL automatically aligns the mathematical vectors based on their matching labels (e.g., instance IP), instantly calculating the percentage for all 500 servers simultaneously without complex grouping logic.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/SPARQL/index.mdx': `---
title: SPARQL
description: The mathematical query language of the Semantic Web, designed to query massive, decentralized RDF knowledge graphs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SPARQL">

Standardized by the W3C in 2008, SPARQL (SPARQL Protocol and RDF Query Language) is the SQL of the Semantic Web. It is mathematically designed to query RDF (Resource Description Framework) data—graphs where every piece of data is defined by a Subject-Predicate-Object triple.

## 1. Pattern Matching on the Global Graph
Unlike SQL, which queries a local, closed database, SPARQL is mathematically designed to query decentralized data across the entire internet.
A SPARQL query looks like a mathematical graph pattern with variables (denoted by TICK1?TICK1).
TICK3sparql
SELECT ?authorName
WHERE {
  ?book <http://schema.org/author> ?author .
  ?author <http://schema.org/name> ?authorName .
}
TICK3
The engine mathematically traverses the graph, substituting the variables to find every matching subgraph that satisfies the pattern.

## 2. Federation
The most powerful mathematical feature of SPARQL is **Federation**. A single SPARQL query can mathematically instruct the engine to query a database in London for a list of authors, take those results, dynamically query Wikidata for their birthplaces, and merge the final result, treating the entire internet as a single, mathematically interconnected database.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.6 Data - Query Languages/SQL/index.mdx': `---
title: SQL
description: The Structured Query Language, the mathematical foundation of relational algebra and the absolute bedrock of modern data storage.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SQL (Structured Query Language)">

Created by Donald Chamberlin and Raymond Boyce at IBM in the 1970s, SQL is based on the mathematical theory of Relational Algebra developed by Edgar F. Codd. It is arguably the most successful and resilient programming language in human history.

## 1. Relational Algebra
SQL is a purely declarative language. You mathematically declare *what* data you want (TICK1SELECT name FROM users WHERE age > 18TICK1). You do not write a TICK1forTICK1 loop to scan the disk. 
The database engine contains a **Query Optimizer**. It mathematically parses your SQL into a tree of relational algebra operations, calculates the most efficient physical disk retrieval path (using B-Trees or Hash Indexes), and executes it. This mathematical abstraction guarantees that queries remain optimal even as data grows from megabytes to terabytes.

## 2. The Power of the JOIN
The defining mathematical feature of SQL is the TICK1JOINTICK1. 
Relational databases enforce Data Normalization (preventing duplicate data). If you have a TICK1UsersTICK1 table and an TICK1OrdersTICK1 table, SQL mathematically calculates the Cartesian product of the tables and filters them based on matching Foreign Keys. This allows infinite, complex mathematical relationships to be queried instantly without duplicating data on the physical hard drive.

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
