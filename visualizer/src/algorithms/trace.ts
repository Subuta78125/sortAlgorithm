/**
 * ソート中に行われた操作を記録する
 */

// 操作の種類
export const Op = {
    // 要素同士の比較
    Compare: 0,
    // 2要素の交換
    Swap: 1,
    // 配列への代入
    Write: 2,
    // 配列への代入だが回数に数えない操作
    WriteSilent: 3,
    // 一次配列への退避
    Save: 4,
} as const

export type OpType = (typeof Op)[keyof typeof Op]

// 記録済み操作列
export type Trace = {
  readonly length: number
  //操作の種類
  readonly ops: Uint8Array
  // 対象インデックス
  readonly a: Int32Array
  // 相手のインデックス
  readonly b: Int32Array
}

export class TraceRecorder {
  private ops = new Uint8Array(1024)
  private a = new Int32Array(1024)
  private b = new Int32Array(1024)
  private length = 0

  // A[i] と A[j] を比較した（j = -1 はピボット値など配列外の値との比較）
  compare(i: number, j: number): void {
    this.push(Op.Compare, i, j)
  }

  // A[i] と A[j] を交換した
  swap(i: number, j: number): void {
    this.push(Op.Swap, i, j)
  }

  // A[i] = value を実行した（回数に数える）
  write(i: number, value: number): void {
    this.push(Op.Write, i, value)
  }

  // A[i] = value を実行した（回数に数えない）
  writeSilent(i: number, value: number): void {
    this.push(Op.WriteSilent, i, value)
  }

  // A[i] を一時配列に退避した
  save(i: number): void {
    this.push(Op.Save, i, -1)
  }

  toTrace(): Trace {
    return {
      length: this.length,
      ops: this.ops.slice(0, this.length),
      a: this.a.slice(0, this.length),
      b: this.b.slice(0, this.length),
    }
  }

  private push(op: OpType, a: number, b: number): void {
    if (this.length === this.ops.length) this.grow()
    this.ops[this.length] = op
    this.a[this.length] = a
    this.b[this.length] = b
    this.length++
  }

  // 容量が足りなくなったら 2 倍に拡張する
  private grow(): void {
    const capacity = this.ops.length * 2
    const ops = new Uint8Array(capacity)
    const a = new Int32Array(capacity)
    const b = new Int32Array(capacity)
    ops.set(this.ops)
    a.set(this.a)
    b.set(this.b)
    this.ops = ops
    this.a = a
    this.b = b
  }
}

// ソート関数の共通の形：配列 A を昇順に並べ替えながら、操作を rec に記録する
export type SortAlgorithm = (A: number[], rec: TraceRecorder) => void

// data のコピーに対してソートを実行し、操作列を返す
export function recordTrace(data: readonly number[], algorithm: SortAlgorithm): Trace {
  const A = [...data]
  const rec = new TraceRecorder()
  algorithm(A, rec)
  return rec.toTrace()
}