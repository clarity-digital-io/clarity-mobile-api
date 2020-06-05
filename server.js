const express = require('express'); 
const Realm = require('realm'); 
const app = express();
 
const SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

const main = async () => {

	try {

		const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));
		//const realm = await Realm.open({ sync: { user: adminUser, url: `realms:${SERVER_URL}/` } });
		console.log('adminUser', adminUser);
	} catch (error) {
		console.log('error', error);
	}
	
	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`),
	);

}

main(); 

app.post('/forms', async (req, res) => {
	console.log('req', req.body); 

	//console.log('realm', realm); 
// 	realm.write(() => {
// 		// retrieves all Dogs from the Realm

// 	 realm.create('Form__c', { 
// 		 Id: responseId,
// 		 Name: 'test', 
// 		 Completion__c: false,
// 		 Status__c: 'test',
// 		 Submitted_Date__c: new Date(), 
// 		 UUID__c: responseId,
// 		 Form__c: form.Id,
// 		 Answers__r: []
// 	 });

//  });

  return res.send('Received a POST HTTP method');
});
