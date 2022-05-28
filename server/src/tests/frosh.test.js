const request = require('supertest');
const app = require('../app');
const db = require('./db');

describe('Test the root path', () => {
  test('It should respond to the GET method', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('frosh routes', () => {
  beforeAll(async () => {
    await db.connect();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  // Placeholder test so that the tests run
  test('Placeholder test', () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});
