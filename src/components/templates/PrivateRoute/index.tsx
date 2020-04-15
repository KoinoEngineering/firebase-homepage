import { auth } from "src/core/ConfigureFirebase";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import ROUTES from "src/utils/routes";

const PrivateRoute: React.FC<RouteProps> = (props) => auth.currentUser
    ? <Route {...props} />
    : <Redirect to={ROUTES.TOP} />;

export default PrivateRoute;