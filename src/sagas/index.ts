import { all, fork } from "redux-saga/effects";
import bubbleSaga from "src/pages/Sorts/Bubble/BubbleSaga";
import gnomeSaga from "src/pages/Sorts/Gnome/GnomeSaga";
import selectSaga from "src/pages/Sorts/Select/SelectSaga";
import shakerSaga from "src/pages/Sorts/Shaker/ShakerSaga";
import insertionSaga from "src/pages/Sorts/Insertion/InsertionSaga";

const rootSaga = function* () {
    yield all([
        bubbleSaga,
        shakerSaga,
        gnomeSaga,
        selectSaga,
        insertionSaga,
    ].map(saga => fork(saga)));
};

export default rootSaga;