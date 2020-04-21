import { Grid, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import HeadlineCard, { HeadlineCardProps } from "src/components/templates/HeadlineCard";
import PageContainer from "src/components/templates/Page/PageContainer";
import { navigateActionsCreatetors } from "src/utils/ComponentUtils";
import { bindActionCreators } from "redux";
import ROUTES from "src/utils/routes";

const Sorts: React.FC = () => {

    const dispatch = useDispatch();
    const actions = useMemo(() => ({
        navigate: bindActionCreators(navigateActionsCreatetors, dispatch)
    }), [dispatch]);
    const sorts: HeadlineCardProps[] = Object.entries(SORTS_TITLE_MAP).map(([route, { title, exist }]) => {
        return {
            onClick: exist ? () => actions.navigate.push(route) : undefined,
            cardActionAreaProps: {
                disableRipple: !exist,
                headerProps: {
                    title: title + (exist ? "" : "(Comming Soon...)")
                }
            }
        };
    });

    return <PageContainer id="Sorts">
        <Grid id="title" container>
            <Grid container>
                <Typography variant="h2">
                    いろんなソートを可視化してみる
                </Typography>
            </Grid>
            <Grid container>
                <Typography variant="h3">
                    制約としてループを使用しない
                </Typography>
            </Grid>
        </Grid>
        <Grid id="main" container spacing={4}>
            {
                sorts.map(sort => {
                    return <Grid key={JSON.stringify(sort)} item>
                        <HeadlineCard {...sort} />
                    </Grid>;
                })
            }
        </Grid>
    </PageContainer >;
};

export default Sorts;

type SortTitleMap = {
    [K: string]: {
        title: string;
        exist?: boolean;
    };
};

export const SORTS_TITLE_MAP: SortTitleMap = {
    [ROUTES.SORTS_BUBBLE]: { title: "バブルソート", exist: true },
    [ROUTES.SORTS_SHAKER]: { title: "シェーカーソート", exist: true },
    [ROUTES.SORTS_GNOME]: { title: "ノームソート" },
    [ROUTES.SORTS_SELECT]: { title: "選択ソート" },
    [ROUTES.SORTS_INSERT]: { title: "挿入ソート" },
    [ROUTES.SORTS_BACKET]: { title: "バケットソート" },
    [ROUTES.SORTS_MARGE]: { title: "マージソート" },
    [ROUTES.SORTS_HEAP]: { title: "ヒープソート" },
    [ROUTES.SORTS_QUICK]: { title: "クイックソート" },
};