import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
const db = new sqlite3.Database("./database.info", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

// Initialize tables
const init = () => {
  const customerTable = `
    CREATE TABLE IF NOT EXISTS Customer (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      dob DATE NOT NULL,
      address TEXT NOT NULL,
      postcode_id INTEGER NOT NULL,
      FOREIGN KEY (postcode_id) REFERENCES Postcode (id)
    )
  `;
  const postcodeTable = `
    CREATE TABLE IF NOT EXISTS Postcode (
      id INTEGER PRIMARY KEY,
      state TEXT NOT NULL,
      postcode TEXT NOT NULL
    )
  `;
  db.run(customerTable);
  db.run(postcodeTable);
};

init();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Retrieve state by postcode
app.get("/api/state/:postcode", (req, res) => {
  const { postcode } = req.params;
  const sql = `SELECT state FROM Postcode WHERE postcode = ?`;
  const params = [postcode];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      state: row.state,
    });
  });
});

// Insert data into database
app.post("/api/submit", (req, res) => {
  console.log(req.body);
  const errors = [];
  const { name, dob, address, postcode } = req.body;
  if (!name) {
    errors.push("Name is required");
  }
  if (!dob) {
    errors.push("DOB is required");
  }
  if (!address) {
    errors.push("Address is required");
  }
  if (!postcode) {
    errors.push("Postcode is required");
  }
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const sql = `
    INSERT INTO Customer (name, dob, address, postcode_id)
    VALUES (?, ?, ?, (SELECT id FROM Postcode WHERE postcode = ?))
  `;
  const params = [name, dob, address, postcode];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {
        id: this.lastID,
        name,
        dob,
        address,
        postcode,
      },
    });
  });
});

//insert state
app.post("/api/state", (req, res) => {
  console.log(req.body);
  const { state, postcode } = req.body;
  const sql = `INSERT INTO Postcode (state, postcode) VALUES (?, ?)`;
  const params = [state, postcode];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {
        id: this.lastID,
        state,
        postcode,
      },
    });
  });
});

// Query data
app.get("/api/data", (req, res) => {
  const sql = `
    SELECT Customer.name, strftime('%Y', 'now') - strftime('%Y', dob) AS age, address, postcode, state
    FROM Customer
    INNER JOIN Postcode ON Customer.postcode_id = Postcode.id
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});

//get states
// Retrieve all states
app.get("/api/states", (req, res) => {
  const sql = `SELECT * FROM Postcode`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      states: rows,
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
