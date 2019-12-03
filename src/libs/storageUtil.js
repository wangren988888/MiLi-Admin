var storage = {
    get: (name) => {
        return JSON.parse(window.localStorage.getItem(name));
    },
    set: (name, val) => {
        window.localStorage.setItem(name, JSON.stringify(val));
    },
    remove: (name) => {
        window.localStorage.removeItem(name);
    }
};
export default storage;
