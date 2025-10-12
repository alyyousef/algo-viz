import './App.css'

function App() {
  return (
    <main className="landing">
      <header className="landing__hero">
        <p className="landing__eyebrow">Understanding Data Structures</p>
        <h1 className="landing__title">Build intuition before diving into code</h1>
        <p className="landing__lead">
          Data structures are the patterns we use to store and organize data. The right structure
          unlocks fast lookups, efficient updates, and predictable behavior—critical ingredients for
          algorithms that scale.
        </p>
        <div className="landing__cta">
          <a className="landing__button landing__button--primary" href="#explore">
            Explore visualizers
          </a>
          <a className="landing__button landing__button--ghost" href="#why-it-matters">
            Learn why it matters
          </a>
        </div>
      </header>

      <section id="why-it-matters" className="landing__section">
        <h2>What is a data structure?</h2>
        <p>
          A data structure defines how data is stored, accessed, and manipulated inside a program.
          Arrays, stacks, queues, trees, graphs, and hash tables all solve different problems by
          optimizing for a specific blend of operations such as insertion, deletion, and search.
        </p>
        <p>
          Choosing a structure is about trade-offs. A stack makes pushing and popping blazing fast,
          but it cannot retrieve items in the middle without extra work. Trees keep data sorted,
          making searches predictable, while graphs capture complex relationships between items.
        </p>
      </section>

      <section id="explore" className="landing__section landing__section--grid">
        <article className="landing__card">
          <h3>Visual learners win</h3>
          <p>
            Seeing structures in motion reveals how operations transform data. Animations highlight
            patterns that are easy to miss in static diagrams.
          </p>
        </article>
        <article className="landing__card">
          <h3>Experiment interactively</h3>
          <p>
            Tweak inputs, run operations step by step, and watch the structure respond. Active
            exploration builds lasting understanding.
          </p>
        </article>
        <article className="landing__card">
          <h3>Connect structure to algorithm</h3>
          <p>
            Algorithms lean on data structures. Sorting arrays, traversing graphs, and balancing
            trees all depend on the guarantees their structures provide.
          </p>
        </article>
      </section>
    </main>
  )
}

export default App
