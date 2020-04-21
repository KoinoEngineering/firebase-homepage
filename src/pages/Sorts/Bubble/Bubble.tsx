import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import MainButton from "src/components/atoms/MainButton";
import { GridItem } from "src/components/templates/GridItem";
import { GridRow } from "src/components/templates/GridRow/GridRow";
import PageContainer from "src/components/templates/Page/PageContainer";
import { State } from "src/interfaces/State";
import { v4 as uuidv4 } from "uuid";
import BubbleActionCreators from "./BubbleActionCreators";
import { BubbleState } from "./BubbleReducer";
import ReplaceSortContents from "../Parts/ReplaceSortContents";
import ReplaceSortSetting from "../Parts/ReplaceSortSetting";

const useSquareContainerStyle = makeStyles(createStyles({
    root: {
        position: "relative",
        widthRate: "100%",
        "&::before": {
            content: "''",
            paddingTop: "100%",
        }
    }
}));

const Bubble: React.FC = () => {
    const dispatch = useDispatch();
    const { contents: array, running, cursor } = useSelector<State, BubbleState>(state => state.bubble);
    const actions = useMemo(() => bindActionCreators(BubbleActionCreators, dispatch), [dispatch]);
    const squareContainerClasses = useSquareContainerStyle();
    return <PageContainer id="Bubble">
        <GridRow id="ContentsArea">
            <Typography variant="h2">バブルソート</Typography>
        </GridRow>
        <GridRow id="SettingArea" spacing={4}>
            <ReplaceSortSetting />
        </GridRow >
        <GridRow id="ControlArea">
            <GridRow id="Reset">
                <Typography variant="h3">リセット</Typography>
            </GridRow>
            <GridRow id="Reset" spacing={4}>
                <GridItem xs={undefined} sm={undefined} md={undefined}>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.changeValue({ contents: array.sort((e1, e2) => e1.value - e2.value).map(item => ({ ...item, fixed: false })) })}
                    >昇順</MainButton>
                </GridItem>
                <GridItem xs={undefined} sm={undefined} md={undefined}>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.changeValue({ contents: array.sort((e1, e2) => e2.value - e1.value).map(item => ({ ...item, fixed: false })) })}
                    >降順</MainButton>
                </GridItem>
                <GridItem xs={undefined} sm={undefined} md={undefined}>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.changeValue({
                            contents: Array(array.length).fill(0).map(() => ({
                                id: uuidv4(),
                                value: Math.round(Math.random() * 99) + 1
                            }))
                        })}
                    >ランダム</MainButton>
                </GridItem>
            </GridRow>
            <GridRow id="ControlArea">
                <GridItem>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.start()}
                    >開始</MainButton>
                </GridItem>
            </GridRow>
        </GridRow>
        <GridRow id="ContentsArea">
            <Grid id="SquareContainer" container classes={squareContainerClasses}>
                <ReplaceSortContents contents={array} running={running} cursor={cursor} />
            </Grid>
        </GridRow>
    </PageContainer >;
};

export default Bubble;