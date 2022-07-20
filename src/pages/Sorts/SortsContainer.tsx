import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { CompoersionSort, CompoersionSortItem } from "src/interfaces/Sorts";
import defaultTheme from "src/utils/theme";

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
    item: CompoersionSortItem;
    ended: boolean;
    isCursor: boolean;
    isPointer: boolean;
}

const ContainerItem: React.FC<ContainerItemProps> = ({ item: { value }, isCursor, ended }) => {
    const { inlineBlock, compared, rainbow, sqare, relative, absolute, content } = useStyles({ value, fixed: ended });
    return (
        <div className={[inlineBlock, !ended && isCursor ? compared : rainbow, sqare, relative].join(" ")}>
            <div className={[absolute, content].join(" ")}>{value}</div>
        </div>
    );
};

const SortsContainer: React.FC<CompoersionSort> = ({ items, ended, cursor, pointer, comparison }) => {
    return (
        <div>
            {items.map((item, i) => {
                return <ContainerItem key={item.id} item={item} ended={ended} isCursor={i === cursor || i === comparison} isPointer={i === pointer} />;
            })}
        </div>
    );
};

export default SortsContainer;
