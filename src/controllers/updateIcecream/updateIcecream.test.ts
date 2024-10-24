import { updateIcecream } from './updateIcecream';
import db from '../../db/sqlite';

// Mock the entire db module
jest.mock('../../db/sqlite', () => ({
  run: jest.fn(), // We mock `run` as a jest function
}));

describe('updateIcecream', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should update an ice cream and return the updated object', async () => {
    // Simulate successful update
    (db.run as jest.Mock).mockImplementation(
      (sql: string, params: any[], callback: Function) => {
        callback(null); // No error
      }
    );

    const result = await updateIcecream(
      { id: 1 },
      { name: 'new name', flavor: 'new flavor', price: 300 }
    );

    expect(result).toEqual({
      id: 1,
      name: 'new name',
      flavor: 'new flavor',
      price: 300,
    });

    expect(db.run).toHaveBeenCalledWith(
      'UPDATE icecream SET name = ?, flavor = ?, price = ? WHERE id = ?',
      ['new name', 'new flavor', 300, 1],
      expect.any(Function)
    );
  });

  it('should throw an error if the update fails', async () => {
    // Simulate update failure
    (db.run as jest.Mock).mockImplementation(
      (sql: string, params: any[], callback: Function) => {
        callback(new Error('Update error')); // Simulate error
      }
    );

    await expect(
      updateIcecream(
        { id: 1 },
        { name: 'new name', flavor: 'new flavor', price: 300 }
      )
    ).rejects.toThrow('Update error');

    expect(db.run).toHaveBeenCalledWith(
      'UPDATE icecream SET name = ?, flavor = ?, price = ? WHERE id = ?',
      ['new name', 'new flavor', 300, 1],
      expect.any(Function)
    );
  });
});
