let Queue = require('bull');

let PORT = '22539';
let HOST = 'ec2-54-198-67-0.compute-1.amazonaws.com';
let PASSWORD = 'pa52ef8b5d034514d7e08a40ae7be9213d85032d1255a43b6393b948832e172cd';
// Specify Redis connection using object

export const syncController = async (req, res, userId) => {
	console.log('userId', req.body); 
	try {
		let workQueue = new Queue('user-sf-sync', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		let job = await workQueue.add({ sobjects: req.body, userId: userId });
		workQueue.close(); 
		res.status(201).send({ id: job.id });		
	} catch (error) {
		res.status(404).send({ description: error });
	}

}
