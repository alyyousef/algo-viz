import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '20. Mobile Development/React Native/index.mdx': `---
title: React Native
description: A framework for building native apps using React.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="React Native">

React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use the React framework along with native platform capabilities.

<Callout icon="info" title="Not Just Web Views">
  Unlike Cordova or Ionic, React Native doesn't render web views inside a native shell. It actually translates your React components into truly native UI blocks (like \`UIView\` on iOS and \`View\` on Android).
</Callout>

## Architecture: The Bridge vs Fabric

Historically, React Native used an asynchronous "Bridge" to serialize JSON messages between the JavaScript thread and the Native (Java/Objective-C) thread. 

Recently, the **New Architecture (Fabric)** introduced JSI (JavaScript Interface), allowing JS to hold references to C++ objects and communicate synchronously with Native code, eliminating the JSON serialization bottleneck.

<ComparisonTable 
  headers={['Architecture', 'Communication Method', 'Performance']}
  rows={[
    ['Old (The Bridge)', 'Asynchronous JSON Serialization', 'Slower, especially for heavy animations.'],
    ['New (Fabric & JSI)', 'Synchronous C++ References', 'Blazing fast, closer to pure native.']
  ]}
/>

## Example: A Simple React Native Component

React Native looks almost identical to React for the web, but uses native primitives like \`View\` instead of \`div\`.

\`\`\`javascript
import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You clicked {count} times</Text>
      <Button onPress={() => setCount(count + 1)} title="Click Me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  }
});
\`\`\`

</TechnologyTemplate>
`,
  '20. Mobile Development/Flutter/index.mdx': `---
title: Flutter
description: Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Flutter">

Flutter is an open-source UI software development kit created by Google. It is used to develop cross-platform applications for Android, iOS, Linux, macOS, Windows, Google Fuchsia, and the web from a single codebase. It uses the **Dart** programming language.

<Callout icon="tip" title="Painting the Screen">
  Unlike React Native which translates UI into OEM widgets, Flutter ships with its own high-performance rendering engine (Skia, and recently Impeller). It literally draws every pixel on the screen itself, ensuring your app looks 100% identical on iOS and Android.
</Callout>

## Everything is a Widget

In Flutter, the core philosophy is that "Everything is a Widget." Layouts, text, buttons, and even padding or animation controllers are just widgets nested inside other widgets.

<ComparisonTable 
  headers={['Widget Type', 'Description']}
  rows={[
    ['StatelessWidget', 'A widget that does not require mutable state (e.g. an Icon or a static Text label).'],
    ['StatefulWidget', 'A widget that has mutable state (e.g. a Form or a counter button).']
  ]}
/>

## Example: A Simple Flutter App

Flutter code is highly nested, often referred to as the "Widget Tree."

\`\`\`dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter Demo')),
        body: const Center(
          child: Text('Hello World!'),
        ),
      ),
    );
  }
}
\`\`\`

## Architecture

Flutter compiles Dart directly to native ARM code, and uses C++ to render the UI directly to the device's canvas.

<ArchitectureDiagram chart={\`
graph TD
  Dart[Dart App Code\\n(Widgets, Animation, State)]
  Engine[Flutter Engine\\nC++ (Skia / Impeller)]
  Platform[Platform Specific\\n(iOS / Android)]
  
  Dart -- Renders via --> Engine
  Engine -- Draws to Canvas --> Platform
  Platform -- Touch Events --> Engine
  Engine -- Callbacks --> Dart
\`} />

</TechnologyTemplate>
`,
  '20. Mobile Development/Swift/index.mdx': `---
title: Swift
description: A powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Swift">

Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. Introduced in 2014, it was designed as a replacement for Objective-C, offering modern syntax, safety features, and incredible performance.

<Callout icon="info" title="Memory Safety">
  Swift is designed to be highly safe. Variables must be initialized before use, arrays and integers are checked for overflow, and memory is automatically managed using **ARC (Automatic Reference Counting)**.
</Callout>

## Optionals

One of Swift's most defining features is **Optionals**. In Swift, a regular variable cannot be \`nil\`. If a variable might be empty, it must be explicitly marked as an Optional using a \`?\`. This eliminates entire classes of Null Pointer Exceptions at compile time.

\`\`\`swift
// This cannot be nil.
var greeting: String = "Hello"

// This can be a String, or it can be nil.
var optionalName: String? = "Alice"

// Safely unwrapping an optional using 'if let'
if let name = optionalName {
    print("\\(greeting), \\(name)!")
} else {
    print("\\(greeting), anonymous!")
}
\`\`\`

## Structs vs Classes

Unlike many Object-Oriented languages, Swift heavily favors **Value Types** (Structs) over **Reference Types** (Classes).

<ComparisonTable 
  headers={['Type', 'Behavior', 'Use Case']}
  rows={[
    ['Class', 'Passed by Reference (Heap allocated)', 'When you need inheritance or shared mutable state.'],
    ['Struct', 'Passed by Value (Copied, Stack allocated)', 'Default choice for most data models. Highly performant.']
  ]}
/>

## Ecosystem

Swift is deeply integrated with Apple's frameworks:
- **SwiftUI**: The modern, declarative UI framework.
- **UIKit**: The older, imperative UI framework for iOS.
- **Foundation**: Core data types, networking, and file I/O.

</TechnologyTemplate>
`,
  '20. Mobile Development/Kotlin/index.mdx': `---
title: Kotlin
description: A modern programming language that makes developers happier.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Kotlin">

Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin's standard library depends on the Java Class Library. In 2019, Google announced that Kotlin is the preferred language for Android app developers.

<Callout icon="tip" title="Null Safety">
  Like Swift, Kotlin builds null safety directly into the type system. You cannot assign \`null\` to a standard variable; you must explicitly declare it as nullable using \`?\` (e.g., \`String?\`).
</Callout>

## Key Advantages over Java

<ComparisonTable 
  headers={['Feature', 'Kotlin Syntax / Advantage']}
  rows={[
    ['Conciseness', 'Data classes automatically generate getters, setters, equals(), and hashCode().'],
    ['Null Safety', 'Eliminates NullPointerExceptions at compile time.'],
    ['Extension Functions', 'Allows you to extend a class with new functionality without inheriting from it.'],
    ['Coroutines', 'Lightweight, highly performant asynchronous programming.']
  ]}
/>

## Example: Data Classes and Coroutines

Kotlin drastically reduces boilerplate compared to Java.

\`\`\`kotlin
// A single line replaces 50 lines of Java boilerplate
data class User(val id: Int, val name: String, val email: String)

fun main() = runBlocking {
    val user = User(1, "Alice", "alice@example.com")
    
    // Launching a lightweight coroutine
    launch {
        delay(1000L)
        println("Email sent to: \${user.email}")
    }
    
    println("Processing user: \${user.name}...")
}
\`\`\`

## Kotlin Multiplatform (KMP)

While primarily known for Android, **Kotlin Multiplatform** allows developers to share business logic (networking, databases, models) across iOS and Android, while still keeping the UI entirely native (SwiftUI on iOS, Jetpack Compose on Android).

<ArchitectureDiagram chart={\`
graph TD
  Shared[Shared Kotlin Code\\n(API, DB, ViewModels)]
  
  subgraph iOS App
    Swift[SwiftUI]
  end
  
  subgraph Android App
    Compose[Jetpack Compose]
  end
  
  Shared --> Swift
  Shared --> Compose
\`} />

</TechnologyTemplate>
`,
  '20. Mobile Development/Ionic/index.mdx': `---
title: Ionic
description: The cross-platform app development toolkit for web developers.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Ionic">

The Ionic Framework is an open-source UI toolkit for building performant, high-quality mobile and desktop apps using web technologies (HTML, CSS, and JavaScript) with integrations for popular frameworks like Angular, React, and Vue.

<Callout icon="warning" title="Web Views">
  Unlike React Native or Flutter, Ionic applications run inside a native Web View (like a hidden browser). While modern devices make this highly performant, it is still essentially a web app running inside a native wrapper (Capacitor or Cordova).
</Callout>

## The Capacitor Bridge

Ionic apps rely on **Capacitor** (built by the Ionic team) to bridge the gap between standard web APIs and Native device APIs (like the Camera, GPS, or Haptics).

<ArchitectureDiagram chart={\`
graph TD
  Web[Web Code\\nReact / Vue / Angular]
  Capacitor[Capacitor JS Bridge]
  Native[Native Device SDKs\\nCamera, Bluetooth, Push]
  
  Web -- JS API Call --> Capacitor
  Capacitor -- Native Execution --> Native
  Native -- Result --> Capacitor
  Capacitor -- Promise Resolution --> Web
\`} />

## Example: Using Native Features

Ionic provides incredibly simple hooks to access native hardware.

\`\`\`javascript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath will contain a path that can be set as an image src.
  var imageUrl = image.webPath;
  console.log("Photo taken!", imageUrl);
};
\`\`\`

## When to use Ionic?

<ComparisonTable 
  headers={['Scenario', 'Recommendation']}
  rows={[
    ['Existing Web Team', 'Perfect. You can use standard React/Vue without learning mobile-specific concepts.'],
    ['PWA First', 'Ionic is the absolute best choice if your primary goal is a Progressive Web App.'],
    ['Heavy 3D / Animations', 'Avoid. Use Flutter or pure Native for high-performance rendering needs.']
  ]}
/>

</TechnologyTemplate>
`,
}

async function generateMobile() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMobile().catch(console.error)
