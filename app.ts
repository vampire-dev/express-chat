import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as _ from 'lodash';
import * as sequelize from 'sequelize';
import env from './utils/env';
import {create, synchronize} from './models/Configurator';

var app = express();
var db = new sequelize(env('connection_string'));

_.extend(global, { "sequelize": db, "models": create(db) });

if (env('generate_models'))
    synchronize(global['models'], true);

app.use(session({ secret: env('secret'), saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/express-chat/', express.static(path.join(__dirname, 'public')));
app.use('/express-chat/stored/profiles', express.static(path.join(__dirname, 'profiles/')));
app.use('/express-chat/stored/galleries', express.static(path.join(__dirname, 'galleries/')));
app.use('/express-chat/js/', express.static(path.join(__dirname, '/public/js/')));
app.use('/express-chat/images/', express.static(path.join(__dirname, '/public/images/')));
app.use('/express-chat/css/', express.static(path.join(__dirname, '/public/css/')));
app.use('/express-chat/app/', express.static(path.join(__dirname, '/public/scripts/')));

app.listen(env('port'), (err) => {
    console.log('Express chat is running on port %s', env('port'));
    console.log('Express chat DB is running');
});

app.get('/express-chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/express-chat/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

import services from './services';
app.use(services);

import chatEngine from './engine/ChatEngine';
chatEngine.start(app, env('chat_port'));