import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ReplaceSortContentsState } from "../Parts/ReplaceSortContents";
import { ActionType, SelectActions } from "./SelectActions";
import { ORDER } from "./SelectConstants";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): SelectState => ({
    running: false,
    order: ORDER.ASC,
    contents: Array(20).fill(0).map((_, idx) => {
        return {
            id: uuidv4(),
            value: (20 - idx) * 5
        };
    }),
    cursor: 0,
    optionCursor: 0,
    cursorEnd: 0,
    delay: 0
});

const select: Reducer<SelectState, SelectActions> = (state = initialState(), action) => {
    switch (action.type) {
        case ActionType.CHANGE_VALUE:
            return {
                ...state,
                ...action.payload
            };
        case ActionType.START:
            return {
                ...state,
                running: true,
            };
        case ActionType.INIT:
            return init(state);
        case ActionType.CURSOR_NEXT:
            return {
                ...state,
                cursor: state.cursor + 1,
            };
        case ActionType.SET_OPTION:
            return {
                ...state,
                optionCursor: state.cursor
            };
        case ActionType.SWAP:
            if (state.optionCursor === undefined) {
                throw Error("state.optionCursor is undefined");
            }
            return {
                ...state,
                contents: state.contents
                    .map((item, i) => {
                        if (i === state.cursorEnd) {
                            return { ...state.contents[state.optionCursor], fixed: true };
                        } else if (i === state.optionCursor) {
                            return state.contents[state.cursorEnd];
                        } else {
                            return item;
                        }
                    })
            };
        case ActionType.PREV_END:
            return {
                ...state,
                cursorEnd: state.cursorEnd - 1
            };
        case ActionType.RESET_CURSOR:
            return {
                ...state,
                cursor: 0,
                optionCursor: 0
            };
        case ActionType.END:
            return {
                ...state,
                running: false,
                contents: state.contents.map(i => ({ ...i, fixed: false }))
            };
        default:
            return state;
    }
};

export default select;

export interface SelectState extends ReplaceSortContentsState {
    optionCursor: number;
    order: ORDER;
    cursorEnd: number;
    delay: number;
}

const init = (state: SelectState): SelectState => ({
    ...state,
    cursor: 0,
    cursorEnd: state.contents.length - 1,
    optionCursor: 0,
    contents: state.contents.map(i => ({ ...i, fixed: false }))
});
