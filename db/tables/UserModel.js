const { DataTypes} = require('sequelize');
const sequelize = require('../connection');
 
 const User = sequelize.define('User',{

    name: {
         type: DataTypes.STRING,
         allowNull: false
     },
     email: {
         type: DataTypes.STRING,
         allowNull: false
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false
     },
     passwordResetExpires: {
         type: DataTypes.DATE,
         allowNull: true
     },
     passwordResetToken: {
         type: DataTypes.STRING,
         allowNull: true
     }
 });
 
  //User.sync({force: true});

  module.exports = User;