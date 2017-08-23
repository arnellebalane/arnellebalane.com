const request = indexedDB.open('arnellebalane', 1);

request.onsuccess = (e) => {
    console.log(e);
};

request.onerror = (e) => {
    console.error(e);
};

function mirror(...args) {
    return fetch(...args)
        .then((response) => response.json());
}
