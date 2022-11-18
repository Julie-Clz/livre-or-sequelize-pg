const db = require("../models");
const User = db.users;
const Role = db.role;

const Op = db.Sequelize.Op;

// GET / READ all Users
exports.findAll = (req, res) => {
  User.findAll({
    include: ["roles"],
  }).then(users => {
    // Send all users to Client
    res.send(users);
  })
  .catch((err) => {
    console.log(">> Error while fetching user: ", err);
    res.send(err);
  });
};

// Find a User by Id including roles & messages (GET / READ)
exports.findByPk = (req, res) => { 
  User.findByPk(req.params.userId, {
    include: ["messages"],
    // include: [{
    //   model: Role,
    //   through: { attributes: [] }
    // }, "messages"]
  }).then(user => {
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name.toUpperCase());
      }
      res.status(200).send({
        roles: authorities,
        user: user,
      });
    });
    // res.send(user);
  })
  .catch((err) => {
    console.log(">> Error while fetching user: ", "id:", req.params.id, err);
    res.send(err);
  });
};


// Update a User by Id and (PUT / UPDATE)
exports.update = (req, res) => {
  const id = req.params.userId;
  const currentUser = req.userId

  User.findByPk(id, { include: Role }).then((user) => {
    if (user.id === currentUser) {
      if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles
                }
              }
            }).then(roles => {
                user.setRoles(roles)
              //   .then(() => {
              //     res.send({ message: "User's role was updated successfully! for user: " + user.id });
              // });
            });
          }
      User.update( { username: req.body.username, email: req.body.email }, 
        { where: { id: id } }
        ).then(user => {
          res.send({ message: "User was updated successfully! for user: " + id });
        })   
        .catch((err) => {
          console.log(">> Error while updating user: ","id:", id, err);
          res.send(err);
        });
      } else {
        res.send({ message: "This isn't your profile!"});
      };
    })
    .catch((err) => {
      console.log(">> Error user not found with ","id:", id, err);
      res.send(err);
    });
  };
  
  
  // Delete a User by Id (DELETE / DELETE)
  exports.delete = (req, res) => {
    const id = req.params.userId;
    const currentUser = req.userId
    User.findByPk(id, { include: Role }).then((user) => {
      if (user.id === currentUser) {
        User.destroy({
          where: { id: id }
        }, {include: ["messages"]}).then(() => {
          res.status(200).send({ message: 'deleted successfully a user with id = ' + id });
        })
        .catch((err) => {
          console.log(">> Error while deleting user with id: ", id, err);
        });
      } else {
        res.send({ message: "This isn't your Account!"});
      }
    })
    .catch((err) => {
      console.log(">> Error user not found with ","id:", id, err);
      res.send(err);
    });  
  };
  
  // function to verify authorization according to roles
  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  }; 