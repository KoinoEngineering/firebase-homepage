import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import utils from "src/utils";
import Theme from "src/utils/theme";

interface ReplaceSortContentsProps<E extends ReplaceSortElement = ReplaceSortElement> {
    contents: ReplaceSortContents<E>;
    running: boolean;
    cursor: number;
    optionCursor?: number;
}

export type ReplaceSortContentsState = ReplaceSortContentsProps;

interface ElementStyleProps extends CSSProperties, Pick<ReplaceSortElementProps, "active"> {
    widthRate: number;
    heightRate: number;
    fixed?: boolean;
}

export const useReplaceSortContentsStyles = makeStyles(createStyles({
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

const ReplaceSortContents: React.FC<ReplaceSortContentsProps> = ({ contents, cursor, running, optionCursor }) => {

    const classes = useReplaceSortContentsStyles();
    const maxValue = utils.max(contents, element => element.value);
    return <Grid id="ReplaceSortContents" classes={classes} container alignItems="flex-end">
        {
            contents.map((element, idx) => {
                return <ReplaceSortElement
                    key={element.id}
                    elementsCount={contents.length}
                    element={element}
                    maxValue={maxValue}
                    active={running && idx === cursor}
                    option={running && idx === optionCursor}
                />;
            })
        }
    </Grid>;
};


interface ReplaceSortElementProps extends Exclude<Propsof<typeof Grid>, "classes"> {
    elementsCount: ReplaceSortContentsState["contents"]["length"];
    element: ReplaceSortElement;
    maxValue: ReplaceSortElement["value"];
    active: boolean;
    option?: boolean;
}

export const ReplaceSortElement: React.FC<ReplaceSortElementProps> = ({ elementsCount, element, maxValue, active, option, ...props }) => {
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

export default ReplaceSortContents;

export interface ReplaceSortElement {
    id: string;
    value: number;
    fixed?: boolean;
}


export type ReplaceSortContents<E extends ReplaceSortElement = ReplaceSortElement> = E[];