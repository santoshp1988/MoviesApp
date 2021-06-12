const get = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json()).then(data => {
            console.log("data", data);
            resolve(data);
        });
    });
}

export { get };