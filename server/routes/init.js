import express from 'express';

var router = express.Router();

router.post('/', async (req, res) => {

	console.log('req.body', req.body);
	return res.send('Received a POST HTTP method');
	
});

export default router;
