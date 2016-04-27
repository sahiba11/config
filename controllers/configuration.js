'use strict'; 

var s3 = require('./s3');
var uuid = require('node-uuid');

exports.CreateParameter = function(args, res, next) {
  var id = uuid.v4();
  var key = args.body.key;
  var value = args.body.value;
  var domain = args.body.domain;

  if (key.trim().length == 0 || value.trim().length == 0 || domain.trim().length == 0) {
    return res.status(400).json("Invalid Parameter");
  }

  s3
    .download()
    .then(function(configuration) {
      var configExists = false;
      for (var config in configuration) {
        if (configuration.hasOwnProperty(config)) {
          if (configuration[config].domain == domain && configuration[config].key == key) {
            configExists = true;
          }
        }
      }

      if(configExists) {
        return res.status(400).json("Configuration already exists");
      } else {
        configuration[id] = {
          "domain": domain,
          "key": key,
          "value": value
        }
      }

      s3
        .upload(configuration)
        .then(function(location) {
          console.log("Uploaded on: %s", location);
          res.status(201).json(configuration[id]);
        });
    })
    .catch(function(error) {
      res.status(403).json(error);
    })
  ;    
}

exports.DeleteParameter = function(args, res, next) {

  var id = args.parameter_id.value

  s3
    .download()
    .then(function(configuration) {
      if (configuration.hasOwnProperty(id)) {
        delete configuration[id]; 
      } else {
        return res.status(404).json("id you requested does not exist");
      }

      s3
        .upload(configuration)
        .then(function(location) {
          console.log("Uploaded on: %s", location);  
          res.status(200).json();
        })
      ;
    })
    .catch(function(error) {
      res.status(403).json(error);
    })
  ;
}

exports.GetParameter = function(args, res, next) {

  var id = args.parameter_id.value;

  s3
    .download()
    .then(function(configuration) {
      if (configuration.hasOwnProperty(id)) {
        res.status(200).json(configuration[id]);
      }
      else {
        res.status(404).json("id you requested does not exist");
      }

    })
    .catch(function(error) {
      res.status(403).json(error);
    })
  ;
}   

exports.GetParameters = function(args, res, next) {

  s3
    .download()
    .then(function(content) { 
      res.status(200).json(content);
    })
    .catch(function(error) {
      res.status(403).json(error);
    })
  ;
}

exports.UpdateParameter = function(args, res, next) {
  var id = args.swagger.params.parameter_id.value;
  var key = args.body.key;
  var value = args.body.value;
  var domain = args.body.domain; 

  if (key.trim().length == 0 || value.trim().length == 0 || domain.trim().length == 0) {
    return res.status(400).json("Invalid Parameter");
  }

  s3
    .download()
    .then(function(configuration) {
      if (!configuration.hasOwnProperty(id)) {
        return res.status(404).json("id you requested does not exist");
      } else {
        configuration[id] = {
          "domain": domain,
          "key": key,
          "value": value
        }
      }

      s3
        .upload(configuration)
        .then(function(location) {
          console.log("Uploaded on: %s", location);
          res.status(200).json(configuration[id]);
        })
      ;
    })
    .catch(function(error) {
      res.status(403).json(error);
    })
  ;
}

