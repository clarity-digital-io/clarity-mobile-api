let Queue = require('bull');

let PORT = '21489';
let HOST = 'ec2-67-202-25-98.compute-1.amazonaws.com';
let PASSWORD = 'pa52ef8b5d034514d7e08a40ae7be9213d85032d1255a43b6393b948832e172cd';
// Specify Redis connection using object

export const connectController = async (req, res, organizationId) => {

	try {
		let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		let job = await workQueue.add({ forms: req.body.forms, organizationId: organizationId });
		workQueue.close(); 
		res.status(201).send({ id: job.id });		
	} catch (error) {
		console.log('error', error);
		res.status(404).send({ description: error });
	}

}

