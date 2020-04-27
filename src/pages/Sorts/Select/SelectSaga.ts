import SelectActionCreators from "./SelectActionCreators";
import { ActionType } from "./SelectActions";
import { takeEvery, put, select, delay } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import { SelectState } from "./SelectReducer";
import { ORDER } from "../SortConstants";

const selectSaga = function* () {
    yield takeEvery(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.CHECK_STATUS, checkStatusSaga);
    yield takeEvery(ActionType.CURSOR_NEXT, cursorNextSaga);
    yield takeEvery(ActionType.SET_OPTION, setOptionSaga);
    yield takeEvery(ActionType.SWAP, swapSaga);
    yield takeEvery(ActionType.PREV_END, prevEndSaga);
    yield takeEvery(ActionType.RESET_CURSOR, resetCursorSaga);
};

export default selectSaga;

const startSaga = function* () {
    yield put(SelectActionCreators.init());
};

const initSaga = function* () {
    yield put(SelectActionCreators.checkStatus());
};

// PREV_END = "firebase-homepage/sort/select/PREV_END",
// END = "firebase-homepage/sort/select/END",

const isOptionUpdate = function* () {
    const { order, optionCursor = 0, cursor, contents } = (yield select<(state: State) => SelectState>(state => state.select)) as Readonly<SelectState>;
    return order === ORDER.ASC
        ? contents[optionCursor].value <= contents[cursor].value
        : contents[optionCursor].value >= contents[cursor].value;
};

const checkStatusSaga = function* () {
    const { cursor: i, cursorEnd: e, delay: d } = (yield select<(state: State) => SelectState>(state => state.select)) as Readonly<SelectState>;

    if (e < 0) {
        // 終わっている場合
        yield delay(500);
        yield put(SelectActionCreators.end());
    } else if (i <= e) {
        yield delay(d);
        // 進行中
        if (yield isOptionUpdate()) {
            yield put(SelectActionCreators.setOption());
        } else {
            yield put(SelectActionCreators.cursorNext());
        }
    } else {
        // 最後まで検索した
        yield delay(d);
        yield put(SelectActionCreators.swap());
    }
};

const cursorNextSaga = function* () {
    yield put(SelectActionCreators.checkStatus());
};

const setOptionSaga = function* () {
    yield put(SelectActionCreators.cursorNext());
};

const swapSaga = function* () {
    yield put(SelectActionCreators.prevEnd());
};

const prevEndSaga = function* () {
    yield put(SelectActionCreators.resetCurosr());
};

const resetCursorSaga = function* () {
    yield put(SelectActionCreators.checkStatus());
};