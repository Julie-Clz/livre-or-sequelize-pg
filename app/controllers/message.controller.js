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
  })
  .catch((err) => {
    console.log(">> Error while creating message: ", err);
    res.send(err);
  });
};

// GET / READ all Messages
exports.findAll = (req, res) => {
  Message.findAll({
    include: ["user"],
  }).then(messages => {
    res.send(messages);
  })
  .catch((err) => {
    console.log(">> Error while fetching messages: ", err);
    res.send(err);
  });
};

// Find a Message by Id (GET / READ)
exports.findByPk = (req, res) => { 
  Message.findByPk(req.params.messageId, {
    include: ["user"],
  }).then(message => {
    res.send(message);
  })
  .catch((err) => {
    console.log(">> Error while fetching message with id: ", req.params.id, err);
    res.send(err);
  });
};

// Update a Message by Id (PUT / UPDATE)
exports.update = (req, res) => {
  const id = req.params.messageId;
  Message.update( { content: req.body.content }, 
    { where: {id: req.params.messageId} }
    ).then(() => {
      res.status(200).send({ message: 'updated successfully a message with id = ' + id });
    })
    .catch((err) => {
      console.log(">> Error while updating message with id: ", req.params.id, err);
      res.send(err);
    });
  };
  
  // Delete a Message by Id (DELETE / DELETE)
  exports.delete = (req, res) => {
    const id = req.params.messageId;
    Message.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).send({ message: 'deleted successfully a message with id = ' + id });
    })
    .catch((err) => {
      console.log(">> Error while deleting message with id: ", id, err);
      res.send(err);
    });
  };