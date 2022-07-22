import { Reducer } from "react";
import { ComparisonSort, ComparisonSortItem } from "src/interfaces/Sorts";
import { Actions, ActionTypes } from "./actions";

const reducer: Reducer<ComparisonSort, Actions> = (state, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return {
                compCnt: 0,
                comparison: 1,
                cursor: 0, // 右と比較するので0から始める
                cursorMax: 1, // 初期は幅2なので 0 ~ 1
                cursorMin: 0, // 初期は幅2なので 0 ~ 1
                direction: true, // trueなら右から,falseなら左からとる
                ended: false,
                items: action.payload.items,
                needSwap: false,
                pointer: 1, // cursorMaxと同じにして比較範囲をみえるようにする
                swapCnt: 0,
            };
        case ActionTypes.STEP:
            if (state.ended) {
                return state;
            } else {
                return state.needSwap ? swap(state) : compare(state);
            }
        default:
            return state;
    }
};

function compare(state: ComparisonSort): ComparisonSort {
    return {
        ...state,
        // 比較回数を増やす
        compCnt: state.compCnt + 1,
        // 左のほうが大きいときは右からとるのでtrue
        direction:
      state.items[state.cursor].value > state.items[state.comparison].value,
        // マージソートは比較したら必ず入れ替える
        needSwap: true,
        // カーソルの処理
        ...nextCursor(state),
    };
}

function swap(state: ComparisonSort): ComparisonSort {
    return {
        ...state,
        items: state.direction
            ? // 右からとるときは比較対象をカーソルの位置までずらす
            moveLeft(state.items, state.comparison, state.cursor)
            : // 左からとるときは見た目上変らない
            state.items,
        needSwap: false,
        // 右からとるときは交換回数を1増やす
        swapCnt: state.swapCnt + (state.direction ? 1 : 0),
        ...nextCursor(state),
    };
}

/**
 * 次のカーソル位置を計算する
 * それに伴って出てくる値も計算する
 */
function nextCursor({
    comparison,
    cursor,
    cursorMax,
    items,
    cursorMin,
    direction,
    ended,
    needSwap,
    pointer,
}: ComparisonSort): Pick<
  ComparisonSort,
  "cursor" | "cursorMax" | "cursorMin" | "ended" | "comparison" | "pointer"
> {
    if (needSwap) {
    // この回で移動したとき
    // - この回の比較が完了しているか
    //   - 右からとったときで比較対象が末尾まで行っているとき or
    //   - 左からとったときでカーソルが比較対象まで行っているとき
        if (
            (direction && comparison >= Math.min(cursorMax, items.length - 1)) ||
      (!direction && cursor + 1 >= comparison)
        ) {
            const areaLength = cursorMax - cursorMin + 1;
            // 比較範囲が最後かどうか
            if (cursorMax >= items.length - 1) {
                // 比較範囲が最後まで行っている
                // 次の範囲は今の範囲の2倍
                const nextAreaLength = areaLength * 2;
                return {
                    comparison: Math.round(nextAreaLength / 2), // 新しいエリアの半分の位置 割り算は誤差の保険でroundしておく
                    cursor: 0,
                    cursorMax: nextAreaLength - 1,
                    cursorMin: 0,
                    ended: nextAreaLength >= items.length * 2,
                    pointer: nextAreaLength - 1,
                };
            } else {
                // まだ後ろがある

                // 新しい始点
                // 今の始点に長さを足したもの( 0 -> 2, 4 -> 8 )
                const nextCursorMin = cursorMin + areaLength;
                return {
                    // 新しい始点に領域の長さの半分を足す
                    comparison: Math.min(
                        nextCursorMin + Math.round(areaLength / 2),
                        items.length - 1,
                    ),
                    // カーソル位置は新しい始点と同じ
                    cursor: nextCursorMin,
                    // はみ出る分も考慮して配列の長さとの小さいほう
                    cursorMax: nextCursorMin + areaLength - 1,
                    cursorMin: nextCursorMin,
                    ended, // まだ後ろがあるはずなので変えない
                    pointer: Math.min(nextCursorMin + areaLength - 1, items.length - 1),
                };
            }
        } else {
            // 比較が完了していないとき
            return {
                // 右からとったときは右に1進める
                comparison: comparison + (direction ? 1 : 0),
                // カーソルは1進める
                cursor: cursor + 1,
                cursorMax,
                cursorMin,
                ended,
                pointer,
            };
        }
    } else {
    // 移動しなかったときはカーソル周りは変わらない
        return {
            comparison,
            cursor,
            cursorMax,
            cursorMin,
            ended,
            pointer,
        };
    }
}

/**
 * 要素をstartの位置からendの位置まで左にずらす
 */
function moveLeft(items: ComparisonSortItem[], start: number, end: number) {
    const clone = [...items];
    for (let i = start; i > end; i--) {
        const tmp = clone[i];
        clone[i] = clone[i - 1];
        clone[i - 1] = tmp;
    }
    return clone;
}

export default reducer;
