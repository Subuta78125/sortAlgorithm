/**
 * 交換処理
 */

import type { TraceRecorder } from './trace'

// A[i] と A[j] を入れ替え、交換 1 回として記録する
export function swap(A: number[], i: number, j: number, rec: TraceRecorder): void {
  const tmp = A[i]
  A[i] = A[j]
  A[j] = tmp
  rec.swap(i, j)
}
