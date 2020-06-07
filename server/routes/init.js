import express from 'express';
import axios from 'axios';
import Realm from 'realm';
import { FormSchema, ResponseSchema, QuestionSchema } from '../schema'; 

const SERVER_URL = 'https://clarity-forms-development.us2a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-development.us2a.cloud.realm.io';

const grant_type = 'password';     
const client_id = '3MVG9Z8h6Bxz0zc4V._snL15FoFtwlrYRmvezul8wMJk0jx5CqffMMlS0afWQIQ9clkd1mZOxy.j6DTR4p7m9'; 
const client_secret = '00A082693387D6718AC18AEA088DC459F656E945B96FFE219EBF40C2D9345136'; 
const username = 'test-is7noj24esie@example.com';
const password = 'Clarity2020!hK0S8pi2pXOQ7tjsADGijhFV';

var router = express.Router();

router.post('/', async (req, res) => {

	const {data} = await verifyOrganizationAccess(req.body, req.params);

	if(data.access != 'valid') {
		return res.status(401).send({ access: false, description: 'No mobile access for Organization.' });
	}

	const realm = await openRealm(data.organizationId);
	
	const { forms, questions } = prepareForms(req.body.forms); 

	const status = await sync(realm, forms, questions);

	console.log('return name of realm'); 
	console.log('close realm after syncing and start new worker that listens to this realm');
	res.send('Received a POST HTTP method');
	
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

const openRealm = async (organizationId) => {
	// Create a configuration to open the default Realm
	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { 	sync: { user: adminUser, url: REALM_URL + `/${organizationId}/forms`, fullSynchronization: true, validate_ssl: false },  schema: [FormSchema, ResponseSchema, QuestionSchema] };

		return Realm.open(config)
			.progress((transferred, transferable) => {
				console.log('progress', transferred, transferable)
			})
			.then(realm => {
				return realm; 
			})
			.catch((e) => {
				console.log('trying to open', e);
			});
			
	} catch (error) {
		console.log('error', error);
	}

}

const prepareForms = (salesforceForms) => {
	console.log('salesforceForms', salesforceForms);
	const forms = salesforceForms.reduce((accum, { form, questions }) => {

		let form = {
			Id: form.Id,
			Name: form.Name ? form.Name : '',
			Title__c: form.forms__Title__c ? form.forms__Title__c : ''
		};

		let questions = questions.map(question => {
			return {
				Id: question.Id
			}
		});

		let currentForms = accum['forms'];
		let currentQuestions = accum['questions'];

		accum['forms'] = currentForms.concat(form);
		accum['questions'] = currentQuestions.concat(questions); 

		return accum; 

	}, { forms: [], questions: [] })
	

	return forms; 
}

const sync = async(realm, forms, questions) => {

	realm.write(() => {

		forms.forEach(form => {

			realm.create('Form__c', form);

		});

		questions.forEach(question => {

			realm.create('Question__c', question);

		});

	});

 realm.close(); 

}

export default router;
