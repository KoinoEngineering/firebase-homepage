import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { CompoersionSort, CompoersionSortItem } from "src/interfaces/Sorts";
import defaultTheme from "src/utils/theme";

const useStyles = makeStyles<typeof defaultTheme, { value: number; fixed: boolean; max: number }>(
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
        rainbow: ({ value, fixed, max }) => ({
            backgroundColor: `hsl(${(value * 360) / max},${fixed ? "50%" : "80%"},${fixed ? "50%" : "80%"})`,
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
    max: number;
}

const ContainerItem: React.FC<ContainerItemProps> = ({ item: { value }, isCursor, ended, isPointer, max }) => {
    const { inlineBlock, compared, pined, rainbow, sqare, relative, absolute, content } = useStyles({ fixed: ended, max, value });
    const color = ended ? rainbow : isPointer ? pined : isCursor ? compared : rainbow;
    return (
        <div className={[inlineBlock, color, sqare, relative].join(" ")}>
            <div className={[absolute, content].join(" ")}>{value}</div>
        </div>
    );
};

const SortsContainer: React.FC<CompoersionSort> = ({ items, ended, cursor, pointer, comparison }) => {
    return (
        <div>
            {items.map((item, i) => {
                return (
                    <ContainerItem
                        key={item.id}
                        item={item}
                        ended={ended}
                        isCursor={i === cursor || i === comparison}
                        isPointer={i === pointer}
                        max={items.length}
                    />
                );
            })}
        </div>
    );
};

export default SortsContainer;
