import { Card, CardActionArea, CardContent, CardHeader } from "@material-ui/core";
import React from "react";
import { Linkable, Propsof } from "src/interfaces/Props";
import Debug from "src/utils/Debug";

export interface HeadlineCardProps extends Propsof<typeof Card> {
    cardActionAreaProps: CardActionAreaProps;
}

interface CardActionAreaProps extends Propsof<typeof CardActionArea>, Linkable {
    headerProps?: Propsof<typeof CardHeader>
    contentprops?: Propsof<typeof CardContent>
}
const HeadlineCard: React.FC<HeadlineCardProps> = ({ children, cardActionAreaProps, ...props }) => {
    if (process.env.NODE_ENV !== "production" && children) {
        Debug.error("このコンポーネントはchildrenを無視します");
    }

    const {
        headerProps,
        contentprops,
        ...cardActionAreaPropsFact
    } = cardActionAreaProps;
    return <Card {...props}>
        <CardActionArea {...cardActionAreaPropsFact}>
            {headerProps && <CardHeader {...headerProps} />}
            {contentprops && <CardContent {...contentprops} />}
        </CardActionArea>
    </Card>;
};

export default HeadlineCard;