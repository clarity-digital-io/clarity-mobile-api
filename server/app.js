import express from 'express';
import bodyParser from 'body-parser';
import initRouter from './routes/init';
import formsRouter from './routes/forms';
import { main } from './realm';

const PORT = process.env.PORT || 5000;

let app = express();
let realm; 

main(realm, app); 

app.use(bodyParser.json())

app.on('ready', function() { 
	app.listen(PORT, () =>
		console.log(`App listening on port ${PORT}!`),
	);
}); 

app.use('/:organizationId/init', initRouter);
app.use('/:organizationId/forms', formsRouter);

export default app;