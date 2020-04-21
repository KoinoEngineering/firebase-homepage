import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import utils from "src/utils";
import Theme from "src/utils/theme";
import { BubbleState } from "../Bubble/BubbleReducer";

interface BubbleContentsProps extends Pick<BubbleState, "cursor" | "running"> {
    contents: BubbleContents;
}

interface ElementStyleProps extends CSSProperties, Pick<BubbleElementProps, "active"> {
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

const BubbleContents: React.FC<BubbleContentsProps> = ({ contents, cursor, running }) => {

    const classes = useStyles();
    const maxValue = utils.max(contents, element => element.value);
    return <Grid id="BubbleContents" classes={classes} container alignItems="flex-end">
        {
            contents.map((element, idx) => {
                return <BubbleElement
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


interface BubbleElementProps extends Exclude<Propsof<typeof Grid>, "classes"> {
    elementsCount: BubbleState["array"]["length"];
    element: BubbleElement;
    maxValue: BubbleElement["value"];
    active: boolean;
}

const BubbleElement: React.FC<BubbleElementProps> = ({ elementsCount, element, maxValue, active, ...props }) => {
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

export default BubbleContents;

export interface BubbleElement {
    id: string;
    value: number;
    fixed?: boolean;
}


export type BubbleContents = BubbleElement[];