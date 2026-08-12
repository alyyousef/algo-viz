import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '18. Backend Development/18.2 Runtimes & Frameworks/Spring Boot/index.mdx': `---
title: Spring Boot
description: Java-based open-source framework used to create a micro Service.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Spring Boot">

Spring Boot is an open-source Java-based framework used to create stand-alone, production-grade Spring-based Applications with minimal effort. It is built on top of the Spring Framework and provides an opinionated approach to configuration, eliminating much of the boilerplate code traditionally associated with enterprise Java development.

<Callout icon="info" title="Convention Over Configuration">
  Spring Boot uses "Starters" and auto-configuration to automatically configure your application based on the jar dependencies you have added on the classpath.
</Callout>

## Core Features

<ComparisonTable 
  headers={['Feature', 'Description', 'Benefit']}
  rows={[
    ['Auto-Configuration', 'Automatically configures Spring beans based on classpath dependencies.', 'No more massive XML configuration files.'],
    ['Standalone', 'Embeds Tomcat, Jetty, or Undertow directly into the application.', 'No need to deploy WAR files to an external web server.'],
    ['Opinionated', 'Provides default configurations for most Spring projects.', 'Gets you up and running quickly.'],
    ['Actuator', 'Built-in endpoints for monitoring and managing the application.', 'Production-ready metrics and health checks out of the box.']
  ]}
/>

## Example: A Simple REST Controller

Creating a web server in Spring Boot is incredibly concise compared to older J2EE standards.

\`\`\`java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World from Spring Boot!";
    }
}
\`\`\`

## Architecture

Spring Boot heavily utilizes **Dependency Injection (DI)** and **Inversion of Control (IoC)** to manage application components.

<ArchitectureDiagram chart={\`
graph TD
  Request[HTTP Request]
  Controller[REST Controller\\n(@RestController)]
  Service[Service Layer\\n(@Service)]
  Repository[Data Access Layer\\n(@Repository)]
  DB[(Database)]
  
  Request --> Controller
  Controller -- Business Logic --> Service
  Service -- Data Queries --> Repository
  Repository --> DB
\`} />

</TechnologyTemplate>
`,
  '18. Backend Development/18.2 Runtimes & Frameworks/ASP.NET Core/index.mdx': `---
title: ASP.NET Core
description: A cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected apps.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="ASP.NET Core">

ASP.NET Core is a free, cross-platform, and open-source web framework created by Microsoft. It is a complete redesign of ASP.NET that unites the previously separate ASP.NET MVC and ASP.NET Web API into a single programming model.

<Callout icon="tip" title="Blazing Fast">
  ASP.NET Core consistently ranks among the fastest web frameworks in the world in the TechEmpower benchmarks, often outperforming Node.js, Java Spring, and Go in raw request-per-second throughput.
</Callout>

## Key Benefits

<ComparisonTable 
  headers={['Benefit', 'Description']}
  rows={[
    ['Cross-Platform', 'Runs on Windows, macOS, and Linux.'],
    ['Unified MVC & Web API', 'Use the same controllers and routing for HTML views and JSON APIs.'],
    ['Dependency Injection', 'Built-in DI container out of the box.'],
    ['Kestrel Web Server', 'Includes Kestrel, a highly optimized cross-platform web server.']
  ]}
/>

## Example: Minimal API

With recent versions (C# 10 / .NET 6+), ASP.NET Core introduced **Minimal APIs**, stripping away the boilerplate of traditional controllers to compete with the simplicity of Node.js/Express.

\`\`\`csharp
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello World from ASP.NET Core!");

app.Run();
\`\`\`

## Typical Architecture (Clean Architecture)

Enterprise ASP.NET Core applications often follow a layered architecture to separate concerns.

<ArchitectureDiagram chart={\`
graph TD
  Web[Web API Layer\\n(Controllers / Endpoints)]
  App[Application Layer\\n(Interfaces / MediatR)]
  Domain[Domain Layer\\n(Entities / Value Objects)]
  Infra[Infrastructure Layer\\n(EF Core / DB Context)]
  
  Web --> App
  App --> Domain
  Infra --> App
  Infra --> Domain
\`} />

</TechnologyTemplate>
`,
  '18. Backend Development/18.2 Runtimes & Frameworks/Django/index.mdx': `---
title: Django
description: The web framework for perfectionists with deadlines.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Django">

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.

<Callout icon="info" title="Batteries Included">
  Django follows the "Batteries Included" philosophy. It provides an ORM, an admin panel, authentication, routing, templating, and form validation right out of the box.
</Callout>

## The MTV Architecture

While most frameworks use MVC (Model-View-Controller), Django uses the **MTV (Model-Template-View)** pattern, which is conceptually identical but uses different terminology.

<ComparisonTable 
  headers={['MVC Term', 'Django Term', 'Responsibility']}
  rows={[
    ['Model', 'Model', 'Defines the data structure (Database schema)'],
    ['View', 'Template', 'Defines how the data is presented (HTML)'],
    ['Controller', 'View', 'The business logic that connects Models to Templates']
  ]}
/>

## Example: Model and View

Defining a database model and a view to display it is extremely straightforward in Django.

\`\`\`python
# models.py
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)

# views.py
from django.shortcuts import render
from .models import Article

def article_list(request):
    articles = Article.objects.all().order_by('-published_date')
    return render(request, 'articles/list.html', {'articles': articles})
\`\`\`

## The Django Admin

One of Django's most famous features is its auto-generated Admin interface. By simply registering a model, Django creates a fully functional CRUD web interface for administrators to manage the database content, saving countless hours of development time.

<ArchitectureDiagram chart={\`
graph TD
  Admin[Admin Interface]
  Views[Django Views]
  ORM[Django ORM]
  DB[(SQL Database)]
  
  Admin --> ORM
  Views --> ORM
  ORM --> DB
\`} />

</TechnologyTemplate>
`,
  '18. Backend Development/18.2 Runtimes & Frameworks/Ruby on Rails/index.mdx': `---
title: Ruby on Rails
description: A web-application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller (MVC) pattern.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Ruby on Rails">

Ruby on Rails, or simply Rails, is a server-side web application framework written in Ruby under the MIT License. Rails is a model–view–controller (MVC) framework, providing default structures for a database, a web service, and web pages. It was created by David Heinemeier Hansson (DHH) while working on Basecamp.

<Callout icon="tip" title="Convention Over Configuration">
  Rails popularized the "Convention Over Configuration" paradigm. By adhering to Rails' naming conventions (e.g., a model named \`User\` automatically maps to a database table named \`users\`), you write significantly less boilerplate code.
</Callout>

## Key Philosophies

<ComparisonTable 
  headers={['Philosophy', 'Meaning']}
  rows={[
    ['DRY (Don\\'t Repeat Yourself)', 'Information should be located in a single, unambiguous place.'],
    ['Convention Over Configuration', 'Assume sensible defaults instead of requiring endless configuration files.'],
    ['The Omakase Menu', 'A curated stack of the best tools chosen by the creators, rather than a la carte selection.']
  ]}
/>

## Example: Active Record

Rails uses **Active Record** as its ORM, tightly coupling the database rows to Ruby objects.

\`\`\`ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :posts
  validates :email, presence: true, uniqueness: true
end

# Usage in a controller
def index
  # Fetches all users who have posts, preventing N+1 queries
  @users = User.includes(:posts).all
end
\`\`\`

## The Rails Ecosystem

Rails pioneered many tools that are now standard across all web development ecosystems.

<ArchitectureDiagram chart={\`
graph TD
  Router[Action Dispatch / Router]
  Controller[Action Controller]
  Model[Active Record (ORM)]
  View[Action View (ERB/HTML)]
  Jobs[Active Job (Background Tasks)]
  
  Router --> Controller
  Controller --> Model
  Controller --> View
  Controller --> Jobs
\`} />

</TechnologyTemplate>
`,
  '18. Backend Development/18.2 Runtimes & Frameworks/Laravel/index.mdx': `---
title: Laravel
description: The PHP Framework for Web Artisans.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate title="Laravel">

Laravel is a free, open-source PHP web framework created by Taylor Otwell. It is intended for the development of web applications following the model–view–controller (MVC) architectural pattern. Laravel heavily modernized the PHP ecosystem by providing an elegant, expressive syntax and a massive ecosystem of first-party tools.

<Callout icon="info" title="The Ecosystem King">
  Laravel is renowned for its immense first-party ecosystem. Tools like Forge (server management), Vapor (serverless), Nova (admin panel), and Livewire (dynamic UI without JS) make it a complete powerhouse for solo developers and agencies.
</Callout>

## Core Features

<ComparisonTable 
  headers={['Feature', 'Description']}
  rows={[
    ['Eloquent ORM', 'An advanced, beautiful Active Record implementation.'],
    ['Blade Templating', 'A simple, yet powerful templating engine.'],
    ['Artisan CLI', 'A powerful command-line interface for scaffolding and tasks.'],
    ['Routing', 'Expressive and simple routing definition.']
  ]}
/>

## Example: Eloquent ORM & Routing

Laravel's syntax is designed to be highly readable.

\`\`\`php
// routes/web.php
use App\\Models\\User;
use Illuminate\\Support\\Facades\\Route;

Route::get('/active-users', function () {
    // Eloquent ORM makes database queries read like English
    $users = User::where('active', 1)
                 ->orderBy('created_at', 'desc')
                 ->take(10)
                 ->get();
                 
    return view('users.index', ['users' => $users]);
});
\`\`\`

## Architecture

Laravel relies heavily on its **Service Container** (for Dependency Injection) and **Service Providers** to bootstrap the application.

<ArchitectureDiagram chart={\`
graph TD
  Request[HTTP Request]
  Router[Laravel Router]
  Middleware[Middleware (Auth/CORS)]
  Controller[Controller]
  Eloquent[Eloquent ORM]
  DB[(MySQL / PostgreSQL)]
  
  Request --> Router
  Router --> Middleware
  Middleware --> Controller
  Controller --> Eloquent
  Eloquent --> DB
\`} />

</TechnologyTemplate>
`,
}

async function generateFrameworks() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateFrameworks().catch(console.error)
