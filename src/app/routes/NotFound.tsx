import { Link } from 'react-router-dom'

import type { JSX } from 'react'

export interface NotFoundProps {
  message?: string
}

export default function NotFound({
  message = 'The page you were looking for could not be found.',
}: NotFoundProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 px-6 text-center text-slate-200">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.4em] text-slate-500">404</span>
        <h1 className="text-xl font-semibold text-slate-100">Page not found</h1>
      </div>
      <p className="max-w-md text-sm text-slate-400">{message}</p>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <Link
          to="/"
          className="rounded-md border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          Go home
        </Link>
        <Link
          to="/dsa"
          className="rounded-md border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          Browse DSA catalog
        </Link>
      </div>
    </div>
  )
}
