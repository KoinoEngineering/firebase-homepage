import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "src/core/ConfigureStore";
import App from "src/pages/App";
import "typeface-roboto";
import { authStateChangedMonitor } from "./core/ConfigureFirebase";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();
authStateChangedMonitor();
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
