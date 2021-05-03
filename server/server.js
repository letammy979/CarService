const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'default error log',
    status: 500,
    message: { err: 'default error handler' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});