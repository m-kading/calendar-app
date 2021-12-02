'user strict';

const express = require('express');
const mongoose = require('mongoose');

const healthRoutes = require('./src/routes/healthRoutes');

class Server {
  constructor(serverConfig, dbConfig) {
    this.app = express();
    this.serverConfig = serverConfig;      
    this.dbConfig = dbConfig;    
  }

  init() {
    this.initAppMiddleware();
    this.initDB();
    this.initRoutes();
  }

  initAppMiddleware() {
    this.app.use(express.json());
  }

  initDB() {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      `mongodb://${this.dbConfig.dbHost}/${this.dbConfig.dbName}`, 
      this.dbConfig.mongooseConfig
    );
  }

  initRoutes() {
    healthRoutes(this.app)
  }

  async start() {
    const port = this.serverConfig.port;

    this.server = await this.app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    });
  }
}

module.exports = Server;