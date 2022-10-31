"use strict";
const express = require("express");
const pool = require('../db');
const router = express.Router();

router.use(function(req, res, next){
    console.log(req.url, "@", Date.now());
    next();
})

router.get('', async (req, res) => {
        console.log('test');
        try {
            const allUsers = await pool.query("SELECT * FROM tb_users");
            res.json(allUsers.rows);
        } catch (err) {
            console.error(err.message)
        }
    });

router.post('', async (req, res) => {
        try {
            const { nom_user } = req.body;
            // pool.query('text', [values])
            // pool.query({text : '', values : []})
            const newUser = await pool.query(
                "INSERT INTO tb_users (nom_user) VALUES ($1) RETURNING *",
                [nom_user]
                );
            res.json(newUser.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
    });

router.get('/:id', async (req, res) => {
        const { id_user } = req.params.id;
        try {
            const user = await pool.query("SELECT * from tb_users WHERE id_user = $1", 
            [id_user]
            );
            res.json(user.rows[0]); 
        } catch (err) {
            console.err(err.message);
        }
    });

router.put('/:id', async (req, res) => {
        try {
            const { id_user } = req.params; // WHERE
            const { nom_user } = req.body; // SET
            const updateUser = await pool.query("UPDATE tb_users SET nom_user = $1 WHERE id_user = $2", 
            [ nom_user, id_user ]
            );
            res.json("User was updated !");
        } catch (err) {
            console.error(err.message);
        }
    });

router.delete('/:id', async (req, res) => {
        try {
            const { id_user } = req.params;
            const deleteUser = await pool.query("DELETE FROM tb_users WHERE id_user = $1", [ id_user ]);
            res.json(deleteUser.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });
    
module.exports = router;
