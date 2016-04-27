'use strict';

var url = require('url');


var Default = require('./configuration');


module.exports.CreateParameter = function createParameter (req, res, next) {
  Default.CreateParameter(req, res, next);
};

module.exports.DeleteParameter = function deleteParameter (req, res, next) {
  Default.DeleteParameter(req.swagger.params, res, next);
};

module.exports.GetParameter = function getParameter (req, res, next) {
  Default.GetParameter(req.swagger.params, res, next);
};

module.exports.GetParameters = function getParameters (req, res, next) {
  Default.GetParameters(req, res, next);
};

module.exports.UpdateParameter = function updateParameter (req, res, next) {
  Default.UpdateParameter(req, res, next);
};
