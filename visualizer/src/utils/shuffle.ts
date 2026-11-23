/**
 * ランダム配列の生成
 */

// 1..n の整数を Fisher–Yates 法でランダムに並べた配列を作る
export function createShuffledArray(n: number): number[] {
  const A = Array.from({ length: n }, (_, i) => i + 1)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = A[i]
    A[i] = A[j]
    A[j] = tmp
  }
  return A
}
