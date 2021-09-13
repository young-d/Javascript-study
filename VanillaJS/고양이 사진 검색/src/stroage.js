const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
    try {
        return JSON.parse(storage.getItem(key)) || defaultValue;
    } catch (e) {
        console.error(e.message);
    }
}

export const setItem = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
}