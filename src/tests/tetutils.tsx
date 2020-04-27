import { render } from "@testing-library/react";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import configureStore, { history } from "src/core/ConfigureStore";

const sotre = configureStore();

export const renderWithProvider = (Target: React.ReactNode) => render(
    <React.StrictMode>
        <Provider store={sotre}>
            <ConnectedRouter history={history}>
                {Target}
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
);