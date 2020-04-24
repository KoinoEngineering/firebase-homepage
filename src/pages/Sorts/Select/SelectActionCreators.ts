import { ActionType, ChangeValueAction, SetRunningAction, StartAction, InitAction, StepAction, EndAction, SwapAction } from "./SelectActions";

export default {
    changeValue: (payload: ChangeValueAction["payload"]): ChangeValueAction => ({ type: ActionType.CHANGE_VALUE, payload }),
    setRunning: (running: SetRunningAction["payload"]["running"]): SetRunningAction => ({ type: ActionType.SET_RUNNING, payload: { running } }),
    start: (): StartAction => ({ type: ActionType.START, payload: { running: true } }),
    init: (): InitAction => ({ type: ActionType.INIT }),
    step: (): StepAction => ({ type: ActionType.STEP }),
    swap: (base: SwapAction["payload"]["base"]): SwapAction => ({ type: ActionType.SWAP, payload: { base } }),
    end: (): EndAction => ({ type: ActionType.END, payload: { running: false } }),
};