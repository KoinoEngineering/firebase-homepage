import { Reducer } from "react";
import { CompoersionSort } from "src/interfaces/Sorts";
import { Actions } from "src/reducers/actions";
import bubble from "src/reducers/bubble";

export interface State {
  bubble: CompoersionSort;
}

type ReducerMappings = {
  [k in keyof State]: Reducer<State[k], Actions>;
};

const mapping: ReducerMappings = {
    bubble,
};

// 簡易combineReducers
export function compoersionSortReducers(state: State, action: Actions) {
    // とりあえずキーの一覧を取っておく
    const keys = Object.keys(state) as (keyof State)[];
    // それぞれのキーに対して
    const reduced = Object.entries(state).reduce((combined, entry) => {
        const key = entry[0] as keyof State;
        const state = entry[1] as State[keyof State];
        combined[key] = mapping[key](state, action);
        return combined;
    }, {} as State);
    if (keys.some((key) => reduced[key] !== state[key])) {
    // 中身のstateのいずれかが変っていた場合には新しいほうを返す
        return reduced;
    } else {
        return state;
    }
}
