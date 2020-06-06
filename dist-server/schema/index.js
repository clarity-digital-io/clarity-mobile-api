export const FormSchema = {
  name: 'Form__c',
  primaryKey: 'Id',
  properties: {
    Id: 'string',
    Name: 'string',
    Title__c: 'string',
    Status__c: 'string',
    CreatedDate: 'date',
    Multi_Page__c: 'bool',
    Has_Thank_You__c: 'bool',
    Thank_You_Redirect__c: 'string',
    Limit__c: 'int',
    Multi_Page_Val__c: 'string',
    Multi_Page_Info__c: 'string',
    End_Date__c: 'date',
    Question__r: 'Question__c[]'
  }
};
export const QuestionSchema = {
  name: 'Question__c',
  primaryKey: 'Id',
  properties: {
    Id: 'string',
    Name: 'string',
    Form__c: 'string',
    Title__c: 'string',
    Order__c: {
      type: 'int',
      default: 0
    },
    Lookup__c: 'bool',
    Max_Length__c: 'int',
    Max_Length__c: 'int',
    Max_Range__c: 'int',
    Min_Range__c: 'int',
    Page__c: 'int',
    Required__c: 'bool',
    Salesforce_Field__c: 'string',
    Salesforce_Object__c: 'string',
    Logic__c: 'string',
    FreeText_Type__c: 'string',
    Record_Group__c: 'string',
    Prefill_Type__c: 'string'
  }
};
export const ResponseSchema = {
  name: 'Response__c',
  primaryKey: 'Id',
  properties: {
    Id: 'string',
    Name: 'string',
    Completion__c: 'bool',
    Status__c: 'string',
    Submitted_Date__c: 'date',
    UUID__c: 'string',
    Form__c: 'string'
  }
};