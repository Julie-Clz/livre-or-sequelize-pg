const config = require("../config/db.config");

   /* Development Env */
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     dialect: config.dialect,
//     host: config.HOST,
//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     }
//   }
//   );


  /* Production Env */
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.users = require("./user.model")(sequelize, Sequelize);
  db.messages = require("./message.model")(sequelize, Sequelize);
  db.role = require("./role.model")(sequelize, Sequelize);

  db.users.hasMany(db.messages, { as: "messages", onDelete: 'cascade'});
  
  db.messages.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
  });
  
  db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  
  db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
    onDelete: 'cascade'
  });
  
  db.ROLES = ["user", "admin", "moderator"];
  
  
  module.exports = db;
  