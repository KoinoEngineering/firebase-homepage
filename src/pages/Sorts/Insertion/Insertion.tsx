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
import ReplaceSortContents from "../Parts/ReplaceSortContents";
import InsertionActionCreators from "./InsertionActionCreators";
import { InsertionState } from "./InsertionReducer";
import InsertionSetting from "./Parts/InsertionSetting";
import ROUTES from "src/utils/routes";
import { NavLink } from "react-router-dom";

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

const Insertion: React.FC = () => {
    const dispatch = useDispatch();
    const { contents, running, sorted } = useSelector<State, InsertionState>(state => state.insertion);
    const actions = useMemo(() => bindActionCreators(InsertionActionCreators, dispatch), [dispatch]);
    const squareContainerClasses = useSquareContainerStyle();
    return <PageContainer id="Insertion">
        <GridRow id="TitleArea" spacing={2}>
            <GridItem reset><Typography variant="h2">選択ソート</Typography></GridItem>
            <GridItem reset justify="center" container direction="column" xs><NavLink to={ROUTES.SORTS}>戻る</NavLink></GridItem>
        </GridRow>
        <GridRow id="SettingArea" spacing={4}>
            <InsertionSetting />
        </GridRow >
        <GridRow id="ControlArea">
            <GridRow id="Reset">
                <Typography variant="h3">リセット</Typography>
            </GridRow>
            <GridRow id="Reset" spacing={4}>
                <GridItem reset>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.changeValue({ contents: contents.sort((e1, e2) => e1.value - e2.value).map(item => ({ ...item, fixed: false })) })}
                    >昇順</MainButton>
                </GridItem>
                <GridItem reset>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.changeValue({ contents: contents.sort((e1, e2) => e2.value - e1.value).map(item => ({ ...item, fixed: false })) })}
                    >降順</MainButton>
                </GridItem>
                <GridItem reset>
                    <MainButton
                        disabled={running}
                        onClick={() => actions.changeValue({
                            contents: Array(contents.length).fill(0).map(() => ({
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
                <ReplaceSortContents contents={sorted.concat(contents)} running={running} cursor={sorted.length} />
            </Grid>
        </GridRow>
    </PageContainer >;
};

export default Insertion;