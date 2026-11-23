/**
 * 挿入ソートコンポーネント
 */

import { insertionSort } from '../../algorithms/insertionSort'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function InsertionSort(props: SortComponentProps) {
  return <SortPanel id="insertion" title="挿入ソート" algorithm={insertionSort} {...props} />
}
