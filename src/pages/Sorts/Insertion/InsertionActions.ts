import { Action } from "redux";
import { Payload } from "src/interfaces/Action";
import { InsertionState } from "./InsertionReducer";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/insertion/CHANGE_VALUE",
    START = "firebase-homepage/sort/insertion/START",
    INIT = "firebase-homepage/sort/insertion/INIT",
    CHECK_STATUS = "firebase-homepage/sort/insertion/CHECK_STATUS",
    CURSOR_NEXT = "firebase-homepage/sort/insertion/CURSOR_NEXT",
    SET_OPTION = "firebase-homepage/sort/insertion/SET_OPTION",
    SWAP = "firebase-homepage/sort/insertion/SWAP",
    PREV_END = "firebase-homepage/sort/insertion/PREV_END",
    RESET_CURSOR = "firebase-homepage/sort/insertion/RESET_CURSOR",
    END = "firebase-homepage/sort/insertion/END",
}

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<Partial<InsertionState>> { }
export interface StartAction extends Action<ActionType.START> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface CheckStatusAction extends Action<ActionType.CHECK_STATUS> { }
export interface CursorNextAction extends Action<ActionType.CURSOR_NEXT> { }
export interface SetOptionAction extends Action<ActionType.SET_OPTION> { }
export interface SwapAction extends Action<ActionType.SWAP> { }
export interface PrevEndAction extends Action<ActionType.PREV_END> { }
export interface ResetCursorAction extends Action<ActionType.RESET_CURSOR> { }
export interface EndAction extends Action<ActionType.END> { }

export type InsertionActions =
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