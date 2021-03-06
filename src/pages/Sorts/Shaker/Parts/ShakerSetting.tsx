import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { ExposureNeg1Rounded, ExposurePlus1Rounded } from "@material-ui/icons";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import MainSelect from "src/components/atoms/MainSelect";
import { GridItem } from "src/components/templates/GridItem";
import { State } from "src/interfaces/State";
import { v4 as uuidv4 } from "uuid";
import ShakerActionCreators from "../ShakerActionCreators";
import { ORDER, ORDER_LABEL_MAP } from "../ShakerConstants";
import { ShakerState, MAX_ELEMENT_COUNT, MIN_ELEMENT_COUNT } from "../ShakerReducer";

const ShakerSetting: React.FC = () => {

    const { contents, running, order, delay } = useSelector<State, ShakerState>(state => state.shaker);
    const dispatch = useDispatch();
    const actions = useMemo(() => {
        return bindActionCreators(ShakerActionCreators, dispatch);
    }, [dispatch]);

    return <>
        <GridItem>
            <TextField
                fullWidth
                value={contents.length}
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
    </>;
};

export default ShakerSetting;
