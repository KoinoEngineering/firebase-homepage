import { combineReducers } from "redux";
import { State } from "src/interfaces/State";
import { connectRouter } from "connected-react-router";
import * as H from "history";

const createRootReducer = (history: H.History) => combineReducers<State>({
    router: connectRouter(history),
});
export default createRootReducer;