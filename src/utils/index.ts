const utils = {
    max: <T, A = unknown>(array: T[], selector: (item: T) => A): A => {
        return array.reduce((ans, item) => {
            if (ans !== null) {
                const current = selector(item);
                return current > ans ? current : ans;
            } else {
                return selector(item);
            }
        }, selector(array[0]));
    }
};

export default utils;