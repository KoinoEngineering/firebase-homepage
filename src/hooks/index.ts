import { Reducer } from "react";
import { ComparisonSort, SORT_TYPES } from "src/interfaces/Sorts";
import { Actions } from "src/reducers/actions";
import bubble from "src/reducers/bubble";
import gnome from "src/reducers/gnome";
import insertion from "src/reducers/insertion";
import selection from "src/reducers/selection";
import merge from "src/reducers/merge";
import shaker from "src/reducers/shaker";
import utils from "src/utils";

export type State = {
  [k in keyof typeof SORT_TYPES]: ComparisonSort;
};

type ReducerMappings = {
  [k in keyof State]: Reducer<State[k], Actions>;
};

const mapping: ReducerMappings = {
    "00bubble": bubble,
    "01shaker": shaker,
    "02gnome": gnome,
    "03insertion": insertion,
    "10selection": selection,
    "20merge": merge,
};

// 簡易combineReducers
export function compoersionSortReducers(state: State, action: Actions) {
    // とりあえずキーの一覧を取っておく
    const keys = Object.keys(state) as (keyof State)[];
    // それぞれのキーに対して
    const reduced = utils.entries(state).reduce((combined, entry) => {
        const key = entry[0] as keyof State;
        const state = entry[1] as State[keyof State];
        return {
            ...combined,
            [key]: mapping[key](state, action),
        };
    }, {} as State);
    if (keys.some((key) => reduced[key] !== state[key])) {
    // 中身のstateのいずれかが変っていた場合には新しいほうを返す
        return reduced;
    } else {
        return state;
    }
}
