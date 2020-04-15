import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#008000",
        },
        secondary: {
            main: "#fff"
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
            },
            h2: {
                display: "block",
                fontSize: "1.5em",
                marginBlockStart: "0.83em",
                marginBlockEnd: "0.83em",
                marginInlineStart: "0px",
                marginInlineEnd: "0px",
                fontWeight: "bold",
                letterSpacing: "inherit",
                lineHeight: "inherit",
            },
            h3: {
                display: "block",
                fontSize: "1.17em",
                marginBlockStart: 0,
                marginBlockEnd: 0,
                marginInlineStart: 0,
                marginInlineEnd: 0,
                fontWeight: "bold",
                letterSpacing: "inherit",
                lineHeight: "inherit",
            }
        }
    }
});

export default defaultTheme;