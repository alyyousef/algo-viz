import { Link } from 'react-router-dom'

import type { JSX } from 'react'

export interface NotFoundProps {
  message?: string
}

export default function NotFound({
  message = 'The page you were looking for could not be found.',
}: NotFoundProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#008080] px-6 text-center font-mono text-white">
      <span className="rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/80">
        404
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Page not found</h1>
        <p className="max-w-md text-sm leading-relaxed text-white/85">{message}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-white/90">
        <Link
          to="/"
          className="rounded-full border border-white/40 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Go home
        </Link>
        <Link
          to="/dsa"
          className="rounded-full border border-white/40 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Browse DSA catalog
        </Link>
      </div>
    </div>
  )
}
