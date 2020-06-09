const Realm = require('realm'); 

// the URL to the Realm Object Server
const SERVER_URL = 'https://clarity-forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://clarity-forms-dev.us1a.cloud.realm.io';

var NOTIFIER_PATH = '/';

var handleChange = async function (changeEvent) {
	console.log('changeEvent', changeEvent);
  // Extract the user ID from the virtual path, assuming that we're using
  // a filter which only subscribes us to updates of user-scoped Realms.
	var matches = changeEvent.path.match("^/([^/]+)/([^/]+)$");
	
	var realm = changeEvent.realm;
  var forms = realm.objects('Form__c');
  var formIndexes = changeEvent.changes.Form__c.insertions;

	for (let formIndex of formIndexes) {
		console.log('formIndex', formIndex); 
	}
	
	console.log('userId', forms, formIndexes); 
}

// register the event handler callback
async function main() {

		//will read / subscribe to clarityforce.salesforce.com for mobile clients

		try {
			const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
			const config = { serverUrl: REALM_URL, adminUser: adminUser, filterRegex: '/.*/' }
			Realm.Sync.addListener(config, 'change', handleChange)
		} catch (error) {
			console.log('error', error);
		}

}

main()