var express = require('express');
var router = express.Router();
const { Pool, Query } = require('pg');

// changing password upon validation
router.post('/', async (req, res) => {
    try {
        const pool = new Pool({
            connectionString: process.env.REACT_APP_DATABASE_URL || "localhost",
            ssl: (process.env.REACT_APP_DATABASE_URL) ? {rejectUnauthorized : false} : true,
        });
        const client = await pool.connect();
        const query = `UPDATE users SET password = crypt('${req.body.password}', gen_salt('bf')) WHERE username = '${req.body.username}'`;
        const result = await client.query(query);
        console.log(result);
        res.sendStatus(200); 
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});


module.exports = router;