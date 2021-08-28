import Comparsion, { ComparsionParams } from "../Comparsion";

interface GnomeAdditionalProperty {
  cursor: number;
}
type GnomeParams = ComparsionParams & Partial<GnomeAdditionalProperty>;
export default class Gnome
    extends Comparsion
    implements GnomeAdditionalProperty
{
  public name = "ノームソート";
  public cursor: number;
  constructor({ items, compareCount, swapCount, cursor }: GnomeParams) {
      super({ items, compareCount, swapCount });
      this.cursor = cursor || 0;
  }

  public compare = async (): Promise<Gnome> => {
      const { items, compareCount, cursor } = this;
      if (!this.ended()) {
          return new Gnome({
              ...this,
              items: items.map((item, i) => {
                  return {
                      ...item,
                      comparing: i === cursor || i === cursor + 1,
                  };
              }),
              compareCount: compareCount + 1,
          });
      }
      return this;
  };

  public swap = async () => {
      if (!this.ended()) {
          const { items, cursor, swapCount } = this;
          // 比較中のものを取り出す
          const comparings = items.filter((item) => item.comparing);

          //   とりあえず2個じゃなかったら落とす
          if (comparings.length !== 2) {
              throw new Error("The item being compared must be 2 items");
          }

          // 比較中のものの順序をそろえる
          let isSwapped = false;
          const swapped =
        comparings[0].value > comparings[1].value
            ? ((isSwapped = true), [comparings[1], comparings[0]])
            : comparings;

          //   並べ替える
          let mapCursor = 0;
          const sorted = items.map((item, i) => {
              if (item.comparing) {
                  const swapTarget = swapped[mapCursor];
                  const fixed =
            i === items.length - 1 ||
            ((cursor === 0 || !isSwapped) && mapCursor === 0)
                ? true
                : swapTarget.fixed;
                  mapCursor++;
                  return {
                      ...swapTarget,
                      fixed,
                  };
              } else {
                  return item;
              }
          });
          return new Gnome({
              ...this,
              items: sorted,
              cursor:
          !isSwapped || cursor === 0
              ? sorted.findIndex((i) => !i.fixed)
              : cursor - 1,
              swapCount: isSwapped ? swapCount + 1 : swapCount,
          });
      }
      return this;
  };
}
