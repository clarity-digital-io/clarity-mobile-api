const express = require('express'); 
const Realm = require('realm');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

const main = async () => {

	try {

		const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));

		const config = { 	sync: { user: adminUser, url: SERVER_URL + '/sandbox', fullSynchronization: true, validate_ssl: false } };

		const realm = Realm.open(config)
			.progress((transferred, transferable) => {
				console.log('progress', transferred, transferable)
			})
			.then(realm => {
				return realm; 
			})
			.catch((e) => console.log('trying to open', e));

		console.log('realm', realm);

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
