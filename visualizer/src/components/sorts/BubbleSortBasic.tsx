/**
 * バブルソート（通常版）コンポーネント
 */

import { bubbleSortBasic } from '../../algorithms/bubbleSortBasic'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function BubbleSortBasic(props: SortComponentProps) {
  return (
    <SortPanel id="bubbleBasic" title="バブルソート（通常版）" algorithm={bubbleSortBasic} {...props} />
  )
}
