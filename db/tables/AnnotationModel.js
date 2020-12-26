 const {DataTypes} = require('sequelize');
 const sequelize = require('../connection');
 const User = require("./UserModel");

 const Annotation = sequelize.define('Annotation',{
     content: {
            type: DataTypes.STRING,
            allowNull: false
     },
     importance: {
         type: DataTypes.STRING,
         allowNull: false
     }
 });

 Annotation.belongsTo(User);
 //Annotation.sync({force: true});

 module.exports = Annotation;
