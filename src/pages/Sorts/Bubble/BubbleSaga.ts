import { delay, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import BubbleActionCreators from "./BubbleActionCreators";
import { ActionType } from "./BubbleActions";
import { ORDER } from "./BubbleConstants";
import { BubbleState } from "./BubbleReducer";
import { ReplaceSortElement } from "../Parts/ReplaceSortContents";
import { contents2ChartData } from "../Parts/ReplaceSortChart";

const bubbleSaga = function* () {
    yield takeLeading(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.STEP, stepSaga);
};

export default bubbleSaga;

// 開始のフラグを立てたので初期化する
const startSaga = function* () {
    yield put(BubbleActionCreators.init());
};

// 初期化ができたので再帰処理に入る
const initSaga = function* () {
    yield put(BubbleActionCreators.step());
};
// ループの視点カーソルをチェックして振り分けをする
const stepSaga = function* () {
    const { cursor: i, cursorEnd: e, contents: array, order, delay: d, chartObject } = (yield select<(s: State) => BubbleState>(state => state.bubble)) as Readonly<BubbleState>;
    const orderFunc = (e1: ReplaceSortElement, e2: ReplaceSortElement) => order === ORDER.ASC ? e1.value > e2.value : e1.value < e2.value;
    if (e < 0) {
        // cursorEndが0になっていれば終わる
        yield delay(500);
        yield (put(BubbleActionCreators.end()));
    } else {
        // カーソルの判定
        if (i < e) {
            // 終わっていなければswap判定をする
            if (orderFunc(array[i], array[i + 1])) {
                yield (put(BubbleActionCreators.swap(i)));
            }
            // カーソルをずらす
            yield (put(BubbleActionCreators.changeValue({
                cursor: i + 1,
                chartObject: {
                    ...chartObject,
                    data: chartObject.data
                        .concat([contents2ChartData(array, chartObject.data.length)])
                }
            })));
        } else {
            // カーソルがeまで進んでいる場合はeを左にずらしiは初期化一番後ろをfixed
            yield (put(BubbleActionCreators.changeValue({
                contents: array.map((item, idx) => idx === e ? { ...item, fixed: true } : item),
                cursor: 0,
                cursorEnd: e - 1
            })));
        }
        yield delay(d);
        // 次のステップへ
        yield (put(BubbleActionCreators.step()));
    }
};