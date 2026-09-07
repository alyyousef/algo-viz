export const compilerPagesA = [
  {
    rel: '44.1 Compilers/AST/index.mdx',
    title: 'Abstract Syntax Tree (AST)',
    description:
      'A hierarchical tree of language constructs after parsing, with punctuation stripped so later compiler and tooling passes walk structure instead of text.',
    body: `
The **abstract syntax tree** is the first structure that actually understands your program. A lexer emits a flat token list. A parser folds that list into nodes for declarations, expressions, and statements. Parentheses, commas, and most keywords exist only to guide the parse; once the tree is built, the hierarchy itself encodes precedence and nesting.

## 1. Deep Dive and Mechanics

Each node is a typed record: a BinaryExpression holds an operator plus left and right children; a FunctionDecl holds a name, parameters, and a body block. Tools walk the tree with a visitor or a recursive walk. Compilers lower the AST into IR. Linters and formatters stop at the AST and rewrite it.

**Abstract versus concrete.** A concrete syntax tree keeps every token, including comments and parens. An AST drops what does not affect meaning. Source maps and pretty-printers sometimes keep extra spans so they can reprint the original file faithfully.

**Why the tree matters.** Constant folding, type checking, and rename-refactor all need parent and sibling context. A token stream cannot tell you whether an identifier is a type, a field, or a local without a scope walk on a tree.

<Callout icon="tip" title="Why it is called abstract">
The tree is abstract because it throws away syntax that only exists for humans and the parser. After 5 + (10 * 2) is parsed, the parens are gone; the nested multiply node already forces the right evaluation order.
</Callout>

## 2. Mathematical / Theoretical Foundation

An AST is a term over a ranked signature: each production of the context-free grammar becomes a constructor. For a grammar with expression productions E -> E + T | T, the corresponding terms are Plus(e, t) and the term for T. Evaluation is a homomorphism from terms to values: interpret children, then apply the operator.

Tree walks are structural recursion. Post-order evaluation matches the compositional semantics of most expression languages. Attribute grammars decorate each node with inherited and synthesized attributes (types, liveness, constant values).

<ComparisonTable
  headers={['Structure', 'Keeps punctuation', 'Primary consumer', 'Typical cost']}
  rows={[
    ['Token stream', 'Yes, as tokens', 'Parser', 'Linear scan'],
    ['Concrete syntax tree', 'Yes', 'Formatters, IDEs', 'Large, faithful'],
    ['Abstract syntax tree', 'No', 'Type checkers, compilers', 'Compact, semantic'],
    ['IR / SSA', 'No', 'Optimisers, codegen', 'Machine-oriented'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
class Node:
    pass

class Lit(Node):
    def __init__(self, value):
        self.value = value

class Add(Node):
    def __init__(self, left, right):
        self.left = left
        self.right = right

def eval_ast(node):
    if isinstance(node, Lit):
        return node.value
    if isinstance(node, Add):
        return eval_ast(node.left) + eval_ast(node.right)
    raise TypeError('unknown node')

# 5 + (10 * 2) would be Add(Lit(5), Mul(Lit(10), Lit(2)))
print(eval_ast(Add(Lit(5), Lit(15))))
TICK3

Production front ends (clang, rustc, TypeScript) attach source spans to every node so diagnostics can underline the original text.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Src[Source text] --> Lex[Lexer]
    Lex --> Tok[Token list]
    Tok --> Par[Parser]
    Par --> Ast[AST]
    Ast --> Sem[Semantic analysis]
    Ast --> Lint[Linters and formatters]
    Sem --> Ir[IR lowering]
TICK3

## 5. Interview Prep

**Q: AST versus parse tree?**
**A:** A parse tree mirrors the grammar, including unit productions and punctuation. An AST keeps only nodes that carry meaning and is what later passes consume.

**Q: Why not interpret tokens directly?**
**A:** Precedence, nesting, and name binding are hierarchical. A flat list cannot represent that without re-parsing on every use.

**Q: How do source maps relate?**
**A:** Each AST node stores a span. After transforms, maps send generated positions back to those spans so debuggers and error messages still point at user code.

## 6. Production Use Cases

- **Language servers** (gopls, rust-analyzer, tsserver) keep a typed AST per open file for hover, rename, and completion.
- **ESLint and clang-tidy** pattern-match AST nodes instead of regex on source.
- **Transpilers** (TypeScript, Babel, javac) rewrite or lower ASTs before emit.

<Callout icon="info" title="Pretty-print needs more than an AST">
If you must reprint comments and original wrapping, keep trivia on the concrete tree or attach comment tokens to nearby AST nodes.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Bytecode design/index.mdx',
    title: 'Bytecode Design',
    description:
      'The opcode set, operand encoding, and stack-or-register model that a language VM interprets or JITs — a portable ISA for the language, not the chip.',
    body: `
**Bytecode** is a compact instruction set invented for a language runtime rather than for a CPU. The compiler emits load-const, add, call, and jump opcodes. A virtual machine interprets them, or a JIT later turns hot traces into native code. Java class files, CPython pyc, CIL, and WASM are all bytecode designs with different trade-offs.

## 1. Deep Dive and Mechanics

Two dominant models exist. A **stack machine** pushes operands, then an opcode pops them (JVM, CPython, WASM). A **register machine** names virtual registers in each instruction (Lua 5.0, Dalvik, many JS engines internally). Stack code is dense and easy to emit. Register code often needs fewer instructions and maps more cleanly onto hardware.

**Encoding.** Fixed-width opcodes are simple to decode. Variable-width encodings save space for common loads. Immediate operands may be inlined or stored in a constant pool. Exception tables and debug line maps sit beside the instruction stream.

**Verification.** Safe VMs type-check the bytecode before run: stack height is consistent on every path, locals have known types, jumps land on instruction boundaries. That is how the JVM can sandbox untrusted class files.

<Callout icon="warning" title="Opcode space is a compatibility contract">
Renumbering an opcode breaks every file already shipped. Reserve gaps, version the header, and never reuse a retired code while old artifacts still exist.
</Callout>

## 2. Mathematical / Theoretical Foundation

Bytecode is a small ISA. Its operational semantics is a transition relation on a machine state (pc, stack or registers, heap). Stack machines correspond to postfix evaluation of expression trees. Register machines correspond to three-address code.

Verification is a dataflow problem: abstract interpret each block to compute stack types and local types; reject if two predecessors disagree or if an opcode sees the wrong sort of value. Sound verification implies the interpreter never has to check those properties again at run time.

<ComparisonTable
  headers={['Design', 'Operand style', 'Density', 'Example']}
  rows={[
    ['Stack bytecode', 'Implicit stack', 'High', 'JVM, CPython, WASM'],
    ['Register bytecode', 'Explicit vregs', 'Lower', 'Lua, Dalvik'],
    ['Threaded code', 'Word addresses', 'Medium', 'Forth, some Forth-like VMs'],
    ['Native ISA', 'Hardware regs', 'Lowest portable', 'x86-64, AArch64'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Tiny stack bytecode: LOAD_CONST, ADD, PRINT, HALT
LOAD_CONST, ADD, PRINT, HALT = range(4)

def run(code, consts):
    stack = []
    pc = 0
    while True:
        op = code[pc]
        pc += 1
        if op == LOAD_CONST:
            stack.append(consts[code[pc]])
            pc += 1
        elif op == ADD:
            b = stack.pop()
            a = stack.pop()
            stack.append(a + b)
        elif op == PRINT:
            print(stack.pop())
        elif op == HALT:
            return

# print(1 + 2)
run([LOAD_CONST, 0, LOAD_CONST, 1, ADD, PRINT, HALT], [1, 2])
TICK3

Real designs add CALL with a frame, JUMP_IF_FALSE, and a constant pool shared by many functions.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Src[Source] --> FE[Frontend]
    FE --> BC[Bytecode file]
    BC --> Ver[Verifier]
    Ver --> Int[Interpreter]
    Int --> Hot[Hot counters]
    Hot --> Jit[JIT to native]
TICK3

## 5. Interview Prep

**Q: Stack versus register bytecode?**
**A:** Stack is easier to generate and denser. Register usually executes fewer opcodes and is a better JIT input. Many modern engines parse stack bytecode then lower to an SSA register form internally.

**Q: Why verify?**
**A:** So the runtime can omit per-opcode type and bounds checks that would otherwise dominate interpreted performance, and so untrusted code cannot smash the interpreter frame.

**Q: Is WASM a bytecode?**
**A:** Yes: a portable, verified stack ISA with structured control flow, designed as a compilation target rather than a human programming language.

## 6. Production Use Cases

- **JVM and CLR** ship verified bytecode as the stable deploy artifact.
- **CPython and CPython alternatives** cache pyc so import does not reparse.
- **Game and plugin sandboxes** interpret a small bytecode instead of loading native DLLs.

<Callout icon="tip" title="Design for the JIT, not only the interpreter">
If a JIT is in the roadmap, keep opcodes close to SSA-friendly operations and avoid hidden side effects on every load.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Clang/index.mdx',
    title: 'Clang',
    description:
      'The LLVM C, C++, and Objective-C frontend: fast parses, useful diagnostics, and a modular library used by clangd, linters, and many toolchains.',
    body: `
**Clang** is the C-family frontend of the LLVM project. It lexes and parses C, C++, Objective-C, and CUDA, builds a Clang AST, runs semantic analysis, then emits LLVM IR for the shared optimiser and backend. It replaced GCC as the default compiler on macOS and is the compiler Android NDK and many BSD systems prefer.

## 1. Deep Dive and Mechanics

Clang is a library first, a driver second. libclang and LibTooling let clang-tidy, clang-format, and clangd reuse the same parser the compiler uses. The driver (clang or clang++) mimics GCC flags, finds headers, and chooses a target triple.

**Pipeline.** Driver expands flags, invokes cc1. The parser is a hand-written recursive descent with careful recovery so one missing semicolon does not silence fifty later errors. Sema builds the AST and performs overload resolution, template instantiation, and constexpr evaluation. CodeGen walks the AST and produces LLVM IR.

**Diagnostics.** Clang invested early in caret diagnostics, fix-it hints, and notes that point at the declaration that caused a type error. That UX is a large reason projects switched from GCC.

<Callout icon="info" title="Clang is not LLVM">
Clang is the frontend. LLVM is the IR, passes, and backends. You can use LLVM without Clang (Rust, Swift, Zig) and historically you could use Clang with other backends, but the production path is Clang to LLVM IR to llc or the integrated codegen.
</Callout>

## 2. Mathematical / Theoretical Foundation

A C++ frontend is a large attributed grammar plus a type system with unification (templates) and a name-lookup algorithm defined by the standard. Overload resolution is a partial order on candidate functions. SFINAE and requires-clauses prune the candidate set.

Compilation time is dominated by header inclusion (textual, unless you use modules) and template instantiation. Clang modules and C++20 modules change the complexity from "reparse every include" to "import a serialized AST."

<ComparisonTable
  headers={['Tool', 'Role', 'Uses Clang parser', 'Output']}
  rows={[
    ['clang / clang++', 'Compiler driver', 'Yes', 'Object, bitcode, IR'],
    ['clangd', 'Language server', 'Yes', 'LSP features'],
    ['clang-tidy', 'Linter', 'Yes', 'Diagnostics, fixes'],
    ['clang-format', 'Formatter', 'Token-level', 'Rewritten source'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
# Emit LLVM IR, then native object, same as a normal compile
clang++ -std=c++20 -O2 -S -emit-llvm main.cpp -o main.ll
clang++ -std=c++20 -O2 -c main.cpp -o main.o

# Reuse the parser as a tool
clang-tidy main.cpp -- -std=c++20
clangd --check=main.cpp
TICK3

Compile commands live in compile_commands.json so clangd and clang-tidy see the same -I and -D flags as the build.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Src[C or C++ source] --> Drv[clang driver]
    Drv --> Parse[Parse and Sema]
    Parse --> Ast[Clang AST]
    Ast --> CG[CodeGen]
    CG --> IR[LLVM IR]
    IR --> Opt[LLVM opt]
    Opt --> BE[LLVM backend]
TICK3

## 5. Interview Prep

**Q: Clang versus GCC?**
**A:** Both are production C/C++ compilers. Clang is modular, has generally better diagnostics, and shares LLVM with other languages. GCC still leads on some architectures and on a few GNU extensions. Many shops compile with both in CI.

**Q: What is libclang for?**
**A:** A stable-ish C API over the parser so editors and indexers do not fork the compiler. LibTooling is the C++ API used by first-party tools.

**Q: Why is C++ compile time still high?**
**A:** Textual includes and templates duplicate work across translation units. Modules and precompiled headers cut that; they do not change the cost of instantiating a heavy template once.

## 6. Production Use Cases

- **Apple, Android, and Chrome** toolchains ship Clang/LLVM as the primary C/C++ compiler.
- **IDE intelligence** for C++ is almost always clangd or a clang-based indexer.
- **Static analysis** at scale (Meta Infer also exists; many rules are clang-tidy checks).

<Callout icon="warning" title="Match the runtime and libc++">
Mixing libstdc++ and libc++ in one process, or mixing GCC and Clang objects with mismatched ABI flags, is a silent footgun. Pin the entire toolchain.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Code generation/index.mdx',
    title: 'Code Generation',
    description:
      'The backend step that turns IR into real instructions: select opcodes, allocate registers, emit calling conventions, and write an object file.',
    body: `
**Code generation** is where a compiler stops being language-shaped and becomes machine-shaped. IR values become instructions. Virtual registers become physical ones. Calls become the platform ABI: who owns which register, how the stack is aligned, how a struct returns. The output is usually an object file the linker can consume.

## 1. Deep Dive and Mechanics

Three classic subproblems dominate.

**Instruction selection.** Pattern-match IR trees or DAGs onto the target ISA. LLVM uses SelectionDAG and GlobalISel. A plus of two i32 values becomes addl or add w-register depending on the triple.

**Instruction scheduling.** Reorder the selected instructions to hide latency and respect issue width, without breaking data dependences.

**Register allocation.** Infinite SSA names must fit in a handful of physical registers. Graph coloring and linear scan are the usual algorithms. Spills go to the stack frame.

The backend also lowers legalization (i64 on a 32-bit target), peephole opts, prolog/epilog insertion, and debug-info emission.

<Callout icon="warning" title="Wrong ABI is a heisenbug">
If the caller and callee disagree on who saves r12 or how a 16-byte struct is passed, you get stack corruption that appears only on one platform. Codegen must match the platform SysV, MS, or AAPCS document exactly.
</Callout>

## 2. Mathematical / Theoretical Foundation

Instruction selection can be stated as tiling: cover the IR DAG with tiles that each correspond to a legal instruction, minimizing a cost (latency or size). Optimal tiling on trees is DP; on DAGs it is harder and compilers use greedy or ILP-inspired heuristics.

Register allocation: interference graph vertices are live ranges; edges mean "cannot share a register." Chromatic number bounded by available registers is NP-hard in general. SSA form makes some interference graphs chordal, which is why SSA-based allocators are popular.

<ComparisonTable
  headers={['Phase', 'Input', 'Output', 'Hard part']}
  rows={[
    ['ISel', 'IR', 'Target instrs, vregs', 'Odd ISA patterns'],
    ['Schedule', 'Instr list', 'Reordered list', 'Latency vs regs'],
    ['Regalloc', 'vregs', 'pregs + spills', 'Spill placement'],
    ['Emit', 'Machine IR', 'Object / asm', 'Relocs, CFI, debug'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Toy three-address lowering: a = b + c  ->  load, add, store
def codegen_add(dst, lhs, rhs, regs):
    asm = []
    asm.append(f'ldr r0, {lhs}')
    asm.append(f'ldr r1, {rhs}')
    asm.append('add r0, r0, r1')
    asm.append(f'str r0, {dst}')
    return asm
TICK3

A real backend would keep b and c in registers if they are already live, and would pick add versus lea versus lea+scale on x86.

## 4. Visualizations

TICK3mermaid
flowchart TD
    IR[Target-independent IR] --> Legal[Legalize types]
    Legal --> ISel[Instruction selection]
    ISel --> Sched[Schedule]
    Sched --> RA[Register allocation]
    RA --> PE[Prolog and epilog]
    PE --> Obj[Object file]
TICK3

## 5. Interview Prep

**Q: Why not emit assembly from the AST?**
**A:** You would reimplement optimisation, legalization, and ABI lowering for every language. IR plus a shared backend is how LLVM and GCC scale to many languages and CPUs.

**Q: What is a spill?**
**A:** A value that does not fit in a register is written to the stack and reloaded later. Spills are the usual reason "more SSA names" can make a function slower.

**Q: Fast-ISel versus SelectionDAG?**
**A:** Fast-ISel covers common IR quickly for -O0. SelectionDAG or GlobalISel does the expensive pattern matching at -O2.

## 6. Production Use Cases

- **AOT compilers** (clang, rustc, javac+HotSpot is mixed) emit native or JIT later.
- **JIT backends** (LLVM ORC, Cranelift, JVM C2) run a lighter codegen under a time budget.
- **GPU compilers** (NVCC, ROCm, Metal) generate ISA for a different machine model: warps, shared memory, no classic stack.

<Callout icon="tip" title="Look at the assembly">
godbolt.org is the fastest way to learn codegen. Change -O2 to -O0 and watch register allocation and inlining disappear.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/GCC/index.mdx',
    title: 'GNU Compiler Collection (GCC)',
    description:
      'The classic free AOT toolchain for C, C++, Ada, Fortran, and more: a private IR (GIMPLE, RTL) and first-class support on a huge set of targets.',
    body: `
**GCC** is the GNU Compiler Collection: a family of frontends sharing a middle end and many machine backends. It is still the system compiler on most Linux distributions, the compiler that builds the Linux kernel on many architectures, and the reference for a long list of GNU language extensions.

## 1. Deep Dive and Mechanics

Each frontend (C, C++, Ada, Fortran, D, Go historically, and others) produces **GENERIC**, then **GIMPLE**. GIMPLE is a three-address IR. The middle end runs SSA-based passes: inlining, constant propagation, vectorization, loop opts. The backend lowers to **RTL** (Register Transfer Language), a lisp-like representation close to the machine, then allocates registers and emits assembly.

**Driver.** gcc and g++ are drivers. They expand -march, call cc1 or cc1plus, then as and ld (or the gold/lld you configured). Spec files describe that pipeline.

**Extensions.** Nested functions, statement expressions, and many attributes are GNU-isms. Code that compiles only with GCC is a portability risk; code that uses __builtin_* often has a Clang twin.

<Callout icon="info" title="GCC and LLVM are peers, not clones">
They implement the same languages and similar opts, but the IRs, pass managers, and plugin APIs differ. A GCC plugin will not load into Clang.
</Callout>

## 2. Mathematical / Theoretical Foundation

GIMPLE-SSA is a sparse SSA form. Classic dataflow (reaching definitions, liveness) becomes almost constant-time on SSA. RTL is closer to a machine-level rewriting system: each insn is a pattern with constraints that the register allocator and reload pass must satisfy.

Link-time optimisation (LTO) serializes GIMPLE into object files so the middle end can see the whole program at link time — the same idea as LLVM ThinLTO, different file format.

<ComparisonTable
  headers={['IR', 'Level', 'Used for', 'Audience']}
  rows={[
    ['GENERIC', 'AST-like', 'Frontend lowering', 'GCC internals'],
    ['GIMPLE', 'Three-address SSA', 'Most opts', 'Middle end'],
    ['RTL', 'Machine-ish', 'ISel, regalloc, emit', 'Backends'],
    ['LLVM IR', 'SSA, typed', 'clang/rustc/swift', 'LLVM world'],
  ]}
/>

## 3. Real-World Implementation

TICK3bash
gcc -O2 -march=native -c app.c -o app.o
gcc -O2 -flto -o app app.o util.o
g++ -std=c++20 -Wall -Wextra -Werror main.cpp

# Ask GCC what it would do
gcc -Q --help=optimizers
gcc -S -O2 -fverbose-asm app.c
TICK3

Kernel builds pass a carefully pinned set of -fno-* flags; do not casually raise -O3 on the kernel.

## 4. Visualizations

TICK3mermaid
flowchart LR
    FE[gcc frontend] --> Generic[GENERIC]
    Generic --> Gimple[GIMPLE SSA]
    Gimple --> Mid[Middle-end passes]
    Mid --> Rtl[RTL]
    Rtl --> Asm[Assembler]
    Asm --> Ld[Linker]
TICK3

## 5. Interview Prep

**Q: When would you pick GCC over Clang?**
**A:** Targets Clang does not support well, a distro that standardizes on GCC, kernel or firmware trees that assume GNU extensions, or a measured codegen win on that CPU.

**Q: What is RTL?**
**A:** GCC's last IR before assembly: insn patterns with predicates and constraints. Backend authors spend most of their time on RTL machine descriptions.

**Q: GCC LTO versus fat LTO objects?**
**A:** Slim LTO objects hold bytecode-like GIMPLE. Fat objects hold both GIMPLE and normal code so non-LTO links still work, at a size cost.

## 6. Production Use Cases

- **Linux distro package builds** and the kernel on x86, ARM, Power, RISC-V, s390.
- **Embedded and cross toolchains** (arm-none-eabi-gcc) where GCC has decades of target coverage.
- **HPC Fortran** stacks that still treat gfortran as the default.

<Callout icon="warning" title="Do not mix -fPIC and unusual TLS models casually">
ABI flags (-fPIC, -fno-plt, -mregparm, TLS models) must match across every object in the link, including static libraries you did not compile today.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Intermediate representation/index.mdx',
    title: 'Intermediate Representation (IR)',
    description:
      'The compiler-internal language between the AST and the machine: three-address code or SSA that optimisers and backends share across frontends.',
    body: `
An **intermediate representation** is a program form designed for machines that write compilers, not for humans who write apps. Frontends lower language-specific ASTs into IR. Optimisers rewrite IR. Backends select instructions from IR. LLVM IR, GCC GIMPLE, Java bytecode, and WASM are all IRs at different distances from the metal.

## 1. Deep Dive and Mechanics

Good IR is **explicit**. Control flow is a graph of basic blocks, not nested source statements. Names are infinite virtual registers, not memory, until a later pass. Side effects are modeled (memory, calls, traps) so a pass can move code only when it is safe.

**SSA form.** Each name is assigned once. Phi nodes merge values at control-flow joins. SSA makes reaching definitions trivial and is the default for LLVM and GIMPLE.

**Levels.** High-level IR still has objects and virtual calls (Java bytecode, Swift SIL). Mid-level IR has typed pointers or typed memory and a small instruction set (LLVM IR). Low-level IR is almost the machine (SelectionDAG, GCC RTL, MachineIR).

<Callout icon="tip" title="IR is a product API">
If you publish bitcode (LLVM, Swift, WASM), the IR schema is a compatibility surface. Version it. Do not silently change poison or wrap semantics.
</Callout>

## 2. Mathematical / Theoretical Foundation

A basic-block CFG is a directed graph; dominance and post-dominance are partial orders used by SSA construction (Cytron et al.) and by placing invariants. SSA is a sparse representation of the use-def chain.

Many opts are monotone dataflow frameworks: a lattice, a transfer function per instruction, a merge at joins. SSA plus a sparse propagator (SCCP) is the same math with fewer vertices.

<ComparisonTable
  headers={['IR', 'SSA', 'Typed', 'Typical home']}
  rows={[
    ['Three-address code', 'Optional', 'Sometimes', 'Textbooks, early GCC'],
    ['LLVM IR', 'Yes', 'Yes', 'clang, rustc, Swift'],
    ['GIMPLE', 'Yes', 'Yes', 'GCC middle end'],
    ['Bytecode / WASM', 'No / structured', 'Verified', 'VMs, portable deploy'],
  ]}
/>

## 3. Real-World Implementation

TICK3llvm
; LLVM IR for  return a + b;  in a function
define i32 @add(i32 %a, i32 %b) {
entry:
  %sum = add nsw i32 %a, %b
  ret i32 %sum
}
TICK3

nsw means "no signed wrap" so the optimiser may assume overflow is undefined, matching C.

## 4. Visualizations

TICK3mermaid
flowchart LR
    LangA[C frontend] --> IR[Shared IR]
    LangB[Rust frontend] --> IR
    LangC[Swift frontend] --> IR
    IR --> Opt[Opt passes]
    Opt --> X86[x86 backend]
    Opt --> Arm[ARM backend]
    Opt --> Gpu[GPU backend]
TICK3

## 5. Interview Prep

**Q: Why not optimise the AST?**
**A:** ASTs are language-shaped, full of nested scopes and implicit conversions. IR makes control flow and data flow uniform so one inliner and one GVN serve every frontend.

**Q: What does SSA buy you?**
**A:** Unique assignments, simple use-def, and cheaper constant prop and dead-code elim. The cost is phi insertion and an extra lowering step before the register allocator.

**Q: Is bytecode an IR?**
**A:** Yes, a portable one. It may be too low or too stack-ish for some opts, so JITs first lift bytecode into SSA IR.

## 6. Production Use Cases

- **Multi-language toolchains** (LLVM, Graal) share opts across frontends.
- **LTO / ThinLTO** persist IR into object files for whole-program opts at link time.
- **MLIR** stacks domain dialects (linalg, gpu) above LLVM IR in ML compilers.

<Callout icon="info" title="Read the language reference">
LLVM LangRef defines poison, undef, and wrap flags. Most "the optimiser ate my code" bugs are a frontend that promised more than the source language allowed.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/Interpreters/index.mdx',
    title: 'Interpreters',
    description:
      'Runtimes that execute a program by walking an AST or dispatching bytecode, trading peak speed for simplicity, portability, and a short edit-run loop.',
    body: `
An **interpreter** executes a program without first producing a standalone native binary. It may walk the AST (tree-walk), decode bytecode (CPython, early JVM), or mix both. The edit-run loop is short, the implementation is portable, and the same runtime can offer a REPL, reflection, and rich errors. The cost is dispatch overhead and missed native opts.

## 1. Deep Dive and Mechanics

**Tree-walk.** After parse, eval(node) recurses. Fine for calculators, config languages, and teaching. Every node is a call and a type switch.

**Bytecode interpreter.** The compiler produces opcodes. A loop fetches the next opcode and jumps to a handler (switch, computed goto, or threaded code). Locals live in a frame array. This is CPython, Ruby YARV, and many game scripting VMs.

**Dispatch styles.** A C switch is simple. Threaded code stores the address of the next handler and jumps, cutting branch-predictor misses. Superinstructions fuse common pairs (load + add).

Many production "interpreters" are staged: interpret until a hotness counter trips, then JIT.

<Callout icon="info" title="Interpretation is a spectrum">
A shell is an interpreter. So is the JVM at -Xint. So is a CPU microcode engine. The useful distinction is whether your deploy artifact is source/bytecode plus a runtime, or a native image.
</Callout>

## 2. Mathematical / Theoretical Foundation

An interpreter is an operational semantics made executable: a relation (state, next-state) implemented as a loop. For an expression language, denotational eval is a fold over the AST. For bytecode, the semantics is a small-step machine.

Performance: dispatch plus boxing often costs 10x to 100x versus AOT. Big-O of the algorithm is unchanged; the constant factor is the problem. Specializing interpreters (PyPy's approach, Futamura projections) generate a compiler from an interpreter.

<ComparisonTable
  headers={['Style', 'Input', 'Speed', 'Good for']}
  rows={[
    ['Tree-walk', 'AST', 'Slowest', 'DSLs, teaching'],
    ['Bytecode loop', 'Opcodes', 'Moderate', 'CPython, Ruby'],
    ['JIT companion', 'Hot bytecode', 'Fast hot paths', 'JVM, V8, LuaJIT'],
    ['AOT native', 'Object code', 'Fast from t0', 'C, Rust, Go'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def interpret(node, env):
    kind = node[0]
    if kind == 'num':
        return node[1]
    if kind == 'var':
        return env[node[1]]
    if kind == 'add':
        return interpret(node[1], env) + interpret(node[2], env)
    if kind == 'let':
        name, value, body = node[1], node[2], node[3]
        child = dict(env)
        child[name] = interpret(value, env)
        return interpret(body, child)
    raise ValueError(kind)

# let x = 10 in x + 2
prog = ('let', 'x', ('num', 10), ('add', ('var', 'x'), ('num', 2)))
print(interpret(prog, {}))
TICK3

## 4. Visualizations

TICK3mermaid
flowchart TD
    Src[Source] --> Parse[Parse]
    Parse --> Ast[AST]
    Ast --> TW[Tree-walk eval]
    Ast --> Comp[Bytecode compiler]
    Comp --> BC[Bytecode]
    BC --> Loop[Dispatch loop]
    Loop --> JIT[Optional JIT]
TICK3

## 5. Interview Prep

**Q: Interpreter versus compiler?**
**A:** A compiler translates ahead of time to another form (IR, bytecode, native). An interpreter executes that form or the AST. Most language implementations do both.

**Q: Why is CPython still interpreted?**
**A:** Portability, a simple C API for extensions, and "fast enough" for the glue that calls NumPy. Hot numeric work leaves the interpreter. A JIT exists in other Pythons (PyPy) and is arriving in CPython incrementally.

**Q: What is a closure in an interpreter?**
**A:** A function value that captures the environment it was created in. Implementation is a pair (code, env) or upvalues that outlive the stack frame.

## 6. Production Use Cases

- **Dynamic languages** (Python, Ruby, JS before JIT warmup, PHP).
- **Config and policy engines** (Rego, CEL, many game Lua VMs).
- **Database engines** interpret query plans as trees of iterators.

<Callout icon="warning" title="Do not eval untrusted source">
An interpreter that exposes the host language is a remote-code-execution primitive. Sandbox, capability-restrict, or do not take user strings.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/JIT compilation/index.mdx',
    title: 'Just-In-Time (JIT) Compilation',
    description:
      'Compile hot code at run time using live types and profiles, so a portable VM can still reach near-native speed on the paths that matter.',
    body: `
**JIT compilation** produces native code while the program runs. The runtime starts in an interpreter or a cheap compiler, counts executions, and when a function or loop is hot, compiles a specialised native version. Java HotSpot, V8, .NET RyuJIT, LuaJIT, and PyPy all live on this idea.

## 1. Deep Dive and Mechanics

**Method JIT.** Compile a whole function once it is hot (HotSpot C1/C2, .NET). **Tracing JIT.** Record a hot loop path and compile that linear trace (LuaJIT, older TraceMonkey). **Baseline then optimising.** V8's Ignition interpreter plus TurboFan; HotSpot's C1 then C2.

**Speculation.** The JIT assumes "this add is two Smi integers" or "this call hits one receiver class." It plants a guard. If the guard fails, it **deoptimises**: jump back to the interpreter and maybe recompile later with less optimism.

**Code cache.** Native blobs live in an executable region with a size cap. GC must relocate or invalidate code that inlines a class that was unloaded.

<Callout icon="warning" title="Warmup is part of the SLA">
The first thousand requests can be 10x slower than steady state. For latency SLOs, warmup the JIT in a pre-prod ritual or use AOT/PGO profiles (Graal Native, .NET ReadyToRun, Java CDS/AOT).
</Callout>

## 2. Mathematical / Theoretical Foundation

A JIT is a partial evaluator with a profile. Futamura's first projection: specialise an interpreter with respect to a program, get a compiler. Tracing is specialising along one path of the CFG.

Guards split the concrete state space. Each compiled version is valid on a subset. Deopt is a soundness mechanism: when the subset is left, discard the compiled theorem.

Tiered compilation is an optimisation under a time budget: spend compile time only where the expected remaining executions repay it.

<ComparisonTable
  headers={['Engine', 'Start', 'Hot compiler', 'Deopt']}
  rows={[
    ['HotSpot', 'Interpreter / C1', 'C2 or Graal', 'Yes, uncommon traps'],
    ['V8', 'Ignition', 'TurboFan / Maglev', 'Yes'],
    ['LuaJIT', 'Interpreter', 'Trace recorder', 'Yes, trace abort'],
    ['CPython 3.13+', 'Bytecode', 'Copy-and-patch tiers', 'Limited'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual hotness + compile threshold (not a real JIT)
THRESHOLD = 1000
hits = {}
native = {}

def call(fn_id, interpret, compile_fn, args):
    hits[fn_id] = hits.get(fn_id, 0) + 1
    compiled = native.get(fn_id)
    if compiled is not None:
        return compiled(*args)
    if hits[fn_id] >= THRESHOLD:
        native[fn_id] = compile_fn(fn_id)
        return native[fn_id](*args)
    return interpret(*args)
TICK3

Real JITs compile off-thread, patch call sites, and keep a deopt metadata table.

## 4. Visualizations

TICK3mermaid
stateDiagram-v2
    [*] --> Interpret
    Interpret --> Baseline: hot enough
    Baseline --> Opt: very hot
    Opt --> Interpret: deopt / guard fail
    Baseline --> Interpret: deopt
TICK3

## 5. Interview Prep

**Q: JIT versus AOT?**
**A:** AOT pays compile cost before run and cannot see live types. JIT sees profiles and monomorphic call sites, but needs warmup, a code cache, and a more complex runtime.

**Q: What is a megamorphic call site?**
**A:** A call that has seen many receiver types. Inline caches stop helping; the JIT emits a full dispatch. That is a common JS and Java slow path.

**Q: Why can JIT code be faster than static C?**
**A:** It rarely beats carefully written C on a stable numeric kernel. It can beat generic C++ on megamorphic-looking source that is monomorphic at run time, because it specialises. Do not claim this as a universal win.

## 6. Production Use Cases

- **JVM and CLR services** that run for hours and repay warmup.
- **Browsers** (V8, SpiderMonkey, JavaScriptCore) JITing JS and WASM.
- **Game scripting** with LuaJIT where scripts stay hot in a frame loop.

<Callout icon="tip" title="Measure after warmup">
Benchmarks that include JIT compile time lie about steady state. Run a warmup loop, then time, or use JMH/.NET BenchmarkDotNet.
</Callout>
`,
  },
  {
    rel: '44.1 Compilers/LL parsing/index.mdx',
    title: 'LL Parsing (Top-Down)',
    description:
      'Predictive top-down parsing: expand the leftmost nonterminal using FIRST and FOLLOW sets, the theory behind many recursive-descent and ANTLR grammars.',
    body: `
**LL parsing** reads the input Left-to-right and builds a Leftmost derivation. The parser starts at the start symbol and repeatedly expands the leftmost nonterminal. An **LL(k)** parser looks at most k tokens ahead to pick which production to use. LL(1) is the sweet spot taught in courses and used by many hand-written and generated top-down parsers.

## 1. Deep Dive and Mechanics

The parser holds a stack of grammar symbols, or equivalently a call stack in recursive descent. When the top is a terminal, it must match the next token. When the top is a nonterminal A, it peeks at the lookahead, consults a table T[A, token], and pushes that production's right-hand side (in reverse, if using an explicit stack).

**Conflicts.** Two productions of A both viable for the same lookahead: FIRST/FIRST conflict. A nullable production colliding with FOLLOW: FIRST/FOLLOW conflict. Left recursion (A -> A alpha) never terminates in a naive LL parser.

**Pragmatics.** ANTLR's adaptive LL(*) walks the input with a graph-structured lookahead when LL(1) is not enough. PEG parsers also go top-down but use ordered choice, which is a different contract than a CFG.

<Callout icon="warning" title="Ban left recursion or rewrite it">
A -> A + T | T loops forever in LL. Rewrite to T (+ T)* or use a Pratt/precedence climber for expressions. LR parsers accept left recursion naturally.
</Callout>

## 2. Mathematical / Theoretical Foundation

FIRST(alpha) is the set of terminals that can begin a string derived from alpha, plus epsilon if alpha can derive empty. FOLLOW(A) is the set of terminals that can appear immediately after A in some sentential form.

A grammar is LL(1) iff for every pair of productions A -> alpha | beta, FIRST(alpha) and FIRST(beta) are disjoint, and if alpha is nullable then FIRST(beta) is disjoint from FOLLOW(A). The parse table then has at most one production per cell.

<ComparisonTable
  headers={['Family', 'Derivation', 'Left recursion', 'Lookahead', 'Typical tool']}
  rows={[
    ['LL(1)', 'Leftmost', 'Must rewrite', '1 token', 'Hand RD, many textbooks'],
    ['LL(k) / LL(*)', 'Leftmost', 'Must rewrite', 'k or unbounded', 'ANTLR'],
    ['LR(1) / LALR', 'Rightmost reversed', 'OK', '1 token', 'yacc, bison, lalrpop'],
    ['PEG', 'Top-down ordered', 'Usually banned', 'Unlimited packrat', 'peg.js, pest'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# LL(1)-style recursive descent for  T = id | '(' E ')'
# E = T ('+' T)*
def parse_T(toks, i):
    if toks[i] == 'id':
        return i + 1
    if toks[i] == '(':
        i = parse_E(toks, i + 1)
        if toks[i] != ')':
            raise SyntaxError('expected )')
        return i + 1
    raise SyntaxError('expected id or (')

def parse_E(toks, i):
    i = parse_T(toks, i)
    while i < len(toks) and toks[i] == '+':
        i = parse_T(toks, i + 1)
    return i
TICK3

The plus loop is the rewritten form of left-recursive E -> E + T.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Start[Stack: S] --> Peek[Peek lookahead t]
    Peek --> Table[Table S, t]
    Table --> Expand[Expand production]
    Expand --> Match[Match terminals]
    Match --> Peek
    Match --> Done[Accept if stack empty and input empty]
TICK3

## 5. Interview Prep

**Q: Why is C++ not LL(1)?**
**A:** Classic ambiguity: T * x can be multiply or a declaration. The lexer hack and tentative parses (or a GLR/hand state machine) are required. That is why C++ parsers are not "just LL(1)."

**Q: FIRST and FOLLOW in one sentence?**
**A:** FIRST says what a production can start with. FOLLOW says what can come after a nullable nonterminal, so you know when to take the empty production.

**Q: LL versus recursive descent?**
**A:** Recursive descent is the implementation style. If each function looks at a fixed lookahead and the grammar is LL(1), you have an LL(1) parser in code form.

## 6. Production Use Cases

- **Hand-written language frontends** (Clang, rustc parser, tsc) that want control over errors.
- **ANTLR-generated** parsers for DSLs and protocol grammars.
- **Query and template languages** simple enough to stay LL(1).

<Callout icon="tip" title="Write the grammar for error recovery">
LL parsers can sync to a FOLLOW set after a mistake (panic mode). Design those sync tokens (semicolon, closing brace as a word in docs, keywords) on purpose.
</Callout>
`,
  },
]
