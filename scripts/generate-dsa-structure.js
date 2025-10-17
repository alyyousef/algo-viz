import fs from "fs";
import path from "path";
import process from "node:process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PAGES_ROOT = path.join(PROJECT_ROOT, "src", "pages");
const BASE = path.join(PAGES_ROOT, "DSA");

const hierarchy = {
  "0. Fundamentals": {
    "1. Primitive Types": {},
    "2. Complexity Analysis (Big O)": {},
    "3. Bit Manipulation": {}
  },
  "1. Core Data Structures": {
    "1. Linear": {
      "1. Arrays & Lists": {},
      "2. Linked Lists": {},
      "3. Stacks": {},
      "4. Queues": {}
    },
    "2. Non-Linear": {
      "1. Trees": {},
      "2. Graphs": {}
    },
    "3. Hash-Based": {
      "Hash Tables & Maps": {}
    },
    "4. Advanced & Specialized": {
      "1. Heaps & Priority Queues": {},
      "2. Tries (Prefix Trees)": {},
      "3. Segment & Fenwick Trees": {},
      "4. Disjoint Set (Union-Find)": {},
      "5. Advanced Trees (AVL, Red-Black, B-Tree)": {}
    }
  },
  "2. Core Algorithms": {
    "1. Sorting & Searching": {},
    "2. Graph Algorithms": {},
    "3. Dynamic Programming": {},
    "4. Greedy Algorithms": {},
    "5. Divide and Conquer": {},
    "6. Backtracking": {}
  },
  "3. Algorithmic Paradigms": {
    "1. Brute Force": {},
    "2. Divide & Conquer": {},
    "3. Greedy Algorithms": {},
    "4. Dynamic Programming": {},
    "5. Backtracking": {},
    "6. Randomized Algorithms": {}
  },
  "4. Domain-Specific & Advanced": {
    "1. String Algorithms": {},
    "2. Mathematical Algorithms": {},
    "3. Computational Geometry": {},
    "4. Advanced Graph Theory": {},
    "5. Probabilistic DS (Bloom Filters, etc.)": {},
    "6. Concurrent & Parallel DS & Algorithms": {}
  },
  "5. Specialized Applications": {
    "1. System Design (Caches, LRU, etc.)": {},
    "2. Database & Indexing (B+ Trees, LSM Trees)": {},
    "3. OS & Kernel (Scheduling, Memory Mgmt)": {},
    "4. Network & Distributed Algorithms": {},
    "5. Cryptography": {},
    "6. Game Development (Pathfinding, etc.)": {},
    "7. AI & ML (Search, GNNs, etc.)": {},
    "8. Blockchain (Merkle Trees, etc.)": {},
    "9. Bioinformatics (Suffix Arrays, etc.)": {}
  }
};

const { promises: fsPromises } = fs;

const componentTemplate = (routeTitle) => `import React from "react";

export default function Page() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">${routeTitle}</h1>
      <p className="opacity-80">This is a placeholder page for <strong>${routeTitle}</strong>.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Explain core ideas and definitions.</li>
        <li>Add visualizer hooks/components if applicable.</li>
        <li>Link to related topics and practice problems.</li>
      </ul>
    </div>
  );
}
`;

const ensureDirectory = async (dirPath) => {
  await fsPromises.mkdir(dirPath, { recursive: true });
};

const toRouteTitle = (dirPath) => {
  const relativePath = path.relative(PAGES_ROOT, dirPath);
  return relativePath.split(path.sep).join("/");
};

const createIndexComponent = async (dirPath) => {
  const filePath = path.join(dirPath, "index.jsx");
  const routeTitle = toRouteTitle(dirPath);
  const fileContents = componentTemplate(routeTitle);

  try {
    const existingContent = await fsPromises.readFile(filePath, "utf8");

    if (existingContent.trim() === fileContents.trim()) {
      return;
    }

    if (existingContent.includes("Content coming soon.")) {
      await fsPromises.writeFile(filePath, fileContents, "utf8");
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    await fsPromises.writeFile(filePath, fileContents, "utf8");
  }
};

const traverseHierarchy = async (currentPath, node) => {
  await ensureDirectory(currentPath);
  await createIndexComponent(currentPath);

  if (!node) {
    return;
  }

  for (const [childName, childNode] of Object.entries(node)) {
    const nextPath = path.join(currentPath, childName);
    await traverseHierarchy(nextPath, childNode);
  }
};

const main = async () => {
  await traverseHierarchy(BASE, hierarchy);
  console.log(`DSA directory structure ensured at: ${BASE}`);
};

main().catch((error) => {
  console.error("Failed to generate DSA directory structure:", error);
  process.exitCode = 1;
});
