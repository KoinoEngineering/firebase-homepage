import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import utils from "src/utils";
import Theme from "src/utils/theme";
import { ShakerState } from "../ShakerReducer";

interface ShakerContentsProps extends Pick<ShakerState, "cursor" | "running"> {
    contents: ShakerContents;
}

interface ElementStyleProps extends CSSProperties, Pick<ShakerElementProps, "active"> {
    widthRate: number;
    heightRate: number;
    fixed?: boolean;
}

const useStyles = makeStyles(createStyles({
    root: {
        position: "absolute",
        top: 0,
        widthRate: "100%",
        height: "50%",
    }
}));

const useElementStyle = makeStyles<typeof Theme, ElementStyleProps>({
    root: {
        width: props => props.widthRate * 100 + "%",
        height: props => props.heightRate * 100 + "%",
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        borderCollapse: "collapse",
        boxSizing: "border-box",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: props => props.active ? "#FF0000" : `hsl(${props.heightRate * 360}, ${props.fixed ? "40%" : "80%"}, ${props.fixed ? "40%" : "80%"})`
    }
});

const ShakerContents: React.FC<ShakerContentsProps> = ({ contents, cursor, running }) => {

    const classes = useStyles();
    const maxValue = utils.max(contents, element => element.value);
    return <Grid id="ShakerContents" classes={classes} container alignItems="flex-end">
        {
            contents.map((element, idx) => {
                return <ShakerElement
                    key={element.id}
                    elementsCount={contents.length}
                    element={element}
                    maxValue={maxValue}
                    active={running && idx === cursor}
                />;
            })
        }
    </Grid>;
};


interface ShakerElementProps extends Exclude<Propsof<typeof Grid>, "classes"> {
    elementsCount: ShakerState["array"]["length"];
    element: ShakerElement;
    maxValue: ShakerElement["value"];
    active: boolean;
}

const ShakerElement: React.FC<ShakerElementProps> = ({ elementsCount, element, maxValue, active, ...props }) => {
    const elementClasses = useElementStyle({
        widthRate: 1 / elementsCount,
        heightRate: element.value / maxValue,
        fixed: element.fixed,
        active,
    });
    return <Grid {...props} classes={elementClasses}>
        {element.value}
    </Grid>;
};

export default ShakerContents;

export interface ShakerElement {
    id: string;
    value: number;
    fixed?: boolean;
}


export type ShakerContents = ShakerElement[];