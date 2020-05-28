import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "src/reducers";
import rootSaga from "src/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export default () => {
    const store = configureStore({
        reducer: createRootReducer(history),
        middleware: [
            ...getDefaultMiddleware(),
            routerMiddleware(history),
            sagaMiddleware,
        ],
        devTools: process.env.NODE_ENV === "development"
    });
    sagaMiddleware.run(rootSaga);
    return store;
};