import type { JSX, ReactNode } from 'react'

interface CalloutProps {
  title?: string
  icon?: 'info' | 'warning' | 'error' | 'tip'
  children: ReactNode
}

export function Callout({ title, icon = 'info', children }: CalloutProps): JSX.Element {
  const iconMap = {
    info: 'msg_information-0',
    warning: 'msg_warning-0',
    error: 'msg_error-0',
    tip: 'help_book_big-0',
  }

  const iconClass = iconMap[icon] || iconMap.info

  return (
    <div
      className="bin98-callout"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        background: '#f2f2f2',
        border: '1px solid #808080',
        padding: '12px',
        margin: '12px 0',
      }}
    >
      <div
        className={`win96-icon win96-icon--32 win96-icon--${iconClass}`}
        style={{ flexShrink: 0 }}
      />
      <div>
        {title && <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>{title}</div>}
        <div style={{ fontSize: '12px' }}>{children}</div>
      </div>
    </div>
  )
}
