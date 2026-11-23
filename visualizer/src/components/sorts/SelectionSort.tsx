/**
 * 選択ソートコンポーネント
 */

import { selectionSort } from '../../algorithms/selectionSort'
import SortPanel from '../SortPanel/SortPanel'
import type { SortComponentProps } from './types'

export default function SelectionSort(props: SortComponentProps) {
  return <SortPanel id="selection" title="選択ソート" algorithm={selectionSort} {...props} />
}
