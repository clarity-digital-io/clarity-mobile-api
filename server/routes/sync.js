import express from 'express';
import { syncController } from '../controllers/syncController';

var router = express.Router();

router.post('/:userId', async (req, res) => {

	let userId = req.params.userId;

	syncController(req, res, userId); 
	
});

export default router;