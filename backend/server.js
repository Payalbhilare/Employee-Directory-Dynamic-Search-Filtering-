const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

// Open the SQLite database
const db = new sqlite3.Database('C:/Users/sidbh/project/backend/db/employees.db');

// Middleware
app.use(express.json());

// GET all employees
app.get('/employees', (req, res) => {
  const query = "SELECT * FROM employees";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ employees: rows });
  });
});

// GET employee by ID
app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM employees WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json({ employee: row });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  });
});

// GET all departments
app.get('/departments', (req, res) => {
  const query = "SELECT * FROM departments";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ departments: rows });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
