import express from 'express';
import axios from 'axios';

// Clarity Managment Connected App
const grant_type = 'password';     
const client_id = '3MVG9Z8h6Bxz0zc4V._snL15FoFtwlrYRmvezul8wMJk0jx5CqffMMlS0afWQIQ9clkd1mZOxy.j6DTR4p7m9'; 
const client_secret = '00A082693387D6718AC18AEA088DC459F656E945B96FFE219EBF40C2D9345136'; 
const username = 'test-is7noj24esie@example.com'; 
const password = 'Clarity2020!hK0S8pi2pXOQ7tjsADGijhFV';

var router = express.Router();

router.post('/', async (req, res) => {
	
	console.log('secure', req.body, req.params);

	res.status(201).send(JSON.stringify(data));
	
});

export default router;
