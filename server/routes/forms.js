import express from 'express';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	console.log('open realm here after checking if orgid/company id is valid or api key');
	console.log('close it up afterwards'); 

	const preparedForm = parseForm(req.body); 

	realm.write(() => {

		const	form = realm.create('Form', preparedForm, 'modified');

	});

  return res.send('Received a POST HTTP method');
});

const parseForm = (body) => {

	const form = {
		Id: body.Id,
		Name: body.Name ? body.Name : '',
		Title: body.forms__Title__c ? body.forms__Title__c : '',

	};

	return form; 
}

export default router;