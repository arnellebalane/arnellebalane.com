const ifm = (() => {

    const database = (() => {
        let db;
        const version = 1;

        return () => db
            ? Promise.resolve(db)
            : new Promise((resolve, reject) => {
                const request = indexedDB.open('idb-fetch-mirror', version);
                request.onsuccess = (e) => {
                    db = e.target.result;
                    resolve(db);
                };
                request.onerror = console.error;
                request.onupgradeneeded = (e) => {
                    db = e.target.result;
                    switch (db.version) {
                        case 1:
                            db.createObjectStore('fetch-mirror');
                    }
                };
            });
    })();

    function get(key) {
        return database().then((db) => new Promise((resolve, reject) => {
            const transaction = db.transaction('fetch-mirror', 'readonly');
            const store = transaction.objectStore('fetch-mirror');
            store.get(key).onsuccess = (e) => resolve(e.target.result);
        }));
    }

    function put(key, value) {
        return database().then((db) => new Promise((resolve, reject) => {
            const transaction = db.transaction('fetch-mirror', 'readwrite');
            const store = transaction.objectStore('fetch-mirror');
            store.put(value, key).onsuccess = (e) => resolve(e.target.result);
        }));
    }

    function mirror(path) {
        const fetchPromise = fetch(path)
            .then((response) => response.json())
            .then((response) => {
                put(path, response);
                return response;
            });

        return get(path).then((response) => response || fetchPromise);
    }

    return mirror;

})();
