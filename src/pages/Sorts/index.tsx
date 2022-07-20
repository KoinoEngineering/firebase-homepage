import { Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useReducer } from "react";
import MainButton from "src/components/atoms/MainButton";
import { compoersionSortReducers, State } from "src/hooks";
import { CompoersionSort } from "src/interfaces/Sorts";
import { ActionCreators } from "src/reducers/actions";
import utils from "src/utils";
import { v4 as uuid } from "uuid";
import SortsContainer from "./SortsContainer";

const Sorts: React.FC = () => {
    const [state, dispatch] = useReducer(compoersionSortReducers, initialState());

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
    return (
        <div>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(ActionCreators.step());
                            }}
                        >
                            step
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton>play all</MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(
                                    ActionCreators.init({
                                        items: _.range(10).map(() => {
                                            return { id: uuid(), value: Math.round(Math.random() * 10) };
                                        }),
                                    }),
                                );
                            }}
                        >
                            random
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(
                                    ActionCreators.init({
                                        items: _.range(10).map((i) => {
                                            return { id: uuid(), value: i + 1 };
                                        }),
                                    }),
                                );
                            }}
                        >
                            sorted
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                dispatch(
                                    ActionCreators.init({
                                        items: _.range(10)
                                            .map((i) => {
                                                return { id: uuid(), value: i + 1 };
                                            })
                                            .reverse(),
                                    }),
                                );
                            }}
                        >
                            reversed
                        </MainButton>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={1}>
                <Grid item>
                    {utils.entries(state).map(([key, method]) => {
                        return (
                            <div key={key}>
                                <SortsContainer {...method}></SortsContainer>
                            </div>
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
        bubble: dummyState(),
    };
}

function dummyState(): CompoersionSort {
    return {
        items: [],
        cursor: 0,
        comparison: 0,
        cursorMin: 0,
        cursorMax: 0,
        pointer: 0,
        needSwap: false,
        compCnt: 0,
        swapCnt: 0,
        ended: false,
    };
}
