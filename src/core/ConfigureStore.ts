import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createRootReducer from "src/reducers";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "src/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(createRootReducer(history), applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
    sagaMiddleware,
    logger));

sagaMiddleware.run(rootSaga);
export default store;