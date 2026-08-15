import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Odin/index.mdx': `---
title: Odin
description: "A fast, concise, readable, pragmatic and open sourced systems programming language."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Odin"
  icon="cpu"
>

**Odin** is a modern systems programming language created by Ginger Bill. It is designed as a direct, pragmatic alternative to C, focusing on high performance, fast compilation times, and readability, without the extreme complexity of C++ or the steep learning curve of Rust.

## The Pragmatic Alternative

Unlike Rust, which relies heavily on a strict borrow checker to guarantee memory safety, Odin takes a different approach: it gives the programmer absolute control over memory, but provides excellent, modern tools (like explicit custom allocators) to make memory management easier and more explicit than in C.

It is particularly popular in the **Game Development** community for building custom engines.

## Syntax Example

Odin's syntax is clean and heavily inspired by Go and Pascal, avoiding the header-file mess of C.

${TICK3}odin
package main

import "core:fmt"

// Structs are simple data containers
Person :: struct {
    name: string,
    age:  int,
}

main :: proc() {
    // Implicit type inference
    p := Person{"Odin Developer", 25}
    
    // Explicit format printing
    fmt.printf("Hello, my name is %s and I am %d years old.\\n", p.name, p.age)
    
    // Arrays and slices
    numbers := [?]int{1, 2, 3, 4, 5}
    for n in numbers {
        fmt.printf("%d ", n)
    }
}
${TICK3}

<Callout icon="tip" title="Built-in Custom Allocators">
Odin's defining feature is its context system, which allows you to pass custom memory allocators (like arena allocators) implicitly to functions. This allows game developers to allocate memory instantly without expensive OS-level TICK1mallocTICK1 calls, drastically improving framerates.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Pascal/index.mdx': `---
title: Pascal
description: "The highly influential procedural programming language that taught a generation of developers how to code."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Pascal"
  icon="file-text"
>

Created by Niklaus Wirth in 1970, **Pascal** was designed specifically as a teaching language to encourage good programming practices using structured programming and data structuring.

## A Legacy of Structure

Before Pascal, many languages (like early BASIC or Fortran) relied heavily on TICK1GOTOTICK1 statements, leading to unmaintainable "spaghetti code". Pascal forced developers into a strict, block-structured paradigm using TICK1beginTICK1 and TICK1endTICK1, procedures, and explicit variable typing.

It was wildly successful. Throughout the 1980s, Pascal (specifically Borland's Turbo Pascal) was the most popular teaching language in the world and the primary language for Apple's original Macintosh operating system.

## Syntax Example

Pascal is famously readable, reading almost like plain English.

${TICK3}pascal
program HelloPascal;

var
  Name: string;
  Age: integer;

begin
  Write('Enter your name: ');
  ReadLn(Name);
  
  Age := 25; { Assignment uses := instead of = }
  
  if Age >= 18 then
  begin
    WriteLn('Hello ', Name, ', you are an adult.');
  end
  else
  begin
    WriteLn('Hello ', Name, ', you are a minor.');
  end;
end.
${TICK3}

<Callout icon="info" title="The Successor">
While classic Pascal is purely procedural, it evolved into **Object Pascal** (and the Delphi framework), which brought object-oriented features and dominated Windows development in the late 1990s.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Perl/index.mdx': `---
title: Perl
description: "The Swiss Army chainsaw of scripting languages, famous for its unmatched text processing capabilities and dense syntax."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Perl"
  icon="terminal"
>

Created by Larry Wall in 1987, **Perl** (Practical Extraction and Reporting Language) was originally designed as a Unix scripting language to make report processing easier. It quickly evolved into the "duct tape of the Internet" during the 1990s dot-com boom.

## The Master of Regex

Perl is legendary for its built-in Regular Expression (Regex) engine. In almost all modern languages (Python, JavaScript, Java), Regex implementation is heavily inspired by Perl (PCRE - Perl Compatible Regular Expressions).

## Syntax Example

Perl is famous (and sometimes criticized) for its extreme conciseness and its motto: "There Is More Than One Way To Do It" (TIMTOWTDI). It uses sigils (TICK1$TICK1, TICK1@TICK1, TICK1%TICK1) to denote variable types.

${TICK3}perl
#!/usr/bin/perl
use strict;
use warnings;

# Scalar ($) - Single value
my $name = "World";

# Array (@) - List of values
my @colors = ("red", "green", "blue");

# Hash (%) - Key/Value pairs
my %ages = ("Alice" => 25, "Bob" => 30);

print "Hello $name!\\n";

# Perl's legendary Regex integration
my $text = "The quick brown fox";
if ($text =~ /brown (\\w+)/) {
    print "Found the animal: $1\\n"; # Prints "fox"
}
${TICK3}

<Callout icon="warning" title="Write-Only Language?">
Because Perl allows developers to write incredibly dense, cryptic code using implicit variables (like TICK1$_TICK1), it earned a reputation as a "write-only" language—code that is easy to write but nearly impossible to read or maintain six months later. This complexity heavily contributed to developers fleeing to Python and Ruby in the 2000s.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/PHP/index.mdx': `---
title: PHP
description: "The legendary server-side scripting language that powers the vast majority of websites on the internet."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="PHP"
  icon="server"
>

**PHP** (PHP: Hypertext Preprocessor) was created by Rasmus Lerdorf in 1994. Originally a simple set of Common Gateway Interface (CGI) binaries written in C, it evolved into the most widely used server-side language on the web.

Today, PHP powers nearly **80% of all websites** whose server-side programming language is known, largely due to the massive dominance of Content Management Systems (CMS) like **WordPress**, Joomla, and Drupal.

## Why it Won the Web

1. **Incredible Deployment Simplicity**: Unlike Node.js or Java (which require a running process server), early PHP was completely stateless. You just dropped a TICK1.phpTICK1 file into an Apache server directory, requested the URL, and the server executed the script and died.
2. **Embedded in HTML**: PHP was designed to be interleaved directly with HTML output.

## Syntax Example

${TICK3}php
<?php
// Variables start with a dollar sign
$name = "Visitor";
$isLoggedIn = true;

// Modern PHP supports strict typing
function calculateTax(float $amount, float $rate): float {
    return $amount * $rate;
}
?>

<!DOCTYPE html>
<html>
<body>
    <!-- Interleaving PHP directly into HTML -->
    <h1>Welcome, <?php echo htmlspecialchars($name); ?>!</h1>
    
    <?php if ($isLoggedIn): ?>
        <p>Your dashboard is ready.</p>
    <?php else: ?>
        <p>Please log in.</p>
    <?php endif; ?>
</body>
</html>
${TICK3}

<Callout icon="info" title="The Renaissance">
PHP historically suffered from a terrible reputation regarding inconsistent function names and poor security defaults. However, with the release of PHP 7 and PHP 8, the language experienced a massive renaissance, adding strong typing, incredible performance improvements (JIT), and a highly professional modern framework ecosystem driven by **Laravel**.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/PureScript/index.mdx': `---
title: PureScript
description: "A strongly-typed, purely functional programming language that compiles to readable JavaScript."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="PureScript"
  icon="cpu"
>

**PureScript** is a purely functional, strongly-typed programming language written in and heavily inspired by **Haskell**. Its primary goal is to bring the immense safety and mathematical rigor of Haskell's type system to the frontend web ecosystem by compiling directly to JavaScript.

## Why not just use TypeScript?

TypeScript is a superset of JavaScript; it adds types, but it retains all of JavaScript's messy behaviors (mutability, side-effects, implicit type coercion). 

PureScript is a completely different language. It enforces:
1. **Immutability**: Data cannot be changed once created.
2. **Purity**: Functions cannot have side-effects (like manipulating the DOM or making HTTP requests) unless explicitly wrapped in a special algebraic effect type (like the TICK1EffectTICK1 monad).
3. **Soundness**: If PureScript compiles, you are virtually guaranteed not to have runtime type errors.

## Syntax Example

The syntax is nearly identical to Haskell.

${TICK3}haskell
module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)

-- A pure function with a strict type signature
add :: Int -> Int -> Int
add x y = x + y

-- The main function returns an 'Effect Unit' (a side-effect that returns nothing)
main :: Effect Unit
main = do
  let result = add 5 10
  log ("The result is: " <> show result)
${TICK3}

<Callout icon="tip" title="Readable Output">
Unlike many other languages that compile to JS (which output unreadable minified blobs), PureScript is famous for compiling into very clean, readable, standard JavaScript, making it easy to integrate with existing JS libraries.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/R/index.mdx': `---
title: R
description: "The lingua franca of statistics, data visualization, and academic research."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="R"
  icon="bar-chart"
>

Created in 1993, **R** is a programming language and software environment explicitly designed for statistical computing, data analysis, and graphical visualization.

While Python dominates Machine Learning and general-purpose data science, R absolutely dominates academia, bioinformatics, and pure statistical research.

## The Power of R

1. **Built for Statisticians**: R wasn't built by software engineers; it was built by statisticians. Operations like linear regression, ANOVA, and hypothesis testing are baked into the core language.
2. **DataFrames are Native**: Long before Python had Pandas, R had native DataFrames.
3. **ggplot2**: R is legendary for its visualization libraries. The TICK1ggplot2TICK1 library is widely considered the most powerful and grammatically elegant data visualization tool in existence.

## Syntax Example

R syntax can look a bit alien to traditional programmers, heavily utilizing the TICK1<-TICK1 operator for assignment.

${TICK3}r
# Assignment using the arrow operator
data <- c(10, 20, 30, 40, 50)

# Calculate standard deviation natively
sd_value <- sd(data)

# Create a DataFrame natively
patients <- data.frame(
  Name = c("John", "Jane", "Steve"),
  Age = c(25, 30, 45),
  Healthy = c(TRUE, FALSE, TRUE)
)

# Linear regression in one line (Predict Age based on Health)
model <- lm(Age ~ Healthy, data=patients)
summary(model)
${TICK3}

<Callout icon="warning" title="General Purpose Limitations">
R is highly specialized. While it is incredible for crunching a CSV file and generating a PDF report, it is rarely used to build web backends, APIs, or interactive software.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/ReasonML-ReScript/index.mdx': `---
title: ReasonML & ReScript
description: "A fast, typed language providing the semantics of OCaml with a syntax familiar to JavaScript developers."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="ReasonML & ReScript"
  icon="cpu"
>

**ReasonML** was created by Facebook (Meta) as a syntax extension and toolchain for OCaml, designed to make OCaml look like JavaScript and compile to React natively.

Eventually, the ecosystem split. The team focused specifically on compiling to JavaScript rebranded the language as **ReScript**. 

## Why ReScript over TypeScript?

TypeScript is fundamentally bound by JavaScript's semantics. If JavaScript does something weird, TypeScript must support it. 

ReScript provides a completely sound type system (based on OCaml's legendary Hindley-Milner type system). It offers blazing-fast compilation (measured in milliseconds, not seconds), pattern matching, and 100% type soundness, but compiles to incredibly clean JavaScript.

## Syntax Example

Notice how it looks like JavaScript, but features powerful functional concepts like variant types and pattern matching.

${TICK3}javascript
// Define a Variant (similar to Enums in other languages, but can hold data)
type userStatus =
  | LoggedIn(string) // Holds the username
  | Guest
  | Banned(int) // Holds the days remaining

// Pattern matching (the compiler guarantees all cases are handled)
let getMessage = (status) => {
  switch status {
  | LoggedIn(name) => "Welcome back, " ++ name
  | Guest => "Please log in."
  | Banned(days) => "You are banned for " ++ Belt.Int.toString(days) ++ " days."
  }
}

let currentUser = LoggedIn("Alice")
Js.log(getMessage(currentUser))
${TICK3}

<Callout icon="info" title="React Integration">
ReScript was built by the original creator of React (Jordan Walke). Because of this, writing React code in ReScript is widely considered a significantly smoother and safer experience than using raw TypeScript.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/1. Programming Languages/1.1 General-Purpose/Ruby/index.mdx': `---
title: Ruby
description: "A dynamic, open-source programming language with a focus on simplicity, productivity, and developer happiness."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate 
  name="Ruby"
  icon="gem"
>

Created by Yukihiro "Matz" Matsumoto in 1995, **Ruby** is a dynamic, interpreted, purely object-oriented programming language. Matz explicitly designed Ruby to prioritize **"Developer Happiness"** above all else—valuing human readability and joy over raw machine performance.

## The Web Startup King (Ruby on Rails)

In 2004, David Heinemeier Hansson released **Ruby on Rails**, a web framework written in Ruby. Rails revolutionized web development by introducing "Convention over Configuration". Developers could scaffold an entire database-backed web application in minutes.

Because of Rails, Ruby became the absolute standard for Silicon Valley startups in the late 2000s and 2010s. Massive companies like GitHub, Shopify, Airbnb, and Stripe were all originally built on Ruby on Rails.

## Syntax Example

Everything in Ruby is an object. There are no primitives. Even numbers have methods.

${TICK3}ruby
# A simple class
class Developer
  # Automatically generate getters and setters
  attr_accessor :name, :language

  def initialize(name, language)
    @name = name
    @language = language
  end

  def code
    puts "#{@name} is happily coding in #{@language}!"
  end
end

dev = Developer.new("Alice", "Ruby")
dev.code

# Everything is an object
5.times do
  print "Ruby! "
end
${TICK3}

<Callout icon="tip" title="The Magic of Ruby">
Ruby is famous for its Metaprogramming (code that writes code). This allows frameworks like Rails to feel like "magic" (e.g., dynamically generating database query methods based on the names of your database columns at runtime).
</Callout>

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
