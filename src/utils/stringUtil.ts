import { isString } from "util";

export const px = (value: string | number) =>
    isString(value) ? value : value + "px";
