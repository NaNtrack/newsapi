import {merge} from 'lodash';
import BaseSettings from './base';
import LocalSettings from './local';
import APIEndpoints from './apiEndpoints';
import Credentials from './credentials';

const local = merge({}, BaseSettings, LocalSettings, APIEndpoints, Credentials);

export default local;
