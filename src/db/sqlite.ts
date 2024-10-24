import { Database } from 'sqlite3';
import path from 'path';

// Define the path for the SQLite file
const dbPath = path.resolve(__dirname, '../../data/icecream.sqlite');

// Open the database stored in a file
const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open the database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Initialize the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS icecream (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    flavor TEXT NOT NULL,
    price REAL NOT NULL
  )
`);

export default db;
