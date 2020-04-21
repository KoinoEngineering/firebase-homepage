import { Action } from "redux";
import { HeaderState } from "./Header";
import { Payload } from "src/interfaces/Action";

export enum ActionType {
    OPEN_MENU = "firebase-homepage/sort/header/OPEN_MENU",
    CLOSE_MENU = "firebase-homepage/sort/header/CLOSE_MENU",
}

interface ToggleMenuPayload<O extends boolean> extends Pick<HeaderState, "sideNavOpen"> {
    sideNavOpen: O;
}

export interface OpenMenuAction extends Action<ActionType.OPEN_MENU>, Payload<ToggleMenuPayload<true>> { }
export interface CloseMenuAction extends Action<ActionType.CLOSE_MENU>, Payload<ToggleMenuPayload<false>> { }

export type HeaderActions =
    OpenMenuAction |
    CloseMenuAction;