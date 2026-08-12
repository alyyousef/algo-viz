import { useNavigate } from 'react-router-dom'

import type { JSX } from 'react'

export interface NotFoundProps {
  message?: string
}

export default function NotFound({
  message = 'The requested route was not found in the AlgoViz routing table.',
}: NotFoundProps): JSX.Element {
  const navigate = useNavigate()

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[#0000aa] px-6 py-12"
      style={{ fontFamily: "'Perfect DOS VGA 437', 'Courier New', Courier, monospace" }}
    >
      <div className="w-full max-w-4xl text-[#aaaaaa]">
        <div className="mb-8 text-center">
          <span className="bg-[#aaaaaa] px-4 py-1 text-[#0000aa] font-bold tracking-widest uppercase">
            Windows
          </span>
        </div>

        <p className="mb-6 text-lg leading-relaxed md:text-xl">
          A fatal exception 404 has occurred at <span className="text-white">0028:C0011E36</span> in
          UXD <span className="text-white">react-router(01) +</span>
          <br />
          <span className="text-white">000016B</span>. The current application will be terminated.
        </p>

        <ul className="mb-8 list-disc pl-8 space-y-4 text-lg md:text-xl">
          <li>* Press any key to return to the previous page,</li>
          <li>
            * Press CTRL+ALT+DEL again to restart your computer. You will
            <br />
            &nbsp;&nbsp;lose any unsaved information in all applications.
          </li>
        </ul>

        <p className="mb-8 text-lg md:text-xl text-white">Error details: {message}</p>

        <div className="mt-12 text-center">
          <p className="animate-pulse text-lg md:text-xl">Press any key to continue _</p>
        </div>

        {/* Hidden button to catch clicks to go back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute inset-0 h-full w-full opacity-0 cursor-default"
          aria-label="Go back"
          autoFocus
        />
      </div>
    </div>
  )
}
