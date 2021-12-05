'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');

const Server = require('../server');
const serverConfig = require('./config/testServerConfig.json');
const dbConfig = require('./config/testDBConfig.json');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
let should = chai.should();

describe('Server tests', () => {
  let testServer;

  beforeEach(async () => {
    testServer = new Server(serverConfig, dbConfig);
    testServer.init();
    await testServer.start();
  });

  afterEach(async () => {
    await testServer.stop();
  });

  describe('Healthcheck', () => {
    it('Should return code 200 when server is running', (done) => {
      chai.request(testServer.app)
        .get('/health')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});