import express, {Request, Response, Application, NextFunction} from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from "body-parser";

const app:Application = express();
const PORT = process.env.PORT || 8000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

app.listen(PORT, ():void => {
    console.log(`Server Runnning at http://localhost:8000`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Request mappings
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/artist', artistRouter);
app.use('/api/v1/album', albumRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
