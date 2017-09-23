const store = {};

function set(key, value) {
    store[key] = value;
    return Promise.resolve(value);
}

function get(key, defaultValue) {
    if (key in store) {
        return Promise.resolve(store[key]);
    } else if (arguments.length > 1) {
        return Promise.resolve(defaultValue);
    }
    return Promise.reject('Key not found in store');
}

function remove(key) {
    const value = store[key];
    delete store[key];
    return Promise.resolve(value);
}

function has(key) {
    return Promise.resolve(key in store);
}

exports.set = set;
exports.get = get;
exports.remove = remove;
exports.has = has;
