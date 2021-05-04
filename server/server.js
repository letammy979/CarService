const express = require('express');

const PORT = 3000;
const app = express();

const apptControllers = require('./controllers/apptControllers');
const apptDetailsControllers = require('./controllers/apptDetailsControllers');

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

app.post('/addAppt', apptControllers.addAppt,
  (req, res) => {
    console.log('addAppt endpoint');
    return res.status(200).send('addAppt success');
});

app.post('/addDetails', apptDetailsControllers.addDetails,
  (req, res) => {
    console.log('addDetails endpoint');
    return res.status(200).send('addDetails success');
});

app.delete('/deleteAppt', apptControllers.deleteAppt,
  (req, res) => {
    console.log('deleteAppt endpoint');
    return res.status(200).send('deleteAppt success');
})

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
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});