import Realm from 'realm';
const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

//the startlistener will stsart on app run 
//should query connected orgs and the server url and realm url and start a listener for that
//sandboxes will share forms-dev
export const listener = async () => {

	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { serverUrl: REALM_URL, adminUser: adminUser, filterRegex: '/.*/' }
		Realm.Sync.addListener(config, 'change', handleChange)
	} catch (error) {
		console.log('error', error);
	}

}

const start = async () => {
	//query salesforce org?
	//how do we get a new one that just connected to be listened to?
	
}

const handleChange = async function (changeEvent) {
console.log('changeEvent', changeEvent);
// // Extract the user ID from the virtual path, assuming that we're using
// // a filter which only subscribes us to updates of user-scoped Realms.
var matches = changeEvent.path.match("^/([^/]+)/([^/]+)$");
// console.log('matches', matches, changeEvent.changes); 
// console.log(changeEvent.changes.Response__c); 

if(changeEvent.changes.hasOwnProperty('Response__c')) {
	if(changeEvent.changes.Response__c.hasOwnProperty('oldModifications')) {
		console.log(changeEvent.changes.Response__c.oldModifications); 
	}
}


// var realm = changeEvent.realm;
// var forms = realm.objects('Form__c');
// var formIndexes = changeEvent.changes.Form__c.insertions;

// for (let formIndex of formIndexes) {
// 	var form = formIndexes[formIndex];

// 	console.log('formIndex', formIndex, form); 
// }

// console.log('userId', forms, formIndexes); 
}

