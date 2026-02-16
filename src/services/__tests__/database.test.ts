import { db } from '../database';

describe('database service', () => {
  it('should initialize db', () => {
    expect(db).toBeDefined();
  });
});
