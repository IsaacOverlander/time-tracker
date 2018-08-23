const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET route for entries
router.get('/entry', (req, res) => {
    console.log('entries GET hit');
    const query = `SELECT * FROM "entries" JOIN "projects" ON "projects"."projectid" = "entries"."project_id";`;
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET:', error);
        res.sendStatus(500);
    });//End Query
});//End GET

router.post('/entry', (req, res) => {
    entryToAdd = req.body;
    
    const query = `INSERT INTO "entries" ("task", "date", "hours", "minutes", "project_id")
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(query, [entryToAdd.task, entryToAdd.date, entryToAdd.hours, entryToAdd.minutes, entryToAdd.project]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });//End Query
});// End POST

router.delete('/entry/:id', (req, res) => {
    const entryId = req.params.id;
    console.log(entryId);
    
    const query = `DELETE FROM "entries" WHERE "id" = $1;`;
    pool.query(query, [entryId]).then((reults) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });//End query
});//End DELETE

router.get('/project', (req, res) => {
    const query = `SELECT "projects"."name", SUM("entries"."hours") as hours, SUM("entries"."minutes") as minutes FROM "entries"
    JOIN "projects" ON "projects"."projectid" = "entries"."project_id" GROUP BY "projects"."name";`;
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET:', error);
        res.sendStatus(500);
    });
});//End GET

router.post('/project', (req, res) => {
    projectToAdd = req.body;
    const query = `INSERT INTO "projects" ("name")
                    VALUES ($1);`;
    pool.query(query, [projectToAdd.name]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });//End Query
})

router.delete('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const query = `DELETE FROM "projects" WHERE "id" = $1;`;
    pool.query(query, [projectId]).then((reults) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });//End query
});//End DELETE


module.exports = router;