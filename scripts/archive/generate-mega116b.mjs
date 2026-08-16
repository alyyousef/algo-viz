import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 61.4 High-Performance Computing
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/Supercomputing/index.mdx': `---
title: Supercomputing
description: The use of supercomputers, the fastest computers currently available, designed for massive-scale parallel processing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Supercomputing">

If you want to mathematically simulate the biological fusion reactions occurring inside the core of the Sun, or calculate the aerodynamics of a Boeing 777 wing, a standard Cloud server mathematically fails.

**Supercomputing** relies on massive, tightly coupled biological hardware. Supercomputers (like the Exascale *Frontier* machine) contain millions of CPU and GPU cores wired together with insanely high-bandwidth networks (like InfiniBand). They are mathematically capable of executing over a *Quintillion* calculations per biological second (ExaFLOPS).

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/Cluster computing/index.mdx': `---
title: Cluster computing
description: Two or more computers (nodes) acting as a single, more powerful system, linked by a local area network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cluster Computing">

Historically, Supercomputers were biologically custom-built monoliths. Today, almost all High-Performance Computing (HPC) is done via **Cluster Computing**.

<Callout icon="success" title="The Commodity Supercomputer">
  Instead of building one massive biological CPU, scientists buy 10,000 standard, cheap "commodity" servers (Nodes) and plug them into a massive network switch.
  
  The mathematical challenge is the software: the workload must be mathematically chopped up using parallel programming libraries (like **MPI**, Message Passing Interface), so that all 10,000 servers can biologically work on their specific piece of the physics simulation simultaneously, constantly whispering partial results to each other over the network.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/Scientific computing/index.mdx': `---
title: Scientific computing
description: The construction of mathematical models and quantitative analysis techniques and using computers to analyze and solve scientific problems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Scientific Computing">

**Scientific Computing** is the mathematical discipline of translating pure physics into C++ and Fortran.

It abandons standard enterprise software architectures (like HTTP servers and JSON) because they are biologically too slow. Scientific Computing relies on solving massive, continuous differential equations. Because computers mathematically cannot understand continuous curves, the math must be "discretized" into a massive grid of billions of tiny biological points, which the supercomputer then calculates step-by-step.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/Computational fluid dynamics/index.mdx': `---
title: Computational fluid dynamics
description: A branch of fluid mechanics that uses numerical analysis and data structures to analyze and solve problems that involve fluid flows.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computational Fluid Dynamics (CFD)">

Instead of building a biological wind tunnel to test a Formula 1 car, engineers mathematically simulate the wind tunnel using **CFD**.

CFD relies on solving the Navier-Stokes equations—the terrifying mathematical formulas that govern exactly how fluids (air, water) flow. The computer divides the 3D space around the virtual car into a mesh of 100 million tiny biological tetrahedrons. It then mathematically calculates the exact air pressure, velocity, and turbulence inside every single tiny box, 1,000 times per biological second, allowing the engineer to see exactly where aerodynamic drag occurs.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/Finite element methods/index.mdx': `---
title: Finite element methods
description: A widely used method for numerically solving differential equations arising in engineering and mathematical modeling.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Finite Element Method (FEM)">

If you biologically crash a virtual car into a wall, how do you mathematically know if the steel bumper will snap or bend?

The **Finite Element Method** breaks the biological 3D CAD model of the car into a mesh of millions of tiny, mathematical "finite elements". If the car hits the wall, the computer calculates the exact stress and strain on the first tiny piece of steel. That piece then mathematically transfers its force to its 3 neighbors, which transfer to their neighbors, creating a massive wave of linear algebra that mathematically proves exactly where the car's chassis will fail.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/Numerical linear algebra libraries (BLAS/index.mdx': `---
title: BLAS (Basic Linear Algebra Subprograms)
description: A specification that prescribes a set of low-level routines for performing common linear algebra operations such as vector addition, scalar multiplication, dot products, linear combinations, and matrix multiplication.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="BLAS">

Almost all Scientific Computing, Physics Simulations, and modern Artificial Intelligence mathematically boils down to one simple operation: **Matrix Multiplication**.

<Callout icon="warning" title="The Hardware Baseline">
  **BLAS** is the biological bedrock of computation. 
  
  It is a specification for the lowest-level linear algebra routines. Hardware vendors (like Intel, AMD, and NVIDIA) mathematically hand-write their own hyper-optimized BLAS libraries in raw assembly code to perfectly match the cache sizes and vector registers of their physical silicon chips. When you write \`import numpy as np; np.dot(A, B)\` in Python, Python is biologically doing zero math; it is just handing the data down to the C/Assembly BLAS library.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/LAPACK)/index.mdx': `---
title: LAPACK
description: A standard software library for numerical linear algebra, providing routines for solving systems of simultaneous linear equations, least-squares solutions, eigenvalue problems, and singular value problems.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LAPACK">

While BLAS handles the low-level, biological matrix multiplication, **LAPACK** (Linear Algebra PACKage) handles the high-level math.

Written originally in Fortran, LAPACK mathematically provides the complex algorithms needed by scientists: solving massive systems of linear equations, finding eigenvalues, and performing Singular Value Decompositions (SVD). LAPACK biologically sits on top of BLAS; the LAPACK algorithm handles the mathematical strategy, but delegates the raw number-crunching down to the hardware-optimized BLAS.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.4 High-Performance Computing/HPC job schedulers (Slurm)/index.mdx': `---
title: HPC job schedulers (Slurm)
description: A highly scalable, open-source cluster management and job scheduling system for large and small Linux clusters.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Slurm"
  subtitle="The Traffic Cop of Supercomputers"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Slurm_Workload_Manager.svg/512px-Slurm_Workload_Manager.svg.png"
  description="Slurm is the dominant open-source workload manager that mathematically allocates resources across the massive nodes of a supercomputer cluster."
  yearCreated={2002}
  creator="Livermore Computing"
  isOpenSource={true}
  websiteUrl="https://slurm.schedmd.com/"
>

If 50 different scientists mathematically want to run 50 different massive simulations on a single 10,000-node supercomputer, chaos would biologically ensue.

**Slurm** solves this. A scientist submits a "Job Script" mathematically defining their requirements (\`I need 400 CPUs and 50 GPUs for 48 hours\`). Slurm puts the job in a queue. It then biologically analyzes the cluster, waits for other jobs to finish, and the exact millisecond the hardware becomes available, it mathematically wakes up the scientist's script on exactly those specific 400 nodes, ensuring 100% biological utilization of the multi-million-dollar supercomputer.

</TechnologyTemplate>
`,

  // 61.5 Domain Apps
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/Telemedicine platforms/index.mdx': `---
title: Telemedicine platforms
description: The distribution of health-related services and information via electronic information and telecommunication technologies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Telemedicine Platforms">

**Telemedicine** is the mathematical bridge between biological healthcare and distributed web systems.

It combines WebRTC video streaming with strict biological regulatory compliance (like HIPAA in the US). These platforms must mathematically guarantee end-to-end encryption, ensuring that a patient's biological video feed and medical history cannot be intercepted by hackers or even mathematically read by the platform's own database administrators.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/Electronic health records (EHR)/index.mdx': `---
title: Electronic health records (EHR)
description: The systematized collection of patient and population electronically stored health information in a digital format.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Electronic Health Records (EHR)">

An **EHR** system is a massive, mathematically complex database that tracks the biological history of millions of patients.

<Callout icon="warning" title="The Legacy Nightmare">
  EHRs (like Epic or Cerner) are notoriously biologically difficult to engineer.
  
  They must mathematically track thousands of different medical codes (ICD-10), handle insane biological access control logic (\`A nurse can view this file, but only if they are currently assigned to the patient's floor\`), and maintain perfect mathematical audit logs of every single click for legal compliance.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/HL7-FHIR standards/index.mdx': `---
title: HL7-FHIR standards
description: Fast Healthcare Interoperability Resources is a standard describing data formats and elements and an application programming interface for exchanging electronic health records.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="HL7 & FHIR">

Historically, if Hospital A mathematically tried to send a patient's record to Hospital B, it biologically failed because Hospital A used XML and Hospital B used CSV.

**FHIR** (Fast Healthcare Interoperability Resources) is the modern mathematical standard that fixes this. It dictates exactly how a biological patient, allergy, or prescription should be mathematically structured in JSON. It provides a standardized REST API, allowing HealthTech apps to instantly and biologically plug into massive hospital databases without writing custom integration code.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/Adaptive learning/index.mdx': `---
title: Adaptive learning
description: An educational method which uses computers as interactive teaching devices, and to orchestrate the allocation of human and mediated resources according to the unique needs of each learner.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Adaptive Learning (EdTech)">

Instead of forcing 30 biological humans to read the exact same textbook chapter, **Adaptive Learning** uses mathematics to personalize the curriculum.

As a student answers questions in the software, an AI mathematically tracks their exact biological knowledge gaps. If the student mathematically fails 3 algebra questions in a row, the algorithm instantly dynamically generates easier, prerequisite arithmetic questions. It uses mathematical models (like Item Response Theory) to keep the student in the exact biological "Zone of Proximal Development".

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/Learning management systems/index.mdx': `---
title: Learning management systems
description: A software application for the administration, documentation, tracking, reporting, automation, and delivery of educational courses, training programs, or learning and development programs.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Learning Management Systems (LMS)">

An **LMS** (like Canvas or Moodle) is the biological backbone of modern universities and corporate training.

It is a mathematically massive enterprise CRUD application that handles Role-Based Access Control (RBAC) for Teachers, Students, and Admins. It must biologically process video hosting, real-time quizzes, mathematical gradebook calculations, and integration with massive plagiarism detection APIs, all while legally maintaining student privacy laws (like FERPA).

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/Legal document automation/index.mdx': `---
title: Legal document automation
description: The design of systems and workflows that assist in the creation of electronic documents from pre-existing text or data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Legal Document Automation">

Legal contracts are essentially biological programming code. They define variables, \`if/else\` conditional logic, and mathematical penalties.

**Legal Document Automation** takes biological Word documents and mathematically parameterizes them. A lawyer fills out a simple web form, and the system mathematically injects the variables, dynamically includes or deletes specific clauses based on conditional logic, and generates a perfect, 50-page PDF contract in milliseconds. Modern LegalTech increasingly uses Large Language Models (LLMs) to mathematically draft these clauses from scratch.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/E-discovery/index.mdx': `---
title: E-discovery
description: The electronic aspect of identifying, collecting and producing electronically stored information in response to a request for production in a lawsuit or investigation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="E-Discovery">

During a massive corporate lawsuit, a company might biologically hand over 5 million emails and Slack messages to the opposing lawyers.

<Callout icon="tip" title="Predictive Coding">
  It is biologically impossible for a human lawyer to read 5 million emails. **E-Discovery** uses Information Retrieval and NLP.
  
  Lawyers mathematically read a random sample of 1,000 emails and tag them as "Relevant" or "Not Relevant". An AI mathematically trains on this sample (Predictive Coding) and then biologically scans the remaining 4,999,000 emails, mathematically filtering out the garbage and surfacing the exact 50 "smoking gun" emails needed to win the trial.
</Callout>

</ConceptTemplate>
`,
}

async function generateMega116b() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega116b().catch(console.error)
