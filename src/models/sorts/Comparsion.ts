type RequireParams<T extends ComparsionItem = ComparsionItem> = Pick<
  Comparsion<T>,
  "items"
>;
type OptionParams<T extends ComparsionItem = ComparsionItem> = Partial<
  Pick<Comparsion<T>, "compareCount" | "swapCount">
>;
export type ComparsionParams<T extends ComparsionItem = ComparsionItem> =
  RequireParams<T> & OptionParams<T>;

export default abstract class Comparsion<
  T extends ComparsionItem = ComparsionItem
> {
  public abstract name: string;
  public items: T[] = [];
  public compareCount: number = 0;
  public swapCount: number = 0;
  constructor({ items, compareCount, swapCount }: ComparsionParams<T>) {
      this.items = items;
      this.compareCount = compareCount || 0;
      this.swapCount = swapCount || 0;
  }
  public abstract compare: () => Promise<Comparsion<T>>;
  /** 置換処理 とりあえず昇順のみ */
  public abstract swap: () => Promise<Comparsion<T>>;
  public ended = () => this.items.every((item) => item.fixed);
}

export interface ComparsionItem {
  id: string;
  value: number;
  comparing: boolean;
  pinned: boolean;
  fixed: boolean;
}
