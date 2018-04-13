var Sequelize = require('sequelize'),
    finale = require('finale-rest'),
    finaleMiddleware = require('./finale-middleware'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    models = require('./models');

// before calling express()...
// // Define your models
// var database = new Sequelize('finale_demo', 'root', null, { dialect: 'mysql' });
//
// var objFismaartifact = database.import(`${__dirname}/models/obj_fismaartifact`);
// var objFisma = database.import(`${__dirname}/models/obj_fisma`);
//
// // ASSOCIATIONS
// objFisma.belongsToMany(objFismaartifact, { through: 'j_fisma_artifacts' });
// objFismaartifact.belongsToMany(objFisma, { through: 'j_fisma_artifacts' });
//
// // Initialize server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  sequelize: models.sequelize,
});

// Create REST resource
var fismaResource = finale.resource({
  model: models.Fisma,
  endpoints: ['/fisma', '/fisma/:id'],
  pagination: true,
});
fismaResource.use(finaleMiddleware);

var fismaartResource = finale.resource({
  model: models.Artifact,
  endpoints: ['/artifacts', '/artifacts/:id'],
  pagination: true,
});

// Create database and listen
models.sequelize.sync().then(function() {
  server.listen(3333, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});




/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}