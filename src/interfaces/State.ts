import { RouterState } from "connected-react-router";
import { BubbleState } from "src/pages/Sorts/Bubble/BubbleReducer";
import { ShakerState } from "src/pages/Sorts/Shaker/ShakerReducer";
import { HeaderState } from "src/components/organisms/Header/Header";
import { GnomeState } from "src/pages/Sorts/Gnome/GnomeReducer";
import { SelectState } from "src/pages/Sorts/Select/SelectReducer";

export interface State {
    header: HeaderState;
    router: RouterState;
    bubble: BubbleState;
    shaker: ShakerState;
    gnome: GnomeState;
    select: SelectState;
}