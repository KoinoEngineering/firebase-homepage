/* eslint-disable no-console */
type Debug = Pick<Console, "log" | "error">;

const Debug: Debug = {
    error: (...args: any) =>
        process.env.NODE_ENV !== "production" && console.error(...args),
    log: (...args: any) =>
        process.env.NODE_ENV !== "production" && console.log(...args),
};

export default Debug;
