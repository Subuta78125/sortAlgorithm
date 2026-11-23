/**
 * 操作列の再生
 */

import { Op, type Trace } from '../algorithms/trace'

// 何操作ごとに配列の状態を保存しておくか（シークを速くするため）
const CHECKPOINT_INTERVAL = 4096

type Snapshot = {
  position: number
  values: Int32Array
  comparisons: number
  assignments: number
}

// 記録した操作列（Trace）を再生して、任意の時点の配列と回数を再現するクラス。
// 後ろへ戻るときは、近いチェックポイントから再生し直す。
export class TracePlayer {
  // 現在の配列の状態（描画に使う）
  readonly values: Int32Array
  // これまでに適用した操作の数
  position = 0
  comparisons = 0
  assignments = 0

  private readonly trace: Trace
  private readonly checkpoints: Snapshot[] = []

  constructor(initial: readonly number[], trace: Trace) {
    this.trace = trace
    this.values = Int32Array.from(initial)

    // 一度最後まで再生しながら、一定間隔で状態を保存しておく
    this.checkpoints.push(this.snapshot())
    while (this.position < trace.length) {
      this.stepForward()
      if (this.position % CHECKPOINT_INTERVAL === 0) this.checkpoints.push(this.snapshot())
    }
    this.restore(this.checkpoints[0])
  }

  get totalSteps(): number {
    return this.trace.length
  }

  get done(): boolean {
    return this.position >= this.trace.length
  }

  // target 個目の操作まで適用した状態へ移動する
  seek(target: number): void {
    const t = Math.max(0, Math.min(Math.floor(target), this.trace.length))
    if (t < this.position || t - this.position > CHECKPOINT_INTERVAL) {
      this.restore(this.checkpoints[Math.floor(t / CHECKPOINT_INTERVAL)])
    }
    while (this.position < t) this.stepForward()
  }

  // 直前の操作で注目しているインデックス（-1 は無し）
  highlight(): [number, number] {
    if (this.position === 0 || this.done) return [-1, -1]
    const k = this.position - 1
    const op = this.trace.ops[k]
    if (op === Op.Compare || op === Op.Swap) return [this.trace.a[k], this.trace.b[k]]
    return [this.trace.a[k], -1]
  }

  // 操作を 1 つ進める
  private stepForward(): void {
    const k = this.position
    const { ops, a, b } = this.trace
    const v = this.values
    switch (ops[k]) {
      case Op.Compare:
        this.comparisons++
        break
      case Op.Swap: {
        const tmp = v[a[k]]
        v[a[k]] = v[b[k]]
        v[b[k]] = tmp
        this.assignments++
        break
      }
      case Op.Write:
        v[a[k]] = b[k]
        this.assignments++
        break
      case Op.WriteSilent:
        v[a[k]] = b[k]
        break
      case Op.Save:
        this.assignments++
        break
    }
    this.position++
  }

  private snapshot(): Snapshot {
    return {
      position: this.position,
      values: this.values.slice(),
      comparisons: this.comparisons,
      assignments: this.assignments,
    }
  }

  private restore(s: Snapshot): void {
    this.values.set(s.values)
    this.position = s.position
    this.comparisons = s.comparisons
    this.assignments = s.assignments
  }
}
