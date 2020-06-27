import express from 'express';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	formController(req, res, organizationId); 

});

export default router;