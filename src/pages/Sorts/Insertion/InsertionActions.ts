import { Action } from "redux";
import { Payload } from "src/interfaces/Action";
import { InsertionState } from "./InsertionReducer";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/insertion/CHANGE_VALUE",
    START = "firebase-homepage/sort/insertion/START",
    INIT = "firebase-homepage/sort/insertion/INIT",
    CHECK_STATUS = "firebase-homepage/sort/insertion/CHECK_STATUS",
    INSERTION = "firebase-homepage/sort/insertion/INSERTION",
    END = "firebase-homepage/sort/insertion/END",
}

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<Partial<InsertionState>> { }
export interface StartAction extends Action<ActionType.START> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface CheckStatusAction extends Action<ActionType.CHECK_STATUS> { }
export interface SwapAction extends Action<ActionType.INSERTION> { }
export interface EndAction extends Action<ActionType.END> { }

export type InsertionActions =
    ChangeValueAction |
    StartAction |
    InitAction |
    CheckStatusAction |
    SwapAction |
    EndAction;