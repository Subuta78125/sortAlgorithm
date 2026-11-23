/**
 * ソート表示パネル
 */

import { useEffect } from 'react'
import type { SortAlgorithm } from '../../algorithms/trace'
import { useSortPlayback } from '../../hooks/useSortPlayback'
import type { SortComponentProps } from '../sorts/types'
import BarCanvas from './BarCanvas'
import PanelHeader from './PanelHeader'
import SortStats from './SortStats'
import './SortPanel.css'

type Props = SortComponentProps & {
  id: string
  title: string
  algorithm: SortAlgorithm
}

// 1 つのソートの表示枠（見出し・棒グラフ・回数）
export default function SortPanel({ id, title, algorithm, data, step, onReady }: Props) {
  const playback = useSortPlayback(data, algorithm, step)

  // このソートの総ステップ数を親に知らせる（再生バーの長さを決めるため）
  useEffect(() => {
    onReady(id, playback.totalSteps)
  }, [id, playback.totalSteps, onReady])

  return (
    <section className="sort-panel">
      <PanelHeader title={title} done={playback.done} />
      <BarCanvas
        values={playback.values}
        highlight={playback.highlight}
        done={playback.done}
        maxValue={data.length}
      />
      <SortStats
        comparisons={playback.comparisons}
        assignments={playback.assignments}
        position={playback.position}
        totalSteps={playback.totalSteps}
      />
    </section>
  )
}
