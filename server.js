import express from 'express';
 
const app = express();

app.post('/forms', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);