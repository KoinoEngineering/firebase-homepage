import { Action } from "redux";
import { Payload } from "src/interfaces/Action";
import { SelectState } from "./SelectReducer";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/select/CHANGE_VALUE",
    START = "firebase-homepage/sort/select/START",
    INIT = "firebase-homepage/sort/select/INIT",
    CHECK_STATUS = "firebase-homepage/sort/select/CHECK_STATUS",
    CURSOR_NEXT = "firebase-homepage/sort/select/CURSOR_NEXT",
    SET_OPTION = "firebase-homepage/sort/select/SET_OPTION",
    SWAP = "firebase-homepage/sort/select/SWAP",
    PREV_END = "firebase-homepage/sort/select/PREV_END",
    RESET_CURSOR = "firebase-homepage/sort/select/RESET_CURSOR",
    END = "firebase-homepage/sort/select/END",
}

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<Partial<SelectState>> { }
export interface StartAction extends Action<ActionType.START> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface CheckStatusAction extends Action<ActionType.CHECK_STATUS> { }
export interface CursorNextAction extends Action<ActionType.CURSOR_NEXT> { }
export interface SetOptionAction extends Action<ActionType.SET_OPTION> { }
export interface SwapAction extends Action<ActionType.SWAP> { }
export interface PrevEndAction extends Action<ActionType.PREV_END> { }
export interface ResetCursorAction extends Action<ActionType.RESET_CURSOR> { }
export interface EndAction extends Action<ActionType.END> { }

export type SelectActions =
    ChangeValueAction |
    StartAction |
    InitAction |
    CheckStatusAction |
    CursorNextAction |
    SetOptionAction |
    SwapAction |
    PrevEndAction |
    ResetCursorAction |
    EndAction;