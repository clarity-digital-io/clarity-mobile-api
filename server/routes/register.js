import express from 'express';
import Realm from 'realm';
import { FormSchema, QuestionSchema } from '../schema'; 

const SERVER_URL = 'https://clarity-forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/', async (req, res) => {
	console.log('req', req.param); 
	//const realm = await openRealm(req.body.organizationId);
	
	//const accessGranted = await grantUsersAccess(req.body.users, req.body.organizationId); 

	res.status(201).send('Successful syncing of Users!');
	
});

//separate as a helper/service
const openRealm = async (organizationId) => {

	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { 	sync: { user: adminUser, url: REALM_URL + `/${organizationId}/forms`, fullSynchronization: true, validate_ssl: false },  schema: [FormSchema, QuestionSchema] };

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
