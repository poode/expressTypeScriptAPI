import * as express from 'express';
import * as expressValidator from 'express-validator';
import { check } from 'express-validator/check';

import connection from './../config/db';
import { ExpressError } from '../interfaces/expressError';

const router = express.Router();

/* POST register listing. */
router.post('/', 
	[
		check('email')
    // Every validator method in the validator lib is available as a
    // method in the check() APIs.
    // You can customize per validator messages with .withMessage()
    .isEmail().withMessage('Email Field must be an email')
 
    // Every sanitizer method in the validator lib is available as well!
    .trim()
    .normalizeEmail()
 
   ,
 
  // General error messages can be given as a 2nd argument in the check APIs
  // check('password', 'passwords must be at least 5 chars long and contain one number')
  //   .isLength({ min: 8 })
  //   .matches(/\d/),
 
	]
	, (req:express.Request, res:express.Response, next:express.NextFunction) => {
		const username = req.body.username;
		const email = req.body.email;
		const fullName = req.body.fullName;
		const gender = req.body.gender;
		const age = req.body.age;
		const password = req.body.password;
		const password2 = req.body.password2;
		const profilePic = req.body.profilePic;
		// req.checkBody('email', 'Email is required').notEmpty();
		// req.checkBody('email', 'Email does not appear to be valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('fullName', 'Full Name is required').notEmpty();
		req.checkBody('gender', 'gender is required').notEmpty();
		req.checkBody('age', 'Age is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Confirmation for the Password is required').notEmpty();
		req.checkBody('profilePic', 'Profile Picture is required').notEmpty();

		// check the validation object for errors
		var errors = req.validationErrors();


		if (errors) {
			// console.log(db['connection']);
			res.render('register', { flash: { type: 'alert-danger', messages: errors }});
		}
		else {
			connection.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
				var sql = `INSERT INTO user (username, email, fullName, gender, age, password) VALUES ('${username}', '${email}', '${fullName}', '${gender}', '${age}', '${password}')`;
				connection.query(sql, function (err, result) {
					console.log(sql);
					if (err) throw err;
					console.log("1 record inserted");
				});
			});
			res.render('register', { flash: { type: 'alert-success', messages: [ { msg: 'The user Successfuly is created!' }]}});
		}
				
				



});

module.exports = router;
