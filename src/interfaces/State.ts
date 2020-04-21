import { RouterState } from "connected-react-router";
import { BubbleState } from "src/pages/Sorts/Bubble/BubbleReducer";
import { ShakerState } from "src/pages/Sorts/Shaker/ShakerReducer";
import { HeaderState } from "src/components/organisms/Header/Header";

export interface State {
    header: HeaderState;
    router: RouterState;
    bubble: BubbleState;
    shaker: ShakerState;
}