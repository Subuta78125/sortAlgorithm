/**
 * ソートコンポーネント共通の型
 */

// 各ソートコンポーネントが App から受け取る props
export type SortComponentProps = {
  // ソート前の配列（全ソート共通）
  data: readonly number[]
  // 現在の再生位置（ステップ数）
  step: number
  // 総ステップ数が分かったときに呼ぶ
  onReady: (id: string, totalSteps: number) => void
}
