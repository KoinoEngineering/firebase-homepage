import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import HeadlineCard from "src/components/templates/HeadlineCard";
import PageContainer from "src/components/templates/Page/PageContainer";
import Profile from "src/components/templates/Profile";
import { Propsof } from "src/interfaces/Props";
import ROUTES, { EXT_ROUTE } from "src/utils/routes";

const Top: React.FC = () => {
    const history = useHistory();
    const madeItems: Propsof<typeof HeadlineCard>[] = [
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "旧ホームページ(廃止予定)",
                },
                href: EXT_ROUTE.HOMEPAGE,
                rel: "noopener noreferrer",
                target: "_blank",
            },
            raised: true,
        },
        {
            cardActionAreaProps: {
                // onClick: () => dispatch(push(ROUTES.TOP)),
                headerProps: {
                    title: "Webサイト(ここ)",
                },
            },
            raised: true,
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "ソート",
                },
                onClick: () => history.push(ROUTES.SORTS),
            },
            raised: true,
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "リアクト勉強部屋(ここの配下に移設予定)",
                },
                href: EXT_ROUTE.REACT,
                rel: "noopener noreferrer",
                target: "_blank",
            },
            raised: true,
        },
        {
            cardActionAreaProps: {
                headerProps: {
                    title: "迷路(ここの配下に移設予定)",
                },
                href: EXT_ROUTE.MAZE,
                rel: "noopener noreferrer",
                target: "_blank",
            },
            raised: true,
        },
    ];

    return (
        <PageContainer id="Top">
            <Grid container>
                <Grid container>
                    <Profile />
                </Grid>
                <Grid container>
                    <Grid container>
                        <Typography variant="h2">作ったものとか</Typography>
                    </Grid>
                    <Grid container spacing={4}>
                        {madeItems.map((madeItem) => (
                            <Grid key={JSON.stringify(madeItem)} item xs={12} sm={6} md={4}>
                                <HeadlineCard {...madeItem} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default Top;
