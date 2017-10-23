const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            const result = utils.add(2, 2);

            expect(result).toBe(4);

            // if (result !== 4) {
            //     throw new Error(`Expected 4, but got ${result}.`);
            // }
        });

        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 5, (sum) => {
                expect(sum).toBe(9);
                done();
            });
        });
    });

    it('should square a number', () => {
        const result = utils.square(3);

        expect(result).toBe(9);
        // if (result !== 9) {
        //     throw new Error(`Expected 9, but got ${result}.`);
        // }
    });

    it('should async square a number', (done) => {
        utils.asyncSquare(3, (square) => {
            expect(square).toBe(9);
            done();
        });
    });

    it('should verify first name and last names are set', () => {
        var user = {};
        const result = utils.setName(user, 'John Doe');

        expect(result).toInclude({
            firstName: 'John',
            lastName: 'Doe'
        });
    });
});
