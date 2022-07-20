import { Reducer } from "react";
import { CompoersionSort } from "src/interfaces/Sorts";
import { Actions, ActionTypes } from "./actions";

const reducer: Reducer<CompoersionSort, Actions> = (state, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return {
                compCnt: 0,
                comparison: 1,
                cursor: 0, // 右と比較するので0から始める
                cursorMax: action.payload.items.length - 2, // 右から二番目のカーソル位置まで
                cursorMin: NaN, // 使わないので0固定
                direction: true,
                ended: false,
                items: action.payload.items,
                needSwap: false,
                pointer: NaN, // 使わないので0
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

function compare(state: CompoersionSort): CompoersionSort {
    if (state.items[state.cursor].value <= state.items[state.cursor + 1].value) {
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
    items[state.cursor] = items[state.cursor + 1];
    items[state.cursor + 1] = tmp;
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
function nextCursor(
    state: CompoersionSort,
): Pick<CompoersionSort, "cursor" | "cursorMax" | "ended" | "comparison"> {
    // なんかあったときように大なりにしておく
    const isReturn = state.cursor >= state.cursorMax;
    // 戻るときは0それ以外は1進む
    const cursor = isReturn ? 0 : state.cursor + 1;
    return {
    // 表示上の比較対象はカーソルの右
        comparison: cursor + 1,
        cursor,
        cursorMax: isReturn ? state.cursorMax - 1 : state.cursorMax,
        // 戻るときに今のカーソルの最大が1だったら終わる
        ended: isReturn && state.cursorMax === 0,
    };
}

export default reducer;
