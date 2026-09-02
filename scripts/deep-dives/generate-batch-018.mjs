import fs from 'fs/promises'
import path from 'path'

const files = [
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebRTC/index.mdx',
    content: `---
title: WebRTC
description: "A complex suite of protocols and JavaScript APIs that enable real-time, peer-to-peer audio, video, and data communication directly between web browsers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="WebRTC">
      {children}
    </ConceptTemplate>
  )
}

Historically, if you wanted to build a video chat application (like Skype), you had to route all audio and video data through a massive, expensive central server. User A sends video to the server; the server forwards it to User B. This introduces latency, requires immense server bandwidth, and creates a single point of failure.

**WebRTC (Web Real-Time Communication)** revolutionizes this architecture. It is a set of JavaScript APIs and underlying network protocols that allow two web browsers to connect **Peer-to-Peer (P2P)**. Once connected, User A's webcam video streams mathematically directly over the internet to User B's laptop, completely bypassing your corporate servers.

## 1. Deep Dive & Mechanics

WebRTC is infamous for its mathematical and architectural complexity. It is not a single protocol, but a Frankenstein monster of telecom standards (ICE, STUN, TURN, SDP, RTP) glued together. 

The core flow involves three distinct phases:

1. **Signaling (The Introduction):** WebRTC explicitly does *not* define how two browsers find each other. You must build a Signaling Server (usually WebSockets). Browser A sends a message ("Hi, I want to call B") to the server, which forwards it to B.
2. **The Handshake (SDP):** The browsers use the Signaling Server to exchange **Session Description Protocol (SDP)** objects. This is a mathematical manifesto where Browser A says: "I support H.264 video at 720p, and Opus audio at 48kHz." Browser B responds with its capabilities, and they mathematically negotiate a common format.
3. **ICE Candidates (The Connection):** The browsers must figure out how to physically route packets to each other across the global internet. They gather ICE (Interactive Connectivity Establishment) candidates (their public IP addresses and ports) and exchange them via the Signaling server. Once they find a valid path, the P2P connection locks in.

## 2. Mathematical / Theoretical Foundation

The greatest mathematical hurdle of WebRTC is **NAT (Network Address Translation) Traversal**.

Your laptop does not have a public IP address. It has a private IP (e.g., TICK1192.168.1.5TICK1) assigned by your home router. The router has the actual public IP. If Browser A tries to connect to Browser B's private IP, the internet mathematically drops the packets because TICK1192.168.x.xTICK1 is unroutable globally.

To solve this, WebRTC uses **STUN (Session Traversal Utilities for NAT)** servers. 
Before the call, Browser A pings a public STUN server (like TICK1stun.l.google.comTICK1). The STUN server looks at the incoming packet, reads the router's public IP address and the specific port the router opened, and sends that mathematical mapping back to Browser A. 
Browser A now knows its *true* public identity and sends this mapping (ICE Candidate) to Browser B, allowing Browser B to punch a hole through the NAT firewalls directly to Browser A.

## 3. Real-World Implementation

Here is the architectural boilerplate for establishing a WebRTC Peer Connection.

TICK3javascript
// 1. Ask the user for microphone and camera permissions
const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

// 2. Initialize the Peer Connection with public STUN servers
const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// 3. Inject the local webcam stream into the connection
localStream.getTracks().forEach(track => {
  peerConnection.addTrack(track, localStream);
});

// 4. Mathematical Event: When the connection receives video from the other person
peerConnection.ontrack = (event) => {
  const remoteVideoElement = document.getElementById('remoteVideo');
  remoteVideoElement.srcObject = event.streams[0];
};

// 5. Mathematical Event: When the STUN server finds our public IP (ICE Candidate)
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    // Send this candidate over your custom WebSocket Signaling Server to the other peer
    signalingSocket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
  }
};

// 6. Create the SDP Offer to start the call
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
// Send the offer over WebSocket to the other peer...
TICK3

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant PeerA as Browser A (Caller)
    participant STUN as STUN Server (Google)
    participant Signal as Signaling Server (WebSocket)
    participant PeerB as Browser B (Receiver)

    Note over PeerA, PeerB: 1. Network Discovery
    PeerA->>STUN: What is my Public IP?
    STUN-->>PeerA: You are 203.0.113.5:4567 (ICE Candidate)
    
    Note over PeerA, PeerB: 2. Signaling Phase
    PeerA->>Signal: Sends SDP Offer + ICE Candidate
    Signal->>PeerB: Forwards SDP Offer + ICE Candidate
    
    PeerB->>Signal: Sends SDP Answer + ICE Candidate
    Signal->>PeerA: Forwards SDP Answer + ICE Candidate
    
    Note over PeerA, PeerB: 3. Peer-to-Peer Phase
    PeerA<-->>PeerB: Direct RTP Audio/Video Stream (No Server!)
TICK3

## 5. Interview Prep

**Q: What happens if a corporate firewall absolutely blocks P2P UDP traffic?**
**A:** This is where **TURN (Traversal Using Relays around NAT)** servers come in. If the STUN mathematical hole-punching fails (e.g., due to a Symmetric NAT), WebRTC falls back to a TURN server. The TURN server acts as a brute-force middleman in the cloud. Peer A streams video to the TURN server, and the TURN server streams it to Peer B. This guarantees the call connects, but it destroys the P2P benefits, requiring massive server bandwidth and introducing latency.

**Q: Can WebRTC send data other than Audio and Video?**
**A:** Yes. The **RTCDataChannel** API allows browsers to open a bidirectional P2P data pipe. It acts exactly like WebSockets, but peer-to-peer. You can configure it to be Reliable (TCP-like, mathematically guaranteeing delivery for file transfers) or Unreliable (UDP-like, dropping packets for ultra-low latency multiplayer gaming).

**Q: Why does WebRTC use UDP instead of TCP?**
**A:** Real-time communication cannot tolerate TCP's mathematical "Head-of-Line Blocking." If a TCP packet drops, the protocol halts the entire stream, waits for a re-transmission, and causes the video to freeze. WebRTC uses RTP over UDP. If a video frame drops, WebRTC mathematically ignores it and continues playing the next frame, resulting in a momentary visual glitch rather than a frozen call.

## 6. Production Use Cases

- **Video Conferencing:** Google Meet, Discord Voice, and Zoom's web client are built heavily on WebRTC. However, for 50-person calls, true P2P mathematically fails (your laptop cannot upload 50 video streams simultaneously). They use an SFU (Selective Forwarding Unit) architecture, where you send one WebRTC stream to a central server, and it routes it to the 49 other participants using WebRTC connections.
- **Cloud Gaming and Remote Desktop:** Services like Google Stadia (historically) or Parsec use the WebRTC Data Channel and Video streams to broadcast a server-rendered video game directly to the browser with sub-30ms latency, while capturing the user's keystrokes via the Data Channel.

<Callout icon="warning" title="IP Leak Vulnerability">
Because WebRTC aggressively hunts for all local and public IP addresses to generate ICE Candidates, it historically posed a massive privacy threat. Malicious websites could use hidden WebRTC connections to mathematically bypass VPNs and extract a user's true home IP address. Modern browsers have clamped down on this, implementing mDNS (Multicast DNS) obfuscation to hide private local IP addresses from the JavaScript layer.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Advanced Browser APIs/WebXR/index.mdx',
    content: `---
title: WebXR Device API
description: "A Web API that mathematically bridges the browser with virtual reality (VR) and augmented reality (AR) hardware, enabling immersive 3D experiences directly on the web."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="WebXR Device API">
      {children}
    </ConceptTemplate>
  )
}

Historically, Virtual Reality (VR) and Augmented Reality (AR) required massive, 50GB native application downloads via platforms like SteamVR or the Meta Quest Store. 

The **WebXR Device API** (the evolution of the older WebVR API) brings the metaverse directly to the URL. It provides a mathematical bridge between the web browser and the user's physical XR hardware (headsets, AR glasses, or even a smartphone camera). It reads the physical gyroscope, accelerometer, and 6-DoF (Degrees of Freedom) tracking data, and synchronizes it with the browser's WebGL rendering engine to paint immersive 3D scenes at 90 frames per second.

## 1. Deep Dive & Mechanics

WebXR is fundamentally a synchronization API. It does not actually draw 3D graphics (that is WebGL/WebGPU's job). WebXR's mathematical purpose is to capture physical space and time.

1. **Sessions:** A WebXR experience begins by requesting an TICK1XRSessionTICK1. You mathematically specify the mode: TICK1'immersive-vr'TICK1 (completely blocks out the real world, like a Meta Quest) or TICK1'immersive-ar'TICK1 (overlays graphics onto a camera feed, like Pokemon Go).
2. **Reference Spaces:** This defines the mathematical origin point (TICK10,0,0TICK1) of the virtual world.
   - TICK1'local'TICK1: The origin is where the user's head was when they started the session (good for seated experiences).
   - TICK1'bounded-floor'TICK1: The origin is locked to the physical floor of the user's living room (good for room-scale VR where the user walks around).
3. **The XR Frame Loop:** WebXR replaces the standard TICK1requestAnimationFrameTICK1 with TICK1session.requestAnimationFrameTICK1. This loop is tightly coupled to the hardware refresh rate of the VR headset (e.g., 90Hz or 120Hz).

## 2. Mathematical / Theoretical Foundation

The terrifying mathematical reality of VR is **Motion to Photon Latency**.

If a user physically turns their head 10 degrees to the left, the screen inside the headset must update the 3D scene to reflect that movement in less than **20 milliseconds**. If the mathematical delay is 30ms or higher, the disconnect between the user's inner ear (vestibular system) and their eyes will induce severe physical nausea (Simulation Sickness).

WebXR achieves this via **Pose Prediction**. 
When the JavaScript loop asks the WebXR API for the TICK1XRViewerPoseTICK1 (where the head is), the API does not return where the head is *right now*. It executes a complex mathematical physics algorithm to predict exactly where the user's head *will be* 15 milliseconds in the future when the photons actually hit their eyes. The WebGL engine then renders the scene based on that future mathematical prediction.

## 3. Real-World Implementation

Because raw WebXR math (Quaternions and View Matrices) is incredibly complex, developers almost exclusively use **Three.js** or **A-Frame** to build WebXR apps.

Here is the underlying native WebXR boilerplate to hook a WebGL context into a VR headset.

TICK3javascript
// 1. Check if the browser mathematically supports Immersive VR
if (navigator.xr) {
  const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
  if (isSupported) {
    document.getElementById('enter-vr-btn').addEventListener('click', onEnterVR);
  }
}

async function onEnterVR() {
  // 2. Request the VR Session (Requires a user click for security)
  const session = await navigator.xr.requestSession('immersive-vr');
  
  // 3. Create a WebGL context compatible with XR
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl', { xrCompatible: true });
  
  // 4. Bind the WebGL context to the headset's physical screens
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl)
  });

  // 5. Get the mathematical Reference Space (Room-scale tracking)
  const refSpace = await session.requestReferenceSpace('local');

  // 6. Start the specialized XR render loop
  session.requestAnimationFrame((time, frame) => {
    // Get the predicted head position and rotation matrix
    const pose = frame.getViewerPose(refSpace);
    if (pose) {
      // Loop through each eye (Left and Right)
      for (const view of pose.views) {
        // Mathematically render the 3D scene twice, 
        // once from the perspective of the left eye, once from the right eye.
        renderSceneForEye(gl, view);
      }
    }
  });
}
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph Physical Hardware
        Sensors[Headset Gyroscopes / Cameras]
        Screen[Dual OLED Screens]
    end

    subgraph WebXR Device API
        Pose[XRViewerPose Predictor]
        Input[XRInputSource Controllers]
    end

    subgraph WebGL Engine
        Render[Render Left Eye + Right Eye]
    end

    Sensors -->|Raw tracking data| Pose
    Pose -->|Mathematical Matrices| Render
    Render -->|XRWebGLLayer Framebuffer| Screen
    Input -->|Trigger pull events| Render
TICK3

## 5. Interview Prep

**Q: Why do you have to render the scene twice in WebXR?**
**A:** Stereoscopic Vision. Humans perceive depth because our eyes are physically separated by a few centimeters (Interpupillary Distance, or IPD). WebXR mathematically tracks the position of the center of the head, and then provides two TICK1XRViewTICK1 matrices offset by the user's specific IPD. You must execute your WebGL draw calls once for the left eye viewport, and a second time for the right eye viewport.

**Q: What is the WebXR Hit Test API?**
**A:** A crucial feature for Augmented Reality (AR). When looking through a phone camera, the WebXR API mathematically scans the physical world for flat planes (like a physical table). The Hit Test API allows you to cast a mathematical ray from the center of the phone screen, detect exactly where that ray intersects the physical table, and drop a 3D model (like a virtual couch) anchored perfectly to those real-world coordinates.

**Q: Why doesn't WebXR work inside standard TICK1<iframe>TICK1 tags?**
**A:** Security and nausea prevention. If an embedded advertisement iframe could hijack your VR headset, it could aggressively flash strobe lights directly into your eyes or ruin the 90fps framerate, causing physical sickness. WebXR mathematically requires the top-level document to explicitly grant the TICK1allow="xr-spatial-tracking"TICK1 permission to any child iframes.

## 6. Production Use Cases

- **E-Commerce and Retail:** IKEA and Amazon use WebXR AR on their mobile websites. Without downloading an app, a user can browse to a couch, tap "View in Room," and WebXR will tap into their smartphone camera to mathematically anchor the 3D couch onto their living room floor at true 1:1 physical scale.
- **Educational and Training Simulations:** Medical schools and industrial companies (like oil rig operators) host complex interactive training simulators on the web. Trainees can put on a Meta Quest browser, navigate to a URL, and instantly practice emergency protocols in a fully immersive 6-DoF environment, drastically reducing the friction of deploying enterprise software updates.

<Callout icon="info" title="The Death of WebVR">
You might see older tutorials referencing the **WebVR** API. This API is completely dead and mathematically deprecated. WebVR was designed exclusively for Virtual Reality headsets. As Apple and Google pivoted hard toward Augmented Reality on smartphones, the W3C scrapped WebVR and engineered **WebXR** (X representing the variable for Extended/Mixed Reality) from the ground up to mathematically handle both VR headsets and AR camera passthrough within a single, unified mathematical interface.
</Callout>
`
  },
  {
    path: 'src/features/kb/routes/KB/14. Web Fundamentals/Browser rendering engines/index.mdx',
    content: `---
title: Browser Rendering Engines
description: "The immense, complex C++ software pipelines at the heart of every web browser that mathematically transform HTML text into painted pixels on a screen."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

export default function Layout({ children }) {
  return (
    <ConceptTemplate title="Browser Rendering Engines">
      {children}
    </ConceptTemplate>
  )
}

A web browser is fundamentally an operating system masquerading as an application. While JavaScript engines (like V8) get the glory for execution speed, the **Rendering Engine** (like Blink or WebKit) is the true heavy lifter. 

Its mathematical purpose is staggering: it must consume chaotic, unstructured HTML text over a slow network, parse thousands of cascading CSS rules, calculate the geometric layout of every box, and mathematically paint millions of pixels to the GPU—all while maintaining a fluid 60 frames per second (16.6ms per frame).

## 1. Deep Dive & Mechanics

The Critical Rendering Path is a strict, mathematical pipeline consisting of five primary phases:

1. **Parsing (DOM & CSSOM):** The engine reads the raw HTML bytes, converts them into characters, tokenizes them, and builds a mathematical tree of nodes (The Document Object Model). Simultaneously, it parses the CSS and builds the CSS Object Model (CSSOM).
2. **The Render Tree (Attachment):** The engine mathematically merges the DOM and the CSSOM. It strips out nodes that will not be displayed (like TICK1<head>TICK1 or TICK1display: noneTICK1) and assigns computed styles to the remaining nodes.
3. **Layout (Reflow):** The engine calculates the exact geometry. It recursively traverses the Render Tree, mathematically determining the exact X, Y coordinates, width, and height of every element based on the viewport size.
4. **Paint:** The engine converts the mathematical boxes into actual pixels. It draws text, colors, borders, and shadows into memory, often separating complex overlapping elements into distinct mathematical **Layers**.
5. **Compositing:** The final step. The engine ships the painted Layers to the GPU. The GPU mathematically stacks the layers together, applies hardware-accelerated transforms (like TICK1translateZTICK1), and draws the final composite image to the physical monitor.

## 2. Mathematical / Theoretical Foundation

The most computationally expensive phase of the engine is **Layout (Reflow)**.

Layout is mathematically recursive and interdependent. If you change the width of the TICK1<body>TICK1, it mathematically cascades down, forcing the engine to recalculate the width of every paragraph, which changes where words wrap, which changes the height of the paragraph, which mathematically cascades back up to change the height of the TICK1<body>TICK1.

If a developer writes JavaScript that reads a layout property (like TICK1element.offsetHeightTICK1) immediately after changing a style (like TICK1element.style.width = '100px'TICK1), they trigger **Layout Thrashing**. The engine is mathematically forced to pause JavaScript, flush its rendering queue, and execute a synchronous Layout recalculation of the entire page just to answer the JavaScript query, instantly causing the framerate to plummet.

## 3. Real-World Implementation

Modern frontend optimization is entirely about understanding and bypassing phases of this mathematical pipeline.

TICK3css
/* BAD PERFORMANCE: Animating the 'left' property */
.box {
  position: absolute;
  left: 0;
  transition: left 1s;
}
.box.move {
  left: 100px; /* Triggering this forces LAYOUT -> PAINT -> COMPOSITE every frame */
}

/* 
  GOOD PERFORMANCE: Animating 'transform' 
  This mathematically bypasses Layout and Paint entirely.
  The engine paints the box once, puts it on its own GPU Layer, 
  and only runs the Compositor phase during the animation.
*/
.box {
  transform: translateX(0);
  transition: transform 1s;
  will-change: transform; /* mathematically hints the engine to promote this to a GPU layer */
}
.box.move {
  transform: translateX(100px); 
}
TICK3

## 4. Visualizations

TICK3mermaid
graph TD
    subgraph The Critical Rendering Path
        HTML[Raw HTML] --> Parser[HTML Parser]
        Parser --> DOM[DOM Tree]
        
        CSS[Raw CSS] --> CSSParser[CSS Parser]
        CSSParser --> CSSOM[CSSOM Tree]
        
        DOM --> RenderTree[Render Tree]
        CSSOM --> RenderTree
        
        RenderTree --> Layout[Layout / Reflow<br/>Calculates Geometry]
        Layout --> Paint[Paint<br/>Fills Pixels in RAM]
        Paint --> Composite[Composite<br/>GPU Layer Stacking]
    end
    
    Composite --> Screen((Monitor))
TICK3

## 5. Interview Prep

**Q: What are the major browser rendering engines today?**
**A:** There are effectively only three left in the world due to the immense mathematical complexity of building them:
- **Blink:** Used by Google Chrome, Microsoft Edge, Opera, and Brave. (Originally a fork of WebKit).
- **WebKit:** Used by Apple Safari (and mathematically mandated on *all* iOS browsers, including Chrome for iOS).
- **Gecko:** Used by Mozilla Firefox.

**Q: What is the difference between TICK1display: noneTICK1 and TICK1visibility: hiddenTICK1 in the rendering pipeline?**
**A:** TICK1display: noneTICK1 removes the element from the mathematical Render Tree entirely. It has zero dimensions and triggers a massive Layout reflow. TICK1visibility: hiddenTICK1 leaves the element in the Render Tree. It retains its physical geometry and takes up space, it just bypasses the Paint phase.

**Q: What is the TICK1requestAnimationFrameTICK1 API?**
**A:** The rendering engine updates the screen physically 60 times a second (every 16.6 milliseconds). If you use TICK1setTimeout(fn, 16)TICK1, JavaScript executes blindly, often mathematically colliding with the engine's internal Paint phase, causing dropped frames and screen tearing. TICK1requestAnimationFrameTICK1 hooks directly into the C++ engine's internal mathematical heartbeat, ensuring your JavaScript only executes precisely at the start of the next rendering pipeline cycle.

## 6. Production Use Cases

- **Virtual DOM Libraries (React):** The entire mathematical premise of React is that touching the actual DOM (and triggering the Layout engine) is slow. React computes changes in a lightweight JavaScript memory tree (the Virtual DOM), diffs it, and surgically batches updates to the real DOM to minimize expensive Layout thrashing.
- **Infinite Scrolling Lists:** High-performance web apps (like Twitter or Facebook) use "Virtualization" for massive lists. Instead of putting 10,000 tweets in the DOM (which would mathematically crush the Layout engine's memory), they only render the 10 tweets currently visible on screen. As you scroll, they recycle the DOM nodes, updating the text content while keeping the total node count mathematically capped.

<Callout icon="danger" title="The Main Thread Bottleneck">
The Rendering Engine and the JavaScript Engine share the exact same mathematical thread (The Main Thread). This is why computationally heavy JavaScript freezes the UI. If a TICK1whileTICK1 loop takes 200 milliseconds to execute, the Rendering Engine is physically blocked from starting the Layout and Paint phases. The browser cannot draw a single frame or respond to a button click until the JavaScript yields control back to the event loop.
</Callout>
`
  }
]

async function run() {
  for (const file of files) {
    const filePath = path.resolve(file.path)
    
    // Convert placeholders back to markdown ticks to avoid literal string parsing errors
    const processedContent = file.content
      .replace(/TICK3/g, '```')
      .replace(/TICK1/g, '`')
      
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
