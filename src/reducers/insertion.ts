import { Reducer } from "react";
import { CompoersionSort } from "src/interfaces/Sorts";
import { Actions, ActionTypes } from "./actions";

const reducer: Reducer<CompoersionSort, Actions> = (state, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return {
                compCnt: 0,
                comparison: 0,
                cursor: 1, // 左と比較するので1から始める
                cursorMax: 1, // 今見てたものを記憶するのに使う
                cursorMin: NaN, // 使わないのでNaN固定
                direction: true, // 使わないのでtrue固定
                ended: false,
                items: action.payload.items,
                needSwap: false,
                pointer: NaN, // 使わないのでNaN
                swapCnt: 0,
            };
        case ActionTypes.STEP:
            if (state.ended) {
                // 終わっているときは何もしない
                return state;
            } else {
                return state.needSwap ? swap(state) : compare(state);
            }
        default:
            return state;
    }
};

function compare(state: CompoersionSort): CompoersionSort {
    if (state.items[state.cursor - 1].value <= state.items[state.cursor].value) {
    // 左のほうが小さいとき
        return {
            ...state,
            // 比較回数を増やす
            compCnt: state.compCnt + 1,
            // カーソルの処理
            ...nextCursor(state),
        };
    } else {
    // 左のほうが大きいとき
        return {
            ...state,
            // 比較回数を増やす
            compCnt: state.compCnt + 1,
            // 次のステップで入れ替えるように指示する
            needSwap: true,
        };
    }
}

function swap(state: CompoersionSort): CompoersionSort {
    // イミュータブルにするためにコピーする
    // deepである必要は今のところない
    const items = [...state.items];
    // 右隣と入れ替える
    const tmp = items[state.cursor];
    items[state.cursor] = items[state.cursor - 1];
    items[state.cursor - 1] = tmp;
    return {
        ...state,
        items,
        // 次は入れ替えなくていい
        needSwap: false,
        // 入れ替え回数を増やす
        swapCnt: state.swapCnt + 1,
        // カーソルの処理
        ...nextCursor(state),
    };
}

/**
 * 次のカーソル位置を計算する
 * それに伴って出てくる値も計算する
 */
function nextCursor({
    needSwap,
    cursor: cursorPrev,
    cursorMax,
    items,
}: CompoersionSort): Pick<
  CompoersionSort,
  "cursor" | "ended" | "comparison" | "cursorMax"
> {
    let cursor = 0;
    if (needSwap) {
    //入れ替えが必要な時
        if (cursorPrev === 1) {
            // 元が1の時は1にとどまる
            cursor = 1;
        } else {
            // それ以外の時は1戻る
            cursor = cursorPrev - 1;
        }
    } else {
    // 入れ替えが不要な時は見てたか所の１つ先に戻る
        cursor = cursorMax + 1;
    }
    return {
    // 表示上の比較対象はカーソルの左
        comparison: cursor - 1,
        cursor,
        // 入れ替えが必要な時はそのまま、入れ替えが不要なら進む
        cursorMax: needSwap ? cursorMax : cursorMax + 1,
        // 戻るときに今のカーソルの最大が1だったら終わる
        ended: !needSwap && cursor > items.length - 1,
    };
}

export default reducer;
