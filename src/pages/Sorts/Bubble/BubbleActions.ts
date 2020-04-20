import { Action } from "redux";
import { BubbleState } from "./BubbleReducer";
import { Payload } from "src/interfaces/Action";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/bubble/CHANGE_VALUE",
    SET_RUNNING = "firebase-homepage/sort/bubble/SET_RUNNING",
    START = "firebase-homepage/sort/bubble/START",
    INIT = "firebase-homepage/sort/bubble/INIT",
    STEP = "firebase-homepage/sort/bubble/STEP",
    SWAP = "firebase-homepage/sort/bubble/SWAP",
    END = "firebase-homepage/sort/bubble/END",
}

interface ChangeValuePayload extends Partial<BubbleState> { }
interface SetRunningPayload extends Pick<BubbleState, "running"> { }
interface StartPayload extends Pick<BubbleState, "running"> { running: true }
interface SwapPayload { base: number }
interface EndPayload extends Pick<BubbleState, "running"> { running: false }

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<ChangeValuePayload> { }
export interface SetRunningAction extends Action<ActionType.SET_RUNNING>, Payload<SetRunningPayload> { }
export interface StartAction extends Action<ActionType.START>, Payload<StartPayload> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface StepAction extends Action<ActionType.STEP> { }
export interface SwapAction extends Action<ActionType.SWAP>, Payload<SwapPayload> { }
export interface EndAction extends Action<ActionType.END>, Payload<EndPayload> { }

export type BubbleActions =
    ChangeValueAction |
    SetRunningAction |
    StartAction |
    InitAction |
    StepAction |
    SwapAction |
    EndAction;