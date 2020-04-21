import { RouterState } from "connected-react-router";
import { BubbleState } from "src/pages/Sorts/Bubble/BubbleReducer";
import { ShakerState } from "src/pages/Sorts/Shaker/ShakerReducer";

export interface State {
    router: RouterState;
    bubble: BubbleState;
    shaker: ShakerState;
}