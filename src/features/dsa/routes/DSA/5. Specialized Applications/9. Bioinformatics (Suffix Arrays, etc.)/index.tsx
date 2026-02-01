import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'
import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Scale genomes to computation',
    detail: 'Genomes are gigabases long; succinct indexes keep search feasible in memory.',
    note: 'Prevents quadratic scans across populations and metagenomes.',
  },
  {
    title: 'Noise-tolerant matching',
    detail: 'Sequencing errors and real variants blur signals; scoring separates biology from noise.',
    note: 'Avoids false discoveries from error-heavy reads.',
  },
  {
    title: 'Pipelines are experiments',
    detail: 'Every tool, parameter, and reference build becomes part of the claim.',
    note: 'Reproducibility and metadata are first-class requirements.',
  },
  {
    title: 'Sensitivity vs cost',
    detail: 'Higher sensitivity expands search and DP but burns CPU and memory.',
    note: 'Defaults must balance detection with turnaround time.',
  },
]

const history = [
  {
    title: '1970s: Dynamic programming aligners',
    detail: 'Needleman-Wunsch and Smith-Waterman formalized optimal global and local alignment.',
    note: 'The baseline for alignment scoring today.',
  },
  {
    title: '1990s: Suffix arrays and LCP',
    detail: 'Linear-time construction enabled fast substring queries and binary search.',
    note: 'The foundation for modern exact matching.',
  },
  {
    title: '1994: Burrows-Wheeler transform',
    detail: 'Compression trick that powered FM-indexes for compact search.',
    note: 'Made whole-genome indexing practical.',
  },
  {
    title: '2009: BWA/Bowtie',
    detail: 'FM-index aligners mapped short reads quickly on commodity hardware.',
    note: 'Enabled early large-scale resequencing.',
  },
  {
    title: '2015+: Long-read era',
    detail: 'Minimap2 and graph aligners handle noisy long reads and structural variants.',
    note: 'Shifted focus toward chaining and banded DP.',
  },
]

const pillars = [
  {
    title: 'Reference fidelity',
    detail: 'Pin builds (GRCh38, T2T) and decoys; mismatches corrupt coordinates.',
  },
  {
    title: 'Succinct indexing',
    detail: 'FM-index and compressed suffix arrays keep large references in memory.',
  },
  {
    title: 'Error and gap modeling',
    detail: 'Affine gaps and platform-aware mismatch penalties reflect real noise.',
  },
  {
    title: 'Graph-aware representation',
    detail: 'Variation graphs reduce reference bias for diverse cohorts.',
  },
  {
    title: 'Reproducibility',
    detail: 'Versioned tools, parameters, and QC artifacts make analyses auditable.',
  },
]

const mentalModels = [
  {
    title: 'Genome as text corpus',
    detail: 'Indexes let you search DNA like a search engine; FM-index is the DNA inverted index.',
  },
  {
    title: 'Alignment as edit distance',
    detail: 'Reads are strings with typos; DP finds the cheapest edits.',
  },
  {
    title: 'Graphs as road maps',
    detail: 'k-mers form roads; bubbles are detours caused by errors or variants.',
  },
  {
    title: 'Assembly lines',
    detail: 'QC, mapping, and calling are stations; defects must be caught early.',
  },
]

const howItWorks = [
  {
    title: 'Choose reference and encoding',
    detail: 'Select build, decoys, and masking conventions; keep IDs consistent.',
  },
  {
    title: 'Build succinct indexes',
    detail: 'Construct FM-index or minimizer tables; validate memory and serialization.',
  },
  {
    title: 'Seed and filter',
    detail: 'Extract k-mers/minimizers; filter repeats; chain colinear seeds.',
  },
  {
    title: 'Extend with DP',
    detail: 'Run banded Smith-Waterman with affine gaps; stop with X-drop/Z-drop.',
  },
  {
    title: 'Score and report',
    detail: 'Compute MAPQ; emit CIGAR and tags; report secondary alignments.',
  },
  {
    title: 'Post-process',
    detail: 'Sort, mark duplicates, recalibrate scores, and collect QC.',
  },
  {
    title: 'Feed downstream tools',
    detail: 'Variant calling, assembly, or expression pipelines consume alignments.',
  },
]

const indexAnatomy = [
  {
    title: 'Suffix array + LCP',
    detail: 'Sorted suffixes enable binary search; LCP accelerates comparisons.',
  },
  {
    title: 'BWT + FM-index',
    detail: 'Backward search uses rank/select to narrow the suffix interval.',
  },
  {
    title: 'Minimizers',
    detail: 'Sampled k-mers reduce memory at slight sensitivity cost.',
  },
  {
    title: 'Sparse suffix arrays',
    detail: 'Store sampled SA positions; reconstruct via LF-mapping.',
  },
  {
    title: 'Hash tables and sketches',
    detail: 'Bloom filters and MinHash accelerate classification and containment.',
  },
  {
    title: 'Graph indexes',
    detail: 'Index paths through variation graphs to reduce reference bias.',
  },
]

const alignmentAnatomy = [
  {
    title: 'Seeding',
    detail: 'k-mers, minimizers, or syncmers propose candidate loci quickly.',
  },
  {
    title: 'Chaining',
    detail: 'Colinear seeds are chained to form candidate alignments.',
  },
  {
    title: 'Banded DP',
    detail: 'Restricts DP to a diagonal band to control complexity.',
  },
  {
    title: 'Gap penalties',
    detail: 'Affine gaps model indels more realistically than linear gaps.',
  },
  {
    title: 'Scoring and MAPQ',
    detail: 'Report confidence based on alignment uniqueness and score separation.',
  },
  {
    title: 'CIGAR encoding',
    detail: 'Compact representation of matches, insertions, deletions, and clipping.',
  },
]

const assemblyAnatomy = [
  {
    title: 'De Bruijn graphs',
    detail: 'Nodes are k-mers; edges represent overlaps.',
  },
  {
    title: 'Tip/bubble pruning',
    detail: 'Remove errors and low-support detours.',
  },
  {
    title: 'Unitigs',
    detail: 'Compress non-branching paths into contigs.',
  },
  {
    title: 'OLC hybrid',
    detail: 'Overlap-layout-consensus complements long-read assemblies.',
  },
  {
    title: 'Polishing',
    detail: 'Use reads to correct residual errors in assembled contigs.',
  },
  {
    title: 'Scaffolding',
    detail: 'Long-range links order contigs into larger structures.',
  },
]

const tradeoffMatrix = [
  {
    dimension: 'Sensitivity',
    index: 'FM-index exact search; high sensitivity with full DP.',
    sketch: 'Minimizers/sketches reduce sensitivity for speed.',
  },
  {
    dimension: 'Memory',
    index: 'Compressed indexes still large for pan-genomes.',
    sketch: 'Sampling dramatically lowers memory footprint.',
  },
  {
    dimension: 'Runtime',
    index: 'Exact search + DP is slower but precise.',
    sketch: 'Fast filters and chaining reduce compute.',
  },
  {
    dimension: 'Reference bias',
    index: 'Linear reference biases toward reference alleles.',
    sketch: 'Graph indexes reduce bias at higher complexity.',
  },
  {
    dimension: 'Error tolerance',
    index: 'DP handles indels; needs tuning for long reads.',
    sketch: 'Sketching is robust to noise but less precise.',
  },
  {
    dimension: 'Interpretability',
    index: 'Alignment scores and CIGAR are explicit.',
    sketch: 'Sketch matches are less detailed.',
  },
]

const complexityTable = [
  {
    approach: 'FM-index exact search',
    time: 'O(m)',
    space: 'O(n)',
    note: 'm pattern length; n reference size.',
  },
  {
    approach: 'Suffix array + LCP search',
    time: 'O(m log n)',
    space: 'O(n)',
    note: 'Binary search with LCP pruning.',
  },
  {
    approach: 'Banded Smith-Waterman (band w)',
    time: 'O(w * m)',
    space: 'O(w)',
    note: 'Restricts DP to a diagonal band.',
  },
  {
    approach: 'De Bruijn traversal',
    time: 'O(V + E)',
    space: 'O(V + E)',
    note: 'Coverage inflates edges; pruning reduces size.',
  },
  {
    approach: 'Minimizer seeding',
    time: 'O(m)',
    space: 'O(k)',
    note: 'Sampled k-mers reduce memory.',
  },
  {
    approach: 'Chaining (n anchors)',
    time: 'O(n log n)',
    space: 'O(n)',
    note: 'Dynamic programming over anchors.',
  },
]

const applications = [
  {
    title: 'Short-read mapping',
    detail: 'FM-index aligners map massive read sets for variant calling.',
    note: 'Low memory with high sensitivity.',
  },
  {
    title: 'Long-read alignment',
    detail: 'Minimizer chaining + banded DP handles noisy reads.',
    note: 'Supports structural variant detection.',
  },
  {
    title: 'Variant calling',
    detail: 'Accurate alignment and base quality modeling feed SNP/indel callers.',
    note: 'Confidence scores drive clinical interpretations.',
  },
  {
    title: 'Pan-genome alignment',
    detail: 'Graph indexes reduce reference bias in diverse cohorts.',
    note: 'Improves structural variant resolution.',
  },
  {
    title: 'Metagenomics',
    detail: 'Sketching and k-mer indexes classify reads at scale.',
    note: 'Optimized for many contigs and taxa.',
  },
]

const failureStory =
  'A lab mapped reads to GRCh37 while annotation was GRCh38. Variants were shifted, leading to incorrect interpretations. Fixes: enforce build IDs in metadata, block mixed references, and cross-check contig names and lengths.'

const pitfalls = [
  {
    title: 'Mixed reference builds',
    detail: 'Coordinate mismatches silently corrupt variant calls.',
  },
  {
    title: 'Ignoring masked bases',
    detail: 'Soft-masked regions can create spurious seeds.',
  },
  {
    title: 'Overly narrow bands',
    detail: 'Aggressive banding drops real indels and splice junctions.',
  },
  {
    title: 'Graph blowups',
    detail: 'De Bruijn graphs explode in repeats without pruning.',
  },
  {
    title: 'Unmodeled error profiles',
    detail: 'Long-read errors need adjusted mismatch and gap penalties.',
  },
  {
    title: 'Missing QC',
    detail: 'Without QC metrics, biases and drift go unnoticed.',
  },
]

const whenToUse = [
  {
    title: 'FM-index aligners',
    detail: 'Best for short, low-error reads on large references.',
  },
  {
    title: 'Minimizer mappers',
    detail: 'Best for long reads where exact seeds are sparse.',
  },
  {
    title: 'Banded DP',
    detail: 'Use when you know expected error windows to cap cost.',
  },
  {
    title: 'De Bruijn graphs',
    detail: 'Use for short-read assembly; add pruning for repeats.',
  },
  {
    title: 'OLC/graph hybrids',
    detail: 'Use for long-read assembly and complex genomes.',
  },
  {
    title: 'Variation graphs',
    detail: 'Use when reference bias matters (diverse cohorts).',
  },
]

const advanced = [
  {
    title: 'Dynamic FM-index',
    detail: 'Support incremental updates without full rebuilds.',
    note: 'Useful for streaming and iterative references.',
  },
  {
    title: 'Syncmers and sparse seeds',
    detail: 'Stabilize seeding across mutations and errors.',
    note: 'Improves sensitivity on noisy reads.',
  },
  {
    title: 'Adaptive banding',
    detail: 'Adjust band width based on score gradients.',
    note: 'Prevents waste on hopeless extensions.',
  },
  {
    title: 'SIMD-accelerated DP',
    detail: 'Vectorize scoring for significant speedups.',
    note: 'Critical for high-throughput pipelines.',
  },
  {
    title: 'Graph-aware splicing',
    detail: 'Add intron edges for RNA-seq junction discovery.',
    note: 'Improves mapping for novel transcripts.',
  },
  {
    title: 'Quality-weighted seeding',
    detail: 'Down-weight low-quality bases in seed selection.',
    note: 'Reduces false chains in noisy reads.',
  },
]

const tuningChecklist = [
  {
    title: 'Reference build ID',
    detail: 'Enforce build checks and contig validation.',
  },
  {
    title: 'Seed size and density',
    detail: 'Tune k and window size for sensitivity vs speed.',
  },
  {
    title: 'Band width',
    detail: 'Set based on expected indel length and error rate.',
  },
  {
    title: 'Gap penalties',
    detail: 'Adjust for platform-specific error profiles.',
  },
  {
    title: 'Duplicate handling',
    detail: 'Mark or remove PCR duplicates consistently.',
  },
  {
    title: 'QC thresholds',
    detail: 'Set minimum depth, MAPQ, and base-quality cutoffs.',
  },
]

const observability = [
  {
    title: 'Mapping rate',
    detail: 'Track aligned vs unaligned reads across samples.',
  },
  {
    title: 'Insert size and coverage',
    detail: 'Detect library prep issues and contamination.',
  },
  {
    title: 'Error profiles',
    detail: 'Monitor mismatch and indel distributions.',
  },
  {
    title: 'Graph size',
    detail: 'Watch de Bruijn node/edge growth and pruning stats.',
  },
  {
    title: 'Reference integrity',
    detail: 'Alert on contig mismatches and unexpected chromosomes.',
  },
  {
    title: 'Compute budgets',
    detail: 'Track CPU-hours per sample and DP hotspot time.',
  },
]

const codeExamples = [
  {
    title: 'FM-index backward search',
    code: `type FM = { bwt: string; C: Record<string, number>; rank: (c: string, i: number) => number }

function backwardSearch(fm: FM, pattern: string) {
  let l = 0
  let r = fm.bwt.length
  for (let i = pattern.length - 1; i >= 0; i--) {
    const c = pattern[i]
    l = fm.C[c] + fm.rank(c, l)
    r = fm.C[c] + fm.rank(c, r)
    if (l >= r) return []
  }
  return [l, r)
}`,
    explanation: 'Backward search shrinks the suffix interval using rank and C tables.',
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
    explanation: 'Restricts computation to a diagonal band for faster local alignment.',
  },
  {
    title: 'Minimizer extraction (sketch)',
    code: `function minimizers(seq: string, k: number, w: number) {
  const out: Array<{ pos: number; kmer: string }> = []
  for (let i = 0; i <= seq.length - k; i++) {
    const window = seq.slice(i, i + w)
    let best = ''
    let bestPos = i
    for (let j = 0; j <= window.length - k; j++) {
      const kmer = window.slice(j, j + k)
      if (best === '' || kmer < best) {
        best = kmer
        bestPos = i + j
      }
    }
    out.push({ pos: bestPos, kmer: best })
  }
  return out
}`,
    explanation: 'Minimizers sample representative k-mers for faster seeding.',
  },
]

const keyTakeaways = [
  {
    title: 'Reference correctness first',
    detail: 'Mismatched builds silently corrupt downstream results.',
  },
  {
    title: 'Indexes control feasibility',
    detail: 'Succinct structures keep searches in memory and on budget.',
  },
  {
    title: 'Model the error profile',
    detail: 'Gap penalties and seeds must match platform noise.',
  },
  {
    title: 'Reproducibility is mandatory',
    detail: 'Versioned tools and QC are part of the scientific claim.',
  },
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
                Index genomes compactly, align noisy reads carefully, and keep analyses reproducible. Data structures and scoring
                choices decide whether biology is signal or noise.
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
                  <p className="win95-text">{event.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="win95-panel">
                      <div className="win95-heading">{pillar.title}</div>
                      <p className="win95-text">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((model) => (
                    <div key={model.title} className="win95-panel">
                      <div className="win95-heading">{model.title}</div>
                      <p className="win95-text">{model.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    Step {index + 1}: {step.title}
                  </div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Index anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {indexAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Alignment anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {alignmentAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Assembly anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {assemblyAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tradeoff matrix</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Exact/index-heavy</th>
                    <th>Sketch/approx</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffMatrix.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.index}</td>
                      <td>{row.sketch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure mode</div>
              <p className="win95-text">{failureStory}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-grid win95-grid-2">
              {pitfalls.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use what</legend>
            <div className="win95-grid win95-grid-2">
              {whenToUse.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tuning checklist</legend>
            <div className="win95-grid win95-grid-2">
              {tuningChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Observability and signals</legend>
            <div className="win95-grid win95-grid-2">
              {observability.map((item) => (
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
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
