import { Reducer } from "react";
import { CompoersionSort } from "src/interfaces/Sorts";
import { Actions, ActionTypes } from "./actions";

const reducer: Reducer<CompoersionSort, Actions> = (state, action) => {
    if (state.ended) {
        return state;
    } else {
        switch (action.type) {
            case ActionTypes.INIT:
                return {
                    items: action.payload.items,
                    cursor: 0, // 右と比較するので0から始める
                    comparison: 1,
                    cursorMin: NaN, // 使わないので0固定
                    cursorMax: action.payload.items.length - 2, // 右から二番目のカーソル位置まで
                    pointer: NaN, // 使わないので0
                    needSwap: false,
                    compCnt: 0,
                    swapCnt: 0,
                    ended: false,
                };
            case ActionTypes.STEP:
                return state.needSwap ? swap(state) : compare(state);
            default:
                return state;
        }
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
            // 次のステップで入れ替えるように指示する
            needSwap: true,
            // 比較回数を増やす
            compCnt: state.compCnt + 1,
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

// 右は時まで来てた時は戻る
// そうでなければ進む
function nextCursor(
    state: CompoersionSort,
): Pick<CompoersionSort, "cursor" | "cursorMax" | "ended" | "comparison"> {
    // なんかあったときように大なりにしておく
    const isReturn = state.cursor >= state.cursorMax;
    const cursor = isReturn ? 0 : state.cursor + 1;
    return {
        cursor,
        comparison: cursor + 1,
        cursorMax: isReturn ? state.cursorMax - 1 : state.cursorMax,
        // 戻るときに今のカーソルの最大が1だったら終わる
        ended: isReturn && state.cursorMax === 0,
    };
}

export default reducer;
