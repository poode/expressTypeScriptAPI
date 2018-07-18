import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql';
import * as http from "http";
import { NextFunction } from 'express-serve-static-core';

import * as expressValidator from 'express-validator';
import { ExpressError } from './interfaces/expressError';
import * as db from './config/db';
import * as home from './routes/home';
import * as users from './routes/users';
import * as register from './routes/register';
import * as login from './routes/login';
import * as registerUser from './routes/registerUser';


import { request } from 'https';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, './../../bower_components')));
app.use(express.static(path.join(__dirname, './public')));
app.use(expressValidator());

app.use('/', <any>home);
app.use('/users', <any>users);
app.use('/register', <any>register);
app.use('/login', <any>login);
app.use('/registerUser', <any>registerUser);


// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = <ExpressError> new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err: ExpressError, req: express.Request, res: express.Response, next: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
