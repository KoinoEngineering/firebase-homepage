import { Grid } from "@material-ui/core";
import React from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { Propsof } from "src/interfaces/Props";
import utils from "src/utils";
import ReplaceSortContents, { useReplaceSortContentsStyles, ReplaceSortElement } from "./ReplaceSortContents";

type ReplaceSortContentsFlipperProps = Propsof<typeof ReplaceSortContents>

const ReplaceSortContentsFlipper: React.FC<ReplaceSortContentsFlipperProps> = ({ contents, cursor, running, optionCursor }) => {

    const classes = useReplaceSortContentsStyles();
    const maxValue = utils.max(contents, element => element.value);
    return <Flipper flipKey={JSON.stringify(contents)}>
        <Grid id="ReplaceSortContentsFlipper" classes={classes} container alignItems="flex-end" direction="row-reverse">
            {
                // コンポーネント表裏が制御できなかったのでいったん反転の反転で誤魔化している
                utils.reverse(contents.map((element, idx) => {
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
                }))
            }
        </Grid>
    </Flipper>;
};

interface ReplaceSortElementProps extends Exclude<Propsof<typeof Grid>, "classes"> {
    elementsCount: ReplaceSortContentsFlipperProps["contents"]["length"];
    element: ReplaceSortElement;
    maxValue: ReplaceSortElement["value"];
    active: boolean;
    option?: boolean;
}

export default ReplaceSortContentsFlipper;
