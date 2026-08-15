import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Dart/index.mdx': `---
title: Dart
description: "A client-optimized language created by Google, famous for powering the Flutter UI framework."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Dart"
  icon="smartphone"
>

Created by Google in 2011, **Dart** was originally intended to replace JavaScript in the browser. While that ambition failed, Dart found massive success years later as the foundational language for **Flutter**, Google's wildly popular cross-platform UI toolkit.

## Key Characteristics

1. **Client-Optimized**: Dart is explicitly designed for building fast user interfaces on screens (mobile, web, desktop).
2. **JIT & AOT Compilation**: 
   - During development, it uses **Just-In-Time (JIT)** compilation to enable "Hot Reload" (instant UI updates without losing state).
   - For production, it uses **Ahead-Of-Time (AOT)** compilation to compile down to native ARM/x86 machine code, resulting in fast startup and smooth 60fps performance.
3. **Sound Null Safety**: Types in Dart are non-nullable by default, completely eliminating Null Reference Exceptions at runtime.

## Syntax Example

Dart feels very familiar to Java, C#, or TypeScript developers.

${TICK3}dart
// A simple Dart program
void main() {
  String name = 'Flutter Dev';
  int age = 30;
  
  // Nullable type
  String? nickname = null;

  print('Hello $name!');
  
  // Asynchronous programming is built-in
  fetchData().then((data) => print(data));
}

Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  return 'Data loaded';
}
${TICK3}

<Callout icon="info" title="The Flutter Connection">
You almost never see Dart used outside of Flutter. The language and the framework evolved together; Dart's syntax actually changed to better support Flutter's declarative widget trees (e.g., adding collection-if and spread operators).
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Kotlin/index.mdx': `---
title: Kotlin
description: "A modern, concise, and safe programming language by JetBrains, now the official language of Android development."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Kotlin"
  icon="code"
>

Developed by JetBrains (the creators of IntelliJ IDEA), **Kotlin** is a statically-typed language that runs on the Java Virtual Machine (JVM). In 2019, Google announced Kotlin as the preferred language for Android app development, largely replacing Java.

## Why Kotlin Beat Java on Android

1. **100% Interoperability**: You can call Java code from Kotlin, and Kotlin code from Java, in the exact same project without performance penalties.
2. **Conciseness**: Kotlin drastically reduces boilerplate code. What takes 50 lines of Java (getters, setters, equals, hashCode) takes one line in Kotlin using a TICK1data classTICK1.
3. **Null Safety**: Kotlin's type system distinguishes between nullable and non-nullable types, killing the dreaded TICK1NullPointerExceptionTICK1 (The Billion Dollar Mistake).
4. **Coroutines**: A lightweight mechanism for asynchronous programming that makes non-blocking network calls look like sequential, synchronous code.

## Syntax Example

${TICK3}kotlin
// A single line creates a fully-featured data model
data class User(val name: String, val age: Int)

fun main() {
    // Type inference (no need to specify 'User')
    val alice = User("Alice", 28)
    
    // Null safety (won't compile if you assign null to a non-nullable String)
    var city: String = "New York"
    // city = null // ERROR
    
    // Safe calls
    var nickname: String? = null
    println(nickname?.length ?: 0) // Prints 0 if nickname is null
}
${TICK3}

<Callout icon="tip" title="Beyond Android">
While famous for Android, Kotlin is heavily used in backend development using frameworks like Spring Boot or Ktor, providing a modern alternative to Java for enterprise microservices.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Lua/index.mdx': `---
title: Lua
description: "A fast, lightweight, embeddable scripting language heavily used in the video game industry."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Lua"
  icon="cpu"
>

**Lua** (Portuguese for "Moon") was created in Brazil in 1993. It was explicitly designed to be a lightweight, embeddable scripting language. The entire Lua interpreter is written in clean C and is astonishingly small (under 300KB).

## The King of Game Scripting

Because Lua is so fast, lightweight, and easy to bind to C/C++, it became the absolute standard for scripting logic inside game engines. 
- **World of Warcraft**: The entire UI and addon system is written in Lua.
- **Roblox**: The sole programming language used to build Roblox games (Luau, a specialized fork).
- **Angry Birds**: Built entirely using the Lua-based framework LÖVE.

## Key Features

1. **Tables**: Lua's only data structuring mechanism is the "Table" (an associative array). It functions as arrays, hashes, objects, and namespaces all at once.
2. **Embeddability**: You write the heavy physics engine in C++, and expose high-level functions to Lua so game designers can quickly script quest logic without recompiling the C++ engine.
3. **1-Based Indexing**: Famously, arrays in Lua start at index 1, not 0.

## Syntax Example

${TICK3}lua
-- Variables
local player_health = 100
local player_name = "Hero"

-- Tables (used as arrays or dictionaries)
local inventory = { "Sword", "Shield", "Potion" }
local stats = { str = 10, dex = 15, int = 8 }

-- Functions
function take_damage(amount)
    player_health = player_health - amount
    if player_health <= 0 then
        print("Player died!")
    end
end

-- Arrays start at 1!
print("Equipped: " .. inventory[1]) -- Prints "Sword"
${TICK3}

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/MATLAB/index.mdx': `---
title: MATLAB
description: "A proprietary programming language and computing environment specialized for numerical analysis and matrix manipulation."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="MATLAB"
  icon="activity"
>

**MATLAB** (Matrix Laboratory) is a proprietary, multi-paradigm programming language and IDE developed by MathWorks. It is heavily utilized by engineers, physicists, and applied mathematicians for highly complex numerical computing.

## Why Engineers Use MATLAB

While Python (with NumPy) has eaten into its market share, MATLAB remains dominant in aerospace, automotive, and robotics engineering due to:
1. **Simulink**: A graphical programming environment tightly integrated with MATLAB, used for modeling and simulating dynamic systems (e.g., car engines, flight controllers).
2. **Toolboxes**: Highly specialized, mathematically rigorous, commercially supported libraries for signal processing, control systems, and computational finance.
3. **Matrix Native**: Everything in MATLAB is a matrix. Operations on entire arrays or matrices are native to the syntax and highly optimized.

## Syntax Example

${TICK3}matlab
% Create a 1D array (vector) from 0 to 10 with step 0.1
t = 0:0.1:10; 

% Calculate the sine of every element in the array instantly (vectorization)
y = sin(t); 

% Plot the result with labels
plot(t, y);
title('Sine Wave');
xlabel('Time (t)');
ylabel('Amplitude (y)');

% Matrix multiplication
A = [1 2; 3 4];
B = [5 6; 7 8];
C = A * B; % True matrix multiplication, not element-wise
${TICK3}

<Callout icon="warning" title="Proprietary Limitations">
Unlike Python or R, MATLAB requires an expensive commercial license. This has driven a massive shift toward open-source alternatives in academia and startups over the last decade.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Julia/index.mdx': `---
title: Julia
description: "A high-level, high-performance dynamic programming language specifically designed for scientific computing."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Julia"
  icon="activity"
>

**Julia**, first released in 2012, was created to solve the "Two-Language Problem" in data science and scientific computing.

## The Two-Language Problem
Historically, scientists prototyped models in high-level, easy-to-use (but slow) languages like **Python** or **R**. Once the model proved viable, software engineers had to completely rewrite it in a low-level, fast language like **C++** or **Fortran** for production.

Julia is designed to "walk like Python and run like C."

## Key Features

1. **JIT Compilation**: Julia uses LLVM to Just-In-Time compile its code down to optimized machine code, achieving speeds comparable to C.
2. **Multiple Dispatch**: Julia's core paradigm. Functions are dynamically selected at runtime based on the *types of all arguments*, allowing highly optimized mathematical code without complex Object-Oriented inheritance.
3. **Math-Friendly Syntax**: The syntax is heavily inspired by MATLAB, making mathematical formulas look nearly identical to how they are written on a chalkboard.

## Syntax Example

${TICK3}julia
# Define a function
function f(x, y)
    # Implicit return of the last expression
    x^2 + y^2
end

# Types can be explicitly annotated for performance/clarity
function f_typed(x::Float64, y::Float64)
    x^2 + y^2
end

# Matrices are native
A = [1 2; 3 4]
B = [5, 6]
# Mathematical solving of linear systems (Ax = B)
x = A \\ B 
${TICK3}

<Callout icon="tip" title="Use Cases">
Julia is highly popular in climate modeling, bioinformatics, macroeconomics, and computational physics. However, Python still dominates machine learning purely due to the overwhelming momentum of frameworks like PyTorch and TensorFlow.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Elm/index.mdx': `---
title: Elm
description: "A purely functional programming language that compiles to JavaScript, guaranteeing zero runtime exceptions."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Elm"
  icon="cpu"
>

**Elm** is a domain-specific programming language for creating web browser-based graphical user interfaces. It is purely functional, statically typed, and compiles to JavaScript.

## The Promise: No Runtime Exceptions
Elm is famous for its compiler. If an Elm program compiles successfully, it is virtually guaranteed not to throw a runtime exception in the browser (no TICK1undefined is not a functionTICK1). The compiler achieves this via a remarkably strict, sound type system and by banning side-effects from core logic.

## The Elm Architecture (TEA)
Elm introduced a state-management pattern that revolutionized frontend development. In fact, **Redux** (the famous React state manager) was explicitly created as an attempt to bring The Elm Architecture to JavaScript.

The architecture consists of three parts:
1. **Model**: The state of your application.
2. **View**: A function that turns the Model into HTML.
3. **Update**: A function that updates the Model based on messages/events.

## Syntax Example

${TICK3}elm
-- Model
type alias Model = Int

-- Update (Pattern matching ensures all cases are handled)
type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

-- View (Declarative HTML rendering)
view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
${TICK3}

<Callout icon="warning" title="Adoption">
While beloved by those who use it, Elm's strictness, steep learning curve (functional programming), and small ecosystem mean it has not achieved mainstream commercial adoption compared to React, Vue, or Angular.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Carbon/index.mdx': `---
title: Carbon
description: "An experimental, open-source programming language started by Google to serve as a modern successor to C++."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Carbon"
  icon="shield"
>

Introduced by Google in 2022, **Carbon** is an experimental, general-purpose programming language designed to be a bi-directional, interoperable successor to **C++**. 

## Why not just use Rust?
Rust is technically superior to C++ in memory safety. However, migrating a 50-million-line C++ codebase to Rust is effectively impossible due to vastly different paradigms. Carbon is designed specifically for organizations with massive, entrenched C++ codebases that cannot afford to rewrite everything from scratch.

## Key Goals

1. **Bi-Directional Interoperability**: You can include a C++ header file in a Carbon file and use C++ classes natively, and vice-versa.
2. **Modern Tooling**: Providing a package manager, fast builds, and modern syntax (similar to Swift or Rust).
3. **Gentle Migration**: A tool that automatically translates idiomatic C++ into Carbon.

## Syntax Example

${TICK3}cpp
// Carbon syntax is currently experimental and subject to change
package Geometry api;

import Math;

// Classes instead of structs
class Circle {
  var radius: f32;

  // Methods
  fn Area[me: Self]() -> f32 {
    return Math.Pi * me.radius * me.radius;
  }
}

fn Main() -> i32 {
  var c: Circle = {.radius = 5.0};
  Print("Area is {0}", c.Area());
  return 0;
}
${TICK3}

<Callout icon="warning" title="Status: Experimental">
Carbon is still in the highly experimental design phase. It is not ready for production use, and its syntax and feature set are actively mutating.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Mojo/index.mdx': `---
title: Mojo
description: "A new programming language designed for AI development, combining the usability of Python with the performance of C."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Mojo"
  icon="cpu"
>

Released by Modular in 2023, **Mojo** is a programming language designed specifically for Artificial Intelligence and high-performance systems programming. It aims to be a strict superset of **Python** (like TypeScript is to JavaScript).

## The AI Hardware Problem
Python is the undisputed king of AI. However, Python is incredibly slow and cannot natively interface with GPUs or specialized AI hardware (like TPUs). To fix this, AI libraries (PyTorch, TensorFlow) are actually written in complex C++ and CUDA, with Python just acting as a simple wrapper wrapper on top. 

Mojo allows developers to write high-performance systems code (capable of interacting directly with hardware and SIMD registers) while maintaining Python's beloved syntax.

## Key Features

1. **Python Superset**: Any valid Python code is valid Mojo code. You can even import standard Python libraries natively.
2. **TICK1fnTICK1 vs TICK1defTICK1**: While you can use Python's TICK1defTICK1 for dynamic functions, Mojo introduces TICK1fnTICK1 for strict, statically-typed, memory-safe, compiled functions.
3. **Hardware Acceleration**: Mojo can compile directly to MLIR (Multi-Level Intermediate Representation), allowing it to optimize code for specific CPUs and GPUs flawlessly.

## Syntax Example

${TICK3}python
# This is standard Python, and valid Mojo
def greet(name):
    return "Hello " + name

# This is Mojo-specific high-performance code
# 'fn' enforces static typing, memory safety, and immutable arguments by default
fn fast_greet(name: String) -> String:
    return "Hello " + name

fn main():
    # Mojo supports SIMD (Single Instruction, Multiple Data) natively
    let a = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
    let b = SIMD[DType.float32, 4](2.0, 2.0, 2.0, 2.0)
    print(a * b) # Parallelized multiplication at the hardware level
${TICK3}

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
