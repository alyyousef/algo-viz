import fs from 'fs/promises'
import path from 'path'

const ROOT = path.resolve('src/features/kb/routes/KB/42. Cybersecurity Fundamentals')
const files = [
  '42.4 Cybersecurity Disciplines/Cloud security/index.mdx',
  '42.4 Cybersecurity Disciplines/Container security/index.mdx',
  '42.4 Cybersecurity Disciplines/Digital forensics/index.mdx',
  '42.4 Cybersecurity Disciplines/Endpoint security/index.mdx',
  '42.4 Cybersecurity Disciplines/GRC (Governance, Risk, Compliance)/index.mdx',
  '42.4 Cybersecurity Disciplines/IAM/index.mdx',
  '42.4 Cybersecurity Disciplines/Incident response/index.mdx',
  '42.4 Cybersecurity Disciplines/Kubernetes security/index.mdx',
  '42.4 Cybersecurity Disciplines/Malware analysis/index.mdx',
  '42.4 Cybersecurity Disciplines/Mobile security/index.mdx',
  '42.4 Cybersecurity Disciplines/Network security/index.mdx',
  '42.4 Cybersecurity Disciplines/Penetration testing/index.mdx',
  '42.4 Cybersecurity Disciplines/Purple teaming/index.mdx',
  '42.4 Cybersecurity Disciplines/Red teaming/index.mdx',
  '42.4 Cybersecurity Disciplines/Reverse engineering/index.mdx',
  '42.4 Cybersecurity Disciplines/SOC operations/index.mdx',
  '42.4 Cybersecurity Disciplines/Threat intelligence/index.mdx',
  '42.5 Compliance & Standards/CCPA/index.mdx',
  '42.5 Compliance & Standards/FedRAMP/index.mdx',
  '42.5 Compliance & Standards/GDPR/index.mdx',
  '42.5 Compliance & Standards/HIPAA/index.mdx',
  '42.5 Compliance & Standards/ISO 27001/index.mdx',
  '42.5 Compliance & Standards/NIST Cybersecurity Framework/index.mdx',
  '42.5 Compliance & Standards/PCI-DSS/index.mdx',
  '42.5 Compliance & Standards/SOC 2/index.mdx',
  '42.6 Security Tools/Burp Suite/index.mdx',
  '42.6 Security Tools/Cobalt Strike/index.mdx',
  '42.6 Security Tools/Ghidra/index.mdx',
  '42.6 Security Tools/Hashcat/index.mdx',
  '42.6 Security Tools/IDA Pro/index.mdx',
  '42.6 Security Tools/John the Ripper/index.mdx',
  '42.6 Security Tools/Kali Linux/index.mdx',
  '42.6 Security Tools/Metasploit/index.mdx',
  '42.6 Security Tools/Nessus/index.mdx',
  '42.6 Security Tools/Nmap/index.mdx',
  '42.6 Security Tools/OWASP ZAP/index.mdx',
  '42.6 Security Tools/OpenVAS/index.mdx',
  '42.6 Security Tools/Snort/index.mdx',
  '42.6 Security Tools/Splunk/index.mdx',
  '42.6 Security Tools/Suricata/index.mdx',
  '42.6 Security Tools/Wireshark/index.mdx',
  'Attack surface/index.mdx',
  'Authentication/index.mdx',
  'Authorisation/index.mdx',
  'CIA triad/index.mdx',
  'Defence in depth/index.mdx',
  'Exploits/index.mdx',
  'Least privilege/index.mdx',
  'MFA/index.mdx',
  'Risk assessment/index.mdx',
  'Security frameworks (NIST, ISO 27001, CIS Controls)/index.mdx',
  'Threat modelling (STRIDE, DREAD)/index.mdx',
  'Threats/index.mdx',
  'Vulnerabilities/index.mdx',
  'Zero trust/index.mdx',
]

const needed = [
  'export default function Layout',
  '## 1. Deep Dive and Mechanics',
  '## 2. Mathematical / Theoretical Foundation',
  '## 3. Real-World Implementation',
  '## 4. Visualizations',
  '## 5. Interview Prep',
  '## 6. Production Use Cases',
  'mermaid',
  '<Callout',
  '<ComparisonTable',
]

let bad = 0
for (const rel of files) {
  const p = path.join(ROOT, rel)
  const t = await fs.readFile(p, 'utf8')
  const misses = needed.filter((s) => !t.includes(s))
  if (t.includes('TICK3') || t.includes('TICK1')) misses.push('leftover TICK')
  const icons = [...t.matchAll(/icon="([^"]+)"/g)].map((m) => m[1])
  const badIcon = icons.filter((i) => !['info', 'warning', 'error', 'tip'].includes(i))
  if (badIcon.length) misses.push('bad icon ' + badIcon.join(','))
  let body = t.replace(/```[\s\S]*?```/g, '')
  const lines = body.split('\n').filter((l) => {
    const s = l.trim()
    if (s.startsWith('import ') || s.startsWith('export ') || s.startsWith('return')) return false
    if (s.startsWith('<') || s.startsWith('}') || s.includes('{children}')) return false
    if (s.includes('headers={') || s.includes('rows={')) return false
    if (s.startsWith('[') || s === '/>' || s === '{') return false
    return true
  })
  const braceLines = lines.filter((l) => l.includes('{'))
  if (braceLines.length) {
    misses.push(
      'brace-prose: ' +
        braceLines
          .slice(0, 2)
          .map((x) => x.trim())
          .join(' | '),
    )
  }
  if (misses.length) {
    bad += 1
    console.log('FAIL', rel)
    for (const m of misses) console.log('  ', m)
  }
}
console.log(bad === 0 ? 'ALL OK ' + files.length : 'FAILED ' + bad)
