var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// creating a new account
router.post('/', async (req, res) => {
    try {
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const query = `INSERT INTO enrollments (course_id, semester_id, user_id, enrollment_date, course_title) 
                        VALUES ('${req.body.course_id}', '${req.body.semester_id}', 
                        '${req.body.user_id}', '${req.body.enrollment_date}', '${req.body.course_title}')`;
        const result = await client.query(query);
        // const results = { 'results': (result) ? result.rows : null};
        res.sendStatus(200);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
        // throw err;
    }
});

module.exports = router;