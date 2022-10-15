const express = require('express');
const cors = require('cors');
require('express-async-errors');
const morgan = require('morgan');
const teamsRouter = require('./routes/teamsRouter');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('./images'));
app.use(express.json());
app.use('/teams', teamsRouter);

app.use((req, _res, next) => {
  console.log('req.method:', req.method);
  console.log('req.path:', req.path);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  console.log('req.headers:', req.headers);
  console.log('req.body:', req.body);
  next();
});

app.use((_req, res) => res.sendStatus(404));

module.exports = app;
