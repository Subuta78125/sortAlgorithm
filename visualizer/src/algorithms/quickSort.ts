/**
 * クイックソート
 */

import { swap } from './swap'
import type { TraceRecorder } from './trace'

// クイックソート（公開用：配列全体を対象にする）
export function quickSort(A: number[], rec: TraceRecorder): void {
  quickSortRange(A, 0, A.length - 1, rec)
}

// A[left..right] を整列する。ピボットは中央要素 A[(left + right) / 2]
function quickSortRange(A: number[], left: number, right: number, rec: TraceRecorder): void {
  if (left >= right) return
  const pivot = A[Math.floor((left + right) / 2)]
  let i = left
  let j = right

  while (i <= j) {
    // ピボット以上の要素を左から探す
    for (;;) {
      rec.compare(i, -1)
      if (A[i] >= pivot) break
      i++
    }
    // ピボット以下の要素を右から探す
    for (;;) {
      rec.compare(j, -1)
      if (A[j] <= pivot) break
      j--
    }
    if (i <= j) {
      swap(A, i, j, rec)
      i++
      j--
    }
  }

  quickSortRange(A, left, j, rec)
  quickSortRange(A, i, right, rec)
}
