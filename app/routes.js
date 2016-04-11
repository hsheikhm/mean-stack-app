// grab the nerd model
var Nerd = require('./models/nerd');
var path = require('path');

module.exports = function(app){

  // GET all nerds
  app.get('/api/nerds', function(req, res){
    Nerd.find(function(err, nerds){
      if(err){
        res.send(err);
      }
      res.json(nerds); // return all nerds in JSON format
    });
  });

  // CREATE a new nerd
  app.post('/api/nerds', function(req, res){
    Nerd.create({
      name: req.body.name
    }, function(err, nerd){
      if(err){
        res.send(err);
      }

      Nerd.find(function(err, nerds){
        if(err){
          res.send(err);
        }
        var responseObject = {
          message: "Nerd successfully created!",
          data: nerds
        };
        res.json(responseObject);
      });
    });
  });

  // DELETE a nerd




  // route to handle all angular requests
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html")); // load our public/index.html file
  });

};
