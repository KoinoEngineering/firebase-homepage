import React, { useMemo } from "react";
import MainButton from "./MainButton";
import { Propsof } from "src/interfaces/Props";
import { navigateActionsCreatetors } from "src/utils/ComponentUtils";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

const ReturnButton: React.FC<Omit<Propsof<typeof MainButton>, "onClick">> = (props) => {
    const dispatch = useDispatch();
    const actions = useMemo(() => {
        return bindActionCreators(navigateActionsCreatetors, dispatch);
    }, [dispatch]);
    return <MainButton
        {...props}
        onClick={() => actions.goBack()}
    >戻る</MainButton>;
};

export default ReturnButton;