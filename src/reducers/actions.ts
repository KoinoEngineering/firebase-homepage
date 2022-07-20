import { CompoersionSortItem } from "src/interfaces/Sorts";

interface Action<A extends ActionTypes> {
  type: A;
}

/** アクション名 */
export enum ActionTypes {
  INIT = "INIT",
  STEP = "STEP",
}

export interface InitAction extends Action<ActionTypes.INIT> {
  payload: { items: CompoersionSortItem[] };
}

export type Actions = InitAction | Action<ActionTypes.STEP>;

/**
 * 比較ソート用のアクション
 * - 初期化する
 * - 進める
 * だけを持っている
 */
export const ActionCreators = {
    init: (payload: { items: CompoersionSortItem[] }): InitAction => {
        return { payload, type: ActionTypes.INIT };
    },
    step: (): Action<ActionTypes.STEP> => {
        return { type: ActionTypes.STEP };
    },
};
