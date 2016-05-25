// Getting all parameters
specs.config
  .GetParameters()
  .then(response => JSON.parse(response.data))
  .then(parameters => {
    console.log(parameters);
  })
  .catch(function(error) {
    console.log("Error", error);
  })
;

// Get single parameter
specs.config
  .GetParameter({ parameter_id: "2d2eeb63-0129-4829-afde-68b68b5a7e30" })
  .then(response => JSON.parse(response.data))
  .then(parameter => {
    console.log(parameter);
  })
  .catch(function(error) {
    console.log("Error", error);
  })
;

// Create Parameter
specs.config
  .CreateParameter({
    body: {
      domain: "xataka",
      key: "testing3",
      value: "something"
    }
  })
  .then(response => JSON.parse(response.data))
  .then(parameter => {
    console.log(parameter);
  })
  .catch(function(error) {
    console.log("Error", error);
  })
;

// Delete
specs.config
  .UpdateParameter({parameter_id: "6dab4fd4-31bf-4cde-9a9a-b970fcdbf6ac"})
  .then(response => {
    console.log("Response", response);
  })
  .catch(function(error) {
    console.log("Error", error);
  })
;

// Update
specs.config
  .UpdateParameter({
    parameter_id: "c5a67502-93dc-4fae-b0ac-582f2a65e782",
    body: {
      domain: "motorpasion",
      key: "twitter2",
      value: "something2"
    }
  })
  .then(response => JSON.parse(response.data))
  .then(parameter => {
    console.log("Parameter", parameter);
  })
  .catch(response => {
    console.log(response.data);
  })
;
