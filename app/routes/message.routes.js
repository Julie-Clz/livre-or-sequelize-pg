module.exports = function(app) {
  
  const messages = require('../controllers/message.controller');
  
  // GET index --> Lister tous les users et leurs messages dans un json
  app.get('/messages/index', messages.findAll);
  
  // POST index --> Créer un nouveau message
  app.post('/messages/index', messages.create);
  
  // GET show --> Afficher un user par rapport à son id
  app.get('/messages/:messageId', messages.findByPk);
  
  // PUT show --> Modifier un user par rapport à son id
  app.put('/messages/:messageId', messages.update);
  
  // DELETE show --> Supprimer un user à partir de l'id
  app.delete('/messages/:messageId', messages.delete);
  
}