const supertest = require('supertest');

// import our server file
const app = require('../server/server');
const req = supertest(app);

describe('add a new appointment', () => {
  it('should add an appointment to the appt table', () => {
    
  })
});