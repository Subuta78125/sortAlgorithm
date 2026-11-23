/**
 * アプリ全体（ソート可視化ページ）
 */

import { useCallback, useState } from 'react'
import PlaybackControls from './components/controls/PlaybackControls'
import Legend from './components/Legend/Legend'
import BubbleSortBasic from './components/sorts/BubbleSortBasic'
import BubbleSortOptimized from './components/sorts/BubbleSortOptimized'
import HeapSort from './components/sorts/HeapSort'
import InsertionSort from './components/sorts/InsertionSort'
import MergeSort from './components/sorts/MergeSort'
import QuickSort from './components/sorts/QuickSort'
import SelectionSort from './components/sorts/SelectionSort'
import { usePlayback } from './hooks/usePlayback'
import { createShuffledArray } from './utils/shuffle'
import './App.css'

const DATA_SIZE = 1000

export default function App() {
  // 全ソートで共通のランダム配列（ページを開くたびに変わる）
  const [data] = useState(() => createShuffledArray(DATA_SIZE))

  // 各ソートの総ステップ数。最も長いものが再生バーの長さになる
  const [totals, setTotals] = useState<Record<string, number>>({})
  const handleReady = useCallback((id: string, total: number) => {
    setTotals((prev) => (prev[id] === total ? prev : { ...prev, [id]: total }))
  }, [])
  const maxSteps = Math.max(0, ...Object.values(totals))

  const playback = usePlayback(maxSteps)
  const sortProps = { data, step: playback.step, onReady: handleReady }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ソートアルゴリズム可視化（n = {DATA_SIZE}）</h1>
        <PlaybackControls
          step={playback.step}
          maxSteps={maxSteps}
          playing={playback.playing}
          finished={playback.finished}
          speed={playback.speed}
          onTogglePlay={playback.togglePlay}
          onSeek={playback.seek}
          onSpeedChange={playback.setSpeed}
        />
      </header>

      <main className="sort-grid">
        <BubbleSortBasic {...sortProps} />
        <BubbleSortOptimized {...sortProps} />
        <SelectionSort {...sortProps} />
        <InsertionSort {...sortProps} />
        <MergeSort {...sortProps} />
        <QuickSort {...sortProps} />
        <HeapSort {...sortProps} />
        <Legend />
      </main>
    </div>
  )
}
