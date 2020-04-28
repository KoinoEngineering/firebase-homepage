import { StartAction, ActionType, InitAction, CheckStatusAction, SwapAction, ChangeValueAction, EndAction } from "./InsertionActions";

export default {
    changeValue: (payload: ChangeValueAction["payload"]): ChangeValueAction => ({ type: ActionType.CHANGE_VALUE, payload }),
    start: (): StartAction => ({ type: ActionType.START }),
    init: (): InitAction => ({ type: ActionType.INIT }),
    checkStatus: (): CheckStatusAction => ({ type: ActionType.CHECK_STATUS }),
    insertion: (): SwapAction => ({ type: ActionType.INSERTION }),
    end: (): EndAction => ({ type: ActionType.END }),
};