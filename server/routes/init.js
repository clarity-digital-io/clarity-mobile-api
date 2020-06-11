import express from 'express';
import axios from 'axios';
import Realm from 'realm';
import { FormSchema, QuestionSchema, QuestionOptionSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';
// Clarity Managment Connected App
const grant_type = 'password';     
const client_id = '3MVG9Z8h6Bxz0zc4V._snL15FoFtwlrYRmvezul8wMJk0jx5CqffMMlS0afWQIQ9clkd1mZOxy.j6DTR4p7m9'; 
const client_secret = '00A082693387D6718AC18AEA088DC459F656E945B96FFE219EBF40C2D9345136'; 
const username = 'test-is7noj24esie@example.com';
const password = 'Clarity2020!hK0S8pi2pXOQ7tjsADGijhFV';

var router = express.Router();

router.post('/', async (req, res) => {

	const { data } = await verifyOrganizationAccess(req.body, req.params);

	if(data.access != 'valid') {
		return res.status(401).send({ access: false, description: 'No mobile access for Organization.' });
	}

	const realm = await openRealm(data.organizationId);
	
	const forms = prepareForms(req.body.forms); 

	const status = await sync(realm, forms);

	res.status(201).send('Successful syncing of Forms!');
	
});

const verifyOrganizationAccess = async (body, params) => {

	try {
		const organizationId = body.org.Id; 
		const { data } = await axios.post(`https://test.salesforce.com/services/oauth2/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`);
		const response = await axios.post(`https://dream-business-5073-dev-ed.cs40.my.salesforce.com/services/apexrest/Applications/${organizationId}`, {}, { headers: { Authorization: "Bearer " + data.access_token } });
		return response; 
	} catch (error) {
		console.log('error', error); 
	}

}

const openRealm = async (organizationId) => {
	// Create a configuration to open the default Realm
	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { 	sync: { user: adminUser, url: REALM_URL + `/${organizationId}/forms`, fullSynchronization: true, validate_ssl: false },  schema: [FormSchema, QuestionSchema, QuestionOptionSchema] };

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
						Label__c: option.forms__Label__c
					}
				});
				nQuestionCriteria.set(question.Id, options);
				console.log('nQuestionCriteria', nQuestionCriteria, options); 
			}

			if(question.hasOwnProperty('forms__Question_Criteria__r')) {
				let criteria = question.forms__Question_Criteria__r.records.map(criteria => {
					return {
						Id: criteria.Id,
						Name: criteria.Name
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

			let updatedForm = realm.create('Form__c', form, 'all');
			let questionsList = updatedForm.Questions__r;

			if(questionsList.length > 0) {
				realm.delete(questionsList);
			}

			questions.forEach(question => {

				questionsList.push(question); 

				let questionOptionsList = question.Question_Options__r;
				//let questionCriteriaList = question.Question_Criteria__r;

				let actualQuestionOptions = questionoptions.has(question.Id) ? questionoptions.get(question.Id) : []
				console.log('actualQuestionOptions', actualQuestionOptions); 
				actualQuestionOptions.forEach(option => {
					questionOptionsList.push(option); 
				});

			});
		});

	});

	realm.close(); 

}

export default router;
