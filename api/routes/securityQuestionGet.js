var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// seeing if a user exists lol
// retrieving the securityquestion
router.post('/', async (req, res) => {
    try {
        console.log(`heres the react app url ${process.env.REACT_APP_DATABASE_URL}`)
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const query = `SELECT security_question FROM users where username = '${req.body.username}'`;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null};
        console.log("result from query: " + JSON.stringify(results));
        const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log("in security question get");
        console.log(JSON.parse(results_json_str).results[0]);
        res.send(results_json.results[0]); 
        client.release();
    } catch (err) {
        console.log("shit failed");
        console.error(err);
        res.send("Error " + err);
    }
});

// router.get('/', async (req, res) => {
//     try {
//         // TODO: this cannot be hardcoded. --> change later
//         const pool = new Pool({
//             connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
//             ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
//         });
//         const client = await pool.connect();
//         const query = `SELECT EXISTS(
//             SELECT * FROM users WHERE username = 'zhanso'
//         )`;
//         const result = await client.query(query);
//         const results = { 'results': (result) ? result.rows : null};
//         console.log("result from query: " + JSON.stringify(results));
//         const results_json_str = JSON.stringify(results);
//         const results_json = JSON.parse(results_json_str);
//         console.log(JSON.parse(results_json_str).results[0]);
//         res.send(results_json.results[0]); 
//         client.release();
//     } catch (err) {
//         console.error(err);
//         res.send("Error " + err);
//     }
// });



module.exports = router;