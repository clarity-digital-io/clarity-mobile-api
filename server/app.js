import express from 'express';
import bodyParser from 'body-parser';

import informationRouter from './routes/information';
import connectRouter from './routes/connect';
import registerRouter from './routes/register';
import formsRouter from './routes/forms';
import syncRouter from './routes/sync';

const PORT = process.env.PORT || 5000;

let app = express();

app.use(bodyParser.json())

app.use('/information', informationRouter); 

app.use('/connect', connectRouter);
app.use('/register', registerRouter); 

app.use('/forms', formsRouter);
app.use('/sync', syncRouter);

app.listen(PORT, () =>
	console.log(`App listening on port ${PORT}!`),
);

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

//the startlistener will stsart on app run 
//should query connected orgs and the server url and realm url and start a listener for that
//sandboxes will share forms-dev
const startListener = async () => {

	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { serverUrl: REALM_URL, adminUser: adminUser, filterRegex: '/.*/' }
		Realm.Sync.addListener(config, 'change', handleChange)
	} catch (error) {
		console.log('error', error);
	}

}

var handleChange = async function (changeEvent) {
console.log('changeEvent', changeEvent);
// // Extract the user ID from the virtual path, assuming that we're using
// // a filter which only subscribes us to updates of user-scoped Realms.
var matches = changeEvent.path.match("^/([^/]+)/([^/]+)$");
console.log('matches', matches, changeEvent.changes); 
console.log(changeEvent.changes.Response__c); 

if(changeEvent.changes.Response__c.hasOwnProperty('oldModifications')) {
	console.log(changeEvent.changes.Response__c.oldModifications); 
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

startListener(); 
