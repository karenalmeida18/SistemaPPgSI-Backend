const request = require('supertest');
const app = require('../../src/server');

describe('Testing question crud ', () => {
  afterEach(() => {
    app.close();
  });

  it('Should create a new answer to the question', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela', usp_code: '20', user_type: 'ccp', password: '456', email: 'gabrielinha@gmail.com',
      });

    const { body: { token, id } } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '20', password: '456',
      });

    await request(app)
      .post('/form/create')
      .set('Authorization', `Bearer ${token}`);

    await request(app)
      .post('/question/create/1')
      .send({
        description: 'testando', form_id: '1',
      })
      .set('Authorization', `Bearer ${token}`);

    const { status } = await request(app)
      .post('/answer/create/1')
      .send({
        answer: 'resposta', user_id: `${id}`, question_id: '1',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('Should be able to find all the questions of a form', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela', usp_code: '20', user_type: 'ccp', password: '456', email: 'gabrielinha@gmail.com',
      });

    const { body: { token, id } } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '20', password: '456',
      });

    await request(app)
      .post('/form/create')
      .set('Authorization', `Bearer ${token}`);

    await request(app)
      .post('/question/create/1')
      .send({
        description: 'testando', form_id: '1',
      })
      .set('Authorization', `Bearer ${token}`);

    await request(app)
      .post('/answer/create/1')
      .send({
        answer: 'resposta', user_id: `${id}`, question_id: '1',
      })
      .set('Authorization', `Bearer ${token}`);

    const { status } = await request(app)
      .get('/answer/read/1')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  /* it('Should list all users', async () => {
    const response = await request(app)
      .get('/user/read');

    expect(response.status).toBe(200);
  }); */
});
