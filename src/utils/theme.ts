import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#008000",
        }
    },
    overrides: {
        MuiTypography: {
            h1: {
                display: "block",
                fontSize: "2em",
                marginBlockStart: "0.67em",
                marginBlockEnd: "0.67em",
                marginInlineStart: "0px",
                marginInlineEnd: "0px",
                fontWeight: "bold",
                letterSpacing: "inherit",
                lineHeight: "inherit"
            }
        }
    }
});

export default defaultTheme;