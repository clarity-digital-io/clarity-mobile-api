const Realm = require('realm'); 

// the URL to the Realm Object Server
var SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

var NOTIFIER_PATH = '/';

var handleChange = async function (changeEvent) {
	console.log('changeEvent', changeEvent);
  // Extract the user ID from the virtual path, assuming that we're using
  // a filter which only subscribes us to updates of user-scoped Realms.
  var matches = changeEvent.path.match("^/([^/]+)/([^/]+)$");

	console.log('userId', matches); 
	console.log('testing if it disconnects');
}

// register the event handler callback
async function main() {

		//will read / subscribe to clarityforce.salesforce.com for mobile clients

		try {
			const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));
			Realm.Sync.addListener(`realms:${SERVER_URL}`, adminUser, NOTIFIER_PATH, 'change', handleChange);
		} catch (error) {
			console.log('error', error);
		}

}

main()