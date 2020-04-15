import { AppBar, Avatar, createStyles, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import GitHubMark from "src/images/GitHub-Mark/PNG/GitHub-Mark-Light-64px.png";
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

const Header: React.FC = () => {
    const classes = useStyles();
    const iconClasses = useIconStyle();
    return <AppBar id="Header" classes={classes} position="sticky">
        <Grid container direction="row">
            <Grid item xs>
                <Typography variant="h1">こいのエンジニアリングのホームページ</Typography>
            </Grid>
            <Grid item>
                <IconButton classes={iconClasses} href={packageJson.repository.url} target="_blank" rel="noopener noreferrer">
                    <Avatar alt="GitHub repository" src={GitHubMark} />
                </IconButton>
            </Grid>
        </Grid>
    </AppBar >;
};

export default Header;