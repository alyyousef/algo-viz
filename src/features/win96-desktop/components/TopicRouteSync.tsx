import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getKbRouteByPath } from '@/features/kb/routeManifest'
import { formatKbTitle } from '@/features/kb/utils/labels'
import { useWin96WindowManager } from '@/systems/win96/context/Win96WindowManager'

export default function TopicRouteSync(): null {
  const location = useLocation()
  const { openTopicWindow } = useWin96WindowManager()
  const route = getKbRouteByPath(location.pathname)

  useEffect(() => {
    if (!route) {
      return
    }

    openTopicWindow(route.path, formatKbTitle(route.segments))
  }, [openTopicWindow, route?.path, route])

  return null
}
