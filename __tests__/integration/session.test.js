const request = require('supertest');
const app = require('../../src/server');

describe('Testing user session ', () => {
  afterEach(() => {
    app.close();
  });
  it('Status code must be 400', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Karen', usp_code: '12', user_type: 'student', password: '123', email: 'karenzinha@gmail.com',
      });

    const { status } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '12', password: '123',
      });

    expect(status).toBe(200);
  });
});
