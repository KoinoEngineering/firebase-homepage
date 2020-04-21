import { delay, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { State } from "src/interfaces/State";
import ShakerActionCreators from "./ShakerActionCreators";
import { ActionType } from "./ShakerActions";
import { ORDER } from "./ShakerConstants";
import { ShakerState } from "./ShakerReducer";

const shakerSaga = function* () {
    yield takeLeading(ActionType.START, startSaga);
    yield takeEvery(ActionType.INIT, initSaga);
    yield takeEvery(ActionType.STEP, stepSaga);
};

export default shakerSaga;

// 開始のフラグを立てたので初期化する
const startSaga = function* () {
    yield put(ShakerActionCreators.init());
};

// 初期化ができたので再帰処理に入る
const initSaga = function* () {
    yield put(ShakerActionCreators.step());
};
// ループの視点カーソルをチェックして振り分けをする
const stepSaga = function* () {
    const {
        cursor: i,
        cursorEnd: ce,
        cursorStart: cs,
        contents,
        order,
        delay: d,
        direction } = (yield select<(s: State) => ShakerState>(state => state.shaker)) as Readonly<ShakerState>;
    const isAsc = () => direction === 1;
    const orderFunc = () => {
        const target = isAsc() ? i : i - 1;
        return order === ORDER.ASC ? contents[target].value > contents[target + 1].value : contents[target].value < contents[target + 1].value;
    };
    if (cs === ce) {
        // 終端が同じになったら終わる
        yield delay(500);
        yield (put(ShakerActionCreators.end()));
    } else {
        // カーソルの判定
        if (isAsc() ? i < ce : cs < i) {
            // 終わっていなければswap判定をする
            if (orderFunc()) {
                yield (put(ShakerActionCreators.swap({ base: i, direction })));
            }
            // カーソルをずらす
            yield (put(ShakerActionCreators.changeValue({ cursor: i + direction })));
        } else {
            // カーソルが終端まで進んでいる場合は終端を内側にずらしiは初期化 終端をfixed 向きを反転
            yield (put(ShakerActionCreators.changeValue({
                contents: contents.map((item, idx) => idx === (isAsc() ? ce : cs) ? { ...item, fixed: true } : item),
                cursor: i - direction,
                cursorEnd: isAsc() ? ce - 1 : ce,
                cursorStart: isAsc() ? cs : cs + 1,
                direction: isAsc() ? -1 : 1,
            })));
        }
        yield delay(d);
        // 次のステップへ
        yield (put(ShakerActionCreators.step()));
    }
};