const db = require("../models");
const Message = db.messages;


// POST / CREATE a new Message
exports.create = (req, res) => { 
  // const userId = req.params.userId;
  Message.create({  
    content: req.body.content,
    userId: req.body.userId,
  }).then(message => { 
    res.send(message);
  });
};

// GET / READ all Messages
exports.findAll = (req, res) => {
  Message.findAll({
    include: ["user"],
  }).then(messages => {
    res.send(messages);
  });
};

// Find a Message by Id (GET / READ)
exports.findByPk = (req, res) => { 
  Message.findByPk(req.params.messageId, {
    include: ["user"],
  }).then(message => {
    res.send(message);
  })
};

// Update a Message by Id (PUT / UPDATE)
exports.update = (req, res) => {
  const id = req.params.messageId;
  Message.update( { content: req.body.content }, 
    { where: {id: req.params.messageId} }
    ).then(() => {
      res.status(200).send({ message: 'updated successfully a message with id = ' + id });
    });
  };
  
  // Delete a Message by Id (DELETE / DELETE)
  exports.delete = (req, res) => {
    const id = req.params.messageId;
    Message.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).send({ message: 'deleted successfully a message with id = ' + id });
    });
  };