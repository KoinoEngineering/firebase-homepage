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
    const sorts: HeadlineCardProps[] = [
        {
            onClick: () => actions.navigate.push(ROUTES.SORTS_BUBBLE),
            cardActionAreaProps: {
                headerProps: {
                    title: "バブルソート"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "シェーカーソート(Comming Soon...)"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "ノームソート(Comming Soon...)"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "選択ソート(Comming Soon...)"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "挿入ソート(Comming Soon...)"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "マージソート(Comming Soon...)"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "ヒープソート(Comming Soon...)"
                }
            }
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "クイックソート(Comming Soon...)"
                }
            }
        },
    ];

    return <PageContainer id="Sorts">
        <Grid id="title" container>
            <Typography variant="h2">
                いろんなソートを可視化してみる
            </Typography>
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
    </PageContainer>;
};

export default Sorts;