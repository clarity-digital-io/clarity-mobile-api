let Queue = require('bull');

let PORT = '19499';
let HOST = 'ec2-52-202-160-22.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';
// Specify Redis connection using object

export const connectController = async (req, res, organization, organizationId) => {

	try {
		let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		let job = await workQueue.add({ forms: req.body.forms, organizationId: organizationId });
		res.status(201).send({ id: job.id });		
	} catch (error) {
		res.status(404).send({ description: error });
	}

}
