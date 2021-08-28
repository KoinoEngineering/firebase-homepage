import Comparsion, { ComparsionParams } from "../Comparsion";

interface BubbleAdditionalProperty {
  cursor: number;
  last: number;
}
type BubbleParams = ComparsionParams & Partial<BubbleAdditionalProperty>;
export default class Bubble
    extends Comparsion
    implements BubbleAdditionalProperty
{
  public name = "バブルソート";
  public cursor: number;
  public last: number;
  constructor({ items, compareCount, swapCount, cursor, last }: BubbleParams) {
      super({ items, compareCount, swapCount });
      this.cursor = cursor || 0;
      this.last = last || items.length - 1;
  }

  public compare = async (): Promise<Bubble> => {
      const { items, compareCount, cursor } = this;
      if (!this.ended()) {
          return new Bubble({
              ...this,
              items: items.map((item, i) => {
                  if (i === cursor || i === cursor + 1) {
                      return {
                          ...item,
                          comparing: true,
                      };
                  } else {
                      return item;
                  }
              }),
              compareCount: compareCount + 1,
          });
      }
      return this;
  };

  public swap = async () => {
      if (!this.ended()) {
          const { items, cursor, last, swapCount } = this;
          // 比較中のものを取り出す
          const comparings = items.filter((item) => item.comparing);

          //   とりあえず2個じゃなかったら落とす
          if (comparings.length !== 2) {
              throw new Error("The item being compared must be 2 items");
          }

          const isSwapped = comparings[0].value > comparings[1].value;
          const swapped = isSwapped
              ? [comparings[1], comparings[0]]
              : [comparings[0], comparings[1]];
          let mapCursor = 0;
          const sorted = items.map((item, i) => {
              if (item.comparing) {
                  const swapItem = swapped[mapCursor];
                  const fixed =
            (i == last && mapCursor === 1) || last <= 1 ? true : swapItem.fixed;
                  mapCursor++;
                  return {
                      ...swapItem,
                      comparing: false,
                      fixed,
                  };
              } else {
                  return item;
              }
          });
          return new Bubble({
              ...this,
              items: sorted,
              swapCount: isSwapped ? swapCount + 1 : swapCount,
              cursor: cursor === last - 1 ? 0 : cursor + 1,
              last: cursor === last - 1 ? last - 1 : last,
          });
      }
      return this;
  };
}
