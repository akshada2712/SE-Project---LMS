var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// retrieve modules for a specific course
router.post('/', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const query = `SELECT *
                    FROM modules WHERE course_id = (SELECT DISTINCT course_id FROM enrollments WHERE course_title = '${req.body.course_title}')` ;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null };
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]);
        console.log("IN BACKEND",typeof(results_json.results))
        res.send(results); 
    } catch (err) {
        console.error(err);
        res.send(404);
        client.release();
        // throw err;
    }
});

// retrieve a specific module given a module_title & course_id
router.post('/specificModule', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const query = `SELECT *
                    FROM modules WHERE course_id = '${req.body.course_id}' AND module_title = '${req.body.module_title}'` ;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null };
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]);
        console.log("IN BACKEND",typeof(results_json.results))
        res.send(results); 
    } catch (err) {
        console.error(err);
        res.send(404);
        client.release();
        // throw err;
    }
});


module.exports = router;