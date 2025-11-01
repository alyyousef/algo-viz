import { useEffect, useMemo, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

import Button97 from '@/systems/win97/components/Button97'
import { DocumentIcon, FolderIcon } from '@/systems/win97/components/icons'
import Taskbar97 from '@/systems/win97/components/Taskbar97'
import Window97 from '@/systems/win97/components/Window97'
import useWin97Theme from '@/systems/win97/hooks/useWin97Theme'

import './landing-win97.css'

interface DsaCategory {
  name: string
  path: string
  algorithms: string[]
}

const dsaCategories: DsaCategory[] = [
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

const formatTime = (date: Date): string =>
  date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

export default function LandingPage(): JSX.Element {
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
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => window.clearInterval(timer)
  }, [])

  const currentTime = useMemo(() => formatTime(now), [now])

  const handleScrollTo = (id: string): void => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="win97-desktop">
      <div className="landing-win97 theme-win97">
        <main className="landing-win97__windows">
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
          onClick: () => {
            void navigate('/dsa')
          },
        }}
        runningItems={
          <div className="landing-win97__taskbar-groups">
            <div className="landing-win97__quick-actions">
              <Button97 size="sm" onClick={() => navigate('/win96')}>
                Open Desktop
              </Button97>
            </div>
          </div>
        }
        tray={<div className="landing-win97__clock">{currentTime}</div>}
      />
    </div>
  )
}
