const express = require('express'); 
const Realm = require('realm');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const SERVER_URL = 'https://clarity-forms-development.us2a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-development.us2a.cloud.realm.io';

const PORT = process.env.PORT || 5000;

let realm; 

const main = async () => {

	try {
		console.log('PORT0', PORT); 
		const idToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFqUXpNVUl6T0RNd09FWXlORFZCUlVFek1UaEdOMFZDTXprM04wWkVOa1UxUmpBME16azBNUSJ9.eyJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9vcmciOiIwMEQ4QTAwMDAwMENLclpVQVciLCJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9pbnN0YW5jZSI6Imh0dHBzOi8vbm9zb2Z0d2FyZS1hYmlsaXR5LTg3NC1kZXYtZWQuY3M0NS5teS5zYWxlc2ZvcmNlLmNvbSIsImlzcyI6Imh0dHBzOi8vZGV2LWd6Y291NXNnLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJzYWxlc2ZvcmNlLXNhbmRib3h8MDA1OEEwMDAwMDRhMWtmUUFBIiwiYXVkIjoiY2xtMlRkU3liT2M2aE05MUNzSmpUc1Y2bFFhemlUM3AiLCJpYXQiOjE1OTEzODM4NDIsImV4cCI6MTU5MTQxOTg0Mn0.pem0cVYu4w7rxOumRU8EFL4zMmxxDeDebsSasyg4PTEDhSKOFeFEm4JlZK0PQrjzQN2jmb8wLe3l8H430EMYdxqurziYIPuWGhQ8dTqG7Lg_ypMAJTYHmrtVJWpq9_0iBuqzvIwImT2lXjDiGUSzT0ogPb4W5K5AC6AzxkHjhb2FzICQhf3tQXwzK-0B7Uymcqop6hIes42RgXjtQISJDpUv9Ly9zRAnu7UgY1F0t93KBxr5WK5rM3woztWBNaYsyVIh22M7ClBI5rlZm5xW_h7WS19wDxl6nNE6-83E0y_SO3HJ5IE7tguTrAek3plSHwyC148IP6iCLcUlaeGwGw';
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.custom('jwt', idToken));

    realm = await Realm.open({
        sync: {
            user: adminUser,
            url: REALM_URL + '/~/userRealm'
        }
		});
		
		console.log('realm', realm); 

		app.emit('ready'); 

	} catch (error) {
		console.log('error', error);
	}

}


const onAuthRealm = async (adminUser) => {
	// Create a configuration to open the default Realm
	try {

		const config = { 	sync: { user: adminUser, url: SERVER_URL + '/~/forms' }, schema: [FormSchema]  };
	
		return Realm.open(config).then((realm) => {
			console.log('then', realm); 
			return realm; 
		});

	} catch (error) {
		console.log('error', error);
	}

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
			console.log('write', write); 

			const	form = realm.create('Form__c', { 
				Id: '1234567890',
				Name: 'test1'
			});

			console.log('form', form); 
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