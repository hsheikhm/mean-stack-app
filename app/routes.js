// grab the nerd model
var Nerd = require('./models/nerd');
var path = require('path');

module.exports = function(app){

  // sample api route
  app.get('/api/nerds', function(req, res){
    // use mongoose to get all nerds in the database
    Nerd.find(function(err, nerds){
      // if there is an error retrieving, send the error.
      if(err){
        res.send(err);
      }

      res.json(nerds); // return all nerds in JSON format
    });
  });

  // route to handle creating goes here (app.post)
  // route to handle delete goes here (app.delete)

  // route to handle all angular requests
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "../public/views/index.html")); // load our public/index.html file
  });

};
