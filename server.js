const express = require('express'); 
 
const app = express();

app.post('/forms', (req, res) => {
	console.log('req', req); 
  return res.send('Received a POST HTTP method');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);