import express from 'express';
import axios from 'axios';

var router = express.Router();

router.post('/', async (req, res) => {
	console.log('req.body', req.body, req.params);

	const access = await verifyOrganizationAccess(req.body, req.params);
	console.log('access', access);
	console.log('need to check against clarityforce salesforce org the org if it has access');
	console.log('if found then open new realm with orgid as /orgid/{userid}/response and /orgid/forms');
	console.log('open new realm with admin user'); 
	console.log('if opened successfully start syncing the forms');

	console.log('return name of realm'); 
	console.log('close realm after syncing and start new worker that listens to this realm');
	return res.send('Received a POST HTTP method');
	
});

const verifyOrganizationAccess = async (body, params) => {

	try {
		const organizationId = body.org.Id; 
		const response = await axios.post(`https://dream-business-5073-dev-ed.cs40.my.salesforce.com/services/apexrest/Applications/${organizationId}`);
	} catch (error) {
		console.log('error', error); 
	}

}

export default router;
