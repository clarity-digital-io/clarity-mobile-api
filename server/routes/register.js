import express from 'express';
import Realm from 'realm';
import { ResponseSchema, AnswerSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	const userRealms = await openRealms(organizationId, req.body);

	res.status(201).send({ description: 'Successful syncing of Users!', users: userRealms });
	
});

//separate as a helper/service
//move to worker queue
const openRealms = async (organizationId, users) => {

	let userRealms = [];
	
	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));

		for (let index = 0; index < users.length; index++) {
			let user = users[index];
			console.log('user', user); 
			const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${user}/user`, fullSynchronization: true, validate_ssl: false },  schema: [ResponseSchema, AnswerSchema] };
			const realm = await Realm.open(config);	
			await adminUser.applyPermissions({ userId: `salesforce-sandbox_${user}` }, `/salesforce-sandbox_${user}/user`, 'admin');
			await adminUser.applyPermissions({ userId: `salesforce-sandbox_${user}` }, `/${organizationId}/forms`, 'read');
			userRealms.push(user);
			realm.close(); 	
		}
	
	} catch (error) {
		console.log('error', error);
	}

	return userRealms;

}

export default router;
