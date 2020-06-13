import express from 'express';
import Realm from 'realm';
import { sObjectSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/:userId', async (req, res) => {

	console.log('user', userId); 

	let userId = req.params.userId;
	console.log('user', userId); 
	//start worker async = on success start return response

	let records = req.body;
	console.log('records', records); 

	const salesforceRecords = prepare(records); 
	console.log('salesforceRecords', salesforceRecords); 

	//const realm = await openRealm(userId, schemas);
	
	//const sync = await sync(realm, records); 

	//realm.close(); 	

	res.status(201).send('Successful syncing of records!');
	
});

//separate as a helper/service
const openRealm = async (userId, records) => {
	
	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${userId}/user`, fullSynchronization: true, validate_ssl: false },  schema: [sObjectSchema] };
		const realm = await Realm.open(config);	
		return realm;
	} catch (error) {
		console.log('error', error);
	}

}

const prepare = (salesforceRecords) => {

	return salesforceRecords.map(record => {

		return {
			Id : record.Id, 
			Name: record.Name, 
			Type: record.attribute.Name, 
			LastModifiedDate: record.LastModifiedDate,
			CreatedDate: record.CreatedDate,
			Values: getValues(record) //json object 
		}

	})

}

const getValues = (record) => {
	return JSON.stringify(record); 
}

export default router;
