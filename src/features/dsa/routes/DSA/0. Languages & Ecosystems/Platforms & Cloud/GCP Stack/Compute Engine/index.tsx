import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const computeHelpStyles = `
.compute-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.compute-help-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.compute-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.compute-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.compute-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.compute-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.compute-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.compute-help-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
}

.compute-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.compute-help-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.compute-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.compute-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.compute-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.compute-help-toc-list li {
  margin: 0 0 8px;
}

.compute-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.compute-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.compute-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.compute-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.compute-help-section {
  margin: 0 0 20px;
}

.compute-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.compute-help-content p,
.compute-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.compute-help-content p {
  margin: 0 0 10px;
}

.compute-help-content ul,
.compute-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.compute-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.compute-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.compute-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .compute-help-main {
    grid-template-columns: 1fr;
  }

  .compute-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .compute-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

const bigPictureSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Compute Engine is Google Cloud\'s infrastructure-as-a-service virtual machine platform. The simplest mental model is that it gives you cloud VMs, disks, images, and networking primitives while still leaving the operating system and a large share of runtime management in your hands.',
      'It is designed for workloads that need VM-level control: custom operating system behavior, legacy software, self-managed services, specialized runtimes, stateful systems, or infrastructure patterns that do not fit naturally into higher-level serverless or managed container platforms.',
      'Adopting Compute Engine means accepting more operational responsibility than Cloud Run or Cloud Functions. In return, you get more control over the machine, the operating system, attached storage, instance lifecycle, and workload placement.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'Not every workload fits neatly into serverless or platform-managed abstractions. Many systems still need VM-level control for software compatibility, custom networking, persistent state patterns, or specialized performance and hardware choices.',
      'Compute Engine matters because it is the base compute layer for those cases. It provides the cloud version of a machine you can shape more directly than a higher-level application platform.',
      'In a GCP architecture, Compute Engine often hosts legacy applications, self-managed databases, bastion hosts, specialized processing nodes, Windows workloads, custom appliances, and infrastructure components that need direct VM semantics.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'Compute Engine is strongest when the team needs operating system control, custom agents, direct access to VM lifecycle behavior, or software that assumes it owns the machine environment.',
      'It is also a strong fit for workloads that need specialized machine shapes, accelerators, sustained long-running processes, or infrastructure patterns that do not map cleanly to serverless products.',
      'It is a weaker fit when the workload is really just a stateless web service or event handler. In those cases, Cloud Run or Cloud Functions usually reduce operational overhead substantially.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common workflow is to choose a machine family and image, create an instance, attach disks, configure networking and identity, bootstrap the machine with startup scripts or configuration management, then operate it through patching, monitoring, scaling, and backups.',
      'Another common pattern is to define an instance template and use managed instance groups so that a fleet of machines can be created, updated, and autoscaled consistently.',
      'This matters because Compute Engine is not only about creating one VM. It often becomes an operating model for fleets, images, templates, and machine lifecycle management.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of Compute Engine as managed cloud VM infrastructure, not as a higher-level application platform.',
      'You gain flexibility and control, but you also own more of the operating system and application lifecycle.',
      'Machine type, disk design, image strategy, networking, and fleet management are core architectural decisions.',
      'Managed instance groups and templates are the scalable counterpart to one-off VM creation.',
      'Compute Engine is most valuable when a workload truly needs VM semantics rather than a simpler managed platform.',
    ],
  },
]

const mentalModels = [
  {
    title: 'A VM is still a machine you operate',
    detail:
      'The cloud provider manages infrastructure around the VM, but the guest operating system, patching, agents, and application behavior still require operational ownership.',
  },
  {
    title: 'Images and templates define repeatability',
    detail:
      'If instance creation is not image- and template-driven, fleets become inconsistent and hard to maintain.',
  },
  {
    title: 'Machine choice shapes workload economics',
    detail:
      'Machine family, CPU and memory ratio, accelerators, and spot usage all have direct cost and performance consequences.',
  },
  {
    title: 'Disks and networking are part of the workload model',
    detail:
      'A VM is not only CPU and RAM. Storage, boot design, attached volumes, external or internal access, and network policy all shape reliability and behavior.',
  },
  {
    title: 'Fleet management matters more than single-instance convenience',
    detail:
      'A manually created VM can work, but serious systems need templates, groups, startup automation, and update strategy.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-architecture',
    title: 'Instance model and resource architecture',
    paragraphs: [
      'Compute Engine revolves around instances, machine types, disks, images, networks, service accounts, and placement decisions. The VM is the central unit, but it is always part of a wider set of cloud resources.',
      'The practical architectural point is that an instance is not isolated. Its behavior depends on image choice, attached disks, startup flow, network path, identity, and how it is grouped or managed operationally.',
      'This is why Compute Engine architecture quickly becomes a fleet and lifecycle design problem rather than just a one-time provisioning choice.',
    ],
  },
  {
    id: 'core-machines',
    title: 'Machine families, shapes, and sizing',
    paragraphs: [
      'Compute Engine offers multiple machine families and shapes, including general-purpose, memory-heavy, compute-heavy, and specialized options. Picking a machine family is often one of the biggest performance and cost decisions for a VM-based workload.',
      'Right-sizing matters because overprovisioned VMs waste money while underprovisioned VMs create noisy performance issues that are hard to diagnose from the application layer alone.',
      'The useful mindset is to choose machines based on workload profile rather than habit. CPU-bound, memory-bound, cache-sensitive, and bursty workloads usually want different shapes.',
    ],
  },
  {
    id: 'core-images',
    title: 'Images, custom images, and startup scripts',
    paragraphs: [
      'Images define the bootable baseline for instances. Public images help teams start quickly, while custom images help standardize internal operating systems, agents, packages, and security posture.',
      'Startup scripts complement images by applying instance-time configuration or last-mile bootstrapping. The combination of image plus startup automation is what usually makes a VM fleet repeatable.',
      'A good Compute Engine practice is to avoid hand-crafted machine snowflakes. If a machine matters, its state should be reconstructible from image, template, and automation.',
    ],
  },
  {
    id: 'core-disks',
    title: 'Persistent disks, local storage, and snapshots',
    paragraphs: [
      'Compute Engine instances rely on disk design choices that affect both performance and recovery. Boot disks define the operating system baseline, while additional persistent disks can separate application data from the OS lifecycle.',
      'Snapshots and disk images are recovery and reproducibility tools, not only convenience features. They matter for backup posture, cloning, disaster recovery, and migration workflows.',
      'The important lesson is that disk design is part of workload architecture. Ephemeral assumptions, persistent data paths, and snapshot strategy all need to match the application\'s risk profile.',
    ],
  },
  {
    id: 'core-network',
    title: 'Networking, firewall rules, and service exposure',
    paragraphs: [
      'Compute Engine gives much more direct networking control than serverless platforms. That is a strength, but it also means teams must think carefully about internal versus external IP use, firewall behavior, routing, and service exposure.',
      'Networking mistakes on VMs can become security problems quickly because the platform will not automatically abstract away those choices. Exposure should be deliberate and minimal.',
      'A good rule is to design from least exposure outward: start with private communication and only add public-facing access where the workload truly needs it.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Service accounts and instance identity',
    paragraphs: [
      'Every VM can run with a service account identity, and that identity determines what Google Cloud resources the machine can access. That makes instance identity a real part of application architecture.',
      'This is important because VMs often run broad software stacks. If the service account is over-privileged, the blast radius of compromise becomes much larger than the application code alone suggests.',
      'Least-privilege IAM matters on VMs just as much as on serverless services, and often more, because the VM environment is broader and longer-lived.',
    ],
  },
  {
    id: 'core-groups',
    title: 'Instance templates and managed instance groups',
    paragraphs: [
      'Managed instance groups turn individual VMs into a fleet with repeatable configuration and lifecycle controls. They are the standard answer when the workload needs autoscaling, rolling updates, or template-driven instance replacement.',
      'Instance templates matter because they define what a fleet actually is: machine type, image, disks, metadata, service account, startup scripts, and other core settings.',
      'The practical lesson is simple: once a workload becomes more than one or two machines, managed groups and templates usually become more important than any individual VM setting.',
    ],
  },
  {
    id: 'core-spot',
    title: 'Spot VMs and cost-oriented compute',
    paragraphs: [
      'Spot VMs are the cost-oriented option for interruptible workloads. They can be excellent for batch processing, fault-tolerant workers, and other workloads that can absorb eviction.',
      'They are not a drop-in replacement for critical stateful systems. Using Spot effectively requires application design that expects interruption and can recover cleanly.',
      'The right mindset is to see Spot as an architectural choice, not just a discount. If the workload is not interruption-tolerant, the savings are usually not worth the operational risk.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, specialization, and hardware fit',
    paragraphs: [
      'Compute Engine performance depends on machine family, disk type, network path, accelerator usage, and operating system behavior. The flexibility is powerful, but it shifts more tuning responsibility onto the team.',
      'This is one place where Compute Engine differs sharply from higher-level platforms. You can optimize more deeply, but you must understand more of the stack to do it well.',
      'A useful habit is to validate assumptions with actual workload profiling. VM sizing guesses often drift over time as applications evolve.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations, patching, and lifecycle ownership',
    paragraphs: [
      'Compute Engine reduces hardware ownership, but not operating system ownership. Teams still need to patch, harden, monitor, rotate credentials, and plan updates for the guest environment.',
      'This makes Compute Engine a better fit for teams willing to run infrastructure discipline. If the team does not want to own that lifecycle, higher-level products are usually better.',
      'The important point is that VM convenience in the cloud should not be confused with hands-off operations. It is still an operating model with significant ownership requirements.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and adjacent services',
    paragraphs: [
      'Compute Engine commonly appears beside Cloud Load Balancing, Cloud SQL, managed instance groups, Cloud Storage, Cloud Build, monitoring tools, and network controls. It is often the substrate for systems that need broader control than serverless products allow.',
      'This ecosystem fit matters because most VM-based systems are not isolated. Load balancing, image pipelines, backups, logging, and network design usually matter just as much as the instance itself.',
      'The result is that Compute Engine often becomes part of a platform layer rather than a single-product decision.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with Cloud Run, Compute Engine gives much more control and much more operational responsibility. It is the better fit when the application needs VM semantics or deeper OS control.',
      'Compared with GKE, Compute Engine is simpler when the workload truly only needs VMs rather than full container orchestration, but it lacks the orchestration model Kubernetes provides.',
      'Compared with bare metal or on-prem virtual infrastructure, Compute Engine removes a large amount of hardware and provisioning burden while keeping the core VM operating model familiar.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Creating manually configured snowflake VMs that cannot be recreated consistently.',
      'Choosing Compute Engine for workloads that would be simpler and cheaper on higher-level managed platforms.',
      'Ignoring startup automation and image discipline for fleet workloads.',
      'Overexposing VMs to the network because firewall and ingress design were treated casually.',
      'Treating Spot VMs as if they were normal stable compute for critical workloads.',
      'Forgetting that guest OS patching and security hardening are still your responsibility.',
      'Scaling instances without considering connection limits, disk throughput, or downstream dependencies.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Choose Compute Engine when the workload needs VM-level control, custom OS behavior, or software that does not fit well on higher-level platforms.',
      'Use images, templates, and startup automation so machines are reproducible.',
      'Choose machine families based on actual workload profile, not only default habits.',
      'Design disk, network, and identity choices as core parts of the system.',
      'Use managed instance groups once the workload becomes a fleet problem.',
      'Prefer Cloud Run or Cloud Functions when the workload does not truly need VM semantics.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'As teams mature on Compute Engine, they usually become more deliberate about custom images, fleet rollout strategy, Spot usage, accelerator choices, migration paths, and cost-aware machine family selection.',
      'These practices matter because VM-based systems often become long-lived and operationally expensive if left unmanaged. Consistency and automation matter more over time, not less.',
      'The practical lesson is that Compute Engine is simple to start with, but it becomes most valuable when treated as a disciplined VM platform rather than as an emergency escape hatch from managed services.',
    ],
  },
]

const examples = [
  {
    title: 'Create a VM instance from a public image',
    code: `gcloud compute instances create web-1 \
  --zone=us-central1-a \
  --machine-type=e2-standard-2 \
  --image-family=debian-12 \
  --image-project=debian-cloud`,
    explanation:
      'This is the basic Compute Engine flow: choose zone, machine type, and image, then create a VM with the runtime environment you need.',
  },
  {
    title: 'Attach a startup script at instance creation time',
    code: `gcloud compute instances create web-1 \
  --zone=us-central1-a \
  --machine-type=e2-standard-2 \
  --metadata-from-file startup-script=./startup.sh`,
    explanation:
      'Startup scripts are one of the simplest ways to bootstrap machine configuration and reduce manual post-creation drift.',
  },
  {
    title: 'Create a snapshot of a persistent disk',
    code: `gcloud compute disks snapshot app-data-disk \
  --zone=us-central1-a \
  --snapshot-names=app-data-disk-2026-03-14`,
    explanation:
      'Snapshots are part of the operational recovery story for VM-based systems. They matter for backup, restore, cloning, and migration workflows.',
  },
  {
    title: 'Create an instance template for a fleet',
    code: `gcloud compute instance-templates create web-template \
  --machine-type=e2-standard-2 \
  --image-family=debian-12 \
  --image-project=debian-cloud \
  --metadata-from-file startup-script=./startup.sh`,
    explanation:
      'Templates are the repeatable unit for VM fleets. Once a workload needs multiple instances, templates usually matter more than any one manually created VM.',
  },
  {
    title: 'Create a managed instance group',
    code: `gcloud compute instance-groups managed create web-mig \
  --base-instance-name=web \
  --size=3 \
  --template=web-template \
  --zone=us-central1-a`,
    explanation:
      'Managed instance groups are the standard pattern for autoscaled or updateable VM fleets. They help turn VMs into an operable service layer instead of a pile of individually managed machines.',
  },
  {
    title: 'Create a Spot VM for interruptible work',
    code: `gcloud compute instances create batch-worker-1 \
  --zone=us-central1-a \
  --machine-type=e2-standard-4 \
  --provisioning-model=SPOT`,
    explanation:
      'Spot VMs are valuable for interruption-tolerant workloads. The cost benefit is real, but the application must be designed to handle termination cleanly.',
  },
]

const glossaryTerms = [
  {
    term: 'Instance',
    definition: 'A Compute Engine virtual machine resource with its own machine type, disks, image, metadata, networking, and identity.',
  },
  {
    term: 'Machine type',
    definition: 'The chosen CPU and memory shape for a virtual machine.',
  },
  {
    term: 'Image',
    definition: 'The bootable disk template used to create an instance.',
  },
  {
    term: 'Custom image',
    definition: 'An internally prepared image used to standardize operating system and application baseline state.',
  },
  {
    term: 'Persistent disk',
    definition: 'A durable block storage resource attached to a Compute Engine VM.',
  },
  {
    term: 'Snapshot',
    definition: 'A point-in-time copy of disk state used for recovery, cloning, or migration.',
  },
  {
    term: 'Managed instance group',
    definition: 'A fleet-management resource that creates and operates multiple instances from an instance template.',
  },
  {
    term: 'Instance template',
    definition: 'A reusable definition of VM configuration used to create consistent instances or fleets.',
  },
  {
    term: 'Startup script',
    definition: 'An initialization script that runs when an instance boots.',
  },
  {
    term: 'Spot VM',
    definition: 'A lower-cost interruptible VM intended for workloads that can tolerate eviction.',
  },
  {
    term: 'Zone',
    definition: 'The specific Google Cloud location where a VM instance runs.',
  },
  {
    term: 'Service account',
    definition: 'The Google Cloud identity attached to a VM for access to other platform resources.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-fit', label: 'Where It Fits Best' },
    { id: 'bp-workflow', label: 'Typical Workflow' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Instance Architecture' },
    { id: 'core-machines', label: 'Machine Families' },
    { id: 'core-images', label: 'Images and Startup' },
    { id: 'core-disks', label: 'Disks and Snapshots' },
    { id: 'core-network', label: 'Networking' },
    { id: 'core-identity', label: 'Identity and IAM' },
    { id: 'core-groups', label: 'Templates and MIGs' },
    { id: 'core-spot', label: 'Spot VMs' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-ecosystem', label: 'Ecosystem' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-antipatterns', label: 'Common Mistakes' },
    { id: 'core-decision', label: 'Decision Checklist' },
    { id: 'core-advanced', label: 'Advanced Capabilities' },
  ],
  examples: examples.map((example, index) => ({
    id: `example-${index + 1}`,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function GCPComputeEnginePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
    document.title = `GCP Compute Engine (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP Compute Engine',
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

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="compute-help-page">
      <style>{computeHelpStyles}</style>
      <div className="compute-help-window" role="presentation">
        <header className="compute-help-titlebar">
          <span className="compute-help-title">GCP Compute Engine</span>
          <div className="compute-help-controls">
            <button className="compute-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="compute-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="compute-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`compute-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="compute-help-main">
          <aside className="compute-help-toc" aria-label="Table of contents">
            <h2 className="compute-help-toc-title">Contents</h2>
            <ul className="compute-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="compute-help-content">
            <h1 className="compute-help-doc-title">GCP Compute Engine</h1>
            <p className="compute-help-doc-subtitle">Managed cloud virtual machines for workloads that need OS and VM-level control</p>
            <p>
              This page is intentionally detailed. It is meant to read like a compact Compute Engine manual: what the platform is,
              when VM semantics are the right choice, and which design choices matter for machine sizing, fleet management,
              storage, networking, cost, and operational ownership.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="compute-help-section">
                    <h2 className="compute-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="compute-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="compute-help-section">
                  <h2 className="compute-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="compute-help-section">
                    <h2 className="compute-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example, index) => (
                  <section key={example.title} id={`example-${index + 1}`} className="compute-help-section">
                    <h2 className="compute-help-heading">{example.title}</h2>
                    <div className="compute-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="compute-help-section">
                <h2 className="compute-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
