import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const topics = [
  // 8. Artificial Intelligence & ML
  {
    domain: '8. Artificial Intelligence & ML',
    folder: 'TensorFlow',
    title: 'TensorFlow',
    description: 'An end-to-end open source machine learning platform by Google.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '8. Artificial Intelligence & ML',
    folder: 'PyTorch',
    title: 'PyTorch',
    description: 'An open source machine learning framework developed by Meta.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '8. Artificial Intelligence & ML',
    folder: 'Scikit-learn',
    title: 'Scikit-learn',
    description: 'Machine learning library for the Python programming language.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '8. Artificial Intelligence & ML',
    folder: 'NumPy',
    title: 'NumPy',
    description: 'The fundamental package for scientific computing with Python.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '8. Artificial Intelligence & ML',
    folder: 'Pandas',
    title: 'Pandas',
    description:
      'Fast, powerful, flexible and easy to use open source data analysis and manipulation tool.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '8. Artificial Intelligence & ML',
    folder: 'Matplotlib',
    title: 'Matplotlib',
    description:
      'Comprehensive library for creating static, animated, and interactive visualizations in Python.',
    template: 'TechnologyTemplate',
  },

  // 6. Cloud Computing
  {
    domain: '6. Cloud Computing',
    folder: 'Azure',
    title: 'Microsoft Azure',
    description: 'Cloud computing platform operated by Microsoft.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '6. Cloud Computing',
    folder: 'GCP',
    title: 'Google Cloud Platform (GCP)',
    description: 'Suite of cloud computing services provided by Google.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '6. Cloud Computing',
    folder: 'OCI',
    title: 'Oracle Cloud Infrastructure (OCI)',
    description: 'Deep and broad platform of public cloud services by Oracle.',
    template: 'TechnologyTemplate',
  },

  // 7. DevOps & Infrastructure
  {
    domain: '7. DevOps & Infrastructure',
    folder: 'Kubernetes',
    title: 'Kubernetes',
    description:
      'Open-source system for automating deployment, scaling, and management of containerized applications.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '7. DevOps & Infrastructure',
    folder: 'Terraform',
    title: 'Terraform',
    description: 'Infrastructure as code tool by HashiCorp.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '7. DevOps & Infrastructure',
    folder: 'Git',
    title: 'Git',
    description: 'Distributed version control system.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '7. DevOps & Infrastructure',
    folder: 'GitHub',
    title: 'GitHub',
    description: 'Internet hosting service for software development and version control using Git.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '7. DevOps & Infrastructure',
    folder: 'CI-CD',
    title: 'CI/CD',
    description: 'Continuous Integration and Continuous Deployment/Delivery.',
    template: 'ConceptTemplate',
  },

  // 5. Databases & Storage
  {
    domain: '5. Databases & Storage',
    folder: 'SQL',
    title: 'SQL',
    description: 'Structured Query Language for managing relational databases.',
    template: 'ConceptTemplate',
  },
  {
    domain: '5. Databases & Storage',
    folder: 'NoSQL',
    title: 'NoSQL',
    description: 'Non-tabular databases optimized for highly scalable applications.',
    template: 'ConceptTemplate',
  },

  // 2. Web Development
  {
    domain: '2. Web Development',
    folder: 'APIs',
    title: 'APIs (Application Programming Interfaces)',
    description: 'Protocols for building and integrating application software.',
    template: 'ConceptTemplate',
  },
  {
    domain: '2. Web Development',
    folder: 'Backend',
    title: 'Backend Development',
    description: 'Server-side logic, databases, and application architecture.',
    template: 'ConceptTemplate',
  },
  {
    domain: '2. Web Development',
    folder: 'Frontend',
    title: 'Frontend Development',
    description: 'Client-side user interface and experience.',
    template: 'ConceptTemplate',
  },

  // 3. Mobile Development
  {
    domain: '3. Mobile Development',
    folder: 'iOS',
    title: 'iOS Development',
    description: 'Developing applications for Apple mobile devices.',
    template: 'ConceptTemplate',
  },
  {
    domain: '3. Mobile Development',
    folder: 'Android',
    title: 'Android Development',
    description: 'Developing applications for devices running the Android OS.',
    template: 'ConceptTemplate',
  },

  // Operating Systems
  {
    domain: '0. Computer Science Fundamentals',
    folder: 'Operating Systems',
    title: 'Operating Systems',
    description: 'System software that manages computer hardware and software resources.',
    template: 'ConceptTemplate',
  },
  {
    domain: '0. Computer Science Fundamentals/Operating Systems',
    folder: 'Linux',
    title: 'Linux',
    description: 'Family of open-source Unix-like operating systems based on the Linux kernel.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '0. Computer Science Fundamentals/Operating Systems',
    folder: 'Unix',
    title: 'Unix',
    description: 'Family of multitasking, multiuser computer operating systems.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '0. Computer Science Fundamentals/Operating Systems',
    folder: 'Windows',
    title: 'Microsoft Windows',
    description:
      'Group of several proprietary graphical operating system families developed by Microsoft.',
    template: 'TechnologyTemplate',
  },
  {
    domain: '0. Computer Science Fundamentals/Operating Systems',
    folder: 'macOS',
    title: 'macOS',
    description: 'Proprietary graphical operating system developed and marketed by Apple Inc.',
    template: 'TechnologyTemplate',
  },

  // 4. Software Engineering & Architecture
  {
    domain: '4. Software Engineering & Architecture',
    folder: 'Distributed Systems',
    title: 'Distributed Systems',
    description:
      'Computing environments in which various components are spread across multiple computers.',
    template: 'ConceptTemplate',
  },
  {
    domain: '4. Software Engineering & Architecture',
    folder: 'Software Engineering',
    title: 'Software Engineering',
    description: 'Systematic application of engineering approaches to the development of software.',
    template: 'ConceptTemplate',
  },

  // Computer Architecture
  {
    domain: '0. Computer Science Fundamentals',
    folder: 'Computer Architecture',
    title: 'Computer Architecture',
    description:
      'A set of rules and methods that describe the functionality, organization, and implementation of computer systems.',
    template: 'ConceptTemplate',
  },

  // 9. Networking & Security
  {
    domain: '9. Networking & Security',
    folder: 'Cybersecurity',
    title: 'Cybersecurity',
    description: 'The practice of protecting systems, networks, and programs from digital attacks.',
    template: 'ConceptTemplate',
  },
]

async function scaffold() {
  for (const topic of topics) {
    const dirPath = path.join(ROUTE_DIR, topic.domain, topic.folder)
    await fs.mkdir(dirPath, { recursive: true })

    const content = `---
title: ${topic.title}
description: ${topic.description}
---
import { ${topic.template} } from '@/features/kb/components/templates/${topic.template}'

<${topic.template} title="${topic.title}">

This is a placeholder page for **${topic.title}**. This topic covers ${topic.description.toLowerCase()}

<Callout icon="info" title="Under Construction">
  Detailed technical content, architecture diagrams, and comparison tables for this section are currently being drafted.
</Callout>

</${topic.template}>
`
    const filePath = path.join(dirPath, 'index.mdx')
    await fs.writeFile(filePath, content, 'utf-8')
    console.log(`Created: ${topic.domain}/${topic.folder}`)
  }
}

scaffold().catch(console.error)
