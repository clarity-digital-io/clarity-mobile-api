const express = require('express'); 
const Realm = require('realm');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

let realm; 

const main = async () => {

	try {

		const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));

		realm = await onAuthRealm(adminUser); 

	} catch (error) {
		console.log('error', error);
	}
	
	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`),
	);

}

const onAuthRealm = async (adminUser) => {
	
	const config = { 	sync: { user: adminUser, url: SERVER_URL + '/sandbox', fullSynchronization: true, validate_ssl: false } };

	return Realm.open(config)
		.progress((transferred, transferable) => {
			console.log('progress', transferred, transferable)
		})
		.then(realm => {
			return realm; 
		})
		.catch((e) => console.log('trying to open', e));

}

main(); 

app.post('/forms', async (req, res) => {
	console.log('req', req.body); 

	console.log('realm', realm); 
	realm.write(() => {

	 realm.create('Form__c', { 
		 Id: 'test'
	 });

 });

  return res.send('Received a POST HTTP method');
});
