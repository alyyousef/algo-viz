import { Link } from 'react-router-dom'
import type { JSX, ReactNode } from 'react'

export interface TopicLayoutProps {
  title: string
  subtitle?: string
  intro?: string
  children: ReactNode
  backLink?: string
  backLabel?: string
}

export interface TopicSectionProps {
  heading: string
  children: ReactNode
}

export function TopicSection({ heading, children }: TopicSectionProps): JSX.Element {
  return (
    <section className="space-y-3 text-white">
      <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-white/90">{children}</div>
    </section>
  )
}

export default function TopicLayout({
  title,
  subtitle,
  intro,
  children,
  backLink = '/dsa',
  backLabel = 'Back to catalog',
}: TopicLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-[#008080] font-mono text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-12 pt-10">
        <header className="space-y-4 text-white">
          <Link to={backLink} className="win96-link">
            {backLabel}
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {subtitle ? <p className="text-sm text-white/90">{subtitle}</p> : null}
          </div>
          {intro ? <p className="text-sm leading-relaxed text-white/80">{intro}</p> : null}
        </header>
        <main className="space-y-5">{children}</main>
      </div>
    </div>
  )
}
