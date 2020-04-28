import { delay, put, select, takeEvery } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import InsertionActionCreators from "./InsertionActionCreators";
import { ActionType } from "./InsertionActions";
import { InsertionState } from "./InsertionReducer";

const insertionSaga = function* () {
    yield takeEvery(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.CHECK_STATUS, checkStatusSaga);
    yield takeEvery(ActionType.INSERTION, insertionActionSaga);
};

export default insertionSaga;

const startSaga = function* () {
    yield put(InsertionActionCreators.init());
};

const initSaga = function* () {
    yield put(InsertionActionCreators.checkStatus());
};

const checkStatusSaga = function* () {
    const { contents, delay: d } = (yield select<(state: State) => InsertionState>(state => state.insertion)) as Readonly<InsertionState>;
    yield delay(d);
    if (contents.length) {
        yield put(InsertionActionCreators.insertion());
    } else {
        yield put(InsertionActionCreators.end());
    }
};

const insertionActionSaga = function* () {
    yield put(InsertionActionCreators.checkStatus());
};
