import * as express from 'express';
const dashboard = express.Router();

dashboard.get('/users/quantity', (req, res)=> {
    res.statusCode = 200;
    res.json({key: 'Test'});
});

export { dashboard };