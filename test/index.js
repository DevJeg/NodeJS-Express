const fetch = require("node-fetch-commonjs");
const assert = require('assert');

describe('Get all users name from users.js', () => {
    it('should get 16', async () => {
        await fetch('http://localhost:5000/users')
            .then(async (res) => {
                console.log(res);
                assert.equal(res.status, 200);
                let result = await res.json();
                assert.equal(result.length, 15);
            })
    })
})

// Then : 