import express from 'express';
import { formsController } from '../controllers/formsController';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	formsController(req, res, organizationId); 

});

export default router;