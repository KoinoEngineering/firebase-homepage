import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { CompoersionSort, CompoersionSortItem } from "src/interfaces/Sorts";
import defaultTheme from "src/utils/theme";

const useStyles = makeStyles<typeof defaultTheme, { value: number; fixed: boolean }>(
    createStyles({
        absolute: {
            position: "absolute",
        },
        compared: {
            backgroundColor: "red",
        },
        content: {
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
        },
        inlineBlock: {
            display: "inline-block",
        },
        pined: {
            backgroundColor: "blue",
        },
        rainbow: ({ value, fixed }) => ({
            backgroundColor: `hsl(${(value * 360) / 100},${fixed ? "50%" : "80%"},${fixed ? "50%" : "80%"})`,
        }),
        relative: {
            position: "relative",
        },
        sqare: {
            "&::before": {
                content: "\"\"",
                display: "block",
                paddingTop: "100%",
            },
            width: "2rem",
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
    const { inlineBlock, compared, rainbow, sqare, relative, absolute, content } = useStyles({ fixed: ended, value });
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