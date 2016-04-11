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
  app.delete('/api/nerds/:nerd_id', function(req, res){
    Nerd.remove({
      _id : req.params.nerd_id
    }, function(err, nerd){
      if(err){
        res.send(err);
      }

      Nerd.find(function(err, nerds){
        if(err){
          res.send(err);
        }
        var responseObject = {
          message: "Nerd successfully deleted!",
          data: nerds
        };
        res.json(responseObject);
      });
    });
  });

  // UPDATE a nerd
  app.put('/api/nerds/:nerd_id', function(req, res){
    Nerd.findById(req.params.nerd_id, function(err, nerd){
      if(err){
        res.send(err);
      }
      nerd.name = req.body.name;
      nerd.save(function(err){
        if(err){
          res.send(err);
        }

        Nerd.find(function(err, nerds){
          if(err){
            res.send(err);
          }
          var responseObject = {
            message: "Nerd successfully updated!",
            data: nerds
          };
          res.json(responseObject);
        });
      });
    });
  });

  // route to handle all angular requests
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html")); // load our public/index.html file
  });

};
