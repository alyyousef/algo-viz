import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function TreesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Trees"
      subtitle="Nature's Original Network Architecture"
      intro="Every tree you see is solving graph problems in real-time. Roots branch out searching for water and nutrients. Leaves arrange themselves to catch maximum sunlight without shadowing each other. The entire organism is a living, breathing network that's been optimizing its structure for millions of years. When we model trees as graphs in computer science, we're borrowing from nature's playbook."
    >
      <TopicSection heading="What makes a tree a tree?">
        <p>
          A tree is a graph with a specific personality: connected, but lean. No cycles, no wasted connections. Every node has exactly one path to every other node. Add one more edge and you create a cycle. Remove one and the tree breaks into separate pieces.
        </p>
        <p>
          This minimalism makes trees incredibly versatile. File systems, decision processes, evolutionary relationships, parsing structures: anywhere you need hierarchy without redundancy, trees show up.
        </p>
      </TopicSection>

      <TopicSection heading="The anatomy">
        <p>Nodes hold your data. In a family tree, that's people. In a file system, that's folders and files. In a decision tree, that's choices or outcomes.</p>
        <p>Edges represent relationships. Parent-child. Depends-on. Contains. The meaning changes with context, but the structure remains consistent.</p>
        <p>Roots anchor everything. Most trees pick one node as the starting point. From there, everything fans out in a clear hierarchy.</p>
        <p>Leaves are the endpoints: nodes with no children. They're where the action often happens. The actual files you open, the final decisions you make, the species alive today rather than extinct ancestors.</p>
      </TopicSection>

      <TopicSection heading="How you explore a tree">
        <p>Depth-first means diving deep before spreading wide. You follow one branch all the way to a leaf, then backtrack and try the next branch. It's how you'd explore a cave system or debug a call stack.</p>
        <p>Breadth-first means exploring level by level. Check all siblings before visiting any children. It's how you'd search for the closest coffee shop or find the shortest path in an unweighted tree.</p>
        <p>Both approaches track what you've visited. Without that memory, you'd loop forever or miss entire branches.</p>
      </TopicSection>

      <TopicSection heading="What you can do with trees">
        <div className="space-y-2 text-sm text-white/90">
          <p>Search for a specific node by checking values as you traverse. Binary search trees keep data sorted so you can skip entire branches.</p>
          <p>Insert and delete nodes by finding the right parent and creating an edge. Remove nodes by carefully rewiring connections so nothing breaks off.</p>
          <p>Balance your structure as it grows to keep operations fast. AVL trees and red-black trees adjust themselves automatically when one side gets too heavy.</p>
          <p>Aggregate results by calculating totals, minimums, or other summaries from children. Segment trees do this efficiently for range queries.</p>
          <p>Transform between different representations. Flatten a hierarchy into a list. Parse a list into a hierarchy. Switch between different tree types to unlock different operations.</p>
        </div>
      </TopicSection>

      <TopicSection heading="Common tree flavors">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Binary trees have at most two children per node. Simple structure, powerful applications.</li>
          <li>Binary search trees keep left children smaller and right children larger. Searching becomes logarithmic if the tree stays balanced.</li>
          <li>Heaps ensure parents are always larger (or smaller) than their children. Perfect for priority queues.</li>
          <li>Tries use edges to represent characters. Walk down paths to build or search words.</li>
          <li>N-ary trees let nodes have any number of children. File systems and organizational charts work this way.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Where trees thrive">
        <p>Use trees when your data has natural hierarchy. When relationships flow one direction: parent to child, ancestor to descendant, container to contained. When you need fast searches, efficient sorting, or clear organization.</p>
        <p>Don't force data into trees if the relationships are more like a web than a hierarchy. Social networks, road maps, and citation graphs have cycles and multiple paths. They need the full power of general graphs.</p>
      </TopicSection>

      <TopicSection heading="Building your own">
        <p>Start simple. A node struct or class with pointers to children. Maybe a pointer to the parent if you need to walk upward. Add data fields for whatever you're storing.</p>
        <p>Choose your traversal pattern based on what you're doing. Depth-first is recursive and elegant. Breadth-first needs a queue but finds closest nodes first.</p>
        <p>Track what you've visited if cycles are possible or if you're doing complex analysis. A simple set of visited nodes prevents infinite loops and repeated work.</p>
        <p>Keep balance in mind. Unbalanced trees degrade into linked lists: all the structural overhead with none of the speed benefits. Self-balancing trees cost a bit more on each operation but guarantee you'll never hit worst-case behavior.</p>
      </TopicSection>

      <TopicSection heading="The deeper pattern">
        <p>Trees show up everywhere because hierarchy is fundamental to how we organize complexity. Break big problems into smaller ones. Group related items under common parents. Cache calculations at higher levels to avoid redundant work below.</p>
        <p>When you learn to see trees in your problem domain, you unlock an entire toolkit of algorithms and data structures that generations of programmers have refined. You're not just coding anymore. You're gardening, cultivating structures that grow naturally from your constraints.</p>
      </TopicSection>

      <TopicSection heading="Related data structures and algorithms">
        <div className="space-y-3 text-sm text-white/90">
          <article>
            <p className="font-semibold text-white">Core structures:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Binary Trees and Binary Search Trees (BST)</li>
              <li>AVL Trees (self-balancing BST)</li>
              <li>Red-Black Trees (self-balancing BST)</li>
              <li>B-Trees and B+ Trees (multi-way search trees)</li>
              <li>Heaps (Min-Heap, Max-Heap, Binary Heap)</li>
              <li>Tries (Prefix Trees)</li>
              <li>Suffix Trees and Suffix Arrays</li>
              <li>Segment Trees and Fenwick Trees (Binary Indexed Trees)</li>
              <li>Splay Trees</li>
              <li>Treaps (Tree + Heap hybrid)</li>
            </ul>
          </article>

          <article>
            <p className="font-semibold text-white">Traversal algorithms:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Depth-First Search (DFS): Preorder, Inorder, Postorder</li>
              <li>Breadth-First Search (BFS) / Level-Order Traversal</li>
              <li>Morris Traversal (constant space)</li>
            </ul>
          </article>

          <article>
            <p className="font-semibold text-white">Tree-based algorithms:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Lowest Common Ancestor (LCA)</li>
              <li>Tree Diameter and Height Calculation</li>
              <li>Path Sum Problems</li>
              <li>Serialization and Deserialization</li>
              <li>Tree Reconstruction from Traversals</li>
              <li>Kruskal's and Prim's Algorithms (Minimum Spanning Tree)</li>
              <li>Union-Find / Disjoint Set Union (for tree operations)</li>
              <li>Topological Sort (on directed acyclic graphs)</li>
            </ul>
          </article>

          <article>
            <p className="font-semibold text-white">Advanced applications:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Expression Trees (parsing and evaluation)</li>
              <li>Decision Trees (machine learning)</li>
              <li>Huffman Coding Trees (compression)</li>
              <li>Syntax Trees / Abstract Syntax Trees (compilers)</li>
              <li>Range Query Structures (Segment Trees, Interval Trees)</li>
              <li>K-D Trees (spatial partitioning)</li>
              <li>Quadtrees and Octrees (spatial indexing)</li>
            </ul>
          </article>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
