// server.js
const express = require('express');


// GET RID OF THIS FOR FINAL PROJECT
// const session = require('express-session');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads



app.use(bodyParser.json());

const JWT_SECRET = 'your-jwt-secret-key';

// Sample user database
const users = [
  { id: 1, username: 'bob', password: 'test' }
];


// Use the session middleware
// app.use(session({
//   secret: 'keyboard cat'
//   , resave: false
//   , saveUninitialized: false
// }))

app.post('/signupattempt', async (req, res) => {
  console.log("SIGN UP ATTEMPT")
  const { username, email, password } = req.body;
  var id = null;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const query = 'INSERT INTO users (row_id, username, email, hash) VALUES (?, ?, ?, ?)';
    const result = await db.query(query, [null, username, email, hashedPassword], async (err, result) => {
      if (err) throw err;
      res.status(201).send('User registered successfully');
    });

    console.log("RESULT: ", result)
    id = result.insertId


    console.log("ID: ", id)

    // Create payload for JWT
    const payload = {
      id: 4,
      username: username
    };

    // Sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log("TOKEN: ", token)

    res.cookie("SESSIONID", token, { httpOnly: true, secure: true });

    res.json({ message: 'Login successful', token });

    res.send(result);





  } catch (error) {
    res.json({ message: 'regestration error' });
    res.status(500).send('Error registering user');
  }


});


app.post('/loginattempt', async (req, res) => {
  console.log("LOGIN ATTEMPT")
  const { email, password } = req.body;
  var id = null;
  var username = null;

  // Find the user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  const results = await db.query(query, [email], async (err, results) => {

    if (err) throw err;

  });

  if (results.length > 0) {
    const user = results[0][0];
    console.log("IN QUERY", password, user.hash, results[0][0])

    //Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.hash);

    if (isMatch) {
      username = user.username;
      id = user.row_id;
      // res.status(200).send('Login successful');
      console.log("ID: ", id)
      console.log("USERNAME: ", username)


      // Create payload for JWT
      const payload = {
        id: id,
        username: username
      };

      // Sign token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      console.log("TOKEN: ", token)

      res.cookie("SESSIONID", token, { httpOnly: true, secure: true });

      res.json({ message: 'Login successful', token, username, id });

      // res.json({ message: 'Login successful' });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } else {
    res.status(404).send('User not found');
  }

});



/*
// Attempts to log the user in
app.post('/attemptlogin', function (req, res) {

  // The middleware gives us a JSON object in req.body with the keys/values
  // of the form inputs.
  console.log(req.body);

  // We can check the username and password are valid before allowing the user
  // to view the members page. In a normal web app, this would involved
  // querying a database of users.
  if (req.body.username == "bob" &&
    req.body.password == "test") {
    // set a session variable to indicate that a user is logged in, set it to
    // who is logged in, in this case, "bob"
    req.session.user = req.body.username;

    // re-direct the user to the members page
    res.redirect("/dashboard")
  }
  // if the input was not valid, re-render the login page with an error message
  else {
    req.session.login_error = "Invalid username and/or password!";

    res.redirect("/login")
    // res.send({ success: false });
  }

});

*/

// Logout action
app.post('/logout', function(req, res) {

  // remove the user session key (effectively logs the user out since this is
  // how our app recognizes whether someone is logged in)
  delete (req.session.user);

  // redirect the user to the login page
  res.send({ success: true });

});











// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
  // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization;

  console.log("AUTH TOKEN")

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("DECODED", decoded)

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

function getUserId(header) {
  const authHeader = header;
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.id
}


// Get username for logged in user
app.get('/api/username', authenticateJWT, async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const username = decoded.username;
  res.json(username);
});








//#region species

// Get all species
app.get('/api/species', authenticateJWT, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM species');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get all subspecies
app.get('/api/subspecies/', authenticateJWT, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 

            a.row_id, a.name, a.description, 
            a.species_row_id, a.source_row_id, 
            b.name AS species_name, c.name AS source_name

            FROM subspecies AS a
            INNER JOIN species AS b
            ON b.row_id = a.species_row_id
            INNER JOIN sources AS c
            ON c.row_id = a.source_row_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




//#endregion

//#region classes
// Get all classes
app.get('/api/class', authenticateJWT, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM classes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get all subclasses
app.get('/api/subclass/', authenticateJWT, async (req, res) => {
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


// Get specific subclasses
app.get('/api/subclass/:class_row_id', authenticateJWT, async (req, res) => {
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






//#endregion

//#region characters

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
    "data": "{}"
}
*/



// post character
app.post('/api/character', authenticateJWT, async (req, res) => {
  let user_id = getUserId(req.headers.authorization);
  try {

    let sql = `INSERT INTO characters (

        row_id, user_row_id, class_row_id, subclass_row_id, level, name, 
        background_row_id, species_row_id, subspecies_row_id, 
        strength, dexterity, constitution, intelligence, wisdom, charisma, data

        ) VALUES (?)`;

    const values = [[
      null, // row_id, leave this null

      user_id,
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


// put character data
app.put('/api/character/data/:row_id', authenticateJWT, async (req, res) => {
  // let user_id = getUserId(req.headers.authorization);
  console.log("BODY: ", req.body)
  let row_id = req.body.row_id;
  let route_row_id = req.params.row_id;
  let data = req.body.data;
  let stats = req.body.stats;
  let level = req.body.level;

  try {

    if (route_row_id == row_id) {

      let sql = `UPDATE characters
               SET data = '${data}'
               , level = ${level}
               , strength = ${stats.strength}
               , dexterity = ${stats.dexterity}
               , constitution = ${stats.constitution}
               , intelligence = ${stats.intelligence}
               , wisdom = ${stats.wisdom}
               , charisma = ${stats.charisma}

               WHERE row_id = ${row_id};`;


      const result = await db.query(sql);

      res.send(result);
    } else {
      res.status(401).send('Invalid credentials');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all characters
app.get('/api/character', authenticateJWT, async (req, res) => {
  let user_id = getUserId(req.headers.authorization);

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
            ON e.row_id = a.subspecies_row_id

            WHERE a.user_row_id = ${user_id}`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// Get one character
app.get('/api/character/:row_id', authenticateJWT, async (req, res) => {
  try {
    const row_id = req.params.row_id;
    const [rows] = await db.query(
      `SELECT 
            
            a.row_id, a.name, a.level,

            a.class_row_id, a.subclass_row_id, 
            b.name AS class_name, c.name AS subclass_name,

            a.species_row_id, a.subspecies_row_id, 
            d.name AS species_name, e.name AS subspecies_name,

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

    let char = rows[0];



    const [s_features] = await db.query(
      `SELECT 
            
            a.row_id, a.name, a.description, a.is_printed,
            a.species_row_id, a.subspecies_row_id, a.data

            FROM species_features AS a
            
            WHERE a.species_row_id = ${char.species_row_id}
            
            AND a.subspecies_row_id IS NULL OR a.subspecies_row_id = ${char.subspecies_row_id}
            
            ORDER BY a.subspecies_row_id, a.row_id`
    );
    char['species_features'] = s_features



    const [c_features] = await db.query(
      `SELECT 
            
            a.row_id, a.name, a.description, a.level,
            a.class_row_id, a.subclass_row_id,  a.data,
            b.name AS class_name, c.name AS subclass_name

            FROM class_features AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            AND b.row_id = ${char.class_row_id}
            LEFT JOIN subclasses AS c
            ON c.row_id = a.subclass_row_id

            WHERE a.level <= ${char.level}
            AND (a.subclass_row_id IS NULL OR a.subclass_row_id = ${char.subclass_row_id})

            
            ORDER BY a.level, a.subclass_row_id, a.row_id`
    );
    char['class_features'] = c_features




    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//#endregion

// Get all backgrounds
app.get('/api/background/', authenticateJWT, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM backgrounds');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//#region features




// Get spcific subspecies
app.get('/api/species_features/:species_row_id/:subspecies_row_id', authenticateJWT, async (req, res) => {
  try {
    // sanitize
    let species_id = req.params.species_row_id;
    let subspecies_id = req.params.subspecies_row_id;

    const [rows] = await db.query(
      `SELECT 
            
            a.row_id, a.name, a.description, a.is_printed,
            a.species_row_id, a.subspecies_row_id, a.data

            FROM species_features AS a
            
            WHERE a.species_row_id = ${species_id}
            
            AND a.subspecies_row_id IS NULL OR a.subspecies_row_id = ${subspecies_id}
            
            ORDER BY a.subspecies_row_id, a.row_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get spcific subclasses
app.get('/api/class_features/:class_row_id/:subclass_row_id/:level', authenticateJWT, async (req, res) => {
  try {
    // sanitize
    let class_id = req.params.class_row_id;
    let subclass_id = req.params.subclass_row_id;
    let level = req.params.level;
    // console.log("LEVEL:", level)

    const [rows] = await db.query(
      `SELECT 
            
            a.row_id, a.name, a.description, a.level,
            a.class_row_id, a.subclass_row_id,  a.data,
            b.name AS class_name, c.name AS subclass_name

            FROM class_features AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            AND b.row_id = ${class_id}
            LEFT JOIN subclasses AS c
            ON c.row_id = a.subclass_row_id

            WHERE a.level = ${level}
            AND (a.subclass_row_id IS NULL OR a.subclass_row_id = ${subclass_id})

            
            ORDER BY a.subclass_row_id, a.row_id`
    );
    // console.log("ROWS: ", rows)
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get spcific subclasses
app.get('/api/class_features/:class_row_id/:subclass_row_id', authenticateJWT, async (req, res) => {
  try {
    // sanitize
    let class_id = req.params.class_row_id;
    let subclass_id = req.params.subclass_row_id;
    let level = req.params.level;
    // console.log("LEVEL:", level)

    const [rows] = await db.query(
      `SELECT 
            
            a.row_id, a.name, a.description, a.level,
            a.class_row_id, a.subclass_row_id,  a.data,
            b.name AS class_name, c.name AS subclass_name

            FROM class_features AS a
            
            INNER JOIN classes AS b
            ON b.row_id = a.class_row_id
            AND b.row_id = ${class_id}
            LEFT JOIN subclasses AS c
            ON c.row_id = a.subclass_row_id

            WHERE a.level = 1
            AND (a.subclass_row_id IS NULL OR a.subclass_row_id = ${subclass_id})

            
            ORDER BY a.subclass_row_id, a.row_id`
    );
    // console.log("ROWS: ", rows)
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//#endregion


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});