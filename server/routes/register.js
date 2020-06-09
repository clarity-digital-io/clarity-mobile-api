import express from 'express';
import Realm from 'realm';
import { ResponseSchema, AnswerSchema } from '../schema'; 

const SERVER_URL = 'https://clarity-forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	const userRealms = await openRealms(organizationId, req.body);
	console.log(organizationId, req.body)
	//const accessGranted = await grantUsersAccess(req.body.users, req.body.organizationId); 

	res.status(201).send('Successful syncing of Users!');
	
});

//separate as a helper/service
const openRealms = async (organizationId, users) => {

	let userRealms = [];
	
	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));

		for(user in users) {
			
			let responses = users[user];
			const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${users[index]}/user`, fullSynchronization: true, validate_ssl: false },  schema: [ResponseSchema, AnswerSchema] };
			const realm = await Realm.open(config);	
			const permissionUserChange = await adminUser.applyPermissions({ userId: user }, `/${users[index]}/user`, 'admin');
			const permissionFormsChange = await adminUser.applyPermissions({ userId: user }, `/${organizationId}/forms`, 'read');
			const realmSync = await sync(realm, responses)
			userRealms.push(user);

			realm.close(); 	

		}
	
	} catch (error) {
		console.log('error', error);
	}

	return userRealms;

}


const sync = async (realm, responses) => {

	realm.write(() => {

		responses.forEach(preparedResponse => {
			console.log('preparedResponse', preparedResponse)
			//let updatedResponse = realm.create('Response__c', form, 'all');

		});

	});

	realm.close(); 

}

export default router;
