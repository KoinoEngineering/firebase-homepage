import { Grid, Typography } from "@material-ui/core";
import React from "react";
import HeadlineCard from "src/components/templates/HeadlineCard";
import PageContainer from "src/components/templates/Page/PageContainer";
import Profile from "src/components/templates/Profile";
import { Propsof } from "src/interfaces/Props";
import ROUTES, { EXT_ROUTE } from "src/utils/routes";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { auth, Github } from "src/core/ConfigureFirebase";

interface GithubCredential extends firebase.auth.UserCredential {
    credential: firebase.auth.AuthCredential & { accessToken: string } | null;
}
Github.addScope("repo");
const githubSignInWithPopup = async () => (auth.signInWithPopup(Github) as unknown as Promise<GithubCredential>);
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
                onClick: () => dispatch(push(ROUTES.SORTS)),
                headerProps: {
                    title: "ソート",
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
                    title: "リアクト勉強部屋(ここの配下に移設予定)",
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
                    title: "迷路(ここの配下に移設予定)",
                }
            }
        },
        {
            raised: true,
            cardActionAreaProps: {
                onClick: () => {
                    githubSignInWithPopup().then((result) => {
                        // eslint-disable-next-line no-console
                        console.log(result);
                        fetch("https://api.github.com/user/repos", {
                            headers: [
                                ["Authorization", "Basic " + Buffer.from("KoinoEngineering:" + result.credential!.accessToken).toString("base64")],
                                ["Accept", "application/vnd.github.v3+json"]
                            ]
                        })
                            .then(res => res.json().then(json => ({
                                headers: Array.from(res.headers.entries())
                                    .reduce((h: { [k: string]: string }, [key, value]: [string, string]) => {
                                        h[key] = value;
                                        return h;
                                    }, {} as { [k: string]: string }),
                                body: json
                            })))
                            .then(json => console.log(json));
                    });
                },
                headerProps: {
                    title: "Github ログイン",
                }
            }
        },
        {
            raised: true,
            cardActionAreaProps: {
                onClick: () => {
                    auth
                        .signOut()
                        .then(() => {
                            window.alert("ログアウトしました");
                        })
                        .catch(reason => {
                            window.alert(reason);
                        });
                },
                headerProps: {
                    title: "ログアウト",
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