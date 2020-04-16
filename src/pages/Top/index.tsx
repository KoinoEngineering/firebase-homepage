import { Grid, Typography } from "@material-ui/core";
import React from "react";
import HeadlineCard from "src/components/templates/HeadlineCard";
import PageContainer from "src/components/templates/Page/PageContainer";
import Profile from "src/components/templates/Profile";
import { Propsof } from "src/interfaces/Props";
import ROUTES, { EXT_ROUTE } from "src/utils/routes";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const Top: React.FC = () => {

    const dispatch = useDispatch();
    const madeItems: (Propsof<typeof HeadlineCard>)[] = [
        {
            raised: true,
            cardActionAreaProps: {
                href: EXT_ROUTE.HOMEPAGE,
                target: "_blank",
                rel: "noopener noreferrer",
                headerProps: {
                    title: "旧ホームページ(廃止予定)",
                }
            }
        },
        {
            raised: true,
            cardActionAreaProps: {
                onClick: () => dispatch(push(ROUTES.TOP)),
                headerProps: {
                    title: "Webサイト(ここ)",
                }
            }
        },
        {
            raised: true,
            cardActionAreaProps: {
                href: EXT_ROUTE.REACT,
                target: "_blank",
                rel: "noopener noreferrer",
                headerProps: {
                    title: "リアクト勉強部屋",
                }
            }
        },
        {
            raised: true,
            cardActionAreaProps: {
                href: EXT_ROUTE.MAZE,
                target: "_blank",
                rel: "noopener noreferrer",
                headerProps: {
                    title: "迷路",
                }
            }
        },
    ];

    return <PageContainer id="Top">
        <Grid container>
            <Grid container>
                <Profile />
            </Grid>
            <Grid container>
                <Grid container>
                    <Typography variant="h2">作ったものとか</Typography>
                </Grid>
                <Grid container spacing={4}>
                    {madeItems.map(madeItem => <Grid key={JSON.stringify(madeItem)} item xs={12} sm={6} md={4}>
                        <HeadlineCard {...madeItem} />
                    </Grid>)}
                </Grid>
            </Grid>
        </Grid>
    </PageContainer>;
};

export default Top;

type aa = Propsof<typeof HeadlineCard>;