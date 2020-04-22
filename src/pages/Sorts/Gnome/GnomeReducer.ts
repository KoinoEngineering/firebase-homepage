import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ActionType, GnomeActions } from "./GnomeActions";
import { ORDER } from "./GnomeConstants";
import { ReplaceSortContents, ReplaceSortContentsState } from "../Parts/ReplaceSortContents";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): GnomeState => ({
    running: false,
    order: ORDER.ASC,
    contents: Array(20).fill(0).map((_, idx) => {
        return {
            id: uuidv4(),
            value: (20 - idx) * 5
        };
    }),
    cursor: 0,
    moving: 0,
    delay: 0
});

const gnome: Reducer<GnomeState, GnomeActions> = (state = initialState(), action) => {
    switch (action.type) {
        case ActionType.CHANGE_VALUE:
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
        case ActionType.CURSOR_PREV:
        case ActionType.CURSOR_NEXT:
            return {
                ...state,
                cursor: state.cursor + (action.type === ActionType.CURSOR_PREV ? -1 : 1)
            };
        case ActionType.INIT:
            return init(state);
        case ActionType.SWAP:
            return {
                ...state,
                contents: swap(state.contents, state.cursor)
            };
        default:
            return state;
    }
};

export default gnome;

export interface GnomeState extends ReplaceSortContentsState {
    order: ORDER;
    moving: number;
    delay: number;
}

const init = (state: GnomeState): GnomeState => {
    return {
        ...state,
        contents: state.contents.map(item => ({ ...item, id: uuidv4(), fixed: false })),
        cursor: 0,
    };
};

const swap = (contents: ReplaceSortContents, cursor: GnomeState["cursor"]): ReplaceSortContents => contents.map((item, idx, _this) => {
    if (idx === cursor) {
        return _this[cursor - 1];
    } else if (idx === cursor - 1) {
        return _this[cursor];
    } else {
        return item;
    }
});