'use strinct';

const LoggerFactory = require('../../LoggerFactory');

const {
  getReminder,
  postReminder
} = require('../controllers/reminderController');

class ReminderRoutes {
  constructor(app, serverConfig) {
    this.app = app;
    this.serverConfig = serverConfig;

    const loggerFactory = new LoggerFactory(serverConfig.logLevel)
    this.logger = loggerFactory.createLogger('Reminder request')
  }

  addReminderRoutes() {
    this.app.use('/reminder', this.reminderMiddleware);
    this.app.route('/reminder')
      .get(getReminder)
      .post(postReminder);
  }

  reminderMiddleware = (req, res, next) => {
    this.logger.info({reqUrl: `${req.protocol}://${req.hostname}:${req.socket.localPort}${req.originalUrl}`})
    
    if(req.body) {
      this.logger.debug({reqBody: req.body})
    }

    next();
  }
}

module.exports = ReminderRoutes;