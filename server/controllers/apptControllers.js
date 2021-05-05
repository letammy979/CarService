const db = require('../models/db.js');

const apptControllers = {
  /**
   * @name addAppt
   * @description adds a new appointment to the appt table
  */
   addAppt: (req, res, next) => {
    db.query(
      'INSERT INTO appt_table (date, time) VALUES ($1, $2)', 
      [req.body.date, req.body.time]
    )
    .then(() => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in addAppt controller',
        message: { err },
      });
    });
  },
  /**
   * @name deleteAppt
   * @description deletes the specified appointment from the appt table
  */
  deleteAppt: (req, res, next) => {
    db.query({
      text: 'DELETE FROM appt_table WHERE date = $1 AND time = $2',
      values: [req.body.date, req.body.time]
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in deleteAppt appt controller',
        message: { err },
      });
    });
  },
  /**
   * @name updateStatus
   * @description update the status of an appointment in the appt table
  */
  updateStatus: (req, res, next) => {
    db.query({
      text: 'UPDATE appt_table SET status = $3 WHERE date = $1 AND time = $2',
      values: [req.body.date, req.body.time, req.body.status]
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in updateStatus controller',
        message: { err },
      });
    });
  },
  /**
   * @name addRandAppt
   * @description adds a new appointment at a random interval to the appt table
  */
  addRandAppt: (req, res, next) => {
    // generate rand date
    const randYear = Math.floor(Math.random() * 9999);
    const randMonth = Math.floor(Math.random() * 11);
    const randDay = Math.floor(Math.random() * 31) + 1;
    const randHour = Math.floor(Math.random() * 23);
    const randMin = Math.floor(Math.random() * 59);

    const randDate = new Date(randYear, randMonth, randDay, randHour, randMin);

    const date = randDate.toLocaleDateString();
    const time = randDate.toLocaleTimeString();

    console.log('datetime', date, time);

    db.query({
      text: 'INSERT INTO appt_table (date, time) VALUES ($1, $2)', 
      values: [date, time]
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in addRandAppt controller',
        message: { err },
      });
    });
  }
};

module.exports = apptControllers;