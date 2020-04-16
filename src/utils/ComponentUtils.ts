import { push, replace, go, goBack, goForward, } from "connected-react-router";
import React from "react";

export const getDisplayName = <P>(WrappedComponent: React.ComponentType<P>): string => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export interface withNavigate {
    navigate: typeof navigateActionsCreatetors;
}

export const navigateActionsCreatetors = {
    push,
    replace,
    go,
    goBack,
    goForward,
};