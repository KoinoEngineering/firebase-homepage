import {
    AppBar,
    createStyles,
    Drawer,
    Grid,
    IconButton,
    ListSubheader,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { GitHub, Menu, MenuOpen } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import NestedList, {
    NestedListProps,
} from "src/components/templates/NestedList";
import { Propsof } from "src/interfaces/Props";
import ROUTES from "src/utils/routes";
// import ROUTES from "src/utils/routes";
import packageJson from "../../../../package.json";

export const HEADER_HEIGHT = 75;
const useStyles = makeStyles(
    createStyles({
        root: {
            // height: HEADER_HEIGHT
        },
    }),
);

const useIconStyle = makeStyles(
    createStyles({
        root: {
            height: "100%",
        },
    }),
);

const useHeaderTitleStyle = makeStyles(({ breakpoints }) =>
    createStyles({
        root: {
            [breakpoints.up("sm")]: {
                display: "none",
            },
        },
    }),
);

export interface HeaderState {
  sideNavOpen: Propsof<typeof Drawer>["open"];
}

const Header: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const iconClasses = useIconStyle();
    const headerTitileClasses = useHeaderTitleStyle();
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const MenuIcon = sideNavOpen ? MenuOpen : Menu;

    const itemList: NestedListProps = {
        items: [
            {
                content: "トップ",
                onClick: () => history.push(ROUTES.TOP),
            },
            {
                content: {
                    onClick: (e) => {
                        if (!e.isDefaultPrevented()) {
                            history.push(ROUTES.SORTS);
                            setSideNavOpen(false);
                        }
                    },
                    subheader: (
                        <ListSubheader disableSticky>
                            <Typography variant="h3">ソート</Typography>
                        </ListSubheader>
                    ),
                },
            },
        ],
    };

    return (
        <AppBar id="Header" classes={classes} position="sticky">
            <Grid container direction="row">
                <Grid item>
                    <IconButton
                        classes={iconClasses}
                        onClick={() => {
                            setSideNavOpen(true);
                        }}
                    >
                        <MenuIcon fontSize="large" color="secondary" />
                    </IconButton>
                    <Drawer open={sideNavOpen} onClose={() => setSideNavOpen(false)}>
                        <NestedList {...itemList} />
                    </Drawer>
                </Grid>
                <Grid container item xs>
                    <Grid item>
                        <Typography variant="h1">
              こいの
                            <br className={headerTitileClasses.root} />
              エンジニアリング
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <IconButton
                        classes={iconClasses}
                        href={packageJson.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHub fontSize="large" color="secondary" />
                    </IconButton>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Header;
