/**
 * パネルの見出し
 */

type Props = {
  title: string
  done: boolean
}

// パネル上部：ソート名と状態バッジ
export default function PanelHeader({ title, done }: Props) {
  return (
    <header className="panel-header">
      <h2 className="panel-title">{title}</h2>
      <span className={`panel-badge ${done ? 'is-done' : ''}`}>{done ? '完了' : 'ソート中'}</span>
    </header>
  )
}
