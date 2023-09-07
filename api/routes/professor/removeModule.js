var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');


function double_apostrophe(str) {
    doubled = ''
    for (const c of str) {
        if (c === '\'') {
            doubled += c + c;
        } else {
            doubled += c;
        }
    }
    return doubled;
}

// delete a specific module for a specific course -- man i know this ain't right but like whatever
router.post('/', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const properTitle = double_apostrophe(`${req.body.moduleTitle}`)
        const properCourseId = double_apostrophe(`${req.body.courseId}`)
        console.log('in backend course_id ' + req.body.courseId)
        const query = `DELETE from modules WHERE module_title = '${properTitle}' and course_id = '${properCourseId}'`;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null };
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]);
        console.log("IN BACKEND",typeof(results_json.results))
        res.sendStatus(200); 
    } catch (err) {
        console.error(err);
        res.sendStatus(404);
        // throw err;
    }
});

module.exports = router;