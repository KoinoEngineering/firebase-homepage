/** 比較ソート用インターフェース */
export interface CompoersionSort {
  /** 配列 */
  items: CompoersionSortItem[];
  /** 現在地 */
  cursor: number;
  /** カーソルの最大最小 */
  cursorMin: number;
  cursorMax: number;

  /** 表示上必要な比較対象を表すカーソル */
  comparison: number;

  /** シェーカーソートなど向きのあるもので使う向き */
  direction: boolean;

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
  ended: boolean;
}

/** 比較ソートの中身 */
export interface CompoersionSortItem {
  id: string;
  value: number;
}

/** ソートの種類 */
export enum SORT_TYPES {
  bubble = "バブルソート",
}
