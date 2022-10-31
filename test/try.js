const fetch = require("node-fetch");
const assert = require('assert');

describe('Get all users name from users.js', () => {
    it('should get 16', async () => {
        await fetch('http://localhost:5000/users')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res);
                assert.equal(res.count, 16)
            })
    })
})
