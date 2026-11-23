/**
 * ヒープソート
 */

import { swap } from './swap'
import type { TraceRecorder } from './trace'

// ヒープソート
export function heapSort(A: number[], rec: TraceRecorder): void {
  const n = A.length
  // 最大ヒープを構築する
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(A, i, n, rec)
  }
  // 根（最大値）を末尾と交換し、残りを再びヒープにする
  for (let end = n - 1; end > 0; end--) {
    swap(A, 0, end, rec)
    siftDown(A, 0, end, rec)
  }
}

// A[root] を下へ沈めて、A[0..size-1] のヒープ条件を回復する
function siftDown(A: number[], root: number, size: number, rec: TraceRecorder): void {
  for (;;) {
    const l = 2 * root + 1
    const r = l + 1
    let largest = root
    if (l < size) {
      rec.compare(l, largest)
      if (A[l] > A[largest]) largest = l
    }
    if (r < size) {
      rec.compare(r, largest)
      if (A[r] > A[largest]) largest = r
    }
    if (largest === root) return
    swap(A, root, largest, rec)
    root = largest
  }
}
