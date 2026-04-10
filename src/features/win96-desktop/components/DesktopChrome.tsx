import { useEffect, useMemo, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

import { useWin96WindowManager } from '@/systems/win96/context/Win96WindowManager'
import Button97 from '@/systems/win97/components/Button97'
import Taskbar97 from '@/systems/win97/components/Taskbar97'

import DesktopSearch96 from './DesktopSearch96'
import { FolderIcon, VisualizationIcon } from './DesktopShellIcons'
import StartMenu96 from './StartMenu96'
import { useMinimizedTasks } from '../hooks/useMinimizedTasks'

function DesktopClock(): JSX.Element {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return <div className="win96-taskbar__clock">{timeLabel}</div>
}

export default function DesktopChrome(): JSX.Element {
  const navigate = useNavigate()
  const {
    windows,
    activeWindowId,
    orderedRootFolders,
    openFolderWindow,
    toggleMinimize,
    getChildren,
  } = useWin96WindowManager()
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { tasks: minimizedHelpTasks, removeTask } = useMinimizedTasks()

  const orderedWindows = useMemo(() => [...windows].sort((a, b) => a.zIndex - b.zIndex), [windows])

  const handleOpenSearch = (open: boolean) => {
    setIsSearchOpen(open)
    if (open) {
      setIsStartMenuOpen(false)
    }
  }

  const handleStartButtonClick = () => {
    setIsStartMenuOpen((open) => {
      const next = !open
      if (next) {
        setIsSearchOpen(false)
      }
      return next
    })
  }

  const runningItemsContent = orderedWindows.map((win) => {
    const isActive = !win.isMinimized && activeWindowId === win.id
    const classes = [
      'win96-taskbar__button',
      isActive ? 'win96-taskbar__button--active' : undefined,
      win.isMinimized ? 'win96-taskbar__button--minimized' : undefined,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <Button97
        key={win.id}
        size="sm"
        className={classes}
        iconLeft={<FolderIcon size="sm" />}
        data-state={isActive ? 'active' : win.isMinimized ? 'minimized' : 'inactive'}
        onClick={() => toggleMinimize(win.id)}
      >
        {win.title}
      </Button97>
    )
  })

  const minimizedHelpButtons = minimizedHelpTasks.map((task) => (
    <Button97
      key={task.id}
      size="sm"
      className="win96-taskbar__button win96-taskbar__button--minimized"
      data-state="minimized"
      onClick={() => {
        removeTask(task.id)
        void navigate(task.url)
      }}
      iconLeft={<VisualizationIcon size="sm" />}
    >
      {task.title}
    </Button97>
  ))

  return (
    <div className="win96-desktop-chrome">
      <DesktopSearch96
        isOpen={isSearchOpen}
        onOpenChange={handleOpenSearch}
        onNavigate={(route) => void navigate(route)}
      />
      <StartMenu96
        isOpen={isStartMenuOpen}
        folders={orderedRootFolders}
        getChildren={getChildren}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenFolder={openFolderWindow}
        onNavigate={(route) => void navigate(route)}
      />
      <img
        src="/transparentText.png"
        alt="AlgoViz logo"
        className="win96-desktop-logo"
        draggable={false}
      />
      <Taskbar97
        startButtonProps={{
          onClick: handleStartButtonClick,
          'aria-label': 'Show programs menu',
          pressed: isStartMenuOpen,
          'aria-expanded': isStartMenuOpen,
          'aria-haspopup': 'menu',
        }}
        runningItems={
          <div className="win96-taskbar__items">
            <Button97
              size="sm"
              className={`win96-taskbar__button win96-taskbar__search-button${isSearchOpen ? ' win96-taskbar__button--active' : ''}`}
              onClick={() => handleOpenSearch(!isSearchOpen)}
            >
              Find
            </Button97>
            {runningItemsContent}
            {minimizedHelpButtons}
          </div>
        }
        tray={<DesktopClock />}
      />
    </div>
  )
}
