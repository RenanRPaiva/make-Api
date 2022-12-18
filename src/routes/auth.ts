import * as express from 'express';
const auth = express.Router();

auth.get('/confirme-email', (req, res)=> {
    res.render('confirme-email')
});

auth.post('/confirme-email', (req, res)=> {
    console.log(req.body)
    res.render('confirme-email')
});

export { auth };