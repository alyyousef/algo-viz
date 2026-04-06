import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Ruby on Rails and Laravel are both high-productivity web frameworks built around developer happiness, strong conventions, and batteries-included application development, but they belong to different language ecosystems. Rails is the iconic framework of the Ruby world and is deeply associated with convention over configuration, MVC structure, Active Record, and rapid full-stack web development. Laravel plays a very similar cultural role in the PHP world, emphasizing expressive syntax, Eloquent ORM, Artisan tooling, Blade templating, queues, and a polished end-to-end developer experience.',
      'That means the practical question is not which one can route requests, talk to a database, render templates, or run queued jobs. Both can. The more useful question is whether the team benefits more from the Ruby and Rails ecosystem or from the PHP and Laravel ecosystem, and whether the framework\'s style matches the team\'s preferred way of building applications.',
      'The original page scope was placeholder content for Ruby on Rails vs Laravel, with planned notes on overview, key ideas, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller technical reference.',
    ],
  },
  {
    id: 'bp-rails',
    title: 'When Ruby on Rails Fits Better',
    paragraphs: [
      'Rails is often the stronger fit when the team wants a highly opinionated, integrated, full-stack framework with a long history of convention-driven productivity. It is especially attractive for teams that value the Rails way, want MVC and Active Record to feel central rather than optional, and prefer a framework that has shaped the development culture of an entire language ecosystem.',
      'It also fits well when the product benefits from Rails conventions around generators, migrations, model associations, RESTful controllers, and a coherent full-stack story that has been refined for many years. Teams that enjoy Ruby\'s language style often find that Rails feels unusually elegant and productive once its conventions click.',
    ],
  },
  {
    id: 'bp-laravel',
    title: 'When Laravel Fits Better',
    paragraphs: [
      'Laravel is often the stronger fit when the team wants a similarly productive batteries-included framework but prefers PHP, Composer, and the wider PHP hosting and package ecosystem. It is especially attractive for teams that want expressive syntax, modern PHP features, first-class queueing and job workflows, strong CLI support through Artisan, and multiple frontend integration styles through Blade, Livewire, Inertia, or API-driven architectures.',
      'Laravel is also a strong fit for teams that want a framework with a polished developer experience but more natural alignment with mainstream PHP infrastructure and hiring pipelines. For many PHP teams, Laravel provides the same sense of framework coherence that Rails provides for Ruby teams.',
    ],
  },
  {
    id: 'bp-same-goal',
    title: 'Same Goal, Different Language Gravity',
    paragraphs: [
      'Both frameworks care deeply about productivity. Both provide routing, ORM-style data access, migrations, validation, authentication building blocks, templating, testing support, queueing, and command-line tooling. Both are good at shipping product quickly with sane defaults rather than forcing the team to assemble every capability from scratch.',
      'The deeper difference is ecosystem gravity. Rails pulls teams toward Ruby culture, the Rails way, and a historically strong startup and product-engineering tradition. Laravel pulls teams toward modern PHP, Composer packages, and a very broad practical web development ecosystem. In many real decisions, that language gravity matters more than small feature differences.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare only the frameworks and ignore Ruby versus PHP. In practice, the framework is inseparable from the language experience, package ecosystem, deployment habits, hiring reality, and operational standards that surround it.',
      'Another mistake is to assume that because both frameworks are productive, the choice is purely aesthetic. Their defaults around conventions, application structure, service composition, hosting expectations, and long-term team familiarity create very real differences in how applications are built and maintained.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Rails when the team wants a strongly opinionated Ruby framework with deeply integrated conventions and a classic full-stack web development identity.',
      'Choose Laravel when the team wants a similarly polished framework in PHP with strong CLI tooling, rich ecosystem options, and broad real-world web deployment familiarity.',
      'If the organization already prefers Ruby or PHP, that language commitment often decides more than individual framework features do.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both Rails and Laravel are designed to reduce accidental complexity in web development. They help teams define routes, validate input, persist models, render responses, structure business logic, and move work to background jobs without building all of that plumbing manually.',
      'That means both frameworks are fully capable for mainstream application development. The meaningful comparison is how they shape application structure, how opinionated they are, and what it feels like to live inside their ecosystems over time.',
    ],
  },
  {
    id: 'core-philosophy',
    title: 'Framework Philosophy',
    paragraphs: [
      'Rails is one of the strongest historical expressions of convention over configuration. Much of its value comes from how much the framework assumes on your behalf. Naming conventions, file layout, model relationships, RESTful routing, generators, and Active Record patterns all reinforce a particular way of building applications. Teams that like that coherence often become very fast inside Rails.',
      'Laravel is also opinionated, but it often feels more like an expressive, polished application platform inside PHP rather than a language-defining doctrine. It strongly encourages certain patterns, yet it also gives teams comfortable ways to blend templated apps, API backends, queue-heavy workflows, and frontend options without feeling as singularly doctrinal as Rails sometimes does.',
    ],
  },
  {
    id: 'core-language',
    title: 'Ruby vs PHP Context',
    paragraphs: [
      'Rails cannot be understood apart from Ruby. Ruby encourages readable, expressive, object-oriented code, and Rails leans heavily into that style. For teams that enjoy Ruby\'s syntax and programming culture, Rails often feels unusually natural. For teams that do not, the framework may feel magical or too opinionated.',
      'Laravel cannot be understood apart from modern PHP. Laravel benefits from PHP\'s broad hosting familiarity, Composer ecosystem, and the reality that many organizations already have PHP expertise available. Modern PHP is much stronger and more expressive than older stereotypes suggest, and Laravel is one of the main reasons many developers experience PHP as a productive modern platform rather than as legacy scripting.',
    ],
  },
  {
    id: 'core-orm',
    title: 'Active Record vs Eloquent',
    paragraphs: [
      'Rails centers Active Record as one of its defining abstractions. Models, associations, validations, callbacks, and migrations are part of the normal day-to-day Rails experience. Active Record is not just a database library in Rails. It is a major part of how Rails applications are mentally modeled.',
      'Laravel centers Eloquent in a very similar way. Eloquent models represent tables and relationships, support conventions, and make CRUD-oriented application work pleasant. The difference is less about capability and more about feel. Rails tends to make Active Record part of a broader convention-heavy application identity, while Laravel makes Eloquent part of an expressive but somewhat more modular-feeling PHP application platform.',
    ],
  },
  {
    id: 'core-controller-view',
    title: 'Controllers, Views, and Request Flow',
    paragraphs: [
      'Rails strongly reflects the classic MVC story. Controllers receive requests, models handle domain data, and views render output. Even when a Rails app grows more layered over time, that MVC center of gravity remains visible in the project structure and developer culture.',
      'Laravel also supports a familiar MVC shape, but its practical usage often spans several styles: traditional Blade-rendered apps, API backends for SPA frontends, Livewire-heavy server-driven interfaces, and more. That means Laravel can feel a bit more stylistically flexible in day-to-day project architecture, even while remaining strongly framework-guided.',
    ],
  },
  {
    id: 'core-cli',
    title: 'Command-Line Tooling and Scaffolding',
    paragraphs: [
      'Rails has long leaned on generators and the `rails` command to create models, controllers, migrations, and scaffolding quickly. This contributes heavily to the fast early development experience and reinforces the framework\'s conventions. The CLI does not just save keystrokes. It teaches the intended application structure.',
      'Laravel leans on Artisan in a similar spirit. Artisan commands generate migrations, models, jobs, events, notifications, and custom commands. Laravel\'s CLI story is one of the framework\'s biggest strengths because it turns many recurring tasks into a smooth development workflow and keeps teams moving quickly.',
    ],
  },
  {
    id: 'core-templating-ui',
    title: 'Templating and Frontend Story',
    paragraphs: [
      'Rails historically carries a strong server-rendered full-stack identity through ERB, layouts, partials, and conventions that tie the view layer closely to the MVC structure. Rails also has modern frontend integration options, but the classic full-stack workflow remains culturally central.',
      'Laravel uses Blade for server-rendered views and has built-out paths for richer frontend styles through Livewire, Inertia, and starter kits with frameworks like React or Vue. That range gives Laravel a particularly broad frontend story for teams that want to mix classic server rendering with more interactive frontend approaches while staying inside one framework ecosystem.',
    ],
  },
  {
    id: 'core-queue-jobs',
    title: 'Background Jobs and Async Work',
    paragraphs: [
      'Rails applications commonly rely on Active Job and an adapter-backed job system for background processing. The framework treats background work as a normal part of application architecture, especially for emails, notifications, imports, and deferred processing.',
      'Laravel is especially polished around queues and jobs. The framework has a unified queueing API, rich worker tooling, batch and chain support, and a strong mental model for moving slow work out of the request cycle. Many teams find Laravel\'s async workflow exceptionally productive for real business applications.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Shape',
    paragraphs: [
      'Rails sits in a smaller but very distinctive ecosystem. The community is strongly shaped by Rails conventions, long-term community practices, and a shared vocabulary around product engineering and rapid web development. That cohesion can be a real advantage for teams that want a framework-led culture.',
      'Laravel sits in the much broader PHP world. That means access to a very large package ecosystem, many deployment options, broad hosting familiarity, and a wide range of developer backgrounds. The tradeoff is that the overall PHP ecosystem is more heterogeneous, even though Laravel itself provides a highly polished center within it.',
    ],
  },
  {
    id: 'core-hosting',
    title: 'Deployment and Hosting Reality',
    paragraphs: [
      'Rails deployment is mature, but it often assumes more explicit ownership of the Ruby runtime, gems, worker processes, and operational environment. Teams comfortable with that workflow do well, but the hosting path is usually less commodity-like than classic PHP deployment traditions.',
      'Laravel benefits from PHP\'s broad deployment familiarity. Modern Laravel production setups can still be sophisticated, but the overall ecosystem gives teams many practical infrastructure options. For some organizations, that hosting familiarity is a major business advantage even if it is not as glamorous as framework syntax debates.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Hiring Reality',
    paragraphs: [
      'Rails is easier to justify when the team already loves Ruby, when product iteration speed matters, and when the organization values a strong opinionated framework culture. It is also easier when experienced Rails developers are already available and the company wants to work in that tradition rather than in a more generalist web stack.',
      'Laravel is easier to justify when the team already knows PHP, when hiring from the PHP web market is strategically easier, or when the organization wants a framework with excellent developer experience but broader familiarity across common web hosting and web agency environments. In many cases, Laravel wins less because of one killer feature and more because it is the most practical way to get a highly productive framework in a language many teams already use.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Rails if you want the Rails way, Ruby ergonomics, convention-heavy full-stack development, and an ecosystem where the framework strongly shapes team habits.',
      'Lean toward Laravel if you want similarly high productivity in PHP, strong queue and CLI workflows, flexible frontend integration paths, and smoother alignment with a broad PHP ecosystem.',
      'If the team has no existing Ruby or PHP commitment, language preference and hiring reality are often the decisive factors because both frameworks are credible, full-featured choices for real product work.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-model',
    title: 'Simple ORM Model',
    description:
      'A basic model comparison shows how central the ORM is to both frameworks.',
    snippets: [
      {
        label: 'Ruby on Rails',
        code: `class Post < ApplicationRecord
  validates :title, presence: true
  belongs_to :author
end`,
      },
      {
        label: 'Laravel',
        code: `class Post extends Model
{
    protected $fillable = ['title'];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}`,
      },
    ],
    takeaway:
      'Both frameworks make model relationships and validation feel like normal application code, but Rails tends to feel more convention-led while Laravel often feels a bit more explicit in syntax and structure.',
  },
  {
    id: 'examples-controller',
    title: 'Simple Request Handler',
    description:
      'Both frameworks make CRUD-style request handling easy, but the file structure and syntax reflect their ecosystem identities.',
    snippets: [
      {
        label: 'Ruby on Rails',
        code: `class PostsController < ApplicationController
  def index
    @posts = Post.order(created_at: :desc)
  end
end`,
      },
      {
        label: 'Laravel',
        code: `class PostController extends Controller
{
    public function index()
    {
        return view('posts.index', [
            'posts' => Post::latest()->get(),
        ]);
    }
}`,
      },
    ],
    takeaway:
      'Rails expresses the classic MVC flow very directly. Laravel does too, but often with a slightly more explicit PHP application style around views and returned data.',
  },
  {
    id: 'examples-cli-jobs',
    title: 'CLI and Background Work',
    description:
      'Scaffolding and deferred work are both first-class in these frameworks, but Laravel is especially famous for how polished its CLI and queue experience feels.',
    snippets: [
      {
        label: 'Ruby on Rails',
        code: `bin/rails generate model Post title:string
bin/rails generate controller Posts index
bin/rails db:migrate`,
      },
      {
        label: 'Laravel',
        code: `php artisan make:model Post -m
php artisan make:controller PostController
php artisan make:job PublishPost
php artisan queue:work`,
      },
    ],
    takeaway:
      'Rails generators and Laravel Artisan both accelerate development, but Laravel often stands out when a project leans heavily on queue workers and command-line workflows.',
  },
  {
    id: 'examples-decision',
    title: 'Simple Selection Heuristic',
    description:
      'A short rule keeps the choice grounded in team reality rather than framework nostalgia or hype.',
    snippets: [
      {
        label: 'Choose Rails',
        code: `If the team wants:
- Ruby and the Rails way
- strong convention over configuration
- a classic full-stack MVC identity
- framework culture as a productivity multiplier`,
      },
      {
        label: 'Choose Laravel',
        code: `If the team wants:
- PHP ecosystem alignment
- expressive CLI and queue workflows
- Blade, Livewire, or Inertia flexibility
- practical hosting and hiring familiarity`,
      },
    ],
    takeaway:
      'The better choice is usually the one that aligns with the team\'s language preference and ecosystem reality, not the one with the most internet mythology around it.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Convention over Configuration',
    definition: 'A framework philosophy where sensible defaults reduce the amount of explicit configuration developers must write.',
  },
  {
    term: 'MVC',
    definition: 'Model View Controller, a structure that separates domain data, request handling, and presentation.',
  },
  {
    term: 'Active Record',
    definition: 'Rails\'s ORM and model layer used for persistence, associations, validations, and migrations.',
  },
  {
    term: 'Eloquent',
    definition: 'Laravel\'s ORM used to model tables, relationships, and record operations in application code.',
  },
  {
    term: 'Artisan',
    definition: 'Laravel\'s command-line interface for generating code, running workers, and automating common framework tasks.',
  },
  {
    term: 'Generator',
    definition: 'A Rails command-line scaffolding tool that creates framework-structured files for models, controllers, migrations, and more.',
  },
  {
    term: 'Blade',
    definition: 'Laravel\'s templating engine for server-rendered views.',
  },
  {
    term: 'Partial',
    definition: 'A reusable server-rendered view fragment, commonly used in Rails and also conceptually similar to reusable Blade pieces.',
  },
  {
    term: 'Migration',
    definition: 'A framework-managed description of schema changes applied to the database over time.',
  },
  {
    term: 'Queue Worker',
    definition: 'A process that executes deferred background jobs outside the normal web request cycle.',
  },
  {
    term: 'Starter Kit',
    definition: 'A Laravel project bootstrap option that includes opinionated application scaffolding for frontend and authentication workflows.',
  },
  {
    term: 'Strong Convention',
    definition: 'A framework posture where naming, layout, and application structure are intentionally standardized to reduce decisions.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const helpStyles = `
.rails-laravel-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rails-laravel-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.rails-laravel-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.rails-laravel-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.rails-laravel-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.rails-laravel-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
}

.rails-laravel-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.rails-laravel-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.rails-laravel-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.rails-laravel-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.rails-laravel-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.rails-laravel-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rails-laravel-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rails-laravel-help-toc-list li {
  margin: 0 0 8px;
}

.rails-laravel-help-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.rails-laravel-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.rails-laravel-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.rails-laravel-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.rails-laravel-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.rails-laravel-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rails-laravel-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rails-laravel-help-content p,
.rails-laravel-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.rails-laravel-help-content p {
  margin: 0 0 10px;
}

.rails-laravel-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rails-laravel-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.rails-laravel-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.rails-laravel-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .rails-laravel-help-main {
    grid-template-columns: 1fr;
  }

  .rails-laravel-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .rails-laravel-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    padding-left: 4px;
    white-space: normal;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function RubyOnRailsVsLaravelPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Ruby on Rails vs Laravel (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Ruby on Rails vs Laravel',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="rails-laravel-help-page">
      <style>{helpStyles}</style>
      <div className="rails-laravel-help-window" role="presentation">
        <header className="rails-laravel-help-titlebar">
          <span className="rails-laravel-help-titletext">Ruby on Rails vs Laravel</span>
          <div className="rails-laravel-help-controls">
            <button className="rails-laravel-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="rails-laravel-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="rails-laravel-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rails-laravel-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rails-laravel-help-main">
          <aside className="rails-laravel-help-toc" aria-label="Table of contents">
            <h2 className="rails-laravel-help-toc-title">Contents</h2>
            <ul className="rails-laravel-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="rails-laravel-help-content">
            <h1 className="rails-laravel-help-doc-title">Ruby on Rails vs Laravel</h1>
            <p className="rails-laravel-help-doc-subtitle">
              Manual-style comparison of convention-driven development, Ruby-versus-PHP ecosystem gravity, ORM style, scaffolding, and full-stack productivity tradeoffs.
            </p>

            {activeTab === 'big-picture' &&
              bigPictureSections.map((section, index) => (
                <Fragment key={section.id}>
                  <section id={section.id} className="rails-laravel-help-section">
                    <h2 className="rails-laravel-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  {index < bigPictureSections.length - 1 && <hr className="rails-laravel-help-divider" />}
                </Fragment>
              ))}

            {activeTab === 'core-concepts' &&
              coreConceptSections.map((section) => (
                <section key={section.id} id={section.id} className="rails-laravel-help-section">
                  <h2 className="rails-laravel-help-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

            {activeTab === 'examples' &&
              examples.map((example) => (
                <section key={example.id} id={example.id} className="rails-laravel-help-section">
                  <h2 className="rails-laravel-help-heading">{example.title}</h2>
                  <p>{example.description}</p>
                  {example.snippets.map((snippet) => (
                    <Fragment key={`${example.id}-${snippet.label}`}>
                      <h3 className="rails-laravel-help-subheading">{snippet.label}</h3>
                      <div className="rails-laravel-help-codebox">
                        <code>{snippet.code}</code>
                      </div>
                    </Fragment>
                  ))}
                  <p>
                    <strong>Takeaway:</strong> {example.takeaway}
                  </p>
                </section>
              ))}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="rails-laravel-help-section">
                <h2 className="rails-laravel-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
