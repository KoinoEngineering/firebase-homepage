import { Action } from "redux";
import { GnomeState } from "./GnomeReducer";
import { Payload } from "src/interfaces/Action";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/gnome/CHANGE_VALUE",
    SET_RUNNING = "firebase-homepage/sort/gnome/SET_RUNNING",
    START = "firebase-homepage/sort/gnome/START",
    INIT = "firebase-homepage/sort/gnome/INIT",
    STEP = "firebase-homepage/sort/gnome/STEP",
    SWAP = "firebase-homepage/sort/gnome/SWAP",
    END = "firebase-homepage/sort/gnome/END",
}

interface ChangeValuePayload extends Partial<GnomeState> { }
interface SetRunningPayload extends Pick<GnomeState, "running"> { }
interface StartPayload extends Pick<GnomeState, "running"> { running: true }
interface SwapPayload { base: number }
interface EndPayload extends Pick<GnomeState, "running"> { running: false }

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<ChangeValuePayload> { }
export interface SetRunningAction extends Action<ActionType.SET_RUNNING>, Payload<SetRunningPayload> { }
export interface StartAction extends Action<ActionType.START>, Payload<StartPayload> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface StepAction extends Action<ActionType.STEP> { }
export interface SwapAction extends Action<ActionType.SWAP>, Payload<SwapPayload> { }
export interface EndAction extends Action<ActionType.END>, Payload<EndPayload> { }

export type GnomeActions =
    ChangeValueAction |
    SetRunningAction |
    StartAction |
    InitAction |
    StepAction |
    SwapAction |
    EndAction;