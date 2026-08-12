import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '7. DevOps & Infrastructure/Kubernetes/index.mdx': `---
title: Kubernetes
description: Open-source container orchestration system for automating software deployment, scaling, and management.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Kubernetes">

Kubernetes (often abbreviated as K8s) is an open-source container orchestration engine originally designed by Google and now maintained by the Cloud Native Computing Foundation. It automates the deployment, scaling, and management of containerized applications.

<Callout icon="tip" title="Self-Healing">
  Kubernetes continuously monitors the state of the cluster. If a node goes down or a pod crashes, K8s automatically restarts, replaces, or reschedules them to ensure the actual state matches the desired state.
</Callout>

## Architecture

Kubernetes follows a client-server architecture where a **Control Plane** manages a set of **Worker Nodes**.

<ArchitectureDiagram chart={\`
graph TD
  subgraph Control Plane
    API(kube-apiserver)
    etcd[(etcd)]
    Sched(kube-scheduler)
    CM(kube-controller-manager)
    
    API <--> etcd
    API <--> Sched
    API <--> CM
  end
  
  subgraph Worker Node 1
    Kubelet1(kubelet)
    Proxy1(kube-proxy)
    Pods1(Pods)
    Kubelet1 --> Pods1
  end
  
  subgraph Worker Node 2
    Kubelet2(kubelet)
    Proxy2(kube-proxy)
    Pods2(Pods)
    Kubelet2 --> Pods2
  end
  
  API <--> Kubelet1
  API <--> Kubelet2
\`} />

## Core Concepts

<ComparisonTable 
  headers={['Component', 'Description']}
  rows={[
    ['Pod', 'The smallest deployable unit. Encapsulates one or more containers, storage resources, and a unique IP.'],
    ['Deployment', 'Manages stateless applications. Ensures a specified number of Pod replicas are running at all times.'],
    ['Service', 'An abstraction that defines a logical set of Pods and a policy by which to access them (ClusterIP, NodePort, LoadBalancer).'],
    ['Ingress', 'Manages external access to the services in a cluster, typically HTTP/S, providing load balancing and SSL termination.']
  ]}
/>

## Basic Commands

<pre className="bin98-codebox">
<code>
# Get all running pods
kubectl get pods -n kube-system

# Deploy an application from a YAML manifest
kubectl apply -f deployment.yaml

# View detailed logs of a specific pod
kubectl logs &lt;pod-name&gt;

# Forward a local port to a port on the pod
kubectl port-forward pod/&lt;pod-name&gt; 8080:80
</code>
</pre>

</TechnologyTemplate>
`,
  '0. Computer Science Fundamentals/Operating Systems/Linux/index.mdx': `---
title: Linux
description: A family of open-source Unix-like operating systems based on the Linux kernel.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Linux">

Linux is an open-source Unix-like operating system kernel created by Linus Torvalds in 1991. Today, Linux distributions (distros) power the vast majority of the world's servers, supercomputers, and smartphones (via Android).

<Callout icon="info" title="Everything is a file">
  In Linux, everything is treated as a file. This includes hardware devices (exposed in \`/dev\`), system processes (exposed in \`/proc\`), and network sockets. This unified interface simplifies system interaction.
</Callout>

## Linux Kernel vs. Distribution

<ComparisonTable 
  headers={['Component', 'What it is', 'Examples']}
  rows={[
    ['The Kernel', 'The core interface between hardware and software. Manages memory, CPU, and devices.', 'Linux kernel 6.x'],
    ['GNU Tools', 'Essential utilities, compilers, and core libraries used on top of the kernel.', 'bash, gcc, coreutils'],
    ['Distribution (Distro)', 'A complete OS package containing the kernel, GNU tools, a package manager, and often a GUI.', 'Ubuntu, Debian, Fedora, Arch']
  ]}
/>

## File System Hierarchy

<ArchitectureDiagram chart={\`
graph TD
  Root((/)) --> bin(/bin)
  Root --> etc(/etc)
  Root --> home(/home)
  Root --> var(/var)
  Root --> usr(/usr)
  Root --> dev(/dev)
  
  bin --- binDesc[Essential binaries]
  etc --- etcDesc[System configs]
  home --- homeDesc[User directories]
  var --- varDesc[Variable data/logs]
  dev --- devDesc[Device files]
\`} />

## Common Commands

<pre className="bin98-codebox">
<code>
# List files with detailed permissions and sizes
ls -la

# Search for a specific pattern inside files
grep -r "pattern" /path/to/search/

# Change file permissions (e.g. make executable)
chmod +x script.sh

# Monitor active processes (like Task Manager)
htop
</code>
</pre>

</TechnologyTemplate>
`,
  '5. Databases & Storage/SQL/index.mdx': `---
title: SQL
description: Structured Query Language for managing and manipulating relational databases.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SQL (Structured Query Language)">

SQL (Structured Query Language) is the standard language used to communicate with Relational Database Management Systems (RDBMS). It is used to create, read, update, and delete (CRUD) data within tabular structures.

<Callout icon="tip" title="Declarative Nature">
  SQL is a declarative language. You tell the database *what* data you want (e.g., \`SELECT name FROM users\`), not *how* to go fetch it. The database engine's query optimizer handles the execution plan.
</Callout>

## Types of SQL Commands

<ComparisonTable 
  headers={['Category', 'Acronym', 'Purpose', 'Commands']}
  rows={[
    ['Data Query Language', 'DQL', 'Retrieve data from the database.', 'SELECT'],
    ['Data Manipulation Language', 'DML', 'Modify data within tables.', 'INSERT, UPDATE, DELETE'],
    ['Data Definition Language', 'DDL', 'Define database schema structure.', 'CREATE, ALTER, DROP'],
    ['Data Control Language', 'DCL', 'Manage access permissions.', 'GRANT, REVOKE']
  ]}
/>

## Relational Joins

<ArchitectureDiagram chart={\`
graph LR
  subgraph Inner Join
    A1((Table A)) ---|Match| B1((Table B))
  end
  
  subgraph Left Join
    A2((Table A)) -->|Match + Nulls| B2((Table B))
  end
  
  subgraph Full Outer
    A3((Table A)) <-->|All Records| B3((Table B))
  end
\`} />

## Essential Syntax

<pre className="bin98-codebox">
<code>
-- Basic SELECT with filtering and sorting
SELECT first_name, last_name, age 
FROM employees 
WHERE department = 'Engineering' 
ORDER BY age DESC;

-- Aggregation with GROUP BY
SELECT department, COUNT(*) as employee_count, AVG(salary) 
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 5;

-- INNER JOIN between two tables
SELECT orders.id, customers.name 
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
</code>
</pre>

</ConceptTemplate>
`,
  '7. DevOps & Infrastructure/Git/index.mdx': `---
title: Git
description: A distributed version control system for tracking changes in source code.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Git">

Git is a free and open-source distributed version control system designed by Linus Torvalds to handle everything from small to very large projects with speed and efficiency.

<Callout icon="info" title="Distributed vs Centralized">
  Unlike older systems like SVN, every Git directory on every computer is a full-fledged repository with complete history and full version-tracking abilities, independent of network access or a central server.
</Callout>

## The Three States of Git

Git manages files in three distinct local states before they are pushed to a remote server.

<ComparisonTable 
  headers={['State', 'Description', 'Command Used']}
  rows={[
    ['Modified (Working Directory)', 'You have changed the file but have not committed it to your database yet.', 'N/A (just save file)'],
    ['Staged (Index)', 'You have marked a modified file in its current version to go into your next commit snapshot.', '\`git add\`'],
    ['Committed (HEAD)', 'The data is safely stored in your local database.', '\`git commit\`']
  ]}
/>

## Typical Workflow

<ArchitectureDiagram chart={\`
graph LR
  WD(Working Directory) -->|git add| Staging(Staging Area)
  Staging -->|git commit| LocalRepo(Local Repository)
  LocalRepo -->|git push| RemoteRepo(Remote Repository)
  
  RemoteRepo -->|git fetch / pull| LocalRepo
  LocalRepo -->|git checkout| WD
\`} />

## Essential Commands

<pre className="bin98-codebox">
<code>
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/user/repo.git

# Check the status of your files
git status

# Create and switch to a new branch
git checkout -b feature/new-login

# Add changes and commit
git add .
git commit -m "Implement new login UI"

# Push branch to remote server
git push origin feature/new-login
</code>
</pre>

</TechnologyTemplate>
`,
}

async function writeRichContent() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Updated ${relativePath} with rich content.`)
  }
}

writeRichContent().catch(console.error)
