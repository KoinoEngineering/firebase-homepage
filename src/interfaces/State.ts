import { RouterState } from "connected-react-router";
import { BubbleState } from "src/pages/Sorts/Bubble/BubbleReducer";

export interface State {
    router: RouterState;
    bubble: BubbleState;
}