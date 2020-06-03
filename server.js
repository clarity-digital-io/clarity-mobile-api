const Realm = require('realm'); 
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)

// the URL to the Realm Object Server
var SERVER_URL = '//clarity-forms-development.us2a.cloud.realm.io';

// The regular expression you provide restricts the observed Realm files to only the subset you
// are actually interested in. This is done in a separate step to avoid the cost
// of computing the fine-grained change set if it's not necessary.
var NOTIFIER_PATH = '/~/userRealm$';

// The handleChange callback is called for every observed Realm file whenever it
// has changes. It is called with a change event which contains the path, the Realm,
// a version of the Realm from before the change, and indexes indication all objects
// which were added, deleted, or modified in this change
var handleChange = async function (changeEvent) {
	console.log('changeEvent', changeEvent);
  // Extract the user ID from the virtual path, assuming that we're using
  // a filter which only subscribes us to updates of user-scoped Realms.
  var matches = changeEvent.path.match("^/([^/]+)/([^/]+)$");
  var userId = matches[1];

	console.log('userId', matches); 
}

// register the event handler callback
async function main() {

		try {
			const adminUser = await Realm.Sync.User.login(`https:${SERVER_URL}`, Realm.Sync.Credentials.nickname('realm-admin', true));
			console.log('adminUser', adminUser); 
			Realm.Sync.addListener(`realms:${SERVER_URL}`, adminUser, NOTIFIER_PATH, 'change', handleChange);
		} catch (error) {
			console.log('error', error);
		}

}



main()