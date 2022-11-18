const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Messages = db.messages;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    
    next();
  });
};

// currentUserId = (req, res) => {
//   console.log(req.userId);
//   req.userId
// }

// currentUserId = (req, res) => {
//   User.findByPk(req.userId, {
//   }).then(user => {
//     res.send(user);
//     console.log(user);
//   })
// };


// isCurrentUser = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     if (userId === req.userId) {
//       next();
//       return;
//     }
//     res.status(403).send({
//       message: "You're not this message author!"
//     });
//     return;
//   });
// };

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  // currentUserId: currentUserId,
  // isCurrentUser: isCurrentUser,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;