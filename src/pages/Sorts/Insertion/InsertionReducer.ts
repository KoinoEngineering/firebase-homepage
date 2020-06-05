import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import { ReplaceSortContentsState, ReplaceSortElement } from "../Parts/ReplaceSortContents";
import { ActionType, InsertionActions } from "./InsertionActions";
import { ORDER } from "./InsertionConstants";
import { ReplaceSortChartState, initialReplaceSortChartState, contents2ChartData } from "../Parts/ReplaceSortChart";

export const MIN_ELEMENT_COUNT = 10;
export const MAX_ELEMENT_COUNT = 1000;
export const DEFAULT_ELEMENT_COUNT = 50;

const initialState = (): InsertionState => {
    const contents = Array(DEFAULT_ELEMENT_COUNT).fill(0).map((_, idx) => {
        return {
            id: uuidv4(),
            value: (DEFAULT_ELEMENT_COUNT - idx) * MAX_ELEMENT_COUNT / DEFAULT_ELEMENT_COUNT
        };
    });

    return {
        running: false,
        order: ORDER.ASC,
        contents,
        cursor: 0,
        optionCursor: 0,
        sorted: [],
        delay: 0,
        animated: true,
        ...initialReplaceSortChartState(contents)
    };
};

const insertion: Reducer<InsertionState, InsertionActions> = (state = initialState(), action) => {
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
        case ActionType.INSERTION:
            return insertionAction(state);
        case ActionType.END:
            return {
                ...state,
                running: false,
                sorted: [],
                contents: state.sorted.map(i => ({ ...i, fixed: false }))
            };
        default:
            return state;
    }
};

export default insertion;

export interface InsertionState extends ReplaceSortContentsState, ReplaceSortChartState {
    sorted: ReplaceSortContentsState["contents"];
    order: ORDER;
    delay: number;
    animated: boolean;
}

const init = (state: InsertionState): InsertionState => {
    const contents = state.contents.map(i => ({ ...i, fixed: false }));
    return {
        ...state,
        cursor: 0,
        sorted: [],
        optionCursor: 0,
        contents,
        ...initialReplaceSortChartState(contents)
    };
};

const insertionAction = (state: InsertionState): InsertionState => {
    const { contents, order, sorted } = state;
    const filterFunc = (i: ReplaceSortElement): boolean =>
        order === ORDER.ASC
            ? i.value <= contents[0].value
            : i.value >= contents[0].value;
    const newContents = contents.filter((_, i) => i !== 0);
    const newSorted = sorted.filter(filterFunc).concat({ ...contents[0], fixed: true }, sorted.filter(i => !filterFunc(i)));
    return {
        ...state,
        contents: newContents,
        sorted: newSorted,
        chartObject: {
            ...state.chartObject,
            data: state.chartObject.data.concat([contents2ChartData(newContents.concat(newSorted), state.chartObject.data.length)])
        }
    };
};
