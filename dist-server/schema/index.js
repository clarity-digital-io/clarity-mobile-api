"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseSchema = exports.QuestionSchema = exports.FormSchema = void 0;

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormSchema = {
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
exports.FormSchema = FormSchema;
var QuestionSchema = {
  name: 'Question__c',
  primaryKey: 'Id',
  properties: (_properties = {
    Id: 'string',
    Name: 'string',
    Form__c: 'string',
    Title__c: 'string',
    Order__c: {
      type: 'int',
      "default": 0
    },
    Lookup__c: 'bool',
    Max_Length__c: 'int'
  }, _defineProperty(_properties, "Max_Length__c", 'int'), _defineProperty(_properties, "Max_Range__c", 'int'), _defineProperty(_properties, "Min_Range__c", 'int'), _defineProperty(_properties, "Page__c", 'int'), _defineProperty(_properties, "Required__c", 'bool'), _defineProperty(_properties, "Salesforce_Field__c", 'string'), _defineProperty(_properties, "Salesforce_Object__c", 'string'), _defineProperty(_properties, "Logic__c", 'string'), _defineProperty(_properties, "FreeText_Type__c", 'string'), _defineProperty(_properties, "Record_Group__c", 'string'), _defineProperty(_properties, "Prefill_Type__c", 'string'), _properties)
};
exports.QuestionSchema = QuestionSchema;
var ResponseSchema = {
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
exports.ResponseSchema = ResponseSchema;