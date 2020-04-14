import { AppBar, createStyles, Grid, makeStyles } from "@material-ui/core";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import React from "react";
import packageJson from "../../../../package.json";
import Logo from "images/logo/logo.svg";

export const HEADER_HEIGHT = 75;
const useStyles = makeStyles(
    createStyles({
        root: {
            height: HEADER_HEIGHT
        }
    }
    ));

const useIconStyle = makeStyles(
    createStyles({
        anchor: {
            color: "inherit"
        },
        icon: {
            padding: 10
        }
    }
    ));

const Header: React.FC = () => {
    const classes = useStyles();
    const iconClasses = useIconStyle();
    return <AppBar id="Header" classes={classes} position="static">
        <Grid container>
            <Grid item>
                <h1>This is Header</h1>
            </Grid>
            <Grid item >
                <a href={packageJson.repository.url} target="_blank" rel="noopener noreferrer" className={iconClasses.anchor} >
                    <Octicon icon={MarkGithub} size={HEADER_HEIGHT} className={iconClasses.icon} />
                </a>
                <a href={packageJson.author.url} target="_blank" rel="noopener noreferrer" className={iconClasses.anchor} >
                    <img src={Logo} alt={packageJson.author.name} height={HEADER_HEIGHT} className={iconClasses.icon} />
                </a>
            </Grid>
        </Grid>
    </AppBar >;
};

export default Header;