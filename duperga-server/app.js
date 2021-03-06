var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var compression = require('compression')
require('dotenv').config()
var mongoose = require('mongoose')

var index = require('./routes/index');
var users = require('./routes/users');
var wishlist = require('./routes/wishlist');
var predictions = require('./routes/predictions')
var alexa = require('./routes/alexa')
var inflation = require('./routes/inflation')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(compression())

app.use('/api', index);
app.use('/api/users', users);
app.use('/api/wishlist', wishlist)
app.use('/api/predictions', predictions)
app.use('/api/alexa', alexa)
app.use('/api/inflation', inflation)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});


mongoose.Promise = global.Promise

console.log('server run in port 3000')
mongoose.connect(process.env.MONGODB_URL_DEV_TEST, err => {
  err ? console.log(err.message) : console.log(`database connected`)
})

module.exports = app;
