import { auth } from "firebase/firebase.config";
import React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import ROUTES from "utils/routes";

const PrivateRoute: React.FC<RouteProps> = (props) => auth.currentUser
    ? <Route {...props} />
    : <Redirect to={ROUTES.LOGIN} />;

export default PrivateRoute;