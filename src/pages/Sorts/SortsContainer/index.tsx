import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { ComparsionItem } from "src/models/sorts/Comparsion";
import defaultTheme from "src/utils/theme";

interface SortsContainerProps {
    items: ComparsionItem[];
    ended: boolean;
}

const useStyles = makeStyles<typeof defaultTheme, { value: number; fixed: boolean }>(
    createStyles({
        rainbow: ({ value, fixed }) => ({
            backgroundColor: `hsl(${(value * 360) / 100},${fixed ? "50%" : "80%"},${fixed ? "50%" : "80%"})`,
            display: "inline-block",
        }),
        sqare: {
            width: "2rem",
            "&::before": {
                content: "\"\"",
                paddingTop: "100%",
                display: "block",
            },
        },
        relative: {
            position: "relative",
        },
        absolute: {
            position: "absolute",
        },
        content: {
            top: 0,
            left: 0,
            paddingTop: "50%",
            paddingLeft: "50%",
            marginTop: "-25%",
            marginLeft: "-25%",
        },
    }),
);

const ContainerItem: React.FC<{ value: number; fixed: boolean }> = ({ value, fixed }) => {
    const { rainbow, sqare, relative, absolute, content } = useStyles({ value, fixed });
    return (
        <div className={[rainbow, sqare, relative].join(" ")}>
            <div className={[absolute, content].join(" ")}>{value}</div>
        </div>
    );
};

const SortsContainer: React.FC<SortsContainerProps> = ({ items, ended }) => {
    return (
        <div>
            {items.map(({ id, value, fixed }) => {
                return <ContainerItem key={id} value={value} fixed={!ended && fixed} />;
            })}
        </div>
    );
};

export default SortsContainer;
