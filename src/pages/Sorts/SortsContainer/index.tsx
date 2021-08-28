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
        inlineBlock: {
            display: "inline-block",
        },
        rainbow: ({ value, fixed }) => ({
            backgroundColor: `hsl(${(value * 360) / 100},${fixed ? "50%" : "80%"},${fixed ? "50%" : "80%"})`,
        }),
        compared: {
            backgroundColor: "red",
        },
        pined: {
            backgroundColor: "blue",
        },
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
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
        },
    }),
);

interface ContainerItemProps {
    item: ComparsionItem;
    ended: boolean;
}

const ContainerItem: React.FC<ContainerItemProps> = ({ item: { value, fixed, comparing }, ended }) => {
    const { inlineBlock, compared, rainbow, sqare, relative, absolute, content } = useStyles({ value, fixed: !ended && fixed });
    return (
        <div className={[inlineBlock, !ended && comparing ? compared : rainbow, sqare, relative].join(" ")}>
            <div className={[absolute, content].join(" ")}>{value}</div>
        </div>
    );
};

const SortsContainer: React.FC<SortsContainerProps> = ({ items, ended }) => {
    return (
        <div>
            {items.map((item) => {
                return <ContainerItem key={item.id} item={item} ended={ended} />;
            })}
        </div>
    );
};

export default SortsContainer;
