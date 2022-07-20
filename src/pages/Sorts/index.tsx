import { Grid } from "@material-ui/core";
import React from "react";
import MainButton from "src/components/atoms/MainButton";

const Sorts: React.FC = () => {
    return (
        <div>
            <div>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <MainButton>step</MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton>play all</MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton>random</MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton>sorted</MainButton>
                    </Grid>
                    <Grid item xs>
                        <MainButton>reversed</MainButton>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={1}>
                dummy
            </Grid>
        </div>
    );
};

export default Sorts;
