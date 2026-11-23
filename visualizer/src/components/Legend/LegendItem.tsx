/**
 * 凡例の 1 項目
 */

type Props = {
  color: string
  label: string
}

// 色見本と説明の 1 行
export default function LegendItem({ color, label }: Props) {
  return (
    <li className="legend-item">
      <span className="legend-swatch" style={{ backgroundColor: color }} />
      {label}
    </li>
  )
}
