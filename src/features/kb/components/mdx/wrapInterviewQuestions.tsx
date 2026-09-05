import { Children, isValidElement, type JSX, type ReactNode } from 'react'

import { getNodeText } from '@/features/kb/utils/headings'

const splitQaText = (text: string): { question: string; answer: string } | null => {
  const match = text.trim().match(/^Q[:：]\s*([\s\S]+?)\s*A[:：]\s*([\s\S]+)$/)
  if (!match?.[1] || !match[2]) {
    return null
  }

  return { question: match[1].trim(), answer: match[2].trim() }
}

const paragraphRole = (node: ReactNode): 'qa' | 'question' | 'answer' | null => {
  if (!isValidElement(node)) {
    return null
  }

  const text = getNodeText(node).trim()
  if (splitQaText(text)) {
    return 'qa'
  }
  if (/^Q[:：]/.test(text)) {
    return 'question'
  }
  if (/^A[:：]/.test(text)) {
    return 'answer'
  }

  return null
}

const questionLabel = (text: string): string => text.replace(/^Q[:：]\s*/, '').trim()

const answerLabel = (text: string): string => text.replace(/^A[:：]\s*/, '').trim()

function InterviewExpando({
  question,
  answer,
}: {
  question: string
  answer: ReactNode
}): JSX.Element {
  return (
    <details className="bin98-expando">
      <summary className="bin98-expando__summary">{question}</summary>
      <div className="bin98-expando__body">{answer}</div>
    </details>
  )
}

export const wrapInterviewQuestions = (children: ReactNode): ReactNode => {
  const nodes = Children.toArray(children)
  const result: ReactNode[] = []

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    const role = paragraphRole(node)

    if (role === 'qa' && isValidElement(node)) {
      const split = splitQaText(getNodeText(node))
      if (split) {
        result.push(
          <InterviewExpando key={`qa-${index}`} question={split.question} answer={split.answer} />,
        )
        continue
      }
    }

    if (role === 'question' && isValidElement(node)) {
      const next = nodes[index + 1]
      const question = questionLabel(getNodeText(node))
      if (paragraphRole(next) === 'answer' && isValidElement(next)) {
        result.push(
          <InterviewExpando
            key={`qa-${index}`}
            question={question}
            answer={answerLabel(getNodeText(next))}
          />,
        )
        index += 1
        continue
      }

      result.push(<InterviewExpando key={`qa-${index}`} question={question} answer="See above." />)
      continue
    }

    result.push(node)
  }

  return result
}
