import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const primitives = [
  {
    title: 'Orientation test',
    detail:
      'Cross-products tell you left vs right turns, detect collinearity, and underpin segment intersection. Get this right and many higher-level checks fall into place.',
  },
  {
    title: 'Bounding boxes',
    detail:
      'Axis-aligned boxes are cheap prefilters before expensive geometry math. Combine with spatial hashes or interval trees to prune comparisons.',
  },
  {
    title: 'Distance & projection',
    detail:
      'Point-to-line, point-to-segment, and point-to-polygon distances drive nearest-neighbor queries, collision checks, and tolerance handling.',
  },
  {
    title: 'Angle and ordering',
    detail:
      'Sorting by polar angle (or by x/y then angle) powers convex hulls, sweeplines, and visibility problems. Stable ordering keeps your hull clean.',
  },
]

const patterns = [
  {
    title: 'Sweep line',
    detail:
      'Slide a line across the plane, maintaining an ordered structure of active segments/events to find intersections, closest pairs, or skyline shapes in O((n + k) log n).',
  },
  {
    title: 'Convex hull + rotating calipers',
    detail:
      'Build a hull (Graham scan, monotone chain) then rotate calipers to get diameters, widths, or antipodal pairs without re-sorting.',
  },
  {
    title: 'Divide & conquer geometry',
    detail:
      'Split points or segments, solve locally, then merge with spatial filters (nearest-pair, Delaunay/Voronoi, range counting). Recurrences mirror classic D&C but with geometric pruning.',
  },
  {
    title: 'Spatial indexing',
    detail:
      'Use grids, quadtrees, k-d trees, or R-trees to cut neighbor searches from O(n) sweeps down to logarithmic probes and local scans.',
  },
]

const checklists = [
  'Pick numeric tolerances explicitly; document when you treat near-zero as zero to tame floating-point drift.',
  'Prefer integer math for predicates (orientation, intersection) when coordinates fit; it avoids epsilon headaches.',
  'Normalize vector ops into helpers so every algorithm uses the same epsilon and comparison rules.',
  'Guard degenerate cases: collinear points on a hull, overlapping segments in sweeplines, and vertical lines in slope math.',
  'Stress-test with clustered points, collinearity, and very large coordinates to surface stability issues early.',
]

export default function ComputationalGeometryPage(): JSX.Element {
  return (
    <TopicLayout
      title="Computational Geometry"
      subtitle="Reasoning about shapes and space"
      intro="Computational geometry turns spatial problems into predictable primitives and patterns. Once you trust your predicates and ordering, the plane becomes just another sortable, searchable domain."
    >
      <TopicSection heading="Core primitives you must trust">
        <div className="grid gap-3 md:grid-cols-2">
          {primitives.map((primitive) => (
            <article key={primitive.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{primitive.title}</h3>
              <p className="text-sm text-white/80">{primitive.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Patterns that solve most geometry tasks">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{pattern.title}</p>
              <p className="text-sm text-white/80">{pattern.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Stability and correctness checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklists.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
