import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ActionType, BubbleActions, SwapAction } from "./BubbleActions";
import { ORDER } from "./BubbleConstants";
import { ReplaceSortContents, ReplaceSortContentsState } from "../Parts/ReplaceSortContents";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): BubbleState => ({
    running: false,
    order: ORDER.ASC,
    contents: [
        { id: uuidv4(), value: 50 },
        { id: uuidv4(), value: 40 },
        { id: uuidv4(), value: 30 },
        { id: uuidv4(), value: 20 },
        { id: uuidv4(), value: 10 },
    ],
    cursor: 0,
    cursorEnd: 0,
    delay: 0
});

const bubble: Reducer<BubbleState, BubbleActions> = (state = initialState(), action) => {
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
                contents: swap(state.contents, action.payload.base)
            };
        default:
            return state;
    }
};

export default bubble;

export interface BubbleState extends ReplaceSortContentsState {
    order: ORDER;
    cursorEnd: number;
    delay: number;
}

const init = (state: BubbleState): BubbleState => {
    return {
        ...state,
        contents: state.contents.map(item => ({ ...item, id: uuidv4(), fixed: false })),
        cursor: 0,
        cursorEnd: state.contents.length - 1
    };
};

const swap = (array: ReplaceSortContents, base: SwapAction["payload"]["base"]): ReplaceSortContents => array.map((item, idx, _this) => {
    if (idx === base) {
        return _this[base + 1];
    } else if (idx === base + 1) {
        return _this[base];
    } else {
        return item;
    }
});