import express from 'express';
import { regsiterController } from '../controllers/regsiterController';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	regsiterController(req, res, organizationId); 
	
});

