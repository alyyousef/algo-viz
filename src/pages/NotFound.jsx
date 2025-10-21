import { Link } from 'react-router-dom'

function NotFound({ message = 'The page you were looking for could not be found.' }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          404
        </span>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Nothing to see here yet</h1>
        <p className="max-w-xl text-base text-slate-300 sm:text-lg">{message}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:text-white"
          >
            Return home
          </Link>
          <Link
            to="/dsa"
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/60 hover:text-white"
          >
            Explore catalog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
