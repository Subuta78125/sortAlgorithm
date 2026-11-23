/**
 * バブルソート（改良版）コンポーネント
 */

import { bubbleSortOptimized } from '../../algorithms/bubbleSortOptimized'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function BubbleSortOptimized(props: SortComponentProps) {
  return (
    <SortPanel
      id="bubbleOptimized"
      title="バブルソート（改良版）"
      algorithm={bubbleSortOptimized}
      {...props}
    />
  )
}
