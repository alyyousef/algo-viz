import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Scale genomes to computation',
    detail: 'Genomes are gigabases long; succinct indexes keep search feasible in memory.',
    note: 'Prevents quadratic scans across populations and metagenomes.',
  },
  {
    title: 'Noise-tolerant matching',
    detail:
      'Sequencing errors and real variants blur signals; scoring separates biology from noise.',
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

const glossary = [
  {
    term: 'Suffix array',
    definition:
      'A sorted array of suffix starting positions that supports efficient substring search.',
  },
  {
    term: 'LCP',
    definition: 'Longest common prefix information used to accelerate suffix-array comparisons.',
  },
  {
    term: 'Burrows-Wheeler transform',
    definition:
      'A reversible text transform that supports compact indexing and fast backward search.',
  },
  {
    term: 'FM-index',
    definition: 'A succinct index over the BWT that uses rank/select to narrow pattern intervals.',
  },
  {
    term: 'Minimizer',
    definition:
      'A sampled representative k-mer used to seed alignments with less memory than full indexing.',
  },
  {
    term: 'Banded dynamic programming',
    definition: 'Alignment DP restricted to a narrow diagonal region to reduce runtime and space.',
  },
  {
    term: 'MAPQ',
    definition:
      'Mapping quality, an estimate of confidence that an alignment is correct and unique enough.',
  },
  {
    term: 'CIGAR',
    definition:
      'A compact alignment string describing matches, insertions, deletions, clipping, and related operations.',
  },
  {
    term: 'De Bruijn graph',
    definition: 'A graph whose nodes are k-mers and whose edges represent overlaps for assembly.',
  },
  {
    term: 'OLC',
    definition: 'Overlap-layout-consensus, an assembly style often paired with long reads.',
  },
  {
    term: 'Variation graph',
    definition: 'A graph-based reference representation that models multiple alleles and paths.',
  },
  {
    term: 'Reference bias',
    definition: 'Systematic preference for the linear reference allele during mapping or calling.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'History' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-workflow', label: 'How It Works' },
    { id: 'core-indexes', label: 'Index Anatomy' },
    { id: 'core-alignment', label: 'Alignment Anatomy' },
    { id: 'core-assembly', label: 'Assembly Anatomy' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-complexity', label: 'Complexity Reference' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-choices', label: 'When to Use What' },
    { id: 'core-advanced', label: 'Advanced Moves' },
    { id: 'core-tuning', label: 'Tuning Checklist' },
    { id: 'core-observability', label: 'Observability' },
  ],
  examples: [{ id: 'examples-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BioinformaticsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Bioinformatics (Suffix Arrays, etc.)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Bioinformatics (Suffix Arrays, etc.)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Bioinformatics (Suffix Arrays, etc.)</h1>
      <p className="bio-help-intro">
        Bioinformatics pipelines turn long biological strings into searchable, alignable, and
        auditable evidence. This page keeps the original concepts intact, but presents them in a
        Windows-style help document focused on succinct indexes, alignment mechanics, assembly
        tradeoffs, and the operational discipline needed for reproducible claims.
      </p>
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            {history.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications and Failure Modes</h2>
            {applications.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
            <h3 className="bin98-subheading">Failure mode</h3>
            <p>{failureStory}</p>
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Core Pillars</h2>
            {pillars.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {howItWorks.map((item, index) => (
              <p key={item.title}>
                <strong>
                  Step {index + 1}: {item.title}
                </strong>{' '}
                {item.detail}
              </p>
            ))}
          </section>

          <section id="core-indexes" className="bin98-section">
            <h2 className="bin98-heading">Index Anatomy</h2>
            {indexAnatomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-alignment" className="bin98-section">
            <h2 className="bin98-heading">Alignment Anatomy</h2>
            {alignmentAnatomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-assembly" className="bin98-section">
            <h2 className="bin98-heading">Assembly Anatomy</h2>
            {assemblyAnatomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoffs</h2>
            {tradeoffMatrix.map((item) => (
              <p key={item.dimension}>
                <strong>{item.dimension}:</strong> exact/index-heavy approach: {item.index}{' '}
                Sketch/approx approach: {item.sketch}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Reference</h2>
            {complexityTable.map((item) => (
              <p key={item.approach}>
                <strong>{item.approach}:</strong> time {item.time}, space {item.space}. {item.note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            {pitfalls.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-choices" className="bin98-section">
            <h2 className="bin98-heading">When to Use What</h2>
            {whenToUse.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Moves</h2>
            {advanced.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>

          <section id="core-tuning" className="bin98-section">
            <h2 className="bin98-heading">Tuning Checklist</h2>
            <ul>
              {tuningChecklist.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability and Signals</h2>
            <ul>
              {observability.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="examples-code" className="bin98-section">
          <h2 className="bin98-heading">Examples</h2>
          {codeExamples.map((item) => (
            <div key={item.title}>
              <h3 className="bin98-subheading">{item.title}</h3>
              <pre className="bin98-codebox">
                <code>{item.code.trim()}</code>
              </pre>
              <p>{item.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
