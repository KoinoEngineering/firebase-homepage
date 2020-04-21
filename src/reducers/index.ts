import { combineReducers } from "redux";
import { State } from "src/interfaces/State";
import { connectRouter } from "connected-react-router";
import * as H from "history";
import bubble from "src/pages/Sorts/Bubble/BubbleReducer";
import shaker from "src/pages/Sorts/Shaker/ShakerReducer";
import header from "src/components/organisms/Header/HeaderReducer";

const createRootReducer = (history: H.History) => combineReducers<State>({
    header,
    router: connectRouter(history),
    bubble,
    shaker,
});
export default createRootReducer;