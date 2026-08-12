import fs from 'fs/promises'
import path from 'path'

const TICK3 = '\`\`\`'
const TICK1 = '\`'

const contentMap = {
  'src/features/kb/routes/KB/20. Mobile Development/The Mobile Ecosystem/index.mdx': `---
title: The Mobile Ecosystem
description: The mathematical trade-offs between Native performance and Cross-Platform development speed, and the complexity of the Mobile App Lifecycle.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Mobile Ecosystem (Native vs Cross-Platform)">

Mobile Engineering is fundamentally different from Web Development. A web browser is a relatively safe sandbox, but a mobile application interacts directly with the operating system, device hardware (GPS, Camera, Bluetooth), and has strict limitations on battery usage and memory.

## 1. Native vs Cross-Platform
When a company decides to build an app, they face a massive architectural decision:

### Native Development
Writing the app twice: once in Swift for iOS, and once in Kotlin for Android.
- **Pros**: Absolute maximum performance. Flawless hardware integration (ARKit, advanced Bluetooth). Instant access to the newest OS features on day one.
- **Cons**: Requires two completely separate engineering teams. Extremely expensive. Code cannot be shared between the platforms.

### Cross-Platform Development (React Native / Flutter)
Writing the app once in a shared language (JavaScript or Dart), and deploying it to both iOS and Android.
- **Pros**: Cuts development time and cost in half. Massive code reuse.
- **Cons**: Performance is slightly worse than native. Difficult to implement highly advanced animations or complex hardware interactions. Relies on the framework developers to update the SDK when Apple or Google release new OS features.

## 2. The App Lifecycle
Unlike a website (which is just "open" or "closed"), a mobile OS aggressively manages app states to save battery life.
1. **Active/Foreground**: The user is currently interacting with the app.
2. **Background**: The user switched to another app. The OS grants the app a few seconds to save its state.
3. **Suspended**: The OS freezes the app in RAM. It consumes zero CPU, but uses memory.
4. **Terminated (Killed)**: If the user opens a heavy 3D game, the OS will violently kill suspended apps to free up RAM. The app must mathematically save its exact UI state so that when the user reopens it, it appears as if it was never killed.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/20. Mobile Development/Android Development/index.mdx': `---
title: Android Development
description: Explains the Android SDK, the shift from Java to Kotlin, Android Studio, and the declarative revolution of Jetpack Compose.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Android Development (Kotlin & Compose)">

Android is a Linux-based mobile operating system developed by Google. Historically, it was programmed exclusively in Java, but has undergone a massive architectural shift.

## 1. The Language: Java to Kotlin
For a decade, Android apps were written in Java. However, Java was highly verbose and prone to TICK1NullPointerExceptionsTICK1.
In 2017, Google announced **Kotlin** (developed by JetBrains) as an official language. In 2019, Google declared Android to be "Kotlin-first". Kotlin runs on the JVM, is fully interoperable with Java, but provides massive mathematical improvements like strict **Null Safety**, Coroutines (for concurrency), and a beautifully concise syntax. Today, practically all modern Android development is done in Kotlin.

## 2. Android Studio & The SDK
- **Android Studio**: The official IDE (Integrated Development Environment) built by JetBrains. It includes the Android Emulator, performance profilers, and the Gradle build system.
- **The SDK (Software Development Kit)**: A massive collection of libraries (like TICK1android.appTICK1 or TICK1android.widgetTICK1) that allow Kotlin code to interact with the device hardware, camera, sensors, and file system.

## 3. UI Architecture: XML vs Jetpack Compose
Historically, Android UI was built using **XML Layouts**. You would define buttons and text in an XML file, and use TICK1findViewById()TICK1 in your Java/Kotlin code to manually update them. This was deeply frustrating and prone to state-sync bugs.

### Jetpack Compose
Inspired by React, Google released **Jetpack Compose**. It completely killed XML. Compose is a modern, declarative UI toolkit written entirely in Kotlin. You write composable functions, pass in state, and the UI mathematically re-renders itself whenever the state changes.

TICK3kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
TICK3

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/20. Mobile Development/iOS Development/index.mdx': `---
title: iOS Development
description: Explains Xcode, the history of Objective-C vs Swift, and the transition from legacy UIKit to declarative SwiftUI.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="iOS Development (Swift & SwiftUI)">

iOS is Apple's proprietary mobile operating system. Because it is a closed ecosystem, developing for iOS mathematically requires a Mac computer running macOS.

## 1. The Language: Objective-C to Swift
Historically, all Apple software (macOS and iOS) was written in **Objective-C**, a complex, legacy superset of C created in the 1980s. It utilized a bizarre bracket syntax (TICK1[object method]TICK1) and manual memory management.

In 2014, Apple shocked the world by releasing **Swift**. Swift is a modern, mathematically beautiful, type-safe language. It eliminated pointers, introduced strict Optionals (null safety), and utilized ARC (Automatic Reference Counting) for memory management. Swift is now the undisputed absolute standard for all iOS development.

## 2. Xcode & The iOS SDK
- **Xcode**: Apple's massive, mandatory IDE. You literally cannot compile an iOS app or upload it to the App Store without Xcode. It includes the iOS Simulator, Interface Builder, and the Instruments profiling tool.
- **The SDK**: Includes core frameworks like Foundation (basic data types), CoreLocation (GPS), and AVFoundation (Camera/Audio).

## 3. UI Architecture: UIKit vs SwiftUI
For over a decade, iOS UI was built using **UIKit** and Storyboards (visual drag-and-drop interfaces). UI was updated imperatively by mutating view controllers.

### SwiftUI
In 2019, Apple introduced **SwiftUI**, fundamentally mirroring the declarative revolution of React. You write Swift code to describe what the UI *should* look like based on a state variable. The framework automatically handles rendering and animations.

TICK3swift
struct ContentView: View {
    @State private var name = "World"
    
    var body: some View {
        Text("Hello, \(name)!")
    }
}
TICK3

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/20. Mobile Development/Cross-Platform/index.mdx': `---
title: Cross-Platform (React Native & Flutter)
description: How React Native bridges Javascript to native UI components, and how Flutter uses Dart and a C++ Skia engine to render its own pixels.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cross-Platform (React Native & Flutter)">

For companies that cannot afford two separate engineering teams, Cross-Platform frameworks mathematically allow one team to write one codebase that deploys to both iOS and Android.

## 1. React Native (The Bridge Architecture)
Created by Facebook. React Native allows web developers to use React and JavaScript to build mobile apps.

**How it works**:
It does *not* render web views (HTML/CSS). Instead, your JavaScript code runs on a background thread inside a JS engine (like Hermes). When you write TICK1<View>TICK1 in React Native, the framework sends a JSON message across a "Bridge" to the native OS thread, telling it to instantiate an actual TICK1UIViewTICK1 (iOS) or TICK1android.view.ViewTICK1 (Android).

- **Pros**: Massive code reuse. Uses actual native components, so it feels 100% native.
- **Cons**: The "Bridge" bottleneck. Sending thousands of JSON messages across the bridge per second (e.g., during complex animations) can cause severe frame drops (though the new JSI architecture is actively fixing this).

### Expo
React Native on its own is mathematically painful to set up (requiring complex Xcode/Android Studio configurations). **Expo** is a framework built around React Native that hides all the native complexity. It is the absolute industry standard for building React Native apps today.

## 2. Flutter (The Canvas Architecture)
Created by Google. Flutter takes a fundamentally different mathematical approach. It does not use native UI components at all.

**How it works**:
Flutter uses the **Dart** programming language. Instead of telling iOS to render an iOS Button, Flutter ships with a massive C++ graphics engine (Skia, or the newer Impeller). Flutter literally asks the OS for a blank canvas, and it mathematically paints every single pixel of the button itself at 60 or 120 frames per second.

- **Pros**: The UI looks mathematically identical on every single device because Flutter controls the pixels. Unbelievable performance and incredibly smooth animations.
- **Cons**: Doesn't always "feel" perfectly native (e.g., native iOS scrolling physics). Dart is a niche language outside of Flutter.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/20. Mobile Development/Hybrid Web Apps/index.mdx': `---
title: Hybrid Web Apps (Ionic & Capacitor)
description: The legacy of Cordova and the modern standard of wrapping standard React/Vue websites inside a native WebView using Capacitor.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Hybrid Web Apps (Ionic & Capacitor)">

What if you don't want to learn Swift, Kotlin, Dart, or even React Native? What if you literally just want to take an existing HTML/CSS/JS website (like a Next.js or Nuxt app) and put it on the App Store?

This is called a **Hybrid Web App**. The app is simply a full-screen, invisible browser window (a **WebView**) that loads your local HTML files.

## 1. The Legacy: PhoneGap / Cordova
In the early 2010s, Adobe PhoneGap (open-sourced as Apache Cordova) was massive. It provided a Javascript bridge that allowed your HTML/JS code to access the phone's camera or GPS.
However, mobile browsers back then were extremely slow. Cordova apps felt incredibly sluggish, janky, and obviously fake.

## 2. The Modern Standard: Capacitor
Built by the Ionic team, **Capacitor** is the modern successor to Cordova. 
You drop Capacitor into any standard web project (React, Vue, Angular). It generates an Xcode and Android Studio project containing a highly-optimized modern WebView. It exposes a beautiful TypeScript API to access native hardware (TICK1Camera.getPhoto()TICK1). Because modern phone processors are insanely fast, Capacitor apps often perform flawlessly for 90% of standard B2B or content apps.

## 3. Ionic Framework
Capacitor simply provides the WebView and hardware bridge. It doesn't provide UI. 
If you put a standard HTML button on an iPhone, it looks like a website, not an app.
**Ionic Framework** is a massive library of Web Components (written in HTML/CSS) that mathematically mimic Native UI. 
If you use an TICK1<IonButton>TICK1, it will render looking exactly like a flat Material Design button on Android, and will magically transform to look exactly like a rounded Apple button on iOS.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/20. Mobile Development/Mobile Architecture/index.mdx': `---
title: Mobile Architecture & Storage
description: Explains local mobile databases (SQLite, Core Data, Room, Realm), Deep Linking, and Push Notifications.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mobile Architecture & Storage">

Mobile apps have complex architectural requirements that do not exist on the web, specifically regarding offline data storage, state management, and OS integrations.

## 1. Local Storage & Databases
A web app stores data on the backend. A mobile app must store data on the phone so it works in Airplane Mode.

- **SQLite**: The underlying C-based relational database that exists natively on every iOS and Android device in the world. However, writing raw SQL queries in mobile apps is error-prone.
- **Core Data (iOS)**: Apple's native Object Graph and Persistence framework. It is notoriously complex with a massive learning curve, but heavily integrated into the Apple ecosystem.
- **Room (Android)**: Google's official ORM layer over SQLite. It uses Kotlin annotations (TICK1@EntityTICK1) and mathematically validates SQL queries at compile time.
- **Realm**: A highly-popular third-party, NoSQL-like object database optimized specifically for mobile. It is massively faster than SQLite for certain operations and supports reactive live-updating queries.

## 2. The ViewModel Architecture (MVVM)
In mobile development, the UI is constantly being destroyed and recreated (e.g., when an Android user rotates their phone from Portrait to Landscape, the entire Activity is killed and restarted).
If you store data inside the UI class, the data is deleted on rotation. 
The industry standard is **MVVM (Model-View-ViewModel)**. The ViewModel is a separate class that mathematically survives UI rotation. The View simply "observes" the ViewModel (using LiveData or StateFlow).

## 3. Deep Linking & Universal Links
How does clicking a link in an email open a specific screen *inside* your app instead of the Safari browser?
- **Deep Links**: Custom URL schemes (TICK1myapp://profile/123TICK1). Heavily insecure because any app can register that scheme.
- **Universal Links (iOS) / App Links (Android)**: Standard HTTP URLs (TICK1https://myapp.com/profile/123TICK1). The OS mathematically verifies ownership by checking a hidden JSON file hosted on your actual web server. If the app is installed, the OS intercepts the click and opens the app; otherwise, it opens the website.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/20. Mobile Development/Deployment & CI-CD/index.mdx': `---
title: Deployment & CI-CD (Fastlane)
description: The agonizing complexity of cryptographic App Signing, the App Store Review processes, and how Fastlane automates the entire pipeline.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Deployment & CI-CD">

Deploying a website takes 30 seconds via Vercel. Deploying a mobile app takes days, cryptographic certificates, and human review.

## 1. App Signing (Certificates & Provisioning)
Apple and Google mathematically refuse to run code on their devices unless they know exactly who wrote it.
- **Keystores (Android)**: You generate a cryptographic JKS file (Java KeyStore). You must sign your final TICK1.aabTICK1 (Android App Bundle) with this key. If you lose this key, you literally cannot ever update your app again.
- **Provisioning Profiles (iOS)**: The most notorious pain point in mobile engineering. You must generate a Certificate Signing Request, upload it to Apple, download a Certificate, register the specific Device UUIDs allowed to run the app, and bundle it all into a Provisioning Profile just to compile the app for a physical iPhone.

## 2. The App Stores & Review Process
- **Google Play Console**: The dashboard for Android apps. Generally faster automated reviews, but strictly enforces permissions and privacy policies.
- **Apple App Store Connect**: The dashboard for iOS. Every app update goes through a rigorous human review process that can take 24 to 48 hours. If your app violates the Human Interface Guidelines (or tries to bypass Apple's 30% payment tax), the reviewer will explicitly reject your binary.

## 3. Fastlane (Mobile CI/CD)
Because compiling, signing, taking screenshots, and uploading to the stores is agonizing manual work, the industry uses **Fastlane**.
Fastlane is an open-source tool (written in Ruby). You write a TICK1FastfileTICK1 that mathematically automates the entire process:
1. Increment the version number.
2. Run unit tests.
3. Automatically download Apple Provisioning Profiles (via TICK1matchTICK1).
4. Build the TICK1.ipaTICK1 (iOS) and TICK1.aabTICK1 (Android).
5. Automatically upload the binaries and release notes to TestFlight and Google Play Beta.

</ConceptTemplate>
`,
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
