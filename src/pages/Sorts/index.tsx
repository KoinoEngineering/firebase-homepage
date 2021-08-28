import { Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import MainButton from "src/components/atoms/MainButton";
import Bubble from "src/models/sorts/Bubble";
import Shaker from "src/models/sorts/Shaker";
import Gnome from "src/models/sorts/Gnome";
import Comparsion from "src/models/sorts/Comparsion";
import utils from "src/utils";
import { v4 as uuid } from "uuid";
import SortsContainer from "./SortsContainer";

const Sorts: React.FC = () => {
    const [state, setState] = useState<Comparsion[]>(initialState());

    const step = useCallback(async (comparsions: Comparsion[]) => {
        return Promise.all(
            comparsions.map((s) => {
                return s.compare();
            }),
        )
            .then(async (compared) => {
                return Promise.all(
                    compared.map(async (s) => {
                        return s.swap();
                    }),
                );
            })
            .then((swappedItems) => {
                setState(swappedItems);
                return swappedItems;
            });
    }, []);

    const playAll = useCallback(
        async (comparsions: Comparsion[]): Promise<Comparsion[]> => {
            return step(comparsions).then((state) => {
                if (state.every((s) => s.ended())) {
                    return state;
                } else {
                    return utils.wait().then(() => playAll(state));
                }
            });
        },
        [step],
    );
    return (
        <div>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <MainButton
                            disabled={state.every((s) => s.ended())}
                            onClick={() => {
                                step(state);
                            }}
                        >
                            step
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton disabled={state.every((s) => s.ended())} onClick={() => playAll(state)}>
                            play all
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                setState(initialState(_.shuffle(_.range(50))));
                            }}
                        >
                            random
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                setState(initialState(_.range(50)));
                            }}
                        >
                            sorted
                        </MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton
                            onClick={() => {
                                setState(initialState(_(_.range(50)).reverse().value()));
                            }}
                        >
                            reversed
                        </MainButton>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={1}>
                {state.map((s) => {
                    return (
                        <Grid key={s.name} item xs={12}>
                            <div>{s.name}</div>
                            <div>
                                <span>比較回数：{s.compareCount}</span>
                                <span>置換回数：{s.swapCount}</span>
                            </div>
                            <div>
                                <SortsContainer items={s.items} ended={s.ended()} />
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Sorts;

function initialState(init: number[] = []) {
    const iniitialArray = init.length ? init : [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    return [
        new Bubble({
            items: iniitialArray.map((value) => {
                return {
                    id: uuid(),
                    value,
                    comparing: false,
                    pinned: false,
                    fixed: false,
                };
            }),
        }),
        new Shaker({
            items: iniitialArray.map((value) => {
                return {
                    id: uuid(),
                    value,
                    comparing: false,
                    pinned: false,
                    fixed: false,
                };
            }),
        }),
        new Gnome({
            items: iniitialArray.map((value) => {
                return {
                    id: uuid(),
                    value,
                    comparing: false,
                    pinned: false,
                    fixed: false,
                };
            }),
        }),
    ];
}
