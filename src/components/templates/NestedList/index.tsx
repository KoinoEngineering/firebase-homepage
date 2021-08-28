import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Propsof } from "src/interfaces/Props";
import _ from "lodash";

export interface NestedListProps
  extends Exclude<Propsof<typeof List>, "children"> {
  items?: NestedListItemProps[];
}

interface NestedListItemProps extends Omit<Propsof<typeof ListItem>, "button"> {
  content?: NestedListProps | string;
}

const NestedList: React.FC<NestedListProps> = ({ items, ...props }) => {
    return (
        <List {...props}>
            {items?.map(({ content, ...props }, i) => (
                <ListItem key={i} {...props} button={true}>
                    {_.isString(content) ? content : <NestedList {...content} />}
                </ListItem>
            ))}
        </List>
    );
};

export default NestedList;
