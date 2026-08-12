import mermaid from 'mermaid'
import React, { useEffect, useState } from 'react'

import type { JSX } from 'react'

let mermaidId = 0

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: "'MS Sans Serif', Tahoma, 'Segoe UI', sans-serif",
    primaryColor: '#c0c0c0',
    primaryBorderColor: '#808080',
    primaryTextColor: '#000',
    lineColor: '#000',
    tertiaryColor: '#fff',
  },
})

interface ArchitectureDiagramProps {
  chart: string
}

export function ArchitectureDiagram({ chart }: ArchitectureDiagramProps): JSX.Element {
  const [svgCode, setSvgCode] = useState<string>('')

  useEffect(() => {
    mermaidId += 1
    const id = `mermaid-chart-${mermaidId}`
    void mermaid
      .render(id, chart)
      .then(({ svg }) => {
        setSvgCode(svg)
        return null
      })
      .catch((e) => {
        console.error('Mermaid render error:', e)
      })
  }, [chart])

  return (
    <div
      className="bin98-diagram"
      dangerouslySetInnerHTML={{ __html: svgCode }}
      style={{
        border: '1px solid #808080',
        padding: '10px',
        background: '#f2f2f2',
        overflowX: 'auto',
        margin: '12px 0',
      }}
    />
  )
}
