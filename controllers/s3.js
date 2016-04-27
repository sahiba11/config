var aws = require('aws-sdk');
var Promise = require('promise');

aws.config.update({region: 'eu-west-1'});

var s3 = new aws.S3();
var Utils = module.exports = {};

Utils.upload = function(data) {
  return new Promise(function(success, reject) {
    var params = {
      Bucket: 'testing.configuration',
      Key: 'configuration.json',
      Body: new Buffer(JSON.stringify(data)),
      ACL: 'public-read'
    };
    s3
      .upload(params, function(err, response) {
        if (err) {
          reject(err); 
        } else {
          success(response.Location);
        }
      })
    ;
  });
}

Utils.download = function() {
  return new Promise(function(success, reject) {
    var params = {
      Bucket: 'testing.configuration',
      Key: 'configuration.json'
    };

    s3
      .getObject(params, function(err, response) {
        if (err) {
          reject(err); 
        } else {
          success(JSON.parse(response.Body.toString()));
        }
      })
    ;
  });
};
