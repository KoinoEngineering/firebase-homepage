import React from "react";
import { Route as PublicRoute, Switch, Redirect } from "react-router-dom";
import ROUTES from "src/utils/routes";

const Kanban: React.FC = () => {
    return <Switch>
        <Redirect exact path={ROUTES.KANBAN} to={ROUTES.KANBAN_LOGIN} />
        <PublicRoute exact path={ROUTES.KANBAN_LOGIN} component={() => <div>{ROUTES.KANBAN_LOGIN}</div>} />
    </Switch>;
};

export default Kanban;