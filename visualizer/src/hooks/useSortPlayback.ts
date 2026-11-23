/**
 * ソート 1 つ分の再生状態
 */

import { useMemo } from 'react'
import { recordTrace, type SortAlgorithm } from '../algorithms/trace'
import { TracePlayer } from '../player/TracePlayer'

// 1 つのソートについて、指定ステップ時点の配列・回数を返すフック
export function useSortPlayback(data: readonly number[], algorithm: SortAlgorithm, step: number) {
  // ソートの実行と記録は、データが変わらない限り最初の 1 回だけ
  const player = useMemo(() => new TracePlayer(data, recordTrace(data, algorithm)), [data, algorithm])

  // 同じ step なら何度呼んでも同じ状態になる（冪等）ので、描画中に呼んでも問題ない
  player.seek(step)

  return {
    values: player.values,
    comparisons: player.comparisons,
    assignments: player.assignments,
    position: player.position,
    totalSteps: player.totalSteps,
    highlight: player.highlight(),
    done: player.done,
  }
}
