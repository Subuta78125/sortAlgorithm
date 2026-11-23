/**
 * 比較回数・交換/代入回数の表示
 */

import StatItem from './StatItem'

type Props = {
  comparisons: number
  assignments: number
  position: number
  totalSteps: number
}

// 棒グラフ下部：比較回数・交換/代入回数・進捗
export default function SortStats({ comparisons, assignments, position, totalSteps }: Props) {
  const progress = totalSteps === 0 ? 100 : (position / totalSteps) * 100

  return (
    <footer className="sort-stats">
      <StatItem label="比較回数" value={comparisons.toLocaleString()} />
      <StatItem label="交換・代入回数" value={assignments.toLocaleString()} />
      <StatItem label="進捗" value={`${progress.toFixed(1)}%`} />
    </footer>
  )
}
