/**
 * 選択ソート
 */

import { swap } from './swap'
import type { TraceRecorder } from './trace'

// 選択ソート
export function selectionSort(A: number[], rec: TraceRecorder): void {
  const n = A.length
  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      rec.compare(j, min)
      if (A[j] < A[min]) min = j
    }
    swap(A, i, min, rec)
  }
}
