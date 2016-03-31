'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var bodyParser = require('body-parser');

module.exports = app; 

app.use(bodyParser.json());

global.config = {
  appRoot: __dirname,
  s3bucket: 'testing.configuration'
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);
});
