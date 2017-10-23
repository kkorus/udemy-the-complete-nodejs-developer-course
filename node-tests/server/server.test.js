const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {
    it('should return hello world response', (done) => {
        request(app)
            .get('/')
            .expect('Hello World')
            .end(done);
    });

    it('should return not found response', (done) => {
        request(app)
            .get('/notfound')
            .expect(404)
            .expect((res) => {
                expect(res.body).toInclude({
                    error: 'Page not found.'
                })
            })
            .end(done);
    });

    it('should return my user object', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    name: 'John'
                });
            })
            .end(done);
    });
});

