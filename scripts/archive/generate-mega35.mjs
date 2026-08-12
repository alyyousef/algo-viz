import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/RF fundamentals/index.mdx': `---
title: RF Fundamentals (Radio Frequency)
description: The core physics principles governing how data is encoded and transmitted invisibly through the air via electromagnetic waves.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="RF Fundamentals (Radio Frequency)">

Wired networking sends data using physical voltages across copper or light pulses across fiber. Wireless networking sends data by manipulating the invisible **Electromagnetic Spectrum**.

To transmit a binary \TICK11\TICK1 or \TICK10\TICK1 over the air, antennas generate Radio Frequency (RF) waves.

## The Three Properties of a Wave

Every radio wave has three mathematical properties that engineers can manipulate to encode data (known as Modulation):

1. **Amplitude**: The height (power) of the wave. You can encode a \TICK11\TICK1 as a tall wave, and a \TICK10\TICK1 as a short wave (AM Radio works this way).
2. **Frequency**: How fast the wave oscillates per second, measured in Hertz (Hz). A 2.4 GHz Wi-Fi wave oscillates 2.4 billion times per second. You can encode a \TICK11\TICK1 as a fast wave, and a \TICK10\TICK1 as a slow wave (FM Radio works this way).
3. **Phase**: The starting position of the wave. By suddenly shifting the wave backwards by 180 degrees, the receiver detects the "glitch" and translates it into binary data (PSK - Phase Shift Keying).

<Callout icon="info" title="The Trade-off of Physics">
  In RF engineering, you cannot cheat physics. **Low frequencies (like AM Radio at 1 MHz)** can travel for hundreds of miles and punch straight through concrete mountains, but they are incredibly slow, transferring almost zero data. **High frequencies (like 5G mmWave at 30 GHz)** can transfer multi-gigabit data instantly, but they cannot penetrate a single pane of glass and will drop if you put your hand over the phone.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Wi-Fi standards (802.11)/index.mdx': `---
title: Wi-Fi Standards (IEEE 802.11)
description: The ubiquitous set of protocols dictating how local devices connect wirelessly over the unlicensed 2.4GHz, 5GHz, and 6GHz bands.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Wi-Fi Standards (IEEE 802.11)">

Wi-Fi is simply the wireless equivalent of Ethernet, governed by the **IEEE 802.11** working group. 
Because it is designed for consumer use, it operates in the "Unlicensed" ISM radio bands (Industrial, Scientific, and Medical). Because these bands are unlicensed, anyone can use them, meaning they are incredibly crowded and prone to massive interference from microwave ovens and baby monitors.

## The Evolution of 802.11

The IEEE naming scheme became too complex for consumers, so the Wi-Fi Alliance officially rebranded them into simple generational numbers:

- **Wi-Fi 4 (802.11n)**: Released in 2009. Introduced **MIMO** (Multiple-Input Multiple-Output), allowing routers to use multiple antennas simultaneously to bounce radio waves off walls, drastically increasing speed.
- **Wi-Fi 5 (802.11ac)**: Released in 2014. Exclusively used the wider **5 GHz** band to achieve gigabit speeds, though sacrificing physical range (as 5 GHz cannot penetrate walls as well as 2.4 GHz).
- **Wi-Fi 6 (802.11ax)**: Released in 2019. Did not focus on raw speed; instead focused entirely on **Congestion**. It introduced OFDMA (borrowed from Cellular networks), allowing a router to talk to 30 different IoT devices and laptops in the exact same millisecond, rather than forcing them to wait in a queue.
- **Wi-Fi 7 (802.11be)**: Released in 2024. Introduces MLO (Multi-Link Operation). Your laptop can connect to the 2.4 GHz, 5 GHz, and new 6 GHz bands *all at the exact same time*, combining their speeds for virtually zero latency.

<Callout icon="warning" title="WPA3 Security">
  In 2017, the legendary "KRACK" vulnerability proved that the WPA2 encryption standard was mathematically broken, allowing hackers to decrypt Wi-Fi traffic. **WPA3** is now the mandatory standard. It replaces the old pre-shared key handshake with SAE (Simultaneous Authentication of Equals), rendering offline brute-force dictionary attacks completely impossible.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Bluetooth/index.mdx': `---
title: Bluetooth
description: A short-range, personal area network (PAN) standard designed to eliminate physical cables between peripheral devices.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Bluetooth">

While Wi-Fi is designed to network an entire house to the global internet, **Bluetooth** (IEEE 802.15.1) is designed as a Personal Area Network (PAN). Its only goal is to eliminate the 3-foot cable between your phone and your headphones.

It operates in the exact same highly congested **2.4 GHz** unlicensed band as Wi-Fi.

## Frequency-Hopping Spread Spectrum (FHSS)

Because Bluetooth shares the 2.4 GHz band with Wi-Fi routers and microwaves, it would normally be crushed by interference. 
To survive, Bluetooth uses **FHSS (Frequency-Hopping Spread Spectrum)**. 

The Bluetooth transmitter and receiver synchronize their clocks. They then rapidly change their radio frequency **1,600 times per second**. If a Wi-Fi router is currently blasting data on Channel 6, the Bluetooth headphones will instantly hop to Channel 43, then Channel 12, successfully dodging the Wi-Fi interference in real-time.

## Bluetooth Low Energy (BLE)
Introduced in Bluetooth 4.0, **BLE** is a radically different protocol designed for IoT devices (like heart rate monitors or Apple AirTags). 
Standard Bluetooth maintains a continuous, power-hungry connection. BLE devices sleep 99% of the time, wake up, rapidly broadcast a tiny beacon of data, and instantly go back to sleep. This allows a single coin-cell battery to power a BLE device for over a year.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/NFC/index.mdx': `---
title: NFC (Near-Field Communication)
description: An extreme short-range wireless technology requiring devices to be practically touching, forming the backbone of modern contactless payments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="NFC (Near-Field Communication)">

**NFC** is an evolution of RFID technology. 
While Bluetooth has a range of 30 feet, NFC has an intentional, physical maximum range of roughly **4 centimeters**. 

You literally have to tap the devices together for the radio waves to successfully connect.

## Why such a short range?

The 4-centimeter limitation is not a flaw; it is the defining security feature. 
NFC is the global standard for Apple Pay and Google Wallet. If NFC had a range of 30 feet, a hacker sitting at a coffee shop table could passively deduct money from the smartphone in your pocket. Because the range is 4 centimeters, physical proximity guarantees user intent.

## Active vs Passive Modes

NFC operates at a very low frequency (13.56 MHz). It supports two modes:
1. **Active Mode**: Both devices have batteries (e.g., tapping two smartphones together to share a photo).
2. **Passive Mode (Magnetic Induction)**: This is how contactless credit cards work. A plastic credit card has no battery. The payment terminal generates a strong magnetic field. When you hold the card near the terminal, the magnetic field physically induces a tiny electrical current inside the copper coil of the credit card, temporarily powering on the card's microchip just long enough for it to transmit your payment details back to the terminal.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Zigbee/index.mdx': `---
title: Zigbee
description: A low-power, mesh networking standard dominating the smart home industry, allowing hundreds of IoT devices to route data through each other.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Zigbee">

If you want to install 50 smart lightbulbs in your house, you should not connect them to your Wi-Fi router. 50 constant Wi-Fi connections will overwhelm the router's RAM, causing your laptop and TV to lag. 

Instead, the smart home industry uses **Zigbee** (IEEE 802.15.4).

## The Mesh Architecture

Wi-Fi uses a "Star" topology: every device must talk directly to the central router. If the router is too far away, the connection drops.
Zigbee uses a **Mesh** topology. 

Every single Zigbee device that is plugged into the wall (like a smart plug or lightbulb) automatically acts as a micro-router. 
If your Smart Hub is in the living room, and a lightbulb is in the garage, the lightbulb doesn't need to reach the Hub. It sends its data to the kitchen lightbulb, which forwards it to the hallway lightbulb, which finally hands it to the Hub. 

The more Zigbee devices you add to your house, the stronger and more resilient the network becomes, because there are more routing paths available.

<Callout icon="success" title="The Matter Standard">
  Historically, Zigbee devices from Philips Hue would not talk to Zigbee devices from Samsung. In 2022, Apple, Google, and Amazon united to release **Matter**—an overarching software standard running on top of protocols like Thread (an IPv6 evolution of Zigbee). Now, any Matter-certified device works flawlessly with any other ecosystem natively.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/LoRaWAN/index.mdx': `---
title: LoRaWAN (Long Range Wide Area Network)
description: A revolutionary LPWAN technology capable of transmitting data across entire cities while running on a single watch battery for 10 years.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="LoRaWAN (Long Range Wide Area Network)">

Wi-Fi reaches 100 feet. Cellular reaches miles, but drains a smartphone battery in 12 hours. 
If you are a farmer who needs to put a soil-moisture sensor in a field 10 miles away, and you want that sensor to run on a AA battery for 10 years, you cannot use Wi-Fi or Cellular.

You use **LoRaWAN**.

## The Physics of Chirp Spread Spectrum

LoRa (Long Range) operates in the sub-gigahertz frequencies (e.g., 915 MHz in the US). 
It uses a proprietary military-derived modulation technique called **Chirp Spread Spectrum (CSS)**. 

Instead of sending distinct binary pulses, it encodes data by smoothly sweeping the frequency up or down (a "Chirp", much like a dolphin). Because the receiver knows exactly what mathematical curve to look for, it can successfully detect a LoRa transmission even if the signal is *weaker than the ambient background radiation (noise floor)*.

## The Massive Trade-Off

LoRa achieves impossible range (up to 10 miles in rural areas) with microscopic battery drain. 
But physics demands a sacrifice: **Bandwidth**.

LoRaWAN is incredibly, painfully slow. A device might only be able to send **11 bytes of data** at a time, and due to fair-use airtime laws, it might only be legally allowed to transmit data once every 15 minutes. It is strictly for telemetry (like sending a temperature reading of \TICK172F\TICK1), not for streaming audio or video.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Cellular generations (3G-4G-5G-6G)/index.mdx': `---
title: Cellular Generations (3G, 4G, 5G, 6G)
description: The evolution of global, macro-scale wireless networks moving from basic digital voice up to ultra-low latency gigabit data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cellular Generations (3G, 4G, 5G, 6G)">

Cellular networks are divided into geographic "Cells." Each cell has a massive central tower (a Base Station). As you drive down the highway, your phone's connection is seamlessly handed off from one tower to the next without dropping the call.

The technology powering these towers has evolved in distinct 10-year generations.

## The Evolution

- **3G (UMTS)**: Introduced in the early 2000s. It was the first generation designed to handle actual data (mobile web browsing), rather than just voice calls and SMS.
- **4G (LTE - Long Term Evolution)**: The massive leap forward. 4G transitioned the entire cellular backbone to an **All-IP architecture**. (Previously, voice calls used dedicated circuit-switched hardware, while data used IP. 4G unified them, meaning Voice-over-LTE (VoLTE) is essentially just VoIP).
- **5G (NR - New Radio)**: The current standard. While it offers higher speeds, its true purpose is **Massive IoT and Ultra-Low Latency**. 5G introduced **mmWave** (Millimeter Wave) using extremely high 30 GHz frequencies. mmWave can deliver 3 Gbps to a smartphone, but the waves are so fragile they cannot penetrate a tree leaf, requiring telecoms to install thousands of micro-antennas on every street corner.
- **6G (In Development)**: Expected in the 2030s. Research is focusing on Terahertz (THz) frequencies to integrate AI natively into the radio access network and provide hyper-accurate spatial positioning (radar-like capabilities) built directly into the data signal.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Satellite communications/index.mdx': `---
title: Satellite Communications
description: The global infrastructure utilizing orbital spacecraft to bounce RF signals across oceans, providing internet to the most remote regions on Earth.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Satellite Communications">

If you are on a cargo ship in the middle of the Pacific Ocean, there are no cellular towers and no fiber optic cables. Your only option for internet is to point an antenna directly up into space.

## Geosynchronous Earth Orbit (GEO)

Historically, satellite internet (like HughesNet) used **GEO satellites**. 
These satellites are placed exactly 35,786 kilometers above the equator. At this precise altitude, the satellite orbits the Earth at the exact same speed the Earth rotates. From the ground, the satellite appears completely stationary in the sky, meaning you can bolt a satellite dish to your roof and never move it.

**The Flaw**: Light travels fast, but 35,000 km is a massive distance. The signal has to go up to space, down to the ISP, up to space, and back to your house. This introduces a mandatory, physics-bound **latency of 600+ milliseconds**. Browsing the web feels sluggish, and multiplayer gaming is completely impossible.

## Low Earth Orbit (LEO) & Starlink

To solve the latency problem, companies like SpaceX (Starlink) deploy massive constellations of satellites into **LEO (Low Earth Orbit)**, only 500 kilometers above the Earth. 

Because they are so close, the latency drops to an incredible **20-40 milliseconds**, rivaling landline fiber optics. 
**The Flaw**: Because they are so low, they do not match the Earth's rotation. They fly across the sky at 17,000 mph, crossing from horizon to horizon in 4 minutes. A Starlink dish on your roof uses a complex "Phased Array" antenna to electronically track the satellite across the sky, instantly handing off the connection to the next satellite as soon as the first one disappears over the horizon.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/GPS-GNSS/index.mdx': `---
title: GPS / GNSS
description: The global constellation of satellites providing hyper-accurate positioning, navigation, and critical timing services to the entire planet.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GPS / GNSS">

**GPS (Global Positioning System)** is the American implementation of **GNSS (Global Navigation Satellite System)**. (Other countries have their own: Europe's Galileo, Russia's GLONASS, China's BeiDou).

GPS does not track your phone. Your phone never sends a single byte of data to a GPS satellite. GPS is strictly a one-way, receive-only technology. 

## The Physics of Trilateration

Every GPS satellite is essentially a flying, hyper-accurate Atomic Clock.
The satellite broadcasts a continuous, unencrypted radio signal that essentially says: *"I am Satellite #12, and my current time is exactly 12:00:00.0000000."*

1. Your phone receives that signal. 
2. Because radio waves travel at the speed of light, the signal takes a few milliseconds to reach your phone. 
3. Your phone looks at its own clock and sees it received the signal at 12:00:00.0600000. 
4. By measuring that exact delay, the phone mathematically calculates that it is exactly 11,000 miles away from Satellite #12.

If your phone knows it is 11,000 miles from Satellite #12, 12,000 miles from Satellite #4, and 14,000 miles from Satellite #9, it uses **Trilateration** (intersecting 3D spheres) to calculate your exact latitude and longitude on the surface of the Earth.

<Callout icon="warning" title="The 4th Satellite">
  Trilateration technically only requires 3 satellites to find a 3D position. However, your smartphone does not contain a $100,000 atomic clock; its internal clock is terrible. If your phone's clock is off by just 1 millisecond, the distance calculation will be wrong by 186 miles. **A GPS receiver requires a 4th satellite lock** to mathematically correct the errors in its own internal clock, ensuring 3-meter accuracy.
</Callout>

</ConceptTemplate>
`,
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })

    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    // This entirely avoids JSON/regex parsing issues.
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)

    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
