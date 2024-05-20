/* eslint-disable prettier/prettier */
const path= require('path');
const express = require('express');
const morgan = require('morgan');
// const rateLimit  =require('express-rate-limit');
  const helmet = require('helmet');
  // const mongoSanitize = require('express-mongo-sanitize');
  // const xss = require('xss-clean');
  // const hpp = require('hpp');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const viewRouter  = require('./Routes/viewRoutes');

const app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(helmet());

// 1. MIDDLEWARES

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.get('/overview',(req,res) => {
  res.status(200).render('tour',{
    title: 'All Tours'
  })
});
app.use('/',viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users',userRouter);

//Handling Unhandled Routes
app.all('*',(req,res,next) => {
 
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);

module.exports = app;
