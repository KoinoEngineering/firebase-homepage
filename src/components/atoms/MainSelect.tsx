import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    makeStyles,
} from "@material-ui/core";
import React from "react";
import { Propsof } from "src/interfaces/Props";

interface MainSelect extends React.FC<Propsof<typeof Select>> {
  Option: typeof MenuItem;
}

const useLabelStyle = makeStyles({
    root: {
        transform: "translate(14px, -6px) scale(0.75)",
    },
});

const MainSelect: MainSelect = (props) => {
    const labelClasses = useLabelStyle();
    return (
        <FormControl fullWidth={props.fullWidth}>
            {props.label && (
                <InputLabel id={props.labelId} classes={labelClasses}>
                    {props.label}
                </InputLabel>
            )}
            <Select variant="outlined" {...props} />
        </FormControl>
    );
};

MainSelect.Option = MenuItem;

export default MainSelect;
