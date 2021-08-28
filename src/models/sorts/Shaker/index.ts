import Comparsion, { ComparsionParams } from "../Comparsion";
interface ShakerAdditionalProperty {
  cursor: number;
  start: number;
  last: number;
  isUp: boolean;
}

type ShakerParams = ComparsionParams & Partial<ShakerAdditionalProperty>;

export default class Shaker
    extends Comparsion
    implements ShakerAdditionalProperty
{
  public name = "シェーカーソート";
  public cursor: number;
  public start: number;
  public last: number;
  public isUp: boolean;
  constructor({
      items,
      compareCount,
      swapCount,
      cursor,
      start,
      last,
      isUp,
  }: ShakerParams) {
      super({ items, compareCount, swapCount });
      this.cursor = cursor || 0;
      this.start = start || 0;
      this.last = last || items.length - 1;
      this.isUp = isUp ?? true;
  }

  public compare = async () => {
      const { items, compareCount } = this;
      if (!this.ended()) {
          return new Shaker({
              ...this,
              items: items.map((item, i) => {
                  if (i === this.cursor || i === this.cursor + 1) {
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
          let { swapCount } = this;
          const { items, cursor, start, last, isUp } = this;
          // 比較中のものを取り出す
          const comparings = items.filter((item) => item.comparing);

          //   とりあえず2個じゃなかったら落とす
          if (comparings.length !== 2) {
              throw new Error("The item being compared must be 2 items");
          }

          // 比較中のものの順序をそろえる
          const swapped =
        comparings[0].value > comparings[1].value
            ? (++swapCount, comparings.reverse())
            : comparings;

          let mapCursor = 0;
          const nextUp = cursor === (isUp ? last - 1 : start) ? !isUp : isUp;
          return new Shaker({
              ...this,
              items: items.map((item, i) => {
                  if (item.comparing) {
                      return {
                          ...swapped[mapCursor++],
                          comparing: false,
                          fixed: i === (isUp ? last : start) || start + 1 === last,
                      };
                  } else {
                      return item;
                  }
              }),
              isUp: nextUp,
              last: isUp && cursor === last - 1 ? last - 1 : last,
              start: !isUp && cursor === start ? start + 1 : start,
              cursor: this.getCursor(isUp, cursor, start, last),
              swapCount,
          });
      }
      return this;
  };
  private getCursor(
      isUp: boolean,
      cursor: number,
      start: number,
      last: number,
  ) {
      if (isUp) {
          if (cursor === last - 1) {
              return cursor - 1;
          } else {
              return cursor + 1;
          }
      } else {
          if (cursor === start) {
              return cursor + 1;
          } else {
              return cursor - 1;
          }
      }
  }
}
