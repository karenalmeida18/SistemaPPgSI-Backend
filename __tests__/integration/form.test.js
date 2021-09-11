const request = require('supertest');
const app = require('../../src/server');

describe('Testing form crud ', () => {
  afterEach(() => {
    app.close();
  });

  it('Should create a new form', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela', usp_code: '20', user_type: 'ccp', password: '456',
      });

    const { body: { token } } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '20', password: '456',
      });

    const { status } = await request(app)
      .post('/form/create')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('Should be able to read all forms', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela', usp_code: '20', user_type: 'ccp', password: '456',
      });

    const { body: { token } } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '20', password: '456',
      });

    await request(app)
      .post('/form/create')
      .set('Authorization', `Bearer ${token}`);

    const { status } = await request(app)
      .get('/form/read')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });

  it('Should be able to find a user', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela', usp_code: '20', user_type: 'ccp', password: '456',
      });

    const { body: { token } } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '20', password: '456',
      });

    await request(app)
      .post('/form/create')
      .set('Authorization', `Bearer ${token}`);

    const { status } = await request(app)
      .get('/form/index/1')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  /* it('Should list all users', async () => {
    const response = await request(app)
      .get('/user/read');

    expect(response.status).toBe(200);
  }); */
});
