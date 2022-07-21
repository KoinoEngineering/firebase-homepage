import { createStyles, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import _ from "lodash";
import qs from "qs";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router";
import MainButton from "src/components/atoms/MainButton";
import { compoersionSortReducers, State } from "src/hooks";
import { ComparisonSort, SORT_TYPES } from "src/interfaces/Sorts";
import { ActionCreators } from "src/reducers/actions";
import utils from "src/utils";
import { v4 as uuid } from "uuid";
import SortsContainer from "./SortsContainer";

const useStyles = makeStyles(
    createStyles({
        root: {
            padding: 8,
        },
    }),
);

const Sorts: React.FC = () => {
    const { root } = useStyles();
    const [state, dispatch] = useReducer(compoersionSortReducers, initialState());
    const history = useHistory();
    const location = useLocation();
    const params = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const [playAll, setPlayAll] = useState(false);

    useEffect(() => {
        dispatch(
            ActionCreators.init({
                items: _.range(10)
                    .map((i) => {
                        return { id: uuid(), value: i + 1 };
                    })
                    .reverse(),
            }),
        );
    }, [dispatch]);

    useEffect(() => {
        if (playAll && Object.values(state).some((s) => !s.ended)) {
            utils.wait(Number(params.delay)).then(() => dispatch(ActionCreators.step()));
        } else {
            setPlayAll(false);
        }
    }, [params.delay, playAll, state]);

    useEffect(() => {
        const length = Number(params.length);
        if (isNaN(length) || length < 2) {
            return history.replace({ ...location, search: qs.stringify({ ...params, length: 2 }) });
        }
    }, [history, location, params]);

    return (
        <div className={root}>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(ActionCreators.step());
                            }}
                            disabled={playAll}
                        >
                            step
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        {playAll ? (
                            <MainButton onClick={() => setPlayAll(false)}>stop</MainButton>
                        ) : (
                            <MainButton onClick={() => setPlayAll(true)}>play all</MainButton>
                        )}
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(
                                    ActionCreators.init({
                                        items: _.range(Number(params.length)).map(() => {
                                            return { id: uuid(), value: Math.round(Math.random() * Number(params.length)) };
                                        }),
                                    }),
                                );
                            }}
                            disabled={playAll}
                        >
                            random
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(
                                    ActionCreators.init({
                                        items: _.range(Number(params.length)).map((i) => {
                                            return { id: uuid(), value: i + 1 };
                                        }),
                                    }),
                                );
                            }}
                            disabled={playAll}
                        >
                            sorted
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(
                                    ActionCreators.init({
                                        items: _.range(Number(params.length))
                                            .map((i) => {
                                                return { id: uuid(), value: i + 1 };
                                            })
                                            .reverse(),
                                    }),
                                );
                            }}
                            disabled={playAll}
                        >
                            reversed
                        </MainButton>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>比較・置換を1ステップとして観察できる</Typography>
                    <ul>
                        <li>
                            実際は<strong>比較</strong>と<strong>置換</strong>のコストが同じになるはずはないので
                            <br />
                            <strong>早さ</strong>よりも<strong>動きの違い</strong>を見るためのもの
                        </li>
                        <li>「進めるための比較」が必要なノームソートなどは実際よりとても遅いはず</li>
                    </ul>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography>設定</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item>
                            <TextField
                                value={params.delay}
                                label="処理間隔(ms)"
                                onChange={({ target: { value: delay } }) => {
                                    if (!isNaN(Number(delay))) {
                                        history.replace({ ...location, search: qs.stringify({ ...params, delay }) });
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type="number"
                                value={params.length}
                                label="要素数"
                                onChange={({ target: { value } }) => {
                                    const length = Number(value);
                                    if (isNaN(length) || length < 2) {
                                        return history.replace({ ...location, search: qs.stringify({ ...params, length: 2 }) });
                                    }
                                    return history.replace({ ...location, search: qs.stringify({ ...params, length }) });
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    {utils.entries(state).map(([key, type]) => {
                        return (
                            <Grid key={SORT_TYPES[key]} item xs={12}>
                                <div>{SORT_TYPES[key]}</div>
                                <div>
                                    <span>比較回数：{type.compCnt}</span>
                                    <span>置換回数：{type.swapCnt}</span>
                                    {type.items.every((item, i) => {
                                        return i === 0 || item.value >= type.items[i - 1].value;
                                    }) && <span>(収束済み)</span>}
                                </div>
                                <div>
                                    <SortsContainer {...type} />
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    );
};

export default Sorts;

function initialState(): State {
    return {
        "00bubble": dummyState(),
        "01shaker": dummyState(),
        "02gnome": dummyState(),
        "03insertion": dummyState(),
        "10selection": dummyState(),
        "20merge": dummyState(),
    };
}

function dummyState(): ComparisonSort {
    return {
        compCnt: 0,
        comparison: 0,
        cursor: 0,
        cursorMax: 0,
        cursorMin: 0,
        direction: true,
        ended: false,
        items: [],
        needSwap: false,
        pointer: 0,
        swapCnt: 0,
    };
}
