import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import { isString } from "util";

export interface NestedListProps extends Exclude<Propsof<typeof List>, "children"> {
    items?: NestedListItemProps[];
}

interface NestedListItemProps extends Omit<Propsof<typeof ListItem>, "button"> {
    content?: NestedListProps | string;
}

const NestedList: React.FC<NestedListProps> = ({ items, ...props }) => {
    return <List {...props}>
        {
            items?.map(({ content, ...props }, i) => <ListItem key={i}{...props} button={true}>
                {isString(content)
                    ? content
                    : <NestedList {...content} />
                }
            </ListItem>)
        }
    </List>;
};

export default NestedList;