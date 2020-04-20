import { all, fork } from "redux-saga/effects";
import bubbleSaga from "src/pages/Sorts/Bubble/BubbleSaga";

const rootSaga = function* () {
    yield all([
        bubbleSaga
    ].map(saga => fork(saga)));
};

export default rootSaga;