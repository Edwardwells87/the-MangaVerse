const Sequelize = require('sequelize');

require('dotenv').config();

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);}
sequelize.authenticate()
.then(console.log('connected'))// looked up how to test because my creates arent working

module.exports = sequelize;
