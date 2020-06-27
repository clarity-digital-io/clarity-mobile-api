import express from 'express';
import Realm from 'realm';
import { sObjectSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

var router = express.Router();

router.post('/:userId', async (req, res) => {

	let userId = req.params.userId;
	//start worker async = on success start return response

	let records = req.body;

	const salesforceRecords = prepare(records); 

	// const realm = await openRealm(userId);
	
	// const status = await sync(realm, salesforceRecords); 

	res.status(201).send('Successful syncing of records!');
	
});

//separate as a helper/service
// const openRealm = async (userId) => {
	
// 	try {
// 		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
// 		const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${userId}/user`, fullSynchronization: true, validate_ssl: false },  schema: [sObjectSchema] };
// 		const realm = await Realm.open(config);	
// 		return realm;
// 	} catch (error) {
// 		console.log('error', error);
// 	}

// }

// const sync = async (realm, records) => {

// 	realm.write(() => {

// 		records.forEach(record => {
// 			console.log('record', record); 
// 			let updateRecord = realm.create('sObject', record, 'all');

// 		});

// 	});

// 	realm.close(); 

// }

const prepare = (salesforceRecords) => {

	return salesforceRecords.map(record => {

		return {
			Id : record.Id, 
			Name: record.Name, 
			Type: 'Account', 
			LastModifiedDate: record.LastModifiedDate,
			CreatedDate: record.CreatedDate,
			Values: getValues(record) //json object 
		}

	})

}

const exclude = ['Id', 'Name', 'LastModifiedDate', 'CreatedDate', 'attributes'];

const getValues = (record) => {

	let sObjectRecord = {};

	for (const property in record) {
		if(exclude.indexOf(property) == -1) {
			sObjectRecord[property] = record[property];
		} 
	}
	return JSON.stringify(sObjectRecord); 
	
}

export default router;
