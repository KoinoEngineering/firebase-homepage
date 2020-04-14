import { createStyles, CssBaseline, makeStyles, MuiThemeProvider } from "@material-ui/core";
import Header, { HEADER_HEIGHT } from "components/organisms/Header/Header";
import React from "react";
import { px } from "utils/stringUtil";
import defaultTheme from "utils/theme";

interface MainFrameProps {
}

const useStyles = makeStyles(createStyles({
    main: {
        height: 0,
        minHeight: `calc(100vh - ${px(HEADER_HEIGHT)})`
    }
}));

const MainFrame: React.FC<MainFrameProps> = props => {
    const classes = useStyles();
    return <div id="MainFrame">
        <MuiThemeProvider theme={defaultTheme} >
            <CssBaseline />
            <Header />
            <div id="main" className={classes.main}>
                {props.children}
            </div>
        </MuiThemeProvider>
    </div>;
};

export default MainFrame;