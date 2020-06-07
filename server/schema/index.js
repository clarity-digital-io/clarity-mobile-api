export const FormSchema = {
	name: 'Form__c',
	primaryKey: 'Id',
  properties: {
    Id: 'string',
		Name: 'string',
		Title__c: 'string',
		Status__c: 'string',
		Multi_Page__c: {type: 'bool', default: false},
		Multi_Page_Val__c: {type: 'bool', default: false},
		Multi_Page_Info__c: {type: 'string', default: ''},
		Questions__r: {type: 'linkingObjects', objectType: 'Question__c', property: 'Form__c'}
  },
};

export const QuestionSchema = {
	name: 'Question__c',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
    Form__c: 'string',
    Title__c: 'string',
    Order__c: {type: 'int', default: 0},
    Lookup__c: 'data?',
		Max_Length__c: 'int',
		Max_Range__c: 'int',
		Min_Range__c: 'int',
		Page__c: 'int',
		Required__c: 'bool',
		Salesforce_Field__c: 'data?',
		Salesforce_Object__c: 'data?',
		Logic__c: {type: 'string', default: ''},
		FreeText_Type__c: {type: 'string', default: ''},
		Record_Group__c: 'data?',
		Prefill_Type__c: 'data?'
  }
};