import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import utils from "src/utils";
import Theme from "src/utils/theme";
import { Flipped, Flipper } from "react-flip-toolkit";

interface ReplaceSortContentsFlipperProps<E extends ReplaceSortElement = ReplaceSortElement> {
    contents: ReplaceSortContentsFlipper<E>;
    running: boolean;
    cursor: number;
    optionCursor?: number;
}

export type ReplaceSortContentsFlipperState = ReplaceSortContentsFlipperProps;

interface ElementStyleProps extends CSSProperties, Pick<ReplaceSortElementProps, "active"> {
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
        backgroundColor: props => props.fixed
            ? `hsl(${props.heightRate * 360}, 40%, 40%)`
            : props.active
                ? "#FF0000"
                : props.option
                    ? "#0000FF"
                    : `hsl(${props.heightRate * 360}, 80%, 80%)`
    }
});

const ReplaceSortContentsFlipper: React.FC<ReplaceSortContentsFlipperProps> = ({ contents, cursor, running, optionCursor }) => {

    const classes = useStyles();
    const maxValue = utils.max(contents, element => element.value);
    return <Flipper flipKey={JSON.stringify(contents)} >
        <Grid id="ReplaceSortContentsFlipper" classes={classes} container alignItems="flex-end">
            {
                contents.map((element, idx) => {
                    return <Flipped flipId={element.id} key={element.id}>
                        <ReplaceSortElement
                            key={element.id}
                            elementsCount={contents.length}
                            element={element}
                            maxValue={maxValue}
                            active={running && idx === cursor}
                            option={running && idx === optionCursor}
                        />
                    </Flipped>;
                })
            }
        </Grid>
    </Flipper>;
};


interface ReplaceSortElementProps extends Exclude<Propsof<typeof Grid>, "classes"> {
    elementsCount: ReplaceSortContentsFlipperState["contents"]["length"];
    element: ReplaceSortElement;
    maxValue: ReplaceSortElement["value"];
    active: boolean;
    option?: boolean;
}

const ReplaceSortElement: React.FC<ReplaceSortElementProps> = ({ elementsCount, element, maxValue, active, option, ...props }) => {
    const elementClasses = useElementStyle({
        widthRate: 1 / elementsCount,
        heightRate: element.value / maxValue,
        fixed: element.fixed,
        active,
        option
    });
    return <Grid {...props} classes={elementClasses}>
        {element.value}
    </Grid>;
};

export default ReplaceSortContentsFlipper;

export interface ReplaceSortElement {
    id: string;
    value: number;
    fixed?: boolean;
}


export type ReplaceSortContentsFlipper<E extends ReplaceSortElement = ReplaceSortElement> = E[];