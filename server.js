const express = require('express'); 
const Realm = require('realm');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

const PORT = process.env.PORT || 5000;

let realm; 

const main = async () => {

	try {
		console.log('PORT0', PORT); 

		const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));
		console.log('PORT1', PORT); 

		realm = await onAuthRealm(adminUser); 
		console.log('PORT2', PORT); 
		app.emit('ready'); 

	} catch (error) {
		console.log('error', error);
	}

}

const onAuthRealm = async (adminUser) => {
	
	const config = { 	sync: { user: adminUser, url: SERVER_URL + '/sandbox', fullSynchronization: true, validate_ssl: false }, schema: [FormSchema]  };

	console.log('onAuthRealm0'); 

	return Realm.open(config)
		.progress((transferred, transferable) => {
			console.log('progress', transferred, transferable)
		})
		.then(realm => {
			console.log('onAuthRealm1', realm); 

			return realm; 
		})
		.catch((e) => console.log('trying to open', e));

}

main(); 

app.on('ready', function() { 
	app.listen(PORT, () =>
		console.log(`Example app listening on port ${PORT}!`),
	);
}); 

app.post('/forms', async (req, res) => {
	console.log('req', req.body); 

	console.log('realm', realm); 
	realm.write(() => {

	 realm.create('Form__c', { 
		 Id: '1234567890',
		 Name: 'test1'
	 });

 });

  return res.send('Received a POST HTTP method');
});

const FormSchema = {
	name: 'Form__c',
	primaryKey: 'Id',
  properties: {
    Id: 'string',
		Name: 'string'
  },
};