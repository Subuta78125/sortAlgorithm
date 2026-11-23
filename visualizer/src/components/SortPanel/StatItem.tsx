/**
 * 数値表示の 1 項目
 */

type Props = {
  label: string
  value: string
}

// ラベルと数値の 1 組
export default function StatItem({ label, value }: Props) {
  return (
    <div className="stat-item">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  )
}
