import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/IAM/index.mdx': `---
title: AWS Identity and Access Management (IAM)
description: The absolute foundational security system of AWS, mathematically defining exactly who (Authentication) is allowed to do exactly what (Authorization) to any cloud resource.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Identity and Access Management (IAM)"
  subtitle="The Security Bedrock of AWS"
  tags={['AWS', 'Security', 'Identity', 'Governance']}
>

If you have a server without IAM, anyone on the internet can delete it. IAM is the mathematical barrier that stands between your cloud infrastructure and the public. 

## 1. Users, Groups, and Roles
IAM entities are mathematically distinct:
- **IAM Users**: Long-term credentials (Access Keys) given to physical humans or CI/CD pipelines. Highly dangerous if leaked.
- **IAM Groups**: A logical collection of Users (e.g., "Developers"). You attach permissions to the Group, and the Users mathematically inherit them.
- **IAM Roles**: The most secure entity. Roles do not have permanent passwords. An EC2 server mathematically *assumes* a Role, and AWS generates temporary, cryptographically signed credentials that expire in 1 hour. If a hacker steals them, they are useless by the time they try to use them.

## 2. JSON Policies and Explicit Deny
Permissions are strictly defined in JSON documents called **Policies**.
An IAM Policy contains an Effect (Allow/Deny), an Action (e.g., TICK1s3:DeleteObjectTICK1), and a Resource (e.g., TICK1arn:aws:s3:::my-bucket/*TICK1).
IAM evaluation math is absolute: **Default Deny**. If a permission is not explicitly Allowed, it is denied. However, an **Explicit Deny** overrides everything. Even if an Administrator User has a policy saying "Allow Everything", if a secondary policy says "Deny S3 Delete", the Deny mathematically wins, and the action is blocked.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Internet Gateway/index.mdx': `---
title: AWS Internet Gateway (IGW)
description: A highly available, horizontally scaled VPC component that mathematically routes IPv4 and IPv6 traffic between a private virtual cloud network and the public internet.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Internet Gateway (IGW)"
  subtitle="The Bridge to the Public Web"
  tags={['AWS', 'Networking', 'VPC', 'Internet']}
>

When you create a Virtual Private Cloud (VPC), it is a mathematically isolated island of private IP addresses (e.g., TICK110.0.0.0/16TICK1). A server inside this VPC cannot talk to Google, and the internet cannot talk to the server. The IGW is the bridge.

## 1. Network Address Translation (NAT)
A web server in a VPC has a Private IP (e.g., TICK110.0.0.5TICK1). It also has a Public IP assigned by AWS (e.g., TICK154.2.3.4TICK1). 
However, the server's operating system only knows about the Private IP. 
When a packet leaves the server destined for the internet, it hits the Internet Gateway. The IGW mathematically performs 1-to-1 Network Address Translation. It strips off the Private IP header, slaps on the Public IP header, and routes it to the internet. When the response comes back, it mathematically reverses the process.

## 2. Route Tables and Public Subnets
Attaching an IGW to a VPC does not magically connect all servers to the internet.
You must mathematically configure the **Route Table** of a Subnet. You add a rule: *"If a packet is destined for TICK10.0.0.0/0TICK1 (anywhere on the internet), send it to the IGW."*
A subnet with this rule is mathematically defined as a **Public Subnet**. If a subnet does not have this route, it is a **Private Subnet**, and it is physically impossible for traffic from the internet to reach it, regardless of security groups.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/KMS/index.mdx': `---
title: AWS Key Management Service (KMS)
description: A managed, mathematically rigorous cryptographic service that allows developers to create, rotate, and strictly control the encryption keys used to protect data across the entire AWS ecosystem.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Key Management Service (KMS)"
  subtitle="The Cryptographic Core"
  tags={['AWS', 'Security', 'Encryption', 'Cryptography']}
>

Encrypting data in a database is useless if the encryption key is stored in the exact same database. KMS physically isolates the mathematical keys into highly secure, tamper-proof Hardware Security Modules (HSMs) that even AWS employees cannot extract.

## 1. Envelope Encryption
AWS services do not send 500GB of S3 data to KMS to be encrypted; that would instantly break the network. They use **Envelope Encryption**.
1. KMS generates a massive Master Key (CMK) that never leaves the hardware.
2. S3 asks KMS for a Data Key. KMS generates a random Data Key, mathematically encrypts a copy of it using the Master Key, and gives both to S3.
3. S3 uses the raw Data Key to rapidly mathematically encrypt the 500GB file locally.
4. S3 deletes the raw Data Key from its RAM, and saves the *Encrypted Data Key* next to the file (the Envelope). 
To read the file, S3 must send the Encrypted Data Key back to KMS to be mathematically decrypted, which means KMS retains absolute cryptographic control over who can read the data.

## 2. Cryptographic Access Control
Because every decryption requires an API call to KMS, you can write mathematical IAM policies on the Key itself.
You can decree: *"The Database Administrator is allowed to backup the database, but their IAM User is strictly Denied from calling TICK1kms:DecryptTICK1."* The Admin can safely copy the files, but the data is mathematically unreadable to them.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Lambda/index.mdx': `---
title: AWS Lambda
description: The flagship serverless compute service that allows developers to run raw code functions in the cloud without provisioning or managing any underlying servers, mathematically scaling from zero to thousands of concurrent executions in milliseconds.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Lambda"
  subtitle="Event-Driven Serverless Compute"
  tags={['AWS', 'Serverless', 'Compute', 'Functions']}
>

Before Lambda, you had to rent an EC2 server and leave it running 24/7, paying for it even when no users were visiting your site. Lambda mathematically eliminated idle compute costs.

## 1. Ephemeral Micro-VMs (Firecracker)
When an event triggers a Lambda function (e.g., an HTTP request or a file uploaded to S3), AWS uses an open-source hypervisor called **Firecracker**.
In less than 200 milliseconds, Firecracker mathematically carves out a tiny, secure micro-Virtual Machine, injects your Python/Node.js code, executes the function, returns the result, and immediately destroys the micro-VM. You are billed purely for the exact milliseconds the code was physically executing.

## 2. Horizontal Scaling and Cold Starts
Lambda's mathematical scaling is brutal and instantaneous.
If 10,000 users hit your API at the exact same second, Lambda does not queue them. It instantly boots 10,000 completely independent micro-VMs to process every request simultaneously.
The only drawback is the **Cold Start**. If a function hasn't been used in 15 minutes, AWS deletes the container to save space. The next time it is called, AWS has to fetch the code from S3, boot the runtime, and execute it, which can add a 1-2 second delay. For ultra-low-latency applications, developers use "Provisioned Concurrency" to mathematically force AWS to keep a few instances "warm" at all times.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/NACLs/index.mdx': `---
title: Network Access Control Lists (NACLs)
description: The stateless, subnet-level firewall in an AWS VPC that mathematically evaluates ordered rules to allow or deny network traffic before it ever reaches the servers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Network Access Control Lists (NACLs)"
  subtitle="The Subnet Firewall"
  tags={['AWS', 'Networking', 'Security', 'VPC']}
>

A Security Group protects a specific EC2 server. A NACL protects the entire Subnet (the neighborhood). If a hacker's packet is mathematically dropped by the NACL, the Security Group never even sees it.

## 1. Stateless vs. Stateful
Security Groups are **Stateful**. If an EC2 server initiates a request to the internet, the Security Group mathematically remembers the state of the connection and automatically allows the response packet back in, regardless of inbound rules.
NACLs are **Stateless**. They have no memory. If a subnet sends a request out to the internet, the response packet coming back is evaluated purely on its own merits against the Inbound Rules. If you do not explicitly open the high Ephemeral Ports (1024-65535) on the Inbound NACL, the response packet is mathematically destroyed, and your server will appear to have no internet access.

## 2. Ordered Rule Evaluation
Unlike IAM policies (where a single Deny overrides everything), NACL rules are mathematically evaluated in strict numerical order.
- Rule 100: ALLOW IP 192.168.1.5
- Rule 110: DENY ALL
If IP 192.168.1.5 tries to enter, the NACL evaluates Rule 100, matches it, and instantly allows the packet. It never looks at Rule 110. This strict mathematical ordering allows network administrators to create surgical Deny rules (e.g., "Deny this one specific hacker IP at Rule 90, but Allow the rest of the world at Rule 100").

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/NAT Gateway/index.mdx': `---
title: AWS NAT Gateway
description: A highly available managed service that allows servers in a mathematically isolated Private Subnet to initiate outbound connections to the internet while strictly blocking all inbound internet connections.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS NAT Gateway"
  subtitle="Secure Outbound Routing"
  tags={['AWS', 'Networking', 'VPC', 'Security']}
>

You put your Database in a Private Subnet for security. Because it has no route to the Internet Gateway, hackers cannot reach it. However, the Database needs to download software updates from the internet. How does it get out without letting hackers in? The NAT Gateway.

## 1. Network Address Translation
You physically place the NAT Gateway in a **Public Subnet** (which has an Internet Gateway). 
You then go to the Route Table of your **Private Subnet** and add a mathematical rule: *"If a packet is destined for the internet (0.0.0.0/0), send it to the NAT Gateway."*
When the Database tries to download an update, the packet hits the NAT Gateway. The NAT Gateway mathematically strips off the Database's Private IP, slaps on its own Public IP (Elastic IP), and sends it to the internet. 

## 2. One-Way Mathematical Routing
When the software update comes back from the internet, it hits the NAT Gateway, which mathematically remembers the connection state, translates it back to the Private IP, and hands it to the Database.
Crucially, this is a **One-Way Street**. If a hacker on the internet tries to initiate a connection directly to the NAT Gateway's Public IP, the NAT Gateway mathematically drops the packet immediately, because it has no internal state correlating to an outbound request. This architecture guarantees your backend servers can securely access the web while remaining physically invisible to it.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Organizations/index.mdx': `---
title: AWS Organizations
description: An enterprise management service that mathematically consolidates billing, structural hierarchy, and absolute security governance across hundreds or thousands of disparate AWS Accounts.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="AWS Organizations"
  subtitle="Multi-Account Management"
  tags={['AWS', 'Enterprise', 'Governance', 'Billing']}
>

A startup uses one AWS account. A Fortune 500 company uses 1,000 AWS accounts (one for every team, product, and environment). Without AWS Organizations, managing 1,000 separate credit cards and security audits is mathematically impossible.

## 1. Consolidated Billing
The most immediate benefit is financial. 
Organizations ties all 1,000 accounts to a single master payer account. This doesn't just simplify accounting; it mathematically triggers massive volume discounts.
AWS S3 storage gets cheaper the more you store. If Account A stores 40TB and Account B stores 40TB, they both pay standard rates. But under Organizations, AWS mathematically aggregates their usage to 80TB, pushing the entire company into a cheaper pricing tier. 

## 2. Service Control Policies (SCPs)
SCPs are the ultimate mathematical trump card in AWS security.
An SCP is a JSON policy applied at the Organization level (or Organizational Unit level) that acts as an absolute ceiling on permissions. 
If an SCP states *"Deny Region: eu-west-1"*, it mathematically overrides everything. It does not matter if a developer in a child account is the Root User. It does not matter if their IAM Policy has TICK1AdministratorAccessTICK1. The SCP mathematically amputates that permission before the IAM evaluation even begins, guaranteeing that no one in the company can ever boot a server in Europe.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/RDS/index.mdx': `---
title: Amazon Relational Database Service (RDS)
description: A managed database service that abstracts away the grueling OS-level administration of running traditional SQL engines, providing automated backups, patching, and mathematically rigorous Multi-AZ high availability.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Relational Database Service (RDS)"
  subtitle="Managed SQL Databases"
  tags={['AWS', 'Database', 'SQL', 'Managed']}
>

You can manually install PostgreSQL on an EC2 server. But if the physical server motherboard fries at 2:00 AM, your database is gone, and the company halts. RDS mathematically automates the disaster recovery process.

## 1. Multi-AZ Deployments (High Availability)
When you enable **Multi-AZ** on an RDS database, AWS physically provisions two EC2 servers in two entirely separate data centers (Availability Zones). 
One is the Primary; one is the Standby. 
When your application writes a row of SQL data to the Primary, RDS uses **Synchronous Storage Replication**. It mathematically intercepts the storage block and fires a copy over a dedicated fiber line to the Standby. The database does not acknowledge the "Write Success" to your application until *both* data centers have safely committed the bytes to disk. 

## 2. Automated Failover
If a backhoe cuts the fiber optic cable to the Primary data center, the Primary database drops offline.
The RDS Control Plane detects this mathematical failure. Within 60 seconds, it executes an **Automated Failover**. It mathematically rewires the internal AWS DNS record so that the database endpoint URL instantly points to the Standby database (which has a mathematically perfect, up-to-the-millisecond copy of the data). The application experiences a 60-second hiccup, reconnects, and continues operating without human intervention.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Redshift/index.mdx': `---
title: Amazon Redshift
description: A massive, petabyte-scale data warehouse service mathematically engineered for complex OLAP (Online Analytical Processing) SQL queries using columnar storage and massively parallel processing.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Redshift"
  subtitle="The Petabyte Data Warehouse"
  tags={['AWS', 'Database', 'Analytics', 'Big Data']}
>

A standard RDS Postgres database (OLTP) is mathematically designed to find a single row extremely fast (e.g., "Find User 123"). If you ask Postgres to sum the total sales of 10 billion rows, the architecture will physically fail. Redshift (OLAP) is designed specifically to analyze billions of rows simultaneously.

## 1. Columnar Storage
Postgres stores data in **Rows**. To sum up the "Price" column of 10 billion rows, Postgres must physically read the Name, Address, and Email of every single row from the hard drive just to find the Price.
Redshift stores data in **Columns**. All the "Prices" are mathematically clustered together on the SSD. If you run a TICK1SUM(Price)TICK1 query, the SSD only reads the exact blocks containing the integers, ignoring the terabytes of text data. This reduces physical Disk IO by 99%.

## 2. Massively Parallel Processing (MPP)
Redshift is not one server; it is a cluster.
A **Leader Node** receives your SQL query and mathematically compiles it into a highly optimized execution plan in C++. It then distributes this compiled code to a massive fleet of **Compute Nodes**. Every Compute Node analyzes its specific chunk of the data simultaneously (MPP). The Leader Node aggregates the mathematical results and returns the answer in seconds, rather than days.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/35. Cloud Computing - Fundamentals/35.1 Amazon Web Services/Route 53/index.mdx': `---
title: Amazon Route 53
description: A highly available, globally distributed Domain Name System (DNS) web service designed to mathematically route end users to internet applications based on complex geographic and health-check algorithms.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="Amazon Route 53"
  subtitle="The Global DNS Router"
  tags={['AWS', 'Networking', 'DNS', 'Global']}
>

DNS is the phonebook of the internet (translating TICK1google.comTICK1 to TICK1142.250.190.46TICK1). If your DNS server goes down, your entire company vanishes from the internet. Route 53 is the only AWS service backed by a mathematical **100% SLA** (Service Level Agreement). AWS guarantees it will never go offline.

## 1. Advanced Routing Algorithms
Route 53 does not just blindly return an IP address. It executes mathematical routing policies at the edge of the internet:
- **Latency-Based Routing**: If a user in London asks for the IP of your server, Route 53 mathematically calculates the millisecond latency between London and your US-East server vs. your EU-West server, and instantly hands the user the IP of the fastest server.
- **Geolocation Routing**: You can mathematically decree: *"If a user's IP is located in Germany, strictly route them to the Frankfurt data center to comply with GDPR data laws."*

## 2. Health Checks and Failover
Route 53 continuously pings your web servers every 10 seconds.
If your primary server in New York crashes and fails 3 consecutive health checks, Route 53's mathematical state machine triggers an **Active-Passive Failover**. It instantly stops returning the New York IP address to the internet, and begins returning the IP address of your backup server in California. Global internet traffic is seamlessly routed away from the burning data center before most users even notice an error.

</TechnologyTemplate>
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
