import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ActionType, ShakerActions, SwapAction } from "./ShakerActions";
import { ORDER } from "./ShakerConstants";
import { ShakerContents } from "./Parts/ShakerContents";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): ShakerState => ({
    running: false,
    order: ORDER.ASC,
    array: [
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

const shaker: Reducer<ShakerState, ShakerActions> = (state = initialState(), action) => {
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
                array: state.array.map(i => ({ ...i, fixed: false }))
            };
        case ActionType.INIT:
            return init(state);
        case ActionType.SWAP:
            return {
                ...state,
                array: swap(state.array, action.payload)
            };
        default:
            return state;
    }
};

export default shaker;

export interface ShakerState {
    running: boolean;
    order: ORDER;
    array: ShakerContents;
    cursor: number;
    cursorStart: number;
    cursorEnd: number;
    delay: number;
    direction: -1 | 1;
}

const init = (state: ShakerState): ShakerState => {
    return {
        ...state,
        array: state.array.map(item => ({ ...item, id: uuidv4(), fixed: false })),
        cursor: 0,
        cursorStart: 0,
        cursorEnd: state.array.length - 1,
        direction: 1,
    };
};

const swap = (array: ShakerContents, { base, direction }: SwapAction["payload"]): ShakerContents => array.map((item, idx, _this) => {
    if (idx === base) {
        return _this[base + direction];
    } else if (idx === base + direction) {
        return _this[base];
    } else {
        return item;
    }
});