import { Grid, ListSubheader, Typography } from "@material-ui/core";
import React from "react";
import Logo from "src/images/logo/logo.svg";
import NestedList, { NestedListProps } from "../NestedList";

const Profile: React.FC = () => {

    return <Grid id="Profile" container direction="row">
        <Grid container item justify="center" xs={12} sm>
            <img alt={"こいのエンジニアリング"} src={Logo} width="100%" />
        </Grid>
        <Grid item container xs={12} sm>
            <NestedList {...profileInfo} />
        </Grid>
    </Grid>;
};

export default Profile;


const getPeriods = (): string => {
    const startDate = new Date(2014, 8, 1);
    const today = new Date();

    today.setFullYear(today.getFullYear() - startDate.getFullYear());
    today.setMonth(today.getMonth() - startDate.getMonth());
    today.setDate(today.getDate() - startDate.getDate());
    return `${today.getFullYear()}年${today.getMonth()}ヶ月${today.getDate()}日`;
};

const profileInfo: NestedListProps = {
    subheader: <ListSubheader disableSticky><Typography variant="h2">プロフィール</Typography></ListSubheader>,
    items: [
        {
            disableRipple: true,
            content: "名前: こいのエンジニアリング"
        },
        {
            disableRipple: true,
            content: `開発年数: 2014年8月～現在(${getPeriods()})`
        },
        {
            disableRipple: true,
            content: {
                subheader: <ListSubheader disableSticky><Typography variant="h3">できること</Typography></ListSubheader>,
                items: [
                    {
                        disableRipple: true,
                        content: {
                            subheader: <ListSubheader disableSticky><Typography variant="h3">言語</Typography></ListSubheader>,
                            items: [
                                {
                                    disableRipple: true,
                                    content: "typescript"
                                },
                                {
                                    disableRipple: true,
                                    content: "react/redux/redux-saga"
                                },
                                {
                                    disableRipple: true,
                                    content: "java"
                                },
                                {
                                    disableRipple: true,
                                    content: "C#"
                                },
                            ]
                        }
                    },
                    {
                        disableRipple: true,
                        content: {
                            subheader: <ListSubheader disableSticky><Typography variant="h3">環境</Typography></ListSubheader>,
                            items: [
                                {
                                    disableRipple: true,
                                    content: "firebase"
                                },
                                {
                                    disableRipple: true,
                                    content: "heroku"
                                },
                                {
                                    disableRipple: true,
                                    content: "aws(勉強中)"
                                },
                            ]
                        }
                    },
                ]
            }
        },
    ]
};