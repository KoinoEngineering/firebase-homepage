import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ReplaceSortChartState, initialReplaceSortChartState, contents2ChartData } from "../Parts/ReplaceSortChart";
import { ReplaceSortContents, ReplaceSortContentsState } from "../Parts/ReplaceSortContents";
import { ActionType, GnomeActions } from "./GnomeActions";
import { ORDER } from "./GnomeConstants";

export const MIN_ELEMENT_COUNT = 5;
export const MAX_ELEMENT_COUNT = 100;

const initialState = (): GnomeState => {
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
        moving: 0,
        delay: 0,
        ...initialReplaceSortChartState(contents),
    };
};

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
                cursor: state.contents.findIndex(i => !i.fixed),
                chartObject: {
                    ...state.chartObject,
                    data: state.chartObject.data.concat([contents2ChartData(state.contents, state.chartObject.data.length)])
                }
            };
        case ActionType.INIT:
            return init(state);
        case ActionType.FIX:
            return {
                ...state,
                contents: state.contents.map((i, idx) => idx === state.cursor ? { ...i, fixed: true } : i)
            };
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

export interface GnomeState extends ReplaceSortContentsState, ReplaceSortChartState {
    order: ORDER;
    moving: number;
    delay: number;
}

const init = (state: GnomeState): GnomeState => {
    const contents = state.contents.map(item => ({ ...item, id: uuidv4(), fixed: false }));
    return {
        ...state,
        contents,
        cursor: 0,
        ...initialReplaceSortChartState(contents)
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