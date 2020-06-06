import Realm from 'realm';
import { FormSchema, ResponseSchema, QuestionSchema } from '../schema'; 

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

const openRealm = async (user) => {
	// Create a configuration to open the default Realm
	try {

		const idToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFqUXpNVUl6T0RNd09FWXlORFZCUlVFek1UaEdOMFZDTXprM04wWkVOa1UxUmpBME16azBNUSJ9.eyJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9vcmciOiIwMEQ4QTAwMDAwMENLclpVQVciLCJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9pbnN0YW5jZSI6Imh0dHBzOi8vbm9zb2Z0d2FyZS1hYmlsaXR5LTg3NC1kZXYtZWQuY3M0NS5teS5zYWxlc2ZvcmNlLmNvbSIsImlzcyI6Imh0dHBzOi8vZGV2LWd6Y291NXNnLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJzYWxlc2ZvcmNlLXNhbmRib3h8MDA1OEEwMDAwMDRhMWtmUUFBIiwiYXVkIjoiY2xtMlRkU3liT2M2aE05MUNzSmpUc1Y2bFFhemlUM3AiLCJpYXQiOjE1OTE0NzI0MjEsImV4cCI6MTU5MTUwODQyMX0.j5_iUcRrSWxurA7S0u5GQBK2gTPHV-g06OxgWJVlljPai13ubmlu61s7Ua_YLe6SuMu_7uxXNxKoWStYtGHG0n64M5Tv3g8JRhdi_DdCRDwR1eLWc1lSxAMezsJuv7LEgw5C8UMPG9lSezx6Edy0ZhjD8fpsoifRLe_InMOUVqzHsVLXllKMIapNuZiPzvd2sctLD4wda2AYzhBnHbiy0tgw4fT_mHXhSf-5VAiv5Lp4Nkxlv2s8rdCrf8NQaj4HMJzoCuN5MuL4LhwPERcumqyiiQxEdF0fv6wvJm6eUe9IzDls-qOg0wQOy8w5Y8jbv1YuPL4DFsmsmOh-p48GJw';
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.custom('jwt', idToken));
		const config = { 	sync: { user: adminUser, url: REALM_URL + '/~/userRealm', fullSynchronization: true, validate_ssl: false },  schema: [FormSchema, ResponseSchema, QuestionSchema] };

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
