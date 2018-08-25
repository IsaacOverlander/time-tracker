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
    
    const query = `INSERT INTO "entries" ("task", "date", "hours", "minutes", "project_id", "start", "end")
                    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(query, [entryToAdd.task, entryToAdd.date, entryToAdd.hours, entryToAdd.minutes, entryToAdd.project, entryToAdd.start, entryToAdd.end]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });//End Query
});// End POST

router.put('/entry/update/:id', (req, res) => {
    entryId = req.params.id;
    entry = req.body;
    query = `UPDATE "entries" SET "task" = $1, "date" = $2, "hours" = $3,
             "minutes" = $4, "project_id" = $5, "start" = $6, "end" = $7 WHERE "id" = $8;`;
    pool.query(query, [entry.task, entry.date, entry.hours, entry.minutes, entry.project, entry.start, entry.end, entryId])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });//End query
});// End PUT

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
    const query = `SELECT * FROM "projects";`;
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET:', error);
        res.sendStatus(500);
    });
});//End GET

router.get('/project/data', (req, res) => {
    const query = `SELECT "projects"."name", "projects"."projectid", SUM("entries"."hours") as hours, SUM("entries"."minutes") as minutes FROM "projects"
                    LEFT JOIN "entries" ON "entries"."project_id" = "projects"."projectid" GROUP BY "projects"."name", "projects"."projectid";`;
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
});//End POST

router.put('/project/update/:id', (req, res) => {
    projectId = req.params.id;
    project = req.body;
    query = `UPDATE "projects" SET "name" = $1 WHERE "projectid" = $2;`;
    pool.query(query, [project.name, projectId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });//End query
});//End PUT

router.delete('/project/:id', (req, res) => {
    const projectId = req.params.id;
    console.log(projectId);
    const query = `DELETE FROM "projects" WHERE "projectid" = $1;`;
    pool.query(query, [projectId]).then((reults) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });//End query
});//End DELETE


module.exports = router;