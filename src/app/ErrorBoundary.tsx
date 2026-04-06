import { Component } from 'react'

import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Rendered in place of children when an error is caught. Defaults to a minimal fallback. */
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Catches runtime errors in any child component tree so the rest of the UI keeps working.
 * Wrap any subsystem that should fail in isolation (windows, visualisations, desktop chrome).
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack)
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary-fallback">
          <strong>Something went wrong.</strong>
          <p>{this.state.error?.message ?? 'An unexpected error occurred.'}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
