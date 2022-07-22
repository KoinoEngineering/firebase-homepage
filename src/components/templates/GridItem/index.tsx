import { Grid } from "@material-ui/core";
import React from "react";
import { Propsof } from "src/interfaces/Props";

interface GridItemProps extends Propsof<typeof Grid> {
  reset?: boolean;
}
export const GridItem: React.FC<GridItemProps> = ({ reset, ...props }) => (
    <Grid item xs={!reset && 12} sm={!reset && 6} md={!reset} {...props} />
);
