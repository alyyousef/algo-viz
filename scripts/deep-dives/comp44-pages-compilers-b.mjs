export const compilerPagesB = [
  {
    rel: '44.1 Compilers/LLVM/index.mdx',
    title: 'LLVM',
    description:
      'A reusable compiler infrastructure: typed SSA IR, a pass pipeline, and backends that many languages share instead of each writing their own optimiser.',
    body: `
**LLVM** is a toolkit, not a single compiler. Frontends emit **LLVM IR**. The optimiser rewrites that IR. Backends produce machine code for x86, ARM, RISC-V, GPUs, and more. Clang, rustc, Swift, Zig, Julia, and many GPU stacks sit on this shared middle and back end.

## 1. Deep Dive and Mechanics

**LLVM IR** is a typed SSA language you can write as text (.ll) or bitcode (.bc). Instructions include add, load, store, phi, call, and getelementptr. The type system used to have a generic pointer; newer IR is **opaque pointers** plus explicit types on the instruction.

**Pass managers.** The new pass manager runs module, function, and loop passes with analyses (dominators, AA) cached and invalidated. Inlining, InstCombine, GVN, LICM, and vectorization are the usual suspects.

**Codegen.** IR is lowered through SelectionDAG or GlobalISel to MachineIR, then register-allocated and emitted. ORC JIT APIs reuse the same backends in-process.

<Callout icon="info" title="LLVM is not only clang">
rustc, Swift, Julia, and MLIR-based compilers all produce LLVM IR (or lower to it). Clang is one frontend. Saying "compiled with LLVM" without naming the frontend is incomplete.
</Callout>

## 2. Mathematical / Theoretical Foundation

LLVM IR is an SSA CFG plus a memory model. Optimisations are rewrite rules that must preserve the LangRef semantics of **undefined behavior**, **poison**, and **undef**. That is why "the optimiser is buggy" is often "the frontend promised nsw on an add that C++ said could wrap."

Alias analysis answers whether two pointers may refer to the same object. It is conservative: "don't know" means "do not reorder." TBAA and scoped noalias add language facts.

<ComparisonTable
  headers={['Layer', 'Artifact', 'Who writes it', 'Who consumes it']}
  rows={[
    ['Frontend', 'LLVM IR', 'clang, rustc, swiftc', 'opt'],
    ['Middle end', 'Optimised IR', 'opt passes', 'llc / codegen'],
    ['Backend', 'Object / asm', 'llc, MC', 'linker'],
    ['MLIR', 'Dialect IR', 'ML / HPC compilers', 'LLVM or runtime'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
clang -S -emit-llvm -O0 add.c -o add.ll
opt -O2 add.ll -S -o add.opt.ll
llc -O2 add.opt.ll -o add.s

# In-process JIT (ORC) is the API behind lli and many embedders
lli add.opt.ll
TICK3

Read add.ll. The names, the phi nodes after you add a loop, and the attributes on the function tell you what the optimiser is allowed to do.

## 4. Visualizations

TICK3mermaid
flowchart LR
    FE[Language frontend] --> IR[LLVM IR]
    IR --> PM[Pass manager]
    PM --> OptIR[Optimised IR]
    OptIR --> GISel[ISel]
    GISel --> MC[MC emit]
    MC --> Obj[Object file]
    OptIR --> ORC[ORC JIT]
TICK3

## 5. Interview Prep

**Q: LLVM IR versus GCC GIMPLE?**
**A:** Same job: SSA mid-level IR. Different type systems, plugin APIs, and ecosystems. You cannot feed GIMPLE to llc.

**Q: What is bitcode stability?**
**A:** LLVM bitcode is **not** a long-term portable ABI. Apple ships a planned subset. Everyone else should treat .bc as a cache for the same LLVM version.

**Q: Why MLIR then?**
**A:** LLVM IR is a poor place to represent tensor layouts or GPU shared-memory tiles. MLIR keeps domain dialects and lowers toward LLVM IR at the edge.

## 6. Production Use Cases

- **OS and app toolchains** (Apple, Android NDK, Rust release builds).
- **JIT embedders** (Julia, some database engines, game tools) via ORC.
- **GPU and ML compilers** that exit through LLVM or a sibling backend.

<Callout icon="warning" title="Link the same LLVM version">
LTO bitcode from LLVM 17 will not reliably open in LLVM 19. Pin the compiler across the monorepo and CI images.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/LR parsing/index.mdx',
    title: 'LR Parsing (Bottom-Up)',
    description:
      'Shift-reduce parsing that builds a reverse rightmost derivation, the algorithm behind yacc, bison, and lalrpop and the reason left recursion is welcome.',
    body: `
**LR parsing** reads Left-to-right and builds a Reverse rightmost derivation. It is bottom-up: shift tokens onto a stack, and when the top matches a production's right-hand side, reduce to the left-hand side. LR(1) and its compressed cousins LALR(1) and SLR(1) power yacc, bison, happy, and lalrpop.

## 1. Deep Dive and Mechanics

The parser is a table-driven automaton. Each state is a set of **items** (a production with a dot marking how much of the right-hand side is seen). The next token plus the state choose **shift**, **reduce**, **accept**, or **error**.

**Conflicts.** Shift/reduce: the classic dangling-else. Reduce/reduce: the grammar is ambiguous or the table construction lost distinctions (LALR can merge states that LR(1) would keep). Precedence declarations (%left, %right) resolve the common expression conflicts without rewriting the grammar.

**GLR.** When the grammar is truly ambiguous (C++, some natural-language fragments), a GLR parser forks the stack and continues. That is slower but can accept the union of LR languages plus ambiguity.

<Callout icon="tip" title="Left recursion is a feature">
E -> E + T | T is natural LR and gives left-associative trees. The same grammar is poison for naive LL. Prefer LR or a Pratt parser for expression-heavy languages.
</Callout>

## 2. Mathematical / Theoretical Foundation

An LR(1) item is a triple (production, dot position, lookahead). The closure and goto operations build a DFA whose language is viable prefixes of right sentential forms. The parse table is that DFA plus reduce actions keyed by lookahead.

LR(1) is the most powerful deterministic context-free class in common use. LALR(1) merges states with the same core items, shrinking tables, and may introduce reduce/reduce conflicts that full LR(1) would not have.

<ComparisonTable
  headers={['Table', 'Power', 'Table size', 'Used by']}
  rows={[
    ['SLR(1)', 'Weakest common', 'Small', 'Teaching'],
    ['LALR(1)', 'Most yacc grammars', 'Small', 'bison, many generators'],
    ['LR(1)', 'Strongest classic', 'Large', 'IELR, some modern gens'],
    ['GLR', 'Ambiguous CFGs', 'Forks stacks', 'Elkhound, some C++'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Conceptual bison-like grammar (not a full project)
expr
    : expr '+' term   { /* reduce: left-assoc add */ }
    | term
    ;
term
    : NUMBER
    | '(' expr ')'
    ;
TICK3

Shift NUMBER, reduce to term, reduce to expr, shift +, shift NUMBER, reduce, reduce. The stack holds states, not only symbols.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Tok[Next token] --> Act[Action table]
    Act -->|shift| Stk[Push state]
    Act -->|reduce| Red[Pop RHS, push LHS]
    Red --> Goto[Goto table]
    Goto --> Stk
    Act -->|accept| Done[Parse tree]
TICK3

## 5. Interview Prep

**Q: Shift/reduce versus reduce/reduce?**
**A:** Shift/reduce is often resolved with precedence (dangling else: prefer shift). Reduce/reduce usually means the grammar is ambiguous or LALR merged too much; fix the grammar.

**Q: Why do textbooks still teach LR if everyone writes recursive descent?**
**A:** RD is nicer for diagnostics. LR is nicer for expressions and for generated parsers. Senior compiler interviews expect both, plus when to pick each.

**Q: Is JSON LR(1)?**
**A:** Yes, easily. So is a typical arithmetic grammar. C++ is not a clean LALR(1) story.

## 6. Production Use Cases

- **Language tools** generated from bison/lalrpop grammars (Ruby MRI parse.y historically, many query engines).
- **Protocol and config parsers** where a grammar file is the spec.
- **IDE incremental parsers** sometimes use GLR or error-tolerant LR variants.

<Callout icon="warning" title="Generated parsers still need a hand-written lexer">
yacc does not solve string escapes, layout rules, or the C++ lexer hack. Budget time for the tokenizer.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Lexers/index.mdx',
    title: 'Lexical Analysis (Lexing)',
    description:
      'The first compiler phase: a DFA walks characters and emits tokens, dropping whitespace and comments so the parser sees words, not bytes.',
    body: `
A **lexer** (scanner) turns a character stream into a token stream. TICK1let x = 10;TICK1 becomes something like KEYWORD(let), IDENT(x), EQ, NUMBER(10), SEMI. Spaces and comments disappear unless a formatter asked to keep them as trivia.

## 1. Deep Dive and Mechanics

The lexer keeps a cursor and a state. It peeks at the next character, follows a transition, and when it hits an accepting state it emits a token and restarts. Longest-match (maximal munch) is the usual rule: TICK1==TICK1 is one EQEQ, not two EQ. Keywords are identifiers that hit a reserved-word table.

**Hand-written versus generated.** Clang and rustc write the lexer by hand for speed and diagnostics. lex/flex and re2c generate tables from regular definitions.

**Ugly cases.** Nested comments (not regular if truly nested). Python indent/dedent (a stack, not a DFA). C++'s lexer hack (the token kind of an identifier depends on the symbol table). Raw strings and heredocs with custom delimiters.

<Callout icon="tip" title="Keep source locations on every token">
Line, column, and byte offset are not optional. Every later diagnostic, source map, and IDE highlight is a span on a token or AST node.
</Callout>

## 2. Mathematical / Theoretical Foundation

Token patterns are **regular languages**. A regular expression compiles to an NFA (Thompson), then a DFA (subset construction), then a minimised DFA (Hopcroft). Lexing is O(n) in the input length for a fixed DFA.

Nested comments of unbounded depth are **not** regular; they need a counter (a CFG or a small PDA). That is why TICK1/* ... */TICK1 in C is specified as non-nested, keeping the lexer regular.

<ComparisonTable
  headers={['Input slice', 'Lexer decision', 'Token', 'Note']}
  rows={[
    ['let', 'Ident then keyword table', 'KEYWORD', 'Reserved word'],
    ['x', 'Ident', 'IDENT', 'Payload is the spelling'],
    ['10', 'Digit run', 'NUMBER', 'Parse later or here'],
    ['// to newline', 'Skip', 'none', 'Or keep as trivia'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import re

TOKEN = re.compile(
    r'\s+|//.*?$|(?P<num>\d+)|(?P<id>[A-Za-z_]\w*)|(?P<eq>==)|(?P<op>[=+;])',
    re.M,
)
KEYWORDS = {'let', 'if', 'else'}

def lex(src):
    tokens = []
    for m in TOKEN.finditer(src):
        if m.group('num'):
            tokens.append(('NUMBER', int(m.group('num'))))
        elif m.group('id'):
            name = m.group('id')
            kind = 'KEYWORD' if name in KEYWORDS else 'IDENT'
            tokens.append((kind, name))
        elif m.group('eq'):
            tokens.append(('EQEQ', '=='))
        elif m.group('op'):
            tokens.append((m.group('op'), m.group('op')))
    return tokens

print(lex('let x = 10;'))
TICK3

Production lexers avoid backtracking regex and use an explicit state machine so errors can say "invalid character U+0007 at 12:3."

## 4. Visualizations

TICK3mermaid
flowchart LR
    Ch[Characters] --> DFA[Lexer DFA]
    DFA --> Tok[Token stream]
    DFA --> Skip[Whitespace and comments]
    Tok --> Par[Parser]
TICK3

## 5. Interview Prep

**Q: Why not let the parser read characters?**
**A:** You would mix regular work with context-free work and make error messages worse. The split is the first example of "use the weakest machine that works."

**Q: Longest match versus priority?**
**A:** Longest match first (foo12 is one ident). If two patterns match the same span, the rule listed first in the spec wins (keyword versus ident is often handled after the ident match).

**Q: Is lexing decidable in linear time?**
**A:** For a fixed regular token set, yes. If token class depends on arbitrary parse state (lexer hack), you have coupled the phases.

## 6. Production Use Cases

- **Every compiler and interpreter** starts here.
- **Syntax highlighters** often use a cheaper lexer-only grammar (TextMate, tree-sitter has a real parser).
- **Secret scanners and linters** tokenize before they look at structure.

<Callout icon="warning" title="Unicode is part of the spec">
Identifier sets, BOM, and CRLF versus LF must be defined. A lexer that assumes ASCII will mis-split real-world source.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Linking/index.mdx',
    title: 'Linking',
    description:
      'The step that combines object files and libraries, resolves symbols, applies relocations, and writes an executable or shared library.',
    body: `
**Linking** takes relocatable object files and produces an executable, a shared library, or another object. Each .o still has holes: call foo is a relocation toward a symbol the compiler did not define in that file. The linker assigns final addresses, patches those holes, and pulls in archive members that satisfy undefined symbols.

## 1. Deep Dive and Mechanics

**Symbols.** Defined or undefined, local or global, strong or weak. Two strong definitions of the same global is a multiple-definition error. Weak symbols and COMDAT groups (C++ inline, templates) let duplicates collapse.

**Relocations.** Architecture-specific records: "add the final address of bar plus addend into this 32-bit field." PIC uses relative relocations so a DSO can load anywhere.

**Static versus dynamic.** Static linking copies library code into the binary. Dynamic linking records NEEDED libraries and leaves relocations for the loader (ld.so) to finish. Windows (PE), macOS (Mach-O), and Linux (ELF) differ in details but not in the idea.

**LTO.** If objects contain IR, the linker may invoke the compiler again before the final address assignment.

<Callout icon="warning" title="Link order still surprises people">
Traditional Unix archives are scanned once, left to right. If libA needs a symbol from libB, write -lA -lB, not the reverse. --start-group or --whole-archive is the escape hatch, not the default.
</Callout>

## 2. Mathematical / Theoretical Foundation

Think of each object as a graph node whose outgoing edges are undefined symbols and incoming edges are defined symbols. Linking is a closure: start from the entry (or from all .o on the command line) and include archive members that resolve an edge, until a fixpoint.

Address assignment is a layout problem under alignment constraints. Relocation is evaluation of a small linear expression (symbol + addend - origin) written into a field of limited width; overflow is a link error (jump too far, need a stub).

<ComparisonTable
  headers={['Mode', 'When addresses bind', 'Binary size', 'Patch story']}
  rows={[
    ['Static', 'Link time', 'Larger', 'Rebuild to update a lib'],
    ['Dynamic', 'Load / first call', 'Smaller text', 'Replace the .so/.dll'],
    ['LTO static', 'Link-time compile', 'Can shrink', 'Same as static'],
    ['Relocatable ld -r', 'Partial', 'Still an .o', 'Later final link'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
cc -c a.c b.c
cc -o app a.o b.o -L. -lutil
ldd ./app
readelf -s a.o | head
nm a.o

# Shared library
cc -fPIC -shared -o libutil.so util.c
cc -o app a.o -L. -lutil -Wl,-rpath,$ORIGIN
TICK3

Use TICK1nmTICK1, TICK1readelfTICK1, TICK1dumpbinTICK1, or TICK1otoolTICK1 before you guess why a symbol is missing.

## 4. Visualizations

TICK3mermaid
flowchart TD
    O1[a.o] --> Ld[Linker]
    O2[b.o] --> Ld
    Ar[libutil.a or .so] --> Ld
    Ld --> Res[Resolve symbols]
    Res --> Rel[Apply relocations]
    Rel --> Out[ELF / Mach-O / PE]
TICK3

## 5. Interview Prep

**Q: Linker versus loader?**
**A:** The linker runs at build time (or at LTO time). The dynamic loader runs when the process starts and performs remaining relocations, symbol interposition, and library search.

**Q: What is a relocation?**
**A:** A note in the object file that a field cannot be filled until a symbol has an address. The linker or loader writes the address.

**Q: Why -fPIC for shared libraries?**
**A:** The library may load at a different base. Position-independent code uses relative addressing and a GOT/PLT so text pages stay shareable and reloc-light.

## 6. Production Use Cases

- **Every native build** (C/C++/Rust/Go) ends in a link, even if rustc hides ld.
- **Plugin systems** that dlopen a DSO with a known exported symbol.
- **Hermetic builds** that pin linker (bfd, gold, lld, mold) and flags for reproducibility.

<Callout icon="info" title="lld and mold are drop-in speedups">
For large C++ links, switching from bfd ld to lld or mold can cut minutes to seconds. Keep a compatibility job if you rely on GNU-only linker scripts.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Optimisation passes/index.mdx',
    title: 'Optimization Passes',
    description:
      'IR-to-IR rewrites — inlining, constant folding, DCE, GVN, LICM — that preserve semantics while cutting work the CPU would have done.',
    body: `
An **optimisation pass** reads IR and writes better IR. "Better" usually means fewer instructions, fewer loads, more vector-friendly loops, or better inlining decisions — without changing what a well-defined program does. Compilers run dozens of passes in a pipeline because each pass creates opportunities for the next.

## 1. Deep Dive and Mechanics

**Local.** Constant folding, algebraic identities, peepholes. **Global.** Dead code elimination, sparse conditional constant propagation, GVN/PRE. **Loop.** LICM, unrolling, vectorization, strength reduction. **Interprocedural.** Inlining, IPO constant prop, devirtualization.

**Order matters.** DCE after inlining deletes now-dead formals. InstCombine after GVN shrinks what GVN made redundant. Pass managers rerun some passes to a fixpoint under a budget.

**Correctness.** A pass must respect the IR spec: memory aliasing, unwind edges, volatile, atomics, and language UB. Fast-math flags and restrict/noalias are extra axioms the frontend opted into.

<Callout icon="warning" title="Undefined behavior is optimiser fuel">
If C says signed overflow is UB, the pass may assume it never happens and delete an overflow check you thought you wrote. Sanitizers exist because those assumptions are sharp.
</Callout>

## 2. Mathematical / Theoretical Foundation

Many scalar passes are monotone dataflow or e-graph style rewriting. DCE is liveness: a value is dead if it is never used on any path that has a side effect. GVN hashes expressions; congruent values can share a name.

Inlining is a search problem: each call site is a candidate; the cost model estimates code-size and a heuristic benefit. NP-hard in general; compilers use greedy budgets.

Phase ordering is also hard: no linear order of passes is optimal for all programs. That is why pipelines are tuned on huge benchmark sets, not proved optimal.

<ComparisonTable
  headers={['Pass', 'What it does', 'Depends on', 'Risk if wrong']}
  rows={[
    ['InstCombine / fold', 'Local rewrite', 'Wrap flags', 'Wrong value'],
    ['DCE', 'Drop unused', 'Side-effect model', 'Drop a store'],
    ['LICM', 'Hoist from loops', 'Alias + throw', 'Hoist a trap'],
    ['Inline', 'Copy callee in', 'Cost model', 'Size blowup'],
  ]}
/>

## 3. Real-World Implementation

TICK3llvm
; Before SCCP + DCE
define i32 @f() {
  %a = add i32 2, 3
  %b = mul i32 %a, 1
  ret i32 %b
}

; After:  ret i32 5
TICK3

On the command line: TICK1opt -passes=mem2reg,instcombine,dceTICK1. mem2reg first, because SSA names unlock everything else.

## 4. Visualizations

TICK3mermaid
flowchart LR
    IR[Raw IR] --> Mem[mem2reg / SSA]
    Mem --> Inline[Inline]
    Inline --> SCCP[SCCP]
    SCCP --> GVN[GVN]
    GVN --> Loop[Loop opts]
    Loop --> DCE[DCE]
    DCE --> Out[Leaner IR]
TICK3

## 5. Interview Prep

**Q: Name three must-have passes and why.**
**A:** mem2reg (SSA), inlining (exposes context), and DCE (cleans up). Almost every other win depends on those.

**Q: Why can -O3 be slower than -O2?**
**A:** Over-unrolling and over-inlining blow the I-cache. Vectorization can also pessimize tiny trip counts. Measure.

**Q: What is a pass manager?**
**A:** The scheduler for analyses and transforms. It knows that instcombine invalidates some analyses and that dominators can be reused until a CFG edit.

## 6. Production Use Cases

- **Release builds** of C++, Rust, and Swift are "the pass pipeline on a time budget."
- **LTO** runs interprocedural passes on the merged IR of many crates or TUs.
- **GPU compilers** add passes for occupancy, shared-memory promotion, and predication.

<Callout icon="tip" title="Debug opts with before/after IR">
When a pass "breaks" a program, dump IR before and after that pass. Either the frontend lied about flags, or you found a real compiler bug — both happen.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Parsing/index.mdx',
    title: 'Parsing (Syntax Analysis)',
    description:
      'The second compiler phase: consume tokens, apply a grammar, and build a tree — or emit a syntax error with a useful recovery point.',
    body: `
**Parsing** decides whether a token stream belongs to the language and, if so, how it is structured. The output is a parse tree or AST. The input is the lexer. The contract is a grammar: context-free for most programming languages, with extra side conditions (indentation, type-driven disambiguation) that leak out of pure CFGs.

## 1. Deep Dive and Mechanics

A parser is either **top-down** (expand the start symbol, recursive descent, LL) or **bottom-up** (shift-reduce, LR). Both can be hand-written or generated. Production C++ and Rust parsers are hand-written for error quality; many query languages and DSLs are generated.

**Error recovery.** Panic-mode skips to a synchronising token. Phrase-level repair invents or deletes a token. IDEs need an incremental, error-tolerant parse so a missing paren does not blank the whole file's highlighting.

**Ambiguity.** If two trees exist, the language spec must pick (dangling else, C++ most-vexing parse). The parser implements that policy with precedence, extra lookahead, or a semantic predicate.

<Callout icon="info" title="Syntax is not meaning">
A parse can succeed and the program can still be illegal: undeclared names, type errors, break outside a loop. That is semantic analysis, the next phase.
</Callout>

## 2. Mathematical / Theoretical Foundation

The language of balanced parentheses is context-free, not regular. Most programming-language syntax is designed to be deterministic context-free (LL or LR) so parsing is linear. Full CFG recognition can be cubic (CYK, Earley) and is used for ambiguous or natural-language-like inputs.

A derivation is a sequence of production rewrites. The parse tree is that derivation drawn as a tree. Ambiguity means two distinct leftmost (or rightmost) derivations for one string.

<ComparisonTable
  headers={['Algorithm', 'Class', 'Time', 'Use']}
  rows={[
    ['Recursive descent / LL', 'LL(k)', 'Linear', 'Hand-written frontends'],
    ['LALR / LR', 'Deterministic CFG', 'Linear', 'yacc family'],
    ['Earley / GLR', 'All CFGs', 'Cubic worst', 'Ambiguous grammars'],
    ['Packrat PEG', 'PEG, not CFG', 'Linear with memo', 'Parser combinators'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Pratt / precedence-climbing sketch for + and *
PRECEDENCE = {'+': 10, '*': 20}

def parse_expr(tokens, min_prec=0):
    token, *rest = tokens
    left, tokens = token, rest  # assume numbers already
    while tokens and tokens[0] in PRECEDENCE and PRECEDENCE[tokens[0]] >= min_prec:
        op = tokens[0]
        prec = PRECEDENCE[op]
        rhs, tokens = parse_expr(tokens[1:], prec + 1)
        left = (op, left, rhs)
    return left, tokens
TICK3

Pratt parsers are the usual way hand-written frontends handle expressions without a huge cascade of parse_additive / parse_multiplicative functions.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Tok[Tokens] --> Pred[Predict or shift]
    Pred --> Tree[Grow AST]
    Pred --> Err[Syntax error]
    Err --> Sync[Recover at sync token]
    Sync --> Pred
    Tree --> Sem[Semantic analysis]
TICK3

## 5. Interview Prep

**Q: Lexer versus parser?**
**A:** Lexer: regular patterns, tokens. Parser: nested structure, grammar. Do not use regex to "parse" HTML or C++.

**Q: Why is parsing not enough to compile?**
**A:** Names, types, definite assignment, and borrow rules are not in the CFG. You need symbol tables and a type checker.

**Q: What makes a good syntax error?**
**A:** A single primary span, a likely fix, and continued parse so the user sees the next real mistake, not a cascade.

## 6. Production Use Cases

- **Compilers and interpreters** for every general-purpose language.
- **tree-sitter** grammars inside editors for incremental highlighting.
- **SQL engines** parse then bind and plan; the parse tree is the first IR.

<Callout icon="tip" title="Write tests as source files, not only unit trees">
Keep a corpus of programs that must parse and a corpus that must fail with a stable message. Parser refactors break both silently.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Recursive descent/index.mdx',
    title: 'Recursive Descent Parsing',
    description:
      'One function per nonterminal, each looking at the next tokens and calling the functions for the symbols it expects — the usual hand-written parser.',
    body: `
**Recursive descent** implements a grammar as mutually recursive functions. parse_stmt looks at the next token, then calls parse_expr or parse_block. The call stack **is** the parser stack. Clang, rustc, tsc, and Go's parser are all recursive descent with extra lookahead and recovery.

## 1. Deep Dive and Mechanics

Each function consumes tokens through a shared cursor. It fails by returning an error or by recording a diagnostic and skipping to a sync point. Optional constructs are if-peek-then-parse. Repeated constructs are while-peek.

**Expressions.** A naive function-per-precedence-level works (parse_or, parse_and, parse_eq, ...) and maps to a precedence table. Pratt parsing is the compact form of the same idea.

**Why hand-write.** You control messages, you can mix in semantic predicates (is this ident a type?), and you can parse incrementally. Generated LL/LR is faster to start and harder to make feel native in an IDE.

<Callout icon="warning" title="Watch the call stack on left recursion">
A function that immediately calls itself with the same cursor will recurse until the process dies. Rewrite left recursion or use an explicit loop for left-associative operators.
</Callout>

## 2. Mathematical / Theoretical Foundation

Recursive descent with one token of lookahead implements LL(1) if each function's branches have disjoint FIRST sets. With arbitrary peeking and backtracking it can accept more, at the cost of exponential time unless you memoize (packrat).

The correspondence is mechanical: a production A -> B C becomes a call to parse_B then parse_C. A production A -> a becomes "expect token a." Alternatives become a switch on peek.

<ComparisonTable
  headers={['Style', 'Lookahead', 'Left recursion', 'Diagnostics', 'Where']}
  rows={[
    ['Pure LL(1) RD', '1', 'Forbidden', 'Good if you invest', 'Teaching, DSLs'],
    ['RD + Pratt', '1 + binding power', 'Loops for ops', 'Excellent', 'Most languages'],
    ['RD + backtrack', 'Unbounded', 'Dangerous', 'Can be muddy', 'C++ tentative parse'],
    ['Generated LALR', '1', 'OK', 'Often generic', 'bison grammars'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.i = 0

    def peek(self):
        return self.tokens[self.i] if self.i < len(self.tokens) else None

    def eat(self, kind):
        tok = self.peek()
        if tok != kind:
            raise SyntaxError(f'expected {kind} got {tok}')
        self.i += 1

    def parse_stmt(self):
        if self.peek() == 'let':
            self.eat('let')
            self.eat('ident')
            self.eat('=')
            self.parse_expr()
            self.eat(';')
            return
        raise SyntaxError('expected statement')

    def parse_expr(self):
        self.eat('number')
TICK3

Add a real token type (kind, spelling, span) before this leaves a toy.

## 4. Visualizations

TICK3mermaid
flowchart TD
    PS[parse_stmt] --> Peek[peek token]
    Peek -->|let| Let[parse let-decl]
    Peek -->|if| If[parse if]
    Let --> PE[parse_expr]
    If --> PE
    PE --> PT[parse_term]
    PT --> PF[parse_factor]
TICK3

## 5. Interview Prep

**Q: Recursive descent versus table-driven LL?**
**A:** Same family. RD is code you can step through in a debugger. Tables are smaller to generate from a grammar file and easier to prove LL(1).

**Q: How do you parse binary operators without left recursion?**
**A:** Loop: parse a tighter operand, while the next operator has high enough precedence, consume it and parse the right-hand side. That is Pratt / precedence climbing.

**Q: How do production parsers recover?**
**A:** Emit an error, skip tokens until a token in the FOLLOW set of the current construct (semicolon, end of block), then continue so one typo does not hide the rest.

## 6. Production Use Cases

- **Industrial language frontends** that care about diagnostics (Clang, rustc, javac).
- **Config loaders** (TOML, custom DSL) where a 200-line RD parser beats a generator.
- **REPLs** that parse incomplete input and ask for the next line.

<Callout icon="tip" title="Thread spans through every return">
If parse_expr returns only a value and not a span, you will rewrite the parser when you add errors. Return a node with a source range from day one.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Semantic analysis/index.mdx',
    title: 'Semantic Analysis',
    description:
      'Name binding, type checking, and language rules that a valid parse tree can still fail — the phase that turns syntax into a typed, scoped program.',
    body: `
**Semantic analysis** is everything the grammar cannot say. The parser accepted the tokens. Now the compiler asks: does this name exist? Does this call match a function? Is this return type right? Is this break inside a loop? Only after those checks is the AST safe to lower to IR.

## 1. Deep Dive and Mechanics

**Symbol tables / scopes.** A stack of maps from names to declarations. Entering a block pushes a scope; leaving pops. Imports and modules add more namespaces. Shadowing rules are language policy.

**Type checking.** Bidirectional systems synthesise a type from an expression or check an expression against an expected type. Overload resolution and generics instantiate schemes. Rust's borrow checker and TypeScript's control-flow narrowing are extra semantic passes on top of types.

**Definite assignment, exhaustiveness, purity.** Languages pile on analyses that are still "static semantics" even if they are not Hindley-Milner.

<Callout icon="info" title="Syntax OK, program illegal">
int x = "hi"; parses in many C-like grammars if the grammar does not embed types. The type checker is the phase that rejects it. Interviews love this split.
</Callout>

## 2. Mathematical / Theoretical Foundation

Name binding is a map from use sites to declaration sites, usually modeled with environments (gamma). A typing judgment gamma |- e : T means expression e has type T under that environment.

Hindley-Milner inference is unification plus let-generalisation. Bidirectional typing (check versus infer) scales better to subtyping and implicits. Soundness: if the checker says T, evaluation should not get stuck (progress and preservation).

<ComparisonTable
  headers={['Check', 'Question', 'Failure mode', 'Example']}
  rows={[
    ['Resolve', 'Which decl is this name?', 'undeclared / ambiguous', 'Unknown ident'],
    ['Type', 'Do the types fit?', 'mismatch', 'string + array'],
    ['Flow', 'Is this reachable / assigned?', 'use before init', 'Java DA'],
    ['Effect / borrow', 'Is this use allowed?', 'alias / race / move', 'Rust, Swift'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def check(node, env):
    kind = node[0]
    if kind == 'num':
        return 'int'
    if kind == 'var':
        if node[1] not in env:
            raise TypeError(f'undeclared {node[1]}')
        return env[node[1]]
    if kind == 'add':
        lt = check(node[1], env)
        rt = check(node[2], env)
        if lt != 'int' or rt != 'int':
            raise TypeError('add expects int')
        return 'int'
    if kind == 'let':
        name, value, body = node[1], node[2], node[3]
        child = dict(env)
        child[name] = check(value, env)
        return check(body, child)
    raise TypeError(kind)
TICK3

Real checkers attach the computed type to the AST node so later IR lowering does not re-infer.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Ast[AST] --> Bind[Name resolution]
    Bind --> Tab[Symbol table]
    Tab --> Ty[Type check]
    Ty --> Extra[Borrows, DA, exhaustiveness]
    Extra --> Typed[Typed AST]
    Typed --> IR[IR lowering]
TICK3

## 5. Interview Prep

**Q: Why not encode types in the grammar?**
**A:** Types depend on declarations that may appear later, on imports, and on inference. A CFG cannot look up a user-defined class name without a symbol table.

**Q: What is a type environment?**
**A:** The map of in-scope names to types (and sometimes mutability, linearity, or nullness). Checking a lambda extends the environment with the parameter.

**Q: Semantic versus syntactic errors — give one each.**
**A:** Missing paren: syntax. Calling a string: semantic. Both should have spans.

## 6. Production Use Cases

- **Every statically typed compiler** (javac, rustc, Swift, Go, C++ Sema).
- **IDEs** run the same resolution and types for hover and completion.
- **Bytecode verifiers** redo a slice of semantic checks on untrusted IR.

<Callout icon="tip" title="Keep resolution deterministic">
If two imports can bind the same name, error. Implicit fallback to "any" or to a global is how codebases become unsearchable.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Virtual machines/index.mdx',
    title: 'Virtual Machines (Language Level)',
    description:
      'Process-level runtimes that execute bytecode, manage memory, and host JITs — JVM, CLR, BEAM, WASM engines — not hardware hypervisors.',
    body: `
A **language virtual machine** is a process that implements a stable execution model for a language or a family of languages. It loads bytecode (or WASM), verifies it, interprets or JITs it, and provides GC, threads, and a standard library. It is not a hypervisor and not a whole guest OS.

## 1. Deep Dive and Mechanics

**Load and verify.** Classloaders (JVM) or assemblies (CLR) resolve symbolic references. A verifier checks stack maps and types so the interpreter can trust the code.

**Execute.** Interpreter loop, JIT tiers, and sometimes AOT caches (CDS, ReadyToRun, WASM compiled once).

**Services.** Garbage collection, exception unwinding, reflection, JIT deopt, and a foreign-function interface. The VM is an operating system for managed code.

**Isolation.** WASM instances and JVM security managers (legacy) try to sandbox untrusted modules. Today the practical sandbox is often a process plus WASM, not a bytecode verifier alone.

<Callout icon="info" title="VM versus interpreter versus runtime">
People say "the Python VM" for CPython's bytecode loop, "the JVM" for a full managed platform, and "the JS runtime" for V8 plus libuv. The shared idea is: portable program + host that defines memory and calls.
</Callout>

## 2. Mathematical / Theoretical Foundation

A VM is an abstract machine: a state (heap, stacks, pc) and a step relation given by the opcode spec (JVM spec, ECMA-335, WASM Core). Verification is a type system for that machine.

GC is a graph reachability problem on the heap. JIT compilation is a semantics-preserving translation from the abstract machine to a concrete ISA, with deopt as the escape hatch.

<ComparisonTable
  headers={['VM', 'Deploy artifact', 'Memory', 'Notable']}
  rows={[
    ['JVM', 'class / JAR', 'GC', 'Huge language family'],
    ['CLR', 'IL assemblies', 'GC', 'C# and friends'],
    ['CPython', 'pyc / source', 'RC + GC', 'C API ecosystem'],
    ['WASM engine', 'wasm module', 'Linear memory', 'Sandbox + polyglot'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
class Frame:
    def __init__(self, locals_n):
        self.locals = [None] * locals_n
        self.stack = []

class TinyVM:
    def run(self, code, consts):
        fr = Frame(8)
        pc = 0
        while pc < len(code):
            op, *args = code[pc]
            pc += 1
            if op == 'const':
                fr.stack.append(consts[args[0]])
            elif op == 'add':
                fr.stack.append(fr.stack.pop() + fr.stack.pop())
            elif op == 'ret':
                return fr.stack.pop()
        raise RuntimeError('fell off end')
TICK3

A real VM adds a heap, a call stack of frames, and a trap story for every illegal operation.

## 4. Visualizations

TICK3mermaid
flowchart TD
    File[Bytecode module] --> Load[Loader]
    Load --> Ver[Verifier]
    Ver --> Heap[Heap and GC]
    Ver --> Exec[Interpreter or JIT]
    Exec --> Native[Host OS / CPU]
    Exec --> FFI[Native libs]
TICK3

## 5. Interview Prep

**Q: Language VM versus OS VM (hypervisor)?**
**A:** A language VM virtualises an ISA invented for the language. A hypervisor virtualises a real machine ISA and runs a guest kernel. Different threat models, different artifacts.

**Q: Why do VMs still use bytecode instead of shipping LLVM IR?**
**A:** Bytecode is stable, verifiable, and small. LLVM IR is a compiler IR that changes and is not a security boundary.

**Q: What does "write once, run anywhere" actually require?**
**A:** A specified abstract machine, a specified library, and a loader that hides the OS. The moment you call native code, the promise shrinks.

## 6. Production Use Cases

- **Server-side Java/.NET** with multi-hour JIT warmup and GC tuning.
- **Android ART** (DEX, AOT profiles) as a mobile language VM.
- **WASM** in browsers and on the edge as a polyglot sandbox.

<Callout icon="warning" title="Tune GC with the allocation rate, not folklore">
Heap flags copied from a blog post will pause the wrong generation. Measure allocation rate and pause SLOs on your traffic.
</Callout>
`,
  },
]
