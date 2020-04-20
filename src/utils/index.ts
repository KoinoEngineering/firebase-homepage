const utils = {
    max: <T, A = unknown>(array: T[], getter: (item: T) => A): A => {
        return array.reduce((ans, item) => {
            if (ans !== null) {
                const current = getter(item);
                return current > ans ? current : ans;
            } else {
                return getter(item);
            }
        }, getter(array[0]));
    }
};

export default utils;