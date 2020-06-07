export const FormSchema = {
	name: 'Form__c',
	primaryKey: 'Id',
  properties: {
    Id: 'string',
		Name: 'string',
		Title__c: 'string',
		Status__c: 'string',
		CreatedDate: 'data?',
		Multi_Page__c: {type: 'bool', default: false},
		Multi_Page_Val__c: {type: 'bool', default: false},
		Multi_Page_Info__c: {type: 'string', default: ''}
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
		Max_Length__c: {type: 'string', default: ''},
		Max_Range__c: 'int',
		Min_Range__c: {type: 'int', default: 0 },
		Page__c: 'int',
		Required__c: 'bool',
		Salesforce_Field__c: {type: 'string', default: ''},
		Salesforce_Object__c: {type: 'string', default: ''},
		Logic__c: {type: 'string', default: ''},
		FreeText_Type__c: {type: 'string', default: ''},
		Record_Group__c: {type: 'string', default: ''},
		Prefill_Type__c: {type: 'string', default: ''}
  }
};