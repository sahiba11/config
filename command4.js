"use strict";

const Swagger = require('swagger-client');

const url = 'http://localhost:8080/swagger.yaml';

new Swagger({ url, usePromise: true })
  .then(setup)
  .catch(err => {
    console.error('Error connecting to Swagger file URL: ' + specUrl);
    console.error(err);
  })
;

function setup(specs) {
  let commands = [];
  // console.log(Object.keys(specs.config.apis));return;
  // for (let command of )

  specs.config
    .UpdateParameter({
      parameter_id: "c5a67502-93dc-4fae-b0ac-582f2a65e782",
      body: {
        domain: "motorpasion",
        key: "twitter2",
        value: "something2"
      }
    })
    .then(response => {
      console.log("Response", response);
    })
    .catch(response => {
      console.log(response.data);
    })
  ;
}
