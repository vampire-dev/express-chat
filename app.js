"use strict";
const express = require('express');
const _ = require('lodash');
const sequelize = require('sequelize');
const env_1 = require('./utils/env');
const Configurator_1 = require('./models/Configurator');
var app = express();
var db = new sequelize(env_1.default('connection_string'));
_.extend(global, { "sequelize": db, "models": Configurator_1.create(db) });
if (env_1.default('generate_models'))
    Configurator_1.synchronize(global['models'], true);
//# sourceMappingURL=app.js.map