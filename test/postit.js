const fetch = require("node-fetch-commonjs");
const assert = require('assert');

describe('Text/index -> routes/postit', () => {

    it('Voir les postit', async () => {
        
        let res = await fetch('http://localhost:5000/postits');
 
        assert.equal(res.status, 200);

        if (res.status == 200)  {

            try {
                
                let result = await res.json();
                console.log("Res : ", res);
                console.log("Result : ", result);
                console.log("Total : " + result.length);
                assert.equal(result.length, 2);
            
            } catch (err) {
                console.error("Erreur : " + err.message)
            }
        }
    })
});

// {}