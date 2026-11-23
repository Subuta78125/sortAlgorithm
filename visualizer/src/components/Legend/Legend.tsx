/**
 * 凡例
 */

import { COLORS } from '../../constants/colors'
import LegendItem from './LegendItem'
import './Legend.css'

type Props = {
  // データ数（棒の値の最大値）
  dataSize: number
}

// 8 枠目：色の意味と見方の説明
export default function Legend({ dataSize }: Props) {
  return (
    <section className="legend">
      <h2 className="legend-title">凡例・見方</h2>
      <ul className="legend-list">
        <LegendItem color={COLORS.bar} label="未整列の要素" />
        <LegendItem color={COLORS.highlight} label="比較・交換・代入中の要素" />
        <LegendItem color={COLORS.done} label="整列完了" />
      </ul>
      <p className="legend-note">
        横軸は配列番号、棒の高さは値（1〜{dataSize}）。
        <br />
        1 ステップ = 比較 1 回 または 交換・代入 1 回。全ソートが同じ速さで進むため、手数の少ないソートほど早く終わる。
        <br />
        全ソート終了後、再生バーで好きな位置に移動できる。
      </p>
    </section>
  )
}
