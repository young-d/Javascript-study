const storage = window.localStorage;

export const setItem = (key, value) => {
    try {
        storage.setItem(key, value);
    } catch(e) {
        console.error(e);
    }
};

export const getItem = (key, defaultValue) => {
    try {
        return storage.getItem(key) ? JSON.parse(storage.getItem(key)) : defaultValue;
    } catch(e) {
        console.error(e);
        return defaultValue;
    }
};
