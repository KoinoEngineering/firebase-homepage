export type Propsof<C> = C extends React.ComponentType<infer P> ? P : never;
