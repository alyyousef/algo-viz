files = [
    'src/features/dsa/routes/DSA/2. Core Algorithms/2. Graph Algorithms/index.tsx',
    'src/features/dsa/routes/DSA/2. Core Algorithms/2. Graph Algorithms/1. Breadth-First Search/index.tsx',
    'src/features/dsa/routes/DSA/2. Core Algorithms/2. Graph Algorithms/2. Dijkstra\'s Algorithm/index.tsx',
    'src/features/dsa/routes/DSA/2. Core Algorithms/2. Graph Algorithms/3. Minimum Spanning Tree/index.tsx'
]
import itertools
for path in files:
    with open(path) as f:
        for idx,line in enumerate(f,1):
            if idx in {1, 12, 13, 14, 15, 20}:
                continue
            # print some around line 12? break once idx>20? etc
            pass
