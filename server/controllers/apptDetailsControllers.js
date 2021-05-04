const db = require('../models/db');

const apptDetailsControllers = {
  /**
   * @name addDetails
   * @description add services associated with the new appointment to the appt details table
  */
  addDetails: (req, res, next) => {
    const services = req.body.services;

    // loop through service array
    // on each iteration, add curr service element to the db
    for (let i = 0; i < services.length; i++) {
      db.query({
        text: `INSERT INTO appt_details (appt_id, service_id) VALUES ((SELECT _id FROM appt_table WHERE date = $1 AND time = $2), ${services[i]})`,
        values: [req.body.date, req.body.time]
      })
      .catch(err => {
        return next({
          log: 'error in addDetails controller',
          message: { err },
        });
      });
    }
    return next();
  },
  /**
   * @name getAllAppts
   * @description queries appointment details table in db and joins with the service table and appointments table to aggregate all the current appointments
  */
  getAllAppts: (req, res, next) => {
    db.query({
      text: 'SELECT appt_table.date, appt_table.time, service_table.service_name, service_table.service_price FROM service_table INNER JOIN appt_details ON service_table._id = appt_details.service_id RIGHT JOIN appt_table ON appt_details.appt_id = appt_table._id'
    })
    .then((result) => {
      res.locals.allAppts = {appts: result.rows};
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in getAllAppts controller',
        message: { err },
      });
    });
  },
  /**
   * @name deleteAppt
   * @description deletes the specified appointment from the appt details table
  */
  deleteAppt: (req, res, next) => {
    db.query({
      text: 'DELETE FROM appt_details WHERE appt_id = (SELECT _id FROM appt_table WHERE date = $1 AND time = $2)',
      values: [req.body.date, req.body.time]
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in deleteAppt apptDetails controller',
        message: { err },
      });
    });
  },
  /**
   * @name getOneAppt
   * @description queries appt details table and joins with the service table and appointments table to retrieve the specified appointment 
  */
  getOneAppt: (req, res, next) => {
    db.query({
      text: 'SELECT service_table.service_name, service_table.service_price, appt_table.date, appt_table.time FROM service_table INNER JOIN appt_details ON service_table._id = appt_details.service_id INNER JOIN appt_table ON appt_details.appt_id = appt_table._id WHERE appt_table.date = $1 AND appt_table.time = $2',
      values: [req.body.date, req.body.time]
    })
    .then((result) => {
      res.locals.oneAppt = {appt: result.rows};
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in getOneAppt controller',
        message: { err },
      });
    });
  },
  /**
   * @name getRangeAppts
   * @description queries appt details table and joins with the service table and appointments table to retrieve all appointments in the specified date range
  */
  getRangeAppts: (req, res, next) => {
    db.query({
      text: 'SELECT service_table.service_name, service_table.service_price, appt_table.date, appt_table.time FROM service_table INNER JOIN appt_details ON service_table._id = appt_details.service_id INNER JOIN appt_table ON appt_details.appt_id = appt_table._id WHERE appt_table.date BETWEEN $1 AND $2 ORDER BY service_table.service_price',
      values: [req.body.start, req.body.end]
    })
    .then((result) => {
      res.locals.rangeAppts = {appts: result.rows};
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in getRangeAppts controller',
        message: { err },
      });
    });
  }
};

module.exports = apptDetailsControllers;