// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// Get all classes
app.get('/api/class', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM classes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/* 
// test data for postman
{
    "row_id": null,
    "user_row_id": 1,
    "class_row_id": 1,
    "subclass_row_id": 1,
    "level": 4,
    "name": "name",
    "background_row_id": 1,
    "species_row_id": 1,
    "subspecies_row_id": 1,
    "strength": 17,
    "dexterity": 15, 
    "constitution": 15, 
    "intelligence": 15, 
    "wisdom": 15, 
    "charisma": 15, 
    "data": "data"
}
*/

// post character
app.post('/api/character', async (req, res) => {
    try {

        let sql = `INSERT INTO characters (

        row_id, user_row_id, class_row_id, subclass_row_id, level, name, 
        background_row_id, species_row_id, subspecies_row_id, 
        strength, dexterity, constitution, intelligence, wisdom, charisma, data

        ) VALUES (?)`;

        const values = [[
            null, // row_id, leave this null

            req.body.user_row_id,
            req.body.class_row_id,
            req.body.subclass_row_id,



            req.body.level,
            req.body.name,

            req.body.background_row_id,
            req.body.species_row_id,
            req.body.subspecies_row_id,

            req.body.strength,
            req.body.dexterity,
            req.body.constitution,
            req.body.intelligence,
            req.body.wisdom,
            req.body.charisma,

            req.body.data
        ]];

        const result = await db.query(sql, values);

        res.send(result);


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all characters
app.get('/api/character', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT 
            
            a.row_id, a.name, a.level,

            a.class_row_id, a.subclass_row_id, 
            b.name AS class_name, c.name AS subclass_name,

            a.species_row_id, a.subspecies_row_id, 
            d.name AS species_name, e.name AS subspecies_name

            FROM characters AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            LEFT JOIN subclasses AS c
            ON c.row_id = a.subclass_row_id
            
            INNER JOIN species AS d
            ON d.row_id = a.species_row_id
            LEFT JOIN subspecies AS e
            ON e.row_id = a.subspecies_row_id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





// Get one character
app.get('/api/character/:row_id', async (req, res) => {
    try {
        const row_id = req.params.row_id;
        const [rows] = await db.query(
            `SELECT 
            
            a.row_id, a.name, a.level,

            a.class_row_id, a.subclass_row_id, 
            b.name AS class_name, c.name AS subclass_name,

            a.species_row_id, a.subspecies_row_id, 
            d.name AS species_name, e.name AS subspecies_name

            a.background_row_id, 
            f.name AS background_name, f.description AS background_description,

a.strength, a.dexterity, a.constitution, a.intelligence, a.wisdom, a.charisma, a.data

            FROM characters AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            LEFT JOIN subclasses AS c
            ON c.row_id = a.subclass_row_id
            
            INNER JOIN species AS d
            ON d.row_id = a.species_row_id
            LEFT JOIN subspecies AS e
            ON e.row_id = a.subspecies_row_id

            LEFT JOIN backgrounds AS f
            ON f.row_id = a.background_row_id

            WHERE a.row_id = ${row_id}`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});













// Get spcific subclasses
app.get('/api/subclass/', async (req, res) => {
        console.log("SUBCLASSES")
    try {
        const [rows] = await db.query(
            `SELECT 

            a.row_id, a.name, a.description, 
            a.class_row_id, a.source_row_id, 
            b.name AS class_name, c.name AS source_name

            FROM subclasses AS a
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            INNER JOIN sources AS c
            ON c.row_id = a.source_row_id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get spcific subclasses
app.get('/api/subclass/:class_row_id', async (req, res) => {
    try {
        // sanitize
        let class_id = req.params.class_row_id;

        const [rows] = await db.query(
            `SELECT 
            
            a.row_id, a.name, a.description, 
            a.class_row_id, a.source_row_id, 
            b.name AS class_name, c.name AS source_name

            FROM subclasses AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            AND b.row_id = ${class_id}
            INNER JOIN sources AS c
            ON c.row_id = a.source_row_id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// Get spcific subclasses
app.get('/api/class_features/:class_row_id/:subclass_row_id', async (req, res) => {
    try {
        // sanitize
        let class_id = req.params.class_row_id;
        let subclass_id = req.params.subclass_row_id;

        const [rows] = await db.query(
            `SELECT 
            
            a.row_id, a.name, a.description, a.level,
            a.class_row_id, a.subclass_row_id, 
            b.name AS class_name, c.name AS subclass_name

            FROM class_features AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            AND b.row_id = ${class_id}
            LEFT JOIN subclasses AS c
            ON c.row_id = a.subclass_row_id

            WHERE a.subclass_row_id IS NULL OR a.subclass_row_id = ${subclass_id}
            
            ORDER BY a.level, a.subclass_row_id, a.row_id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});