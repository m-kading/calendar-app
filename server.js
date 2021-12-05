'user strict';

const express = require('express');
const mongoose = require('mongoose');

const healthRoutes = require('./src/routes/healthRoutes');
const ReminderRoutes = require('./src/routes/reminderRoutes');
const LoggerFactory = require('./LoggerFactory');

class Server {
  constructor(serverConfig, dbConfig) {
    this.app = express();
    this.serverConfig = serverConfig;      
    this.dbConfig = dbConfig; 
  }

  init() {
    this.initLogger('Server');
    this.initAppMiddleware();
    this.initDB();
    this.initRoutes();
  }

  initLogger(label){
    const loggerFactory = new LoggerFactory(this.serverConfig.logLevel)
    this.logger = loggerFactory.createLogger(label)
  }

  initAppMiddleware() {
    this.logger.verbose('Initializing app middleware');
    this.app.use(express.json());
  }
  
  initDB() {
    this.logger.verbose('Initializing app database');
    mongoose.Promise = global.Promise;
    mongoose.connect(
      `mongodb://${this.dbConfig.dbHost}/${this.dbConfig.dbName}`, 
      this.dbConfig.mongooseConfig
    );
  }
    
  initRoutes() {
    this.logger.verbose('Initializing app database');
    healthRoutes(this.app);

    const reminderRoutes = new ReminderRoutes(this.app, this.serverConfig);
    reminderRoutes.addReminderRoutes(this.app);
  }

  async start() {
    const port = this.serverConfig.port;

    this.server = await this.app.listen(port, () => {
      this.logger.info(`Server listening on port ${port}`);
    });
  }

  async stop() {
    await this.server.close(() => {
      this.logger.info('closing serve');
    });
  }
}

module.exports = Server;