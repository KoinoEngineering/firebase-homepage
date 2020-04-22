import { ActionType, ChangeValueAction, CursorNextAction, CursorPrevAction, EndAction, InitAction, StartAction, SwapAction } from "./GnomeActions";

export default {
    changeValue: (payload: ChangeValueAction["payload"]): ChangeValueAction => ({ type: ActionType.CHANGE_VALUE, payload }),
    cursorPrev: (): CursorPrevAction => ({ type: ActionType.CURSOR_PREV }),
    cursorNext: (): CursorNextAction => ({ type: ActionType.CURSOR_NEXT }),
    start: (): StartAction => ({ type: ActionType.START, payload: { running: true } }),
    init: (): InitAction => ({ type: ActionType.INIT }),
    swap: (): SwapAction => ({ type: ActionType.SWAP }),
    end: (): EndAction => ({ type: ActionType.END, payload: { running: false } }),
};