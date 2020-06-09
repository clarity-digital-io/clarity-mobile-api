import express from 'express';
import Realm from 'realm';
import { ResponseSchema, AnswerSchema } from '../schema'; 

const SERVER_URL = 'https://clarity-forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {

	let organizationId = req.params.organizationId;

	const userRealms = await openRealms(req.body);
	console.log(organizationId, req.body)
	//const accessGranted = await grantUsersAccess(req.body.users, req.body.organizationId); 

	res.status(201).send('Successful syncing of Users!');
	
});

//separate as a helper/service
const openRealms = async (users) => {

	let userRealms = [];
	
	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));

		for(let index = 0; index < users.length; index++) {
			const config = { sync: { user: adminUser, url: REALM_URL + `/${users[index]}/user`, fullSynchronization: true, validate_ssl: false },  schema: [ResponseSchema, AnswerSchema] };
			const realm = await Realm.open(config);	
			const permissionChange = await adminUser.applyPermissions({ userId: users[index] }, `/${users[index]}/user`, 'admin');
			//save user data in the future
			userRealms.push(users[index]);
			realm.close(); 	
		}

	} catch (error) {
		console.log('error', error);
	}

	return userRealms;

}

const grantUsersAccess = async (users, organization_id) => {
	let user = Realm.Sync.User.current;
	const permissionChanges = [];
	
	try {
	  for (let index = 0; index < users.length; index++) {
			const permissionChange = await user.applyPermissions({ userId: users[index] }, `/${organization_id}/forms`, 'read');
			permissionChanges.push(permissionChange);
		}	
	} catch (error) {
		console.log('grantGlobalRealmPermissions', error)
	}

	return permissionChanges; 
}

export default router;
