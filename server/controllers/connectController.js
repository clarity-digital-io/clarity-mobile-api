let Queue = require('bull');

let PORT = '10579';
let HOST = 'ec2-54-205-115-98.compute-1.amazonaws.com';
let PASSWORD = 'p3b2f0b8e50eb4fca2646a65350018b26f04d1cbb8074c2a20475936bec4b1da1';
// Specify Redis connection using object

export const connectController = async (req, res) => {

	let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	let job = await workQueue.add('test');
	res.json({ id: job.id });

}
