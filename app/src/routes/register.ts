import * as express from 'express';

import * as db from './../config/db';

const router = express.Router();

/* GET register listing. */
router.get('/', (req, res, next) => {
	res.render('register');
});

module.exports = router;
