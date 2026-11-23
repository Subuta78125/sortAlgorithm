/**
 * 再生速度の切り替え
 */

import { SPEED_OPTIONS } from '../../hooks/usePlayback'

type Props = {
  speed: number
  onChange: (speed: number) => void
}

// 再生速度（1 秒あたりのステップ数）の切り替え
export default function SpeedSelector({ speed, onChange }: Props) {
  return (
    <label className="speed-selector">
      速度
      <select value={speed} onChange={(e) => onChange(Number(e.target.value))}>
        {SPEED_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s.toLocaleString()} ステップ/秒
          </option>
        ))}
      </select>
    </label>
  )
}
