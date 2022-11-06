module.exports = {
  // development: {
  HOST: process.env.DB_HOST,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
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