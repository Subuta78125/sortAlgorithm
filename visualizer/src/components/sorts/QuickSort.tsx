/**
 * クイックソートコンポーネント
 */

import { quickSort } from '../../algorithms/quickSort'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function QuickSort(props: SortComponentProps) {
  return <SortPanel id="quick" title="クイックソート" algorithm={quickSort} {...props} />
}
