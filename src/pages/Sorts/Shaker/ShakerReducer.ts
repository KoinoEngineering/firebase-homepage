import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ActionType, ShakerActions, SwapAction } from "./ShakerActions";
import { ORDER } from "./ShakerConstants";
import { ReplaceSortContentsState } from "../Parts/ReplaceSortContents";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): ShakerState => ({
    running: false,
    order: ORDER.ASC,
    contents: [
        { id: uuidv4(), value: 100 },
        { id: uuidv4(), value: 90 },
        { id: uuidv4(), value: 80 },
        { id: uuidv4(), value: 70 },
        { id: uuidv4(), value: 60 },
        { id: uuidv4(), value: 50 },
        { id: uuidv4(), value: 40 },
        { id: uuidv4(), value: 30 },
        { id: uuidv4(), value: 20 },
        { id: uuidv4(), value: 10 },
    ],
    cursor: 0,
    cursorStart: 0,
    cursorEnd: 0,
    delay: 0,
    direction: 1,
});

const shaker: Reducer<ShakerState, ShakerActions> = (state = initialState(), action): ShakerState => {
    switch (action.type) {
        case ActionType.CHANGE_VALUE:
        case ActionType.SET_RUNNING:
        case ActionType.START:
            return {
                ...state,
                ...action.payload
            };
        case ActionType.END:
            return {
                ...state,
                ...action.payload,
                contents: state.contents.map(i => ({ ...i, fixed: false }))
            };
        case ActionType.INIT:
            return init(state);
        case ActionType.SWAP:
            return {
                ...state,
                contents: swap(state.contents, action.payload)
            };
        default:
            return state;
    }
};

export default shaker;

export interface ShakerState extends ReplaceSortContentsState {
    order: ORDER;
    cursorStart: number;
    cursorEnd: number;
    delay: number;
    direction: -1 | 1;
}

const init = (state: ShakerState): ShakerState => {
    return {
        ...state,
        contents: state.contents.map(item => ({ ...item, id: uuidv4(), fixed: false })),
        cursor: 0,
        cursorStart: 0,
        cursorEnd: state.contents.length - 1,
        direction: 1,
    };
};

const swap = (contents: ShakerState["contents"], { base, direction }: SwapAction["payload"]): ShakerState["contents"] => contents.map((item, idx, _this) => {
    if (idx === base) {
        return _this[base + direction];
    } else if (idx === base + direction) {
        return _this[base];
    } else {
        return item;
    }
});