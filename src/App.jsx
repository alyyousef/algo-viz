import { useEffect, useRef, useState } from 'react'

import {
  BrainCircuit,
  Gamepad2,
  Eye,
  Rocket,
  ArrowDownUp,
  Search,
  Boxes,
  GitBranch,
  ListChecks,
  SlidersHorizontal,
  PlayCircle,
  Lightbulb,
} from 'lucide-react'

const navigationLinks = [
  { name: 'Why AlgoViz?', href: '#why-algoviz' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Overview', href: '#overview' },
  { name: 'Algorithms', href: '#algorithms' },
  { name: 'Learning Paths', href: '#tracks' },
  { name: 'Community', href: '#community' },
]

const overviewHighlights = [
  {
    title: 'Concept to code bridge',
    description:
      'See every step mapped to pseudocode with synced highlighting that ties what you watch to how you implement.',
  },
  {
    title: 'Scenario-based walkthroughs',
    description:
      'Compare best, average, and worst-case behaviors across datasets sized for coursework, whiteboards, and production.',
  },
  {
    title: 'Mastery metrics',
    description:
      'Track confidence per topic with quiz streaks, spaced repetition reminders, and targeted practice suggestions.',
  },
]

const algorithmTracks = [
  {
    name: 'Data structure deep dives',
    bullets: ['Binary trees & heaps', 'Union-find animations', 'Hash maps in action'],
    accent: 'from-blue-500/30 to-cyan-500/20',
  },
  {
    name: 'Graph algorithms lab',
    bullets: ['Dijkstra vs. A*', 'Network flow explorers', 'Topological sorting'],
    accent: 'from-purple-500/30 to-fuchsia-500/20',
  },
  {
    name: 'Dynamic programming coach',
    bullets: ['State grids visualized', 'Memoization timelines', 'Optimal substructure hints'],
    accent: 'from-emerald-500/30 to-cyan-500/20',
  },
  {
    name: 'Interview blitz mode',
    bullets: ['Timed whiteboard rounds', 'Complexity reasoning prompts', 'Solution breakdown replays'],
    accent: 'from-rose-500/30 to-orange-500/20',
  },
]

const learningPaths = [
  {
    title: 'CS foundations (6 weeks)',
    description:
      'Solidify core data structures and algorithms with weekly reflections and spaced repetition checkpoints.',
    badge: 'Students',
  },
  {
    title: 'Interview accelerator (4 weeks)',
    description:
      'Sharpen decision-making under pressure with timed drills, complexity flashcards, and partner mock guides.',
    badge: 'Job seekers',
  },
  {
    title: 'Systems thinking (8 weeks)',
    description:
      'Connect algorithms to production workloads with observability labs, scaling case studies, and debugging quests.',
    badge: 'Builders',
  },
]

const communityStories = [
  {
    name: 'Nadia - Systems Engineer',
    quote:
      'AlgoViz gave me the intuition I was missing. Watching algorithms animate across real datasets made scaling decisions finally click.',
  },
  {
    name: 'Ravi - CS Undergraduate',
    quote:
      'The adaptive playlists kept me accountable all semester. Visual memory cues meant exams felt like replaying what I already understood.',
  },
  {
    name: 'Mina - Bootcamp Grad',
    quote:
      'Pairing the visual explorer with mock interviews helped me articulate complexity trade-offs with confidence.',
  },
]

const masteryMetrics = [
  { label: 'Sorting & searching', value: '86%', color: 'from-emerald-400 to-emerald-500' },
  { label: 'Graphs & traversal', value: '64%', color: 'from-cyan-400 to-blue-500' },
  { label: 'Dynamic programming', value: '58%', color: 'from-purple-400 to-fuchsia-500' },
]

const whyAlgoViz = [
  {
    icon: BrainCircuit,
    title: 'Make Algorithms Tangible',
    description: 'See exactly how data moves and transforms with frame-by-frame clarity.',
  },
  {
    icon: Rocket,
    title: 'Accelerate Learning',
    description: 'Interactive visualizations and guided flows make concepts stick faster.',
  },
  {
    icon: Eye,
    title: 'Build Intuition',
    description: 'Watch algorithms in action and connect every step to its outcome.',
  },
  {
    icon: Gamepad2,
    title: 'Gamify Practice',
    description: 'Turn mastery into a game with streaks, challenges, and unlockable quests.',
  },
]

const dsaCategories = [
  {
    name: 'Sorting Algorithms',
    icon: ArrowDownUp,
    slug: 'sorting',
    algorithms: ['Bubble', 'Selection', 'Insertion', 'Merge', 'Quick', 'Heap'],
  },
  {
    name: 'Searching Algorithms',
    icon: Search,
    slug: 'searching',
    algorithms: ['Linear', 'Binary', 'Jump', 'Interpolation'],
  },
  {
    name: 'Data Structures',
    icon: Boxes,
    slug: 'data-structures',
    algorithms: ['Stack', 'Queue', 'Linked List', 'Trees', 'Graphs'],
  },
  {
    name: 'Graph Algorithms',
    icon: GitBranch,
    slug: 'graphs',
    algorithms: ['DFS', 'BFS', 'Dijkstra\'s', 'A*'],
  },
]

const howItWorks = [
  {
    title: 'Select an Algorithm',
    description: 'Browse curated categories and pick a sorting, searching, or data structure routine to visualize.',
    icon: ListChecks,
  },
  {
    title: 'Customize Visualization',
    description: 'Adjust array size, drop in custom values, and tweak scenario presets to match your curiosity.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Control Playback',
    description: 'Play, pause, scrub, or step through operations and fine-tune the speed to see every detail.',
    icon: PlayCircle,
  },
  {
    title: 'Learn & Understand',
    description: 'Review synced code, complexity breakdowns, and live stats to cement your understanding.',
    icon: Lightbulb,
  },
]

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1600 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let animationFrame
    const start = performance.now()

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * value))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className="font-semibold text-white">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

const featureShowcase = [
  {
    title: 'Real-time animations with color-coded states',
    description:
      'Watch every comparison, swap, and restructure unfold in vibrant gradients so you always know which elements are active.',
    highlights: [
      'Active, pending, and sorted states glow in unique hues',
      'Follow operations frame-by-frame without losing context',
    ],
    mediaVariant: 'grid',
    stats: [
      { label: 'State channels visualized', value: 4, suffix: '+' },
      { label: 'Frames per second rendering', value: 60 },
    ],
  },
  {
    title: 'Adjustable playback speed',
    description:
      'Dial the tempo from calm explorations to rapid replays and scrub through runs without jitter or desync.',
    highlights: ['0.5x to 4x speed control with smooth easing', 'Instant scrubbing with position-aware thumbnails'],
    mediaVariant: 'speed',
    stats: [
      { label: 'Speed presets', value: 6 },
      { label: 'Range', display: '0.5x - 4x' },
    ],
  },
  {
    title: 'Intuitive playback controls',
    description:
      'Own the flow with play, pause, reset, and step-through actions mapped to keyboard shortcuts and on-screen controls.',
    highlights: ['Step through single operations or algorithm phases', 'Auto-reset for rapid replay loops'],
    mediaVariant: 'controls',
    stats: [
      { label: 'Control modes', value: 4 },
      { label: 'Keyboard shortcuts', value: 8, suffix: '+' },
    ],
  },
  {
    title: 'Live statistics tracking',
    description:
      'Comparisons, swaps, and array accesses update the moment they happen so you can quantify efficiency in real time.',
    highlights: ['Charts pulse with every metric update', 'Reset or export run summaries instantly'],
    mediaVariant: 'stats',
    stats: [
      { label: 'Comparisons logged', value: 950, suffix: '+' },
      { label: 'Swaps counted', value: 620, suffix: '+' },
      { label: 'Array accesses tracked', value: 1280, suffix: '+' },
    ],
  },
  {
    title: 'Code implementations in multiple languages',
    description:
      'View idiomatic implementations side-by-side across languages while remaining synchronized with the animation.',
    highlights: ['Syntax highlighting with inline complexity notes', 'Swap languages mid-run without restarting'],
    mediaVariant: 'code',
    badges: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust'],
    stats: [{ label: 'Languages supported', value: 6 }],
  },
  {
    title: 'Time and space complexity analysis',
    description:
      'Overlay best, average, and worst-case complexity while the algorithm runs, then inspect breakdowns once it finishes.',
    highlights: ['Auto-generated Big O summaries per step', 'Space usage visualized alongside time complexity'],
    mediaVariant: 'complexity',
    stats: [
      { label: 'Complexity views', value: 5, suffix: '+' },
      { label: 'Scenario breakdowns', display: 'Best / Avg / Worst' },
    ],
  },
]

function FeatureVisual({ variant }) {
  switch (variant) {
    case 'grid':
      return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_90px_-60px_rgba(56,189,248,0.7)]">
          <div className="absolute -top-10 -right-12 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-16 left-4 h-36 w-36 animate-float rounded-full bg-purple-500/10 blur-2xl" />
          <div className="relative grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }).map((_, index) => {
              const classes =
                index % 7 === 0
                  ? 'bg-cyan-500/70'
                  : index % 5 === 0
                    ? 'bg-emerald-500/70'
                    : index % 4 === 0
                      ? 'bg-purple-500/60'
                      : 'bg-slate-800/90'
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-xl border border-white/10 ${classes} animate-pulse`}
                  style={{ animationDelay: `${(index % 4) * 0.2}s` }}
                />
              )
            })}
          </div>
        </div>
      )
    case 'speed':
      return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_90px_-60px_rgba(6,182,212,0.7)]">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/20 opacity-80" />
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              <span>Slow</span>
              <span>Fast</span>
            </div>
            <div className="relative h-3 w-full rounded-full bg-slate-800">
              <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
              <div className="absolute -top-2 left-3/4 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[10px] font-semibold text-slate-900 shadow-md animate-pulse">
                2.8x
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 text-[11px] text-slate-300">
              {['0.5x', '1x', '1.5x', '2x', '3x', '4x'].map((mark) => (
                <span
                  key={mark}
                  className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-2 py-1"
                >
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    case 'controls':
      return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_90px_-60px_rgba(129,140,248,0.65)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/20 to-cyan-500/20" />
            <div className="relative flex flex-col gap-5">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold uppercase tracking-[0.3em]">
                Controls
              </span>
              <span>Ctrl + Space</span>
            </div>
            <div className="grid grid-cols-4 gap-3 text-sm font-semibold text-slate-200">
              {['Play', 'Pause', 'Reset', 'Step'].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/60 px-4 py-3 shadow-lg transition hover:border-cyan-400/40 hover:text-white"
                >
                  {action}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Step granularity</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-white">
                Operation
              </span>
            </div>
          </div>
        </div>
      )
    case 'stats':
      return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-7 shadow-[0_30px_90px_-60px_rgba(6,182,212,0.65)]">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/20" />
          <div className="relative grid gap-4">
            {['Comparisons', 'Swaps', 'Array Accesses'].map((metric, index) => (
              <div
                key={metric}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                <span>{metric}</span>
                <span className="flex items-center gap-2 font-semibold text-white">
                  <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
                  {index === 0 ? '942' : index === 1 ? '615' : '1288'}
                </span>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-300">
              {['Export CSV', 'Toggle chart', 'Reset tally'].map((action) => (
                <span
                  key={action}
                  className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 uppercase tracking-[0.2em]"
                >
                  {action}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    case 'code':
      return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_-60px_rgba(147,51,234,0.65)]">
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
            <div className="relative space-y-3 rounded-xl border border-white/10 bg-slate-900/80 p-5 text-[12px] font-mono text-slate-200">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>JavaScript</span>
            </div>
            <pre className="whitespace-pre-wrap leading-6 text-slate-200">
              {`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`}
            </pre>
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
              Tap to switch: Python - Java - C++ - Go - Rust
            </div>
          </div>
        </div>
      )
    case 'complexity':
      return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_90px_-60px_rgba(79,70,229,0.7)]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-cyan-500/15" />
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-300">
              <span>Complexity</span>
              <span>Big O</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-3xl font-semibold text-white">
              O(n log n)
            </div>
            <div className="grid gap-2 text-sm text-slate-300">
              {['Best: O(n log n)', 'Average: O(n log n)', 'Worst: O(n^2)', 'Space: O(n)'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <span>{item.split(':')[0]}:</span>
                  <span className="font-semibold text-white">{item.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState(() => Array(howItWorks.length).fill(false))
  const stepRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-step-index'))
            setVisibleSteps((prev) => {
              if (prev[index]) return prev
              const next = [...prev]
              next[index] = true
              return next
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    stepRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      stepRefs.current.forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-hero-radial opacity-70 blur-3xl"
      />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white"
          >
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-base font-semibold shadow-glow">
              AV
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-white/10" />
            </span>
            AlgoViz
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            {navigationLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition hover:text-white hover:drop-shadow"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <a
              href="#tracks"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Start Learning
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-t border-white/5 bg-slate-950/95 backdrop-blur transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-4 px-6 py-5 text-sm font-medium text-slate-300">
            {navigationLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#tracks"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-4 py-2 text-white shadow-glow transition hover:scale-[1.01]"
            >
              Start Learning
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-28 px-6 pb-24 pt-32 sm:pt-40 lg:gap-32">
        <header
          id="hero"
          className="relative grid gap-16 rounded-3xl border border-white/10 bg-slate-900/40 px-6 py-16 shadow-[0_40px_120px_-50px_rgba(56,189,248,0.35)] backdrop-blur-lg sm:px-12 lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Interactive learning
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-glow" />
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
              AlgoViz - Master Algorithms Through Visualization
            </h1>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              Guided walkthroughs, hands-on experimentation, and animated insights designed for CS
              students, self-taught programmers, and anyone preparing for technical interviews.
              Learn algorithms by seeing them come alive.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tracks"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 translate-y-full bg-white/20 transition duration-300 group-hover:translate-y-0" />
                <span className="relative">Start Learning</span>
              </a>
              <a
                href="#algorithms"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/35 hover:text-white"
              >
                Explore Algorithms
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5 transition group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm text-slate-300 sm:flex sm:flex-wrap sm:gap-10">
              <div>
                <dt className="font-semibold text-white">50+ interactive visuals</dt>
                <dd>Trace algorithms step-by-step with live controls.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Adaptive playlists</dt>
                <dd>Personalized paths tailored to your goals.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Interview practice</dt>
                <dd>Timed challenges with breakdowns and hints.</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-500/30 blur-2xl" />
            <div className="absolute -bottom-12 -left-10 h-40 w-40 animate-gradient-move rounded-full bg-purple-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-[0_40px_70px_-50px_rgba(56,189,248,0.45)]">
              <div className="border-b border-white/5 bg-slate-900/90 px-6 py-4 backdrop-blur">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">Pathfinding visualizer</p>
                    <p className="text-xs text-slate-400">A* Algorithm - Step 23 of 48</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                    Live
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
                  </span>
                </div>
              </div>

              <div className="relative h-72 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_45%)] px-6 py-6">
                <div className="absolute inset-6 rounded-2xl border border-white/5 bg-slate-950/80 backdrop-blur-lg" />
                <div className="relative grid grid-cols-6 gap-1 text-[10px] font-medium text-slate-400">
                  {Array.from({ length: 36 }).map((_, index) => {
                    const pathCells = [7, 13, 14, 15, 21, 27, 33]
                    const visitedCells = [2, 3, 4, 8, 9, 10, 11, 16, 22, 23, 28, 29, 34]
                    const isSource = index === 0
                    const isTarget = index === 35

                    const baseClasses =
                      'aspect-square rounded-lg border border-white/5 bg-slate-900/60 backdrop-blur transition'

                    let variant = 'text-slate-500'
                    if (isSource) {
                      variant = 'border-emerald-400/80 bg-emerald-500/30 text-emerald-200'
                    } else if (isTarget) {
                      variant = 'border-fuchsia-400/80 bg-fuchsia-500/30 text-fuchsia-200'
                    } else if (pathCells.includes(index)) {
                      variant =
                        'border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 text-cyan-200 shadow-glow'
                    } else if (visitedCells.includes(index)) {
                      variant = 'border-indigo-400/20 bg-indigo-500/20 text-indigo-200'
                    }

                    return (
                      <div
                        key={index}
                        className={`${baseClasses} ${variant} flex items-center justify-center`}
                      >
                        {isSource ? 'S' : isTarget ? 'T' : ''}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/5 bg-slate-900/90 px-6 py-5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Explored nodes</span>
                  <span className="text-cyan-300">134</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Path cost</span>
                  <span className="text-emerald-300">17</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Heuristic weight</span>
                  <span className="text-purple-300">0.65</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="why-algoviz"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/35 px-6 py-16 backdrop-blur-xl sm:px-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Why AlgoViz?</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              AlgoViz translates dense theory into vivid, interactive stories so you can feel how
              algorithms behave, remember them longer, and enjoy the journey.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whyAlgoViz.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 shadow-[0_25px_80px_-60px_rgba(6,182,212,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-[0_30px_90px_-55px_rgba(56,189,248,0.9)]"
              >
                <div className="absolute -right-12 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-3xl transition group-hover:opacity-100 group-hover:blur-[70px]" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/40 bg-gradient-to-br from-slate-900/80 to-slate-900/40 text-cyan-300 shadow-glow transition group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/40 px-6 py-16 backdrop-blur-xl sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Interactive features built to accelerate understanding
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Fine-tune the pace, stay in control, and connect code to visuals with instrumentation
              engineered for deep comprehension.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-16">
            {featureShowcase.map((feature, index) => {
              const isReversed = index % 2 === 1
              return (
                <article
                  key={feature.title}
                  className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_-60px_rgba(56,189,248,0.35)] transition hover:border-cyan-400/30 hover:shadow-[0_40px_120px_-70px_rgba(56,189,248,0.45)] sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center"
                >
                  <div className={`flex flex-col gap-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                      Feature
                      <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white sm:text-3xl">{feature.title}</h3>
                      <p className="text-base leading-relaxed text-slate-300">{feature.description}</p>
                    </div>
                    {feature.highlights && (
                      <ul className="mt-2 grid gap-2 text-sm text-slate-300">
                        {feature.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {feature.badges && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {feature.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                    {feature.stats && (
                      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                        {feature.stats.map((stat) => (
                          <div
                            key={`${feature.title}-${stat.label}`}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300"
                          >
                            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                              {stat.label}
                            </dt>
                            <dd className="mt-2 text-lg">
                              {typeof stat.value === 'number' ? (
                                <AnimatedCounter value={stat.value} suffix={stat.suffix ?? ''} prefix={stat.prefix ?? ''} />
                              ) : (
                                <span className="font-semibold text-white">{stat.display}</span>
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>

                  <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <FeatureVisual variant={feature.mediaVariant} />
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/45 px-6 py-16 backdrop-blur-xl sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">How AlgoViz Works</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Move from curiosity to clarity with a guided workflow that keeps you in control at every step.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="hidden lg:block absolute left-0 right-0 top-16 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="grid gap-10 lg:grid-cols-4">
              {howItWorks.map((step, index) => {
                const Icon = step.icon
                const isLast = index === howItWorks.length - 1
                return (
                  <div
                    key={step.title}
                    ref={(element) => {
                      stepRefs.current[index] = element
                    }}
                    data-step-index={index}
                    className={`relative pl-12 transition-all duration-500 ease-out lg:pl-0 ${
                      isLast ? '' : 'after:absolute after:left-6 after:top-16 after:h-[calc(100%-3.5rem)] after:w-px after:bg-white/10 lg:after:hidden'
                    } ${visibleSteps[index] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  >
                    <span className="absolute left-5 top-4 h-3 w-3 rounded-full bg-cyan-400/80 shadow-glow lg:hidden" />
                    <span className="hidden lg:block absolute left-1/2 top-14 h-4 w-4 -translate-x-1/2 rounded-full border border-white/20 bg-cyan-400/80 shadow-[0_0_25px_rgba(56,189,248,0.35)]" />

                    <div className="relative flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_25px_70px_-50px_rgba(56,189,248,0.35)] backdrop-blur">
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-900/90 text-sm font-semibold text-white">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-cyan-200">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-300">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="overview"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/40 px-6 py-16 backdrop-blur-lg sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Build intuition before you memorize solutions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              AlgoViz breaks algorithms down into animated stories. We turn abstract operations into
              visual, configurable flows so you can experiment, observe patterns, and understand the
              trade-offs that matter in real systems and interviews.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {overviewHighlights.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-8 transition hover:border-cyan-400/40 hover:shadow-[0_20px_60px_-40px_rgba(6,182,212,0.8)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition group-hover:scale-110 group-hover:bg-cyan-400/30" />
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="algorithms"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/70 px-6 py-16 backdrop-blur-xl sm:px-12"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="max-w-lg">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Algorithm explorer
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Algorithms curated for every computer science journey
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                Navigate a library organized by goal: foundational data structures, advanced graph
                theory, dynamic programming, and interview-focused drills. Each explorer mode
                includes visual comparisons, complexity overlays, and real-world scenarios.
              </p>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-2">
            {algorithmTracks.map((item) => (
              <article
                  key={item.name}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_25px_80px_-60px_rgba(129,140,248,0.9)] transition hover:-translate-y-1 hover:border-white/20 hover:bg-slate-950/80"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} text-white`}>
                    <span className="text-lg font-semibold">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.name}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {item.bullets.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="dsa-categories"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/45 px-6 py-16 backdrop-blur-xl sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Explore DSA categories</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Jump into curated playlists that bundle visual explainers, guided walkthroughs, and
              practice drills for every stage of your learning journey.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {dsaCategories.map(({ name, icon: Icon, slug, algorithms }) => (
              <article
                key={name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-7 transition transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/40 hover:shadow-[0_35px_100px_-60px_rgba(59,130,246,0.9)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/40 bg-slate-900/70 text-cyan-300 shadow-glow">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{name}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {algorithms.length} algorithms
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="relative mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {algorithms.map((algorithm) => (
                    <li key={algorithm} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{algorithm}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`/algorithms/${slug}`}
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-white"
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="tracks"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/50 px-6 py-16 backdrop-blur-xl sm:px-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Adaptive learning paths tailored to your goals
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Pick a path and AlgoViz calibrates difficulty, reinforces gaps, and suggests
              real-world challenges to cement mastery.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-6">
              {learningPaths.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-6 transition hover:border-blue-400/40 hover:shadow-[0_20px_70px_-45px_rgba(59,130,246,0.8)]"
                >
                  <div className="absolute -left-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-500/10 blur-2xl" />
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                    {item.badge}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_-50px_rgba(6,182,212,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
              <div className="relative flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Progress snapshot</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Weekly pacing, mastery percentages, and suggested focus areas powered by your
                    practice history.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Algorithm mastery</span>
                    <span>72%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>

                  <div className="mt-6 grid gap-4 text-sm text-slate-300">
                    {masteryMetrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="flex items-center justify-between">
                          <span>{metric.label}</span>
                          <span className="text-white">{metric.value}</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-slate-900">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                            style={{ width: metric.value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
                    <p>
                      <span className="font-semibold text-white">Next up:</span> revisit recursion
                      strategies with memoization labs and stretch your graph intuition with maximum
                      flow challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="community"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-slate-900/40 px-6 py-16 backdrop-blur-lg sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Learn alongside a global community of builders
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Join weekly live streams, pair up for interview drills, and share insights with peers
              tackling the same concepts. AlgoViz is more than a tool - it&apos;s a learning network.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {communityStories.map((story) => (
              <article
                key={story.name}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-purple-400/40 hover:shadow-[0_20px_60px_-50px_rgba(147,51,234,0.8)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {story.name
                        .split('-')[0]
                        .trim()
                        .split(' ')
                        .map((word) => word[0] ?? '')
                        .join('')}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">{story.name}</p>
                </div>
                <p className="text-sm text-slate-300">{story.quote}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-700/40 via-purple-700/40 to-cyan-600/40 px-6 py-14 shadow-[0_40px_120px_-70px_rgba(56,189,248,0.9)] backdrop-blur-xl sm:px-12">
          <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to make algorithms your competitive edge?
            </h2>
            <p className="text-base leading-relaxed text-slate-100/90 sm:text-lg">
              Start for free, unlock premium visuals, or bring AlgoViz to your classroom. Launch a
              personalized learning path in under five minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#tracks"
                className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Begin Your Journey
              </a>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                View Platform Tour
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L18 12l-3.75 2.25m-4.5 0L6 12l3.75-2.25M12 19.5v-15" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-slate-950/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} AlgoViz. Crafted for curious problem solvers.</p>
          <div className="flex items-center gap-6">
            <a href="#overview" className="transition hover:text-white">
              Platform
            </a>
            <a href="#community" className="transition hover:text-white">
              Community
            </a>
            <a href="#hero" className="transition hover:text-white">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
