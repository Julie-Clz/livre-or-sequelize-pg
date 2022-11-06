module.exports = {
  // development: {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "juliecollazos",
  PASSWORD: process.env.DB_PASSWORD || "juliecollazos",
  DB: process.env.DATA_URL || "testsequelizedb",
  dialect: 'postgres',
  operatorsAliases: '0',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // },
  // production: {
  //   USER: process.env.DB_USER,
  //   PASSWORD: process.env.DB_PASSWORD,
  //   DB: process.env.DATA_URL,
  // HOST: process.env.DB_HOST,
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
  // }
};