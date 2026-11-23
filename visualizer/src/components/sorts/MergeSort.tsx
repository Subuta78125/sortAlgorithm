/**
 * マージソートコンポーネント
 */

import { mergeSort } from '../../algorithms/mergeSort'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function MergeSort(props: SortComponentProps) {
  return <SortPanel id="merge" title="マージソート" algorithm={mergeSort} {...props} />
}
