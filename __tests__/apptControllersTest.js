const supertest = require('supertest');

// import our server file
const app = require('../server/server');
const req = supertest(app);

const dateTester = '2022-07-05';
const timeTester = '03:20';

describe('get all appointments in database', () => {
  it('expect response obj to have an appts property', () => {
    return req
      .get('/getAllAppts')
      .send({ dateTester, timeTester })
      .expect(200)
      .then(response => {
        console.log('res body', response.body);
        expect(response.body).toHaveProperty('appts');
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('appts property should be an array', () => {
    return req
    .get('/getAllAppts')
    .send({ dateTester, timeTester })
    .expect(200)
    .then(response => {
      console.log('res body', response.body);
      expect(Array.isArray(response.body.appts)).toBe('object');
    })
    .catch(err => {
      console.log(err);
    });
  })  
});