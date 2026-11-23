/**
 * 棒グラフの描画
 */

import { COLORS } from '../constants/colors'

type DrawOptions = {
  values: Int32Array
  highlight: readonly number[]
  done: boolean
  maxValue: number
  // 強調表示する棒の最小幅（キャンバスのピクセル単位）
  minHighlightWidth: number
}

// 配列の値を棒グラフとしてキャンバスに描く
export function drawBars(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  { values, highlight, done, maxValue, minHighlightWidth }: DrawOptions,
): void {
  ctx.clearRect(0, 0, width, height)
  const n = values.length
  const barWidth = width / n

  // 通常の棒はまとめて 1 回で塗る（1000 本でも軽い）
  ctx.fillStyle = done ? COLORS.done : COLORS.bar
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const h = (values[i] / maxValue) * height
    ctx.rect(i * barWidth, height - h, barWidth, h)
  }
  ctx.fill()

  // 比較・交換中の棒を強調（細すぎて見えないので最小幅を確保）
  ctx.fillStyle = COLORS.highlight
  const w = Math.max(barWidth, minHighlightWidth)
  for (const i of highlight) {
    if (i < 0) continue
    const h = (values[i] / maxValue) * height
    ctx.fillRect(i * barWidth + barWidth / 2 - w / 2, height - h, w, h)
  }
}
