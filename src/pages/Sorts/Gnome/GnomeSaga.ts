import { delay, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import GnomeActionCreators from "./GnomeActionCreators";
import { ActionType } from "./GnomeActions";
import { GnomeState } from "./GnomeReducer";
import { ORDER } from "../SortConstants";

const gnomeSaga = function* () {
    yield takeLeading(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.CURSOR_NEXT, cursorNextSaga);
    yield takeEvery(ActionType.SWAP, swapSaga);
    yield takeEvery(ActionType.CURSOR_PREV, cursorPrevSaga);
    yield takeEvery(ActionType.FIX, fixSaga);
};

export default gnomeSaga;

const swapCheck = function* () {
    const { cursor: i, contents, order } = (yield select<(s: State) => GnomeState>(state => state.gnome)) as Readonly<GnomeState>;
    return i === 0
        ? false
        : order === ORDER.ASC
            ? contents[i - 1].value > contents[i].value
            : contents[i - 1].value < contents[i].value;
};

// 開始のフラグを立てたので初期化する
const startSaga = function* () {
    yield put(GnomeActionCreators.init());
};

// 初期化ができたので再帰処理に入る
const initSaga = function* () {
    // fix
    yield (put(GnomeActionCreators.fix()));
};
// カーソルをチェックして振り分けをする
const cursorNextSaga = function* () {
    const { cursor: i, delay: d } = (yield select<(s: State) => GnomeState>(state => state.gnome)) as Readonly<GnomeState>;
    if (i === -1) {
        // cursorEndが0になっていれば終わる
        yield delay(500);
        yield (put(GnomeActionCreators.end()));
    } else {
        yield delay(d);
        if (yield swapCheck()) {
            yield (put(GnomeActionCreators.swap()));
        } else {
            // fix
            yield (put(GnomeActionCreators.fix()));
        }
    }
};

const swapSaga = function* () {
    yield (put(GnomeActionCreators.cursorPrev()));
};

const cursorPrevSaga = function* () {
    const { delay: d } = (yield select<(s: State) => GnomeState>(state => state.gnome)) as Readonly<GnomeState>;
    yield delay(d);
    if (yield swapCheck()) {
        yield (put(GnomeActionCreators.swap()));
    } else {
        // fix
        yield (put(GnomeActionCreators.fix()));
    }
};

const fixSaga = function* () {
    // 次のステップへ
    yield (put(GnomeActionCreators.cursorNext()));
};