import { connectRouter } from "connected-react-router";
import * as H from "history";
import { combineReducers } from "redux";
import header from "src/components/organisms/Header/HeaderReducer";
import { State } from "src/interfaces/State";
import bubble from "src/pages/Sorts/Bubble/BubbleReducer";
import gnome from "src/pages/Sorts/Gnome/GnomeReducer";
import shaker from "src/pages/Sorts/Shaker/ShakerReducer";

const createRootReducer = (history: H.History) => combineReducers<State>({
    header,
    router: connectRouter(history),
    bubble,
    shaker,
    gnome,
});
export default createRootReducer;