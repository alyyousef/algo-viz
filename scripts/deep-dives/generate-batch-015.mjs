import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/LoRaWAN/index.mdx',
    content: `---
title: LoRaWAN (Long Range Wide Area Network)
description: "A low-power, wide-area networking protocol designed to wirelessly connect battery-operated IoT devices to the internet in regional, national, or global networks."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="LoRaWAN (Long Range Wide Area Network)">
      {children}
    </ConceptTemplate>
  )
}

**LoRaWAN (Long Range Wide Area Network)** is the undisputed king of LPWAN (Low Power Wide Area Networks) for the Internet of Things.

Wi-Fi provides high bandwidth but terrible range (30 meters) and high power consumption. 4G/5G Cellular provides incredible range (miles) but consumes so much power your phone battery dies in a day. 
LoRaWAN solves the IoT trilemma. It provides **massive range (up to 10 miles in rural areas)** and **extreme battery life (up to 10 years on a single coin battery)**, but it mathematically sacrifices bandwidth. It maxes out around 50 kilobits per second. You cannot stream audio on LoRa; you use it to transmit a 12-byte temperature reading once an hour.

## 1. Deep Dive & Mechanics

LoRaWAN is actually a two-part technology stack:
1. **LoRa (The Physical Layer):** The proprietary radio modulation technique developed by Semtech. It mathematically manipulates the radio frequency to achieve extreme long-range penetration using "Chirp Spread Spectrum."
2. **LoRaWAN (The MAC Layer):** The open-source networking protocol that sits on top of LoRa. It dictates how devices talk to the network, handles routing, and mathematically manages cryptographic security.

LoRaWAN operates in the globally unlicensed **Sub-Gigahertz ISM bands** (915 MHz in North America, 868 MHz in Europe). Because it is Sub-GHz, the radio waves are massive, easily penetrating deep inside concrete buildings and underground basements where Wi-Fi and 5G immediately fail.

## 2. Mathematical / Theoretical Foundation

The mathematical magic of LoRa is **Chirp Spread Spectrum (CSS)**. 

Instead of broadcasting a single frequency (like an FM radio station), a LoRa radio transmits a "Chirp"—a signal that mathematically sweeps up or down in frequency over time, much like the sonar click of a dolphin or a bat. 

This mathematical sweeping makes the signal incredibly robust against noise and interference. A LoRa gateway can mathematically decode a sensor's transmission even if the signal is **20 decibels *below* the background noise floor**. (Imagine perfectly hearing someone whispering to you from across a crowded, screaming rock concert).

## 3. Real-World Implementation

Developers interact with LoRaWAN by provisioning sensors in a **Network Server** (like The Things Network or AWS IoT Core for LoRaWAN).

TICK3javascript
// Conceptual representation of handling an incoming LoRaWAN payload via a Webhook.
// A LoRaWAN sensor transmits a tiny, mathematically compressed 4-byte binary payload (e.g., 0x01160244).
// The LoRaWAN Gateway receives it over the air and forwards it to your Node.js backend.

app.post('/lorawan-webhook', (req, res) => {
  const payloadHex = req.body.uplink_message.frm_payload; // "01160244" in Base64/Hex
  
  // We must mathematically decode the raw bytes back into human values
  const buffer = Buffer.from(payloadHex, 'hex');
  
  // Custom parsing logic defined by the sensor manufacturer
  const temperature = buffer.readInt16BE(0) / 100; // Bytes 0-1
  const humidity = buffer.readUInt16BE(2) / 100;   // Bytes 2-3
  
  console.log(\`Sensor \${req.body.end_device_ids.device_id} reported:\`);
  console.log(\`Temp: \${temperature}°C, Humidity: \${humidity}%\`);
  
  res.status(200).send('ACK');
});
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Edge (Radio)
        Sensor1(Smart Water Meter)
        Sensor2(Soil Moisture)
        Sensor3(GPS Tracker)
    end

    subgraph Infrastructure (LoRaWAN)
        Gateway[LoRa Gateway / Tower]
        NS[Network Server - TTN/AWS]
    end

    subgraph Cloud (Application)
        DB[(PostgreSQL)]
        App[Node.js Backend]
    end

    Sensor1 -- 915 MHz Radio (CSS) --> Gateway
    Sensor2 -- 915 MHz Radio (CSS) --> Gateway
    Sensor3 -- 915 MHz Radio (CSS) --> Gateway

    Gateway -- TCP/IP (Internet) --> NS
    
    Note over NS: Mathematically decrypts the <br/>AES-128 payload, removes duplicates.
    NS -- HTTP Webhook --> App
    App --> DB
TICK3

## 5. Interview Prep

**Q: In LoRaWAN, do sensors pair to a specific Gateway (like Wi-Fi pairs to a router)?**
**A:** No, this is a brilliant architectural decision. LoRaWAN operates in a **Star-of-Stars** topology. The sensor simply blasts its message into the open air. It doesn't care who receives it. If there are 3 different Gateways in the city that hear the transmission, *all 3 Gateways* will forward the packet to the central Network Server over the internet. The Network Server mathematically compares the packets, drops the two duplicates, and processes the strongest one. This makes roaming seamless (a GPS tracker on a truck doesn't need to "reconnect" as it drives past different towers).

**Q: What is the "Duty Cycle" in LoRaWAN?**
**A:** Because LoRaWAN uses unlicensed public frequencies, international law strictly enforces mathematical Duty Cycles (e.g., 1% in Europe) to prevent one company from hogging the radio airwaves. This means if your sensor spends 1 second transmitting a packet, it is legally forbidden from transmitting again for 99 seconds. LoRaWAN is strictly for sporadic, low-frequency messaging.

**Q: How does LoRaWAN handle security if the signal can be intercepted for 10 miles?**
**A:** Extreme cryptography. LoRaWAN mandates **AES-128 End-to-End Encryption**. The packet is mathematically encrypted twice:
1. **Network Session Key:** Secures the packet from the Sensor to the Network Server (preventing hackers from injecting fake radio packets).
2. **Application Session Key:** Secures the actual payload data from the Sensor all the way to the final Node.js Application Server. Even the company hosting the LoRaWAN Gateways (like AWS) mathematically cannot decrypt or read your sensor's temperature data.

## 6. Production Use Cases

- **Smart Agriculture:** A 500-acre farm installs a single $150 LoRaWAN Gateway on the roof of the barn. They deploy 200 battery-powered soil moisture sensors directly into the dirt across the fields. The sensors transmit moisture levels once an hour. The farmer knows exactly when to irrigate, and the batteries don't need to be replaced for 8 years.
- **Helium Network (The People's Network):** A decentralized blockchain project built on LoRaWAN. Citizens buy LoRaWAN gateways, put them in their home windows, and provide coverage for their city. When a company's smart scooter uses that citizen's gateway to transmit its GPS coordinates, the blockchain mathematically rewards the citizen with cryptocurrency (HNT) for providing the bandwidth.

<Callout icon="warning" title="Spreading Factors and The Data Rate Trade-off">
LoRa allows you to mathematically trade bandwidth for range using the **Spreading Factor (SF)**. SF7 provides the fastest data rate (50 kbps) and shortest range (uses less battery). SF12 provides the absolute longest range (penetrating mountains) but the mathematical transmission takes so long that the data rate drops to 250 *bits* per second. If you use SF12, a tiny 50-byte payload might require the sensor's radio to stay turned on for 2 full seconds, draining the battery significantly faster.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/NFC/index.mdx',
    content: `---
title: NFC (Near Field Communication)
description: "A set of communication protocols enabling two electronic devices to establish communication by bringing them within 4 centimeters of each other."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="NFC (Near Field Communication)">
      {children}
    </ConceptTemplate>
  )
}

**NFC (Near Field Communication)** is a specialized subset of RFID (Radio Frequency Identification) technology. 

Operating at exactly **13.56 MHz**, NFC was mathematically engineered with a strict physical limitation: it only works within 4 centimeters (~1.5 inches). This limitation is not a flaw; it is its greatest security feature. Unlike Bluetooth or Wi-Fi, which can be sniffed by a hacker sitting in a parked car across the street, intercepting an NFC transmission physically requires the attacker to be standing intimately close to the victim.

## 1. Deep Dive & Mechanics

The most fascinating aspect of NFC is **Magnetic Induction**.

An NFC system involves an **Active Device** (your smartphone or a credit card reader) and a **Passive Device** (an NFC sticker or a plastic credit card).
The plastic credit card has no battery. When you tap it against the reader, the active reader generates an oscillating mathematical electromagnetic field. The copper coil hidden inside the plastic credit card catches this magnetic field and mathematically converts it into electricity (induction). 

This tiny burst of harvested electricity powers up the microscopic silicon chip inside the credit card. The chip instantly performs cryptographic math, modulates the magnetic field to send data back to the reader, and then immediately powers off as you pull it away.

## 2. Mathematical / Theoretical Foundation

NFC operates in three distinct, mathematically defined modes:

1. **Reader/Writer Mode:** Your active smartphone powers up a passive NFC tag (like a smart poster in a museum) and reads the URL encoded on it.
2. **Peer-to-Peer (P2P) Mode:** Two active smartphones tap together to mathematically exchange data (e.g., Android Beam for sharing photos or contacts). Both devices take turns generating the electromagnetic field.
3. **Card Emulation Mode:** Your active smartphone mathematically pretends to be a passive, dumb plastic credit card or a hotel room key. When you tap your phone against a payment terminal, the terminal treats your phone exactly as if it were a Visa card.

## 3. Real-World Implementation

Mobile developers interact with NFC hardware using the CoreNFC framework (iOS) or the NFC API (Android) to read NDEF (NFC Data Exchange Format) messages.

TICK3javascript
// Conceptual Android/Web NFC API (Supported in Chrome for Android)
// This code allows a web app to read an NFC tag when the user taps it.

if ('NDEFReader' in window) {
  try {
    const ndef = new NDEFReader();
    
    // Prompt the user to tap an NFC tag
    await ndef.scan();
    console.log("Scan started successfully. Please tap an NFC tag.");

    ndef.onreading = event => {
      const message = event.message;
      for (const record of message.records) {
        if (record.recordType === "text") {
          const textDecoder = new TextDecoder(record.encoding);
          console.log(\`Text Data read from Tag: \${textDecoder.decode(record.data)}\`);
        } else if (record.recordType === "url") {
          const textDecoder = new TextDecoder();
          console.log(\`URL read from Tag: \${textDecoder.decode(record.data)}\`);
        }
      }
    };
  } catch (error) {
    console.log(\`Error: \${error.message}\`);
  }
}
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant Reader (Payment Terminal)
    participant Phone (Apple Pay)

    Note over Reader, Phone: 1. Field Generation (Physical Tap)
    Reader->>Phone: Generates 13.56 MHz Electromagnetic Field
    
    Note over Phone: Secure Element (SE) chip wakes up. <br/>Phone is operating in Card Emulation Mode.
    
    Note over Reader, Phone: 2. Mathematical Cryptography (EMV)
    Reader->>Phone: "Who are you? Give me a transaction token."
    Note over Phone: Performs Asymmetric Elliptic Curve <br/>Cryptography to generate a one-time token.
    Phone-->>Reader: [Modulates Magnetic Field] Token: 0x48A2B9
    
    Note over Reader, Phone: 3. Network Authorization
    Reader->>Visa Network: "Is token 0x48A2B9 valid for $5?"
    Visa Network-->>Reader: "Yes. Approved."
TICK3

## 5. Interview Prep

**Q: Can a hacker bump into me on the subway with a hidden card reader in their pocket and steal money from my NFC credit card?**
**A:** Theoretically, yes (called "RFID Skimming"). The thief's reader acts as the Active device, powers up the plastic credit card in your wallet through your pants, and mathematically forces it to execute a contactless payment. However, it is practically difficult because they must get within 4 centimeters of the exact location of your wallet. Furthermore, banks mathematically cap contactless transactions without a PIN (usually around $50-$100) to mitigate this exact fraud.

**Q: Why is Apple Pay / Google Pay mathematically more secure than tapping a physical plastic credit card?**
**A:** **Tokenization.** When you tap a physical plastic card, it mathematically transmits your actual 16-digit credit card number and expiration date in plain text to the reader. A compromised reader could store those details. When you tap Apple Pay, it uses the **Secure Element (SE)** chip in your phone. It never transmits your real card number. It mathematically generates a dynamic, one-time-use cryptographic Token (a fake card number). Even if the reader is compromised, the Token is mathematically useless for future purchases.

**Q: What is NDEF?**
**A:** **NFC Data Exchange Format**. It is a standardized mathematical payload structure (like JSON, but binary) dictated by the NFC Forum. If you buy a blank NFC sticker from Amazon, you write an NDEF message onto it (e.g., a URL record pointing to your website). Because it is NDEF formatted, both iOS and Android know exactly how to mathematically parse it natively without requiring the user to download a specific app.

## 6. Production Use Cases

- **Access Control (YubiKey / Smart Locks):** Modern Multi-Factor Authentication (MFA) relies on FIDO2/WebAuthn hardware keys like the YubiKey. Instead of plugging the USB key into your phone, you simply tap the YubiKey against the back of your phone. The phone powers the key via NFC, the key mathematically signs the cryptographic login challenge, and transmits the signature back, completing a highly secure, phishing-resistant login in 1 second.
- **Supply Chain Authentication:** High-end luxury brands (like Gucci or fine wine producers) embed microscopic cryptographic NFC tags directly into the fabric of a purse or the cork of a bottle. A consumer taps their phone to the purse. The phone mathematically challenges the tag, verifying a cryptographic signature that proves the purse is a genuine product and not a counterfeit, while simultaneously loading the product's origin story on the phone's browser.

<Callout icon="info" title="The Secure Element (SE)">
In Card Emulation mode (Apple Pay), the smartphone's main CPU (which runs your apps and is vulnerable to malware) is mathematically forbidden from handling the credit card data. The NFC antenna is physically hardwired directly to a tiny, dedicated, mathematically isolated cryptographic co-processor chip called the Secure Element (SE). Even if your Android phone is completely rooted and infected with a virus, the virus physically cannot extract the credit card keys from the SE hardware.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/RF fundamentals/index.mdx',
    content: `---
title: RF Fundamentals (Radio Frequency)
description: "The underlying physics and mathematical principles governing the generation, transmission, and reception of electromagnetic waves used in all wireless communication."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="RF Fundamentals (Radio Frequency)">
      {children}
    </ConceptTemplate>
  )
}

**Radio Frequency (RF)** is the foundational physics layer of every wireless technology on earth (Wi-Fi, Bluetooth, 5G, GPS, Satellites). 

At its core, RF is the manipulation of the **Electromagnetic Spectrum**. By forcing alternating electrical current (AC) to flow rapidly back and forth through a piece of metal (an Antenna), it generates an invisible magnetic field that mathematically radiates outward into space at exactly the speed of light ($c = 299,792,458$ m/s). 

If you understand the math of these waves, you understand the fundamental limitations of all wireless software.

## 1. Deep Dive: Frequency and Wavelength

The absolute most important mathematical relationship in all of wireless networking is the inverse relationship between **Frequency ($f$)** and **Wavelength ($\\lambda$)**:

$$ \\lambda = \\frac{c}{f} $$
*(Wavelength equals the Speed of Light divided by Frequency)*

- **Frequency (Hertz):** How many times the wave oscillates per second. 
- **Wavelength (Meters):** The physical distance between the crest of one wave and the crest of the next.

**The Golden Rule of RF Physics:**
- **Low Frequency (e.g., 700 MHz 4G LTE):** Long wavelength (~1.5 feet). The waves are massive. They mathematically bend around obstacles and effortlessly penetrate concrete buildings and forests. Excellent range, poor bandwidth.
- **High Frequency (e.g., 28 GHz 5G mmWave):** Short wavelength (~0.5 inches). The waves are tiny. They can carry immense amounts of data mathematically (gigabits per second), but they are physically fragile. They bounce off concrete, are absorbed by rain, and are stopped entirely by a single tree.

## 2. Mathematical / Theoretical Foundation

How do we actually put computer data (1s and 0s) onto a continuous physical wave? **Modulation.**

You cannot just "transmit a 1." You must mathematically alter a continuous, perfect sine wave (the Carrier Wave) to represent data.

1. **Amplitude Modulation (AM):** You make the wave taller to represent a 1, and shorter to represent a 0. (Highly susceptible to electrical static/noise).
2. **Frequency Modulation (FM):** You squeeze the waves closer together to represent a 1, and spread them out to represent a 0.
3. **Phase-Shift Keying (PSK):** The standard for Wi-Fi. You abruptly, mathematically shift the starting angle (phase) of the wave by 180 degrees. The receiver detects this sudden mathematical glitch in the wave and interprets it as a bit flip from 0 to 1.
4. **QAM (Quadrature Amplitude Modulation):** The modern miracle used in Wi-Fi 6 and 5G. It mathematically combines Amplitude (height) and Phase (shift) simultaneously. 256-QAM creates 256 mathematically distinct combinations of wave shapes. A single pulse of a 256-QAM wave transmits exactly 8 bits of data ($2^8 = 256$) simultaneously, drastically increasing bandwidth.

## 3. Real-World Implementation

Network engineers do not measure RF power in Watts (W) because the numbers get mathematically unruly. They use **Decibels (dBm)**, a logarithmic scale relative to 1 milliwatt.

TICK3text
# The Rule of 3s and 10s in Decibel Math:
# +3 dBm = Multiply the power by 2 (Double)
# -3 dBm = Divide the power by 2 (Half)
# +10 dBm = Multiply the power by 10
# -10 dBm = Divide the power by 10

# Practical Examples:
  0 dBm = 1 milliwatt (mW) (Standard Bluetooth)
 20 dBm = 100 mW (Maximum legal Wi-Fi transmit power in many countries)
 30 dBm = 1 Watt (1,000 mW) (A 4G LTE Smartphone bursting to reach a distant tower)
 50 dBm = 100 Watts (A massive macro Cell Tower blasting into a city)

-70 dBm = Perfect Wi-Fi reception on your laptop.
-90 dBm = Disconnected. The Wi-Fi signal is 1,000,000,000 times weaker than 1 mW.
TICK3

## 4. Visualizations

TICK3mermaid
graph LR
    subgraph Modulation Concepts
        Carrier[Pure Sine Wave<br>~ ~ ~] --> AM
        Carrier --> FM
        Carrier --> PSK
        
        AM[Amplitude Modulation<br>Changes Height]
        FM[Frequency Modulation<br>Changes Spacing]
        PSK[Phase-Shift Keying<br>Inverts the Wave]
    end

    subgraph The Electromagnetic Spectrum
        LowFreq[Low Frequency<br>FM Radio (100 MHz)] --> MidFreq[Mid Frequency<br>Wi-Fi (2.4 GHz)]
        MidFreq --> HighFreq[High Frequency<br>5G (28 GHz)]
        
        Note over LowFreq: High Range<br>Low Data Rate<br>Penetrates Walls
        Note over HighFreq: Low Range<br>High Data Rate<br>Blocked by Rain
    end
TICK3

## 5. Interview Prep

**Q: What is the Free Space Path Loss (FSPL) formula?**
**A:** It mathematically dictates that radio signal strength drops exponentially over distance due to the Inverse-Square Law. When a radio wave leaves an antenna, it expands as a 3D sphere. Every time you double the distance from the router, the surface area of that sphere quadruples, meaning the signal strength your laptop receives drops by exactly 75% (-6 dB). This is why moving just 10 feet further away from a router can completely destroy your download speeds.

**Q: Why does the 2.4 GHz Wi-Fi band suck in apartment buildings?**
**A:** Mathematical interference. The 2.4 GHz band is only 100 MHz wide. Wi-Fi channels require 20 MHz of space. Therefore, there are mathematically only 3 non-overlapping channels available (Channels 1, 6, and 11). If an apartment building has 20 routers, multiple routers are forced to transmit on the exact same frequency (Channel 6). When two routers transmit simultaneously on the same frequency, the radio waves physically collide in the air, creating constructive/destructive interference (noise), destroying the data. The routers must mathematically wait in line and take turns transmitting (CSMA/CA), causing massive latency.

**Q: What is Signal-to-Noise Ratio (SNR)?**
**A:** The most important metric in wireless networking. Your Wi-Fi router might be blasting a strong signal (-60 dBm), but if your neighbor's microwave is leaking interference at -65 dBm (the Noise Floor), your SNR is only 5 dB. A 5 dB difference is mathematically impossible for the receiver to decode; the data is drowned out by the static. High-speed protocols like Wi-Fi 6 (using 1024-QAM) mathematically require a pristine SNR of at least 35 dB to successfully decode the complex wave shapes.

## 6. Production Use Cases

- **RFID (Radio Frequency Identification):** Uses lower frequencies (like 125 kHz or 13.56 MHz). Because the frequency is low, the wavelength is massive. The primary goal is not transmitting data, but transmitting raw electrical power. A reader generates a massive magnetic field that physically induces an electrical current in the copper coil of an unpowered badge to read the ID number.
- **Microwave Backhaul:** To connect a cell tower in a remote mountain to the internet backbone where digging fiber is impossible, engineers use point-to-point microwave links (e.g., 80 GHz). Because the frequency is so high, they can use parabolic dish antennas to mathematically focus the RF energy into a razor-thin, laser-like beam capable of transmitting 10 Gbps over 10 miles through the air, provided there is absolute Line-of-Sight.

<Callout icon="danger" title="The Shannon-Hartley Theorem">
In 1948, Claude Shannon proved a mathematical theorem that governs all modern telecommunications: $C = B \\log_2(1 + S/N)$. It states that the maximum physical data rate (Capacity, $C$) of a channel is strictly limited by the Bandwidth ($B$) and the Signal-to-Noise Ratio ($S/N$). You cannot defeat physics. If you want faster 5G speeds, you mathematically only have two options: increase the Bandwidth (buy more expensive MHz spectrum from the government), or increase the SNR (build the cell tower closer to the user to reduce noise).
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Satellite communications/index.mdx',
    content: `---
title: Satellite Communications
description: "The mathematical engineering of bouncing radio frequency (RF) signals off artificial satellites orbiting the Earth to provide global voice, data, and internet coverage."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Satellite Communications">
      {children}
    </ConceptTemplate>
  )
}

**Satellite Communications (SatCom)** solves the ultimate geographical networking problem. Digging fiber-optic cables across the Rocky Mountains, the Sahara Desert, or the middle of the Pacific Ocean is mathematically and economically impossible. 

SatCom bypasses the earth entirely. A Ground Station (Earth Station) beams a high-frequency radio signal (the **Uplink**) into space. The satellite catches the signal, mathematically amplifies it, changes the frequency to avoid interference, and blasts it back down to a receiver on earth (the **Downlink**).

## 1. Deep Dive: Orbital Mechanics

The architecture of a satellite network is entirely defined by physics and orbital altitude. There are three primary orbits used for communications:

1. **GEO (Geostationary Earth Orbit):** 
   - **Altitude:** Exactly 35,786 km above the equator.
   - **The Math:** At this precise altitude, the satellite's orbital speed perfectly matches the Earth's rotation. To a person on the ground, the satellite appears mathematically frozen in the exact same spot in the sky 24/7.
   - **Pros/Cons:** You only need 3 satellites to cover the entire globe. You can use a cheap, fixed satellite dish that never moves. However, light takes 240+ milliseconds to travel 70,000 km round-trip, making real-time gaming or VoIP calls agonizingly laggy. (e.g., HughesNet, Viasat).

2. **MEO (Medium Earth Orbit):** 
   - **Altitude:** 2,000 km to 35,000 km.
   - Primarily used for GPS/GNSS. The satellites orbit the Earth every 12 hours.

3. **LEO (Low Earth Orbit):** 
   - **Altitude:** 160 km to 2,000 km.
   - **The Math:** Because they are so close to Earth, gravity demands they move blazingly fast (27,000 km/h) to avoid falling out of the sky. A satellite crosses the entire sky in 90 minutes. 
   - **Pros/Cons:** Incredible latency (20ms, rivaling fiber-optics). But because they move so fast, your dish must physically or mathematically track them across the sky, and you need a "megaconstellation" of 4,000+ satellites to ensure one is always overhead. (e.g., SpaceX Starlink).

## 2. Mathematical / Theoretical Foundation

The greatest mathematical challenge in LEO satellite networking (like Starlink) is **The Handoff Problem**.

In GEO, your dish connects to one satellite and never changes. 
In LEO, a Starlink satellite zooms over your house and vanishes over the horizon in 5 minutes. As Satellite A disappears, it must mathematically execute a "Make-Before-Break" handoff. Your dish must seamlessly establish a TCP-level connection with the approaching Satellite B while simultaneously dropping Satellite A, all without dropping a single packet of your Zoom call.

Furthermore, because the satellite is moving toward you at 27,000 km/h, the radio waves are mathematically compressed by the **Doppler Effect** (the same physics that makes an ambulance siren change pitch as it drives past you). The modem's hardware must perform complex mathematical algorithms in real-time to constantly adjust the receiving frequency to counteract the Doppler shift.

## 3. Real-World Implementation

Interacting with SatCom as a software developer usually involves building delay-tolerant applications, as satellite links are highly susceptible to weather and packet loss.

TICK3javascript
// If you are writing software for a remote maritime ship using a VSAT satellite connection,
// you must mathematically account for extreme latency and dropped connections.

const axios = require('axios');

// Standard HTTP requests will mathematically time out on GEO satellites 
// if you don't adjust the default TCP/HTTP timeout windows.
const satelliteHttpClient = axios.create({
  baseURL: 'https://api.corporate-hq.com',
  // GEO satellites have a minimum physics latency of 500ms RTT. 
  // Wait at least 15 seconds before declaring a timeout.
  timeout: 15000, 
});

async function syncShipData() {
  try {
    // Implement robust retry logic with mathematical Exponential Backoff.
    // If a thunderstorm passes over the satellite dish (Rain Fade), 
    // the link might drop completely for 3 minutes.
    const response = await satelliteHttpClient.post('/telemetry', shipData);
    console.log("Telemetry synced successfully over satellite.");
  } catch (error) {
    console.log("Satellite link disrupted. Queuing data for later transmission.");
    database.queue(shipData);
  }
}
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Space Segment
        SatGEO[GEO Satellite - 35,000 km (High Latency)]
        SatLEO1[LEO Starlink A - 500 km (Moving Fast)]
        SatLEO2[LEO Starlink B - 500 km (Approaching)]
    end

    subgraph Earth Segment
        GroundStation[ISP Ground Station connected to Fiber]
        HouseGEO[House Dish (Fixed, aimed South)]
        HouseLEO[Starlink Dish (Phased Array Tracking)]
    end

    GroundStation -- 14 GHz Uplink --> SatGEO
    SatGEO -- 12 GHz Downlink (240ms delay) --> HouseGEO

    GroundStation -- Inter-satellite Laser Link --> SatLEO1
    SatLEO1 -- 12 GHz Downlink (20ms delay) --> HouseLEO
    
    Note over SatLEO1, HouseLEO: Handoff occurs every 5 mins
    SatLEO2 -. Approaching .-> HouseLEO
TICK3

## 5. Interview Prep

**Q: What is "Rain Fade"?**
**A:** Satellite internet operates at high microwave frequencies (Ku-band and Ka-band, 12 GHz to 40 GHz). The wavelength of these frequencies is mathematically identical in size to a drop of rain. When a heavy thunderstorm rolls in, the raindrops physically absorb and scatter the RF energy, causing the Signal-to-Noise Ratio (SNR) to plummet. The satellite modem must mathematically downshift to a more robust, slower modulation scheme (e.g., from 64-QAM down to QPSK) to keep the link alive, instantly dropping your internet speed from 100 Mbps to 5 Mbps until the storm passes.

**Q: How does a Starlink dish track a satellite moving at 27,000 km/h without any moving parts?**
**A:** **Phased Array Antennas**. A Starlink "Dishy" does not have a mechanical motor spinning it around continuously. It is flat. Inside the dish are hundreds of microscopic, individual antennas. By mathematically delaying the radio signal going to each tiny antenna by a fraction of a nanosecond, the resulting constructive/destructive wave interference creates a concentrated radio beam that can be electronically "steered" across the sky in microseconds, silently tracking the LEO satellite.

**Q: What are Inter-Satellite Laser Links (Optical Intersatellite Links)?**
**A:** A game-changer in routing. Previously, a LEO satellite had to act like a dumb mirror: receiving a signal from your house and immediately bouncing it down to a local Ground Station 100 miles away. If you were in the middle of the Pacific Ocean, there was no Ground Station, so you had no internet. Modern Starlink satellites are equipped with space lasers. If you send a packet from a ship in the Pacific to London, the satellite mathematically routes the packet via laser through the vacuum of space, bouncing it across 10 different satellites until it is over London, and then beams it down to the ground. Light travels faster in a vacuum than it does in fiber-optic glass, making this theoretically faster than the terrestrial internet.

## 6. Production Use Cases

- **Maritime and Aviation (VSAT):** Cruise ships, cargo vessels, and commercial airplanes rely entirely on satellite internet. They use gimbal-mounted, mechanically stabilized dishes that use complex gyroscopic math to stay perfectly locked onto a GEO satellite 35,000 km away while the ship pitches and rolls in 20-foot ocean waves.
- **IoT Backhaul in Remote Areas:** Oil pipelines running through the Arctic or remote African solar farms generate gigabytes of telemetry data. They cannot use cellular networks (no towers). They use specialized BGAN (Broadband Global Area Network) satellite terminals to mathematically stream MQTT telemetry data over the Inmarsat satellite constellation directly into AWS.

<Callout icon="warning" title="The Kessler Syndrome (Space Junk)">
The mathematical nightmare of deploying 10,000 LEO satellites is orbital debris. Because LEO satellites travel at 27,000 km/h, a collision with a bolt the size of a fingernail carries the kinetic energy of a hand grenade. If two satellites collide, they explode into 10,000 pieces of shrapnel. That shrapnel mathematically hits other satellites, causing a cascading chain reaction of explosions that could completely destroy the LEO orbit, rendering space exploration and satellite communications impossible for decades.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/13. Computer Networks/13.4 Telecom - Wireless/Wi-Fi standards (802.11)/index.mdx',
    content: `---
title: Wi-Fi Standards (802.11)
description: "The mathematical evolution of the IEEE 802.11 wireless local area networking standard, governing how devices communicate over the 2.4 GHz, 5 GHz, and 6 GHz bands."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Wi-Fi Standards (802.11)">
      {children}
    </ConceptTemplate>
  )
}

**Wi-Fi (IEEE 802.11)** is a marvel of mathematical cooperation. 
In a wired Ethernet network, a switch is a dictator; it decides exactly which packet goes to which cable. In a Wi-Fi network, the airspace is a chaotic, shared medium. If two laptops transmit at the exact same millisecond, their radio waves mathematically collide in the air, corrupting both packets (a Collision). 

The entire evolution of Wi-Fi standards over the last 25 years has been a mathematical war against physics: finding new ways to avoid collisions, pack more bits onto a single radio wave, and utilize higher frequencies.

## 1. Deep Dive: The Generations

**802.11b / 11g / 11n (Wi-Fi 1, 3, 4 - The 2.4 GHz Era):**
- Early Wi-Fi operated exclusively in the crowded 2.4 GHz band (competing with microwaves and Bluetooth). 
- To avoid collisions, it uses **CSMA/CA (Carrier-Sense Multiple Access with Collision Avoidance)**. Before transmitting, a laptop mathematically "listens" to the air. If someone else is talking, it generates a random mathematical backoff timer (e.g., 50ms). It waits, listens again, and if clear, transmits. This makes early Wi-Fi fundamentally **Half-Duplex** (only one device can talk at a time).

**802.11ac (Wi-Fi 5 - The 5 GHz Era):**
- **The Math:** Introduced mandatory 5 GHz support. 5 GHz provides massive bandwidth but struggles to penetrate walls.
- **Key Innovation:** Introduced **MU-MIMO** (Multi-User, Multiple Input, Multiple Output) on the downlink. For the first time, a router with 4 antennas could mathematically blast 4 distinct, parallel streams of data to 4 different laptops at the *exact same time* using spatial multiplexing, drastically increasing network capacity.

**802.11ax (Wi-Fi 6 / 6E - The Efficiency Era):**
- **The Math:** Previous versions were fast for *one* device, but choked in a stadium with 10,000 phones. Wi-Fi 6 adopted 4G Cellular math: **OFDMA (Orthogonal Frequency-Division Multiple Access)**.
- **Key Innovation:** Instead of making 10 phones wait in line to use the entire 80 MHz channel one at a time, OFDMA mathematically slices the channel into microscopic "Resource Units". The router can transmit data to all 10 phones simultaneously on different microscopic frequencies. 
- *Note: Wi-Fi 6E simply takes this exact same math and applies it to the brand new, pristine 6 GHz frequency band.*

## 2. Mathematical / Theoretical Foundation

How does Wi-Fi 6 achieve 9.6 Gbps speeds compared to Wi-Fi 4's 600 Mbps? **Quadrature Amplitude Modulation (QAM)**.

Wi-Fi transmits data by altering the shape (Amplitude and Phase) of the radio wave.
- Wi-Fi 4 used **64-QAM**. There are 64 distinct wave shapes. $2^6 = 64$. Therefore, every single pulse of the radio wave mathematically carries exactly **6 bits** of data.
- Wi-Fi 5 used **256-QAM**. ($2^8 = 256$). Every pulse carries **8 bits**.
- Wi-Fi 6 introduced **1024-QAM**. ($2^{10} = 1024$). Every pulse carries **10 bits**.

However, detecting 1,024 microscopic variations in a radio wave requires perfect mathematical clarity. If you are 50 feet away from the router behind a brick wall, the Signal-to-Noise Ratio (SNR) drops. The receiver's math fails to distinguish between wave shape #500 and #501. The router mathematically detects this error rate and aggressively downshifts back to 64-QAM or 16-QAM, instantly slashing your speeds by 80% to maintain a stable connection.

## 3. Real-World Implementation

As developers, we rarely touch the 802.11 MAC layer. However, networking engineers must mathematically configure Channel Widths in enterprise deployments to balance speed vs. interference.

TICK3bash
# Conceptually mapping Channel Widths (e.g., in a Cisco WLC or OpenWrt router)

# 20 MHz Width (The default): 
# Highly stable, low interference. Max speed is mathematically capped (e.g., 144 Mbps).

# 40 MHz Width (Channel Bonding):
# Mathematically glues two 20 MHz channels together. Doubles the speed.
# Danger: In 2.4 GHz, doing this consumes 66% of the entire available spectrum, 
# virtually guaranteeing catastrophic interference with neighbors.

# 80 MHz / 160 MHz Width (Wi-Fi 5 / Wi-Fi 6):
# Glues 4 or 8 channels together for Gigabit speeds. 
# Only possible in 5 GHz or 6 GHz bands where massive spectrum is available.
# If a neighbor uses the same 160 MHz block, you will both suffer massive collision latency.
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Wi-Fi 5 (OFDM - The Delivery Truck)
        Router5[Router] -->|Packet 1 (Full 80MHz)| Phone1(Phone 1 - 50ms wait)
        Router5 -.->|Packet 2 (Full 80MHz)| Phone2(Phone 2 - 100ms wait)
        Router5 -.->|Packet 3 (Full 80MHz)| Phone3(Phone 3 - 150ms wait)
        Note over Router5,Phone3: Devices must wait in line.<br/>(High Latency in crowds)
    end

    subgraph Wi-Fi 6 (OFDMA - The Delivery Van)
        Router6[Router]
        Router6 -->|Sub-channel 1 (20MHz)| Phone4(Phone 4 - 0ms wait)
        Router6 -->|Sub-channel 2 (20MHz)| Phone5(Phone 5 - 0ms wait)
        Router6 -->|Sub-channel 3 (20MHz)| Phone6(Phone 6 - 0ms wait)
        Note over Router6,Phone6: Mathematically slices the spectrum.<br/>Transmits to all 3 simultaneously.
    end
TICK3

## 5. Interview Prep

**Q: What is WPA3 and how does it mathematically differ from WPA2?**
**A:** WPA2 (2004) used a 4-Way Handshake that was mathematically vulnerable to offline dictionary attacks (the KRACK attack). If a hacker captured your Wi-Fi handshake from the air, they could take it home and run millions of password guesses against it on a GPU cluster. WPA3 (2018) replaces this with **SAE (Simultaneous Authentication of Equals)**. Based on the Dragonfly Key Exchange, it mathematically forces the attacker to interact with the router live for *every single password guess*, making brute-forcing physically impossible.

**Q: What is a Wi-Fi Mesh Network (e.g., Eero, Google Nest)?**
**A:** A traditional Wi-Fi extender is terrible. It receives a packet on Channel 6, and rebroadcasts it on Channel 6. Because Wi-Fi is half-duplex, it mathematically cuts your bandwidth in half instantly. A true **Mesh Network** uses dedicated **Wireless Backhaul**. The satellite node talks to your laptop on 2.4 GHz, but it uses a completely separate, dedicated 5 GHz radio mathematically reserved *only* for blasting the data back to the main router, preventing radio collisions and maintaining gigabit speeds.

**Q: Why do enterprise networks (like a University) use WPA2-Enterprise instead of a standard password?**
**A:** In WPA2-Personal, everyone shares the same password. If an employee is fired, you have to change the password on 500 devices. In WPA2-Enterprise (802.1X), there is no Wi-Fi password. The router forwards the connection attempt to an internal RADIUS server (like Active Directory). The user logs in with their individual corporate username and password. The RADIUS server mathematically generates a unique, session-specific encryption key for that specific laptop. When the employee is fired, you just disable their Active Directory account.

## 6. Production Use Cases

- **High-Density Warehouses:** Amazon fulfillment centers deploy hundreds of barcode scanners running on Wi-Fi. In the Wi-Fi 4 era, 50 scanners trying to connect to a single router would mathematically trigger constant CSMA/CA backoffs, causing the scanners to lag and freeze. By upgrading to Wi-Fi 6 (OFDMA), the router coordinates the airspace perfectly, allowing all 50 scanners to transmit their tiny 1KB JSON payloads simultaneously without a single collision.
- **Location Tracking (Wi-Fi RTT):** Wi-Fi isn't just for data. The modern 802.11mc standard introduces **Round-Trip Time (RTT)**. By mathematically timing exactly how many nanoseconds it takes a radio wave to bounce between your phone and 3 different enterprise access points in the ceiling, a shopping mall app can calculate your exact indoor position (X, Y coordinates) to an accuracy of 1 meter, providing indoor turn-by-turn navigation where GPS satellites cannot reach.

<Callout icon="info" title="Target Wake Time (TWT)">
A massive feature in Wi-Fi 6 designed for IoT. Previously, a battery-powered Wi-Fi smart lock had to wake up constantly to check if the router had messages for it, draining the battery in weeks. TWT allows the router and the smart lock to mathematically negotiate a schedule: *"Go to sleep, turn off your radio, and wake up exactly at 14:00:05.000 for 10 milliseconds."* This allows Wi-Fi IoT devices to last for years on a single battery, competing directly with Bluetooth LE.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '\`\`\`')
      .replace(/TICK1/g, '\`')
      
    await fs.writeFile(filePath, processedContent, 'utf8')
    console.log(`✅ Hydrated deeply: ${file.path}`)
  }

  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.path.replace(/\\\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
