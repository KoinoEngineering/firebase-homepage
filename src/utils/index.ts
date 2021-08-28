const utils = {
    tap: <T>(callback: (state: T) => unknown) => {
        return (state: T) => {
            callback(state);
            return state;
        };
    },
    max: <T, A = unknown>(array: T[], selector: (item: T) => A): A => {
        return array.reduce((ans, item) => {
            if (ans !== null) {
                const current = selector(item);
                return current > ans ? current : ans;
            } else {
                return selector(item);
            }
        }, selector(array[0]));
    },
    reverse: <T>(a: Array<T>): Array<T> => {
        return a.reduce((ans, value) => {
            ans.unshift(value);
            return ans;
        }, [] as Array<T>);
    },
    wait: (ms: number = 0) => {
        return new Promise<number>((res) => {
            setTimeout(() => {
                res(ms);
            }, ms);
        });
    },
};

export default utils;
