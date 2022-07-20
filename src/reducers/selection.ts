import { Reducer } from "react";
import { CompoersionSort } from "src/interfaces/Sorts";
import { Actions, ActionTypes } from "./actions";

const reducer: Reducer<CompoersionSort, Actions> = (state, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return {
                compCnt: 0,
                comparison: NaN, // 比較対象は存在しないのでNaN
                cursor: 1, // 指定のか所を仮置きで初期値0にするので、開始位置は1
                cursorMax: action.payload.items.length - 1, // 一番後ろまで
                cursorMin: NaN, // 使わないので0固定
                direction: true,
                ended: false,
                items: action.payload.items,
                needSwap: false,
                pointer: 0, // 初期値を0として1回目の比較を省略する
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
    if (state.items[state.pointer].value < state.items[state.cursor].value) {
    // 今覚えている値のほうが小さいとき
        return {
            ...state,
            // 比較回数を増やす
            compCnt: state.compCnt + 1,
            // カーソルの処理
            ...nextCursor(state),
            // 今の位置を記憶しなおす
            pointer: state.cursor,
        };
    } else {
        return {
            ...state,
            compCnt: state.compCnt + 1,
            // カーソルの処理
            ...nextCursor(state),
        };
    }
}

function swap(state: CompoersionSort): CompoersionSort {
    if (state.cursorMax === state.pointer) {
    // カーソルの最大と覚えている位置が同じときは何もせず終わる
        return {
            ...state,
            // カーソルの処理
            ...nextCursor(state),
        };
    } else {
    // イミュータブルにするためにコピーする
    // deepである必要は今のところない
        const items = [...state.items];
        // 右隣と入れ替える
        const tmp = items[state.cursorMax];
        items[state.cursorMax] = items[state.pointer];
        items[state.pointer] = tmp;
        return {
            ...state,
            items,
            // 入れ替え回数を増やす
            swapCnt: state.swapCnt + 1,
            // カーソルの処理
            ...nextCursor(state),
        };
    }
}

/**
 * 次のカーソル位置を計算する
 * それに伴って出てくる値も計算する
 */
function nextCursor({
    needSwap,
    cursorMax,
    cursor: cursorPrev,
    pointer,
    ended,
}: CompoersionSort): Pick<
  CompoersionSort,
  "cursor" | "cursorMax" | "ended" | "needSwap" | "pointer"
> {
    if (needSwap) {
    // 今回で入れ替えを実行しているときはカーソルを戻して色初期化する
        return {
            // カーソルは1に戻す
            cursor: 1,
            // カーソルの最大を1減らす
            cursorMax: cursorMax - 1,
            // カーソルの最大が1になっていれば終わる
            ended: cursorMax <= 1,
            // 次回は入れ替えない
            needSwap: false,
            // 比較対象を0に戻す
            pointer: 0,
        };
    } else {
    // 入れ替えしなかったとき
        if (cursorPrev === cursorMax) {
            // 末尾まで来ているときは次の回で入れ替えをするフラグを立てる
            // それ以外は引き継ぎ
            return {
                cursor: cursorPrev,
                cursorMax: cursorMax,
                ended,
                needSwap: true,
                pointer,
            };
        } else {
            // 末尾まで来ていないときはカーソルをずらすだけ
            return {
                // カーソルを1増やす
                cursor: cursorPrev + 1,
                // カーソルの最大を1減らす
                cursorMax,
                // カーソルの最大が1になっていれば終わる
                ended,
                // 次回は入れ替えない
                needSwap,
                // 比較対象は変わらない
                pointer,
            };
        }
    }
}

export default reducer;
