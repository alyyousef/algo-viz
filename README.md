<div align="center">

# AlgoViz

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React%2019-black?style=flat-square&logo=react)
![React Router](https://img.shields.io/badge/-React%20Router%20v7-black?style=flat-square&logo=react-router)
![Vite](https://img.shields.io/badge/-Vite%207-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS%204-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/-Zustand-black?style=flat-square&logo=zustand)
![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-black?style=flat-square&logo=framer)
![Recharts](https://img.shields.io/badge/-Recharts-8884D8?style=flat-square)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)

A comprehensive web application that teaches data structures and algorithms through interactive visualizations, gamification, and hands-on practice. Built for computer science students, self-taught programmers, interview prep candidates, and algorithm enthusiasts.

</div>

## Motivation

Learning algorithms can be abstract and challenging. While textbooks provide theory and code provides implementation, the gap between understanding "how" an algorithm works and truly visualizing its execution remains. AlgoViz was created to bridge this gap by:

- **Making algorithms tangible**:- See exactly how data moves and transforms
- **Accelerating learning**:- Interactive visualizations help concepts stick
- **Building intuition**:- Watch algorithms in action to understand their behavior
- **Gamifying practice**:- Turn learning into an engaging, rewarding experience
- **Supporting interview prep**:- Visualize the algorithms you'll be asked about

This project transforms algorithmic thinking from a theoretical exercise into an interactive, visual experience that makes complex concepts accessible to learners at all levels.

## Build Status

**Current Status:** In Active Development

- Core visualization engine complete
- Sorting algorithms implemented
- Data structures in progress
- Graph algorithms in development
- Challenge mode planned
- Achievement system planned

**Known Issues:**

- TBD

## Code Style

This project follows modern JavaScript/React best practices:

- **JavaScript Standard Style** with ESLint
- **Prettier** for consistent formatting
- **React Hooks** patterns and functional components
- **Tailwind CSS** utility-first approach
- **Conventional Commits** for commit messages

Code formatting is enforced via:

```bash
npm run lint    # Check for style issues
npm run format  # Auto-format code
```

## Screenshots

> **Note:** Screenshots will be added as features are completed

**Coming Soon:**

- Sorting algorithm visualization in action
- Interactive graph pathfinding game
- Achievement dashboard
- Code display with syntax highlighting

## Tech / Framework Used

**Core Technologies:**

- [React 18+](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Styling

**Supporting Libraries:**

- [React Router](https://reactrouter.com/) - Navigation
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [Recharts](https://recharts.org/) - Complexity charts
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code display

**Development Tools:**

- ESLint & Prettier - Code quality
- Vitest - Testing framework
- Git & GitHub - Version control

## Features

**Interactive Visualizations:**

- Real-time algorithm animations with color-coded states
- Adjustable playback speed (0.5x to 4x)
- Play, pause, reset, and step-through controls
- Live statistics (comparisons, swaps, array accesses)

**Learning Tools:**

- Algorithm descriptions and use cases
- Code implementations in multiple languages (JavaScript, Python, C++)
- Time and space complexity analysis
- Best/average/worst case scenarios

**Gamification (Planned):**

- Achievement system with unlockable badges
- Interactive challenges and puzzles
- Progress tracking and statistics
- Timed challenges with leaderboards

**Algorithm Coverage:**

- **Sorting:** Bubble, Selection, Insertion, Merge, Quick, Heap
- **Searching:** Linear, Binary, Jump, Interpolation
- **Data Structures:** Stack, Queue, Linked List, Trees, Graphs
- **Graph Algorithms:** DFS, BFS, Dijkstra's, A\*
- **More coming:** Dynamic Programming, Backtracking, Greedy algorithms

## Code Examples

**Generating visualization steps for Bubble Sort:**

```javascript
// Generate animation frames for bubble sort
function* bubbleSort(arr) {
  const array = [...arr]
  const n = array.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight elements being compared
      yield {
        array: [...array],
        comparing: [j, j + 1],
        sorted: [],
      }

      if (array[j] > array[j + 1]) {
        // Swap elements
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        yield {
          array: [...array],
          swapping: [j, j + 1],
          sorted: [],
        }
      }
    }
  }

  // Mark as sorted
  yield {
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
  }
}
```

**Using the visualization hook:**

```javascript
const { array, isPlaying, play, pause, reset, setSpeed } = useVisualization(
  bubbleSort,
  initialArray,
)
```

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/alyyousef/algoviz.git
   cd algoviz
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will hot-reload as you make changes

**Optional: Build for production**

```bash
npm run build
npm run preview  # Preview production build locally
```

## How to Use

1. **Select a Topic** from the navigation menu (Sorting, Searching, Data Structures, etc.)

2. **Choose an Algorithm** to study (e.g., Bubble Sort, Quick Sort)

3. **Learn the Fundamentals:**
   - Read the algorithm description and explanation
   - View the step-by-step code implementation with comments
   - Understand the core concepts and approach

4. **Explore Examples:**
   - Study how the algorithm works on different input patterns (sorted, reverse, nearly sorted, random)
   - See traced execution steps and decision points
   - Review worked examples with detailed walkthroughs

5. **Analyze Complexity:**
   - Review time complexity (best, average, worst case)
   - Understand space complexity requirements
   - Compare performance across different scenarios
   - View complexity graphs and trade-offs

6. **Compare Algorithms:**
   - See side-by-side comparisons with similar algorithms
   - Understand when to use each approach
   - Review pros and cons of different strategies

7. **Practice & Assessment (coming soon):**
   - Answer conceptual questions about the algorithm
   - Trace through execution manually
   - Implement the algorithm from scratch
   - Debug incorrect implementations
   - Take assessment quizzes to test your understanding

## Contribute

Contributions are welcome and appreciated! Here's how you can help:

**Getting Started:**

1. **Fork the repository** on GitHub

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/algoviz.git
   ```

3. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes** and commit

   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** on the original repository

**Contribution Guidelines:**

- Follow the existing code style (ESLint + Prettier)
- Write meaningful commit messages (Conventional Commits format)
- Add tests for new features
- Update documentation as needed
- Keep PRs focused on a single feature or fix

**Areas needing help:**

- Bug fixes
- New algorithm implementations
- UI/UX improvements
- Documentation enhancements
- Accessibility improvements
- Internationalization

## Credits

**Inspiration:**

- [VisuAlgo](https://visualgo.net/) - Comprehensive algorithm visualizations
- [Algorithm Visualizer](https://algorithm-visualizer.org/) - Interactive learning platform
- [Sorting Algorithms Animations](https://www.toptal.com/developers/sorting-algorithms) - Visual sorting comparisons

**Resources:**

- _Introduction to Algorithms_ by Cormen, Leiserson, Rivest, and Stein (CLRS)
- _Grokking Algorithms_ by Aditya Bhargava
- React documentation and community

**Special Thanks:**

- The open-source community for amazing tools and libraries

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:

- Use this project for personal or commercial purposes
- Modify and adapt the code
- Distribute and sublicense
- Use privately
- Do whatever you wish

**Attribution appreciated but not required!**

---

**Made with care by Ali Yousef
(https://github.com/alyyousef)**

**Connect with me:**

- [LinkedIn](https://www.linkedin.com/in/aliuyoussef/)
- [GitHub](https://github.com/alyyousef)

Star this repo if you find it helpful!  
Have a suggestion? Want to add something? Email me at aliyousef.aca@gmail.com
