// Import des modules (packages npm) nécessaires au projet
// Express module pour créer le server / API
const express = require('express');
// CORS module de sécurité --> active le cross-origin-resource-sharing
const cors = require("cors");

// initialisation d'express
const app = express();

//constante pour lire les identifiants .env
const dotenv = require('dotenv');
dotenv.config();

// constante pour gérer le port émétteur
const port = process.env.PORT;

// initialisation cors
var corsOptions = {
  origin: "http://localhost:8000"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
  );
  
  
  // import modules internes nécessaires
  const db = require("./app/models");
  const users = require("./app/controllers/user.controller");
  const messages = require("./app/controllers/message.controller");
  
  /* ROUTES */
  // GET Home -> Tester la réponse du serveur
  app.get('/', (request, response) => {
    // console.log('Hello');
    response.json({ message: "Ok" });
  });
  
  /* USERS */
  require('./app/routes/user.routes.js')(app);
  
  /* MESSAGES */
  require('./app/routes/message.routes.js')(app);
  
  
  // Ecoute du port
  app.listen(port, "0.0.0.0", () => {
    console.log(`App listening at http://localhost:${port}`);
  });
  
  // execution de sequelize et création tables si 1ere fois
  db.sequelize.sync();
  // db.sequelize.sync({
  //   force: true
  // });