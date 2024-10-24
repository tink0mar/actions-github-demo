import db from '../../db/sqlite';

export async function getAllIcecreams() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM icecream', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
