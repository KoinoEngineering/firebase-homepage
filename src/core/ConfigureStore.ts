import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, Middleware } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "src/reducers";
import rootSaga from "src/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

interface Saga {
    saga: Middleware,
    env?: NodeJS.ProcessEnv["NODE_ENV"][] | "all"
}

const sagas: Saga[] = [
    { saga: routerMiddleware(history) },
    { saga: sagaMiddleware },
    { saga: logger, env: ["development", "test"] },
];

const configureStore = () => {
    const store = createStore(createRootReducer(history), applyMiddleware(
        ...sagas
            .filter(({ env = "all" }) =>
                env === "all" || env.some(e => e === process.env.NODE_ENV))
            .map(({ saga }) => saga)));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;