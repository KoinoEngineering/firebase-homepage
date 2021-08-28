import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { Redirect, Route as PublicRoute, BrowserRouter as Router, Switch } from "react-router-dom";
import MainFrame from "src/components/templates/MainFrame/MainFrame";
import ROUTES from "src/utils/routes";
import Top from "./Top";
import Sorts from "./Sorts";

const useStyles = makeStyles(
    createStyles({
        root: { height: "100%" },
    }),
);

const App: React.FC = () => {
    const classes = useStyles();
    return (
        <MainFrame>
            <div id="App" className={classes.root}>
                <Router>
                    <Switch>
                        <Redirect exact from="/" to={ROUTES.TOP} />
                        <PublicRoute exact path={ROUTES.TOP}>
                            <Top />
                        </PublicRoute>
                        <PublicRoute exact path={ROUTES.SORTS}>
                            <Sorts />
                        </PublicRoute>
                        <Redirect exact from="*" to={ROUTES.TOP} />
                    </Switch>
                </Router>
            </div>
        </MainFrame>
    );
};
export default App;
