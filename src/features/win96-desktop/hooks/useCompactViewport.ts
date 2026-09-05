import { useEffect, useState } from 'react'

import { isCompactViewport } from './viewport'

export const useCompactViewport = (): boolean => {
  const [compact, setCompact] = useState(() => isCompactViewport())

  useEffect(() => {
    const update = () => {
      setCompact(isCompactViewport())
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.visualViewport?.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [])

  return compact
}
