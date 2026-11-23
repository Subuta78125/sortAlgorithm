/**
 * 再生操作パネル
 */

import PlayPauseButton from './PlayPauseButton'
import SeekBar from './SeekBar'
import SpeedSelector from './SpeedSelector'
import './PlaybackControls.css'

type Props = {
  step: number
  maxSteps: number
  playing: boolean
  finished: boolean
  speed: number
  onTogglePlay: () => void
  onSeek: (step: number) => void
  onSpeedChange: (speed: number) => void
}

// 再生ボタン・再生バー・速度切り替えをまとめた操作パネル
export default function PlaybackControls(props: Props) {
  return (
    <div className="playback-controls">
      <PlayPauseButton playing={props.playing} onClick={props.onTogglePlay} />
      <SeekBar
        step={props.step}
        maxSteps={props.maxSteps}
        enabled={props.finished}
        onSeek={props.onSeek}
      />
      <SpeedSelector speed={props.speed} onChange={props.onSpeedChange} />
    </div>
  )
}
