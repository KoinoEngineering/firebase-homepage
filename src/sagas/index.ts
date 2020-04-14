import { fork, all } from "redux-saga/effects";
import { checkUserStateSaga } from "./auth";

const rootSaga = function* () {
    yield all([
        checkUserStateSaga(), //auth saga
        ...[
        ].map(saga => fork(saga))]);
};

export default rootSaga;