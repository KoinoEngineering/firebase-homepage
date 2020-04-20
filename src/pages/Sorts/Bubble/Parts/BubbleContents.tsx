import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import utils from "src/utils";
import Theme from "src/utils/theme";
import { BubbleState } from "../BubbleReducer";

interface BubbleContentsProps {
    contents: BubbleContents;
}

interface ElementStyleProps extends CSSProperties {
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
        backgroundColor: props => `hsl(${props.heightRate * 360}, ${props.fixed ? "40%" : "80%"}, ${props.fixed ? "40%" : "80%"})`
    }
});

const BubbleContents: React.FC<BubbleContentsProps> = ({ contents }) => {

    const classes = useStyles();
    const maxValue = utils.max(contents, element => element.value);
    return <Grid id="BubbleContents" classes={classes} container alignItems="flex-end">
        {
            contents.map(element => {
                return <BubbleElement
                    key={element.id}
                    elementsCount={contents.length}
                    element={element}
                    maxValue={maxValue}
                />;
            })
        }
    </Grid>;
};


interface BubbleElementProps extends Exclude<Propsof<typeof Grid>, "classes"> {
    elementsCount: BubbleState["array"]["length"];
    element: BubbleElement;
    maxValue: BubbleElement["value"];
}

const BubbleElement: React.FC<BubbleElementProps> = ({ elementsCount, element, maxValue, ...props }) => {
    const elementClasses = useElementStyle({
        widthRate: 1 / elementsCount,
        heightRate: element.value / maxValue,
        fixed: element.fixed,
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