import { Action } from "redux";
import { SelectState } from "./SelectReducer";
import { Payload } from "src/interfaces/Action";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/select/CHANGE_VALUE",
    SET_RUNNING = "firebase-homepage/sort/select/SET_RUNNING",
    START = "firebase-homepage/sort/select/START",
    INIT = "firebase-homepage/sort/select/INIT",
    STEP = "firebase-homepage/sort/select/STEP",
    SWAP = "firebase-homepage/sort/select/SWAP",
    END = "firebase-homepage/sort/select/END",
}

interface ChangeValuePayload extends Partial<SelectState> { }
interface SetRunningPayload extends Pick<SelectState, "running"> { }
interface StartPayload extends Pick<SelectState, "running"> { running: true }
interface SwapPayload { base: number }
interface EndPayload extends Pick<SelectState, "running"> { running: false }

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<ChangeValuePayload> { }
export interface SetRunningAction extends Action<ActionType.SET_RUNNING>, Payload<SetRunningPayload> { }
export interface StartAction extends Action<ActionType.START>, Payload<StartPayload> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface StepAction extends Action<ActionType.STEP> { }
export interface SwapAction extends Action<ActionType.SWAP>, Payload<SwapPayload> { }
export interface EndAction extends Action<ActionType.END>, Payload<EndPayload> { }

export type SelectActions =
    ChangeValueAction |
    SetRunningAction |
    StartAction |
    InitAction |
    StepAction |
    SwapAction |
    EndAction;