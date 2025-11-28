import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const indexes = [
  {
    title: 'Suffix arrays and FM-index',
    detail:
      'Suffix arrays give lexicographic order; LCP accelerates binary search. FM-index (BWT + rank/select) enables compressed substring search and exact matching.',
  },
  {
    title: 'k-mer hashing and minimizers',
    detail:
      'Store hashed k-mers for seeding alignments; minimizers reduce storage by sampling stable representatives. Tune k for genome size vs error tolerance.',
  },
  {
    title: 'De Bruijn graphs',
    detail:
      'Nodes are (k-1)-mers; edges are k-mers. Useful for assembly; collapse tips/bubbles to denoise. High coverage can explode graph size without pruning.',
  },
  {
    title: 'Variation graphs (POA/DAGs)',
    detail:
      'Represent haplotypes and structural variants as DAGs. Partial order alignment can align reads against graphs for pan-genome analysis.',
  },
]

const alignment = [
  {
    title: 'Dynamic programming cores',
    detail:
      'Needleman-Wunsch (global) and Smith-Waterman (local) use affine gap penalties; banded DP and SIMD (SWIPE/Parasail) speed up scoring.',
  },
  {
    title: 'Seed-and-extend',
    detail:
      'Find seeds via k-mers/minimizers, chain colinear seeds, then extend with DP. Heuristics (X-drop/Z-drop) stop unpromising extensions early.',
  },
  {
    title: 'Spliced/long-read alignment',
    detail:
      'Detect introns with splice-aware scoring; handle high indel rates for long reads with adaptive banding and homopolymer compression.',
  },
  {
    title: 'Error models and scoring',
    detail:
      'Match/mismatch and gap penalties should reflect platform error profiles. Log-odds (Phred) scoring aligns with downstream variant calling.',
  },
]

const pipelines = [
  {
    title: 'Genome assembly playbook',
    steps: [
      'Choose OLC for long reads; de Bruijn for short reads; hybrids for polish.',
      'Filter adapters/low-quality reads; normalize coverage; correct reads before assembly.',
      'Resolve repeats with coverage and read pair/long-read spanning; polish consensus with multiple aligners.',
    ],
  },
  {
    title: 'Variant calling stack',
    steps: [
      'Align reads with proper platform presets; mark duplicates; recalibrate quality scores if needed.',
      'Call variants (HaplotypeCaller, DeepVariant); filter with hard or model-based thresholds.',
      'Use joint genotyping for cohorts; phase haplotypes; validate against known truth sets.',
    ],
  },
  {
    title: 'Metagenomics workflow',
    steps: [
      'Use k-mer or marker gene classifiers; consider minimizer-based sketching for speed.',
      'Filter host reads; normalize and rarefy where appropriate; report coverage and ambiguity.',
      'Assemble bins with contig coverage/GC; check completeness/contamination with single-copy markers.',
    ],
  },
  {
    title: 'Quality and reproducibility',
    steps: [
      'Track versions of reference genomes, annotations, and tools; pin containers or conda envs.',
      'Record command-line params and random seeds; store logs and QC metrics (coverage, error rates).',
      'Include control samples; rerun small benchmarks after upgrades to catch drift.',
    ],
  },
]

const guardrails = [
  'Avoid mixing references without noting build/patch levels; lift-over coordinates carefully.',
  'Handle ambiguous bases (N) and soft-masked repeats explicitly in scoring and filtering.',
  'Watch memory on large indexes/graphs; stream data and shard when possible.',
  'Prevent cross-sample contamination by tracking read groups and validating barcodes/UMIs.',
  'Always sanity-check alignments visually for edge cases before trusting automated calls.',
]

export default function BioinformaticsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Bioinformatics (Suffix Arrays, etc.)"
      subtitle="Sequence analysis with algorithms"
      intro="Index genomes compactly, align noisy reads reliably, and keep pipelines reproducible. Data structures and scoring choices shape downstream biology."
    >
      <TopicSection heading="Sequence indexes">
        <div className="grid gap-3 md:grid-cols-2">
          {indexes.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Alignment strategies">
        <div className="grid gap-3 md:grid-cols-2">
          {alignment.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Operational playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {pipelines.map((play) => (
            <article key={play.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{play.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {play.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
