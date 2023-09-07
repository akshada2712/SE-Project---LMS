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

// retrieve modules for a specific course
// todo: edit for multimedia file
router.post('/', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const properTitleOld = double_apostrophe(`${req.body.moduleTitleOld}`)
        const properTitleNew = double_apostrophe(`${req.body.moduleTitleNew}`)
        const properText = double_apostrophe(`${req.body.moduleText}`)
        console.log('in backend course_id ' + req.body.courseId)
        const query = `UPDATE modules SET module_title = '${properTitleOld}', module_text = ${properText} 
        WHERE course_id = '${req.body.courseId}' AND module_title = '${properTitleNew}'`;
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