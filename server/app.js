import express from 'express';
import bodyParser from 'body-parser';
import initRouter from './routes/init';
import registerRouter from './routes/register';
import formsRouter from './routes/forms';
import { main } from './realm';

const PORT = process.env.PORT || 5000;

let app = express();
let realm; 

app.use(bodyParser.json())

app.use('/:organizationId/init', initRouter);
app.use('/register', registerRouter); 
app.use('/:organizationId/forms', formsRouter);

app.listen(PORT, () =>
	console.log(`App listening on port ${PORT}!`),
);
