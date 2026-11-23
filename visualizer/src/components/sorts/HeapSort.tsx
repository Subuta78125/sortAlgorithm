/**
 * ヒープソートコンポーネント
 */

import { heapSort } from '../../algorithms/heapSort'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function HeapSort(props: SortComponentProps) {
  return <SortPanel id="heap" title="ヒープソート" algorithm={heapSort} {...props} />
}
