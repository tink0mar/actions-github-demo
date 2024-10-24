import db from '../../db/sqlite';

interface IDeleteIceCreamParams {
  id: number;
}

export async function deleteIcecream(params: IDeleteIceCreamParams) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM icecream WHERE id = ?`, [params.id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Ice cream deleted' });
      }
    });
  });
}
