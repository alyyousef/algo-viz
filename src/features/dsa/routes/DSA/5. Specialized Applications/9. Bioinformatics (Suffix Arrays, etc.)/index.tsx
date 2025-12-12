import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
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
    <TopicLayout
      title="Bioinformatics (Suffix Arrays, etc.)"
      subtitle="Sequence analysis with verifiable pipelines"
      intro="Index genomes compactly, align noisy reads carefully, and keep analyses reproducible. Data structures and scoring choices decide whether biology is signal or noise."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-white/80">{event.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{item.step}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity reference">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/10 text-xs uppercase tracking-wide text-white/70">
              <tr>
                <th className="px-4 py-2">Approach</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Space</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="odd:bg-white/5">
                  <td className="px-4 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-4 py-2">{row.time}</td>
                  <td className="px-4 py-2">{row.space}</td>
                  <td className="px-4 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-white">{failureCallout.title}</p>
          <p className="text-sm text-red-100">{failureCallout.detail}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <ul className="space-y-2 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item} className="rounded-lg bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use what">
        <ul className="space-y-2 text-sm text-white/80">
          {whenToUse.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="overflow-x-auto rounded bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-xs text-white/70">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
