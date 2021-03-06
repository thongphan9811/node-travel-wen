const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const UserRouter = require('./routes/user/user');
const LocationRouter = require('./routes/admin/location');
const adminPostRouter = require('./routes/admin/post');
const userbookingRouter = require('./routes/user/booked');
const commentRouter = require('./routes/user/comment');
const rateRoute = require('./routes/user/rate');
const managerbookRoute = require('./routes/admin/book');
const adminRating = require('./routes/admin/Rating');
var app = express();
const mongoose = require('mongoose');
global.WEB_URL = 'http://localhost:3000' ;

const ConnectMongoDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/travel-nodejs', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    console.log("ket noi thanh cong");
  } catch (err) {
    console.log("ket noi csdl loi :" + err);
  }
};
ConnectMongoDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false,defer: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('public',express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/users', UserRouter.router);
app.use('/adminlocation', LocationRouter);
app.use('/adminPost',adminPostRouter);
app.use('/booking',userbookingRouter);
app.use('/comment',commentRouter);
app.use('/rate',rateRoute);
app.use('/adminBook',managerbookRoute);
app.use('/adminRating',adminRating);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
