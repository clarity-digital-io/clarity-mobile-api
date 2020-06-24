import express from 'express';
import { connectController } from '../controllers/connectController';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {
	
	let organizationId = req.params.organizationId;

	connectController(req, res, organizationId); 
	
});

export default router;
