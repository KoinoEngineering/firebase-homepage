import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Propsof } from "src/interfaces/Props";
import React from "react";

interface GridRowProps extends Omit<Propsof<typeof Grid>, "container"> {
  padding?: GridClassProps;
}

interface GridClassProps {
  padding: CSSProperties["padding"];
  paddingTop: CSSProperties["paddingTop"];
  paddingRight: CSSProperties["paddingRight"];
  paddingLeft: CSSProperties["paddingLeft"];
  paddingBottom: CSSProperties["paddingBottom"];
}

const useStyles = makeStyles(
    createStyles({
        container: {
            padding: (props?: Partial<GridClassProps>) => props?.padding,
            paddingBottom: (props?: Partial<GridClassProps>) => props?.paddingBottom,
            paddingLeft: (props?: Partial<GridClassProps>) => props?.paddingLeft,
            paddingRight: (props?: Partial<GridClassProps>) => props?.paddingRight,
            paddingTop: (props?: Partial<GridClassProps>) =>
                props?.paddingTop || "1rem",
        },
    }),
    {
        classNamePrefix: "GridRow",
    },
);

export const GridRow: React.FC<GridRowProps> = ({ padding, ...gridProps }) => {
    const classes = useStyles(padding);
    return (
        <Grid
            {...gridProps}
            container
            classes={{ ...classes, ...gridProps.classes }}
        />
    );
};
