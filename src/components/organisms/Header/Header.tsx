import { AppBar, createStyles, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React from "react";
import packageJson from "../../../../package.json";

export const HEADER_HEIGHT = 75;
const useStyles = makeStyles(
    createStyles({
        root: {
            // height: HEADER_HEIGHT
        }
    }
    ));

const useIconStyle = makeStyles(
    createStyles({
        root: {
            height: "100%",
        }
    }
    ));

const useHeaderTitleStyle = makeStyles(({ breakpoints }) =>
    createStyles({
        root: {
            [breakpoints.up("sm")]: {
                display: "none",
            }
        }
    }
    ));

const Header: React.FC = () => {
    const classes = useStyles();
    const iconClasses = useIconStyle();
    const headerTitileClasses = useHeaderTitleStyle();
    return <AppBar id="Header" classes={classes} position="sticky">
        <Grid container direction="row">
            <Grid container item xs>
                <Grid item>
                    <Typography variant="h1">こいの<br className={headerTitileClasses.root} />エンジニアリング</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <IconButton classes={iconClasses} href={packageJson.repository.url} target="_blank" rel="noopener noreferrer">
                    <GitHub fontSize="large" color="secondary" />
                </IconButton>
            </Grid>
        </Grid>
    </AppBar >;
};

export default Header;