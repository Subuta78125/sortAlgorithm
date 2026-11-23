/**
 * マージソート
 */

import type { TraceRecorder } from './trace'

// マージソート
export function mergeSort(A: number[], rec: TraceRecorder): void {
  mergeSortRange(A, 0, A.length - 1, rec)
}

// A[left..right] を整列する
function mergeSortRange(A: number[], left: number, right: number, rec: TraceRecorder): void {
  if (left >= right) return
  const mid = Math.floor((left + right) / 2)
  mergeSortRange(A, left, mid, rec)
  mergeSortRange(A, mid + 1, right, rec)
  merge(A, left, mid, right, rec)
}

// 整列済みの A[left..mid] と A[mid+1..right] を併合する。
// 一時配列への退避・書き戻しはどちらも代入 1 回として数える。
function merge(A: number[], left: number, mid: number, right: number, rec: TraceRecorder): void {
  const tmp: number[] = []
  for (let k = left; k <= right; k++) {
    tmp.push(A[k])
    rec.save(k)
  }

  const leftEnd = mid - left
  const rightEnd = right - left
  let i = 0
  let j = leftEnd + 1
  let k = left

  while (i <= leftEnd && j <= rightEnd) {
    rec.compare(left + i, left + j)
    A[k] = tmp[i] <= tmp[j] ? tmp[i++] : tmp[j++]
    rec.write(k, A[k])
    k++
  }
  while (i <= leftEnd) {
    A[k] = tmp[i++]
    rec.write(k, A[k])
    k++
  }
  while (j <= rightEnd) {
    A[k] = tmp[j++]
    rec.write(k, A[k])
    k++
  }
}
