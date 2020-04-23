import { AppBar, createStyles, Drawer, Grid, IconButton, makeStyles, Typography, ListSubheader } from "@material-ui/core";
import { GitHub, Menu, MenuOpen } from "@material-ui/icons";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import NestedList, { NestedListProps } from "src/components/templates/NestedList";
import { Propsof } from "src/interfaces/Props";
import { State } from "src/interfaces/State";
import { SORTS_TITLE_MAP } from "src/pages/Sorts";
import { navigateActionsCreatetors } from "src/utils/ComponentUtils";
import ROUTES from "src/utils/routes";
import packageJson from "../../../../package.json";
import HeaderActionCreators from "./HeaderActionCreators";

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

export interface HeaderState {
    sideNavOpen: Propsof<typeof Drawer>["open"];
}

const Header: React.FC = () => {

    const dispatch = useDispatch();
    const actions = useMemo(() => ({
        ...bindActionCreators(HeaderActionCreators, dispatch),
        navigate: bindActionCreators(navigateActionsCreatetors, dispatch)
    }), [dispatch]);
    const { sideNavOpen } = useSelector<State, HeaderState>(state => state.header);
    const classes = useStyles();
    const iconClasses = useIconStyle();
    const headerTitileClasses = useHeaderTitleStyle();
    const MenuIcon = sideNavOpen ? MenuOpen : Menu;

    const itemList: NestedListProps = {
        items: [
            {
                content: "トップ",
                onClick: () => actions.navigate.push(ROUTES.TOP)
            },
            {
                content: {
                    subheader: <ListSubheader disableSticky><Typography variant="h3">ソート</Typography></ListSubheader>,
                    onClick: (e) => {
                        if (!e.isDefaultPrevented()) {
                            actions.navigate.push(ROUTES.SORTS);
                            actions.closeMenu();
                        }
                    },
                    items: Object.entries(SORTS_TITLE_MAP).filter(([, { exist }]) => exist).map(([route, { title }]) => {
                        return {
                            onClick: (e) => {
                                e.preventDefault();
                                actions.navigate.push(route);
                                actions.closeMenu();
                            },
                            content: title
                        };
                    })
                }
            },
        ]
    };

    return <AppBar id="Header" classes={classes} position="sticky">
        <Grid container direction="row">
            <Grid item>
                <IconButton classes={iconClasses} onClick={() => { actions.openMenu(); }}>
                    <MenuIcon fontSize="large" color="secondary" />
                </IconButton>
                <Drawer
                    open={sideNavOpen}
                    onBackdropClick={() => actions.closeMenu()}
                >
                    <NestedList {...itemList} />
                </Drawer>
            </Grid>
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