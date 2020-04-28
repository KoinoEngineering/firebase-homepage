import { StartAction, ActionType, InitAction, CheckStatusAction, CursorNextAction, SetOptionAction, SwapAction, ChangeValueAction, EndAction, PrevEndAction, ResetCursorAction } from "./InsertionActions";

export default {
    changeValue: (payload: ChangeValueAction["payload"]): ChangeValueAction => ({ type: ActionType.CHANGE_VALUE, payload }),
    start: (): StartAction => ({ type: ActionType.START }),
    init: (): InitAction => ({ type: ActionType.INIT }),
    checkStatus: (): CheckStatusAction => ({ type: ActionType.CHECK_STATUS }),
    cursorNext: (): CursorNextAction => ({ type: ActionType.CURSOR_NEXT }),
    setOption: (): SetOptionAction => ({ type: ActionType.SET_OPTION }),
    swap: (): SwapAction => ({ type: ActionType.SWAP }),
    prevEnd: (): PrevEndAction => ({ type: ActionType.PREV_END }),
    resetCurosr: (): ResetCursorAction => ({ type: ActionType.RESET_CURSOR }),
    end: (): EndAction => ({ type: ActionType.END }),
};