/** 比較ソート用インターフェース */
export interface CompoersionSort {
  /** 配列 */
  items: CompoersionSortItem[];
  /** 現在地 */
  cursor: number;
  /** カーソルの最大最小 */
  cursorMin: number;
  cursorMax: number;
  /** minやmax等を入れる入れ物 */
  pointer: number;
  /**
   * 比較と入れ替えを別ステップでやりたいので
   * やむを得ず次のステップで入れ替えるかどうかを記憶させる
   */
  needSwap: boolean;

  /** 比較回数 */
  compCnt: number;
  /** 入れ替え回数 */
  swapCnt: number;

  /** 完了しているかどうか */
  isEnd: boolean;
}

/** 比較ソートの中身 */
export interface CompoersionSortItem {
  value: number;
}
