'use strict';

const healthRoutes = (app) => {
  app.route('/health')
    .get((req, res) => {
      res.send({
        serverStatus: "runnning", 
        port: req.socket.localPort
      });
    });
};

module.exports = healthRoutes;
