import { Action } from "redux";
import { GnomeState } from "./GnomeReducer";
import { Payload } from "src/interfaces/Action";

export enum ActionType {
    CHANGE_VALUE = "firebase-homepage/sort/gnome/CHANGE_VALUE",
    CURSOR_PREV = "firebase-homepage/sort/gnome/CURSOR_PREV",
    CURSOR_NEXT = "firebase-homepage/sort/gnome/CURSOR_NEXT",
    START = "firebase-homepage/sort/gnome/START",
    INIT = "firebase-homepage/sort/gnome/INIT",
    SWAP = "firebase-homepage/sort/gnome/SWAP",
    END = "firebase-homepage/sort/gnome/END",
}

interface ChangeValuePayload extends Partial<GnomeState> { }
interface StartPayload extends Pick<GnomeState, "running"> { running: true }
interface EndPayload extends Pick<GnomeState, "running"> { running: false }

export interface ChangeValueAction extends Action<ActionType.CHANGE_VALUE>, Payload<ChangeValuePayload> { }
export interface CursorPrevAction extends Action<ActionType.CURSOR_PREV> { }
export interface CursorNextAction extends Action<ActionType.CURSOR_NEXT> { }
export interface StartAction extends Action<ActionType.START>, Payload<StartPayload> { }
export interface InitAction extends Action<ActionType.INIT> { }
export interface SwapAction extends Action<ActionType.SWAP> { }
export interface EndAction extends Action<ActionType.END>, Payload<EndPayload> { }

export type GnomeActions =
    ChangeValueAction |
    CursorPrevAction |
    CursorNextAction |
    StartAction |
    InitAction |
    SwapAction |
    EndAction;