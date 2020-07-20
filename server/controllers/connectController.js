let Queue = require('bull');

let PORT = '22829';
let HOST = 'ec2-54-87-144-92.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';
// Specify Redis connection using object

export const connectController = async (req, res, organizationId) => {
	console.log('req.body.groups', req.body.groups);
	try {
		let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		let job = await workQueue.add({ groups: req.body.groups, forms: req.body.forms, organizationId: organizationId });
		workQueue.close(); 
		res.status(201).send({ id: job.id });		
	} catch (error) {
		console.log('error', error);
		res.status(404).send({ description: error });
	}

}

