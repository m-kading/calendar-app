'use strict';

const Server = require('./Server');

const dbConfig = require('./config/dbConfig.json');
const serverConfig = require('./config/serverConfig.json');

const server = new Server(serverConfig, dbConfig);

server.init();
server.start();
