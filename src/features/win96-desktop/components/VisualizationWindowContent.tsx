import { Link } from 'react-router-dom'

import { getExplorerNode } from '@/data/algoviz-explorer'

import type { VisualizationWindowState } from '@/systems/win96/context/Win96WindowManager'
import type { JSX } from 'react'

const VISUALIZATION_GLYPH = '\uD83D\uDCCA'

interface VisualizationWindowContentProps {
  window: VisualizationWindowState
}

export default function VisualizationWindowContent({
  window,
}: VisualizationWindowContentProps): JSX.Element {
  const entry = getExplorerNode(window.nodeId)
  const node = entry?.node

  if (!node || node.kind !== 'visualization') {
    return (
      <div className="visualization-window">
        <h2 className="visualization-window__title">Visualization unavailable</h2>
        <p className="visualization-window__description">
          This visualization is still under construction. Please check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="visualization-window" data-context-url={node.route || undefined}>
      <header className="visualization-window__header">
        <span className="visualization-window__glyph" aria-hidden="true">
          {node.icon ?? VISUALIZATION_GLYPH}
        </span>
        <div>
          <h2 className="visualization-window__title">{node.name}</h2>
          {node.estimatedDurationMinutes ? (
            <p className="visualization-window__meta">
              Estimated walkthrough: {node.estimatedDurationMinutes} min
            </p>
          ) : null}
        </div>
      </header>
      {node.description ? (
        <p className="visualization-window__description">{node.description}</p>
      ) : null}
      <div className="visualization-window__actions">
        {node.route ? (
          <Link to={node.route} className="visualization-window__action-btn">
            Launch interactive view
          </Link>
        ) : (
          <span className="visualization-window__action-placeholder">
            Interactive workspace coming soon.
          </span>
        )}
      </div>
    </div>
  )
}
