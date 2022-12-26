import * as express from 'express';
const auth = express.Router();

auth.get('/confirme-email', (req, res)=> {
    res.render('confirme-email')
});

auth.post('/confirme-email', (req, res)=> {
    // TODO: Adicionar confirmação de e-mail!
    res.statusCode = 200
    res.send({  msg: 'E-mail confirmado com sucesso!' })
});

export { auth };