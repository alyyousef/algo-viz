import React, { useState, useEffect, useRef } from 'react';

type SortingAlgorithm = 'bubble' | 'selection' | 'insertion';

interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
  initialArraySize?: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ 
  algorithm, 
  initialArraySize = 20 
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const resetArray = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newArray = Array.from({ length: initialArraySize }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setActiveIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
  };

  useEffect(() => {
    resetArray();
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialArraySize]);

  const bubbleSort = async (arr: number[], signal: AbortSignal) => {
    let n = arr.length;
    let newArr = [...arr];
    let newSorted = [];
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (signal.aborted) return;
        setActiveIndices([j, j + 1]);
        await sleep(100);
        
        if (newArr[j] > newArr[j + 1]) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
          setArray([...newArr]);
        }
      }
      newSorted.push(n - i - 1);
      setSortedIndices([...newSorted]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setActiveIndices([]);
  };

  const selectionSort = async (arr: number[], signal: AbortSignal) => {
    let n = arr.length;
    let newArr = [...arr];
    let newSorted = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (signal.aborted) return;
        setActiveIndices([minIdx, j]);
        await sleep(100);
        
        if (newArr[j] < newArr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        let temp = newArr[i];
        newArr[i] = newArr[minIdx];
        newArr[minIdx] = temp;
        setArray([...newArr]);
      }
      newSorted.push(i);
      setSortedIndices([...newSorted]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setActiveIndices([]);
  };

  const insertionSort = async (arr: number[], signal: AbortSignal) => {
    let n = arr.length;
    let newArr = [...arr];

    for (let i = 1; i < n; i++) {
      let key = newArr[i];
      let j = i - 1;
      
      while (j >= 0 && newArr[j] > key) {
        if (signal.aborted) return;
        setActiveIndices([j, j + 1]);
        await sleep(100);
        
        newArr[j + 1] = newArr[j];
        setArray([...newArr]);
        j = j - 1;
      }
      newArr[j + 1] = key;
      setArray([...newArr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, idx) => idx));
    }
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setActiveIndices([]);
  };

  const startSort = async () => {
    setIsSorting(true);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    try {
      if (algorithm === 'bubble') {
        await bubbleSort(array, signal);
      } else if (algorithm === 'selection') {
        await selectionSort(array, signal);
      } else if (algorithm === 'insertion') {
        await insertionSort(array, signal);
      }
    } catch {
      // Aborted
    } finally {
      setIsSorting(false);
    }
  };

  return (
    <div className="my-6 border border-gray-700 bg-gray-900 rounded-lg p-4 font-sans text-gray-200 shadow-lg" style={{ fontFamily: 'sans-serif' }}>
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <h3 className="text-lg font-bold text-white capitalize m-0">{algorithm} Sort</h3>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm font-semibold disabled:opacity-50 text-white border-none cursor-pointer"
            onClick={startSort}
            disabled={isSorting}
          >
            Start
          </button>
          <button 
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold text-white border-none cursor-pointer"
            onClick={resetArray}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex items-end justify-center h-48 gap-1 mt-6">
        {array.map((value, idx) => {
          let color = 'bg-blue-400';
          if (activeIndices.includes(idx)) color = 'bg-red-500';
          else if (sortedIndices.includes(idx)) color = 'bg-green-500';
          
          return (
            <div 
              key={idx}
              className={`w-4 ${color} transition-all duration-75 ease-in-out`}
              style={{ height: `${value}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
