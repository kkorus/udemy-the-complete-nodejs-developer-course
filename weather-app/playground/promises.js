var addAsync = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};

addAsync(5, 7).then((res) => {
    console.log('Results', res);
    return addAsync(res, '33');
}).then((res) => {
    console.log('Should be 45,', 45);
}).catch((errMsg) => {
    console.log(errMsg);
})

var somePromise = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('Hi');
    }, 1000);
});

somePromise.then((result) => {
    console.log(result);
})