/**
 * 挿入ソート
 */

import type { TraceRecorder } from './trace'

// 挿入ソート
// ずらし（A[j+1] = A[j]）のみを代入として数え、
// 退避（v = A[i]）と書き戻し（A[j+1] = v）は数えない。
export function insertionSort(A: number[], rec: TraceRecorder): void {
  const n = A.length
  for (let i = 1; i < n; i++) {
    const v = A[i]
    let j = i - 1
    while (j >= 0) {
      rec.compare(j, j + 1)
      if (A[j] <= v) break
      A[j + 1] = A[j]
      rec.write(j + 1, A[j])
      j--
    }
    A[j + 1] = v
    rec.writeSilent(j + 1, v)
  }
}
