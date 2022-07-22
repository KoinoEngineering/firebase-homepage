import { Container, makeStyles, createStyles } from "@material-ui/core";
import { Propsof } from "src/interfaces/Props";
import React from "react";

const useStyesWithId = (id: PageContainerProps["id"]) =>
    makeStyles(
        createStyles({
            root: {
                height: "100%",
            },
        }),
        {
            classNamePrefix: id + "PageContainer",
        },
    );

interface PageContainerProps extends Propsof<typeof Container> {
  id: Propsof<typeof Container>["id"];
}

const PageContainer: React.FC<PageContainerProps> = (props) => {
    const classes = useStyesWithId(props.id)();
    return <Container {...props} classes={classes} />;
};

export default PageContainer;
