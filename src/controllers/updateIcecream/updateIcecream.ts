import db from '../../db/sqlite';

interface IUpdateIceCreamParams {
  id: number;
}

interface IUpdateIceCreamBody {
  name: string;
  flavor: string;
  price: number;
}

export async function updateIcecream(
  params: IUpdateIceCreamParams,
  updateIceCreamBody: IUpdateIceCreamBody
) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE icecream SET name = ?, flavor = ?, price = ? WHERE id = ?`,
      [
        updateIceCreamBody.name,
        updateIceCreamBody.flavor,
        updateIceCreamBody.price,
        params.id,
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: params.id,
            name: updateIceCreamBody.name,
            flavor: updateIceCreamBody.flavor,
            price: updateIceCreamBody.price,
          });
        }
      }
    );
  });
}
