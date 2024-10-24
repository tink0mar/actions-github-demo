import { createIcecream } from './createIcecream';
import db from '../../db/sqlite';

// Mock the entire db module
jest.mock('../../db/sqlite', () => ({
  run: jest.fn(), // We mock `run` as a jest function
}));

describe('createIcecream', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should create an ice cream and return the created object', async () => {
    const mockLastID = 1;

    // Mock db.run to simulate successful insertion with a bound this context
    (db.run as jest.Mock).mockImplementation(function (
      sql: string,
      params: any[],
      callback: Function
    ) {
      // Simulate the function's this context with a lastID value
      callback.call({ lastID: mockLastID }, null); // Simulate success, with lastID
    });

    const result = await createIcecream({
      name: 'chocolate',
      flavor: 'chocolate',
      price: 200,
    });

    expect(result).toEqual({
      id: mockLastID, // The ID returned by the database
      name: 'chocolate',
      flavor: 'chocolate',
      price: 200,
    });

    expect(db.run).toHaveBeenCalledWith(
      'INSERT INTO icecream (name, flavor, price) VALUES (?, ?, ?)',
      ['chocolate', 'chocolate', 200],
      expect.any(Function)
    );
  });

  it('should throw an error if the database insertion fails', async () => {
    // Simulate the insertion failure
    (db.run as jest.Mock).mockImplementation(function (
      sql: string,
      params: any[],
      callback: Function
    ) {
      callback(new Error('Insert error')); // Simulate error
    });

    await expect(
      createIcecream({ name: 'chocolate', flavor: 'chocolate', price: 200 })
    ).rejects.toThrow('Insert error');

    expect(db.run).toHaveBeenCalledWith(
      'INSERT INTO icecream (name, flavor, price) VALUES (?, ?, ?)',
      ['chocolate', 'chocolate', 200],
      expect.any(Function)
    );
  });
});
