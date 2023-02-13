const Sequelize = require('sequelize');
require('dotenv').config();

//^This is the way WITH the authentication activity
// let sequelize;

const sequelize = process.env.MYSQL_URL
  ? new Sequelize(process.env.MYSQL_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

// if (process.env.MYSQL_URL) {
//   sequelize = new Sequelize(process.env.MYSQL_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );
// }


//^ This is the normal way WITHOUT authentication
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306,
//   }
// );

module.exports = sequelize;

