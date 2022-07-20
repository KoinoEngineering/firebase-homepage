import { createTheme } from "@material-ui/core";

const defaultTheme = createTheme({
    overrides: {
        MuiListSubheader: {
            root: {
                color: "inherit",
            },
        },
        MuiTypography: {
            h1: {
                display: "block",
                fontSize: "2em",
                fontWeight: "bold",
                letterSpacing: "inherit",
                lineHeight: "inherit",
                marginBlockEnd: "0.67em",
                marginBlockStart: "0.67em",
                marginInlineEnd: "0px",
                marginInlineStart: "0px",
            },
            h2: {
                display: "block",
                fontSize: "1.5em",
                fontWeight: "bold",
                letterSpacing: "inherit",
                lineHeight: "inherit",
                marginBlockEnd: "0.83em",
                marginBlockStart: "0.83em",
                marginInlineEnd: "0px",
                marginInlineStart: "0px",
            },
            h3: {
                display: "block",
                fontSize: "1.17em",
                fontWeight: "bold",
                letterSpacing: "inherit",
                lineHeight: "inherit",
                marginBlockEnd: 0,
                marginBlockStart: 0,
                marginInlineEnd: 0,
                marginInlineStart: 0,
            },
        },
    },
    palette: {
        primary: {
            main: "#008000",
        },
        secondary: {
            main: "#fff",
        },
    },
});

export default defaultTheme;
