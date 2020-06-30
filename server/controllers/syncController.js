let Queue = require('bull');

let PORT = '19499';
let HOST = 'ec2-52-202-160-22.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';
// Specify Redis connection using object

export const syncController = async (req, res, userId) => {
	console.log('userId', userId); 
	try {
		let workQueue = new Queue('user-sf-sync', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		let job = await workQueue.add({ sobjects: req.body, userId: userId });
		workQueue.close(); 
		res.status(201).send({ id: job.id });		
	} catch (error) {
		res.status(404).send({ description: error });
	}

}
