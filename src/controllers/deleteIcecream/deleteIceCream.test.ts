import { deleteIcecream } from './deleteIcecream';
import db from '../../db/sqlite';

// Mock the entire db module
jest.mock('../../db/sqlite', () => ({
  run: jest.fn(), // We mock `run` as a jest function
}));

describe('deleteIcecream', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should delete an ice cream and return a success message', async () => {
    // Simulate successful deletion
    (db.run as jest.Mock).mockImplementation(
      (sql: string, params: any[], callback: Function) => {
        callback(null); // No error
      }
    );

    const result = await deleteIcecream({ id: 1 });

    expect(result).toEqual({ message: 'Ice cream deleted' });

    expect(db.run).toHaveBeenCalledWith(
      'DELETE FROM icecream WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  it('should throw an error if deletion fails', async () => {
    // Simulate deletion failure
    (db.run as jest.Mock).mockImplementation(
      (sql: string, params: any[], callback: Function) => {
        callback(new Error('Delete error')); // Simulate error
      }
    );

    await expect(deleteIcecream({ id: 1 })).rejects.toThrow('Delete error');

    expect(db.run).toHaveBeenCalledWith(
      'DELETE FROM icecream WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });
});
