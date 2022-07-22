import React from "react";

export const getDisplayName = <P>(
    WrappedComponent: React.ComponentType<P>,
): string => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
