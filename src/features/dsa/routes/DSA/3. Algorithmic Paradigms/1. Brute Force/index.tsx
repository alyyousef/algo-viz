import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What It Is',
    detail:
      "Brute force is the simplest algorithmic paradigm: systematically enumerate all possible candidates for a solution and check whether each candidate satisfies the problem's statement.",
    note: 'It is a general problem-solving technique, not a specific algorithm.',
  },
  {
    title: 'Why It Exists',
    detail:
      'It provides a guaranteed path to a correct solution, assuming one exists within the search space. Its primary value lies in its simplicity and reliability, serving as a benchmark for more optimized algorithms.',
    note: 'It saves us from the complexity of designing clever heuristics when the search space is small enough.',
  },
  {
    title: 'Where It Shows Up',
    detail:
      'Brute force is common in scenarios with small constraints (e.g., N <= 10), cryptography (breaking passwords), and as a building block in more complex algorithms like backtracking. It is often the first approach considered for a new problem.',
    note: 'Also used to verify the correctness of more efficient, but complex, algorithms.',
  },
]

const history = [
  {
    title: 'Antiquity',
    detail:
      'The concept of exhaustive search is ancient. Early mathematicians and strategists implicitly used brute force to solve problems, such as checking all possible moves in a simple board game.',
    note: "The 'Sieve of Eratosthenes' for finding prime numbers (c. 240 BCE) is a form of exhaustive search.",
  },
  {
    title: '1950s: The Dawn of Computing',
    detail:
      'With the advent of electronic computers, brute force became a viable strategy for solving complex computational problems for the first time. Pioneers like Alan Turing used it for code-breaking during WWII.',
    note: "The ENIAC could perform calculations thousands of times faster than humans, making brute force practical for certain tasks.",
  },
  {
    title: '1971: The P vs NP Problem',
    detail:
      "Stephen Cook's and Leonid Levin's work formalized the concept of computational complexity, highlighting that many problems (NP-complete) had no known efficient solution better than brute-force style exponential search.",
    note: 'This gave a theoretical foundation for understanding why brute force is sometimes the only option we have.',
  },
]

const pillars = [
  {
    title: 'Complete Search Space',
    detail:
      'The core principle is that the set of all possible solutions must be well-defined and finite. The algorithm must have a systematic way to generate every single candidate without missing any.',
  },
  {
    title: 'Correctness Test',
    detail:
      'For each candidate, there must be a clear and correct procedure to verify if it is a valid solution to the problem.',
  },
  {
    title: 'Finite Termination',
    detail:
      'The process must be guaranteed to stop. Since the search space is finite, iterating through all possibilities will eventually end.',
  },
]

const mentalModels = [
  {
    title: 'The Locksmith',
    detail:
      "Imagine a locksmith trying to open a combination lock with no knowledge of the code. They will try every combination one by one: 000, 001, 002, and so on, until the lock opens. This is a pure brute-force approach.",
    note: 'This analogy highlights the methodical, exhaustive, and often slow nature of the search.',
  },
  {
    title: 'The Jigsaw Puzzle',
    detail:
      'A naive way to solve a jigsaw puzzle is to take one piece and try to connect it with every other piece, then take the next piece and repeat. You are testing all possible pairings until something fits.',
    note: 'This breaks down because skilled puzzlers use heuristics (edge pieces first, color matching), which is precisely what brute force avoids.',
  },
]

const howItWorks = [
  {
    title: '1. Define the Search Space',
    detail:
      "Translate the problem into a set of candidates. For a password cracker, it's all possible character strings. For the Traveling Salesperson Problem, it's all possible orderings of cities.",
  },
  {
    title: '2. Generate Candidates',
    detail:
      'Create a mechanism (e.g., nested loops, recursion) to iterate through every single candidate in the search space, one at a time.',
  },
  {
    title: '3. Test Each Candidate',
    detail:
      "For each generated candidate, apply the problem's constraints to check if it's a valid solution. For an optimization problem, compare it to the best solution found so far.",
  },
  {
    title: '4. Return the Result',
    detail:
      'If a solution is found (or after checking all candidates for an optimization problem), return the result. If the entire space is searched and no solution is found, report failure.',
  },
]

const complexityTable = [
  {
    approach: 'Generating all subsets',
    time: 'O(2^N * f(N))',
    space: 'O(N) or O(N^2)',
    note: 'f(N) is the time to check one subset. Space depends on if you store the subset.',
  },
  {
    approach: 'Generating all permutations',
    time: 'O(N! * f(N))',
    space: 'O(N) or O(N^2)',
    note: "Factorial growth is extremely fast. Often only feasible for N < 12.",
  },
  {
    approach: 'Searching a grid (NxM)',
    time: 'O(N * M)',
    space: 'O(1) or O(N*M)',
    note: 'A simple, complete search of a 2D space is technically brute force.',
  },
  {
    approach: 'Password Cracking (L=length, C=charset size)',
    time: 'O(C^L)',
    space: 'O(L)',
    note: 'This is why password length is more important than complexity.',
  },
]

const applications = [
  {
    title: 'Cryptography',
    detail:
      "The most direct application is trying to guess a key or password by trying all possible combinations. Modern encryption is designed to make the brute-force search space astronomically large.",
    company: 'All secure systems',
  },
  {
    title: 'Solving Puzzles',
    detail:
      'For games like Sudoku or Rubik\'s Cube, a computer can explore every possible move to find a solution path. This is often combined with backtracking to prune impossible branches.',
    company: 'Game AI, Puzzle Solvers',
  },
  {
    title: 'Scientific Computing',
    detail:
      'In fields like computational biology, brute-force search can be used to explore different protein folding configurations or gene sequence alignments when the problem space is constrained.',
    company: 'Research, Bioinformatics',
  },
  {
    title: 'Quality Assurance',
    detail:
      'Testing a function with every possible input within a small range to ensure it behaves as expected. This is a form of exhaustive testing.',
    company: 'Software Engineering',
  },
]

const pitfalls = [
  'Underestimating Exponential Growth: A brute-force solution that is instant for N=10 might take centuries for N=30. Developers often fail to calculate the upper bound of the search space.',
  'Off-by-One Errors in Generation: Incorrectly defining loops or recursion can lead to missing the last candidate or generating one too many, leading to incorrect results or crashes.',
  'Ignoring Simple Pruning: Sometimes, a simple `if` condition can prune huge parts of the search space (e.g., in backtracking), but a pure brute-force implementation might miss this.',
  'Unnecessary Computation: Re-calculating the same values repeatedly inside the test function for each candidate. This is where memoization could be a simple optimization.',
]

const whenToUse = [
  'When the input size is guaranteed to be very small.',
  'As a first step to understand a problem and establish a baseline for correctness.',
  'When the problem is proven to have no better-than-exponential solution (NP-Hard) and you need the optimal answer.',
  'For problems where the search space, while large, can be massively parallelized.',
]

const advanced = [
  {
    title: 'Brute Force with Pruning (Backtracking)',
    detail:
      'This is the most common optimization. If you determine that a partial candidate cannot possibly lead to a valid solution, you stop exploring that entire branch of the search space.',
    rationale: 'Avoids exploring large, fruitless areas of the search space.',
  },
  {
    title: 'Meet-in-the-Middle',
    detail:
      'Divide the problem into two halves. Brute force all possibilities for the first half and store the results in a hash table. Then, brute force the second half and look for a "match" in the hash table.',
    rationale: 'Turns an O(2^N) problem into two O(2^(N/2)) problems, which is a massive improvement.',
  },
  {
    title: 'Memoization / Dynamic Programming',
    detail:
      'If the brute-force approach involves solving the same subproblems multiple times, storing the results of these subproblems can drastically reduce redundant computations.',
    rationale: 'Trades space for time by caching intermediate results.',
  },
]

const codeExamples = [
  {
    code: `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // Test every element
    if (arr[i] === target) {
      return i; // Solution found
    }
  }
}
    `,
    explanation:
      'This is the most basic form of brute force. It iterates through every element (the entire search space) and tests each one against the target. Simple and effective for unsorted data.',
  },
  {
    title: 'Traveling Salesperson Problem (TSP)',
    code: `
function tsp(cities) {
  let minDistance = Infinity;
  let bestPath = [];

  function generatePermutations(currentPath, remainingCities) {
    if (remainingCities.length === 0) {
      // We have a full path, now test it
      const currentDistance = calculateDistance(currentPath);
      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        bestPath = currentPath;
      }
      return;
    }

    for (let i = 0; i < remainingCities.length; i++) {
      const nextCity = remainingCities[i];
      const newPath = [...currentPath, nextCity];
      const newRemaining = remainingCities.filter(c => c !== nextCity);
      generatePermutations(newPath, newRemaining);
    }
  }

  generatePermutations([], cities); // Start the generation
  return { path: bestPath, distance: minDistance };
}
    `,
    explanation:
      'This recursive function generates every possible ordering (permutation) of cities. For each complete path, it calculates the total distance and updates the minimum. This is a classic example of factorial (O(N!)) complexity.',
  },
]

const keyTakeaways = [
  {
    title: 'Simple and Reliable',
    detail: 'Brute force is often easy to implement and guaranteed to be correct if designed properly.',
  },
  {
    title: 'Performance is the Enemy',
    detail: 'Its downfall is its terrible performance on all but the smallest of inputs.',
  },
  {
    title: 'The Ultimate Benchmark',
    detail: 'Use it to verify your clever, optimized algorithms. If they don\'t match the brute force output on small inputs, your "fast" algorithm is wrong.',
  },
  {
    title: 'Know the Complexity',
    detail:
      'You must be able to identify whether your brute-force approach will be factorial (N!), exponential (2^N), or polynomial (N^k) to know if it\'s feasible.',
  },
]

export default function BruteForcePage(): JSX.Element {
  return (
    <TopicLayout
      title="Brute Force"
      subtitle="The Art of Exhaustive Search"
      intro="Brute force is the straightforward strategy of trying every single possibility to find a solution. It's the ultimate 'no stone unturned' approach: simple to design, guaranteed to work, but often computationally expensive."
    >
      <TopicSection heading="The Big Picture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {bigPicture.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
              {item.note && <p className="mt-2 text-xs text-white/60 italic">{item.note}</p>}
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Historical Context">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {history.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
              {item.note && <p className="mt-2 text-xs text-white/60 italic">{item.note}</p>}
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core Concepts & Mental Models">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-white">Pillars</h3>
            <div className="mt-4 space-y-4">
              {pillars.map((item) => (
                <div key={item.title} className="rounded-lg bg-white/5 p-4">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Mental Models</h3>
            <div className="mt-4 space-y-4">
              {mentalModels.map((item) => (
                <div key={item.title} className="rounded-lg bg-white/5 p-4">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                  {item.note && <p className="mt-2 text-xs text-white/60 italic">{item.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How It Works">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {howItWorks.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4 text-center">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity Analysis">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-sm font-semibold text-white">Approach</th>
                <th className="p-4 text-sm font-semibold text-white">Time</th>
                <th className="p-4 text-sm font-semibold text-white">Space</th>
                <th className="p-4 text-sm font-semibold text-white">Note</th>
              </tr>
            </thead>
            <tbody className="text-sm text-white/80">
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/10">
                  <td className="p-4">{row.approach}</td>
                  <td className="p-4 font-mono">{row.time}</td>
                  <td className="p-4 font-mono">{row.space}</td>
                  <td className="p-4">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Real-World Applications">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {applications.map((app) => (
            <div key={app.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="font-semibold text-white">{app.title}</h3>
              <p className="text-sm text-white/80">{app.detail}</p>
              <p className="mt-2 text-xs font-semibold uppercase text-blue-400">{app.company}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <h4 className="font-bold text-red-400">Failure Callout: The Knight's Tour</h4>
          <p className="mt-2 text-sm text-white/80">
            A classic problem is finding a sequence of moves for a knight on a chessboard to visit every square exactly once. A naive brute-force approach that explores every possible sequence of 63 moves is computationally impossible. The number of paths is astronomical (approx. 10^52). This problem illustrates that pure brute force is infeasible without clever pruning (backtracking) to eliminate dead-end paths early.
          </p>
        </div>
      </TopicSection>

      <TopicSection heading="Common Pitfalls & When To Use It">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-rose-400">Pitfalls to Avoid</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              {pitfalls.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-green-400">Decision Criteria</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              {whenToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </TopicSection>

       <TopicSection heading="Advanced Variants">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {advanced.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
              <p className="mt-2 text-xs text-amber-400">{item.rationale}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code Examples">
        <div className="space-y-6">
          {codeExamples.map((example) => (
            <div key={example.title} className="rounded-lg border border-white/20 bg-white/5">
              <div className="p-4">
                <h4 className="font-semibold text-white">{example.title}</h4>
              </div>
              <div className="bg-black/20 p-4">
                <pre><code className="language-js text-sm">{example.code.trim()}</code></pre>
              </div>
              <div className="p-4">
                <p className="text-sm text-white/80">{example.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key Takeaways">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}