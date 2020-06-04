import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import MainButton from "src/components/atoms/MainButton";
import { GridItem } from "src/components/templates/GridItem";
import { GridRow } from "src/components/templates/GridRow/GridRow";
import PageContainer from "src/components/templates/Page/PageContainer";
import { State } from "src/interfaces/State";
import ROUTES from "src/utils/routes";
import { v4 as uuidv4 } from "uuid";
import ReplaceSortChart from "../Parts/ReplaceSortChart";
import ReplaceSortContents from "../Parts/ReplaceSortContents";
import BubbleActionCreators from "./BubbleActionCreators";
import { BubbleState } from "./BubbleReducer";
import BubbleSetting from "./Parts/BubbleSetting";

const useSquareContainerStyle = makeStyles(createStyles({
    root: {
        position: "relative",
        width: "100%",
        height: "50vh",
    }
}));

const Bubble: React.FC = () => {
    const dispatch = useDispatch();
    const { contents: array, running, cursor, chartObject } = useSelector<State, BubbleState>(state => state.bubble);
    const actions = useMemo(() => bindActionCreators(BubbleActionCreators, dispatch), [dispatch]);
    const squareContainerClasses = useSquareContainerStyle();
    return <PageContainer id="Bubble">
        <GridRow id="TitleArea" spacing={2}>
            <GridItem reset><Typography variant="h2">バブルソート</Typography></GridItem>
            <GridItem reset justify="center" container direction="column" xs><NavLink to={ROUTES.SORTS}>戻る</NavLink></GridItem>
        </GridRow>
        <GridRow id="SettingArea" spacing={4}>
            <BubbleSetting />
        </GridRow >
        <GridRow id="ControlArea">
            <GridRow id="Reset">
                <Typography variant="h3">リセット</Typography>
            </GridRow>
            <GridRow id="Reset" spacing={4}>
                <GridItem xs={undefined} sm={undefined} md={undefined}>
                    <MainButton
                        disabled={running}
                        onClick={() => {
                            const contents = [...array].sort((e1, e2) => e1.value - e2.value).map(item => ({ ...item, fixed: false }));
                            actions.changeValue({ contents });
                        }}
                    >昇順</MainButton>
                </GridItem>
                <GridItem xs={undefined} sm={undefined} md={undefined}>
                    <MainButton
                        disabled={running}
                        onClick={() => {
                            const contents = [...array].sort((e1, e2) => e2.value - e1.value).map(item => ({ ...item, fixed: false }));
                            actions.changeValue({ contents });
                        }}
                    >降順</MainButton>
                </GridItem>
                <GridItem xs={undefined} sm={undefined} md={undefined}>
                    <MainButton
                        disabled={running}
                        onClick={() => {
                            const contents = Array(array.length).fill(0).map(() => ({
                                id: uuidv4(),
                                value: Math.round(Math.random() * 99) + 1
                            }));
                            actions.changeValue({
                                contents,
                            });
                        }}
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
            <Grid id="ChartContainer" container>
                <ReplaceSortChart chartObject={chartObject} />
            </Grid>
        </GridRow>
    </PageContainer >;
};

export default Bubble;
