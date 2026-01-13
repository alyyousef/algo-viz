import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'
import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Scaling genomes to computation',
    detail:
      'Genomes are gigabases long; we need succinct indexes to search and align without loading everything into RAM.',
    note: 'Prevents quadratic scans when studying populations or metagenomes.',
  },
  {
    title: 'Noise-tolerant matching',
    detail:
      'Sequencing errors and real variants blur signals; algorithms must separate true biology from platform noise.',
    note: 'Stops false discoveries from error-heavy reads.',
  },
  {
    title: 'Pipelines as experiments',
    detail:
      'Every tool and parameter is part of the scientific claim. Reproducibility is a first-class requirement.',
    note: 'Protects against silent drift between runs and collaborators.',
  },
  {
    title: 'Trade-off between sensitivity and cost',
    detail:
      'Higher sensitivity expands search and DP, but burns CPU and memory. Good defaults balance detection with turnaround time.',
    note: 'Keeps cloud bills and lab timelines sane.',
  },
]

const history = [
  {
    title: '1970s: Dynamic programming aligners',
    detail: 'Needleman-Wunsch and Smith-Waterman introduced optimal global and local alignment.',
  },
  {
    title: '1990s: Suffix trees/arrays',
    detail: 'Linear-time construction enabled fast substring queries; LCP arrays sped binary search.',
  },
  {
    title: '1994: Burrows-Wheeler transform',
    detail: 'Compression trick that later powered FM-indexes for succinct search over genomes.',
  },
  {
    title: '2009: BWA and Bowtie',
    detail: 'Practical FM-index aligners made short-read mapping fast on commodity hardware.',
  },
  {
    title: '2015+: Long-read era',
    detail: 'Minimap2, adaptive banding, and graph aligners tackled noisy long reads and structural variation.',
  },
]

const pillars = [
  {
    title: 'Canonical encoding and builds',
    detail: 'Pin reference builds (GRCh38, T2T) and versions; mismatched builds corrupt coordinates and variants.',
  },
  {
    title: 'Succinct indexing',
    detail: 'FM-index and compressed suffix arrays keep whole genomes searchable in memory.',
  },
  {
    title: 'Gap and error modeling',
    detail: 'Affine gaps and platform-aware mismatch penalties separate true variation from sequencing noise.',
  },
  {
    title: 'Graph-aware representation',
    detail: 'Variation graphs capture multiple haplotypes; avoids reference bias in diverse populations.',
  },
  {
    title: 'Reproducibility discipline',
    detail: 'Versioned tools, seeds, parameters, and QC artifacts make analyses auditable.',
  },
]

const mentalModels = [
  {
    title: 'Genome as text corpus',
    detail:
      'Indexes let you do substring queries like a search engine. BWT/FM-index is the inverted index for DNA.',
  },
  {
    title: 'Alignment as noisy edit distance',
    detail:
      'Reads are strings with typos; DP computes cheapest edits. Banding shrinks the search to plausible diagonals.',
  },
  {
    title: 'De Bruijn graphs as road maps',
    detail:
      'k-mers are road segments; overlaps build a map. Bubbles are detours from errors or variants; pruning cleans the map.',
  },
  {
    title: 'Pipelines as assembly lines',
    detail:
      'Each station (QC, mapping, calling) can introduce bias; inspections (QC metrics) catch defects early.',
  },
]

const howItWorks = [
  {
    step: '1. Choose reference and encoding',
    detail:
      'Select the correct genome build; handle alt contigs and decoys; store sequences in consistent case/mask conventions.',
  },
  {
    step: '2. Build succinct indexes',
    detail:
      'Construct FM-index (BWT + rank/select) or minimizer tables; validate memory footprint and serialization format.',
  },
  {
    step: '3. Seed and filter',
    detail:
      'Extract k-mers/minimizers from reads; filter repetitive seeds; chain colinear seeds to propose candidate loci.',
  },
  {
    step: '4. Extend with DP',
    detail:
      'Run banded Smith-Waterman/Needleman-Wunsch with affine gaps; use X-drop/Z-drop to stop hopeless extensions early.',
  },
  {
    step: '5. Score and report',
    detail:
      'Compute MAPQ/Phred-like confidence; tag alignments with CIGAR and auxiliary fields; emit multiple hits when ambiguous.',
  },
  {
    step: '6. Post-process',
    detail:
      'Sort, mark duplicates, recalibrate scores if needed; feed into variant callers or assembly graph builders; log QC.',
  },
]

const complexityTable = [
  {
    approach: 'FM-index exact search',
    time: 'O(m)',
    space: 'O(n)',
    note: 'm pattern length; n text size; constant factors small after preprocessing.',
  },
  {
    approach: 'Suffix array + LCP binary search',
    time: 'O(m log n)',
    space: 'O(n)',
    note: 'Log factor from binary search; LCP prunes comparisons.',
  },
  {
    approach: 'Banded Smith-Waterman (band w)',
    time: 'O(w * m)',
    space: 'O(w)',
    note: 'Restricts DP to diagonal band to cut quadratic blowup.',
  },
  {
    approach: 'De Bruijn graph traversal',
    time: 'O(V + E)',
    space: 'O(V + E)',
    note: 'High coverage inflates E; pruning tips/bubbles reduces size.',
  },
  {
    approach: 'Minimizer seeding',
    time: 'O(m)',
    space: 'O(k)',
    note: 'Stores sampled k-mers; lowers memory at slight sensitivity cost.',
  },
]

const applications = [
  {
    title: 'Short-read mapping (RNA/DNA)',
    detail:
      'FM-index aligners (BWA/Bowtie/STAR) map massive read sets for expression and variant calling with low memory.',
  },
  {
    title: 'Long-read assembly and polishing',
    detail:
      'Minimap2 and banded DP align noisy long reads; graphs resolve repeats and structural variants; polishing fixes residual errors.',
  },
  {
    title: 'Variant calling and genotyping',
    detail:
      'Accurate alignment and base-quality modeling feed SNP/indel/structural variant callers for clinical and research pipelines.',
  },
  {
    title: 'Pan-genome and graph alignment',
    detail:
      'Graph indexes reduce reference bias, enabling accurate calls across diverse haplotypes and structural variation.',
  },
  {
    title: 'Metagenomic classification',
    detail:
      'Minimizer and k-mer sketches classify reads to taxa quickly, even across millions of contigs and large references.',
  },
]

const failureCallout = {
  title: 'Failure story: wrong reference build',
  detail:
    'A lab mapped reads to GRCh37 while annotation was GRCh38. Variants were shifted, leading to incorrect clinical interpretations. Fix: enforce build IDs in metadata, block mixed references, and add QC that cross-checks contig names and lengths.',
}

const pitfalls = [
  'Mixing reference builds or annotations silently shifts coordinates and gene models.',
  'Ignoring soft-masked or ambiguous bases yields spurious seeds and false alignments.',
  'Overly narrow bands or aggressive seed filtering drop real indels and splice junctions.',
  'Memory blowups from unpruned de Bruijn graphs on high-coverage or repetitive data.',
  'Noisy platforms without adjusted scoring produce biased variant likelihoods.',
]

const whenToUse = [
  'Use FM-index aligners for short, low-error reads and large references.',
  'Use minimizer-based mappers for long reads where exact seeds are sparse but overlaps are long.',
  'Use banded DP when you know expected error/indel windows to cut cost.',
  'Use de Bruijn graphs for short-read assembly; switch to OLC/graph hybrids for long reads.',
  'Use variation graphs when reference bias matters (diverse cohorts, structural variants).',
]

const advanced = [
  {
    title: 'Succinct dynamic indexes',
    detail: 'Dynamic FM-indexes allow updates without full rebuilds; useful for streaming or incremental references.',
  },
  {
    title: 'Splice-aware graph alignment',
    detail: 'Augment graphs with intron edges; improves RNA-seq mapping across novel junctions.',
  },
  {
    title: 'Adaptive banding and SIMD',
    detail: 'Adjust band width based on score gradients; vectorized DP (SIMD) speeds hot loops.',
  },
  {
    title: 'Minimizer sampling strategies',
    detail: 'Syncmers/min-sparse schemes stabilize seeds across mutations and sequencing errors.',
  },
  {
    title: 'Quality-aware k-mer weighting',
    detail: 'Down-weight low-quality bases in seeding to reduce false chains in noisy reads.',
  },
]

const codeExamples = [
  {
    title: 'Backward search over FM-index',
    code: `type FM = { bwt: string; C: Record<string, number>; rank: (c: string, i: number) => number }

function backwardSearch(fm: FM, pattern: string) {
  let l = 0
  let r = fm.bwt.length
  for (let i = pattern.length - 1; i >= 0; i--) {
    const c = pattern[i]
    l = fm.C[c] + fm.rank(c, l)
    r = fm.C[c] + fm.rank(c, r)
    if (l >= r) return [] // pattern not found
  }
  return [l, r) // interval of suffix array rows matching pattern
}`,
    explanation:
      'Classic FM-index backward search: shrinks the suffix array interval by extending the pattern leftwards using rank and C tables.',
  },
  {
    title: 'Banded Smith-Waterman step',
    code: `function smithWatermanBanded(a: string, b: string, band: number) {
  const n = a.length
  const m = b.length
  let best = 0
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    const jStart = Math.max(1, i - band)
    const jEnd = Math.min(m, i + band)
    for (let j = jStart; j <= jEnd; j++) {
      const match = dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 2 : -1)
      const del = dp[i - 1][j] - 2
      const ins = dp[i][j - 1] - 2
      dp[i][j] = Math.max(0, match, del, ins)
      best = Math.max(best, dp[i][j])
    }
  }
  return best
}`,
    explanation:
      'Limits computation to a diagonal band of width 2*band; useful when alignments are expected to stay near the main diagonal.',
  },
]

const keyTakeaways = [
  'Pick the right reference build and encode it consistently.',
  'Use succinct indexes to keep searches in memory; band DP to stay within time budgets.',
  'Model sequencing error realistically; tune gaps and seeds accordingly.',
  'Graph representations reduce reference bias for diverse genomes.',
  'Log parameters, versions, and QC to make biological claims reproducible.',
]

export default function BioinformaticsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bioinformatics (Suffix Arrays, etc.)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Sequence analysis with verifiable pipelines</div>
              <p className="win95-text">
                Index genomes compactly, align noisy reads carefully, and keep analyses reproducible. Data structures and scoring choices
                decide whether biology is signal or noise.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-stack">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="win95-panel">
                    <div className="win95-heading">{pillar.title}</div>
                    <p className="win95-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-stack">
                {mentalModels.map((model) => (
                  <div key={model.title} className="win95-panel">
                    <div className="win95-heading">{model.title}</div>
                    <p className="win95-text">{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity reference</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">{failureCallout.title}</div>
              <p className="win95-text">{failureCallout.detail}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use what</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

