const express = require('express'); 
 
const app = express();

const SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

app.post('/forms', (req, res) => {
	console.log('req', req); 

	//In the future first open realm then start service
	const response = await updateRealm(req); 
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

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);

const updateRealm = async (req) => {

	const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));
	const realm = await Realm.open({
			sync: {
					user: adminUser,
					url: `realms://${server_address}/`,
			}
	});
	console.log('realm', realm); 
	return realm; 
}