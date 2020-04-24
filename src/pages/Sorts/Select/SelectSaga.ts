import { delay, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import SelectActionCreators from "./SelectActionCreators";
import { ActionType } from "./SelectActions";
import { ORDER } from "./SelectConstants";
import { SelectState } from "./SelectReducer";
import { ReplaceSortElement } from "../Parts/ReplaceSortContents";

const selectSaga = function* () {
    yield takeLeading(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.STEP, stepSaga);
};

export default selectSaga;

// 開始のフラグを立てたので初期化する
const startSaga = function* () {
    yield put(SelectActionCreators.init());
};

// 初期化ができたので再帰処理に入る
const initSaga = function* () {
    yield put(SelectActionCreators.step());
};
// ループの視点カーソルをチェックして振り分けをする
const stepSaga = function* () {
    const { cursor: i, cursorEnd: e, contents: array, order, delay: d } = (yield select<(s: State) => SelectState>(state => state.select)) as Readonly<SelectState>;
    const orderFunc = (e1: ReplaceSortElement, e2: ReplaceSortElement) => order === ORDER.ASC ? e1.value > e2.value : e1.value < e2.value;
    if (e < 0) {
        // cursorEndが0になっていれば終わる
        yield delay(500);
        yield (put(SelectActionCreators.end()));
    } else {
        // カーソルの判定
        if (i < e) {
            // 終わっていなければswap判定をする
            if (orderFunc(array[i], array[i + 1])) {
                yield (put(SelectActionCreators.swap(i)));
            }
            // カーソルをずらす
            yield (put(SelectActionCreators.changeValue({ cursor: i + 1 })));
        } else {
            // カーソルがeまで進んでいる場合はeを左にずらしiは初期化一番後ろをfixed
            yield (put(SelectActionCreators.changeValue({
                contents: array.map((item, idx) => idx === e ? { ...item, fixed: true } : item),
                cursor: 0,
                cursorEnd: e - 1
            })));
        }
        yield delay(d);
        // 次のステップへ
        yield (put(SelectActionCreators.step()));
    }
};