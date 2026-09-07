export const netPages = [
  {
    rel: '42.3 Network Security/ARP spoofing/index.mdx',
    title: 'ARP Spoofing',
    description:
      'Forged ARP replies that steal a LAN IPv4-to-MAC mapping so traffic detours through an attacker host.',
    body: `
**ARP spoofing** (ARP cache poisoning) targets IPv4 Ethernet LANs. Hosts cache IP-to-MAC mappings from Address Resolution Protocol replies and often accept unsolicited updates. A host that lies about a gateway IP can become a path for traffic. Defense is **do not trust open L2**: dynamic ARP inspection, static mappings for gateways, 802.1X, and encrypt above L2 with TLS.

## 1. Deep Dive and Mechanics

When A wants to reach 192.0.2.1, it asks who has that IP. Anyone on the broadcast domain can answer. Many stacks overwrite the cache. After a false MAC is installed, frames for that IP go to the liar. Combined with IP forwarding, this is a classic on-path position on a flat LAN.

**Where it works.** Shared L2 (cafe Wi-Fi, poorly segmented offices, some cloud "classic" networks). **Where it dies.** L2 isolation (private VLANs, wireless client isolation), DHCP snooping + DAI on campus switches, and overlays that do not use ARP the same way.

**You cannot "ARP-secure the internet".** This is a local-link problem. Users on hostile LANs need TLS and VPNs, not a hope that ARP is honest.

<Callout icon="info" title="IPv6 uses NDP, not ARP">
Neighbor Discovery has its own spoofing story. SEND exists; in practice you still isolate L2 and encrypt.
</Callout>

## 2. Mathematical / Theoretical Foundation

ARP is an unauthenticated broadcast mapping. There is no signature and no nonce binding a reply to a request in the original protocol. Security is therefore **environmental**: shrink the broadcast domain and police who may originate ARP. Encryption at L3/L7 does not stop diversion; it stops reading and changing plaintext.

<ComparisonTable
  headers={['Control', 'Layer', 'Effect']}
  rows={[
    ['Dynamic ARP inspection', 'L2 switch', 'Drops forged ARP vs DHCP binding'],
    ['Static ARP for gateway', 'Host / switch', 'Stops casual gateway theft'],
    ['Client isolation', 'Wi-Fi AP', 'Stations cannot ARP each other'],
    ['TLS / SSH / VPN', 'L5-L7', 'Diverted traffic stays unreadable'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Operator checklist (campus access switch)
# 1. Enable DHCP snooping and trust only the real DHCP uplink
# 2. Turn on DAI for user VLANs
# 3. Disable unused switch ports and require 802.1X
TICK3

On endpoints, prefer always-on TLS and a corporate VPN when the LAN is not yours.

## 4. Visualizations

TICK3mermaid
flowchart LR
    H[Host] --> SW[Switch L2]
    GW[Real gateway] --> SW
    Bad[Forged ARP: gateway is my MAC] --> H
    H --> Bad
TICK3

## 5. Interview Prep

**Q: Does HTTPS stop ARP spoofing?**
**A:** It stops the attacker from reading or modifying HTTP. It does not stop them from being on path, dropping packets, or attacking other cleartext protocols.

**Q: Why is this rare in well-built clouds?**
**A:** Hypervisors and SDN program MAC tables and isolate tenant L2. You do not share a promiscuous broadcast domain with strangers.

**Q: ARP spoofing vs MITM?**
**A:** Spoofing is one way to become MITM on a LAN. MITM is the broader on-path role.

## 6. Production Use Cases

- **Campus access** networks with DAI.
- **Guest Wi-Fi** with client isolation.
- **Incident response** when a NIC is in promiscuous mode on a flat VLAN.

<Callout icon="tip" title="Encrypt first, segment second">
You will not DAI every cafe. Assume hostile L2 for laptops and require TLS plus a VPN for corp apps.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/DDoS mitigation/index.mdx',
    title: 'DDoS Mitigation',
    description:
      'Absorbing, filtering, and shedding floods so a service stays available when traffic is hostile or simply huge.',
    body: `
A **distributed denial of service (DDoS)** attack tries to exhaust bandwidth, packets-per-second, connections, or application work. Mitigation is a stack: **anycast and scrubbing** at the edge, **rate limits and SYN cookies** in the stack, and **cheap application rejects** before expensive work. You cannot out-engineer physics from a single VM.

## 1. Deep Dive and Mechanics

**Volumetric** floods fill the pipe (UDP reflection, amplification). **Protocol** floods exhaust state (SYN, TCP mid-handshake). **Application** floods look like real users (HTTP GETs that hit expensive queries). Each layer needs a different control.

**Edge.** Anycast DNS and CDN/WAF providers spread traffic to many POPs and drop junk close to the source. **Origin.** Keep the origin address hidden. Autoscale for legitimate spikes; do not autoscale blindly into a bill shock without a max.

**Application.** Auth early. Cache. Captchas or proof-of-work only for unauthenticated expensive routes. Timeouts everywhere.

<Callout icon="warning" title="A WAF is not a volumetric shield">
If the pipe to the WAF or origin is full, L7 rules never run. Buy capacity or a scrubbing service for the L3/L4 problem.
</Callout>

## 2. Mathematical / Theoretical Foundation

Availability is a queueing problem. If arrival rate exceeds service rate, latency and loss explode (little's law, bufferbloat). Amplification is a gain factor: small spoofed queries produce large responses toward the victim. Defense reduces gain (disable open resolvers), raises service rate (anycast), and **admits** only a marked subset (tokens, cookies, priority queues for known-good).

<ComparisonTable
  headers={['Layer', 'Symptom', 'First response']}
  rows={[
    ['L3/L4 volumetric', 'Pipe full', 'Anycast / scrubbing'],
    ['TCP state', 'Half-open pileup', 'SYN cookies, conn limits'],
    ['HTTP flood', 'App CPU / DB', 'WAF, cache, auth, shed load'],
    ['Expensive search', 'Query fan-out', 'Hard timeouts, quotas'],
  ]}
/>

## 3. Real-World Implementation

TICK3nginx
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
server {
  location /login {
    limit_req zone=login burst=10 nodelay;
    proxy_read_timeout 5s;
  }
}
TICK3

Pair this with an upstream CDN and an origin allowlist so the internet cannot hit the app directly.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Inet[Internet flood] --> Anycast[Anycast scrubbing / CDN]
    Anycast --> Clean[Mostly clean traffic]
    Clean --> WAF[WAF + rate limits]
    WAF --> App[Origin app]
TICK3

## 5. Interview Prep

**Q: Why do UDP services get amplified?**
**A:** Spoofed source IPs plus a protocol that answers a small query with a large payload. Fix: disable open services, use anti-spoofing (BCP 38) as an operator.

**Q: Autoscaling as a DDoS defense?**
**A:** It can absorb a modest L7 flood and also bankrupt you. Cap replicas and put a shield in front.

**Q: Any cast vs unicast origin?**
**A:** Anycast lets many POPs share the destination IP so no single link is the choke. Origins stay hidden.

## 6. Production Use Cases

- **Public APIs and games** on a CDN/anycast provider.
- **Auth endpoints** with strict rate limits.
- **Launch events** that look like attacks — runbooks should tell them apart.

<Callout icon="tip" title="Rehearse the 'origin hide' drill">
The first time you move DNS to a scrubber should not be during an outage. Keep runbooks and access pre-staged.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/DMZ/index.mdx',
    title: 'DMZ',
    description:
      'A perimeter network segment that hosts internet-facing systems so a breach there is not a free hop into the intranet.',
    body: `
A **DMZ** (demilitarized zone) is a network segment for systems that must talk to the untrusted internet (load balancers, reverse proxies, email edge). Firewalls allow only specific flows: internet to DMZ services, DMZ to a few internal apps, and almost nothing from DMZ to workstation VLANs. The idea is **containment**, not magic safety.

## 1. Deep Dive and Mechanics

Classic three-legged firewall: outside, DMZ, inside. Public VIPs live in the DMZ. Application servers and databases live inside. The DMZ host authenticates and proxies; it does not store the crown-jewel database.

**Modern translations.** Cloud public subnets plus private subnets, or a WAF/CDN in front of private origins, are the same pattern. "We put the database in the DMZ so it is easier" is the anti-pattern.

**Jump hosts.** Admin access to DMZ boxes should come from a jump/PAM segment, not from the open internet and not from every laptop VLAN.

<Callout icon="warning" title="A flat 'DMZ VLAN' with 200 apps is not a DMZ">
If every edge box can reach every other edge box and a /16 of internals, you built a staging area for lateral movement.
</Callout>

## 2. Mathematical / Theoretical Foundation

A DMZ is a **cut** in the reachability graph. Security is the size of that cut: few allowed edges, each with a protocol and identity. Compromise of a DMZ node should not increase reachability into the internal set except along those edges. Zero Trust continues the idea by removing implicit trust even after the cut.

<ComparisonTable
  headers={['Placement', 'Internet ingress', 'Data store']}
  rows={[
    ['DMZ proxy / LB', 'Yes', 'No'],
    ['App in private subnet', 'Via proxy only', 'Talks to DB'],
    ['DB in private subnet', 'No', 'Yes'],
    ['DB in DMZ', 'Often accidentally', 'Worst case'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Example security-group sketch
# sg-dmz-lb: inbound 443 from 0.0.0.0/0; outbound 443 to sg-app
# sg-app: inbound 443 from sg-dmz-lb; outbound 5432 to sg-db
# sg-db: inbound 5432 from sg-app only
TICK3

Document each allow as a ticketed exception with an owner.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Inet[Internet] --> FW1[Edge firewall]
    FW1 --> DMZ[DMZ proxies]
    DMZ --> FW2[Internal firewall]
    FW2 --> App[App tier]
    App --> DB[Database]
TICK3

## 5. Interview Prep

**Q: Is a DMZ obsolete in Zero Trust?**
**A:** The name is old; the isolation is not. You still do not put data stores on public IPs. Zero Trust adds identity to every hop.

**Q: DMZ vs reverse proxy?**
**A:** A reverse proxy is often the DMZ workload. The DMZ is the network placement and policy around it.

**Q: What should never live in a DMZ?**
**A:** Authoritative directories, CAs, backup vaults, and primary databases.

## 6. Production Use Cases

- **On-prem** mail and web edges.
- **Cloud** public ALB subnet vs private ECS/GKE.
- **Partner** file-drop zones with no path to AD.

<Callout icon="tip" title="Draw the allowed flows, then delete the rest">
If you cannot list the edges, you do not have a DMZ. You have a second LAN.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/DNS attacks/index.mdx',
    title: 'DNS Attacks',
    description:
      'Abuse of the domain name system: cache poisoning, hijacked records, tunneling, and denial of the resolver path.',
    body: `
**DNS** maps names to data (usually IPs). Attacks either **lie about the mapping**, **steal the zone**, or **use DNS as a covert channel or flood**. Users then go to the wrong host with a perfect TLS warning — or no warning if the attacker also has a cert. Defense is **DNSSEC where it helps, registrar locks, resolver hygiene, and not treating DNS as a secret channel**.

## 1. Deep Dive and Mechanics

**Cache poisoning.** A resolver accepts a forged answer and caches it. Source-port randomization and DNSSEC validation made classic Kaminsky-style poisoning much harder. **Zone hijack.** Weak registrar credentials or compromised DNS host rewrite A and MX records. **DDoS.** Flood the authoritative servers or use them as amplifiers. **Tunneling.** Data stuffed in queries to a controlled zone — detect with length and entropy analytics, then restrict egress resolvers.

**Client path.** DoH/DoT hide queries from the local LAN and shift trust to the resolver operator.

<Callout icon="warning" title="A stolen registrar session beats most crypto">
Lock the domain, use phishing-resistant MFA, and monitor CT logs for unexpected certificates on your names.
</Callout>

## 2. Mathematical / Theoretical Foundation

Classic DNS is an unauthenticated UDP Q/A protocol. The 16-bit TXID plus a 16-bit port is the birthday-bound race that Kaminsky exploited against predictable ports. DNSSEC adds signatures (RRSIG) over records so a validator can reject forgeries — it does not encrypt queries. Confidentiality of the query is a different property (DoT/DoH).

<ComparisonTable
  headers={['Threat', 'Primary control']}
  rows={[
    ['Poisoned cache', 'Random ports, DNSSEC validate'],
    ['Stolen zone', 'Registrar lock, MFA, dual ops'],
    ['NXDOMAIN flood', 'Anycast auth DNS, rate limits'],
    ['Tunnel exfil', 'Forced resolver, inspect, block odd Qtypes'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
# Check whether a zone publishes DNSSEC signatures
dig example.com DNSKEY +short
dig example.com +dnssec +noall +answer
TICK3

In cloud, require that prod zones live in an account with change tickets and that resolvers used by apps are yours, not 8.8.8.8 from a random pod.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Stub[Stub resolver] --> Rec[Recursive resolver]
    Rec --> Auth[Authoritative zone]
    Auth --> Rec
    Rec --> Stub
    Fake[Forged answer] --> Rec
TICK3

## 5. Interview Prep

**Q: Does DNSSEC stop phishing sites?**
**A:** No. It stops forgeries of *your* signed records in validating resolvers. A look-alike domain is a different name.

**Q: Why is DNS used for data exfil?**
**A:** It is often allowed out when HTTP is proxied. Fix egress: only your resolver, and watch query volume.

**Q: Split-horizon DNS risks?**
**A:** Internal names that leak to public resolvers, or clients that flip views and cache the wrong answer.

## 6. Production Use Cases

- **Public zones** on anycast DNS with registrar locks.
- **Corp resolvers** that validate DNSSEC and log.
- **Incident response** for sudden A-record changes.

<Callout icon="tip" title="Alert on NS and DS changes">
Those records changing is a five-alarm fire. Wire registrar and DNS host webhooks to the SOC.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/Firewalls/index.mdx',
    title: 'Firewalls',
    description:
      'Policy enforcement points that allow or deny flows based on addresses, ports, state, and sometimes identity or application.',
    body: `
A **firewall** is a policy checkpoint on a network path. Stateless packet filters match addresses and ports. **Stateful** firewalls track connections so return traffic can flow without a matching inbound rule. Next-gen devices add application identification and user identity. Cloud **security groups** are distributed stateful firewalls. None of them replace application authz.

## 1. Deep Dive and Mechanics

Rules are ordered: first match wins, or last match, depending on the product — read the manual. Default deny on inbound is the only sane baseline. Stateful inspection stores 5-tuples and TCP flags so you do not write reciprocal rules for every flow.

**Placement.** Edge (internet), internal segmentation, host (nftables, Windows Firewall), and service mesh sidecars. **Change control** matters more than brand: a 2,000-line any-any leftover is a rumor of a firewall.

**IPv6, ICMP, and fragments** are where rulesets go to die. Test both families.

<Callout icon="info" title="A security group is a firewall">
If every SG allows 0.0.0.0/0 on 443 to the database, you did not "move to the cloud". You opened the world.
</Callout>

## 2. Mathematical / Theoretical Foundation

A filter is a function from packets (or flows) to allow, deny, or log. Stateful firewalls are finite automata keyed by 5-tuple. Correctness is the same as access-control safety: can a packet from untrusted reach a protected asset? Model the policy as a set of allowed edges and prove (or test) that production paths are a subset.

<ComparisonTable
  headers={['Type', 'State', 'Typical place']}
  rows={[
    ['Stateless ACL', 'No', 'Routers, some NACLs'],
    ['Stateful FW / SG', 'Yes', 'Hosts, cloud NICs, NGFW'],
    ['WAF', 'HTTP semantics', 'App edge'],
    ['Mesh sidecar', 'Identity + port', 'Pod to pod'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Cloud SG sketch: app may accept 443 only from the load-balancer SG
Inbound: tcp/443 source sg-lb
Outbound: tcp/5432 dest sg-db
Default: deny
TICK3

Prefer SG-to-SG or identity rules over wide CIDRs.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Src[Source] --> Pol[Ordered policy]
    Pol --> State[State table]
    State --> Allow[Allow]
    Pol --> Deny[Deny + log]
TICK3

## 5. Interview Prep

**Q: Security group vs NACL?**
**A:** SGs are stateful and attach to ENIs. NACLs are stateless subnet ACLs. Use SGs as the real control; NACLs as a coarse belt.

**Q: Why default deny?**
**A:** New services should not be reachable until someone writes an allow with an owner. Default allow is entropy.

**Q: Can a firewall stop SQL injection?**
**A:** Not reliably. That is an application bug. A WAF may catch some patterns; fix the query API.

## 6. Production Use Cases

- **VPC / VNet** micro-perimeters.
- **On-prem** plant networks with a narrow IT-OT conduit.
- **Host firewalls** as a last layer if the NIC is moved.

<Callout icon="tip" title="Review any-any rules like they are production incidents">
Each one should have an expiry and an owner. Eternal any-any is how DMZs rot.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/IDS/index.mdx',
    title: 'Intrusion Detection System (IDS)',
    description:
      'A sensor that watches copies of traffic or logs and raises alerts when a signature or anomaly matches — it does not block by itself.',
    body: `
An **IDS** observes. It sits on a TAP, span port, or log stream and says "this looks like a known exploit kit or a weird beacon". It does **not** drop the packet. That is an IPS. Detection quality is a precision/recall problem: too many signatures and you page the SOC into silence; too few and you miss.

## 1. Deep Dive and Mechanics

**Network IDS (NIDS)** reconstructs flows and matches signatures (Snort/Suricata style) or trains baselines. **Host IDS (HIDS)** watches syscalls, files, and process trees (auditd, EDR). Modern shops often fold NIDS into NDR and HIDS into EDR, but the job is the same: **signal for responders**.

**Placement.** You cannot inspect what is encrypted without a decrypt policy (TLS middlebox) or endpoint telemetry. Many teams now detect on metadata (JA3, SNI, flow sizes) plus host sensors instead of full payload.

**Tuning.** Start with high-confidence rules, then add hunt hypotheses. Every rule needs an owner and a runbook.

<Callout icon="info" title="An unread IDS is expensive art">
If alerts do not land in a ticket queue with SLAs, you bought a museum exhibit. Budget people before sensors.
</Callout>

## 2. Mathematical / Theoretical Foundation

Signature detection is pattern matching (Aho-Corasick, PCRE) over streams — high precision for known bits, zero recall for new ones. Anomaly detection is density estimation: flag tails of a baseline. You pay false positives. Evasion is the adversary's encoding problem (fragmentation, encryption, slow-and-low). There is no complete detector; there is a cost curve.

<ComparisonTable
  headers={['Mode', 'Blocks', 'Strength', 'Weakness']}
  rows={[
    ['NIDS signatures', 'No', 'Known attacks', 'Encryption, novelty'],
    ['NIDS anomaly', 'No', 'Unknown floods', 'False positives'],
    ['HIDS / EDR', 'Sometimes', 'Host truth', 'Needs an agent'],
    ['IPS', 'Yes', 'Inline stop', 'Availability risk'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Conceptual Suricata placement
# SPAN/TAP -> sensor -> EVE JSON -> SIEM
# Rule policy: emerging-critical.rules enabled; informational disabled
TICK3

Ship EVE or equivalent into the SIEM with the packet pcap kept for a short window so analysts can validate.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Tap[SPAN or TAP] --> Sensor[IDS sensor]
    Sensor --> Alert[Alert]
    Sensor --> Pcap[Short pcap buffer]
    Alert --> SIEM[SIEM / SOC]
TICK3

## 5. Interview Prep

**Q: IDS vs IPS?**
**A:** Detect versus detect-and-block. IPS is inline and can outage you. IDS is safer to deploy first.

**Q: Why do encrypted networks weaken NIDS?**
**A:** Payloads are opaque. You still see IPs, SNI, sizes, and timing — or you instrument the endpoint.

**Q: Signature vs anomaly in an interview?**
**A:** Signatures: known bad. Anomaly: unusual. You want both, plus threat intel, plus a human.

## 6. Production Use Cases

- **East-west** visibility in a data center.
- **Compliance** "we monitor" controls with evidence.
- **Hunt** teams using the same sensors.

<Callout icon="tip" title="Measure mean time to triage, not rule count">
A thousand rules that nobody understands are worse than fifty with runbooks.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/IPS/index.mdx',
    title: 'Intrusion Prevention System (IPS)',
    description:
      'An inline detector that can drop or reset flows when a rule matches, trading availability risk for active blocking.',
    body: `
An **IPS** is an IDS placed **in line**. It can drop packets, reset connections, or tarpit. That is powerful and dangerous: a bad rule or a sensor failure can become a self-inflicted outage. Deploy fail-open versus fail-closed as an explicit business choice, start in detect-only, then promote rules that have earned trust.

## 1. Deep Dive and Mechanics

Traffic must pass through the IPS (or a bump-in-the-cloud equivalent). Matching uses the same signature and reputation engines as IDS, plus rate-based and protocol-anomaly drops. TLS inspection, if used, requires a corporate root on endpoints and a privacy/legal review.

**Cloud equivalents.** WAF plus security-group denies plus gateway firewalls. Host IPS is often the EDR "block" mode.

**Change management.** Every blocking rule needs a rollback. Keep a maintainers' allowlist for scanners and health checks so you do not page yourself.

<Callout icon="warning" title="Fail-closed IPS without HA is a single point of outage">
If the appliance dies and the path dies, you just DDoSed yourself. Design HA or an agreed fail-open.
</Callout>

## 2. Mathematical / Theoretical Foundation

Inline enforcement is a real-time classifier with an asymmetric loss function: false positives cost availability; false negatives cost compromise. Promote rules along a curve: detect, tune, then block. Stateful protocol parsers reduce evasion but add implementation risk (parser bugs become your CVE).

<ComparisonTable
  headers={['Mode', 'On match', 'Outage risk']}
  rows={[
    ['IDS', 'Alert', 'Low'],
    ['IPS detect-only', 'Alert', 'Low'],
    ['IPS drop', 'Silent drop', 'Medium'],
    ['IPS reset', 'RST / block page', 'Medium'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Promotion pipeline
# 1. New rule in alert-only for 14 days
# 2. False-positive budget < 1 per day
# 3. Enable drop for that SID on the edge policy
# 4. Keep a one-command disable
TICK3

Never copy a full emerging-threats block set onto an IPS on day one.

## 4. Visualizations

TICK3mermaid
flowchart LR
    In[Packets] --> IPS[Inline IPS]
    IPS --> Out[Forward]
    IPS --> Drop[Drop / reset]
    IPS --> SOC[Alert copy]
TICK3

## 5. Interview Prep

**Q: When would you not deploy IPS?**
**A:** Unreliable HA, no rule owners, or a latency-sensitive path you cannot fail-open. Use IDS plus host block instead.

**Q: IPS vs WAF?**
**A:** IPS is usually L3-L4 and generic exploits. WAF speaks HTTP. They overlap; they are not identical.

**Q: What is fail-open vs fail-closed?**
**A:** Open: sensor death lets traffic through (availability). Closed: sensor death blocks (security). Write it down.

## 6. Production Use Cases

- **Internet edge** after a stable detect-only period.
- **OT conduits** with a tiny allowlist and IPS as a backstop.
- **EDR block mode** on workstations.

<Callout icon="tip" title="Page on IPS bypass, not only on IPS hits">
A sensor that stops seeing traffic is as bad as a sensor that never existed.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/MITM attacks/index.mdx',
    title: 'Man-in-the-Middle Attacks',
    description:
      'An on-path adversary who can read or alter messages unless the protocol authenticates the peer and protects integrity.',
    body: `
A **man-in-the-middle (MITM)** sits on the path — by routing, proxy, ARP, rogue AP, or a compromised middlebox — and can observe or change traffic. Cryptography's job is to make that position useless: **authenticate the peer, encrypt, and MAC**. TLS with proper certificate checks is the default defense for the web.

## 1. Deep Dive and Mechanics

Without authentication, DH is just two agreements with the middle. With a valid cert and a checked hostname, the middle cannot complete the handshake unless they have a trusted cert for that name (rogue CA, stolen key, or the user clicked through a warning).

**User-assisted MITM.** Installing a mystery root CA, ignoring certificate errors, or using "SSL bump" at a cafe. **Protocol downgrade.** Stripping TLS so the client falls back to HTTP — HSTS fights this.

**Enterprise TLS inspection** is an explicit MITM with a company root. Treat it as a high-value target and a privacy boundary.

<Callout icon="error" title="Certificate warnings are the product">
Teaching users to click through them trains a successful MITM. Fix clocks and names instead.
</Callout>

## 2. Mathematical / Theoretical Foundation

Unauthenticated key exchange is vulnerable to a relay. Authentication binds the key to a name (signature over the transcript). AEAD then gives IND-CCA-style protection of records. The remaining attacks are **outside the crypto**: stolen keys, rogue trust anchors, and endpoints that skip verify.

<ComparisonTable
  headers={['Peer check', 'On-path can decrypt?', 'Typical fail']}
  rows={[
    ['No TLS', 'Yes', 'Cleartext'],
    ['TLS, verify off', 'Yes if they terminate', 'CERT_NONE'],
    ['TLS + hostname + trusted CA', 'No', 'User override, rogue CA'],
    ['TLS + pin / private CA', 'No unless pin leaked', 'Rotation pain'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import ssl
import socket

ctx = ssl.create_default_context()
with socket.create_connection(('api.example.com', 443)) as s:
    with ctx.wrap_socket(s, server_hostname='api.example.com') as t:
        t.sendall(b'GET /health HTTP/1.1\\r\\nHost: api.example.com\\r\\n\\r\\n')
TICK3

Do not disable verification to "just test". Use a lab CA in the trust store instead.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C as Client
    participant M as On-path
    participant S as Server
    C->>M: ClientHello
    M->>S: ClientHello
    Note over C,S: Without auth, M can run two handshakes
    Note over C,S: With TLS verify, M cannot present a valid cert
TICK3

## 5. Interview Prep

**Q: Is a VPN anti-MITM?**
**A:** It moves trust to the VPN server and hides the cafe LAN. If the VPN is down and the app falls back to cleartext, you lost.

**Q: HSTS versus pinning?**
**A:** HSTS forces HTTPS to a name. Pinning (or private PKI) shrinks which CAs may speak for you.

**Q: Can you MITM TLS 1.3?**
**A:** Not without a trusted cert or a broken client. You can still drop packets.

## 6. Production Use Cases

- **Public Wi-Fi** threat model for mobile apps (certificate pinning debates).
- **Service-to-service mTLS** so a flipped route is not enough.
- **Corp proxies** that are documented, monitored, and keyed in an HSM.

<Callout icon="tip" title="Never ship CERT_NONE in production builds">
A debug flag that disables verify will leak. Gate it out of release configurations.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/Network segmentation/index.mdx',
    title: 'Network Segmentation',
    description:
      'Splitting a network into zones with controlled conduits so a breach in one place cannot walk the entire estate.',
    body: `
**Network segmentation** is cutting the reachability graph. Workstations should not talk to every database. Payment should not share a VLAN with printers. The old version is VLANs and firewalls. The new version adds identity (Zero Trust, service mesh). Both exist to **limit blast radius**.

## 1. Deep Dive and Mechanics

Define zones by trust and function: users, corp servers, PCI, OT, guests, prod, nonprod. Allow only documented conduits. East-west traffic inside a fat VLAN is how ransomware spreads.

**Cloud.** VPCs, subnets, SGs, and private endpoints. **Kubernetes.** NetworkPolicies so a compromised front-end pod cannot scrape the metadata API or the billing DB. **Identity overlay.** Even on one L3 network, mTLS plus policy can segment.

**Avoid "VLAN 1 for everything" and "prod and QA peered with any-any".**

<Callout icon="warning" title="A VLAN without an enforced ACL is a coloring book">
Tags are not policy. Policy is what a firewall, SG, or fabric ACL drops.
</Callout>

## 2. Mathematical / Theoretical Foundation

Think of hosts as vertices and allowed flows as directed edges. Segmentation minimizes edges and clusters high-value assets with a small cut. The "air gap" is the extreme: zero edges. Most businesses need a few monitored edges. Graph cut algorithms are a metaphor; the work is inventory plus deny-by-default.

<ComparisonTable
  headers={['Technique', 'Enforcement', 'Granularity']}
  rows={[
    ['VLAN + ACL', 'L2/L3', 'Subnet'],
    ['SG / firewall', 'L3/L4', 'ENI or host'],
    ['Mesh / ZTNA', 'Identity', 'Service or user'],
    ['Air gap', 'Physics', 'Site'],
  ]}
/>

## 3. Real-World Implementation

TICK3yaml
# Kubernetes NetworkPolicy sketch: only frontend may reach api on 8080
kind: NetworkPolicy
spec:
  podSelector: { matchLabels: { app: api } }
  ingress:
    - from:
        - podSelector: { matchLabels: { app: frontend } }
      ports:
        - port: 8080
TICK3

Pair with a default-deny policy in the namespace.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Users[User zone] --> App[App zone]
    App --> Data[Data zone]
    Guest[Guest Wi-Fi] --> Inet[Internet only]
    OT[OT zone] --> Conduit[Narrow historian conduit]
TICK3

## 5. Interview Prep

**Q: Microsegmentation vs classic DMZ?**
**A:** DMZ is one cut at the edge. Microsegmentation puts cuts around each workload. You usually want both.

**Q: Does Zero Trust replace segmentation?**
**A:** It replaces implicit trust on a fat LAN. You still want coarse network cuts for defense in depth.

**Q: How do you prove segmentation works?**
**A:** Attempt connections from a canary in zone A to a listener in zone B and record the deny. Regularly.

## 6. Production Use Cases

- **PCI and HIPAA** cardholder / ePHI enclaves.
- **Ransomware** containment on campuses.
- **Multi-tenant** cloud accounts with separate VPCs.

<Callout icon="tip" title="Segment nonprod from prod">
QA credentials and looser SGs should not be a bridge into production data.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/Packet sniffing/index.mdx',
    title: 'Packet Sniffing',
    description:
      'Capturing frames or packets for troubleshooting and forensics — and why encryption is the defense against hostile capture.',
    body: `
**Packet sniffing** is recording traffic that passes a NIC, TAP, or span. On a hub or a misconfigured switch, a NIC in promiscuous mode sees neighbors. On modern switched networks you usually see only your own frames plus broadcasts — unless you are the gateway, a TAP, or you poisoned L2. For defenders, sniffing is how you debug TLS handshakes and prove an incident. For attackers on a hostile LAN, it is how they harvest cleartext.

## 1. Deep Dive and Mechanics

Capture tools (Wireshark, tcpdump) put an interface in promiscuous or monitor mode and apply BPF filters. Legal and policy rules apply: you capture on systems you are authorized to operate.

**What sniffing cannot do well.** Proper TLS 1.3 payloads without keys. **What it still sees.** DNS (sometimes), SNI, IPs, sizes, timing, and any leftover HTTP or telnet.

**Defense.** Encrypt (TLS, SSH, IPsec), isolate L2, and treat admin capture stations as high-value.

<Callout icon="info" title="Authorization first">
Packet capture on a network you do not operate can be illegal. This page is about defensive telemetry and why encryption matters.
</Callout>

## 2. Mathematical / Theoretical Foundation

A packet is a structured byte string. Capture is sampling a stream. Encryption makes the payload look like high-entropy bits; metadata remains. Traffic analysis (timing, sizes) is a side channel even when AEAD is perfect. Padding and multiplexing (QUIC) reduce some of those leaks.

<ComparisonTable
  headers={['What you capture', 'Cleartext HTTP', 'TLS 1.3']}
  rows={[
    ['URLs and bodies', 'Yes', 'No'],
    ['SNI / destination', 'Host header', 'Often SNI, dest IP'],
    ['Credentials', 'Often', 'No if verify is on'],
    ['Handshake errors', 'n/a', 'Yes, useful for debug'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
# Authorized debug on a host you own: DNS and TLS handshakes only
sudo tcpdump -i eth0 -n 'port 53 or port 443' -c 100
TICK3

For application debug, prefer structured logs over standing packet captures in prod.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Wire[Frames] --> NIC[Capture NIC / TAP]
    NIC --> BPF[BPF filter]
    BPF --> Store[Pcap]
    Store --> Analyst[Analyst]
TICK3

## 5. Interview Prep

**Q: Promiscuous mode on a switch port — what do you see?**
**A:** Usually just your traffic. To see others you need a TAP/SPAN, a hub, or an L2 attack. Cloud "sniffing neighbors" is generally blocked by the hypervisor.

**Q: How do you debug TLS if you cannot read payloads?**
**A:** Handshake logs, SSLKEYLOGFILE in a lab, or application-level tracing. Do not disable verify.

**Q: Is sniffing the same as MITM?**
**A:** Passive sniffing is observe-only. MITM can alter. Both are defeated for confidentiality by good TLS.

## 6. Production Use Cases

- **Incident response** with a time-boxed TAP.
- **Performance** debugging of retransmits.
- **Teaching** why HTTP basic auth died.

<Callout icon="tip" title="Encrypt management protocols">
SNMPv1, telnet, and HTTP consoles turn every TAP into a password dump. SSH and TLS first.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/Port scanning/index.mdx',
    title: 'Port Scanning',
    description:
      'Enumerating which transport ports accept connections — used by operators for inventory and by attackers for reconnaissance.',
    body: `
A **port scan** asks which TCP/UDP ports on a host respond. Defenders scan their own estate to find unexpected listeners. Attackers scan to map attack surface. This page is about **what a scan is, what it leaks, and how you detect and shrink it** — not how to run an offensive campaign.

## 1. Deep Dive and Mechanics

A TCP connect to a closed port usually gets a RST; an open port completes a handshake; a filtered port is silent or ICMP-blocked. Operators use inventory scanners inside a change window with written authorization. Exposed management ports (SSH, RDP, WinRM, databases) on the public internet are the usual finding.

**Defense.** Do not listen on public IPs unless you must. Put admin ports on VPN or ZTNA. Detect scan patterns at the edge (many ports, few packets each) and rate-limit. Banner-free services leak less, but a closed port is better than a stealthy open one.

<Callout icon="info" title="Only scan systems you are allowed to test">
Unauthorized scanning can violate law and policy. Inventory is a defensive control with a ticket and a scope.
</Callout>

## 2. Mathematical / Theoretical Foundation

A scan is a sampling of the function that maps each port to open, closed, or filtered. Information theoretically, each distinct response bit-reduces the unknown configuration. Evasion (slow scans, idle scans) is just a lower sample rate to stay under IDS thresholds. Detection is hypothesis testing on request rates and fan-out.

<ComparisonTable
  headers={['Control', 'Effect']}
  rows={[
    ['No public listener', 'Nothing to find'],
    ['SG / firewall default deny', 'Filtered from the internet'],
    ['ZTNA / VPN admin', 'Ports not on the public map'],
    ['Scan detection', 'SOC signal, not a wall'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Defensive posture
# - Inventory listeners with your approved scanner on RFC1918
# - Alert when a new public port appears in cloud config
# - Close RDP/SSH to 0.0.0.0/0
TICK3

Cloud config rules (no 22/3389 from the world) catch more risk than arguing about SYN vs ACK scan types.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Inv[Authorized inventory] --> Map[Expected listeners]
    Inet[Internet] --> Edge[Default deny]
    Edge --> Pub[Only 443 on the LB]
    Unexpected[New public port] --> Alert[SOC alert]
TICK3

## 5. Interview Prep

**Q: Why do companies scan themselves?**
**A:** Drift. Someone opened 5432 "for a minute". Inventory is how you notice.

**Q: Does hiding port numbers equal security?**
**A:** No. Security through obscurity fails against a thorough scan. Close and authenticate.

**Q: UDP vs TCP scanning?**
**A:** UDP is slower and noisier to interpret (no handshake). Still inventory DNS, VPN, and QUIC listeners.

## 6. Production Use Cases

- **Attack-surface** management for public cloud.
- **Compliance** evidence of closed admin ports.
- **SOC detections** for wide fan-out from a workstation (worm-like).

<Callout icon="tip" title="Alert on new public listeners, not on every SYN">
Config drift is the signal. The internet scans you all day; paging on that is noise.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/VPNs/index.mdx',
    title: 'VPNs',
    description:
      'Encrypted tunnels that extend a private network or hide a path, from IPsec site-to-site to modern Zero Trust access.',
    body: `
A **VPN** (virtual private network) wraps IP traffic in an encrypted tunnel so a cafe or transit network cannot read it, and so a remote host can appear on a private network. Classic remote-access VPNs grant a broad network. **ZTNA** products shrink that to per-app access. Site-to-site IPsec still glues clouds and offices.

## 1. Deep Dive and Mechanics

**Remote access.** Client authenticates (cert or MFA), IKE or a TLS session derives keys, and a virtual interface gets a private IP. Routes decide what goes into the tunnel (full-tunnel vs split-tunnel). **Site-to-site.** Gateways authenticate each other and encrypt selected prefixes.

**Risks.** A VPN that dumps every laptop onto the same /16 is a ransomware highway. Split-tunnel leaks corp DNS or traffic if routes are wrong. Always-on plus device posture beats optional VPN that users turn off.

<Callout icon="warning" title="A VPN is not a product security program">
It hides the cafe. It does not patch your intranet SMB servers or fix IDOR. Combine with segmentation.
</Callout>

## 2. Mathematical / Theoretical Foundation

IKE/IPsec and WireGuard/TLS-VPN are authenticated key exchange plus AEAD for packets. Properties you want: PFS (ephemeral DH), strong identity (device cert, not a shared group password), and replay protection (counters). Split-tunnel is a routing policy, not a crypto property — mis-routed prefixes break confidentiality assumptions.

<ComparisonTable
  headers={['Style', 'Identity', 'Reach']}
  rows={[
    ['Full-tunnel TLS/IPsec', 'User + device', 'Whole intranet'],
    ['Split-tunnel', 'User + device', 'Selected prefixes'],
    ['Site-to-site IPsec', 'Gateway cert/PSK', 'Prefix pairs'],
    ['ZTNA / per-app', 'User + device + app', 'One service'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Policy sketch
# - Device cert + MFA to the broker
# - Posture: disk encryption, EDR healthy
# - Routes: only app CIDRs, not 0.0.0.0/0 unless required
# - Intranet still requires SSO on each app
TICK3

Prefer certificate identities over a single pre-shared key for site-to-site.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Lap[Laptop] --> Tun[Encrypted tunnel]
    Cafe[Cafe LAN] --> Tun
    Tun --> GW[VPN / ZTNA broker]
    GW --> App[Private apps]
TICK3

## 5. Interview Prep

**Q: Full-tunnel vs split-tunnel?**
**A:** Full-tunnel sends all traffic through corp (better control, more cost). Split-tunnel sends only corp prefixes (better UX, easier leak).

**Q: VPN vs Zero Trust?**
**A:** VPN is a fat pipe onto a network. ZTNA authenticates per application and avoids a shared LAN.

**Q: Why are group PSKs a smell?**
**A:** Everyone shares a secret; rotation is a flag day; you cannot revoke one contractor.

## 6. Production Use Cases

- **Workforce** remote access.
- **Cloud-to-datacenter** prefixes.
- **Partner** extranet with a dedicated VRF.

<Callout icon="tip" title="Log connects and posture fails">
A VPN without device inventory is how former contractors stay on the network.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/WAF/index.mdx',
    title: 'Web Application Firewall (WAF)',
    description:
      'An HTTP-aware reverse proxy that blocks or challenges requests matching known attack patterns or custom rules.',
    body: `
A **WAF** sits in front of an HTTP app and inspects methods, paths, headers, and bodies. It can block common injection strings, enforce size limits, add bot challenges, and virtual-patch a CVE until you ship code. It is **not** a substitute for parameterized queries or access control. Treat it as a seatbelt.

## 1. Deep Dive and Mechanics

Modes: detect (log), block, or challenge (CAPTCHA/JS). Rule sets (OWASP CRS) match regular expressions and protocol anomalies. Custom rules encode your business (block /admin from the internet, rate-limit /login). Positioning is usually a CDN or reverse proxy so you also get DDoS absorption.

**Tuning.** Default CRS in block mode will break real apps. Start in detect, add exceptions with owners, then block high-confidence rules. Bypass paths (old origin IP, leftover .git) make the WAF theater.

<Callout icon="warning" title="Hide the origin">
If attackers can hit the app IP directly, they walk around the WAF. Allowlist the WAF egress to the origin.
</Callout>

## 2. Mathematical / Theoretical Foundation

A WAF is a classifier over HTTP messages. Regex rules have high false-positive rates on unusual-but-legal input (O'Reilly in a name). They have false negatives on novel encodings. Defense-in-depth says: WAF raises cost for commodity scans; correct application code is the invariant. Formal language theory again: you cannot regex a context-free SQL grammar into safety.

<ComparisonTable
  headers={['Control', 'Catches', 'Misses']}
  rows={[
    ['WAF signatures', 'Commodity scans', 'Logic bugs, new encodings'],
    ['Parameterized SQL', 'Injection class', 'Need to actually use it'],
    ['Authz tests', 'IDOR', 'WAF almost never sees this'],
    ['Rate limits', 'Credential stuffing', 'Slow distributed stuffing'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Origin lock
# - Public DNS points only at the WAF
# - Origin SG: inbound 443 from WAF CIDRs only
# - WAF: block /admin*, rate-limit /login, CRS paranoia level 1
TICK3

Keep an emergency bypass with MFA and a ticket, not a standing hole.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Client[Client] --> WAF[WAF / CDN]
    WAF --> Block[Block or challenge]
    WAF --> Origin[Origin app]
    Direct[Direct-to-origin] --> SG[SG deny]
TICK3

## 5. Interview Prep

**Q: WAF vs IPS?**
**A:** WAF understands HTTP. IPS understands packets and generic exploits. Use both in different places.

**Q: Can a WAF make a vulnerable app safe?**
**A:** It can buy time. Assume a motivated attacker will find a bypass. Fix the code.

**Q: Positive vs negative security?**
**A:** Negative: block known bad. Positive: allow only known schemas. Positive is stricter and more work.

## 6. Production Use Cases

- **Public internet** apps on a CDN WAF.
- **Virtual patch** windows after a framework CVE.
- **Bot management** on login and checkout.

<Callout icon="tip" title="Measure blocked vs false-positive tickets">
If support volume spikes after a rule, you will turn the WAF off. Tune, do not disable.
</Callout>
`,
  },
  {
    rel: '42.3 Network Security/Zero Trust networking/index.mdx',
    title: 'Zero Trust Networking',
    description:
      'Never trust the network location: authenticate every session, authorize per resource, and assume the LAN is hostile.',
    body: `
**Zero Trust networking** rejects the old castle model ("inside the VPN is safe"). Every request is authenticated, authorized, and encrypted, whether it comes from a cafe or the head office. The network is an untrusted pipe. Identity, device posture, and least privilege replace a fat subnet.

## 1. Deep Dive and Mechanics

Principles: authenticate the user and device; authorize the specific resource; encrypt in transit; log the decision; assume breach. Implementations: **ZTNA** brokers, **service mesh mTLS**, **BeyondCorp-style** HTTPS apps with SSO and device certs, and disappearing implicit trust in security groups.

**What you still need.** A physical LAN, some segmentation, and endpoint security. Zero Trust is not a product SKU; it is a policy that products implement.

**Failure mode.** "We bought ZTNA" plus a standing any-any backdoor for "break glass" that never expires.

<Callout icon="info" title="Location is a signal, not a grant">
A corp IP can still be malware. A cafe IP can still be a healthy laptop with a good identity. Score both; do not treat either as destiny.
</Callout>

## 2. Mathematical / Theoretical Foundation

Classic perimeter security is a coarse ACL on topology. Zero Trust is a function from (identity, device, resource, context) to a decision, evaluated per session. That is ABAC plus a hostile-network assumption. Formal goal: compromising one host does not grant ambient authority to the rest of the graph.

<ComparisonTable
  headers={['Model', 'Trusts', 'Access unit']}
  rows={[
    ['Castle / VPN', 'Inside IP', 'Whole network'],
    ['DMZ', 'Fewer inside IPs', 'Segment'],
    ['Zero Trust', 'Identity + posture', 'Application or RPC'],
    ['Mesh mTLS', 'Workload identity', 'Service'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Request path
# device cert + SSO + EDR healthy -> broker issues a short-lived grant
# grant is valid for one app, not a /16
# app still does its own user authz
TICK3

Keep break-glass accounts in a vault with dual control and expiry.

## 4. Visualizations

TICK3mermaid
flowchart LR
    User[User + device] --> Broker[Policy broker]
    Broker --> Dec[Allow or deny]
    Dec --> App[Single app]
    LAN[Office LAN] --> Broker
TICK3

## 5. Interview Prep

**Q: Is Zero Trust anti-firewall?**
**A:** No. You still drop unused ports. You stop believing a source IP means a friend.

**Q: How is this different from a VPN?**
**A:** VPN grants a network. Zero Trust grants an application session after posture checks.

**Q: What is the hardest part?**
**A:** Legacy protocols that cannot do modern identity (old SMB, OT). You wrap them or segment them honestly.

## 6. Production Use Cases

- **Workforce** access to SaaS and internal HTTPS.
- **Service-to-service** mTLS in Kubernetes.
- **Third-party** contractors who should never see the whole LAN.

<Callout icon="tip" title="Start with one app, not a slogan">
Move the VPN-published wiki to SSO + ZTNA, measure tickets, then take the next app. Big-bang Zero Trust dies in procurement.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Application security/index.mdx',
    title: 'Application Security',
    description:
      'Engineering practice that builds controls into software: threat modeling, secure defaults, review, and tests — not a scanner bolted on at the end.',
    body: `
**Application security (AppSec)** is the discipline of making software resist abuse. It covers design (threat models), implementation (safe APIs), review, testing (SAST, DAST, unit authz tests), and the supply chain (dependencies, CI). A WAF and a yearly pentest are extras. The core is **engineers shipping safer defaults every week**.

## 1. Deep Dive and Mechanics

Shift-left is jargon for "do not wait for prod". Concrete loop: threat-model new features, use frameworks that escape by default, ban dangerous APIs in lint, require authz tests, scan dependencies, and run DAST on a staging URL. Security champions in each team beat a central team that only says no.

**Scope.** Web, mobile, APIs, background jobs, and admin tools. The forgotten batch job is a frequent hole.

**Metrics that matter.** Time to patch a critical CVE in your deps, percent of routes with authz tests, escaped-prod incident rate. Vanity: number of SAST findings closed by marking "won't fix".

<Callout icon="info" title="AppSec is a software problem">
If the fix is "more firewall", you may have the wrong owner. Most OWASP items die in code review and tests.
</Callout>

## 2. Mathematical / Theoretical Foundation

You cannot prove a large app secure, but you can raise the cost of classes of bugs. Language-theoretic security (separate code and data), least privilege, and type systems that make XSS sinks hard are force multipliers. Risk ranking (OWASP, CVSS for deps) is how you order a queue, not a proof.

<ComparisonTable
  headers={['Control', 'When', 'Catches']}
  rows={[
    ['Threat model', 'Design', 'Missing authz, SSRF features'],
    ['Lint / SAST', 'Commit', 'String-built SQL, raw HTML'],
    ['Authz unit tests', 'Commit', 'IDOR'],
    ['DAST / pentest', 'Staging', 'Runtime config, missed sinks'],
  ]}
/>

## 3. Real-World Implementation

TICK3yaml
# CI sketch
# - lint: no pickle, no shell=True, no innerHTML
# - SAST + SCA on every PR
# - pytest authz tests required for **/routes/**
# - deploy blocked if critical CVE in prod deps without a ticket
TICK3

Keep a living threat model next to the architecture diagram, not in a PDF nobody opens.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Design[Threat model] --> Code[Safe frameworks]
    Code --> CI[Lint SAST tests]
    CI --> Stage[DAST staging]
    Stage --> Prod[Prod + WAF + logs]
    Prod --> Learn[Incidents back to design]
TICK3

## 5. Interview Prep

**Q: SAST vs DAST?**
**A:** SAST reads code without running it. DAST attacks a running app. You want both; neither replaces authz tests.

**Q: What does an AppSec engineer do all day?**
**A:** Design reviews, dangerous-API bans, pipeline work, incident consults, and teaching. Not only running a scanner.

**Q: How do you handle a huge legacy app?**
**A:** Strangle: safe frameworks for new routes, WAF virtual patch, prioritized rewrite of the money paths.

## 6. Production Use Cases

- **Product engineering** orgs with security champions.
- **Regulated** SDLC evidence (SOC 2 change control).
- **Open-source** products with a disclosure inbox.

<Callout icon="tip" title="Put a security test next to the feature test">
If a route has a happy-path test, it should have a "second user is denied" test. That single habit beats a tool license.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Blue teaming/index.mdx',
    title: 'Blue Teaming',
    description:
      'The defensive practice of detecting, responding to, and hardening against attacks — the counterpart to red team operations.',
    body: `
**Blue teaming** is defense as a craft: telemetry, detection engineering, incident response, and hardening. If red teams emulate adversaries, blue teams make that emulation noisy and short-lived. A healthy blue team owns **coverage** (can we see it?), **response** (can we evict it?), and **feedback** (did we close the hole?).

## 1. Deep Dive and Mechanics

Daily work: tune SIEM/EDR detections, hunt from intel, run tabletop and purple-team exercises, and fix the control that failed. During an incident: identify, contain, eradicate, recover, and write the post-incident review.

**People and tooling.** SOC analysts, detection engineers, IR, threat intel, and platform folks who can change logging. Tools without playbooks are dashboards.

**Success looks like.** Dwell time down, false-positive rate survivable, and engineering teams taking detection gaps as backlog items.

<Callout icon="info" title="Blue is not 'the people who say no'">
The job is to make the productive path the safe path, then prove you would see the other path.
</Callout>

## 2. Mathematical / Theoretical Foundation

Detection is classification under imbalance: almost all telemetry is benign. You optimize precision at a recall the SOC can staff. MITRE ATT&CK is a coverage map (techniques → detections), not a scoreboard. IR is a state machine with clocks (SLA to contain). Purple teaming is closed-loop testing of that map.

<ComparisonTable
  headers={['Function', 'Question', 'Artifact']}
  rows={[
    ['Detection eng', 'Would we alert?', 'Rule + test fixture'],
    ['SOC', 'What is this alert?', 'Ticket + runbook'],
    ['IR', 'How do we evict?', 'Timeline + containment'],
    ['Hardening', 'How does it not recur?', 'Control change'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Detection-as-code sketch
# - rule YAML in git
# - unit test: replay a sanitized log fixture, expect a hit
# - deploy via pipeline to the SIEM
# - ATT&CK tag on the rule for coverage reports
TICK3

Never ship a blocking or paging rule without a fixture and an owner.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Tel[Telemetry] --> Det[Detections]
    Det --> SOC[SOC triage]
    SOC --> IR[Incident response]
    IR --> Fix[Hardening]
    Red[Red / purple test] --> Det
TICK3

## 5. Interview Prep

**Q: Blue vs SOC vs IR?**
**A:** SOC is the operations floor. IR is the major-incident track. Blue team is the broader defensive practice that includes both plus engineering.

**Q: How do you measure a blue team?**
**A:** MTTD, MTTR, percent of ATT&CK techniques you actually test, and repeat-incident rate — not ticket volume.

**Q: What is purple teaming?**
**A:** Red and blue run the same scenario and immediately fix detections. It is a drill, not a surprise exam.

## 6. Production Use Cases

- **Enterprise SOC** with detection-as-code.
- **Cloud** teams watching IAM anomalies and egress.
- **Tabletop** exercises with executives.

<Callout icon="tip" title="Store detections in git">
If a rule exists only in a GUI, it will vanish and nobody will know what coverage you lost.
</Callout>
`,
  },
  {
    rel: '42.4 Cybersecurity Disciplines/Bug bounty programs/index.mdx',
    title: 'Bug Bounty Programs',
    description:
      'An invitation for outside researchers to report vulnerabilities in a defined scope for rewards and safe-harbor terms.',
    body: `
A **bug bounty** pays independent researchers for valid vulnerabilities in a published scope. It is not a pentest (time-boxed, contracted) and not a vulnerability disclosure inbox alone (that may pay nothing). A good program has **clear scope, a safe harbor, SLAs, and a triage team**. A bad program is "send us holes" with no lawyer-approved rules and no one to read the mail.

## 1. Deep Dive and Mechanics

Publish in-scope assets and **out-of-scope** items (DoS, social engineering, third-party SaaS you do not own). State the allowed techniques. Promise not to sue researchers who stay in bounds (safe harbor). Pay on a severity table. Triage duplicates quickly and do not argue severity for weeks.

**When to start.** After you can patch. A bounty on an unmaintained app is a press release. Many orgs start with a private program, then go public.

**Relationship to SDLC.** Bounties find leftovers. They do not replace AppSec or access-control tests.

<Callout icon="warning" title="Scope is a safety control">
If you do not exclude destructive testing, someone will. Write the rules like you want them followed on a Friday night.
</Callout>

## 2. Mathematical / Theoretical Foundation

A bounty is a market: you price external search time. Researchers maximize expected payout over their skill and your asset value. Underpaying criticals sends talent to competitors. Overpaying dupes of a known class (reflected XSS on a marketing site) wastes budget. Severity should track impact (data, authz, RCE), not how clever the write-up is.

<ComparisonTable
  headers={['Program', 'Who hunts', 'Best for']}
  rows={[
    ['VDP no pay', 'Altruists / duty', 'Minimum responsible disclosure'],
    ['Private bounty', 'Invited researchers', 'Learning to triage'],
    ['Public bounty', 'Anyone in scope', 'Mature targets'],
    ['Pentest', 'Hired team', 'Time-boxed depth'],
  ]}
/>

## 3. Real-World Implementation

TICK3markdown
# Policy sketch
# Scope: *.app.example.com, official iOS/Android apps
# Out of scope: DoS, physical, third-party IdP bugs, social engineering
# Safe harbor: good-faith research in scope will not be legal threats
# SLA: first response 2 business days
TICK3

Route reports into the same tracker as internal vulns so they get owners.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Res[Researcher] --> Plat[Platform / inbox]
    Plat --> Tri[Triage]
    Tri --> Dup[Duplicate]
    Tri --> Fix[Engineer fix]
    Fix --> Pay[Reward + disclosure]
TICK3

## 5. Interview Prep

**Q: Bounty vs pentest?**
**A:** Pentest is scheduled depth with a report. Bounty is continuous, variable quality, and public signaling. Use both.

**Q: Why private first?**
**A:** You learn volume, duplicate rate, and whether you can patch before the internet arrives.

**Q: Do you pay for out-of-scope reports?**
**A:** Usually no. Be kind, be clear, and fix them if they are real anyway.

## 6. Production Use Cases

- **Public SaaS** with a mature AppSec team.
- **Consumer apps** where researchers will look anyway.
- **Open-source** projects using a platform for triage.

<Callout icon="tip" title="Publish a security.txt pointer">
If researchers cannot find the program, they will dump issues on Twitter. Make the inbox obvious.
</Callout>
`,
  },
]
