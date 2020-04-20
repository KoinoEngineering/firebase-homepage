import { Grid } from "@material-ui/core";
import React from "react";
import { Propsof } from "src/interfaces/Props";

interface GridItemProps extends Propsof<typeof Grid> { }
export const GridItem: React.FC<GridItemProps> = (props) => <Grid item xs={12} sm={6} md {...props} />;