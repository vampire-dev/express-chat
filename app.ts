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