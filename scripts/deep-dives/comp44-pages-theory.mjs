export const theoryPages = [
  {
    rel: '44.2 Theory of Computation/Church-Turing thesis/index.mdx',
    title: 'Church-Turing Thesis',
    description:
      'The claim that Turing machines, lambda calculus, and every other reasonable model capture the same informal idea of effective calculation.',
    body: `
The **Church-Turing thesis** is not a theorem. It is the statement that the informal notion "what a human can calculate by a finite mechanical procedure" coincides with "what a Turing machine can compute." Alonzo Church proposed lambda-definability; Alan Turing proposed machines. They proved those two formalisms equivalent, then the field treated that class as the computable functions.

## 1. Deep Dive and Mechanics

Many models independently landed on the same class: Turing machines, untyped lambda calculus, general recursive functions, counter machines, RAM models, and any mainstream programming language with unbounded memory. A translation from one model to another is a compiler in the theoretical sense.

**What the thesis does not say.** It does not say physics cannot do more (quantum computers, in the standard circuit model, still compute the same functions, sometimes faster). It does not say every function on integers is computable — most are not. It does not give a complexity bound.

**Extended forms.** The physical Church-Turing thesis claims no physically realisable device beats TM computability. The efficient (or Cobham-Edmonds) thesis claims that "feasible" matches polynomial time across reasonable models, up to polynomial factors.

<Callout icon="info" title="Thesis, not theorem">
You cannot prove that a formal class equals an informal idea. You can only accumulate evidence: every serious model so far has been TM-equivalent, and proposed super-Turing machines smuggle infinite work or oracles.
</Callout>

## 2. Mathematical / Theoretical Foundation

Let C be the class of partial functions from naturals to naturals computed by some TM. Church's thesis: C equals the effectively calculable partial functions. Evidence includes equivalence proofs among TMs, lambda, and mu-recursive functions; stability of C when you change tape alphabet or tape count; and the failure of attempts to add obviously mechanical steps without also adding oracles.

If you add a halt-oracle you get a strictly larger class. That does not refute the thesis; it leaves the informal notion of "effective."

<ComparisonTable
  headers={['Model', 'Primitive', 'Same class as TM?', 'Notes']}
  rows={[
    ['Turing machine', 'Tape and finite control', 'By definition', 'Standard'],
    ['Lambda calculus', 'Application and abstraction', 'Yes', 'Church 1936'],
    ['mu-recursive functions', 'Zero, succ, compose, mu', 'Yes', 'Kleene'],
    ['Halting oracle TM', 'TM plus halt answers', 'No, strictly more', 'Not effective'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Evidence in miniature: two models computing the same function
def tm_style_inc(n):
    return n + 1  # a TM can increment a unary or binary numeral

def lambda_style_inc(n):
    return (lambda x: x + 1)(n)

assert tm_style_inc(41) == lambda_style_inc(41)
TICK3

A real equivalence proof encodes TM transitions as lambda terms, or the reverse, and simulates step by step.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Informal[Effective procedure] -.-> Thesis[Church-Turing thesis]
    TM[Turing machines] --> Same[Computable functions]
    LC[Lambda calculus] --> Same
    Rec[Recursive functions] --> Same
    Py[Python with unbounded RAM] --> Same
    Thesis --> Same
TICK3

## 5. Interview Prep

**Q: Is the Church-Turing thesis proved?**
**A:** No. The equivalences among formal models are proved. The identification with informal calculability is a thesis.

**Q: Does quantum computing refute it?**
**A:** No. BQP sits inside the computable functions. Quantum changes resources, not the set of solvable problems, unless you change the model of physics.

**Q: Why should a working engineer care?**
**A:** Another language cannot compute the uncomputable. Porting an algorithm between models is always possible in theory, with a possibly huge overhead.

## 6. Production Use Cases

- **Language design:** a feature is Turing complete when it can simulate a TM, sometimes by accident (templates, CSS, spreadsheets).
- **Sandboxing:** if your config language is Turing complete, you cannot bound runtime by inspection alone.
- **Specs** that define algorithm as something a TM could run, excluding oracles and human judgment.

<Callout icon="tip" title="Ask which thesis they mean">
Interviewers sometimes say Church-Turing when they mean P is the same across models. That is the efficient thesis, and it is more fragile because a RAM step is not a TM step.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Complexity theory/index.mdx',
    title: 'Computational Complexity Theory',
    description:
      'The study of resources — time, space, randomness, circuits — needed to solve problems, organised into classes such as P, NP, and PSPACE.',
    body: `
**Complexity theory** asks not "is it computable?" but "what does it cost?" Time, space, nondeterminism, randomness, and circuit size carve the decidable problems into classes. P versus NP is the celebrity question. The everyday tools are reductions, completeness, and the habit of naming the resource you are spending.

## 1. Deep Dive and Mechanics

A **complexity class** is a set of languages solvable by a model within a bound. **P**: deterministic TM, polynomial time. **NP**: verifiable in polynomial time, or solvable in polynomial time on a nondeterministic TM. **PSPACE**: polynomial space. **EXPTIME**: exponential time.

**Reductions.** A polynomial-time many-one reduction from A to B is a function f such that x is in A exactly when f(x) is in B. If A is NP-hard and A reduces to B, then B is NP-hard. SAT is the classic NP-complete problem (Cook-Levin).

**Beyond worst-case time.** Average-case complexity, smoothed analysis, parameterized complexity, and approximation ratios are how practitioners escape a blanket "NP-complete, give up."

<Callout icon="warning" title="NP-complete is not a synonym for impossible">
SAT solvers decide industrial instances every day. Complexity is a worst-case asymptotic statement. Use it to choose an approach — exact ILP, approximation, SAT encoding — not to stop thinking.
</Callout>

## 2. Mathematical / Theoretical Foundation

TIME(f) and SPACE(f) are defined with a precise TM model. Polynomial classes are robust: a RAM and a TM agree up to polynomial factors. Exponential classes are more model-sensitive.

The time hierarchy theorem: more time buys more languages for nice bounds. So P is not equal to EXPTIME. We still do not know whether P equals NP. Relativization, natural proofs, and algebrization explain why the usual techniques stall.

<ComparisonTable
  headers={['Class', 'Resource', 'Complete problem', 'Contains P?']}
  rows={[
    ['P', 'Det. poly time', 'Circuit value', 'Yes, equal'],
    ['NP', 'Poly-time verify', 'SAT, 3-SAT, CLIQUE', 'Yes'],
    ['coNP', 'Poly-time refute', 'TAUT', 'Yes'],
    ['PSPACE', 'Poly space', 'QBF', 'Yes'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Poly-time verifier for an NP certificate (subset sum)
def verify_subset_sum(nums, target, bits):
    if len(bits) != len(nums):
        return False
    total = sum(n for n, b in zip(nums, bits) if b)
    return total == target

# Finding bits is the hard search problem; checking is linear
print(verify_subset_sum([3, 5, 7], 10, [1, 0, 1]))
TICK3

NP is about verification. The solver that finds bits can be exponential.

## 4. Visualizations

TICK3mermaid
flowchart TB
    P[P] --> NP[NP]
    P --> coNP[coNP]
    NP --> PH[PH]
    coNP --> PH
    PH --> PSPACE[PSPACE]
    PSPACE --> EXPTIME[EXPTIME]
TICK3

## 5. Interview Prep

**Q: P versus NP in one paragraph?**
**A:** P is problems we can solve quickly. NP is problems whose yes-answers we can check quickly. P equals NP would mean finding a solution is always about as easy as checking one. We do not know; most theorists expect they are not equal.

**Q: NP-hard versus NP-complete?**
**A:** Complete means in NP and NP-hard. Hard means at least as hard as every NP problem via a poly-time reduction. The halting problem is not NP-complete because it is not in NP.

**Q: Why do reductions matter in system design?**
**A:** If you reduce your scheduling problem to ILP or SAT, you inherit decades of solvers. If you reduce SAT to your API, you have advertised an NP-hard endpoint.

## 6. Production Use Cases

- **Compilers:** register allocation and instruction scheduling are NP-hard; compilers use heuristics.
- **Security:** crypto assumes certain problems stay out of P. Factoring is not known to be NP-complete.
- **Infra:** bin packing, vehicle routing, and query optimisation lean on approximations and timeouts.

<Callout icon="tip" title="State the model">
Saying O(n log n) needs a machine model — comparison RAM or word RAM. Complexity theory is pedantic about that for a reason.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Computability/index.mdx',
    title: 'Computability',
    description:
      'Which functions and languages a mechanical procedure can decide or enumerate at all, ignoring time and memory as long as both stay finite.',
    body: `
**Computability** (recursion theory) draws the line between problems a Turing machine can solve and problems no algorithm can solve, no matter the hardware. It is the layer under complexity: first ask whether any finite procedure exists, then ask what it costs.

## 1. Deep Dive and Mechanics

A function f on naturals is **computable** if some TM, on input n, halts with f(n) on the tape. A language L is **decidable** if some TM halts on every input and accepts exactly the strings in L. L is **recognisable** (r.e., semi-decidable) if some TM accepts exactly L and may loop on the complement.

**Classic facts.** The halting set is recognisable but not decidable. The complement of the halting set is not even recognisable. Rice's theorem: any nontrivial semantic property of programs is undecidable.

**Reductions.** A many-one reduction from A to B shows A is no harder than B for computability. That is not the same as a poly-time reduction.

<Callout icon="warning" title="Infinite time is still finite each run">
Computable does not mean finishes this afternoon. A TM that runs a tower of exponentials is still a decision procedure. Feasibility is complexity, not computability.
</Callout>

## 2. Mathematical / Theoretical Foundation

The Church-Turing thesis identifies algorithm with TM or an equivalent model. Kleene's normal-form theorem: every computable function is a bounded search around a primitive recursive predicate.

The arithmetic hierarchy classifies languages by alternating unbounded quantifiers over a decidable matrix. Sigma-1 is the r.e. sets. Decidable sets are Delta-1.

<ComparisonTable
  headers={['Kind', 'Always halt?', 'On no-instances', 'Example']}
  rows={[
    ['Decidable', 'Yes', 'Reject and halt', 'Is this DFA empty?'],
    ['Recognisable only', 'No', 'May loop', 'Does this TM halt?'],
    ['Not recognisable', 'N/A', 'No TM accepts exactly it', 'Does this TM loop?'],
    ['Computable function', 'Yes, with output', 'Total function', 'Addition'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# A computable decision procedure (even numbers)
def even(n):
    return n % 2 == 0

# A recogniser shape for search-for-a-witness
def recogniser(pred, start=0):
    n = start
    while True:
        if pred(n):
            return True
        n += 1
TICK3

If pred is never true, recogniser loops. That is the difference between recognise and decide.

## 4. Visualizations

TICK3mermaid
flowchart TB
    All[All languages] --> NotRE[Not recognisable]
    All --> RE[Recognisable]
    RE --> Dec[Decidable]
    RE --> OnlyRE[Recognisable minus decidable]
TICK3

## 5. Interview Prep

**Q: Computable versus decidable?**
**A:** Computable usually describes functions. Decidable describes languages. They are the same idea: a TM that always finishes with the answer.

**Q: State Rice's theorem.**
**A:** Any property that depends only on the function a program computes, and that some programs have and some do not, is undecidable. "Does this program compute the zero function?" is undecidable.

**Q: Why can type checkers still work?**
**A:** They decide a conservative property of syntax or of a restricted language, not arbitrary semantic properties of Turing-complete programs.

## 6. Production Use Cases

- **Static analysis** uses conservative computable over-approximations of uncomputable questions.
- **CI systems** should not try to decide this job will finish; they use timeouts.
- **Smart-contract and kernel DSLs** sometimes restrict the language so more properties become decidable.

<Callout icon="tip" title="Name the reduction">
When you claim a feature is impossible, show that if you had it you could decide HALT. That is the standard engineering use of computability.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Context-free grammars/index.mdx',
    title: 'Context-Free Grammars',
    description:
      'Rewrite systems whose productions replace one nonterminal at a time — the standard model for nested programming-language syntax.',
    body: `
A **context-free grammar** (CFG) generates a language by rewriting a start symbol using productions A -> alpha, where A is one nonterminal and alpha is any string of terminals and nonterminals. The rewrite does not look at the neighbours of A — that is the context-free part. Programming-language nesting (blocks, expressions, balanced delimiters) is the poster child.

## 1. Deep Dive and Mechanics

A CFG is a 4-tuple: terminals, nonterminals, productions, start symbol. A **derivation** replaces one nonterminal per step. The **parse tree** records which production was used at each node. If two trees exist for one string, the grammar is **ambiguous**.

**Normal forms.** Chomsky normal form (A -> BC or A -> a) feeds CYK. Greibach normal form feeds some top-down algorithms. Parser generators accept a wider syntax and compile to a deterministic subclass (LL, LALR).

**Limits.** The copy language a-n b-n c-n is not context-free. Cross-serial dependencies and regex-with-backreferences leave CFGs behind. Indentation-sensitive languages add a lexer-level stack.

<Callout icon="info" title="CFG versus the language">
Many grammars generate the same language. Parser writers pick the grammar that is unambiguous, deterministic, and maps onto a nice AST — not the smallest grammar.
</Callout>

## 2. Mathematical / Theoretical Foundation

The context-free languages are exactly the languages accepted by nondeterministic pushdown automata. They are closed under union, concatenation, and Kleene star, not under intersection or complement in general. The pumping lemma for CFLs is the usual non-membership proof.

Deterministic CFLs, accepted by deterministic PDAs, are a proper subclass and match what practical LR parsers want.

<ComparisonTable
  headers={['Device / grammar', 'Nesting memory', 'Example language', 'Parser']}
  rows={[
    ['Regular / DFA', 'None', 'a-star b-star', 'Lexer'],
    ['CFG / NPDA', 'One stack', 'balanced parens', 'Earley, CYK'],
    ['DCFL / DPDA', 'One stack, det.', 'typical code syntax', 'LL, LR'],
    ['CSG / LBA', 'Linear bound', 'a-n b-n c-n', 'Not used for syntax'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Expression CFG (ambiguous if + and * share one rule)
E -> E + E | E * E | ( E ) | id
# Unambiguous, precedence-encoded
E -> E + T | T
T -> T * F | F
F -> ( E ) | id
TICK3

The second grammar makes * bind tighter and both operators left-associative — the usual arithmetic convention.

## 4. Visualizations

TICK3mermaid
flowchart TD
    S[Start symbol E] --> P1[E plus T]
    S --> P2[T]
    P2 --> P3[T times F]
    P3 --> F1[id]
    P1 --> T2[T]
TICK3

## 5. Interview Prep

**Q: Why are programming languages context-free plus a bit?**
**A:** Nesting is CFG. Typed names, typedef versus multiply in C++, and indentation are extra-contextual. The CFG does the syntax; semantic analysis and lexer hacks do the rest.

**Q: How do you prove a language is not context-free?**
**A:** Pumping lemma or closure: if L intersect a regular language is not CF, then L is not CF. a-n b-n c-n is the standard example.

**Q: Ambiguous grammar versus ambiguous language?**
**A:** A language is inherently ambiguous if every CFG for it is ambiguous. Most programming languages are designed not to be; the spec picks one tree.

## 6. Production Use Cases

- **Parser generators** (bison, ANTLR, lalrpop) take a CFG-like spec.
- **Natural language** partial parses; full English is not a clean CFL.
- **Protocol grammars** where nested structure appears (not just regular tokens).

<Callout icon="tip" title="Encode precedence in the grammar or the parser">
Do one or the other. A single E -> E op E rule plus precedence declarations in yacc is fine. Doing neither yields a bush of shift/reduce conflicts.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Decidability/index.mdx',
    title: 'Decidability',
    description:
      'A language is decidable when some algorithm always halts with yes or no — the practical line between a checker you can ship and a problem you can only semi-solve.',
    body: `
A language L is **decidable** (recursive) when there is a Turing machine that, on every input, halts and correctly answers membership. If the machine may loop on no-instances, L is only **semi-decidable**. Decidability is the question: can I ship a checker that always returns?

## 1. Deep Dive and Mechanics

**How we prove decidable.** Exhibit an algorithm that tries finitely many things. Emptiness of a DFA: search the reachable-state graph. Equivalence of DFAs: minimise both, compare.

**How we prove undecidable.** Reduce from a known undecidable language, usually HALT or A_TM. Rice's theorem gives a factory of undecidable "does this program's language have property P?" results.

**Borderline.** CFG emptiness is decidable; CFG universality is not. True regular expressions are decidable for almost every property you want; adding backreferences blows that up.

<Callout icon="info" title="Decidable does not mean cheap">
Presburger arithmetic is decidable and not primitive recursive in the worst case. There is a procedure is a very low bar for a product feature.
</Callout>

## 2. Mathematical / Theoretical Foundation

The decidable languages are closed under complement, union, and intersection: run both machines, they halt, combine the answers. Recognisable languages are not closed under complement.

If L and its complement are both recognisable, then L is decidable: dovetail both recognisers; one will halt.

<ComparisonTable
  headers={['Problem', 'Model', 'Decidable?', 'Why']}
  rows={[
    ['Emptiness', 'DFA', 'Yes', 'Graph reachability'],
    ['Equivalence', 'DFA', 'Yes', 'Minimise and compare'],
    ['Emptiness', 'CFG', 'Yes', 'Reachable productive vars'],
    ['Equivalence', 'CFG', 'No', 'Reduce from universality'],
    ['Halting', 'TM', 'No', 'Diagonal or reduction'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Decidable: DFA emptiness via BFS on the state graph
def dfa_empty(start, accept, delta):
    seen = set([start])
    queue = [start]
    while queue:
        s = queue.pop(0)
        if s in accept:
            return False
        for t in delta.get(s, {}).values():
            if t not in seen:
                seen.add(t)
                queue.append(t)
    return True
TICK3

No TM simulation is required. The state set is finite, so BFS always finishes.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Q[Decision problem] --> Alg[Always-halting algorithm?]
    Alg -->|yes| Dec[Decidable]
    Alg -->|accept-only TM| Rec[Recognisable]
    Alg -->|reduction from HALT| Und[Undecidable]
TICK3

## 5. Interview Prep

**Q: Decidable versus recognisable?**
**A:** Decidable: always halt, yes or no. Recognisable: halt on yes, may loop on no. Complements of recognisable sets need not be recognisable.

**Q: Give one decidable and one undecidable compiler problem.**
**A:** Decidable: is this regex empty? Undecidable: do these two C programs compute the same function? (Rice).

**Q: Why is CFG equivalence undecidable but DFA equivalence easy?**
**A:** Two-stack or "two independent counts" phenomena appear in CFGs. Finite-state machines can be canonicalised; CFGs cannot.

## 6. Production Use Cases

- **Linters and type checkers** are designed to stay on the decidable side, even if that means incomplete.
- **Protocol validators** decide regular or simple CFG properties of messages.
- **CI policies** treat "will this job halt?" as undecidable and install a timeout.

<Callout icon="tip" title="Dovetailing is a real technique">
When you have a semi-decider for L and one for not-L, run them in round-robin. That is how some theorem provers search for a proof and a counter-model together.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Finite automata/index.mdx',
    title: 'Finite Automata (DFA & NFA)',
    description:
      'The weakest useful machines: a finite set of states, no extra memory, exactly the power of regular languages and of compiler lexers.',
    body: `
A **finite automaton** reads a string one symbol at a time and accepts if it ends in an accepting state. A **DFA** has one transition per state and symbol. An **NFA** may have several, or epsilon-moves. They recognise exactly the regular languages. That is why lexers, network ACLs, and many protocol scanners are DFAs in disguise.

## 1. Deep Dive and Mechanics

The machine is a finite set of states, an alphabet, a transition relation, a start state, and accept states. On input w it walks the unique DFA path, or some NFA path. Accept if any path (NFA) or the path (DFA) ends accepting.

**Subset construction.** Every NFA has an equivalent DFA whose states are sets of NFA states. The DFA can be exponentially larger (the classic a-or-b then a then anything of length n-1 example). In practice lex and grep keep the NFA or build the DFA lazily.

**Minimisation.** Hopcroft's algorithm computes the unique smallest DFA for a language. Two DFAs are equivalent iff their minimised forms are isomorphic.

<Callout icon="info" title="No counting to n for arbitrary n">
A DFA cannot remember an unbounded integer. a-n b-n is not regular. If you need a count that grows with the input, you need a stack or a heap.
</Callout>

## 2. Mathematical / Theoretical Foundation

Kleene's theorem: regular expressions, NFAs, and DFAs all denote the same class. Myhill-Nerode: a language is regular iff the indistinguishability relation on prefixes has finitely many classes. That theorem also gives the size of the minimal DFA.

Closure: regular languages are closed under union, concat, star, complement (flip DFA accept bits), and intersection (product automaton).

<ComparisonTable
  headers={['Machine', 'Transition', 'Can be exponentially smaller?', 'Typical use']}
  rows={[
    ['DFA', 'Unique', 'It is the expanded form', 'Lexers, hardware'],
    ['NFA', 'Many / epsilon', 'Yes versus DFA', 'Regex compile'],
    ['e-NFA', 'Plus epsilon', 'Yes', 'Thompson construction'],
    ['PDA', 'Plus stack', 'N/A', 'Parsers, not lexers'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def dfa_accept(start, accept, delta, text):
    s = start
    for ch in text:
        s = delta[s][ch]
    return s in accept

# DFA for a*b+
delta = {
    0: {'a': 0, 'b': 1},
    1: {'a': 2, 'b': 1},
    2: {'a': 2, 'b': 2},
}
print(dfa_accept(0, {1}, delta, 'aaab'))
print(dfa_accept(0, {1}, delta, 'aaa'))
TICK3

State 2 is a sink for strings that fell out of a-star b-plus.

## 4. Visualizations

TICK3mermaid
stateDiagram-v2
    [*] --> S0
    S0 --> S0: a
    S0 --> S1: b
    S1 --> S1: b
    S1 --> Sink: a
    Sink --> Sink: a,b
    S1 --> [*]
TICK3

## 5. Interview Prep

**Q: Why convert NFA to DFA?**
**A:** Simulation of an NFA needs a set of states per character (or backtracking). A DFA is one state per character — faster, bigger. Engines pick based on the pattern.

**Q: How do you prove a language is not regular?**
**A:** Pumping lemma, or Myhill-Nerode (infinitely many distinct prefixes), or closure (intersect with a regular language, get a known non-regular).

**Q: Are finite automata useful if we have TMs?**
**A:** Yes. Decision problems about DFAs are easy (emptiness, equivalence). The same questions about TMs are undecidable. Use the weakest machine.

## 6. Production Use Cases

- **Compiler lexers** generated by flex/re2c or written as switch-on-char DFAs.
- **Intrusion detection and packet filters** that compile rule sets to automata.
- **Input validation** (email-shaped strings, token formats) — with the caveat that "real email" is not a clean regular language.

<Callout icon="warning" title="Catastrophic backtracking is an NFA-engine bug">
Some regex engines explore NFA paths with backtracking and can go exponential on crafted input. Prefer linear-time automata engines for untrusted patterns.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Halting problem/index.mdx',
    title: 'Halting Problem',
    description:
      'The canonical undecidable problem: no algorithm can look at an arbitrary program and its input and always say whether that run finishes.',
    body: `
The **halting problem** asks: given a program P and an input x, does P halt on x? Turing showed that no algorithm answers this for every pair (P, x). It is the root reduction source for almost every "you cannot statically decide that" result in compilers and static analysis.

## 1. Deep Dive and Mechanics

Assume toward contradiction there is a decider HALT(P, x) that always returns true or false. Build a program DIAG that, on input Q, runs HALT(Q, Q) and then does the opposite: if HALT says Q halts on Q, DIAG loops; otherwise DIAG halts. Feed DIAG to itself. If HALT said DIAG-on-DIAG halts, DIAG loops, contradiction. If HALT said it loops, DIAG halts, contradiction. Therefore HALT does not exist.

**Recognisable, not decidable.** You can simulate P on x and accept if it ever stops. That recognises the halting set. It does not decide the complement: you will wait forever on a looper.

**Practical cousins.** "Will this CI job finish?", "does this template instantiation terminate?", "will this recursive type alias unfold?" are halt-shaped. Tools use timeouts, fuel, and restricted languages.

<Callout icon="warning" title="Special cases can still be decidable">
Halting for DFAs is trivial (no loops that depend on unbounded memory in the same way). Halting for programs that use only Presburger counters can be decidable. The theorem is about a Turing-complete encoding of all programs.
</Callout>

## 2. Mathematical / Theoretical Foundation

Let A_TM = pairs (M, w) such that TM M accepts w. A_TM is r.e.-complete. HALT (M eventually stops on w, accept or reject) is many-one equivalent to A_TM for standard encodings.

Rice's theorem generalises the idea: any nonempty proper subset of computable functions, asked as "does this program compute one of those?", is undecidable. Halting is the engine inside most proofs.

<ComparisonTable
  headers={['Problem', 'Decidable?', 'Recognisable?', 'Typical reduction']}
  rows={[
    ['HALT', 'No', 'Yes', 'Diagonalisation'],
    ['Complement of HALT', 'No', 'No', 'Closure of decidable'],
    ['A_TM', 'No', 'Yes', 'Simulate and accept'],
    ['DFA emptiness', 'Yes', 'Yes', 'Graph search'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# A recogniser, not a decider: simulate with a step budget
def halts_within(fn, arg, fuel):
    # In a real TM simulator you count transitions.
    # Here we just refuse to be a decider.
    try:
        return fn(arg, fuel)
    except RecursionError:
        return False

def hungry(n, fuel):
    if fuel <= 0:
        raise RecursionError('fuel')
    return hungry(n, fuel - 1) if n < 0 else True
TICK3

Raising fuel never yields a uniform decider. For any bound, a longer looper exists.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Assume[Assume HALT exists] --> Diag[Build DIAG that flips HALT on Q,Q]
    Diag --> Self[Run DIAG on DIAG]
    Self --> C1[HALT said halt so DIAG loops]
    Self --> C2[HALT said loop so DIAG halts]
    C1 --> Boom[Contradiction]
    C2 --> Boom
TICK3

## 5. Interview Prep

**Q: Sketch the proof in four sentences.**
**A:** Suppose a halt decider exists. Write a program that asks the decider about itself and then does the opposite. Self-application contradicts both answers. Therefore the decider does not exist.

**Q: If it is undecidable, why do sanitisers exist?**
**A:** They answer a different question: "I can prove it loops" or "I can prove it is safe," and otherwise say "unknown." Incomplete + sound is allowed. Complete + always-halt on all programs is not.

**Q: Does a timeout solve the halting problem?**
**A:** No. A timeout solves a resource-bounded problem (halts within T steps). That is decidable and not the same set.

## 6. Production Use Cases

- **Compiler termination** of macros, templates, and constexpr: fuel counters and recursion limits.
- **Static analysers** that never promise a yes/no on arbitrary loops.
- **Workflow engines** that treat "this human task will complete" as outside the algorithm.

<Callout icon="tip" title="Use HALT as a reduction source">
To show "will this optimiser terminate on all IR?" is undecidable, encode a TM into IR and ask whether a pass that simulates it returns. That is the usual paper pattern.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Pushdown automata/index.mdx',
    title: 'Pushdown Automata',
    description:
      'Finite control plus a stack: the machines that match context-free languages and explain why a parser can track unbounded nesting but not two independent counts.',
    body: `
A **pushdown automaton** (PDA) is a finite-state machine with an unbounded stack. On each input symbol (or on epsilon) it can push, pop, or replace the top of the stack and change state. Nondeterministic PDAs accept exactly the context-free languages. That is the machine-model reason parsers can handle nested brackets.

## 1. Deep Dive and Mechanics

A move is specified by current state, next input (or epsilon), and current top-of-stack. The instruction writes a (possibly empty) string of stack symbols and a next state. Acceptance is usually by empty stack, or by accept state, equivalently.

**Deterministic PDAs** (DPDA) are weaker. They match deterministic CFLs, the family LR parsers inhabit. Palindromes over a two-letter alphabet need nondeterminism (guess the middle).

**Why one stack.** Two stacks are already Turing-complete (they can simulate a TM tape). One stack can compare one nested or matched count (a-n b-n) but not two independent counts (a-n b-n c-n).

<Callout icon="info" title="The parse stack is a PDA">
Shift-reduce parsers are DPDAs: the stack holds states (and symbols), the input is tokens, reduce is a burst of pops plus a goto push. Recursive descent uses the call stack the same way.
</Callout>

## 2. Mathematical / Theoretical Foundation

CFG-to-PDA: the PDA guesses a leftmost derivation, pushing right-hand sides and matching terminals to the input. PDA-to-CFG: variables encode pairs of PDA states (entry, exit) that empty a stack symbol — the classic triple construction.

Pumping for CFLs follows from long paths in parse trees (or from stack height repeating). Closure: CFLs are not closed under complement or intersection; the intersection of two CFLs can be a-n b-n c-n.

<ComparisonTable
  headers={['Machine', 'Extra memory', 'Languages', 'Deterministic = nondet?']}
  rows={[
    ['DFA', 'None', 'Regular', 'Yes'],
    ['DPDA', 'One stack', 'DCFL', 'No, NPDA is bigger'],
    ['NPDA', 'One stack', 'CFL', 'Nondet is essential'],
    ['Two-stack / TM', 'Two stacks or tape', 'RE / computable', 'Nondet does not add more functions'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def pda_anbn(s):
    stack = []
    phase = 'a'
    for ch in s:
        if ch == 'a' and phase == 'a':
            stack.append('A')
        elif ch == 'b' and stack:
            phase = 'b'
            stack.pop()
        else:
            return False
    return phase == 'b' and not stack

print(pda_anbn('aaabbb'), pda_anbn('aaabb'))
TICK3

This DPDA accepts a-n b-n for n at least 1. It cannot be extended to also demand c-n with only one stack.

## 4. Visualizations

TICK3mermaid
flowchart LR
    In[Input tape] --> Ctrl[Finite control]
    Ctrl --> Stk[Stack push / pop]
    Stk --> Ctrl
    Ctrl --> Acc[Accept if stack empty]
TICK3

## 5. Interview Prep

**Q: Why can a parser handle nested XML but not a-n b-n c-n in the grammar alone?**
**A:** Nesting is one stack. Three independent equal counts need two comparisons. You can check the third count in a later semantic pass, which is extra-contextual.

**Q: PDA versus TM?**
**A:** A PDA's only memory is a stack (LIFO). A TM can move either way on a tape. Two stacks simulate a tape.

**Q: Empty-stack versus accept-state?**
**A:** Equivalent for NPDAs. Some textbook constructions prefer one or the other. DPDAs are more sensitive to the acceptance mode.

## 6. Production Use Cases

- **LR and LL parsers** as engineered DPDAs with a token lookahead.
- **HTML/XML well-formedness** (and JSON brace matching) as stack walks.
- **Call-stack thinking** in language VMs: each call is a push, each return a pop — a PDA if you ignore the heap.

<Callout icon="tip" title="If you need two stacks, you need a TM">
A feature that matches two independent nested structures at once is a red flag that a pure CFG/PDA frontend will not suffice.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Regular languages/index.mdx',
    title: 'Regular Languages',
    description:
      'The languages of finite automata and true regular expressions: closed, decidable, and exactly as powerful as a lexer — no unbounded nesting.',
    body: `
A **regular language** is a set of strings accepted by some DFA (equivalently, some NFA, equivalently, some regular expression). It is the smallest, best-behaved class in the Chomsky hierarchy. Compilers put the lexer here on purpose: tokenisation should be a linear scan with a finite amount of memory.

## 1. Deep Dive and Mechanics

Start from finite languages (any finite set is regular) and close under union, concatenation, and Kleene star — that is Kleene's original definition. DFAs give a machine view. Regular expressions give a notation view. They match.

**What is not regular.** a-n b-n, balanced parentheses of unbounded depth, and "the language of all palindromes" over a two-letter alphabet. If recognition needs an unbounded counter or a stack, it is past regular.

**Engineering regex versus math regex.** PCRE backreferences and lookaround are not regular. They can encode NP-hard matching and non-regular languages. A lexer should not use that dialect.

<Callout icon="warning" title="Star height and evil patterns">
Even true regular languages can have huge DFAs. And backtracking engines can take exponential time on a regular pattern. Linear-time automata matching is the safe default for untrusted input.
</Callout>

## 2. Mathematical / Theoretical Foundation

Myhill-Nerode: L is regular iff the relation "x and y have the same accepting continuations" has finitely many classes. The number of classes is the number of states in the minimal DFA.

Pumping lemma: every long enough word in a regular L splits as xyz with xy-k z still in L for all k. Use the contrapositive to prove non-regularity. It is necessary, not always sufficient — some non-regular languages still pump.

Decidability is excellent: emptiness, finiteness, equivalence, and inclusion are all decidable for DFAs.

<ComparisonTable
  headers={['Notation', 'Power', 'Decidable equivalence?', 'Use']}
  rows={[
    ['Math regex / DFA', 'Regular', 'Yes', 'Lexers, protocols'],
    ['PCRE-like regex', 'More than regular', 'No in general', 'Ad-hoc validation'],
    ['CFG', 'CFL', 'No', 'Parsers'],
    ['TM', 'RE languages', 'No', 'General programs'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import re

# A true regular token: identifiers
IDENT = re.compile(r'^[A-Za-z_][A-Za-z0-9_]*$')
print(bool(IDENT.match('foo_42')), bool(IDENT.match('12bad')))

# Not regular if you mean "same ident twice" with a backreference
# r'^(a+)\\1$' is not a regular language for arbitrary copies
TICK3

In the lexer, compile the union of token regexes to one DFA with a priority rule per accept state.

## 4. Visualizations

TICK3mermaid
flowchart LR
    RE[Regular expression] --> Th[Thompson NFA]
    Th --> Sub[Subset DFA]
    Sub --> Min[Minimise]
    Min --> Lex[Lexer tables]
TICK3

## 5. Interview Prep

**Q: Are all finite languages regular?**
**A:** Yes. Build a trie-like DFA, or write a giant union of the words. Infinite languages may or may not be regular.

**Q: Why can't a regex parse HTML?**
**A:** HTML (even a toy tag-nesting fragment) needs a stack. Regular languages cannot enforce unbounded matching close-tags. Use a parser.

**Q: What does Myhill-Nerode buy you that pumping does not?**
**A:** An exact characterisation and the size of the minimal DFA. Pumping only kills some non-regular candidates.

## 6. Production Use Cases

- **Lexers** and syntax highlighters.
- **Network and log scanners** compiled to DFA (RE2, Hyperscan).
- **Protocol state machines** that must stay finite-state for model checking.

<Callout icon="tip" title="Prefer RE2-style engines at the edge">
Google RE2 and similar libraries refuse backreferences and guarantee linear time. That is the regular-language contract enforced in code.
</Callout>
`,
  },
  {
    rel: '44.2 Theory of Computation/Turing machines/index.mdx',
    title: 'Turing Machines',
    description:
      'Finite control plus an infinite tape: the standard formal CPU, the definition of computable, and the yardstick for Turing completeness.',
    body: `
A **Turing machine** (TM) is a finite-state controller with a read/write head on an infinite tape of cells. At each step it reads a symbol, writes a symbol, moves left or right, and changes state. Turing introduced it in 1936 as a model of a human computer. It is still the default definition of "what an algorithm can do."

## 1. Deep Dive and Mechanics

A TM is a finite tuple: states, tape alphabet (including blank), input alphabet, transition function, start state, accept state, reject state. A **configuration** is (state, tape contents, head position). A run is a sequence of configurations. It may halt and accept, halt and reject, or run forever.

**Variants that do not change power.** Multi-tape, multi-head, two-way infinite tape, nondeterministic TMs (same computable functions; nondeterminism does change time classes). A RAM with unbounded addresses is equivalent up to polynomial time under standard encodings.

**Turing completeness.** A language or system is Turing complete if it can simulate a universal TM. Universal TMs take a description of M and an input w and simulate M on w — a stored-program computer.

<Callout icon="info" title="Infinite tape is a mathematical courtesy">
Every halting run uses only finitely many cells. The infinity means you do not have to declare a bound in advance. Real machines fail when they OOM; the TM would have asked for another cell.
</Callout>

## 2. Mathematical / Theoretical Foundation

The computable functions are those computed by some TM that always halts with the answer. The recognisable languages are those for which some TM accepts exactly the members (and may loop otherwise).

A universal TM U satisfies U(code(M), w) behaves like M(w). Existence of U plus diagonalisation yields the undecidability of the halting problem.

<ComparisonTable
  headers={['Model', 'Memory', 'Computes same functions?', 'Changes complexity?']}
  rows={[
    ['Single-tape TM', 'One tape', 'Yes, by definition', 'Baseline'],
    ['Multi-tape TM', 'Several tapes', 'Yes', 'Yes, often quadratic'],
    ['Nondeterministic TM', 'Tape + guesses', 'Yes for functions', 'Yes: NP vs P'],
    ['PDA', 'Stack only', 'No', 'Weaker class'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Tiny TM: increment a unary number 111 -> 1111, blank is '_'
# states: s (scan right), w (write one), halt
TRANS = {
    ('s', '1'): ('s', '1', 1),
    ('s', '_'): ('halt', '1', 0),
}

def run_tm(tape, start='s', max_steps=1000):
    tape = list(tape) + ['_']
    head, state, steps = 0, start, 0
    while state != 'halt' and steps < max_steps:
        key = (state, tape[head])
        if key not in TRANS:
            return ''.join(tape), state
        state, write, move = TRANS[key]
        tape[head] = write
        head = max(0, head + move)
        if head >= len(tape):
            tape.append('_')
        steps += 1
    return ''.join(tape).rstrip('_'), state

print(run_tm('111'))
TICK3

## 4. Visualizations

TICK3mermaid
flowchart LR
    Ctrl[Finite control] --> Head[Read / write head]
    Head --> Tape[Infinite tape cells]
    Tape --> Head
    Ctrl --> Halt[Accept, reject, or loop]
TICK3

## 5. Interview Prep

**Q: Why is a TM the definition of algorithm?**
**A:** Because every other reasonable model has been proved equivalent (Church-Turing thesis), and because the transition table is finite and fully explicit.

**Q: What is a universal TM?**
**A:** A single machine that takes an encoding of any other machine plus an input and simulates it. That is the theory of an interpreter, and of a stored-program CPU.

**Q: Turing complete versus useful?**
**A:** HTML is not Turing complete and is useful. C++ templates are Turing complete and that is a problem for compile-time termination. Completeness is power, not quality.

## 6. Production Use Cases

- **Semantics of languages and IR** are often given as abstract machines in the TM family (small-step).
- **Complexity** defines P, NP, PSPACE on TMs first, then claims robustness.
- **Accidental TMs** in configs, macros, and type systems — treat them as unbounded loops until proven otherwise.

<Callout icon="tip" title="Simulate with fuel">
Every practical TM simulator is a recogniser with a step cap. That is honest: you implemented HALT-within-T, not HALT.
</Callout>
`,
  },
]
