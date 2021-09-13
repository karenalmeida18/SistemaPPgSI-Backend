const request = require('supertest');
const app = require('../../src/server');

describe('Testing evaluation crud ', () => {
  afterEach(() => {
    app.close();
  });

  it('Should create a evaluation to the form', async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'Gabriela', usp_code: '20', user_type: 'ccp', password: '456',
      });

    const { body: { token, id } } = await request(app)
      .post('/user/login')
      .send({
        usp_code: '20', password: '456',
      });

    await request(app)
      .post('/form/create')
      .set('Authorization', `Bearer ${token}`);

    const { status } = await request(app)
      .post('/evaluate/create/1')
      .send({
        note_advisor: 'approved', selfguard_advisor: 'yayy', user_id: id, form_id: '1', note_ccp: 'okay', selfguard_ccp: 'okaay',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });

  it('Should be able to find an evaluation ', async () => {
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
      .get('/evaluate/read/1')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
  });
});
