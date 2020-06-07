import express from 'express';
import axios from 'axios';

const grant_type = 'password';     
const client_id = '3MVG9Z8h6Bxz0zc4V._snL15FoFtwlrYRmvezul8wMJk0jx5CqffMMlS0afWQIQ9clkd1mZOxy.j6DTR4p7m9'; 
const client_secret = '00A082693387D6718AC18AEA088DC459F656E945B96FFE219EBF40C2D9345136'; 
const username = 'test-is7noj24esie@example.com';
const password = ']F)Hb0%3aI';

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
		const { data } = await axios.post(`https://test.salesforce.com/services/oauth2/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`);
		const response = await axios.post(`https://dream-business-5073-dev-ed.cs40.my.salesforce.com/services/apexrest/Applications/${organizationId}`, {}, { headers: { Authorization: "Bearer " + data.access_token } });
		return response; 
	} catch (error) {
		console.log('error', error); 
	}

}

export default router;
