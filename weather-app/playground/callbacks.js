var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Konrad'
    };

    setTimeout(function () {
        callback(user);
    }, 1000);
};

getUser(1, (user) => {
    console.log(user);
});