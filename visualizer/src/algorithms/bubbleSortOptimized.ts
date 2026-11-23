/**
 * バブルソート（打ち切りあり）
 */

import { swap } from './swap'
import type { TraceRecorder } from './trace'

// バブルソート（打ち切りあり）：1 周の間に交換がなければ終了する
export function bubbleSortOptimized(A: number[], rec: TraceRecorder): void {
  const n = A.length
  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      rec.compare(j, j + 1)
      if (A[j] > A[j + 1]) {
        swap(A, j, j + 1, rec)
        swapped = true
      }
    }
    if (!swapped) break
  }
}
