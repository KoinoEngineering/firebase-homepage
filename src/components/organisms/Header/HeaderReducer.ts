import { Reducer } from "redux";
import { HeaderState } from "./Header";
import { HeaderActions, ActionType } from "./HeaderActions";

const initalState = (): HeaderState => ({ sideNavOpen: false });

const header: Reducer<HeaderState, HeaderActions> = (state = initalState(), action) => {
    switch (action.type) {
        case ActionType.OPEN_MENU:
        case ActionType.CLOSE_MENU:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default header;