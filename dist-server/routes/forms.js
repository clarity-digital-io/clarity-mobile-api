import express from 'express';
var router = express.Router();
router.post('/', async (req, res) => {
  const preparedForm = parseForm(req.body);
  realm.write(() => {
    const form = realm.create('Form__c', preparedForm, 'modified');
  });
  return res.send('Received a POST HTTP method');
});

const parseForm = body => {
  const form = {
    Id: body.Id,
    Name: body.Name ? body.Name : '',
    Title__c: body.forms__Title__c ? body.forms__Title__c : ''
  };
  return form;
};

export default router;