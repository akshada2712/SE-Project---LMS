var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// retrieve course grades
router.post('/', async (req, res) => {
    try {
        console.log(process.env.REACT_APP_DATABASE_URL);
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
       /* const client = await pool.connect();
        console.log(typeof(req.body.user_id))
        const query = `SELECT p.professor_title, p.professor_assignment_id,p.professor_total  , s.user_id,  s.course_id , s.grade , s.professor_assignment_id 
                    FROM professor_assignments p, student_assignments s
                    WHERE s.user_id::integer = '${req.body.user_id}' AND p.professor_assignment_id = s.professor_assignment_id AND s.course_id::integer = '${req.body.course_id}'` ;
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null};
        console.log("result from query: " + JSON.stringify(results));*/



        const client = await pool.connect();
        const query = `SELECT DISTINCT p.professor_title as title, p.professor_text as description, p.professor_total as total, s.grade as grade, s.student_submission_date as subdate
        FROM professor_assignments p
        JOIN student_assignments s ON p.professor_assignment_id = CAST(s.professor_assignment_id AS INTEGER)
        WHERE p.course_id = $1` ;
        const values = [req.body.course_id];
        const result = await client.query(query, values);
        const results = { 'results': (result) ? result.rows : null};
        console.log("result from query: " + JSON.stringify(results));


        /*const results_json_str = JSON.stringify(results);
        const results_json = JSON.parse(results_json_str);
        console.log(JSON.parse(results_json_str).results[0]);
        console.log("IN BACKEND",typeof(results_json.results))*/
        res.send(results); 
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
        // throw err;
    }
});


module.exports = router;