import { IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { ExposureNeg1Rounded, ExposurePlus1Rounded } from "@material-ui/icons";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import MainSelect from "src/components/atoms/MainSelect";
import { GridItem } from "src/components/templates/GridItem";
import { State } from "src/interfaces/State";
import { v4 as uuidv4 } from "uuid";
import InsertionActionCreators from "../InsertionActionCreators";
import { ORDER, ORDER_LABEL_MAP } from "../InsertionConstants";
import { InsertionState, MAX_ELEMENT_COUNT, MIN_ELEMENT_COUNT } from "../InsertionReducer";

const InsertionSetting: React.FC = () => {

    const { contents, running, order, delay, animated, sorted } = useSelector<State, InsertionState>(state => state.insertion);
    const dispatch = useDispatch();
    const actions = useMemo(() => {
        return bindActionCreators(InsertionActionCreators, dispatch);
    }, [dispatch]);

    return <>
        <GridItem>
            <TextField
                fullWidth
                value={contents.length + sorted.length}
                disabled
                variant="outlined"
                label="要素数"
                size="small"
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <IconButton
                            disabled={running || contents.length <= MIN_ELEMENT_COUNT}
                            onClick={() => actions.changeValue({
                                contents: contents.filter(item => item.id !== contents[contents.length - 1].id).map(item => ({ ...item, fixed: false }))
                            })}>
                            <ExposureNeg1Rounded />
                        </IconButton>
                        <IconButton
                            disabled={running || contents.length >= MAX_ELEMENT_COUNT}
                            onClick={() => actions.changeValue({
                                contents: [
                                    ...contents.map(item => ({ ...item, fixed: false })),
                                    {
                                        id: uuidv4(),
                                        value: Math.round(Math.random() * 99) + 1
                                    }
                                ]
                            })}>
                            <ExposurePlus1Rounded />
                        </IconButton>
                    </InputAdornment>
                }}
            />
        </GridItem>
        <GridItem>
            <MainSelect
                fullWidth
                value={order}
                disabled={running}
                onChange={(e) => { actions.changeValue({ order: e.target.value as ORDER }); }}
                margin="dense"
                label="向き"
            >
                {Object.entries(ORDER).map(([k, v]) => {
                    return <MainSelect.Option key={k} value={v} dense>{ORDER_LABEL_MAP[v]}</MainSelect.Option>;
                })}
            </MainSelect>
        </GridItem>
        <GridItem>
            <TextField
                fullWidth
                value={delay}
                disabled
                variant="outlined"
                label="処理間隔"
                size="small"
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <IconButton
                            disabled={running || delay <= 0}
                            onClick={() => actions.changeValue({ delay: delay - 100 })}>
                            <ExposureNeg1Rounded />
                        </IconButton>
                        <IconButton
                            disabled={running || delay >= 1000}
                            onClick={() => actions.changeValue({ delay: delay + 100 })}>
                            <ExposurePlus1Rounded />
                        </IconButton>
                    </InputAdornment>
                }}
            />
        </GridItem>
        <GridItem>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={animated}
                        onClick={() => actions.changeValue({ animated: !animated })}
                        color="primary"
                    />
                }
                label="アニメーション(試験導入)"
            />
        </GridItem>
    </>;
};

export default InsertionSetting;
