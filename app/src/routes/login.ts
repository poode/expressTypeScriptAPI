import * as express from 'express';
const router = express.Router();

/* GET login listing. */
router.get('/', (req, res, next) => {
	res.render('login');
});

module.exports = router;
