import { eventChannel } from "redux-saga";
import { call, take, put } from "redux-saga/effects";
import { auth } from "src/core/ConfigureFirebase";
import { push } from "connected-react-router";
import { LocalStorageKeys } from "src/utils/localStorage";
import ROUTES from "src/utils/routes";

interface AuthChannel {
    user?: firebase.User | null;
    error?: firebase.auth.Error;
}

const authChannel = () =>
    eventChannel<AuthChannel>(emit =>
        auth.onAuthStateChanged(
            user => emit({ user }),
            error => emit({ error })
        ));

export function* checkUserStateSaga() {
    const channel = yield call(authChannel);
    while (true) {
        const { user, error } = yield take(channel);
        if (user && !error) {
            // if login
            localStorage.setItem(LocalStorageKeys.UID, user.uid);
        }
        else {
            // if logout
            yield put(push(ROUTES.TOP));
        }
    }
}