var User = require ('../models/userModel.js');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  createOne: function(req, res) {
    var user = req.body;
    var email = user.email;
    var password = user.password;
    User.post(user, function(err, person) {
      if (person.affectedRows === 0) {
        return res.status(409).send('That email already exists');
      } 
      res.status(201).send('Welcome!'); 
    });
  },

  verifyLogin: function(req, res, next) {
    var user = req.body;
    var password = user.password;
    var token = jwt.encode(user, 'secret');

    User.login(user, function(err, foundUser) {
      if(err) {
        return res.json(err);
      }
      
      if(!foundUser) {
        return res.status(403).send('Invalid email or password');
      }

      res.status(201).json({token: token, success: foundUser});
    });

    //   res.json();
    //   if (!err) {
    //     if (foundUser.length === 0) {
    //       res.sendStatus(404);
    //     } else {
    //       var token = jwt.encode(user, 'secret');
    //       res.json({token: token, user: foundUser});
    //     }
    //   } else {
    //     res.json(err);
    //   }
    // });
  }
}









