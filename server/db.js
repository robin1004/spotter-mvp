const Sequelize = require('sequelize');

const dbConnect = async () => {
  const sequelize = new Sequelize('postgres://localhost:5432/testing', {
  dialect: 'postgres'
});


  try {
    await sequelize.authenticate();
    console.log('Connection has been established sucessfully');
    await sequelize.close();
  } catch (error) {
    console.log('Unable to connect to DB:', error)
  }
};

dbConnect();
