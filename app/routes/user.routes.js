// module.exports = function(app) {
  
//   const users = require('../controllers/user.controller');
  
//   // GET index --> Lister tous les users et leurs messages dans un json
  // app.get('/users/index', users.findAll);
  
//   // POST index --> Créer un nouveau message
//   app.post('/users/index', users.create);
  
//   // GET show --> Afficher un user par rapport à son id
//   app.get('/users/:userId', users.findByPk);
  
//   // PUT show --> Modifier un user par rapport à son id
//   app.put('/users/:userId', users.update);
  
//   // DELETE show --> Supprimer un user à partir de l'id
//   app.delete('/users/:userId', users.delete);
  
// }

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // GET index --> Lister tous les users et leurs messages dans un json (admin)
  app.get('/users/index', [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

  // GET show --> Afficher un user, son role et ses messages par rapport à son id
  app.get('/users/:userId', [authJwt.verifyToken], controller.findByPk);
  
  // PUT show --> Modifier un user et son role par rapport à son id
  app.put('/users/:userId', [authJwt.verifyToken], controller.update);
  
  // DELETE show --> Supprimer un user et son role à partir de l'id
  app.delete('/users/:userId', [authJwt.verifyToken], controller.delete);


  /* ROUTES POUR TESTER AUTHORIZATIONS */
  // routes for public content
  app.get("/api/test/all", controller.allAccess);

  // routes for user content
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // routes for moderator content
  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

  // routes for admin content (everything)
  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
};