import * as express from 'express';
import Controller from './controllers/UserController';
import auth from './utils/auth';
import env from './utils/env';
import multipart from './utils/multipart';

const url = env('service');
const router = express.Router();

router.post(url + 'user/authenticate', (req, res) => {
    Controller.authenticate(req.body.userName, req.body.password).then(result => {
        req.session['identity'] = { "id": result.id, "userName": result.userName };
        res.status(200).send(req.session['identity']);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.post(url + 'user/register', (req, res) => {
    Controller.register(req.body).then(response => {
        res.status(200).send(response);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.post(url + 'user/initialUpload', multipart.single('file'), (req, res) => {
    return res.status(200).send(req.file);
});

router.post(url + 'user/profileUpload', multipart.single('file'), auth, (req, res) => {
    return res.status(200).send(req.file);
});

router.get(url + 'user/getIdentity', auth, (req, res) => {
    res.status(200).send(req.session['identity']);
});

router.get(url + 'user/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        res.status(200).send('OK');
    });
});

export default router;