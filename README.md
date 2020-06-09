git push heroku master

## Setup will hold list of users with license
username => license 

Sync (Creates realm for user and grants permission); 

## Forms Questions Question_Options Question_Criteria

Client Salesforce org will control when this is synced. 
User has only read access to these Template Objects.

## Response Answers (Image) Approvals

A Response can only be created by a user

A user can create a Response with a Mobile App
A user can create a Response with a Lightning Component (Salesforce)

Source of truth is => Mobile (Local & Offline)

Clarity Setup Wizard (Add User + License) 
-- Sync
-- This creates the realm for the user if it doesn't exist and grants access to global Realm with forms

New app install => open realm form /userId/
-- Load only from Realm

Response submission
-- Listener pushes to Salesforce

Future requirement 
-- Changes in lightning component push change to realm object similar to INIT


Data Model for License Management (Control Qty of Licenses // Get QTYs from Clarity Management in Salesforce Org Update metadata)
-- Clarity_User__c (User - Lookup, Clarity_License__c - Lookup)
-- User__c
-- Clarity_License__c (Limit Controlled by metadata); 


