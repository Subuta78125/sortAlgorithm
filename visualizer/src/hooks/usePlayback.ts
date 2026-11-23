/**
 * 再生位置・再生速度の管理
 */

import { useCallback, useEffect, useRef, useState } from 'react'

// 選べる再生速度（1 秒あたりのステップ数）
export const SPEED_OPTIONS = [2_000, 5_000, 20_000, 50_000, 100_000, 500_000] as const
const DEFAULT_SPEED = 20_000

// 全ソート共通の再生位置（ステップ）を管理するフック。
// 1 ステップ = 比較 1 回 または 交換・代入 1 回。
export function usePlayback(maxSteps: number) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true) // ページを開いた瞬間に再生開始
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED)
  const [finished, setFinished] = useState(false) // 一度最後まで再生したか

  // アニメーションループから最新の値を読むため ref にも保持する
  const stepRef = useRef(0)
  const updateStep = useCallback((value: number) => {
    stepRef.current = value
    setStep(value)
  }, [])

  useEffect(() => {
    if (!playing || maxSteps === 0) return
    let frameId = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      const next = Math.min(stepRef.current + speed * dt, maxSteps)
      updateStep(next)
      if (next >= maxSteps) {
        setPlaying(false)
        setFinished(true)
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [playing, speed, maxSteps, updateStep])

  const togglePlay = useCallback(() => {
    // 最後まで再生済みの状態で再生を押したら最初から
    if (!playing && stepRef.current >= maxSteps) updateStep(0)
    setPlaying((p) => !p)
  }, [playing, maxSteps, updateStep])

  return {
    step: Math.floor(step),
    playing,
    speed,
    finished,
    togglePlay,
    seek: updateStep,
    setSpeed,
  }
}
