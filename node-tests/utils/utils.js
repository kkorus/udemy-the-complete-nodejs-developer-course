module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(function () {
        callback(a + b);
    }, 200);
};

module.exports.square = x => x * x;

module.exports.asyncSquare = (x, callback) => {
    setTimeout(function () {
        callback(x * x);
    }, 200);
};

module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
};