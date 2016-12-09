"use strict";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const sequelize = require('sequelize');
const env_1 = require('./utils/env');
const Configurator_1 = require('./models/Configurator');
var app = express();
var db = new sequelize(env_1.default('connection_string'));
_.extend(global, { "sequelize": db, "models": Configurator_1.create(db) });
if (env_1.default('generate_models'))
    Configurator_1.synchronize(global['models'], true);
app.use(session({ secret: env_1.default('secret'), saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/express-chat/', express.static(path.join(__dirname, 'public')));
app.use('/express-chat/stored/profiles', express.static(path.join(__dirname, 'profiles/')));
app.use('/express-chat/stored/galleries', express.static(path.join(__dirname, 'galleries/')));
app.use('/express-chat/js/', express.static(path.join(__dirname, '/public/js/')));
app.use('/express-chat/images/', express.static(path.join(__dirname, '/public/images/')));
app.use('/express-chat/css/', express.static(path.join(__dirname, '/public/css/')));
app.use('/express-chat/app/', express.static(path.join(__dirname, '/public/scripts/')));
app.listen(env_1.default('port'), (err) => {
    console.log('Express chat is running on port %s', env_1.default('port'));
    console.log('Express chat DB is running');
});
app.get('/express-chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});
app.get('/express-chat/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});
const ChatEngine_1 = require('./engine/ChatEngine');
ChatEngine_1.default.start(app, env_1.default('chat_port'));
//# sourceMappingURL=app.js.map