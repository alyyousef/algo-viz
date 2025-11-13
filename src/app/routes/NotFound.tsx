import { Link } from 'react-router-dom'

import type { JSX } from 'react'

export interface NotFoundProps {
  message?: string
}

export default function NotFound({
  message = 'The page you were looking for could not be found. Double-check the URL or head back to something you recognize.',
}: NotFoundProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#008080] px-6 text-center font-mono text-white">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-[clamp(3rem,11vw,4.5rem)] font-semibold tracking-[0.25em] leading-none text-white">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Page not found</h1>
        <p className="max-w-lg text-sm leading-relaxed text-white/85">{message}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.25em] text-[#003366]">
        <Link
          to="/"
          className="inline-flex w-[200px] items-center justify-center border-2 border-[#000] bg-gradient-to-br from-[#fefefe] via-[#cfcfcf] to-[#d4d4d4] px-6 py-3 text-base font-semibold text-[#003366] uppercase shadow-[4px_4px_0_rgba(0,0,0,0.8)] transition hover:shadow-[2px_2px_0_rgba(0,0,0,0.7)] active:translate-y-0.5"
        >
          Go home
        </Link>
        <Link
          to="/algoViz"
          className="inline-flex w-[200px] items-center justify-center border-2 border-[#000] bg-gradient-to-br from-[#fefefe] via-[#cfcfcf] to-[#d4d4d4] px-6 py-3 text-base font-semibold text-[#003366] uppercase shadow-[4px_4px_0_rgba(0,0,0,0.8)] transition hover:shadow-[2px_2px_0_rgba(0,0,0,0.7)] active:translate-y-0.5"
        >
          Browse
        </Link>
      </div>
    </div>
  )
}
