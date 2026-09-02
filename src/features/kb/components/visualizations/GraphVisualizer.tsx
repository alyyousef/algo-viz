import React, { useState, useEffect, useRef } from 'react';

type GraphAlgorithm = 'bfs' | 'dfs';

interface GraphVisualizerProps {
  algorithm: GraphAlgorithm;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const GRAPH_NODES = [
  { id: 0, x: 50, y: 50, label: 'A' },
  { id: 1, x: 150, y: 50, label: 'B' },
  { id: 2, x: 250, y: 50, label: 'C' },
  { id: 3, x: 50, y: 150, label: 'D' },
  { id: 4, x: 150, y: 150, label: 'E' },
  { id: 5, x: 250, y: 150, label: 'F' },
];

const GRAPH_EDGES = [
  { source: 0, target: 1 },
  { source: 0, target: 3 },
  { source: 1, target: 2 },
  { source: 1, target: 4 },
  { source: 2, target: 5 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
];

// Adjacency list
const ADJ_LIST: Record<number, number[]> = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4],
  4: [1, 3, 5],
  5: [2, 4],
};

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ algorithm }) => {
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const resetGraph = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setVisitedNodes(new Set());
    setActiveNode(null);
    setIsRunning(false);
  };

  useEffect(() => {
    resetGraph();
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [algorithm]);

  const runBFS = async (signal: AbortSignal) => {
    const queue = [0];
    const visited = new Set<number>([0]);
    
    setVisitedNodes(new Set(visited));
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (signal.aborted) return;
      
      setActiveNode(current);
      await sleep(600);
      
      const neighbors = ADJ_LIST[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
      setVisitedNodes(new Set(visited));
    }
    setActiveNode(null);
  };

  const runDFS = async (signal: AbortSignal) => {
    const visited = new Set<number>();
    
    const dfsRecursive = async (node: number) => {
      if (signal.aborted) return;
      visited.add(node);
      setVisitedNodes(new Set(visited));
      setActiveNode(node);
      await sleep(600);
      
      const neighbors = ADJ_LIST[node] || [];
      for (const neighbor of neighbors) {
        if (signal.aborted) return;
        if (!visited.has(neighbor)) {
          await dfsRecursive(neighbor);
        }
      }
    };
    
    await dfsRecursive(0);
    setActiveNode(null);
  };

  const startTraversal = async () => {
    setIsRunning(true);
    setVisitedNodes(new Set());
    setActiveNode(null);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    try {
      if (algorithm === 'bfs') {
        await runBFS(signal);
      } else if (algorithm === 'dfs') {
        await runDFS(signal);
      }
    } catch {
      // Aborted
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="my-6 border border-gray-700 bg-gray-900 rounded-lg p-4 font-sans text-gray-200 shadow-lg" style={{ fontFamily: 'sans-serif' }}>
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <h3 className="text-lg font-bold text-white uppercase m-0">{algorithm} Traversal</h3>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm font-semibold disabled:opacity-50 text-white border-none cursor-pointer"
            onClick={startTraversal}
            disabled={isRunning}
          >
            Start
          </button>
          <button 
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold text-white border-none cursor-pointer"
            onClick={resetGraph}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-center h-56 mt-4">
        <svg width="300" height="200" viewBox="0 0 300 200">
          {/* Edges */}
          {GRAPH_EDGES.map((edge, idx) => {
            const sourceNode = GRAPH_NODES.find(n => n.id === edge.source)!;
            const targetNode = GRAPH_NODES.find(n => n.id === edge.target)!;
            const isVisitedEdge = visitedNodes.has(edge.source) && visitedNodes.has(edge.target);
            return (
              <line 
                key={idx}
                x1={sourceNode.x} 
                y1={sourceNode.y} 
                x2={targetNode.x} 
                y2={targetNode.y} 
                stroke={isVisitedEdge ? "#3b82f6" : "#4b5563"} 
                strokeWidth="4"
                className="transition-colors duration-300"
              />
            );
          })}
          
          {/* Nodes */}
          {GRAPH_NODES.map((node) => {
            const isVisited = visitedNodes.has(node.id);
            const isActive = activeNode === node.id;
            
            let fill = "#1f2937"; // default dark gray
            let stroke = "#4b5563"; // default border
            
            if (isActive) {
              fill = "#ef4444"; // red
              stroke = "#f87171";
            } else if (isVisited) {
              fill = "#3b82f6"; // blue
              stroke = "#60a5fa";
            }
            
            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="transition-all duration-300">
                <circle 
                  r="20" 
                  fill={fill} 
                  stroke={stroke} 
                  strokeWidth="3"
                />
                <text 
                  textAnchor="middle" 
                  dy=".3em" 
                  fill="#ffffff" 
                  fontSize="14"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
