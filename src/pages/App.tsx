import { createStyles, makeStyles } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Redirect, Route as PublicRoute, Switch } from "react-router-dom";
import MainFrame from "src/components/templates/MainFrame/MainFrame";
import { history } from "src/core/ConfigureStore";
import ROUTES from "src/utils/routes";
import Sorts from "./Sorts";
import Top from "./Top";
import Bubble from "./Sorts/Bubble/Bubble";
import Shaker from "./Sorts/Shaker/Shaker";

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
                    <PublicRoute exact path={ROUTES.SORTS}>
                        <Sorts />
                    </PublicRoute>
                    <PublicRoute exact path={ROUTES.SORTS_BUBBLE}>
                        <Bubble />
                    </PublicRoute>
                    <PublicRoute exact path={ROUTES.SORTS_SHAKER}>
                        <Shaker />
                    </PublicRoute>
                    <Redirect exact from="*" to={ROUTES.TOP} />
                </Switch>
            </ConnectedRouter>
        </div>
    </MainFrame>;
};
export default App;