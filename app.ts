import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as _ from 'lodash';
import * as sequelize from 'sequelize';
import * as env from './utils/env';