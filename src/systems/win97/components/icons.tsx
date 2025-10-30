import React from 'react'

const baseSvgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  shapeRendering: 'crispEdges' as const,
  xmlns: 'http://www.w3.org/2000/svg',
}

export const ComputerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    <rect x="1" y="2" width="14" height="9" fill="#d5ecff" stroke="#404040" />
    <rect x="2" y="3" width="12" height="7" fill="#0a74da" />
    <rect x="4" y="11" width="8" height="2" fill="#808080" />
    <rect x="3" y="11" width="10" height="1" fill="#c0c0c0" />
    <rect x="5" y="13" width="6" height="1" fill="#404040" />
  </svg>
)

export const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    <rect x="1" y="5" width="14" height="8" fill="#f8d477" stroke="#404040" />
    <rect x="1" y="5" width="14" height="1" fill="#bf9b30" />
    <rect x="1" y="4" width="6" height="2" fill="#bf9b30" />
    <rect x="2" y="6" width="12" height="6" fill="#ffe8a6" />
    <rect x="2" y="6" width="12" height="1" fill="#bf9b30" />
  </svg>
)

export const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    <rect x="3" y="1" width="10" height="14" fill="#ffffff" stroke="#404040" />
    <rect x="4" y="3" width="6" height="1" fill="#808080" />
    <rect x="4" y="5" width="8" height="1" fill="#808080" />
    <rect x="4" y="7" width="7" height="1" fill="#808080" />
    <rect x="4" y="9" width="6" height="1" fill="#808080" />
    <rect x="4" y="11" width="5" height="1" fill="#808080" />
    <rect x="10" y="2" width="2" height="3" fill="#d5ecff" />
  </svg>
)

export const MinimizeGlyph: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    <rect x="3" y="12" width="10" height="1" fill="#000000" />
  </svg>
)

export const MaximizeGlyph: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    <rect x="3" y="3" width="10" height="10" fill="none" stroke="#000000" />
    <rect x="4" y="4" width="8" height="1" fill="#000000" />
  </svg>
)

export const CloseGlyph: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    {[
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [9, 9],
      [10, 10],
      [4, 10],
      [5, 9],
      [6, 8],
      [8, 6],
      [9, 5],
      [10, 4],
      [7, 8],
      [8, 7],
    ].map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#000000" />
    ))}
  </svg>
)

export const RestoreGlyph: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseSvgProps} {...props}>
    <rect x="4" y="5" width="9" height="9" fill="none" stroke="#000000" />
    <rect x="3" y="4" width="9" height="9" fill="none" stroke="#000000" />
    <rect x="4" y="5" width="7" height="1" fill="#000000" />
  </svg>
)

export default {
  ComputerIcon,
  FolderIcon,
  DocumentIcon,
  MinimizeGlyph,
  MaximizeGlyph,
  CloseGlyph,
  RestoreGlyph,
}
