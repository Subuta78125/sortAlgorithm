/**
 * 再生バー
 */

type Props = {
  step: number
  maxSteps: number
  // 一度最後まで再生し終えるまでは操作できない
  enabled: boolean
  onSeek: (step: number) => void
}

// YouTube のような再生位置バー
export default function SeekBar({ step, maxSteps, enabled, onSeek }: Props) {
  return (
    <div className="seek-bar">
      <input
        type="range"
        min={0}
        max={maxSteps}
        step={1}
        value={step}
        disabled={!enabled}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="再生位置"
      />
      <span className="seek-label">
        {step.toLocaleString()} / {maxSteps.toLocaleString()} ステップ
      </span>
    </div>
  )
}
