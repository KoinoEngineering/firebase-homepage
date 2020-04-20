import { TextField, Typography, InputAdornment, IconButton, makeStyles, createStyles, Grid } from "@material-ui/core";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { GridItem } from "src/components/templates/GridItem";
import { GridRow } from "src/components/templates/GridRow/GridRow";
import PageContainer from "src/components/templates/Page/PageContainer";
import { State } from "src/interfaces/State";
import BubbleActionCreators from "./BubbleActionCreators";
import { BubbleState, MIN_ELEMENT_COUNT, MAX_ELEMENT_COUNT } from "./BubbleReducer";
import MainButton from "src/components/atoms/MainButton";
import BubbleContents from "./Parts/BubbleContents";
import { ExposureNeg1Rounded, ExposurePlus1Rounded } from "@material-ui/icons";

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
    const { elementCount, array, running } = useSelector<State, BubbleState>(state => state.bubble);
    const actions = useMemo(() => bindActionCreators(BubbleActionCreators, dispatch), [dispatch]);
    const squareContainerClasses = useSquareContainerStyle();
    return <PageContainer id="Bubble">
        <GridRow id="ContentsArea">
            <Typography variant="h2">バブルソート</Typography>
        </GridRow>
        <GridRow id="SettingArea" >
            <GridItem>
                <TextField
                    value={elementCount}
                    disabled={running}
                    variant="outlined"
                    label="要素数"
                    size="small"
                    error={isNaN(Number(elementCount))}
                    helperText={isNaN(Number(elementCount)) ? "数値を入力してください" : undefined}
                    onChange={(e) => { actions.changeValue({ elementCount: e.currentTarget.value }); }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end" >
                            <IconButton
                                disabled={running || Number(elementCount) <= MIN_ELEMENT_COUNT}
                                onClick={() => actions.changeValue({ elementCount: (isNaN(Number(elementCount)) ? MIN_ELEMENT_COUNT : (Number(elementCount) - 1)).toString() })}>
                                <ExposureNeg1Rounded />
                            </IconButton>
                            <IconButton
                                disabled={running || Number(elementCount) >= MAX_ELEMENT_COUNT}
                                onClick={() => actions.changeValue({ elementCount: (isNaN(Number(elementCount)) ? MAX_ELEMENT_COUNT : (Number(elementCount) + 1)).toString() })}>
                                <ExposurePlus1Rounded />
                            </IconButton>
                        </InputAdornment>
                    }}
                />
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
        <GridRow id="ContentsArea">
            <Grid id="SquareContainer" container classes={squareContainerClasses}>
                <BubbleContents contents={array} />
            </Grid>
        </GridRow>
    </PageContainer >;
};

export default Bubble;