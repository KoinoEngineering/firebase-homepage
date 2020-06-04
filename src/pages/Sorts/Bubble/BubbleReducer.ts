import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { contents2ChartData, contents2Lines, ReplaceSortChartState } from "../Parts/ReplaceSortChart";
import { ReplaceSortContents, ReplaceSortContentsState } from "../Parts/ReplaceSortContents";
import { ActionType, BubbleActions, SwapAction } from "./BubbleActions";
import { ORDER } from "./BubbleConstants";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): BubbleState => {
    const contents = Array(20).fill(0).map((_, idx) => {
        return {
            id: uuidv4(),
            value: (20 - idx) * 5
        };
    });
    return {
        running: false,
        order: ORDER.ASC,
        contents,
        cursor: 0,
        cursorEnd: 0,
        delay: 0,
        chartObject: {
            data: [contents2ChartData(contents, 0)],
            lines: contents2Lines(contents)
        }
    };
};

const bubble: Reducer<BubbleState, BubbleActions> = (state = initialState(), action) => {
    switch (action.type) {
        case ActionType.CHANGE_VALUE:
        case ActionType.SET_RUNNING:
            return {
                ...state,
                ...action.payload
            };
        case ActionType.START:
            return {
                ...state,
                ...action.payload,
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
                contents: swap(state.contents, action.payload.base),
            };
        default:
            return state;
    }
};

export default bubble;

export interface BubbleState extends ReplaceSortContentsState, ReplaceSortChartState {
    order: ORDER;
    cursorEnd: number;
    delay: number;
}

const init = (state: BubbleState): BubbleState => {
    const contents = state.contents.map(item => ({ ...item, id: uuidv4(), fixed: false }));
    return {
        ...state,
        contents,
        cursor: 0,
        cursorEnd: state.contents.length - 1,
        chartObject: {
            data: [contents2ChartData(contents, 0)],
            lines: contents2Lines(contents)
        }
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