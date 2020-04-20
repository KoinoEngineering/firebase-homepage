import { combineReducers } from "redux";
import { State } from "src/interfaces/State";
import { connectRouter } from "connected-react-router";
import * as H from "history";
import bubble from "src/pages/Sorts/Bubble/BubbleReducer";

const createRootReducer = (history: H.History) => combineReducers<State>({
    router: connectRouter(history),
    bubble
});
export default createRootReducer;