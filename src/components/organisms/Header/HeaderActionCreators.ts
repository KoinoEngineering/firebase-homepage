import { ActionType, OpenMenuAction, CloseMenuAction } from "./HeaderActions";

export default {
    openMenu: (): OpenMenuAction => ({ type: ActionType.OPEN_MENU, payload: { sideNavOpen: true } }),
    closeMenu: (): CloseMenuAction => ({ type: ActionType.CLOSE_MENU, payload: { sideNavOpen: false } }),
};