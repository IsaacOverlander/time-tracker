const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET route for entries
router.get('/', (req, res) => {
    console.log('entries GET hit');
    const query = `SELECT * FROM "entries";`;
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET:', error);
        res.sendStatus(500);
    });//End Query
});//End GET

module.exports = router;