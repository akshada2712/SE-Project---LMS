var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// validating security answer with given security question

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

router.post('/', async (req, res) => {
    try {
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const proper_question = double_apostrophe(req.body.securityQuestion);
        const proper_answer = double_apostrophe(req.body.securityAnswer);
        const query = `SELECT EXISTS(
                        SELECT * FROM users WHERE security_question = '${proper_question}'
                        AND security_answer = '${proper_answer}'
                        )`; 
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null}; // { results: [ { exists: true } ] }
        console.log("result from query: " + JSON.stringify(results));
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]);
        res.send(results_json.results[0]); 
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;