import express from 'express';
// import bodyParser from 'body-parser';
// import initRouter from './routes/init';
// import formsRouter from './routes/forms';

const PORT = process.env.PORT || 5000;

let app = express();
let realm; 

app.listen(PORT, () =>
	console.log(`App listening on port ${PORT}!`)
);

// app.use('/:organizationId/init', initRouter);
// app.use('/:organizationId/forms', formsRouter);

// export default app;