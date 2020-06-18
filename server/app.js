import express from 'express';
import bodyParser from 'body-parser';

import informationRouter from './routes/information';
import initRouter from './routes/init';
import registerRouter from './routes/register';
import formsRouter from './routes/forms';
import syncRouter from './routes/sync';

const PORT = process.env.PORT || 5000;

let app = express();

app.use(bodyParser.json())

app.use('/information', informationRouter); 

app.use('/init', initRouter);
app.use('/register', registerRouter); 

app.use('/forms', formsRouter);
app.use('/sync', syncRouter);

app.listen(PORT, () =>
	console.log(`App listening on port ${PORT}!`),
);
