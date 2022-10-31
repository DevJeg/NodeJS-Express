"use strict";
const express = require("express");
const pool = require('../db');
const router = express.Router();

router.use(function(req, res, next){
    console.log(req.url, "@", Date.now());
    next();
})

router.get('', async (req, res) => {
        try {
            const allPostits = await pool.query("SELECT * FROM tb_postit");
            res.json(allPostits.rows);
        } catch (err) {
            console.error(err.message)
        }
    });

router.post('', async (req, res) => {
        try {
            const { nom_postit, dates, contenu, auteur } = req.body;
            // pool.query('text', [values])
            // pool.query({text : '', values : []})
            const newPostit = await pool.query(
                "INSERT INTO tb_postit (nom_postit, dates, contenu, auteur) VALUES ($1,$2,$3,$4) RETURNING *",
                [nom_postit, dates, contenu, auteur]
                );  
            res.status(200).send()
        } catch (err) {
            console.error(err.message)
        }
    });

router.get('/:id', async (req, res) => {
        const { id_postit } = req.params;
        try {
            const postit = await pool.query("SELECT * from tb_postit WHERE id_postit = $1", 
            [id_postit]
            );
            res.json(postit.rows[0]); 
        } catch (err) {
            console.err(err.message);
        }
    });
    
router.put('/:id', async(req, res) => {
        try {
            const { id_postit } = req.params; // WHERE
            const { nom_postit } = req.body; // SET
    
            const updatePostit = await pool.query(" UPDATE tb_postit SET nom_postit = $1 WHERE id_postit = $2", 
            [ nom_postit, id_postit ]);
    
            res.json("Postit was updated !");
        } catch (err) {
            console.error(err.message);
        }
    });
router.delete('/:id', async (req, res) => {
        try {
            const { id_postit } = req.params;
            const deletePostit = await pool.query("DELETE FROM tb_postit WHERE id_postit = $1", 
            [ id_postit ]
            );
            res.json(deletePostit.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });

module.exports = router;    
