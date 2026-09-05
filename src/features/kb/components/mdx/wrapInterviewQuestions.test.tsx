import { createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { wrapInterviewQuestions } from './wrapInterviewQuestions'

describe('wrapInterviewQuestions', () => {
  it('turns a combined Q/A paragraph into an expando', () => {
    const wrapped = wrapInterviewQuestions(
      createElement('p', null, 'Q: Why 3x3 stacked instead of one 7x7? A: Two nonlinearities.'),
    )

    const nodes = Array.isArray(wrapped) ? wrapped : [wrapped]
    const expando = nodes[0] as { type?: { name?: string }; props?: { question?: string } }
    expect(expando?.props?.question).toContain('Why 3x3')
  })

  it('pairs a question paragraph with the following answer', () => {
    const wrapped = wrapInterviewQuestions([
      createElement('p', { key: 'q' }, 'Q: What is IoU?'),
      createElement('p', { key: 'a' }, 'A: Intersection over union of two boxes.'),
    ])

    const nodes = Array.isArray(wrapped) ? wrapped : [wrapped]
    expect(nodes).toHaveLength(1)
    expect((nodes[0] as { props?: { question?: string } }).props?.question).toBe('What is IoU?')
  })
})
