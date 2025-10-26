import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Window97 from '../components/win97/Window97'
import Button97 from '../components/win97/Button97'
import Taskbar97 from '../components/win97/Taskbar97'
import ThemeToggle from '../components/win97/ThemeToggle'
import { ComputerIcon, FolderIcon, DocumentIcon } from '../components/win97/icons'
import useWin97Theme from '../hooks/useWin97Theme'

import './landing-win97.css'

const stats = [
  { label: 'Interactive visualizations', value: '120+' },
  { label: 'Practice scenarios', value: '45' },
  { label: 'Community sessions', value: 'Weekly' },
  { label: 'Roadmaps & checklists', value: '30+' },
]

const featureList = [
  {
    title: 'Concept to code bridge',
    description:
      'Watch every algorithm animate alongside pseudocode and capture the exact steps for implementation.',
  },
  {
    title: 'Scenario-based walkthroughs',
    description:
      'Compare best, average, and worst case behaviors with datasets that mirror coursework and interviews.',
  },
  {
    title: 'Mastery metrics',
    description:
      'Log quiz streaks, spaced repetition reminders, and per-topic confidence without leaving the demo.',
  },
  {
    title: 'Gamified practice',
    description: 'Unlock challenges, streaks, and quests that keep your study routine consistent.',
  },
]

const dsaCategories = [
  {
    name: 'Sorting Algorithms',
    path: '/dsa/2-core-algorithms/1-sorting-searching',
    algorithms: ['Bubble', 'Merge', 'Quick', 'Heap'],
  },
  {
    name: 'Searching Algorithms',
    path: '/dsa/2-core-algorithms/1-sorting-searching',
    algorithms: ['Linear', 'Binary', 'Jump', 'Interpolation'],
  },
  {
    name: 'Data Structures',
    path: '/dsa/1-core-data-structures',
    algorithms: ['Stack', 'Queue', 'Linked List', 'Trees', 'Graphs'],
  },
  {
    name: 'Graph Algorithms',
    path: '/dsa/2-core-algorithms/2-graph-algorithms',
    algorithms: ['DFS', 'BFS', 'Dijkstra', 'A*'],
  },
]

const formatTime = (date) =>
  date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

function LandingPage() {
  const navigate = useNavigate()
  const { enable } = useWin97Theme()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    enable()
  }, [enable])

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => clearInterval(timer)
  }, [])

  const currentTime = useMemo(() => formatTime(now), [now])

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="win97-desktop">
      <div className="landing-win97 theme-win97" id="hero">
        <main className="landing-win97__windows">
          <Window97
            title="AlgoViz Control Center"
            icon={<ComputerIcon />}
            className="landing-win97__window landing-win97__window--hero"
          >
            <div className="landing-win97__hero">
              <div className="landing-win97__hero-copy">
                <div className="landing-win97__hero-title">
                  Where algorithms behave like classic software.
                </div>
                <p className="landing-win97__hero-text">
                  Boot into guided simulations, step through pseudocode, and pin your favourite
                  demos to the taskbar. AlgoViz turns theory into a tactile desktop experience.
                </p>
              </div>
              <div className="landing-win97__hero-actions">
                <Button97 variant="primary" onClick={() => navigate('/dsa')}>
                  Enter practice room
                </Button97>
                <Button97 onClick={() => handleScrollTo('features')}>Show me what&apos;s inside</Button97>
              </div>
              <div className="landing-win97__hero-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="landing-win97__stat-card">
                    <span className="landing-win97__stat-value">{stat.value}</span>
                    <span className="landing-win97__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Window97>

          <Window97
            title="Why AlgoViz"
            icon={<FolderIcon />}
            id="features"
            className="landing-win97__window"
          >
            <ul className="landing-win97__list">
              {featureList.map((feature) => (
                <li key={feature.title} className="landing-win97__list-item">
                  <span className="landing-win97__list-icon">[]</span>
                  <div>
                    <strong>{feature.title}</strong>
                    <div>{feature.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Window97>

          <Window97
            title="DSA Quick Launch"
            icon={<DocumentIcon />}
            id="quick-launch"
            className="landing-win97__window"
          >
            <div className="landing-win97__category-grid">
              {dsaCategories.map((category) => (
                <div key={category.name} className="landing-win97__category-card">
                  <div className="landing-win97__category-header">
                    <FolderIcon width={16} height={16} />
                    <span>{category.name}</span>
                  </div>
                  <ul className="landing-win97__category-list">
                    {category.algorithms.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Button97
                    size="sm"
                    onClick={() => navigate(category.path)}
                    aria-label={`Open ${category.name}`}
                  >
                    Open
                  </Button97>
                </div>
              ))}
            </div>
          </Window97>

        </main>
      </div>

      <Taskbar97
        startButtonProps={{
          onClick: () => navigate('/dsa'),
        }}
        runningItems={
          <div className="landing-win97__taskbar-groups">
            <div className="landing-win97__quick-actions">
              <Button97
                size="sm"
                variant="primary"
                onClick={() => navigate('/dsa')}
                title="Open the DSA explorer"
              >
                Launch DSA Library
              </Button97>
              <Button97 size="sm" onClick={() => handleScrollTo('features')}>
                View Features
              </Button97>
              <Button97 size="sm" onClick={() => handleScrollTo('quick-launch')}>
                Quick Launch
              </Button97>
              <ThemeToggle size="sm" />
            </div>

            <div className="landing-win97__task-items">
              <Button97
                size="sm"
                variant="ghost"
                className="landing-win97__task-btn"
                onClick={() => handleScrollTo('hero')}
              >
                AlgoViz
              </Button97>
              <Button97
                size="sm"
                variant="ghost"
                className="landing-win97__task-btn"
                onClick={() => handleScrollTo('features')}
              >
                Features
              </Button97>
            </div>
          </div>
        }
        tray={<div className="landing-win97__clock">{currentTime}</div>}
      />
    </div>
  )
}

export default LandingPage
