const fetch = require("node-fetch-commonjs");
const assert = require('assert');

describe('Poster un utilisateur de routes/postits - post', () => {
    it('Voir si il y a un nom dans le body', async () => {
        await fetch('http://localhost:5000/postits')
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            assert.equal(res.count, 16)
        })
    })

    it('Voir si il y a un nom dans le body avec une ERREUR', async () => {
    
    })
})




// {}