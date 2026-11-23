/**
 * バブルソート（打ち切りなし）
 */

import { swap } from './swap'
import type { TraceRecorder } from './trace'

// バブルソート（打ち切りなし）
export function bubbleSortBasic(A: number[], rec: TraceRecorder): void {
  const n = A.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      rec.compare(j, j + 1)
      if (A[j] > A[j + 1]) swap(A, j, j + 1, rec)
    }
  }
}
