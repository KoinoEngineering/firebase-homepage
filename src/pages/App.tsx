import { createStyles, makeStyles } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Redirect, Switch, Route as PublicRoute } from "react-router-dom";
import MainFrame from "src/components/templates/MainFrame/MainFrame";
import { history } from "src/core/ConfigureStore";
import ROUTES from "src/utils/routes";
import Top from "./Top";

const useStyles = makeStyles(
    createStyles({
        root: { height: "100%" }
    }));

const App: React.FC = () => {
    const classes = useStyles();
    return <MainFrame>
        <div id="App" className={classes.root}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Redirect exact from="/" to={ROUTES.TOP} />
                    <PublicRoute exact path={ROUTES.TOP}>
                        <Top />
                    </PublicRoute>
                </Switch>
            </ConnectedRouter>
        </div>
    </MainFrame>;
};
export default App;