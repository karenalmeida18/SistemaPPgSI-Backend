const request = require('supertest');
const app = require('../../src/server');

describe('Testing user crud ', () => {
  afterEach(() => {
    app.close();
  });

  it('Should create a new user', async () => {
    const { body } = await request(app)
      .post('/user/create')
      .send({
        name: 'Maykon Douglas', usp_code: '18', user_type: 'student', password: '123',
      });

    expect(body).toHaveProperty('id');
  });

  it('Should not be able to create a user if already exist', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela Sinastre', usp_code: '1234', user_type: 'student', password: '123',
      });

    const { status } = await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela Sinastre', usp_code: '1234', user_type: 'student', password: '123',
      });

    expect(status).toBe(400);
  });

  /* it('Should list all users', async () => {
    const response = await request(app)
      .get('/user/read');

    expect(response.status).toBe(200);
  }); */
});
