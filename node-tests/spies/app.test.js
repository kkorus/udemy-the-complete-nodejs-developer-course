const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };

    app.__set__('db', db);

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy();
        expect(spy).toHaveBeenCalled();
    });

    it('should call saveUser with user object', () => {
        // Arrange
        var email = 'johndoe@gmail.com';
        var password = '123abc';

        // Act
        app.handleSignup(email, password);

        // Assert
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    });
});