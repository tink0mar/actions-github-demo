import db from '../../db/sqlite';

interface ICreateIceCreamBody {
  name: string;
  flavor: string;
  price: number;
}

export async function createIcecream(createIceCreamBody: ICreateIceCreamBody) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO icecream (name, flavor, price) VALUES (?, ?, ?)`,
      [
        createIceCreamBody.name,
        createIceCreamBody.flavor,
        createIceCreamBody.price,
      ],
      // Change arrow function to regular function to access `this.lastID`
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID, // `this` refers to the RunResult object
            name: createIceCreamBody.name,
            flavor: createIceCreamBody.flavor,
            price: createIceCreamBody.price,
          });
        }
      }
    );
  });
}
