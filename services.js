"use strict";
const express = require('express');
const UserController_1 = require('./controllers/UserController');
const auth_1 = require('./utils/auth');
const env_1 = require('./utils/env');
const multipart_1 = require('./utils/multipart');
const url = env_1.default('service');
const router = express.Router();
router.post(url + 'user/authenticate', (req, res) => {
    UserController_1.default.authenticate(req.body.userName, req.body.password).then(result => {
        req.session['identity'] = { "id": result.id, "userName": result.userName };
        res.status(200).send(req.session['identity']);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'user/register', (req, res) => {
    UserController_1.default.register(req.body).then(response => {
        res.status(200).send(response);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'user/initialUpload', multipart_1.default.single('file'), (req, res) => {
    return res.status(200).send(req.file);
});
router.post(url + 'user/profileUpload', multipart_1.default.single('file'), auth_1.default, (req, res) => {
    return res.status(200).send(req.file);
});
router.get(url + 'user/getIdentity', auth_1.default, (req, res) => {
    res.status(200).send(req.session['identity']);
});
router.get(url + 'user/logout', auth_1.default, (req, res) => {
    req.session.destroy((err) => {
        res.status(200).send('OK');
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=services.js.map