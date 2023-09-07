var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// creating a new account
router.post('/', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        console.log(req.body.username);
        console.log(req.body.password);
        const query = `SELECT user_id, username,user_role 
                    FROM users WHERE username = '${req.body.username}' AND
                    password = crypt('${req.body.password}', password)` ;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null};
        console.log("result from query: " + JSON.stringify(results));
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]); //  JSON.parse(results_json) == {"results":[{"username":"peppa","password":"asdfghjk"}]}
        res.send(results_json.results[0]); 
        console.log(results.results[0].user_id);
        console.log(results.results[0].username);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
        // throw err;
    }
});

router.post('/OAuth', async (req, res) => {
    try {
        // TODO: this cannot be hardcoded. --> change later
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        console.log(req.body.email);
        const query = `SELECT email, user_role, user_id
                    FROM users WHERE email = '${req.body.email}'` ;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null};
        console.log("result from query: " + JSON.stringify(results));
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]); //  JSON.parse(results_json) == {"results":[{"email": "google"]}
        res.send(results_json.results[0]);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
        // throw err;
    }
});

module.exports = router;