'use strict';

let s3 = require('../helpers/s3');

let Controller = module.exports = {};

Controller.CreateParam = (req, res) => {
  let key = req.body.key;
  let value = req.body.value;

  if (!key || key.trim().length == 0 || !value || value.trim().length == 0) {
    return res.status(400).json({"code": "400", "message": "Invalid Parameter"});
  }

  s3
    .download()
    .then(function(configuration) {
      if (configuration.hasOwnProperty(key)) {
        return res.status(400).json({"code": "400", "message": "Parameter already exists."});
      } else {
        configuration[key] = value;
      }

      s3
        .upload(configuration)
        .then(function(location) {
          console.log("Uploaded on: %s", location);
          res.status(201).json();
        })
      ;
    })
  ;
}

Controller.DeleteParam = (req, res) => {
  const key = req.swagger.params.param.value;

  s3
    .download()
    .then(function(configuration) {
      if (configuration.hasOwnProperty(key)) {
        delete configuration[key];
        s3
          .upload(configuration)
          .then(function(location) {
            console.log("Uploaded on: %s", location);
            res.json();
          })
        ;
      } else {
        res.status(400).json({"code": "400", "message": "The parameter you requested doesn't exists"});
      }
    })
  ;
}

Controller.GetParams = (req, res) => {
  s3
    .download()
    .then(function(content) {
      res.json(content);
    });
}
