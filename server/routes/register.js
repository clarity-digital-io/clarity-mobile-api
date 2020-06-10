import express from 'express';
import Realm from 'realm';
import { ResponseSchema, AnswerSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	const userRealms = await openRealms(organizationId, req.body);

	res.status(201).send('Successful syncing of Users!');
	
});

//separate as a helper/service
const openRealms = async (organizationId, users) => {

	let userRealms = [];
	
	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));

		for(let user in users) {
			const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${user}/user`, fullSynchronization: true, validate_ssl: false },  schema: [ResponseSchema] };
			const realm = await Realm.open(config);	
			await adminUser.applyPermissions({ userId: `salesforce-sandbox_${user}` }, `/salesforce-sandbox_${user}/user`, 'admin');
			await adminUser.applyPermissions({ userId: `salesforce-sandbox_${user}` }, `/${organizationId}/forms`, 'read');
			const responses = prepareResponses(users[user]); 
			await sync(realm, responses);
			userRealms.push(user);
			realm.close(); 	
		}
	
	} catch (error) {
		console.log('error', error);
	}

	return userRealms;

}

const prepareResponses = (salesforceResponses) => {

	return salesforceResponses.map(response => {
		console.log('response', response); 
		return {
			Id: response.Id, 
			Name: response.Name, 
			Form__c: response.forms__Form__c, 
			Status__c: response.forms__Status__c, 
			UUID__c: response.Id, 
			Completion__c: true
		}
	});

}

const sync = async (realm, responses) => {

	realm.write(() => {

		responses.forEach(preparedResponse => {
			console.log(preparedResponse)

			let updatedResponse = realm.create('Response__c', preparedResponse, 'all');

		});

	});

	realm.close(); 

}

export default router;
