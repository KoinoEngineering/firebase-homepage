import { delay, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import GnomeActionCreators from "./GnomeActionCreators";
import { ActionType } from "./GnomeActions";
import { ORDER } from "./GnomeConstants";
import { GnomeState } from "./GnomeReducer";
import { ReplaceSortElement } from "../Parts/ReplaceSortContents";

const gnomeSaga = function* () {
    yield takeLeading(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.STEP, stepSaga);
};

export default gnomeSaga;

// 開始のフラグを立てたので初期化する
const startSaga = function* () {
    yield put(GnomeActionCreators.init());
};

// 初期化ができたので再帰処理に入る
const initSaga = function* () {
    yield put(GnomeActionCreators.step());
};
// ループの視点カーソルをチェックして振り分けをする
const stepSaga = function* () {
    const { cursor: i, cursorEnd: e, contents: array, order, delay: d } = (yield select<(s: State) => GnomeState>(state => state.gnome)) as Readonly<GnomeState>;
    const orderFunc = (e1: ReplaceSortElement, e2: ReplaceSortElement) => order === ORDER.ASC ? e1.value > e2.value : e1.value < e2.value;
    if (e < 0) {
        // cursorEndが0になっていれば終わる
        yield delay(500);
        yield (put(GnomeActionCreators.end()));
    } else {
        // カーソルの判定
        if (i < e) {
            // 終わっていなければswap判定をする
            if (orderFunc(array[i], array[i + 1])) {
                yield (put(GnomeActionCreators.swap(i)));
            }
            // カーソルをずらす
            yield (put(GnomeActionCreators.changeValue({ cursor: i + 1 })));
        } else {
            // カーソルがeまで進んでいる場合はeを左にずらしiは初期化一番後ろをfixed
            yield (put(GnomeActionCreators.changeValue({
                contents: array.map((item, idx) => idx === e ? { ...item, fixed: true } : item),
                cursor: 0,
                cursorEnd: e - 1
            })));
        }
        yield delay(d);
        // 次のステップへ
        yield (put(GnomeActionCreators.step()));
    }
};