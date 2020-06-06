import Realm from 'realm';
import { FormSchema, ResponseSchema } from './schema'; 

const SERVER_URL = 'https://clarity-forms-development.us2a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-development.us2a.cloud.realm.io';

export const main = async (realm, app) => {

	try {
		realm = await openRealm(); 
		app.emit('ready'); 
	} catch (error) {
		console.log('error', error);
	}

}

export const openRealm = async (user) => {
	// Create a configuration to open the default Realm
	try {

		const idToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFqUXpNVUl6T0RNd09FWXlORFZCUlVFek1UaEdOMFZDTXprM04wWkVOa1UxUmpBME16azBNUSJ9.eyJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9vcmciOiIwMEQ4QTAwMDAwMENLclpVQVciLCJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9pbnN0YW5jZSI6Imh0dHBzOi8vbm9zb2Z0d2FyZS1hYmlsaXR5LTg3NC1kZXYtZWQuY3M0NS5teS5zYWxlc2ZvcmNlLmNvbSIsImlzcyI6Imh0dHBzOi8vZGV2LWd6Y291NXNnLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJzYWxlc2ZvcmNlLXNhbmRib3h8MDA1OEEwMDAwMDRhMWtmUUFBIiwiYXVkIjoiY2xtMlRkU3liT2M2aE05MUNzSmpUc1Y2bFFhemlUM3AiLCJpYXQiOjE1OTEzODM4NDIsImV4cCI6MTU5MTQxOTg0Mn0.pem0cVYu4w7rxOumRU8EFL4zMmxxDeDebsSasyg4PTEDhSKOFeFEm4JlZK0PQrjzQN2jmb8wLe3l8H430EMYdxqurziYIPuWGhQ8dTqG7Lg_ypMAJTYHmrtVJWpq9_0iBuqzvIwImT2lXjDiGUSzT0ogPb4W5K5AC6AzxkHjhb2FzICQhf3tQXwzK-0B7Uymcqop6hIes42RgXjtQISJDpUv9Ly9zRAnu7UgY1F0t93KBxr5WK5rM3woztWBNaYsyVIh22M7ClBI5rlZm5xW_h7WS19wDxl6nNE6-83E0y_SO3HJ5IE7tguTrAek3plSHwyC148IP6iCLcUlaeGwGw';
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.custom('jwt', idToken));
		const config = { 	sync: { user: adminUser, url: REALM_URL + '/~/userRealm', fullSynchronization: true, validate_ssl: false },  schema: [FormSchema, ResponseSchema] };

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
