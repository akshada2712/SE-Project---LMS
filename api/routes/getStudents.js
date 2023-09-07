var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// creating a new account
router.get('/', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const query = `SELECT username, user_id
                    FROM users WHERE user_role = 'Student'` ;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null};
        console.log("result from query: " + JSON.stringify(results));
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(results_json.results[0]); //  JSON.parse(results_json) == {"results":[{"username":"peppa","user_id":"asdfghjk"}]}
        res.send(results_json.results); 
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
        // throw err;
    }
});

module.exports = router;