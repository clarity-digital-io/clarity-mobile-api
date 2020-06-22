import express from 'express';
import axios from 'axios';
import Realm from 'realm';
import { FormSchema, QuestionSchema, QuestionOptionSchema, QuestionCriteriaSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';
// Clarity Managment Connected App
const grant_type = 'password';     
const client_id = '3MVG9Z8h6Bxz0zc4V._snL15FoFtwlrYRmvezul8wMJk0jx5CqffMMlS0afWQIQ9clkd1mZOxy.j6DTR4p7m9'; 
const client_secret = '00A082693387D6718AC18AEA088DC459F656E945B96FFE219EBF40C2D9345136'; 
const username = 'test-is7noj24esie@example.com';
const password = 'Clarity2020!hK0S8pi2pXOQ7tjsADGijhFV';

var router = express.Router();

router.post('/:organizationId', async (req, res) => {
	
	let organizationId = req.params.organizationId;

	const { data } = await verifyOrganizationAccess(organizationId, req.params);

	connectController(req, res); 

	// console.log('data', data); 
	// if(data == null) {
	// 	return res.status(401).send({ access: false, description: 'No mobile access for Organization.' });
	// } 

	//if access we can start the sync worker
	//open realm and syncs forms 
	//start listener for responses 

	// const test = await sendToWorker(); 

	//console.log('test', data); 
	// const realm = await openRealm(organizationId);
	
	// const forms = prepareForms(req.body.forms); 

	// const status = await sync(realm, forms);


	res.status(201).send('Syncing Forms!');
	
});

const verifyOrganizationAccess = async (organizationId, params) => {

	try {
		const { data } = await axios.post(`https://test.salesforce.com/services/oauth2/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`);
		const response = await axios.post(`https://dream-business-5073-dev-ed.cs40.my.salesforce.com/services/apexrest/Licenses/${organizationId}`, {}, { headers: { Authorization: "Bearer " + data.access_token } });
		return response; 
	} catch (error) {
		console.log('error', error); 
	}

}

const openRealm = async (organizationId) => {
	// Create a configuration to open the default Realm
	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { 	sync: { user: adminUser, url: REALM_URL + `/${organizationId}/forms`, fullSynchronization: true, validate_ssl: false },  schema: [FormSchema, QuestionSchema, QuestionOptionSchema, QuestionCriteriaSchema] };

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

const prepareForms = (salesforceForms) => {

	const forms = salesforceForms.reduce((accum, obj) => {

		let { form, questions } = obj;

		let nForm = {
			Id: form.Id,
			Name: form.Name,
			Title__c: form.forms__Title__c,
			Status__c: form.forms__Status__c,
			Multi_Page__c: form.forms__Multi_Page__c,
			Multi_Page_Val__c: form.forms__Multi_Page_Val__c,
			Multi_Page_Info__c: form.forms__Multi_Page_Info__c,
		};

		let nQuestionOptions = new Map();
		let nQuestionCriteria = new Map();
		
		let nQuestions = questions.map(question => {

			if(question.hasOwnProperty('forms__Question_Options__r')) {
				let options = question.forms__Question_Options__r.records.map(option => {
					return {
						Id: option.Id,
						Name: option.Name,
						Question__c: option.forms__Question__c,
						Label__c: option.forms__Label__c
					}
				});
				nQuestionOptions.set(question.Id, options);
			}

			if(question.hasOwnProperty('forms__Question_Criteria__r')) {
				let criteria = question.forms__Question_Criteria__r.records.map(criteria => {
					return {
						Id: criteria.Id,
						Name: criteria.Name,
						Question__c: criteria.forms__Question__c,
						Field_Type__c: criteria.forms__Field_Type__c,
						Field__c: criteria.forms__Field__c,
						Operator__c: criteria.forms__Operator__c,
						Type__c: criteria.forms__Type__c,
						Value__c: criteria.forms__Value__c
					}
				});
				nQuestionCriteria.set(question.Id, criteria);
			}

			return {
				Id: question.Id,
				Name: question.Name, 
				Form__c: question.forms__Form__c,
				Type__c: question.forms__Type__c,
				FreeText_Type__c: question.forms__FreeText_Type__c,
				Logic__c: question.forms__Logic__c,
				Max_Length__c: question.forms__Max_Length__c,
				Max_Range__c: question.forms__Max_Range__c,
				Min_Range__c: question.forms__Min_Range__c,
				Order__c: question.forms__Order__c,
				Page__c: question.forms__Page__c,
				Required__c: question.forms__Required__c,
				Title__c: question.forms__Title__c,
			}
		});

		let preparedForm = {}; 

		preparedForm['form'] = nForm;
		preparedForm['questions'] = nQuestions; 
		preparedForm['questionoptions'] = nQuestionOptions; 
		preparedForm['questioncriteria'] = nQuestionCriteria; 

		accum = accum.concat(preparedForm);
		return accum; 

	}, [])
	
	return forms; 
}

const sync = async(realm, forms) => {

	realm.write(() => {

		forms.forEach(preparedForm => {

			let form = preparedForm.form; 
			let questions = preparedForm.questions;
			let questionoptions = preparedForm.questionoptions;
			let questioncriteria = preparedForm.questioncriteria;
			console.log('questioncriteria', questioncriteria); 
			let updatedForm = realm.create('Form__c', form, 'all');
			let questionsList = updatedForm.Questions__r;

			if(questionsList.length > 0) {
				realm.delete(questionsList);
			}

			questions.forEach(question => {

				questionsList.push(question); 

			});

			let newQuestions = realm.objects('Question__c'); //can query for the ones with options here

			newQuestions.forEach(question => {

				let questionOptionsList = question.Question_Options__r;
				let questionCriteriaList = question.Question_Criteria__r;
				
				// if(questionOptionsList.length > 0) {
				// 	realm.delete(questionOptionsList);
				// }

				// if(questionCriteriaList.length > 0) {
				// 	realm.delete(questionCriteriaList);
				// }

				let actualQuestionOptions = questionoptions.has(question.Id) ? questionoptions.get(question.Id) : [];
				
				actualQuestionOptions.forEach(option => {
					questionOptionsList.push(option); 
				});

				let actualQuestionCriteria = questioncriteria.has(question.Id) ? questioncriteria.get(question.Id) : [];

				actualQuestionCriteria.forEach(criteria => {
					questionCriteriaList.push(criteria); 
				});
	
			});

		});

	});

	realm.close(); 

}

let BASE_URL = process.env.WORKER_URL || 'https://clarity-mobile-worker.herokuapp.com/';
let WORKER_URL = BASE_URL + 'process';

const sendToWorker = async () => {

	const headers = {
		'User-Agent': 'Super Agent/0.0.1',
		'Content-Type': 'application/json'
	};
	console.log('sendToWorker'); 
	try {
		const response = await axios.post(WORKER_URL, { organizationId: 'organizationId', }, { headers: headers });
		console.log("Success: Got response from worker: " + response);

	} catch (error) {
		console.log('error', error);

	}

}

function sendToWorker1(orgId, eventId, recordIds, namespace) {

	// Set the headers
	var headers = {
			'User-Agent':       'Super Agent/0.0.1',
			'Content-Type':     'application/json'
	}

	const postInfo = {
			uri: WORKER_URL,
			method: 'POST',
			headers: headers,
			form: {
					orgId: orgId, 
					eventId:eventId,
					recordIds: recordIds,
					namespace: namespace
			},
			json: true  // JSON stringifies the body automatically
	}
	//console.log('Connection Info: ' + JSON.stringify(connInfo) + '. and Post Info: ' + JSON.stringify(postInfo));

	request(postInfo, function (error, response, body) {
		if (error) {
			console.error(`Error: Got error calling worker: ${error.message}`);
			publishErrorEvent(bizOrg, orgId, eventId, 'Got error calling worker: ' + error.message);
		} else {
			if(response.statusCode != 200){
					console.error(`Error: Got status when calling worker: ${response.statusCode}`);
			} else {
					// Request was successful
					console.log("Success: Got response from worker: " + body);

					// Add to redis that this event was sent to worker.  Use combined key with <orgID>-<eventId>
					let redisKey = orgId + '-' + eventId;
					redisClient.hmset(redisKey, "status", "Sent", "last_update", Date.now(), "record_ids", recordIds, "attempt_count", 0, function(err, reply) {
							if (err) {
									console.log('Redis set err: ' + err);
									throw err;
							} else {
									console.log('Set status for ' + redisKey + ' to: Sent');
							}
					});
			}
		}
	})

}
export default router;
