import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS EC2'
const pageSubtitle = 'Virtual machine compute on AWS with full operating-system control.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Amazon Elastic Compute Cloud, usually shortened to EC2, is AWS\'s general-purpose virtual machine service. It gives you compute instances with a chosen CPU and memory profile, an operating system image, attached storage, network interfaces, and identity and security settings. You manage the guest operating system and everything that runs inside it.',
      'EC2 sits at the lower, more flexible end of AWS compute. Compared with Lambda, ECS Fargate, or other higher-level platforms, EC2 exposes far more infrastructure detail. That makes it useful when you need operating-system access, custom runtimes, long-lived background processes, unusual networking, specialized hardware, or a migration path for software that was not designed for a fully managed platform.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'EC2 is the substrate behind a large part of AWS. A workload may run directly on EC2 instances, or indirectly through services that launch EC2 on your behalf such as ECS on EC2, EKS worker nodes, or Auto Scaling groups. In many production systems, EC2 works together with VPC, EBS, IAM, CloudWatch, Systems Manager, Elastic Load Balancing, Route 53, and backups.',
      'The service is not just about launching one server. The real operating model is fleets: launch templates, immutable AMIs, Auto Scaling groups, health checks, rolling replacements, multi-AZ placement, and least-privilege instance roles. Teams that treat EC2 as cattle rather than as individually hand-maintained pets usually get the best reliability and operability.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'EC2 gives you control. You choose the operating system, bootstrap process, package stack, process supervisor, storage layout, runtime flags, sidecars, and host-level agents. That control matters for legacy systems, self-managed databases, custom proxies, CI runners, build workers, game servers, low-level networking tools, and software with strict kernel or filesystem assumptions.',
      'It also gives you range. EC2 covers small burstable instances, memory-heavy nodes, storage-heavy nodes, GPU and accelerator classes, bare metal, and high-throughput networking profiles. A lot of AWS architecture boils down to one question: do you want a higher-level managed service, or do you need the control envelope that EC2 gives you.',
    ],
  },
  {
    title: 'When it is a poor fit',
    paragraphs: [
      'EC2 is often the wrong default when the workload is fundamentally request-driven, stateless, container-friendly, and operationally ordinary. In those cases, Lambda, ECS Fargate, App Runner, or a managed database can remove a large amount of patching, AMI maintenance, security hardening, and fleet management.',
      'EC2 is also a bad fit when the team really wants a platform but keeps choosing VMs out of habit. If every instance is hand-configured over SSH, if deployments depend on mutable snowflake hosts, or if nobody owns OS patching and vulnerability response, EC2 becomes expensive operationally even when the instance bill itself looks reasonable.',
    ],
  },
]

const purchaseModels = [
  {
    title: 'On-Demand Instances',
    summary:
      'Best when flexibility matters more than commitment. Use them for unpredictable demand, short-lived experiments, migrations, and baseline capacity that may change shape often.',
    details: [
      'No long-term capacity commitment is required.',
      'Good default when the workload architecture is still changing.',
      'Often combined with Savings Plans later once the usage pattern stabilizes.',
    ],
  },
  {
    title: 'Savings Plans',
    summary:
      'Best when you can commit to a steady level of spend per hour but still want flexibility across instance families, sizes, or services depending on the plan type.',
    details: [
      'A pricing commitment, not a fleet-management feature.',
      'Useful when architecture evolves faster than strict Reserved Instance planning.',
      'Common for mature steady-state application tiers.',
    ],
  },
  {
    title: 'Reserved Instances',
    summary:
      'Best when you want discounted usage for a defined scope and term, especially where instance characteristics and regional or zonal placement are relatively stable.',
    details: [
      'A billing construct, not a separate instance type.',
      'Works best for predictable long-running capacity.',
      'Zonal reservations can also help with capacity planning in a specific Availability Zone.',
    ],
  },
  {
    title: 'Spot Instances',
    summary:
      'Best for fault-tolerant, flexible workloads that can survive interruptions and can spread across multiple instance types and Availability Zones.',
    details: [
      'Great for batch, rendering, CI, stateless workers, data processing, and some container platforms.',
      'Poor fit for inflexible stateful workloads that assume uninterrupted capacity.',
      'Should usually be managed through Auto Scaling groups or fleets rather than as isolated pets.',
    ],
  },
  {
    title: 'Capacity Reservations',
    summary:
      'Best when capacity certainty matters more than price optimization. Use them for launches that must succeed in a specific Availability Zone and instance shape.',
    details: [
      'Useful for critical cutovers, event-driven spikes, or tightly constrained resilience plans.',
      'Can complement broader EC2 pricing strategies.',
      'Should be used deliberately because reserved capacity that goes unused still has cost implications.',
    ],
  },
]

const launchLifecycle = [
  'Choose an AMI, instance type, subnet, security groups, storage layout, and IAM instance profile, usually through a launch template instead of ad hoc parameters.',
  'Launch the instance into a VPC subnet. EC2 attaches networking and block-device configuration, then moves the instance through pending into running.',
  'Bootstrap runs through user data, cloud-init, EC2Launch on Windows, configuration management, or Systems Manager automation. This is where packages, config files, agents, and application startup happen.',
  'The instance joins the application topology, often behind a load balancer or inside an Auto Scaling group. Health checks, logs, metrics, and alarms determine whether the instance is healthy enough to serve traffic.',
  'Over time the instance may be stopped, started, rebooted, hibernated, refreshed, detached, or terminated. Healthy EC2 operations favor replacement over in-place repair when something is materially wrong.',
]

const fitGuide = [
  {
    title: 'Need OS-level control, custom packages, or host agents',
    choice: 'Choose EC2.',
  },
  {
    title: 'Need to run long-lived services with custom networking or filesystem behavior',
    choice: 'Choose EC2 or a container platform built on EC2.',
  },
  {
    title: 'Need the least operational surface for short request-driven functions',
    choice: 'Prefer Lambda.',
  },
  {
    title: 'Need containers without managing hosts',
    choice: 'Prefer ECS Fargate or another managed container runtime.',
  },
  {
    title: 'Need simple low-friction VM hosting with fewer options',
    choice: 'Consider Lightsail before full EC2.',
  },
  {
    title: 'Need autoscaled stateless web or worker fleets with custom images',
    choice: 'EC2 plus launch templates and Auto Scaling is a strong fit.',
  },
]

const coreConceptSections = [
  {
    id: 'core-instance-model',
    heading: 'Instance Model',
    paragraphs: [
      'An EC2 instance is a virtual server with compute, memory, storage attachments, and networking. The instance is defined by both a machine image and a shape. The AMI defines the starting software state. The instance type defines the hardware profile. The surrounding launch configuration defines network placement, security boundaries, identity, and storage attachments.',
      'Think in layers. Region and Availability Zone determine physical placement boundaries. VPC and subnet determine network reachability. Security groups shape packet-level admission. IAM instance profiles shape AWS API access from the workload. EBS volumes shape persistence. User data and configuration management shape first-boot behavior.',
      'This layered model is why EC2 is flexible but easy to misuse. Launching a single VM is trivial. Launching a secure, observable, reproducible fleet is a systems-design exercise.',
    ],
  },
  {
    id: 'core-amis',
    heading: 'AMIs, Launch Templates, and Reproducibility',
    paragraphs: [
      'An Amazon Machine Image is the starting point for an instance. It packages an operating system and can also include application binaries, agents, and configuration baselines. AMIs are the foundation of immutable infrastructure on EC2 because they let you replace hosts with known-good images rather than patching them manually over time.',
      'Launch templates are the preferred place to store instance launch parameters. They let you capture the AMI reference, instance type, networking choices, block-device mappings, metadata options, user data, tags, and IAM instance profile in one reusable object. This matters because scaling, refreshes, and incident recovery all go faster when the launch contract is explicit and versioned.',
      'Good EC2 teams build AMIs intentionally, keep them small and predictable, and treat launch-template changes as infrastructure releases. If the only way to recreate a server is to remember which console toggles someone clicked six months ago, the design is already fragile.',
    ],
  },
  {
    id: 'core-instance-types',
    heading: 'Instance Types and Families',
    paragraphs: [
      'Instance types are how you buy compute shape. Families are optimized for broad workload classes such as general purpose, compute optimized, memory optimized, storage optimized, accelerated computing, or high performance computing. The right family is not just a cost decision. It changes memory pressure, I/O ceilings, network behavior, and sometimes available CPU architecture.',
      'Sizing should follow the workload bottleneck rather than habit. Web tiers often care about a balance of CPU and network throughput. In-memory caches care about RAM and eviction behavior. Build workers care about CPU burst and local scratch. Databases often care about memory, EBS throughput, and predictable latency. The wrong instance family may appear cheaper while forcing more nodes, more paging, or worse tail latencies.',
      'Modern EC2 design also means being architecture-aware. Some workloads are happy on x86_64, others can move to AWS Graviton and improve price performance, and some require accelerators or bare metal. The best answer depends on software compatibility, operational maturity, and whether the workload can use a broader pool of compatible instances.',
    ],
  },
  {
    id: 'core-nitro',
    heading: 'Nitro System, Virtualization, and Hardware Features',
    paragraphs: [
      'Many modern EC2 instance families are built on the AWS Nitro System. Nitro is AWS\'s hardware and software architecture for offloading management, networking, storage, and security functions so the guest gets strong isolation and high performance. It is a major reason EC2 can offer both virtualization and near-bare-metal behavior for many workloads.',
      'Nitro-based instances commonly expose EBS volumes as NVMe devices and use enhanced networking through ENA. That affects driver expectations, network throughput, and how operating-system images should be prepared. Teams that build custom AMIs need to understand those assumptions or they eventually hit confusing boot, storage, or driver problems.',
      'Bare metal instance types exist when virtualization overhead or hardware access constraints matter. They are useful for certain licensing models, nested virtualization cases, low-level hardware requirements, and some specialized performance-sensitive workloads. But bare metal does not remove the need for disciplined automation. It only changes the level of control and responsibility.',
    ],
  },
  {
    id: 'core-storage',
    heading: 'Storage: EBS, Instance Store, and Root Disks',
    paragraphs: [
      'EC2 storage is not one thing. The usual root disk is an Amazon EBS volume, which persists independently of instance stop and start cycles depending on configuration. Additional EBS volumes can be attached for data, logs, caches, or database files, with performance characteristics chosen separately from the compute instance.',
      'EBS volumes are Availability-Zone scoped. That means an instance and its EBS volume must live in the same Availability Zone. It also means resilience planning must think beyond a single volume or host. Snapshots, replication patterns, backups, or application-level redundancy are what carry data beyond one instance or one AZ.',
      'Instance store, where available, is local ephemeral storage physically attached to the host. It can be very fast, but it is tied to the life of that instance and is not the place for authoritative durable data unless the application already replicates or reconstructs it. The classic mistake is to put important state on instance store because it benchmarks well, then discover the durability model later.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking, ENIs, IP Addressing, and Security Groups',
    paragraphs: [
      'Every EC2 instance lives inside a VPC and usually inside a subnet. The subnet influences routing, private IP addressing, and whether public internet reachability is even possible. Public accessibility is a combination of subnet route tables, internet gateways, public IP assignment, and security-group rules. Missing any one of those pieces changes the result.',
      'Elastic Network Interfaces are the actual network attachments for instances. They carry private IPs, optional public addressing associations, and security-group attachments. Understanding ENIs matters for multi-homed designs, failover patterns, appliances, and troubleshooting because the instance does not just have an abstract network identity; it has concrete interfaces with rules attached.',
      'Security groups act as stateful virtual firewalls. They are attached to ENIs and evaluate allowed traffic rather than denied traffic. They are one of the most important day-two operational tools on EC2 because bad rules create outages, and broad rules create security debt. The disciplined pattern is narrow ingress, explicit egress where practical, and grouping by role rather than by convenience.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'IAM Roles, Instance Profiles, and Metadata',
    paragraphs: [
      'Applications on EC2 often need to call AWS APIs. The secure way to provide those permissions is through an IAM role delivered to the instance by an instance profile. That gives the workload temporary credentials rather than hard-coded secrets on disk. If you see long-lived access keys baked into AMIs or environment files, the design is already off track.',
      'The Instance Metadata Service is how the instance and software on it retrieve metadata and credentials. It exposes things like instance identity, network information, and role credentials from inside the host. Because this is such a sensitive surface, modern EC2 hardening usually requires IMDSv2 and avoids patterns that let arbitrary untrusted code talk to metadata without constraint.',
      'Identity on EC2 must be treated in two directions: who may manage the instance from outside, and what the instance itself may do inside AWS. Those are separate controls. Security groups do not replace IAM. IAM does not replace host hardening. Good EC2 security depends on both.',
    ],
  },
  {
    id: 'core-bootstrap',
    heading: 'Bootstrapping, User Data, and Configuration',
    paragraphs: [
      'User data is the launch-time payload used to bootstrap an instance. On Linux this commonly runs through cloud-init, while Windows uses the EC2Launch agent. User data is appropriate for initial configuration tasks such as installing packages, rendering config files, joining a cluster, or registering supporting agents.',
      'User data should not become a giant deployment engine that rewrites the whole machine on every boot. Large mutable bootstrap scripts are hard to audit, slow to recover, and easy to drift. A stronger pattern is to keep AMIs reasonably prepared, keep user data short, and move more complex convergence into explicit automation tools or image pipelines.',
      'Do not place secrets casually into user data. It is accessible from the instance itself and is not a vault. Use Secrets Manager, Parameter Store, encrypted bootstrapping flows, or role-based retrieval at runtime instead.',
    ],
  },
  {
    id: 'core-lifecycle',
    heading: 'Lifecycle, State Changes, and Replacement',
    paragraphs: [
      'EC2 instances move through states such as pending, running, stopping, stopped, shutting-down, and terminated. These state changes affect billing and operations. Stopped and terminated are not the same: a stopped EBS-backed instance can usually be started again, while a terminated instance is gone even if its snapshots or detached volumes remain.',
      'In real systems, instance lifecycle is usually managed by a larger controller such as Auto Scaling. That changes the operational mindset. You do not SSH into a sick instance and nurse it forever. You investigate root cause, but the fleet should be able to replace unhealthy nodes automatically and converge back to the desired state.',
      'Replacement-friendly design is one of the main dividing lines between good EC2 usage and fragile EC2 usage. If an instance cannot disappear without causing panic, the system probably has hidden local state, insufficient automation, or missing service discovery and health-check logic.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Auto Scaling, Load Balancing, and Fleet Thinking',
    paragraphs: [
      'Most production EC2 applications should be designed as fleets rather than single instances. Auto Scaling groups provide the fleet manager: they maintain desired capacity, spread instances across Availability Zones, replace unhealthy instances, and support scaling policies based on demand or schedules.',
      'Load balancers commonly sit in front of EC2 fleets so clients talk to a stable entry point while instances come and go underneath. That arrangement lets you rotate AMIs, scale out, drain unhealthy nodes, and recover from host failures without exposing the churn directly to users.',
      'Mixed-instance fleets and mixed purchase options are often the practical path to cost and resilience. A group might keep baseline capacity On-Demand, add Spot for opportunistic scale, and spread across multiple compatible instance types so capacity constraints in one pool do not take down the workload.',
    ],
  },
  {
    id: 'core-placement',
    heading: 'Placement Groups, Capacity Strategy, and Availability',
    paragraphs: [
      'Placement groups let you influence how instances are located relative to one another. Cluster placement packs instances closely inside an Availability Zone for low-latency tightly coupled workloads. Partition placement separates partitions onto distinct hardware for large distributed systems. Spread placement keeps a small set of instances apart to reduce correlated failure.',
      'These controls are not decorative. They matter for HPC, big-data clusters, quorum systems, and any design where correlated infrastructure failure changes correctness or recovery behavior. But they also add constraints, so you use them for a reason, not automatically.',
      'Capacity planning on EC2 is as much about placement and optionality as it is about price. Designs that can run in multiple AZs, across multiple instance families, and with clear health-based replacement policies are materially easier to keep healthy than designs that insist on one exact shape in one exact place.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Operations, Observability, and Day-Two Work',
    paragraphs: [
      'EC2 operations do not end at launch. You need host metrics, application metrics, logs, patching strategy, backup and restore drills, certificate rotation, agent upgrades, kernel updates, and an access model that survives incidents. CloudWatch usually provides baseline metrics and alarms, but serious fleets also need centralized logs and application-level telemetry.',
      'Systems Manager is often the missing piece in healthier EC2 estates. It provides remote command execution, patch orchestration, inventory, session management, and automation without requiring broad SSH exposure. Many teams move from ad hoc bastion-based operations to SSM once the fleet size makes traditional host management too painful.',
      'If you cannot explain how an instance is patched, how logs are collected, how a broken node is replaced, and how a compromised host would be isolated, the EC2 design is not finished no matter how well the application code works.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Posture and Hardening',
    paragraphs: [
      'Security on EC2 is layered. Start with least-privilege IAM, narrow security groups, private subnets by default, and hardened AMIs. Require IMDSv2 unless you have a specific compatibility exception. Use encrypted EBS volumes, avoid unnecessary public IPs, and keep administration paths separate from application paths.',
      'Host-level hardening still matters because EC2 gives you an operating system to manage. That includes patching, package provenance, file permissions, service accounts, firewall rules where appropriate, audit logging, and minimizing installed software. The shared-responsibility boundary is clear here: AWS secures the infrastructure of the service, but you secure the guest environment and your workload configuration.',
      'Secrets discipline is often the first major failure point. Private keys, database passwords, and API tokens should not be baked into images or copied around manually. Use role-based access and managed secret distribution wherever possible, then log and rotate credentials as if compromise were always possible.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance, Cost, and Tuning Tradeoffs',
    paragraphs: [
      'EC2 performance is multi-dimensional. CPU, memory, EBS throughput and IOPS, local disk, network bandwidth, packet rate, and placement all matter. A workload that looks CPU bound might really be waiting on EBS. A workload that looks underutilized might be memory constrained and spending time in GC or page cache churn.',
      'Cost optimization on EC2 starts with architecture before it reaches discounts. Rightsizing an instance family, shutting down idle nonproduction capacity, using Auto Scaling, and eliminating wasteful overprovisioning usually beat premature commitment games. After that, Savings Plans, Reserved Instances, and Spot usage can push cost further down if the fleet is engineered to tolerate the chosen model.',
      'A practical tuning loop for EC2 is simple: observe bottlenecks, change one dimension at a time, prefer repeatable templates over one-off fixes, and keep enough optionality that a single unavailable instance type does not become a platform incident.',
    ],
  },
]

const operationalNotes = [
  {
    title: 'Tagging',
    detail:
      'Tag instances, volumes, launch templates, Auto Scaling groups, and AMIs consistently. Tags are critical for cost attribution, automation, inventory, and access-control policy conditions. Do not put secrets in tags.',
  },
  {
    title: 'Backups',
    detail:
      'EBS snapshots, AMI pipelines, database-native backups, and restore drills all have different roles. Snapshots alone are not the same as a tested recovery process.',
  },
  {
    title: 'Access',
    detail:
      'Session Manager is often safer and easier to govern than broad SSH exposure. If SSH or RDP is required, constrain the entry path tightly and log it.',
  },
  {
    title: 'Patch strategy',
    detail:
      'Patch with image pipelines and rolling replacements where possible. In-place patching has a role, but immutable replacement is usually easier to reason about and rollback.',
  },
  {
    title: 'Termination protection',
    detail:
      'Use instance-level or process-level safeguards when accidental deletion would be costly, but do not let protective flags become a substitute for proper backups or fleet automation.',
  },
]

const designPatterns = [
  {
    title: 'Stateless web tier',
    detail:
      'Instances are launched from a common template, spread across multiple Availability Zones, placed behind an Application Load Balancer, and replaced rather than patched live during deployments.',
  },
  {
    title: 'Worker fleet',
    detail:
      'Jobs are pulled from a queue, local state is disposable, and Spot capacity can be used aggressively because interruptions can be retried or checkpointed.',
  },
  {
    title: 'Bastion-free administration',
    detail:
      'Instances stay private, administration goes through Systems Manager Session Manager, and outbound internet access is mediated through controlled paths rather than broad public exposure.',
  },
  {
    title: 'Golden AMI pipeline',
    detail:
      'Base images are patched and hardened in CI, then rolled out through launch-template version updates and Auto Scaling instance refreshes instead of package installation by hand on each host.',
  },
  {
    title: 'Hybrid steady-state plus burst',
    detail:
      'Baseline capacity runs on On-Demand or Savings-backed fleets, while burst capacity uses Spot across diverse compatible instance types to lower cost without making the core tier fragile.',
  },
]

const pitfalls = [
  'Treating EC2 instances as manually curated pets instead of replaceable fleet members.',
  'Baking long-lived AWS credentials into the image or filesystem instead of using an instance role.',
  'Putting important durable state on instance store without an application-level replication plan.',
  'Launching into public subnets with broad security groups because it is faster than designing the network properly.',
  'Using huge user-data scripts to build the whole machine at boot instead of creating an AMI and a repeatable template.',
  'Choosing one exact instance type everywhere, which makes scaling and Spot adoption much harder when capacity is constrained.',
  'Ignoring IMDS hardening and then being surprised by metadata-related security exposure.',
  'Assuming a stopped instance and a terminated instance have equivalent consequences.',
  'Running production fleets without a tested patching and replacement strategy.',
  'Trying to solve poor application design with larger and larger instance sizes rather than measuring the real bottleneck.',
]

const examples = [
  {
    id: 'ex-launch-template',
    title: 'Launch template shape',
    code: `{
  "ImageId": "ami-xxxxxxxx",
  "InstanceType": "m7g.large",
  "IamInstanceProfile": {
    "Name": "app-ec2-role"
  },
  "MetadataOptions": {
    "HttpTokens": "required",
    "HttpEndpoint": "enabled"
  },
  "SecurityGroupIds": ["sg-app"],
  "UserData": "base64-encoded bootstrap",
  "TagSpecifications": [
    {
      "ResourceType": "instance",
      "Tags": [
        { "Key": "service", "Value": "orders" },
        { "Key": "env", "Value": "prod" }
      ]
    }
  ]
}`,
    explanation:
      'A launch template centralizes the launch contract. In production, treat it as versioned infrastructure rather than as a convenience wrapper around console choices.',
  },
  {
    id: 'ex-user-data',
    title: 'Linux user data bootstrap',
    code: `#!/bin/bash
set -euxo pipefail

dnf -y update
dnf -y install amazon-cloudwatch-agent

cat >/etc/myapp/config.env <<'EOF'
APP_ENV=prod
LOG_LEVEL=info
EOF

systemctl enable myapp
systemctl start myapp`,
    explanation:
      'Keep bootstrap short and deterministic. Heavy application assembly belongs in the image pipeline or explicit configuration automation, not in an ever-growing first-boot script.',
  },
  {
    id: 'ex-imdsv2',
    title: 'IMDSv2 token flow',
    code: `TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

curl -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/instance-id`,
    explanation:
      'IMDSv2 uses a session-oriented token flow. Requiring IMDSv2 is a common hardening step because it reduces exposure to several metadata-access abuse patterns.',
  },
  {
    id: 'ex-asg',
    title: 'Auto Scaling fleet shape',
    code: `Internet / internal clients
  -> Load balancer
  -> Auto Scaling group
     -> EC2 instance in AZ-a
     -> EC2 instance in AZ-b
     -> EC2 instance in AZ-c
  -> Shared dependencies

Deployment path:
  new AMI
  -> new launch template version
  -> instance refresh / rolling replacement`,
    explanation:
      'This is the standard production EC2 pattern. The application talks to a stable front door while the fleet underneath can grow, shrink, and refresh safely.',
  },
  {
    id: 'ex-spot',
    title: 'Spot-friendly worker design',
    code: `Queue
  -> worker fleet in Auto Scaling group
     -> multiple instance families
     -> multiple Availability Zones
     -> mixed On-Demand + Spot

Worker behavior:
  poll job
  checkpoint progress
  handle interruption signal
  retry idempotently`,
    explanation:
      'Spot works well when the application contract expects interruption. Flexibility across instance types and zones matters as much as the discount itself.',
  },
]

const glossaryTerms = [
  {
    term: 'EC2 instance',
    definition:
      'A virtual server in AWS with a selected machine image, hardware profile, attached storage, and network identity.',
  },
  {
    term: 'AMI',
    definition:
      'Amazon Machine Image; the template used to launch an EC2 instance.',
  },
  {
    term: 'Launch template',
    definition:
      'A reusable, versioned set of instance launch parameters such as AMI, instance type, user data, storage, tags, and metadata options.',
  },
  {
    term: 'Instance type',
    definition:
      'The hardware profile for an EC2 instance, including CPU, memory, storage characteristics, and network capabilities.',
  },
  {
    term: 'EBS',
    definition:
      'Elastic Block Store; persistent block storage commonly attached to EC2 instances.',
  },
  {
    term: 'Instance store',
    definition:
      'Local ephemeral storage attached to some instance types; fast but not durable across instance loss.',
  },
  {
    term: 'Security group',
    definition:
      'A stateful virtual firewall attached to an instance network interface.',
  },
  {
    term: 'ENI',
    definition:
      'Elastic Network Interface; the network attachment that carries IPs and security-group bindings for an instance.',
  },
  {
    term: 'Instance profile',
    definition:
      'The IAM container used to attach an IAM role to an EC2 instance.',
  },
  {
    term: 'IMDS',
    definition:
      'Instance Metadata Service; the on-instance endpoint used to retrieve metadata and role credentials.',
  },
  {
    term: 'IMDSv2',
    definition:
      'The session-oriented version of the Instance Metadata Service that uses a token-based request flow.',
  },
  {
    term: 'Auto Scaling group',
    definition:
      'A fleet manager that launches, replaces, and scales EC2 instances to maintain desired capacity.',
  },
  {
    term: 'Placement group',
    definition:
      'A configuration that influences how instances are physically placed relative to one another.',
  },
  {
    term: 'Spot Instance',
    definition:
      'Unused EC2 capacity offered at a discount with the tradeoff that AWS can interrupt it when capacity conditions change.',
  },
  {
    term: 'Nitro System',
    definition:
      'AWS hardware and software architecture that underpins many modern EC2 instance families and enables strong isolation and high performance.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Instances.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-launch-template.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-options.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html',
  'https://docs.aws.amazon.com/ec2/latest/instancetypes/ec2-nitro-instances.html',
  'https://docs.aws.amazon.com/us_en/AWSEC2/latest/UserGuide/placement-groups.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html',
  'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html',
  'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html',
  'https://docs.aws.amazon.com/ebs/latest/userguide/ebs-attaching-volume.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html',
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-purchase-models', label: 'Purchase Models' },
    { id: 'bp-launch-flow', label: 'Launch Flow' },
    { id: 'bp-when', label: 'When to Choose EC2' },
  ],
  'core-concepts': [
    { id: 'core-instance-model', label: 'Instance Model' },
    { id: 'core-amis', label: 'AMIs and Templates' },
    { id: 'core-instance-types', label: 'Instance Types' },
    { id: 'core-nitro', label: 'Nitro System' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-identity', label: 'Identity and Metadata' },
    { id: 'core-bootstrap', label: 'Bootstrapping' },
    { id: 'core-lifecycle', label: 'Lifecycle' },
    { id: 'core-scaling', label: 'Scaling and Fleets' },
    { id: 'core-placement', label: 'Placement' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-performance', label: 'Performance and Cost' },
    { id: 'core-ops-notes', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const ec2HelpStyles = `
.ec2-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ec2-help-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.ec2-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ec2-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.ec2-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.ec2-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
}

.ec2-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.ec2-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.ec2-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.ec2-help-main {
  display: grid;
  grid-template-columns: 236px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.ec2-help-toc {
  overflow: auto;
  padding: 12px;
  border-right: 1px solid #808080;
  background: #f2f2f2;
}

.ec2-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ec2-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ec2-help-toc-list li {
  margin: 0 0 8px;
}

.ec2-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ec2-help-content {
  overflow: auto;
  padding: 16px 20px 24px;
  background: #fff;
}

.ec2-help-content h1 {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.ec2-help-content h2 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ec2-help-content h3 {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.ec2-help-content p,
.ec2-help-content li {
  font-size: 12px;
  line-height: 1.55;
}

.ec2-help-content p {
  margin: 0 0 10px;
}

.ec2-help-content ul,
.ec2-help-content ol {
  margin: 0 0 12px 20px;
  padding: 0;
}

.ec2-help-section {
  margin: 0 0 22px;
}

.ec2-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.ec2-help-codebox {
  margin: 6px 0 12px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.ec2-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.ec2-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .ec2-help-main {
    grid-template-columns: 1fr;
  }

  .ec2-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .ec2-help-title {
    font-size: 13px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsEc2Page(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="ec2-help-page">
      <style>{ec2HelpStyles}</style>
      <div className="ec2-help-window" role="presentation">
        <header className="ec2-help-titlebar">
          <span className="ec2-help-title">{pageTitle}</span>
          <div className="ec2-help-controls">
            <button className="ec2-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="ec2-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ec2-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ec2-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ec2-help-main">
          <aside className="ec2-help-toc" aria-label="Table of contents">
            <h2 className="ec2-help-toc-title">Contents</h2>
            <ul className="ec2-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ec2-help-content">
            <h1>{pageTitle}</h1>
            <p className="ec2-help-subheading">{pageSubtitle}</p>
            <p>
              This page is intentionally broad because EC2 is not just a VM launch button. It is the operational foundation for a
              large class of AWS workloads, and good EC2 design depends on understanding how compute shape, images, networking,
              storage, identity, bootstrapping, scaling, and replacement fit together.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="ec2-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="ec2-help-section">
                  <h2>Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="ec2-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="ec2-help-divider" />

                <section id="bp-purchase-models" className="ec2-help-section">
                  <h2>Purchase Models</h2>
                  {purchaseModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="ec2-help-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <hr className="ec2-help-divider" />

                <section id="bp-launch-flow" className="ec2-help-section">
                  <h2>Launch Flow</h2>
                  <ol>
                    {launchLifecycle.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <hr className="ec2-help-divider" />

                <section id="bp-when" className="ec2-help-section">
                  <h2>When to Choose EC2</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="ec2-help-section">
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops-notes" className="ec2-help-section">
                  <h2>Operational Notes</h2>
                  {operationalNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="ec2-help-section">
                  <h2>Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="ec2-help-section">
                  <h2>Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="ec2-help-section">
                    <h2>{example.title}</h2>
                    <div className="ec2-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="ec2-help-section">
                <h2>Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="ec2-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="ec2-help-inline-link" target="_blank" rel="noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
