const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'adi.tavor2006', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

// Check the connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
}

connectDB();

module.exports = sequelize;