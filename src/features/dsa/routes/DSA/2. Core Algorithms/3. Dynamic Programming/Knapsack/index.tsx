import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function KnapsackPage(): JSX.Element {
  return (
    <TopicLayout
      title="Knapsack Problem"
      subtitle="Pack the most value while respecting the weight capacity"
      intro="The knapsack problem contrasts item weight against value. Dynamic programming lets us compare include/exclude options once per capacity slot so the best combination emerges without reevaluating every subset."
    >
      <TopicSection heading="Problem variants">
        <p>
          The 0/1 knapsack admits each item at most once, whereas the unbounded version allows
          repeating an item as long as the capacity holds. Both versions work by weighing the
          marginal value of including an item inside a fixed weight budget.
        </p>
        <p>
          You can express each scenario in terms of a capacity target W, item weights, and
          associated values. Compare the value of carrying item i against skipping it while never
          exceeding W.
        </p>
      </TopicSection>

      <TopicSection heading="DP recurrence">
        <p>
          Let dp[i][w] represent the highest value achievable with the first i items and a weight
          limit of w. When item i weighs more than w, inherit dp[i-1][w]; otherwise take the maximum
          of skipping it (dp[i-1][w]) or including it (dp[i-1][w - weight_i] + value_i).
        </p>
        <p>
          For the unbounded version the recurrence changes only in that the include branch
          references dp[i][w - weight_i], letting you reuse the same item multiple times.
        </p>
      </TopicSection>

      <TopicSection heading="Building the table">
        <p>
          Iterate items on the outside and, for each one, sweep the capacity from 0 to W. Fill dp
          row by row so each entry reflects decisions from prior items and smaller capacities.
        </p>
        <p>
          Optimize the space from O(nW) to O(W) by keeping a single array and iterating the capacity
          backward (from W down to weight_i) for 0/1 knapsack; forward iteration works for the
          unbounded variant.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Initialize dp[0...W] to zero (no items yields zero value).</li>
          <li>
            For each item, recompute dp[w] by comparing the best value without the item and the
            value gained when the item fits.
          </li>
          <li>Track choices if you plan to recover which items filled the knapsack.</li>
        </ol>
      </TopicSection>

      <TopicSection heading="Reconstructing answers & variations">
        <p>
          When you store decisions (via a boolean matrix or parent pointers), you can walk backward
          from dp[n][W] to list the selected items. This also allows reporting the total weight and
          value of the chosen subset.
        </p>
        <p>
          Variants include bounded knapsack (limit supplies per item), multi-dimensional knapsack
          (separate resource constraints), and profit-oriented versions that track both weight and
          value budgets.
        </p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>
            Clearly separate the decision branches: inherit prior value when skipping, add item
            value when including.
          </li>
          <li>
            Choose 2D or 1D storage based on your needs, and iterate capacity backwards for 0/1 to
            prevent reuse within one pass.
          </li>
          <li>Capture choices if you want to print the actual knapsack contents later.</li>
          <li>
            Document that time/space costs scale with capacity (O(nW)), and mention how to switch to
            meet tighter memory budgets.
          </li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
