import { Container, makeStyles, createStyles } from "@material-ui/core";
import { Propsof } from "interfaces/Props";
import React from "react";

const useStyes = makeStyles(createStyles({
    root: {
        height: "100%"
    }
}), {
    classNamePrefix: "PageContainer"
});

interface PageContainerProps extends Propsof<typeof Container> {
    id: Propsof<typeof Container>["id"]
}

const PageContainer: React.FC<PageContainerProps> = (props) => {
    const classes = useStyes();
    return <Container {...props} classes={classes} />;
};

export default PageContainer;