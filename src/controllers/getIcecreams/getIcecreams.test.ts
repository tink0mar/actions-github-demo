import { getAllIcecreams } from './getIcecreams';
import db from '../../db/sqlite';

// Mock the entire db module
jest.mock('../../db/sqlite', () => ({
  all: jest.fn(), // We mock `all` as a jest function
}));

describe('getAllIcecreams', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return all ice creams from the database', async () => {
    // Simulate successful retrieval
    (db.all as jest.Mock).mockImplementation(
      (sql: string, params: any[], callback: Function) => {
        callback(null, [
          { id: 1, name: 'chocolate', flavor: 'chocolate', price: 200 },
          { id: 2, name: 'vanilla', flavor: 'vanilla', price: 150 },
        ]); // Return mock data
      }
    );

    const result = await getAllIcecreams();

    expect(result).toEqual([
      { id: 1, name: 'chocolate', flavor: 'chocolate', price: 200 },
      { id: 2, name: 'vanilla', flavor: 'vanilla', price: 150 },
    ]);

    expect(db.all).toHaveBeenCalledWith(
      'SELECT * FROM icecream',
      [],
      expect.any(Function)
    );
  });

  it('should throw an error if fetching data fails', async () => {
    // Simulate retrieval failure
    (db.all as jest.Mock).mockImplementation(
      (sql: string, params: any[], callback: Function) => {
        callback(new Error('Fetch error'), []); // Simulate error
      }
    );

    await expect(getAllIcecreams()).rejects.toThrow('Fetch error');

    expect(db.all).toHaveBeenCalledWith(
      'SELECT * FROM icecream',
      [],
      expect.any(Function)
    );
  });
});
