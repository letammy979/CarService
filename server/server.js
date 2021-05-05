const express = require('express');

const PORT = 3000;
const app = express();

const apptControllers = require('./controllers/apptControllers');
const apptDetailsControllers = require('./controllers/apptDetailsControllers');

const isTest = process.env.NODE_ENV === 'test';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('route endpoint');
  return res.sendStatus(200);
});

app.get('/getAllAppts', apptDetailsControllers.getAllAppts,
  (req, res) => {
    console.log('getAllAppts endpoint');
    return res.status(200).json(res.locals.allAppts);
})

app.post('/addAppt', apptControllers.addAppt, apptDetailsControllers.addDetails,
  (req, res) => {
    console.log('addAppt endpoint');
    return res.status(200).send('addAppt success');
});

app.delete('/deleteAppt', apptDetailsControllers.deleteAppt, apptControllers.deleteAppt,
  (req, res) => {
    console.log('deleteAppt endpoint');
    return res.status(200).send('deleteAppt success');
});

app.put('/updateStatus', apptControllers.updateStatus,
  (req, res) => {
    console.log('updateStatus endpoint');
    return res.status(200).send('updateStatus success');
});

app.get('/getOneAppt', apptDetailsControllers.getOneAppt,
  (req, res) => {
    console.log('getOneAppt endpoint');
    return res.status(200).json(res.locals.oneAppt);
});

app.get('/getRangeAppts', apptDetailsControllers.getRangeAppts,
  (req, res) => {
    console.log('getRangeAppts endpoint');
    return res.status(200).json(res.locals.rangeAppts);
  }
);

app.post('/addRandAppt', apptControllers.addRandAppt,
  (req, res) => {
    console.log('addRandAppt endpoint');
    return res.status(200).send('addRandAppt success');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'default error log',
    status: 500,
    message: { err: 'default error handler' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

if (!isTest) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
} else {
  console.log('Testing...');
}

module.exports = app;