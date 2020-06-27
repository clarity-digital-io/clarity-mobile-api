import express from 'express';
import { registerController } from '../controllers/registerController';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	registerController(req, res, organizationId); 
	
});

export default router;
