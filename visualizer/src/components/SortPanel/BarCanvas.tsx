/**
 * 棒グラフのキャンバス
 */

import { useEffect, useRef, useState } from 'react'
import { drawBars } from '../../utils/drawBars'

type Props = {
  values: Int32Array
  highlight: readonly number[]
  done: boolean
  maxValue: number
}

// 配列を棒グラフで描くキャンバス。
// 1000 本 × 7 個の棒を毎フレーム動かすため、DOM 要素ではなく canvas で描画する。
export default function BarCanvas({ values, highlight, done, maxValue }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // 枠の大きさが変わったらキャンバスも合わせる
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  // values は同じ配列が中身だけ書き換わるため、依存配列なしで毎回描き直す
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size.width === 0 || size.height === 0) return
    const dpr = window.devicePixelRatio || 1
    const width = Math.round(size.width * dpr)
    const height = Math.round(size.height * dpr)
    if (canvas.width !== width) canvas.width = width
    if (canvas.height !== height) canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawBars(ctx, width, height, {
      values,
      highlight,
      done,
      maxValue,
      minHighlightWidth: 3 * dpr,
    })
  })

  return (
    <div className="bar-canvas" ref={wrapperRef}>
      <canvas ref={canvasRef} />
    </div>
  )
}
