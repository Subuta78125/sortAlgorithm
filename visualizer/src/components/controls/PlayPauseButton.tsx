/**
 * 再生 / 一時停止ボタン
 */

type Props = {
  playing: boolean
  onClick: () => void
}

// 再生 / 一時停止の切り替えボタン
export default function PlayPauseButton({ playing, onClick }: Props) {
  return (
    <button
      type="button"
      className="play-button"
      onClick={onClick}
      aria-label={playing ? '一時停止' : '再生'}
    >
      {playing ? '❚❚' : '▶'}
    </button>
  )
}
