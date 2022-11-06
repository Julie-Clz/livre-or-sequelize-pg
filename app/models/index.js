const config = require("../config/config");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: "postgres",
//     // operatorsAliases: false,
//     // logging: true,
//     // pool: {
//     //   max: config.pool.max,
//     //   min: config.pool.min,
//     //   acquire: config.pool.acquire,
//     //   idle: config.pool.idle
//     // }
//   }
//   );

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
  
  db.users.hasMany(db.messages, { as: "messages" });
  
  db.messages.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
  });
  
  
  
  module.exports = db;
  