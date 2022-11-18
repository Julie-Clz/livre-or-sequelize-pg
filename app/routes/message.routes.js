const { authJwt } = require("../middleware");

module.exports = function(app) {
  
  const messages = require('../controllers/message.controller');
  
  // GET index --> Lister tous les users et leurs messages dans un json (public)
  app.get('/messages/index', messages.findAll);
  
  // POST index --> Créer un nouveau message (user logged in)
  app.post('/messages/index', [authJwt.verifyToken], messages.create);
  
  // GET show --> Afficher un user par rapport à son id (public)
  app.get('/messages/:messageId', messages.findByPk);
  
  // PUT show --> Modifier un user par rapport à son id (user logged in)
  app.put('/messages/:messageId', [authJwt.verifyToken], messages.update);
  
  // DELETE show --> Supprimer un user à partir de l'id (user logged in)
  app.delete('/messages/:messageId', [authJwt.verifyToken], messages.delete);
  
}