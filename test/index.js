const fetch = require("node-fetch-commonjs");
const assert = require('assert');
const pool = require('../db');

describe('Text/index -> routes/users', () => {

    it('GET', async () => {

        // Premier checking BDD 
        const allUsers = await pool.query(
            "SELECT * FROM tb_users"
        );

        console.log("allUsers: ", allUsers.rowCount);
        
        let res = await fetch('http://localhost:5000/users');

        assert.equal(res.status, 200);

        if (res.status == 200)  {
            let result = await res.json().catch((err) => console.log(err));
            console.log("Result : " + result.length);
            assert.equal(allUsers.rowCount, result.length);
        }
    })

    it('POST', async () => { 
        const headers = new fetch.Headers();
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({
            nom_user: "oui"
        });

        let res = await fetch('http://localhost:5000/users', {
            method: "post",
            headers,
            body
        });

        assert.equal(res.status, 200);

        try {
            const newUser = await pool.query(
                "SELECT nom_user FROM tb_users WHERE nom_user = $1", 
                ["oui"]
            );
            console.log(newUser.rows[0].nom_user);
        } catch (err) {
            console.error(err.message)
        }
        assert.notEqual(newUser.rows[0].nom_user, "non");
    })

    it('PUT', async () => { 
        const headers = new fetch.Headers();
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({
            nom_user: "Oe",
        });

        let result = await fetch('http://localhost:5000/users/55', {
            method: "PUT",
            headers,
            body
        });

        assert.equal(result.status, 200);

        try {
            const updateUser = await pool.query(
                "UPDATE tb_users SET nom_user = $1 WHERE id_user = $2", 
                [ "Oe", 55 ]
            );

       // assert.equal(updateUser.rows[0].nom_user, "oui");

        } catch (err) {
            console.error(err.message)
        }
        
    })

    it('DELETE', async () => { 

        let result = await fetch('http://localhost:5000/users/45');

        assert.equal(result.status, 200);

        try {
            const deleteUser = await pool.query(
                "DELETE FROM tb_users WHERE id_user = $1", 
                [ 45 ]
            );
            console.log("User deleted")

        } catch (err) {
            console.error(err.message)
        }
        //assert.equal();
    })

});
// {}