import React from "react";
import { Button } from "@material-ui/core";
import { Propsof } from "src/interfaces/Props";

const MainButton: React.FC<Propsof<typeof Button>> = (props) => <Button variant="contained" {...props} />;

export default MainButton;