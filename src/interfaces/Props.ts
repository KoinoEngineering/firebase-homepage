export type Propsof<C> = C extends React.RefForwardingComponent<any, infer P>
    ? P
    : C extends React.ComponentType<infer Q>
    ? Q
    : never;

// なぜかmaterial uiのPropsから読み込めないものがあるので適宜追加する
export interface Linkable {
    href?: string
    target?: string;
    rel?: string;
}