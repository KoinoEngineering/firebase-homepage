import { all, fork } from "redux-saga/effects";
import bubbleSaga from "src/pages/Sorts/Bubble/BubbleSaga";
import shakerSaga from "src/pages/Sorts/Shaker/ShakerSaga";

const rootSaga = function* () {
    yield all([
        bubbleSaga,
        shakerSaga,
    ].map(saga => fork(saga)));
};

export default rootSaga;