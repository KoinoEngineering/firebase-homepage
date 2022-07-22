import { Reducer } from "react";
import { ComparisonSort } from "src/interfaces/Sorts";
import { Actions, ActionTypes } from "./actions";

const reducer: Reducer<ComparisonSort, Actions> = (state, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return {
                compCnt: 0,
                comparison: 1,
                cursor: 0, // 右と比較するので0から始める
                cursorMax: action.payload.items.length - 2, // 右から二番目のカーソル位置まで
                cursorMin: 1, // 下りの最初は1まで。最初は登りなので無視できる
                direction: true, // 昇順から始める
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

function compare(state: ComparisonSort): ComparisonSort {
    if (state.direction) {
    // 登りの時
        if (
            state.items[state.cursor].value <= state.items[state.cursor + 1].value
        ) {
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
    } else {
    // 下りの時
        if (
            state.items[state.cursor - 1].value <= state.items[state.cursor].value
        ) {
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
}

function swap(state: ComparisonSort): ComparisonSort {
    // イミュータブルにするためにコピーする
    // deepである必要は今のところない
    const items = [...state.items];
    // 右隣と入れ替える
    if (state.direction) {
        const tmp = items[state.cursor];
        items[state.cursor] = items[state.cursor + 1];
        items[state.cursor + 1] = tmp;
    } else {
        const tmp = items[state.cursor];
        items[state.cursor] = items[state.cursor - 1];
        items[state.cursor - 1] = tmp;
    }
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
    direction,
    cursor: cursorPrev,
    cursorMax,
    cursorMin,
}: ComparisonSort): Pick<
  ComparisonSort,
  "cursor" | "cursorMax" | "cursorMin" | "ended" | "comparison" | "direction"
> {
    // なんかあったときように大なりにしておく
    const isReturn = direction
        ? cursorPrev >= cursorMax // 登りのときはmaxを超えたら
        : cursorPrev <= cursorMin; // 下りのときはminより小さくなったら

    // 戻るときは0それ以外は1進む
    const cursor = direction
        ? isReturn
            ? cursorPrev
            : cursorPrev + 1 // 登りの時は戻るときはそのまま。進むときは+1
        : isReturn
            ? cursorPrev
            : cursorPrev - 1; // 下りの時は戻るときはそのまま。進むときは-1

    return {
    // 表示上の比較対象はカーソルの右
        comparison:
      cursor + (isReturn ? (!direction ? 1 : -1) : direction ? 1 : -1),
        cursor,
        cursorMax: direction && isReturn ? cursorMax - 1 : cursorMax,
        cursorMin: !direction && isReturn ? cursorMin + 1 : cursorMin,
        direction: isReturn ? !direction : direction,
        // 戻るときに今のカーソルの最大が1だったら終わる
        ended: cursorMin > cursorMax,
    };
}

export default reducer;
