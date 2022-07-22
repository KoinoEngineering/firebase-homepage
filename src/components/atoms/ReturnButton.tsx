import React from "react";
// import { useMemo } from "react";
import MainButton from "./MainButton";
import { Propsof } from "src/interfaces/Props";

const ReturnButton: React.FC<Omit<Propsof<typeof MainButton>, "onClick">> = (
    props,
) => {
    return (
        <MainButton
            {...props}
            // onClick={() => actions.goBack()}
        >
      戻る
        </MainButton>
    );
};

export default ReturnButton;
