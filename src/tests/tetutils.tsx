import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "src/core/ConfigureStore";
import React from "react";

const sotre = configureStore();

export const renderWithProvider = (Target: React.ReactNode) => render(
    <React.StrictMode>
        <Provider store={sotre}>
            {Target}
        </Provider>
    </React.StrictMode>,
);