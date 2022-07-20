/* eslint-disable no-console */
type Debug = Pick<Console, "log" | "error">;

const Debug: Debug = {
    log: (...args: any) =>
        process.env.NODE_ENV !== "production" && console.log(...args),
    error: (...args: any) =>
        process.env.NODE_ENV !== "production" && console.error(...args),
};

export default Debug;
