module.exports = function(app) {
  
  const users = require('../controllers/user.controller');
  
  // GET index --> Lister tous les users et leurs messages dans un json
  app.get('/users/index', users.findAll);
  
  // POST index --> Créer un nouveau message
  app.post('/users/index', users.create);
  
  // GET show --> Afficher un user par rapport à son id
  app.get('/users/:userId', users.findByPk);
  
  // PUT show --> Modifier un user par rapport à son id
  app.put('/users/:userId', users.update);
  
  // DELETE show --> Supprimer un user à partir de l'id
  app.delete('/users/:userId', users.delete);
  
}