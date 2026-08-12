import { useRef, useState, type JSX, type HTMLAttributes } from 'react'

export function CodeBlock(props: HTMLAttributes<HTMLPreElement>): JSX.Element {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (preRef.current) {
      const text = preRef.current.innerText
      void navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          return null
        })
        .catch(console.error)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <pre ref={preRef} className="bin98-codebox" {...props} />
      <button
        type="button"
        className="bin98-button"
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '12px',
          right: '8px',
          fontSize: '10px',
          padding: '2px 6px',
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
