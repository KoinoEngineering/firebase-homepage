import { Action } from "redux";
import { ShakerState } from "./ShakerReducer";
import { Payload } from "src/interfaces/Action";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/shaker/CHANGE_VALUE",
    SET_RUNNING = "firebase-homepage/sort/shaker/SET_RUNNING",
    START = "firebase-homepage/sort/shaker/START",
    INIT = "firebase-homepage/sort/shaker/INIT",
    STEP = "firebase-homepage/sort/shaker/STEP",
    SWAP = "firebase-homepage/sort/shaker/SWAP",
    END = "firebase-homepage/sort/shaker/END",
}

interface ChangeValuePayload extends Partial<ShakerState> { }
interface SetRunningPayload extends Pick<ShakerState, "running"> { }
interface StartPayload extends Pick<ShakerState, "running"> { running: true }
interface SwapPayload extends Pick<ShakerState, "direction"> { base: number }
interface EndPayload extends Pick<ShakerState, "running"> { running: false }

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<ChangeValuePayload> { }
export interface SetRunningAction extends Action<ActionType.SET_RUNNING>, Payload<SetRunningPayload> { }
export interface StartAction extends Action<ActionType.START>, Payload<StartPayload> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface StepAction extends Action<ActionType.STEP> { }
export interface SwapAction extends Action<ActionType.SWAP>, Payload<SwapPayload> { }
export interface EndAction extends Action<ActionType.END>, Payload<EndPayload> { }

export type ShakerActions =
    ChangeValueAction |
    SetRunningAction |
    StartAction |
    InitAction |
    StepAction |
    SwapAction |
    EndAction;