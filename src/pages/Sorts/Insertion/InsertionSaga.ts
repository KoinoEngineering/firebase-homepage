import InsertionActionCreators from "./InsertionActionCreators";
import { ActionType } from "./InsertionActions";
import { takeEvery, put, select, delay } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import { InsertionState } from "./InsertionReducer";
import { ORDER } from "../SortConstants";

const insertionSaga = function* () {
    yield takeEvery(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.CHECK_STATUS, checkStatusSaga);
    yield takeEvery(ActionType.CURSOR_NEXT, cursorNextSaga);
    yield takeEvery(ActionType.SET_OPTION, setOptionSaga);
    yield takeEvery(ActionType.SWAP, swapSaga);
    yield takeEvery(ActionType.PREV_END, prevEndSaga);
    yield takeEvery(ActionType.RESET_CURSOR, resetCursorSaga);
};

export default insertionSaga;

const startSaga = function* () {
    yield put(InsertionActionCreators.init());
};

const initSaga = function* () {
    yield put(InsertionActionCreators.checkStatus());
};

const isOptionUpdate = function* () {
    const { order, optionCursor = 0, cursor, contents } = (yield select<(state: State) => InsertionState>(state => state.insertion)) as Readonly<InsertionState>;
    return order === ORDER.ASC
        ? contents[optionCursor].value <= contents[cursor].value
        : contents[optionCursor].value >= contents[cursor].value;
};

const checkStatusSaga = function* () {
    const { cursor: i, cursorEnd: e, delay: d } = (yield select<(state: State) => InsertionState>(state => state.insertion)) as Readonly<InsertionState>;

    if (e < 0) {
        // 終わっている場合
        yield delay(500);
        yield put(InsertionActionCreators.end());
    } else if (i <= e) {
        yield delay(d);
        // 進行中
        if (yield isOptionUpdate()) {
            yield put(InsertionActionCreators.setOption());
        } else {
            yield put(InsertionActionCreators.cursorNext());
        }
    } else {
        // 最後まで検索した
        yield delay(d);
        yield put(InsertionActionCreators.swap());
    }
};

const cursorNextSaga = function* () {
    yield put(InsertionActionCreators.checkStatus());
};

const setOptionSaga = function* () {
    yield put(InsertionActionCreators.cursorNext());
};

const swapSaga = function* () {
    yield put(InsertionActionCreators.prevEnd());
};

const prevEndSaga = function* () {
    yield put(InsertionActionCreators.resetCurosr());
};

const resetCursorSaga = function* () {
    yield put(InsertionActionCreators.checkStatus());
};