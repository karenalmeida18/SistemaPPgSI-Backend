const request = require('supertest');
const app = require('../../src/server');

describe('Testing user crud ', () => {
  it('Should create a new user', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela Sinastre', usp_code: '1234', user_type: 'student', password: '123',
      });

    expect(response).toHaveProperty('id');
  });

  it('Should not be able to create a user', async () => {
    const { status } = await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela Sinastre', usp_code: '1234', user_type: 'student', password: '123',
      });

    expect(status).toBe(400);
  });
});
