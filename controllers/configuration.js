'use strict'; 

var s3 = require('./s3');
var uuid = require('node-uuid');

var Controller = module.exports = {};

Controller.CreateParameter = (req, res) => {
  var id = uuid.v4();
  var key = req.body.key;
  var value = req.body.value;
  var domain = req.body.domain;

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
      } 
        
      configuration[id] = {
        "domain": domain,
        "key": key,
        "value": value
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

Controller.DeleteParameter = (req, res) => {

  var id = req.swagger.params.parameter_id.value

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

Controller.GetParameter = (req, res) => {

  var id = req.swagger.params.parameter_id.value;

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

Controller.GetParameters = (req, res) => {

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

Controller.UpdateParameter = (req, res) => {
  var id = req.swagger.params.parameter_id.value;
  var key = req.body.key;
  var value = req.body.value;
  var domain = req.body.domain; 

  if (key.trim().length == 0 || value.trim().length == 0 || domain.trim().length == 0) {
    return res.status(400).json("Invalid Parameter");
  }

  s3
    .download()
    .then(function(configuration) {
      if (!configuration.hasOwnProperty(id)) {
        return res.status(404).json("id you requested does not exist");
      }

      configuration[id] = {
        "domain": domain,
        "key": key,
        "value": value
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

