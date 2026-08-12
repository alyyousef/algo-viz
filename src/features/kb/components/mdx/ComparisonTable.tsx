import type { JSX, ReactNode } from 'react'

interface ComparisonTableProps {
  headers: string[]
  rows: ReactNode[][]
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps): JSX.Element {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
      <table className="bin98-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ background: '#d4d0c8', fontWeight: 'bold' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
